import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { logActivity } from "@/lib/audit";
import { createNotification } from "@/lib/notifications";
import { TaskStatus, TaskType, UserRole } from "@prisma/client";
import * as z from "zod";

const taskSchema = z.object({
    serviceRequestId: z.string(),
    title: z.string().min(2),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.Open),
    dueDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
    assignedToUserId: z.string().optional(),
    type: z.nativeEnum(TaskType).default(TaskType.InternalReview),
});

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth();

        const { searchParams } = new URL(req.url);
        const serviceRequestId = searchParams.get("serviceRequestId");
        const assignedToMe = searchParams.get("assignedToMe") === "true";

        const where: any = {
            ...(serviceRequestId && { serviceRequestId }),
            ...(assignedToMe && { assignedToUserId: user.id }),
        };

        // Role-based restrictions
        if (user.role === UserRole.EMPLOYEE) {
            where.assignedToUserId = user.id;
        }

        const tasks = await prisma.task.findMany({
            where,
            include: {
                serviceRequest: {
                    include: { company: { select: { legalName: true } } },
                },
            },
            orderBy: { dueDate: "asc" },
        });

        return NextResponse.json(tasks);
    } catch (error: unknown) {
        console.error("GET tasks error:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await requireAuth();
        const body = await req.json();
        const data = taskSchema.parse(body);

        const task = await prisma.task.create({
            data,
        });

        // Get service request to get companyId for logging
        const sr = await prisma.serviceRequest.findUnique({
            where: { id: data.serviceRequestId },
            select: { companyId: true },
        });

        await logActivity({
            companyId: sr?.companyId,
            serviceRequestId: data.serviceRequestId,
            actionType: "TASK_CREATE",
            actionSummary: `Created task: ${data.title}`,
            metadata: { taskId: task.id },
        });

        // Notify if assigned
        if (data.assignedToUserId) {
            await createNotification({
                userId: data.assignedToUserId,
                title: "New Task Assigned",
                message: `You have been assigned a new task: ${data.title}`,
                type: "INFO",
                link: `/dashboard/companies/${sr?.companyId}`
            });
        }

        return NextResponse.json(task, { status: 201 });
    } catch (error: unknown) {
        console.error("POST task error:", error);
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
            title: z.string().optional(),
            status: z.nativeEnum(TaskStatus).optional(),
            assignedToUserId: z.string().optional(),
            dueDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
        });

        const data = updateSchema.parse(body);

        const oldTask = await prisma.task.findUnique({
            where: { id },
            include: { serviceRequest: { select: { companyId: true } } }
        });

        const task = await prisma.task.update({
            where: { id },
            data,
        });

        // Notifications
        if (data.assignedToUserId && data.assignedToUserId !== oldTask?.assignedToUserId) {
            await createNotification({
                userId: data.assignedToUserId,
                title: "Task Assigned",
                message: `You have been assigned the task: ${task.title}`,
                type: "INFO",
                link: `/dashboard/companies/${oldTask?.serviceRequest.companyId}`
            });
        }

        await logActivity({
            companyId: oldTask?.serviceRequest.companyId,
            serviceRequestId: oldTask?.serviceRequestId,
            actionType: "TASK_UPDATE",
            actionSummary: `Updated task: ${task.title}`,
            metadata: { data },
        });

        return NextResponse.json(task);
    } catch (error: unknown) {
        console.error("PATCH task error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
