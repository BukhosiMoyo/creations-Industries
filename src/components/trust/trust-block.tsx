import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { CheckCircle2, FileText, Lock, MessageSquare, Briefcase, RefreshCw, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrustBlockProps {
    className?: string
    variant?: "standard" | "process" | "data"
}

export function TrustBlock({ className, variant = "standard" }: TrustBlockProps) {
    // 1. STANDARD VERSION (How We Work)
    const standardContent = {
        title: "How We Work",
        description: "We believe good accounting starts with structure and consistency. Our approach is designed to give business owners clarity without unnecessary complexity.",
        steps: [
            { icon: Briefcase, text: "A clear onboarding process" },
            { icon: RefreshCw, text: "Defined monthly timelines" },
            { icon: CheckCircle2, text: "Accurate reconciliation and reporting" },
            { icon: MessageSquare, text: "Practical explanations, not accounting jargon" },
            { icon: FileText, text: "Ongoing improvements as your business grows" }
        ],
        footer: "Our focus is on building reliable financial systems that support better decisions over time."
    }

    // 2. PROCESS TRANSPARENCY (Short Version)
    const processContent = {
        title: "What Working With Us Looks Like",
        description: "We follow a structured process so nothing falls through the cracks:",
        steps: [
            { icon: FileText, text: "You provide documents or system access" },
            { icon: RefreshCw, text: "We reconcile and review your records" },
            { icon: CheckCircle2, text: "We prepare clear reports" },
            { icon: MessageSquare, text: "We flag issues early and explain what they mean" }
        ],
        footer: "Consistency is what creates reliable numbers."
    }

    // 3. DOCUMENT & DATA HANDLING (Trust Signal)
    const dataContent = {
        title: "Document Handling & Data Care",
        description: "We work with structured document processes to keep records accurate and organised. Clients are guided on what to submit and when, ensuring information is handled efficiently and responsibly.",
        steps: [], // No bullet points for this one in the copy, but we can add visual cues or keep it simple
        footer: "Clear records reduce errors, delays, and compliance risk."
    }

    const content = variant === "process" ? processContent : variant === "data" ? dataContent : standardContent

    return (
        <SectionWrapper variant="surface" padding="lg" className={cn("border-y border-border/40", className)}>
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">{content.title}</h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                            {content.description}
                        </p>
                    </div>

                    {content.steps.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto mb-10">
                            {content.steps.map((step, index) => (
                                <div key={index} className="flex items-start gap-3 bg-background p-4 rounded-xl border border-border/50">
                                    <div className="mt-0.5 text-accent shrink-0">
                                        <step.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-text-primary font-medium">{step.text}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center text-text-muted italic max-w-2xl mx-auto">
                        "{content.footer}"
                    </div>
                </div>
            </Container>
        </SectionWrapper>
    )
}
