import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Building2, FileKey, ShieldCheck, Mail } from "lucide-react"
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
    title: "Company Registration Services | Register a Pty Ltd South Africa",
    description: "Fast CIPC company registration services. We include Name Reservation, Income Tax Registration, Share Certificates, and B-BBEE Affidavit.",
    canonical: "/services/company-services/company-registration"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Name Reservation (COR9.4)",
    "Company Registration Certificate (COR14.3)",
    "Memorandum of Incorporation (Standard MOI)",
    "Income Tax Registration number",
    "Share Certificates for all shareholders",
    "First meeting minutes & Resolutions"
]

const processSteps = [
    { step: 1, title: "Name Search", description: "We check your proposed names against the CIPC database to ensure availability and avoid trademark conflicts." },
    { step: 2, title: "Lodgement", description: "We prepare the COR15.1 forms. All directors sign digitally (or manual power of attorney)." },
    { step: 3, title: "Registration", description: "CIPC processes the application. Usually complete within 24-48 hours if names are approved." },
    { step: 4, title: "Post-Reg Pack", description: "We issue your Share Certificates, register for Income Tax, and provide your B-BBEE Affidavit." }
]

const faqs = [
    {
        question: "Do I need a company to trade?",
        answer: "Not necessarily. You can trade as a Sole Proprietor. However, a Private Company (Pty Ltd) offers limited liability protection (your personal assets are safe if the business fails) and looks more professional to corporate clients."
    },
    {
        question: "How many directors do I need?",
        answer: "A standard Private Company (Pty Ltd) needs at least one director. This director can also be the sole shareholder."
    },
    {
        question: "What documents do you need?",
        answer: "We need certified ID copies of all directors (not older than 3 months) and proof of address for the main applicant."
    },
    {
        question: "Does this include VAT registration?",
        answer: "No. VAT registration is a separate process with SARS and is only mandatory if you turnover more than R1 million. We can assist with that separately."
    },
    {
        question: "Can foreigners register a company?",
        answer: "Yes. Non-South African citizens can be directors and shareholders. We will need certified copies of your valid passport."
    },
    {
        question: "Do I get a BEE certificate?",
        answer: "For new companies with turnover under R10 million, you qualify as an Exempt Micro Enterprise (EME). We provide the official B-BBEE Affidavit which serves as your certificate."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function CompanyRegistrationPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Company Registration Service",
        description: "Standard Pty Ltd Company Registration via CIPC.",
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
            { "@type": "ListItem", position: 4, name: "Company Registration", item: "https://creations.africa/services/company-services/company-registration" }
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
                                    <Building2 className="h-3.5 w-3.5 mr-2" /> New Company Registration
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Start Your Business the Right Way
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Register your Pty Ltd in 24-48 hours. Includes all legal documents, share certificates, and tax registration.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="reg_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Register My Company <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                                <Link href="/services/company-services">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">
                                        View All Services
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
                            <h2 className="text-3xl font-bold mb-6">The "Full House" Pack</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Don't just get a registration number. Get a fully compliant business entity. We provide the governance documents that banks and Tenders ask for.
                            </p>
                            <Link href="/services/tax/tax-clearance-certificates">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need immediate tax clearance too? <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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

            {/* 3. DEEP EXPLANATION */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Professional Registration?</h2>
                        <p className="text-text-secondary">Avoid basic errors that block bank accounts later.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileKey className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Correct naming</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        We ensure your company name doesn't infringe on existing trademarks, preventing costly rebranding forced by CIPC later.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <ShieldCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Shareholder Confidence</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Banks require Share Certificates to open accounts. CIPC does not issue these; you have to create them. We generate legal certificates for you.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Mail className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Tax Handover</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        We ensure the new company profile is correctly linked to your SARS eFiling profile so you control your tax affairs from day one.
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
                        <h2 className="text-3xl font-bold mb-4">4 Steps to Incorporated</h2>
                        <p className="text-text-secondary">Fast, digital, and efficient.</p>
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
                        <h2 className="text-3xl font-bold mb-4">Questions about Registration</h2>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make it official?</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Turn your idea into a legal entity today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="reg_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Start Registration
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/company-services">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Back to Services
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
