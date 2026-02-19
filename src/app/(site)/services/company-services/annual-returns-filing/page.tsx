import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, RefreshCw, CalendarClock, AlertTriangle, BadgeAlert, FileCheck } from "lucide-react"
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
    title: "CIPC Annual Returns Filing | Prevent Deregistration",
    description: "Submit your CIPC Annual Returns instantly. We calculate the fee, submit the dashboard declaration, and issue your Certificate of Good Standing.",
    canonical: "/services/company-services/annual-returns-filing"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Annual Duty Calculation (Turnover based)",
    "Filing of Annual Return with CIPC",
    "Financial Accountability Supplement (FAS) submission",
    "Restoration of 'AR Final Deregistration' status",
    "Issuance of Compliance Certificate"
]

const processSteps = [
    { step: 1, title: "Turnover Check", description: "We ask for your latest turnover figure. This determines the fee CIPC charges (from R100 to R3000)." },
    { step: 2, title: "Calculation", description: "We calculate the exact penalties (if late) and the duty payable to CIPC." },
    { step: 3, title: "Submission", description: "We file the return and the CoR 30.1 Financial Supplement or Compliance checklist." },
    { step: 4, title: "Active Status", description: "Your company status updates to 'In Business' and we download your fresh disclosure certificate." }
]

const faqs = [
    {
        question: "Is this the same as a Tax Return?",
        answer: "No. Annual Returns are filed with CIPC to keep the company existent. Tax Returns are filed with SARS to pay tax. You must do BOTH."
    },
    {
        question: "When is it due?",
        answer: "It is due every year on the anniversary of your company's registration month. You have a 30-day window to pay."
    },
    {
        question: "My company is in 'Deregistration Process'. Can you fix it?",
        answer: "Yes, if it is in 'AR Deregistration Process', paying the outstanding returns usually restores it. If it is 'Final Deregistered', it requires a complex restoration process."
    },
    {
        question: "What if I didn't trade?",
        answer: "You strictly still have to file. You file a 'Nil Return' with zero turnover. Failing to file because you didn't trade will still kill the company."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function AnnualReturnsPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Annual Returns Filing Service",
        description: "CIPC Annual Returns Submission.",
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
            { "@type": "ListItem", position: 4, name: "Annual Returns", item: "https://creations.africa/services/company-services/annual-returns-filing" }
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
                                    <RefreshCw className="h-3.5 w-3.5 mr-2" /> Annual CIPC Returns
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Keep Your Company 'Active'
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Don't let CIPC deregister your business. We check your status, calculate duties, and file your Annual Return instantly.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="ar_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Check My Status <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">The "Annual" Renewal</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Just like a car license, your company needs renewed every year. Failing to do this causes CIPC to mark you as "Deregistration Process", which alerts your bank to freeze your accounts.
                            </p>
                            <Link href="/services/company-services/company-registration">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need to register a new company instead? <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">Why is this critical?</h2>
                        <p className="text-text-secondary">It's about legal existence, not just compliance.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <CalendarClock className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Strict Deadlines</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        If you file even one day late, CIPC charges penalties. If you miss 2 years in a row, the deregistration process starts automatically.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <AlertTriangle className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Bank Freezing</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Banks poll the CIPC database weekly. If your status changes from 'In Business', their risk systems often auto-freeze your account.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Compliance Certificate</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        We issue the valid Disclosure Certificate immediately after filing. This proves to your clients and suppliers that you exist legally.
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
                        <h2 className="text-3xl font-bold mb-4">The Renewal Workflow</h2>
                        <p className="text-text-secondary">Fast and error-free.</p>
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
                        <h2 className="text-3xl font-bold mb-4">Questions about Annual Returns</h2>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Is your company compliant?</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Check your status before it's too late.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="ar_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            File Annual Return
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
