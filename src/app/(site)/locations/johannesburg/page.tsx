import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Building2, TrendingUp, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { MotionWrapper, StaggerChildren } from '@/components/ui/motion-wrapper'
import { HeroSection } from '@/components/home/hero-section'
import { IconList } from '@/components/ui/icon-list'
import { FaqList } from '@/components/home/faq-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { constructMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { Service, WithContext } from 'schema-dts'

export const metadata = constructMetadata({
    title: "Accounting, Tax & Bookkeeping Services in Johannesburg | Creations",
    description: "Expert accounting and tax compliance for Johannesburg businesses. Serving Sandton, Rosebank, and greater JHB with precision financial management."
})

const coreServices = [
    {
        title: "Accounting Services",
        description: "Monthly management accounts and financial oversight for JHB's fast-paced businesses.",
        icon: TrendingUp,
        href: "/locations/johannesburg/accounting"
    },
    {
        title: "Tax Specialist Services",
        description: "Corporate tax (CIT), VAT, and dispute resolution with SARS. Keep your compliance spotless.",
        icon: Building2,
        href: "/locations/johannesburg/tax"
    },
    {
        title: "Bookkeeping",
        description: "Accurate, daily record-keeping and payroll processing. We handle the numbers, you handle growth.",
        icon: CheckCircle2,
        href: "/locations/johannesburg/bookkeeping"
    }
]

const whyJhb = [
    "Sandton & Rosebank Precision: We understand the high stakes of JHB's commercial hubs.",
    "Remote-First Efficiency: You don't need to drive through traffic to sign a document.",
    "Fast Turnaround: Our systems are built for the speed of Johannesburg business.",
    "Full Compliance: CIPC and SARS expertise included in every package."
]

const faqs = [
    {
        question: "Do you have an office in Johannesburg?",
        answer: "We operate as a digital-first firm serving the greater Johannesburg area. This allows us to keep fees competitive and response times fast, without you needing to battle traffic."
    },
    {
        question: "Can you handle complex corporate structures?",
        answer: "Yes. From holdings companies in Sandton to operational entities in industrial hubs, we specialize in multi-entity accounting and tax structuring."
    },
    {
        question: "How do we get documents to you?",
        answer: "We use secure cloud portals and Dext integration. You snap a picture or email the invoice, and we process it instantly."
    }
]

export default function JohannesburgHubPage() {
    const jsonLd: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'Creations Accounting Johannesburg',
        description: 'Professional accounting and tax services for Johannesburg businesses.',
        areaServed: {
            '@type': 'City',
            name: 'Johannesburg'
        },
        url: 'https://creations.africa/locations/johannesburg',
        provider: {
            '@type': 'Organization',
            name: 'Creations',
            url: 'https://creations.africa'
        }
    }

    return (
        <main>
            <JsonLd data={jsonLd} />

            {/* Hero */}
            <SectionWrapper className="pt-32 pb-20 overflow-hidden" showGlow patternIntensity="subtle">
                <Container>
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <MotionWrapper>
                            <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-6 font-medium">
                                <MapPin className="mr-2 h-4 w-4" />
                                Serving Greater Johannesburg
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.1}>
                            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl mb-6">
                                World-Class Accounting for <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-blue-600">Johannesburg Business.</span>
                            </h1>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2}>
                            <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
                                From Sandton startups to established Rosebank firms — we provide the financial precision and tax compliance needed to compete in SA's economic heart.
                            </p>
                        </MotionWrapper>
                        <MotionWrapper delay={0.3} className="flex flex-col sm:flex-row gap-4">
                            <Link href="/get-a-quote">
                                <Button size="lg" className="h-12 px-8 text-base font-semibold group bg-accent hover:bg-accent/90 text-white">
                                    Get a Quote
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="outline" size="lg" className="h-12 px-8 text-base">View All Services</Button>
                            </Link>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* Core Services */}
            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <MotionWrapper className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Complete Financial Solutions</h2>
                        <p className="text-text-secondary">Everything a Johannesburg business needs to stay compliant and profitable.</p>
                    </MotionWrapper>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {coreServices.map((service, i) => (
                            <MotionWrapper key={i} delay={i * 0.1} className="h-full">
                                <Link href={service.href} className="block group h-full">
                                    <Card className="h-full border-border bg-background hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-xl">
                                        <CardHeader>
                                            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                                                <service.icon className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="text-xl group-hover:text-accent transition-colors">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-text-secondary mb-6">{service.description}</p>
                                            <span className="text-sm font-bold text-accent flex items-center gap-1">
                                                Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </MotionWrapper>
                        ))}
                    </StaggerChildren>
                </Container>
            </SectionWrapper>

            {/* Why JHB Needs Us */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <MotionWrapper>
                            <h2 className="text-3xl font-bold mb-6">Built for the Pace of JHB</h2>
                            <p className="text-text-secondary mb-8">
                                Johannesburg moves faster than any other city in Africa. Your accountant shouldn't slow you down. We leverage audit-ready technology to keep your financials real-time and your compliance flawless.
                            </p>
                            <IconList
                                items={whyJhb}
                                className="space-y-4"
                                itemClassName="flex items-start gap-3"
                                iconClassName="mt-1 h-5 w-5 text-accent shrink-0"
                            />
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="relative">
                            <div className="aspect-square rounded-3xl bg-surface-elevated border border-border flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                                <div className="relative z-10 text-center p-8">
                                    <div className="text-5xl font-extrabold text-accent mb-2">100%</div>
                                    <div className="text-xl font-medium text-text-primary">Remote & Cloud Based</div>
                                    <p className="text-sm text-text-muted mt-4">No traffic. No paper. No delays.</p>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* FAQ */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
                    </MotionWrapper>
                    <FaqList items={faqs} />
                </Container>
            </SectionWrapper>

            {/* CTA */}
            <SectionWrapper padding="lg">
                <Container>
                    <div className="bg-gradient-to-br from-accent/10 via-surface to-accent/5 rounded-3xl p-8 md:p-12 text-center border border-accent/20">
                        <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Accounting?</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto mb-8">
                            Join other Johannesburg businesses who have switched to Creatures for clarity, compliance, and growth.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/get-a-quote">
                                <Button size="lg" className="w-full sm:w-auto bg-accent text-white hover:bg-accent/90">
                                    Get a Quote
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>
        </main>
    )
}
