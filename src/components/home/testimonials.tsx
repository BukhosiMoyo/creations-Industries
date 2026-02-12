import { Quote, Star } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"

const testimonials = [
    {
        quote: "They took over our bookkeeping within a week and we have not had a late SARS filing since. The process was completely painless.",
        author: "Client, Start-up Founder"
    },
    {
        quote: "What I appreciate most is the clarity. Every report is understandable, every deadline is met, and I always know where my business stands.",
        author: "Client, SME Owner"
    },
    {
        quote: "We needed help preparing for a government tender. They organised our tax clearance, B-BBEE, and CSD profile efficiently and on time.",
        author: "Client, Construction Director"
    }
]

export function TestimonialsSection() {
    return (
        <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
            <Container>
                <MotionWrapper className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl mb-4">What Our Clients Say</h2>
                    <p className="text-lg text-text-secondary">Building trust through precision and reliability.</p>
                </MotionWrapper>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <MotionWrapper key={i} delay={i * 0.1}>
                            <Card className="h-full border-border bg-background shadow-sm hover:shadow-xl transition-all duration-300">
                                <CardContent className="pt-8">
                                    <div className="flex gap-1 mb-6">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                                        ))}
                                    </div>
                                    <Quote className="h-10 w-10 text-accent/10 mb-4" />
                                    <p className="text-text-secondary italic mb-8 leading-relaxed">&quot;{item.quote}&quot;</p>
                                </CardContent>
                                <CardFooter className="border-t border-border/50 pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent text-xs">
                                            {item.author.charAt(0)}
                                        </div>
                                        <p className="text-sm font-bold text-text-primary">{item.author}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </MotionWrapper>
                    ))}
                </StaggerChildren>
            </Container>
        </SectionWrapper>
    )
}
