"use client"

import * as React from "react"
import {
    CheckCircle2,
    Clock,
    FileText,
    AlertCircle,
    History,
    ShieldCheck,
    Mail,
    Phone,
    Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortalUploadZone } from "@/components/leads/portal-upload-zone"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface PortalDocument {
    id: string
    name: string
    type: string
    createdAt: string
}

interface PortalStatusEvent {
    id: string
    status: string
    comment: string | null
    createdAt: string
}

interface PortalLead {
    id: string
    fullName: string
    status: string
    serviceType: string
    createdAt: string
    documents: PortalDocument[]
    statusEvents: PortalStatusEvent[]
}

export default function PublicLeadPortal({ params }: { params: { token: string } }) {
    const [lead, setLead] = React.useState<PortalLead | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    const fetchLead = React.useCallback(async () => {
        try {
            const res = await fetch(`/api/leads/portal/${params.token}`)
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Failed to load portal")
            }
            const data: PortalLead = await res.json()
            setLead(data)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }, [params.token])

    React.useEffect(() => {
        fetchLead()
    }, [fetchLead])

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background">
                <div className="h-16 w-16 rounded-full border-t-2 border-accent animate-spin mb-4" />
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em] animate-pulse">Initializing Portal</p>
            </div>
        )
    }

    if (error || !lead) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <Card className="max-w-md w-full border-destructive/20 bg-destructive/[0.02]">
                    <CardHeader className="text-center">
                        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-xl font-bold">Access Denied</CardTitle>
                        <CardDescription className="font-medium">{error || "Invalid Access"}</CardDescription>
                    </CardHeader>
                    <Separator className="bg-destructive/10" />
                    <CardContent className="pt-6 text-center">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            This link may have expired or is incorrect. Please contact our support if you believe this is an error.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const steps = ["New", "Contacted", "Qualified", "AwaitingDocs", "Converted"]
    const currentStepIndex = steps.indexOf(lead.status)

    return (
        <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background pb-20">
            {/* Header / Brand Area */}
            <div className="w-full border-b border-border/40 bg-background/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-black text-lg tracking-tighter leading-none italic">CREATIONS</p>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-0.5">Secure Client Portal</p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 pt-12 space-y-10">
                {/* Intro Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-1"
                        >
                            <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                                Welcome back, {lead.fullName.split(' ')[0]}
                            </h2>
                            <p className="text-lg font-medium text-muted-foreground">
                                Track your {lead.serviceType} service request and provide the necessary information.
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-11 rounded-2xl gap-2 font-bold text-xs uppercase tracking-widest border-border/40">
                            <Phone className="h-4 w-4" />
                            Talk to us
                        </Button>
                    </div>
                </div>

                {/* Status Dashboard Card */}
                <Card className="border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl shadow-accent/5 overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-8 md:p-12 space-y-12">
                            {/* Modern Status Stepper */}
                            <div className="relative pt-8 pb-12">
                                <div className="absolute left-0 top-[3.25rem] w-full h-[2px] bg-muted/30 -z-10" />
                                <div className="flex justify-between items-center relative gap-4 overflow-x-auto pb-8 md:pb-0 hide-scrollbar">
                                    {steps.map((step, i) => (
                                        <div key={step} className="flex flex-col items-center gap-4 relative min-w-[100px]">
                                            <div className={cn(
                                                "h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all font-bold text-sm",
                                                i < currentStepIndex ? "bg-accent border-accent text-white" :
                                                    i === currentStepIndex ? "bg-background border-accent text-accent shadow-xl shadow-accent/20 scale-125 z-10" :
                                                        "bg-background border-muted text-muted-foreground"
                                            )}>
                                                {i < currentStepIndex ? <CheckCircle2 className="h-6 w-6" /> : i + 1}
                                            </div>
                                            <div className="text-center space-y-1 h-10">
                                                <p className={cn(
                                                    "text-[10px] font-black uppercase tracking-[0.15em]",
                                                    i <= currentStepIndex ? "text-foreground" : "text-muted-foreground/40"
                                                )}>
                                                    {step}
                                                </p>
                                                {i === currentStepIndex && (
                                                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest animate-pulse whitespace-nowrap">Current Stage</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary Footer */}
                        <div className="px-8 py-6 bg-accent/[0.03] border-t border-border/40 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Requested Service</p>
                                <p className="text-sm font-bold flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-accent" />
                                    {lead.serviceType} Consulting
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Account Manager</p>
                                <p className="text-sm font-bold flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-accent" />
                                    Allocated to Specialist
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Last Update</p>
                                <p className="text-sm font-bold">
                                    {lead.statusEvents?.[0] ? `${formatDistanceToNow(new Date(lead.statusEvents[0].createdAt))} ago` : "Just now"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Resource Tabs */}
                <Tabs defaultValue="documents" className="space-y-8">
                    <div className="flex items-center justify-between overflow-x-auto hide-scrollbar pb-2">
                        <TabsList className="bg-muted/40 p-1.5 rounded-2xl h-14">
                            <TabsTrigger value="documents" className="rounded-xl h-full px-10 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-accent transition-all">
                                <FileText className="h-4 w-4 mr-2" />
                                Documents
                                <Badge className="ml-2 bg-accent/10 text-accent border-transparent text-[9px] h-4 px-2">{lead.documents?.length || 0}</Badge>
                            </TabsTrigger>
                            <TabsTrigger value="timeline" className="rounded-xl h-full px-10 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-accent transition-all">
                                <History className="h-4 w-4 mr-2" />
                                Activity
                            </TabsTrigger>
                            <TabsTrigger value="help" className="rounded-xl h-full px-10 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-accent transition-all">
                                Support
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="documents" className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {/* Upload Area */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold tracking-tight">Requirement Checklist</h3>
                                    <p className="text-sm text-muted-foreground">Please upload the following documents to expedite your application process.</p>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { label: "Identity Document (ID/Passport)", required: true },
                                        { label: "Company Registration Documents", required: true },
                                        { label: "Recent Bank Statement", required: false },
                                    ].map((req, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-card hover:bg-muted/30 transition-colors">
                                            <span className="text-xs font-bold leading-none">{req.label}</span>
                                            {req.required && (
                                                <Badge variant="outline" className="text-[8px] font-black uppercase text-accent border-accent/30 bg-accent/5">Required</Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <PortalUploadZone token={params.token} onUploadSuccess={fetchLead} />
                            </div>

                            {/* Existing Documents List */}
                            <div className="lg:col-span-3 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold tracking-tight">Provided Files</h3>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{(lead.documents?.length || 0)} Files Uploaded</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <AnimatePresence mode="popLayout">
                                        {!lead.documents || lead.documents.length === 0 ? (
                                            <div className="col-span-full py-20 bg-muted/10 border-2 border-dashed border-border/40 rounded-3xl flex flex-col items-center justify-center opacity-40">
                                                <FileText className="h-10 w-10 mb-4" />
                                                <p className="text-[10px] font-black uppercase tracking-widest">No documents yet</p>
                                            </div>
                                        ) : (
                                            lead.documents.map((doc: PortalDocument) => (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    key={doc.id}
                                                >
                                                    <Card className="border-border/40 bg-card/60 hover:border-accent/30 transition-all group overflow-hidden">
                                                        <CardContent className="p-4 flex items-center gap-4">
                                                            <div className="h-11 w-11 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10">
                                                                <FileText className="h-5 w-5 text-accent" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-bold truncate pr-6 leading-tight">{doc.name}</p>
                                                                <p className="text-[9px] font-bold text-muted-foreground/60 uppercase mt-1 tracking-tight">
                                                                    {formatDistanceToNow(new Date(doc.createdAt))} ago
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-accent">
                                                                    <Download className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="timeline">
                        <div className="max-w-2xl mx-auto py-10 space-y-12">
                            <div className="relative pl-12 space-y-10 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-accent before:via-accent/40 before:to-transparent">
                                {lead.statusEvents?.map((event: PortalStatusEvent, i: number) => (
                                    <div key={event.id} className="relative group">
                                        <div className={cn(
                                            "absolute -left-[45px] top-1 h-9 w-9 rounded-full bg-background border-2 flex items-center justify-center transition-all z-10",
                                            i === 0 ? "border-accent shadow-xl shadow-accent/40" : "border-muted group-hover:border-accent/40"
                                        )}>
                                            {i === 0 ? <CheckCircle2 className="h-5 w-5 text-accent" /> : <Clock className="h-5 w-5 text-muted-foreground" />}
                                        </div>
                                        <div className="space-y-1.5 pt-1">
                                            <div className="flex items-baseline justify-between group">
                                                <h4 className="text-base font-bold leading-none tracking-tight">{event.status === lead.status ? "Current Stage" : "Stage Completed"}: {event.status}</h4>
                                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tabular-nums">{formatDistanceToNow(new Date(event.createdAt))} ago</span>
                                            </div>
                                            {event.comment && (
                                                <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 italic text-sm text-muted-foreground leading-relaxed">
                                                    &ldquo;{event.comment}&rdquo;
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Support Footer */}
            <div className="fixed bottom-8 right-8 z-50">
                <Button className="h-14 px-8 rounded-full bg-foreground text-background font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all group">
                    <Mail className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                    Support
                </Button>
            </div>
        </div>
    )
}
