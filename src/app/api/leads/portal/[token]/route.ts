import { NextRequest, NextResponse } from "next/server"
import { validatePortalToken } from "@/lib/leads/portal-token"
import { prisma } from "@/lib/prisma"
import { LeadDocumentUploadedBy, LeadStatus } from "@prisma/client"

interface MappedDocument {
    id: string
    name: string
    type: string
    createdAt: Date
}

interface MappedStatusEvent {
    id: string
    status: LeadStatus
    comment: string | null
    createdAt: Date
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params
        const lead = await validatePortalToken(token)

        if (!lead) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 })
        }

        // Return a sanitized version of the lead data for the public portal
        return NextResponse.json({
            id: lead.id,
            fullName: lead.fullName,
            status: lead.status,
            serviceType: lead.serviceType,
            createdAt: lead.createdAt,
            documents: lead.documents.map((d): MappedDocument => ({
                id: d.id,
                name: d.filename,
                type: d.type as string,
                createdAt: d.uploadedAt
            })),
            statusEvents: lead.statusEvents.map((e): MappedStatusEvent => ({
                id: e.id,
                status: e.newStatus,
                comment: null,
                createdAt: e.createdAt
            }))
        })
    } catch (error) {
        console.error("Portal GET error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

/**
 * Handles document metadata updates after a client uploads a file.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params
        const lead = await validatePortalToken(token)
        if (!lead) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { name, type, url, size } = body

        const document = await prisma.leadDocument.create({
            data: {
                leadId: lead.id,
                filename: name,
                type,
                storageKey: url, // Mock URL for now
                size: parseInt(size) || 0,
                uploadedBy: LeadDocumentUploadedBy.Client
            }
        })

        // Also log a status event
        await prisma.leadStatusEvent.create({
            data: {
                leadId: lead.id,
                oldStatus: lead.status,
                newStatus: lead.status, // Same status, just adding history
            }
        })

        return NextResponse.json(document, { status: 201 })
    } catch (error) {
        console.error("Portal POST error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
