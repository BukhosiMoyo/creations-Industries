import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prefer POSTGRES_PRISMA_URL (Vercel) -> DATABASE_URL (Standard)
const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

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
