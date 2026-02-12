"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractiveGridPatternProps {
    className?: string
    width?: number
    height?: number
    squares?: [number, number][] // [x, y] coordinates of highlighted squares
    classNameSquare?: string
    maxOpacity?: number
    duration?: number
    repeatDelay?: number
}

/**
 * A grid pattern that highlights the cell under the cursor.
 */
export function InteractiveGridPattern({
    className,
    width = 40,
    height = 40,
    classNameSquare,
    maxOpacity = 0.5,
    ...props
}: InteractiveGridPatternProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [hoveredCell, setHoveredCell] = useState<{ x: number, y: number } | null>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const col = Math.floor(x / width)
        const row = Math.floor(y / height)

        setHoveredCell({ x: col, y: row })
    }

    const handleMouseLeave = () => {
        setHoveredCell(null)
    }

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 h-full w-full border-gray-200/30 dark:border-gray-800/30", className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full stroke-gray-200 dark:stroke-gray-800/40 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="interactive-grid-pattern"
                        width={width}
                        height={height}
                        patternUnits="userSpaceOnUse"
                        x="-1"
                        y="-1"
                    >
                        <path
                            d={`M.5 ${height}V.5H${width}`}
                            fill="none"
                            strokeDasharray="0"
                        />
                    </pattern>
                </defs>

                <rect width="100%" height="100%" strokeWidth={0} fill="url(#interactive-grid-pattern)" />

                <AnimatePresence>
                    {hoveredCell && (
                        <motion.rect
                            key={`${hoveredCell.x}-${hoveredCell.y}`}
                            width={width - 1}
                            height={height - 1}
                            x={hoveredCell.x * width + 1}
                            y={hoveredCell.y * height + 1}
                            className={cn(
                                "fill-red-500/20 dark:fill-red-500/20 stroke-red-500/50 dark:stroke-red-500/50",
                                classNameSquare
                            )}
                            strokeWidth={1}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                        />
                    )}
                </AnimatePresence>
            </svg>
        </div>
    )
}
