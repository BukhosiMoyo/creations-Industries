import { redirect } from "next/navigation";
import { getSession } from "@/lib/rbac";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getDashboardCounts } from "@/lib/dashboard-data";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect("/auth/login");
    }

    const counts = await getDashboardCounts(session.user.id, session.user.role || "STAFF");

    return (
        <DashboardShell user={session.user} counts={counts}>
            {children}
        </DashboardShell>
    );
}
