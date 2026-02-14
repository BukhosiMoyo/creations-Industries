
import { prisma } from "@/lib/prisma";

export async function getSendingProfiles(workspaceId?: string) {
    return prisma.sendingProfile.findMany({
        where: workspaceId ? { workspaceId } : undefined,
        orderBy: { name: 'asc' },
        include: {
            _count: {
                select: { mailboxes: true }
            }
        }
    });
}
