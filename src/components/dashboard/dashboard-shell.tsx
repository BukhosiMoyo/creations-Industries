"use client"

import * as React from "react"
import { DashboardSidebar } from "./sidebar"
import { DashboardTopbar } from "./topbar"
import { LineGridOverlay } from "./line-grid-overlay"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ShieldCheck } from "lucide-react"
import { User } from "next-auth"

interface DashboardShellProps {
    children: React.ReactNode
    user: User
    counts?: {
        leads?: number
        requests?: number
        tasks?: number
        documents?: number
    }
}

export function DashboardShell({ children, user, counts }: DashboardShellProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Background System */}
            <LineGridOverlay className="opacity-40" />

            {/* Desktop Sidebar */}
            <DashboardSidebar user={user} counts={counts} />

            {/* Mobile Sidebar */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="left" className="p-0 border-r-0 w-[280px]">
                    <SheetHeader className="h-16 flex flex-row items-center px-6 border-b">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <SheetTitle className="text-xl font-bold ml-3">Creations</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto">
                        <DashboardSidebar user={user} counts={counts} />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main Content Area */}
            <div className="relative flex flex-1 flex-col overflow-hidden">
                <DashboardTopbar
                    user={user}
                    onMobileMenuOpen={() => setMobileMenuOpen(true)}
                />

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
