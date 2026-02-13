import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

export default async function PortalRequestsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.companyId) {
        redirect("/portal");
    }

    const requests = await prisma.serviceRequest.findMany({
        where: { companyId: session.user.companyId },
        orderBy: { updatedAt: 'desc' },
        include: {
            _count: {
                select: { documents: true, tasks: true }
            }
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/portal"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
                    <p className="text-muted-foreground">Manage and track your service requests</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Requests</CardTitle>
                    <CardDescription>A list of all service requests associated with your company.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {requests.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground">
                                No requests found.
                            </div>
                        ) : (
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm text-left">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Service Type</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Description</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {requests.map((request) => (
                                            <tr key={request.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle font-medium">{request.serviceType}</td>
                                                <td className="p-4 align-middle max-w-[300px] truncate">{request.description}</td>
                                                <td className="p-4 align-middle">
                                                    <Badge variant={
                                                        request.status === 'Completed' ? 'default' :
                                                            request.status === 'InProgress' ? 'secondary' : 'outline'
                                                    }>
                                                        {request.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 align-middle text-muted-foreground">
                                                    {format(new Date(request.createdAt), 'MMM d, yyyy')}
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    <Button asChild variant="ghost" size="sm">
                                                        <Link href={`/portal/requests/${request.id}`}>View Details</Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
