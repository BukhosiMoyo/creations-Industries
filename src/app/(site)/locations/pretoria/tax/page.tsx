
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, Shield, AlertTriangle, CheckCircle2, Globe, Clock, Users, Stethoscope, HardHat, Gavel, Building2, Landmark, Calculator, Briefcase } from "lucide-react"
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
    title: "Tax Services in Pretoria | Personal & Corporate Tax Compliance",
    description: "Expert tax services for Pretoria-based businesses and individuals. SARS compliance, tax clearance, and provisional tax planning.",
    canonical: "/locations/pretoria/tax"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "SMEs & Private Companies (Pty Ltd)",
    "Salaried Employees & Executives",
    "Trusts & beneficiaries",
    "Sole Proprietors",
    "Contractors & Freelancers"
]

const whyMatters = [
    {
        title: "Tender Compliance",
        desc: "Many local businesses rely on government contracts where a valid Tax Clearance Pin is mandatory. One missed return can disqualify you."
    },
    {
        title: "SARS Aggression",
        desc: "SARS has increased its audit capabilities. Local businesses need precise record-keeping to withstand scrutiny."
    },
    {
        title: "Complexity",
        desc: "Navigating Gauteng-based operations requires a tax practitioner who understands both national law and local operational realities."
    }
]

const services = [
    {
        title: "Corporate Tax (CIT)",
        icon: Landmark,
        desc: <>Annual ITR14 submission, <Link href="/services/accounting/business-budgeting-forecasting" className="text-accent hover:underline">Provisional Tax (IRP6)</Link> planning, and Dividend declarations.</>
    },
    {
        title: "Personal Income Tax",
        icon: Users,
        desc: <>Individual ITR12 returns, provisional tax for earners, and <Link href="/services/tax/sars-penalties-disputes" className="text-accent hover:underline">dispute resolution</Link>.</>
    },
    {
        title: "VAT Services",
        icon: Calculator,
        desc: <>Registration, two-monthly <Link href="/services/tax/vat-registration-returns" className="text-accent hover:underline">VAT201 submissions</Link>, and audit assistance.</>
    },
    {
        title: "Payroll Tax (PAYE)",
        icon: Briefcase,
        desc: "Monthly EMP201 declarations and bi-annual EMP501 reconciliations via EasyFile."
    }
]

const processSteps = [
    { step: 1, title: "Compliance Health Check", description: "We pull your SARS Statement of Account to identify outstanding returns or penalties." },
    { step: 2, title: "Strategy & Planning", description: "We review financials before year-end to estimate liability and minimize tax legally." },
    { step: 3, title: "Preparation & Review", description: "We collate docs and send the return for your review. No 'blind filing'." },
    { step: 4, title: "Submission & Monitoring", description: "We submit via eFiling and monitor for audits or additional requests." }
]

const timelines = [
    "Personal Returns: Filed within 3-5 days",
    "Company Returns: Drafted within 10 days of financials",
    "VAT Registration: 2-6 weeks (SARS dependent)",
    "Tax Clearance: Immediate upon clearing debt"
]

const faqs = [
    {
        question: "Do you guarantee a tax refund?",
        answer: "No ethical tax practitioner can guarantee a refund. We guarantee compliance and that we will claim every legal deduction you are entitled to, maximizing your potential for a refund while keeping you safe from audits."
    },
    {
        question: "Can you help if I have old outstanding returns?",
        answer: "Yes. We specialize in remedial tax work. We can request your history from SARS, file outstanding returns, and even negotiate payment arrangements (VDP) for old debt to help you get compliant again."
    },
    {
        question: "Do I need to visit your offices in Pretoria?",
        answer: "Not necessarily. While we love meeting clients, our entire tax process is digital. We service clients from Centurion to Pretoria North via secure portals and video calls, saving you traffic time."
    },
    {
        question: "What happens if SARS audits me?",
        answer: "If we prepared the return, we handle the audit. We collate the requested documents, submit the response to SARS, and manage the correspondence until the case is closed."
    },
    {
        question: "How do I get a Tax Clearance Pin?",
        answer: "Once all your returns (Income Tax, VAT, PAYE) are up to date and no debt is outstanding, we can issue a Tax Clearance Pin instantly via eFiling."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function PretoriaTaxPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Tax Services in Pretoria",
        description: "Expert tax services for Pretoria-based businesses and individuals. SARS compliance, tax clearance, and provisional tax planning.",
        provider: {
            "@type": "AccountingService",
            name: "Creations Accounting Pretoria",
            url: "https://creations.africa/locations/pretoria/tax"
        },
        areaServed: {
            "@type": "City",
            name: "Pretoria"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Tax Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Tax Returns" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Personal Income Tax" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "VAT Registration & Filing" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Locations", item: "https://creations.africa/locations" },
            { "@type": "ListItem", position: 3, name: "Pretoria", item: "https://creations.africa/locations/pretoria" },
            { "@type": "ListItem", position: 4, name: "Tax Services", item: "https://creations.africa/locations/pretoria/tax" }
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
                                    Tax Services in Pretoria
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Expert tax assistance for Pretoria businesses and individuals. From provisional tax to SARS disputes, we keep your status green.
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
                            <h2 className="text-3xl font-bold mb-6">Compliance Without Stress</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Dealing with SARS shouldn&apos;t be a gamble. For Pretoria-based businesses, tax compliance is about ensuring your Tax Clearance status is always green for tenders and contracts.
                            </p>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-8">
                            <h3 className="text-lg font-bold mb-4">Who These Services Are For</h3>
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

            {/* 3. WHY SPECIALIZED TAX SUPPORT MATTERS */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Specialized Tax Support Matters</h2>
                        <p className="text-text-secondary">Pretoria is a hub for government services and professionals. Your tax strategy needs to reflect that.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        quote="SARS blocked our Tax Clearance 48 hours before a tender deadline. Creations fixed the error and got us cleared in time."
                        author="Project Manager"
                        role="Construction Co."
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
                        <p className="text-text-secondary">Comprehensive tax compliance for every entity type.</p>
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
                        <h2 className="text-2xl font-bold mb-4">Tax Experts for Pretoria Industries</h2>
                        <p className="text-text-secondary">Specific tax strategies for your sector.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { name: "Medical Tax", icon: Stethoscope, href: "/industries/medical-professionals" },
                            { name: "Engineering Tax", icon: HardHat, href: "/industries/engineering-consultants" },
                            { name: "Legal Trust Tax", icon: Gavel, href: "/industries/legal-attorneys" },
                            { name: "Construction Tax", icon: Building2, href: "/industries/construction-projects" }
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
                                    <h4 className="font-bold mb-2">Why Trust Creations?</h4>
                                    <ul className="space-y-2 mb-6">
                                        {['Registered Tax Practitioners', 'Zero Jargon', 'Proactive Communication', 'Digital Efficiency'].map((item, i) => (
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

            {/* TRUST SIGNAL 2 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="Finally, a tax practitioner in Pretoria who speaks plain English, not 'SARS codes'."
                        author="Small Business Owner"
                        role="Menlyn Retailer"
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
                            <Link href="/locations/pretoria/bookkeeping" className="text-text-muted hover:text-accent transition-colors">Bookkeeping Services</Link>
                            <Link href="/services/tax" className="text-text-muted/60 hover:text-accent transition-colors text-xs border-l border-border pl-4">National Tax Pillars</Link>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Tax Compliant in Pretoria</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Stop worrying about SARS. We handle your tax compliance so you can focus on running your business.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="service_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Get Compliant
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/tax">
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
