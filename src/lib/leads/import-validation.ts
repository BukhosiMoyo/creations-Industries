import { z } from "zod";
import { BusinessType, VatStatus } from "@prisma/client";

export const leadImportSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email format"),
    companyName: z.string().optional(),
    phone: z.string().optional(),
    businessType: z.nativeEnum(BusinessType).optional().default("Other"),
    vatStatus: z.nativeEnum(VatStatus).optional().default("Unknown"),
    industry: z.string().optional(),
    location: z.string().optional(),
});

export type LeadImportRow = z.infer<typeof leadImportSchema>;
