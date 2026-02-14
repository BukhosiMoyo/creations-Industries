
import { NextResponse } from "next/server";
import { updateCampaign } from "@/lib/campaigns/campaign-service";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await req.json();
        const { name, sendingProfileId, status } = body;

        // Validation could go here

        const updated = await updateCampaign(id, {
            name,
            sendingProfileId,
            status
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Failed to update campaign", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
