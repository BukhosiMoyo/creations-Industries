
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Shield, CalendarCheck, FileStack, Building2 } from "lucide-react"
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
    title: "EMP201 & EMP501 Submissions | SARS Employer Tax Submissions",
    description: "Expert assistance with monthly EMP201 declarations and bi-annual EMP501 reconciliations. We ensure your payroll tax is accurate and filed on time via EasyFile.",
    canonical: "/services/tax/emp201-emp501-submissions"
})

const valueSummary = [
    "Monthly EMP201 declaration & submission",
    "Bi-annual EMP501 Reconciliations (August & February)",
    "Generation of IRP5/IT3(a) tax certificates",
    "Correction of historic ETI claiming errors",
    "EasyFile integration and management"
]

const processSteps = [
    { step: 1, title: "Monthly Declaration", description: "Every month, we calculate your PAYE, SDL, and UIF liability and submit the EMP201 to SARS by the 7th." },
    { step: 2, title: "Mid-Year Recon", description: "In August/September, we perform the Interim Reconciliation to ensure your first 6 months of data matches what you paid." },
    { step: 3, title: "Final Recon", description: "In April/May, we perform the Final Reconciliation for the full tax year. This is the big one." },
    { step: 4, title: "Certificate Issue", description: "Once the EMP501 is accepted by SARS, we issue IRP5 certificates to your employees for their personal tax returns." }
]

const useCases = [
    {
        title: "The ETI Claimant",
        desc: "You claim Employment Tax Incentive. SARS audits these rigorously. We ensure your claim codes are 100% valid."
    },
    {
        title: "The Busy SME",
        desc: "You pay salaries but forget to file the return on time. We take over the deadline management to stop the 10% penalties."
    },
    {
        title: "The Correction Job",
        desc: "Your previous accountant messed up your IRP5 codes. We reopen the reconciliation on EasyFile and correct the certificates."
    }
]

const faqs = [
    {
        question: "What is the difference between EMP201 and EMP501?",
        answer: "EMP201 is the monthly declaration of what you owe SARS for that specific month. EMP501 is the bi-annual reconciliation that proves all your monthly EMP201s match the total value of IRP5s generated."
    },
    {
        question: "When are the deadlines?",
        answer: "EMP201: The 7th of every month (or Friday before if the 7th is a weekend). EMP501: Interim period ends 31 August (filing usually Oct), Final period ends 28 February (filing usually May)."
    },
    {
        question: "What happens if I file late?",
        answer: "SARS imposes an immediate 10% penalty on the total tax value. For EMP501s, there are additional administrative penalties calculated per month of non-compliance."
    },
    {
        question: "Do you use EasyFile?",
        answer: "Yes. For all EMP501 reconciliations, we use the latest version of SARS EasyFile Employer to ensure full validation before submission."
    }
]

export default function Emp201SubmissionsPage() {
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "EMP201 & EMP501 Tax Services",
        description: "Monthly PAYE returns and bi-annual EasyFile reconciliations.",
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
            name: "Employer Tax Returns",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "EMP201 Filing" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "EMP501 Recruitment" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "IRP5 Generation" } }
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
            { "@type": "ListItem", position: 4, name: "EMP201 & EMP501", item: "https://creations.co.za/services/tax/emp201-emp501-submissions" }
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
                                    <FileStack className="h-3.5 w-3.5 mr-2" /> Payroll Tax Returns
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    EMP201 & EMP501 Submissions
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    From monthly declarations to the big bi-annual reconciliation. We manage your entire employer tax lifecycle on EasyFile and eFiling.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="emp201_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base key-button w-full sm:w-auto">
                                        Get Compliance Help <ArrowRight className="ml-2 h-4 w-4" />
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
                            <h2 className="text-3xl font-bold mb-6">The Cycle of Compliance</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Being an employer means entering a strict cycle of reporting. You pay SARS monthly (EMP201), and then twice a year you must prove that your payments match your payroll data (EMP501). We manage this entire loop for you.
                            </p>
                            <Link href="/services/accounting/payroll-services">
                                <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                    Need us to generate the payslips too? <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-3xl font-bold mb-4">Two Major Deadlines</h2>
                        <p className="text-text-secondary">We keep you ahead of the two most critical employer tax events.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MotionWrapper delay={0.1}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <CalendarCheck className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Monthly: EMP201</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Total of PAYE + SDL + UIF withheld.
                                        <br /><strong>Deadline:</strong> 7th of the following month.
                                        <br /><strong>Risk:</strong> Late payment = 10% penalty instantly.
                                    </p>
                                </CardContent>
                            </Card>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <Card className="h-full bg-surface border-border/50">
                                <CardContent className="p-8">
                                    <FileStack className="h-10 w-10 text-accent mb-6" />
                                    <h3 className="text-xl font-bold mb-4">Bi-Annual: EMP501</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        Reconciliation of declarations vs payments vs certificates.
                                        <br /><strong>Deadline:</strong> End of May &amp; End of Oct.
                                        <br /><strong>Risk:</strong> No Tax Clearance until filed.
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
                        <h2 className="text-3xl font-bold mb-4">Submission Process</h2>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Solve Your Payroll Tax</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Need an interim recon? Or just monthly EMP201 filing? We have you covered.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="emp201_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Contact Us
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
