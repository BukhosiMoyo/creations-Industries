import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { UserRole } from "@prisma/client";
import { logActivity } from "@/lib/audit";
import * as z from "zod";

const companySchema = z.object({
    legalName: z.string().min(2),
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
    country: z.string().default("ZA"),
});

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth();

        // Admin and Staff only
        if (user.role === UserRole.EMPLOYEE || user.role === UserRole.CLIENT) {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q") || "";

        const companies = await prisma.clientCompany.findMany({
            where: {
                OR: [
                    { legalName: { contains: query, mode: "insensitive" } },
                    { tradingName: { contains: query, mode: "insensitive" } },
                ],
            },
            include: {
                _count: {
                    select: { serviceRequests: true },
                },
            },
            orderBy: { legalName: "asc" },
        });

        return NextResponse.json(companies);
    } catch (error: unknown) {
        console.error("GET companies error:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await requireAuth();
        const body = await req.json();
        const data = companySchema.parse(body);

        const company = await prisma.clientCompany.create({
            data,
        });

        await logActivity({
            companyId: company.id,
            actionType: "COMPANY_CREATE",
            actionSummary: `Created company: ${company.legalName}`,
            metadata: { data },
        });

        return NextResponse.json(company, { status: 201 });
    } catch (error: unknown) {
        console.error("POST company error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
