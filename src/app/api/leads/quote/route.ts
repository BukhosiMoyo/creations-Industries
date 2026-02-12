import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { LeadStatus, LeadSource, Priority } from "@prisma/client"
import { generatePortalToken } from "@/lib/leads/portal-token"
import crypto from "crypto"

/**
 * Premium Quote Form API
 * Handles autosave, lead creation, and state updates.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const {
            leadId,
            step,
            data,
            deviceMetadata
        } = body

        // If we have an existing leadId, update the lead
        if (leadId) {
            const updatedLead = await prisma.lead.update({
                where: { id: leadId },
                data: {
                    ...data,
                    lastStepCompleted: step,
                    deviceMetadata: deviceMetadata || undefined,
                    updatedAt: new Date(),
                }
            })

            // If it was the final step, update status from Incomplete to New
            if (step === 4 && updatedLead.status === LeadStatus.Incomplete) {
                await prisma.lead.update({
                    where: { id: leadId },
                    data: { status: LeadStatus.New }
                })

                // Log final submission
                await prisma.leadStatusEvent.create({
                    data: {
                        leadId,
                        oldStatus: LeadStatus.Incomplete,
                        newStatus: LeadStatus.New,
                    }
                })
            }

            return NextResponse.json({ success: true, lead: updatedLead })
        }

        // Initial Creation (Requires at least firstName, lastName and email)
        if (!data.firstName || !data.lastName || !data.email) {
            return NextResponse.json({ error: "Missing required initial fields" }, { status: 400 })
        }

        const resumeToken = crypto.randomBytes(32).toString("hex")
        const portalToken = generatePortalToken()

        const newLead = await prisma.lead.create({
            data: {
                ...data,
                fullName: `${data.firstName} ${data.lastName}`,
                status: LeadStatus.Incomplete,
                source: LeadSource.Website,
                priorityTag: Priority.Med,
                lastStepCompleted: step || 0,
                resumeToken,
                deviceMetadata: deviceMetadata || {},
                portalTokens: {
                    create: {
                        tokenHash: crypto.createHash("sha256").update(portalToken).digest("hex"),
                        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                    }
                }
            }
        })

        // Log creation
        await prisma.activityLog.create({
            data: {
                actorUserId: "SYSTEM", // System generated
                actionType: "LEAD_INCOMPLETE_CREATE",
                actionSummary: `Partial lead created for ${data.firstName} ${data.lastName}`,
                metadata: { leadId: newLead.id }
            }
        })

        return NextResponse.json({
            success: true,
            leadId: newLead.id,
            resumeToken
        }, { status: 201 })

    } catch (error: any) {
        console.error("Quote API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
