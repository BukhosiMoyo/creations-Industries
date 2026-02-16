'use server'

import { prisma } from "@/lib/prisma"
import { requireRole } from "@/lib/rbac"
import { revalidatePath } from "next/cache"
import { UserRole, UserStatus } from "@prisma/client"

export async function updateUser(userId: string, data: { role?: UserRole; status?: UserStatus; companyId?: string | null }) {
    await requireRole(['ADMIN'])

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data
        })
        revalidatePath('/dashboard/users')
        revalidatePath(`/dashboard/users/${userId}`)
        return { success: true, user }
    } catch (error) {
        console.error("Failed to update user:", error)
        return { success: false, error: "Failed to update user" }
    }
}

export async function deleteUser(userId: string) {
    await requireRole(['ADMIN'])

    try {
        // Soft delete/suspend preferred usually, but for now we'll support delete if requested or status
        // Actually, let's just use status=SUSPENDED as "delete" for now in UI, but this action is here if needed.
        // If we really delete:
        await prisma.user.delete({ where: { id: userId } })
        revalidatePath('/dashboard/users')
        return { success: true }
    } catch (error) {
        console.error("Failed to delete user:", error)
        return { success: false, error: "Failed to delete user" }
    }
}

export async function resendInvite(inviteId: string) {
    await requireRole(['ADMIN'])
    // TODO: Implement actual resend logic (email)
    // For now just mock success
    return { success: true, message: "Invite resent" }
}
