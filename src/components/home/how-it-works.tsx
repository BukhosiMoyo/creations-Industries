import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { ArrowRight } from "lucide-react"

const steps = [
    { num: "01", title: "Consultation", desc: "We listen to your needs and review your current setup." },
    { num: "02", title: "Proposal", desc: "Clear fees, clear deliverables. No surprises." },
    { num: "03", title: "Onboarding", desc: "We simplify the paperwork and get access sorted." },
    { num: "04", title: "Service", desc: "We handle the filings, the books, and the deadlines." },
    { num: "05", title: "Review", desc: "Regular check-ins to match our service to your growth." },
]

export function HowItWorksSection() {
    return (
        <SectionWrapper showGlow showDotGrid patternIntensity="strong" className="border-t border-border">
            <Container>
                <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-4">How We Work With You</h2>
                    <p className="text-lg text-text-secondary">A straightforward process designed to get your business compliant quickly.</p>
                </MotionWrapper>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[28px] left-0 w-full h-[2px] bg-border/50 z-0"></div>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
                        {steps.map((step, i) => (
                            <MotionWrapper key={step.num} delay={i * 0.1} className="bg-surface lg:bg-transparent p-6 lg:p-0 rounded-2xl border lg:border-none border-border shadow-sm lg:shadow-none">
                                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                                    <div className="h-14 w-14 rounded-full bg-background border-4 border-surface shadow-md ring-2 ring-accent text-accent font-black flex items-center justify-center mb-6 relative z-10 text-xl transform group-hover:scale-110 transition-transform">
                                        {step.num}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-base text-text-secondary leading-relaxed">{step.desc}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </StaggerChildren>
                </div>

                <MotionWrapper direction="up" delay={0.6} className="mt-20 text-center">
                    <Link href="/contact">
                        <Button variant="glow" size="lg" className="h-14 px-12 text-lg font-bold group">
                            Book a Consultation <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </MotionWrapper>
            </Container>
        </SectionWrapper>
    )
}
