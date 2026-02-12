import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";
import { logActivity } from "@/lib/audit";
import { calculateLeadScore, getPriorityFromScore } from "@/lib/leads/scoring";
import { LeadSource, LeadStatus, LeadUrgency, LeadLocation, LeadBudgetRange, ServiceType, Priority } from "@prisma/client";
import * as z from "zod";

const leadSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string(),
    companyName: z.string().optional(),
    websiteUrl: z.string().optional(),
    source: z.nativeEnum(LeadSource).default(LeadSource.Manual),
    serviceType: z.nativeEnum(ServiceType),
    location: z.nativeEnum(LeadLocation).default(LeadLocation.Other),
    freeTextLocation: z.string().optional(),
    urgency: z.nativeEnum(LeadUrgency).default(LeadUrgency.Soon_7d),
    budgetRange: z.nativeEnum(LeadBudgetRange).default(LeadBudgetRange.Unknown),
    message: z.string().optional(),
    assignedToUserId: z.string().optional(),
});

export async function GET(req: NextRequest) {
    try {
        await requireAuth();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status") as LeadStatus | null;
        const priority = searchParams.get("priority") as Priority | null;
        const urgency = searchParams.get("urgency") as LeadUrgency | null;

        const leads = await prisma.lead.findMany({
            where: {
                ...(status && { status }),
                ...(priority && { priorityTag: priority }),
                ...(urgency && { urgency }),
                // ...(assignedToMe && { assignedToUserId: user.id }), // Need session user
            },
            orderBy: [
                { leadScore: "desc" },
                { createdAt: "desc" },
            ],
            include: {
                _count: { select: { documents: true } }
            }
        });

        return NextResponse.json(leads);
    } catch (error) {
        console.error("GET leads error:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await requireAuth();
        const body = await req.json();
        const data = leadSchema.parse(body);

        // Calculate score
        const score = calculateLeadScore({
            urgency: data.urgency,
            budgetRange: data.budgetRange,
            serviceType: data.serviceType,
            hasDocuments: false, // New lead
            hasCompanyName: !!data.companyName,
            messageLength: data.message?.length || 0,
        });

        const lead = await prisma.lead.create({
            data: {
                ...data,
                leadScore: score,
                priorityTag: getPriorityFromScore(score),
            },
        });

        await logActivity({
            actorUserId: user.id,
            actionType: "LEAD_CREATE",
            actionSummary: `Created lead: ${data.fullName}`,
            metadata: { leadId: lead.id },
        });

        return NextResponse.json(lead, { status: 201 });
    } catch (error) {
        console.error("POST lead error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
