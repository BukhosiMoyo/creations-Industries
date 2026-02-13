"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus,
    Search,
    Briefcase,
    MoreHorizontal,
    ArrowUpRight,
    Filter,
    Download,
    Clock,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ServiceRequest {
    id: string;
    serviceType: string;
    status: string;
    priority: string;
    description: string | null;
    dueDate: string | null;
    company: { legalName: string };
    assignedTo: { name: string | null } | null;
    createdAt: string;
    updatedAt: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
    New: { bg: "bg-blue-500/10", text: "text-blue-600" },
    Contacted: { bg: "bg-sky-500/10", text: "text-sky-600" },
    Qualified: { bg: "bg-indigo-500/10", text: "text-indigo-600" },
    AwaitingDocs: { bg: "bg-amber-500/10", text: "text-amber-600" },
    InProgress: { bg: "bg-accent/10", text: "text-accent" },
    Submitted: { bg: "bg-purple-500/10", text: "text-purple-600" },
    Completed: { bg: "bg-emerald-500/10", text: "text-emerald-600" },
    OnHold: { bg: "bg-orange-500/10", text: "text-orange-600" },
    Lost: { bg: "bg-red-500/10", text: "text-red-500" },
};

const STATUS_LABELS: Record<string, string> = {
    New: "New",
    Contacted: "Contacted",
    Qualified: "Qualified",
    AwaitingDocs: "Awaiting Docs",
    InProgress: "In Progress",
    Submitted: "Submitted",
    Completed: "Completed",
    OnHold: "On Hold",
    Lost: "Lost",
};

const PRIORITY_STYLES: Record<string, string> = {
    Low: "bg-muted text-muted-foreground",
    Med: "bg-amber-500 text-white",
    High: "bg-red-500 text-white",
    Urgent: "bg-red-700 text-white",
};

export default function RequestsPage() {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch("/api/service-requests");
                if (res.ok) {
                    const data = await res.json();
                    setRequests(data);
                }
            } catch (err) {
                console.error("Failed to fetch service requests:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const filteredRequests = requests.filter(
        (r) =>
            r.company.legalName.toLowerCase().includes(search.toLowerCase()) ||
            r.serviceType.toLowerCase().includes(search.toLowerCase()) ||
            r.status.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        Service Requests
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Track and manage all service requests across your client
                        portfolio.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="rounded-xl border-border/60 gap-2 font-semibold"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button className="rounded-xl font-bold bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 gap-2">
                        <Plus className="h-4 w-4" />
                        New Request
                    </Button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-accent" />
                    <Input
                        placeholder="Search by client, service type, or status..."
                        className="pl-10 h-11 bg-card border-border/60 rounded-xl focus:ring-accent/20 focus:border-accent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    className="h-11 rounded-xl border-border/60 gap-2 px-4 text-muted-foreground font-medium"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                </Button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-1">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center space-y-4">
                        <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                        <p className="text-muted-foreground font-semibold uppercase tracking-widest text-[10px]">
                            Loading Requests...
                        </p>
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <Card className="border-dashed border-2 py-24 bg-transparent border-border/60">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                            <div className="h-16 w-16 rounded-3xl bg-muted/30 flex items-center justify-center text-muted-foreground/40 mb-6">
                                <Briefcase className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                No service requests found
                            </h3>
                            <p className="text-muted-foreground max-w-sm font-medium">
                                {search
                                    ? `No results for "${search}". Try adjusting your search.`
                                    : "No service requests have been created yet. Create one to get started."}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Column Headers */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                            <div className="col-span-3">Service</div>
                            <div className="col-span-2">Client</div>
                            <div className="col-span-2 text-center">
                                Status
                            </div>
                            <div className="col-span-1 text-center">
                                Priority
                            </div>
                            <div className="col-span-1 text-center">
                                Assigned
                            </div>
                            <div className="col-span-1 text-center">
                                Updated
                            </div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>
                        <div className="space-y-3">
                            {filteredRequests.map((request) => {
                                const statusStyle =
                                    STATUS_STYLES[request.status] ||
                                    STATUS_STYLES.New;
                                const statusLabel =
                                    STATUS_LABELS[request.status] ||
                                    request.status;
                                const priorityStyle =
                                    PRIORITY_STYLES[request.priority] ||
                                    PRIORITY_STYLES.Med;

                                return (
                                    <Card
                                        key={request.id}
                                        className="border-border/60 bg-card hover:bg-muted/30 transition-all group shadow-sm hover:shadow-md cursor-default"
                                    >
                                        <CardContent className="p-0">
                                            <div className="lg:grid lg:grid-cols-12 flex items-center justify-between p-4 lg:p-4 gap-4">
                                                {/* Service Type & Description */}
                                                <div className="lg:col-span-3 flex items-center gap-4">
                                                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300">
                                                        <Briefcase className="h-6 w-6" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="font-bold text-foreground text-sm truncate">
                                                            {request.serviceType}
                                                        </h3>
                                                        <span className="text-xs font-semibold text-muted-foreground/70 truncate block">
                                                            {request.description?.slice(
                                                                0,
                                                                40
                                                            ) || "No description"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Client */}
                                                <div className="hidden lg:col-span-2 lg:flex items-center min-w-0">
                                                    <span className="text-xs font-bold text-foreground/80 truncate">
                                                        {request.company
                                                            .legalName}
                                                    </span>
                                                </div>

                                                {/* Status */}
                                                <div className="hidden lg:col-span-2 lg:flex items-center justify-center">
                                                    <Badge
                                                        variant="outline"
                                                        className={`${statusStyle.bg} ${statusStyle.text} border-none text-[10px] font-bold uppercase tracking-wider`}
                                                    >
                                                        {statusLabel}
                                                    </Badge>
                                                </div>

                                                {/* Priority */}
                                                <div className="hidden lg:col-span-1 lg:flex items-center justify-center">
                                                    <Badge
                                                        className={`${priorityStyle} text-[10px] font-bold uppercase tracking-wider`}
                                                    >
                                                        {request.priority}
                                                    </Badge>
                                                </div>

                                                {/* Assigned To */}
                                                <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-center text-center">
                                                    <span className="text-xs font-bold text-foreground/70 truncate max-w-full">
                                                        {request.assignedTo
                                                            ?.name ||
                                                            "Unassigned"}
                                                    </span>
                                                </div>

                                                {/* Updated */}
                                                <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-center text-center">
                                                    <div className="flex items-center gap-1 text-xs font-bold text-foreground/70">
                                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                                        {new Date(
                                                            request.updatedAt
                                                        ).toLocaleDateString(
                                                            [],
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="lg:col-span-2 flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/pipeline`}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            className="h-9 px-3 rounded-lg gap-2 font-bold text-xs hover:bg-accent/10 hover:text-accent transition-colors"
                                                        >
                                                            View
                                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </Link>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-9 w-9 text-muted-foreground hover:bg-muted rounded-lg"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align="end"
                                                            className="rounded-xl border-border shadow-2xl"
                                                        >
                                                            <DropdownMenuItem className="font-semibold text-xs py-2.5">
                                                                Update Status
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="font-semibold text-xs py-2.5">
                                                                Reassign
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="font-semibold text-xs py-2.5">
                                                                Add Task
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="font-semibold text-xs py-2.5 text-red-500">
                                                                Cancel Request
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
