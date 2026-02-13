import { notFound } from "next/navigation"
import { Metadata } from "next"
import { industries } from "@/lib/industries"
import { IndustryPageTemplate } from "@/components/industries/industry-template"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return industries.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params

    const industry = industries.find((i) => i.slug === slug)
    if (industry) {
        return {
            title: industry.seoTitle || `${industry.title} | Creations`,
            description: industry.seoDescription || industry.hero.subheading,
        }
    }

    return {
        title: "Industry Not Found",
    }
}

export default async function IndustryPage({ params }: Props) {
    const { slug } = await params

    const industry = industries.find((i) => i.slug === slug)
    if (!industry) {
        return notFound()
    }

    return <IndustryPageTemplate content={industry} />
}
