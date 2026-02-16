"use client"

import * as React from "react"
import Link from "next/link"
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
        column: 1,
        groups: [
            {
                title: "Accounting",
                href: "/services/accounting",
                items: [
                    { title: "Monthly Accounting", href: "/services/accounting/monthly-accounting-services" },
                    { title: "Financial Statements", href: "/services/accounting/financial-statements-preparation" },
                    { title: "Management Accounts", href: "/services/accounting/management-accounts" },
                ]
            },
            {
                title: "Bookkeeping",
                href: "/services/bookkeeping",
                items: [
                    { title: "Monthly Processing", href: "/services/bookkeeping" },
                    { title: "Payroll Services", href: "/services/payroll-service" },
                ]
            }
        ]
    },
    {
        column: 2,
        groups: [
            {
                title: "Tax Services",
                href: "/services/tax",
                items: [
                    { title: "Corporate Tax (CIT)", href: "/services/tax/business-income-tax-returns" },
                    { title: "VAT Registration & Returns", href: "/services/tax/vat-registration-returns" },
                    { title: "Tax Clearance PINs", href: "/services/tax/tax-clearance-certificates" },
                    { title: "Dispute Resolution", href: "/services/tax/sars-penalties-disputes" },
                ]
            },
            {
                title: "Compliance",
                href: "/services/company-services/annual-returns-filing",
                items: [
                    { title: "Annual Returns (CIPC)", href: "/services/company-services/annual-returns-filing" },
                    { title: "Beneficial Ownership", href: "/services/company-services/annual-returns-filing" },
                ]
            }
        ]
    },
    {
        column: 3,
        groups: [
            {
                title: "Company Services",
                href: "/services/company-services",
                items: [
                    { title: "New Company Reg", href: "/services/company-services/company-registration" },
                    { title: "Director Amendments", href: "/services/company-services/company-amendments" },
                    { title: "Share Certificates", href: "/services/company-services/company-amendments" },
                    { title: "Deregistration", href: "/services/company-services/company-deregistration" },
                ]
            },
            {
                title: "Shelf Companies",
                href: "/services/company-services/shelf-companies",
                items: [
                    { title: "Buy Shelf Company", href: "/services/company-services/shelf-companies" },
                    { title: "Vintage Companies", href: "/services/company-services/shelf-companies" },
                ]
            }
        ]
    }
]

export function MainNav() {
    return (
        <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-text-primary hover:text-text-primary group">
                            Services
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="grid w-[900px] grid-cols-3 gap-6 p-6 bg-surface border border-border/40 shadow-xl rounded-xl">
                                {services.map((col, i) => (
                                    <div key={i} className="flex flex-col gap-6">
                                        {col.groups.map((group) => (
                                            <div key={group.title} className="flex flex-col space-y-3">
                                                <Link href={group.href} className="group/title">
                                                    <h4 className="text-sm font-bold leading-none text-accent flex items-center gap-1 group-hover/title:underline">
                                                        {group.title}
                                                    </h4>
                                                </Link>
                                                <ul className="space-y-2 border-l border-border/50 pl-3">
                                                    {group.items.map((item) => (
                                                        <li key={item.title}>
                                                            <Link href={item.href} className="block text-sm text-text-muted hover:text-text-primary transition-colors hover:translate-x-1 duration-200">
                                                                {item.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-text-primary hover:text-text-primary group">
                            Locations
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1 bg-surface border border-border/40 shadow-xl rounded-xl">
                                <ListItem title="Pretoria Hub" href="/locations/pretoria">
                                    Serving Pretoria East, Centurion, and Moot.
                                </ListItem>
                                <div className="pl-4 border-l-2 border-accent/10 space-y-1 mb-2">
                                    <Link href="/locations/pretoria/accounting" className="block text-xs text-text-muted hover:text-accent">Accounting in Pretoria</Link>
                                    <Link href="/locations/pretoria/tax" className="block text-xs text-text-muted hover:text-accent">Tax Services in Pretoria</Link>
                                    <Link href="/locations/pretoria/bookkeeping" className="block text-xs text-text-muted hover:text-accent">Bookkeeping in Pretoria</Link>
                                </div>
                                <ListItem title="Johannesburg Hub" href="/locations/johannesburg">
                                    Sandton, Rosebank, and greater JHB business hubs.
                                </ListItem>
                                <ListItem title="Centurion Hub" href="/locations/centurion">
                                    Logistics, Tech, and Estate-based businesses.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/about" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm font-medium text-text-primary hover:text-text-primary")}>
                                About
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/how-it-works" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm font-medium text-text-primary hover:text-text-primary")}>
                                Process
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/industries" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm font-medium text-text-primary hover:text-text-primary")}>
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
