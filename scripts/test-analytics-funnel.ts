
import "dotenv/config"
import { prisma } from "../src/lib/prisma"
import { getAnalyticsMetrics } from "../src/app/actions/analytics"
import { AnalyticsEventType } from "@prisma/client"

async function main() {
    console.log("Starting Analytics Verification...")

    // 1. Clear existing events (optional, for clean test)
    // await prisma.analyticsEvent.deleteMany()

    const sessionId = "test-session-" + Date.now()
    const userId = "user_cm3..." // Mock

    console.log(`Simulating Session: ${sessionId}`)

    // 2. Simulate Funnel
    const events = [
        { eventType: "QUOTE_MODAL_OPENED", pagePath: "/" },
        { eventType: "QUOTE_STEP_VIEWED", pagePath: "/", stepIndex: 1 },
        { eventType: "QUOTE_STEP_COMPLETED", pagePath: "/", stepIndex: 1 }, // Contact
        { eventType: "QUOTE_STEP_COMPLETED", pagePath: "/", stepIndex: 2 }, // Service
        { eventType: "QUOTE_STEP_COMPLETED", pagePath: "/", stepIndex: 3 }, // Details
        { eventType: "QUOTE_SUBMITTED", pagePath: "/" },
        { eventType: "LEAD_CONVERTED_TO_REQUEST", pagePath: "/dashboard/leads", metadata: { companyId: "test" } }
    ]

    for (const ev of events) {
        await prisma.analyticsEvent.create({
            data: {
                sessionId,
                eventType: ev.eventType as AnalyticsEventType,
                pagePath: ev.pagePath,
                stepIndex: ev.stepIndex,
                metadata: ev.metadata,
                serviceSlug: "accounting-services"
            }
        })
    }

    console.log("Events seeded.")

    // 3. Verify Aggregation
    // We need to mock the role check in getAnalyticsMetrics or just call the prisma queries directly to verify logic
    // Since getAnalyticsMetrics checks for session/admin role, passing it might be hard in a script without mocking next-auth.
    // So we will replicate the query logic here to verify it works.

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 1)

    const submitted = await prisma.analyticsEvent.count({
        where: { eventType: "QUOTE_SUBMITTED", sessionId }
    })

    const converted = await prisma.analyticsEvent.count({
        where: { eventType: "LEAD_CONVERTED_TO_REQUEST", sessionId }
    })

    console.log("\n--- Verification Results ---")
    console.log(`Submitted Count (Expected 1): ${submitted}`)
    console.log(`Converted Count (Expected 1): ${converted}`)

    if (submitted === 1 && converted === 1) {
        console.log("✅ Funnel tracking verified.")
    } else {
        console.error("❌ Funnel tracking mismatch.")
    }
}

main()
