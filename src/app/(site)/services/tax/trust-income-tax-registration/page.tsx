
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Shield, Landmark, ScrollText, Building2 } from "lucide-react"
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
    title: "Trust Tax Registration & Services | SARS Compliance",
    description: "Register your Inter Vivos or Testamentary Trust for Income Tax. We handle IT77TR forms, Trustee resolutions, and annual trust tax returns (ITR12T).",
    canonical: "/services/tax/trust-income-tax-registration"
})

const valueSummary = [
    "Registration of New Trusts for Income Tax",
    "Submission of Annual ITR12T Trust Returns",
    "Advice on Vesting vs Retaining Income",
    "Trustee Resolutions & Minutes",
    "Section 7C (Low interest loan) calculations"
]

const processSteps = [
    { step: 1, title: "Deed Analysis", description: "We review your Trust Deed and Letters of Authority to understand the beneficiaries and mandate." },
    { step: 2, title: "SARS Registration", description: "All trusts must register for tax immediately. We submit the IT77TR to get your Tax Reference Number." },
    { step: 3, title: "Annual Vesting", description: "Before Feb year-end, Trustees must resolve whether to distribute income (taxed in beneficiary hands) or keep it (taxed in trust at 45%)." },
    { step: 4, title: "Filing", description: "We submit the ITR12T return, disclosing all assets, liabilities, and beneficiary distributions to SARS." }
]

const useCases = [
    {
        title: "The Family Trust",
        desc: "Holding property or investments for children. Needs careful management of Section 7C deemed interest on loans."
    },
    {
        title: "The Trading Trust",
        desc: "Running a business through a trust. High tax rate (45%) requires smart distribution strategies to be efficient."
    },
    {
        title: "The Dormant Trust",
        desc: "Trust exists but has no activity. Still requires a 'Nil' return every year to avoid administrative penalties."
    }
]

const faqs = [
    {
        question: "Do all trusts need to register for tax?",
        answer: "Yes. Even if the trust has no income or assets, it must be registered with SARS if it is registered with the Master of the High Court."
    },
    {
        question: "What is the tax rate for a trust?",
        answer: "Trusts are taxed at a flat rate of 45% on income and an effective rate of 36% on Capital Gains. However, proper vesting strategies can shift this burden to beneficiaries who may have lower marginal rates."
    },
    {
        question: "What is Section 7C?",
        answer: "It's an anti-avoidance rule. If you lend money to a trust interest-free (or low interest), the 'missing' interest is treated as a donation by you, triggering 20% Donations Tax. We help you manage this."
    },
    {
        question: "Does the conduit principle still apply?",
        answer: "Yes. Income flows through the trust to the beneficiary, retaining its nature (e.g., interest remains interest). But this must be documented in resolutions *before* the end of the tax year."
    }
]

export default function TrustTaxRegistrationPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Trust Tax Services South Africa",
        description: "Income Tax registration and ITR12T returns for Trusts.",
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
            name: "Trust Administration",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Trust Tax Registration" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "ITR12T Filing" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Trustee Resolutions" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.africa" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.africa/services" },
            { "@type": "ListItem", position: 3, name: "Tax", item: "https://creations.africa/services/tax" },
            { "@type": "ListItem", position: 4, name: "Trust Tax Registration", item: "https://creations.africa/services/tax/trust-income-tax-registration" }
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
                                    <Landmark className="h-3.5 w-3.5 mr-2" /> Trust Administration
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Trust Tax Registration & Returns
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Trusts are powerful vehicles for asset protection, but they carry heavy compliance burdens. We manage the tax complexity so you can preserve your legacy.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="trust_tax_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Register My Trust <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">45% Tax Rate Warning</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Trusts are taxed at the highest marginal rate (45%) from the first Rand of earning. Without a solid distribution strategy (vesting income to beneficiaries), your trust becomes a tax trap. We structure this correctly.
                            </p>
                            <Link href="/services/tax/personal-income-tax-returns">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Beneficiaries need to file returns too <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">Core Trust Services</h2>
                        <p className="text-text-secondary">Handling the unique requirements of the ITR12T return.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <ScrollText className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Registration</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Obtaining an Income Tax number for new trusts using the Letters of Authority.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Shield className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Compliance</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Filing the extensive annual return which now demands 3rd party data reporting on all distributions to beneficiaries.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Landmark className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Estate Planning</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Ensuring the trust actually serves its purpose of protecting assets from estate duty and creditors.
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
                        <h2 className="text-3xl font-bold mb-4">Compliance Workflow</h2>
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
                                        <Building2 className="h-8 w-8 text-accent/50 mb-4" />
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Protect Your Legacy</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Ensure your trust remains compliant and tax-efficient for generations to come.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="trust_tax_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Contact Trust Experts
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/tax">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Back to Tax
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
