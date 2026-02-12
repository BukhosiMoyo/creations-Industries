"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

export function MobileNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <SheetHeader className="px-1 text-left">
                    <SheetTitle>
                        <Image
                            src="/logo.png"
                            alt="Creations"
                            width={140}
                            height={40}
                            className="h-8 w-auto object-contain dark:hidden"
                        />
                        <Image
                            src="/logo-dark.png"
                            alt="Creations"
                            width={140}
                            height={40}
                            className="h-8 w-auto object-contain hidden dark:block"
                        />
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-1">
                    <div className="flex flex-col space-y-3">
                        <MobileLink href="/" onOpenChange={setOpen} className="font-bold">Home</MobileLink>
                        <div className="flex flex-col space-y-2 pt-4">
                            <h4 className="font-medium text-sm text-text-muted">Services</h4>
                            {/* Simplified list for mobile to avoid deep nesting complexity */}
                            <MobileLink href="/services" onOpenChange={setOpen} className="font-medium pl-4">All Services</MobileLink>
                            <MobileLink href="/services/tax-services" onOpenChange={setOpen} className="text-text-secondary pl-4">Tax Services</MobileLink>
                            <MobileLink href="/services/cipc-compliance" onOpenChange={setOpen} className="text-text-secondary pl-4">CIPC Compliance</MobileLink>
                            <MobileLink href="/services/accounting" onOpenChange={setOpen} className="text-text-secondary pl-4">Accounting</MobileLink>
                            {/* We can list more or link to parent pages */}
                        </div>

                        <div className="flex flex-col space-y-2 pt-4">
                            <h4 className="font-medium text-sm text-text-muted">Company</h4>
                            <MobileLink href="/about" onOpenChange={setOpen}>About Us</MobileLink>
                            <MobileLink href="/how-it-works" onOpenChange={setOpen}>Process</MobileLink>
                            <MobileLink href="/industries" onOpenChange={setOpen}>Industries</MobileLink>
                            <MobileLink href="/contact" onOpenChange={setOpen}>Contact</MobileLink>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

type MobileLinkProps = React.PropsWithChildren<{
    href: string
    onOpenChange?: (open: boolean) => void
    className?: string
}>

import { useRouter } from "next/navigation"

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
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
            className={className}
            {...props}
        >
            {children}
        </Link>
    )
}
