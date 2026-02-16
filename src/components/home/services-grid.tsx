"use client"

import Link from "next/link"
import { ArrowRight, Calculator, FileText, Building2, ShieldCheck, Briefcase, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"

const servicesList = [
    {
        id: 1,
        title: "Accounting Services",
        desc: "Financial statements, management reports, and decision support.",
        link: "/services/accounting",
        icon: Calculator
    },
    {
        id: 2,
        title: "Tax Services",
        desc: "Corporate & personal tax compliance, VAT, and dispute resolution.",
        link: "/services/tax",
        icon: FileText
    },
    {
        id: 3,
        title: "Bookkeeping",
        desc: "Monthly processing, bank reconciliations, and audit-ready records.",
        link: "/services/bookkeeping",
        icon: Briefcase
    },
    {
        id: 4,
        title: "Company Services",
        desc: "Amendments, address changes, and CIPC maintenance.",
        link: "/services/company-services",
        icon: Building2
    },
    {
        id: 5,
        title: "Compliance & Registrations",
        desc: "Annual returns, beneficial ownership, and statutory filings.",
        link: "/services/company-services/annual-returns-filing", // Linking to key compliance service
        icon: ShieldCheck
    },
    {
        id: 6,
        title: "Shelf Companies",
        desc: "Buy a pre-registered company for immediate trading authority.",
        link: "/services/company-services/shelf-companies",
        icon: ShoppingBag
    },
]

export function ServicesGridSection() {
    return (
        <SectionWrapper padding="lg" showLineGrid patternIntensity="subtle">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <MotionWrapper className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-4 font-medium">
                            Our Core Expertise
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-4">Complete Financial Solutions</h2>
                        <p className="text-lg text-text-secondary">Everything you need to run a compliant, profitable business in South Africa.</p>
                    </MotionWrapper>
                    <MotionWrapper direction="left" delay={0.2}>
                        <Link href="/services">
                            <Button variant="outline" className="group">
                                View All Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </MotionWrapper>
                </div>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesList.map((service, i) => (
                        <MotionWrapper key={service.id} delay={i * 0.05} className="h-full">
                            <Link href={service.link} className="block group h-full">
                                <Card className="h-full border-border bg-surface/40 hover:bg-surface hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden">
                                    <CardHeader>
                                        <div className="h-10 w-10 rounded-lg bg-surface-elevated border border-border/50 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                                            <service.icon className="h-5 w-5" />
                                        </div>
                                        <CardTitle className="flex items-center justify-between text-lg group-hover:text-accent transition-colors">
                                            {service.title}
                                            <ArrowRight className="h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </MotionWrapper>
                    ))}
                </StaggerChildren>
            </Container>
        </SectionWrapper>
    )
}
