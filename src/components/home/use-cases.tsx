import Link from "next/link"
import { ArrowRight, Briefcase, Building2, UserCircle, Rocket } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const useCases = [
    {
        icon: Rocket,
        title: "The New Start-up",
        desc: "Register your company, open bank accounts, and get tax compliant from day one.",
        href: "/industries/start-up"
    },
    {
        icon: Building2,
        title: "The Growing SME",
        desc: "Monthly reconciliations, payroll handling, and financials for scaling businesses.",
        href: "/industries/growing-sme"
    },
    {
        icon: Briefcase,
        title: "The Tender-Driven Business",
        desc: "Tax clearance, B-BBEE, and CSD registration support for government bids.",
        href: "/industries/tender-driven-business"
    },
    {
        icon: UserCircle,
        title: "The Professional Practice",
        desc: "Provisional tax and annual financials for freelancers and sole proprietors.",
        href: "/industries/professional-practice"
    }
]

export function UseCasesSection() {
    return (
        <SectionWrapper padding="lg" showLineGrid patternIntensity="subtle">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-4">Built for Businesses Like Yours</h2>
                    <p className="text-lg text-text-secondary">Real scenarios. Real solutions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {useCases.map((useCase, idx) => (
                        <Link href={useCase.href} key={idx} className="block group">
                            <Card className="h-full bg-surface/50 border-border group-hover:border-accent/40 transition-colors">
                                <CardHeader>
                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform duration-300">
                                        <useCase.icon className="h-5 w-5" />
                                    </div>
                                    <CardTitle className="text-lg group-hover:text-accent transition-colors">{useCase.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-text-secondary mb-4">{useCase.desc}</p>
                                    <div className="text-xs font-medium text-accent flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
                                        Find Your Service <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </SectionWrapper>
    )
}
