export type ServicePillar = "Compliance" | "Accounting" | "Intelligence"

export type ServiceVisualType = "compliance" | "chart" | "shield" | "flow" | "strategic" | "team" | "cloud" | "certificate" | "timeline"

export interface ServiceContent {
    slug: string
    title: string
    pillar: ServicePillar
    hero: {
        heading: string
        subheading: string
        helperStrip?: string[]
    }
    seoTitle?: string
    seoDescription?: string
    whoIsThisFor: string[]
    deliverables: string[]
    process: {
        step: number
        title: string
        description: string
    }[]
    requirements: string[]
    timeline: string
    faqs: {
        question: string
        answer: string
    }[]
    relatedServices: {
        slug: string
        title: string
    }[]
    stats?: {
        label: string
        value: string
        description?: string
    }[]
    insights?: string[]
    problemsSolved?: string[]
    complianceContext?: string
    externalLinks?: {
        label: string
        href: string
    }[]
    requiredDocuments?: {
        title?: string
        description?: string
        groups: {
            title: string
            items: string[]
        }[]
    }
    detailedSections?: {
        title: string
        content: string
        highlights?: string[]
        illustrationType?: ServiceVisualType
    }[]
    visualType?: ServiceVisualType
}

export interface PillarContent {
    slug: string
    title: string
    description: string
    services: string[] // slugs of services in this pillar
}

export interface IndustryContent {
    slug: string
    title: string
    hero: {
        heading: string
        subheading: string
        helperStrip?: string[]
    }
    seoTitle?: string
    seoDescription?: string
    whoIsThisFor: string[]
    deliverables: string[]
    process: {
        step: number
        title: string
        description: string
    }[]
    requirements: string[]
    timeline: string
    faqs: {
        question: string
        answer: string
    }[]
    relatedServices: {
        slug: string
        title: string
    }[]
    stats?: {
        label: string
        value: string
        description?: string
    }[]
    insights?: string[]
    problemsSolved?: string[]
    complianceContext?: string
    testimonial?: {
        quote: string
        author: string
        role: string
        variant?: "primary" | "subtle"
    }
}

export interface GuideContent {
    slug: string
    title: string
    hero: {
        heading: string
        subheading: string
        helperStrip?: string[]
    }
    seoTitle?: string
    seoDescription?: string
    whoIsThisFor?: string[]
    process?: {
        step: number
        title: string
        description: string
    }[]
    requirements?: string[]
    timeline?: string
    faqs: {
        question: string
        answer: string
    }[]
    relatedServices?: {
        slug: string
        title: string
    }[]
    stats?: {
        label: string
        value: string
        description?: string
    }[]
    insights?: string[]
    externalLinks?: {
        label: string
        href: string
    }[]
    detailedSections?: {
        title: string
        content: string
        highlights?: string[]
        illustrationType?: ServiceVisualType
    }[]
    visualType?: ServiceVisualType
}
