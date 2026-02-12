import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { logActivity } from "@/lib/audit";
import * as z from "zod";

const companyUpdateSchema = z.object({
    legalName: z.string().min(2).optional(),
    tradingName: z.string().optional(),
    registrationNumber: z.string().optional(),
    vatNumber: z.string().optional(),
    payeNumber: z.string().optional(),
    uifNumber: z.string().optional(),
    sdlNumber: z.string().optional(),
    industry: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    country: z.string().optional(),
    primaryContactId: z.string().optional(),
});

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAuth();

        const company = await prisma.clientCompany.findUnique({
            where: { id: params.id },
            include: {
                contacts: true,
                serviceRequests: {
                    orderBy: { createdAt: "desc" },
                },
                activities: {
                    take: 10,
                    orderBy: { createdAt: "desc" },
                    include: { actor: { select: { name: true } } },
                },
                xeroConnection: {
                    select: { status: true, lastSyncAt: true },
                },
            },
        });

        if (!company) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 });
        }

        return NextResponse.json(company);
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAuth();
        const body = await req.json();
        const data = companyUpdateSchema.parse(body);

        const company = await prisma.clientCompany.update({
            where: { id: params.id },
            data,
        });

        await logActivity({
            companyId: company.id,
            actionType: "COMPANY_UPDATE",
            actionSummary: `Updated company: ${company.legalName}`,
            metadata: { data },
        });

        return NextResponse.json(company);
    } catch (error: unknown) {
        console.error("PATCH company error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAuth();

        const company = await prisma.clientCompany.delete({
            where: { id: params.id },
        });

        await logActivity({
            actionType: "COMPANY_DELETE",
            actionSummary: `Deleted company: ${company.legalName}`,
            metadata: { id: params.id, legalName: company.legalName },
        });

        return NextResponse.json({ message: "Company deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
