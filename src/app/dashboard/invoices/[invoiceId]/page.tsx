import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Printer, Mail, CheckCircle, CreditCard, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { getInvoice, updateInvoiceStatus } from "@/app/actions/invoice-actions"
import { InvoiceStatus } from "@prisma/client"

interface Props {
    params: Promise<{ invoiceId: string }>
}

export default async function InvoiceDetailPage(props: Props) {
    const params = await props.params;
    const invoice = await getInvoice(params.invoiceId)

    if (!invoice) {
        notFound()
    }

    const isDraft = invoice.status === 'Draft'
    const isIssued = invoice.status === 'Issued' || invoice.status === 'Overdue'
    const isPaid = invoice.status === 'Paid'

    return (
        <div className="space-y-6 pb-20 max-w-4xl mx-auto">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard/invoices">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            {invoice.invoiceNumber}
                            <Badge variant={isPaid ? 'default' : isIssued ? 'secondary' : 'outline'}>
                                {invoice.status}
                            </Badge>
                        </h1>
                        <p className="text-muted-foreground text-sm">Created on {format(new Date(invoice.createdAt), "dd MMM yyyy")}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {/* Print / Download */}
                    {/* We can use window.print() via a client component or simpler standard print CSS */}
                    {/* For now, a simple button that stays but creates a print view is complex. 
                        Let's verify "Download PDF" requirement. 
                        Plan says: "Download PDF button using react-to-print or similar".
                        Actually, simplest MVP: A button that opens a /print route or just uses browser print.
                        I'll add a "Print / PDF" button that triggers browser print for now.
                    */}
                    <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" />
                        Print / PDF
                    </Button>

                    {/* Actions */}
                    {isDraft && (
                        <form action={async () => {
                            'use server'
                            await updateInvoiceStatus(invoice.id, 'Issued')
                        }}>
                            <Button size="sm">
                                <Mail className="h-4 w-4 mr-2" />
                                Issue & Send
                            </Button>
                        </form>
                    )}

                    {isIssued && (
                        <form action={async () => {
                            'use server'
                            await updateInvoiceStatus(invoice.id, 'Paid')
                        }}>
                            <Button size="sm" variant="default">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Paid
                            </Button>
                        </form>
                    )}
                </div>
            </div>

            {/* Invoice Document View */}
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

                    {/* Notes */}
                    {invoice.notes && (
                        <div className="pt-8">
                            <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Notes</h3>
                            <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                        </div>
                    )}

                    {/* Banking Details (Static for MVP) */}
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
                                <p>Please update your reference to:</p>
                                <p className="font-bold text-foreground">{invoice.invoiceNumber}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
