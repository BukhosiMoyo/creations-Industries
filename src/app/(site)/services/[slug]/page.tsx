import { notFound } from "next/navigation"
import { Metadata } from "next"
import { services, pillars } from "@/lib/services"
import { ServicePageTemplate } from "@/components/services/service-template"
import { PillarPageTemplate } from "@/components/services/pillar-template"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const serviceSlugs = services.map((s) => ({ slug: s.slug }))
    const pillarSlugs = pillars.map((p) => ({ slug: p.slug }))
    return [...serviceSlugs, ...pillarSlugs]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params

    const service = services.find((s) => s.slug === slug)
    if (service) {
        return {
            title: service.seoTitle || `${service.title} | Creations`,
            description: service.seoDescription || service.hero.subheading,
        }
    }

    const pillar = pillars.find((p) => p.slug === slug)
    if (pillar) {
        return {
            title: `${pillar.title} Services | Creations`,
            description: pillar.description,
        }
    }

    return {
        title: "Service Not Found",
    }
}

export default async function ServiceOrPillarPage({ params }: Props) {
    const { slug } = await params

    // Check if it's a service
    const service = services.find((s) => s.slug === slug)
    if (service) {
        return <ServicePageTemplate content={service} />
    }

    // Check if it's a pillar
    const pillar = pillars.find((p) => p.slug === slug)
    if (pillar) {
        return <PillarPageTemplate content={pillar} />
    }

    return notFound()
}
