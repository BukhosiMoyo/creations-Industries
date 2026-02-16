"use client"

import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper } from "@/components/ui/motion-wrapper"

export function LocationBanner() {
    return (
        <SectionWrapper variant="surface" padding="md" className="border-y border-border/40">
            <Container>
                <MotionWrapper className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                            <MapPin className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-1">Based in Pretoria?</h3>
                            <p className="text-text-secondary text-sm max-w-xl">
                                We have a dedicated hub for Pretoria businesses. Get local support with the efficiency of a digital firm.
                            </p>
                        </div>
                    </div>
                    <div>
                        <Link href="/locations/pretoria">
                            <Button variant="outline" className="group whitespace-nowrap">
                                Visit Pretoria Hub <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </MotionWrapper>
            </Container>
        </SectionWrapper>
    )
}
