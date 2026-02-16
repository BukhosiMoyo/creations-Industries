'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { LeadStatus, RequestStatus, ServiceType, Priority } from "@prisma/client"
import { getSession } from "@/lib/rbac"
import { createNotification } from "@/lib/notifications"

// --- LEAD ACTIONS ---

import { trackServerEvent } from "@/app/actions/analytics"

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

    await trackServerEvent({
        eventType: "LEAD_STAGE_CHANGED",
        leadId,
        userId: session.user.id,
        metadata: { status }
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

    await trackServerEvent({
        eventType: "LEAD_ASSIGNED",
        leadId,
        userId: session.user.id,
        metadata: { assignedToUserId: userId }
    })

    if (userId !== session.user.id) {
        await createNotification({
            userId,
            title: "Lead Assigned",
            message: "You have been assigned to a lead.", // TODO: Fetch company name for better message
            severity: "INFO",
            category: "LEAD",
            link: `/dashboard/leads/${leadId}`,
            relatedLeadId: leadId
        })
    }

    revalidatePath(`/dashboard/leads/${leadId}`)
    revalidatePath("/dashboard/leads")
}

// --- REQUEST ACTIONS ---

import { sendEmail } from "@/lib/email/send-email"

export async function updateRequestStatus(requestId: string, status: RequestStatus) {
    const session = await getSession()
    if (!session) throw new Error("Unauthorized")

    // Fetch existing request to get company details for email
    const request = await prisma.serviceRequest.findUnique({
        where: { id: requestId },
        include: {
            company: {
                include: {
                    contacts: {
                        where: { isPrimary: true }
                    }
                }
            }
        }
    })

    if (!request) throw new Error("Request not found")

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

    await trackServerEvent({
        eventType: status === RequestStatus.Completed ? "REQUEST_COMPLETED" : "REQUEST_STAGE_CHANGED",
        requestId,
        userId: session.user.id,
        metadata: { status }
    })

    // Send Notification Emails
    const primaryContact = request.company.contacts[0]
    if (primaryContact && primaryContact.email) {
        if (status === RequestStatus.AwaitingDocs) {
            await sendEmail({
                key: "request.docs-needed.client",
                to: primaryContact.email,
                props: {
                    serviceType: request.serviceType.replace(/([A-Z])/g, ' $1').trim(),
                    portalUrl: `${process.env.NEXT_PUBLIC_APP_URL}/portal/requests/${requestId}`
                },
                relatedCompanyId: request.companyId,
                relatedServiceRequestId: requestId
            })
        } else if (status === RequestStatus.Completed) {
            await sendEmail({
                key: "request.completed.client",
                to: primaryContact.email,
                props: {
                    serviceType: request.serviceType.replace(/([A-Z])/g, ' $1').trim(),
                    brandName: "Creations",
                    portalUrl: `${process.env.NEXT_PUBLIC_APP_URL}/portal/requests/${requestId}`
                },
                relatedCompanyId: request.companyId,
                relatedServiceRequestId: requestId
            })
        }
    }

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

    if (userId !== session.user.id) {
        await createNotification({
            userId,
            title: "Request Assigned",
            message: "You have been assigned to a service request.",
            severity: "INFO",
            category: "REQUEST",
            link: `/dashboard/requests/${requestId}`,
            relatedRequestId: requestId
        })
    }

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

    await trackServerEvent({
        eventType: "LEAD_CONVERTED_TO_REQUEST",
        leadId,
        requestId: request.id,
        userId: session.user.id,
        metadata: { companyId: company.id }
    })

    // Notify the user who performed the conversion (success feedback)
    await createNotification({
        userId: session.user.id,
        title: "Lead Converted",
        message: `Successfully converted ${companyName} to a service request.`,
        severity: "SUCCESS",
        category: "LEAD",
        link: `/dashboard/requests/${request.id}`
    });

    // Notify assigned user if different from actor
    if (request.assignedToUserId && request.assignedToUserId !== session.user.id) {
        await createNotification({
            userId: request.assignedToUserId,
            title: "New Request from Lead",
            message: `Lead ${companyName} has been converted and assigned to you.`,
            severity: "INFO",
            category: "REQUEST",
            link: `/dashboard/requests/${request.id}`,
            relatedRequestId: request.id
        });
    }

    revalidatePath(`/dashboard/leads/${leadId}`)
    revalidatePath("/dashboard/pipeline")
    return request.id
}

// --- GENERAL CRM ACTIONS ---

export async function getClients() {
    const session = await getSession()
    if (!session) throw new Error("Unauthorized")

    return prisma.clientCompany.findMany({
        orderBy: { legalName: 'asc' },
        select: {
            id: true,
            legalName: true,
            tradingName: true
        }
    })
}
