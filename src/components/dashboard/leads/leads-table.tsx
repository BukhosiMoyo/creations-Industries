"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    MoreHorizontal,
    User as UserIcon,
    ExternalLink,
    CheckCircle2,
    FileText,
    Target
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface LeadsTableProps {
    searchQuery: string
}

const MOCK_LEADS = [
    {
        id: "l_1",
        fullName: "Sarah Jenkins",
        companyName: "Nexus Tech Solutions",
        email: "sarah@nexustech.io",
        serviceType: "Tax",
        urgency: "Urgent_24_48h",
        budgetRange: "R15k_30k",
        status: "New",
        leadScore: 88,
        priorityTag: "High",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        assignedTo: { name: "John Doe" },
        docCount: 3
    },
    {
        id: "l_2",
        fullName: "Markus Webber",
        companyName: "Webber Logistics",
        email: "m.webber@logistics.co.za",
        serviceType: "Bookkeeping",
        urgency: "Soon_7d",
        budgetRange: "R5k_15k",
        status: "Contacted",
        leadScore: 54,
        priorityTag: "Med",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        assignedTo: { name: "Sarah Smith" },
        docCount: 0
    },
    {
        id: "l_3",
        fullName: "Elena Rodriguez",
        companyName: "Solaris Creative",
        email: "elena@solaris.studio",
        serviceType: "CIPC",
        urgency: "Flexible_30d",
        budgetRange: "Under5k",
        status: "Qualified",
        leadScore: 32,
        priorityTag: "Low",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        assignedTo: null,
        docCount: 1
    }
]

export function LeadsTable({ searchQuery }: LeadsTableProps) {
    const router = useRouter()
    const leads = MOCK_LEADS.filter(l =>
        l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.companyName && l.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "New": return "bg-blue-500/10 text-blue-600 border-blue-200/50"
            case "Contacted": return "bg-indigo-500/10 text-indigo-600 border-indigo-200/50"
            case "Qualified": return "bg-emerald-500/10 text-emerald-600 border-emerald-200/50"
            case "AwaitingDocs": return "bg-amber-500/10 text-amber-600 border-amber-200/50"
            case "Converted": return "bg-emerald-500 text-white border-transparent"
            case "Lost": return "bg-slate-500/10 text-slate-600 border-slate-200/50"
            default: return "bg-muted/30 text-muted-foreground"
        }
    }

    const getUrgencyIcon = (urgency: string) => {
        switch (urgency) {
            case "Urgent_24_48h": return <Badge className="bg-red-500 text-white border-0 font-bold text-[9px] h-5 px-1.5 uppercase">Urgent</Badge>
            case "Soon_7d": return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200/50 font-bold text-[9px] h-5 px-1.5 uppercase">Soon</Badge>
            default: return <Badge className="bg-slate-500/10 text-slate-600 border-slate-200/50 font-bold text-[9px] h-5 px-1.5 uppercase">Flexible</Badge>
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 75) return "text-red-500 bg-red-500/10"
        if (score >= 45) return "text-amber-500 bg-amber-500/10"
        return "text-blue-500 bg-blue-500/10"
    }

    return (
        <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent border-border/40">
                        <TableHead className="w-[80px] text-[10px] font-bold uppercase tracking-widest pl-6">Score</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lead Info</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Details</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Assigned</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right pr-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map((lead) => (
                        <TableRow
                            key={lead.id}
                            className="group hover:bg-muted/30 border-border/40 transition-colors cursor-pointer"
                            onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                        >
                            <TableCell className="pl-6">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex flex-col items-center justify-center border border-transparent font-bold",
                                    getScoreColor(lead.leadScore)
                                )}>
                                    <span className="text-xs">{lead.leadScore}</span>
                                    <span className="text-[7px] uppercase tracking-tighter opacity-70">Score</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors flex items-center gap-1.5">
                                        {lead.fullName}
                                        {lead.docCount > 0 && <FileText className="h-3 w-3 text-muted-foreground/50" />}
                                    </p>
                                    <p className="text-[11px] font-bold text-muted-foreground/80 truncate max-w-[180px]">
                                        {lead.companyName || lead.email}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1.5">
                                    <Badge variant="outline" className="bg-muted/30 border-0 text-[10px] font-bold text-muted-foreground h-5">
                                        {lead.serviceType}
                                    </Badge>
                                    {getUrgencyIcon(lead.urgency)}
                                    <Badge variant="outline" className="bg-muted/30 border-0 text-[10px] font-bold text-muted-foreground h-5 tabular-nums">
                                        {lead.budgetRange.replace('R', '').replace('Plus', '+')}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge className={cn(
                                    "text-[9px] h-5 px-2 font-bold uppercase tracking-widest border border-transparent",
                                    getStatusStyle(lead.status)
                                )}>
                                    {lead.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                                        <UserIcon className="h-3.5 w-3.5 text-accent" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold text-foreground leading-none">
                                            {lead.assignedTo?.name || "Unassigned"}
                                        </p>
                                        <p className="text-[9px] font-bold text-muted-foreground/60 leading-none">
                                            {formatDistanceToNow(lead.createdAt)} ago
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-6">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-accent/10 hover:text-accent">
                                        <Target className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-accent/10 hover:text-accent">
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="p-4 border-t border-border/40 bg-muted/20 flex items-center justify-between">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                    Showing {leads.length} leads
                </p>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-[11px] font-bold uppercase tracking-widest" disabled>Previous</Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-[11px] font-bold uppercase tracking-widest border border-border/40 bg-background/50 hover:bg-background">1</Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-[11px] font-bold uppercase tracking-widest" disabled>Next</Button>
                </div>
            </div>
        </div>
    )
}
