"use client"

import { v4 as uuidv4 } from 'uuid';

// Define the event type to match the Prisma Enum implicitly or explicitly
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

interface TrackEventProps {
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

export async function trackEvent(props: TrackEventProps) {
    if (typeof window === 'undefined') return;

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

        // Fire and forget (optional: use sendBeacon for reliability on unload, but fetch is fine for generic events)
        // navigator.sendBeacon is better for "abandon/unload" events but payload must be blob/string.
        // We'll use fetch with keepalive for reliability.

        await fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true
        });

    } catch (e) {
        console.error("Failed to track event:", e);
    }
}
