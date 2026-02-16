import { Resend } from "resend";
import { render } from "@react-email/render";
import { prisma } from "@/lib/prisma";
import { EMAIL_TEMPLATES } from "./templates";
import * as React from "react";
import { EmailType } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');
const FROM_EMAIL = process.env.EMAIL_FROM || process.env.RESEND_FROM_EMAIL || "Creations <notifications@creations.africa>"; // Fallback

interface SendEmailOptions {
    key: string;
    to: string;
    props: Record<string, any>;
    relatedCompanyId?: string;
    relatedServiceRequestId?: string;
}

export async function sendEmail({ key, to, props, relatedCompanyId, relatedServiceRequestId }: SendEmailOptions) {
    // 1. Strict Env Check
    if (!process.env.RESEND_API_KEY) {
        const errorMsg = "RESEND_API_KEY is missing in environment variables.";
        console.error(errorMsg);
        // Log failure even if we can't send
        await logEmailEvent(key, to, "Unknown", "Failed", errorMsg, relatedCompanyId, relatedServiceRequestId);
        return { success: false, error: new Error(errorMsg) };
    }

    if (!process.env.RESEND_FROM_EMAIL && !process.env.EMAIL_FROM) {
        const errorMsg = "RESEND_FROM_EMAIL (or EMAIL_FROM) is missing in environment variables.";
        console.error(errorMsg);
        await logEmailEvent(key, to, "Unknown", "Failed", errorMsg, relatedCompanyId, relatedServiceRequestId);
        return { success: false, error: new Error(errorMsg) };
    }

    try {
        const TemplateComponent = EMAIL_TEMPLATES[key];
        if (!TemplateComponent) {
            throw new Error(`Email template not found: ${key}`);
        }

        // 1. Fetch template override from DB
        const templateOverride = await prisma.emailTemplate.findUnique({
            where: { key },
        });

        // 2. Prepare props (merge with defaults/overrides if needed)
        let finalProps = { ...props };

        // Merge body text overrides if they exist
        if (templateOverride?.body && typeof templateOverride.body === 'object') {
            finalProps = { ...finalProps, ...templateOverride.body };
        }

        // 3. Render HTML
        const emailHtml = await render(React.createElement(TemplateComponent, finalProps));

        // 4. Determine Subject
        // If subject is overridden in DB, use it. Otherwise use the one passed in or default.
        let subject = templateOverride?.subject || props.subject;

        if (!subject) {
            subject = DEFAULT_SUBJECTS[key] || "Notification from Creations";
        }

        // Replace variables in subject
        // e.g. "Welcome {{firstName}}" -> "Welcome Max"
        Object.keys(finalProps).forEach(varName => {
            if (typeof finalProps[varName] === 'string') {
                subject = subject.replace(new RegExp(`{{${varName}}}`, 'g'), finalProps[varName]);
            }
        });

        // 5. Send via Resend
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject,
            html: emailHtml,
        });

        if (error) {
            console.error("Resend Error:", error);
            await logEmailEvent(key, to, subject || "Notification", "Failed", error.message, relatedCompanyId, relatedServiceRequestId);
            return { success: false, error };
        }

        // 6. Log success
        await logEmailEvent(key, to, subject || "Notification", "Sent", data?.id, relatedCompanyId, relatedServiceRequestId);

        return { success: true, data };
    } catch (err: any) {
        console.error("Send Email Internal Error:", err);
        await logEmailEvent(key, to, "Unknown", "Failed", err.message, relatedCompanyId, relatedServiceRequestId);
        return { success: false, error: err };
    }
}

async function logEmailEvent(
    key: string,
    to: string,
    subject: string,
    status: string,
    messageIdOrError: string | undefined,
    companyId?: string,
    serviceRequestId?: string
) {
    // Map key to EmailType enum if possible, or fallback?
    // The Schema has an EmailType enum. We might need to extend it or map loosely.
    // For now, let's just pick 'StatusUpdate' as a generic fallback if we can't match exactly.
    let type: EmailType = EmailType.StatusUpdate;
    if (key.includes("lead")) type = EmailType.LeadReceived;
    if (key.includes("docs")) type = EmailType.DocsRequested;
    if (key.includes("reminder")) type = EmailType.Reminder;

    try {
        await prisma.emailEvent.create({
            data: {
                type,
                to,
                subject,
                status,
                providerMessageId: messageIdOrError,
                relatedCompanyId: companyId,
                relatedServiceRequestId: serviceRequestId,
            }
        });
    } catch (e) {
        console.error("Failed to log email event", e);
    }
}


// Simple default subject map for fallback
const DEFAULT_SUBJECTS: Record<string, string> = {
    "auth.welcome.client": "Welcome to {{brandName}} — your account is ready",
    "auth.verify-email": "Please verify your email address",
    "auth.password-reset.request": "Reset your {{brandName}} password",
    "auth.password-reset.success": "Your password has been updated",
    "lead.received.client": "We’ve received your request",
    "lead.new.internal": "New lead received — {{serviceType}}",
    "lead.abandoned.reminder-1": "You’re almost done — complete your request",
    "lead.converted.onboarded.client": "You’re officially onboarded",
    "request.created.client": "We've received your service request",
    "request.docs-needed.client": "Documents required to proceed",
    "request.completed.client": "Your request has been completed",
    "reminder.missing-docs.client": "Reminder: documents outstanding",
    "digest.daily.internal": "Daily summary — {{brandName}}",
    // Add others as needed
};
