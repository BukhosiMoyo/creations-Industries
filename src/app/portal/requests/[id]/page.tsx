import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { redirect, notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, FileText, Download, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PageProps {
    params: {
        id: string;
    }
}

export default async function PortalRequestDetailPage({ params }: PageProps) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.companyId) {
        redirect("/portal");
    }

    const { id } = params;

    const request = await prisma.serviceRequest.findUnique({
        where: { id },
        include: {
            documents: {
                where: {
                    accessLevel: 'ClientVisible'
                },
                orderBy: { uploadedAt: 'desc' }
            },
            tasks: {
                where: {
                    // Clients generally shouldn't see internal tasks, but requirement said:
                    // "Client sees ONLY... Status timeline with client-friendly stages"
                    // Tasks might be too granular. Let's show high-level status or just hide tasks for now.
                    // If we want to show specific client tasks, we'd need a flag. 
                    // For now, let's NOT show tasks unless they are specifically "Client Input Needed" type, which we don't strictly have.
                    // Schema has TaskType: FollowUp, DocumentRequest, Deadline, InternalReview.
                    // DocumentRequest might be visible? 
                    // Let's stick to showing just the Request status and description, and Documents.
                }
            }
        }
    });

    if (!request) {
        notFound();
    }

    if (request.companyId !== session.user.companyId) {
        redirect("/portal/requests"); // Unauthorized access to another company's request
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/portal/requests"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Request Details</h1>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span>ID: {request.id}</span>
                    </div>
                </div>
                <div className="ml-auto">
                    <Badge variant={
                        request.status === 'Completed' ? 'default' :
                            request.status === 'InProgress' ? 'secondary' : 'outline'
                    } className="text-base px-3 py-1">
                        {request.status}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm space-y-4">
                                <div>
                                    <h4 className="font-semibold text-muted-foreground mb-1">Service Type</h4>
                                    <p>{request.serviceType}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-muted-foreground mb-1">Details</h4>
                                    <p className="whitespace-pre-wrap">{request.description || "No description provided."}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-muted-foreground mb-1">Created Date</h4>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>{format(new Date(request.createdAt), 'PPP')}</span>
                                        </div>
                                    </div>
                                    {request.dueDate && (
                                        <div>
                                            <h4 className="font-semibold text-muted-foreground mb-1">Target Date</h4>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>{format(new Date(request.dueDate), 'PPP')}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline Placeholder - In real app, query ActivityLog */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Status Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border-l-2 border-muted pl-4 ml-2 space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary" />
                                    <p className="text-sm font-medium">Request Received</p>
                                    <p className="text-xs text-muted-foreground">{format(new Date(request.createdAt), 'MMM d, yyyy h:mm a')}</p>
                                </div>
                                {/* Dynamically add more based on audit logs */}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Documents</CardTitle>
                            <CardDescription>Files associated with this request</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {request.documents.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
                            ) : (
                                <div className="space-y-2">
                                    {request.documents.map(doc => (
                                        <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                                                <span className="text-sm truncate">{doc.filename}</span>
                                            </div>
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={`/api/documents/${doc.id}/download`} target="_blank" rel="noopener noreferrer">
                                                    <Download className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Separator />
                            <Button className="w-full" disabled>
                                Upload Document (Coming Soon)
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
