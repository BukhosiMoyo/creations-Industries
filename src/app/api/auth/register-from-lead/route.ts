import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import bcrypt from "bcrypt"
import { sendEmail } from "@/lib/email/send-email"

const RegisterSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validation = RegisterSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json({ error: "Invalid data", details: validation.error.format() }, { status: 400 })
        }

        const { token, password } = validation.data

        // 1. Verify Token
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

        const leadToken = await prisma.leadPortalToken.findUnique({
            where: { tokenHash },
            include: { lead: true }
        })

        if (!leadToken) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 })
        }

        if (leadToken.expiresAt < new Date()) {
            return NextResponse.json({ error: "Token expired" }, { status: 403 })
        }

        const lead = leadToken.lead

        // 2. Check if User exists
        const existingUser = await prisma.user.findUnique({
            where: { email: lead.email }
        })

        if (existingUser) {
            return NextResponse.json({ error: "Account already exists. Please log in." }, { status: 409 })
        }

        // 3. Create User
        const hashedPassword = await bcrypt.hash(password, 10)

        // Extract companyId from lead metadata if available
        const metadata = (lead.metadata as any) || {}
        const companyId = metadata.companyId

        // Extract names safely
        const firstName = lead.firstName || "Client"
        const lastName = lead.lastName || ""

        const user = await prisma.user.create({
            data: {
                email: lead.email,
                firstName: firstName,
                lastName: lastName,
                name: `${firstName} ${lastName}`.trim(),
                password: hashedPassword,
                role: "CLIENT",
                companyId: companyId, // Link to the company created during submit
                emailVerified: new Date(), // Trusted from this flow
                status: "ACTIVE"
            }
        })

        // 4. Send Welcome Email
        const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`

        await sendEmail({
            key: "auth.welcome.linked",
            to: user.email!,
            props: {
                firstName: user.firstName,
                dashboardUrl: dashboardUrl,
                brandName: "Creations Accounting"
            },
            relatedCompanyId: companyId
        })

        // 5. Cleanup Token
        await prisma.leadPortalToken.delete({
            where: { id: leadToken.id }
        })

        return NextResponse.json({ success: true, userId: user.id })

    } catch (error) {
        console.error("Register from Lead Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
