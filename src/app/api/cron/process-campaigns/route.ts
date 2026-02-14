import { NextResponse } from "next/server";
import { OutreachScheduler } from "@/lib/outreach/scheduler";
import { OutreachWorker } from "@/lib/outreach/worker";
import { EventSystem } from "@/lib/outreach/event-system";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    // secure with a secret?
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // v1.0 Execution Cycle
        await OutreachScheduler.scheduleJobs();
        await OutreachWorker.processJobs();
        await EventSystem.processEvents();

        return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error("Cron Job Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
