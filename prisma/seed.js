const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

// Direct URL for the adapter
const connectionString = process.env.DIRECT_DATABASE_URL || "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@creationsweb.za";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const hashedSecondaryPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedSecondaryPassword,
            role: "ADMIN",
        },
        create: {
            email: adminEmail,
            name: "System Admin",
            password: hashedSecondaryPassword,
            role: "ADMIN",
            status: "ACTIVE",
        },
    });

    console.log(`Admin user created/updated: ${admin.email}`);

    // --- CRM Sample Data ---

    // 1. Create Companies
    const company1 = await prisma.clientCompany.upsert({
        where: { registrationNumber: "2023/123456/07" },
        update: {},
        create: {
            legalName: "TechFlow Solutions (Pty) Ltd",
            tradingName: "TechFlow",
            registrationNumber: "2023/123456/07",
            industry: "Software Development",
            address: "123 Bree Street, Cape Town City Centre",
            city: "Cape Town",
            province: "Western Cape",
            country: "ZA",
        },
    });

    const company2 = await prisma.clientCompany.upsert({
        where: { registrationNumber: "2021/987654/07" },
        update: {},
        create: {
            legalName: "Cape Logistics & Distribution",
            tradingName: "CapeLogistics",
            registrationNumber: "2021/987654/07",
            industry: "Logistics",
            address: "45 Harbour Road",
            city: "Port Elizabeth",
            province: "Eastern Cape",
            country: "ZA",
        },
    });

    console.log("Sample companies created.");

    // 2. Create Contacts
    const contact1 = await prisma.clientContact.upsert({
        where: { id: "seed-contact-1" }, // Using a placeholder ID or making email unique
        update: {},
        create: {
            id: "seed-contact-1",
            fullName: "Sarah Johnson",
            email: "sarah@techflow.io",
            phone: "+27 82 123 4567",
            roleTitle: "CEO",
            companyId: company1.id,
            isPrimary: true,
        },
    });

    const contact2 = await prisma.clientContact.upsert({
        where: { id: "seed-contact-2" },
        update: {},
        create: {
            id: "seed-contact-2",
            fullName: "Mike Smith",
            email: "mike@capelogistics.co.za",
            phone: "+27 83 765 4321",
            roleTitle: "Operations Manager",
            companyId: company2.id,
            isPrimary: true,
        },
    });

    console.log("Sample contacts created.");

    // 3. Create Service Requests
    const sr1 = await prisma.serviceRequest.create({
        data: {
            companyId: company1.id,
            serviceType: "Accounting",
            status: "InProgress",
            priority: "High",
            description: "Annual tax return and VAT reconciliation for FY2024.",
            dueDate: new Date("2025-03-31"),
            assignedToUserId: admin.id,
        },
    });

    const sr2 = await prisma.serviceRequest.create({
        data: {
            companyId: company2.id,
            serviceType: "Bookkeeping",
            status: "New",
            priority: "Med",
            description: "Monthly bookkeeping for February 2025.",
            dueDate: new Date("2025-03-15"),
        },
    });

    console.log("Sample service requests created.");

    // 4. Create Tasks
    await prisma.task.createMany({
        data: [
            {
                serviceRequestId: sr1.id,
                title: "Verify bank reconciliations",
                status: "Open",
                type: "InternalReview",
                assignedToUserId: admin.id,
            },
            {
                serviceRequestId: sr1.id,
                title: "Draft tax computation",
                status: "Open",
                type: "InternalReview", // Match TaskType enum
            },
            {
                serviceRequestId: sr2.id,
                title: "Request receipt batch",
                status: "Open",
                type: "DocumentRequest", // Match TaskType enum
            },
        ],
    });

    console.log("Sample tasks created.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
