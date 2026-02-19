import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Gavel, ShieldAlert, Scale, FileSignature, AlertTriangle, Building2 } from "lucide-react"
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
import { TestimonialCard } from "@/components/trust/testimonial-card"
import { TrustBlock } from "@/components/trust/trust-block"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "SARS Penalties, Objections & Tax Dispute Resolution",
    description: "Expert assistance with SARS penalties and tax disputes. We handle VDP applications, objections, appeals, and debt compromise negotiations.",
    canonical: "/services/tax/sars-penalties-disputes"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Negotiation of penalty waivers (Remission of Penalties)",
    "Formal Objections & Appeals against incorrect SARS assessments",
    "Voluntary Disclosure Programme (VDP) applications",
    "Debt Compromise & Deferment of Payment arrangements",
    "Representation of your case by experienced tax practitioners"
]

const processSteps = [
    { step: 1, title: "Case Assessment", description: "We analyze the timeline of events. Why was the penalty raised? Is SARS correct in law? What are your chances of success?" },
    { step: 2, title: "Drafting the Argument", description: "We draft a formal Request for Remission or Objection, citing specific sections of the Tax Administration Act." },
    { step: 3, title: "Submission & Tracking", description: "We submit via the correct eFiling channels. These cases can stall, so we follow up relentlessly." },
    { step: 4, title: "Outcome Management", description: "If successful, the debt is removed. If denied, we advise on the next step (Appeal or ADR)." }
]

const useCases = [
    {
        title: "The Late Filer",
        desc: "Hit with thousands in administrative penalties for old dormant returns. We help prove dormancy to get penalties waived."
    },
    {
        title: "The Audited Business",
        desc: "SARS disallowed a valid expense and issued an additional assessment. We lodge an objection with proof."
    },
    {
        title: "The VDP Candidate",
        desc: "Has never declared foreign income or a side business. Wants to come clean before SARS finds out, to avoid criminal prosecution."
    }
]

const faqs = [
    {
        question: "Can I get my penalties waived?",
        answer: "Yes, but only for valid reasons. 'I forgot' or 'I didn't have money' are not valid. Valid reasons include serious illness, system errors, or external factors beyond your control. We know how to frame these arguments."
    },
    {
        question: "What is the VDP (Voluntary Disclosure Programme)?",
        answer: "It is a 'amnesty' mechanism where you approach SARS to confess unpaid taxes BEFORE they audit you. In exchange, they waive criminal prosecution and most penalties. You only pay the tax and interest."
    },
    {
        question: "I can't pay my full tax debt. What now?",
        answer: "We can apply for a 'Deferment of Payment' (paying in installments over 6-12 months) or a 'Compromise of Tax Debt' (where SARS writes off a portion of the debt because you are effectively insolvent). These are complex applications but can save a business."
    },
    {
        question: "How long do I have to object?",
        answer: "Strictly 30 days from the date of the assessment. If you miss this, you must apply for 'Condonation', explaining why you are late. Time is of the essence."
    },
    {
        question: "Does SARS listen to objections?",
        answer: "Yes, if they are legally sound. We find that many objections fail because they are emotional rather than factual. We stick to the facts and the Tax Act."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function PenaltiesPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Tax Dispute Resolution South Africa",
        description: "SARS penalty negotiation and tax dispute resolution services.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.africa"
        },
        areaServed: {
            "@type": "Country",
            name: "South Africa"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Dispute Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Penalty Remission" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Objections" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "VDP Application" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Tax Support", item: "https://creations.africa/services/tax" },
            { "@type": "ListItem", position: 4, name: "Penalties & Disputes", item: "https://creations.africa/services/tax/sars-penalties-disputes" }
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
                                    <Gavel className="h-3.5 w-3.5 mr-2" /> Tax Dispute Resolution
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    SARS Penalties, Objections & Tax Dispute Resolution
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Facing a massive tax bill or unfair penalty? Don't panic. We use the Tax Administration Act to defend your rights and negotiate with SARS.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="dispute_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                                        Help Me With SARS <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </QuoteLink>
                                <Link href="/services/tax">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">
                                        Back to Tax
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
                            <h2 className="text-3xl font-bold mb-6">Know Your Rights</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                SARS makes mistakes. Assessments are often automated and can be incorrect. You have the legal right to Object, Appeal, and request reasons for any decision SARS makes. We are your advocates in this process.
                            </p>
                            <Link href="/services/tax/tax-clearance-certificates">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need clearance urgently? See Tax Clearance <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-7">
                            <IconList
                                items={valueSummary}
                                className="grid grid-cols-1 gap-4"
                                itemClassName="p-4 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-all flex items-center gap-3"
                                iconClassName="h-5 w-5 text-accent shrink-0"
                            />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. DEEP EXPLANATION */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Your Defense Strategy</h2>
                        <p className="text-text-secondary">We choose the right legal instrument for your situation.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <ShieldAlert className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Penalty Remission</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Administrative penalties are often levied for "non-compliance". If we can prove the non-compliance was unintentional (e.g., accountant negligence, illness), we can often get 100% of these waived.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Scale className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Objection & Appeal</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        If SARS says you owe tax and you disagree, we file an Objection (NOO). If they disallow that, we file an Appeal to the Tax Court. This formal process pauses debt collection for the disputed amount.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileSignature className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">VDP Amnesty</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        The Voluntary Disclosure Programme is a powerful tool. If you have "skeletons in the closet", VDP allows you to confess them cleanly, paying only the capital tax and interest, with zero criminal charges.
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
                        <h2 className="text-3xl font-bold mb-4">The Resolution Path</h2>
                        <p className="text-text-secondary">A structured legal process to solvency.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="relative pl-6 border-l-2 border-border/50 group hover:border-accent transition-colors pb-2">
                                    <div className="text-xs uppercase font-bold text-accent mb-1">Step {step.step}</div>
                                    <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5. USE CASES */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Common Disputes</h2>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="bg-surface/50 border-border/50 hover:border-accent/30 transition-all h-full">
                                    <CardContent className="p-6">
                                        <AlertTriangle className="h-8 w-8 text-accent/50 mb-4" />
                                        <h3 className="font-bold text-lg mb-2">{useCase.title}</h3>
                                        <p className="text-sm text-text-secondary">{useCase.desc}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 6. TRUST BLOCK */}
            <TrustBlock />

            {/* 7. FAQs */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
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

            {/* 8. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Solve Your SARS Issues</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Silence is the worst response. Let us engage SARS professionally to resolve your dispute and restore your peace of mind.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="dispute_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Contact Dispute Team
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/tax">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Back to Tax Services
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
