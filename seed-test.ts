
import { PrismaClient, UserRole, UserStatus, LeadStatus, ServiceType } from '@prisma/client'
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import * as bcrypt from 'bcrypt' // Requires npm install if not present, but verified package.json has it.

// Note: environment variables must be loaded before running this script
// e.g. npx tsx --env-file=.env seed-test.ts

const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:50320/creationsweb?sslmode=disable"
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/creationsweb" })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Seeding test data...')

    // 1. Create Admin User
    const adminEmail = 'admin@test.com'
    const hashedPassword = await bcrypt.hash('password123', 10)

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedPassword
        },
        create: {
            email: adminEmail,
            name: 'Test Admin',
            role: UserRole.ADMIN,
            status: UserStatus.ACTIVE,
            password: hashedPassword
        }
    })
    console.log('Admin user:', admin.email)

    // 2. Create a Lead
    const lead = await prisma.lead.create({
        data: {
            referenceId: `REF-${Date.now()}`,
            firstName: 'John',
            lastName: 'Doe',
            email: `john.doe.${Date.now()}@example.com`,
            phone: '1234567890',
            companyName: 'Doe Enterprises',
            serviceType: ServiceType.Accounting,
            message: 'Need help with math.',
            status: LeadStatus.New,
            leadScore: 50
        }
    })
    console.log('Created Lead:', lead.id, lead.referenceId)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
