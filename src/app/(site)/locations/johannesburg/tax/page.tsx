import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Scale, CheckCircle2, ShieldCheck, FileSignature, Globe } from "lucide-react"
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
    title: "Tax Services Johannesburg | SARS Specialists",
    description: "Johannesburg tax practitioners specializing in corporate tax, VAT disputes, and tax clearance for tenders. Expert support for Sandton and CBD businesses.",
    canonical: "/locations/johannesburg/tax"
})

const services = [
    "Corporate Income Tax (ITR14)",
    "VAT Registration (Voluntary & Mandatory)",
    "Tax Clearance (Good Standing & Foreign Investment)",
    "SARS Dispute Resolution",
    "Import/Export Tax Compliance"
]

const faqs = [
    {
        question: "Can you help with Import/Export VAT?",
        answer: "Yes. Many JHB businesses import goods. We handle the complex VAT claim codes for customs VAT paid (AT) to ensure you get your refunds."
    },
    {
        question: "I need a Tax Clearance for a Tender. How fast?",
        answer: "If your account is clean, we can issue it same-day. If you have outstanding returns, we can fast-track the submission to get you compliant ASAP."
    },
    {
        question: "Do you handle foreign income for expats?",
        answer: "Yes. We work with many JHB professionals who are earning foreign income or emigrating, handling the Section 10(1)(o)(ii) exemptions and AIT processes."
    }
]

export default function JohannesburgTaxPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Tax Services Johannesburg",
        description: "Professional tax services for businesses in Johannesburg.",
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
            { "@type": "ListItem", position: 4, name: "Tax", item: "https://creations.co.za/locations/johannesburg/tax" }
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
                                    <Scale className="h-3.5 w-3.5 mr-2" /> Johannesburg Tax Practitioners
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Complex Tax Solutions for JHB Companies
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Navigating the complexities of SARS for importers, exporters, and high-growth entities. We keep your tax status compliant.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="jhb_tax_hero">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base">
                                        Secure Tax Compliance <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Expertise Where it Matters</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Johannesburg is the trade hub of Africa. This brings specific tax challenges: customs VAT, Place of Supply rules, and cross-border withholding tax. We are specialists in these areas.
                            </p>
                            <ul className="space-y-3">
                                {services.map((item, i) => (
                                    <li key={i} className="flex items-center text-text-primary">
                                        <CheckCircle2 className="h-5 w-5 text-accent mr-3 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2}>
                            <Card className="bg-background border-border p-8">
                                <h3 className="font-bold text-xl mb-4">SARS at your Door?</h3>
                                <p className="text-text-secondary mb-6">
                                    Whether it's a routine verification or a deep audit, we manage the interaction with SARS professionally to protect your business.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <ShieldCheck className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">Audit Defense</div>
                                    </div>
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <Globe className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">Trade Tax</div>
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
                    <h2 className="text-3xl font-bold mb-8 text-center">JHB Tax FAQs</h2>
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
                    <h2 className="text-3xl font-bold mb-6">Stay Compliant. Stay In Business.</h2>
                    <QuoteLink eventLabel="jhb_tax_bottom">
                        <Button variant="glow" size="lg" className="h-14 px-10">
                            Book Tax Consultation
                        </Button>
                    </QuoteLink>
                </Container>
            </SectionWrapper>
        </div>
    )
}
