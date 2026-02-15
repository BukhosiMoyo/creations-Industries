import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin, Truck, Home, Cpu, Briefcase, FileText, Globe, Building2, Stethoscope, HardHat, Gavel } from "lucide-react"
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
import { LocalBusiness, WithContext, BreadcrumbList, FAQPage } from "schema-dts"
import { TestimonialCard } from "@/components/trust/testimonial-card"

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Accounting Services Centurion | Tax & Bookkeeping for High-Growth SMEs",
    description: "Expert accounting and tax support for Centurion businesses. From Midstream to Hennopspark, we provide digital cloud accounting for logistics, tech, and service companies.",
    canonical: "/locations/centurion"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "Logistics & Transport Companies (Hennopspark/Route 21)",
    "Tech & IT Consultants (Highveld/Technopark)",
    "Estate-based Businesses (Midstream/Centurion Golf Estate)",
    "Retail & Service Franchises (Centurion Mall/Irene)",
    "Contractors supporting the aerospace/military sector",
    "Growing Families & Trusts"
]

const services = [
    {
        title: "Accounting Services",
        description: "Monthly management packs for decision making. Perfect for high-growth entities.",
        icon: Building2,
        link: "/services/accounting"
    },
    {
        title: "Tax Services",
        description: "VAT, PAYE, and Provisional Tax optimization for companies and high-net-worth individuals.",
        icon: FileText,
        link: "/services/tax"
    },
    {
        title: "Bookkeeping",
        description: "Daily processing to keep the 'shoebox' empty. Full Xero & Sage integration.",
        icon: Briefcase,
        link: "/services/bookkeeping"
    }
]

const serviceAreas = [
    "Centurion Central", "Midstream Estate", "Hennopspark", "Rooihuiskraal",
    "Irene", "Lyttelton", "Highveld", "Pierre van Ryneveld",
    "Eldoraigne", "Wierdapark"
]

const processSteps = [
    { step: 1, title: "Digital Discovery", description: "A quick Zoom call to understand your business model and tech stack." },
    { step: 2, title: "Cloud Setup", description: "We set up Xero/Sage to handle bank feeds automatically." },
    { step: 3, title: "Compliance Fix", description: "Reviewing CIPC and SARS status to ensure you are green." },
    { step: 4, title: "Growth Rhythm", description: "Monthly reports sent to your inbox, so you know your numbers." }
]

const faqs = [
    {
        question: "Do you come to my office in Midstream/Estate?",
        answer: "We are a digital-first firm, which suits the security access of estates perfectly. We meet via Teams/Zoom, saving you the hassle of signing us in, while keeping fees efficient."
    },
    {
        question: "Do you understand the logistics/transport sector?",
        answer: "Yes. We know the specific pain points: fuel rebates, vehicle financing, and high-volume VAT transactions common in the Hennopspark/Route 21 industrial hubs."
    },
    {
        question: "I'm a contractor at a large tech firm. Can you help?",
        answer: "Absolutely. We manage personal tax and provisional tax for high-income independent contractors common in the Techno Park area."
    },
    {
        question: "How quickly can you take over my books?",
        answer: "Within 48 hours. We send a digital mandate, link your bank feeds, and can start processing immediately."
    },
    {
        question: "Do you handle payroll for drivers/staff?",
        answer: "Yes, we handle full payroll administration, including EMP201 returns and UI-19 declarations."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function CenturionHubPage() {
    // Schema
    const jsonLd: WithContext<LocalBusiness> = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        name: "Creations Accounting Centurion",
        url: "https://creations.co.za/locations/centurion",
        areaServed: {
            "@type": "City",
            name: "Centurion"
        },
        address: {
            "@type": "PostalAddress",
            addressRegion: "Gauteng",
            addressCountry: "ZA"
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Locations", item: "https://creations.co.za/locations" },
            { "@type": "ListItem", position: 3, name: "Centurion", item: "https://creations.co.za/locations/centurion" }
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
                                    <MapPin className="h-3.5 w-3.5 mr-2" /> Centurion Hub
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Accounting, Tax & Bookkeeping Services in Centurion
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    High-performance financial support for Centurion&apos;s fastest-growing businesses. Digital efficiency with local understanding.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="location_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">Speak to an Accountant <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </QuoteLink>
                                <Link href="#services">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">View Local Services</Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. WHO THIS IS FOR */}
            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <MotionWrapper className="lg:col-span-4">
                            <h2 className="text-3xl font-bold mb-6">Built for Centurion&apos;s Growth</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Centurion isn&apos;t just a commuter city anymore; it&apos;s a powerhouse of logistics, technology, and residential wealth. We support the businesses driving this growth.
                            </p>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-8">
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

            {/* 2B. WHY CENTURION NEEDS STRUCTURE */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="mb-10 text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Financial Agility for a Fast-Moving Hub</h2>
                        <p className="text-text-secondary leading-relaxed">
                            From Route 21 Corporate Park to the tranquil estates of Midstream, business here moves fast. You need a finance partner who can keep up.
                        </p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Logistics Compliance", desc: "Managing fleet costs, VAT audits on fuel, and labor compliance for transport businesses.", icon: Truck },
                            { title: "Estate Living, Global Business", desc: "For the consultant working from Midstream but billing internationally – we handle the cross-border tax.", icon: Home },
                            { title: "Tech Scalability", desc: "Software houses and IT consultancies need automated billing and revenue recognition.", icon: Cpu }
                        ].map((item, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="p-6 rounded-xl bg-surface border border-border/50 h-full">
                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-bold text-text-primary mb-2">{item.title}</h3>
                                    <p className="text-sm text-text-secondary">{item.desc}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. CORE SERVICES */}
            <SectionWrapper id="services" padding="lg" variant="surface" showLineGrid>
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Core Services for Centurion Businesses</h2>
                        <p className="text-text-secondary">We bring the full power of our national practice to your local hub.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((service, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Link href={service.link} className="block h-full">
                                    <Card className="h-full bg-background border-border/50 hover:border-accent/40 hover:shadow-lg transition-all cursor-pointer group">
                                        <CardContent className="p-8">
                                            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                                <service.icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                                            <p className="text-text-secondary text-sm leading-relaxed mb-6">{service.description}</p>
                                            <div className="flex items-center text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                                Learn More <ArrowRight className="ml-1 h-4 w-4" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3B. CENTURION INDUSTRIES */}
            <SectionWrapper variant="base" padding="lg">
                <Container>
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold mb-4">Specialized for Centurion&apos;s Economy</h2>
                        <p className="text-text-secondary">Tailored support for the local efficiency hubs.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Engineering Firms", desc: "For Highveld & Technopark", icon: HardHat, href: "/industries/engineering-consultants" },
                            { name: "Medical Consultants", desc: "For practicioners in Lyttelton", icon: Stethoscope, href: "/industries/medical-professionals" },
                            { name: "Construction Projects", desc: "Development finance for fast-growing areas", icon: Building2, href: "/industries/construction-projects" }
                        ].map((item, i) => (
                            <Link key={i} href={item.href}>
                                <div className="group p-6 rounded-xl bg-surface border border-border/50 hover:border-accent/40 hover:shadow-sm transition-all h-full">
                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">{item.name}</h3>
                                    <p className="text-sm text-text-secondary">{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST SIGNAL 1 (NEW) */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="Our business is growing fast, and we needed an accounting setup that could scale with us without breaking."
                        author="Founder"
                        role="Software Company"
                        variant="primary"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 4. PROCESS */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                        <p className="text-text-secondary">Streamlined digital onboarding.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="relative pl-6 border-l-2 border-border/50 group hover:border-accent transition-colors py-2">
                                    <div className="text-xs uppercase font-bold text-accent mb-2">Step {step.step}</div>
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5. SERVICE AREAS */}
            <SectionWrapper padding="lg" variant="surface" showDotGrid>
                <Container>
                    <div className="rounded-2xl bg-surface border border-border/50 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <MotionWrapper className="md:w-1/3">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Globe className="h-6 w-6 text-accent" /> Centurion Service Areas
                                </h2>
                                <p className="text-text-secondary leading-relaxed">
                                    We cover the entire Centurion region, offering digital audit-ready services to every suburb.
                                </p>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} className="md:w-2/3">
                                <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                                    {serviceAreas.map((area, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-md bg-background border border-border text-sm text-text-secondary hover:text-accent hover:border-accent/30 transition-colors cursor-default">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 6. FAQ */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Questions from Centurion Business Owners</h2>
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

            {/* 7. INTERNAL LINKING */}
            <SectionWrapper variant="base" padding="md" className="border-t border-border/40">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
                        <div className="text-text-secondary font-medium">Nearby Hubs:</div>
                        <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
                            <Link href="/locations/pretoria" className="text-text-muted hover:text-accent transition-colors">Pretoria Hub</Link>
                            <Link href="/locations/johannesburg" className="text-text-muted hover:text-accent transition-colors">Johannesburg Hub</Link>
                            <Link href="/services/accounting" className="text-text-muted/60 hover:text-accent transition-colors border-l border-border pl-4">National Services</Link>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 7. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            {/* Decorative background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Scale Your Centurion Business?</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get local accounting support that understands your pace. Schedule a consultation today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="location_bottom_cta">
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
            </SectionWrapper >
        </div >
    )
}
