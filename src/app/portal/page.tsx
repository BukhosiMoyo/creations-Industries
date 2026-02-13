import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, FileText, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

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

    const company = await prisma.clientCompany.findUnique({
        where: { id: companyId },
        include: {
            serviceRequests: {
                orderBy: { updatedAt: 'desc' },
                take: 5
            },
            _count: {
                select: { serviceRequests: true, documents: true }
            }
        }
    });

    if (!company) {
        return <div>Company profile not found.</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session.user.name?.split(' ')[0]}</h1>
                    <p className="text-muted-foreground mt-1">Here's what's happening with {company.legalName}</p>
                </div>
                <Button asChild>
                    <Link href="/portal/requests/new">
                        <Plus className="mr-2 h-4 w-4" /> New Request
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{company._count.serviceRequests}</div>
                        <p className="text-xs text-muted-foreground">Total requests submitted</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documents</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{company._count.documents}</div>
                        <p className="text-xs text-muted-foreground">Files available for download</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Company Profile</CardTitle>
                        <Badge variant="outline" className="text-muted-foreground">View Only</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-medium truncate">{company.tradingName || company.legalName}</div>
                        <p className="text-xs text-muted-foreground truncate">{company.registrationNumber || "No Reg Number"}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Recent Requests</CardTitle>
                                <CardDescription>Latest service requests and their status</CardDescription>
                            </div>
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/portal/requests">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {company.serviceRequests.length === 0 ? (
                                <div className="text-center py-6 text-muted-foreground">
                                    No requests found. Create one to get started.
                                </div>
                            ) : (
                                company.serviceRequests.map((request) => (
                                    <div key={request.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="space-y-1">
                                            <p className="font-medium leading-none">
                                                {request.serviceType}
                                            </p>
                                            <p className="text-sm text-muted-foreground line-clamp-1">
                                                {request.description || "No description provided"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={
                                                request.status === 'Completed' ? 'default' :
                                                    request.status === 'InProgress' ? 'secondary' : 'outline'
                                            }>
                                                {request.status}
                                            </Badge>
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href={`/portal/requests/${request.id}`}>View</Link>
                                            </Button>
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
