import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("⚠️  Starting Database Operations Data Reset...");

    // Safety check - force user to confirm or use env var
    // In a real CLI we'd prompt, here we assume intention by running the script

    console.log("🗑️  Deleting transactional data...");

    // Delete in order to respect foreign keys

    // 1. Email System (most dependent)
    await prisma.emailMessage.deleteMany({});
    await prisma.emailJob.deleteMany({});
    await prisma.campaignEnrollment.deleteMany({});
    console.log("   - Cleared Email Jobs, Messages, Enrollments");

    // 2. Tasks & Activities
    await prisma.activityLog.deleteMany({});
    await prisma.task.deleteMany({});
    console.log("   - Cleared Tasks & Activity Logs");

    // 3. Service Requests & Documents
    await prisma.document.deleteMany({});
    await prisma.serviceRequest.deleteMany({});
    console.log("   - Cleared Service Requests & Documents");

    // 4. Client Contacts & Companies
    await prisma.clientContact.deleteMany({});
    const { count: companyCount } = await prisma.clientCompany.deleteMany({});
    console.log(`   - Cleared ${companyCount} Companies & Contacts`);

    // 5. Leads (and related)
    await prisma.leadDocument.deleteMany({});
    await prisma.leadStatusEvent.deleteMany({});
    await prisma.leadPortalToken.deleteMany({});
    await prisma.leadPersona.deleteMany({});
    const { count: leadCount } = await prisma.lead.deleteMany({});
    console.log(`   - Cleared ${leadCount} Leads`);

    console.log("✅ Database reset complete. Infrastructure (Users, Workspaces, Settings) preserved.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
