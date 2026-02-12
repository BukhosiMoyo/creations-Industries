"use client"

import { cn } from "@/lib/utils"

export function LineGridOverlay({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden", className)}>
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px'
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--color-accent-rgb),0.05),transparent_70%)]" />
        </div>
    )
}
