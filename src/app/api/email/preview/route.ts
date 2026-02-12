import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import { EMAIL_TEMPLATES } from "@/lib/email/templates";
import * as React from "react";
import { requireAuth } from "@/lib/rbac";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const user = await requireAuth();
        if (user.role !== UserRole.ADMIN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { key, subject, preheader, props } = body;

        const TemplateComponent = EMAIL_TEMPLATES[key];
        if (!TemplateComponent) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }

        // Mock props for preview if not provided
        // We should probably have a "default props" export in templates.ts or similar
        // For now, I'll rely on the template default props or the passed props.
        const previewProps = { ...props };

        // Render
        const html = await render(React.createElement(TemplateComponent, previewProps));

        return new NextResponse(html, {
            headers: {
                "Content-Type": "text/html",
            },
        });
    } catch (error) {
        console.error("Preview email error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
