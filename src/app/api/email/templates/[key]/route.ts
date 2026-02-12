import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { UserRole } from "@prisma/client";

export async function GET(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
    try {
        const user = await requireAuth();
        if (user.role !== UserRole.ADMIN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { key } = await params; // Next.js 15+ needs await params? Using 16.1.6.

        const template = await prisma.emailTemplate.findUnique({
            where: { key },
        });

        // If not found in DB, return nulls (default state)
        if (!template) {
            return NextResponse.json({
                key,
                subject: null,
                preheader: null,
                body: null,
            });
        }

        return NextResponse.json(template);
    } catch (error) {
        console.error("GET email template error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
    try {
        const user = await requireAuth();
        if (user.role !== UserRole.ADMIN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { key } = await params;
        const body = await req.json();
        const { subject, preheader, body: bodyContent } = body;

        const template = await prisma.emailTemplate.upsert({
            where: { key },
            update: {
                subject,
                preheader,
                body: bodyContent ?? undefined, // Only update if provided? Or nullable?
                lastEditedBy: user.id,
            },
            create: {
                key,
                subject,
                preheader,
                body: bodyContent ?? undefined,
                lastEditedBy: user.id,
            },
        });

        return NextResponse.json(template);
    } catch (error) {
        console.error("UPDATE email template error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
