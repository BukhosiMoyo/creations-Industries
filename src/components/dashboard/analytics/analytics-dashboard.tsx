"use client";

import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowUpRight, ArrowDownRight, Users, MousePointerClick, FileCheck, PartyPopper } from "lucide-react";

interface AnalyticsData {
    overview: {
        totalEvents: number;
        uniqueSessions: number;
    };
    funnel: {
        opened: number;
        step1: number;
        step2: number;
        step3: number;
        submitted: number;
        converted: number;
    };
    topServices: {
        slug: string | null;
        count: number;
    }[];
    activity: unknown[];
}

interface AnalyticsDashboardProps {
    initialData?: AnalyticsData | null;
}

export function AnalyticsDashboard({ initialData }: AnalyticsDashboardProps) {
    if (!initialData) {
        return (
            <div className="flex h-[400px] items-center justify-center border rounded-xl bg-card">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Loading analytics...</p>
                </div>
            </div>
        );
    }

    const { overview, funnel, topServices, activity } = initialData;

    // Transform Funnel Data for Chart
    const funnelChartData = [
        { name: "Opened", value: funnel.opened, fill: "#3b82f6" },
        { name: "Contact", value: funnel.step1, fill: "#60a5fa" },
        { name: "Service", value: funnel.step2, fill: "#93c5fd" },
        { name: "Details", value: funnel.step3, fill: "#bfdbfe" },
        { name: "Submitted", value: funnel.submitted, fill: "#22c55e" }, // Green for success
        { name: "Converted", value: funnel.converted, fill: "#16a34a" },
    ];

    // Conversion Rates
    const submitRate = funnel.opened > 0 ? ((funnel.submitted / funnel.opened) * 100).toFixed(1) : "0";
    const convertRate = funnel.submitted > 0 ? ((funnel.converted / funnel.submitted) * 100).toFixed(1) : "0";

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{overview.totalEvents.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Events tracked in 30 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Quote Submissions</CardTitle>
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{funnel.submitted}</div>
                        <p className="text-xs text-muted-foreground">
                            {submitRate}% conversion from open
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Client Conversions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{funnel.converted}</div>
                        <p className="text-xs text-muted-foreground">
                            {convertRate}% from submission to request
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Service</CardTitle>
                        <PartyPopper className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold truncate">
                            {topServices[0]?.slug?.replace(/-/g, ' ') || "N/A"}
                        </div>
                        <p className="text-xs text-muted-foreground">Most requested service</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Funnel Chart */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Conversion Funnel</CardTitle>
                        <CardDescription>
                            Drop-off analysis from Quote Wizard open to Final Conversion
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={funnelChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                                    <RechartsTooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Services */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Service Demand</CardTitle>
                        <CardDescription>
                            Most requested services (last 30 days)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topServices.map((service, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-full space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium capitalize">
                                                {service.slug?.replace(/-/g, ' ') || 'Unknown'}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {service.count}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                                            <div
                                                className="h-full bg-primary"
                                                style={{ width: `${(service.count / (topServices[0]?.count || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {topServices.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-8">
                                    No service data available yet.
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Chart (Optional, if time permits) */}
            {activity && activity.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Activity Volume</CardTitle>
                        <CardDescription>Daily event volume over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={activity}>
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        minTickGap={30}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis hide />
                                    <RechartsTooltip />
                                    <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorCount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
