import { notFound, redirect } from "next/navigation"
import { Metadata } from "next"
import { services, pillars } from "@/lib/services"
import { ServicePageTemplate } from "@/components/services/service-template"
import { PillarPageTemplate } from "@/components/services/pillar-template"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Service, FAQPage, Organization, BreadcrumbList, WithContext, ProfessionalService } from "schema-dts"

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
        // If it has an href, it's a redirect, but we still need metadata if we stay here.
        // But we redirect in the component. Metadata doesn't redirect.
        // Actually, if we redirect, metadata doesn't matter much unless bots hit it.
        return constructMetadata({
            title: service.seoTitle || `${service.title} | Creations`,
            description: service.seoDescription || service.hero.subheading,
            noIndex: !!service.href // No index if it's a redirect placeholder
        })
    }

    const pillar = pillars.find((p) => p.slug === slug)
    if (pillar) {
        return constructMetadata({
            title: `${pillar.title} Services | Creations`,
            description: pillar.description,
        })
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
        // Redirect if explicit href exists
        if (service.href) {
            redirect(service.href)
        }

        const jsonLd: WithContext<Service> = {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.hero.subheading,
            provider: {
                "@type": "Organization",
                name: "Creations",
                url: "https://creations.africa"
            },
            areaServed: {
                "@type": "Country",
                name: "South Africa"
            }
        }

        const breadcrumbs: WithContext<BreadcrumbList> = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://creations.africa"
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Services",
                    item: "https://creations.africa/services"
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: service.title,
                    item: `https://creations.africa/services/${slug}`
                }
            ]
        }

        const faqSchema: WithContext<FAQPage> | null = service.faqs?.length ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map(faq => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer
                }
            }))
        } : null

        return (
            <>
                <JsonLd data={jsonLd} />
                <JsonLd data={breadcrumbs} />
                {faqSchema && <JsonLd data={faqSchema} />}
                <ServicePageTemplate content={service} />
            </>
        )
    }

    // Check if it's a pillar
    const pillar = pillars.find((p) => p.slug === slug)
    if (pillar) {
        const jsonLd: WithContext<Service> = {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${pillar.title} Services`,
            description: pillar.description,
            provider: {
                "@type": "Organization",
                name: "Creations",
                url: "https://creations.africa"
            },
            areaServed: {
                "@type": "Country",
                name: "South Africa"
            }
        }

        return (
            <>
                <JsonLd data={jsonLd} />
                <PillarPageTemplate content={pillar} />
            </>
        )
    }

    return notFound()
}
