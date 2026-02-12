import { cn } from "@/lib/utils"
// Imports for patterns would go here if we were using a barrel file, or imported directly
// We will assume usage by composition or direct props in implementation
// Actually, per prompt 4 rules, SectionWrapper accepts pattern props.

import { DotGridOverlay } from "@/components/ui/dot-grid-overlay"
import { LineGridOverlay } from "@/components/ui/line-grid-overlay"
import { AuroraGlowOverlay } from "@/components/ui/aurora-glow-overlay"

import { ReactiveGridPattern } from "@/components/ui/reactive-grid-pattern"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "base" | "surface"
    padding?: "none" | "sm" | "md" | "lg"
    showDotGrid?: boolean
    showLineGrid?: boolean
    showGlow?: boolean
    showReactiveGrid?: boolean
    patternIntensity?: "subtle" | "normal" | "strong"
}

export function SectionWrapper({
    className,
    variant = "base",
    padding = "lg",
    showDotGrid = false,
    showLineGrid = false,
    showGlow = false,
    showReactiveGrid = false,
    patternIntensity = "subtle",
    children,
    ...props
}: SectionWrapperProps) {

    const bgClass = variant === "surface" ? "bg-surface" : "bg-background"

    const paddingClass = {
        none: "",
        sm: "py-12 md:py-16",
        md: "py-16 md:py-24",
        lg: "py-20 md:py-32",
    }[padding]

    return (
        <section
            className={cn("relative w-full overflow-hidden", bgClass, paddingClass, className)}
            {...props}
        >
            {/* Pattern Layer (z-0 to z-5) */}
            {showDotGrid && <DotGridOverlay intensity={patternIntensity} />}
            {showLineGrid && <LineGridOverlay intensity={patternIntensity} />}
            {showReactiveGrid && <ReactiveGridPattern intensity={patternIntensity} />}
            {showGlow && <AuroraGlowOverlay />}

            {/* Content Layer (z-10) */}
            <div className="relative z-10">
                {children}
            </div>
        </section>
    )
}
