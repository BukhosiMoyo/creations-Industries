import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/rbac"
import InvoiceForm from "./invoice-form"

async function getClients() {
    const session = await getSession('STAFF')
    // Fetch active clients
    return prisma.clientCompany.findMany({
        select: {
            id: true,
            legalName: true,
            tradingName: true
        },
        orderBy: { legalName: 'asc' }
    })
}

export default async function NewInvoicePage() {
    const clients = await getClients()

    return <InvoiceForm clients={clients} />
}
