import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, CheckCircle2, TrendingUp, Store, ShoppingBag } from "lucide-react"
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
    title: "Bookkeeping Services Johannesburg | E-commerce & Retail",
    description: "High-volume bookkeeping for Johannesburg retailers and e-commerce stores. We automate Shopify/WooCommerce integration with Xero for seamless financial data.",
    canonical: "/locations/johannesburg/bookkeeping"
})

const services = [
    "E-commerce Sales Integration (Shopify/Woo)",
    "High-Volume Transaction Processing",
    "Supplier Invoice Automation (Dext)",
    "Payment Gateway Reconciliation (PayFast/Yoco)",
    "VAT Output Reconciliation"
]

const faqs = [
    {
        question: "Do you only work with online stores?",
        answer: "No, but we specialize in them because they are common in JHB. We also support brick-and-mortar retail, hospitality, and professional services."
    },
    {
        question: "How do you handle my PayFast/Yoco fees?",
        answer: "We automate the split. We verify the gross sale, the fee deduction, and the net payout to your bank, ensuring your VAT is 100% accurate."
    },
    {
        question: "Can I keep my current invoicing system?",
        answer: "Usually yes. If you use a POS or a specific industry tool, we can often integrate it into Xero so you don't have to change your operations."
    }
]

export default function JohannesburgBookkeepingPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Bookkeeping Services Johannesburg",
        description: "Professional bookkeeping services for businesses in Johannesburg.",
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
            { "@type": "ListItem", position: 4, name: "Bookkeeping", item: "https://creations.co.za/locations/johannesburg/bookkeeping" }
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
                                    <FileText className="h-3.5 w-3.5 mr-2" /> High-Volume Bookkeepers JHB
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Bookkeeping for High-Transaction Business
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    From high-street retail in Sandton to e-commerce warehouses in the South. We handle volume without breaking a sweat.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="jhb_bk_hero">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base">
                                        Automate Transactions <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Retail & E-commerce Specialists</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Johannesburg is the shopping capital of Africa. We understand the unique challenges of retail bookkeeping: cash drops, card fees, inventory syncing, and platform payouts.
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
                                <h3 className="font-bold text-xl mb-4">Volume without Errors</h3>
                                <p className="text-text-secondary mb-6">
                                    Using Dext and simple bank feeds, we can process thousands of line items a month with 99.9% accuracy.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <ShoppingBag className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">E-commerce</div>
                                    </div>
                                    <div className="p-4 bg-surface rounded-lg border border-border/50 text-center">
                                        <Store className="h-6 w-6 text-accent mx-auto mb-2" />
                                        <div className="font-bold">Retail</div>
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
                    <h2 className="text-3xl font-bold mb-8 text-center">JHB Bookkeeping FAQs</h2>
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
                    <h2 className="text-3xl font-bold mb-6">Stop Manual Data Entry</h2>
                    <QuoteLink eventLabel="jhb_bk_bottom">
                        <Button variant="glow" size="lg" className="h-14 px-10">
                            Get Cloud Bookkeeping
                        </Button>
                    </QuoteLink>
                </Container>
            </SectionWrapper>
        </div>
    )
}
