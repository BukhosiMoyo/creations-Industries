"use client"

import * as React from "react"
import {
    ArrowLeft,
    MoreVertical,
    Mail,
    Phone,
    Globe,
    Calendar,
    Clock,
    FileText,
    CheckCircle2,
    XCircle,
    Copy,
    ExternalLink,
    ShieldCheck,
    History,
    FileUp,
    Download,
    CreditCard,
    Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { getLead } from "@/lib/leads/leads-service"

export default function LeadDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [lead, setLead] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchLead() {
            try {
                // Since getLead is a server action, we can call it directly or via API route.
                // However, client components usually fetch via API routes or pass server component data.
                // Given the architecture, let's try direct server action call if Next.js allows, 
                // or fallback to API if needed. But for now, let's simulate API call or direct import if server action.
                // Actually, `getLead` is marked "use server" at top of file, so we can call it.
                const data = await getLead(params.id)
                setLead(data)
            } catch (error) {
                console.error("Failed to fetch lead:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchLead()
    }, [params.id])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        )
    }

    if (!lead) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h2 className="text-xl font-bold">Lead Not Found</h2>
                <Button onClick={() => router.back()}>Back to Inbox</Button>
            </div>
        )
    }

    const steps = ["New", "Contacted", "Qualified", "AwaitingDocs", "Converted"]
    // Determine current step index based on status or pipeline stage
    // Map existing status/stage to steps
    let currentStepIndex = steps.indexOf(lead.status)
    if (currentStepIndex === -1) {
        // Fallback or handle "Lost" / "Spam"
        if (lead.status === "Lost") currentStepIndex = -1 // distinct state?
        else currentStepIndex = 0
    }

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Top Navigation & Actions */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    className="gap-2 -ml-2 text-muted-foreground hover:text-foreground font-bold text-xs uppercase tracking-widest"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Inbox
                </Button>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 gap-2 border-border/40 font-bold text-xs uppercase tracking-widest">
                        <XCircle className="h-4 w-4 text-destructive/70" />
                        Mark as Lost
                    </Button>
                    <Button className="h-10 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-600/20">
                        <CheckCircle2 className="h-4 w-4" />
                        Convert to Client
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Header / Summary Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-border/40 bg-card/50 shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-8 space-y-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h1 className="text-3xl font-bold tracking-tight">{lead.firstName} {lead.lastName}</h1>
                                            <Badge className="bg-red-500/10 text-red-600 border-red-200/50 font-bold text-[10px] uppercase h-6">
                                                {lead.priorityTag} Priority
                                            </Badge>
                                        </div>
                                        <p className="text-lg font-medium text-muted-foreground">{lead.companyName || "Individual"}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-1">
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/80 hover:text-foreground transition-colors cursor-pointer group">
                                            <div className="h-8 w-8 rounded-lg bg-muted/40 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                                <Mail className="h-4 w-4 group-hover:text-accent" />
                                            </div>
                                            {lead.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/80 hover:text-foreground transition-colors cursor-pointer group">
                                            <div className="h-8 w-8 rounded-lg bg-muted/40 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                                <Phone className="h-4 w-4 group-hover:text-accent" />
                                            </div>
                                            {lead.phone}
                                        </div>
                                        {lead.websiteUrl && (
                                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/80 hover:text-foreground transition-colors cursor-pointer group">
                                                <div className="h-8 w-8 rounded-lg bg-muted/40 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                                    <Globe className="h-4 w-4 group-hover:text-accent" />
                                                </div>
                                                {lead.websiteUrl}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center p-6 bg-accent/[0.03] border border-accent/10 rounded-2xl w-full md:w-40 gap-1.5 shrink-0">
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] leading-none mb-1">Lead Score</p>
                                    <span className="text-5xl font-black text-accent tracking-tighter tabular-nums">{lead.leadScore}</span>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <ShieldCheck className="h-3 w-3 text-accent/60" />
                                        <p className="text-[10px] font-bold text-accent/60 uppercase">Verified Triage</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Stepper */}
                            <div className="space-y-4 pt-4">
                                <div className="flex justify-between items-center mb-10 relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-muted/30 -z-10" />
                                    {steps.map((step, i) => (
                                        <div key={step} className="flex flex-col items-center gap-3 relative bg-card">
                                            <div className={cn(
                                                "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all font-bold text-sm",
                                                i < currentStepIndex ? "bg-accent border-accent text-white" :
                                                    i === currentStepIndex ? "bg-background border-accent text-accent shadow-lg shadow-accent/20 scale-110" :
                                                        "bg-background border-muted text-muted-foreground"
                                            )}>
                                                {i < currentStepIndex ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                                            </div>
                                            <span className={cn(
                                                "absolute -bottom-8 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest",
                                                i <= currentStepIndex ? "text-foreground" : "text-muted-foreground/40"
                                            )}>
                                                {step}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Message Preview (If any) */}
                        {lead.message && (
                            <div className="px-8 py-6 bg-muted/10 border-t border-border/40">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <FileText className="h-3.5 w-3.5" />
                                    Submission Message
                                </p>
                                <p className="text-sm font-medium leading-relaxed italic text-muted-foreground/90 whitespace-pre-wrap">
                                    {lead.message}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Sidebar Info */}
                <Card className="border-border/40 bg-card/50 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Triage Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            {[
                                { label: "Source", value: lead.source, icon: Globe },
                                { label: "Service Type", value: lead.serviceType, icon: FileText },
                                { label: "Urgency", value: lead.urgency?.replace(/_/g, ' '), icon: Clock },
                                { label: "Budget", value: lead.budgetRange, icon: CreditCard },
                                { label: "Created", value: `${formatDistanceToNow(new Date(lead.createdAt))} ago`, icon: Calendar },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-2.5">
                                        <item.icon className="h-4 w-4 text-muted-foreground/60 group-hover:text-accent transition-colors" />
                                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">{item.label}</span>
                                    </div>
                                    <span className="text-xs font-bold">{item.value || "N/A"}</span>
                                </div>
                            ))}
                        </div>

                        <Separator className="bg-border/40" />

                        <div className="space-y-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Internal Portal</p>
                            <div className="flex items-center gap-2">
                                <Input value={`https://creations.io/lead/secure-${lead.referenceId}`} readOnly className="h-9 text-[11px] bg-muted/40 font-mono" />
                                <Button size="icon" variant="outline" className="h-9 w-9 shrink-0 border-border/40">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest h-8 text-accent hover:bg-accent/5">
                                Visit Public Portal
                                <ExternalLink className="h-3 w-3 ml-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="timeline" className="space-y-6">
                <TabsList className="bg-muted/40 p-1.5 rounded-2xl h-12 w-full sm:w-auto">
                    <TabsTrigger value="timeline" className="rounded-xl h-full px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-accent">
                        <History className="h-4 w-4 mr-2" />
                        Timeline
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="rounded-xl h-full px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-accent">
                        <FileText className="h-4 w-4 mr-2" />
                        Documents
                        <Badge className="ml-2 bg-accent/10 text-accent border-transparent text-[9px] h-4 min-w-[1.2rem] flex items-center justify-center p-0">
                            {lead.documents?.length || 0}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="rounded-xl h-full px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-accent">
                        Notes
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="space-y-4">
                    <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/30">
                        {/* Real Timeline Events */}
                        {lead.statusEvents && lead.statusEvents.length > 0 ? (
                            lead.statusEvents.map((event: any, i: number) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[30px] top-1 h-6 w-6 rounded-full bg-background border-2 border-accent flex items-center justify-center shadow-lg shadow-accent/20 z-10">
                                        <div className="h-2 w-2 rounded-full bg-accent" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold leading-none">Status Change: {event.newStatus}</p>
                                        <p className="text-xs text-muted-foreground font-medium">From {event.oldStatus}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tight tabular-nums">
                                            {formatDistanceToNow(new Date(event.createdAt))} ago
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="relative">
                                <div className="absolute -left-[30px] top-1 h-6 w-6 rounded-full bg-background border-2 border-accent flex items-center justify-center shadow-lg shadow-accent/20 z-10">
                                    <div className="h-2 w-2 rounded-full bg-accent" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold leading-none">Lead Created</p>
                                    <p className="text-xs text-muted-foreground font-medium">via {lead.source}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tight tabular-nums">
                                        {formatDistanceToNow(new Date(lead.createdAt))} ago
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="documents" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Upload New Card */}
                    <div className="rounded-2xl border-2 border-dashed border-border/40 hover:border-accent/30 transition-colors bg-card/20 flex flex-col items-center justify-center p-10 gap-3 group cursor-pointer">
                        <div className="h-12 w-12 rounded-full bg-muted/40 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                            <FileUp className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors" />
                        </div>
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Upload New File</p>
                    </div>
                    {/* Real Document Cards */}
                    {lead.documents?.map((doc: any) => (
                        <Card key={doc.id} className="border-border/40 bg-card/50 hover:border-accent/20 transition-all group shadow-sm">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-accent/5 flex items-center justify-center border border-accent/10">
                                    <FileText className="h-5 w-5 text-accent" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate pr-6 leading-tight">{doc.filename}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className="bg-muted/30 border-0 text-[8px] font-bold h-4 px-1">{doc.type}</Badge>
                                        <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : 'N/A'}</span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                    {(!lead.documents || lead.documents.length === 0) && (
                        <div className="col-span-full py-10 text-center text-muted-foreground text-xs font-medium italic">
                            No documents uploaded yet.
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
