import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calculator, FileText, CheckCircle2, TrendingUp, Globe, AlertTriangle, Shield, Clock, Users, Stethoscope, HardHat, Gavel, Building2 } from "lucide-react"
import { trackEvent, ConversionEvents } from "@/lib/analytics"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Accounting Services in Pretoria",
    description: "Professional accounting support for Pretoria-based businesses. Compliance, reporting, and financial control.",
    canonical: "/locations/pretoria/accounting"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "Small and medium-sized enterprises (SMEs)",
    "Professional service providers (consultants, agencies, practices)",
    "Contractors and service-based businesses",
    "Companies registered in Gauteng but operating nationally",
    "Business owners who want clarity beyond basic bookkeeping"
]

const problemsSolved = [
    {
        title: "Inconsistent Record-Keeping",
        desc: "Complicates VAT submissions and leaves you guessing about profit."
    },
    {
        title: "Poor Expense Separation",
        desc: "Mixing business and personal expenses creates tax risks and messy audits."
    },
    {
        title: "Cash Flow Strain",
        desc: "Delayed invoicing or uncontrolled costs can cripple operations even if sales look good."
    },
    {
        title: "SARS Queries",
        desc: "Difficulty responding confidently to SARS when they ask for proof."
    },
    {
        title: "Unclear Profitability",
        desc: "Not knowing which projects or services are actually making money."
    }
]

const whatIncluded = [
    {
        title: "Monthly Accounting & Reconciliations",
        icon: Calculator,
        desc: "Bank reconciliation, categorization of income/expenses, anomaly detection, and accuracy improvements."
    },
    {
        title: "Monthly Management Reporting",
        icon: FileText,
        desc: <><Link href="/services/accounting/management-accounts" className="text-accent hover:underline">Profit & Loss, Balance Sheet</Link>, Cash Flow visibility, and clear explanations of trends.</>
    },
    {
        title: "Compliance-Ready Records",
        icon: Shield,
        desc: "Supporting docs aligned, correct expense categories, and data ready for VAT/Tax."
    },
    {
        title: "Year-End Support",
        icon: CheckCircle2,
        desc: <>Preparation of accounting packs, consistency checks, and coordination for <Link href="/services/accounting/financial-statements-preparation" className="text-accent hover:underline">financial statements</Link>.</>
    },
    {
        title: "Advisory & Insight (Optional)",
        icon: TrendingUp,
        desc: "Budgeting, forecasting, cost control analysis, and profitability reviews."
    }
]

const processSteps = [
    { step: 1, title: "Initial Consultation", description: "We assess your structure, current accounting condition, and compliance needs." },
    { step: 2, title: "Setup or Cleanup", description: "If records are behind, we scope the catch-up work and confirm clear timelines." },
    { step: 3, title: "Monthly Cycle", description: "Submit docs -> We reconcile & review -> We prepare reports -> Feedback provided." },
    { step: 4, title: "Ongoing Improvement", description: "We reduce errors, improve categorization, and strengthen reporting clarity over time." }
]

const timelines = [
    "Initial onboarding: 3–10 business days",
    "Monthly close: 3–7 business days after docs received",
    "Catch-up accounting: Depends on backlog volume"
]

const faqs = [
    {
        question: "Do you work specifically with Pretoria-based businesses?",
        answer: "Yes. We support businesses operating in Pretoria and the broader Gauteng region. While many processes can be handled remotely, our services are structured to reflect local business realities and South African compliance requirements."
    },
    {
        question: "What’s the difference between accounting and bookkeeping?",
        answer: "Bookkeeping focuses on capturing transactions. Accounting builds on that by interpreting the data, producing meaningful reports, and aligning records with compliance and decision-making needs. Most growing Pretoria businesses need both working together."
    },
    {
        question: "Can you help if my accounting is behind?",
        answer: "Yes. We handle catch-up accounting, but first assess how far behind you are and the quality of your records. Once catch-up is completed, we recommend moving to a structured monthly process to prevent future issues."
    },
    {
        question: "Do you work with Xero or other accounting systems?",
        answer: "Yes. Many Pretoria businesses use cloud accounting platforms such as Xero. We can work within existing systems or help improve structure where reports are unreliable."
    },
    {
        question: "What documents do I need to provide each month?",
        answer: "Typically: Bank statements (or feed access), invoices issued, supplier invoices/receipts, proof of payments, and payroll information. Consistency is more important than volume."
    },
    {
        question: "How do accounting services help with VAT and tax?",
        answer: "Accurate accounting ensures VAT submissions and tax calculations are based on correct data. Poor accounting often leads to VAT errors, missed deductions, or unnecessary tax exposure. Clean records make tax compliance smoother."
    },
    {
        question: "Can accounting help my business grow?",
        answer: "Yes. Reliable reports allow you to track profitability accurately, control costs, plan cash flow, and prepare for funding or expansion. Growth without financial clarity increases risk."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function PretoriaAccountingPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Accounting Services in Pretoria",
        description: "Professional accounting support for Pretoria-based businesses. Compliance, reporting, and financial control.",
        provider: {
            "@type": "AccountingService",
            name: "Creations Accounting Pretoria",
            url: "https://creations.co.za/locations/pretoria/accounting"
        },
        areaServed: {
            "@type": "City",
            name: "Pretoria"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Accounting Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monthly Management Accounts" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Financial Reporting" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Compliance Management" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Locations", item: "https://creations.co.za/locations" },
            { "@type": "ListItem", position: 3, name: "Pretoria", item: "https://creations.co.za/locations/pretoria" },
            { "@type": "ListItem", position: 4, name: "Accounting Services", item: "https://creations.co.za/locations/pretoria/accounting" }
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
                                    <Globe className="h-3.5 w-3.5 mr-2" /> Pretoria Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Accounting Services in Pretoria
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Professional accounting support for Pretoria-based businesses that need clarity, compliance, and control.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="service_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">Request Consultation <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </QuoteLink>
                                <Link href="#process">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">How It Works</Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. INTRO & WHO THIS IS FOR */}
            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <MotionWrapper className="lg:col-span-4">
                            <h2 className="text-3xl font-bold mb-6">Local Financial Clarity</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Running a business in Pretoria comes with unique realities—compliance-heavy operations, government-adjacent work, and growing SMEs. Whether managing VAT, cash flow, or funding preparation, accurate accounting is the backbone of sustainable decision-making.
                            </p>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-8">
                            <h3 className="text-lg font-bold mb-4">Who Our Pretoria Services Are For</h3>
                            <IconList
                                items={whoIsThisFor}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                itemClassName="p-4 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-all flex items-center gap-3"
                                iconClassName="h-5 w-5 text-accent shrink-0"
                            />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. WHY ACCOUNTING MATTERS (PROBLEMS) */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Accounting Matters for Pretoria Businesses</h2>
                        <p className="text-text-secondary">Poor accounting creates risk. Proper accounting builds confidence.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {problemsSolved.map((prob, i) => (
                            <MotionWrapper key={i} delay={i * 0.1} className="h-full">
                                <Card className="h-full bg-surface border-border/50">
                                    <CardContent className="p-6">
                                        <AlertTriangle className="h-8 w-8 text-orange-400 mb-4" />
                                        <h3 className="font-bold text-lg mb-2">{prob.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{prob.desc}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST SIGNAL 1 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="We needed an accountant in Pretoria who understands government tender compliance. Creations sorted our eclectic tax history."
                        author="Director"
                        role="Civil Engineering Firm"
                        variant="primary"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 4. WHAT'S INCLUDED */}
            <SectionWrapper padding="lg" variant="surface" showLineGrid>
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">What's Included</h2>
                        <p className="text-text-secondary">Our services focus on details, structure, and usability.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whatIncluded.map((item, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="group h-full p-6 rounded-2xl bg-background border border-border hover:border-accent/50 transition-all hover:shadow-lg">
                                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 4B. INDUSTRIES */}
            <SectionWrapper variant="base" padding="lg">
                <Container>
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold mb-4">Specialized Accounting for Pretoria Industries</h2>
                        <p className="text-text-secondary">We understand the specific compliance needs of these sectors.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { name: "Medical Practices", icon: Stethoscope, href: "/industries/medical-professionals" },
                            { name: "Engineering Firms", icon: HardHat, href: "/industries/engineering-consultants" },
                            { name: "Legal Attorneys", icon: Gavel, href: "/industries/legal-attorneys" },
                            { name: "Construction", icon: Building2, href: "/industries/construction-projects" }
                        ].map((item, i) => (
                            <Link key={i} href={item.href}>
                                <div className="group p-6 rounded-xl bg-surface border border-border/50 hover:border-accent/40 hover:shadow-sm transition-all h-full flex flex-col items-center text-center">
                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-3 group-hover:bg-accent group-hover:text-white transition-colors">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-bold text-text-primary group-hover:text-accent transition-colors">{item.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5. PROCESS & TIMELINES */}
            <SectionWrapper id="process" padding="lg" variant="base">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <MotionWrapper>
                            <h2 className="text-3xl font-bold mb-6">How Our Process Works</h2>
                            <div className="space-y-8">
                                {processSteps.map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm mt-1">
                                            {step.step}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                                            <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <div className="bg-surface rounded-2xl border border-border p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-accent" /> Typical Timelines
                                </h3>
                                <div className="space-y-4">
                                    {timelines.map((time, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-text-secondary bg-background p-4 rounded-lg border border-border/50">
                                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                                            {time}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-border/50">
                                    <h4 className="font-bold mb-2">Why Choose Creations?</h4>
                                    <p className="text-sm text-text-secondary mb-4">
                                        Pretoria clients choose us because we prioritize accuracy and explain numbers without jargon. We build long-term systems, not short-term fixes.
                                    </p>
                                    <QuoteLink eventLabel="trust_block_cta">
                                        <Button size="sm" variant="outline">Get Started</Button>
                                    </QuoteLink>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST BLOCK */}
            <TrustBlock />

            {/* 6. FAQ */}
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

            {/* TRUST SIGNAL 2 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="Meeting face-to-face at their Pretoria hub made all the difference. Real people who actually care."
                        author="Dr. Van Der Merwe"
                        role="Medical Practitioner"
                        variant="subtle"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 7. INTERNAL LINKING */}
            <SectionWrapper variant="base" padding="md" className="border-t border-border/40">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
                        <div className="text-text-secondary font-medium">Explore Related Services:</div>
                        <div className="flex flex-wrap gap-4 md:gap-8">
                            <Link href="/locations/pretoria" className="text-text-muted hover:text-accent transition-colors">Pretoria Hub</Link>
                            <Link href="/locations/pretoria/tax" className="text-text-muted hover:text-accent transition-colors">Tax Services</Link>
                            <Link href="/locations/pretoria/bookkeeping" className="text-text-muted hover:text-accent transition-colors">Bookkeeping</Link>
                            <Link href="/services/accounting" className="text-text-muted/60 hover:text-accent transition-colors text-xs border-l border-border pl-4">National Accounting</Link>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 8. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            {/* Decorative background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Accounting Support for Your Pretoria Business</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    If you want accurate records, reliable reporting, and accounting support that fits your business stage, we can help.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="service_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Request Consultation
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/accounting">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            View Full Services
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                </Container>
            </SectionWrapper>
        </div >
    )
}
