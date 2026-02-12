"use client"

import * as React from "react"
import {
    Plus,
    Search,
    Filter,
    Download,
    ChevronDown,
    LayoutGrid,
    List as ListIcon,
    AlertCircle,
    Clock,
    TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadsTable } from "@/components/dashboard/leads/leads-table"
import { LeadsFilters } from "@/components/dashboard/leads/leads-filters"
import { motion } from "framer-motion"

export default function LeadsPage() {
    const [view, setView] = React.useState<"list" | "grid">("list")
    const [searchQuery, setSearchQuery] = React.useState("")
    const [showFilters, setShowFilters] = React.useState(false)

    return (
        <div className="flex flex-col gap-8">
            {/* Header Area */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-1">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                        Leads Inbox
                    </h2>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp className="h-3.5 w-3.5 text-accent" />
                        Capture, Triage & Convert
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 gap-2 border-border/40 hover:bg-muted/30 font-bold text-xs uppercase tracking-wider">
                        <Download className="h-3.5 w-3.5" />
                        Export
                    </Button>
                    <Button className="h-10 gap-2 bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-accent/20">
                        <Plus className="h-4 w-4" />
                        Create Lead
                    </Button>
                </div>
            </div>

            {/* Stats Overview (Quick Insights) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "New Leads", value: "12", sub: "Since yesterday", color: "text-blue-500", icon: AlertCircle },
                    { label: "Needs Attention", value: "5", sub: "High Priority", color: "text-amber-500", icon: Clock },
                    { label: "Conversion Rate", value: "24%", sub: "Monthly Average", color: "text-emerald-500", icon: TrendingUp },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm space-y-2 group hover:border-accent/30 transition-all cursor-default">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">{stat.label}</p>
                            <stat.icon className={cn("h-4 w-4 opacity-50", stat.color)} />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <span className="text-[10px] font-medium text-muted-foreground/60">{stat.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toolbar Area */}
            <div className="flex flex-col gap-4 p-5 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md">
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                    <div className="flex flex-1 items-center gap-4 min-w-0">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-accent transition-colors" />
                            <Input
                                placeholder="Search leads, companies or tags..."
                                className="h-10 pl-10 bg-background/50 border-border/40 focus:ring-accent/20 transition-all font-medium text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            variant={showFilters ? "secondary" : "outline"}
                            className={cn(
                                "h-10 gap-2 font-bold text-xs uppercase tracking-wider border-border/40",
                                showFilters && "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20"
                            )}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="h-3.5 w-3.5" />
                            Filters
                        </Button>
                    </div>

                    <div className="flex items-center gap-3">
                        <Tabs value={view} onValueChange={(v) => setView(v as "list" | "grid")} className="bg-muted/40 p-1 rounded-xl h-10">
                            <TabsList className="bg-transparent h-full">
                                <TabsTrigger value="list" className="rounded-lg h-full px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                    <ListIcon className="h-4 w-4" />
                                </TabsTrigger>
                                <TabsTrigger value="grid" className="rounded-lg h-full px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                    <LayoutGrid className="h-4 w-4" />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="h-6 w-px bg-border/40 mx-1" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-10 gap-2 font-bold text-xs uppercase tracking-wider text-muted-foreground">
                                    Sort: Triage first
                                    <ChevronDown className="h-3.5 w-3.5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Ordering</DropdownMenuLabel>
                                <DropdownMenuSeparator className="-mx-1 my-1" />
                                <DropdownMenuCheckboxItem checked className="rounded-lg py-2">Lead Score (Highest)</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem className="rounded-lg py-2">Urgency (Most Urgent)</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem className="rounded-lg py-2">Newest First</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem className="rounded-lg py-2">Value (Highest)</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden"
                    >
                        <LeadsFilters />
                    </motion.div>
                )}
            </div>

            {/* Main Content Area */}
            <LeadsTable searchQuery={searchQuery} />
        </div>
    )
}
