'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { sendEmail } from "@/lib/email/send-email"
import { EMAIL_MOCK_DATA } from "@/lib/email/mock-data"
import { getSession } from "@/lib/rbac"

export async function getEmailTemplates() {
    await getSession('ADMIN') // Ensure Admin

    const overrides = await prisma.emailTemplate.findMany({
        orderBy: { key: 'asc' }
    })
    return overrides
}

export async function getEmailTemplate(key: string) {
    await getSession('ADMIN')

    const template = await prisma.emailTemplate.findUnique({
        where: { key }
    })
    return template
}

export async function updateEmailTemplate(key: string, data: { subject: string; body: any }) {
    const session = await getSession('ADMIN')

    await prisma.emailTemplate.upsert({
        where: { key },
        update: {
            subject: data.subject,
            body: data.body,
            lastEditedBy: session.user.id,
        },
        create: {
            key,
            subject: data.subject,
            body: data.body,
            lastEditedBy: session.user.id,
        }
    })

    revalidatePath(`/dashboard/settings/email-templates`)
    revalidatePath(`/dashboard/settings/email-templates/${key}`)

    return { success: true }
}

export async function resetEmailTemplate(key: string) {
    await getSession('ADMIN')

    await prisma.emailTemplate.delete({
        where: { key }
    })

    revalidatePath(`/dashboard/settings/email-templates`)
    revalidatePath(`/dashboard/settings/email-templates/${key}`)

    return { success: true }
}

export async function sendTestEmail(key: string, toEmail: string, contextType: string) {
    await getSession('ADMIN')

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
