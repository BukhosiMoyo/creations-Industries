"use client"

import Link, { LinkProps } from "next/link"
import { trackEvent, ConversionEvents } from "@/lib/analytics"
import { ReactNode } from "react"
import { Url } from "next/dist/shared/lib/router/router"

interface QuoteLinkProps extends Omit<LinkProps, 'onClick' | 'href'> {
    className?: string
    children: ReactNode
    eventLabel?: string
    href?: LinkProps['href']
}

export function QuoteLink({
    children,
    className,
    eventLabel = 'industry_page_cta',
    href = '/get-a-quote',
    ...props
}: QuoteLinkProps) {
    return (
        <Link
            href={href}
            className={className}
            onClick={() => {
                trackEvent({
                    action: ConversionEvents.REQUEST_QUOTE_CLICK,
                    category: 'conversion',
                    label: eventLabel
                })
            }}
            {...props}
        >
            {children}
        </Link>
    )
}
