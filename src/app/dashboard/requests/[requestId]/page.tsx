import { getSession } from "@/lib/rbac"
import { getServiceRequest, getStaffUsers } from "@/lib/dashboard-data"
import { redirect, notFound } from "next/navigation"
import { JsonViewer } from "@/components/dashboard/shared/json-viewer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Briefcase, Building2 } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { getServiceLabel } from "@/lib/quote-catalog"
import { Badge } from "@/components/ui/badge"
import { RequestActions } from "@/components/dashboard/requests/request-actions"

export default async function RequestDetailsPage({ params }: { params: Promise<{ requestId: string }> }) {
    const { requestId } = await params
    const session = await getSession()
    if (!session) redirect("/auth/login")

    const [request, staffUsers] = await Promise.all([
        getServiceRequest(session.user.id, session.user.role || "STAFF", requestId),
        getStaffUsers()
    ])

    if (!request) notFound()

    let detailsData = {}
    try {
        if (request.description && request.description.trim().startsWith("{")) {
            detailsData = JSON.parse(request.description)
        }
    } catch (e) {
        // Not JSON
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/requests" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Request Details</h1>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Badge variant="outline">{request.status}</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-base font-medium">Request Information</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground uppercase font-bold">Client</span>
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium">{request.company.legalName}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground uppercase font-bold">Service Type</span>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium">{getServiceLabel(request.serviceType)}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground uppercase font-bold">Priority</span>
                                <span className="font-medium">{request.priority}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground uppercase font-bold">Created</span>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Details / Description */}
                    {Object.keys(detailsData).length > 0 ? (
                        <JsonViewer title="Request Details" data={detailsData} />
                    ) : (
                        <Card>
                            <CardHeader className="pb-3 border-b">
                                <CardTitle className="text-base font-medium">Description</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {request.description || "No description provided."}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="space-y-6">
                    <RequestActions request={request} staffUsers={staffUsers} />
                </div>
            </div>
        </div>
    )
}
