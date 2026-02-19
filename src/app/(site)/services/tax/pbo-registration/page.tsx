
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Heart, HandHeart, Scale, Building2 } from "lucide-react"
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
    title: "PBO Registration & Section 18A | NPO Tax Exemption",
    description: "Register your NPO as a Public Benefit Organization (PBO) with the SARS Tax Exemption Unit. Get Section 18A status to issue tax-deductible receipts to donors.",
    canonical: "/services/tax/pbo-registration"
})

const valueSummary = [
    "Application to SARS Tax Exemption Unit (TEU)",
    "PBO Registration (Tax Exempt Status)",
    "Section 18A Approval (Donor Deductions)",
    "Drafting of compliant Founding Documents",
    "Annual NPO Tax Returns (IT12EI)"
]

const processSteps = [
    { step: 1, title: "Constitution Review", description: "We review your NPO constitution or Trust Deed. It MUST contain specific clauses required by SARS to qualify." },
    { step: 2, title: "Application Compilation", description: "We prepare the EI 1 application form, narrative of activities, and financial undertakings." },
    { step: 3, title: "TEU Submission", description: "Who submit to the specialized Tax Exemption Unit. This process takes 3-6 months depending on SARS backlog." },
    { step: 4, title: "Certification", description: "You receive your PBO Reference Number and Section 18A letter, allowing you to start issuing certificates." }
]

const useCases = [
    {
        title: "The Charity",
        desc: "Feeding schemes, orphanages, or animal shelters. You need Section 18A so corporates will donate to you for their own tax breaks."
    },
    {
        title: "The School / Church",
        desc: "Schools and religious bodies qualify for tax exemption (PBO) but often not Section 18A (depends on specific activities)."
    },
    {
        title: "The Association",
        desc: "Industry bodies or HOAs. You might not be a PBO, but you can still be a tax-exempt 'Recreational Club' or 'Association of Persons'."
    }
]

const faqs = [
    {
        question: "What is the difference between NPO and PBO?",
        answer: "NPO is a registration with the Department of Social Development (get an NPO number). PBO is a tax status granted by SARS (Tax Exemption). You can be an NPO without being a PBO, but you pay tax."
    },
    {
        question: "What is Section 18A?",
        answer: "It is the 'holy grail' for charities. It allows you to issue a tax certificate to a donor. The donor can then deduct that donation from their own taxable income. It incentivizes giving."
    },
    {
        question: "Does every PBO get Section 18A?",
        answer: "No. Only PBOs carrying out specific 'public benefit activities' (like welfare, healthcare, education) qualify for 18A. Religious bodies, for example, get PBO status (no tax) but usually not 18A."
    },
    {
        question: "Can I pay my directors?",
        answer: "PBOs cannot distribute funds to members/directors as profits. However, you CAN pay reasonable remuneration for services rendered. Excessive pay will trigger SARS scrutiny."
    }
]

export default function PboRegistrationPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "PBO Registration Services",
        description: "Public Benefit Organization and Section 18A registration.",
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
            name: "Non-Profit Tax",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "PBO Registration" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Section 18A Applications" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "NPO Constitution Review" } }
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
            { "@type": "ListItem", position: 4, name: "PBO & Section 18A", item: "https://creations.africa/services/tax/pbo-registration" }
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
                                    <Heart className="h-3.5 w-3.5 mr-2" /> Non-Profit Tax Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    PBO Registration & Section 18A
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Unlock tax exemptions and funding opportunities. We help genuine non-profits navigate the complex SARS Tax Exemption Unit application.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="pbo_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Apply for PBO <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">Attract More Donors</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Corporate and individual donors want tax deductions. If you cannot issue a Section 18A certificate, you are at a disadvantage. Getting this status is the most effective fundraising tool available.
                            </p>
                            <Link href="/services/accounting/financial-statements-preparation">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    NPOs also need audited financials <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">The Benefits</h2>
                        <p className="text-text-secondary">Why go through the strict application process?</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Scale className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Zero Tax</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Once approved as a PBO, your organization pays no Income Tax on donations, grants, or investment income.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <HandHeart className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Donor Incentives</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        With Section 18A approval, donors can deduct up to 10% of their taxable income by donating to you.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Building2 className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Credibility</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        PBO status is a mark of governance. It shows funders that you are regulated by SARS and have passed their strict vetting.
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
                        <h2 className="text-3xl font-bold mb-4">Application Workflow</h2>
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
                                        <Heart className="h-8 w-8 text-accent/50 mb-4" />
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Empower Your Cause</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get the tax status that allows your non-profit to thrive.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="pbo_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Start PBO Application
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
