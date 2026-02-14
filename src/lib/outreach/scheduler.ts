
import { prisma } from "@/lib/prisma";
import { DeliveryEngine } from "./delivery-engine";

export class OutreachScheduler {

    /**
     * Scans active enrollments due for processing and creates EmailJobs.
     */
    static async scheduleJobs() {
        const now = new Date();

        // 1. Find enrollments due for a step
        const enrollments = await prisma.campaignEnrollment.findMany({
            where: {
                status: 'Active', // or Enrolled if we auto-start
                nextSendAt: { lte: now },
                // Ensure no pending job exists for this step to avoid duplicates
                // This is a simplification; robust logic needs better locking or state tracking
                jobs: {
                    none: {
                        status: { in: ['Queued', 'Sending'] }
                    }
                }
            },
            include: {
                campaign: {
                    include: {
                        steps: { orderBy: { order: 'asc' } },
                        sendingProfile: true
                    }
                },
                lead: true
            },
            take: 50 // Batch size
        });

        console.log(`Scheduler found ${enrollments.length} enrollments due.`);

        for (const enrollment of enrollments) {
            try {
                // Get current step
                const currentStepIndex = enrollment.currentStepNumber - 1;
                // Wait, step numbers usually 1-indexed. Let's assume schema stores 1-based step number?
                // Schema uses `currentStepNumber`. If 0, it means hasn't started?
                // Or if it's "Active" and "next_send_at" is passed, it means we are ready for step `currentStepNumber`?
                // Let's assume `currentStepNumber` points to the step we are ABOUT to send (if we use 0-based array index logic for next step).
                // If we use 1-based, then `currentStepNumber` is the one just completed?
                // Conventional: currentStep = 1 (we are on step 1).

                // Let's assume: currentStepNumber = 1 means we are working on Step 1.
                // If it's newly enrolled, maybe set to 1.

                const step = enrollment.campaign.steps.find(s => s.order === enrollment.currentStepNumber);

                if (!step) {
                    // No more steps? Complete the enrollment.
                    await prisma.campaignEnrollment.update({
                        where: { id: enrollment.id },
                        data: { status: 'Completed' }
                    });
                    continue;
                }

                if (!enrollment.campaign.sendingProfileId) {
                    console.warn(`Campaign ${enrollment.campaign.name} has no sending profile.`);
                    continue;
                }

                // Select Mailbox
                const mailbox = await DeliveryEngine.selectMailbox(enrollment.campaign.sendingProfileId);

                if (!mailbox) {
                    console.warn(`No available mailbox for campaign ${enrollment.campaign.id}`);
                    continue; // Try again next cycle
                }

                // Create Email Job
                await prisma.emailJob.create({
                    data: {
                        workspaceId: enrollment.workspaceId,
                        campaignId: enrollment.campaignId,
                        enrollmentId: enrollment.id,
                        leadId: enrollment.leadId,
                        mailboxId: mailbox.id,
                        templateId: step.templateId, // or null if using body directly

                        toEmail: enrollment.lead.email,
                        subjectRendered: step.subject || "No Subject", // Should render variables here
                        bodyHtmlRendered: step.body || "", // Should render variables here

                        status: 'Queued',
                        scheduledAt: now, // Ready immediately

                        // Idempotency: campaignId + leadId + stepId?
                        // Schema has unique on emailJobId, but here we want unique per step.
                        // idempotencyKey: `${enrollment.id}_step_${step.order}` 
                        // But let's rely on the query filter `jobs: none: ...` above for now.
                    }
                });

                // Update enrollment to indicate job created? 
                // We don't advance step yet. We advance step only AFTER job is sent.
                // This is safer.

                console.log(`Scheduled job for lead ${enrollment.lead.email} on step ${step.order}`);

            } catch (error) {
                console.error(`Error scheduling job for enrollment ${enrollment.id}:`, error);
            }
        }
    }
}
