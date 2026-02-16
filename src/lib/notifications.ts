import { prisma } from "./prisma"
import { NotificationType, NotificationSeverity } from "@prisma/client"

interface CreateNotificationParams {
    userId: string
    title: string
    message: string
    type?: NotificationType // Legacy/Visual
    severity?: NotificationSeverity
    category?: string
    link?: string
    metadata?: Record<string, any>
    relatedLeadId?: string
    relatedRequestId?: string
}

export async function createNotification({
    userId,
    title,
    message,
    type = "INFO",
    severity = "INFO",
    category = "SYSTEM",
    link,
    metadata,
    relatedLeadId,
    relatedRequestId
}: CreateNotificationParams) {
    try {
        return await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type,
                severity,
                category,
                link,
                metadata,
                relatedLeadId,
                relatedRequestId
            }
        })
    } catch (error) {
        console.error("Failed to create notification:", error)
    }
}
