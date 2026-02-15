"use server";
import { prisma } from "@/lib/prisma";

export async function getLeads(workspaceId?: string) {
    // Force rebuild 2
    return prisma.lead.findMany({
        where: workspaceId ? { workspaceId } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
            pipelineStage: true,
            assignedToUser: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            },
            _count: {
                select: {
                    jobs: true,
                    enrollments: true
                }
            }
        }
    });
}

export async function getPipelineStages(workspaceId?: string) {
    return prisma.pipelineStage.findMany({
        where: workspaceId ? { workspaceId } : undefined,
        orderBy: { orderIndex: 'asc' }
    });
}

export async function updateLeadStage(leadId: string, stageId: string) {
    return prisma.lead.update({
        where: { id: leadId },
        data: { pipelineStageId: stageId }
    });
}

export async function updateLead(leadId: string, data: any) {
    return prisma.lead.update({
        where: { id: leadId },
        data
    });
}

export async function getLead(id: string) {
    return prisma.lead.findUnique({
        where: { id },
        include: {
            pipelineStage: true,
            assignedToUser: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    image: true
                }
            },
            documents: true,
            statusEvents: {
                orderBy: { createdAt: 'desc' }
            },
            enrollments: {
                include: {
                    campaign: true
                }
            },
            jobs: {
                orderBy: { createdAt: 'desc' },
                take: 5
            }
        }
    });
}
