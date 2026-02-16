
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 })
    }

    try {
        const lead = await prisma.lead.findUnique({
            where: { resumeToken: token }
        })

        if (!lead || lead.status !== "Incomplete") {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            lead: {
                id: lead.id,
                fullName: `${lead.firstName} ${lead.lastName}`.trim(),
                email: lead.email,
                phone: lead.phone,
                city: lead.location,
                // @ts-ignore
                metadata: lead.metadata
            }
        })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
