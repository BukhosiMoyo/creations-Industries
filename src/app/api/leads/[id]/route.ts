
import { NextResponse } from "next/server";
import { updateLead } from "@/lib/leads/leads-service";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await req.json();
        const updated = await updateLead(id, body);
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Lead Update API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
