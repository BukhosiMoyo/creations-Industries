"use client"

import Link from "next/link"
import { ArrowRight, Clock, FileText, HelpCircle, Shield, ShieldCheck, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IndustryContent } from "@/types/service"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { IconList } from "@/components/ui/icon-list"
import { CurvyGraph } from "@/components/ui/curvy-graph"

interface IndustryPageTemplateProps {
    content: IndustryContent
}

export function IndustryPageTemplate({ content }: IndustryPageTemplateProps) {
    return (
        <div className="flex flex-col">
            {/* 1. HERO SECTION */}
            <SectionWrapper variant="base" padding="lg" showGlow showReactiveGrid patternIntensity="subtle" className="border-b border-border/40">
                <Container>
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <StaggerChildren className="w-full">
                            <MotionWrapper direction="down" delay={0.1}>
                                <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-6 font-medium">
                                    Industry Specialist
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    {content.hero.heading}
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-3xl mx-auto">
                                    {content.hero.subheading}
                                </p>
                            </MotionWrapper>

                            {content.hero.helperStrip && (
                                <MotionWrapper delay={0.35} className="flex flex-wrap justify-center gap-2 mb-10">
                                    {content.hero.helperStrip.map((item, i) => (
                                        <div key={i} className="px-3 py-1.5 rounded-lg bg-surface/50 border border-border/50 text-sm text-text-secondary flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                            {item}
                                        </div>
                                    ))}
                                </MotionWrapper>
                            )}

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/quote">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base">Get a Quote <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface">Contact Us</Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. STATS & INSIGHTS */}
            {content.stats && content.stats.length > 0 && (
                <SectionWrapper padding="md" showDotGrid patternIntensity="subtle" className="bg-background border-b border-border/40">
                    <Container>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {content.stats.map((stat, i) => (
                                <MotionWrapper key={i} delay={i * 0.1} className="text-center group border-r border-border/20 last:border-0 pr-4 last:pr-0">
                                    <div className="text-3xl md:text-4xl font-black text-accent mb-1 tabular-nums group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                                    <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">{stat.label}</div>
                                    {stat.description && <p className="text-xs text-text-secondary leading-tight opacity-80">{stat.description}</p>}
                                </MotionWrapper>
                            ))}
                        </div>
                    </Container>
                </SectionWrapper>
            )}

            {/* 2.5. PROBLEMS SOLVED */}
            {content.problemsSolved && content.problemsSolved.length > 0 && (
                <SectionWrapper variant="base" padding="lg" showLineGrid patternIntensity="subtle" className="overflow-hidden">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <MotionWrapper className="lg:col-span-4">
                                <h2 className="text-3xl font-bold mb-6">Industry Challenges We Solve</h2>
                                <p className="text-text-secondary leading-relaxed">
                                    Specific industries face specific financial hurdles. We understand the context of your sector.
                                </p>
                            </MotionWrapper>
                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {content.problemsSolved.map((problem, i) => (
                                    <MotionWrapper key={i} delay={i * 0.1} className="p-6 rounded-2xl bg-surface/40 border border-border/50 hover:border-accent/20 transition-all flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="h-4 w-4 text-accent" />
                                        </div>
                                        <p className="text-sm font-medium text-text-primary leading-snug">{problem}</p>
                                    </MotionWrapper>
                                ))}
                            </div>
                        </div>
                    </Container>
                </SectionWrapper>
            )}

            {/* 3. WHO IS THIS FOR & DELIVERABLES */}
            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle" className="border-y border-border/40">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left: Who is this for */}
                        <MotionWrapper direction="right" className="lg:col-span-5 space-y-8">
                            <div className="relative">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Users className="h-6 w-6 text-accent" /> Use Cases
                                </h3>
                                <IconList
                                    items={content.whoIsThisFor}
                                    defaultIcon={TrendingUp}
                                    itemClassName="p-4 rounded-xl bg-background border border-border shadow-sm hover:border-accent/20 transition-all group"
                                />
                            </div>

                            {/* Requirements Box */}
                            <div className="p-6 rounded-2xl bg-surface-elevated/50 backdrop-blur-sm border border-border shadow-inner relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-colors" />
                                <h4 className="font-bold mb-4 flex items-center gap-2 text-text-primary relative z-10">
                                    <ShieldCheck className="h-5 w-5 text-accent" /> Prerequisites
                                </h4>
                                <IconList
                                    items={content.requirements}
                                    iconClassName="h-4 w-4 text-text-muted"
                                    itemClassName="text-sm text-text-secondary"
                                    className="space-y-2 relative z-10"
                                />
                            </div>
                        </MotionWrapper>

                        {/* Right: Deliverables */}
                        <MotionWrapper direction="left" className="lg:col-span-7">
                            <div className="h-full flex flex-col">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <FileText className="h-6 w-6 text-accent" /> Services Included
                                </h3>
                                <IconList
                                    items={content.deliverables}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
                                    itemClassName="p-5 rounded-2xl bg-background border border-border/50 hover:bg-background/80 transition-all"
                                />

                                {/* Timeline Badge */}
                                <div className="mt-8">
                                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/5 border border-accent/10 text-sm font-semibold text-accent">
                                        <Clock className="h-5 w-5 animate-pulse" /> Typical Timeline: <span className="text-text-primary ml-1">{content.timeline}</span>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3.5. COMPLIANCE CONTEXT */}
            {content.complianceContext && (
                <SectionWrapper variant="base" padding="md" showLineGrid patternIntensity="subtle" className="bg-surface/30">
                    <Container>
                        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-background border border-border/50 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="h-20 w-20 rounded-2xl bg-accent/5 flex items-center justify-center shrink-0 border border-accent/10 group-hover:bg-accent/10 transition-colors">
                                    <Shield className="h-10 w-10 text-accent" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-text-primary">Compliance & Context</h3>
                                    <p className="text-text-secondary italic mb-6">
                                        {content.complianceContext}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </SectionWrapper>
            )}

            {/* 4. PROCESS STEPS */}
            <SectionWrapper padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-text-primary">How We Work</h2>
                        <p className="text-text-secondary text-lg">A structured approach designed for your industry.</p>
                    </MotionWrapper>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {content.process.map((step, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="h-full bg-surface/40 hover:bg-surface border-border/50 group overflow-hidden relative transition-all duration-300 hover:-translate-y-1">
                                    <div className="absolute top-0 right-0 w-24 h-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                        <CurvyGraph />
                                    </div>
                                    <CardHeader className="pb-2">
                                        <div className="text-5xl font-black text-accent/5 group-hover:text-accent/10 transition-colors mb-2 italic">0{step.step}</div>
                                        <CardTitle className="text-lg group-hover:text-accent transition-colors font-bold">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-text-secondary leading-relaxed opacity-90">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </StaggerChildren>

                    {/* Insights Box */}
                    {content.insights && content.insights.length > 0 && (
                        <MotionWrapper delay={0.4} className="mt-16 p-8 rounded-3xl bg-accent/[0.03] border border-accent/10 relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 w-64 h-32 opacity-10 pointer-events-none">
                                <CurvyGraph />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-accent">
                                    <TrendingUp className="h-5 w-5" /> Specialist Insights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {content.insights.map((insight, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0" />
                                            <p className="text-text-secondary text-sm leading-relaxed">{insight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </MotionWrapper>
                    )}
                </Container>
            </SectionWrapper>

            {/* 4. FAQs */}
            <SectionWrapper variant="surface" padding="lg" showLineGrid patternIntensity="subtle">
                <Container className="max-w-3xl">
                    <MotionWrapper direction="none" className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Common Questions</h2>
                    </MotionWrapper>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {content.faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl bg-background px-4 overflow-hidden shadow-sm">
                                <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline hover:text-accent">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-text-secondary pb-4 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Container>
            </SectionWrapper>

            {/* 5. RELATED SERVICES & CTA */}
            <SectionWrapper padding="lg" showGlow showDotGrid patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper direction="down" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Recommended Services</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {content.relatedServices.map((service, i) => (
                                <Link key={i} href={`/services/${service.slug}`}>
                                    <Button variant="outline" className="h-auto py-3 px-6 text-base border-border bg-surface hover:bg-surface-elevated group">
                                        {service.title} <ArrowRight className="ml-2 h-4 w-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </MotionWrapper>

                    <MotionWrapper direction="up" delay={0.2} className="p-1 md:p-1.5 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-accent/20">
                        <div className="p-8 md:p-12 rounded-[1.8rem] bg-surface border border-border/50 shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start?</h3>
                                <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
                                    Get a comprehensive quote tailored to your business needs in less than 24 hours.
                                </p>
                                <Link href="/quote">
                                    <Button variant="glow" size="lg" className="w-full sm:w-auto px-16 h-16 text-xl font-bold">
                                        Request Quote Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </MotionWrapper>
                </Container>
            </SectionWrapper>
        </div>
    )
}
