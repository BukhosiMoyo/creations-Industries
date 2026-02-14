
import { prisma } from "@/lib/prisma";
import { AwarenessStage, OutreachEventType } from "@prisma/client";

export class EmailHandlers {

    static async onSent(payload: { jobId: string; messageId: string }) {
        console.log(`[Handler] Email Sent: Job ${payload.jobId}`);
        // Already handled by Worker
    }

    static async onDelivered(payload: { messageId: string; email: string }) {
        console.log(`[Handler] Email Delivered: ${payload.messageId}`);
        await prisma.emailMessage.updateMany({
            where: { providerMessageId: payload.messageId },
            data: { status: 'Delivered', deliveredAt: new Date() }
        });
    }

    static async onOpened(payload: { messageId: string; email: string }) {
        console.log(`[Handler] Email Opened: ${payload.messageId}`);

        const message = await prisma.emailMessage.findFirst({
            where: { providerMessageId: payload.messageId },
            include: { job: true }
        });

        if (message && message.job) {
            // Create Event log
            await prisma.outreachEvent.create({
                data: {
                    type: OutreachEventType.Opened,
                    campaignId: message.job.campaignId,
                    leadId: message.job.leadId,
                    userEmail: message.toEmail,
                    metadata: { messageId: payload.messageId }
                }
            });

            // Update Lead Score
            await EmailHandlers.updateLeadScore(message.job.leadId, 2, "ProblemAware", ["Unaware"]);
        }
    }

    static async onClicked(payload: { messageId: string; url: string; email: string }) {
        const message = await prisma.emailMessage.findFirst({
            where: { providerMessageId: payload.messageId },
            include: { job: true }
        });

        if (message && message.job) {
            await prisma.outreachEvent.create({
                data: {
                    type: OutreachEventType.Clicked,
                    campaignId: message.job.campaignId,
                    leadId: message.job.leadId,
                    userEmail: message.toEmail,
                    metadata: { messageId: payload.messageId, url: payload.url }
                }
            });

            // Update Score
            await EmailHandlers.updateLeadScore(message.job.leadId, 5, "SolutionAware", ["Unaware", "ProblemAware"]);
        }
    }

    static async onReplied(payload: { messageId: string; content?: string; email: string }) {
        console.log(`[Handler] Email Replied: ${payload.messageId}`);

        const message = await prisma.emailMessage.findFirst({
            where: { providerMessageId: payload.messageId },
            include: { job: true }
        });

        if (message && message.job) {
            await prisma.outreachEvent.create({
                data: {
                    type: OutreachEventType.Replied,
                    campaignId: message.job.campaignId,
                    leadId: message.job.leadId,
                    userEmail: message.toEmail,
                    metadata: { messageId: payload.messageId }
                }
            });

            // Update Score
            await EmailHandlers.updateLeadScore(message.job.leadId, 20, "ServiceAware", [], "Engaged");
        }
    }

    static async onBounced(payload: { messageId: string; email: string }) {
        const message = await prisma.emailMessage.findFirst({
            where: { providerMessageId: payload.messageId },
            include: { job: true }
        });

        if (message) {
            await prisma.emailMessage.update({
                where: { id: message.id },
                data: { status: 'Bounced' }
            });
        }

        if (message && message.job) {
            await prisma.outreachEvent.create({
                data: {
                    type: OutreachEventType.Bounced,
                    campaignId: message.job.campaignId,
                    leadId: message.job.leadId,
                    userEmail: message.toEmail,
                    metadata: { messageId: payload.messageId }
                }
            });

            await EmailHandlers.updateLeadScore(message.job.leadId, -10);
        }
    }

    static async onComplained(payload: { messageId: string; email: string }) {
        const message = await prisma.emailMessage.findFirst({
            where: { providerMessageId: payload.messageId },
            include: { job: true }
        });

        if (message) {
            await prisma.emailMessage.update({
                where: { id: message.id },
                data: { status: 'Complained' }
            });
        }

        if (message && message.job) {
            await prisma.outreachEvent.create({
                data: {
                    type: OutreachEventType.Complained,
                    campaignId: message.job.campaignId,
                    leadId: message.job.leadId,
                    userEmail: message.toEmail,
                    metadata: { messageId: payload.messageId }
                }
            });

            await EmailHandlers.updateLeadScore(message.job.leadId, -50);
        }
    }

    // Helper
    private static async updateLeadScore(
        leadId: string,
        scoreBump: number,
        targetAwareness?: AwarenessStage,
        allowedAwarenessCurrentStages: AwarenessStage[] | any = [],
        targetPipelineStageName?: string
    ) {
        const lead = await prisma.lead.findUnique({ where: { id: leadId } });
        if (!lead) return;

        const data: any = {
            leadScore: { increment: scoreBump }
        };

        // Awareness Stage transition
        if (targetAwareness && (!allowedAwarenessCurrentStages.length || allowedAwarenessCurrentStages.includes(lead.awarenessStage))) {
            data.awarenessStage = targetAwareness;
        }

        // Pipeline Stage transition
        if (targetPipelineStageName && lead.workspaceId) {
            const stage = await prisma.pipelineStage.findFirst({
                where: {
                    workspaceId: lead.workspaceId,
                    name: targetPipelineStageName
                }
            });
            if (stage) {
                data.pipelineStageId = stage.id;
            }
        }

        await prisma.lead.update({
            where: { id: leadId },
            data
        });
    }
}
