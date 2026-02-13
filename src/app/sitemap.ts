import { MetadataRoute } from 'next'
import { services, pillars } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://creations.africa'

    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/how-it-works',
        '/industries',
        '/quote',
        '/services',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    const pillarRoutes = pillars.map((pillar) => ({
        url: `${baseUrl}/services/${pillar.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...staticRoutes, ...serviceRoutes, ...pillarRoutes]
}
