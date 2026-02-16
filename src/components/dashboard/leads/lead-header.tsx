"use client"

import { Lead } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, UserPlus, FileText, ArrowRight, Briefcase } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface LeadHeaderProps {
    lead: Lead & { assignedToUser?: { name: string | null } | null }
}

export function LeadHeader({ lead }: LeadHeaderProps) {
    const copyId = () => {
        navigator.clipboard.writeText(lead.referenceId)
        toast.success("Lead ID copied")
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard/leads" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">{lead.firstName} {lead.lastName}</h1>
                    <Badge variant="outline" className="ml-2 font-mono text-xs cursor-pointer hover:bg-muted" onClick={copyId}>
                        {lead.referenceId}
                        <Copy className="w-3 h-3 ml-1 opacity-50" />
                    </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground pl-6">
                    <span className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(lead.status)}`} />
                        {lead.status}
                    </span>
                    <span>•</span>
                    <span>{lead.companyName || "Personal"}</span>
                    <span>•</span>
                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 pl-6 md:pl-0">
                <Button variant="outline" size="sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    {lead.assignedToUser ? `Assigned: ${lead.assignedToUser.name?.split(" ")[0]}` : "Assign"}
                </Button>

                {/* View Pipeline (Only if converted/has request) - Placeholder logic as request linkage might be complex */}
                {lead.status === "Converted" && (
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/pipeline">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Pipeline
                        </Link>
                    </Button>
                )}

                {lead.status !== "Converted" && (
                    <Button size="sm">
                        Convert to Request
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </div>
    )
}

function getStatusColor(status: string) {
    switch (status) {
        case "New": return "bg-blue-500"
        case "Converted": return "bg-green-500"
        case "Lost": return "bg-gray-500"
        default: return "bg-yellow-500"
    }
}
