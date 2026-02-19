import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Building2, FileSignature, RefreshCw, Eraser, ShieldCheck, FileCheck, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { QuoteLink } from "@/components/common/quote-link"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Service, WithContext, BreadcrumbList, FAQPage } from "schema-dts"
import { TrustBlock } from "@/components/trust/trust-block"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Company Secretarial Services | CIPC Registration & Maintenance",
    description: "Full-service company secretarial support. We handle New Company Registrations (Pty Ltd), Director Amendments, Annual Returns, and Share Certificates.",
    canonical: "/services/company-services"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const services = [
    {
        title: "New Company Registration",
        description: "Get your Pty Ltd registered in 24-48 hours. Includes name reservation, MOI, and Income Tax number.",
        icon: Building2,
        href: "/services/company-services/company-registration"
    },
    {
        title: "Shelf Companies",
        description: "Buy a pre-registered company. Immediate trading authority and tax number included.",
        icon: Building2,
        href: "/services/company-services/shelf-companies"
    },
    {
        title: "Director Amendments",
        description: "Add or remove directors instantly. We handle the CIPC updates and minutes of meetings.",
        icon: FileSignature,
        href: "/services/company-services/company-amendments"
    },
    {
        title: "Annual Returns Filing",
        description: "Mandatory yearly filing to keep your company active. We prevent CIPC deregistration.",
        icon: RefreshCw,
        href: "/services/company-services/annual-returns-filing"
    },
    {
        title: "Deregistration",
        description: "Formally close a dormant company to stop accruing penalties and administrative duties.",
        icon: Eraser,
        href: "/services/company-services/company-deregistration"
    }
]

const faqs = [
    {
        question: "How long does it take to register a company?",
        answer: "Typically 24 to 48 hours after name reservation approval. CIPC has become much faster, provided all director ID documents are certified correctly. (Need it faster? Buy a Shelf Company).",
        answerRich: <>Typically 24 to 48 hours after name reservation approval. CIPC has become much faster, provided all director ID documents are certified correctly. (Need it faster? Buy a <Link href="/services/company-services/shelf-companies" className="text-accent hover:underline">Shelf Company</Link>).</>
    },
    {
        question: "What happens if I don't file Annual Returns?",
        answer: "CIPC will assume the company is inactive and will start the 'Administrative Deregistration' process. Once deregistered, your bank accounts will be frozen and you lose the right to trade."
    },
    {
        question: "Do you issue Share Certificates?",
        answer: "Yes. CIPC does NOT issue share certificates; they only register the company. A share certificate is a legal document we create for you to prove ownership."
    },
    {
        question: "Can I be the only director?",
        answer: "Yes, a Pty Ltd can have a single director who is also the single shareholder."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function CompanyServicesPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Company Secretarial Services South Africa",
        description: "CIPC Company Registration and Maintenance Services.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.africa"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Company Services",
            itemListElement: services.map(s => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: s.title
                }
            }))
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Company Services", item: "https://creations.africa/services/company-services" }
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
                                    <Layers className="h-3.5 w-3.5 mr-2" /> CIPC & Secretarial Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Company Registration & Maintenance
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Professional handling of your legal entity. From the birth of your company (Registration) to its ongoing compliance (Annual Returns).
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="company_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Register a Company <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. SERVICES GRID */}
            <SectionWrapper id="services" padding="lg" variant="surface" showDotGrid>
                <Container>
                    <MotionWrapper className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Manage Your Entity</h2>
                        <p className="text-text-secondary">Official CIPC liaison services.</p>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {services.map((service, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Link href={service.href} className="block h-full cursor-pointer group">
                                    <Card className="h-full bg-background border-border/50 hover:border-accent/40 hover:shadow-lg transition-all">
                                        <CardContent className="p-8 flex flex-col items-center text-center h-full">
                                            <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <service.icon className="h-7 w-7 text-accent" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                                            <p className="text-text-secondary leading-relaxed mb-6 flex-grow">{service.description}</p>
                                            <div className="text-accent font-medium flex items-center text-sm">
                                                View Details <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. VALUE PROP */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <ShieldCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">100% Legally Compliant</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        We ensure your MOI (Memorandum of Incorporation) aligns with the Companies Act, protecting shareholders and directors from future disputes.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Tax Ready</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        A CIPC registration is just the start. We ensure your Income Tax number is activated instantly so you can start trading and invoicing.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>
                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Layers className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Governance Sorted</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        Share registers, director resolutions, and minutes. The boring paperwork that becomes critical when you want to sell or get funding.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            <TrustBlock />

            {/* 4. FAQ */}
            <SectionWrapper padding="lg" variant="surface">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
                    </MotionWrapper>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-background px-4">
                                <AccordionTrigger className="font-semibold py-4 text-left hover:text-accent hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-text-secondary pb-4">{(faq as any).answerRich || faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Container>
            </SectionWrapper>

            {/* 5. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Business Journey</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Your business deserves a professional foundation. Let's get your company registered and compliant today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="company_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Register Company Now
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
