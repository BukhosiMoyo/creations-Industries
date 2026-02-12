"use client"

import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    delay?: number
    duration?: number
    direction?: "up" | "down" | "left" | "right" | "none"
    distance?: number
}

export function MotionWrapper({
    children,
    delay = 0,
    duration = 0.5,
    direction = "up",
    distance = 20,
    className,
    ...props
}: MotionWrapperProps) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
    }

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Custom ease for a premium feel
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function StaggerChildren({
    children,
    staggerDelay = 0.1,
    delay = 0,
    className,
    ...props
}: {
    children: React.ReactNode
    staggerDelay?: number
    delay?: number
    className?: string
} & HTMLMotionProps<"div">) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay,
                    },
                },
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}
