"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, TrendingUp, Landmark, Scale, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { CurvyGraph } from "@/components/ui/curvy-graph"
import { FloatingStat } from "@/components/ui/hero-visual-items"

export function HeroSection() {
    return (
        <SectionWrapper className="pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden" showGlow showReactiveGrid patternIntensity="subtle">
            <Container className="relative z-10 flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-center lg:justify-between gap-12">

                {/* Text Content */}
                <StaggerChildren className="flex-1 max-w-2xl">
                    <MotionWrapper direction="down" delay={0.1}>
                        <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-6 font-medium">
                            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                            Accepting New Clients for 2026/27 Tax Year
                        </div>
                    </MotionWrapper>

                    <MotionWrapper delay={0.2}>
                        <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:leading-tight mb-6">
                            Accounting, Compliance, and Advisory — <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent via-accent to-blue-600 animate-gradient-slow">Built for South African Businesses</span>
                        </h1>
                    </MotionWrapper>

                    <MotionWrapper delay={0.3}>
                        <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            From bookkeeping and SARS filings to data-driven advisory — we keep your business compliant, clear, and ready to grow.
                        </p>
                    </MotionWrapper>

                    <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                        <Link href="/quote">
                            <Button variant="glow" size="lg" className="h-12 px-8 text-base font-semibold group">
                                Request a Quote
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/services">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent border-border-subtle hover:bg-surface-elevated">View Our Services</Button>
                        </Link>
                    </MotionWrapper>

                    {/* Trust Row */}
                    <MotionWrapper delay={0.5} className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-text-muted border-t border-border pt-6 mt-2">
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            <span>SARS eFiling</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            <span>CIPC Compliance</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            <span>Nationwide Support</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            <span>SME Specialists</span>
                        </div>
                    </MotionWrapper>
                </StaggerChildren>

                {/* Advanced Visual Area (Right Side) */}
                <MotionWrapper direction="left" delay={0.6} className="hidden lg:block w-full max-w-md lg:max-w-[420px] relative">
                    <div className="relative aspect-[4/3] rounded-3xl bg-surface-elevated/40 backdrop-blur-xl border border-white/10 shadow-2xl p-8 flex flex-col group z-10 transition-transform duration-500 hover:scale-[1.02]">

                        {/* Header of the 'UI' */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="space-y-1">
                                <div className="h-2.5 w-20 bg-accent/30 rounded-full animate-pulse"></div>
                                <div className="text-xl font-bold tracking-tight">Performance</div>
                            </div>
                            <div className="h-12 w-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-inner">
                                <TrendingUp size={22} className="text-accent" />
                            </div>
                        </div>

                        {/* The Curvy Graph */}
                        <div className="flex-1 relative mb-4">
                            <CurvyGraph />
                        </div>

                        {/* Floating Stats */}
                        <FloatingStat
                            label="Tax Savings"
                            value={45600}
                            prefix="R"
                            icon={Landmark}
                            className="-top-12 -right-16"
                            delay={0.8}
                        />
                        <FloatingStat
                            label="Compliance"
                            value={100}
                            suffix="%"
                            icon={Scale}
                            className="bottom-10 -left-20"
                            delay={1.2}
                        />
                        <FloatingStat
                            label="Profit Growth"
                            value={24}
                            suffix="%"
                            icon={PieChart}
                            className="-top-20 left-12"
                            delay={1.5}
                        />

                        {/* Bottom Decoration - simplified dots */}
                        <div className="mt-auto pt-6 flex gap-2">
                            <div className="h-2 w-2 rounded-full bg-accent/40"></div>
                            <div className="h-2 w-2 rounded-full bg-border"></div>
                            <div className="h-2 w-2 rounded-full bg-border"></div>
                        </div>
                    </div>

                    {/* Background glow behind the container */}
                    <div className="absolute -inset-10 bg-accent/[0.03] rounded-[4rem] blur-[100px] -z-10 group-hover:bg-accent/[0.06] transition-colors duration-1000"></div>
                </MotionWrapper>

            </Container>
        </SectionWrapper>
    )
}
