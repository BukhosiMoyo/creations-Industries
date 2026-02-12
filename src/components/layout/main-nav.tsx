"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const services = [
    {
        pillar: "Compliance",
        description: "Stay compliant with SARS, CIPC, and the Companies Act.",
        items: [
            { title: "Tax Services", href: "/services/tax-services" },
            { title: "CIPC Compliance", href: "/services/cipc-compliance" },
            { title: "Companies Act", href: "/services/companies-act-compliance" },
            { title: "Tender Readiness", href: "/services/tender-readiness" },
        ],
    },
    {
        pillar: "Accounting",
        description: "Precision in every number. Monthly books, payroll, and audit prep.",
        items: [
            { title: "Bookkeeping", href: "/services/bookkeeping" },
            { title: "Accounting", href: "/services/accounting" },
            { title: "Payroll Service", href: "/services/payroll-service" },
            { title: "Audit Readiness", href: "/services/audit-readiness" },
        ],
    },
    {
        pillar: "Intelligence",
        description: "Turn data into direction with advisory and analytics.",
        items: [
            { title: "Advisory Services", href: "/services/advisory-services" },
            { title: "Data Analytics", href: "/services/data-analytics-services" },
            { title: "Business IT", href: "/services/business-it-solutions" },
        ],
    },
]

export function MainNav() {
    return (
        <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent">Services</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="grid w-[800px] gap-3 p-4 md:grid-cols-3">
                                {services.map((pillar) => (
                                    <div key={pillar.pillar} className="flex flex-col space-y-2">
                                        <div className="mb-2">
                                            <h4 className="text-sm font-medium leading-none mb-1 text-accent">{pillar.pillar}</h4>
                                            <p className="text-xs text-text-muted leading-snug mb-2">{pillar.description}</p>
                                        </div>
                                        <ul className="space-y-1">
                                            {pillar.items.map((item) => (
                                                <ListItem key={item.title} title={item.title} href={item.href} />
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/about" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                                About
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/how-it-works" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                                Process
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/industries" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                                Industries
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ComponentRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-2 hover:bg-surface-elevated hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none transition-colors text-sm",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    {children && <p className="line-clamp-2 text-xs leading-snug text-text-muted">{children}</p>}
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
