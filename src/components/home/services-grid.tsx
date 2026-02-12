import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"

const servicesList = [
    { id: 1, title: "Bookkeeping", desc: "Accurate, up-to-date books so you always know where you stand.", link: "/services/bookkeeping" },
    { id: 2, title: "Accounting", desc: "Financial statements, reporting, and year-end preparation.", link: "/services/accounting" },
    { id: 3, title: "Tax Services", desc: "SARS submissions, provisional tax, and income tax returns.", link: "/services/tax-services" },
    { id: 4, title: "Advisory Services", desc: "Strategic advice grounded in your financials, not guesswork.", link: "/services/advisory-services" },
    { id: 5, title: "CIPC Compliance", desc: "Annual returns, company amendments, and registration.", link: "/services/cipc-compliance" },
    { id: 6, title: "Companies Act", desc: "Secretarial duties, resolutions, and statutory records.", link: "/services/companies-act-compliance" },
    { id: 7, title: "Payroll Service", desc: "Payslips, PAYE, UIF, SDL — processed accurately every cycle.", link: "/services/payroll-service" },
    { id: 8, title: "Audit Readiness", desc: "Prepare your records and systems before the auditors arrive.", link: "/services/audit-readiness" },
    { id: 9, title: "Tender Readiness", desc: "CSD registration, B-BBEE, tax clearance for tenders.", link: "/services/tender-readiness" },
]

export function ServicesGridSection() {
    return (
        <SectionWrapper padding="lg" showLineGrid patternIntensity="subtle">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <MotionWrapper className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-4">Services Built for Every Stage</h2>
                        <p className="text-lg text-text-secondary">Comprehensive support for startups, SMEs, and established firms.</p>
                    </MotionWrapper>
                    <MotionWrapper direction="left" delay={0.2}>
                        <Link href="/services">
                            <Button variant="outline" className="group">
                                View All Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </MotionWrapper>
                </div>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesList.map((service, i) => (
                        <MotionWrapper key={service.id} delay={i * 0.05} className="h-full">
                            <Link href={service.link} className="block group h-full">
                                <Card className="h-full border-border bg-surface/40 hover:bg-surface hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between text-lg group-hover:text-accent transition-colors">
                                            {service.title}
                                            <ArrowRight className="h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </MotionWrapper>
                    ))}
                </StaggerChildren>
            </Container>
        </SectionWrapper>
    )
}
