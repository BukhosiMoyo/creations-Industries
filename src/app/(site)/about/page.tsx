import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Target, Users, Zap } from "lucide-react"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Organization, WithContext, AboutPage as AboutPageSchema } from "schema-dts"

export const metadata = constructMetadata({
    title: "About Us | Creations",
    description: "Built on experience, driven by precision. We provide clarity, structure, and direction for South African businesses."
})

export default function AboutPage() {
    const jsonLd: WithContext<AboutPageSchema> = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        mainEntity: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.africa",
            logo: "https://creations.africa/logo.png",
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+27101234567",
                contactType: "customer service",
                areaServed: "ZA"
            }
        }
    }

    return (
        <main>
            <JsonLd data={jsonLd} />
            {/* Hero */}
            <SectionWrapper showGlow patternIntensity="subtle" padding="lg">
                <Container className="text-center max-w-4xl">
                    <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-accent uppercase bg-accent/10 rounded-full">
                        Who We Are
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-text-primary">
                        Built on Experience. Driven by Precision.
                    </h1>
                    <p className="text-xl text-text-secondary leading-relaxed mb-8">
                        We differ from the typical accounting firm. We don&apos;t just process numbers; we provide clarity, structure, and direction for South African businesses.
                    </p>
                </Container>
            </SectionWrapper>

            {/* Mission & Vision */}
            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Our Purpose</h2>
                            <div className="space-y-4">
                                <div className="p-6 bg-background rounded-xl border border-border shadow-sm">
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Target className="h-5 w-5 text-accent" /> Our Mission</h3>
                                    <p className="text-text-secondary text-base">
                                        To give South African business owners the financial clarity and compliance certainty they need to grow with confidence.
                                    </p>
                                </div>
                                <div className="p-6 bg-background rounded-xl border border-border shadow-sm">
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Zap className="h-5 w-5 text-accent" /> Our Vision</h3>
                                    <p className="text-text-secondary text-base">
                                        To be the trusted financial partner for businesses that value accuracy, technology, and strategic insight.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-full min-h-[300px] rounded-2xl bg-surface-elevated overflow-hidden border border-border flex items-center justify-center">
                            {/* Abstract Representation of Stability/Growth */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
                            <div className="relative grid grid-cols-3 gap-4 opacity-50">
                                <div className="h-20 w-4 bg-accent/20 rounded-full"></div>
                                <div className="h-32 w-4 bg-accent/40 rounded-full"></div>
                                <div className="h-48 w-4 bg-accent/60 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* Values */}
            <SectionWrapper padding="lg" showLineGrid patternIntensity="subtle">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-lg text-text-secondary">The principles that guide every engagement.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-surface/50 border-border">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <CardTitle>Precision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text-secondary">Accuracy is non-negotiable. We double-check, reconcile, and verify everything we touch.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-surface/50 border-border">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
                                    <Users className="h-6 w-6" />
                                </div>
                                <CardTitle>Clarity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text-secondary">We speak plain English, not &apos;accountant&apos;. You will always understand your numbers and your obligations.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-surface/50 border-border">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <CardTitle>Proactive</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text-secondary">We don&apos;t wait for problems. We anticipate deadlines, risks, and opportunities before they arrive.</p>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </SectionWrapper>

            {/* Team / Story Placeholder */}
            <SectionWrapper variant="surface" padding="lg" className="text-center">
                <Container className="max-w-3xl">
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="text-lg text-text-secondary leading-relaxed mb-8">
                        Founded to bridge the gap between expensive corporate firms and generic bookkeeping services, Creations was built on a simple premise: South African businesses deserve better.
                        We combine modern technology with old-school diligence to provide a service that is efficient, personal, and reliable.
                    </p>
                </Container>
            </SectionWrapper>
        </main>
    )
}
