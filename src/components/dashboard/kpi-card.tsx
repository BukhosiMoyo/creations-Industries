"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Building2, Briefcase, FileSearch, AlertCircle, Zap, CheckSquare, TrendingUp, TrendingDown, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const iconMap: Record<string, LucideIcon> = {
    Building2,
    Briefcase,
    FileSearch,
    AlertCircle,
    Zap,
    CheckSquare,
}

interface KPICardProps {
    name: string
    value: string | number
    iconName: string
    description?: string
    delta?: {
        value: string
        isPositive: boolean
    }
    className?: string
    accentColor?: string
}

export function KPICard({
    name,
    value,
    iconName,
    description,
    delta,
    className,
    accentColor = "accent"
}: KPICardProps) {
    const Icon = iconMap[iconName] || Building2

    return (
        <Card className={cn(
            "relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 lg:hover:-translate-y-1",
            className
        )}>
            {/* Background Accent Blur */}
            <div className={cn(
                "absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-[0.03] transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.08]",
                `bg-${accentColor}`
            )} />

            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50 transition-colors group-hover:bg-accent group-hover:text-white"
                    )}>
                        <Icon className="h-6 w-6" />
                    </div>

                    {delta && (
                        <div className={cn(
                            "flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider",
                            delta.isPositive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                        )}>
                            {delta.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {delta.value}
                        </div>
                    )}
                </div>

                <div className="mt-4 space-y-1">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{name}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
                    </div>
                    {description && (
                        <p className="text-xs text-muted-foreground font-medium">{description}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
