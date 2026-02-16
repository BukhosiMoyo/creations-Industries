
import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { ServiceType } from "@prisma/client"
import crypto from "crypto"
import { sendEmail } from "@/lib/email/send-email"

// Schema
const SubmitSchema = z.object({
    leadId: z.string(),
    resumeToken: z.string().optional(),
    contactData: z.any().optional(),
    services: z.array(z.object({
        category: z.string(),
        slug: z.string(),
        details: z.any().optional()
    })).optional(),
    // Legacy support (optional)
    businessDetails: z.any().optional(),
    serviceDetails: z.any().optional()
})

import { ServiceCategories, getPrismaServiceType } from "@/lib/quote-catalog"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const validation = SubmitSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json({ error: "Invalid data", details: validation.error.format() }, { status: 400 })
        }

        const { leadId, resumeToken, contactData, services } = validation.data

        // 1. Verify Lead
        const lead = await prisma.lead.findUnique({
            where: { id: leadId }
        })

        if (!lead || (resumeToken && lead.resumeToken !== resumeToken)) {
            return NextResponse.json({ error: "Unauthorized or Lead not found" }, { status: 403 })
        }

        const metadata = (lead as any).metadata || {}

        // 2. Identify Company Name
        // Try to find company name in any of the service details or lead data
        let submittedCompanyName = lead.companyName
        if (!submittedCompanyName && services && services.length > 0) {
            // Look for companyName in the details of the first service that has it
            for (const s of services) {
                if (s.details?.companyName) {
                    submittedCompanyName = s.details.companyName
                    break
                }
            }
        }

        const companyName = submittedCompanyName || `${lead.fullName} (Personal)`

        // Resolve address from location enum/text
        // @ts-ignore
        const address = lead.location === "Other" ? ((lead as any).freeTextLocation || "") : lead.location

        // 3. Find or Create Client Company
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

        // 4. Create Service Requests (Batch)
        const requests = []
        if (services && services.length > 0) {
            for (const service of services) {
                const serviceType = getPrismaServiceType(service.category, service.slug)
                const description = `
Service: ${service.category} - ${service.slug}
Details: ${JSON.stringify(service.details || {}, null, 2)}
                `.trim()

                const req = await prisma.serviceRequest.create({
                    data: {
                        companyId: company.id,
                        serviceType: serviceType as any,
                        status: "New",
                        priority: "Med",
                        description: description,
                        leadId: lead.id // Link request to lead consistency
                    }
                })
                requests.push(req)
            }
        } else {
            // Fallback for legacy calls without services array
            // use metadata or body legacy fields
            // ... omitted for brevity as we upgraded frontend
        }

        // 5. Update Lead Status
        await prisma.lead.update({
            where: { id: leadId },
            data: {
                status: "Converted",
                metadata: {
                    ...metadata,
                    companyId: company.id,
                    submittedAt: new Date().toISOString(),
                    serviceRequestIds: requests.map(r => r.id),
                    servicesDump: services // backup full dump
                } as any
            }
        })

        // ---------------------------------------------------------------------
        // NEW: Account Linking & Notification Logic
        // ---------------------------------------------------------------------

        // A. Check if User already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: lead.email }
        })

        // B. Generate Tracking Token
        // We generate a raw token to send to the user, and store a hash in DB.
        const rawToken = crypto.randomBytes(32).toString('hex')
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
        const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000) // 72 hours

        // C. Store Token
        await prisma.leadPortalToken.create({
            data: {
                leadId: lead.id,
                tokenHash,
                expiresAt
            }
        })

        // D. Send Notification Email
        // Construct Track URL (Create Account or Login page with token?)
        // If user exists -> Login page. If new -> Create Account page.
        // For simplicity, we point to a /track route that handles redirection, 
        // OR we point to the main dashboard/login and handle the token via query param.
        // Let's assume /track/[token] or /track?token=...
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        const trackUrl = `${baseUrl}/track?token=${rawToken}`

        await sendEmail({
            key: "lead.track.request",
            to: lead.email,
            props: {
                serviceType: services?.[0]?.category || "General Service", // Simplification
                leadId: lead.referenceId,
                urgency: lead.urgency,
                trackUrl: trackUrl,
                brandName: "Creations Accounting"
            },
            relatedCompanyId: company.id,
            relatedServiceRequestId: requests[0]?.id
        })

        // ---------------------------------------------------------------------

        return NextResponse.json({
            success: true,
            count: requests.length,
            serviceRequestIds: requests.map(r => r.id),
            // Return tokens for the frontend modal flow
            trackingToken: rawToken,
            userExists: !!existingUser
        })

    } catch (error) {
        console.error("Submit Lead Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
