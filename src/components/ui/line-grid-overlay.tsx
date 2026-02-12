import { cn } from "@/lib/utils"

interface LineGridOverlayProps {
    intensity?: "subtle" | "normal" | "strong"
    className?: string
}

export function LineGridOverlay({ intensity = "subtle", className }: LineGridOverlayProps) {
    const opacityClass = {
        subtle: "opacity-[0.04] dark:opacity-[0.03]",
        normal: "opacity-[0.06] dark:opacity-[0.04]",
        strong: "opacity-[0.08] dark:opacity-[0.06]",
    }[intensity]

    return (
        <div
            className={cn(
                "absolute inset-0 z-0 pointer-events-none select-none",
                opacityClass,
                className
            )}
            aria-hidden="true"
        >
            <svg
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <defs>
                    <pattern
                        id="line-grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-text-primary"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#line-grid)" />
            </svg>
        </div>
    )
}
