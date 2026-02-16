
import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { ServiceCategories, getPrismaServiceType } from "@/lib/quote-catalog"


// Validation Schema for Step 1
const DraftSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(10),
    city: z.string().optional(),
    urgency: z.string().optional(),
    serviceSlug: z.string().optional(), // Latest selection
    category: z.enum([...ServiceCategories] as [string, ...string[]]).optional(),
    services: z.array(z.any()).optional(), // Multi-service array
    metadata: z.record(z.string(), z.any()).optional()
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        // console.log("Draft API Received Body:", JSON.stringify(body, null, 2))

        const validation = DraftSchema.safeParse(body)

        if (!validation.success) {
            console.error("Draft API Validation Error:", JSON.stringify(validation.error.format(), null, 2))
            return NextResponse.json({ error: "Invalid data", details: validation.error.format() }, { status: 400 })
        }

        const data = validation.data

        // Generate a resume token (simple fallback without crypto)
        const resumeToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
        const referenceId = `LEAD-${Date.now().toString().slice(-6)}`

        // Map category to Prisma ServiceType (best effort)
        const mainCategory = data.services?.[0]?.category || data.category
        const mainSlug = data.services?.[0]?.slug || data.serviceSlug

        let prismaServiceType = getPrismaServiceType(mainCategory, mainSlug)

        // Helper: Map City to LeadLocation Enum
        const city = data.city || "";
        let location: any = "Other";
        let freeTextLocation: string | undefined = undefined;

        if (["Johannesburg", "Pretoria", "Sandton"].includes(city)) {
            location = city;
        } else {
            location = "Other";
            freeTextLocation = city; // Store actual city name e.g. "Centurion"
        }

        // Helper: Map Urgency to LeadUrgency Enum
        const urgencyInput = data.urgency || "";
        let urgency: any = "Soon_7d";
        if (["Urgent_24_48h", "Soon_7d", "Flexible_30d"].includes(urgencyInput)) {
            urgency = urgencyInput;
        }

        // Construct Message
        const serviceCount = data.services?.length || 0
        const servicesList = data.services?.map((s: any) => s.slug).join(", ") || data.serviceSlug || "Unknown Service"
        const message = serviceCount > 1
            ? `Draft Multi-Quote (${serviceCount}): ${servicesList}`
            : `Draft Quote: ${servicesList}`

        const lead = await prisma.lead.create({
            data: {
                referenceId,
                firstName: data.fullName.split(" ")[0],
                lastName: data.fullName.split(" ").slice(1).join(" ") || "Unknown",
                email: data.email,
                phone: data.phone,
                location: location,
                freeTextLocation: freeTextLocation,
                urgency: urgency,
                status: "Incomplete", // Using Incomplete or New? Enum has Incomplete.
                serviceType: prismaServiceType as any,
                message: message,
                resumeToken,
                // @ts-ignore
                metadata: {
                    ...(data.metadata || {}),
                    services: data.services, // Store the array!
                    serviceSlug: data.serviceSlug,
                    category: data.category,
                    city: data.city,
                    step: 1
                } as any
            }
        })

        return NextResponse.json({
            success: true,
            leadId: lead.id,
            resumeToken,
            referenceId
        })

    } catch (error) {
        console.error("Draft Lead Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
