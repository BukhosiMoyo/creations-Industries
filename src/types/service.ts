export type ServicePillar = "Compliance" | "Accounting" | "Intelligence"

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
    visualType?: 'chart' | 'shield' | 'cloud' | 'flow' | 'team' | 'compliance' | 'strategic'
}

export interface PillarContent {
    slug: string
    title: string
    description: string
    services: string[] // slugs of services in this pillar
}
