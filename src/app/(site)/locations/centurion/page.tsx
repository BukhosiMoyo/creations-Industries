import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin, Building2, Truck, Wifi, Home, Briefcase, Calculator, Scale, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { QuoteLink } from "@/components/common/quote-link"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Service, WithContext, BreadcrumbList, FAQPage, AccountingService } from "schema-dts"
import { TrustBlock } from "@/components/trust/trust-block"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

const suburbs = [
    "Centurion Central",
    "Midstream Estate",
    "Hennopspark",
    "Rooihuiskraal",
    "Irene",
    "Lyttelton",
    "Highveld",
    "Pierre van Ryneveld",
    "Eldoraigne",
    "Wierdapark"
]

const services = [
    {
        title: "Accounting Services",
        desc: "Monthly management packs and financial oversight for decision making.",
        icon: Calculator,
        href: "/locations/centurion/accounting"
    },
    {
        title: "Tax Services",
        desc: "VAT, PAYE, and Provisional Tax optimization for companies and trusts.",
        icon: Scale,
        href: "/locations/centurion/tax"
    },
    {
        title: "Bookkeeping",
        desc: "Daily processing to keep your records spotless and audit-ready.",
        icon: FileText,
        href: "/locations/centurion/bookkeeping"
    },
    {
        title: "Company Services",
        desc: "New company registrations, director amendments, and CIPC annual returns.",
        icon: Building2,
        href: "/services/company-services"
    }
]

const faqs = [
    {
        question: "Do you come to my office in Midstream/Estate?",
        answer: "We are a digital-first firm, which suits the security access of estates perfectly. We meet via Teams/Zoom, saving you the hassle of signing us in, while keeping fees efficient and response times fast."
    },
    {
        question: "Do you understand the logistics/transport sector?",
        answer: "Yes. We know the specific pain points: fuel rebates, vehicle financing, labor compliance, and high-volume VAT transactions common in the Hennopspark and Route 21 areas."
    },
    {
        question: "I'm a contractor at a large tech firm. Can you help?",
        answer: "Absolutely. We manage personal tax and provisional tax for high-income independent contractors, a common profile in the Techno Park and Highveld areas."
    },
    {
        question: "How do I switch accountants?",
        answer: "It's seamless. We handle the handover process, contacting your previous accountant to retrieve your files, eFiling profiles, and historical data. You don't have to have the awkward conversation."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function CenturionPage() {
    // Schema
    const jsonLd: WithContext<Place> = {
        "@context": "https://schema.org",
        "@type": "Place",
        name: "Creations Accounting Centurion",
        description: "Professional accounting and tax services for Centurion businesses.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Centurion",
            addressRegion: "Gauteng",
            addressCountry: "ZA"
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: -25.8603,
            longitude: 28.1894
        },
        url: "https://creations.co.za/locations/centurion"
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
                                    <MapPin className="h-3.5 w-3.5 mr-2" /> Serving Centurion Businesses
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Accounting, Tax & Bookkeeping Services in Centurion
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    High-performance financial support for Centurion’s fastest-growing businesses. Digital efficiency with deep local understanding.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="centurion_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Speak to an Accountant <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                                <Link href="#services">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">
                                        View Local Services
                                    </Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. SERVICES GRID */}
            <SectionWrapper id="services" padding="lg" variant="surface" showDotGrid>
                <Container>
                    <MotionWrapper className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Core Services for Centurion</h2>
                        <p className="text-text-secondary">Tailored financial solutions for the local market.</p>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((service, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Link href={service.href} className="group block h-full">
                                    <Card className="h-full bg-background border-border/50 hover:border-accent/50 transition-all hover:shadow-lg">
                                        <CardContent className="p-8 flex flex-col items-center text-center h-full">
                                            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <service.icon className="h-6 w-6 text-accent" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                                            <p className="text-text-secondary text-sm mb-6 flex-grow">{service.desc}</p>
                                            <div className="text-accent text-sm font-medium flex items-center">
                                                Learn More <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. LOCAL CONTEXT */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <MotionWrapper>
                            <h2 className="text-3xl font-bold mb-6">Financial Agility for a Fast-Moving Hub</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Centurion isn't just a commuter city anymore; it's a powerhouse of logistics, technology, and residential wealth. We understand the unique dynamics of doing business here.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-border">
                                        <Truck className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Logistics & Transport</h3>
                                        <p className="text-sm text-text-secondary">Managing fleet costs, VAT audits on fuel, and labor compliance for Hennopspark and Route 21 businesses.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-border">
                                        <Home className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Estate Living, Global Business</h3>
                                        <p className="text-sm text-text-secondary">For the consultant working from Midstream but billing internationally – we handle the cross-border tax complexity.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-border">
                                        <Wifi className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Rapid Scaling</h3>
                                        <p className="text-sm text-text-secondary">Centurion businesses grow fast. You need cloud systems (Xero/Sage) that scale without breaking.</p>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="relative">
                            <div className="aspect-square rounded-3xl bg-surface border border-border p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                                <h3 className="font-bold text-lg mb-6 relative z-10">Areas We Serve</h3>
                                <div className="grid grid-cols-2 gap-3 relative z-10">
                                    {suburbs.map((suburm, i) => (
                                        <div key={i} className="flex items-center text-sm text-text-secondary bg-background/50 p-2 rounded border border-border/50">
                                            <MapPin className="h-3 w-3 text-accent mr-2" /> {suburm}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 relative z-10">
                                    <Link href="/locations/pretoria">
                                        <Button variant="outline" className="w-full border-dashed">
                                            Also view Pretoria Services
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 4. TRUST BLOCK */}
            <TrustBlock />

            {/* 5. FAQs */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Centurion FAQs</h2>
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

            {/* 6. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Local Presence. Global Standards.</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get an accounting partner that moves at the speed of Centurion. Book your digital consultation today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="centurion_cta_bottom">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Book Consultation
                                        </Button>
                                    </QuoteLink>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                </Container>
            </SectionWrapper>
        </div>
    )
}
