
import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const PatchSchema = z.object({
    leadId: z.string(),
    resumeToken: z.string(),
    category: z.string().optional(),
    serviceSlug: z.string().optional(),
    description: z.string().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
    lastStepCompleted: z.number().optional()
})

export async function PATCH(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params
        const body = await req.json()
        const leadId = params.id

        const validation = PatchSchema.safeParse({ ...body, leadId })

        if (!validation.success) {
            return NextResponse.json({ error: "Invalid data", details: validation.error.format() }, { status: 400 })
        }

        const data = validation.data

        // 1. Verify Lead exists and token matches
        const existingLead = await prisma.lead.findUnique({
            where: { id: leadId }
        })

        if (!existingLead || existingLead.resumeToken !== data.resumeToken) {
            return NextResponse.json({ error: "Unauthorized or Lead not found" }, { status: 403 })
        }

        // 2. Update Lead
        const updatedLead = await prisma.lead.update({
            where: { id: leadId },
            data: {
                // Update basic fields if provided
                ...(data.lastStepCompleted ? { lastStepCompleted: data.lastStepCompleted } : {}),
                ...(data.category ? { serviceType: "Other" } : {}), // Mapping logic needed? We store category in metadata for now as ServiceType enum might not match perfectly yet
                // Actually, let's keep serviceType as is or map it if possible. 
                // For now, we rely on metadata for the specific category/slug.

                // Merge metadata
                // @ts-ignore
                metadata: {
                    // @ts-ignore
                    ...(existingLead.metadata as any || {}),
                    ...(data.category ? { category: data.category } : {}),
                    ...(data.serviceSlug ? { serviceSlug: data.serviceSlug } : {}),
                    ...(data.metadata || {}),
                    lastUpdated: new Date().toISOString()
                } as any
            }
        })

        return NextResponse.json({ success: true, lead: updatedLead })

    } catch (error) {
        console.error("Patch Lead Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
