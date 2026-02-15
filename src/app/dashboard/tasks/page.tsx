"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus,
    Search,
    CheckSquare,
    Filter,
    Download,
    Clock,
    Circle,
    CheckCircle2,
    CalendarClock,
    MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewTaskDialog } from "@/components/dashboard/tasks/new-task-dialog";

interface Task {
    id: string;
    title: string;
    description: string | null;
    status: "Open" | "Done";
    type: string;
    dueDate: string | null;
    assignedToUserId: string | null;
    createdAt: string;
    updatedAt: string;
    serviceRequest: {
        id: string;
        serviceType: string;
        company: { legalName: string };
    };
}

const TYPE_LABELS: Record<string, string> = {
    FollowUp: "Follow Up",
    DocumentRequest: "Doc Request",
    Deadline: "Deadline",
    InternalReview: "Review",
};

const TYPE_STYLES: Record<string, string> = {
    FollowUp: "bg-blue-500/10 text-blue-600",
    DocumentRequest: "bg-amber-500/10 text-amber-600",
    Deadline: "bg-red-500/10 text-red-500",
    InternalReview: "bg-purple-500/10 text-purple-600",
};

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "Open" | "Done">("all");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("/api/tasks");
                if (res.ok) {
                    const data = await res.json();
                    setTasks(data);
                }
            } catch (err) {
                console.error("Failed to fetch tasks:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter((t) => {
        const matchesSearch =
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.serviceRequest.company.legalName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            t.serviceRequest.serviceType
                .toLowerCase()
                .includes(search.toLowerCase());
        const matchesFilter = filter === "all" || t.status === filter;
        return matchesSearch && matchesFilter;
    });

    const openCount = tasks.filter((t) => t.status === "Open").length;
    const doneCount = tasks.filter((t) => t.status === "Done").length;

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        Tasks
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Manage tasks across all service requests.{" "}
                        <span className="text-foreground font-bold">
                            {openCount}
                        </span>{" "}
                        open,{" "}
                        <span className="text-foreground font-bold">
                            {doneCount}
                        </span>{" "}
                        completed.
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
                    <NewTaskDialog>
                        <Button className="rounded-xl font-bold bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 gap-2 text-white">
                            <Plus className="h-4 w-4" />
                            New Task
                        </Button>
                    </NewTaskDialog>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-accent" />
                    <Input
                        placeholder="Search by title, client, or service type..."
                        className="pl-10 h-11 bg-card border-border/60 rounded-xl focus:ring-accent/20 focus:border-accent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    {(
                        [
                            ["all", "All"],
                            ["Open", "Open"],
                            ["Done", "Done"],
                        ] as const
                    ).map(([value, label]) => (
                        <Button
                            key={value}
                            variant={filter === value ? "default" : "outline"}
                            className={`h-11 rounded-xl px-4 font-bold text-xs ${filter === value
                                ? "bg-accent text-white"
                                : "border-border/60 text-muted-foreground"
                                }`}
                            onClick={() => setFilter(value)}
                        >
                            {label}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        className="h-11 rounded-xl border-border/60 gap-2 px-4 text-muted-foreground font-medium"
                    >
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-1">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center space-y-4">
                        <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                        <p className="text-muted-foreground font-semibold uppercase tracking-widest text-[10px]">
                            Loading Tasks...
                        </p>
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <Card className="border-dashed border-2 py-24 bg-transparent border-border/60">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                            <div className="h-16 w-16 rounded-3xl bg-muted/30 flex items-center justify-center text-muted-foreground/40 mb-6">
                                <CheckSquare className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                No tasks found
                            </h3>
                            <p className="text-muted-foreground max-w-sm font-medium">
                                {search
                                    ? `No results for "${search}".`
                                    : "No tasks have been created yet. Create one from a service request."}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Column Headers */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                            <div className="col-span-4">Task</div>
                            <div className="col-span-2">Client / Request</div>
                            <div className="col-span-1 text-center">Type</div>
                            <div className="col-span-1 text-center">
                                Status
                            </div>
                            <div className="col-span-2 text-center">
                                Due Date
                            </div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>
                        <div className="space-y-3">
                            {filteredTasks.map((task) => (
                                <Card
                                    key={task.id}
                                    className="border-border/60 bg-card hover:bg-muted/30 transition-all group shadow-sm hover:shadow-md cursor-default"
                                >
                                    <CardContent className="p-0">
                                        <div className="lg:grid lg:grid-cols-12 flex items-center justify-between p-4 gap-4">
                                            {/* Task Title */}
                                            <div className="lg:col-span-4 flex items-center gap-4">
                                                <div
                                                    className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-all ${task.status === "Done"
                                                        ? "bg-emerald-500/10 text-emerald-500"
                                                        : "bg-muted/50 text-muted-foreground group-hover:bg-accent group-hover:text-white"
                                                        }`}
                                                >
                                                    {task.status === "Done" ? (
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    ) : (
                                                        <Circle className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3
                                                        className={`font-bold text-sm truncate ${task.status ===
                                                            "Done"
                                                            ? "line-through text-muted-foreground"
                                                            : "text-foreground"
                                                            }`}
                                                    >
                                                        {task.title}
                                                    </h3>
                                                    <span className="text-xs font-semibold text-muted-foreground/70 truncate block">
                                                        {task.description?.slice(
                                                            0,
                                                            50
                                                        ) || "No description"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Client / Request */}
                                            <div className="hidden lg:col-span-2 lg:flex flex-col min-w-0">
                                                <span className="text-xs font-bold text-foreground/80 truncate">
                                                    {
                                                        task.serviceRequest
                                                            .company.legalName
                                                    }
                                                </span>
                                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-wider truncate">
                                                    {
                                                        task.serviceRequest
                                                            .serviceType
                                                    }
                                                </span>
                                            </div>

                                            {/* Type */}
                                            <div className="hidden lg:col-span-1 lg:flex items-center justify-center">
                                                <Badge
                                                    variant="outline"
                                                    className={`${TYPE_STYLES[
                                                        task.type
                                                    ] || ""
                                                        } border-none text-[10px] font-bold uppercase tracking-wider`}
                                                >
                                                    {TYPE_LABELS[task.type] ||
                                                        task.type}
                                                </Badge>
                                            </div>

                                            {/* Status */}
                                            <div className="hidden lg:col-span-1 lg:flex items-center justify-center">
                                                <Badge
                                                    className={`text-[10px] font-bold uppercase tracking-wider ${task.status === "Done"
                                                        ? "bg-emerald-500 text-white"
                                                        : "bg-blue-500 text-white"
                                                        }`}
                                                >
                                                    {task.status}
                                                </Badge>
                                            </div>

                                            {/* Due Date */}
                                            <div className="hidden lg:col-span-2 lg:flex items-center justify-center gap-1.5">
                                                {task.dueDate ? (
                                                    <div
                                                        className={`flex items-center gap-1.5 text-xs font-bold ${new Date(
                                                            task.dueDate
                                                        ) < new Date() &&
                                                            task.status ===
                                                            "Open"
                                                            ? "text-red-500"
                                                            : "text-foreground/70"
                                                            }`}
                                                    >
                                                        <CalendarClock className="h-3.5 w-3.5" />
                                                        {new Date(
                                                            task.dueDate
                                                        ).toLocaleDateString(
                                                            [],
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground/40 font-medium">
                                                        No due date
                                                    </span>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="lg:col-span-2 flex items-center justify-end gap-2">
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
                                                            {task.status ===
                                                                "Open"
                                                                ? "Mark as Done"
                                                                : "Reopen"}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="font-semibold text-xs py-2.5">
                                                            Edit Task
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="font-semibold text-xs py-2.5">
                                                            Reassign
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="font-semibold text-xs py-2.5 text-red-500">
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
