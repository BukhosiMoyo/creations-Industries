import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Eraser, AlertOctagon, Archive, ShieldOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { IconList } from "@/components/ui/icon-list"
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
    title: "Company Deregistration Service | Close a CIPC Company",
    description: "Formally close your South African company. We handle the voluntary deregistration process with CIPC and SARS to stop administrative duties.",
    canonical: "/services/company-services/company-deregistration"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Formal application for Voluntary Deregistration",
    "Removal of Directors' liability for future returns",
    "Confirmation of ceased trading status",
    "Deregistration of Income Tax number (via SARS)",
    "Final closure certificate"
]

const processSteps = [
    { step: 1, title: "Tax Clearance", description: "You cannot deregister if you owe SARS money. We check your tax status first." },
    { step: 2, title: "Letter of Request", description: "We draft the formal request letter on your company letterhead, confirming the company has no assets or liabilities." },
    { step: 3, title: "CIPC Lodgement", description: "We submit the deregistration request. CIPC will advertise the closure for objections." },
    { step: 4, title: "Final Closure", description: "After the advertisement period, CIPC changes the status to 'Final Deregistered'." }
]

const faqs = [
    {
        question: "Does deregistration clear my debt?",
        answer: "No. You cannot deregister a company to hide from creditors. If CIPC finds out you have debts, they will reject the application or creditors can apply to reinstate it."
    },
    {
        question: "What happens to the bank account?",
        answer: "You must close the bank account BEFORE deregistration. If you deregister while money is in the account, the bank is legally required to freeze it and send the funds to the State."
    },
    {
        question: "Can I use the name again?",
        answer: "Once final deregistered, the name becomes available to the public again after a certain period. You lose the rights to the trademark."
    },
    {
        question: "How long does it take?",
        answer: "It is a slow process. CIPC requires a minimum advertisement period to allow creditors to object. It typically takes 3-6 months for final status."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function DeregistrationPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Company Deregistration Service",
        description: "Official Company Closure Service.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.africa"
        },
        areaServed: {
            "@type": "Country",
            name: "South Africa"
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Company Services", item: "https://creations.africa/services/company-services" },
            { "@type": "ListItem", position: 4, name: "Deregistration", item: "https://creations.africa/services/company-services/company-deregistration" }
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
                                <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1 text-sm text-red-500 mb-6 font-medium">
                                    <Eraser className="h-3.5 w-3.5 mr-2" /> Company Closure
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-red-500 mb-6 leading-[1.1]">
                                    Formal Deregistration Services
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Closing a business? Do it correctly. We handle the formal winding down process with CIPC and SARS to ensure no future liabilities haunt you.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="dereg_hero_cta">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto border-red-500/30 hover:border-red-500 hover:text-red-500 hover:bg-red-500/5">
                                        Close Company <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                                <Link href="/services/company-services">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">
                                        Back to Services
                                    </Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. VALUE SUMMARY */}
            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <MotionWrapper className="lg:col-span-5">
                            <h2 className="text-3xl font-bold mb-6">Clean Break</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Leaving a company "dormant" without filing returns racks up penalties. The only way to stop the administrative burden is to formally deregister it.
                            </p>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-7">
                            <IconList
                                items={valueSummary}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                itemClassName="p-4 rounded-xl bg-background border border-border/50 hover:border-red-500/30 transition-all flex items-center gap-3"
                                iconClassName="h-5 w-5 text-red-500 shrink-0"
                            />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. DEEP EXPLANATION */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Risks of Improper Closure</h2>
                        <p className="text-text-secondary">Walking away is not enough.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <AlertOctagon className="h-10 w-10 text-red-500 mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Accruing Penalties</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Every month a company exists, it may be liable for nil tax returns and annual returns. These fines accumulate against the directors personally in some cases.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <ShieldOff className="h-10 w-10 text-red-500 mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Identity Fraud</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Dormant companies are targets for fraudsters who use them to open accounts or apply for loans. Deregistration removes the entity from the active register.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Archive className="h-10 w-10 text-red-500 mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Finality</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        It allows you to mentally and legally move on to your next venture without the baggage of an old structure hanging over you.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 4. PROCESS */}
            <SectionWrapper padding="lg" variant="surface" showLineGrid>
                <Container>
                    <MotionWrapper className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">The Closure Process</h2>
                        <p className="text-text-secondary">We manage the bureaucracy.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="relative pl-6 border-l-2 border-border/50 group hover:border-red-500 transition-colors pb-2">
                                    <div className="text-xs uppercase font-bold text-red-500 mb-1">Step {step.step}</div>
                                    <h3 className="text-base font-bold mb-2 group-hover:text-red-500 transition-colors">{step.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* FAQs */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Questions about Closing Down</h2>
                    </MotionWrapper>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-background px-4">
                                <AccordionTrigger className="font-semibold text-text-primary hover:text-red-500 hover:no-underline py-4 text-left">
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

            {/* 8. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Need to close down?</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Let's handle it professionally so you can move forward.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="dereg_bottom_cta">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto border-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/20">
                                            Start Deregistration
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/company-services">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Cancel
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
