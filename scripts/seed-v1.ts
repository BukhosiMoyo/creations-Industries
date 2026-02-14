
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Load env vars if not already loaded (Next.js automatically loads them, but tsx might not)
// You might need to run with: source .env && npx tsx scripts/seed-v1.ts
// or install dotenv.

const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting v1.0 Seed...');

    if (!connectionString) {
        console.error("❌ No DATABASE_URL found in environment.");
        process.exit(1);
    } else {
        console.log("✅ Database URL found.");
    }

    // 1. Ensure Default Workspace
    let workspace = await prisma.workspace.findFirst();
    if (!workspace) {
        console.log('Creating default workspace...');
        workspace = await prisma.workspace.create({
            data: {
                name: 'Creations Industries',
            },
        });
        console.log(`✅ Workspace created: ${workspace.id}`);
    } else {
        console.log(`ℹ️ Using existing workspace: ${workspace.id}`);
    }

    // 2. Default Pipeline Stages
    const stages = [
        { name: 'Cold Lead', order: 0 },
        { name: 'Engaged', order: 1 },
        { name: 'Meeting Booked', order: 2 },
        { name: 'Negotiation', order: 3 },
        { name: 'Closed Won', order: 4, isTerminal: true },
        { name: 'Closed Lost', order: 5, isTerminal: true },
    ];

    for (const stage of stages) {
        const existing = await prisma.pipelineStage.findFirst({
            where: { workspaceId: workspace.id, name: stage.name }
        });
        if (!existing) {
            await prisma.pipelineStage.create({
                data: {
                    workspaceId: workspace.id,
                    name: stage.name,
                    orderIndex: stage.order,
                    isTerminal: stage.isTerminal || false
                }
            });
            console.log(`  + Created stage: ${stage.name}`);
        }
    }

    // 3. Default Sending Profile
    const profile = await prisma.sendingProfile.findFirst({
        where: { workspaceId: workspace.id, name: 'Default Round Robin' }
    });

    if (!profile) {
        await prisma.sendingProfile.create({
            data: {
                workspaceId: workspace.id,
                name: 'Default Round Robin',
                strategy: 'RoundRobin'
            }
        });
        console.log(`✅ Created Default Sending Profile`);
    }

    // 4. Migration: Assign existing data to Workspace
    // Update Users
    const { count: userCount } = await prisma.user.updateMany({
        where: { workspaceId: null },
        data: { workspaceId: workspace.id }
    });
    if (userCount > 0) console.log(`📦 Migrated ${userCount} users to workspace.`);

    // Update Leads
    const { count: leadCount } = await prisma.lead.updateMany({
        where: { workspaceId: null },
        data: { workspaceId: workspace.id }
    });
    if (leadCount > 0) console.log(`📦 Migrated ${leadCount} leads to workspace.`);

    // Update Campaigns
    const { count: campCount } = await prisma.campaign.updateMany({
        where: { workspaceId: null },
        data: { workspaceId: workspace.id }
    });
    if (campCount > 0) console.log(`📦 Migrated ${campCount} campaigns to workspace.`);

    // Update Templates
    const { count: tmplCount } = await prisma.emailTemplate.updateMany({
        where: { workspaceId: null },
        data: { workspaceId: workspace.id }
    });
    if (tmplCount > 0) console.log(`📦 Migrated ${tmplCount} templates to workspace.`);

    console.log('✅ Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
