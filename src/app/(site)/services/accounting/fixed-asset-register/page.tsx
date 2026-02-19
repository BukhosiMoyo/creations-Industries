
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Shield, Clock, Calculator, Table2, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { IconList } from "@/components/ui/icon-list"
import { QuoteLink } from "@/components/common/quote-link"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Service, WithContext, BreadcrumbList, FAQPage } from "schema-dts"
import { TestimonialCard } from "@/components/trust/testimonial-card"
import { TrustBlock } from "@/components/trust/trust-block"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Fixed Asset Register Services for SA Businesses",
    description: "Compliant Fixed Asset Registers (FAR) for South African companies. Track depreciation, disposals, and tax values (s11e, s12c) for audit readiness.",
    canonical: "/services/accounting/fixed-asset-register"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Ensure IFRS for SMEs or SA GAAP compliance",
    "Accurately calculate depreciation and wear-and-tear allowances",
    "Track location, serial numbers, and custodians of company assets",
    "Identify 'Ghost Assets' (paying insurance for things you don't have)",
    "Essential for insurance claims and audit verification"
]

const processSteps = [
    { step: 1, title: "Asset Audit", description: "We review your current list vs physical reality. If needed, we can assist with a physical verification process." },
    { step: 2, title: "Register Setup", description: "We build a compliant register tracking purchase date, cost, location, useful life, and residual value." },
    { step: 3, title: "Depreciation Run", description: "We calculate monthly depreciation (Accounting) vs Wear-and-Tear (Tax) to ensure your books and tax returns are accurate." },
    { step: 4, title: "Maintenance", description: "We process additions, disposals, and impairments monthly or annually to keep the register 100% current." }
]

const useCases = [
    {
        title: "The Manufacturing Plant",
        desc: "Heavy machinery with complex Section 12C tax allowances. Needs strict tracking of asset lifespan and residual values."
    },
    {
        title: "The IT Company",
        desc: "Hundreds of laptops and monitors allocated to staff. Needs to track 'who has what' and when to replace aging hardware."
    },
    {
        title: "The Property Group",
        desc: "Managing fit-outs, furniture, and improvements across multiple properties. Needs to separate repairs (opex) from improvements (capex)."
    }
]

const faqs = [
    {
        question: "Why do I need a Fixed Asset Register?",
        answer: "The Companies Act and Tax Administration Act require you to maintain a register of assets. Without it, you cannot legally claim depreciation or wear-and-tear allowances, meaning you pay more tax than necessary."
    },
    {
        question: "What is the difference between Depreciation and Wear-and-Tear?",
        answer: "Depreciation is an accounting concept (spreading cost over useful life). Wear-and-Tear is the SARS tax allowance (s11e, s12c, etc.). They are often different figures, and we track both to ensure your tax return is optimized."
    },
    {
        question: "What counts as a Fixed Asset?",
        answer: "Typically, tangible items held for use in the production of income with a life span of more than 1 year (e.g., vehicles, computers, furniture, machinery). Small items (under R7000) are often written off immediately for tax purposes."
    },
    {
        question: "Can you help me tag my assets?",
        answer: "Yes. While we focus on the financial register, we can advise on barcode/QR code tagging systems to link the physical asset to the financial record."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function FixedAssetRegisterPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Fixed Asset Register Services South Africa",
        description: "Professional asset register maintenance, depreciation calculation, and verification for audit.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.africa"
        },
        areaServed: {
            "@type": "Country",
            name: "South Africa"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Asset Management",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fixed Asset Register Setup" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Depreciation Schedules" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Asset Verification Support" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Accounting", item: "https://creations.africa/services/accounting" },
            { "@type": "ListItem", position: 4, name: "Fixed Asset Register", item: "https://creations.africa/services/accounting/fixed-asset-register" }
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
                                <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-6 font-medium">
                                    <Table2 className="h-3.5 w-3.5 mr-2" /> Asset Management Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Fixed Asset Register Services for SA Businesses
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Protect your investments and optimize your tax. We build compliant asset registers that track every vehicle, laptop, and machine you own.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="asset_register_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Update My Register <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                                <Link href="/services/accounting">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">
                                        Back to Accounting
                                    </Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. VALUE SUMMARY */}
            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <MotionWrapper className="lg:col-span-5">
                            <h2 className="text-3xl font-bold mb-6">Stop Bleeding Value</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Many businesses pay insurance on assets they sold years ago, or fail to claim tax deductions on new equipment. A clean Fixed Asset Register (FAR) stops this leakage immediately.
                            </p>
                            <Link href="/services/accounting/financial-statements-preparation">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need AFS? A clean register is required <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-7">
                            <IconList
                                items={valueSummary}
                                className="grid grid-cols-1 gap-4"
                                itemClassName="p-4 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-all flex items-center gap-3"
                                iconClassName="h-5 w-5 text-accent shrink-0"
                            />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. DEEP EXPLANATION */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Total Asset Visibility</h2>
                        <p className="text-text-secondary">We track the three critical lifecycles of your business assets.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Building2 className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Acquisition</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Correctly capitalizing costs (purchase price, delivery, installation) vs expensing them. Maximizing input VAT claims where allowable.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Calculator className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Utilization</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Calculating monthly depreciation to reflect usage. Assessing impairments if an asset is damaged or obsolete.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Shield className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Disposal</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Calculating profit/loss on sale. Ensuring recoupments are declared to SARS and Capital Gains Tax (CGT) is handled correctly.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 4. PROCESS */}
            <SectionWrapper padding="lg" variant="surface" showLineGrid>
                <Container>
                    <MotionWrapper className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Register Management Process</h2>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="relative pl-6 border-l-2 border-border/50 group hover:border-accent transition-colors pb-2">
                                    <div className="text-xs uppercase font-bold text-accent mb-1">Step {step.step}</div>
                                    <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5. USE CASES */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Who Needs This?</h2>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="bg-surface/50 border-border/50 hover:border-accent/30 transition-all h-full">
                                    <CardContent className="p-6">
                                        <FileText className="h-8 w-8 text-accent/50 mb-4" />
                                        <h3 className="font-bold text-lg mb-2">{useCase.title}</h3>
                                        <p className="text-sm text-text-secondary">{useCase.desc}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 6. TRUST BLOCK */}
            <TrustBlock />

            {/* 7. FAQs */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    </MotionWrapper>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-background px-4">
                                <AccordionTrigger className="font-semibold text-text-primary hover:text-accent hover:no-underline py-4 text-left">
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

            {/* 8. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Capitalize, Depreciate, Optimize</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Don't let messy asset data fail your audit or cost you tax breaks. Get a professional register today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="asset_register_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Start Asset Audit
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/accounting">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Back to Accounting
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
