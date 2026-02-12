import { Check, FileText, CheckCircle2, ShieldCheck, PieChart, ClipboardCheck } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { IconList } from "@/components/ui/icon-list"

const deliverables = [
    { text: "Monthly financial statements", icon: PieChart },
    { text: "SARS return confirmations", icon: FileText },
    { text: "Payroll reports & payslips", icon: CheckCircle2 },
    { text: "CIPC submission proof", icon: ShieldCheck },
    { text: "Tax computation worksheets", icon: ClipboardCheck },
    { text: "Audit-readiness checklists", icon: CheckCircle2 },
    { text: "Custom data dashboards", icon: PieChart },
    { text: "Quarterly review summaries", icon: FileText },
]

export function DeliverablesSection() {
    return (
        <SectionWrapper padding="lg" showLineGrid patternIntensity="subtle">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <MotionWrapper direction="right" className="lg:w-1/2">
                        <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-6">What You Actually Get</h2>
                        <p className="text-lg text-text-secondary mb-10 leading-relaxed">
                            When you work with us, you receive structured, tangible outputs — not vague assurances.
                            Every engagement includes clearly defined deliverables that you can see, review, and use.
                        </p>

                        <IconList
                            items={deliverables}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
                            itemClassName="p-3 rounded-xl bg-surface/50 border border-border/50 shadow-sm"
                            iconClassName="text-accent h-5 w-5"
                        />
                    </MotionWrapper>

                    <MotionWrapper direction="left" delay={0.2} className="lg:w-1/2 w-full">
                        {/* Abstract Visual for Documents/Reports */}
                        <div className="relative aspect-[4/3] rounded-3xl bg-surface-elevated/50 backdrop-blur-md border border-border shadow-2xl p-10 overflow-hidden group hover:scale-[1.01] transition-transform duration-700">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

                            <div className="relative h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="h-6 w-32 bg-border/20 rounded-full"></div>
                                </div>

                                <div className="space-y-6">
                                    <div className="h-6 w-full bg-border/20 rounded-lg"></div>
                                    <div className="h-6 w-4/5 bg-border/20 rounded-lg"></div>
                                    <div className="aspect-video w-full bg-background border border-border/50 rounded-2xl shadow-inner relative overflow-hidden p-4">
                                        <div className="flex gap-2 mb-4">
                                            <div className="h-4 w-4 rounded bg-success/20"></div>
                                            <div className="h-4 w-4 rounded bg-accent/20"></div>
                                            <div className="h-4 w-4 rounded bg-blue-500/20"></div>
                                        </div>
                                        <div className="h-2 w-full bg-border/10 rounded-full mb-2"></div>
                                        <div className="h-2 w-5/6 bg-border/10 rounded-full mb-2"></div>
                                        <div className="h-2 w-4/6 bg-border/10 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-text-muted px-2">
                                        <span>CONFIDENTIAL</span>
                                        <span className="flex items-center gap-1">
                                            <ShieldCheck className="h-3 w-3" /> VERIFIED
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </Container>
        </SectionWrapper>
    )
}
