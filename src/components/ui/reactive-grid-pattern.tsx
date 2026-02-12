"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useSpring, useMotionValue, useTransform, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface ReactiveGridPatternProps {
    className?: string
    gap?: number
    intensity?: "subtle" | "normal" | "strong"
}

export function ReactiveGridPattern({
    className,
    gap = 40,
    intensity = "subtle",
}: ReactiveGridPatternProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    const mouseX = useMotionValue(-1000)
    const mouseY = useMotionValue(-1000)

    const springConfig = { damping: 20, stiffness: 150 }
    const xSpring = useSpring(mouseX, springConfig)
    const ySpring = useSpring(mouseY, springConfig)

    useEffect(() => {
        if (!containerRef.current) return

        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                })
            }
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    const handleMouseLeave = () => {
        mouseX.set(-1000)
        mouseY.set(-1000)
    }

    const cols = Math.ceil(dimensions.width / gap) + 1
    const rows = Math.ceil(dimensions.height / gap) + 1

    const baseOpacity = {
        subtle: 0.03,
        normal: 0.05,
        strong: 0.08,
    }[intensity]

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-auto",
                className
            )}
        >
            <svg
                className="h-full w-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <radialGradient id="line-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="1" />
                        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Vertical Lines */}
                {Array.from({ length: cols }).map((_, i) => (
                    <ReactiveLine
                        key={`v-${i}`}
                        x1={i * gap}
                        y1={0}
                        x2={i * gap}
                        y2={dimensions.height}
                        mouseX={xSpring}
                        mouseY={ySpring}
                        baseOpacity={baseOpacity}
                    />
                ))}

                {/* Horizontal Lines */}
                {Array.from({ length: rows }).map((_, i) => (
                    <ReactiveLine
                        key={`h-${i}`}
                        x1={0}
                        y1={i * gap}
                        x2={dimensions.width}
                        y2={i * gap}
                        mouseX={xSpring}
                        mouseY={ySpring}
                        baseOpacity={baseOpacity}
                    />
                ))}
            </svg>
        </div>
    )
}

function ReactiveLine({
    x1,
    y1,
    x2,
    y2,
    mouseX,
    mouseY,
    baseOpacity,
}: {
    x1: number
    y1: number
    x2: number
    y2: number
    mouseX: MotionValue<number>
    mouseY: MotionValue<number>
    baseOpacity: number
}) {
    const lineRef = useRef<SVGLineElement>(null)

    // A simple way to react: if mouse is near any point on the line
    // For better performance, we'll just check distance to the "center" of the line or a simplified proximity
    // but let's use a more visual approach where the line highlights locally.
    // Actually, animating a single SVG line component is easier if we just change its overall opacity/color.

    const [dist, setDist] = useState(1000)

    useEffect(() => {
        const unsubscribe = mouseX.on("change", (latestX: number) => {
            const latestY = mouseY.get()

            // Distance from point (latestX, latestY) to line segment
            // Simplified: distance to the nearest point on the line
            let d = 1000
            if (x1 === x2) { // Vertical
                d = Math.abs(latestX - x1)
            } else if (y1 === y2) { // Horizontal
                d = Math.abs(latestY - y1)
            }
            setDist(d)
        })
        return () => unsubscribe()
    }, [x1, y1, x2, y2, mouseX, mouseY])

    const threshold = 100
    const proximity = Math.max(0, 1 - dist / threshold)

    const opacity = baseOpacity + proximity * 0.3
    const strokeColor = proximity > 0 ? "var(--color-accent)" : "currentColor"

    return (
        <motion.line
            ref={lineRef}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={strokeColor}
            strokeWidth={1}
            animate={{
                strokeOpacity: opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
            }}
            className="text-text-primary"
        />
    )
}
