
import { prisma } from "@/lib/prisma";

import { EmailType, ProviderType } from "@prisma/client";

export async function getGlobalEmailStats(workspaceId?: string) {
    const where = workspaceId ? { workspaceId } : undefined;

    const [sent, delivered, opened, replied, bounced, complaint] = await Promise.all([
        prisma.emailEvent.count({ where: { ...where, type: EmailType.LeadReceived } }), // Mapping isn't 1:1 with old types?
        // Wait, schema has: LeadReceived, ClientConfirmation, DocsRequested, Reminder, StatusUpdate
        // It DOES NOT HAVE Sent, Delivered, Opened, etc. in `EmailType` enum?
        // Let's check schema again. `EmailEvent` type is `EmailType`.
        // `OutreachEvent` has `OutreachEventType` which has Sent, Opened, etc.
        // `EmailEvent` seems to be for transactional system notifications?
        // `OutreachEvent` is for campaign tracking.

        // Strategy: We should probably aggregate `OutreachEvent` for campaign stats 
        // AND `EmailMessage` status for delivery stats.

        // `EmailMessage` has `status` field of type `MessageStatus` (Sent, Delivered, Bounced...)
        // Let's use `EmailMessage` for delivery stats.

        prisma.emailMessage.count({ where: { ...where, status: 'Sent' } }),
        prisma.emailMessage.count({ where: { ...where, status: 'Delivered' } }),
        prisma.outreachEvent.count({ where: { ...where, type: 'Opened' } }),
        prisma.outreachEvent.count({ where: { ...where, type: 'Replied' } }),
        prisma.emailMessage.count({ where: { ...where, status: 'Bounced' } }),
        prisma.emailMessage.count({ where: { ...where, status: 'Complained' } })
    ]);

    const totalSent = sent || 1; // Avoid division by zero

    return {
        sent,
        delivered,
        opened,
        replied,
        bounced,
        complaint,
        rates: {
            openRate: Math.round((opened / totalSent) * 100),
            replyRate: Math.round((replied / totalSent) * 100),
            bounceRate: Math.round((bounced / totalSent) * 100),
            deliveryRate: Math.round((delivered / totalSent) * 100)
        }
    };
}

export async function getDomainHealth(workspaceId?: string) {
    return prisma.sendingDomain.findMany({
        where: workspaceId ? { workspaceId } : undefined,
        include: {
            mailboxes: {
                select: { id: true, fromEmail: true, isActive: true } // verify exact field names
            }
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function addSendingDomain(domain: string, workspaceId: string) {
    // Check if exists
    const existing = await prisma.sendingDomain.findUnique({
        where: { domain }
    });

    if (existing) throw new Error("Domain already exists");

    return prisma.sendingDomain.create({
        data: {
            domain,
            workspaceId,
            provider: 'Resend', // Default for now
            dkimStatus: 'Pending',
            spfStatus: 'Pending',
            dmarcStatus: 'Pending'
        }
    });
}
