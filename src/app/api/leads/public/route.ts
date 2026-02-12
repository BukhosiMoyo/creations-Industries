import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateLeadScore, getPriorityFromScore } from "@/lib/leads/scoring";
import { LeadSource, LeadStatus, LeadUrgency, LeadLocation, LeadBudgetRange, ServiceType } from "@prisma/client";
import * as z from "zod";

const publicLeadSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string(),
    companyName: z.string().optional(),
    serviceType: z.nativeEnum(ServiceType),
    urgency: z.nativeEnum(LeadUrgency),
    budgetRange: z.nativeEnum(LeadBudgetRange),
    message: z.string().optional(),
    location: z.nativeEnum(LeadLocation).optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = publicLeadSchema.parse(body);

        // Calculate score
        const score = calculateLeadScore({
            urgency: data.urgency,
            budgetRange: data.budgetRange,
            serviceType: data.serviceType,
            hasDocuments: false,
            hasCompanyName: !!data.companyName,
            messageLength: data.message?.length || 0,
        });

        const lead = await prisma.lead.create({
            data: {
                ...data, // firstName, lastName, etc.
                fullName: `${data.firstName} ${data.lastName}`, // Backward compatibility
                source: LeadSource.Website,
                leadScore: score,
                priorityTag: getPriorityFromScore(score),
                status: LeadStatus.New,
            },
        });

        // Potentially trigger email notification here (Resend) - Checkpoint 5 of Lead Prompt

        return NextResponse.json({
            success: true,
            leadId: lead.id,
            message: "Lead received successfully"
        }, { status: 201 });
    } catch (error) {
        console.error("Public POST lead error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        return NextResponse.json({ error: "Service unavailable" }, { status: 500 });
    }
}
