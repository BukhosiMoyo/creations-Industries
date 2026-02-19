
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, AlertTriangle, Shield, Clock, Cloud, Receipt, Coins, RefreshCcw, Building2, Gavel, Stethoscope, HardHat } from "lucide-react"
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
    title: "Bookkeeping Services for Small & Medium Businesses",
    description: "Modern cloud bookkeeping for South African SMEs. We use Xero and Sage to turn your transactions into business intelligence. Daily processing, VAT compliance, and catch-up services.",
    canonical: "/services/bookkeeping"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "E-commerce Stores (Shopify/WooCommerce)",
    "Agencies & Consultancies tracking projects",
    "Construction & Trade handling job costing",
    "Startups needing scalable finance stacks",
    "Established SMEs drowning in paper",
    "Businesses needing a VAT/Tax cleanup"
]

const whyMatters = [
    {
        title: "Garbage In, Garbage Out",
        desc: "Your tax return is only as good as the bookkeeping data it's built on. Bad bookkeeping triggers bad audits."
    },
    {
        title: "VAT Risk Management",
        desc: "Claiming input VAT without a valid Tax Invoice is the #1 reason for SARS penalties. We gatekeep your expenses."
    },
    {
        title: "Cash Flow Survival",
        desc: "You cannot manage what you do not measure. Accurate lists of who owes you money are your survival toolkit."
    },
    {
        title: "Reclaim Your Time",
        desc: "The average SME owner spends 10+ hours a month on finance admin. We give that time back to you to sell and build."
    }
]

const services = [
    {
        title: "Cloud Migration & Setup",
        icon: Cloud,
        desc: "Moving you from 'Shoebox/Excel' to Xero or Sage. We configure bank feeds, invoice templates, and charts of accounts."
    },
    {
        title: "Daily Processing",
        icon: Receipt,
        desc: "The engine room: Receipt capture (Dext), bank reconciliation, petty cash control, and payroll journals."
    },
    {
        title: "Debtors & Creditors",
        icon: Coins,
        desc: "Sending professional invoices to clients and loading beneficiaries correctly to prevent fraud."
    },
    {
        title: "The 'Clean-Up'",
        icon: RefreshCcw,
        desc: "Fixing backlogs, double-allocations, and VAT errors. We can process 12 months of data in 2 weeks."
    }
]

const processSteps = [
    { step: 1, title: "Tech Stack Assessment", description: "We audit your current state. Spreadsheets? Messy Xero? We identify the upgrade path." },
    { step: 2, title: "The 'Rule of Zero'", description: "We set up automated bank rules. 'Fuel at Shell' -> 'Motor Expenses'. We automate the routine." },
    { step: 3, title: "The Data Loop", description: "You snap a pic of a slip via app. You email an invoice. We capture, allocate, and reconcile." },
    { step: 4, title: "The Month-End Close", description: "We reconcile the bank to the cent, check the VAT control, and lock the period for reporting." }
]

const timelines = [
    "New System Setup: 3-5 Business Days",
    "Monthly Reconciliation: Ongoing (Preferred)",
    "Catch-Up Projects: ~1 week per financial year volume"
]

const faqs = [
    {
        question: "Which software is best: Xero, Sage, or QuickBooks?",
        answer: "In South Africa, Xero and Sage Business Cloud are the leaders. Sage is excellent for local compliance; Xero is unmatched for user experience and app integrations. We support both."
    },
    {
        question: "Do I need a bookkeeper if I have an accountant?",
        answer: "Yes. Think of the bookkeeper as the nurse who takes vitals daily, and the accountant as the surgeon who operates once a year. You need accurate vitals for a successful surgery."
    },
    {
        question: "Can you train my admin staff to do this?",
        answer: "Yes. We offer training packages where we set up the system and teach your internal admin how to manage day-to-day invoicing, while we oversee the high-level compliance."
    },
    {
        question: "Is my financial data safe in the cloud?",
        answer: "Generally, cloud data is safer than a laptop hard drive. Remote servers have redundant backups and enterprise-grade firewalls that individual businesses usually cannot afford."
    },
    {
        question: "How do you handle catch-up work?",
        answer: "We quote on a project basis (not hourly), so you know the cost upfront. We use bulk-import tools to reconstruct your history efficiently."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function BookkeepingPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Bookkeeping Services South Africa",
        description: "Modern cloud bookkeeping for South African SMEs. Xero/Sage setup, monthly processing, and backlog cleanup.",
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
            name: "Bookkeeping Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monthly Bookkeeping" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Accounting Setup" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Financial Data Clean-up" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Bookkeeping", item: "https://creations.africa/services/bookkeeping" }
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
                                    <Cloud className="h-3.5 w-3.5 mr-2" /> Bookkeeping Services South Africa
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Bookkeeping Services for Small & Medium Businesses
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Turn your bank transactions into business intelligence. Daily processing, VAT compliance, and real-time records on Xero & Sage.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="service_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Clean Up My Books <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Stop Drowning in Paper</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                In the digital economy, bookkeeping isn&apos;t data entry—it&apos;s data integrity. The old days of dropping a shoebox at an accountant&apos;s office are gone. You need real-time visibility.
                            </p>
                            <Link href="/services/tax">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Worried about SARS audits? See Tax Services <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
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

            {/* 2a. INDUSTRIES WE SUPPORT (NEW) */}
            <SectionWrapper variant="base" padding="md" className="border-b border-border/40">
                <Container>
                    <MotionWrapper className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Industries We Commonly Support</h2>
                        <p className="text-text-secondary mt-2">Specialized bookkeeping for specific verticals.</p>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: "Medical Professionals", href: "/industries/medical-professionals", icon: Stethoscope },
                            { name: "Engineering Consultants", href: "/industries/engineering-consultants", icon: HardHat },
                            { name: "Legal Attorneys", href: "/industries/legal-attorneys", icon: Gavel },
                            { name: "Construction Projects", href: "/industries/construction-projects", icon: Building2 },
                        ].map((item, i) => (
                            <Link key={i} href={item.href}>
                                <div className="group flex items-center gap-3 p-4 rounded-xl bg-surface border border-border/50 hover:border-accent/40 hover:shadow-sm transition-all">
                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-primary group-hover:text-accent transition-colors">{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2a. INDUSTRIES WE SUPPORT (NEW) */}
            <SectionWrapper variant="base" padding="md" className="border-b border-border/40">
                <Container>
                    <MotionWrapper className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Industries We Commonly Support</h2>
                        <p className="text-text-secondary mt-2">Specialized bookkeeping for specific verticals.</p>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: "Medical Professionals", href: "/industries/medical-professionals", icon: Stethoscope },
                            { name: "Engineering Consultants", href: "/industries/engineering-consultants", icon: HardHat },
                            { name: "Legal Attorneys", href: "/industries/legal-attorneys", icon: Gavel },
                            { name: "Construction Projects", href: "/industries/construction-projects", icon: Building2 },
                        ].map((item, i) => (
                            <Link key={i} href={item.href}>
                                <div className="group flex items-center gap-3 p-4 rounded-xl bg-surface border border-border/50 hover:border-accent/40 hover:shadow-sm transition-all">
                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-primary group-hover:text-accent transition-colors">{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2a. INDUSTRIES WE SUPPORT (NEW) */}
            <SectionWrapper variant="base" padding="md" className="border-b border-border/40">
                <Container>
                    <MotionWrapper className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Industries We Commonly Support</h2>
                        <p className="text-text-secondary mt-2">Specialized bookkeeping for specific verticals.</p>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: "Medical Professionals", href: "/industries/medical-professionals", icon: Stethoscope },
                            { name: "Engineering Consultants", href: "/industries/engineering-consultants", icon: HardHat },
                            { name: "Legal Attorneys", href: "/industries/legal-attorneys", icon: Gavel },
                            { name: "Construction Projects", href: "/industries/construction-projects", icon: Building2 },
                        ].map((item, i) => (
                            <Link key={i} href={item.href}>
                                <div className="group flex items-center gap-3 p-4 rounded-xl bg-surface border border-border/50 hover:border-accent/40 hover:shadow-sm transition-all">
                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-primary group-hover:text-accent transition-colors">{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. WHY MATTERS */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Accurate Bookkeeping Matters</h2>
                        <p className="text-text-secondary">Your financial reports are only as reliable as the data they are built on.</p>
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
                        quote="I used to panic every time I got an email from SARS. Now I know everything is filed before I even wake up."
                        author="Founder"
                        role="E-Commerce Store"
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
                        <p className="text-text-secondary">Comprehensive digital bookkeeping from setup to sign-off.</p>
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
                                        {['Certified Advisors (Gold/Platinum Status)', 'Human Oversight on AI Tools', 'Bank-Grade Security', 'CIPC Integration'].map((item, i) => (
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

            {/* 5a. LOCATIONS */}
            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Bookkeeping Support Across Gauteng</h2>
                        <p className="text-text-secondary mt-2">Localise your support. Visit our area hubs.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { name: "Pretoria", href: "/locations/pretoria" },
                            { name: "Johannesburg", href: "/locations/johannesburg" },
                            { name: "Sandton", href: "/locations/johannesburg" }, // Sandton maps to JHB Hub for now
                            { name: "Centurion", href: "/locations/centurion" }
                        ].map((loc, i) => (
                            <Link key={i} href={loc.href}>
                                <Button variant="outline" className="border-border/50 text-text-secondary hover:text-accent hover:border-accent/30">
                                    {loc.name} Bookkeeping Hub
                                </Button>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5a. LOCATIONS */}
            <SectionWrapper variant="surface" padding="lg" className="border-t border-border/40">
                <Container>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Bookkeeping Support Across Gauteng</h2>
                        <p className="text-text-secondary mt-2">Localise your support. Visit our area hubs.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { name: "Pretoria", href: "/locations/pretoria" },
                            { name: "Johannesburg", href: "/locations/johannesburg" },
                            { name: "Sandton", href: "/locations/johannesburg" }, // Sandton maps to JHB Hub for now
                            { name: "Centurion", href: "/locations/centurion" }
                        ].map((loc, i) => (
                            <Link key={i} href={loc.href}>
                                <Button variant="outline" className="border-border/50 text-text-secondary hover:text-accent hover:border-accent/30">
                                    {loc.name} Bookkeeping Hub
                                </Button>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 6. FAQ */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    </MotionWrapper>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq - ${i} `} className="border rounded-xl bg-background px-4">
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

            {/* 7. INTERNAL LINKING */}
            <SectionWrapper variant="base" padding="md" className="border-t border-border/40">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
                        <div className="text-text-secondary font-medium">Explore Related Services:</div>
                        <div className="flex flex-wrap gap-4 md:gap-8">
                            <Link href="/services/accounting" className="text-text-muted hover:text-accent transition-colors">Accounting Services</Link>
                            <Link href="/services/tax" className="text-text-muted hover:text-accent transition-colors">Tax Services</Link>
                            <Link href="/locations/pretoria/bookkeeping" className="text-text-muted hover:text-accent transition-colors">Bookkeeping in Pretoria</Link>
                            <Link href="/locations/pretoria" className="text-text-muted/60 hover:text-accent transition-colors text-xs border-l border-border pl-4">Pretoria Hub</Link>
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
                                    Stop flying blind. Get precise, digital records that make tax season a breeze.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="service_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Get Started
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/accounting">
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
