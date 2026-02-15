import { MetadataRoute } from 'next'
import { services } from '@/lib/services'
import { guides } from '@/lib/guides'
import { industries } from '@/lib/industries'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://creations.co.za'

    // 1. Static Pages (Core)
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/how-it-works',
        '/get-a-quote',
        '/services', // Services hub
        '/industries', // Industries hub
        '/privacy',
        '/terms',
        // HTML Sitemap
        '/site-map',
        // Location Hubs
        '/locations/pretoria',
        '/locations/johannesburg',
        '/locations/centurion',
        // Pretoria Service Pages
        '/locations/pretoria/tax',
        '/locations/pretoria/bookkeeping',
        '/locations/pretoria/accounting', // Newly added
        // Static Service Replacements (High Priority)
        '/services/accounting',
        '/services/tax',
        '/services/bookkeeping',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Service Pages (Dynamic - Exclude ones we have static overrides for if needed, but keeping them doesn't hurt as canonical will handle preference if set)
    // Note: In a perfect world we filter out 'accounting', 'tax-services', 'bookkeeping' if they are now static.
    // However, the static definition above just adds them. Next.js sitemap de-duplication might handle it, or we should filter.
    // Let's filter out the slugs that we know are now static /services/...
    const staticServiceSlugs = ['accounting', 'tax', 'bookkeeping', 'tax-services'] // tax-services might be the old slug for /services/tax? checking lib/services.ts, slug is 'tax-services' but map is to /services/tax.

    const serviceRoutes = services
        .filter(s => !['accounting', 'bookkeeping', 'tax-services'].includes(s.slug))
        .map((service) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))

    // 3. Industry Pages (Dynamic from lib/industries)
    const industryRoutes = industries.map((industry) => ({
        url: `${baseUrl}/industries/${industry.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // 4. Guide Pages (Dynamic)
    const guideRoutes = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...guideRoutes]
}
