import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper } from "@/components/ui/motion-wrapper"

export function AboutPreviewSection() {
    return (
        <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
            <Container>
                <MotionWrapper className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl mb-8">Built on Experience. Driven by Precision.</h2>
                    <p className="text-lg text-text-secondary leading-relaxed mb-10">
                        We are a South African accounting and compliance firm that works with businesses at every stage.
                        Our team brings experience across tax, accounting, company secretarial services, and business advisory.
                        We understand the local regulatory landscape because we work within it every day.
                        Our approach is straightforward: we listen, we structure, and we deliver on time.
                    </p>
                    <Link href="/about">
                        <Button variant="outline" size="lg" className="h-12 px-8 group">
                            Learn More About Us <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </MotionWrapper>
            </Container>
        </SectionWrapper>
    )
}
