
import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { ServiceType } from "@prisma/client"

// Schema
const SubmitSchema = z.object({
    leadId: z.string(),
    resumeToken: z.string().optional(),
    businessDetails: z.any().optional(),
    serviceDetails: z.any().optional()
})

// Helper: Map Slug/Category to ServiceType Enum
function mapServiceType(category: string | undefined, slug: string | undefined): any {
    if (!slug) return "Other"

    // Specific Slugs
    if (slug.includes("payroll")) return "Payroll"
    if (slug.includes("shelf")) return "ShelfCompany" // Cast as any due to stale client issues potentially
    if (slug.includes("trust")) return "Trusts"
    if (slug.includes("registration")) return "Registration"
    if (slug.includes("compliance")) return "Compliance"

    // Category Fallback
    switch (category) {
        case "Accounting Services": return "Accounting"
        case "Tax & SARS Services": return "Tax"
        case "Bookkeeping Services": return "Bookkeeping"
        case "Company & CIPC Services": return "CIPC"
        case "Compliance & Registrations": return "Compliance"
        case "Shelf Companies": return "ShelfCompany"
        default: return "Other"
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validation = SubmitSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json({ error: "Invalid data", details: validation.error.format() }, { status: 400 })
        }

        const { leadId, resumeToken, businessDetails, serviceDetails } = validation.data

        // 1. Verify Lead
        const lead = await prisma.lead.findUnique({
            where: { id: leadId }
        })

        if (!lead || (resumeToken && lead.resumeToken !== resumeToken)) {
            return NextResponse.json({ error: "Unauthorized or Lead not found" }, { status: 403 })
        }

        const metadata = (lead as any).metadata || {}
        const category = metadata.category || "Unknown"
        const serviceSlug = metadata.serviceSlug || "unknown-service"

        // 2. Determine Service Type
        const serviceType = mapServiceType(category, serviceSlug)

        // 3. Find or Create Client Company
        // Check businessDetails first for company name
        const submittedCompanyName = businessDetails?.companyName
        const companyName = submittedCompanyName || lead.companyName || `${lead.fullName} (Personal)`

        // Resolve address from location enum/text
        // @ts-ignore
        const address = lead.location === "Other" ? ((lead as any).freeTextLocation || "") : lead.location

        // Upsert company (match by name for now as we don't have unique ID yet)
        let company = await prisma.clientCompany.findFirst({
            where: { legalName: companyName }
        })

        if (!company) {
            company = await prisma.clientCompany.create({
                data: {
                    legalName: companyName,
                    tradingName: companyName,
                    address: address,
                    primaryContactId: lead.id,
                }
            })
        }

        // 4. Create Service Request
        const description = `
Service: ${category} - ${serviceSlug}
Details: ${JSON.stringify(businessDetails, null, 2)}
        `.trim()

        const request = await prisma.serviceRequest.create({
            data: {
                companyId: company.id,
                serviceType: serviceType as any,
                status: "New",
                priority: "Med",
                description: description,
            }
        })

        // 5. Update Lead Status
        await prisma.lead.update({
            where: { id: leadId },
            data: {
                status: "Converted",
                metadata: {
                    ...metadata,
                    serviceRequestId: request.id,
                    companyId: company.id,
                    submittedAt: new Date().toISOString()
                } as any
            }
        })

        return NextResponse.json({ success: true, serviceRequestId: request.id })

    } catch (error) {
        console.error("Submit Lead Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
