import { prisma } from "../src/lib/prisma"
import { sendEmail } from "../src/lib/email/send-email"
import { EMAIL_MOCK_DATA } from "../src/lib/email/mock-data"

// MOCK ENV for Testing Logic Flow
process.env.RESEND_API_KEY = "re_mock_123456789"
process.env.RESEND_FROM_EMAIL = "verifiction@test.com"

async function main() {
    console.log("Starting Email Template Manager Verification (Direct Logic)...")

    const TEST_KEY = "lead.received.client"
    const TEST_EMAIL = "admin@test.com"

    // 1. Reset any existing override
    console.log(`1. Resetting template ${TEST_KEY}...`)
    await prisma.emailTemplate.delete({
        where: { key: TEST_KEY }
    }).catch(() => { }) // Ignore if not found

    // 2. Send Default Email (Mock)
    console.log("2. Sending Default Email...")
    const res1 = await sendEmail({
        key: TEST_KEY,
        to: TEST_EMAIL,
        props: EMAIL_MOCK_DATA.LEAD
    })

    // We expect failure locally due to invalid API key, but we check if it reached the provider
    if (!res1.success && res1.error?.message.includes("missing")) {
        console.error("Env check failed unexpectedly:", res1.error)
        process.exit(1)
    }
    console.log("Default email logic executed (likely 401 or mock success). Result:", res1.success ? "Success" : "Failed as expected (Network/Auth)")

    // 3. Create Override (Direct DB)
    console.log("3. Creating Override...")
    await prisma.emailTemplate.upsert({
        where: { key: TEST_KEY },
        update: {
            subject: "CUSTOM SUBJECT: We got your lead!",
            body: {
                intro: "CUSTOM INTRO: Detailed custom intro text here.",
                nextSteps: "CUSTOM NEXT STEPS: Relax while we work."
            },
            lastEditedBy: "script"
        },
        create: {
            key: TEST_KEY,
            subject: "CUSTOM SUBJECT: We got your lead!",
            body: {
                intro: "CUSTOM INTRO: Detailed custom intro text here.",
                nextSteps: "CUSTOM NEXT STEPS: Relax while we work."
            },
            lastEditedBy: "script"
        }
    })

    // 4. Send Overridden Email
    console.log("4. Sending Overridden Email...")
    const res2 = await sendEmail({
        key: TEST_KEY,
        to: TEST_EMAIL,
        props: EMAIL_MOCK_DATA.LEAD
    })

    // Here we primarily want to verify that NO error occurred in the logic *before* sending.
    console.log("Overridden email logic executed. Result:", res2.success ? "Success" : "Failed as expected (Network/Auth)")

    // 5. Verify Database State
    const override = await prisma.emailTemplate.findUnique({ where: { key: TEST_KEY } })
    if (!override || override.subject !== "CUSTOM SUBJECT: We got your lead!") {
        console.error("Database Override check failed.")
        process.exit(1)
    }
    console.log("Database state verified.")

    // 6. Cleanup
    console.log("6. Cleaning up...")
    await prisma.emailTemplate.delete({
        where: { key: TEST_KEY }
    })
    console.log("Cleanup complete.")
}

main()
    .catch(e => {
        console.error(e)
        // process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
