import Link from "next/link"
import { ArrowRight, CheckCircle2, FileSearch, Handshake, Rocket } from "lucide-react"
import { trackEvent, ConversionEvents } from "@/lib/analytics"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { QuoteLink } from "@/components/common/quote-link"
import { constructMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = constructMetadata({
    title: "How It Works",
    description: "A simple, transparent 4-step process to get your business finances on track. From discovery to ongoing support."
})

const steps = [
    {
        step: 1,
        title: "Discovery Call",
        description: "We start with a 30-minute conversation to understand your business, your pain points, and your goals. No sales pitch, just listening.",
        icon: Handshake
    },
    {
        step: 2,
        title: "Proposal & Strategy",
        description: "We send a transparent, itemized proposal outlining exactly what we will do, how much it costs, and the timelines required.",
        icon: FileSearch
    },
    {
        step: 3,
        title: "Onboarding",
        description: "Once approved, we set you up on our systems, request access to your data, and introduce you to your dedicated accountant.",
        icon: Rocket
    },
    {
        step: 4,
        title: "Execution & Ongoing Support",
        description: "We get to work. Whether it's a one-off project or monthly retainer, we deliver on time and keep you updated every step of the way.",
        icon: CheckCircle2
    }
]

export default function HowItWorksPage() {
    return (
        <main>
            <SectionWrapper showGlow patternIntensity="subtle" padding="lg">
                <Container className="text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How It Works</h1>
                    <p className="text-xl text-text-secondary mb-8">
                        A simple, transparent process designed to get you from chaos to clarity in four easy steps.
                    </p>
                </Container>
            </SectionWrapper>

            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

                        <div className="space-y-12 md:space-y-24 relative">
                            {steps.map((item, index) => {
                                const isEven = index % 2 === 0
                                return (
                                    <div key={item.step} className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                        <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-accent/10 text-accent mb-4 md:hidden">
                                                <item.icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-text-secondary text-lg leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="relative z-10 hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-surface-elevated border-4 border-background shadow-lg">
                                            <span className="text-xl font-bold text-accent">{item.step}</span>
                                        </div>

                                        <div className="flex-1 hidden md:block" />

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper showDotGrid padding="lg">
                <Container className="max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
                        <p className="text-text-secondary text-lg">Everything you need to know about getting started.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Do I need to change banks?</h3>
                            <p className="text-text-secondary leading-relaxed">
                                No. We work with all major South African banks. We simply set up read-only feeds or request statements to keep your books up to date without interfering with your banking relationships.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">What software do you use?</h3>
                            <p className="text-text-secondary leading-relaxed">
                                We are Xero and Sage partners. If you don't have a preference, we'll recommend the best fit for your industry. If you already have a subscription, we can take it over or work within your existing setup.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">How fast is the onboarding?</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Typically 2-3 days. Once we have your documents and access, we can usually start processing your accounts within the same week. We prioritize speed so you don't lose momentum.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Can I upgrade my package later?</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Absolutely. As you grow, your needs will change. You can switch from a compliance-only package to a full advisory retainer at any time with no penalties.
                            </p>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper padding="lg" showGlow patternIntensity="strong">
                <Container className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
                    <QuoteLink eventLabel="how_it_works_cta">
                        <Button size="lg" className="h-14 px-8 text-lg">
                            Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </QuoteLink>
                </Container>
            </SectionWrapper>
        </main >
    )
}
