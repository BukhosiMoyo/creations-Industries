"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import {
    PlusCircle,
    FileEdit,
    CheckCircle2,
    UserPlus,
    Trash2,
    Clock
} from "lucide-react"

interface ActivityItem {
    id: string
    actionType: string
    actionSummary: string
    actor: {
        name: string | null
        email: string | null
        image?: string | null
    }
    createdAt: string
}

const actionIcons: Record<string, React.ElementType> = {
    CREATE: PlusCircle,
    UPDATE: FileEdit,
    DELETE: Trash2,
    COMPLETE: CheckCircle2,
    JOIN: UserPlus,
}

export function ActivityTimeline({ activities }: { activities: ActivityItem[] }) {
    if (activities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
                    <Clock className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-medium text-muted-foreground">No recent activity found.</p>
            </div>
        )
    }

    return (
        <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border/60">
            {activities.map((activity, idx) => {
                const Icon = actionIcons[activity.actionType] || Clock

                return (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={activity.id}
                        className="relative flex gap-4 pr-4"
                    >
                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div className="flex flex-1 flex-col gap-1 pt-0.5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-foreground">
                                    {activity.actionSummary}
                                </p>
                                <time className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 whitespace-nowrap ml-4">
                                    {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                                </time>
                            </div>

                            <div className="flex items-center gap-2">
                                <Avatar className="h-5 w-5 border border-border">
                                    <AvatarFallback className="text-[8px] font-bold">
                                        {activity.actor.name?.[0] || activity.actor.email?.[0] || "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground font-medium">
                                    {activity.actor.name || activity.actor.email || "Unknown User"}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
