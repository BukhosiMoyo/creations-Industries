
import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { ServiceCategories } from "@/lib/quote-catalog"


// Validation Schema for Step 1
const DraftSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(10),
    city: z.string().optional(),
    urgency: z.string().optional(),
    serviceSlug: z.string().optional(), // We store the specific slug in metadata
    category: z.enum([...ServiceCategories] as [string, ...string[]]).optional(),
    metadata: z.record(z.string(), z.any()).optional()
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log("Draft API Received Body:", JSON.stringify(body, null, 2))

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
        let prismaServiceType: any = "Other"
        if (data.category === "Accounting Services") prismaServiceType = "Accounting"
        if (data.category === "Tax & SARS Services") prismaServiceType = "Tax"
        if (data.category === "Bookkeeping Services") prismaServiceType = "Bookkeeping"
        if (data.category === "Company & CIPC Services") prismaServiceType = "CIPC" // Using CIPC as closest match
        if (data.category === "Shelf Companies") prismaServiceType = "ShelfCompany" // Singular in enum maybe? Cast to any to be safe
        if (data.category === "Compliance & Registrations") prismaServiceType = "Compliance"

        // Refine with slug if available (duplicates logic from submit but safe for draft)
        if (data.serviceSlug?.includes("payroll")) prismaServiceType = "Payroll"
        if (data.serviceSlug?.includes("trust")) prismaServiceType = "Trusts"

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
                message: `Draft Quote: ${data.serviceSlug || "Unknown Service"}`,
                resumeToken,
                // @ts-ignore
                metadata: {
                    ...(data.metadata || {}),
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
