import { cn } from "@/lib/utils"

export function AuroraGlowOverlay({ className }: { className?: string }) {
    // Uses glow-accent token which handles color and basic opacity
    // We add structural styling here

    return (
        <div
            className={cn(
                "absolute inset-0 z-1 pointer-events-none select-none overflow-hidden",
                className
            )}
            aria-hidden="true"
        >
            <div
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-glow-accent blur-[100px] opacity-100 dark:opacity-100 transition-opacity duration-1000"
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-glow-accent blur-[100px] opacity-80 dark:opacity-80 transition-opacity duration-1000"
            />
        </div>
    )
}
