"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User as UserIcon, MoreHorizontal, ArrowUpRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface KanbanCardProps {
    request: {
        id: string
        serviceType: string
        priority: string
        description: string | null
        company: { legalName: string }
        assignedTo: { name: string | null } | null
        updatedAt: string | Date
    }
    onClick?: () => void
}

export function KanbanCard({ request, onClick }: KanbanCardProps) {
    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case "Urgent": return "bg-red-500/10 text-red-600 border-red-200/50 dot-red-500"
            case "High": return "bg-orange-500/10 text-orange-600 border-orange-200/50 dot-orange-500"
            case "Med": return "bg-amber-500/10 text-amber-600 border-amber-200/50 dot-amber-500"
            default: return "bg-blue-500/10 text-blue-600 border-blue-200/50 dot-blue-500"
        }
    }

    return (
        <Card
            className="group shadow-sm border-border hover:border-accent/40 hover:shadow-md transition-all cursor-grab active:cursor-grabbing bg-card overflow-hidden"
            onClick={onClick}
        >
            <CardHeader className="p-4 pb-2 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="secondary"
                            className={cn(
                                "text-[10px] h-5 px-1.5 font-bold uppercase tracking-widest border-transparent flex items-center gap-1.5",
                                getPriorityStyles(request.priority)
                            )}
                        >
                            <span className="h-1 w-1 rounded-full bg-current" />
                            {request.priority}
                        </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                </div>

                <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-accent transition-colors flex items-center justify-between">
                        {request.company.legalName}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-accent" />
                    </h4>
                    <p className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-tight">
                        {request.serviceType}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
                {request.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                        {request.description}
                    </p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                            <UserIcon className="h-3 w-3 text-accent" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground tracking-tight">
                            {request.assignedTo?.name || "Unassigned"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60">
                        <Clock className="h-3 w-3" />
                        <span>{formatDistanceToNow(new Date(request.updatedAt))} ago</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
