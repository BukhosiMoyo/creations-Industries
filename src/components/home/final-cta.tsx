import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper } from "@/components/ui/motion-wrapper"

export function FinalCtaSection() {
    return (
        <SectionWrapper showGlow showDotGrid patternIntensity="strong" className="border-t border-border overflow-hidden">
            <Container className="text-center relative py-12 md:py-24">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

                <MotionWrapper direction="up" className="relative z-10 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-8 tracking-wider uppercase">
                        <Sparkles className="h-3 w-3" /> Partner With Experts
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary mb-8 leading-[1.1]">
                        Ready to Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Business in Order?</span>
                    </h2>

                    <p className="text-xl text-text-secondary mb-12 leading-relaxed opacity-90">
                        Whether you need monthly bookkeeping, help with SARS compliance, or a full accounting setup — we are ready to start.
                        Request a quote today and get a response within one business day.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/quote">
                            <Button variant="glow" size="lg" className="h-16 px-12 text-xl font-bold rounded-full group">
                                Request a Free Quote <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>

                    <p className="text-sm font-semibold text-text-muted mt-8 flex items-center justify-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-success"></span> No obligation. No hidden fees.
                    </p>
                </MotionWrapper>
            </Container>
        </SectionWrapper>
    )
}
