
import { EmailHandlers } from "./email-events";

type EventHandler = (payload: any, metadata?: any) => Promise<void>;

export class EventHandlerRegistry {

    static handlers: Record<string, EventHandler[]> = {
        'EmailSent': [EmailHandlers.onSent],
        'EmailDelivered': [EmailHandlers.onDelivered],
        'EmailOpened': [EmailHandlers.onOpened],
        'EmailGivenReply': [EmailHandlers.onReplied], // Mapped from "Replied"
    };

    static async handle(event: any) {
        const eventType = event.eventType;
        const handlers = this.handlers[eventType] || [];

        if (handlers.length === 0) {
            console.log(`No handlers registered for ${eventType}`);
            return;
        }

        for (const handler of handlers) {
            try {
                await handler(event.payload, event.metadata);
            } catch (err) {
                console.error(`Handler error for ${eventType}:`, err);
                throw err; // Stop processing this event? Or continue? Outbox pattern implies retry.
            }
        }
    }
}
