import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, AlertCircle, FileCheck, Scale, Calendar, Building2, Landmark, ShieldCheck } from "lucide-react"
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
    title: "Annual Financial Statements Preparation",
    description: "Expert preparation of Annual Financial Statements (AFS) for South African companies. Fully compliant with IFRS for SMEs, CIPC, and SARS requirements.",
    canonical: "/services/accounting/financial-statements-preparation"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Mandatory for all active Companies (Pty Ltd) in South Africa",
    "Prepared by qualified accountants according to IFRS for SMEs",
    "Essential for SARS (ITR14) and CIPC (Annual Returns) submissions",
    "Required by banks for overdrafts, bonds, and asset finance",
    "Includes Independent Review or Accounting Officer Report where required"
]

const processSteps = [
    { step: 1, title: "Trial Balance Review", description: "We review your year-to-date bookkeeping to ensure the 'Trial Balance' is accurate and balanced before drafting statements." },
    { step: 2, title: "Drafting & Adjustments", description: "We process year-end journals (depreciation, provisions, tax adjustments) and draft the full set of statements." },
    { step: 3, title: "Review & Sign-Off", description: "You (the Directors) review the draft with our team. Once approved, you sign the Directors' Report and Balance Sheet." },
    { step: 4, title: "Submission", description: "We use the signed AFS to populate your ITR14 tax return and submit the Financial Accountability Supplement to CIPC." }
]

const useCases = [
    {
        title: "The Established Business",
        desc: "Needs a clean set of AFS for their annual banking review to keep credit lines open."
    },
    {
        title: "The Tender Applicant",
        desc: "Needs signed, audited (or independently reviewed) statements to submit with a government tender bid."
    },
    {
        title: "The Compliant Startup",
        desc: "Even with low turnover, needs a 'compilation' engagement to satisfy SARS and shareholders."
    }
]

const faqs = [
    {
        question: "Do I need an audit?",
        answer: "Not always. Most SMEs in South Africa only require an 'Accounting Officer Report' or an 'Independent Review,' depending on their Public Interest Score (PI Score). We calculate your PI Score to determine exactly what level of assurance you legally require."
    },
    {
        question: "What is IFRS for SMEs?",
        answer: "It stands for International Financial Reporting Standards for Small and Medium-sized Entities. It is the global standard adopted by South Africa to ensure financial statements are consistent and comparable. We ensure your AFS comply with this standard."
    },
    {
        question: "What is a Public Interest (PI) Score?",
        answer: "A score calculated based on your turnover, debt, number of employees, and shareholders. A score below 100 usually requires just a compilation. 100-350 usually requires an Independent Review. Above 350 requires an Audit."
    },
    {
        question: "Can you prepare AFS if you didn't do my monthly bookkeeping?",
        answer: "Yes. We will take your Trial Balance from your current system or bookkeeper, perform a high-level review to check for errors, and then draft the statements. Note that if the underlying data is messy, we may need to quote for cleanup first."
    },
    {
        question: "How long does it take?",
        answer: "Once we have a final, clean Trial Balance, drafting usually takes 5-10 working days. If an Independent Review is required, allow an additional 2-3 weeks for the reviewer's process."
    },
    {
        question: "Why does the bank keep asking for this?",
        answer: "The bank needs to prove you can repay your loans. They look at your solvency (Assets > Liabilities) and liquidity (Cash availability) as proven in your signed AFS."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function FinancialStatementsPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Annual Financial Statements South Africa",
        description: "Drafting and preparation of Annual Financial Statements (AFS) for CIPC and SARS compliance.",
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
            name: "Financial Statements",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "AFS Compilation" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Independent Review" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "iXBRL Conversion" } }
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
            { "@type": "ListItem", position: 4, name: "Financial Statements", item: "https://creations.co.za/services/accounting/financial-statements-preparation" }
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
                                    <BookOpen className="h-3.5 w-3.5 mr-2" /> Annual Financial Statements
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Annual Financial Statements Preparation
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Compliant, accurate, and professionally prepared AFS for SARS, CIPC, and banking requirements.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="afs_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Get Your AFS Quote <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Your Financial Yearbook</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Annual Financial Statements (AFS) are the official record of your company's financial performance. Under the Companies Act of 2008, every company must prepare them within 6 months of year-end. We ensure yours are done right.
                            </p>
                            <Link href="/services/tax/business-income-tax-returns">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need to file tax? See Business Tax Returns <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">Understanding AFS Requirements</h2>
                        <p className="text-text-secondary">One size does not fit all. Your requirements depend on your size and public interest.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Compilation</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        <strong>For most SMEs.</strong><br />
                                        If your PI Score is below 100, we simply "compile" your statements based on your records. No audit or independent review is required, making it faster and more affordable.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Scale className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Independent Review</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        <strong>For larger businesses.</strong><br />
                                        If your PI Score is between 100-350, or if your MOI requires it, a qualified independent reviewer must perform "limited assurance" procedures to verify the statements.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Landmark className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Audit</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        <strong>For complex entities.</strong><br />
                                        If your PI Score is >350, or you hold assets for the public, a full statutory audit is mandatory. We provide audit-readiness support to help you survive this process.
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
                        <h2 className="text-3xl font-bold mb-4">The Year-End Process</h2>
                        <p className="text-text-secondary">From Trial Balance to Signed Report.</p>
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
                        <h2 className="text-3xl font-bold mb-4">Why You Need This</h2>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your Financial Statements Done Right</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Don't let year-end be a headache. Get compliant AFS that safeguard your director status and satisfy your bank.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="afs_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Request AFS Quote
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
