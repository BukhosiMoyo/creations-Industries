'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { RequestStatus, ServiceType, Priority } from "@prisma/client"
import { sendEmail } from "@/lib/email/send-email"
import { createNotification } from "@/lib/notifications"
import { getSession } from "@/lib/rbac"

export async function createServiceRequest(formData: FormData) {
    const companyName = formData.get("companyName") as string
    const serviceType = formData.get("serviceType") as ServiceType
    const priority = formData.get("priority") as Priority
    const description = formData.get("description") as string

    // Find or create company (simple logic for now)
    let company = await prisma.clientCompany.findFirst({
        where: { legalName: companyName }
    })

    if (!company) {
        company = await prisma.clientCompany.create({
            data: {
                legalName: companyName,
                // status field doesn't exist on ClientCompany
            }
        })
    }

    const request = await prisma.serviceRequest.create({
        data: {
            companyId: company.id,
            serviceType: serviceType,
            priority: priority,
            description: description,
            status: RequestStatus.New,
            // Assign to current user if they are staff? Or leave unassigned?
            // current logic leaves it unassigned
        }
    })

    // Try to get primary contact email for notification
    const primaryContact = await prisma.clientContact.findFirst({
        where: { companyId: company.id, isPrimary: true }
    })

    if (primaryContact && primaryContact.email) {
        await sendEmail({
            key: "lead.received.client", // Use 'lead.received' or 'request.received' generic template
            to: primaryContact.email,
            props: {
                firstName: primaryContact.fullName.split(" ")[0],
                serviceType: serviceType.replace(/([A-Z])/g, ' $1').trim(),
                brandName: "Creations"
            },
            relatedCompanyId: company.id,
            relatedServiceRequestId: request.id
        })
    }

    revalidatePath("/dashboard/pipeline")
    revalidatePath("/dashboard")
}
