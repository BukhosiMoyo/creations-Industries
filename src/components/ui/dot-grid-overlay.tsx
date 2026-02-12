import { cn } from "@/lib/utils"

interface DotGridOverlayProps {
    intensity?: "subtle" | "normal" | "strong"
    className?: string
}

export function DotGridOverlay({ intensity = "subtle", className }: DotGridOverlayProps) {
    // Opacity maps: Light Mode / Dark Mode handles via CSS variables or classes
    // We use opacity classes that will look correct on the respective backgrounds

    const opacityClass = {
        subtle: "opacity-[0.05] dark:opacity-[0.03]",
        normal: "opacity-[0.08] dark:opacity-[0.05]",
        strong: "opacity-[0.10] dark:opacity-[0.07]",
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
                        id="dot-grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="1" cy="1" r="1" className="fill-text-primary" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-grid)" />
            </svg>
        </div>
    )
}
