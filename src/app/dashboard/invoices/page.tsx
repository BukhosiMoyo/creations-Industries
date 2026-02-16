import Link from "next/link"
import { Plus, FileText, Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getInvoices } from "@/app/actions/invoice-actions"
import { format } from "date-fns"

export default async function InvoicesPage() {
    const invoices = await getInvoices()

    return (
        <div className="space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
                    <p className="text-muted-foreground">Manage client invoices and payments.</p>
                </div>
                <Link href="/dashboard/invoices/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Invoice
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Invoices</CardTitle>
                            <CardDescription>
                                {invoices.length} total invoices found.
                            </CardDescription>
                        </div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input placeholder="Search invoices..." className="h-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {invoices.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            No invoices found. Create one to get started.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/dashboard/invoices/${invoice.id}`} className="hover:underline flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                {invoice.invoiceNumber}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{invoice.client.legalName}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                invoice.status === 'Paid' ? 'default' :
                                                    invoice.status === 'Overdue' ? 'destructive' :
                                                        invoice.status === 'Issued' ? 'secondary' : 'outline'
                                            }>
                                                {invoice.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell className="text-right font-mono">
                                            R{Number(invoice.total).toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/dashboard/invoices/${invoice.id}`}>
                                                <Button variant="ghost" size="sm">View</Button>
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
