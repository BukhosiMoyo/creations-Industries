
import { NextResponse } from "next/server";
import { createCampaign, getCampaigns } from "@/lib/campaigns/campaign-service";

// Mock Workspace ID
const WORKSPACE_ID = "cm7328x7e00004c00g500d000";

export async function GET() {
    try {
        const campaigns = await getCampaigns(WORKSPACE_ID);
        return NextResponse.json(campaigns);
    } catch (error) {
        console.error("Campaigns API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, type } = body;

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const campaign = await createCampaign({
            name,
            type: type || "Outbound",
            workspaceId: WORKSPACE_ID,
            // defaults
            subject: "",
            body: ""
        });

        return NextResponse.json(campaign);
    } catch (error) {
        console.error("Create Campaign Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
