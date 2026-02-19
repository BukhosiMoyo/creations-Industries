
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Shield, UserCheck, Scale, Building2 } from "lucide-react"
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
    title: "Public Officer Appointment & Updates | SARS Compliance",
    description: "Appoint or change your company's Public Officer with SARS. We handle the eFiling appointment and ensure the registered representative is correctly updated.",
    canonical: "/services/tax/public-officer-activation"
})

const valueSummary = [
    "Appointment of new Public Officer (PO) on eFiling",
    "Updating Of Registered Representative details",
    "Resolving 'Unable to Merge' eFiling errors",
    "Ensuring the PO meets the 'resident in SA' requirement",
    "Verification of residential address for SARS"
]

const processSteps = [
    { step: 1, title: "Eligibility Check", description: "We verify that the proposed Public Officer is a SA resident and has a valid tax number." },
    { step: 2, title: "Resolution & Docs", description: "We draft the company resolution and gather the certified ID and proof of residence required by SARS." },
    { step: 3, title: "SARS Submission", description: "We update the Registered Particulars on eFiling. If the automated system rejects it, we lodge a manual case." },
    { step: 4, title: "Confirmation", description: "Once SARS validates the appointment, the new PO gains full access to the company's tax profile." }
]

const useCases = [
    {
        title: "The New Director",
        desc: "You bought a shelf company or started a new Pty Ltd. The default director details are outdated or missing."
    },
    {
        title: "The eFiling Block",
        desc: "You can't file returns because eFiling says 'Access Denied' or 'registered representative not updated'. We fix this."
    },
    {
        title: "The Foreign Owner",
        desc: "You are an international director. You strictly need a robust South African resident to act as your Public Officer."
    }
]

const faqs = [
    {
        question: "What is a Public Officer?",
        answer: "A Public Officer is the individual who accepts liability for the company's tax actions. Every company must appoint one within 30 days of formation. They essentially serve as the face of the company to SARS."
    },
    {
        question: "Who can be a Public Officer?",
        answer: "Any individual who resides in South Africa. It is usually a director, but it can be a senior employee or an accountant (under specific mandates)."
    },
    {
        question: "Why is my eFiling profile broken?",
        answer: "SARS often locks profiles where the 'Registered Representative' does not match the CIPC director database. We synchronize these two databases to unlock your profile."
    },
    {
        question: "Does the Public Officer have personal liability?",
        answer: "Yes, in cases of negligence or fraud. The Public Officer is responsible for ensuring returns are submitted and taxes are paid. They can be held personally liable for the company's non-compliance in severe cases."
    }
]

export default function PublicOfficerActivationPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Public Officer Appointment Services",
        description: "SARS Registered Representative and Public Officer updates.",
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
            name: "Company Secretarial Tax",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Public Officer Appointment" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "SARS Profile Transfer" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Representative Update" } }
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
            { "@type": "ListItem", position: 4, name: "Public Officer Update", item: "https://creations.africa/services/tax/public-officer-activation" }
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
                                    <UserCheck className="h-3.5 w-3.5 mr-2" /> SARS Representative Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Public Officer Appointment & Activation
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Locked out of eFiling? We update your company's Registered Representative and Public Officer details to restore your tax access.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="public_officer_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Update Public Officer <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">The Checkbox That Stops Business</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                You can't file a return, issue a Tax Clearance, or claim a refund if your Public Officer is not updated. It is the single most common administrative block in South African tax.
                            </p>
                            <Link href="/services/tax/tax-clearance-certificates">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Blocking your TCC? We can fix it <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">Why It Matters</h2>
                        <p className="text-text-secondary">It's about liability and communication.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Scale className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Legal Requirement</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Section 246 of the Tax Administration Act mandates every company to have a Public Officer residing in the Republic.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Shield className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Profile Access</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Only the Public Officer can transfer a company's eFiling profile. If the old accountant has disappeared, updating the PO is the only way to get control back.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <Building2 className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Bank Accounts</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Banks now verify the company's tax status during CIPC annual return checks. Invalid POs trigger red flags.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Unlock Your Tax Profile</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Don't let an administrative error stop your business. We update public officers on eFiling daily.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="public_officer_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Update Details Now
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/services/tax">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Return to Tax
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
