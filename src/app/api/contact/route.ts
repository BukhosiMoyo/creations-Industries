import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { sendEmail } from "@/lib/email/send-email"; // Generic Helper
import { generateReferenceId } from "@/lib/leads/utils";
import { prisma } from "@/lib/prisma";
import { ServiceType, LeadSource } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Honeypot Check
        if (body._honey) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // 2. Validation
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.format() },
                { status: 400 }
            );
        }

        const data = result.data;
        const referenceId = generateReferenceId();
        const date = new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' });

        // 3. Save to Database
        const lead = await prisma.lead.create({
            data: {
                referenceId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                companyName: "N/A", // Contact form doesn't compel company
                message: `Subject: ${data.subject}\n\n${data.message}`,
                serviceType: ServiceType.Other,
                source: LeadSource.Website,
                // Defaults: status=New, urgency=Soon_7d, etc.
            }
        });

        // 4. Send Internal Email
        await sendEmail({
            key: "lead.new.internal",
            to: process.env.BUSINESS_EMAIL || 'delivered@resend.dev',
            props: {
                referenceId,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                companyName: 'N/A (Contact Form)',
                services: [],
                description: data.message,
                source: 'Contact Form',
                date,
            }
        });

        // 5. Send Client Confirmation
        await sendEmail({
            key: "lead.received.client",
            to: data.email,
            props: {
                referenceId,
                name: data.firstName,
                firstName: data.firstName,
                brandName: "Creations"
            }
        });

        return NextResponse.json({ success: true, referenceId });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
