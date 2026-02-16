import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { MotionWrapper } from '@/components/ui/motion-wrapper'
import { IconList } from '@/components/ui/icon-list'
import { constructMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { Service, WithContext } from 'schema-dts'

export const metadata = constructMetadata({
    title: "Accounting Services in Centurion | Creations",
    description: "Cloud accounting for Centurion businesses. Financial management for logistics, tech, and estate-based SMEs in Highveld, Irene, and surrounds."
})

const services = [
    "Monthly Management Accounts",
    "Asset Register Management (Fleets/Equipment)",
    "Financial Statements (AFS)",
    "Budgeting for Growth",
    "Payroll & UIF Services"
]

export default function CenturionAccountingPage() {
    const jsonLd: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'Accounting Services Centurion',
        description: 'Professional accounting services for Centurion businesses.',
        areaServed: {
            '@type': 'City',
            name: 'Centurion'
        },
        url: 'https://creations.co.za/locations/centurion/accounting',
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
                                Precision Accounting for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Centurion's Growth.</span>
                            </h1>
                            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                                Whether you run a logistics fleet in Highveld or a tech firm in Irene, you need accounts that reflect reality. We deliver accurate, timely financial data.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/get-a-quote">
                                    <Button size="lg" className="bg-accent text-white hover:bg-accent/90">
                                        Get a Quote
                                    </Button>
                                </Link>
                                <Link href="/services/accounting">
                                    <Button variant="outline" size="lg">
                                        Core Services
                                    </Button>
                                </Link>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="bg-surface-elevated border border-border rounded-2xl p-8">
                            <h3 className="text-lg font-bold mb-6">What We Cover</h3>
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
