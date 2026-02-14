import { prisma } from "@/lib/prisma";
import { Campaign, CampaignStep, CampaignStatus, CampaignType, EnrollmentStatus } from "@prisma/client";

export async function createCampaign(data: {
    name: string;
    type: CampaignType;
    subject?: string;
    body?: string;
    senderEmail?: string;
    workspaceId: string;
    sendingProfileId?: string;
}) {
    // If legacy fields are used, create a default step
    const campaign = await prisma.campaign.create({
        data: {
            name: data.name,
            type: data.type,
            workspaceId: data.workspaceId,
            sendingProfileId: data.sendingProfileId,
            status: CampaignStatus.Draft
        }
    });

    // Create default step if content provided
    if (data.subject || data.body) {
        await prisma.campaignStep.create({
            data: {
                campaignId: campaign.id,
                order: 1,
                subject: data.subject || "",
                body: data.body || "",
                delayMinutes: 0
            }
        });
    }

    return campaign;
}

export async function updateCampaign(id: string, data: {
    name?: string;
    sendingProfileId?: string;
    status?: CampaignStatus;
}) {
    return prisma.campaign.update({
        where: { id },
        data
    });
}

export async function getCampaigns(workspaceId?: string) {
    return prisma.campaign.findMany({
        where: workspaceId ? { workspaceId } : undefined,
        orderBy: { updatedAt: 'desc' },
        include: {
            _count: {
                select: { leads: true, steps: true }
            },
            sendingProfile: true
        }
    });
}

export async function getCampaign(id: string) {
    return prisma.campaign.findUnique({
        where: { id },
        include: {
            steps: {
                orderBy: { order: 'asc' }
            },
            sendingProfile: true,
            _count: {
                select: {
                    leads: true,
                    enrollments: { where: { status: 'Active' } }
                }
            }
        }
    });
}

export async function getCampaignAnalytics(id: string) {
    const [stats, leads] = await Promise.all([
        prisma.emailJob.groupBy({
            by: ['status'],
            where: { campaignId: id },
            _count: true
        }),
        prisma.campaignEnrollment.count({ where: { campaignId: id } })
    ]);

    const counts = stats.reduce((acc, curr) => {
        acc[curr.status] = curr._count;
        return acc;
    }, {} as Record<string, number>);

    return {
        totalLeads: leads,
        sent: counts['Sent'] || 0,
        opened: 0,
        replied: 0
    };
}

export async function addCampaignStep(campaignId: string, data: {
    subject?: string;
    body: string;
    delayMinutes: number;
    order: number;
}) {
    return prisma.campaignStep.create({
        data: {
            campaignId,
            ...data
        }
    });
}

export async function updateCampaignStatus(id: string, status: CampaignStatus) {
    return prisma.campaign.update({
        where: { id },
        data: { status }
    });
}

export async function addLeadsToCampaign(campaignId: string, leadIds: string[]) {
    // 0. Fetch Campaign to get workspaceId
    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        select: { workspaceId: true }
    });

    if (!campaign || !campaign.workspaceId) {
        throw new Error("Campaign not found or missing workspaceId");
    }

    // 1. Fetch First Step to determine initial delay
    const firstStep = await prisma.campaignStep.findFirst({
        where: { campaignId, order: 1 }
    });

    const now = new Date();
    let nextSendAt = now;

    if (firstStep) {
        const delayMs = (firstStep.delayMinutes || 0) * 60 * 1000 + (firstStep.delayHours || 0) * 60 * 60 * 1000;
        if (delayMs > 0) {
            nextSendAt = new Date(now.getTime() + delayMs);
        }
    }

    // 2. Prepare Data
    const enrollmentsData = leadIds.map(leadId => ({
        campaignId,
        leadId,
        workspaceId: campaign.workspaceId!,
        status: EnrollmentStatus.Active,
        currentStepNumber: 1,
        startedAt: now,
        nextSendAt: nextSendAt
    }));

    // 3. Create Enrollments
    return prisma.campaignEnrollment.createMany({
        data: enrollmentsData,
        skipDuplicates: true
    });
}
