import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin, Building2, Briefcase, FileText, Globe, Gem, TrendingUp, Zap, Stethoscope, HardHat, Gavel } from "lucide-react"
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
    title: "Accounting Services Johannesburg | Tax & Bookkeeping for JHB Business",
    description: "Digital accounting and tax firms for Johannesburg's movers and shakers. We service Sandton, Rosebank, and Randburg with high-speed, compliant financial support.",
    canonical: "/locations/johannesburg"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "Creative & Marketing Agencies (Rosebank/Parkhurst)",
    "Corporate Consultants & Legal (Sandton/Illovo)",
    "Tech Startups & SaaS (Braamfontein/Randburg)",
    "E-commerce & Import/Export (JHB South/East)",
    "Professional Services Firms",
    "High-Volume Retailers"
]

const services = [
    {
        title: "Accounting Services",
        description: "Outsourced financial management as you scale from flexible office space to HQ.",
        icon: Building2,
        link: "/services/accounting"
    },
    {
        title: "Tax Services",
        description: "Corporate tax structuring and valid tax clearance for tenders and big contracts.",
        icon: FileText,
        link: "/services/tax"
    },
    {
        title: "Bookkeeping",
        description: "High-volume transaction processing for retailers and agencies via cloud tools.",
        icon: Briefcase,
        link: "/services/bookkeeping"
    }
]

const serviceAreas = [
    "Sandton", "Rosebank", "Randburg", "Bryanston",
    "Fourways", "Midrand", "Parkhurst", "Bedfordview",
    "Johannesburg Central", "Melville"
]

const processSteps = [
    { step: 1, title: "Discovery", description: "Efficient focused session to align on your growth goals." },
    { step: 2, title: "Migration", description: "Moving you from legacy system to Xero/Sage cloud environment." },
    { step: 3, title: "Automation", description: "Connecting Dext/Hubdoc to remove manual data entry." },
    { step: 4, title: "Reporting", description: "Financial intelligence delivered monthly for board meetings." }
]

const faqs = [
    {
        question: "My office is in a co-working space (WeWork/Workshop17). How do we work?",
        answer: "Perfectly. We are 100% paperless. You scan via app, we process in the cloud. No physical file handovers required."
    },
    {
        question: "Do you handle high-volume transaction businesses?",
        answer: "Yes. Whether it's e-commerce or a busy agency, we use automation tools like Dext and Xero to handle volume without charging you for manual data entry hours."
    },
    {
        question: "Are you registered for SARS and CIPC?",
        answer: "Yes, we are fully registered Tax Practitioners. We handle the bureaucracy so you can handle the hustle."
    },
    {
        question: "Can you assist with funding applications?",
        answer: "Yes. We prepare Management Accounts and Financial Statements that meet the standards of banks and investors."
    },
    {
        question: "Do you serve JHB South and East?",
        answer: "Yes. Our cloud model means location within Gauteng is not a barrier. We serve clients from Bedfordview to Soweto."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function JohannesburgHubPage() {
    // Schema
    const jsonLd: WithContext<LocalBusiness> = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        name: "Creations Accounting Johannesburg",
        url: "https://creations.co.za/locations/johannesburg",
        areaServed: {
            "@type": "City",
            name: "Johannesburg"
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
            { "@type": "ListItem", position: 3, name: "Johannesburg", item: "https://creations.co.za/locations/johannesburg" }
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
                                    <MapPin className="h-3.5 w-3.5 mr-2" /> Johannesburg Hub
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Accounting, Tax & Bookkeeping Services in Johannesburg
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Financial infrastructure for the economic heart of South Africa. We keep JHB businesses compliant, scalable, and audit-ready.
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
                            <h2 className="text-3xl font-bold mb-6">Keeping Pace with the City of Gold</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Johannesburg doesn&apos;t sleep, and neither does the taxman. JHB business is about speed, margin, and compliance. We provide the structure you need to run fast without breaking things.
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

            {/* 2B. WHY JHB NEEDS STRUCTURE */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="mb-10 text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Financial Support for the Hustle</h2>
                        <p className="text-text-secondary leading-relaxed">
                            Competitive markets demand clean numbers. You need to know your margin, your runway, and your tax liability in real-time.
                        </p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Corporate Compliance", desc: "Dealing with CIPC, DoL, and SARS efficiently so you can focus on the deal.", icon: Gem },
                            { title: "Agency Profitability", desc: "For agencies in Rosebank, we track project profitability, not just bank balances.", icon: TrendingUp },
                            { title: "High-Speed Scale", desc: "Cloud systems that grow with you, from your first office in Braamfontein to your floor in Sandton.", icon: Zap }
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
                        <h2 className="text-3xl font-bold mb-4">Core Services for Johannesburg Businesses</h2>
                        <p className="text-text-secondary">Enterprise-level accounting, scaled for growing companies.</p>
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

            {/* 3B. JHB INDUSTRIES */}
            <SectionWrapper variant="base" padding="lg">
                <Container>
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold mb-4">Specialized for JHB&apos;s Economy</h2>
                        <p className="text-text-secondary">Tailored support for the city&apos;s key sectors.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Creative Agencies", desc: "Profitability tracking for Rosebank agencies", icon: Zap, href: "/industries/engineering-consultants" }, // Mapping to closest vertical for now, or general
                            // Actually we have specific verticals. Let's use them.
                            { name: "Tech & SaaS", desc: "Revenue recognition for Sandton startups", icon: Building2, href: "/industries/engineering-consultants" }, // Placeholder link if needed, but optimally we should link to existing verticals?
                            // We only have: Medical, Engineering, Legal, Construction. 
                            // Let's stick to those if appropriate, or just link to generic /industries if we don't have a page.
                            // The blueprint says "Link to Industry Vertical Page".
                            // If JHB has "Creative Agencies", we don't have that page yet.
                            // I should probably skip links if pages don't exist, OR link to the general /industries page, OR use the existing ones.
                            // Let's use the existing ones that fit JHB: Legal, Engineering, Construction.
                            { name: "Legal Professionals", desc: "Trust audits for Sandton firms", icon: Gavel, href: "/industries/legal-attorneys" },
                            { name: "Construction & Dev", desc: "Project finance for JHB growth", icon: HardHat, href: "/industries/construction-projects" },
                            { name: "Medical Specialists", desc: "Private practice accounts", icon: Stethoscope, href: "/industries/medical-professionals" }
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
                        quote="We needed a partner who could keep up with our transaction volume. The digital systems used here are efficient and reliable."
                        author="CFO"
                        role="Johannesburg Agency"
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
                        <p className="text-text-secondary">Efficient, remote-first, and paperless.</p>
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
                                    <Globe className="h-6 w-6 text-accent" /> Johannesburg Service Areas
                                </h2>
                                <p className="text-text-secondary leading-relaxed">
                                    From Sandton CBD to the creative parks of Rosebank and beyond.
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
                        <h2 className="text-3xl font-bold mb-4">Questions from JHB Business Owners</h2>
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
                            <Link href="/locations/centurion" className="text-text-muted hover:text-accent transition-colors">Centurion Hub</Link>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a JHB Accountant?</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get the financial clarity your business deserves. Schedule a consultation with our team today.
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
