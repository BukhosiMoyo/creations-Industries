
import Link from 'next/link'
import { ArrowRight, Calculator } from 'lucide-react'
import { FaqList } from '@/components/home/faq-section'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { MotionWrapper } from '@/components/ui/motion-wrapper'
import { IconList } from '@/components/ui/icon-list'
import { constructMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { Service, WithContext } from 'schema-dts'

export const metadata = constructMetadata({
    title: "Bookkeeping Services in Centurion | Creations",
    description: "Daily bookkeeping and payroll for Centurion businesses. We specialize in Xero and Sage for modern, efficient financial records."
})

const services = [
    "Bank Reconciliation",
    "Supplier Invoice Processing",
    "Customer Invoicing",
    "VAT Calculations",
    "Cloud Accounting (Xero/Sage)"
]

const faqs = [
    {
        question: "What is bookkeeping?",
        answer: "Bookkeeping is the process of recording financial transactions. It's essential for tracking income and expenses, managing cash flow, and preparing for tax season."
    },
    {
        question: "Why do I need a bookkeeper?",
        answer: "A bookkeeper helps you maintain accurate financial records, saving you time and ensuring compliance. This allows you to focus on growing your business."
    },
    {
        question: "Do you use cloud accounting software?",
        answer: "Yes, we specialize in cloud-based accounting solutions like Xero and Sage, providing real-time financial insights and efficient collaboration."
    },
    {
        question: "How often do you perform bookkeeping tasks?",
        answer: "We offer flexible bookkeeping services, from daily to monthly, tailored to your business needs and transaction volume."
    }
]

export default function CenturionBookkeepingPage() {
    const jsonLd: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'Bookkeeping Services Centurion',
        description: 'Professional bookkeeping services for Centurion businesses.',
        areaServed: {
            '@type': 'City',
            name: 'Centurion'
        },
        url: 'https://creations.co.za/locations/centurion/bookkeeping',
        provider: {
            '@type': 'Organization',
            name: 'Creations',
            url: 'https://creations.co.za'
        }
    }

    return (
        <main>
            <JsonLd data={jsonLd} />

            <SectionWrapper className="pt-32 pb-20" showGlow>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <MotionWrapper>
                            <Link href="/locations/centurion" className="text-sm font-medium text-accent hover:underline mb-4 block">
                                ← Back to Centurion Hub
                            </Link>
                            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl mb-6">
                                Streamlined Bookkeeping for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Centurion SMEs.</span>
                            </h1>
                            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                                From Highveld Techno Park to Midstream Estate, we keep Centurion businesses organized and audit-ready with cloud-based bookkeeping.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/get-a-quote">
                                    <Button size="lg" className="bg-accent text-white hover:bg-accent/90">
                                        Get Organized
                                    </Button>
                                </Link>
                                <Link href="/services/bookkeeping">
                                    <Button variant="outline" size="lg">
                                        View National Page
                                    </Button>
                                </Link>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="bg-surface-elevated border border-border rounded-2xl p-8">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-accent" />
                                Services Included
                            </h3>
                            <FaqList items={faqs} />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>
        </main>
    )
}

