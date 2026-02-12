"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Building2,
    Mail,
    Phone,
    Clock,
    FileText,
    AlertCircle,
    Plus,
    Edit,
    Briefcase,
    Globe,
    MapPin,
    ArrowUpRight,
    TrendingUp,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    roleTitle: string | null;
    isPrimary: boolean;
}

interface ServiceRequest {
    id: string;
    serviceType: string;
    status: string;
    priority: string;
    updatedAt: string;
}

interface Activity {
    id: string;
    actionType: string;
    actionSummary: string;
    createdAt: string;
    actor: { name: string | null; email: string };
}

interface Company {
    id: string;
    legalName: string;
    tradingName: string | null;
    registrationNumber: string | null;
    vatNumber: string | null;
    industry: string | null;
    address: string | null;
    contacts: Contact[];
    serviceRequests: ServiceRequest[];
    activities: Activity[];
}

export default function CompanyProfilePage() {
    const params = useParams();
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompany() {
            try {
                const res = await fetch(`/api/companies/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setCompany(data);
                }
            } catch (err) {
                console.error("Failed to fetch company:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCompany();
    }, [params.id]);

    if (loading) return (
        <div className="py-32 flex flex-col items-center justify-center space-y-4">
            <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground font-semibold uppercase tracking-widest text-[10px]">Retrieving Profile...</p>
        </div>
    );

    if (!company) return (
        <div className="py-32 flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Record not found</h3>
            <p className="text-muted-foreground max-w-sm text-center font-medium">
                We couldn&apos;t locate the company record you&apos;re looking for. It may have been archived or deleted.
            </p>
            <Button variant="outline" className="mt-4 rounded-xl" onClick={() => window.history.back()}>
                Return to Portfolio
            </Button>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Header / Breadcrumb Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="h-20 w-20 shrink-0 rounded-[2.5rem] bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-900/20">
                        <Building2 className="h-10 w-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black text-foreground tracking-tighter">{company.legalName}</h1>
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] uppercase font-bold tracking-widest h-5">Active client</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1.5">
                            {company.tradingName && (
                                <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5">
                                    <Globe className="h-3.5 w-3.5" />
                                    {company.tradingName}
                                </span>
                            )}
                            <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                {company.registrationNumber || "Unregistered"}
                            </span>
                            <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5">
                                <Briefcase className="h-3.5 w-3.5" />
                                {company.industry || "General Industry"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-border/60 gap-2 font-bold px-5">
                        <Edit className="h-4 w-4" />
                        Edit record
                    </Button>
                    <Button className="rounded-xl font-bold bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 gap-2 px-6">
                        <Plus className="h-4 w-4" />
                        New Request
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="bg-muted/50 p-1 rounded-xl h-11 border border-border/40">
                            <TabsTrigger value="overview" className="rounded-lg px-6 font-bold tracking-tight text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                            <TabsTrigger value="requests" className="rounded-lg px-6 font-bold tracking-tight text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Service History</TabsTrigger>
                            <TabsTrigger value="documents" className="rounded-lg px-6 font-bold tracking-tight text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Vault</TabsTrigger>
                            <TabsTrigger value="activity" className="rounded-lg px-6 font-bold tracking-tight text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Audit Trail</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-8 mt-8 outline-none">
                            {/* Company Details Grid */}
                            <Card className="border-border/60 bg-card shadow-sm overflow-hidden">
                                <CardHeader className="bg-muted/30 border-b border-border/40 py-4">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">Entity Information</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12 p-8">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] block">VAT Registration</label>
                                        <p className="text-foreground font-bold font-mono tracking-tighter">{company.vatNumber || "Not Registered"}</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] block">Registry status</label>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                            <p className="text-foreground font-bold tracking-tight">CIPC Active</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] block">Tax Compliance</label>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                            <p className="text-foreground font-bold tracking-tight">Verified (SARS)</p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-3 space-y-2 pt-4 border-t border-border/40">
                                        <label className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] block">Registered Address</label>
                                        <div className="flex items-start gap-2 text-foreground font-semibold leading-relaxed">
                                            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                                            {company.address || "No official address on file."}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contacts Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">Authorised Representatives</h3>
                                        <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mt-1">Designated key contacts for this account</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="font-bold text-accent hover:bg-accent/10 rounded-lg gap-2">
                                        <Plus className="h-4 w-4" /> Add Delegate
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {company.contacts.map((contact) => (
                                        <Card key={contact.id} className={cn(
                                            "border-border/60 shadow-sm hover:shadow-md transition-all",
                                            contact.isPrimary && "border-accent/40 bg-accent/[0.02]"
                                        )}>
                                            <CardContent className="p-5 flex items-start justify-between">
                                                <div className="space-y-3">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-black text-foreground">{contact.fullName}</span>
                                                            {contact.isPrimary && (
                                                                <Badge className="bg-accent text-[9px] h-4 font-bold tracking-widest">Primary</Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                                                            {contact.roleTitle || "No Title Specified"}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <a href={`mailto:${contact.email}`} className="text-xs font-bold text-muted-foreground flex items-center gap-2.5 hover:text-accent transition-colors">
                                                            <div className="h-6 w-6 rounded-lg bg-muted flex items-center justify-center">
                                                                <Mail className="h-3.5 w-3.5" />
                                                            </div>
                                                            {contact.email}
                                                        </a>
                                                        {contact.phone && (
                                                            <a href={`tel:${contact.phone}`} className="text-xs font-bold text-muted-foreground flex items-center gap-2.5 hover:text-accent transition-colors">
                                                                <div className="h-6 w-6 rounded-lg bg-muted flex items-center justify-center">
                                                                    <Phone className="h-3.5 w-3.5" />
                                                                </div>
                                                                {contact.phone}
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/40 hover:text-accent rounded-lg">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="requests" className="mt-8 outline-none">
                            <Card className="border-border/60 bg-card shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-bold">Service Log</CardTitle>
                                        <CardDescription className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Historical and active engagements</CardDescription>
                                    </div>
                                    <Button className="rounded-xl font-bold text-xs bg-accent shadow-accent/20">Initate Service</Button>
                                </CardHeader>
                                <CardContent>
                                    {company.serviceRequests.length === 0 ? (
                                        <div className="py-20 text-center flex flex-col items-center">
                                            <div className="h-12 w-12 rounded-2xl bg-muted/30 flex items-center justify-center text-muted-foreground/30 mb-4">
                                                <Briefcase className="h-6 w-6" />
                                            </div>
                                            <p className="text-muted-foreground font-semibold tracking-tight">No active or past service requests found for this entity.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {company.serviceRequests.map((req) => (
                                                <div key={req.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/40 hover:bg-muted/40 hover:border-border/60 transition-all group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-11 w-11 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-white transition-all">
                                                            <Briefcase className="h-5.5 w-5.5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-foreground text-sm tracking-tight">{req.serviceType}</p>
                                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                                                                Updated {new Date(req.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Badge variant="outline" className="bg-background border-border shadow-xs text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                                            {req.status}
                                                        </Badge>
                                                        <Button variant="ghost" size="sm" className="font-bold text-xs hover:bg-accent/10 hover:text-accent rounded-lg">View Timeline</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="activity" className="mt-8 outline-none">
                            <Card className="border-border/60 bg-card shadow-sm overflow-hidden">
                                <CardHeader className="bg-muted/30 border-b border-border/40 py-5">
                                    <CardTitle className="text-lg font-bold">Activity Audit Trace</CardTitle>
                                    <CardDescription className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Verifiable log of all entity interactions</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-border/40">
                                        {company.activities.map((activity) => (
                                            <div key={activity.id} className="p-5 flex items-start gap-4 hover:bg-muted/10 transition-colors">
                                                <div className="h-8 w-8 shrink-0 rounded-full bg-muted/60 flex items-center justify-center">
                                                    <Clock className="h-4 w-4 text-muted-foreground/60" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-bold text-foreground leading-snug">{activity.actionSummary}</p>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                            {new Date(activity.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                                        </span>
                                                        <span className="h-1 w-1 rounded-full bg-border" />
                                                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                                                            By {activity.actor?.name || activity.actor?.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Compliance Panel */}
                    <Card className="border-accent/30 bg-accent/[0.02] shadow-xl shadow-accent/5 overflow-hidden">
                        <CardHeader className="bg-accent/5 border-b border-accent/10">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-accent uppercase tracking-widest">
                                <ShieldCheck className="h-4 w-4" />
                                Compliance Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-accent/10 shadow-sm">
                                <div className="space-y-1">
                                    <span className="text-xs font-black text-muted-foreground/40 uppercase tracking-widest block">Income Tax (2025)</span>
                                    <span className="text-sm font-bold">Entity Tax Return</span>
                                </div>
                                <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-black uppercase">Current</Badge>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-accent/10 shadow-sm">
                                <div className="space-y-1">
                                    <span className="text-xs font-black text-muted-foreground/40 uppercase tracking-widest block">VAT PERIOD</span>
                                    <span className="text-sm font-bold">Jan-Feb Cycle</span>
                                </div>
                                <Badge variant="outline" className="text-amber-600 border-amber-200 text-[10px] font-black uppercase">Due 25 Mar</Badge>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-accent/10 shadow-sm">
                                <div className="space-y-1">
                                    <span className="text-xs font-black text-muted-foreground/40 uppercase tracking-widest block">ANNUAL RETURNS</span>
                                    <span className="text-sm font-bold">CIPC Maintenance</span>
                                </div>
                                <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-black uppercase">Current</Badge>
                            </div>

                            <Button className="w-full h-11 rounded-xl bg-accent font-bold gap-2 text-xs uppercase tracking-widest shadow-lg shadow-accent/20 mt-2">
                                Run Health Check
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Stats Summary */}
                    <Card className="border-border/60 bg-card shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">Entity Pulse</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                        <TrendingUp className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Account Health</p>
                                        <p className="text-lg font-black text-foreground mt-[-2px]">98%</p>
                                    </div>
                                </div>
                                <div className="h-10 w-24 bg-muted/20 rounded-lg flex items-end px-1 py-1 gap-1">
                                    <div className="w-full bg-accent/20 h-[30%] rounded-sm" />
                                    <div className="w-full bg-accent/30 h-[50%] rounded-sm" />
                                    <div className="w-full bg-accent/40 h-[40%] rounded-sm" />
                                    <div className="w-full bg-accent/60 h-[70%] rounded-sm" />
                                    <div className="w-full bg-accent h-[90%] rounded-sm shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.3)]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Document Quick Access */}
                    <Card className="border-border/60 bg-card shadow-sm overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-border/40">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">Recent Vault Items</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/40 hover:text-accent">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border/40">
                                <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-muted/10 transition-all group">
                                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-red-500/10 group-hover:text-red-500 transition-all">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold truncate">SARS_ITA34_2024.pdf</p>
                                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Tax Assessment</p>
                                    </div>
                                </div>
                                <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-muted/10 transition-all group">
                                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-bold truncate">CIPC_CERT_COR14.3.pdf</p>
                                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Registration</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full h-11 rounded-none border-t border-border/40 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-accent hover:bg-accent/5">
                                Enter Complete Vault
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

