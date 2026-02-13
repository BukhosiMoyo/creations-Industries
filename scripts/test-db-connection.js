require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
    console.error("No Connection String found in environment variables!");
    process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        console.log("Testing findUnique({ where: { email: 'admin@creationsweb.za' } })...");
        const user = await prisma.user.findUnique({
            where: { email: "admin@creationsweb.za" },
        });
        console.log("User found:", user ? user.email : "null");

        const userCount = await prisma.user.count();
        console.log("Total users:", userCount);

    } catch (e) {
        console.error("Test failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
