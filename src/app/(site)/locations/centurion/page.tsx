import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Building, Truck, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { MotionWrapper, StaggerChildren } from '@/components/ui/motion-wrapper'
import { IconList } from '@/components/ui/icon-list'
import { FaqItem } from '@/components/home/faq-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { constructMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { Service, WithContext } from 'schema-dts'

export const metadata = constructMetadata({
    title: "Accounting & Tax Services in Centurion | Creations",
    description: "Specialized accounting for Centurion's logistics, tech, and service sectors. Serving Highveld, Irene, and Midstream with cloud-based efficiency."
})

const coreServices = [
    {
        title: "SME Accounting",
        description: "Monthly accounts and financial oversight for growing businesses in Centurion.",
        icon: Building,
        href: "/locations/centurion/accounting"
    },
    {
        title: "Tax Services",
        description: "VAT, PAYE, and Corporate Tax compliance. We keep you clear of SARS penalties.",
        icon: MapPin,
        href: "/locations/centurion/tax"
    },
    {
        title: "Cloud Bookkeeping",
        description: "Paperless, real-time bookkeeping for modern Centurion companies.",
        icon: Laptop,
        href: "/locations/centurion/bookkeeping"
    }
]

const whyCenturion = [
    "Tech & Logistics Focus: We understand the core industries driving Centurion.",
    "Midstream & Irene Support: Digital service means we cover the estates seamlessly.",
    "Proactive Compliance: We stop tax issues before they become problems.",
    "Scalable Systems: Our tech stack grows with your business."
]

const faqs = [
    {
        question: "Do you visit clients in Centurion?",
        answer: "We are a digital-first firm. We use Zoom/Teams for meetings, which saves everyone travel time along the N1. We can serve you perfectly whether you are in Highveld or Midstream."
    },
    {
        question: "I have a logistics company, can you help?",
        answer: "Yes. We have specific experience with logistics businesses, including fleet asset management and VAT on fuel input claims."
    },
    {
        question: "What accounting software do you use?",
        answer: "We are Xero and Sage specialists. We can migrate you to the cloud if you aren't there yet."
    }
]

export default function CenturionHubPage() {
    const jsonLd: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'Creations Accounting Centurion',
        description: 'Professional accounting and tax services for Centurion businesses.',
        areaServed: {
            '@type': 'City',
            name: 'Centurion'
        },
        url: 'https://creations.co.za/locations/centurion',
        provider: {
            '@type': 'Organization',
            name: 'Creations',
            url: 'https://creations.co.za'
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
                                Serving Centurion & Midstream
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.1}>
                            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl mb-6">
                                Modern Accounting for <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-blue-600">Centurion Business.</span>
                            </h1>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2}>
                            <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
                                Supporting the Logistics, Tech, and Residential Estate businesses that drive Centurion's economy. Real-time compliance, zero friction.
                            </p>
                        </MotionWrapper>
                        <MotionWrapper delay={0.3} className="flex flex-col sm:flex-row gap-4">
                            <Link href="/get-a-quote">
                                <Button size="lg" className="h-12 px-8 text-base font-semibold group bg-accent hover:bg-accent/90 text-white">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="outline" size="lg" className="h-12 px-8 text-base">View Services</Button>
                            </Link>
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* Core Services */}
            <SectionWrapper variant="surface" padding="lg">
                <Container>
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
                                                More Info <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </MotionWrapper>
                        ))}
                    </StaggerChildren>
                </Container>
            </SectionWrapper>

            {/* Why Centurion */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <MotionWrapper>
                            <h2 className="text-3xl font-bold mb-6">Logistics & Tech Expertise</h2>
                            <p className="text-text-secondary mb-8">
                                Centurion is a hub for logistics and technology. We understand the specific tax implications for these industries, from depreciation on fleets to R&D claims for software.
                            </p>
                            <IconList
                                items={whyCenturion}
                                className="space-y-4"
                                itemClassName="flex items-start gap-3"
                                iconClassName="mt-1 h-5 w-5 text-accent shrink-0"
                            />
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="relative">
                            <div className="aspect-video rounded-3xl bg-surface-elevated border border-border flex items-center justify-center relative overflow-hidden p-8">
                                <div className="text-center">
                                    <Truck className="h-16 w-16 text-accent mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Fleet & Asset Mastery</h3>
                                    <p className="text-text-secondary">Optimal write-offs and asset registers.</p>
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
                        <h2 className="text-3xl font-bold mb-4">Centurion FAQs</h2>
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
