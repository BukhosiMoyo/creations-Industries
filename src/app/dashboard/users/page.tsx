import { prisma } from "@/lib/prisma";
import { InviteUserDialog } from "@/components/admin/InviteUserDialog";
import { UsersTable } from "./users-table";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    const pendingInvites = await prisma.invite.findMany({
        where: { status: "PENDING" },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Users & Team</h2>
                    <p className="text-muted-foreground">
                        Manage system access and team members.
                    </p>
                </div>
                <InviteUserDialog />
            </div>

            <UsersTable users={users} pendingInvites={pendingInvites} />
        </div>
    );
}
