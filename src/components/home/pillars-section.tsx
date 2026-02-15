"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, Calculator, BrainCircuit, ArrowRight, FileCheck, CheckCircle2, Landmark, History, SearchCheck, Zap } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { IconList } from "@/components/ui/icon-list"
import { cn } from "@/lib/utils"

interface PillarCardProps {
    title: string
    description: string
    icon: React.ElementType
    items: string[]
    quote: string
    href: string
    delay?: number
}

function PillarCard({ title, description, icon: Icon, items, quote, href, delay = 0 }: PillarCardProps) {
    return (
        <MotionWrapper delay={delay} className="group h-full">
            <Link href={href}>
                <div className="relative h-full flex flex-col p-8 rounded-[2rem] bg-surface-elevated/40 backdrop-blur-xl border border-white/10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-2 group overflow-hidden">

                    {/* Background Inner Glow on Hover */}
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                    {/* Animated Icon Container */}
                    <div className="relative mb-8 h-16 w-16">
                        {/* Outer Glow Ring */}
                        <div className="absolute inset-0 rounded-2xl bg-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700" />

                        {/* The Icon Box */}
                        <div className="relative h-full w-full rounded-2xl bg-surface-elevated border border-white/20 flex items-center justify-center text-accent shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <Icon className="h-8 w-8 transition-all duration-500 group-hover:scale-110" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-text-primary mb-2 flex items-center gap-2">
                            {title}
                            <Zap className="h-4 w-4 text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                        </h3>
                        <p className="text-text-secondary leading-relaxed">{description}</p>
                    </div>

                    <div className="flex-1 space-y-6">
                        <IconList
                            items={items}
                            defaultIcon={CheckCircle2}
                            className="text-sm font-medium"
                        />

                        <div className="pt-6 border-t border-white/5">
                            <p className="text-text-muted text-xs font-semibold uppercase tracking-widest flex items-center gap-2 italic">
                                <History className="h-3 w-3" />
                                {quote}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm font-bold text-accent group-hover:underline">Explore {title}</span>
                        <div className="h-8 w-8 rounded-full border border-accent/20 flex items-center justify-center text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white">
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>

                    {/* Subtle corner decoration */}
                    <div className="absolute bottom-0 right-0 h-24 w-24 bg-accent/5 blur-[40px] rounded-full translate-x-12 translate-y-12 -z-10 group-hover:bg-accent/10 transition-colors" />
                </div>
            </Link>
        </MotionWrapper>
    )
}

export function PillarsSection() {
    return (
        <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
            <Container>
                <MotionWrapper direction="down" className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-[0.2em] mb-4">
                        Core Solutions
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl mb-6">
                        Three Pillars. <br className="sm:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Absolute Precision.</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        We&apos;ve engineered our services into three distinct centers of excellence, ensuring every South African SME has the foundation to scale.
                    </p>
                </MotionWrapper>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    <PillarCard
                        title="Compliance"
                        description="Professional safeguard against regulatory friction."
                        icon={ShieldCheck}
                        items={[
                            "SARS tax filings & returns",
                            "CIPC annual returns",
                            "Companies Act secretarial"
                        ]}
                        quote="Non-compliance cost is 2.7x more than fees."
                        href="/services/tax"
                        delay={0.1}
                    />

                    <PillarCard
                        title="Accounting"
                        description="The financial heartbeat of your daily operations."
                        icon={Calculator}
                        items={[
                            "Monthly bookkeeping & VAT",
                            "Payroll Service (PAYE, UIF)",
                            "Audit Readiness & Reporting"
                        ]}
                        quote="Clean books are the language of growth."
                        href="/services/accounting"
                        delay={0.2}
                    />

                    <PillarCard
                        title="Intelligence"
                        description="Turning raw data into strategic advantage."
                        icon={BrainCircuit}
                        items={[
                            "Management accounts & Cashflow",
                            "Data Analytics & Advisory",
                            "Business IT Solutions"
                        ]}
                        quote="Strategy is knowing how to scale."
                        href="/services/advisory-services"
                        delay={0.3}
                    />
                </StaggerChildren>
            </Container>
        </SectionWrapper>
    )
}
