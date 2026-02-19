"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Search,
    Filter,
    MoreHorizontal,
    ArrowUpDown,
    Calendar,
    MapPin,
    AlertCircle
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
// import { LeadStatus, LeadUrgency } from "@prisma/client" // Client component might struggle with prisma imports directly if not type-only
// Using manual types or props for safety
import { Lead } from "@prisma/client" // Types are fine

interface LeadsTableProps {
    data: (Lead & {
        assignedToUser?: { name: string | null, image: string | null } | null
    })[]
}

export function LeadsTable({ data }: LeadsTableProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // -- Filter State (Synced with URL) --
    const [searchTerm, setSearchTerm] = React.useState(searchParams.get("search") || "")

    // Debounce Search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams)
            if (searchTerm) params.set("search", searchTerm)
            else params.delete("search")
            router.replace(`${pathname}?${params.toString()}`)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchTerm, router, pathname, searchParams])

    const handleStatusFilter = (status: string | null) => {
        const params = new URLSearchParams(searchParams)
        if (status) params.set("status", status)
        else params.delete("status")
        router.push(`${pathname}?${params.toString()}`)
    }

    const currentFilter = searchParams.get("status") || "active"

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search leads..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <FilterButton
                        label="Active"
                        active={currentFilter === "active"}
                        onClick={() => handleStatusFilter(null)}
                    />
                    <FilterButton
                        label="New"
                        active={currentFilter === "new"}
                        onClick={() => handleStatusFilter("new")}
                    />
                    <FilterButton
                        label="Unassigned"
                        active={currentFilter === "unassigned"}
                        onClick={() => handleStatusFilter("unassigned")}
                    />
                    <FilterButton
                        label="Urgent"
                        active={currentFilter === "urgent"}
                        onClick={() => handleStatusFilter("urgent")}
                    />
                    <FilterButton
                        label="Incomplete"
                        active={currentFilter === "incomplete"}
                        onClick={() => handleStatusFilter("incomplete")}
                    />
                    <FilterButton
                        label="Converted"
                        active={currentFilter === "converted"}
                        onClick={() => handleStatusFilter("converted")}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="w-[250px]">Lead Name</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Urgency</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead className="text-right">Created</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    No leads found matching criteria.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((lead) => (
                                <TableRow key={lead.id} className="group cursor-pointer hover:bg-muted/30" onClick={() => router.push(`/dashboard/leads/${lead.id}`)}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span className="text-foreground font-semibold">
                                                {lead.firstName} {lead.lastName}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{lead.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{lead.serviceType}</span>
                                            <span className="text-xs text-muted-foreground truncate max-w-[150px]">{lead.companyName || "Personal"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={lead.status} />
                                    </TableCell>
                                    <TableCell>
                                        <UrgencyBadge urgency={lead.urgency} />
                                    </TableCell>
                                    <TableCell>
                                        {lead.assignedToUser ? (
                                            <div className="flex items-center gap-2">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={lead.assignedToUser.image || ""} />
                                                    <AvatarFallback className="text-[10px]">{lead.assignedToUser.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm">{lead.assignedToUser.name}</span>
                                            </div>
                                        ) : (
                                            <Badge variant="outline" className="text-xs font-normal text-muted-foreground border-dashed">
                                                Unassigned
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                                        {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

// Sub-components

function FilterButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            )}
        >
            {label}
        </button>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        New: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        Incomplete: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        Contacted: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
        Qualified: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
        Converted: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        Lost: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
        Spam: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
    }

    return (
        <span className={cn("px-2 py-0.5 rounded-md text-xs font-medium", styles[status] || "bg-gray-100 text-gray-600")}>
            {status}
        </span>
    )
}

function UrgencyBadge({ urgency }: { urgency: string }) {
    if (urgency === "Urgent_24_48h") {
        return (
            <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                Urgent
            </div>
        )
    }
    if (urgency === "Soon_7d") {
        return <span className="text-orange-600 dark:text-orange-400 text-xs font-medium">Soon (7d)</span>
    }
    return <span className="text-muted-foreground text-xs">Flexible</span>
}
