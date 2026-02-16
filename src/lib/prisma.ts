import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prefer Custom Var -> POSTGRES_PRISMA_URL (Vercel) -> DATABASE_URL (Standard)
const connectionString = process.env.creations_database_DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
    console.log("Prisma Init:", {
        hasCustomUrl: !!process.env.creations_database_DATABASE_URL,
        hasPostgresPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        connectionStringLength: connectionString?.length || 0,
        usingAdapter: !!connectionString
    });
}

const adapter = connectionString
    ? new PrismaPg(new Pool({ connectionString }))
    : undefined;

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter: adapter, // Only use adapter if connection string exists (serverless/edge friendly)
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
