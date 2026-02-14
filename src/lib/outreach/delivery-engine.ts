
import { prisma } from "@/lib/prisma";
import { SendingProfile, SendingMailbox, SendingProfileMailbox } from "@prisma/client";
import { RateLimiter } from "./rate-limiter";

export class DeliveryEngine {

    /**
     * Selects the best mailbox for a campaign based on its Sending Profile.
     * Uses Round Robin logic and checks Rate Limits.
     */
    static async selectMailbox(profileId: string): Promise<SendingMailbox | null> {
        const profile = await prisma.sendingProfile.findUnique({
            where: { id: profileId },
            include: {
                mailboxes: {
                    include: { mailbox: true },
                    orderBy: { weight: 'desc' } // or whatever order
                }
            }
        });

        if (!profile || profile.mailboxes.length === 0) return null;

        // Round Robin Strategy (Naive implementation: verify each until one works)
        // A better implementation would store "last_used_mailbox_index" in Redis or DB.
        // For v1.0, we will randomized shuffle or just iterate.

        // Let's filter for valid ones first
        const candidates = profile.mailboxes.map(pm => pm.mailbox);

        // Shuffle to distribute load if we don't track state
        const shuffled = candidates.sort(() => 0.5 - Math.random());

        for (const mailbox of shuffled) {
            const status = await RateLimiter.checkMailboxAvailability(mailbox.id);
            if (status.allowed) {
                return mailbox;
            }
        }

        return null; // All mailboxes busy or capped
    }
}
