import Link from "next/link"
import { ArrowRight, Briefcase, Building2, HardHat, Laptop, Plane, ShoppingBag, Stethoscope, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { constructMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = constructMetadata({
    title: "Industries We Serve",
    description: "Specialized accounting solutions for Construction, Retail, Tech, Healthcare, and more. tailored to your sector's unique challenges."
})

const industries = [
    {
        slug: "construction",
        title: "Construction & Engineering",
        icon: HardHat,
        description: "Project-based accounting, retention tracking, and WIP reporting for contractors and engineers."
    },
    {
        slug: "retail",
        title: "Retail & E-commerce",
        icon: ShoppingBag,
        description: "Inventory management, POS integration, and high-volume transaction processing."
    },
    {
        slug: "professional",
        title: "Professional Services",
        icon: Briefcase,
        description: "Time-billing analysis, trust account audits, and practice management for lawyers, architects, and consultants."
    },
    {
        slug: "tech",
        title: "Technology & IT",
        icon: Laptop,
        description: "SaaS revenue recognition, R&D tax incentives, and scaling financial systems for startups."
    },
    {
        slug: "healthcare",
        title: "Healthcare",
        icon: Stethoscope,
        description: "Medical practice accounting, locum tax compliance, and billing system reconciliation."
    },
    {
        slug: "manufacturing",
        title: "Manufacturing",
        icon: Building2,
        description: "Cost accounting, bill of materials (BOM) management, and production efficiency tracking."
    },
    {
        slug: "logistics",
        title: "Logistics & Transport",
        icon: Truck,
        description: "Fleet cost analysis, fuel tax rebates, and cross-border VAT compliance."
    },
    {
        slug: "tourism",
        title: "Tourism & Hospitality",
        icon: Plane,
        description: "Seasonal cash flow planning, booking system integration, and staff payroll management."
    }
]

export default function IndustriesPage() {
    return (
        <main>
            <SectionWrapper showGlow patternIntensity="subtle" padding="lg">
                <Container className="text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Industries We Serve</h1>
                    <p className="text-xl text-text-secondary mb-8">
                        We understand the unique financial challenges of your sector. Our solutions are tailored to fit your industry&apos;s specific needs.
                    </p>
                </Container>
            </SectionWrapper>

            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industries.map((industry) => (
                            <Card key={industry.slug} className="hover:border-accent/50 transition-colors">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
                                        <industry.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{industry.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-text-secondary mb-4">{industry.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper padding="lg" showDotGrid>
                <Container max-w-4xl>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Why Industry Specialization Matters</h2>
                            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                                Generic accounting often misses the nuances that drive profitability in specific sectors. Construction firms need WIP tracking, not just expense categorization. Law firms need precise trust account audits, not standard banking reconciliations.
                            </p>
                            <p className="text-lg text-text-secondary leading-relaxed">
                                By focusing on these key industries, we’ve developed proprietary workflows and compliance checklists that ensure you aren’t just compliant — you’re optimized for growth within your specific market conditions.
                            </p>
                        </div>
                        <div className="bg-surface-elevated p-8 rounded-2xl border border-border/50">
                            <h3 className="text-xl font-bold mb-4">The Specialist Advantage</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-text-secondary">Sector-specific tax deductions aimed at reducing liability.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-text-secondary">Pre-built financial models tailored to your business type.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-text-secondary">Proactive compliance monitoring for industry regulations.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            <SectionWrapper padding="lg" showLineGrid>
                <Container className="text-center max-w-3xl">
                    <p className="text-lg text-text-secondary mb-8">
                        We work with businesses across many other sectors. If you need clarity, compliance, and growth, we can help.
                    </p>
                    <Link href="/contact">
                        <Button size="lg">Talk to Us</Button>
                    </Link>
                </Container>
            </SectionWrapper>
        </main>
    )
}
