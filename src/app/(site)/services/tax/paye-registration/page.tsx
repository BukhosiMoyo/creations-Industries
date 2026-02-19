
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Shield, Clock, Users, Briefcase, Building2 } from "lucide-react"
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
    title: "PAYE, UIF & SDL Registration Services",
    description: "Register for PAYE, UIF, and SDL with SARS. We handle the EMP101 application to ensure your business is compliant as a legal employer.",
    canonical: "/services/tax/paye-registration"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const valueSummary = [
    "Complete EMP101 Registration with SARS",
    "Simultaneous registration for UIF and SDL",
    "Avoid penalties for unregistered employees",
    "Guidance on 'Employer' vs 'Independent Contractor'",
    "Setup of eFiling profiles for employer tax"
]

const processSteps = [
    { step: 1, title: "Information Gathering", description: " We collect company docs, bank confirmation letters, and director details required for the EMP101." },
    { step: 2, title: "Application Submission", description: "We submit the application to SARS via eFiling or branch visit (depending on SARS' current requirements)." },
    { step: 3, title: "Registration Number", description: "SARS issues your PAYE reference number (starting with a 7). This activates your employer tax profile." },
    { step: 4, title: "System Setup", description: "We link this number to your payroll system and eFiling profile so you can submit your first EMP201." }
]

const useCases = [
    {
        title: "The First Hire",
        desc: "You've just hired your first employee earning above the tax threshold. You legally must register within 21 days."
    },
    {
        title: "The Growing Team",
        desc: "Your payroll exceeds R500k per year? You now need to register for Skills Development Levy (SDL)."
    },
    {
        title: "The Compliance Fix",
        desc: "You've been deducting tax but haven't paid it over because you weren't registered. We fix this backlog."
    }
]

const faqs = [
    {
        question: "When must I register for PAYE?",
        answer: "You must register within 21 days of becoming an employer, provided any employee earns above the tax threshold (approx R95k/year). If everyone earns below this, you still need to register for UIF."
    },
    {
        question: "What is SDL?",
        answer: "Skills Development Levy is 1% of your payroll, used to fund training in SA. You must register for SDL if your total annual payroll exceeds R500,000."
    },
    {
        question: "How long does registration take?",
        answer: "If all documents (especially the bank letter) are correct, it can be instant via eFiling. If SARS requests a manual audit, it takes up to 21 working days."
    },
    {
        question: "Can I do this myself?",
        answer: "Yes, but SARS creates strict validation errors for address mismatches or bank details. Using a practitioner ensures it's done right the first time."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function PayeRegistrationPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "PAYE Registration Services South Africa",
        description: "SARS Employer Registration (EMP101) for PAYE, UIF and SDL.",
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
            name: "Employer Tax Registration",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "PAYE Registration" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "UIF Registration" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "SDL Registration" } }
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
            { "@type": "ListItem", position: 4, name: "PAYE Registration", item: "https://creations.africa/services/tax/paye-registration" }
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
                                    <Briefcase className="h-3.5 w-3.5 mr-2" /> Employer Tax Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    PAYE, UIF & SDL Registration Services
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Become a compliant employer. We handle your EMP101 application to register you for PAYE, Unemployment Insurance, and Skills Levies.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="paye_reg_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Register Now <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">First Hire? Get It Right.</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                The moment you employ someone, you enter a new tier of tax compliance. Failing to register for PAYE while deducting tax from employees is a serious offence (theft of state funds). We get you setup correctly from Day 1.
                            </p>
                            <Link href="/services/accounting/payroll-services">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need help running the payroll too? <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">The Compliance Trio</h2>
                        <p className="text-text-secondary">Understanding the three levies triggered by employment.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Building2 className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">PAYE</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Pay As You Earn. Tax deducted from employee salaries and paid to SARS monthly. Mandatory if salary &gt; Tax Threshold.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Shield className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">UIF</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Unemployment Insurance Fund. 1% contributed by employer, 1% by employee. Mandatory for almost all employees working &gt;24hrs/month.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Users className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">SDL</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Skills Development Levy. 1% of total payroll. Purpose is to fund training. Mandatory if annual payroll &gt; R500,000.
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
                        <h2 className="text-3xl font-bold mb-4">Registration Process</h2>
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
                        <h2 className="text-3xl font-bold mb-4">Who Needs This?</h2>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="bg-surface/50 border-border/50 hover:border-accent/30 transition-all h-full">
                                    <CardContent className="p-6">
                                        <Briefcase className="h-8 w-8 text-accent/50 mb-4" />
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Employing Today</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get your employer numbers sorted so you can focus on building your team.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="paye_reg_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Register for PAYE
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
