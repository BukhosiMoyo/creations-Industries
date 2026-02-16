import Link from 'next/link'
import { ArrowRight, Calculator } from 'lucide-react'
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
                            <IconList
                                items={services}
                                className="space-y-4"
                                itemClassName="flex items-center gap-3 text-text-secondary"
                            />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>
        </main>
    )
}
