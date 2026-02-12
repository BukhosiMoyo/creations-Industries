import { prisma } from "./prisma"
import { NotificationType } from "@prisma/client"

interface CreateNotificationParams {
    userId: string
    title: string
    message: string
    type?: NotificationType
    link?: string
}

export async function createNotification({
    userId,
    title,
    message,
    type = "INFO",
    link
}: CreateNotificationParams) {
    try {
        return await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type,
                link
            }
        })
    } catch (error) {
        console.error("Failed to create notification:", error)
    }
}
