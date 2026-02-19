import { Metadata } from 'next'

// Default configuration
const siteConfig = {
    name: 'Creations',
    description: 'Specialised accounting, tax, and compliance services for South African businesses. We turn complex regulations into simple, actionable steps.',
    url: 'https://creations.africa',
    ogImage: 'https://creations.africa/og.jpg',
    links: {
        twitter: 'https://twitter.com/creations_sa',
        github: 'https://github.com/creations-sa',
    },
}

interface MetadataProps {
    title?: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
    canonical?: string
}

export function constructMetadata({
    title = siteConfig.name,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    icons = '/icon.webp',
    noIndex = false,
    canonical
}: MetadataProps = {}): Metadata {
    return {
        title: {
            default: title,
            template: `%s | ${siteConfig.name}` // e.g. "Tax Services | Creations"
        },
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image
                }
            ],
            type: 'website',
            locale: 'en_ZA',
            siteName: siteConfig.name,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@creations_sa',
        },
        icons,
        metadataBase: new URL(siteConfig.url),
        ...(canonical && {
            alternates: {
                canonical
            }
        }),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false
            }
        })
    }
}
