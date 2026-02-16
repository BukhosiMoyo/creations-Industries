import { prisma } from "../src/lib/prisma";
import { ServiceType } from "@prisma/client";

async function main() {
    console.log("Starting Lead Ingestion Verification...");

    // 1. Simulate Quote Payload
    const payload = {
        firstName: "Test",
        lastName: "User",
        email: "test.user@example.com",
        phone: "0711234567",
        companyName: "Test Corp",
        services: ["accounting", "tax"],
        industry: "Tech",
        message: "This is a test submission via script.",
        _honey: "" // Honeypot
    };

    console.log("Simulating POST /api/quote with payload:", payload);

    // We can't easily call the Next.js API route handler from here without running the server.
    // Instead, I will manually invoke the logic OR just assume the user wants me to hit the endpoint via curl?
    // Using curl requires the server to be running.
    // Since I am in a dev environment and might not have the server running on a known port,
    // I will use the 'run_command' to start the server in the background?
    // NO, that's complex/flaky.

    // BETTER APPROACH:
    // I will verify the logic by IMPORTING the POST handler? 
    // Next.js App Router handlers rely on Request/Response objects which are hard to mock perfectly.

    // ALTERNATIVE:
    // I will write a script that DIRECTLY CALLS the DB logic that the API would call, 
    // ensuring the DB operations work.
    // BUT that doesn't verify the API route wiring.

    // BEST APPROACH for this context:
    // I will write a script that uses `fetch` to hit the LOCALHOST if the server is running.
    // I'll check if port 3000 is open.

    const API_URL = "http://localhost:3000/api/quote";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("API Call Failed:", await response.text());
            return;
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.success || !data.referenceId) {
            console.error("API did not return success/referenceId");
            return;
        }

        // 2. Verify Lead Creation
        console.log(`Verifying Lead ${data.referenceId} in DB...`);
        const lead = await prisma.lead.findUnique({
            where: { referenceId: data.referenceId }
        });

        if (!lead) {
            console.error("❌ Lead NOT found in DB!");
        } else {
            console.log("✅ Lead found:", lead.id, lead.email);
        }

        // 3. Verify Email Event
        console.log("Verifying Email Events for this Lead...");
        // Note: EmailEvent might link via email address since we don't always link LeadId in the API refactor yet?
        // Let's check the API refactor... 
        // I passed `relatedCompanyId` or `relatedServiceRequestId`. I did NOT pass `relatedLeadId` because `EmailEvent` model 
        // has `relatedServiceRequestId` and `relatedCompanyId`. 
        // DOES IT HAVE `leadId`?
        // Checking schema... `Lead` model has `emailEvents`? No.
        // `EmailEvent` has `workspaceId`, `campaignId`, `enrollmentId`, `leadId`.
        // WAIT. Schema inspection showed `EmailEvent` has `relatedCompanyId` and `relatedServiceRequestId`.
        // It DOES NOT seem to have `relatedLeadId` in the top part of the schema I read?

        // Let's re-read schema for EmailEvent.
        // Line 324: model EmailEvent { ... relatedCompanyId, relatedServiceRequestId ... }
        // Line 74 in Workspace: `events EmailEvent[]`
        // It does NOT look like `EmailEvent` has `leadId` in the CRM section.
        // It DOES have `to`. So I will search by `to` address.

        const events = await prisma.emailEvent.findMany({
            where: { to: payload.email },
            orderBy: { createdAt: 'desc' },
            take: 2
        });

        if (events.length === 0) {
            console.error("❌ No EmailEvents found for", payload.email);
        } else {
            console.log("✅ EmailEvents found:");
            events.forEach(e => console.log(`- ${e.type}: ${e.status} (${e.subject})`));
        }

    } catch (e) {
        console.error("Connection Failed. Is the server running?", e);
        console.log("Please start the server with 'npm run dev' to run this end-to-end verification.");
    }
}

main();
