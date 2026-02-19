import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, PieChart, Shield, Clock, TrendingUp, Receipt, Calendar, Building2 } from "lucide-react"
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
    title: "Monthly Accounting Services for South African Businesses",
    description: "Reliable monthly accounting services in South Africa. We handle everything from bank reconciliations to management reports, ensuring you stay compliant and informed.",
    canonical: "/services/accounting/monthly-accounting-services"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Consistent, accurate financial records every single month",
    "SARS compliance (VAT/PAYE) becomes automatic, not a panic",
    "Clear management reports to track profit, loss, and cash flow",
    "A dedicated accountant who understands your South African business context",
    "No more shoeboxes—fully digital, cloud-based workflow (Xero/Sage)"
]

const processSteps = [
    { step: 1, title: "Data Collection", description: "You send invoices and receipts via email or app (Dext). We pull bank statements automatically via read-only feeds." },
    { step: 2, title: "Processing & Allocation", description: "Our team allocates every transaction to the correct ledger account, ensuring VAT is claimed correctly." },
    { step: 3, title: "Reconciliation & Review", description: "We reconcile bank balances to the cent and review the General Ledger for any anomalies or missing items." },
    { step: 4, title: "Reporting & Advisory", description: "We send you a set of Management Accounts (Income Statement & Balance Sheet) with a brief commentary on performance." }
]

const useCases = [
    {
        title: "The Growing Agency",
        desc: "Needs to track project profitability and ensure cash flow covers the payroll of a simplified, expanding team."
    },
    {
        title: "The Retailer / E-commerce",
        desc: "High volume of transactions. Needs precise daily reconciliation to match payment gateway settlements with bank deposits."
    },
    {
        title: "The Professional Consultant",
        desc: "Needs minimal admin. Wants to invoice clients, get paid, and ensure provisional tax is put aside correctly."
    }
]

const faqs = [
    {
        question: "Do I really need monthly accounting, or can I just do it once a year?",
        answer: "While sole proprietors might survive with annual work, any registered company (Pty Ltd) needs monthly discipline. Waiting until year-end often leads to missed VAT claims, massive tax surprises, and penalties for non-compliance. Monthly accounting is cheaper than fixing a year's worth of mess."
    },
    {
        question: "Does this service include my tax returns?",
        answer: "Our monthly packages typically include the preparation of VAT and PAYE returns because they are based on the monthly data. Annual Corporate Income Tax (CIT) is usually a separate engagement, but the monthly work makes the annual filing fast and affordable."
    },
    {
        question: "What software do you use?",
        answer: "We are a cloud-first firm. We primarily use Xero and Sage Business Cloud Accounting. These tools allow us—and you—to see your financial position in real-time from anywhere in South Africa."
    },
    {
        question: "How do I get my documents to you?",
        answer: "We make it frictionless. We set up a dedicated email address for bills, or use tools like Dext where you simply snap a photo of a slip. No physical delivery of paper files is required."
    },
    {
        question: "What if my accounting is currently behind?",
        answer: "We can help. We will perform a 'Catch-Up' service to bring your books up to date before starting the monthly cycle. We assess the backlog and give you a fixed quote to fix it."
    },
    {
        question: "Is there a long-term contract?",
        answer: "No. We believe in earning your business every month. Our services are month-to-month with a standard 30-day notice period, giving you flexibility."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function MonthlyAccountingPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Monthly Accounting Services South Africa",
        description: "Comprehensive monthly accounting for SA businesses. Bank reconciliations, management reporting, and VAT compliance.",
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
            name: "Monthly Accounting",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bank Reconciliation" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Management Reporting" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "VAT Processing" } }
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
            { "@type": "ListItem", position: 4, name: "Monthly Accounting", item: "https://creations.africa/services/accounting/monthly-accounting-services" }
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
                                    <Clock className="h-3.5 w-3.5 mr-2" /> Monthly Accounting Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Monthly Accounting Services for South African Businesses
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Stop flying blind. Get accurate financial records, timely management reports, and seamless compliance every single month.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="monthly_accounting_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Get a Monthly Quote <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                                <Link href="/services/accounting">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">
                                        Back to Overview
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
                            <h2 className="text-3xl font-bold mb-6">Financial Clarity, Delivered Monthly</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Running a business is hard enough without worrying if your books are accurate or if you've missed a SARS deadline. Our monthly service is the heartbeat of your financial health.
                            </p>
                            <Link href="/locations/pretoria/accounting">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Based in Pretoria? See local services <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">More Than Just Data Entry</h2>
                        <p className="text-text-secondary">We turn your bank statements and invoices into specific, decision-ready insights.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Shield className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Compliance & Protection</h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        The South African Companies Act requires you to keep accurate financial records. We ensure you meet this legal obligation. By maintaining clean records monthly, we protect you from SARS audits, verify that every VAT claim is valid, and ensure your annual financial statements are a breeze to compile.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <TrendingUp className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Growth & Strategy</h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        You can't grow what you can't measure. Is your gross margin slipping? are your overheads creeping up? Our monthly management accounts give you the visibility to answer these questions. We provide the financial mirror that shows you the true health of your business.
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
                        <h2 className="text-3xl font-bold mb-4">Our Monthly Rhythm</h2>
                        <p className="text-text-secondary">A predictable, stress-free process designed for efficiency.</p>
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
                        <h2 className="text-3xl font-bold mb-4">Built for Your Business Type</h2>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Switch to Seamless Monthly Accounting</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Join hundreds of South African business owners who sleep better knowing their books are perfect.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="monthly_accounting_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Get a Quote
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/accounting">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Return to Logic
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
