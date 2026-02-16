"use client"

// import { v4 as uuidv4 } from 'uuid'; // Removed to avoid missing types

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// --- NEW SYSTEM TYPES ---
export type AnalyticsEventType =
    | 'QUOTE_MODAL_OPENED'
    | 'QUOTE_STEP_VIEWED'
    | 'QUOTE_STEP_COMPLETED'
    | 'QUOTE_VALIDATION_ERROR'
    | 'QUOTE_ABANDONED'
    | 'QUOTE_SUBMITTED'
    | 'ACCOUNT_PROMPT_SHOWN'
    | 'ACCOUNT_CREATED_FROM_QUOTE'
    | 'ACCOUNT_SKIPPED'
    | 'ACCOUNT_INVITE_CLICKED'
    | 'LEAD_CREATED'
    | 'LEAD_CONVERTED_TO_REQUEST'
    | 'LEAD_ASSIGNED'
    | 'LEAD_STAGE_CHANGED'
    | 'REQUEST_STAGE_CHANGED'
    | 'REQUEST_COMPLETED'
    | 'DOCUMENT_UPLOAD_STARTED'
    | 'DOCUMENT_UPLOAD_SUCCEEDED'
    | 'DOCUMENT_UPLOAD_FAILED'
    | 'PAGE_VIEW'
    | 'CTA_CLICKED';

// --- LEGACY SUPPORT ---
export const ConversionEvents = {
    REQUEST_QUOTE_CLICK: 'request_quote_click',
    CONTACT_FORM_SUBMIT: 'contact_form_submit',
    CTA_CLICK: 'cta_click',
    EMAIL_CLICK: 'email_click',
    PHONE_CLICK: 'phone_click',
    WHATSAPP_CLICK: 'whatsapp_click',
}

// --- INTERFACES ---

interface NewTrackEventProps {
    eventType: AnalyticsEventType;
    userId?: string;
    leadId?: string;
    requestId?: string;

    // Context overrides
    pagePath?: string;
    serviceSlug?: string;
    categorySlug?: string;
    locationSlug?: string;
    stepIndex?: number;

    // Metadata
    metadata?: Record<string, any>;
}

interface LegacyTrackEventProps {
    action: string;
    category: string;
    label: string;
    value?: number;
}

// Union Type
type TrackEventProps = NewTrackEventProps | LegacyTrackEventProps;

// Type Guard
function isLegacyEvent(props: TrackEventProps): props is LegacyTrackEventProps {
    return 'action' in props;
}

const SESSION_KEY = 'creations_analytics_session_id';

function getSessionId(): string {
    if (typeof window === 'undefined') return 'server-session';

    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
}

// Extract UTM parameters from URL
function getUtmParams() {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    return {
        utmSource: params.get('utm_source'),
        utmMedium: params.get('utm_medium'),
        utmCampaign: params.get('utm_campaign'),
    };
}

// --- GOOGLE ANALYTICS SUPPORT ---
export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        })
    }
}

async function sendToInternalAnalytics(props: NewTrackEventProps) {
    try {
        const sessionId = getSessionId();
        const utmParams = getUtmParams();
        const payload = {
            ...props,
            sessionId,
            pagePath: props.pagePath || window.location.pathname,
            referrer: document.referrer,
            ...utmParams,
            metadata: props.metadata || {},
        };

        await fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true
        });

    } catch (e) {
        console.error("Failed to track internal event:", e);
    }
}

export async function trackEvent(props: TrackEventProps) {
    if (typeof window === 'undefined') return;

    // 1. Handle Legacy GA Events
    if (isLegacyEvent(props)) {
        // Send to Google Analytics if available
        if ((window as any).gtag) {
            (window as any).gtag('event', props.action, {
                event_category: props.category,
                event_label: props.label,
                value: props.value,
            })
        }

        // Map to Internal Analytics as generic CTA
        await sendToInternalAnalytics({
            eventType: 'CTA_CLICKED',
            metadata: {
                legacyAction: props.action,
                category: props.category,
                label: props.label,
                value: props.value
            }
        });
        return;
    }

    // 2. Handle New Internal Events
    await sendToInternalAnalytics(props);
}
