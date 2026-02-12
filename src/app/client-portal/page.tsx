import Link from "next/link"
import { Lock, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Client Portal | Creations",
    description: "Secure client login area.",
    robots: {
        index: false,
        follow: false,
    },
}

export default function ClientPortalPage() {
    return (
        <main className="min-h-[80vh] flex items-center justify-center">
            <SectionWrapper showGlow patternIntensity="strong" className="w-full">
                <Container className="max-w-md">
                    <Card className="border-border bg-surface/50 backdrop-blur-sm shadow-xl">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                                <Lock className="h-8 w-8 text-accent" />
                            </div>
                            <CardTitle className="text-2xl">Client Portal</CardTitle>
                            <CardDescription>
                                Access your documents and reports securely.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-2">
                                <p className="text-sm text-text-secondary text-center">
                                    Our new client portal is currently being upgraded. Please contact your account manager for direct access to your files during this transition.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Button className="w-full" disabled>
                                <LogIn className="mr-2 h-4 w-4" /> Login
                            </Button>
                            <Link href="/contact" className="w-full">
                                <Button variant="outline" className="w-full">
                                    Contact Support
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </Container>
            </SectionWrapper>
        </main>
    )
}
