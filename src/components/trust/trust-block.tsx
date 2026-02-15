import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { CheckCircle2, FileText, Lock, MessageSquare } from "lucide-react"

interface TrustBlockProps {
    className?: string
}

export function TrustBlock({ className }: TrustBlockProps) {
    const steps = [
        {
            icon: MessageSquare,
            title: "1. Clear Communication",
            desc: "No jargon. We explain exactly what we need and why, using secure channels (avoiding email for sensitive data)."
        },
        {
            icon: FileText,
            title: "2. You Provide",
            desc: "Bank statements, invoices, and expense slips. We provide a simple checklist every month so you never miss a document."
        },
        {
            icon: CheckCircle2,
            title: "3. We Handle",
            desc: "Processing, reconciliation, SARS submissions, and compliance checks. You get a clean set of accounts and peace of mind."
        },
        {
            icon: Lock,
            title: "4. Data Security",
            desc: "Your financial data is stored in encrypted, cloud-based vaults. We adhere to strict POPIA and GDPR standards."
        }
    ]

    return (
        <SectionWrapper variant="surface" padding="lg" className={className}>
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">How We Work</h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            Accounting doesn't have to be chaotic. We use a structured, transparent process to ensure your compliance is never at risk.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="mt-1">
                                    <div className="h-10 w-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-primary">
                                        <step.icon className="h-5 w-5" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </SectionWrapper>
    )
}
