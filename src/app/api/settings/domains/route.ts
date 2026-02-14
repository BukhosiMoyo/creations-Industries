
import { NextResponse } from "next/server";
import { getDomainHealth, addSendingDomain } from "@/lib/analytics-service";

// Mock workspace ID for now, or get from session
const WORKSPACE_ID = "cm7328x7e00004c00g500d000"; // Ensure this matches seeded workspace if possible, or fetch dymaically

export async function GET() {
    try {
        const domains = await getDomainHealth();
        return NextResponse.json(domains);
    } catch (error) {
        console.error("Domains API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { domain } = await req.json();

        // Basic validation
        if (!domain || !domain.includes('.')) {
            return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
        }

        const newDomain = await addSendingDomain(domain, WORKSPACE_ID);
        return NextResponse.json(newDomain);
    } catch (error: any) {
        console.error("Add Domain Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
