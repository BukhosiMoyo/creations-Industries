import { redirect } from "next/navigation";
import { getSession } from "@/lib/rbac";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect("/auth/login");
    }

    return (
        <DashboardShell user={session.user}>
            {children}
        </DashboardShell>
    );
}
