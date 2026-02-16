import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/rbac"
import { UserEditForm } from "@/components/dashboard/users/user-edit-form"

interface PageProps {
    params: Promise<{
        userId: string
    }>
}

export default async function UserDetailPage(props: PageProps) {
    const params = await props.params;
    const session = await getSession()
    if (!session) redirect("/auth/login")

    // Only admins can edit users
    // Staff might view? But let's restrict to ADMIN based on sidebar implementation
    // Plan said "Users: ['ADMIN']"
    if (session.user.role !== "ADMIN") {
        redirect("/dashboard")
    }

    const { userId } = params

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) {
        notFound()
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <UserEditForm user={user} currentUserId={session.user.id} />
        </div>
    )
}
