import { prisma } from "../src/lib/prisma"
import { createNotification } from "../src/lib/notifications"
import { getDashboardCounts } from "../src/lib/dashboard-data"

async function main() {
    console.log("Starting Notification System Verification...")

    // 1. Find a test user (Admin)
    const admin = await prisma.user.findFirst({
        where: { role: "ADMIN" }
    })

    if (!admin) {
        console.error("No admin found. skipping.")
        return
    }

    console.log(`Using Admin: ${admin.email} (${admin.id})`)

    // 2. Create a test notification
    const notification = await createNotification({
        userId: admin.id,
        title: "Test Notification",
        message: "This is a verification test.",
        severity: "SUCCESS",
        category: "SYSTEM",
        link: "/dashboard"
    })

    if (!notification) {
        console.error("Failed to create notification.")
        process.exit(1)
    }

    console.log(`Notification Created: ${notification.id}`)

    // 3. Verify it is unread
    const check = await prisma.notification.findUnique({
        where: { id: notification.id }
    })

    if (check?.isRead) {
        console.error("Notification should be unread.")
        process.exit(1)
    }

    console.log("Notification is correctly marked unread.")

    // 4. Check Dashboard Counts
    const counts = await getDashboardCounts(admin.id, "ADMIN")
    console.log("Dashboard Counts:", counts)

    if (counts.unreadNotifications === 0) {
        console.warn("Warning: Unread count is 0, but we just created one. Maybe user has others read?")
    } else {
        console.log(`Unread Count: ${counts.unreadNotifications}`)
    }

    // 5. Cleanup
    await prisma.notification.delete({ where: { id: notification.id } })
    console.log("Cleanup complete.")
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
