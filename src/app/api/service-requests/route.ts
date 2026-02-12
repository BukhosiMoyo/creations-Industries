import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { logActivity } from "@/lib/audit";
import { createNotification } from "@/lib/notifications";
import { ServiceType, RequestStatus, Priority } from "@prisma/client";
import * as z from "zod";

const serviceRequestSchema = z.object({
    companyId: z.string(),
    serviceType: z.nativeEnum(ServiceType),
    status: z.nativeEnum(RequestStatus).default(RequestStatus.New),
    priority: z.nativeEnum(Priority).default(Priority.Med),
    description: z.string().optional(),
    dueDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
    assignedToUserId: z.string().optional(),
});

export async function GET(req: NextRequest) {
    try {
        await requireAuth();

        const { searchParams } = new URL(req.url);
        const companyId = searchParams.get("companyId");
        const status = searchParams.get("status") as RequestStatus | null;

        const requests = await prisma.serviceRequest.findMany({
            where: {
                ...(companyId && { companyId }),
                ...(status && { status }),
            },
            include: {
                company: { select: { legalName: true } },
                assignedTo: { select: { name: true } },
            },
            orderBy: { updatedAt: "desc" },
        });

        return NextResponse.json(requests);
    } catch (error: unknown) {
        console.error("GET service-requests error:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await requireAuth();
        const body = await req.json();
        const data = serviceRequestSchema.parse(body);

        const request = await prisma.serviceRequest.create({
            data,
        });

        await logActivity({
            companyId: data.companyId,
            serviceRequestId: request.id,
            actionType: "SERVICE_REQUEST_CREATE",
            actionSummary: `Created ${data.serviceType} request`,
            metadata: { data },
        });

        // Notify if assigned
        if (data.assignedToUserId) {
            await createNotification({
                userId: data.assignedToUserId,
                title: "New Service Request Assigned",
                message: `You have been assigned to a new ${data.serviceType} request.`,
                type: "INFO",
                link: `/dashboard/companies/${data.companyId}`
            });
        }

        return NextResponse.json(request, { status: 201 });
    } catch (error: unknown) {
        console.error("POST service-request error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await requireAuth();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        const body = await req.json();
        const updateSchema = z.object({
            status: z.nativeEnum(RequestStatus).optional(),
            priority: z.nativeEnum(Priority).optional(),
            description: z.string().optional(),
            assignedToUserId: z.string().optional(),
        });

        const data = updateSchema.parse(body);

        const oldRequest = await prisma.serviceRequest.findUnique({
            where: { id },
            select: { status: true, assignedToUserId: true, serviceType: true, companyId: true }
        });

        const request = await prisma.serviceRequest.update({
            where: { id },
            data,
        });

        // Notifications
        if (data.assignedToUserId && data.assignedToUserId !== oldRequest?.assignedToUserId) {
            await createNotification({
                userId: data.assignedToUserId,
                title: "Service Request Assigned",
                message: `You have been assigned to the ${oldRequest?.serviceType} request for ${request.id}.`,
                type: "INFO",
                link: `/dashboard/companies/${oldRequest?.companyId}`
            });
        }

        if (data.status && data.status !== oldRequest?.status) {
            if (request.assignedToUserId) {
                await createNotification({
                    userId: request.assignedToUserId,
                    title: "Status Updated",
                    message: `Service request status changed to ${data.status}`,
                    type: "SUCCESS",
                });
            }
        }

        await logActivity({
            companyId: oldRequest?.companyId,
            serviceRequestId: id,
            actionType: "SERVICE_REQUEST_UPDATE",
            actionSummary: `Updated service request status to ${data.status || 'modified'}`,
            metadata: { data },
        });

        return NextResponse.json(request);
    } catch (error: unknown) {
        console.error("PATCH service-request error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
