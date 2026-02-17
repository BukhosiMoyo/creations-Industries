
'use server'

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/rbac"
import { TaskStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function toggleTaskStatus(taskId: string, currentStatus: TaskStatus) {
    try {
        await requireAuth()

        const newStatus = currentStatus === TaskStatus.Open ? TaskStatus.Done : TaskStatus.Open

        await prisma.task.update({
            where: { id: taskId },
            data: { status: newStatus }
        })

        revalidatePath('/dashboard/tasks')
        return { success: true, status: newStatus }
    } catch (error) {
        console.error("Failed to toggle task status:", error)
        return { success: false, error: "Failed to update task status" }
    }
}

export async function deleteTask(taskId: string) {
    try {
        await requireAuth()

        await prisma.task.delete({
            where: { id: taskId }
        })

        revalidatePath('/dashboard/tasks')
        return { success: true }
    } catch (error) {
        console.error("Failed to delete task:", error)
        return { success: false, error: "Failed to delete task" }
    }
}
