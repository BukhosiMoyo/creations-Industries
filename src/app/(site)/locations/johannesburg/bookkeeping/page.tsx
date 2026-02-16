import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calculator, FileSpreadsheet, History } from 'lucide-react'
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
    title: "Bookkeeping Services Johannesburg | Daily Processing & Payroll",
    description: "Reliable bookkeeping for JHB small businesses. We handle invoicing, expense tracking, and bank reconciliation so you can focus on sales."
})

const features = [
    "Daily/Weekly Bank Reconciliation",
    "Customer Invoicing & Supplier Bills",
    "Expense Tracking & Receipt Management (Dext)",
    "Payroll Processing (Payslips & EMP201)",
    "Clean data for VAT & Tax submissions"
]

const faqs = [
    {
        question: "What is the difference between accounting and bookkeeping?",
        answer: "Bookkeeping is the daily recording of transactions. Accounting is the analysis, reporting, and tax strategy based on that data. We do both."
    },
    {
        question: "Do you use Dext / Receipt Bank?",
        answer: "Yes! We love Dext. It allows you to snap photos of slips and have them automatically pushed to Xero, saving hours of manual data entry."
    },
    {
        question: "How much does it cost?",
        answer: "Our packages start from competitive monthly rates depending on your transaction volume. Contact us for a custom quote."
    }
]

export default function JohannesburgBookkeepingPage() {
    const jsonLd: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'Bookkeeping Services Johannesburg',
        description: 'Efficient cloud bookkeeping for Johannesburg SMEs.',
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
                                Streamlined Bookkeeping for <span className="text-accent">JHB Businesses</span>
                            </h1>
                            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                                Stop drowning in paperwork. We keep your books clean, up-to-date, and audit-ready every single day.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link href="/get-a-quote">
                                    <Button size="lg" className="bg-accent text-white hover:bg-accent/90">Get a Bookkeeper</Button>
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
                            <div className="bg-background border border-border p-8 rounded-2xl shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <h3 className="font-bold text-xl mb-4 relative z-10">The "Creations" Way</h3>
                                <p className="text-text-secondary mb-4 relative z-10">
                                    We don't do shoeboxes of receipts once a year. We operate in the cloud, in real-time. This means you always know who owes you money and how much profit you are making.
                                </p>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2}>
                            <h2 className="text-3xl font-bold mb-6">Daily Financial Clarity</h2>
                            <IconList items={features} className="space-y-3" />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper padding="lg" variant="base">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Bookkeeping FAQs</h2>
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
