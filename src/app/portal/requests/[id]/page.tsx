import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Calendar, FileText, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ClientUploadZone } from "@/components/portal/client-upload-zone";
import { AccessLevel } from "@prisma/client";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // In a real app we might fetch the title here, but for now generic is fine
    // keeping it fast.
    return {
        title: `Request #${id.slice(-4)} | Portal`
    }
}

export default async function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) redirect("/portal");

    const { id } = await params;
    const requestId = id;

    const request = await prisma.serviceRequest.findFirst({
        where: {
            id: requestId,
            companyId: session.user.companyId
        },
        include: {
            activities: {
                orderBy: { createdAt: 'desc' },
                include: { actor: true }
            },
            documents: {
                where: { accessLevel: { not: "InternalOnly" as AccessLevel } }, // Type assertion if needed, or matches prisma schema
                orderBy: { uploadedAt: 'desc' }
            }
        }
    });

    if (!request) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-2xl font-bold mb-2">Request Not Found</h1>
                <p className="text-muted-foreground mb-6">This request request does not exist or you do not have permission to view it.</p>
                <Button asChild>
                    <Link href="/portal/requests">Return to Requests</Link>
                </Button>
            </div>
        );
    }

    const nextStepMessage = {
        'New': "We have received your request and are assigning it to a tailored specialist.",
        'InProgress': "Our team is actively working on your request. We will update you shortly.",
        'AwaitingDocs': "We need some additional information or documents to proceed. Please upload them below.",
        'Submitted': "Your request has been submitted for final processing/filing.",
        'Completed': "This request has been successfully completed.",
        'Archived': "This request has been archived."
    }[request.status] || "We are reviewing your request.";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Button variant="ghost" size="sm" asChild className="w-fit -ml-2 text-muted-foreground">
                    <Link href="/portal/requests"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Requests</Link>
                </Button>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold tracking-tight">{request.serviceType.replace(/([A-Z])/g, ' $1').trim()}</h1>
                            <Badge variant={
                                request.status === 'Completed' ? 'default' :
                                    request.status === 'AwaitingDocs' ? 'destructive' :
                                        'secondary'
                            } className="text-sm px-3 py-0.5">
                                {request.status === 'AwaitingDocs' ? 'Action Required' : request.status}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1.5" />
                                Created {format(new Date(request.createdAt), 'MMM d, yyyy')}
                            </span>
                            <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1.5" />
                                Last updated {format(new Date(request.updatedAt), 'MMM d, h:mm a')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content - Left 2/3 */}
                <div className="md:col-span-2 space-y-6">
                    {/* What Happens Next Panel */}
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base text-primary flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" /> Status Update
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-medium leading-relaxed">
                                {nextStepMessage}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Request Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative pl-4 border-l-2 border-muted space-y-8 my-2">
                                {request.activities.length === 0 ? (
                                    <p className="text-sm text-muted-foreground pl-4">No activity recorded yet.</p>
                                ) : (
                                    request.activities.map((activity) => (
                                        <div key={activity.id} className="relative pl-4">
                                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-background border-2 border-primary ring-4 ring-background" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-medium">{activity.actionSummary}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {format(new Date(activity.createdAt), 'MMM d, h:mm a')}
                                                    {activity.actor && ` by ${activity.actor.firstName || 'Support'}`}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {/* Initial State */}
                                <div className="relative pl-4 opacity-70">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-background border-2 border-muted ring-4 ring-background" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium">Request Created</span>
                                        <span className="text-xs text-muted-foreground">
                                            {format(new Date(request.createdAt), 'MMM d, h:mm a')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Request Summary Panel */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Request Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Description/Notes</h4>
                                <p className="text-sm p-3 bg-muted/30 rounded-lg border">
                                    {request.description || "No additional notes provided."}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Priority</h4>
                                    <p className="text-sm font-medium">{request.priority}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Reference ID</h4>
                                    <p className="text-sm font-family-mono text-muted-foreground">#{request.id.slice(-6)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar - Documents */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Documents
                            </CardTitle>
                            <CardDescription>
                                Upload required documents here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Upload Zone */}
                            <ClientUploadZone requestId={request.id} />

                            <div className="space-y-3">
                                <h4 className="text-xs font-semibold uppercase text-muted-foreground">Uploaded Files</h4>
                                {request.documents.length === 0 ? (
                                    <p className="text-sm text-muted-foreground italic">No documents uploaded yet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {request.documents.map((doc) => (
                                            <li key={doc.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors border text-sm group">
                                                <FileText className="h-4 w-4 text-primary shrink-0" />
                                                <span className="truncate flex-1 font-medium">{doc.filename}</span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {(doc.size ? doc.size / 1024 / 1024 : 0).toFixed(1)}MB
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
