import { MetadataRoute } from 'next'
import { services } from '@/lib/services'
import { guides } from '@/lib/guides'
import { industries } from '@/lib/industries'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://creations.africa'

    // 1. Static Pages (Core)
    // 1. Static Pages (Core)
    const staticRoutes = [
        '/', // Home
        '/about',
        '/contact',
        '/how-it-works',
        '/get-a-quote',
        '/services', // Services hub
        '/industries', // Industries hub
        '/privacy',
        '/terms',
        '/services/accounting',
        '/services/tax',
        '/services/bookkeeping',
        // Company Services Static Pages
        '/services/company-services',
        '/services/company-services/annual-returns-filing',
        '/services/company-services/company-amendments',
        '/services/company-services/company-deregistration',
        '/services/company-services/company-registration',
        '/services/company-services/shelf-companies',
        // Accounting Sub-Services Static Pages
        '/services/accounting/business-budgeting-forecasting',
        '/services/accounting/cash-flow-management',
        '/services/accounting/financial-statements-preparation',
        '/services/accounting/fixed-asset-register',
        '/services/accounting/management-accounts',
        '/services/accounting/monthly-accounting-services',
        '/services/accounting/payroll-services',
        // Tax Sub-Services Static Pages
        '/services/tax/business-income-tax-returns',
        '/services/tax/emp201-emp501-submissions',
        '/services/tax/paye-registration',
        '/services/tax/pbo-registration',
        '/services/tax/personal-income-tax-returns',
        '/services/tax/public-officer-activation',
        '/services/tax/sars-penalties-disputes',
        '/services/tax/tax-clearance-certificates',
        '/services/tax/trust-income-tax-registration',
        '/services/tax/vat-registration-returns',
        // Location Hubs
        '/locations/pretoria',
        '/locations/johannesburg',
        '/locations/centurion',
        // Pretoria Service Pages
        '/locations/pretoria/tax',
        '/locations/pretoria/bookkeeping',
        '/locations/pretoria/accounting',
        // Industry Static Pages
        '/industries/construction-projects',
        '/industries/engineering-consultants',
        '/industries/legal-attorneys',
        '/industries/medical-professionals',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Service Pages (Dynamic - Exclude ones we have static overrides for)
    const staticServiceSlugs = [
        'accounting', 'bookkeeping', 'tax-services',
        // Company Services
        'company-registration', 'annual-returns-filing', 'company-amendments', 'company-deregistration', 'shelf-companies',
        // Accounting Sub-services
        'business-budgeting-forecasting', 'cash-flow-management', 'financial-statements-preparation',
        'fixed-asset-register', 'management-accounts', 'monthly-accounting-services', 'payroll-services',
        // Tax Sub-services
        'business-income-tax-returns', 'emp201-emp501-submissions', 'paye-registration', 'pbo-registration',
        'personal-income-tax-returns', 'public-officer-activation', 'sars-penalties-disputes',
        'tax-clearance-certificates', 'trust-income-tax-registration', 'vat-registration-returns'
    ]

    const serviceRoutes = services
        .filter(s => !staticServiceSlugs.includes(s.slug))
        .filter(s => !s.href) // Exclude services that redirect (targets are in staticRoutes)
        .map((service) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))

    // 3. Industry Pages (Dynamic from lib/industries)
    // Filter out static industry pages
    const staticIndustrySlugs = [
        'construction-projects',
        'engineering-consultants',
        'legal-attorneys',
        'medical-professionals'
    ]

    const industryRoutes = industries
        .filter(i => !staticIndustrySlugs.includes(i.slug))
        .map((industry) => ({
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
