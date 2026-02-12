"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ReactiveGridPattern } from "@/components/ui/reactive-grid-pattern"
import { motion } from "framer-motion"

interface Step {
    id: number
    title: string
    description?: string
    isCompleted: boolean
    isActive: boolean
}

interface QuoteFormLayoutProps {
    children: React.ReactNode
    steps: Step[]
    currentStep: number
    onStepChange?: (stepId: number) => void
    isLoading?: boolean
}

export function QuoteFormLayout({
    children,
    steps,
    currentStep,
    onStepChange,
    isLoading
}: QuoteFormLayoutProps) {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-background overflow-hidden relative">
            {/* Background Grid - Global */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/[0.02]" />
                <ReactiveGridPattern
                    className="opacity-[0.15] dark:opacity-[0.2]"
                    gap={60}
                    intensity="subtle"
                />
            </div>

            {/* Left Sidebar - Desktop */}
            <aside className="hidden md:flex w-[320px] lg:w-[380px] flex-col justify-between border-r border-border/40 bg-card/30 backdrop-blur-sm p-8 lg:p-12 relative z-10">
                <div className="space-y-12">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3 w-fit group">
                        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-white font-black italic shadow-xl shadow-accent/20 text-lg transition-transform group-hover:scale-105">C</div>
                        <span className="font-black tracking-tighter text-xl uppercase italic">Creations</span>
                    </Link>

                    {/* Stepper */}
                    <div className="relative space-y-0">
                        {/* Progress Line Background */}
                        <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-border/40 -z-10" />

                        {/* Active Progress Line */}
                        <motion.div
                            className="absolute left-[23px] top-4 w-0.5 bg-accent -z-10 origin-top"
                            initial={{ height: "0%" }}
                            animate={{ height: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />

                        {steps.map((step, index) => {
                            const isLast = index === steps.length - 1

                            return (
                                <div key={step.id} className={cn("relative flex gap-6 py-4", isLast && "pb-0")}>
                                    <div className={cn(
                                        "h-12 w-12 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-500 bg-background",
                                        step.isActive ? "border-accent text-accent shadow-lg shadow-accent/20 scale-110" :
                                            step.isCompleted ? "border-accent bg-accent text-white" :
                                                "border-muted text-muted-foreground"
                                    )}>
                                        {step.isCompleted ? (
                                            <CheckCircle2 className="h-6 w-6" />
                                        ) : (
                                            <span className="font-black text-sm">{step.id}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center pt-1">
                                        <span className={cn(
                                            "text-sm font-black uppercase tracking-wide transition-colors duration-300",
                                            step.isActive ? "text-foreground" : "text-muted-foreground"
                                        )}>
                                            {step.title}
                                        </span>
                                        {step.description && (
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium mt-1">
                                                {step.description}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Back to Home */}
                <Link
                    href="/"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all px-0 py-2 group mt-auto"
                >
                    <div className="h-8 w-8 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Home</span>
                </Link>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-6 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center text-white font-black italic shadow-lg shadow-accent/20">C</div>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Step {currentStep}</span>
                        <div className="flex gap-1 mt-1">
                            {steps.map(s => (
                                <div
                                    key={s.id}
                                    className={cn(
                                        "h-1 w-6 rounded-full",
                                        s.id <= currentStep ? "bg-accent" : "bg-muted"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <ThemeToggle className="h-8 w-8" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative z-10 flex flex-col h-full overflow-hidden">
                {/* Desktop Top Bar (Theme Toggle) */}
                <div className="hidden md:flex absolute top-0 right-0 p-8 z-50">
                    <ThemeToggle />
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-16 lg:p-24 flex flex-col max-w-5xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    )
}
