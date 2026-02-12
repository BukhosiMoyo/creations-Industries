import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EMAIL_KEYS } from "@/lib/email/templates";
import { requireAuth } from "@/lib/rbac"; // Assumption: we have RBAC
import { UserRole } from "@prisma/client";

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth();
        if (user.role !== UserRole.ADMIN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Fetch overrides
        const storedTemplates = await prisma.emailTemplate.findMany();

        // Merge with all known keys to ensure we return the full list even if not in DB
        const templates = EMAIL_KEYS.map(key => {
            const stored = storedTemplates.find(t => t.key === key);
            return {
                key,
                subject: stored?.subject || null,
                updatedAt: stored?.updatedAt || null,
                lastEditedBy: stored?.lastEditedBy || null,
            };
        });

        return NextResponse.json(templates);
    } catch (error) {
        console.error("GET email templates error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
