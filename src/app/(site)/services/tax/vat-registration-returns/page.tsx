import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Percent, Calculator, FileCheck, AlertTriangle, Building2, Store } from "lucide-react"
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
    title: "VAT Registration & VAT Returns Services",
    description: "Expert VAT services in South Africa. We handle VAT registration, bi-monthly VAT201 returns, and compliance for businesses crossing the R1 million threshold.",
    canonical: "/services/tax/vat-registration-returns"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Seamless VAT Registration (Mandatory or Voluntary)",
    "Accurate bi-monthly VAT201 filing and submission",
    "Expert advice on Input VAT vs Output VAT claims",
    "Handling of SARS VAT Audits and verification requests",
    "Assistance with Import/Export VAT codes"
]

const processSteps = [
    { step: 1, title: "Eligibility Check", description: "We determine if you are required to register (Mandatory > R1m) or if you benefit from registering (Voluntary > R50k)." },
    { step: 2, title: "Registration", description: "We complete the RAV01 form and attend the SARS appointment if needed, submitting strict proof of address documents." },
    { step: 3, title: "Calculation", description: "Every 2 months, we calculate your Output Tax (Sales) minus Input Tax (Purchases) to determine payment or refund." },
    { step: 4, title: "Filing & Payment", description: "We file the VAT201 return and provide you with payment instructions before the deadline (usually the last business day)." }
]

const useCases = [
    {
        title: "The Growing Retailer",
        desc: "Turnover just hit R1 million. Legally must register within 21 days or face massive penalties."
    },
    {
        title: "The B2B Service Provider",
        desc: "Clients want a VAT invoice to claim back input tax. Needs Voluntary Registration to appear professional and competitive."
    },
    {
        title: "The Exporter",
        desc: "Sales are zero-rated, but expenses have VAT. This creates a perpetual refund position—huge cash flow benefit if managed right."
    }
]

const faqs = [
    {
        question: "When must I register for VAT?",
        answer: "Mandatory registration is triggered when your taxable turnover exceeds R1 million in any consecutive 12-month period. You must apply within 21 days of exceeding this threshold."
    },
    {
        question: "Can I register voluntarily?",
        answer: "Yes, if your turnover exceeds R50,000 in a 12-month period. This is beneficial if most of your clients are VAT vendors (so they can claim back your VAT) or if you have high startup costs with claimable Input VAT."
    },
    {
        question: "How long does registration take?",
        answer: "It can be instant via eFiling, but if SARS calls for a verification (which is common for new registrations), it can take 21 working days. We manage this delay for you."
    },
    {
        question: "What can I claim as Input VAT?",
        answer: "You can claim VAT on most business expenses (rent, goods for resale, equipment). You generally CANNOT claim VAT on entertainment, fuel (petrol/diesel), or passenger vehicle purchases."
    },
    {
        question: "What is the VAT rate?",
        answer: "The standard rate is 15%. Some goods are Zero-Rated (0%) like basic foodstuffs and exports. Some are Exempt (no VAT) like residential rental and financial services."
    },
    {
        question: "What happens if I pay late?",
        answer: "SARS charges a 10% penalty immediately, plus interest for every month the payment is late. VAT deadlines are strictly enforced."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function VATPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "VAT Services South Africa",
        description: "VAT Registration and VAT201 Return Filing for SA businesses.",
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
            name: "VAT Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "VAT Registration" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "VAT201 Filing" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "VAT Audit Support" } }
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
            { "@type": "ListItem", position: 4, name: "VAT Services", item: "https://creations.africa/services/tax/vat-registration-returns" }
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
                                    <Percent className="h-3.5 w-3.5 mr-2" /> VAT Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    VAT Registration & VAT Returns Services
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Navigate the maze of Value Added Tax. From mandatory registration to audit-proof returns, we handle the 15% so you can handle the 100%.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="vat_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Get VAT Help <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Mastering the Output & Input</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                VAT is a transaction tax, not an income tax. It flows through your business. The secret is ensuring your paperwork is perfect so you never miss a valid Input Claim and never underpay Output Tax.
                            </p>
                            <Link href="/services/bookkeeping/cloud-bookkeeping">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need better records? See Cloud Bookkeeping <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">VAT Compliance Explained</h2>
                        <p className="text-text-secondary">We maximize your compliance score while minimizing administrative drag.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Registration</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        SARS is strict on new registrations to prevent fraud. We prepare the "RP14" packet: bank letters, proof of address, and invoices to ensure your application is approved first time.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Calculator className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">The VAT201 Return</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        We reconcile every transaction. We check that every supplier invoice has a VAT number (if &gt;R5000) and that every sales invoice meets the Tax Invoice requirements. Quality control is key.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <AlertTriangle className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Audit Defense</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        SARS often audits refunds. If you claim a refund, be ready to prove it. We organize your supporting documents into the exact format SARS requires to release your money.
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
                        <h2 className="text-3xl font-bold mb-4">The Bi-Monthly Cycle</h2>
                        <p className="text-text-secondary">Most vendors file every two months ("Category A or B").</p>
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
                        <h2 className="text-3xl font-bold mb-4">Registration Scenarios</h2>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="bg-surface/50 border-border/50 hover:border-accent/30 transition-all h-full">
                                    <CardContent className="p-6">
                                        <Store className="h-8 w-8 text-accent/50 mb-4" />
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your VAT Sorted</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Whether you need to register or just need accurate filing, we are your VAT specialists.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="vat_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Start VAT Registration
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
