import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { PillarContent } from "@/types/service"
import { services } from "@/lib/services"

interface PillarPageTemplateProps {
    content: PillarContent
}

export function PillarPageTemplate({ content }: PillarPageTemplateProps) {
    // Filter services that belong to this pillar
    const pillarServices = services.filter(s => s.pillar.toLowerCase() === content.title.toLowerCase())

    return (
        <div className="flex flex-col">
            <SectionWrapper showGlow patternIntensity="subtle" padding="lg">
                <Container className="text-center max-w-4xl">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent uppercase bg-accent/10 rounded-full">
                        Service Pillar
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{content.title}</h1>
                    <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                        {content.description}
                    </p>
                </Container>
            </SectionWrapper>

            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {pillarServices.map((service) => (
                            <Card key={service.slug} className="flex flex-col h-full hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-between">
                                    <p className="text-text-secondary mb-6">{service.hero.subheading}</p>
                                    <Link href={`/services/${service.slug}`}>
                                        <Button variant="outline" className="w-full justify-between group">
                                            View Service Details
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>
        </div>
    )
}
