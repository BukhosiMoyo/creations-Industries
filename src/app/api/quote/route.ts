import { NextRequest, NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schemas";
import { resend } from "@/lib/email/resend";
import { generateReferenceId } from "@/lib/leads/utils";
import NewLeadEmail from "@/lib/email/templates/new-lead";
import ClientConfirmationEmail from "@/lib/email/templates/client-confirmation";
import { prisma } from "@/lib/prisma";
import { ServiceType, LeadSource } from "@prisma/client";

function mapServiceType(serviceId: string): ServiceType {
    switch (serviceId) {
        case "bookkeeping": return ServiceType.Bookkeeping;
        case "accounting": return ServiceType.Accounting;
        case "tax": return ServiceType.Tax;
        case "payroll": return ServiceType.Payroll;
        case "cipc": return ServiceType.CIPC;
        case "advisory": return ServiceType.Advisory;
        case "tender": return ServiceType.TenderReadiness;
        default: return ServiceType.Other;
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Honeypot check
        if (body._honey) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // 2. Validation
        const result = quoteSchema.safeParse(body);
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
        // We pick the first service as the primary type, or Other if none.
        const primaryService = data.services.length > 0 ? mapServiceType(data.services[0]) : ServiceType.Other;

        await prisma.lead.create({
            data: {
                referenceId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                companyName: data.companyName,
                // We combine industry and services into the message/notes for now since Lead model matches simplistic structure
                message: `Industry: ${data.industry}\nServices Requested: ${data.services.join(", ")}\n\n${data.message || ''}`,
                serviceType: primaryService,
                source: LeadSource.Website, // Or we could add a QuoteForm specific source if we wanted, but Website is fine.
            }
        });

        // 4. Send Internal Email
        const { error: adminError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: process.env.BUSINESS_EMAIL || 'delivered@resend.dev',
            subject: `New Quote Request: ${data.companyName} (${referenceId})`,
            react: NewLeadEmail({
                referenceId,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                companyName: data.companyName,
                industry: data.industry,
                services: data.services,
                description: data.message,
                source: 'Quote Wizard',
                date,
            }) as React.ReactElement,
        });

        if (adminError) {
            console.error("Resend Admin Error:", adminError);
        }

        // 5. Send Client Confirmation
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: data.email,
            subject: `We've received your quote request - Creations (${referenceId})`,
            react: ClientConfirmationEmail({
                referenceId,
                name: data.firstName,
            }) as React.ReactElement,
        });

        return NextResponse.json({ success: true, referenceId });

    } catch (error) {
        console.error("Quote API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
