"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface KanbanColumnProps {
    label: string
    count: number
    children: React.ReactNode
    accentColor?: string
}

export function KanbanColumn({ label, count, children, accentColor }: KanbanColumnProps) {
    return (
        <div className="w-80 flex flex-col gap-5">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-[13px] uppercase tracking-wider text-foreground">
                        {label}
                    </h3>
                    <Badge
                        variant="secondary"
                        className="h-5 px-1.5 rounded-full bg-muted/60 text-[11px] font-bold text-muted-foreground border-transparent"
                    >
                        {count}
                    </Badge>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground/60 hover:text-foreground">
                        <Plus className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground/60 hover:text-foreground">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            <div
                className={cn(
                    "flex-1 rounded-2xl p-3 space-y-3 min-h-[600px] border border-transparent transition-colors",
                    "bg-muted/30 hover:bg-muted/40",
                    accentColor && `border-t-2 ${accentColor}`
                )}
            >
                {children}
            </div>
        </div>
    )
}
