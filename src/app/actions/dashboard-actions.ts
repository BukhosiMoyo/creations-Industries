'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { RequestStatus, ServiceType, Priority } from "@prisma/client"

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

    await prisma.serviceRequest.create({
        data: {
            // workspaceId field doesn't exist on ServiceRequest
            companyId: company.id,
            serviceType: serviceType,
            priority: priority,
            description: description,
            status: RequestStatus.New
        }
    })

    revalidatePath("/dashboard/pipeline")
    revalidatePath("/dashboard")
}
