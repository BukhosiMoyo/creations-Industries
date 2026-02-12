import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"

export function SiteFooter() {
    return (
        <footer className="border-t border-border/40 bg-surface">
            <Container className="py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/logo-dark.png"
                                alt="Creations"
                                width={160}
                                height={46}
                                className="h-9 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-text-secondary max-w-xs">
                            Clear, structured accounting and compliance for South African businesses.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Services</h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><Link href="/services/accounting" className="hover:text-text-primary">Accounting</Link></li>
                            <li><Link href="/services/tax-services" className="hover:text-text-primary">Tax Services</Link></li>
                            <li><Link href="/services/cipc-compliance" className="hover:text-text-primary">CIPC Compliance</Link></li>
                            <li><Link href="/services/payroll-service" className="hover:text-text-primary">Payroll</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Company</h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><Link href="/about" className="hover:text-text-primary">About Us</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-text-primary">How It Works</Link></li>
                            <li><Link href="/contact" className="hover:text-text-primary">Contact</Link></li>
                            <li><Link href="/quote" className="hover:text-text-primary">Request Quote</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><Link href="/privacy" className="hover:text-text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-text-primary">Terms of Service</Link></li>
                            <li><Link href="/sitemap" className="hover:text-text-primary">Sitemap</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-border pt-8 text-center text-sm text-text-secondary">
                    <p>© {new Date().getFullYear()} Creations. All rights reserved.</p>
                    <p className="mt-2 text-xs text-text-muted">
                        Disclaimer: We are professional accountants, but this website is for informational purposes.
                    </p>
                </div>
            </Container>
        </footer>
    )
}
