"use client"

import * as React from "react"
import { PortalSidebar } from "./portal-sidebar"
import { NotificationCenter } from "@/components/dashboard/notification-center"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ShieldCheck, Menu } from "lucide-react"
import { User } from "next-auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PortalShellProps {
    children: React.ReactNode
    user: User
}

export function PortalShell({ children, user }: PortalShellProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Desktop Sidebar */}
            <PortalSidebar />

            {/* Mobile Sidebar */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="left" className="p-0 border-r-0 w-[280px]">
                    <SheetHeader className="h-16 flex flex-row items-center px-6 border-b">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <SheetTitle className="text-xl font-bold ml-3">Client Portal</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto">
                        <PortalSidebar />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main Content Area */}
            <div className="relative flex flex-1 flex-col overflow-hidden">
                {/* Topbar for Mobile/Desktop */}
                <header className="flex h-16 items-center justify-between border-b bg-card/50 px-6 backdrop-blur-sm lg:justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    <div className="flex items-center gap-4">
                        {/* Notification Center for Client */}
                        <div className="hidden md:block">
                            <NotificationCenter />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden text-right md:block">
                                <p className="text-sm font-medium leading-none">{user.name || "Client"}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                            <Avatar>
                                <AvatarImage src={user.image || ""} />
                                <AvatarFallback>{user.name?.[0] || "C"}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                <main className="relative flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="mx-auto w-full max-w-7xl"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}
