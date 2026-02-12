import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { logActivity } from "@/lib/audit";
import * as z from "zod";

const contactSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    roleTitle: z.string().optional(),
    isPrimary: z.boolean().default(false),
});

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAuth();

        const contacts = await prisma.clientContact.findMany({
            where: { companyId: params.id },
            orderBy: { isPrimary: "desc" },
        });

        return NextResponse.json(contacts);
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAuth();
        const body = await req.json();
        const data = contactSchema.parse(body);

        // If setting as primary, unset others for this company
        if (data.isPrimary) {
            await prisma.clientContact.updateMany({
                where: { companyId: params.id },
                data: { isPrimary: false },
            });
        }

        const contact = await prisma.clientContact.create({
            data: {
                ...data,
                companyId: params.id,
            },
        });

        await logActivity({
            companyId: params.id,
            actionType: "CONTACT_CREATE",
            actionSummary: `Added contact ${contact.fullName} to company`,
            metadata: { contactId: contact.id },
        });

        return NextResponse.json(contact, { status: 201 });
    } catch (error: unknown) {
        console.error("POST contact error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
