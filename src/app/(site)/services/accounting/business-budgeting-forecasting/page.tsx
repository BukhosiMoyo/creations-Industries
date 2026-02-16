import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Target, BarChart, Compass, Flag, Lightbulb, TrendingUp, Building2 } from "lucide-react"
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
    title: "Business Budgeting & Financial Forecasting Services",
    description: "Strategic business budgeting for South African companies. Set targets, control costs, and map your financial future with professional forecasting.",
    canonical: "/services/accounting/business-budgeting-forecasting"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Turn high-level business goals into concrete financial targets",
    "Identify 'Variance' early—know exactly where you are overspending",
    "Essential for setting sales targets for your team",
    "Align your spending with your strategic priorities",
    "Create a roadmap for 12-24 months of growth"
]

const processSteps = [
    { step: 1, title: "Historical Analysis", description: "We look at your last 12-24 months of performance to establish a realistic baseline." },
    { step: 2, title: "Goal Setting", description: "You tell us your targets (e.g., 'Grow revenue by 20%'). We calculate what that requires in sales and expense." },
    { step: 3, title: "Budget Construction", description: "We build a detailed line-by-line budget for Income, Cost of Sales, and OpEx." },
    { step: 4, title: "Monthly Tracking", description: "Every month, we report 'Actual vs Budget'. The variance is where the management insight lives." }
]

const useCases = [
    {
        title: "The Startup Seeking Investment",
        desc: "Investors don't fund ideas; they fund plans. A detailed 3-year forecast proves you have thought through the unit economics."
    },
    {
        title: "The Cost-Conscious SME",
        desc: "Margins are squeezing. Needs a strict budget to control overheads and prevent 'expense creep'."
    },
    {
        title: "The Sales Team",
        desc: "Needs clear revenue targets. The budget translates the company goal into a monthly sales quota."
    }
]

const faqs = [
    {
        question: "What is the difference between a Budget and a Forecast?",
        answer: "A Budget is your 'Target'—where you WANT to go (set once a year). A Forecast is your 'Prediction' of where you are ACTUALLY going (updated monthly/quarterly based on reality)."
    },
    {
        question: "Is budgeting only for big companies?",
        answer: "No. In fact, small businesses need it more because they have less room for error. A budget is simply a plan for your money. If you don't plan, you drift."
    },
    {
        question: "What is Zero-Based Budgeting?",
        answer: "It's a method where we don't just add 10% to last year's costs. We start at zero and justify every single expense item. It is excellent for cutting dead weight from a business."
    },
    {
        question: "Can you help me present this to my board/partners?",
        answer: "Yes. We create professional presentations that visualize the budget, showing the logic behind the numbers and the expected ROI."
    },
    {
        question: "How accurate will the forecast be?",
        answer: "A forecast is not a crystal ball, but it is a calculated trajectory. The value lies in the deviation: seeing 'we are 10% behind plan' allows you to correct course immediately rather than waiting for year-end."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function BudgetingPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Business Budgeting Services South Africa",
        description: "Professional financial budgeting and forecasting for SMEs.",
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
            name: "Budgeting Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Annual Budgeting" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Financial Forecasting" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Variance Analysis" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.co.za/services" },
            { "@type": "ListItem", position: 3, name: "Accounting", item: "https://creations.co.za/services/accounting" },
            { "@type": "ListItem", position: 4, name: "Budgeting & Forecasting", item: "https://creations.co.za/services/accounting/business-budgeting-forecasting" }
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
                                    <Target className="h-3.5 w-3.5 mr-2" /> Budgeting & Forecasting
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Business Budgeting & Financial Forecasting Services
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    A goal without a plan is just a wish. We help you build a financial roadmap that translates your strategy into numbers.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="budgeting_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Build My Budget <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Your Financial GPS</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Operating without a budget is like driving without a map. You might be moving, but are you getting closer to your destination? We build budgets that serve as a navigational tool for your management team.
                            </p>
                            <Link href="/services/accounting/cash-flow-management">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Worried about liquidity? See Cash Flow Management <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">Strategic Financial Planning</h2>
                        <p className="text-text-secondary">We look at finance through three distinct lenses.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Target className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">The Baseline Budget</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        The fundamental plan. We calculate your break-even point and set the minimum sales required to cover fixed costs. This is your "safety zone."
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <TrendingUp className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Growth Forecast</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        The ambition. We model the financial impact of hiring new staff, opening a new branch, or launching a product. We quantify the risk and reward.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Compass className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Variance Analysis</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        The navigator. Each month, we compare where you are vs where you said you would be. We hold the business accountable to its own plan.
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
                        <h2 className="text-3xl font-bold mb-4">From Chaos to Clarity</h2>
                        <p className="text-text-secondary">Our proven framework for financial planning.</p>
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
                        <h2 className="text-3xl font-bold mb-4">Why Plan?</h2>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="bg-surface/50 border-border/50 hover:border-accent/30 transition-all h-full">
                                    <CardContent className="p-6">
                                        <Lightbulb className="h-8 w-8 text-accent/50 mb-4" />
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Map Your Path to Profit</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Don't leave your financial future to chance. Build a plan, track your progress, and hit your targets.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="budgeting_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Start Budgeting
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
