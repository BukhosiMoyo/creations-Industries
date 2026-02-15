import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Stethoscope, HeartPulse, Activity, FileText, Briefcase, UserCheck, Shield } from "lucide-react"
import { QuoteLink } from "@/components/common/quote-link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { IconList } from "@/components/ui/icon-list"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Product, WithContext, BreadcrumbList, FAQPage } from "schema-dts"
import { TestimonialCard } from "@/components/trust/testimonial-card"
import { TrustBlock } from "@/components/trust/trust-block"

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Accounting for Doctors & Medical Professionals | Creations",
    description: "Specialized accounting for South African medical practitioners. We handle practice admin, locum tax, and maatskappy structuring so you can focus on patients.",
    canonical: "/industries/medical-professionals"
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "General Practitioners (GPs) in Private Practice",
    "Medical Specialists (Surgeons, Anesthetists)",
    "Locum Doctors & Nurses",
    "Dentists & Orthodontists",
    "Allied Health Professionals (Physio, Chiro)",
    "Psychologists & Psychiatrists"
]

const services = [
    {
        title: "Practice Management",
        description: "Monthly reports showing practice profitability and expense ratios.",
        icon: Activity,
    },
    {
        title: "Tax Planning",
        description: "Proactive provisional tax calculation to prevent August/February shocks.",
        icon: FileText,
    },
    {
        title: "Payroll",
        description: "Managing receptionist and nurse salaries (including UIF/SDL) and locum payments.",
        icon: Briefcase,
    },
    {
        title: "Wealth Planning",
        description: "Structuring investments outside the practice for long-term retirement planning.",
        icon: Shield,
    }
]

const painPoints = [
    { title: "No Time for Admin", desc: "We are 100% digital. Snap receipts via app, we do the rest." },
    { title: "Tax Efficiency", desc: "We ensure you claim all valid deductions: equipment, malpractice insurance, conferences." },
    { title: "HPCSA Compliance", desc: "We ensure your financial standing allows for seamless annual renewals." }
]

const faqs = [
    {
        question: "I work in state but do limited private practice (RWOPS). Do I need an accountant?",
        answer: "Yes. RWOPS income is not taxed via PAYE at the hospital, meaning you often face a massive tax bill at year-end if not managed via Provisional Tax."
    },
    {
        question: "Can I claim my malpractice insurance?",
        answer: "Absolutely. Indemnity insurance is a fully deductible business expense, along with your HPCSA fees."
    },
    {
        question: "Do you handle medical billing?",
        answer: "We focus on the accounting side (reconciliations and tax). We work alongside your medical billing bureau to ensure the cash actually hits the bank and is recorded correctly."
    },
    {
        question: "Should I form a company (Inc) or be a Sole Prop?",
        answer: "It depends on your profit levels. We analyze your specific situation to see where the tax benefit lies, considering the fixed costs of running a company."
    },
    {
        question: "Do you help with Locum tax?",
        answer: "Yes. Locums are often deemed 'independent contractors' but face specific risks with the Personal Service Provider rules. We help navigate this."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function MedicalIndustryPage() {
    // Schema
    const jsonLd: WithContext<Product> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Accounting for Medical Professionals",
        description: "Specialized accounting and tax services for doctors and medical practitioners in South Africa.",
        brand: {
            "@type": "Brand",
            name: "Creations Accounting"
        },
        sku: "SERVICE-MEDICAL-ACC"
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Industries", item: "https://creations.co.za/services" }, // Fallback to services if industries index doesn't exist
            { "@type": "ListItem", position: 3, name: "Medical", item: "https://creations.co.za/industries/medical-professionals" }
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
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6 font-medium">
                                    <Stethoscope className="h-3.5 w-3.5 mr-2" /> Medical Professionals
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-primary mb-6 leading-[1.1]">
                                    Accounting for Doctors & Medical Professionals
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    You care for patients; we care for your practice. Specialized financial support for specialists, GPs, and locums.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="industry_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">Book a Consultation <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </QuoteLink>
                                <Link href="#services">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">View Services</Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. THE CONTEXT */}
            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <MotionWrapper className="lg:col-span-5">
                            <h2 className="text-3xl font-bold mb-6">The Business of Healing</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Running a private practice is demanding. Between patient care, theater time, and CPD requirements, the last thing you need is a tax headache.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="p-4 rounded-xl bg-background border border-border/50">
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <UserCheck className="h-4 w-4 text-primary" /> Maatskappy vs. Sole Prop
                                    </h3>
                                    <p className="text-sm text-text-secondary">We help you choose the right structure (Inc vs. Personal) to optimize your tax liability legally.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-background border border-border/50">
                                    <h3 className="font-bold mb-1 flex items-center gap-2">
                                        <HeartPulse className="h-4 w-4 text-primary" /> Medical Aid Recons
                                    </h3>
                                    <p className="text-sm text-text-secondary">Managing the gap between claimed and paid amounts ensures you actually get paid for your work.</p>
                                </div>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-7">
                            <div className="bg-surface-elevated border border-border rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-6">Who We Assist</h3>
                                <IconList
                                    items={whoIsThisFor}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    itemClassName="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-all flex items-center gap-3 text-sm"
                                    iconClassName="h-4 w-4 text-primary shrink-0"
                                />
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST SIGNAL 1 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="My practice profitability went up 20% within six months of switching to Creations. They found leaks I didn't know existed."
                        author="Dr. K"
                        role="Specialist Surgeon"
                        variant="primary"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 3. CORE SERVICES */}
            <SectionWrapper id="services" padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Core Services for Medics</h2>
                        <p className="text-text-secondary">Financial health for your practice.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="h-full bg-surface border-border/50 hover:border-primary/40 transition-all group">
                                    <CardContent className="p-6">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <service.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST BLOCK */}
            <TrustBlock variant="process" />

            {/* 4. PAIN POINTS SOLVED */}
            <SectionWrapper padding="lg" variant="surface" showLineGrid>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {painPoints.map((point, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-accent/10 text-accent ring-8 ring-accent/5">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{point.desc}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 5. FAQ */}
            <SectionWrapper variant="base" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Medical Accounting FAQ</h2>
                    </MotionWrapper>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-surface px-4">
                                <AccordionTrigger className="font-semibold text-text-primary hover:text-primary hover:no-underline py-4 text-left">
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

            {/* TRUST SIGNAL 2 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="Medical aid reconciliations used to be a nightmare. Now they are finally accurate."
                        author="Practice Manager"
                        role="Pretoria East GP"
                        variant="subtle"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 6. INTERNAL LINKING */}
            <SectionWrapper variant="surface" padding="md" className="border-t border-border/40">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
                        <div className="text-text-secondary font-medium">Related Locations & Services:</div>
                        <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-end">
                            <Link href="/locations/pretoria" className="text-text-muted hover:text-primary transition-colors">Pretoria (Hub)</Link>
                            <Link href="/locations/centurion" className="text-text-muted hover:text-primary transition-colors">Centurion (Mediclinic Area)</Link>
                            <Link href="/services/tax" className="text-text-muted hover:text-primary transition-colors">Tax Services</Link>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 7. CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Focus on Your Patients, We&apos;ll Handle the Numbers</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    Get specialized accounting support designed for the medical profession.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="industry_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Request Consultation
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/contact">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            Contact Us
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
