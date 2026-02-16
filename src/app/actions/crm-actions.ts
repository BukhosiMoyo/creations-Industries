'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { LeadStatus, RequestStatus, ServiceType, Priority } from "@prisma/client"
import { getSession } from "@/lib/rbac"

// --- LEAD ACTIONS ---

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
    const session = await getSession()
    if (!session) throw new Error("Unauthorized")

    // Log the change
    await prisma.leadStatusEvent.create({
        data: {
            leadId,
            oldStatus: (await prisma.lead.findUnique({ where: { id: leadId } }))?.status || LeadStatus.New,
            newStatus: status,
            actorUserId: session.user.id
        }
    })

    await prisma.lead.update({
        where: { id: leadId },
        data: { status }
    })

    revalidatePath(`/dashboard/leads/${leadId}`)
    revalidatePath("/dashboard/leads")
}

export async function assignLead(leadId: string, userId: string) {
    const session = await getSession()
    if (!session) throw new Error("Unauthorized")

    await prisma.lead.update({
        where: { id: leadId },
        data: { assignedToUserId: userId }
    })

    revalidatePath(`/dashboard/leads/${leadId}`)
    revalidatePath("/dashboard/leads")
}

// --- REQUEST ACTIONS ---

export async function updateRequestStatus(requestId: string, status: RequestStatus) {
    const session = await getSession()
    if (!session) throw new Error("Unauthorized")

    await prisma.serviceRequest.update({
        where: { id: requestId },
        data: { status }
    })

    // Log activity
    await prisma.activityLog.create({
        data: {
            actorUserId: session.user.id,
            serviceRequestId: requestId,
            actionType: "STATUS_CHANGE",
            actionSummary: `Changed status to ${status}`
        }
    })

    revalidatePath(`/dashboard/requests/${requestId}`)
    revalidatePath("/dashboard/pipeline")
}

export async function assignRequest(requestId: string, userId: string) {
    const session = await getSession()
    if (!session) throw new Error("Unauthorized")

    await prisma.serviceRequest.update({
        where: { id: requestId },
        data: { assignedToUserId: userId }
    })

    // Log activity
    await prisma.activityLog.create({
        data: {
            actorUserId: session.user.id,
            serviceRequestId: requestId,
            actionType: "ASSIGNMENT",
            actionSummary: `Assigned request to user ${userId}`
        }
    })

    revalidatePath(`/dashboard/requests/${requestId}`)
    revalidatePath("/dashboard/pipeline")
}

// --- CONVERSION LOGIC ---

export async function convertLeadToRequest(leadId: string) {
    const session = await getSession()
    if (!session) throw new Error("Unauthorized")

    const lead = await prisma.lead.findUnique({
        where: { id: leadId },
        include: { documents: true }
    })

    if (!lead) throw new Error("Lead not found")
    if (lead.status === LeadStatus.Converted) throw new Error("Lead already converted")

    // 1. Create or Find Company
    const companyName = lead.companyName || `${lead.firstName} ${lead.lastName}`
    let company = await prisma.clientCompany.findFirst({
        where: { legalName: companyName } // Simple matching
    })

    if (!company) {
        company = await prisma.clientCompany.create({
            data: {
                legalName: companyName,
                // Add contact details?
                contacts: {
                    create: {
                        fullName: `${lead.firstName} ${lead.lastName}`,
                        email: lead.email,
                        phone: lead.phone,
                        isPrimary: true
                    }
                }
            }
        })
    }

    // 2. Create Request
    const request = await prisma.serviceRequest.create({
        data: {
            companyId: company.id,
            serviceType: lead.serviceType,
            priority: lead.priorityTag,
            description: lead.message,
            status: RequestStatus.New,
            leadId: lead.id, // THE LINK
            assignedToUserId: lead.assignedToUserId || session.user.id // Keep assignee or assign to actor
        }
    })

    // 3. Move Documents? (Optional: Copy them so Request has them too)
    // For now, we'll just link them via new Doc records targeting the Request
    if (lead.documents.length > 0) {
        for (const doc of lead.documents) {
            await prisma.document.create({
                data: {
                    companyId: company.id,
                    serviceRequestId: request.id,
                    type: "Other", // Map LeadDocType to DocType?
                    filename: doc.filename,
                    storageKey: doc.storageKey,
                    mimeType: doc.mimeType,
                    size: doc.size,
                    uploadedByUserId: session.user.id, // Or system
                    accessLevel: "InternalOnly"
                }
            })
        }
    }

    // 4. Update Lead Status
    await updateLeadStatus(leadId, LeadStatus.Converted)

    // 5. Log
    await prisma.activityLog.create({
        data: {
            actorUserId: session.user.id,
            serviceRequestId: request.id,
            actionType: "CONVERSION",
            actionSummary: `Converted from Lead ${lead.referenceId}`
        }
    })

    revalidatePath(`/dashboard/leads/${leadId}`)
    revalidatePath("/dashboard/pipeline")
    return request.id
}
