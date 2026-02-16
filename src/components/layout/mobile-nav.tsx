"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Home, Briefcase, Info, Phone, LayoutGrid, FileText, ChevronRight, LogIn, ClipboardEdit, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

import { useRouter } from "next/navigation"
import { trackEvent, ConversionEvents } from "@/lib/analytics"

export function MobileNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-text-primary hover:bg-surface-elevated">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 border-l border-border/40">
                <SheetHeader className="p-4 text-left border-b border-border/40 bg-surface/50 backdrop-blur-sm">
                    <SheetTitle>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Creations"
                                width={120}
                                height={32}
                                className="h-6 w-auto object-contain dark:hidden"
                            />
                            <Image
                                src="/logo-dark.png"
                                alt="Creations"
                                width={120}
                                height={32}
                                className="h-6 w-auto object-contain hidden dark:block"
                            />
                        </div>
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)]">
                    <div className="flex flex-col p-4 space-y-6">
                        {/* Main Links */}
                        <div className="flex flex-col space-y-1">
                            <MobileLink href="/" onOpenChange={setOpen} icon={Home}>Home</MobileLink>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="services" className="border-none">
                                    <AccordionTrigger className="py-2 hover:no-underline hover:bg-accent/5 rounded-md px-3 text-sm font-medium">
                                        <span className="flex items-center gap-3">
                                            <LayoutGrid className="h-4 w-4 text-primary" />
                                            Services
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0 pl-4">
                                        <div className="flex flex-col space-y-4 pt-4 border-l border-border/50 ml-2 pl-4">
                                            {/* Accounting & Bookkeeping */}
                                            <div className="space-y-1">
                                                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2">Financial</h4>
                                                <MobileLink href="/services/accounting" onOpenChange={setOpen} icon={FileText} className="text-sm text-text-secondary">Accounting</MobileLink>
                                                <MobileLink href="/services/bookkeeping" onOpenChange={setOpen} icon={FileText} className="text-sm text-text-secondary">Bookkeeping</MobileLink>
                                                <MobileLink href="/services/payroll-service" onOpenChange={setOpen} icon={FileText} className="text-sm text-text-secondary">Payroll</MobileLink>
                                            </div>

                                            {/* Tax & Compliance */}
                                            <div className="space-y-1">
                                                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2">Tax & Compliance</h4>
                                                <MobileLink href="/services/tax" onOpenChange={setOpen} icon={FileText} className="text-sm text-text-secondary">Tax Services</MobileLink>
                                                <MobileLink href="/services/tax/vat-registration-returns" onOpenChange={setOpen} icon={FileText} className="text-sm text-text-secondary">VAT</MobileLink>
                                                <MobileLink href="/services/company-services/annual-returns-filing" onOpenChange={setOpen} icon={FileText} className="text-sm text-text-secondary">Annual Returns</MobileLink>
                                            </div>

                                            {/* Company Services */}
                                            <div className="space-y-1">
                                                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2">Company</h4>
                                                <MobileLink href="/services/company-services" onOpenChange={setOpen} icon={Building} className="text-sm text-text-secondary">Company Services</MobileLink>
                                                <MobileLink href="/services/company-services/shelf-companies" onOpenChange={setOpen} icon={Building} className="text-sm text-text-secondary">Shelf Companies</MobileLink>
                                            </div>

                                            <MobileLink href="/services" onOpenChange={setOpen} icon={ChevronRight} className="text-sm font-semibold text-accent mt-2">View All Services</MobileLink>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="locations" className="border-none">
                                    <AccordionTrigger className="py-2 hover:no-underline hover:bg-accent/5 rounded-md px-3 text-sm font-medium">
                                        <span className="flex items-center gap-3">
                                            <LayoutGrid className="h-4 w-4 text-primary" />
                                            Locations
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0 pl-4">
                                        <div className="flex flex-col space-y-1 pt-1 border-l border-border/50 ml-2 pl-2">
                                            <MobileLink href="/locations/pretoria" onOpenChange={setOpen} className="text-sm text-text-secondary">Pretoria</MobileLink>
                                            <MobileLink href="/locations/johannesburg" onOpenChange={setOpen} className="text-sm text-text-secondary">Johannesburg</MobileLink>
                                            <MobileLink href="/locations/centurion" onOpenChange={setOpen} className="text-sm text-text-secondary">Centurion</MobileLink>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="industries" className="border-none">
                                    <AccordionTrigger className="py-2 hover:no-underline hover:bg-accent/5 rounded-md px-3 text-sm font-medium">
                                        <span className="flex items-center gap-3">
                                            <Briefcase className="h-4 w-4 text-primary" />
                                            Industries
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0 pl-4">
                                        <div className="flex flex-col space-y-1 pt-1 border-l border-border/50 ml-2 pl-2">
                                            <MobileLink href="/industries/medical-professionals" onOpenChange={setOpen} className="text-sm text-text-secondary">Medical</MobileLink>
                                            <MobileLink href="/industries/engineering-consultants" onOpenChange={setOpen} className="text-sm text-text-secondary">Engineering</MobileLink>
                                            <MobileLink href="/industries/legal-attorneys" onOpenChange={setOpen} className="text-sm text-text-secondary">Legal</MobileLink>
                                            <MobileLink href="/industries/construction-projects" onOpenChange={setOpen} className="text-sm text-text-secondary">Construction</MobileLink>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <MobileLink href="/about" onOpenChange={setOpen} icon={Info}>About Us</MobileLink>
                            <MobileLink href="/how-it-works" onOpenChange={setOpen} icon={LayoutGrid}>Process</MobileLink>
                            <MobileLink href="/contact" onOpenChange={setOpen} icon={Phone}>Contact</MobileLink>
                        </div>
                    </div>
                </ScrollArea>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/40 bg-surface/50 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/login" onClick={() => setOpen(false)}>
                            <Button variant="outline" className="w-full justify-center">
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                            </Button>
                        </Link>
                        <Link
                            href="/get-a-quote"
                            onClick={() => {
                                trackEvent({
                                    action: ConversionEvents.REQUEST_QUOTE_CLICK,
                                    category: 'navigation',
                                    label: 'mobile_menu_cta'
                                })
                                setOpen(false)
                            }}
                        >
                            <Button variant="default" className="w-full justify-center bg-accent hover:bg-accent/90 text-white">
                                <ClipboardEdit className="mr-2 h-4 w-4" />
                                Quote
                            </Button>
                        </Link>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

interface MobileLinkProps extends React.PropsWithChildren {
    href: string
    onOpenChange?: (open: boolean) => void
    className?: string
    icon?: React.ElementType
}

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    icon: Icon,
    ...props
}: MobileLinkProps) {
    const router = useRouter()
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href)
                onOpenChange?.(false)
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent/5 hover:text-accent group ${className}`}
            {...props}
        >
            {Icon && <Icon className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />}
            <span className="font-medium">{children}</span>
        </Link>
    )
}
