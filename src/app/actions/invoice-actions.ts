'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getSession } from "@/lib/rbac"
import { InvoiceStatus, Prisma } from "@prisma/client"
import { createNotification } from "@/lib/notifications"
import { sendEmail } from "@/lib/email/send-email"

// --- TYPES ---
export interface LineItemInput {
    description: string
    quantity: number
    unitPrice: number
}

// --- ACTIONS ---

export async function createInvoice(data: {
    clientId: string
    requestId?: string
    dueDate: Date
    lineItems: LineItemInput[]
    notes?: string
}) {
    const session = await getSession('ADMIN') // Or STAFF

    // 1. Calculate Totals
    let subtotal = 0
    const dbLineItems = data.lineItems.map(item => {
        const amount = item.quantity * item.unitPrice
        subtotal += amount
        return {
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            amount
        }
    })

    const taxRate = 15 // 15% VAT
    const taxAmount = (subtotal * taxRate) / 100
    const total = subtotal + taxAmount

    // 2. Generate Invoice Number (Simple increment or timestamp for MVP)
    // Real world: fetch last, increment. Here: INV-{YYMM}-{Count}
    const count = await prisma.invoice.count()
    const dateStr = new Date().toISOString().slice(2, 7).replace('-', '') // YYMM
    const invoiceNumber = `INV-${dateStr}-${(count + 1).toString().padStart(3, '0')}`

    // 3. Create
    const invoice = await prisma.invoice.create({
        data: {
            invoiceNumber,
            clientId: data.clientId,
            requestId: data.requestId,
            dueDate: data.dueDate,
            subtotal,
            taxAmount,
            total,
            notes: data.notes,
            status: "Draft",
            lineItems: {
                create: dbLineItems
            }
        }
    })

    revalidatePath('/dashboard/invoices')
    revalidatePath(`/dashboard/requests/${data.requestId}`)

    return { success: true, invoiceId: invoice.id }
}

export async function updateInvoiceStatus(id: string, newStatus: InvoiceStatus) {
    const session = await getSession('ADMIN')

    const invoice = await prisma.invoice.update({
        where: { id },
        data: {
            status: newStatus,
            ...(newStatus === 'Paid' ? { paidAt: new Date() } : {}),
            ...(newStatus === 'Issued' ? { issueDate: new Date() } : {})
        },
        include: { client: true }
    })

    // 4. Notifications & Emails
    if (newStatus === 'Issued') {
        // Find Primary Contact
        const primaryContact = await prisma.clientContact.findFirst({
            where: { companyId: invoice.clientId, isPrimary: true }
        })
        const email = primaryContact?.email || "client@example.com" // Fallback (should handle better)

        // Notification
        // Find a user for the client company to notify? 
        // We notify all users linked to company
        const clientUsers = await prisma.user.findMany({
            where: { companyId: invoice.clientId }
        })

        for (const user of clientUsers) {
            await createNotification({
                userId: user.id,
                title: "Invoice Issued",
                message: `Invoice ${invoice.invoiceNumber} for R${invoice.total} is now available.`,
                severity: "INFO",
                category: "INVOICE",
                link: `/portal/invoices/${invoice.id}`
            })
        }

        // Email
        if (email) {
            await sendEmail({
                to: email,
                subject: `Invoice ${invoice.invoiceNumber} Issued`, // Simple subject, can be templated
                templateName: 'invoice_issued', // Ensure this exists or fallback to generic text
                props: {
                    clientName: invoice.client.legalName,
                    invoiceNumber: invoice.invoiceNumber,
                    amount: `R${Number(invoice.total).toFixed(2)}`,
                    dueDate: invoice.dueDate.toLocaleDateString(),
                    link: `${process.env.NEXT_PUBLIC_APP_URL}/portal/invoices/${invoice.id}`
                }
            })
        }
    }

    if (newStatus === 'Paid') {
        const clientUsers = await prisma.user.findMany({
            where: { companyId: invoice.clientId }
        })
        for (const user of clientUsers) {
            await createNotification({
                userId: user.id,
                title: "Invoice Paid",
                message: `Thank you. Invoice ${invoice.invoiceNumber} has been marked as paid.`,
                severity: "SUCCESS",
                category: "INVOICE",
                link: `/portal/invoices/${invoice.id}`
            })
        }
    }

    revalidatePath('/dashboard/invoices')
    revalidatePath(`/dashboard/invoices/${id}`)

    return { success: true }
}

export async function getInvoices() {
    await getSession('STAFF')
    return prisma.invoice.findMany({
        include: { client: true },
        orderBy: { createdAt: 'desc' }
    })
}

export async function getInvoice(id: string) {
    const session = await getSession(['STAFF', 'CLIENT'])

    const invoice = await prisma.invoice.findUnique({
        where: { id },
        include: {
            client: true,
            lineItems: true,
            request: true
        }
    })

    if (!invoice) return null

    if (session.user.role === 'CLIENT') {
        if (invoice.clientId !== session.user.companyId) {
            throw new Error("Unauthorized access to invoice")
        }
    }

    return invoice
}

export async function deleteInvoice(id: string) {
    await getSession('ADMIN')
    await prisma.invoice.delete({ where: { id } })
    revalidatePath('/dashboard/invoices')
}
