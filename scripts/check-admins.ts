
import "dotenv/config"
import { prisma } from "../src/lib/prisma"

async function main() {
    const admins = await prisma.user.findMany({
        where: { role: "ADMIN" },
        select: { email: true, name: true, createdAt: true }
    })

    console.log("--- Admin Users ---")
    if (admins.length === 0) {
        console.log("No admin users found.")
    } else {
        admins.forEach(u => console.log(`${u.email} (${u.name}) - Created: ${u.createdAt}`))
    }
}

main()
