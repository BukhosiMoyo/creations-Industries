import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, AlertTriangle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { MotionWrapper } from '@/components/ui/motion-wrapper'
import { IconList } from '@/components/ui/icon-list'
import { FaqItem } from '@/components/home/faq-section'
import { constructMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { Service, WithContext } from 'schema-dts'

export const metadata = constructMetadata({
    title: "Tax Practitioners Johannesburg | Returns, VAT & SARS Compliance",
    description: "Expert tax services for Johannesburg businesses. Corporate tax, VAT registration, provisional tax, and SARS dispute resolution."
})

const services = [
    "Corporate Income Tax (CIT) Returns",
    "VAT Registration & Submissions",
    "Provisional Tax (Filing & Calculation)",
    "SARS Penalties & Dispute Resolution",
    "Tax Clearance Certificates"
]

const faqs = [
    {
        question: "Can you help with outstanding tax returns?",
        answer: "Yes. We specialize in bringing non-compliant businesses back to good standing. We can negotiate payment arrangements with SARS."
    },
    {
        question: "Do you handle VAT registration?",
        answer: "Yes. If your turnover exceeds R1 million (mandatory) or R50,000 (voluntary), we can handle the entire registration process."
    },
    {
        question: "How do I get a Tax Clearance Certificate?",
        answer: "Once all your returns and payments are up to date, we can generate a Tax Clearance PIN instantly via eFiling."
    }
]

export default function JohannesburgTaxPage() {
    const jsonLd: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'Tax Services Johannesburg',
        description: 'Professional tax compliance and consulting for Johannesburg businesses.',
        areaServed: {
            '@type': 'City',
            name: 'Johannesburg'
        },
        provider: {
            '@type': 'Organization',
            name: 'Creations',
            url: 'https://creations.co.za'
        }
    }

    return (
        <main>
            <JsonLd data={jsonLd} />

            <SectionWrapper className="pt-32 pb-20" showGlow patternIntensity="subtle">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <MotionWrapper>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Expert Tax Compliance in <span className="text-accent">Johannesburg</span>
                            </h1>
                            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                                Don't let SARS issues slow down your business. We handle your tax affairs with precision and speed.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link href="/get-a-quote">
                                    <Button size="lg" className="bg-accent text-white hover:bg-accent/90">Get Tax Help</Button>
                                </Link>
                                <Link href="/locations/johannesburg">
                                    <Button variant="outline" size="lg">Back to JHB Hub</Button>
                                </Link>
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <MotionWrapper>
                            <h2 className="text-3xl font-bold mb-6">Comprehensive Tax Services</h2>
                            <p className="text-text-secondary mb-6">
                                From routine submissions to complex disputes, our registered tax practitioners have the expertise to protect your business and ensure full compliance.
                            </p>
                            <IconList items={services} className="space-y-3" />
                        </MotionWrapper>
                        <MotionWrapper delay={0.2}>
                            <div className="bg-background border border-border p-8 rounded-2xl shadow-lg">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                        <AlertTriangle className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-bold text-xl">Behind on Tax?</h3>
                                </div>
                                <p className="text-text-secondary mb-6">
                                    SARS is increasingly aggressive with penalties. If you have outstanding returns, do not wait. We can help you regularize your affairs before legal action is taken.
                                </p>
                                <Link href="/contact">
                                    <Button variant="destructive" className="w-full">Speak to a Tax Practitioner</Button>
                                </Link>
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper padding="lg" variant="base">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Tax FAQs</h2>
                    </MotionWrapper>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <FaqItem key={i} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </Container>
            </SectionWrapper>
        </main>
    )
}
