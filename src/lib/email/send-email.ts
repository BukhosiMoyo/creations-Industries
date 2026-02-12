import { Resend } from "resend";
import { render } from "@react-email/render";
import { prisma } from "@/lib/prisma";
import { EMAIL_TEMPLATES } from "./templates";
import * as React from "react";
import { EmailType } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");
const FROM_EMAIL = process.env.EMAIL_FROM || "Creations <notifications@creationsweb.za>"; // Fallback

interface SendEmailOptions {
    key: string;
    to: string;
    props: Record<string, any>;
    relatedCompanyId?: string;
    relatedServiceRequestId?: string;
}

export async function sendEmail({ key, to, props, relatedCompanyId, relatedServiceRequestId }: SendEmailOptions) {
    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing");
        return { success: false, error: new Error("RESEND_API_KEY is missing") };
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
        // For simple text overrides, we pass them as props if the component supports them.
        // The components utilize props for dynamic content.
        // If 'body' overrides existed in DB as JSON, we would merge them here.
        // Currently, we just use the props passed in.
        const finalProps = { ...props };

        // If the DB has specific subject/preheader overrides, we might want to use them.
        // However, Resend 'subject' is separate. React Email 'preview' is preheader.
        // We'll prioritize the DB subject if it exists, otherwise use a default (which might need to be passed in or defined in a config).
        // For now, let's assume the caller passes the subject or we rely on the template's internal Preview/Heading?
        // Actually, Resend needs a subject string.
        // We should probably define default subjects in the registry or a separate config.
        // For this MVP, I'll assume the props might contain 'subject' or we assume a default.
        // But the prompt says "Admin can edit subject... per templateKey".

        // Let's rely on the DB override for subject, or a sensible default if we can map it.
        // I will add a helper to get default subject/preheader below if needed, but for now let's use what we have.

        let subject = templateOverride?.subject;

        if (!subject) {
            // Fallback default subjects (simple map)
            // Ideally this should be in the DB seed or a config file.
            // For now, I'll generate a subject based on the key if missing? Or just generic.
            // Or better, fetch from a local map.
            subject = DEFAULT_SUBJECTS[key] || "Notification from Creations";
        }

        // Replace variables in subject
        // e.g. "Welcome {{firstName}}" -> "Welcome Max"
        Object.keys(finalProps).forEach(varName => {
            subject = subject?.replace(new RegExp(`{{${varName}}}`, 'g'), finalProps[varName]);
        });


        // 3. Render HTML
        const emailHtml = await render(React.createElement(TemplateComponent, finalProps));

        // 4. Send via Resend
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject: subject || "Notification",
            html: emailHtml,
        });

        if (error) {
            console.error("Resend Error:", error);
            await logEmailEvent(key, to, subject || "Notification", "Failed", error.message, relatedCompanyId, relatedServiceRequestId);
            return { success: false, error };
        }

        // 5. Log success
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
    // Or we should update the enum. The prompt listed keys that don't perfectly match the Enum.
    // I'll leave it as StatusUpdate for safety or try to map.

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
    "request.docs-needed.client": "Documents required to proceed",
    "request.completed.client": "Your request has been completed",
    "reminder.missing-docs.client": "Reminder: documents outstanding",
    "digest.daily.internal": "Daily summary — {{brandName}}",
    // Add others as needed
};
