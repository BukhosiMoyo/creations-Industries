import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { LayoutDashboard, LogIn } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { QuoteButton } from "@/components/layout/quote-button"

export async function SiteHeader() {
    const session = await getServerSession(authOptions);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
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
                </div>

                <div className="flex items-center gap-2">
                    <nav className="flex items-center gap-2">
                        {session ? (
                            <Link href="/dashboard">
                                <Button size="sm" variant="ghost" className="hidden md:flex gap-2">
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button size="sm" variant="ghost" className="hidden md:flex gap-2 text-muted-foreground hover:text-primary">
                                    <LogIn className="h-4 w-4" />
                                    Sign In
                                </Button>
                            </Link>
                        )}

                        <QuoteButton />

                        <ThemeToggle />

                        <MobileNav />
                    </nav>
                </div>
            </Container>
        </header>
    )
}
