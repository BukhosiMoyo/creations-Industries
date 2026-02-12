import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export default function NotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center">
            <SectionWrapper showGlow patternIntensity="strong" className="w-full">
                <Container className="text-center">
                    <h1 className="text-9xl font-bold text-accent/20 mb-4">404</h1>
                    <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
                    <p className="text-xl text-text-secondary mb-8 max-w-lg mx-auto">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/">
                            <Button size="lg">
                                <Home className="mr-2 h-4 w-4" /> Go Home
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">
                                Contact Support
                            </Button>
                        </Link>
                    </div>
                </Container>
            </SectionWrapper>
        </main>
    )
}
