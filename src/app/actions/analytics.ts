'use server'

import { prisma } from "@/lib/prisma";
import { AnalyticsEventType } from "@prisma/client";
import { headers } from "next/headers";
import { getSession } from "@/lib/rbac";

interface TrackServerEventProps {
    eventType: AnalyticsEventType;
    userId?: string;
    leadId?: string;
    requestId?: string;
    sessionId?: string; // Optional if passed from client context

    pagePath?: string;
    serviceSlug?: string;
    categorySlug?: string;
    locationSlug?: string;
    stepIndex?: number;
    metadata?: any;
}

export async function trackServerEvent(props: TrackServerEventProps) {
    try {
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || "unknown";
        const referrer = headersList.get("referer") || null;

        // In server actions, we might not have easy access to client-side session ID unless passed.
        // We'll fallback to a "system" session or a generated one if missing, 
        // but ideally the caller passes it or we correlate via userId.

        const sessionId = props.sessionId || props.userId || "server-action-unknown";

        await prisma.analyticsEvent.create({
            data: {
                sessionId,
                userId: props.userId || null,
                leadId: props.leadId || null,
                requestId: props.requestId || null,
                eventType: props.eventType,
                pagePath: props.pagePath || "server-action",
                referrer: referrer ? referrer.slice(0, 500) : null,

                serviceSlug: props.serviceSlug || null,
                categorySlug: props.categorySlug || null,
                locationSlug: props.locationSlug || null,
                stepIndex: props.stepIndex,
                metadata: props.metadata || undefined,
            }
        });
    } catch (error) {
        console.error("Server-side analytics tracking failed:", error);
        // Fail silently
    }
}
}

// --- RETRIEVAL ---

export async function getAnalyticsMetrics(days = 30) {
    const session = await getSession()
    if (!session || session.user.role !== "ADMIN") return null

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // 1. Funnel Metrics
    const [
        totalEvents,
        modalOpens,
        stepsCompleted,
        submissions,
        conversions,
        topServices,
        dailyEvents
    ] = await Promise.all([
        // Total Volume
        prisma.analyticsEvent.count({
            where: { createdAt: { gte: startDate } }
        }),
        // Funnel: Open
        prisma.analyticsEvent.count({
            where: {
                eventType: "QUOTE_MODAL_OPENED",
                createdAt: { gte: startDate }
            }
        }),
        // Funnel: Steps Detailed (Group by stepIndex)
        prisma.analyticsEvent.groupBy({
            by: ['stepIndex'],
            where: {
                eventType: "QUOTE_STEP_COMPLETED",
                createdAt: { gte: startDate }
            },
            _count: { sessionId: true }
        }),
        // Funnel: Submit
        prisma.analyticsEvent.count({
            where: {
                eventType: "QUOTE_SUBMITTED",
                createdAt: { gte: startDate }
            }
        }),
        // Funnel: Convert
        prisma.analyticsEvent.count({
            where: {
                eventType: "LEAD_CONVERTED_TO_REQUEST",
                createdAt: { gte: startDate }
            }
        }),
        // Top Services (Interest)
        prisma.analyticsEvent.groupBy({
            by: ['serviceSlug'],
            where: {
                eventType: "QUOTE_SUBMITTED",
                createdAt: { gte: startDate },
                serviceSlug: { not: null }
            },
            _count: { sessionId: true },
            orderBy: {
                _count: { sessionId: 'desc' }
            },
            take: 5
        }),
        // Activity Over Time
        prisma.$queryRaw`
            SELECT DATE("createdAt") as date, COUNT(*) as count
            FROM "AnalyticsEvent"
            WHERE "createdAt" >= ${startDate}
            GROUP BY DATE("createdAt")
            ORDER BY DATE("createdAt") ASC
        `
    ])

    return {
        overview: {
            totalEvents,
            uniqueSessions: 0,
        },
        funnel: {
            opened: modalOpens,
            step1: stepsCompleted.find((s: any) => s.stepIndex === 1)?._count.sessionId || 0,
            step2: stepsCompleted.find((s: any) => s.stepIndex === 2)?._count.sessionId || 0,
            step3: stepsCompleted.find((s: any) => s.stepIndex === 3)?._count.sessionId || 0,
            submitted: submissions,
            converted: conversions
        },
        topServices: topServices.map((s: any) => ({
            slug: s.serviceSlug,
            count: s._count.sessionId
        })),
        activity: dailyEvents
    }
}
