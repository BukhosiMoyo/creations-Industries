"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus,
    Search,
    Building2,
    MoreHorizontal,
    ArrowUpRight,
    Filter,
    Download,
    Layers,
    Clock
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { NewCompanyDialog } from "@/components/dashboard/companies/new-company-dialog";

interface Company {
    id: string;
    legalName: string;
    tradingName: string | null;
    registrationNumber: string | null;
    industry: string | null;
    _count: {
        serviceRequests: number;
    };
    updatedAt: string;
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch(`/api/companies${search ? `?q=${search}` : ""}`);
                if (res.ok) {
                    const data = await res.json();
                    setCompanies(data);
                }
            } catch (err) {
                console.error("Failed to fetch companies:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, [search]);

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Client Portfolio</h1>
                    <p className="text-muted-foreground font-medium">Manage and monitor your full base of client companies.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-border/60 gap-2 font-semibold">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <NewCompanyDialog>
                        <Button className="rounded-xl font-bold bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 gap-2 text-white">
                            <Plus className="h-4 w-4" />
                            Add New Client
                        </Button>
                    </NewCompanyDialog>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-accent" />
                    <Input
                        placeholder="Search by legal name, trading name, or registration..."
                        className="pl-10 h-11 bg-card border-border/60 rounded-xl focus:ring-accent/20 focus:border-accent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="h-11 rounded-xl border-border/60 gap-2 px-4 text-muted-foreground font-medium">
                    <Filter className="h-4 w-4" />
                    Filters
                </Button>
            </div>

            {/* List View */}
            <div className="grid grid-cols-1 gap-1">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center space-y-4">
                        <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                        <p className="text-muted-foreground font-semibold uppercase tracking-widest text-[10px]">Assembling Data...</p>
                    </div>
                ) : companies.length === 0 ? (
                    <Card className="border-dashed border-2 py-24 bg-transparent border-border/60">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                            <div className="h-16 w-16 rounded-3xl bg-muted/30 flex items-center justify-center text-muted-foreground/40 mb-6">
                                <Building2 className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">No companies found</h3>
                            <p className="text-muted-foreground max-w-sm font-medium">
                                {search
                                    ? `We couldn't find any results for "${search}". Try adjusting your search parameters.`
                                    : "You haven't added any client companies yet. Start building your portfolio today."}
                            </p>
                            {!search && (
                                <NewCompanyDialog>
                                    <Button className="mt-8 rounded-xl bg-accent font-bold text-white">
                                        Create First Record
                                    </Button>
                                </NewCompanyDialog>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                            <div className="col-span-4">Company Details</div>
                            <div className="col-span-2 text-center">Industry</div>
                            <div className="col-span-2 text-center">Registration</div>
                            <div className="col-span-2 text-center">Activity</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>
                        <div className="space-y-3">
                            {companies.map((company) => (
                                <Card
                                    key={company.id}
                                    className="border-border/60 bg-card hover:bg-muted/30 transition-all group shadow-sm hover:shadow-md cursor-default"
                                >
                                    <CardContent className="p-0">
                                        <div className="lg:grid lg:grid-cols-12 flex items-center justify-between p-4 lg:p-4 gap-4">
                                            {/* Name & Primary Info */}
                                            <div className="lg:col-span-4 flex items-center gap-4">
                                                <div className="h-12 w-12 shrink-0 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300">
                                                    <Building2 className="h-6 w-6" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-foreground text-sm truncate">
                                                        {company.legalName}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-xs font-semibold text-muted-foreground/70 truncate">
                                                            {company.tradingName || "No Trading Name"}
                                                        </span>
                                                        {company._count.serviceRequests > 0 && (
                                                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] h-4">
                                                                {company._count.serviceRequests} Active
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Industry */}
                                            <div className="hidden lg:col-span-2 lg:flex items-center justify-center min-w-0">
                                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/30 border border-border/50">
                                                    <Layers className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-xs font-bold text-muted-foreground truncate uppercase tracking-tighter">
                                                        {company.industry || "General"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Registration */}
                                            <div className="hidden lg:col-span-2 lg:flex flex-col items-center justify-center text-center">
                                                <span className="text-xs font-bold text-foreground/80 font-mono">
                                                    {company.registrationNumber || "N/A"}
                                                </span>
                                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-0.5">
                                                    Registry ID
                                                </span>
                                            </div>

                                            {/* Activity */}
                                            <div className="hidden lg:col-span-2 lg:flex flex-col items-center justify-center text-center">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground/70">
                                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                                    {new Date(company.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                                </div>
                                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-0.5">
                                                    Last Update
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="lg:col-span-2 flex items-center justify-end gap-2">
                                                <Link href={`/dashboard/companies/${company.id}`}>
                                                    <Button variant="ghost" className="h-9 px-3 rounded-lg gap-2 font-bold text-xs hover:bg-accent/10 hover:text-accent transition-colors">
                                                        View
                                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted rounded-lg">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="rounded-xl border-border shadow-2xl">
                                                        <DropdownMenuItem className="font-semibold text-xs py-2.5">Edit Company</DropdownMenuItem>
                                                        <DropdownMenuItem className="font-semibold text-xs py-2.5">New Request</DropdownMenuItem>
                                                        <DropdownMenuItem className="font-semibold text-xs py-2.5">Upload Document</DropdownMenuItem>
                                                        <DropdownMenuItem className="font-semibold text-xs py-2.5 text-red-500">Archive Record</DropdownMenuItem>
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
