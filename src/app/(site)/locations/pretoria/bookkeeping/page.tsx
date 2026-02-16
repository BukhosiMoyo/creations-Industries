import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, CheckCircle2, AlertTriangle, Globe, Clock, TrendingUp, Users, Stethoscope, HardHat, Gavel, Building2, Cloud, Receipt, Calculator, Shield } from "lucide-react"
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
    title: "Bookkeeping Services in Pretoria | Accurate Monthly Records",
    description: "Reliable bookkeeping for Pretoria businesses. Cloud accounting (Xero/Sage), VAT compliance, and catch-up services.",
    canonical: "/locations/pretoria/bookkeeping"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "Startups & New Founders",
    "Tradespeople & Contractors",
    "Retail & E-commerce Stores",
    "Growing Agencies",
    "Established SMEs"
]

const whyMatters = [
    {
        title: "VAT Compliance",
        desc: <>Inaccurate input/output claims trigger SARS audits. Pretoria businesses cannot afford <Link href="/services/tax/vat-registration-returns" className="text-accent hover:underline">VAT risk</Link>.</>
    },
    {
        title: "Cash Flow Visibility",
        desc: "You can't pay staff if you don't know who hasn't paid you. We keep your debtors list current."
    },
    {
        title: "Audit Readiness",
        desc: "When banks or investors ask for management accounts, you need them immediately, not next month."
    },
    {
        title: "Cost Savings",
        desc: "It's cheaper to pay a bookkeeper monthly than to pay an accountant to fix 12 months of mistakes at year-end."
    }
]

const services = [
    {
        title: "Cloud Setup & Training",
        icon: Cloud,
        desc: "Migration to Xero/Sage, Chart of Accounts customization, and bank feed integration."
    },
    {
        title: "Monthly Processing",
        icon: Receipt,
        desc: "Capturing supplier invoices (Dext/Hubdoc), reconciling banks, and managing petty cash."
    },
    {
        title: "VAT & PAYE Prep",
        icon: Calculator,
        desc: "Reviewing transactions for valid tax invoices and preparing VAT201 reports."
    },
    {
        title: "Supplier Management",
        icon: Users,
        desc: "Loading beneficiaries, fraud prevention, and sending monthly customer statements."
    }
]



const processSteps = [
    { step: 1, title: "The 'Shoebox' Assessment", description: "We review your current state (spreadsheet? paper? messy Xero?) and assess the backlog." },
    { step: 2, title: "System Implementation", description: "We implement the right tech stack (e.g., Xero + Dext) to automate 60-80% of data entry." },
    { step: 3, title: "The Monthly Rhythm", description: "You snap photos of slips. We capture, allocate, and reconcile weekly." },
    { step: 4, title: "The Month-End Close", description: "By the 7th, your bank is reconciled and books are ready for management reporting." }
]

const timelines = [
    "Setup/Conversion: 3-5 business days",
    "Backlog Processing: ~1 week per 6 months data",
    "Monthly Reconciliation: Weekly or Bi-weekly"
]

const faqs = [
    {
        question: "Do I need a bookkeeper AND an accountant?",
        answer: <>Often, yes. A bookkeeper maintains the daily/weekly records. An accountant analyzes that data for <Link href="/services/tax" className="text-accent hover:underline">tax strategy</Link> and reporting. We provide both services under one roof for seamless handover.</>
    },
    {
        question: "Can you work with my existing Xero file?",
        answer: "Absolutely. We often start by doing a 'Health Check' on an existing file to fix duplicate contacts and incorrect VAT codes before taking over monthly processing."
    },
    {
        question: "I have 2 years of backlog. Can you help?",
        answer: "Yes. 'Catch-up' bookkeeping is a common service. We quote on a project basis to bring your books up to date so you can file overdue tax returns."
    },
    {
        question: "Do you come to my office to do the books?",
        answer: "We primarily work remotely using cloud software, which is more efficient (no travel costs). However, for high-volume filing or audits, we can arrange site visits in Pretoria."
    },
    {
        question: "What software do you recommend?",
        answer: "We strongly recommend Xero or Sage Business Cloud for South African SMEs. They handle VAT and bank feeds best. We can assist with subscription discounts."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function PretoriaBookkeepingPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Bookkeeping Services in Pretoria",
        description: "Accurate monthly bookkeeping for Pretoria businesses. Xero/Sage setup, VAT compliance, and backlog catch-up.",
        provider: {
            "@type": "AccountingService",
            name: "Creations Accounting Pretoria",
            url: "https://creations.co.za/locations/pretoria/bookkeeping"
        },
        areaServed: {
            "@type": "City",
            name: "Pretoria"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Bookkeeping Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monthly Bookkeeping" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Xero Setup & Training" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backlog Catch-up" } }
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
            { "@type": "ListItem", position: 4, name: "Bookkeeping Services", item: "https://creations.co.za/locations/pretoria/bookkeeping" }
        ]
    }

    const faqSchema: WithContext<any> = {
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
                                    Bookkeeping Services in Pretoria
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Turn the chaos of daily transactions into an organized, digital system. We keep your records audit-ready and tax-compliant.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="service_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Get Your Books in Order <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                                <Link href="#services">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">
                                        View Services
                                    </Button>
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
                            <h2 className="text-3xl font-bold mb-6">Clean Data, Better Decisions</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Great businesses are built on clean data. If your receipts are in a shoebox and you don&apos;t know who owes you money, you can&apos;t grow. We turn admin chaos into clarity.
                            </p>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-8">
                            <h3 className="text-lg font-bold mb-4">Who This Is For</h3>
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

            {/* 3. WHY ACCURACY MATTERS */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Accurate Bookkeeping Matters</h2>
                        <p className="text-text-secondary">Inaccurate input claims trigger SARS audits. Pretoria businesses cannot afford VAT risk.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyMatters.map((item, i) => (
                            <MotionWrapper key={i} delay={i * 0.1} className="h-full">
                                <Card className="h-full bg-surface border-border/50">
                                    <CardContent className="p-6">
                                        <AlertTriangle className="h-8 w-8 text-accent mb-4" />
                                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
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
                        quote="Our previous bookkeeper made a mess of VAT liability. Creations fixed 12 months of errors in 2 weeks."
                        author="Financial Director"
                        role="Logistics Company"
                        variant="primary"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 4. CORE SERVICES */}
            <SectionWrapper id="services" padding="lg" variant="surface" showLineGrid>
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">What&apos;s Included</h2>
                        <p className="text-text-secondary">From Xero setup to monthly management accounts.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="group h-full p-6 rounded-2xl bg-background border border-border hover:border-accent/50 transition-all hover:shadow-lg">
                                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
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
                        <h2 className="text-2xl font-bold mb-4">Bookkeeping for Pretoria Sectors</h2>
                        <p className="text-text-secondary">Accurate records for specialized industries.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { name: "Doctors", icon: Stethoscope, href: "/industries/medical-professionals" },
                            { name: "Engineers", icon: HardHat, href: "/industries/engineering-consultants" },
                            { name: "Attorneys", icon: Gavel, href: "/industries/legal-attorneys" },
                            { name: "Developers", icon: Building2, href: "/industries/construction-projects" }
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
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <MotionWrapper>
                            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
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
                                    <h4 className="font-bold mb-2">Why Trust Creations?</h4>
                                    <ul className="space-y-2 mb-6">
                                        {['Cloud Certified (Xero/Sage)', 'Supervised Quality', 'Local Context', 'Data Security'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                                                <Shield className="h-3 w-3 text-accent" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <QuoteLink eventLabel="trust_block_cta">
                                        <Button size="sm" variant="outline">Talk to a Bookkeeper</Button>
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
                        quote="Xero is now automated. We don't touch data entry anymore."
                        author="Owner"
                        role="Digital Agency"
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
                            <Link href="/locations/pretoria/accounting" className="text-text-muted hover:text-accent transition-colors">Accounting Services</Link>
                            <Link href="/locations/pretoria/tax" className="text-text-muted hover:text-accent transition-colors">Tax Services</Link>
                            <Link href="/services/bookkeeping" className="text-text-muted/60 hover:text-accent transition-colors text-xs border-l border-border pl-4">National Bookkeeping Pillars</Link>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Clean Up Your Books Today</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Don&apos;t let admin chaos hold your business back. Get precise, Monthly bookkeeping from Pretoria experts.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="service_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Get Started
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/bookkeeping">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            View All Services
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
