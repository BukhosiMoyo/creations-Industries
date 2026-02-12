import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ClipboardEdit } from "lucide-react"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container className="flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Image
                        src="/logo.png"
                        alt="Creations"
                        width={180}
                        height={52}
                        className="h-10 w-auto object-contain dark:hidden"
                        priority
                    />
                    <Image
                        src="/logo-dark.png"
                        alt="Creations"
                        width={180}
                        height={52}
                        className="h-10 w-auto object-contain hidden dark:block"
                        priority
                    />
                </Link>
                <MainNav />
                <div className="flex-1 lg:hidden" />
                <MobileNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search Placeholder if needed */}
                    </div>
                    <nav className="flex items-center space-x-4">
                        <Link href="/get-a-quote">
                            <Button size="sm" className="hidden md:flex bg-accent hover:bg-accent/90 text-white border-none">
                                <ClipboardEdit className="mr-2 h-4 w-4" />
                                Request Quote
                            </Button>
                        </Link>
                        <ThemeToggle />
                    </nav>
                </div>
            </Container>
        </header>
    )
}
