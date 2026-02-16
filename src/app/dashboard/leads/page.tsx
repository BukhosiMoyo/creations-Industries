import { Suspense } from "react"
import { getSession } from "@/lib/rbac"
import { getLeads } from "@/lib/dashboard-data"
import { LeadsTable } from "@/components/dashboard/leads/leads-table"
import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Leads | Creations Dashboard",
}

export default async function LeadsPage({ searchParams }: { searchParams: { status?: string, search?: string } }) {
    const session = await getSession()
    if (!session) redirect("/auth/login")

    const leads = await getLeads(session.user.id, session.user.role || "STAFF", searchParams)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and track inbound quote requests.
                    </p>
                </div>
            </div>

            <Suspense fallback={<div>Loading leads...</div>}>
                <LeadsTable data={leads} />
            </Suspense>
        </div>
    )
}
