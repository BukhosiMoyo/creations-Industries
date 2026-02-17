'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { sendEmail } from "@/lib/email/send-email"
import { EMAIL_MOCK_DATA } from "@/lib/email/mock-data"
import { requireRole } from "@/lib/rbac"
import { EMAIL_TEMPLATES } from "@/lib/email/templates"
import { render } from "@react-email/render"
import * as React from "react"

export async function getEmailTemplates() {
    await requireRole(['ADMIN']) // Ensure Admin

    const overrides = await prisma.emailTemplate.findMany({
        orderBy: { key: 'asc' }
    })
    return overrides
}

export async function getEmailTemplate(key: string) {
    await requireRole(['ADMIN'])

    const template = await prisma.emailTemplate.findUnique({
        where: { key }
    })
    return template
}

export async function updateEmailTemplate(key: string, data: { subject: string; body: any }) {
    const user = await requireRole(['ADMIN'])

    await prisma.emailTemplate.upsert({
        where: { key },
        update: {
            subject: data.subject,
            body: data.body,
            lastEditedBy: user.id,
        },
        create: {
            key,
            subject: data.subject,
            body: data.body,
            lastEditedBy: user.id,
        }
    })

    revalidatePath(`/dashboard/settings/email-templates`)
    revalidatePath(`/dashboard/settings/email-templates/${key}`)

    return { success: true }
}

export async function resetEmailTemplate(key: string) {
    await requireRole(['ADMIN'])

    await prisma.emailTemplate.delete({
        where: { key }
    })

    revalidatePath(`/dashboard/settings/email-templates`)
    revalidatePath(`/dashboard/settings/email-templates/${key}`)

    return { success: true }
}

export async function sendTestEmail(key: string, toEmail: string, contextType: string) {
    await requireRole(['ADMIN'])

    // 1. Get mock data
    // @ts-ignore
    const mockData = EMAIL_MOCK_DATA[contextType] || EMAIL_MOCK_DATA.GENERIC

    // 2. Send
    const result = await sendEmail({
        key,
        to: toEmail,
        props: mockData
    })

    return result
}

export async function renderEmailPreview(key: string, bodyOverrides: Record<string, string>, contextType: string = "GENERIC") {
    await requireRole(['ADMIN'])

    const TemplateComponent = EMAIL_TEMPLATES[key]
    if (!TemplateComponent) {
        return { success: false, error: "Template not found" }
    }

    // 1. Get mock data
    // @ts-ignore
    const mockData = EMAIL_MOCK_DATA[contextType] || EMAIL_MOCK_DATA.GENERIC

    // 2. Merge with overrides
    const finalProps = { ...mockData, ...bodyOverrides }

    try {
        const html = await render(React.createElement(TemplateComponent, finalProps))
        return { success: true, html }
    } catch (error: any) {
        console.error("Render Preview Error:", error)
        return { success: false, error: error.message }
    }
}
