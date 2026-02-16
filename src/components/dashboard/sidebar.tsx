"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Building2,
    Briefcase,
    CheckSquare,
    FileText,
    BarChart3,
    Zap,
    Settings,
    PanelLeftClose,
    PanelLeftOpen,
    User as UserIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard, roles: ["ADMIN", "STAFF", "EMPLOYEE"] },
    { name: "Leads", href: "/dashboard/leads", icon: UserIcon, roles: ["ADMIN", "STAFF", "EMPLOYEE"] },
    { name: "Pipeline", href: "/dashboard/pipeline", icon: Briefcase, roles: ["ADMIN", "STAFF"] },
    { name: "Companies", href: "/dashboard/companies", icon: Building2, roles: ["ADMIN", "STAFF"] },
    { name: "Service Requests", href: "/dashboard/requests", icon: Briefcase, roles: ["ADMIN", "STAFF", "EMPLOYEE"] },
    { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare, badge: 3, roles: ["ADMIN", "STAFF", "EMPLOYEE"] },
    { name: "Documents", href: "/dashboard/documents", icon: FileText, badge: 12, roles: ["ADMIN", "STAFF", "EMPLOYEE"] },
    { type: "separator" },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart3, disabled: true, roles: ["ADMIN", "STAFF"] },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, roles: ["ADMIN"] },
    { name: "Integrations", href: "/dashboard/xero", icon: Zap, roles: ["ADMIN"] },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["ADMIN"] },
]

import { User } from "next-auth"

interface DashboardSidebarProps {
    user: User
    counts?: {
        leads?: number
        requests?: number
        tasks?: number
        documents?: number
    }
}

export function DashboardSidebar({ user, counts }: DashboardSidebarProps) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    // Filter navigation based on user role
    // Default to STAFF if no role (safe fallback?) or empty list
    const userRole = user.role || "STAFF";

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
            <div className="flex h-16 items-center px-4">
                <Link href="/" className="flex items-center gap-3 overflow-hidden">
                    {isCollapsed ? (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                            <Image
                                src="/icon.webp"
                                alt="Creations"
                                width={32}
                                height={32}
                                className="h-8 w-8 object-contain"
                            />
                        </div>
                    ) : (
                        <div className="relative h-8 w-32 shrink-0">
                            <Image
                                src="/logo.png"
                                alt="Creations"
                                fill
                                className="object-contain dark:hidden"
                                priority
                            />
                            <Image
                                src="/logo-dark.png"
                                alt="Creations"
                                fill
                                className="hidden object-contain dark:block"
                                priority
                            />
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4 overflow-y-auto scrollbar-none">
                {navigation.map((item, idx) => {
                    if ('type' in item && item.type === "separator") {
                        return <div key={idx} className="my-4 h-px bg-border/50 mx-2" />
                    }

                    const navItem = item as { name: string; href: string; icon: React.ElementType; badge?: number; disabled?: boolean; roles: string[] }

                    // Role check
                    if (!navItem.roles.includes(userRole)) {
                        return null;
                    }

                    const isActive = pathname === navItem.href || (navItem.href !== "/dashboard" && pathname.startsWith(navItem.href + "/"))

                    // Resolve Badge Count
                    let badgeCount = navItem.badge
                    if (navItem.name === "Leads") badgeCount = counts?.leads
                    if (navItem.name === "Service Requests") badgeCount = counts?.requests
                    if (navItem.name === "Tasks") badgeCount = counts?.tasks || navItem.badge // fallback to hardcoded if needed or 0
                    if (navItem.name === "Documents") badgeCount = counts?.documents || navItem.badge

                    return (
                        <Link
                            key={navItem.name}
                            href={navItem.disabled ? "#" : navItem.href}
                            className={cn(
                                "group relative flex h-11 items-center gap-3 rounded-xl px-3 transition-all duration-200",
                                isActive
                                    ? "bg-accent/10 text-accent font-semibold"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                navItem.disabled && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <navItem.icon className={cn("h-5 w-5 shrink-0", isActive && "text-accent")} />

                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex-1 whitespace-nowrap text-sm"
                                >
                                    {navItem.name}
                                </motion.span>
                            )}

                            {isActive && !isCollapsed && (
                                <motion.div
                                    layoutId="active-nav"
                                    className="absolute left-0 h-6 w-1 rounded-r-full bg-accent"
                                />
                            )}

                            {/* Badge Display */}
                            {!!badgeCount && badgeCount > 0 && !isCollapsed && (
                                <Badge variant="secondary" className="h-5 min-w-[20px] px-1 rounded-md bg-muted text-[10px] font-bold ml-auto">
                                    {badgeCount}
                                </Badge>
                            )}

                            {isCollapsed && isActive && (
                                <div className="absolute left-0 h-8 w-1 rounded-r-full bg-accent" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="mt-auto border-t border-border p-4">
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
