import { prisma } from "@/lib/prisma";
import { leadImportSchema, LeadImportRow } from "./import-validation";
import { LeadSource, ServiceType, LeadStatus } from "@prisma/client";
import { generateReferenceId } from "./utils";

export type ImportResult = {
    total: number;
    success: number;
    failed: number;
    duplicates: number;
    errors: Array<{ row: number; error: string; data: any }>;
};

export async function importLeads(data: any[]): Promise<ImportResult> {
    const result: ImportResult = {
        total: data.length,
        success: 0,
        failed: 0,
        duplicates: 0,
        errors: [],
    };

    for (let i = 0; i < data.length; i++) {
        const row = data[i];

        // 1. Validate
        const validation = leadImportSchema.safeParse(row);
        if (!validation.success) {
            result.failed++;
            result.errors.push({
                row: i + 1,
                error: (validation.error as any).errors.map((e: any) => e.message).join(", "),
                data: row
            });
            continue;
        }

        const validData = validation.data;

        // 2. Dedup Check
        const existing = await prisma.lead.findFirst({
            where: { email: validData.email }
        });

        if (existing) {
            result.duplicates++;
            // Optional: Update existing lead? For now, skip.
            continue;
        }

        try {
            // 3. Create
            await prisma.lead.create({
                data: {
                    referenceId: generateReferenceId(),
                    firstName: validData.firstName,
                    lastName: validData.lastName || "",
                    fullName: `${validData.firstName} ${validData.lastName || ""}`.trim(),
                    email: validData.email,
                    phone: validData.phone || "Unknown",
                    companyName: validData.companyName,
                    businessType: validData.businessType,
                    vatStatus: validData.vatStatus,
                    // Map generic fields
                    serviceType: ServiceType.Other, // Default for import
                    source: LeadSource.EmailImport,
                    status: LeadStatus.New,
                    message: validData.industry ? `Industry: ${validData.industry}` : undefined,
                    location: validData.location ? 'Other' : 'Other', // Simplification
                    freeTextLocation: validData.location
                }
            });
            result.success++;
        } catch (error) {
            console.error("Import Create Error:", error);
            result.failed++;
            result.errors.push({
                row: i + 1,
                error: "Database error during creation",
                data: row
            });
        }
    }

    return result;
}
