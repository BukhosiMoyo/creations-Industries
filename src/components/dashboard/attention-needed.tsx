"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AlertCircle, Clock, ChevronRight, FileSearch, CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AttentionItem {
    id: string
    type: "overdue" | "stuck" | "upcoming"
    clientName: string
    serviceType: string
    dueDate?: Date
    ageInStage?: string
    priority: "High" | "Medium" | "Low"
}

export function AttentionNeeded({ items }: { items: AttentionItem[] }) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Clear for now! No urgent attention needed.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {items.map((item, idx) => (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 hover:border-accent/30 transition-all cursor-pointer"
                >
                    <div className="flex items-start gap-3">
                        <div className={cn(
                            "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                            item.type === "overdue" ? "bg-red-500/10 text-red-500" :
                                item.type === "stuck" ? "bg-amber-500/10 text-amber-500" : "bg-accent/10 text-accent"
                        )}>
                            {item.type === "overdue" ? <CalendarClock className="h-5 w-5" /> :
                                item.type === "stuck" ? <FileSearch className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-foreground">{item.clientName}</span>
                                <Badge variant="outline" className="text-[10px] font-bold uppercase h-5 bg-background border-border">
                                    {item.serviceType}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                                {item.type === "overdue" ? `Overdue since ${item.dueDate?.toLocaleDateString()}` :
                                    item.type === "stuck" ? `Stuck in Awaiting Docs for ${item.ageInStage}` :
                                        `Due on ${item.dueDate?.toLocaleDateString()}`}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-0 flex items-center gap-3 ml-13 sm:ml-0">
                        <Badge className={cn(
                            "text-[10px] font-bold uppercase tracking-wider",
                            item.priority === "High" ? "bg-red-500 text-white" :
                                item.priority === "Medium" ? "bg-amber-500 text-white" : "bg-accent text-white"
                        )}>
                            {item.priority}
                        </Badge>
                        <Button size="icon-xs" variant="ghost" className="rounded-full group-hover:bg-accent group-hover:text-white transition-all">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
