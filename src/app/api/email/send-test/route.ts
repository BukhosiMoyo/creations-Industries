import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send-email";
import { requireAuth } from "@/lib/rbac";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const user = await requireAuth();
        if (user.role !== UserRole.ADMIN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { key, to } = body;

        if (!to) {
            return NextResponse.json({ error: "Recipient email required" }, { status: 400 });
        }

        const result = await sendEmail({
            key,
            to,
            props: {}, // Send with default props
            // No related entity for test
        });

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Send test email error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
