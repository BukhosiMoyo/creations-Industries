import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, HardHat, Hammer, LayoutGrid, Zap, CheckCircle, TrendingUp, DollarSign } from "lucide-react"
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
    title: "Accounting for Construction & Contractors | Project Finance",
    description: "Robust financial control for SA construction companies. We manage WIP, project costing, BIBC compliance, and CIDB grading support.",
    canonical: "/industries/construction-projects"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "Building Contractors",
    "Property Developers",
    "Plumbers & Electricians (Sub-contractors)",
    "Civil Engineering Contractors",
    "Shopfitters"
]

const services = [
    {
        title: "Job Costing",
        description: "Tracking every bag of cement and hour of labor to specific sites. Know your true margin.",
        icon: Hammer,
    },
    {
        title: "CIDB Grading",
        description: "Preparing the financial statements required to upgrade your CIDB level for bigger tenders.",
        icon: CheckCircle,
    },
    {
        title: "Project Cash Flow",
        description: "Forecasting the 'S-curve' of project spend vs. draws to prevent liquidity focus.",
        icon: TrendingUp,
    },
    {
        title: "Asset Registers",
        description: "Tracking yellow metal depreciation, finance costs, and insurance.",
        icon: LayoutGrid,
    }
]

const painPoints = [
    { title: "Where did the money go?", desc: "We stop project cross-subsidization so you know which site is actually making money." },
    { title: "Asset Finance", desc: "We produce the management accounts banks need to approve vehicle and excavator finance." },
    { title: "Tax Clearance", desc: "Essential for every single tender. We keep it live and compliant." }
]

const faqs = [
    {
        question: "Can you help with my CIDB upgrade?",
        answer: "Yes. The primary constraint for CIDB upgrades is often 'Largest Contract Completed' and 'Net Asset Value'. We prepare the financials that prove your Net Asset Value."
    },
    {
        question: "How do you handle weekly wages?",
        answer: "We can run weekly payrolls or set up systems for you to manage casual labor while remaining compliant with SARS (PAYE)."
    },
    {
        question: "Do I need to register for VAT?",
        answer: "In construction, yes. Most material suppliers charge VAT, and you need to claim that back immediately to aid cash flow."
    },
    {
        question: "Can you handle retention money accounting?",
        answer: "Yes, we account for retention as a debtor but restrict it from your available cash flow forecasts."
    },
    {
        question: "Do you assist with BIBC (Building Industry Bargaining Council)?",
        answer: "Yes, we handle the notoriously complex BIBC returns for your compliant workforce."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function ConstructionIndustryPage() {
    // Schema
    const jsonLd: WithContext<Product> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Accounting for Construction Companies",
        description: "Specialized project accounting and tax services for construction and building contractors in South Africa.",
        brand: {
            "@type": "Brand",
            name: "Creations Accounting"
        },
        sku: "SERVICE-CONST-ACC"
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Industries", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Construction", item: "https://creations.africa/industries/construction-projects" }
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
                                    <HardHat className="h-3.5 w-3.5 mr-2" /> Construction & Projects
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-primary mb-6 leading-[1.1]">
                                    Build on a Solid Financial Foundation
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Construction accounting is messy. We bring order to materials, labor, and sub-contractor payments. Keep your projects and your CIDB grading on track.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="industry_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">Get Project Control <ArrowRight className="ml-2 h-4 w-4" /></Button>
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
                            <h2 className="text-3xl font-bold mb-6">Hard Hats & Hard Numbers</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                In construction, cash is king but profit is an opinion until the project is closed. Managing cash flow while waiting on draws is the difference between survival and liquidation.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="p-4 rounded-xl bg-background border border-border/50">
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-primary" /> WIP Accounting
                                    </h3>
                                    <p className="text-sm text-text-secondary">Recognizing revenue correctly on long-term contracts (measuring stages of completion).</p>
                                </div>
                                <div className="p-4 rounded-xl bg-background border border-border/50">
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-primary" /> Labor Compliance
                                    </h3>
                                    <p className="text-sm text-text-secondary">Managing the complexities of wages, BIBC (Building Council), and union requirements.</p>
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

            {/* 3. CORE SERVICES */}
            <SectionWrapper id="services" padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Core Services for Builders</h2>
                        <p className="text-text-secondary">From the first sod turning to practical completion.</p>
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
            <TrustBlock variant="process" />

            {/* 4. PAIN POINTS SOLVED */}
            <SectionWrapper padding="lg" variant="surface" showLineGrid>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {painPoints.map((point, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-accent/10 text-accent ring-8 ring-accent/5">
                                        <DollarSign className="h-6 w-6" />
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
                        <h2 className="text-3xl font-bold mb-4">Construction Finance FAQ</h2>
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
                        quote="Our CIDB upgrade was approved first time thanks to the compliant financials. Recommend them to any contractor."
                        author="Owner"
                        role="Civil Engineering Contractor"
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
                            <Link href="/locations/centurion" className="text-text-muted hover:text-primary transition-colors">Centurion Hub (Developments)</Link>
                            <Link href="/services/tax" className="text-text-muted hover:text-primary transition-colors">Tax Clearance Services</Link>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Build Your Business with Financial Clarity</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get construction accounting that keeps your sites running and your CIDB grading climbing.
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
