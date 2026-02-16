import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Scale, Calculator, CalendarDays, AlertCircle, Coins, Building2 } from "lucide-react"
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
    title: "Business Income Tax Returns (ITR14) Services",
    description: "Professional SARS tax return services (ITR14) for South African companies. We minimize your liability, ensure compliance, and handle Provisional Tax (IRP6).",
    canonical: "/services/tax/business-income-tax-returns"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Expert filing of Corporate Income Tax (ITR14) returns",
    "Optimization of allowable deductions to legally minimize tax",
    "Handling of Provisional Tax (IRP6) to avoid underestimation penalties",
    "Review of past returns to check for missed refunds",
    "Full liaison with SARS on your behalf"
]

const processSteps = [
    { step: 1, title: "Assessment & Planning", description: "We review your financial statements before the tax season starts to estimate your liability." },
    { step: 2, title: "Provisional Filing", description: "In August and February, we file your IRP6 Provisional Tax returns to spread your tax burden." },
    { step: 3, title: "Final Calculation", description: "Once AFS are signed, we perform the final tax computation, adding back non-deductible expenses." },
    { step: 4, title: "Submission & Verification", description: "We submit the ITR14. If SARS triggers a verification, we handle the document upload and queries." }
]

const useCases = [
    {
        title: "The Profitable Company",
        desc: "Making good profit but worried about a massive tax bill. Needs advanced tax planning to utilize allowances."
    },
    {
        title: "The Dormant Entity",
        desc: "Hasn't traded but still needs to file specific 'Nil' returns to keep the CIPC and SARS status active."
    },
    {
        title: "The Non-Compliant Biz",
        desc: "Years behind on returns. Needs a specialist team to negotiate down penalties and get compliant fast."
    }
]

const faqs = [
    {
        question: "When is my business tax return due?",
        answer: "Companies must file their ITR14 annual return within 12 months of their financial year-end. However, Provisional Tax (IRP6) payments are due every 6 months (August and February for standard year-ends)."
    },
    {
        question: "What is Provisional Tax?",
        answer: "It is not a separate tax, but a way of paying your income tax in advance. SARS requires you to estimate your profit twice a year and pay tax on it immediately, rather than waiting for the year-end assessment."
    },
    {
        question: "Can I deduct my home office expenses?",
        answer: "Only under very specific conditions. If you have a dedicated room used exclusively for trade, you may claim a portion of rent/rates. SARS audits this aggressively, so we ensure your claim is bulletproof."
    },
    {
        question: "What happens if I don't file?",
        answer: "SARS now imposes monthly administrative penalties for every month a return is outstanding. This can quickly amount to thousands of Rands, blocking your Tax Clearance availability."
    },
    {
        question: "Do you handle personal tax for directors too?",
        answer: "Yes. Useing the same firm for both company and director tax is smart because salary, dividends, and loan accounts affect both parties."
    },
    {
        question: "How do I pay SARS?",
        answer: "We will generate a Payment Reference Number (PRN) for you. You can then pay via EFT or your banking app's 'SARS eFiling' payment function."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function BusinessTaxPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Business Tax Return Services South Africa",
        description: "Professional Corporate Income Tax filing and advisory.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.co.za"
        },
        areaServed: {
            "@type": "Country",
            name: "South Africa"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Tax Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "ITR14 Filing" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Provisional Tax IRP6" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Dispute Resolution" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.co.za/services" },
            { "@type": "ListItem", position: 3, name: "Tax Support", item: "https://creations.co.za/services/tax" },
            { "@type": "ListItem", position: 4, name: "Business Tax Returns", item: "https://creations.co.za/services/tax/business-income-tax-returns" }
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
                                    <Scale className="h-3.5 w-3.5 mr-2" /> Corporate Income Tax Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Business Income Tax Returns (ITR14) Services
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Don't pay a cent more than you legally owe. Expert tax filing, provisional planning, and SARS management for SA businesses.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="tax_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        File My Returns <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Tax Without the Terror</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                SARS is becoming more digital and more aggressive with penalties. The days of 'flying under the radar' are over. We give you a proactive tax strategy that keeps you compliant and tax-efficient.
                            </p>
                            <Link href="/services/tax/sars-penalties-disputes">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Already in trouble? See Penalties & Disputes <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">Strategic Compliance</h2>
                        <p className="text-text-secondary">We focus on three key areas of corporate tax.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileText className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">The ITR14 Return</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        The annual report card. We ensure your AFS figures match your declaration perfectly. We scrutinize every expense to ensure it meets the "production of income" test for deductibility.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <CalendarDays className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Provisional Tax</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        The cash flow killer. SARS imposes 20% penalties for underestimating your provisional tax. We use accurate YTD figures to ensure your estimate is safe but not excessive.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Coins className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Small Business Tax</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Are you eligible? If you turnover less than R20m, you may qualify for Small Business Corporation (SBC) tax rates, which are significantly lower than the standard 27%. We check your eligibility.
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
                        <h2 className="text-3xl font-bold mb-4">The Filing Lifecycle</h2>
                        <p className="text-text-secondary">A year-round process, not just a once-off event.</p>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Compliant. Save Money.</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get a tax partner who understands business, not just forms. Book a consultation today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="tax_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Book Tax Consult
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
