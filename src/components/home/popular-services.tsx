"use client"

import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { Container } from "@/components/ui/container"
import { MotionWrapper } from "@/components/ui/motion-wrapper"

const popularServices = [
    { title: "VAT Registration", href: "/services/tax/vat-registration-returns" },
    { title: "Tax Clearance PIN", href: "/services/tax/tax-clearance-certificates" },
    { title: "Company Registration", href: "/services/company-services/company-registration" },
    { title: "Shelf Companies", href: "/services/company-services/shelf-companies" },
    { title: "Financial Statements", href: "/services/accounting/financial-statements-preparation" },
]

export function PopularServices() {
    return (
        <div className="border-b border-border/40 bg-surface/50 backdrop-blur-sm">
            <Container>
                <div className="flex flex-col md:flex-row items-center gap-4 py-4 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary font-medium whitespace-nowrap">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        <span className="hidden sm:inline">Popular Requests:</span>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                        {popularServices.map((service, i) => (
                            <Link
                                key={i}
                                href={service.href}
                                className="text-text-muted hover:text-accent transition-colors flex items-center gap-1 group"
                            >
                                {service.title}
                                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}
