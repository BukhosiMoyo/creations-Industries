import Link from "next/link"
import { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { services, pillars } from "@/lib/services"
import { ArrowRight, FileText, LayoutGrid, Shield } from "lucide-react"

export const metadata: Metadata = {
    title: "Sitemap | Creations",
    description: "Overview of all pages and services on our website.",
}

export default function SitemapPage() {
    // Group services by pillar
    const servicesByPillar = pillars.map(pillar => ({
        ...pillar,
        items: services.filter(service => service.pillar === pillar.title)
    }))

    const mainPages = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Contact", href: "/contact" },
        { label: "Get a Quote", href: "/get-a-quote" },
        { label: "Services Overview", href: "/services" },
        { label: "Industries", href: "/industries" },
    ]

    const legalPages = [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <SectionWrapper variant="base" padding="lg" showGlow showReactiveGrid patternIntensity="subtle">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Sitemap</h1>
                        <p className="text-text-secondary text-lg mb-12">
                            A complete overview of our website structure and services.
                        </p>

                        <div className="grid gap-12 md:grid-cols-2">
                            {/* Main Pages */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <LayoutGrid className="h-6 w-6 text-accent" />
                                    Main Pages
                                </h2>
                                <ul className="space-y-3">
                                    {mainPages.map((page) => (
                                        <li key={page.href}>
                                            <Link href={page.href} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors group">
                                                <ArrowRight className="h-4 w-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                                                {page.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <h2 className="text-2xl font-bold flex items-center gap-2 mt-12">
                                    <Shield className="h-6 w-6 text-accent" />
                                    Legal
                                </h2>
                                <ul className="space-y-3">
                                    {legalPages.map((page) => (
                                        <li key={page.href}>
                                            <Link href={page.href} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors group">
                                                <ArrowRight className="h-4 w-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                                                {page.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Services by Pillar */}
                            <div className="space-y-8">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <FileText className="h-6 w-6 text-accent" />
                                    Services
                                </h2>
                                {servicesByPillar.map((pillar) => (
                                    <div key={pillar.slug} className="p-6 rounded-2xl bg-surface/50 border border-border/50">
                                        <h3 className="tex-xl font-bold mb-4 text-text-primary">{pillar.title}</h3>
                                        <ul className="space-y-2">
                                            {pillar.items.map((service) => (
                                                <li key={service.slug}>
                                                    <Link href={service.href || `/services/${service.slug}`} className="block text-sm text-text-secondary hover:text-accent transition-colors py-1">
                                                        {service.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>
        </div>
    )
}
