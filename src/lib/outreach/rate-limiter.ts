
import { prisma } from "@/lib/prisma";
import { SendingMailbox, WarmupState } from "@prisma/client";

export class RateLimiter {

    /**
     * Checks if a mailbox can send an email right now.
     * Enforces: Daily Cap, Warmup State, and Time Windows (optional).
     */
    static async checkMailboxAvailability(mailboxId: string): Promise<{ allowed: boolean; reason?: string }> {
        const mailbox = await prisma.sendingMailbox.findUnique({
            where: { id: mailboxId },
            include: { domain: true }
        });

        if (!mailbox) return { allowed: false, reason: "Mailbox not found" };
        if (!mailbox.isActive) return { allowed: false, reason: "Mailbox is inactive" };
        if (!mailbox.domain.isActive) return { allowed: false, reason: "Domain is inactive" };

        // 1. Check Daily Cap
        // Count emails sent today (in UTC)
        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);

        const sentToday = await prisma.emailMessage.count({
            where: {
                job: { mailboxId: mailbox.id },
                sentAt: { gte: startOfDay }
            }
        });

        if (sentToday >= mailbox.dailyCap) {
            return { allowed: false, reason: `Daily cap reached (${sentToday}/${mailbox.dailyCap})` };
        }

        // 2. Check Warmup State (Optional extra logic, e.g. stricter limits)
        if (mailbox.warmupState === "Cold" && sentToday >= 10) {
            // Hardcoded safety for Cold mailboxes if dailyCap isn't set low enough
            return { allowed: false, reason: "Cold mailbox restricted to 10/day" };
        }

        // 3. Check Minimum Delay (prevent bursting)
        // Find last sent email from this mailbox
        const lastSent = await prisma.emailMessage.findFirst({
            where: { job: { mailboxId: mailbox.id } },
            orderBy: { sentAt: 'desc' }
        });

        if (lastSent && lastSent.sentAt) {
            const secondsSinceLast = (new Date().getTime() - lastSent.sentAt.getTime()) / 1000;
            if (secondsSinceLast < mailbox.minDelaySeconds) {
                return { allowed: false, reason: `Min delay not met (wait ${Math.ceil(mailbox.minDelaySeconds - secondsSinceLast)}s)` };
            }
        }

        return { allowed: true };
    }

    /**
     * Reserves a slot for sending (optimistic locking using DB could be added here).
     * For now, the check is sufficient for periodic jobs.
     */
}
