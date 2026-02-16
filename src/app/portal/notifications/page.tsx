import { Metadata } from "next"
import { getSession } from "@/lib/rbac"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { NotificationList } from "@/components/notifications/notification-list"
import { PortalShell } from "@/components/portal/portal-shell"

export const metadata: Metadata = {
    title: "Notifications | Client Portal",
    description: "View all your notifications",
}

export default async function PortalNotificationsPage() {
    const session = await getSession()
    if (!session || session.user.role !== "CLIENT") redirect("/login")

    // Fetch Notifications (Server Side)
    const notifications = await prisma.notification.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 50
    })

    return (
        <PortalShell user={session.user}>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                        <p className="text-muted-foreground">Updates on your requests and documents.</p>
                    </div>
                </div>

                <NotificationList notifications={notifications} userId={session.user.id} />
            </div>
        </PortalShell>
    )
}
