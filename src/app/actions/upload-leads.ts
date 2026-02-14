"use server"

import { importLeads } from "@/lib/leads/import-service";

export async function uploadLeadsAction(formData: FormData) {
    const file = formData.get("file") as File;

    if (!file) {
        return { error: "No file provided" };
    }

    try {
        const text = await file.text();
        // Simple CSV parser (Assumes headers on first row)
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
        const headers = lines[0].split(",").map(h => h.trim());

        const data = lines.slice(1).map(line => {
            const values = line.split(",").map(v => v.trim());
            const row: any = {};
            headers.forEach((header, index) => {
                // Map CSV headers to Schema fields roughly
                // e.g. "First Name" -> firstName
                const key = mapHeaderToField(header);
                if (key) row[key] = values[index];
            });
            return row;
        });

        const result = await importLeads(data);
        return { success: true, result };

    } catch (error) {
        console.error("Upload Action Error:", error);
        return { error: "Failed to process file" };
    }
}

function mapHeaderToField(header: string) {
    const h = header.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (h.includes("first")) return "firstName";
    if (h.includes("last")) return "lastName";
    if (h.includes("mail")) return "email";
    if (h.includes("phone")) return "phone";
    if (h.includes("company")) return "companyName";
    if (h.includes("vat")) return "vatStatus"; // Might need value mapping
    if (h.includes("business")) return "businessType";
    if (h.includes("industry")) return "industry";
    if (h.includes("location") || h.includes("city")) return "location";
    return null;
}
