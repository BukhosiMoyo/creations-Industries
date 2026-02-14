import { notFound } from "next/navigation"
import { Metadata } from "next"
import { guides } from "@/lib/guides"
import { GuidePageTemplate } from "@/components/guides/guide-template"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const guide = guides.find((g) => g.slug === slug)

    if (!guide) {
        return {
            title: "Guide Not Found",
        }
    }

    return {
        title: guide.seoTitle || `${guide.title} | Creations Guides`,
        description: guide.seoDescription || guide.hero.subheading,
    }
}

export default async function GuidePage({ params }: Props) {
    const { slug } = await params
    const guide = guides.find((g) => g.slug === slug)

    if (!guide) {
        return notFound()
    }

    return <GuidePageTemplate content={guide} />
}
