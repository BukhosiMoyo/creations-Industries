"use client"

import React, { useState, useEffect } from "react"
import { motion, animate } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface FloatingStatProps {
    label: string
    value: number
    prefix?: string
    suffix?: string
    icon?: LucideIcon
    className?: string
    delay?: number
}

export function FloatingStat({
    label,
    value,
    prefix = "",
    suffix = "",
    icon: Icon,
    className,
    delay = 0,
}: FloatingStatProps) {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 3,
            delay: delay + 1,
            onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
            ease: "easeOut",
        })
        return () => controls.stop()
    }, [value, delay])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
                opacity: 1,
                scale: 1,
                // Ultra-smooth floating with organic drift
                y: [0, -15, 0],
                x: [0, 8, 0],
                rotate: [0, 0.5, 0, -0.5, 0],
            }}
            transition={{
                opacity: { duration: 1.2, delay },
                scale: { duration: 1.2, delay, ease: "backOut" },
                y: {
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                },
                x: {
                    duration: 15, // Desynced for organic feel
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay * 1.5,
                },
                rotate: {
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                }
            }}
            style={{
                willChange: "transform, opacity",
                transformStyle: "preserve-3d", // Better depth handling
                transform: "translateZ(0)" // hardware acceleration
            }}
            className={cn(
                "absolute p-4 md:p-5 rounded-2xl bg-background/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 pointer-events-none select-none min-w-[160px] flex items-center gap-4",
                className
            )}
        >
            {Icon && (
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Icon size={22} className="md:size-24" />
                </div>
            )}
            <div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">{label}</div>
                <div className="text-lg md:text-xl font-black text-text-primary tabular-nums">
                    {prefix}{displayValue.toLocaleString()}{suffix}
                </div>
            </div>
        </motion.div>
    )
}
