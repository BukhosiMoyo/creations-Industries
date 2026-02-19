import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, TrendingDown, TrendingUp, AlertTriangle, Activity, RefreshCw, BarChart4, Wallet, Building2 } from "lucide-react"
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
    title: "Cash Flow Management & Business Cash Planning",
    description: "Expert cash flow management services in South Africa. We help you forecast liquidity, manage working capital, and survive the cash gap.",
    canonical: "/services/accounting/cash-flow-management"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Identify cash crunches weeks or months before they happen",
    "Strategies to shorten your Cash Conversion Cycle (get paid faster)",
    "Planning for large payments (Provisional Tax, VAT, Bonuses)",
    "Essential for seasonal businesses or rapid-growth phases",
    "Detailed 13-week rolling cash flow forecasts"
]

const processSteps = [
    { step: 1, title: "Cash Flow Audit", description: "We analyze your historical inflows and outflows to understand your baseline burn rate and payment cycles." },
    { step: 2, title: "Forecast Build", description: "We build a 13-week (short term) and 12-month (long term) cash model based on real sales pipelines and fixed costs." },
    { step: 3, title: "Scenario Planning", description: "We test 'What If' scenarios. What if a big client pays late? What if sales drop 20%? We plan for resilience." },
    { step: 4, title: "Weekly/Monthly Review", description: "We track Actual vs Forecast. If reality deviates from the plan, we alert you immediately." }
]

const useCases = [
    {
        title: "The Project-Based Business",
        desc: "High revenue on paper, but cash only comes in milestones. Needs to bridge the gap between expenses and invoice payment."
    },
    {
        title: "The Retailer (Stock Heavy)",
        desc: "Cash is tied up in inventory. Needs to balance stock purchases with sales cycles to avoid liquidity traps."
    },
    {
        title: "The Rapid Scaler",
        desc: "Growing too fast can kill you. Hiring staff and buying tools before new revenue lands requires precise cash planning."
    }
]

const faqs = [
    {
        question: "Why do I have profit but no cash?",
        answer: "This is the classic 'Cash Gap'. Profit is recorded when you invoice, but cash is only recorded when you get paid. If you pay suppliers in 30 days but clients pay you in 60 days, you are profitable but cash-poor. We help you fix this."
    },
    {
        question: "What is a 13-Week Cash Flow Forecast?",
        answer: "It is the gold standard for liquidity management. It looks Granularly at the next quarter—week by week—predicting exactly which bills can be paid and when cash will land. It gives you immediate tactical control."
    },
    {
        question: "Can you help me get paid faster?",
        answer: "Yes. We review your Debtor Management process. We can implement automated reminders, stricter credit terms, and deposit requirements to shorten your 'Days Sales Outstanding' (DSO)."
    },
    {
        question: "Do you help with funding applications?",
        answer: "Yes. If our forecast shows a gap, we can use that professional report to apply for an overdraft, trade finance, or a business loan. Lenders trust our data."
    },
    {
        question: "Is this a one-off or monthly service?",
        answer: "It can be both. We can build a model for you as a project, but cash flow management works best as an ongoing advisory service where we update the model monthly."
    },
    {
        question: "How do big tax payments fit in?",
        answer: "We 'provision' for them. Instead of a surprise R100k provisional tax bill in August, our model ensures you have been setting aside cash for it since March."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function CashFlowPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Cash Flow Management South Africa",
        description: "Cash flow forecasting and working capital management for South African SMEs.",
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
            name: "Cash Flow Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "13-Week Cash Forecast" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Liquidity Planning" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Working Capital Optimization" } }
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
            { "@type": "ListItem", position: 4, name: "Cash Flow Management", item: "https://creations.africa/services/accounting/cash-flow-management" }
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
                                    <RefreshCw className="h-3.5 w-3.5 mr-2" /> Cash Flow Management
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Cash Flow Management & Business Cash Planning
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Cash is king. We help you forecast liquidity, avoid crunch points, and ensure your business always has the fuel to run.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="cash_flow_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Build a Forecast <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Profit is Theory. Cash is Reality.</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                You can be profitable on paper and still go bankrupt if you run out of cash. Our cash flow services bridge the gap between "Sales Made" and "Money in the Bank."
                            </p>
                            <Link href="/services/accounting/management-accounts">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Want to track profitability? See Management Accounts <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">Mastering Liquidity</h2>
                        <p className="text-text-secondary">We focus on the three levers that control your bank balance.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <TrendingUp className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Inflows (Receivables)</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        We analyze your average collection period. If you wait 60 days to get paid, your cash is trapped. We implement systems to get that down to 30 or 15 days.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <TrendingDown className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Outflows (Payables)</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        We strategize your payments. Prioritizing critical suppliers while negotiating better terms with others helps keep cash inside the business longer without damaging relationships.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Wallet className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Reserves (Buffer)</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        We help you calculate your safe "Burn Rate" buffer. Knowing you have 3 months of expenses covered gives you the confidence to invest in growth risks.
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
                        <h2 className="text-3xl font-bold mb-4">How We Forecast</h2>
                        <p className="text-text-secondary">A scientific approach to predicting your bank balance.</p>
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
                        <h2 className="text-3xl font-bold mb-4">Vital For...</h2>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="bg-surface/50 border-border/50 hover:border-accent/30 transition-all h-full">
                                    <CardContent className="p-6">
                                        <Activity className="h-8 w-8 text-accent/50 mb-4" />
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Never Run Out of Cash Again</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get the visibility you need to sleep at night. Forecast your cash, plan your payments, and secure your business future.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="cash_flow_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Start Forecasting
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
