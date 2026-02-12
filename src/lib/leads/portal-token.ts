import { prisma } from "@/lib/prisma"
import crypto from "crypto"

/**
 * Generates a secure, random hex token for portal access.
 */
export function generatePortalToken(): string {
    return crypto.randomBytes(32).toString("hex")
}

/**
 * Creates or retrieves an active portal token for a lead.
 * If a valid token exists, it returns it. Otherwise, it creates a new one.
 */
export async function getOrCreatePortalToken(leadId: string) {
    const existing = await prisma.leadPortalToken.findFirst({
        where: { leadId },
        orderBy: { createdAt: "desc" }
    })

    if (existing) return existing

    const rawToken = generatePortalToken()
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex")

    const portalToken = await prisma.leadPortalToken.create({
        data: {
            leadId,
            tokenHash,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        }
    })

    // Note: We return the record, but for a new creation the caller might need the raw token
    // In our onboarding flow, we'll return the raw token directly.
    return { ...portalToken, rawToken }
}

/**
 * Validates a lead portal token and returns the associated lead data.
 */
export async function validatePortalToken(rawToken: string) {
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex")

    const portalToken = await prisma.leadPortalToken.findUnique({
        where: { tokenHash },
        include: {
            lead: {
                include: {
                    documents: true,
                    statusEvents: {
                        orderBy: { createdAt: "desc" }
                    }
                }
            }
        }
    })

    if (!portalToken) return null
    if (portalToken.expiresAt && portalToken.expiresAt < new Date()) return null

    return portalToken.lead
}
