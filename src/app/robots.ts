import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/portal/',
                '/api/',
                '/auth/', // If auth routes exist
                '/thank-you/',
                '/internal/',
            ],
        },
        sitemap: 'https://creations.co.za/sitemap.xml',
    }
}
