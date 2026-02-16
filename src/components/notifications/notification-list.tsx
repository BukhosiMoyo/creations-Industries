"use client"

import * as React from "react"
import { formatDistanceToNow } from "date-fns"
import {
    Bell,
    Check,
    CheckCircle2,
    AlertTriangle,
    AlertCircle,
    Info,
    MoreVertical,
    Trash2,
    ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

// Type definition (aligned with API response)
type NotificationSeverity = "INFO" | "SUCCESS" | "WARNING" | "CRITICAL"

interface Notification {
    id: string
    title: string
    message: string
    isRead: boolean
    createdAt: string | Date // Handle both
    link?: string | null
    type: string // Legacy
    severity?: NotificationSeverity
    category?: string
}

interface NotificationListProps {
    notifications: Notification[]
    userId: string
}

export function NotificationList({ notifications: initialNotifications, userId }: NotificationListProps) {
    const router = useRouter()
    const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications)
    const [filter, setFilter] = React.useState<"ALL" | "UNREAD">("ALL")

    const filteredNotifications = React.useMemo(() => {
        if (filter === "UNREAD") return notifications.filter(n => !n.isRead)
        return notifications
    }, [notifications, filter])

    const handleMarkRead = async (id: string, link?: string | null) => {
        try {
            await fetch(`/api/notifications/${id}/read`, { method: "POST" })
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))

            if (link) {
                router.push(link)
            }
        } catch (e) {
            console.error("Failed to mark read", e)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/notifications?id=${id}`, { method: "DELETE" })
            setNotifications(prev => prev.filter(n => n.id !== id))
        } catch (e) {
            console.error("Failed to delete", e)
        }
    }

    const handleMarkAllRead = async () => {
        try {
            const ids = notifications.filter(n => !n.isRead).map(n => n.id)
            if (ids.length === 0) return

            await fetch("/api/notifications", {
                method: "PATCH",
                body: JSON.stringify({ ids, isRead: true })
            })
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
        } catch (e) {
            console.error("Failed to mark all read", e)
        }
    }

    const getTypeIcon = (severity?: string, type?: string) => {
        const effectiveType = severity || type || "INFO";
        switch (effectiveType) {
            case "SUCCESS": return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            case "WARNING": return <AlertTriangle className="h-5 w-5 text-amber-500" />
            case "CRITICAL":
            case "ALERT": return <AlertCircle className="h-5 w-5 text-destructive" />
            default: return <Info className="h-5 w-5 text-blue-500" />
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 pb-4">
                <Button
                    variant={filter === "ALL" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilter("ALL")}
                >
                    All
                </Button>
                <Button
                    variant={filter === "UNREAD" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilter("UNREAD")}
                >
                    Unread
                </Button>
                <div className="flex-1" />
                <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
                    Mark all as read
                </Button>
            </div>

            {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-card">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Bell className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No notifications</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {filter === "UNREAD" ? "You have no unread notifications." : "You have no notifications yet."}
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={cn(
                                "flex items-start gap-4 p-4 rounded-xl border transition-all bg-card",
                                !notification.isRead && "bg-accent/5 border-accent/20 shadow-sm"
                            )}
                        >
                            <div className={cn(
                                "mt-1 h-10 w-10 flex items-center justify-center rounded-full shrink-0",
                                !notification.isRead ? "bg-background" : "bg-muted/50"
                            )}>
                                {getTypeIcon(notification.severity, notification.type)}
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className={cn("text-sm font-medium", !notification.isRead && "font-bold")}>
                                        {notification.title}
                                    </p>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {notification.message}
                                </p>
                                {notification.link && (
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-xs mt-2 text-accent"
                                        onClick={() => handleMarkRead(notification.id, notification.link)}
                                    >
                                        View Details <ExternalLink className="ml-1 h-3 w-3" />
                                    </Button>
                                )}
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {!notification.isRead && (
                                        <DropdownMenuItem onClick={() => handleMarkRead(notification.id)}>
                                            <Check className="mr-2 h-4 w-4" /> Mark as read
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(notification.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
