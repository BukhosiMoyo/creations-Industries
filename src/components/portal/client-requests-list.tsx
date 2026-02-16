"use client"

import { ServiceRequest } from "@prisma/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"
import { FileText, ArrowRight } from "lucide-react"

interface ClientRequestsListProps {
    requests: ServiceRequest[]
}

export function ClientRequestsList({ requests }: ClientRequestsListProps) {
    const activeRequests = requests.filter(r => r.status !== 'Completed' && r.status !== 'Archived')
    const completedRequests = requests.filter(r => r.status === 'Completed' || r.status === 'Archived')

    const RequestTable = ({ data }: { data: ServiceRequest[] }) => (
        data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg bg-muted/20">
                <FileText className="h-10 w-10 text-muted-foreground mb-3 opacity-20" />
                <h3 className="text-lg font-medium">No requests found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    There are no requests in this category.
                </p>
            </div>
        ) : (
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Service</th>
                            {/* Hidden on small screens */}
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground hidden md:table-cell">Description</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground hidden md:table-cell">Last Updated</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {data.map((request) => (
                            <tr key={request.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group">
                                <td className="p-4 align-middle font-medium">
                                    <Link href={`/portal/requests/${request.id}`} className="hover:underline underline-offset-4 decoration-primary/50 block py-1">
                                        {request.serviceType.replace(/([A-Z])/g, ' $1').trim()}
                                    </Link>
                                </td>
                                <td className="p-4 align-middle max-w-[200px] truncate hidden md:table-cell text-muted-foreground">
                                    {request.description}
                                </td>
                                <td className="p-4 align-middle">
                                    <Badge variant={
                                        request.status === 'Completed' ? 'default' :
                                            request.status === 'AwaitingDocs' ? 'destructive' :
                                                request.status === 'InProgress' ? 'secondary' : 'outline'
                                    } className={
                                        request.status === 'AwaitingDocs' ? 'bg-orange-500 hover:bg-orange-600 border-none text-white' : ''
                                    }>
                                        {request.status === 'AwaitingDocs' ? 'Docs Needed' : request.status.replace(/([A-Z])/g, ' $1').trim()}
                                    </Badge>
                                </td>
                                <td className="p-4 align-middle text-muted-foreground hidden md:table-cell">
                                    {format(new Date(request.updatedAt), 'MMM d, yyyy')}
                                </td>
                                <td className="p-4 align-middle text-right">
                                    <Button asChild variant="ghost" size="sm" className="opacity-70 group-hover:opacity-100">
                                        <Link href={`/portal/requests/${request.id}`}>
                                            View <span className="hidden sm:inline ml-1">Details</span> <ArrowRight className="ml-1 h-3 w-3" />
                                        </Link>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    )

    return (
        <Tabs defaultValue="active" className="w-full">
            <div className="flex items-center justify-between mb-4">
                <TabsList>
                    <TabsTrigger value="active">Active Requests ({activeRequests.length})</TabsTrigger>
                    <TabsTrigger value="completed">Completed ({completedRequests.length})</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="active">
                <Card>
                    <CardHeader>
                        <CardTitle>Active Service Requests</CardTitle>
                        <CardDescription>Requests currently in progress or awaiting action.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RequestTable data={activeRequests} />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="completed">
                <Card>
                    <CardHeader>
                        <CardTitle>Completed History</CardTitle>
                        <CardDescription>Past requests that have been finalized.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RequestTable data={completedRequests} />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
