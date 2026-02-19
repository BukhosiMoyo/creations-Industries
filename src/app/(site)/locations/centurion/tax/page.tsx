import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FaqList } from '@/components/home/faq-section'
import { Container } from '@/components/ui/container'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { MotionWrapper } from '@/components/ui/motion-wrapper'
import { constructMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { Service, WithContext } from 'schema-dts'

export const metadata = constructMetadata({
    title: "Tax Services in Centurion | Creations",
    description: "Tax compliance for Centurion companies. SARS submissions, VAT returns, and tax clearance for logistics and professional services."
})

const services = [
    "Corporate Income Tax Returns",
    "VAT Registration & Submissions",
    "Logistics Sector Tax Compliance",
    "Tax Clearance for Tenders",
    "Provisional Tax Calculations"
]

const faqs = [
    {
        question: "What tax services do you offer in Centurion?",
        answer: "We offer a comprehensive range of tax services including Corporate Income Tax Returns, VAT Registration & Submissions, Logistics Sector Tax Compliance, Tax Clearance for Tenders, and Provisional Tax Calculations tailored for Centurion businesses."
    },
    {
        question: "How can you help with SARS compliance for my Centurion business?",
        answer: "Our experts ensure your business adheres to all SARS regulations, handling submissions, returns, and providing guidance to keep your tax affairs in order, preventing penalties and ensuring smooth operations."
    },
    {
        question: "Do you assist with tax clearance certificates for tenders?",
        answer: "Yes, we specialize in assisting Centurion businesses with obtaining tax clearance certificates, which are crucial for participating in tenders and securing new business opportunities."
    },
    {
        question: "What industries do you serve in Centurion for tax services?",
        answer: "While we serve a broad range of industries, we have particular expertise in logistics and professional services sectors within Centurion, understanding their unique tax challenges and requirements."
    }
]

export default function CenturionTaxPage() {
    const jsonLd: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'Tax Services Centurion',
        description: 'Expert tax services for Centurion businesses.',
        areaServed: {
            '@type': 'City',
            name: 'Centurion'
        },
        url: 'https://creations.africa/locations/centurion/tax',
        provider: {
            '@type': 'Organization',
            name: 'Creations',
            url: 'https://creations.africa'
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
                                Compliant Tax for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Centurion.</span>
                            </h1>
                            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                                Don't let SARS issues stall your Centurion business. We ensure your tax affairs are pristine, so you can focus on operations.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/get-a-quote">
                                    <Button size="lg" className="bg-accent text-white hover:bg-accent/90">
                                        Tax Help
                                    </Button>
                                </Link>
                                <Link href="/services/tax">
                                    <Button variant="outline" size="lg">
                                        View National Tax Page
                                    </Button>
                                </Link>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="bg-surface-elevated border border-border rounded-2xl p-8">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-accent" />
                                Local Tax Services
                            </h3>
                            <FaqList items={faqs} />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>
        </main>
    )
}
