import { prisma } from "@/lib/prisma"
import { Building2, Briefcase, FileSearch, AlertCircle, Zap, CheckSquare, Clock } from "lucide-react"
import { KPICard } from "@/components/dashboard/kpi-card"
import { AttentionNeeded } from "@/components/dashboard/attention-needed"
import { ActivityTimeline } from "@/components/dashboard/activity-timeline"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format, subDays, startOfDay } from "date-fns"
import { RequestStatus } from "@prisma/client"

type Priority = "Low" | "Med" | "High" | "Urgent";

async function getDashboardData() {
    const now = new Date()

    const [
        companyCount,
        activeRequests,
        stuckRequests,
        overdueTasks,
        recentActivity,
        allRequests
    ] = await Promise.all([
        prisma.clientCompany.count(),
        prisma.serviceRequest.findMany({
            where: { status: { not: RequestStatus.Completed } },
            include: { company: true }
        }),
        prisma.serviceRequest.findMany({
            where: { status: "AwaitingDocs" as RequestStatus },
            include: { company: true },
            take: 5
        }),
        prisma.task.findMany({
            where: {
                status: "Open",
                dueDate: { lt: now }
            },
            include: { serviceRequest: { include: { company: true } } },
            take: 5
        }),
        prisma.activityLog.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: { actor: true }
        }),
        prisma.serviceRequest.findMany({
            where: {
                createdAt: { gte: subDays(startOfDay(now), 7) }
            }
        })
    ])

    // Pipeline Value (Derived placeholders)
    const serviceValues: Record<string, number> = {
        'Accounting': 5000,
        'Tax': 2500,
        'CIPC': 1500,
        'Payroll': 3000,
    }

    const pipelineValue = activeRequests.reduce((sum: number, req: { serviceType: string }) => {
        return sum + (serviceValues[req.serviceType] || 2000)
    }, 0)

    // Chart Data Processing
    const chatData = Array.from({ length: 7 }).map((_, i) => {
        const d = subDays(now, 6 - i)
        const dateStr = format(d, 'MMM dd')
        const created = allRequests.filter((r: { createdAt: Date }) => format(r.createdAt, 'MMM dd') === dateStr).length
        const completed = allRequests.filter((r: { status: string, updatedAt: Date | null }) => r.status === "Completed" && r.updatedAt && format(r.updatedAt, 'MMM dd') === dateStr).length
        return { date: dateStr, created, completed }
    })

    // Attention Items
    const attentionItems = [
        ...stuckRequests.map((r: { id: string, serviceType: string, priority: string, company: { legalName: string } }) => ({
            id: r.id,
            type: "stuck" as const,
            clientName: r.company.legalName,
            serviceType: r.serviceType,
            ageInStage: "4 days", // Mocking age logic for now
            priority: r.priority as Priority
        })),
        ...overdueTasks.map((t: { id: string, dueDate: Date | null, serviceRequest: { serviceType: string, company: { legalName: string } } }) => ({
            id: t.id,
            type: "overdue" as const,
            clientName: t.serviceRequest.company.legalName,
            serviceType: t.serviceRequest.serviceType,
            dueDate: t.dueDate || undefined,
            priority: "High" as const
        }))
    ].slice(0, 6)

    return {
        stats: [
            { name: "Total Clients", value: companyCount, icon: Building2, delta: { value: "12%", isPositive: true }, description: "Active retained clients" },
            { name: "Active Requests", value: activeRequests.length, icon: Briefcase, delta: { value: "5%", isPositive: true }, description: "Work currently in pipeline" },
            { name: "Awaiting Docs", value: stuckRequests.length, icon: FileSearch, accentColor: "amber-500", description: "Pending client input" },
            { name: "Overdue Tasks", value: overdueTasks.length, icon: AlertCircle, accentColor: "red-500", description: "Immediate action required" },
            { name: "Pipeline Value", value: `R${(pipelineValue / 1000).toFixed(1)}k`, icon: Zap, description: "Estimated revenue flow" },
            { name: "Xero Connected", value: 0, icon: CheckSquare, description: "External data sync status" },
        ],
        attentionItems,
        recentActivity: recentActivity.map((a: { id: string, actionType: string, actionSummary: string, actor: { name: string | null, email: string | null, image: string | null }, createdAt: Date }) => ({
            id: a.id,
            actionType: a.actionType,
            actionSummary: a.actionSummary,
            actor: {
                name: a.actor.name,
                email: a.actor.email,
                image: a.actor.image
            },
            createdAt: a.createdAt
        })),
        chatData
    }
}

export default async function DashboardPage() {
    const data = await getDashboardData()

    return (
        <div className="space-y-10 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview</h1>
                    <p className="text-muted-foreground font-medium">
                        Welcome back. Here is the pulse of your operations today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl font-semibold gap-2 border-border/60">
                        <Clock className="h-4 w-4" />
                        Last 30 Days
                    </Button>
                    <Button className="rounded-xl font-bold bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {data.stats.map((stat) => (
                    <KPICard key={stat.name} {...stat} />
                ))}
            </div>

            {/* Charts & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Chart Panel */}
                <Card className="lg:col-span-8 border-border bg-card shadow-xl shadow-foreground/5 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Request Performance</CardTitle>
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Success metrics for this week</CardDescription>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold">
                            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-accent" /> Created</div>
                            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Completed</div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4 px-2">
                        <OverviewChart data={data.chatData} />
                    </CardContent>
                </Card>

                {/* Attention Needed Panel */}
                <Card className="lg:col-span-4 border-border bg-card shadow-xl shadow-foreground/5 h-fit">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            Attention Needed
                            {data.attentionItems.length > 0 && <span className="flex h-2 w-2 rounded-full bg-red-500" />}
                        </CardTitle>
                        <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">High priority operational blockers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AttentionNeeded items={data.attentionItems} />
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-12 border-border bg-card shadow-xl shadow-foreground/5">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-6">
                        <div>
                            <CardTitle className="text-xl font-bold">Real-time Activity</CardTitle>
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Automated event log from across the platform</CardDescription>
                        </div>
                        <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-accent">View Full Audit Log</Button>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <ActivityTimeline activities={data.recentActivity} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
