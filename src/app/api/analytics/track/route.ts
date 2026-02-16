import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AnalyticsEventType } from "@prisma/client";
import { headers } from "next/headers";

// Rate limiting could be implemented here (e.g., via simple counter or Redis)
// For now, we'll keep it simple as requested.

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || "unknown";
        const referrer = headersList.get("referer") || body.referrer || null;

        // Basic validation
        if (!body.eventType || !body.sessionId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Validate eventType validity (optional, but good for type safety)
        if (!Object.values(AnalyticsEventType).includes(body.eventType)) {
            // In production, maybe just log this and ignore to not crash client
            console.warn(`Invalid event type: ${body.eventType}`);
            return NextResponse.json({ success: false, error: "Invalid event type" }, { status: 400 });
        }

        // Asynchronous write (fire and forget pattern not fully supported in Next.js 14 serverless properly without waitUntil, 
        // but for this scale, awaiting is fine or using waitUntil if available/deployed on Vercel)
        // We will await it to ensure data integrity during this phase.

        const eventData = {
            sessionId: body.sessionId,
            userId: body.userId || null, // Ensure explicit null if undefined
            leadId: body.leadId || null,
            requestId: body.requestId || null,

            eventType: body.eventType as AnalyticsEventType,
            pagePath: body.pagePath || "/",
            referrer: referrer ? referrer.slice(0, 500) : null, // Truncate if too long

            utmSource: body.utmSource || null,
            utmMedium: body.utmMedium || null,
            utmCampaign: body.utmCampaign || null,

            serviceSlug: body.serviceSlug || null,
            categorySlug: body.categorySlug || null,
            locationSlug: body.locationSlug || null,
            stepIndex: typeof body.stepIndex === 'number' ? body.stepIndex : null,

            metadata: body.metadata || undefined,
        };

        await prisma.analyticsEvent.create({
            data: eventData
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Analytics tracking failed:", error);
        // Fail silently to client
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
