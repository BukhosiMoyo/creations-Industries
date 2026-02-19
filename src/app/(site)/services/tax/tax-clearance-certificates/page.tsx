import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck, Plane, FileCheck, AlertOctagon, Building2 } from "lucide-react"
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
    title: "Tax Clearance Certificates (TCS PIN) Services",
    description: "Internal & Foreign Investment Tax Clearance specialists. We help you fix non-compliance issues to get your 'Good Standing' status back fast.",
    canonical: "/services/tax/tax-clearance-certificates"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Urgent restoration of 'Tax Compliant' status",
    "Generation of TCS PIN for Tenders and Government bids",
    "Foreign Investment Allowance (FIA) clearances for moving money offshore",
    "Resolution of 'systems' blocks preventing clearance",
    "Continuous monitoring of your compliance status"
]

const processSteps = [
    { step: 1, title: "Diagnostic Check", description: "We run a full compliance check on eFiling to identify exactly which returns or payments are outstanding." },
    { step: 2, title: "Remediation", description: "We file the missing returns or arrange a 'Deferment of Payment' plan to satisfy SARS immediately." },
    { step: 3, title: "Application", description: "We submit the TCS application. For foreign investment, we upload the strict supporting documents required." },
    { step: 4, title: "Issue & Monitor", description: "Once compliant, we issue your PIN. We then monitor your profile weekly to ensure it doesn't expire." }
]

const useCases = [
    {
        title: "The Tender Bidder",
        desc: <>Deadline is in 48 hours. Needs a valid TCS PIN immediately to submit with a government proposal. (Consider a <Link href="/services/company-services/shelf-companies" className="text-accent hover:underline">Shelf Company</Link> if you need a number today).</>
    },
    {
        title: "The Emigrating Family",
        desc: "Needs to move funds abroad. Requires an 'Emigration Clearance' (AIT) which triggers a rigorous SARS audit of your wealth."
    },
    {
        title: "The Strategic Partner",
        desc: "Applying for vendor listing with a large corporate. They demand proof of good standing as part of due diligence."
    }
]

const faqs = [
    {
        question: "How long does it take to get a Tax Clearance?",
        answer: "If you are fully compliant (no outstanding returns/debt), it is instant. If you are non-compliant, it depends entirely on how fast we can file the missing returns and pay the debt."
    },
    {
        question: "What is a TCS PIN?",
        answer: "The 'Tax Compliance Status' PIN replaces the old paper certificate. You give this PIN to a third party (like a government department), and they use it to view your real-time tax status online."
    },
    {
        question: "Can I get clearance if I owe SARS money?",
        answer: "Generally, no. However, if we negotiate a formal 'Deferment of Payment' or 'Compromise' agreement, SARS may grant clearance while you are paying off the debt."
    },
    {
        question: "What is AIT (Approval for International Transfers)?",
        answer: "This is the new strict process for moving more than R1m offshore. It requires disclosing your assets and liabilities to SARS. We specialise in these complex applications."
    },
    {
        question: "Why did my clearance expire?",
        answer: "Tax clearance is not valid for a year; it is a snapshot. If you miss a single VAT payment or file a return one day late, your status changes to 'Non-Compliant' immediately."
    },
    {
        question: "Can I bid for a tender while waiting for clearance?",
        answer: "Usually, no. Most tender mandates require a valid TCS PIN at the exact moment of submission. We prioritize these cases to get you Green status before the deadline."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function TaxClearancePage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Tax Clearance Services South Africa",
        description: "Assistance with SARS Tax Clearance certificates and TCS PINs.",
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
            name: "Tax Clearance Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tender Clearance (Good Standing)" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Foreign Investment Clearance" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Compliance Restoration" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Tax Support", item: "https://creations.africa/services/tax" },
            { "@type": "ListItem", position: 4, name: "Tax Clearance", item: "https://creations.africa/services/tax/tax-clearance-certificates" }
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
                                    <ShieldCheck className="h-3.5 w-3.5 mr-2" /> Tax Clearance & Compliance
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Tax Clearance Certificates (TCS PIN) Services
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Unlock tenders, contracts, and foreign transfers. We fast-track your compliance to get that all-important "Good Standing" Pin.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="clearance_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Get My Clearance Pin <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                                <Link href="/services/tax">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">
                                        Back to Tax
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
                            <h2 className="text-3xl font-bold mb-6">The "Green" Status Matters</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                In South Africa, a Tax Clearance Pin is your business passport. Without it, you cannot win government work, you cannot get vendor listing approvals, and you often cannot secure funding.
                            </p>
                            <Link href="/services/tax/sars-penalties-disputes">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Blocked by penalties? We can fix that <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <div className="mt-2">
                                <Link href="/services/company-services/company-amendments">
                                    <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                        Need to update directors first? <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
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
                        <h2 className="text-3xl font-bold mb-4">Types of Clearance</h2>
                        <p className="text-text-secondary">Not all tax clearances are the same.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Good Standing</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        The standard pin. It proves your returns are up to date and you have no outstanding debt. Essential for tenders and corporate contracts.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Plane className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Foreign Investment</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Formerly "Tax Clearance for Foreign Investment". Now "AIT". Required if you want to invest more than your R1m discretionary allowance offshore.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <AlertOctagon className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Emigration</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        If you are ceasing tax residency, you require a specific clearance to confirm you have paid any Capital Gains Tax (Exit Tax) on your worldwide assets.
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
                        <h2 className="text-3xl font-bold mb-4">How We Get You Compliant</h2>
                        <p className="text-text-secondary">We don't just click a button; we solve the underlying problems.</p>
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
                                        <Building2 className="h-8 w-8 text-accent/50 mb-4" />
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Turn Red to Green</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Don't let a "Non-Compliant" status cost you business. Get your TCS Pin sorted by professionals today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="clearance_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Fix My Compliance
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/tax">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Back to Tax Services
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
