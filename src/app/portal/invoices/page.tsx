import Link from "next/link"
import { FileText, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { getSession } from "@/lib/rbac"
import { prisma } from "@/lib/prisma"

async function getClientInvoices() {
    const session = await getSession('CLIENT')
    if (!session.user.companyId) return []

    return prisma.invoice.findMany({
        where: {
            clientId: session.user.companyId,
            status: { not: 'Draft' } // Clients shouldn't see drafts
        },
        orderBy: { createdAt: 'desc' },
        include: { client: true }
    })
}

export default async function PortalInvoicesPage() {
    const invoices = await getClientInvoices()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
                <p className="text-muted-foreground">View and manage your invoices.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Invoices</CardTitle>
                    <CardDescription>History of all issued invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                    {invoices.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            No invoices found.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                {invoice.invoiceNumber}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                invoice.status === 'Paid' ? 'default' :
                                                    invoice.status === 'Overdue' ? 'destructive' :
                                                        'secondary'
                                            }>
                                                {invoice.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-mono">
                                            R{Number(invoice.total).toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/portal/invoices/${invoice.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    View <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
