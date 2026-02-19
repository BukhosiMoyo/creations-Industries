
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, AlertTriangle, Shield, Clock, Landmark, Calculator, Users, FileText, Scale, Building2, Gavel, Stethoscope, HardHat, MapPin, Factory } from "lucide-react"
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
    title: "Tax Services & Compliance for South African Businesses",
    description: "Expert tax services for South African businesses. Corporate Tax (CIT), VAT, PAYE, and SARS dispute resolution by registered tax practitioners.",
    canonical: "/services/tax"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "Private Companies (Pty Ltd) managing CIT",
    "High Net Worth Individuals & Trusts",
    "VAT Vendors needing 2-monthly compliance",
    "Employers managing PAYE/UIF/SDL",
    "Businesses with outstanding returns (Remedial)",
    "Contractors needing Tax Clearance"
]

const whyMatters = [
    {
        title: "The 'Tax Gap' Risk",
        desc: "SARS is aggressively closing the gap between declared income and third-party data (banks). Discrepancies trigger instant audits."
    },
    {
        title: "Tender Compliance",
        desc: <>In the South African economy, a red Tax Status means lost revenue. We keep your <Link href="/services/tax/tax-clearance-certificates" className="text-accent hover:underline">Tax Clearance</Link> status green for contracts.</>
    },
    {
        title: "Legislative Complexity",
        desc: "From ETI Claims to Section 12C allowances, missing a detail means missing money—or inviting a fine."
    },
    {
        title: "Peace of Mind",
        desc: "The mental load of a looming SARS deadline is heavy. We take that weight off your shoulders."
    }
]

const services = [
    {
        title: "Corporate Income Tax",
        icon: Landmark,
        desc: <>Provisional Tax (IRP6) forecasting and <Link href="/services/tax/business-income-tax-returns" className="text-accent hover:underline">Annual Returns (ITR14)</Link> with full supporting schedules.</>
    },
    {
        title: "VAT Compliance",
        icon: Calculator,
        desc: <>Reviewing every invoice for valid Section 20 requirements and submitting <Link href="/services/tax/vat-registration-returns" className="text-accent hover:underline">VAT201s</Link> on time.</>
    },
    {
        title: "Employees' Tax (PAYE)",
        icon: Users,
        desc: "Monthly EMP201 declarations and bi-annual EMP501 reconciliations via EasyFile to prevent payroll errors."
    },
    {
        title: "Dispute Resolution",
        icon: Scale,
        desc: <>Handling Objections (NOO), Appeals (NOA), and <Link href="/services/tax/sars-penalties-disputes" className="text-accent hover:underline">Voluntary Disclosure (VDP)</Link> to resolve SARS issues.</>
    }
]

const processSteps = [
    { step: 1, title: "The Health Check", description: "We pull your SARS Statement of Account to see exactly what they see: missing returns, debt, or penalties." },
    { step: 2, title: "Diagnosis & Strategy", description: "We categorize issues into 'Immediate Fixes' (e.g., getting Tax Clearance) and 'Long-term Planning'." },
    { step: 3, title: "The Compliance Rhythm", description: "We act as your calendar. Requesting documents weeks before deadlines so you never rush." },
    { step: 4, title: "The Audit Shield", description: "If selected for verification, we have your 'Audit File' ready to upload within 24 hours." }
]

const timelines = [
    "Tax Clearance Retrieval: 24-48 hours",
    "VAT Registration: 2-8 weeks (SARS dependent)",
    "Personal Tax Returns: 3-7 days",
    "Dispute Resolution: 21-90 days"
]

const faqs = [
    {
        question: "What is the difference between a Tax Practitioner and an Accountant?",
        answer: "While often the same person, the roles differ. An accountant builds the financial records. A Tax Practitioner interprets those records according to the Tax Act to ensure compliance. We are both."
    },
    {
        question: "How do I fix a 'Non-Compliant' Tax Status?",
        answer: "We must identify the non-compliance type: 'Outstanding Returns' or 'Outstanding Debt.' We file the returns or arrange a Deferral of Payment to reset your status to Compliant."
    },
    {
        question: "Can you guarantee I won't be audited?",
        answer: "No. Audits are often random or triggered by algorithms. However, we guarantee that if you are audited on a return we prepared, we will handle the process and your records will stand up to scrutiny."
    },
    {
        question: "Do you handle personal tax for directors?",
        answer: "Yes. Business and personal tax are intertwined. We look faster at the holistic picture to ensure salary, dividends, and loan accounts are structured efficiently for both the company and the individual."
    },
    {
        question: "Do you do tax for companies outside Gauteng?",
        answer: "Yes. SARS eFiling is a 100% digital platform. We service clients across South Africa via secure remote channels."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function TaxPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Tax Services South Africa",
        description: "Expert tax services for South African businesses. Corporate Tax, VAT, PAYE, and Dispute Resolution.",
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
            name: "Tax Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Tax Compliance" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "VAT Registration & Filing" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Dispute Resolution" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Tax", item: "https://creations.africa/services/tax" }
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
                                    <FileText className="h-3.5 w-3.5 mr-2" /> Tax Services South Africa
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Tax Services & Compliance for South African Businesses
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    We architect tax compliance to protect your business from penalties, optimize deductions, and ensure your Tax Clearance is always green.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="service_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Get Tax Compliant <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Zero Margin for Error</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                With SARS&apos;s automated assessments and AI-driven audits, the days of &quot;flying under the radar&quot; are over. You need a proactive tax partner who understands the changing legislative landscape.
                            </p>
                            <Link href="/services/accounting">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need clean records first? See Accounting <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <p className="text-text-secondary mt-2">Specialized tax planning for specific verticals.</p>
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
                        <p className="text-text-secondary mt-2">Specialized tax planning for specific verticals.</p>
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
                        <p className="text-text-secondary mt-2">Specialized tax planning for specific verticals.</p>
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
                        <h2 className="text-3xl font-bold mb-4">Why Professional Tax Support Matters</h2>
                        <p className="text-text-secondary">In the current South African economy, tax compliance is a license to trade.</p>
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
                        quote="Provisional tax deadlines used to be a point of stress. Now, we know our liability in advance and plan for it."
                        author="Financial Manager"
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
                        <h2 className="text-3xl font-bold mb-4">Comprehensive Tax Solutions</h2>
                        <p className="text-text-secondary">From annual returns to complex dispute resolution.</p>
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
                            <h2 className="text-3xl font-bold mb-6">How Our Tax Process Works</h2>
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
                                        {['Registered Tax Practitioners', 'Good Standing with RCBs', 'Digital-First Accuracy', 'Ethical Compliance'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                                                <Shield className="h-3 w-3 text-accent" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <QuoteLink eventLabel="trust_block_cta">
                                        <Button size="sm" variant="outline">Consult a Tax Expert</Button>
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
                        <h2 className="text-2xl font-bold">Tax Support Across Gauteng</h2>
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
                                    {loc.name} Tax Hub
                                </Button>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5a. LOCATIONS */}
            <SectionWrapper variant="base" padding="lg" className="border-t border-border/40">
                <Container>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Tax Support Across Gauteng</h2>
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
                                    {loc.name} Tax Hub
                                </Button>
                            </Link>
                        ))}
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
                            <Link href="/services/bookkeeping" className="text-text-muted hover:text-accent transition-colors">Bookkeeping Services</Link>
                            <Link href="/locations/pretoria/tax" className="text-text-muted hover:text-accent transition-colors">Tax in Pretoria</Link>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Tax Compliant Today</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Don&apos;t let tax anxiety slow you down. Get expert support, clear deadlines, and peace of mind.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="service_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Get Compliant
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/accounting">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            View Accounting Plans
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
