"use client"

import Link from "next/link"
import Image from "next/image"
import { trackEvent, ConversionEvents } from "@/lib/analytics"
import { Container } from "@/components/ui/container"

export function SiteFooter() {
    return (
        <footer className="border-t border-border/40 bg-surface">
            <Container className="py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
                            <div className="relative h-10 w-auto">
                                <Image
                                    src="/logo.png"
                                    alt="Creations"
                                    width={120}
                                    height={40}
                                    className="dark:hidden h-10 w-auto object-contain"
                                />
                                <Image
                                    src="/logo-dark.png"
                                    alt="Creations"
                                    width={120}
                                    height={40}
                                    className="hidden dark:block h-10 w-auto object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-sm text-text-secondary max-w-xs">
                            Clear, structured accounting and compliance for South African businesses.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Services</h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><Link href="/services/accounting" className="hover:text-text-primary transition-colors">Accounting</Link></li>
                            <li><Link href="/services/tax" className="hover:text-text-primary transition-colors">Tax Services</Link></li>
                            <li><Link href="/services/bookkeeping" className="hover:text-text-primary transition-colors">Bookkeeping</Link></li>
                            <li><Link href="/services/company-services" className="hover:text-text-primary transition-colors">Company Services</Link></li>
                            <li><Link href="/services/company-services/shelf-companies" className="hover:text-text-primary transition-colors">Shelf Companies</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Locations</h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><Link href="/locations/pretoria" className="hover:text-text-primary transition-colors">Pretoria</Link></li>
                            <li><Link href="/locations/johannesburg" className="hover:text-text-primary transition-colors">Johannesburg</Link></li>
                            <li><Link href="/locations/centurion" className="hover:text-text-primary transition-colors">Centurion</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Company</h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><Link href="/about" className="hover:text-text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-text-primary transition-colors">How It Works</Link></li>
                            <li><Link href="/contact" className="hover:text-text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/get-a-quote" className="hover:text-text-primary transition-colors">Request Quote</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li><Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/site-map" className="hover:text-text-primary transition-colors">Sitemap (HTML)</Link></li>
                            <li><a href="/sitemap.xml" className="hover:text-text-primary transition-colors" target="_blank" rel="noopener noreferrer">Sitemap (XML)</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-border pt-8 text-center text-sm text-text-secondary">
                    <p>© {new Date().getFullYear()} Creations. All rights reserved.</p>
                    <p className="mt-2 text-xs text-text-muted">
                        Disclaimer: We are professional accountants, but this website is for informational purposes.
                    </p>
                    <div className="flex justify-center gap-6 mt-4 opacity-80 hover:opacity-100 transition-opacity">
                        <a
                            href="mailto:info@creations.africa"
                            className="flex items-center gap-2 hover:text-accent"
                            onClick={() => trackEvent({
                                action: ConversionEvents.EMAIL_CLICK,
                                category: 'engagement',
                                label: 'footer_email'
                            })}
                        >
                            Email Us
                        </a>
                        <a
                            href="tel:+27101234567"
                            className="flex items-center gap-2 hover:text-accent"
                            onClick={() => trackEvent({
                                action: ConversionEvents.PHONE_CLICK,
                                category: 'engagement',
                                label: 'footer_phone'
                            })}
                        >
                            Call Us
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
