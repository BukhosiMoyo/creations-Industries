import React from "react"
import { LucideIcon, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconListItem {
    text: string | React.ReactNode
    icon?: LucideIcon
    iconColor?: string
}

interface IconListProps {
    items: (string | IconListItem)[]
    defaultIcon?: LucideIcon
    className?: string
    itemClassName?: string
    iconClassName?: string
}

export function IconList({
    items,
    defaultIcon: DefaultIcon = CheckCircle2,
    className,
    itemClassName,
    iconClassName,
}: IconListProps) {
    return (
        <ul className={cn("space-y-3", className)}>
            {items.map((item, index) => {
                const isString = typeof item === "string"
                const text = isString ? item : item.text
                const Icon = isString ? DefaultIcon : item.icon || DefaultIcon
                const color = isString ? "text-accent" : item.iconColor || "text-accent"

                return (
                    <li
                        key={index}
                        className={cn("flex items-start gap-3 text-text-secondary", itemClassName)}
                    >
                        <Icon
                            className={cn("h-5 w-5 mt-0.5 shrink-0", color, iconClassName)}
                        />
                        <span className="leading-relaxed">{text}</span>
                    </li>
                )
            })}
        </ul>
    )
}
