import { getSession } from "@/lib/rbac"
import { getLeadDetails, getStaffUsers } from "@/lib/dashboard-data"
import { redirect, notFound } from "next/navigation"
import { LeadHeader } from "@/components/dashboard/leads/lead-header"
import { LeadActions } from "@/components/dashboard/leads/lead-actions"
import { JsonViewer } from "@/components/dashboard/shared/json-viewer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe, Calendar, User, FileText, Briefcase } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default async function LeadDetailsPage({ params }: { params: Promise<{ leadId: string }> }) {
    const { leadId } = await params
    const session = await getSession()
    if (!session) redirect("/auth/login")

    const [lead, staffUsers] = await Promise.all([
        getLeadDetails(session.user.id, session.user.role || "STAFF", leadId),
        getStaffUsers()
    ])

    if (!lead) notFound()

    const metadata = (lead.metadata as any) || {}
    const { servicesDump, currentDetails, ...otherMeta } = metadata

    // Attempt to extract specific service details
    const serviceDetails = servicesDump?.[0]?.details || currentDetails || {}

    return (
        <div className="space-y-8 pb-10">
            <LeadHeader lead={lead} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COL: Core Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Card */}
                    <Card>
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-base font-medium">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoItem icon={Mail} label="Email" value={lead.email} copyable />
                            <InfoItem icon={Phone} label="Phone" value={lead.phone} copyable />
                            <InfoItem icon={MapPin} label="Location" value={lead.freeTextLocation || lead.location} />
                            <InfoItem icon={Globe} label="Website" value={lead.websiteUrl || "—"} isLink />
                            <InfoItem icon={User} label="First Name" value={lead.firstName} />
                            <InfoItem icon={User} label="Last Name" value={lead.lastName} />
                        </CardContent>
                    </Card>

                    {/* Service Request Card */}
                    <Card>
                        <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-medium">Request Summary</CardTitle>
                            <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">{lead.serviceType}</span>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                                <InfoItem icon={Calendar} label="Urgency" value={lead.urgency.replace(/_/g, " ")} />
                                <InfoItem icon={Briefcase} label="Budget Range" value={lead.budgetRange} />
                            </div>
                            <Separator />
                            <div>
                                <h4 className="text-sm font-medium mb-2">Message / Notes</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {lead.message || "No additional message provided."}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dynamic Details (JSON) */}
                    <JsonViewer title="Service Details" data={serviceDetails} />

                    {/* Documents */}
                    <Card>
                        <CardHeader className="pb-3 border-b flex flex-row items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <CardTitle className="text-base font-medium">Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {lead.documents.length === 0 ? (
                                <p className="text-sm text-muted-foreground italic">No documents uploaded yet.</p>
                            ) : (
                                <div className="space-y-2">
                                    {lead.documents.map(doc => (
                                        <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{doc.filename}</span>
                                                    <span className="text-[10px] text-muted-foreground">{doc.type} • {(doc.size || 0) / 1024} KB</span>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">Download</Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COL: Activity & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <LeadActions lead={lead} staffUsers={staffUsers} />

                    <Card>
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-base font-medium">Activity Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 px-0">
                            <div className="relative pl-6 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                                {lead.statusEvents.map((event, idx) => (
                                    <div key={event.id} className="relative flex items-start group">
                                        <div className="absolute left-[-23px] top-1 w-2.5 h-2.5 rounded-full border-2 border-background bg-primary ring-2 ring-transparent group-hover:ring-primary/20 transition-all" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">Status changed to <span className="text-primary">{event.newStatus}</span></p>
                                            <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="relative flex items-start">
                                    <div className="absolute left-[-23px] top-1 w-2.5 h-2.5 rounded-full border-2 border-background bg-muted-foreground/30" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">Lead Created</p>
                                        <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function InfoItem({ icon: Icon, label, value, copyable, isLink }: any) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-muted-foreground">
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-0.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
                <p className="text-sm font-medium truncate">
                    {isLink ? (
                        <a href={value.startsWith("http") ? value : `https://${value}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                            {value}
                        </a>
                    ) : (
                        value || "—"
                    )}
                </p>
            </div>
        </div>
    )
}
