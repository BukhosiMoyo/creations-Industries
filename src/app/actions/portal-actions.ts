'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getSession } from "@/lib/rbac"
import { createNotification } from "@/lib/notifications"

export async function uploadClientDocument(
    requestId: string,
    fileData: { name: string; size: number; type: string; url?: string }
) {
    const session = await getSession()
    if (!session || !session.user.companyId) throw new Error("Unauthorized")

    // Verify request belongs to company
    const request = await prisma.serviceRequest.findFirst({
        where: {
            id: requestId,
            companyId: session.user.companyId
        }
    })

    if (!request) throw new Error("Request not found")

    // Create Document Link
    // In a real app, we'd sign an S3 URL here or handle the file buffer if small enough
    // For now, we assume the client "uploaded" effectively (mocked or handled by client-side separate upload path)
    // and we just record it.

    // If we want to simulate "Upload to Storage" we typically return a presigned URL here.
    // Given the prompt constraints and existing "mock-url", we'll just create the record.

    const doc = await prisma.document.create({
        data: {
            companyId: session.user.companyId,
            serviceRequestId: requestId,
            type: "Other", // Could be inferred
            filename: fileData.name,
            size: fileData.size,
            mimeType: fileData.type,
            storageKey: `uploads/${requestId}/${Date.now()}_${fileData.name}`, // Mock key
            uploadedByUserId: session.user.id,
            accessLevel: "ClientVisible"
        }
    })

    // Log Activity
    await prisma.activityLog.create({
        data: {
            actorUserId: session.user.id,
            serviceRequestId: requestId,
            companyId: session.user.companyId,
            actionType: "DOCUMENT_UPLOAD",
            actionSummary: `Uploaded document: ${fileData.name}`
        }
    })

    // If request was "AwaitingDocs", maybe change status? 
    // Usually manual review, but we could trigger notification.
    // For now, just revalidate.

    // Notify Staff/Admins about new document
    // Find who is assigned to the request to notify them?
    const assignedUserId = request.assignedToUserId;
    if (assignedUserId) {
        await createNotification({
            userId: assignedUserId,
            title: "New Document Uploaded",
            message: `${session.user.name || 'Client'} uploaded ${fileData.name}`,
            type: "INFO",
            link: `/dashboard/requests/${requestId}`
        });
    }

    revalidatePath(`/portal/requests/${requestId}`)
    return doc
}
