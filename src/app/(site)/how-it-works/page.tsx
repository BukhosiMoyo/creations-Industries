import Link from "next/link"
import { ArrowRight, CheckCircle2, FileSearch, Handshake, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"

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
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

                        <div className="space-y-12 md:space-y-24 relative">
                            {steps.map((item, index) => {
                                const isEven = index % 2 === 0
                                return (
                                    <div key={item.step} className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                        {/* Content Side */}
                                        <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-accent/10 text-accent mb-4 md:hidden">
                                                <item.icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-text-secondary text-lg leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Center Node */}
                                        <div className="relative z-10 hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-surface-elevated border-4 border-background shadow-lg">
                                            <span className="text-xl font-bold text-accent">{item.step}</span>
                                        </div>

                                        {/* Empty Side for Balance */}
                                        <div className="flex-1 hidden md:block" />

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper padding="lg" showGlow patternIntensity="strong">
                <Container className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
                    <Link href="/quote">
                        <Button size="lg" className="h-14 px-8 text-lg">
                            Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </Container>
            </SectionWrapper>
        </main>
    )
}
