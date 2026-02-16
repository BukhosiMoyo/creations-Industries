import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, PieChart, Shield, Clock, TrendingUp, BarChart3, LineChart, Building2 } from "lucide-react"
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
    title: "Management Accounts Preparation & Reporting",
    description: "Professional management accounts for South African SMEs. Understand your Profit & Loss, Balance Sheet, and key ratios to make better business decisions.",
    canonical: "/services/accounting/management-accounts"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Move beyond 'checking the bank balance' to true financial insight",
    "Identify profitable vs unprofitable product lines or services",
    "Spot expense creep before it destroys your annual profit",
    "Essential for bank loans, investors, and board meetings",
    "Includes Profit & Loss, Balance Sheet, and Cash Flow commentary"
]

const processSteps = [
    { step: 1, title: "Bookkeeping Close", description: "We ensure all transactions for the month are captured and reconciled. Accuracy is the prerequisite for insight." },
    { step: 2, title: "Accruals & Adjustments", description: "We process non-cash items like depreciation, prepaid expenses, and income received in advance to show true performance." },
    { step: 3, title: "Variance Analysis", description: "We compare this month's results against your budget or the previous year to highlight what changed and why." },
    { step: 4, title: "Pack Preparation", description: "You receive a clean, easy-to-read PDF pack with visual graphs and executive commentary, not just raw numbers." }
]

const useCases = [
    {
        title: "The Scaling Startup",
        desc: "Burn rate is critical. Needs to know exactly how many months of runway are left and where cash is going."
    },
    {
        title: "The Manufacturing / Construction Firm",
        desc: "Gross Margin is everything. Needs to track material costs vs revenue per project to ensure profitability."
    },
    {
        title: "The Franchisee",
        desc: "Strict reporting deadlines. Needs a standardized pack submitted to head office by the 10th of every month."
    }
]

const faqs = [
    {
        question: "What is the difference between Management Accounts and Annual Financial Statements?",
        answer: "Annual Financial Statements (AFS) are statutory, historical documents prepared once a year for compliance (SARS/CIPC). Management Accounts are operational documents prepared monthly or quarterly to help you run the business right now."
    },
    {
        question: "Do banks require Management Accounts?",
        answer: "Yes. If you apply for an overdraft, vehicle finance, or a business loan, the bank will almost always ask for your latest Management Accounts to assess your current affordability."
    },
    {
        question: "How long after month-end will I get my reports?",
        answer: "It depends on how quickly we receive your data. Typically, if we have all info by the 5th, we aim to deliver the management pack by the 15th-20th of the month."
    },
    {
        question: "Can you help me track specific KPIs?",
        answer: "Absolutely. We work with you to identify the Key Performance Indicators that matter (e.g., Gross Profit %, Labour Cost Ratio) and highlight them in your monthly report."
    },
    {
        question: "Do I need a budget for this to work?",
        answer: "It helps immensely. Comparing 'Actual vs Budget' is the most powerful way to use management accounts. If you don't have a budget, we can help you build one."
    },
    {
        question: "Is this included in your monthly accounting fee?",
        answer: "Basic reporting (P&L/Balance Sheet) is often included. Comprehensive management packs with commentary, variance analysis, and KPI tracking are usually a specific tier of service."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function ManagementAccountsPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Management Accounts Preparation South Africa",
        description: "Monthly management reporting for SMEs. Profit & Loss, Balance Sheet analysis, and financial commentary.",
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
            name: "Management Reporting",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monthly Management Packs" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "KPI Dashboarding" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Budget vs Actual Analysis" } }
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
            { "@type": "ListItem", position: 4, name: "Management Accounts", item: "https://creations.co.za/services/accounting/management-accounts" }
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
                                    <BarChart3 className="h-3.5 w-3.5 mr-2" /> Financial Reporting Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Management Accounts Preparation & Reporting
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Move from hindsight to insight. We provide the monthly financial intelligence you need to make confident business decisions.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="management_accounts_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Get Better Reports <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Drive Your Business with Data</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Many business owners run their companies by checking their bank balance. This is dangerous. Profit is not cash. Management accounts show you the full picture: what you earned, what you owe, and where you are heading.
                            </p>
                            <Link href="/services/accounting/business-budgeting-forecasting">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need future planning? See Budgeting & Forecasting <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">The Three Pillars of Insight</h2>
                        <p className="text-text-secondary">A typical management pack covers the three critical views of your financial health.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <LineChart className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Profit & Loss</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Did you make money? We analyse revenue trends, cost of sales, and operating expenses to calculate your true Net Profit for the period.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Building2 className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Balance Sheet</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Are you solvent? We track your assets (what you own), liabilities (what you owe), and equity to ensure your financial foundation is strong.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <TrendingUp className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Key Ratios</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Are you efficient? We calculate Gross Margin %, Current Ratio (liquidity), and Debtor Days to benchmark your efficiency against industry standards.
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
                        <h2 className="text-3xl font-bold mb-4">Reporting Cycle</h2>
                        <p className="text-text-secondary">How we turn data into documents.</p>
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
                                        <PieChart className="h-8 w-8 text-accent/50 mb-4" />
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">See Your Business Clearly</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Stop guessing. Start knowing. Get professional management accounts that help you grow.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="management_accounts_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Request a Sample Pack
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/accounting">
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
