import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Building2, Timer, ShieldCheck, FileCheck } from "lucide-react"
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
import { TrustBlock } from "@/components/trust/trust-block"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Shelf Companies for Sale | Immediate Trading & Tax Clearance",
    description: "Buy a pre-registered shelf company with a valid tax number. Trade immediately, skip the CIPC wait, and tender for contracts today.",
    canonical: "/services/company-services/shelf-companies"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Registered Company (Pty Ltd)",
    "Active Income Tax Number",
    "Prepare for VAT Registration",
    "Immediate Trading Authority",
    "Share Transfer Documents",
    "Director Amendment Included"
]

const processSteps = [
    { step: 1, title: "Select Company", description: "Choose from our list of available pre-registered companies (2023/2024 registration dates)." },
    { step: 2, title: "Director Change", description: "We instantly lodge the CIPC director amendment to transfer ownership to you." },
    { step: 3, title: "Share Transfer", description: <>We issue new <Link href="/services/company-services/company-amendments" className="text-accent hover:underline">Share Certificates</Link> and update the share register to reflect you as the owner.</> },
    { step: 4, title: "Handover", description: "Receive all company documents (COR14.3, MOI) and tax details within 24 hours." }
]

const faqs = [
    {
        question: "Why buy a Shelf Company instead of registering a new one?",
        answer: "Speed and history. Shelf companies are already registered, so you get the registration number instantly. Some tenders or contracts also prefer companies that have been registered for a longer period (aging)."
    },
    {
        question: "Does it come with a bank account?",
        answer: "No. In South Africa, banks require the new directors to appear in person (FICA) to open an account. We provide all the documents you need to successfully open one."
    },
    {
        question: "Is there any debt in the shelf company?",
        answer: "No. Our shelf companies are dormant' 'clean' shells. They have never traded, have no assets, and no liabilities. We provide a guarantee of this."
    },
    {
        question: "Can I change the name?",
        answer: "Yes, but that takes time. The shelf company comes with a generic name (e.g., 'K2024123456 South Africa'). To trade immediately, most clients use the 'Trading As' name on their invoices while waiting for a formal name change later."
    },
    {
        question: "Do I need to visit SARS?",
        answer: "No. We handle the transfer of the Income Tax profile to your eFiling profile digitally. You don't need to stand in queues."
    },
    {
        question: "What happens to the old directors?",
        answer: "They resign effectively immediately upon the CIPC amendment. You become the sole authorized representative and director of the company."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function ShelfCompaniesPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Shelf Companies Service",
        description: "Pre-registered Pty Ltd companies for immediate trading.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.africa"
        },
        areaServed: {
            "@type": "Country",
            name: "South Africa"
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Company Services", item: "https://creations.africa/services/company-services" },
            { "@type": "ListItem", position: 4, name: "Shelf Companies", item: "https://creations.africa/services/company-services/shelf-companies" }
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
                                    <Timer className="h-3.5 w-3.5 mr-2" /> Immediate Trading Authority
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Buy a Shelf Company & Trade Today
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Skip the CIPC registration wait. Get a pre-registered 2023/2024 company with a tax number. Perfect for urgent contracts and tenders.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="shelf_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Buy Shelf Company <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                                <Link href="/services/company-services/company-registration">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">
                                        Register New Instead
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
                            <h2 className="text-3xl font-bold mb-6">"I need a company number NOW"</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                We understand. Verification, banking, and contracts can't wait. Our shelf companies are clean, compliant, and ready to transfer.
                            </p>
                            <Link href="/services/tax/tax-clearance-certificates">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need Tax Clearance specifically? <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-7">
                            <IconList
                                items={valueSummary}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                itemClassName="p-4 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-all flex items-center gap-3"
                                iconClassName="h-5 w-5 text-accent shrink-0"
                            />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. PROP BLOCKS */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Buy a Shelf Co?</h2>
                        <p className="text-text-secondary">Speed, credibility, and convenience.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Timer className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Instant Contract Number</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        If a tender closes tomorrow, you can't wait 5 days for a name reservation. A shelf company gives you a CIPC number (K-number) immediately.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <ShieldCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Guaranteed "Clean"</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        We register these companies ourselves and keep them dormant. They have 0% risk of previous debt or bad credit history.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Tax Registered</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        They already have an Income Tax number from SARS. This saves a step and gets you closer to Tax Clearance status.
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
                        <h2 className="text-3xl font-bold mb-4">How the Handover Works</h2>
                        <p className="text-text-secondary">We transfer legal ownership to you in 4 steps.</p>
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

            {/* TRUST */}
            <TrustBlock />

            {/* FAQs */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Shelf Company FAQs</h2>
                    </MotionWrapper>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-background px-4">
                                <AccordionTrigger className="font-semibold py-4 text-left hover:text-accent hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-text-secondary pb-4">{faq.answer}</AccordionContent>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Need to invoice today?</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Secure a pre-registered company now. We handle the paperwork, you start the business.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="shelf_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Buy Shelf Company
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
