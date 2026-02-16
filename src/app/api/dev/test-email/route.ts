import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/rbac";
import { sendEmail } from "@/lib/email/send-email";
import { EMAIL_TEMPLATES } from "@/lib/email/templates";

// Guard: Only allow in development or if user is ADMIN
export async function POST(req: NextRequest) {
    const session = await getSession();

    // Strict Guard: Admin Only
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { templateKey, toEmail, props } = body;

        if (!templateKey || !toEmail) {
            return NextResponse.json({ error: "Missing templateKey or toEmail" }, { status: 400 });
        }

        if (!EMAIL_TEMPLATES[templateKey]) {
            return NextResponse.json({ error: `Invalid template key: ${templateKey}` }, { status: 400 });
        }

        const result = await sendEmail({
            key: templateKey,
            to: toEmail,
            props: props || {},
            // We can add dummy IDs for logging if needed
            relatedCompanyId: "test-company-id",
            relatedServiceRequestId: "test-request-id"
        });

        if (!result.success) {
            return NextResponse.json({ error: result.error?.message || "Failed to send" }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: result.data });

    } catch (error: any) {
        console.error("Test Email Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
