"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Layers, Download } from "lucide-react";
import { KanbanBoard } from "@/components/dashboard/pipeline/kanban-board";
import { KanbanColumn } from "@/components/dashboard/pipeline/kanban-column";
import { KanbanCard } from "@/components/dashboard/pipeline/kanban-card";
import { Input } from "@/components/ui/input";

// Correct mapping to Prisma RequestStatus enum
enum RequestStatus {
    New = "New",
    AwaitingDocs = "AwaitingDocs",
    Processing = "Processing",
    AwaitingReview = "AwaitingReview",
    NeedsMoreInfo = "NeedsMoreInfo",
    Completed = "Completed",
    Cancelled = "Cancelled"
}

interface ServiceRequest {
    id: string;
    serviceType: string;
    status: RequestStatus;
    priority: string;
    description: string | null;
    company: { legalName: string };
    assignedTo: { name: string | null } | null;
    updatedAt: string | Date;
}

const COLUMNS = [
    { label: "Incoming", status: RequestStatus.New, accent: "border-t-blue-500" },
    { label: "Awaiting Input", status: RequestStatus.AwaitingDocs, accent: "border-t-amber-500" },
    { label: "Active Processing", status: RequestStatus.Processing, accent: "border-t-accent" },
    { label: "Pending Review", status: RequestStatus.AwaitingReview, accent: "border-t-purple-500" },
    { label: "Completed", status: RequestStatus.Completed, accent: "border-t-emerald-500" },
];

export default function PipelinePage() {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch("/api/service-requests");
                if (res.ok) {
                    const data = await res.json();
                    setRequests(data);
                }
            } catch (err) {
                console.error("Failed to fetch requests:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const filteredRequests = requests.filter(r =>
        r.company.legalName.toLowerCase().includes(search.toLowerCase()) ||
        r.serviceType.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col space-y-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Service Pipeline</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        Tracking <span className="text-foreground font-bold">{requests.length}</span> active service requests across stages.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-border/60 gap-2 px-4 text-muted-foreground font-medium">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button className="rounded-xl font-bold bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 gap-2">
                        <Plus className="h-4 w-4" />
                        New Request
                    </Button>
                </div>
            </div>

            {/* Toolbar section */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/50 p-4 rounded-2xl border border-border/40 backdrop-blur-sm">
                <div className="relative flex-1 group w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-accent" />
                    <Input
                        placeholder="Search pipeline items..."
                        className="pl-10 h-11 bg-card border-border/60 rounded-xl focus:ring-accent/20 focus:border-accent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Button variant="outline" className="h-11 rounded-xl border-border/60 gap-2 px-4 text-muted-foreground font-medium flex-1 md:flex-none">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                    <Button variant="outline" className="h-11 rounded-xl border-border/60 gap-2 px-4 text-muted-foreground font-medium flex-1 md:flex-none">
                        <Layers className="h-4 w-4" />
                        View
                    </Button>
                </div>
            </div>

            {/* Kanban section */}
            <KanbanBoard>
                {COLUMNS.map((column) => (
                    <KanbanColumn
                        key={column.status}
                        label={column.label}
                        count={filteredRequests.filter(r => r.status === column.status).length}
                        accentColor={column.accent}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center h-40">
                                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : filteredRequests.filter(r => r.status === column.status).length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border/40 rounded-xl bg-muted/20">
                                <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">No Items</p>
                            </div>
                        ) : (
                            filteredRequests
                                .filter(r => r.status === column.status)
                                .map((request) => (
                                    <KanbanCard key={request.id} request={request} />
                                ))
                        )}
                    </KanbanColumn>
                ))}
            </KanbanBoard>
        </div>
    );
}
