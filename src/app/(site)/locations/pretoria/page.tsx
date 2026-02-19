import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, MapPin, Building2, Calculator, FileText, Briefcase, Phone, HelpCircle, Shield, Users, Globe, Stethoscope, HardHat, Gavel } from "lucide-react"
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

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Accounting, Tax & Bookkeeping Services in Pretoria",
    description: "Professional financial support for Pretoria-based businesses. We help specialized SMEs, professionals and contractors with compliance and growth.",
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "Pretoria-based SMEs needing structured reporting",
    "Legal, Medical & Engineering Professionals",
    "Gauteng-registered companies operating nationally",
    "Businesses needing localized tax & compliance support",
    "Contractors & Consultants in the capital city",
    "Startups in Innovation Hub & Menlyn areas"
]

const services = [
    {
        title: "Accounting Services in Pretoria",
        description: "Comprehensive monthly management accounts and financial oversight for growing businesses.",
        icon: Calculator,
        link: "/locations/pretoria/accounting"
    },
    {
        title: "Tax Services in Pretoria",
        description: "Expert handling of VAT, PAYE, Provisional Tax, and SARS dispute resolution.",
        icon: FileText,
        link: "/locations/pretoria/tax"
    },
    {
        title: "Bookkeeping Services in Pretoria",
        description: "Accurate daily transaction processing and reconciliation to keep your records audit-ready.",
        icon: Briefcase,
        link: "/locations/pretoria/bookkeeping"
    }
]

const serviceAreas = [
    "Pretoria Central", "Brooklyn", "Hatfield", "Menlyn",
    "Faerie Glen", "Garsfontein", "Lynnwood", "Waterkloof",
    "Centurion", "Pretoria East", "Montana", "Silver Lakes"
]

const processSteps = [
    { step: 1, title: "Consultation", description: "Remote or local discovery session to understand your business." },
    { step: 2, title: "Assessment", description: "Review of current records, compliance status, and immediate risks." },
    { step: 3, title: "Setup/Cleanup", description: "Structuring your Xero/Sage environment and fixing historical errors." },
    { step: 4, title: "Monthly Support", description: "Ongoing reporting, tax submissions, and strategic advice." }
]

const faqs = [
    {
        question: "Do you work with Pretoria-based businesses only?",
        answer: "While we have a strong focus on Pretoria and Gauteng, our digital-first systems allow us to support businesses across South Africa. However, our understanding of local business hubs (like distinct Pretoria industries) adds specific value."
    },
    {
        question: "Can consultations be done remotely?",
        answer: "Yes, 90% of our client interactions are via Zoom or Teams for efficiency. This allows us to share screens, review live Xero/Sage data, and resolve queries faster than driving to meetings."
    },
    {
        question: "Do you understand Pretoria / Gauteng compliance realities?",
        answer: "Absolutely. We are familiar with the specific rhythm of Gauteng business, from CIPC requirements to local municipal nuances where financial proofs are required."
    },
    {
        question: "How quickly can support start?",
        answer: "We can typically onboard a new client within 3-5 business days. If you have urgent tax deadlines, we prioritize compliance assessment to stop any bleeding immediately."
    },
    {
        question: "Do you assist growing SMEs and professionals?",
        answer: "Yes, this is our sweet spot. We work exceptionally well with engineering firms, medical practices, attorneys, and service-based SMEs common in Pretoria's business nodes."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function PretoriaHubPage() {
    // Schema
    const jsonLd: WithContext<LocalBusiness> = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        name: "Creations Accounting Pretoria",
        url: "https://creations.africa/locations/pretoria",
        areaServed: {
            "@type": "City",
            name: "Pretoria"
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
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Locations", item: "https://creations.africa/locations" },
            { "@type": "ListItem", position: 3, name: "Pretoria", item: "https://creations.africa/locations/pretoria" }
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
                                    <MapPin className="h-3.5 w-3.5 mr-2" /> Pretoria Hub
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Accounting, Tax & Bookkeeping Services in Pretoria
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Professional financial support for Pretoria-based SMEs, professionals, and growing companies. Digital efficiency with local understanding.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="location_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">Speak to an Accountant <ArrowRight className="ml-2 h-4 w-4" /></Button>
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
                            <h2 className="text-3xl font-bold mb-6">Supporting Pretoria&apos;s Business Landscape</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                From the Innovation Hub to Brooklyn&apos;s professional parks, we understand the specific needs of Pretoria&apos;s diverse economy. We provide the structure required for government tenders, funding applications, and steady growth.
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

            {/* 2B. WHY PRETORIA BUSINESSES NEED STRUCTURE (Local Context) */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="mb-10 text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Why Pretoria Businesses Need Structured Accounting</h2>
                        <p className="text-text-secondary leading-relaxed">
                            Pretoria&apos;s economy is unique—a mix of government suppliers, professional services, and growing SMEs. The financial challenges here are specific.
                        </p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "VAT & Compliance Discipline", desc: "For government tenders and corporate contracts, your Tax Clearance status is non-negotiable. We keep you green." },
                            { title: "Cash Flow Management", desc: "Startups in Menlyn and professionals in Brooklyn often face delayed payments. We help you forecast and manage the gap." },
                            { title: "Reporting for Tenders", desc: "When opportunities arise, you need clean Financial Statements immediately, not in 3 weeks. We keep you audit-ready." }
                        ].map((item, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="p-6 rounded-xl bg-surface border border-border/50 h-full">
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
                        <h2 className="text-3xl font-bold mb-4">Core Services for Pretoria Businesses</h2>
                        <p className="text-text-secondary">Specialized financial hubs to manage every aspect of your compliance and reporting.</p>
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

            {/* 3B. PRETORIA INDUSTRIES */}
            <SectionWrapper variant="base" padding="lg">
                <Container>
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold mb-4">Specialized for Pretoria&apos;s Economy</h2>
                        <p className="text-text-secondary">Tailored support for the capital&apos;s key sectors.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Medical Practices", desc: "For doctors in Arcadia & Groenkloof", icon: Stethoscope, href: "/industries/medical-professionals" },
                            { name: "Engineering Consultants", desc: "For firms in Silverton & Waltloo", icon: HardHat, href: "/industries/engineering-consultants" },
                            { name: "Legal Attorneys", desc: "Trust account audits for Brooklyn firms", icon: Gavel, href: "/industries/legal-attorneys" }
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

            {/* 4. PROCESS */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                        <p className="text-text-secondary">A streamlined onboarding process designed for busy owners.</p>
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
                                    <Globe className="h-6 w-6 text-accent" /> Pretoria Service Areas
                                </h2>
                                <p className="text-text-secondary leading-relaxed">
                                    We provide digital accounting services to businesses across the entire Tshwane metropolitan area.
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

            {/* 6. WHY CHOOSE CREATIONS */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <MotionWrapper>
                            <h2 className="text-3xl font-bold mb-6">Why Choose Creations Accounting in Pretoria</h2>
                            <p className="text-text-secondary mb-6 leading-relaxed">
                                We combine the personal touch of a local partner with the efficiency of a modern <Link href="/services/accounting" className="text-accent hover:underline">digital accounting firm</Link>. No more chasing your accountant for basic reports.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Specialized understanding of Service & Professional industries",
                                    "Deep knowledge of CIPC & SARS compliance triggers",
                                    "Proactive communication (we call you)",
                                    "Fixed monthly fees – no hourly billing surprises"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Shield className="h-3 w-3 text-accent" />
                                        </div>
                                        <span className="text-text-primary font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="relative">
                            <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-3xl" />
                            <div className="relative bg-background border border-border rounded-xl p-8 shadow-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-full bg-surface-elevated flex items-center justify-center border border-border">
                                        <Users className="h-6 w-6 text-text-muted" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">Partner-Led Service</div>
                                        <div className="text-xs text-text-secondary uppercase">Not just an algorithm</div>
                                    </div>
                                </div>
                                <p className="text-text-secondary italic">
                                    &quot;We needed an accountant who understood the Pretoria market but operated with Silicon Valley efficiency. Creations delivered exactly that.&quot;
                                </p>
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 7. FAQ */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Questions from Pretoria Business Owners</h2>
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

            {/* 8. INTERNAL LINKING BLOCK (SEO) */}
            <SectionWrapper variant="base" padding="md" className="border-t border-border/40">
                <Container>
                    <div className="flex flex-col gap-6 text-sm">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border/50 pb-4">
                            <div className="text-text-secondary font-medium min-w-[200px]">Pretoria Services:</div>
                            <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-end">
                                <Link href="/locations/pretoria/accounting" className="text-text-muted hover:text-accent transition-colors">Accounting</Link>
                                <Link href="/locations/pretoria/tax" className="text-text-muted hover:text-accent transition-colors">Tax Services</Link>
                                <Link href="/locations/pretoria/bookkeeping" className="text-text-muted hover:text-accent transition-colors">Bookkeeping</Link>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-text-secondary font-medium min-w-[200px]">Nearby Hubs:</div>
                            <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-end">
                                <Link href="/locations/johannesburg" className="text-text-muted hover:text-accent transition-colors">Johannesburg Hub</Link>
                                <Link href="/locations/centurion" className="text-text-muted hover:text-accent transition-colors">Centurion Hub</Link>
                                <Link href="/services/accounting" className="text-text-muted/60 hover:text-accent transition-colors border-l border-border pl-4">National Services</Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 9. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            {/* Decorative background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Pretoria Accountant?</h2>
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
            </SectionWrapper>
        </div >
    )
}
