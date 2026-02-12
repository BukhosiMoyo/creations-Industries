"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

export function LoginRightPanel() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = mounted && currentTheme === "dark";

    return (
        <div className="h-full w-full flex flex-col justify-center items-center p-8 lg:p-12 relative overflow-hidden bg-background">
            {/* Interactive Grid Background */}
            <div className="absolute inset-0 z-0">
                <InteractiveGridPattern
                    width={40}
                    height={40}
                    className="opacity-[0.5] dark:opacity-[0.2]"
                />
            </div>

            <div className={cn(
                "absolute inset-0 z-0 pointer-events-none",
                isDark
                    ? "bg-gradient-to-t from-background via-transparent to-transparent"
                    : "bg-gradient-to-t from-background via-transparent to-transparent"
            )} />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-lg space-y-8">
                <div className="space-y-2 text-left">
                    <h2 className={cn("text-3xl font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                        Secure Dashboard Access
                    </h2>
                    <p className={cn("text-lg", isDark ? "text-slate-400" : "text-slate-600")}>
                        Manage your accounting, track expenses, and view reports with our premium secure platform.
                    </p>
                </div>

                {/* Abstract UI Preview Collage */}
                <div className={cn(
                    "relative rounded-xl border p-4 shadow-2xl overflow-hidden aspect-video",
                    isDark ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-white/50"
                )}>
                    {/* Fake Header */}
                    <div className="flex items-center gap-2 mb-4 border-b pb-3 border-border/50">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <div className="ml-4 h-2 w-32 rounded-full bg-primary/10" />
                    </div>

                    {/* Fake Content Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Stats Card */}
                        <div className={cn("col-span-1 rounded-lg p-3 space-y-2", isDark ? "bg-slate-800/80" : "bg-white/80")}>
                            <div className="h-2 w-12 rounded bg-primary/20" />
                            <div className="h-6 w-full rounded bg-primary/10" />
                        </div>
                        <div className={cn("col-span-1 rounded-lg p-3 space-y-2", isDark ? "bg-slate-800/80" : "bg-white/80")}>
                            <div className="h-2 w-12 rounded bg-primary/20" />
                            <div className="h-6 w-full rounded bg-primary/10" />
                        </div>
                        <div className={cn("col-span-1 rounded-lg p-3 space-y-2", isDark ? "bg-slate-800/80" : "bg-white/80")}>
                            <div className="h-2 w-12 rounded bg-primary/20" />
                            <div className="h-6 w-full rounded bg-primary/10" />
                        </div>

                        {/* Main Graph Area */}
                        <div className={cn("col-span-2 row-span-2 rounded-lg p-3 space-y-2", isDark ? "bg-slate-800/80" : "bg-white/80")}>
                            <div className="flex items-end space-x-2 h-20 w-full pt-4">
                                <div className="w-full bg-primary/20 rounded-t h-[40%]" />
                                <div className="w-full bg-primary/30 rounded-t h-[70%]" />
                                <div className="w-full bg-primary/40 rounded-t h-[50%]" />
                                <div className="w-full bg-primary/50 rounded-t h-[90%]" />
                                <div className="w-full bg-primary/30 rounded-t h-[60%]" />
                            </div>
                        </div>

                        {/* Side List */}
                        <div className={cn("col-span-1 row-span-2 rounded-lg p-3 space-y-2", isDark ? "bg-slate-800/80" : "bg-white/80")}>
                            <div className="h-2 w-full rounded bg-muted" />
                            <div className="h-2 w-3/4 rounded bg-muted/50" />
                            <div className="h-2 w-full rounded bg-muted" />
                            <div className="h-2 w-2/3 rounded bg-muted/50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
