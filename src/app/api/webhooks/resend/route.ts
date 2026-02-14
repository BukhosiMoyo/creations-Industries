import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OutreachEventType, AwarenessStage } from "@prisma/client";
import { EventSystem } from "@/lib/outreach/event-system";

// Mapping Resend events to our Enum
const EVENT_MAP: Record<string, OutreachEventType> = {
    "email.sent": OutreachEventType.Sent,
    "email.delivered": OutreachEventType.Delivered,
    "email.opened": OutreachEventType.Opened,
    "email.clicked": OutreachEventType.Clicked,
    "email.bounced": OutreachEventType.Bounced,
    "email.complained": OutreachEventType.Complained,
    // "email.delivery_delayed" -> ignore for now
};

export async function POST(req: Request) {
    try {
        if (process.env.RESEND_WEBHOOK_SECRET) {
            // Verify signature if secret is present
            // const signature = req.headers.get('resend-signature');
            // ...
        }

        const payload = await req.json();
        const { type, data } = payload;

        console.log(`Webhook received: ${type}`);

        const eventType = EVENT_MAP[type];
        if (!eventType) {
            return NextResponse.json({ ignored: true });
        }

        // Extract Standard Fields
        const email = data.to && data.to[0];
        const messageId = data.id; // Resend Message ID

        // Extract Tags (jobId, workspaceId)
        // Resend structure: data.tags is array of { name: "...", value: "..." } ?
        // Or sometimes object? Assuming array based on SDK usage.
        // SDK: tags: [{ name: "jobId", value: "..." }]
        // Webhook data: tags: { "jobId": "..." } ??
        // Resend docs say tags are returned as object in webhook?
        // Let's handle both or default to object.

        let tags: Record<string, string> = {};
        if (Array.isArray(data.tags)) {
            data.tags.forEach((t: any) => tags[t.name] = t.value);
        } else if (typeof data.tags === 'object') {
            tags = data.tags;
        }

        const jobId = tags['jobId'];
        const workspaceId = tags['workspaceId'];

        if (!email && !jobId) {
            return NextResponse.json({ error: "No identifiers found" });
        }

        // Emit Event to Outbox
        await EventSystem.emit(
            eventType,
            {
                messageId,
                email,
                jobId,
                workspaceId,
                url: data.click?.link, // For clicks
                content: data.reply?.text, // For replies (if configured)
            },
            {
                provider: "Resend",
                raw: payload
            }
        );

        // Serverless processing trigger: Drain the queue immediately
        // In a real production setup, this should be decoupled (Cron/Queue)
        // But for MVP, this ensures events are handled.
        // We use waitUntil if available or just await (might slow down webhook response)
        // Next.js App Router doesn't expose waitUntil on request object easily unless using Vercel specific types or middleware.
        // We'll just await for now to be safe.
        try {
            await EventSystem.processEvents();
        } catch (err) {
            console.error("Error processing events inline:", err);
        }

        return NextResponse.json({ success: true, queued: true });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
