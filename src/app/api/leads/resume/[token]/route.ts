import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * Lead Resume API
 * Resumes an incomplete onboarding session via token.
 */
export async function GET(
    req: NextRequest,
    { params }: { params: { token: string } }
) {
    try {
        const lead = await prisma.lead.findUnique({
            where: { resumeToken: params.token },
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                companyName: true,
                websiteUrl: true,
                serviceType: true,
                location: true,
                urgency: true,
                budgetRange: true,
                message: true,
                lastStepCompleted: true,
                status: true,
            }
        })

        if (!lead) {
            return NextResponse.json({ error: "Invalid or expired resume link" }, { status: 404 })
        }

        return NextResponse.json(lead)

    } catch (error) {
        console.error("Resume API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
