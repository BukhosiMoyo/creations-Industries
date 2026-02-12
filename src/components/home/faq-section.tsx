import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MotionWrapper } from "@/components/ui/motion-wrapper"
import { HelpCircle } from "lucide-react"

const faqs = [
    {
        q: "Do you work with businesses outside of Gauteng?",
        a: "Yes, we are a fully digital firm serving clients across South Africa. We use cloud accounting software and secure portals to manage everything remotely."
    },
    {
        q: "Can you help with backlog SARS returns?",
        a: "Absolutely. We specialize in compliance catch-up work. We can assess your outstanding returns, communicate with SARS, and get your tax affairs up to date."
    },
    {
        q: "What accounting software do you use?",
        a: "We primarily work with Xero and Sage, but we can support other platforms depending on your needs. We believe in cloud-first accounting for real-time visibility."
    },
    {
        q: "How quickly can you register my new company?",
        a: "CIPC company registration typically takes 3-5 business days, dependent on CIPC processing times. We handle the name reservation and full registration process."
    }
]

export function FaqSection() {
    return (
        <SectionWrapper padding="lg" showLineGrid patternIntensity="subtle">
            <Container className="max-w-3xl">
                <MotionWrapper className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-accent/5 flex items-center justify-center">
                            <HelpCircle className="h-6 w-6 text-accent" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-text-secondary">Quick answers to common queries about our process and services.</p>
                </MotionWrapper>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl bg-background/50 backdrop-blur-sm px-4 overflow-hidden shadow-sm transition-all hover:border-accent/30">
                            <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline hover:text-accent group">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-text-secondary pb-4 leading-relaxed">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Container>
        </SectionWrapper>
    )
}
