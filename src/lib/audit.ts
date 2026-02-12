import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function logActivity({
    companyId,
    serviceRequestId,
    actionType,
    actionSummary,
    metadata,
}: {
    companyId?: string;
    serviceRequestId?: string;
    actionType: string;
    actionSummary: string;
    metadata?: Record<string, unknown>;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        console.warn("Attempted to log activity without a session");
        return;
    }

    const userId = session.user.id;

    return await prisma.activityLog.create({
        data: {
            actorUserId: userId,
            companyId,
            serviceRequestId,
            actionType,
            actionSummary,
            metadata: metadata || {},
        },
    });
}
