import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { requireAuth } from "@/lib/rbac";

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth();

        const { searchParams } = new URL(req.url);
        const companyId = searchParams.get("companyId");
        const type = searchParams.get("type");

        const where: any = {
            ...(companyId && { companyId }),
            ...(type && { type: type as any }),
        };

        if (user.role === UserRole.CLIENT) {
            // Client can only see their own company docs AND only ClientVisible ones
            if (user.companyId) {
                where.companyId = user.companyId;
            } else {
                return NextResponse.json({ error: "Client has no company assigned" }, { status: 403 });
            }
            where.accessLevel = "ClientVisible";
        } else if (user.role === UserRole.EMPLOYEE) {
            // Employee sees docs for assigned service requests OR docs uploaded by them
            where.OR = [
                { serviceRequest: { assignedToUserId: user.id } },
                { uploadedByUserId: user.id },
            ];
        }

        const documents = await prisma.document.findMany({
            where,
            include: {
                company: { select: { legalName: true } },
                uploadedBy: { select: { name: true } },
                serviceRequest: { select: { serviceType: true } },
            },
            orderBy: { uploadedAt: "desc" },
        });

        return NextResponse.json(documents);
    } catch (error: unknown) {
        console.error("GET documents error:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}
