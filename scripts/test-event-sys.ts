
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { EventSystem } from '../src/lib/outreach/event-system';
// We don't import enums from client because we use strings or rely on TS inference, 
// and sometimes direct import fails in scripts if not transpiled correctly.
// But we'll try to use strings where possible or standard imports.

// Env loading via command line is expected (source .env)
const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🧪 Testing Event System...");

    let workspace;
    let lead = await prisma.lead.findFirst();

    if (!lead) {
        console.log("No lead found. Creating dummy lead...");
        workspace = await prisma.workspace.findFirst();
        if (!workspace) throw new Error("No workspace found. Run seed first.");

        const stage = await prisma.pipelineStage.findFirst({ where: { workspaceId: workspace.id, orderIndex: 0 } });

        lead = await prisma.lead.create({
            data: {
                workspaceId: workspace.id,
                referenceId: `lead_${Date.now()}`,
                firstName: "Test",
                lastName: "User",
                email: "testuser@example.com",
                phone: "555-0123",
                serviceType: "Other",
                pipelineStageId: stage?.id || "unknown"
            }
        });
    } else {
        workspace = await prisma.workspace.findUnique({ where: { id: lead.workspaceId! } });
        if (!workspace) throw new Error("Lead found but no associated workspace.");
    }

    // 2. Ensure Sending Infrastructure (Domain -> Mailbox)
    let domain = await prisma.sendingDomain.findFirst({ where: { workspaceId: workspace.id } });
    if (!domain) {
        console.log("No sending domain found. Creating dummy domain...");
        domain = await prisma.sendingDomain.create({
            data: {
                workspaceId: workspace.id,
                domain: "example.com",
                provider: "Resend"
            }
        });
    }

    let mailbox = await prisma.sendingMailbox.findFirst({ where: { workspaceId: workspace.id } });
    if (!mailbox) {
        console.log("No sending mailbox found. Creating dummy mailbox...");
        mailbox = await prisma.sendingMailbox.create({
            data: {
                workspaceId: workspace.id,
                sendingDomainId: domain.id,
                fromName: "Test Sender",
                fromEmail: "test@example.com"
            }
        });
    }

    const mockMsgId = `msg_${Date.now()}`;
    console.log(`Debug: Workspace ID: ${workspace.id}`);
    console.log(`Debug: Mailbox ID: ${mailbox.id}`);

    // Create dummy Job
    const job = await prisma.emailJob.create({
        data: {
            workspaceId: workspace.id,
            campaignId: null,
            leadId: lead.id,
            mailboxId: mailbox.id,
            toEmail: lead.email,
            subjectRendered: "Test Event",
            bodyHtmlRendered: "Test",
            status: "Sent",
            scheduledAt: new Date()
        }
    });

    // Create dummy Message
    await prisma.emailMessage.create({
        data: {
            workspaceId: workspace.id,
            emailJobId: job.id,
            provider: "Resend",
            providerMessageId: mockMsgId,
            fromEmail: "test@example.com",
            toEmail: lead.email,
            status: "Sent"
        }
    });

    console.log(`Msg ID: ${mockMsgId}, Lead ID: ${lead.id}`);

    // 2. Emit 'Opened' Event
    console.log("Emitting 'Opened' event...");
    await EventSystem.emit(
        "Opened",
        { messageId: mockMsgId },
        { source: "test-script" },
        prisma // Pass the prisma client instance (with adapter)
    );

    // 3. Process Events
    console.log("Processing events...");
    await EventSystem.processEvents();

    // 4. Verify Side Effects
    const eventLog = await prisma.outreachEvent.findFirst({
        orderBy: { occurredAt: 'desc' }
    });
    console.log("Latest OutreachEvent Type:", eventLog?.type);

    // Check Lead Score
    const updatedLead = await prisma.lead.findUnique({ where: { id: lead.id } });
    console.log(`Lead Score: ${updatedLead?.leadScore}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
