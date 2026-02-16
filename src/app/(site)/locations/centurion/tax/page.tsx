import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Scale, CheckCircle2, FileCheck, ShieldAlert, BadgeCent } from "lucide-react"
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
    title: "Tax Services Centurion | SARS Compliance Support",
    description: "Centurion tax practitioners offering VAT, PAYE, and Income Tax filing. Expert handling of SARS disputes and tax clearance for local businesses.",
    canonical: "/locations/centurion/tax"
})

const services = [
    "Corporate Income Tax (ITR14)",
    "VAT Registration & Filing",
    "PAYE / EMP201 Returns",
    "Tax Clearance Certificates",
    "Provisional Tax (IRP6)"
]

const faqs = [
    {
        question: "How do I get a Tax Clearance Certificate in Centurion?",
        answer: "We handle the entire process online via eFiling. If your tax affairs are up to date, we can issue your PIN instantly. If not, we help you fix the non-compliance first."
    },
    {
        question: "can you help with VAT audits?",
        answer: "Yes. SARS audits are common for high-volume traders. We organize your invoices and submit the correct supporting documents to resolve the audit quickly."
    },
    {
        question: "Do you help with personal tax for directors?",
        answer: "Yes, we believe in a holistic approach. We handle both the company tax and the personal tax of the directors to ensure overall tax efficiency."
    }
]

export default function CenturionTaxPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Tax Services Centurion",
        description: "Professional tax services for businesses in Centurion.",
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
            { "@type": "ListItem", position: 4, name: "Tax", item: "https://creations.co.za/locations/centurion/tax" }
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
                                    <Scale className="h-3.5 w-3.5 mr-2" /> Centurion Tax Practitioners
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Reliable Tax Services for Centurion Companies
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Stop worrying about SARS. We handle your returns, audits, and compliance so you can focus on building your business.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="centurion_tax_hero">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base">
                                        Get Tax Compliant <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Proactive Tax Management</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                We stay ahead of SARS deadlines. From bi-monthly VAT to annual corporate returns, our systems ensure you never miss a submission or a valid deduction.
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
                                <h3 className="font-bold text-xl mb-4">SARS Audit Defense</h3>
                                <p className="text-text-secondary mb-6">
                                    Centurion businesses, especially in logistics and contracting, are often targeted for verification. We are your shield.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <ShieldAlert className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">Audit Ready</div>
                                    </div>
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <BadgeCent className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">Penalty Free</div>
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
                    <h2 className="text-3xl font-bold mb-8 text-center">Tax FAQs</h2>
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
                    <h2 className="text-3xl font-bold mb-6">Peace of Mind with SARS</h2>
                    <QuoteLink eventLabel="centurion_tax_bottom">
                        <Button variant="glow" size="lg" className="h-14 px-10">
                            Book Tax Consultation
                        </Button>
                    </QuoteLink>
                </Container>
            </SectionWrapper>
        </div>
    )
}
