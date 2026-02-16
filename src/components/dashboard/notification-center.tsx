"use client"

import * as React from "react"
import { Bell, Check, Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Notification {
    id: string
    title: string
    message: string
    type: string // Legacy
    severity?: "INFO" | "SUCCESS" | "WARNING" | "CRITICAL"
    isRead: boolean
    createdAt: string
    link?: string
}

// ... existing code ...

const getTypeIcon = (severity?: string, type?: string) => {
    // Fallback to type if severity is missing (for legacy)
    const effectiveType = severity || type || "INFO";

    switch (effectiveType) {
        case "SUCCESS": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        case "WARNING": return <AlertTriangle className="h-4 w-4 text-amber-500" />
        case "CRITICAL": // Fallthrough
        case "ALERT": return <AlertCircle className="h-4 w-4 text-destructive" />
        default: return <Info className="h-4 w-4 text-blue-500" />
    }
}

export function NotificationCenter() {
    const [notifications, setNotifications] = React.useState<Notification[]>([])
    const [loading, setLoading] = React.useState(true)
    const [open, setOpen] = React.useState(false)

    const unreadCount = notifications.filter(n => !n.isRead).length

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications")
            if (res.ok) {
                const data = await res.json()
                setNotifications(data)
            }
        } catch (err) {
            console.error("Failed to fetch notifications:", err)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchNotifications()
        // Poll every 30 seconds for simple "real-time" feel
        const interval = setInterval(fetchNotifications, 30000)
        return () => clearInterval(interval)
    }, [])

    const markAsRead = async (ids: string[]) => {
        try {
            const res = await fetch("/api/notifications", {
                method: "PATCH",
                body: JSON.stringify({ ids, isRead: true }),
            })
            if (res.ok) {
                setNotifications(prev =>
                    prev.map(n => ids.includes(n.id) ? { ...n, isRead: true } : n)
                )
            }
        } catch (err) {
            console.error("Failed to mark as read:", err)
        }
    }

    const clearNotification = async (id: string) => {
        try {
            const res = await fetch(`/api/notifications?id=${id}`, { method: "DELETE" })
            if (res.ok) {
                setNotifications(prev => prev.filter(n => n.id !== id))
            }
        } catch (err) {
            console.error("Failed to delete notification:", err)
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "SUCCESS": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            case "WARNING": return <AlertTriangle className="h-4 w-4 text-amber-500" />
            case "ALERT": return <AlertCircle className="h-4 w-4 text-destructive" />
            default: return <Info className="h-4 w-4 text-blue-500" />
        }
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border/40 transition-all group">
                    <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[380px] p-0 rounded-2xl shadow-2xl border-border/40 bg-card/95 backdrop-blur-xl overflow-hidden mt-2">
                <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/20">
                    <div className="space-y-0.5">
                        <h4 className="text-sm font-bold tracking-tight">Notifications</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {unreadCount} UNREAD MESSAGES
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-[11px] font-bold hover:bg-accent/10 hover:text-accent gap-1.5"
                            onClick={() => markAsRead(notifications.filter(n => !n.isRead).map(n => n.id))}
                        >
                            <Check className="h-3.5 w-3.5" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-border">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-48 space-y-3">
                                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Refreshing...</p>
                            </div>
                        ) : notifications.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-48 space-y-3 pointer-events-none"
                            >
                                <div className="h-10 w-10 rounded-full bg-muted/30 flex items-center justify-center">
                                    <Bell className="h-5 w-5 text-muted-foreground/40" />
                                </div>
                                <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest text-center">
                                    All caught up!<br />No new notifications.
                                </p>
                            </motion.div>
                        ) : (
                            notifications.map((n) => (
                                <motion.div
                                    key={n.id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className={cn(
                                        "group relative flex gap-4 p-4 transition-colors hover:bg-muted/30 border-b border-border/40 last:border-0",
                                        !n.isRead && "bg-accent/[0.03]"
                                    )}
                                >
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className={cn(
                                            "h-8 w-8 rounded-lg flex items-center justify-center border",
                                            !n.isRead ? "bg-white shadow-sm border-border/40" : "bg-muted/40 border-transparent"
                                        )}>
                                            {getTypeIcon(n.severity, n.type)}
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-1 pr-6">
                                        <div className="flex items-center gap-2">
                                            <p className={cn(
                                                "text-xs font-bold leading-none",
                                                !n.isRead ? "text-foreground" : "text-muted-foreground"
                                            )}>
                                                {n.title}
                                            </p>
                                            {!n.isRead && (
                                                <Badge className="h-1.5 w-1.5 rounded-full p-0 bg-accent border-none" />
                                            )}
                                        </div>
                                        <p className="text-[11px] font-medium text-muted-foreground leading-relaxed line-clamp-2">
                                            {n.message}
                                        </p>
                                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tight tabular-nums">
                                            {formatDistanceToNow(new Date(n.createdAt))} ago
                                        </p>
                                    </div>
                                    <div className="absolute right-3 top-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!n.isRead && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 hover:bg-accent/10 hover:text-accent rounded-md"
                                                onClick={() => markAsRead([n.id])}
                                            >
                                                <Check className="h-3 w-3" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive rounded-md"
                                            onClick={() => clearNotification(n.id)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-3 bg-muted/20 border-t border-border/40 text-center">
                    <Button variant="ghost" size="sm" className="w-full h-8 text-[11px] font-bold text-muted-foreground hover:text-foreground">
                        View all activity
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
