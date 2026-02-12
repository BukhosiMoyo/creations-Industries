import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { QuoteForm } from "@/components/forms/quote-form"
import { CheckCircle2 } from "lucide-react"

export default function QuotePage() {
    return (
        <main>
            <SectionWrapper showGlow patternIntensity="subtle" padding="lg" className="border-b border-border/40">
                <Container className="text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Request a Quote</h1>
                    <p className="text-xl text-text-secondary mb-8">
                        Tell us a bit about your business and we will provide a comprehensive, transparent quote.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" /> No hidden fees
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" /> Response within 24 hours
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" /> Tailored to your needs
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <div className="bg-background rounded-2xl border border-border p-6 md:p-10 shadow-sm">
                        <QuoteForm />
                    </div>
                </Container>
            </SectionWrapper>
        </main>
    )
}
