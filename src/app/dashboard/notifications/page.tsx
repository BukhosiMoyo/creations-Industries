import { Metadata } from "next"
import { getSession } from "@/lib/rbac"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { NotificationList } from "@/components/notifications/notification-list"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { getDashboardCounts } from "@/lib/dashboard-data"

export const metadata: Metadata = {
    title: "Notifications | Creations Dashboard",
    description: "View all your notifications",
}

export default async function NotificationsPage() {
    const session = await getSession()
    if (!session) redirect("/login")

    // Fetch Notifications (Server Side)
    const notifications = await prisma.notification.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 100
    })

    const counts = await getDashboardCounts(session.user.id, session.user.role)

    return (
        <DashboardShell user={session.user} counts={counts}>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                        <p className="text-muted-foreground">Stay updated with the latest activity.</p>
                    </div>
                </div>

                <NotificationList notifications={notifications} userId={session.user.id} />
            </div>
        </DashboardShell>
    )
}
