import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { resend } from "@/lib/email/resend";
import { generateReferenceId } from "@/lib/leads/utils";
import NewLeadEmail from "@/lib/email/templates/new-lead";
import ClientConfirmationEmail from "@/lib/email/templates/client-confirmation";
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
        const { error: adminError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: process.env.BUSINESS_EMAIL || 'delivered@resend.dev',
            subject: `New Enquiry: ${data.subject || 'Contact Form'} (${referenceId})`,
            react: NewLeadEmail({
                referenceId,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                companyName: 'N/A (Contact Form)',
                services: [],
                description: data.message,
                source: 'Contact Form',
                date,
            }) as React.ReactElement,
        });

        if (adminError) {
            console.error("Resend Admin Error:", adminError);
            // We don't fail the request if email fails but DB succeeded, just log it. 
            // Or maybe we should alert? For now, silent log is fine for user experience.
        }

        // 5. Send Client Confirmation
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: data.email,
            subject: `We've received your enquiry - Creations (${referenceId})`,
            react: ClientConfirmationEmail({
                referenceId,
                name: data.firstName,
            }) as React.ReactElement,
        });

        return NextResponse.json({ success: true, referenceId });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
