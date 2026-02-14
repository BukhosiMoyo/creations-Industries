
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { RateLimiter } from "./rate-limiter";

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export class OutreachWorker {

    /**
     * Picks up Queued jobs and executes them.
     */
    static async processJobs() {
        const jobs = await prisma.emailJob.findMany({
            where: {
                status: 'Queued',
                scheduledAt: { lte: new Date() }
            },
            take: 10,
            include: { mailbox: true }
        });

        for (const job of jobs) {
            try {
                // Rate Limiting
                const check = await RateLimiter.checkMailboxAvailability(job.mailboxId);
                if (!check.allowed) {
                    await prisma.emailJob.update({
                        where: { id: job.id },
                        data: {
                            nextAttemptAt: new Date(Date.now() + 15 * 60 * 1000), // Retry in 15m
                            lastError: check.reason
                        }
                    });
                    continue;
                }

                // Lock Job
                await prisma.emailJob.update({
                    where: { id: job.id },
                    data: { status: 'Sending', lockedAt: new Date() }
                });

                // Send Email
                const { data, error } = await resend.emails.send({
                    from: `${job.mailbox.fromName} <${job.mailbox.fromEmail}>`,
                    to: job.toEmail,
                    subject: job.subjectRendered,
                    html: job.bodyHtmlRendered,
                    tags: [
                        { name: "jobId", value: job.id },
                        { name: "workspaceId", value: job.workspaceId }
                    ]
                });

                if (error) throw new Error(error.message);

                // Determine Next Step Logic
                let nextSendAt: Date | null = null;
                let isCompleted = false;

                if (job.enrollmentId) {
                    const enrollment = await prisma.campaignEnrollment.findUnique({
                        where: { id: job.enrollmentId },
                        include: { campaign: { include: { steps: true } } }
                    });

                    if (enrollment) {
                        const currentStepNum = enrollment.currentStepNumber;
                        const nextStepNum = currentStepNum + 1;
                        const nextStep = enrollment.campaign.steps.find(s => s.order === nextStepNum);

                        if (nextStep) {
                            const delayMs = (nextStep.delayMinutes || 0) * 60 * 1000 + (nextStep.delayHours || 0) * 60 * 60 * 1000;
                            // Schedule next send relative to NOW
                            nextSendAt = new Date(Date.now() + delayMs);
                        } else {
                            isCompleted = true;
                        }
                    }
                }

                // Transactional Success Update
                await prisma.$transaction([
                    // 1. Update Job
                    prisma.emailJob.update({
                        where: { id: job.id },
                        data: { status: 'Sent', lockedAt: null }
                    }),
                    // 2. Create Message Log
                    prisma.emailMessage.create({
                        data: {
                            workspaceId: job.workspaceId,
                            emailJobId: job.id,
                            provider: 'Resend',
                            providerMessageId: data?.id || "unknown",
                            fromEmail: job.mailbox.fromEmail,
                            toEmail: job.toEmail,
                            status: 'Sent'
                        }
                    }),
                ]);
                // 3. Update Enrollment
                // Separate data object construction to avoid TS union issues
                const enrollmentUpdateData: any = { lastSentAt: new Date() };

                if (isCompleted) {
                    enrollmentUpdateData.status = 'Completed';
                    enrollmentUpdateData.nextSendAt = null;
                } else {
                    enrollmentUpdateData.currentStepNumber = { increment: 1 };
                    enrollmentUpdateData.nextSendAt = nextSendAt;
                }

                if (job.enrollmentId) {
                    await prisma.campaignEnrollment.update({
                        where: { id: job.enrollmentId },
                        data: enrollmentUpdateData
                    });
                }


            } catch (err: any) {
                console.error(`Job ${job.id} failed:`, err);
                await prisma.emailJob.update({
                    where: { id: job.id },
                    data: {
                        status: 'Failed',
                        lastError: err.message,
                        attemptCount: { increment: 1 },
                        nextAttemptAt: new Date(Date.now() + 60 * 60 * 1000)
                    }
                });
            }
        }
    }
}
