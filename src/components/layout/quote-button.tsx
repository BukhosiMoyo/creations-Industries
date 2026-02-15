"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClipboardEdit } from "lucide-react"
import { trackEvent, ConversionEvents } from "@/lib/analytics"

export function QuoteButton() {
    return (
        <Link
            href="/get-a-quote"
            onClick={() => {
                trackEvent({
                    action: ConversionEvents.REQUEST_QUOTE_CLICK,
                    category: 'navigation',
                    label: 'desktop_header_cta'
                })
            }}
        >
            <Button size="sm" className="hidden md:flex bg-accent hover:bg-accent/90 text-white border-none shadow-sm">
                <ClipboardEdit className="mr-2 h-4 w-4" />
                Request Quote
            </Button>
        </Link>
    )
}
