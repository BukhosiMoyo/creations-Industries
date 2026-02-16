import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Printer, Download, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { getInvoice } from "@/app/actions/invoice-actions"
import { requireRole } from "@/lib/rbac"

interface Props {
    params: Promise<{ invoiceId: string }>
}

export default async function PortalInvoiceDetailPage({ params }: Props) {
    const { invoiceId } = await params
    // Check session again for safety or rely on action
    const user = await requireRole(['CLIENT'])

    let invoice
    try {
        invoice = await getInvoice(invoiceId)
    } catch (e) {
        // Handle unauthorized or not found
        notFound()
    }

    if (!invoice) notFound()

    // Status logic
    const isPaid = invoice.status === 'Paid'
    const isOverdue = invoice.status === 'Overdue'

    return (
        <div className="space-y-6 pb-20 max-w-4xl mx-auto">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center gap-2">
                    <Link href="/portal/invoices">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            Invoice #{invoice.invoiceNumber}
                            <Badge variant={isPaid ? 'default' : isOverdue ? 'destructive' : 'secondary'}>
                                {invoice.status}
                            </Badge>
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Due on {format(new Date(invoice.dueDate), "dd MMMM yyyy")}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>

                    {!isPaid && (
                        <Button size="sm">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay Now
                        </Button>
                    )}
                </div>
            </div>

            {/* Same Invoice View as Admin - Reusable Component would be better, but copying for speed/isolation */}
            <Card className="print:shadow-none print:border-none print:p-0">
                <CardHeader className="flex flex-row justify-between border-b pb-8 bg-muted/5">
                    <div>
                        <div className="text-xl font-bold text-primary mb-1">Creations</div>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p>123 Business Road</p>
                            <p>Sandton, 2196</p>
                            <p>South Africa</p>
                            <p>accounts@creations.africa</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold mb-1">INVOICE</div>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p>Number: <span className="font-mono text-foreground">{invoice.invoiceNumber}</span></p>
                            <p>Date: {format(new Date(invoice.createdAt), "dd MMM yyyy")}</p>
                            <p>Due: {format(new Date(invoice.dueDate), "dd MMM yyyy")}</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-8 space-y-8">
                    {/* Bill To */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Bill To</h3>
                        <div className="text-sm space-y-1">
                            <p className="font-bold">{invoice.client.legalName}</p>
                            <p>{invoice.client.address}</p>
                            <p>{invoice.client.city}, {invoice.client.province}</p>
                            <p>{invoice.client.vatNumber ? `VAT: ${invoice.client.vatNumber}` : ''}</p>
                        </div>
                    </div>

                    {/* Line Items */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Qty</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoice.lineItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell className="text-right">{Number(item.quantity)}</TableCell>
                                    <TableCell className="text-right">R{Number(item.unitPrice).toFixed(2)}</TableCell>
                                    <TableCell className="text-right font-medium">R{Number(item.amount).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-full max-w-[250px] space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>R{Number(invoice.subtotal).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">VAT ({Number(invoice.taxrate)}%)</span>
                                <span>R{Number(invoice.taxAmount).toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>R{Number(invoice.total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Banking Details */}
                    <div className="pt-8 border-t mt-8">
                        <div className="grid grid-cols-2 gap-8 text-sm text-muted-foreground">
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Banking Details</h3>
                                <p>Bank: FNB</p>
                                <p>Account Name: Creations Africa</p>
                                <p>Account No: 62000000000</p>
                                <p>Branch Code: 250655</p>
                            </div>
                            <div className="text-right">
                                <p>Reference:</p>
                                <p className="font-bold text-foreground">{invoice.invoiceNumber}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
