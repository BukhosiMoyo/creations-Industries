
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await req.json();
        const { steps } = body; // Expects array of steps

        if (!Array.isArray(steps)) {
            return NextResponse.json({ error: "Invalid steps format" }, { status: 400 });
        }

        const currentSteps = await prisma.campaignStep.findMany({
            where: { campaignId: id },
            select: { id: true }
        });
        const currentIds = currentSteps.map(s => s.id);
        const incomingIds = steps.filter((s: any) => s.id).map((s: any) => s.id);

        const toDelete = currentIds.filter(stepId => !incomingIds.includes(stepId));

        await prisma.$transaction(async (tx) => {
            // Delete removed
            if (toDelete.length > 0) {
                await tx.campaignStep.deleteMany({
                    where: { id: { in: toDelete } }
                });
            }

            // Upsert (Update or Create)
            for (const step of steps) {
                if (step.id) {
                    // Update
                    await tx.campaignStep.update({
                        where: { id: step.id },
                        data: {
                            subject: step.subject,
                            body: step.body,
                            delayMinutes: step.delayMinutes,
                            order: step.order
                        }
                    });
                } else {
                    // Create
                    await tx.campaignStep.create({
                        data: {
                            campaignId: id,
                            subject: step.subject,
                            body: step.body,
                            delayMinutes: step.delayMinutes,
                            order: step.order,
                            templateId: null // Support templates later
                        }
                    });
                }
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update steps", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
