import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Direct URL for the adapter (extracted from the prisma+postgres URL if possible, 
// or provided separately. Standard local dev for Prisma 7 uses this port by default).
const connectionString = process.env.DIRECT_DATABASE_URL || "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
