import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/email/resend";
import { OutreachEventType, CampaignStatus } from "@prisma/client";

export async function processOutreachQueue() {
    const now = new Date();

    // 1. Find ACTIVE Check
    // We only process leads that are:
    // - In an ACTIVE campaign
    // - Status is "ACTIVE"
    // - nextSendAt is in the PAST

    const pending = await prisma.campaignLead.findMany({
        where: {
            status: "ACTIVE",
            nextSendAt: { lte: now },
            campaign: { status: CampaignStatus.Running }
        },
        take: 50, // Batch limit
        include: {
            lead: true,
            campaign: {
                include: {
                    steps: { orderBy: { order: 'asc' } },
                    sendingProfile: {
                        include: {
                            mailboxes: {
                                include: { mailbox: true }
                            }
                        }
                    }
                }
            }
        }
    });

    if (pending.length === 0) return { processed: 0, errors: 0 };

    let processed = 0;
    let errors = 0;

    for (const item of pending) {
        try {
            const stepIndex = item.currentStep - 1;
            const step = item.campaign.steps[stepIndex];

            if (!step) {
                // End of campaign
                await prisma.campaignLead.update({
                    where: { id: item.id },
                    data: { status: "COMPLETED", completedAt: new Date() }
                });
                continue;
            }

            // 3. Send Email
            // Replace variables
            // Legacy fields support
            let body = step.body || "";
            body = body.replace(/{{firstName}}/g, item.lead.firstName);
            body = body.replace(/{{companyName}}/g, item.lead.companyName || "");

            let subject = step.subject || "";
            subject = subject.replace(/{{firstName}}/g, item.lead.firstName);

            // Select Sender
            const mailboxes = item.campaign.sendingProfile?.mailboxes || [];
            if (mailboxes.length === 0) {
                // Fallback or error? For now error.
                throw new Error("No sending mailboxes found for campaign profile");
            }
            const sender = mailboxes[0].mailbox;

            const { data, error } = await resend.emails.send({
                from: sender.fromEmail,
                to: item.lead.email,
                subject: subject,
                html: body,
                tags: [
                    { name: "campaign_id", value: item.campaignId },
                    { name: "lead_id", value: item.leadId },
                    { name: "step_id", value: step.id }
                ]
            });

            if (error) throw new Error(error.message);

            // 4. Log Event
            await prisma.outreachEvent.create({
                data: {
                    type: OutreachEventType.Sent,
                    campaignId: item.campaignId,
                    stepId: step.id,
                    leadId: item.leadId,
                    userEmail: item.lead.email,
                    metadata: { messageId: data?.id }
                }
            });

            // 5. Advance Step
            const nextStep = item.campaign.steps[stepIndex + 1];
            if (nextStep) {
                const delayMs = nextStep.delayMinutes * 60 * 1000 + (nextStep.delayHours * 60 * 60 * 1000);
                await prisma.campaignLead.update({
                    where: { id: item.id },
                    data: {
                        currentStep: item.currentStep + 1, // Fix: Use increment or explicitly set
                        nextSendAt: new Date(now.getTime() + delayMs)
                    }
                });
            } else {
                await prisma.campaignLead.update({
                    where: { id: item.id },
                    data: { status: "COMPLETED", completedAt: new Date() }
                });
            }

            processed++;

        } catch (err: any) {
            console.error(`Failed to send to lead ${item.leadId}:`, err);
            // Log error event
            await prisma.outreachEvent.create({
                data: {
                    type: OutreachEventType.Bounced, // Using Bounced as closest proxy for failed send
                    campaignId: item.campaignId,
                    leadId: item.leadId,
                    metadata: { error: err.message || String(err) }
                }
            });
            errors++;
        }
    }

    return { processed, errors };
}

export async function getRunningCampaigns() {
    return prisma.campaign.findMany({
        where: {
            status: CampaignStatus.Running
        },
        include: {
            steps: {
                orderBy: { order: 'asc' }
            },
            sendingProfile: {
                include: {
                    mailboxes: {
                        include: { mailbox: true }
                    }
                }
            }
        }
    });
}
