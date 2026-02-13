"use client"

import { FileText, CheckCircle2 } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper } from "@/components/ui/motion-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RequiredDocumentsProps {
    documents: {
        title?: string
        description?: string
        groups: {
            title: string
            items: string[]
        }[]
    }
}

export function RequiredDocumentsSection({ documents }: RequiredDocumentsProps) {
    if (!documents) return null

    return (
        <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle" className="border-t border-border/40">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <MotionWrapper className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent/10 mb-6">
                            <FileText className="h-6 w-6 text-accent" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{documents.title || "Required Documents"}</h2>
                        {documents.description && (
                            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                                {documents.description}
                            </p>
                        )}
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.groups.map((group, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="h-full bg-background border-border/50 hover:border-accent/30 transition-all hover:shadow-md group">
                                    <CardHeader className="pb-3 border-b border-border/30 bg-surface/30">
                                        <CardTitle className="text-base font-bold text-text-primary flex items-center gap-2">
                                            {group.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <ul className="space-y-3">
                                            {group.items.map((item, j) => (
                                                <li key={j} className="flex items-start gap-2.5 text-sm text-text-secondary">
                                                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>

                    <MotionWrapper delay={0.4} className="mt-10 text-center">
                        <p className="text-sm text-text-muted italic bg-surface/50 inline-block px-4 py-2 rounded-lg border border-border/30">
                            * Requirements may vary based on your specific business structure.
                        </p>
                    </MotionWrapper>
                </div>
            </Container>
        </SectionWrapper>
    )
}
