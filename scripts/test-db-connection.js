
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

async function main() {
    console.log('Testing DB connection...');

    const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;
    console.log('Using connection string:', connectionString ? 'Defined' : 'Undefined');

    if (!connectionString) {
        console.error("No Connection String found!");
        return;
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        const user = await prisma.user.findUnique({
            where: { email: 'test@example.com' }, // Just testing the query structure
        });
        console.log('Query successful. Result:', user);
    } catch (e) {
        console.error('Query failed:', e);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
