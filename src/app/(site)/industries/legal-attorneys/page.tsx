import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Scale, BookOpen, Shield, Calculator, FileCheck, Building } from "lucide-react"
import { QuoteLink } from "@/components/common/quote-link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { IconList } from "@/components/ui/icon-list"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Product, WithContext, BreadcrumbList, FAQPage } from "schema-dts"
import { TestimonialCard } from "@/components/trust/testimonial-card"
import { TrustBlock } from "@/components/trust/trust-block"

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Accounting for Attorneys & Law Firms | Trust Account Audits",
    description: "Specialized accounting for South African law firms. We handle Section 86 Trust Audits, LPC compliance, and business accounting for attorneys and advocates.",
    canonical: "/industries/legal-attorneys"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "Attorneys (Sole Props & Inc)",
    "Advocates (Trust Account & Referral)",
    "Law Firms",
    "Conveyancers",
    "Notaries",
    "Legal Consultants"
]

const services = [
    {
        title: "Trust Audits",
        description: "We facilitate your annual Section 86 Trust Audit through our partner auditors for LPC submission.",
        icon: Shield,
    },
    {
        title: "Business vs Trust",
        description: "Strict bookkeeping controls to ensure no co-mingling of business and trust funds.",
        icon: Scale,
    },
    {
        title: "VAT for Legal",
        description: "Accurate apportionment of VAT on fees and disbursements (sheriff, counsel).",
        icon: Calculator,
    },
    {
        title: "Advocate Accounting",
        description: "Managing chambers fees, robing expenses, and personal tax for advocates.",
        icon: BookOpen,
    }
]

const painPoints = [
    { title: "LPC Deadlines", desc: "We schedule your audit months in advance so your Fidelity Fund Certificate is never at risk." },
    { title: "Disbursements", desc: "We help track disbursements to ensure you recover them from clients before paying them out." },
    { title: "Cash Flow", desc: "Law is feast or famine. We help you manage cash reserves during long litigation delays." }
]

const faqs = [
    {
        question: "Do you do the Trust Audit yourselves?",
        answer: "We prepare the books to 'Audit Ready' status and then facilitate the audit through our independent audit partners (as required by the LPC for separation of duties)."
    },
    {
        question: "I am a new advocate. How do I register for VAT?",
        answer: "Once your fee income exceeds R1 million/year, it's mandatory. We handle the registration and ensure you claim input VAT on chambers fees, robing, and library costs."
    },
    {
        question: "Can you handle GhostPractice / AJS exports?",
        answer: "Yes. We import data from legal practice management suites straight into Xero or Sage for your final financial statements."
    },
    {
        question: "Do you handle payroll for law firms?",
        answer: "Yes, we manage payroll for candidate attorneys, secretaries, and professional staff, including all SARS returns."
    },
    {
        question: "Can you assist with a new firm setup?",
        answer: "Yes, from CIPC registration to initial Trust Account opening and Section 86 notification to the bank."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function LegalIndustryPage() {
    // Schema
    const jsonLd: WithContext<Product> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Accounting for Attorneys and Law Firms",
        description: "Specialized trust and business accounting services for legal practitioners in South Africa.",
        brand: {
            "@type": "Brand",
            name: "Creations Accounting"
        },
        sku: "SERVICE-LEGAL-ACC"
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Industries", item: "https://creations.co.za/services" },
            { "@type": "ListItem", position: 3, name: "Legal", item: "https://creations.co.za/industries/legal-attorneys" }
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
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6 font-medium">
                                    <Scale className="h-3.5 w-3.5 mr-2" /> Legal Practitioners
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-primary mb-6 leading-[1.1]">
                                    Accounting for Attorneys & Law Firms
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Uncompromising compliance for officers of the court. We manage your Business and Trust accounting needs with precision.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="industry_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </QuoteLink>
                                <Link href="#services">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">View Services</Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. THE CONTEXT */}
            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <MotionWrapper className="lg:col-span-5">
                            <h2 className="text-3xl font-bold mb-6">Compliance Beyond the Courtroom</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Legal practitioners face the strictest financial regulation of any profession. A simple trust account error can cost you your admission.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="p-4 rounded-xl bg-background border border-border/50">
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-primary" /> Section 86 Trust Compliance
                                    </h3>
                                    <p className="text-sm text-text-secondary">Monthly maintenance and annual audit readiness for your trust creditors.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-background border border-border/50">
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <Building className="h-4 w-4 text-primary" /> Practice Management
                                    </h3>
                                    <p className="text-sm text-text-secondary">Tracking billable hours vs. recovered fees to ensure profitability.</p>
                                </div>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-7">
                            <div className="bg-surface-elevated border border-border rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-6">Who We Assist</h3>
                                <IconList
                                    items={whoIsThisFor}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    itemClassName="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-all flex items-center gap-3 text-sm"
                                    iconClassName="h-4 w-4 text-primary shrink-0"
                                />
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST SIGNAL 1 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="I used to dread the annual trust audit. Creations prepares everything monthly, so the audit is now a non-event."
                        author="Senior Partner"
                        role="Pretoria Law Firm"
                        variant="primary"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 3. CORE SERVICES */}
            <SectionWrapper id="services" padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Core Services for Lawyers</h2>
                        <p className="text-text-secondary">Keeping your practice compliant and your Fidelity Fund Certificate safe.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="h-full bg-surface border-border/50 hover:border-primary/40 transition-all group">
                                    <CardContent className="p-6">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <service.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST BLOCK */}
            <TrustBlock />

            {/* 4. PAIN POINTS SOLVED */}
            <SectionWrapper padding="lg" variant="surface" showLineGrid>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {painPoints.map((point, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-accent/10 text-accent ring-8 ring-accent/5">
                                        <FileCheck className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{point.desc}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5. FAQ */}
            <SectionWrapper variant="base" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Legal Accounting FAQ</h2>
                    </MotionWrapper>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-surface px-4">
                                <AccordionTrigger className="font-semibold text-text-primary hover:text-primary hover:no-underline py-4 text-left">
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
                        quote="They understand the difference between business and trust money. Essential for any serious practice."
                        author="Advocate"
                        role="Pretoria Bar"
                        variant="subtle"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 6. INTERNAL LINKING */}
            <SectionWrapper variant="surface" padding="md" className="border-t border-border/40">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
                        <div className="text-text-secondary font-medium">Related Locations & Services:</div>
                        <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-end">
                            <Link href="/locations/pretoria" className="text-text-muted hover:text-primary transition-colors">Pretoria (Legal Hub)</Link>
                            <Link href="/locations/johannesburg" className="text-text-muted hover:text-primary transition-colors">Johannesburg (Legal Hub)</Link>
                            <Link href="/services/bookkeeping" className="text-text-muted hover:text-primary transition-colors">Bookkeeping</Link>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 7. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Secure Your Practice</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get specialized accounting that understands the Legal Practice Council requirements.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="industry_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Request Consultation
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/contact">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Contact Us
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
