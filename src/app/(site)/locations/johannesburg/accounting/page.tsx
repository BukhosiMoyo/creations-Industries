import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BarChart3, Clock, Share2, Shield, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { MotionWrapper, StaggerChildren } from '@/components/ui/motion-wrapper'
import { IconList } from '@/components/ui/icon-list'
import { FaqList } from '@/components/home/faq-section'
import { constructMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { Service, WithContext } from 'schema-dts'

export const metadata = constructMetadata({
    title: "Accounting Services in Johannesburg | Small Business & Corporate",
    description: "Monthly management accounts and strategic financial oversight for Johannesburg businesses. Audit-ready, cloud-based, and fully compliant."
})

const benefits = [
    "Monthly Management Accounts (delivered on time)",
    "Xero / Sage Setup & Optimization",
    "VAT, PAYE & Provisional Tax Compliance",
    "Annual Financial Statements (CIPC compliant)",
    "Dedicated Accountant (not a call center)"
]

const faqs = [
    {
        question: "Do I need to visit your office?",
        answer: "No. We are 100% digital. We use Zoom, secure portals, and cloud software to manage your accounts remotely, saving you time in JHB traffic."
    },
    {
        question: "What software do you use?",
        answer: "We are Xero and Sage specialists. If you are on an old desktop system, we will help migrate you to the cloud."
    },
    {
        question: "Are you registered with professional bodies?",
        answer: "Yes, our team includes registered AGSA and SAICA members. We adhere to the highest professional standards."
    }
]

export default function JohannesburgAccountingPage() {
    const jsonLd: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'Accounting Services Johannesburg',
        description: 'Comprehensive accounting and financial management for JHB businesses.',
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
                                Strategic Accounting for <span className="text-accent">Johannesburg Companies</span>
                            </h1>
                            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                                Move beyond basic compliance. Get the financial data you need to grow your business in South Africa's most competitive market.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link href="/get-a-quote">
                                    <Button size="lg" className="bg-accent text-white hover:bg-accent/90">Get a Quote</Button>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <MotionWrapper>
                            <h2 className="text-3xl font-bold mb-6">More Than Just Bookkeeping</h2>
                            <p className="text-text-secondary mb-6">
                                Johannesburg business moves fast. You need more than just data entry; you need insight. Our monthly accounting packages provide you with a clear view of your financial health.
                            </p>
                            <IconList items={benefits} className="space-y-3" />
                        </MotionWrapper>
                        <MotionWrapper delay={0.2}>
                            <div className="bg-background border border-border p-8 rounded-2xl shadow-lg">
                                <h3 className="font-bold text-xl mb-4">Why Outsource?</h3>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Cost Efficient", desc: "Cheaper than a full-time in-house accountant." },
                                        { title: "Continuity", desc: "No sick leave or resignation gaps." },
                                        { title: "Expertise", desc: "Access to a team of tax & accounting experts." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                                            <div>
                                                <div className="font-semibold">{item.title}</div>
                                                <div className="text-sm text-text-secondary">{item.desc}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper padding="lg" variant="base">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    </MotionWrapper>
                    <FaqList items={faqs} />
                </Container>
            </SectionWrapper>

            <SectionWrapper padding="lg" variant="surface">
                <Container>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Streamline Your Finances?</h2>
                        <Link href="/get-a-quote">
                            <Button size="lg" className="h-12 px-8 text-lg bg-accent text-white hover:bg-accent/90">
                                Get Started Today
                            </Button>
                        </Link>
                    </div>
                </Container>
            </SectionWrapper>
        </main>
    )
}
