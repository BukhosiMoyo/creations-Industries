import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Ruler, HardHat, TrendingUp, Clock, FileCheck, ShieldCheck, Building, Coins } from "lucide-react"
import { QuoteLink } from "@/components/common/quote-link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { IconList } from "@/components/ui/icon-list"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Product, WithContext, BreadcrumbList, FAQPage } from "schema-dts"
import { TestimonialCard } from "@/components/trust/testimonial-card"
import { TrustBlock } from "@/components/trust/trust-block"

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Accounting for Engineers & Project Managers | Creations",
    description: "Project-based accounting for South African consulting engineers. We manage WIP, retention money, and ECSA compliance for civil, mechanical, and structural firms.",
    canonical: "/industries/engineering-consultants"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "Civil Engineering Consultants",
    "Structural & Mechanical Firms",
    "Project Management Companies",
    "Electrical Engineers",
    "Quantity Surveyors",
    "Independent Contractors"
]

const services = [
    {
        title: "Project Profitability",
        description: "Monthly view of Revenue vs. Cost per active project. Know exactly which job is profitable.",
        icon: TrendingUp,
    },
    {
        title: "Timesheet Mgmt",
        description: "Integrating time-tracking (e.g., Xero Projects) with billing to capture every billable hour.",
        icon: Clock,
    },
    {
        title: "Tax Clearance",
        description: "Keeping your Tax Clearance (TCC) valid for government and municipal tenders.",
        icon: FileCheck,
    },
    {
        title: "Asset Finance",
        description: "Structuring vehicle and technical equipment finance tax-efficiently.",
        icon: Coins,
    }
]

const painPoints = [
    { title: "Scope Creep", desc: "We track costs in real-time so you can spot when a project is going over budget before it bleeds cash." },
    { title: "PSC Risk", desc: "We advise on Personal Service Company tax risks for independent contractors to avoid the 45% flat rate." },
    { title: "Cash Flow Valleys", desc: "Managing the gap between invoicing 60-day clients and paying immediate expenses." }
]

const faqs = [
    {
        question: "I trade as a sole prop engineer. Should I register a Pty Ltd?",
        answer: "It often depends on risk and profit retention. A Pty Ltd limits liability (crucial in engineering) and can offer tax advantages if you retain profits for growth/re-investment."
    },
    {
        question: "Can you help with CESA / ECSA audits?",
        answer: "Yes. We assist by preparing the reviewed or audited financial statements often required for annual industry accreditation."
    },
    {
        question: "How do you handle retention money?",
        answer: "We account for retention as a 'Debtor' but separate it from current cash flow, so you don't budget on money you can't touch yet."
    },
    {
        question: "Do you understand standard consulting fee structures?",
        answer: "Yes, we are familiar with ECSA fee guidelines and time-based billing models."
    },
    {
        question: "Can you assist with tender documents?",
        answer: "We provide the financial compliance documents (Tax Clearance, Financial Statements, B-BBEE affidavits) required for your tender pack."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function EngineeringIndustryPage() {
    // Schema
    const jsonLd: WithContext<Product> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Accounting for Engineering Consultants",
        description: "Specialized project accounting and tax services for engineering firms in South Africa.",
        brand: {
            "@type": "Brand",
            name: "Creations Accounting"
        },
        sku: "SERVICE-ENG-ACC"
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Industries", item: "https://creations.co.za/services" },
            { "@type": "ListItem", position: 3, name: "Engineering", item: "https://creations.co.za/industries/engineering-consultants" }
        ]
    }

    const faqSchema: WithContext<FAQPage> = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
            }
        }))
    }

    return (
        <div className="flex flex-col">
            <JsonLd data={jsonLd} />
            <JsonLd data={breadcrumbs} />
            <JsonLd data={faqSchema} />

            {/* 1. HERO */}
            <SectionWrapper variant="base" padding="lg" showGlow showReactiveGrid patternIntensity="subtle" className="border-b border-border/40">
                <Container>
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <StaggerChildren className="w-full">
                            <MotionWrapper direction="down" delay={0.1}>
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6 font-medium">
                                    <Ruler className="h-3.5 w-3.5 mr-2" /> Engineering & Consulting
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-primary mb-6 leading-[1.1]">
                                    Financial Precision for Engineering Consultants
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Project-based accounting that tracks profitability per job. Built for ECSA-registered professionals and consulting firms.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="industry_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">Structure Your Firm <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </QuoteLink>
                                <Link href="#services">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">View Services</Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. THE CONTEXT */}
            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <MotionWrapper className="lg:col-span-5">
                            <h2 className="text-3xl font-bold mb-6">Engineered for Accuracy</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Engineering firms live and die by project profitability. A grand total in the bank account doesn&apos;t tell you which project is subsidizing the others.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="p-4 rounded-xl bg-background border border-border/50">
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <Building className="h-4 w-4 text-primary" /> Project Accounting
                                    </h3>
                                    <p className="text-sm text-text-secondary">Allocating hours and expenses to specific project codes to track real margin.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-background border border-border/50">
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-primary" /> Retention Management
                                    </h3>
                                    <p className="text-sm text-text-secondary">Tracking retention money held by clients to ensure it is invoiced when due.</p>
                                </div>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-7">
                            <div className="bg-surface-elevated border border-border rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-6">Who We Assist</h3>
                                <IconList
                                    items={whoIsThisFor}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    itemClassName="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-all flex items-center gap-3 text-sm"
                                    iconClassName="h-4 w-4 text-primary shrink-0"
                                />
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST SIGNAL 1 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="Project-based accounting that actually makes sense. We now know which tenders are profitable before we even bid."
                        author="Civil Engineer"
                        role="Director"
                        variant="primary"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 3. CORE SERVICES */}
            <SectionWrapper id="services" padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Core Services for Engineers</h2>
                        <p className="text-text-secondary">Keep your projects on track and your firm compliant.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="h-full bg-surface border-border/50 hover:border-primary/40 transition-all group">
                                    <CardContent className="p-6">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <service.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST BLOCK */}
            <TrustBlock />

            {/* 4. PAIN POINTS SOLVED */}
            <SectionWrapper padding="lg" variant="surface" showLineGrid>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {painPoints.map((point, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-accent/10 text-accent ring-8 ring-accent/5">
                                        <HardHat className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{point.desc}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5. FAQ */}
            <SectionWrapper variant="base" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Engineering Finance FAQ</h2>
                    </MotionWrapper>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-surface px-4">
                                <AccordionTrigger className="font-semibold text-text-primary hover:text-primary hover:no-underline py-4 text-left">
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

            {/* TRUST SIGNAL 2 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="ECSA compliancy audits are no longer stressful. Our financials are always ready."
                        author="Partner"
                        role="Structural Engineering Firm"
                        variant="subtle"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 6. INTERNAL LINKING */}
            <SectionWrapper variant="surface" padding="md" className="border-t border-border/40">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
                        <div className="text-text-secondary font-medium">Related Locations & Services:</div>
                        <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-end">
                            <Link href="/locations/pretoria" className="text-text-muted hover:text-primary transition-colors">Pretoria Hub</Link>
                            <Link href="/locations/johannesburg" className="text-text-muted hover:text-primary transition-colors">Johannesburg Hub</Link>
                            <Link href="/services/tax" className="text-text-muted hover:text-primary transition-colors">Tax Clearance</Link>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 7. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Build a Stronger Firm</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get project-based accounting services designed for engineers.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="industry_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Request Consultation
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/contact">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Contact Us
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                </Container>
            </SectionWrapper>
        </div>
    )
}
