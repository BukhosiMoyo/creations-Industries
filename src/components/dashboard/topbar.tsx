"use client"

import { cn } from "@/lib/utils"
import * as React from "react"
import { Search, Menu, User, LogOut, Settings as SettingsIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateDropdown } from "./create-dropdown"
import { NotificationCenter } from "./notification-center"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { User as AuthUser } from "next-auth"

interface DashboardTopbarProps {
    user: AuthUser
    onMobileMenuOpen?: () => void
}

export function DashboardTopbar({ user, onMobileMenuOpen }: DashboardTopbarProps) {
    const [isSearchFocused, setIsSearchFocused] = React.useState(false)

    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-8">
            {/* Mobile Menu Trigger */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onMobileMenuOpen}
            >
                <Menu className="h-6 w-6" />
            </Button>

            {/* Search Bar */}
            <div className="flex flex-1 max-w-xl items-center px-4 md:px-0">
                <div className={cn(
                    "relative w-full group transition-all duration-300 ease-in-out",
                    isSearchFocused ? "max-w-full" : "max-w-[280px]"
                )}>
                    <Search className={cn(
                        "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
                        isSearchFocused ? "text-accent" : "text-muted-foreground"
                    )} />
                    <Input
                        placeholder="Search clients, requests..."
                        className="h-10 w-full rounded-xl bg-muted/50 pl-10 pr-4 border-none focus-visible:ring-1 focus-visible:ring-accent/30 transition-all font-medium"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    {!isSearchFocused && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-bold text-muted-foreground pointer-events-none uppercase">
                            ⌘K
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
                <CreateDropdown />

                <div className="h-6 w-px bg-border mx-2 hidden sm:block" />

                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Notifications */}
                    <NotificationCenter />

                    <ThemeToggle />

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 gap-3 px-2 hover:bg-muted/50 rounded-xl transition-all">
                                <Avatar className="h-8 w-8 border border-border shadow-sm">
                                    <AvatarImage src={user.image || ""} />
                                    <AvatarFallback className="bg-accent text-white font-bold text-xs uppercase">
                                        {user.name ? user.name[0] : (user.email ? user.email[0] : "U")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden lg:flex flex-col items-start leading-none gap-1">
                                    <span className="text-sm font-bold text-foreground truncate max-w-[120px]">
                                        {user.name || user.email}
                                    </span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                                        {user.role}
                                    </span>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer py-2.5">
                                <User className="h-4 w-4 text-muted-foreground" />
                                Profile Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer py-2.5">
                                <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                                System Preferences
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => signOut()}
                                className="gap-2 cursor-pointer py-2.5 text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}


