"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CurvyGraphProps {
    className?: string
    color?: string
}

export function CurvyGraph({ className, color = "var(--color-accent)" }: CurvyGraphProps) {
    // Define a nicer, smoother curvy path that stays well within the 100 height
    // Using a more controlled set of points to avoid "popping out"
    const path = "M 0 70 C 50 70, 70 20, 120 20 C 170 20, 190 80, 240 80 C 290 80, 320 40, 400 30"

    // Create a closed area for the gradient fill
    const areaPath = `${path} L 400 100 L 0 100 Z`

    return (
        <div className={cn("relative w-full h-full overflow-hidden rounded-xl", className)}>
            <svg
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="graph-gradient-new" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Gradient Fill */}
                <motion.path
                    d={areaPath}
                    fill="url(#graph-gradient-new)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                />

                {/* Animated Line */}
                <motion.path
                    d={path}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        duration: 4,
                        ease: [0.22, 1, 0.36, 1], // Quintic ease for ultra-smooth deceleration
                        delay: 0.2
                    }}
                />

                {/* Animated Points - simplified and placed on the new curve */}
                {[120, 240, 400].map((x, i) => {
                    const y = [20, 80, 30][i]
                    return (
                        <motion.circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="var(--color-background)"
                            stroke={color}
                            strokeWidth="2.5"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2 + i * 0.3, duration: 0.6, ease: "backOut" }}
                        />
                    )
                })}
            </svg>
        </div>
    )
}
