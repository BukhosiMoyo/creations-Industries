"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    FileText,
    User,
    LogOut,
    ShieldCheck,
    PanelLeftClose,
    PanelLeftOpen,
    FolderKanban
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const navigation = [
    { name: "Overview", href: "/portal", icon: LayoutDashboard },
    { name: "My Requests", href: "/portal/requests", icon: FolderKanban },
    { name: "Documents", href: "/portal/documents", icon: FileText },
    { name: "Profile", href: "/portal/profile", icon: User },
]

export function PortalSidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 280 }}
            className={cn(
                "relative z-50 flex h-screen flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
                "hidden lg:flex"
            )}
        >
            {/* Brand Header */}
            <div className="flex h-16 items-center px-6">
                <Link href="/portal" className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xl font-bold tracking-tight text-foreground whitespace-nowrap"
                        >
                            Client Portal
                        </motion.span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4 overflow-y-auto scrollbar-none">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/portal" && pathname.startsWith(item.href))

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group relative flex h-11 items-center gap-3 rounded-xl px-3 transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />

                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex-1 whitespace-nowrap text-sm"
                                >
                                    {item.name}
                                </motion.span>
                            )}

                            {isActive && !isCollapsed && (
                                <motion.div
                                    layoutId="active-nav-portal"
                                    className="absolute left-0 h-6 w-1 rounded-r-full bg-primary"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto border-t border-border p-4 space-y-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className={cn(
                        "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive",
                        isCollapsed ? "justify-center px-0" : "px-2"
                    )}
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span className="ml-3">Sign Out</span>}
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="h-10 w-full justify-center text-muted-foreground hover:text-foreground"
                >
                    {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : (
                        <div className="flex w-full items-center gap-3 px-2">
                            <PanelLeftClose className="h-5 w-5" />
                            <span className="text-sm font-medium">Collapse</span>
                        </div>
                    )}
                </Button>
            </div>
        </motion.aside>
    )
}
