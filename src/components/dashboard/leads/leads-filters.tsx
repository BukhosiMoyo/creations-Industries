"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    X,
    ChevronDown,
    ShieldAlert,
    Zap,
    CreditCard,
    Briefcase
} from "lucide-react"


export function LeadsFilters() {
    return (
        <div className="pt-4 mt-4 border-t border-border/40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Filter Group: Priority */}
            <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 pl-1">
                    <ShieldAlert className="h-3 w-3" />
                    Priority Level
                </label>
                <div className="flex flex-wrap gap-1.5">
                    {["High", "Medium", "Low"].map((p) => (
                        <Button
                            key={p}
                            variant="outline"
                            className="h-8 border-border/40 text-[10px] font-bold uppercase px-3 hover:bg-accent/5 hover:border-accent/30"
                        >
                            {p}
                        </Button>
                    )) || <span>No priorities available</span>}
                </div>
            </div>

            {/* Filter Group: Urgency */}
            <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 pl-1">
                    <Zap className="h-3 w-3" />
                    Urgency
                </label>
                <div className="flex flex-wrap gap-1.5">
                    {["Urgent", "Soon", "Flexible"].map((u) => (u === "Urgent" ? (
                        <Button key={u} variant="outline" className="h-8 bg-red-500/5 border-red-200/50 text-red-600 text-[10px] font-bold uppercase px-3">
                            {u}
                        </Button>
                    ) : (
                        <Button key={u} variant="outline" className="h-8 border-border/40 text-[10px] font-bold uppercase px-3 hover:bg-accent/5 hover:border-accent/30">
                            {u}
                        </Button>
                    )))}
                </div>
            </div>

            {/* Filter Group: Budget */}
            <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 pl-1">
                    <CreditCard className="h-3 w-3" />
                    Budget Range
                </label>
                <div className="flex flex-wrap gap-1.5">
                    {["R30k+", "R15k-30k", "R5k-15k", "<R5k"].map((b) => (
                        <Button
                            key={b}
                            variant="outline"
                            className="h-8 border-border/40 text-[10px] font-semibold tabular-nums px-2.5 hover:bg-accent/5 hover:border-accent/30"
                        >
                            {b}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Filter Group: Other */}
            <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 pl-1">
                    <Briefcase className="h-3 w-3" />
                    Service Type
                </label>
                <Button variant="outline" className="h-8 w-full justify-between items-center border-border/40 text-[10px] font-bold uppercase px-3 hover:bg-muted/30 group">
                    Select Services
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground opacity-60 group-hover:opacity-100" />
                </Button>
            </div>

            {/* Active Filters Bar (Bottom) */}
            <div className="lg:col-span-4 flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-transparent gap-1 font-bold text-[9px] h-6 uppercase px-2">
                        Status: New
                        <X className="h-3 w-3 opacity-60 hover:opacity-100 cursor-pointer" />
                    </Badge>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-transparent gap-1 font-bold text-[9px] h-6 uppercase px-2">
                        Location: Johannesburg
                        <X className="h-3 w-3 opacity-60 hover:opacity-100 cursor-pointer" />
                    </Badge>
                </div>
                <Button variant="ghost" className="h-8 text-[10px] font-bold text-destructive hover:bg-destructive/5 uppercase tracking-widest">
                    Clear All Filters
                </Button>
            </div>
        </div>
    )
}
