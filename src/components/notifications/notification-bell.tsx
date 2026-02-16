"use client"

import * as React from "react"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Type for the notification object
type Notification = {
    id: string
    title: string
    message: string
    isRead: boolean
    createdAt: string // JSON date string
    link?: string | null
    severity: "INFO" | "SUCCESS" | "WARNING" | "CRITICAL"
}

interface NotificationBellProps {
    initialCount?: number
    userId: string
}

export function NotificationBell({ initialCount = 0, userId }: NotificationBellProps) {
    const router = useRouter()
    const [unreadCount, setUnreadCount] = React.useState(initialCount)
    const [notifications, setNotifications] = React.useState<Notification[]>([])
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const fetchNotifications = React.useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/notifications?limit=5")
            if (res.ok) {
                const data = await res.json()
                setNotifications(data.notifications)
                setUnreadCount(data.unreadCount)
            }
        } catch (e) {
            console.error("Failed to fetch notifications", e)
        } finally {
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        if (isOpen) {
            fetchNotifications()
        }
    }, [isOpen, fetchNotifications])

    React.useEffect(() => {
        fetchNotifications()
        const interval = setInterval(fetchNotifications, 60000)
        return () => clearInterval(interval)
    }, [fetchNotifications])

    const handleMarkRead = async (id: string, link?: string | null) => {
        try {
            await fetch(`/api/notifications/${id}/read`, { method: "POST" })
            setUnreadCount(prev => Math.max(0, prev - 1))
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))

            if (link) {
                router.push(link)
                setIsOpen(false)
            }
        } catch (e) {
            console.error("Failed to mark read", e)
        }
    }

    const handleMarkAllRead = async () => {
        try {
            await fetch("/api/notifications/read-all", { method: "POST" })
            setUnreadCount(0)
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
        } catch (e) {
            console.error("Failed to mark all read", e)
        }
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full"
                        >
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </Badge>
                    )}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground" onClick={handleMarkAllRead}>
                            Mark all read
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {loading && notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">No new notifications</div>
                ) : (
                    <div className="max-h-[300px] overflow-y-auto">
                        {notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={cn(
                                    "flex flex-col items-start gap-1 p-3 cursor-pointer",
                                    !notification.isRead && "bg-muted/50"
                                )}
                                onClick={() => handleMarkRead(notification.id, notification.link)}
                            >
                                <div className="flex w-full items-start justify-between gap-2">
                                    <span className="font-medium text-sm leading-none">{notification.title}</span>
                                    {!notification.isRead && <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {notification.message}
                                </p>
                                <span className="text-[10px] text-muted-foreground/70">
                                    {new Date(notification.createdAt).toLocaleDateString()}
                                </span>
                            </DropdownMenuItem>
                        ))}
                    </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer bg-muted/30 justify-center text-center">
                    <span onClick={() => {
                        router.push("/dashboard/notifications")
                        setIsOpen(false)
                    }}>View all notifications</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
