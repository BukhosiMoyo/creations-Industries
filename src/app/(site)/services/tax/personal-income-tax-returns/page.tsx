
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, User, Calculator, FileWarning, Building2 } from "lucide-react"
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

export const metadata: Metadata = constructMetadata({
    title: "Personal Income Tax Returns Services (ITR12)",
    description: "Expert personal tax services for individuals, directors, and sole traders. We handle ITR12 submission, provisional tax (IRP6), and SARS disputes.",
    canonical: "/services/tax/personal-income-tax-returns"
})

const valueSummary = [
    "Annual ITR12 Tax Return Submission",
    "Provisional Tax (IRP6) Calculations",
    "Review of Assessments (ITA34) for Errors",
    "Advice on Travel Allowances & Medical Credits",
    "Dispute Resolution for unfair assessments"
]

const processSteps = [
    { step: 1, title: "Data Collection", description: "You send us your IRP5s, medical aid certificates, contracting logbooks, and investment statements (IT3b/c)." },
    { step: 2, title: "Pre-Assessment", description: "We run a calculation *before* filing to see if you owe money or if you're getting a refund. No nasty surprises." },
    { step: 3, title: "Submission", description: "We submit the return to SARS via eFiling. If selected for audit, we upload your supporting documents." },
    { step: 4, title: "Assessment Check", description: "We check the final ITA34 assessment from SARS to ensure it matches our calculation." }
]

const useCases = [
    {
        title: "The Commission Earner",
        desc: "You earn commission and have business expenses (cellphone, travel). SARS audits this frequently. We ensure your deductions are valid."
    },
    {
        title: "The Company Director",
        desc: "You have a salary from your company but also other income. As a director, you are a Provisional Taxpayer by default."
    },
    {
        title: "The Rental Owner",
        desc: "You have a second property earning rent. This is taxable income. We help you deduct levies, rates, and bond interest to minimize the tax."
    }
]

const faqs = [
    {
        question: "Do I need to file a tax return?",
        answer: "Generally, yes, if you earn more than R500k per year, have more than one income stream (e.g., rental or two jobs), receive a travel allowance, or are a company director."
    },
    {
        question: "What is Provisional Tax?",
        answer: "It is a system for people who earn income other than a normal salary (like freelancers or business owners). You pay tax twice a year (Aug & Feb) to prevent a massive debt on assessment."
    },
    {
        question: "Can I claim home office expenses?",
        answer: "Only if you have a specific room used *exclusively* for trade and your employer allows/requires you to work from home. The rules are strict, but we can assess if you qualify."
    },
    {
        question: "What if I haven't filed for years?",
        answer: "Don't panic, but act now. We can request your historic IRP5s from SARS and file the outstanding years. Voluntary disclosure is better than waiting for SARS to find you."
    }
]

export default function PersonalTaxPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Personal Income Tax Services",
        description: "ITR12 and Provisional Tax services for individuals.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.co.za"
        },
        areaServed: {
            "@type": "Country",
            name: "South Africa"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Personal Tax",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "ITR12 Tax Return" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Provisional Tax (IRP6)" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Clearance" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.co.za/services" },
            { "@type": "ListItem", position: 3, name: "Tax", item: "https://creations.co.za/services/tax" },
            { "@type": "ListItem", position: 4, name: "Personal Tax", item: "https://creations.co.za/services/tax/personal-income-tax-returns" }
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

            <SectionWrapper variant="base" padding="lg" showGlow showReactiveGrid patternIntensity="subtle" className="border-b border-border/40">
                <Container>
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <StaggerChildren className="w-full">
                            <MotionWrapper direction="down" delay={0.1}>
                                <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-6 font-medium">
                                    <User className="h-3.5 w-3.5 mr-2" /> Personal Tax Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Personal Income Tax Returns (ITR12)
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Don't pay more than you owe. We optimize your deductions, ensure full compliance, and handle any SARS audits that arise.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="personal_tax_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        File My Return <ArrowRight className="ml-2 h-4 w-4" />
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

            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <MotionWrapper className="lg:col-span-5">
                            <h2 className="text-3xl font-bold mb-6">Tax Season Peace of Mind</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Filing your own return is easy... until you tick the wrong box or claim an invalid deduction. The result is often an unncessary audit or a reduced refund. We turn the anxiety of tax season into a simple checklist.
                            </p>
                            <Link href="/services/tax/sars-penalties-disputes">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Already in trouble? See Dispute Resolution <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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

            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Key Considerations</h2>
                        <p className="text-text-secondary">Understanding where you fit in the tax net.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileText className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">The Auto-Assessment</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        SARS may auto-assess you based on 3rd party data. Do NOT just accept it. They don't know about your additional medical expenses or charitable donations.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Calculator className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Provisional Tax</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        If you earn rental income, interest, or run a side hustle, you are a provisional taxpayer. Missing the Aug/Feb filings leads to automatic penalties.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileWarning className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Travel Allowances</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Claiming against a travel allowance requires a detailed logbook. Without one, SARS will disallow the entire claim. We review your logbook before submission.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper padding="lg" variant="surface" showLineGrid>
                <Container>
                    <MotionWrapper className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Filing Workflow</h2>
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

            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Who Needs This?</h2>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="bg-surface/50 border-border/50 hover:border-accent/30 transition-all h-full">
                                    <CardContent className="p-6">
                                        <User className="h-8 w-8 text-accent/50 mb-4" />
                                        <h3 className="font-bold text-lg mb-2">{useCase.title}</h3>
                                        <p className="text-sm text-text-secondary">{useCase.desc}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            <TrustBlock />

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

            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">File With Confidence</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get the refund you deserve without the risk of an audit.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="personal_tax_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Start Tax Filing
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/tax">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Back to Tax Rules
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
