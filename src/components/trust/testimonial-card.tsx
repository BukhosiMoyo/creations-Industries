import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
    quote: string
    author: string
    role?: string
    variant?: "primary" | "subtle"
    className?: string
}

export function TestimonialCard({
    quote,
    author,
    role,
    variant = "primary",
    className
}: TestimonialCardProps) {
    return (
        <div className={cn(
            "rounded-xl p-8 relative overflow-hidden",
            {
                "bg-surface border border-border hover:border-primary/20 transition-colors": variant === "primary",
                "bg-surface-elevated border border-border/50": variant === "subtle"
            },
            className
        )}>
            {/* Decorative Quote Mark */}
            <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/10 -z-10 scale-150 rotate-180" />

            <figure className="relative z-10">
                <blockquote className="text-lg md:text-xl font-medium text-text-primary leading-relaxed mb-6">
                    "{quote}"
                </blockquote>
                <figcaption className="flex flex-col">
                    <span className="font-bold text-text-primary">{author}</span>
                    {role && <span className="text-sm text-text-secondary">{role}</span>}
                </figcaption>
            </figure>
        </div>
    )
}
