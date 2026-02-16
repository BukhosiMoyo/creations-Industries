import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calculator, CheckCircle2, Building2, TrendingUp, Users } from "lucide-react"
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

export const metadata: Metadata = constructMetadata({
    title: "Accounting Services Centurion | Business Accountants",
    description: "Centurion-based accounting services for growing businesses. Monthly management accounts, financial statements, and strategic advice for local companies.",
    canonical: "/locations/centurion/accounting"
})

const features = [
    "Monthly Management Accounts",
    "Annual Financial Statements (AFS)",
    "CIPC Annual Returns",
    "Payroll Administration",
    "Cloud Accounting Setup (Xero/Sage)"
]

const faqs = [
    {
        question: "Do you only work with Centurion businesses?",
        answer: "While we are experts in the Centurion market and its specific industries (logistics, tech, retail), our digital-first approach allows us to serve clients nationwide."
    },
    {
        question: "How much do your services cost?",
        answer: "We work on a fixed monthly retainer model, tailored to your transaction volume and complexity. This means no surprise bills at the end of the month."
    },
    {
        question: "Can you handle my previous year's backlog?",
        answer: "Yes. We have a dedicated 'catch-up' team that can process months or years of backlog to get you compliant and up to date fast."
    }
]

export default function CenturionAccountingPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Accounting Services Centurion",
        description: "Professional accounting services for businesses in Centurion.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.co.za"
        },
        areaServed: {
            "@type": "City",
            name: "Centurion"
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Locations", item: "https://creations.co.za/locations" },
            { "@type": "ListItem", position: 3, name: "Centurion", item: "https://creations.co.za/locations/centurion" },
            { "@type": "ListItem", position: 4, name: "Accounting", item: "https://creations.co.za/locations/centurion/accounting" }
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
                                    <Calculator className="h-3.5 w-3.5 mr-2" /> Centurion Accounting Firm
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Expert Accounting Services in Centurion
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    From startups in Technopark to established logistics firms in Hennopspark, we provide the financial clarity required to scale.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="centurion_acc_hero">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base">
                                        Get Accounting Help <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Local Business Insight</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                We don't just crunch numbers. We understand the Centurion business landscape. Whether you are dealing with fleet management compliance or estate-based consulting regulations, our accounting packs are tailored to your sector.
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
                                <h3 className="font-bold text-xl mb-4">Why Local Matters</h3>
                                <p className="text-text-secondary mb-6">
                                    Even in a digital world, understanding local economic conditions, labor markets, and compliance pressures gives us an edge in advising you.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <Building2 className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">SME Specialist</div>
                                    </div>
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">Growth Focus</div>
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
                    <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
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
                    <h2 className="text-3xl font-bold mb-6">Ready to Streamline?</h2>
                    <QuoteLink eventLabel="centurion_acc_bottom">
                        <Button variant="glow" size="lg" className="h-14 px-10">
                            Book Your Consultation
                        </Button>
                    </QuoteLink>
                </Container>
            </SectionWrapper>
        </div>
    )
}
