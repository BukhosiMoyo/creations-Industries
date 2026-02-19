
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Shield, Clock, Users, BadgeCheck, Building2 } from "lucide-react"
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
    title: "Payroll Services & Payslips for South African Companies",
    description: "Accurate monthly payroll, PAYE submissions, and IRP5 certificates. We handle UIF/SDL/EMP201s so you can pay your team on time, every time.",
    canonical: "/services/accounting/payroll-services"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Error-free payslips delivered digitally to your staff",
    "EMP201 returns calculated and submitted to SARS monthly",
    "UIF declarations (uFiling) automated",
    "Bi-annual EMP501 reconciliation on EasyFile",
    "Leave management and tracking"
]

const processSteps = [
    { step: 1, title: "Data Collection", description: "You send us inputs: new hires, terminations, overtime hours, commissions, and leave taken." },
    { step: 2, title: "Processing & Review", description: "We run the payroll, calculating PAYE, UIF, SDL, and net pay. We check for variations." },
    { step: 3, title: "Approval & Distribution", description: "You approve the 'Net Pay' list. We email encrypted PDF payslips directly to employees." },
    { step: 4, title: "Compliance Filing", description: "We submit the EMP201 to SARS and the UI-19 to the Department of Labour." }
]

const useCases = [
    {
        title: "The Growing Team",
        desc: "Managing 5-50 staff members. Needs professional payslips for bank loans and strict SARS compliance."
    },
    {
        title: "The Executive",
        desc: "Directors with complex salary structures (travel allowance, medical aid, retirement annuity) needing tax efficiency."
    },
    {
        title: "The Hourly Workforce",
        desc: "Retail or construction teams with fluctuating hours, overtime rates, and weekly or fortnightly pay cycles."
    }
]

const faqs = [
    {
        question: "Do I need to register for PAYE?",
        answer: "If you have employees earning above the tax threshold, you must register for PAYE. Even below the threshold, you must register for UIF and SDL in most cases. We handle these registrations."
    },
    {
        question: "Does your service include IRP5s?",
        answer: "Yes. At the end of the tax year (and interim period), we generate IRP5 tax certificates for all your employees using SARS EasyFile."
    },
    {
        question: "How do you handle leave?",
        answer: "Our payroll software tracks annual, sick, and family responsibility leave balances. These balances are shown on the payslip so staff always know where they stand."
    },
    {
        question: "What about UIF declarations?",
        answer: "Paying UIF to SARS is only half the job. You must also declare employee details to the Department of Labour (uFiling) for claims to be valid. We do both."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function PayrollServicesPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Payroll Services South Africa",
        description: "Comprehensive outsourced payroll. Payslips, EMP201, UIF, and Tax Certificates.",
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
            name: "Payroll Solutions",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monthly Payslips" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "EMP201 Submissions" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "EMP501 Reconciliations" } }
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
            { "@type": "ListItem", position: 4, name: "Payroll Services", item: "https://creations.africa/services/accounting/payroll-services" }
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
                                    <Users className="h-3.5 w-3.5 mr-2" /> Payroll & HR Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Payroll Services for South African Companies
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Your team expects to be paid accurately and on time. We ensure your payroll is flawless, compliant, and stress-free.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="payroll_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Get a Payroll Quote <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Payroll Without the Pain</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Payroll in South Africa is complicated. PAYE tables change, ETI rules allow for claims, and UIF declarations are mandatory. One mistake can lead to labour disputes or SARS penalties.
                            </p>
                            <Link href="/services/tax/emp201-emp501-submissions">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need help with EMP201s? See Compilance <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">Complete Compliance</h2>
                        <p className="text-text-secondary">We handle the full lifecycle of employer tax obligations.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <BadgeCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">SARS Compliant</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        We apply the latest tax tables and legislation to ensure PAYE, SDL, and UIF are calculated correctly to the cent.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Shield className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Confidential</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Salary data is sensitive. We provide secure, direct-to-employee distribution, keeping private data out of general office emails.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Clock className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">On Time</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        The 7th of the month (SARS deadline) isn't flexible. We manage the timeline so you never pay late filing penalties.
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
                        <h2 className="text-3xl font-bold mb-4">Monthly Workflow</h2>
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
                                        <Users className="h-8 w-8 text-accent/50 mb-4" />
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Make Payday Easy</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Outsource your payroll and ensure your team is paid correctly and your taxes are filed on time.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="payroll_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Outsource My Payroll
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
