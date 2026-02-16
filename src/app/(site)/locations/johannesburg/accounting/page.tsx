import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calculator, CheckCircle2, Building2, TrendingUp, Zap, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { QuoteLink } from "@/components/common/quote-link"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Service, WithContext, BreadcrumbList } from "schema-dts"
import { TrustBlock } from "@/components/trust/trust-block"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = constructMetadata({
    title: "Accounting Services Johannesburg | Corporate & SME Accountants",
    description: "Johannesburg's premier accounting firm for agencies, consultancies, and tech startups. We provide management accounts and financial strategy in Sandton and Rosebank.",
    canonical: "/locations/johannesburg/accounting"
})

const features = [
    "Monthly Management Accounts (Board Packs)",
    "Annual Financial Statements (IFRS for SMEs)",
    "CIPC Annual Returns & Governance",
    "Payroll for Distributed Teams",
    "Xero/Sage Cloud Conversion"
]

const faqs = [
    {
        question: "Do you serve corporate clients in Sandton?",
        answer: "Yes. We offer outsourced financial management for companies that have outgrown a bookkeeper but aren't ready for a full-time CFO."
    },
    {
        question: "We are a creative agency in Rosebank. Do you understand project finance?",
        answer: "Absolutely. We help agencies track profitability per project, manage retainer income, and handle freelancer tax compliance."
    },
    {
        question: "Do we need to meet in person?",
        answer: "No. Most of our JHB clients prefer Teams/Zoom calls to avoid traffic. However, we are available for key strategic sessions if required."
    }
]

export default function JohannesburgAccountingPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Accounting Services Johannesburg",
        description: "Professional accounting services for businesses in Johannesburg.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.co.za"
        },
        areaServed: {
            "@type": "City",
            name: "Johannesburg"
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Locations", item: "https://creations.co.za/locations" },
            { "@type": "ListItem", position: 3, name: "Johannesburg", item: "https://creations.co.za/locations/johannesburg" },
            { "@type": "ListItem", position: 4, name: "Accounting", item: "https://creations.co.za/locations/johannesburg/accounting" }
        ]
    }

    return (
        <div className="flex flex-col">
            <JsonLd data={jsonLd} />
            <JsonLd data={breadcrumbs} />

            {/* HERO */}
            <SectionWrapper variant="base" padding="lg" showGlow showReactiveGrid patternIntensity="subtle" className="border-b border-border/40">
                <Container>
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <StaggerChildren className="w-full">
                            <MotionWrapper direction="down" delay={0.1}>
                                <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-6 font-medium">
                                    <Calculator className="h-3.5 w-3.5 mr-2" /> Johannesburg Accountants
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Strategic Accounting for JHB Businesses
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    From Sandton boardrooms to Rosebank studios. We provide the financial data you need to drive growth in South Africa's economic hub.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="jhb_acc_hero">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base">
                                        Get Financial Clarity <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* CONTENT SPLIT */}
            <SectionWrapper padding="lg" variant="surface">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <MotionWrapper>
                            <h2 className="text-3xl font-bold mb-6">Built for fast-paced Industries</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Johannesburg moves fast. Your accounting needs to keep up. We specialize in service-based industries (Legal, Tech, Creative) where agility and cash flow visibility are paramount.
                            </p>
                            <ul className="space-y-3">
                                {features.map((item, i) => (
                                    <li key={i} className="flex items-center text-text-primary">
                                        <CheckCircle2 className="h-5 w-5 text-accent mr-3 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2}>
                            <Card className="bg-background border-border p-8">
                                <h3 className="font-bold text-xl mb-4">The JHB Advantage</h3>
                                <p className="text-text-secondary mb-6">
                                    We leverage the best cloud tools to give you "big firm" capabilities without the "big firm" bureaucracy or fees.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <Building2 className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">Corporate Ready</div>
                                    </div>
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <Zap className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">Fast Turnaround</div>
                                    </div>
                                </div>
                            </Card>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            <TrustBlock />

            {/* FAQ */}
            <SectionWrapper padding="lg" variant="base">
                <Container className="max-w-3xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">JHB Accounting FAQs</h2>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-background px-4">
                                <AccordionTrigger className="font-semibold py-4 text-left hover:text-accent hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-text-secondary pb-4">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Container>
            </SectionWrapper>

            {/* CTA */}
            <SectionWrapper padding="lg" variant="surface" showGlow>
                <Container className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Scale Your Business</h2>
                    <QuoteLink eventLabel="jhb_acc_bottom">
                        <Button variant="glow" size="lg" className="h-14 px-10">
                            Book Strategic Consultation
                        </Button>
                    </QuoteLink>
                </Container>
            </SectionWrapper>
        </div>
    )
}
