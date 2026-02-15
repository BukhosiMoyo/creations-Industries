type GTagEvent = {
    action: string
    category: string
    label: string
    value?: number
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        })
    }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = ({ action, category, label, value }: GTagEvent) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    } else {
        // Debug mode for development
        if (process.env.NODE_ENV === 'development') {
            console.log('[Analytics] Track:', { action, category, label, value })
        }
    }
}

export const ConversionEvents = {
    REQUEST_QUOTE_CLICK: 'click_quote_nav',
    CONTACT_FORM_SUBMIT: 'form_submit_quote',
    PHONE_CLICK: 'click_phone',
    EMAIL_CLICK: 'click_email',
}
