
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, FileText, ArrowRight, Clock, AlertCircle, CheckCircle2, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

export default async function PortalDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const companyId = session?.user.companyId;

    if (!companyId) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <h1 className="text-2xl font-bold">Account Setup Required</h1>
                <p className="text-muted-foreground">Your account is not linked to a company profile yet.</p>
                <Button asChild variant="outline">
                    <Link href="/contact">Contact Support</Link>
                </Button>
            </div>
        );
    }

    // Parallel data fetching for performance
    const [company, openRequestsCount, actionRequiredCount, completedYearCount] = await Promise.all([
        prisma.clientCompany.findUnique({
            where: { id: companyId },
            include: {
                serviceRequests: {
                    orderBy: { updatedAt: 'desc' },
                    take: 5
                },
                activities: {
                    orderBy: { createdAt: 'desc' },
                    take: 5
                },
                _count: {
                    select: { documents: true }
                }
            }
        }),
        prisma.serviceRequest.count({
            where: {
                companyId,
                status: { notIn: ['Completed', 'Archived'] }
            }
        }),
        prisma.serviceRequest.count({
            where: {
                companyId,
                status: 'AwaitingDocs'
            }
        }),
        prisma.serviceRequest.count({
            where: {
                companyId,
                status: 'Completed',
                updatedAt: { gte: new Date(new Date().getFullYear(), 0, 1) }
            }
        })
    ]);

    if (!company) {
        return <div>Company profile not found.</div>;
    }

    const firstName = session.user.name?.split(' ')[0] || "Client";

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {firstName}</h1>
                    <p className="text-muted-foreground mt-1">
                        Overview for <span className="font-medium text-foreground">{company.legalName}</span>
                    </p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                    <Link href="/portal/requests/new">
                        <Plus className="mr-2 h-4 w-4" /> New Request
                    </Link>
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{openRequestsCount}</div>
                        <p className="text-xs text-muted-foreground">In progress or pending</p>
                    </CardContent>
                </Card>

                <Card className={actionRequiredCount > 0 ? "border-orange-500/50 bg-orange-500/5" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Action Required</CardTitle>
                        <AlertCircle className={`h-4 w-4 ${actionRequiredCount > 0 ? "text-orange-500" : "text-muted-foreground"}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{actionRequiredCount}</div>
                        <p className="text-xs text-muted-foreground">Awaiting documents/info</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed (YTD)</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedYearCount}</div>
                        <p className="text-xs text-muted-foreground">Requests finished this year</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                {/* Recent Requests - Widest Column */}
                <Card className="md:col-span-4 lg:col-span-5">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Recent Requests</CardTitle>
                                <CardDescription>Latest updates on your service requests</CardDescription>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                                <Link href="/portal/requests">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {company.serviceRequests.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed rounded-lg">
                                    <FileText className="h-10 w-10 text-muted-foreground mb-3 opacity-20" />
                                    <h3 className="text-lg font-medium">No requests yet</h3>
                                    <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                                        Start your first service request and track its progress here.
                                    </p>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="/portal/requests/new">Create Request</Link>
                                    </Button>
                                </div>
                            ) : (
                                company.serviceRequests.map((request) => (
                                    <div key={request.id} className="flex items-center justify-between group">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/portal/requests/${request.id}`} className="font-medium hover:underline decoration-primary/50 underline-offset-4 transition-all">
                                                    {request.serviceType.replace(/([A-Z])/g, ' $1').trim()}
                                                </Link>
                                                {request.status === 'AwaitingDocs' && (
                                                    <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px] md:max-w-md">
                                                {request.description || "No description provided"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={
                                                request.status === 'Completed' ? 'default' :
                                                    request.status === 'AwaitingDocs' ? 'destructive' :
                                                        request.status === 'InProgress' ? 'secondary' : 'outline'
                                            } className={
                                                request.status === 'AwaitingDocs' ? 'bg-orange-500 hover:bg-orange-600 border-none text-white' : ''
                                            }>
                                                {request.status === 'AwaitingDocs' ? 'Docs Needed' : request.status.replace(/([A-Z])/g, ' $1').trim()}
                                            </Badge>
                                            <Button asChild variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/portal/requests/${request.id}`}>
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-6 md:hidden">
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/portal/requests">View All Requests</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity - Narrower Column */}
                <Card className="md:col-span-3 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Activity className="h-4 w-4" /> Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {company.activities.length === 0 ? (
                                <p className="text-xs text-muted-foreground text-center py-4">No recent activity</p>
                            ) : (
                                company.activities.map((activity) => (
                                    <div key={activity.id} className="flex gap-3 text-sm">
                                        <div className="relative mt-0.5">
                                            <div className="h-2 w-2 rounded-full bg-primary/20 ring-4 ring-primary/5" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="font-medium leading-none text-xs">{activity.actionSummary}</p>
                                            <p className="text-[10px] text-muted-foreground capitalize">
                                                {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
