import { MetadataRoute } from 'next'
import { services } from '@/lib/services'
import { guides } from '@/lib/guides'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://creations.co.za'

    // 1. Static Pages
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/how-it-works',
        '/get-a-quote',
        '/services', // Services hub
        '/industries', // Industries hub
        '/privacy', // NoIndex but good to have in sitemap? Usually no, but legal pgs often included.
        '/terms',
        '/site-map' // HTML sitemap
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Service Pages (Dynamic)
    const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // 3. Guide Pages (Dynamic)
    const guideRoutes = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...serviceRoutes, ...guideRoutes]
}
