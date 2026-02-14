
import { NextResponse } from "next/server";
import { getPipelineStages } from "@/lib/leads/leads-service";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const stages = await getPipelineStages();
        // In a real multi-tenant app, we'd pass workspaceId from session
        return NextResponse.json(stages);
    } catch (error) {
        console.error("Pipeline Stages API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
