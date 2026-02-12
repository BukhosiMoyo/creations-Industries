"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { pillars, services } from "@/lib/services"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"

export default function ServicesPage() {
    return (
        <main>
            <SectionWrapper showGlow showReactiveGrid patternIntensity="subtle" padding="lg" className="border-b border-border/40">
                <Container className="text-center max-w-4xl">
                    <MotionWrapper direction="down">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-8">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Services</span>
                        </h1>
                        <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
                            Comprehensive accounting, compliance, and advisory solutions designed for South African businesses at every stage of growth.
                        </p>
                    </MotionWrapper>
                </Container>
            </SectionWrapper>

            {pillars.map((pillar, index) => {
                const pillarServices = services.filter(s => s.pillar === pillar.title)
                const isEven = index % 2 === 0

                return (
                    <SectionWrapper key={pillar.slug} variant={isEven ? "surface" : "base"} padding="lg" showDotGrid={!isEven} patternIntensity="subtle">
                        <Container>
                            <MotionWrapper className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 pb-6 border-b border-border/50">
                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4 tracking-wider uppercase">
                                        Pillar {index + 1}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary">{pillar.title}</h2>
                                    <p className="text-text-secondary mt-4 text-lg leading-relaxed">{pillar.description}</p>
                                </div>
                                <Link href={`/services/${pillar.slug}`}>
                                    <Button variant="outline" className="group h-12 px-6">
                                        View Pillar Overview <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </MotionWrapper>

                            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pillarServices.map((service, sIndex) => (
                                    <MotionWrapper key={service.slug} delay={sIndex * 0.1}>
                                        <Card className="border-border bg-background/50 hover:bg-background hover:border-accent/30 transition-all duration-300 h-full flex flex-col group">
                                            <CardHeader>
                                                <CardTitle className="text-xl group-hover:text-accent transition-colors">{service.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-1 flex flex-col justify-between pt-0">
                                                <p className="text-sm text-text-secondary mb-6 leading-relaxed">{service.hero.subheading}</p>
                                                <Link href={`/services/${service.slug}`} className="text-accent font-bold text-sm hover:text-accent-hover flex items-center group/link">
                                                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </MotionWrapper>
                                ))}
                            </StaggerChildren>
                        </Container>
                    </SectionWrapper>
                )
            })}

            <SectionWrapper padding="lg" variant="surface" showGlow patternIntensity="strong">
                <Container className="text-center max-w-3xl">
                    <MotionWrapper direction="up">
                        <h2 className="text-3xl font-bold mb-6">Not sure which pillar you need?</h2>
                        <p className="text-lg text-text-secondary mb-10">
                            Our advisors can help you structure the perfect package for your business.
                        </p>
                        <Link href="/contact">
                            <Button variant="glow" size="lg" className="h-14 px-12 text-lg font-bold">
                                Book a Strategy Call
                            </Button>
                        </Link>
                    </MotionWrapper>
                </Container>
            </SectionWrapper>
        </main>
    )
}
