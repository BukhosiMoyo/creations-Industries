
import { prisma } from "@/lib/prisma";

// Define Payload Types
export interface EventPayloads {
    'EmailSent': { jobId: string; messageId: string };
    'EmailDelivered': { messageId: string; providerId: string };
    'EmailOpened': { messageId: string; userAgent?: string };
    'EmailClicked': { messageId: string; url: string };
    'EmailReplied': { messageId: string; content?: string };
    'LeadConverted': { leadId: string; stageId: string };
    [key: string]: any;
}

export class EventSystem {

    /**
     * Emits an event to the Outbox.
     * Transaction-safe if called within a prisma transaction (pass tx).
     */
    static async emit(
        type: string,
        payload: any,
        metadata: any = {},
        tx?: any // Optional prisma transaction client
    ) {
        const db = tx || prisma;

        await db.eventOutbox.create({
            data: {
                eventType: type,
                payload: payload,
                metadata: metadata,
                status: 'Pending',
                // schema requires these:
                aggregateType: 'System', // Default
                aggregateId: 'global'   // Default
            }
        });

        console.log(`Event emitted: ${type}`);
    }

    /**
     * Processes pending events from the Outbox.
     * Dispatches to registered handlers.
     */
    static async processEvents() {
        const events = await prisma.eventOutbox.findMany({
            where: { status: 'Pending' },
            take: 50,
            orderBy: { createdAt: 'asc' }
        });

        for (const event of events) {
            try {
                // Mark as Processing
                await prisma.eventOutbox.update({
                    where: { id: event.id },
                    data: { status: 'Processing' }
                });

                // Dispatch to handlers
                await this.dispatch(event);

                // Mark as Processed
                await prisma.eventOutbox.update({
                    where: { id: event.id },
                    data: {
                        status: 'Processed'
                        // processedAt removed as it's not in schema
                    }
                });

            } catch (error: any) {
                console.error(`Failed to process event ${event.id}:`, error);
                await prisma.eventOutbox.update({
                    where: { id: event.id },
                    data: {
                        status: 'Failed',
                        lastError: error.message
                    }
                });
            }
        }
    }


    private static async dispatch(event: any) {
        console.log(`Dispatching event: ${event.eventType}`, event.payload);

        // Dynamic import to avoid circular dependency issues if any, though properly structured code shouldn't have them.
        // But here we can just import at top if we move EventSystem to its own file or keep it simple.
        // Let's use dynamic for safety in this "god class" file if it grows.

        const { EmailHandlers } = await import("./handlers/email-events");

        switch (event.eventType) {
            case 'Sent':
                await EmailHandlers.onSent(event.payload);
                break;
            case 'Delivered':
                await EmailHandlers.onDelivered(event.payload);
                break;
            case 'Opened':
                await EmailHandlers.onOpened(event.payload);
                break;
            case 'Clicked':
                await EmailHandlers.onClicked(event.payload);
                break;
            case 'Replied':
                await EmailHandlers.onReplied(event.payload);
                break;
            case 'Bounced':
                await EmailHandlers.onBounced(event.payload);
                break;
            case 'Complained':
                await EmailHandlers.onComplained(event.payload);
                break;
            default:
                console.warn(`No handler for event type: ${event.eventType}`);
        }
    }
}
