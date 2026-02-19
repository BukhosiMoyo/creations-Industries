import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/dashboard/',
                '/admin/',
                '/client/',
                '/employee/',
                '/api/',
                '/login',
                '/portal/', // Legacy/Auth
                '/internal/', // System
                '/auth/', // Auth
            ],
        },
        sitemap: 'https://creations.africa/sitemap.xml',
    }
}
