import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AnalyticsDashboard } from "@/components/dashboard/analytics/analytics-dashboard";
import { getSession } from "@/lib/rbac";
import { redirect } from "next/navigation";
import { getAnalyticsMetrics } from "@/app/actions/analytics";

export const metadata: Metadata = {
    title: "Analytics | Creations",
    description: "Conversion funnels and usage metrics.",
};

export default async function AnalyticsPage() {
    const session = await getSession();
    if (!session || session.user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const data = await getAnalyticsMetrics();

    return (
        <DashboardShell user={session.user}>
            <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto w-full">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground">Monitor conversion funnels and usage metrics.</p>
                </div>

                <AnalyticsDashboard initialData={data} />
            </div>
        </DashboardShell>
    );
}
