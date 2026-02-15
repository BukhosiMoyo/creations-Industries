
import { prisma } from "@/lib/prisma";

import { EmailType, ProviderType } from "@prisma/client";

export async function getGlobalEmailStats(workspaceId?: string) {
    const where = workspaceId ? { workspaceId } : undefined;

    const [sent, delivered, opened, replied, bounced, complaint] = await Promise.all([
        // Count sent/delivered/bounced/complaint from EmailMessage
        prisma.emailMessage.count({ where: { ...where, status: 'Sent' } }),
        prisma.emailMessage.count({ where: { ...where, status: 'Delivered' } }),

        // Count opened/replied from OutreachEvent (Campaign engagement)
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
