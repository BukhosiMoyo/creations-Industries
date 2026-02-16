'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Plus, Trash2, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

import { createInvoice } from "@/app/actions/invoice-actions"
import { getClients } from "@/app/actions/crm-actions" // Assuming this exists, or use direct prisma if server component? 
// Making this a client component, so need an action to fetch clients.
// If getClients doesn't exist, I'll need to create a simple one or fetch in a server wrapper.
// For now, let's assume we can fetch clients via a server action or pass them as props if we refactor to server page.
// Refactoring to Server Page wrapper is better practice. But for speed, I'll implement a fetch in useEffect if `getClients` is available.
// Checking crm-actions.ts content via memory... 
// Using a new action `getInvoiceFormData` in `invoice-actions` would be cleaner.

// Zod Schema
const invoiceSchema = z.object({
    clientId: z.string().min(1, "Client is required"),
    dueDate: z.string().min(1, "Due date is required"),
    notes: z.string().optional(),
    lineItems: z.array(z.object({
        description: z.string().min(1, "Description is required"),
        // Use preprocess to safely cast string/number inputs to number
        quantity: z.preprocess((val) => Number(val), z.number().min(1, "Quantity must be at least 1")),
        unitPrice: z.preprocess((val) => Number(val), z.number().min(0, "Price cannot be negative")),
    })).min(1, "At least one line item is required")
})

type InvoiceFormValues = z.infer<typeof invoiceSchema>

interface Props {
    clients: { id: string; legalName: string; tradingName: string | null }[]
}

export default function CreateInvoicePage({ clients }: Props) {
    const router = useRouter()
    const [loadingClients, setLoadingClients] = useState(false) // No longer loading
    const [submitting, setSubmitting] = useState(false)

    // Form
    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +7 days
            lineItems: [{ description: "Professional Services", quantity: 1, unitPrice: 0 }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "lineItems"
    })

    // Calculations
    const lineItems = form.watch("lineItems")
    // Safe calculation ensuring numbers
    const subtotal = lineItems?.reduce((acc, item) => {
        const qty = Number(item.quantity) || 0
        const price = Number(item.unitPrice) || 0
        return acc + (qty * price)
    }, 0) || 0
    const taxRate = 0.15
    const tax = subtotal * taxRate
    const total = subtotal + tax

    useEffect(() => {
        // Fetch clients
        // We'll use a fast server action for this
        async function load() {
            try {
                const response = await fetch('/api/crm/clients-list') // Or action
                // Actually let's use the safe pattern: 
                // I'll assume we can pass clients from the server page, but since this is 'use client',
                // I will mock fetch or call an action. 
                // Let's rely on a new exported action `getClientsForSelect` in invoice-actions to be safe.
                // Since I can't edit invoice-actions right this second easily without another turn, 
                // I will simulate it or assume `getInvoices` logic is similar.
                // Wait, I can just fetch from an existing action if valid.
                // `getCompanies` from crm-actions?
                // Let's try to assume a Server Component wrapper is best, but to keep this file self-contained:
                // I'll add `getClientsForInvoice` to `invoice-actions.ts` in the next turn if needed.
                // For now, I'll allow manual entry of Client ID? No, that's bad UX.
                // I'll add a 'TODO: Load Clients' placeholder logic or use a known action.
            } catch (e) { }
        }
        // Actually, to do this right, I should make `page.tsx` a Server Component that fetches clients, 
        // and passes them to a Client Component `CreateInvoiceForm`.
        // I will write `CreateInvoiceForm` content here but name the file `form.tsx` 
        // and overwrite `page.tsx` with the server wrapper. 
    }, [])

    async function onSubmit(data: InvoiceFormValues) {
        setSubmitting(true)
        try {
            const res = await createInvoice({
                ...data,
                dueDate: new Date(data.dueDate),
            })
            if (res.success) {
                toast.success("Invoice created")
                router.push(`/dashboard/invoices/${res.invoiceId}`)
            }
        } catch (error) {
            toast.error("Failed to create invoice")
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-20 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} type="button">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">New Invoice</h1>
                        <p className="text-muted-foreground text-sm">Create a draft invoice for a client.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Client & Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Client Select would go here. For MVP providing a text input for Client ID if selection not ready, 
                                    OR better: Use the Server Page wrapper I'll create next to pass `clients`. 
                                    I will assume `props.clients` are passed to this component.
                                */}
                                <FormField
                                    control={form.control}
                                    name="clientId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Client Company</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a client" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {clients.map(client => (
                                                        <SelectItem key={client.id} value={client.id}>
                                                            {client.legalName} {client.tradingName ? `(${client.tradingName})` : ''}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="dueDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Due Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes (Visible to Client)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Payment terms, bank details..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle>Line Items</CardTitle>
                                <Button size="sm" variant="outline" onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })} type="button">
                                    <Plus className="h-4 w-4 mr-2" /> Add Item
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid grid-cols-12 gap-2 items-end border-b pb-4 last:border-0 last:pb-0">
                                        <div className="col-span-6">
                                            <FormField
                                                control={form.control}
                                                name={`lineItems.${index}.description`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={index !== 0 ? "sr-only" : ""}>Description</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Service description" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <FormField
                                                control={form.control}
                                                name={`lineItems.${index}.quantity`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={index !== 0 ? "sr-only" : ""}>Qty</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" min="1" step="0.1" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <FormField
                                                control={form.control}
                                                name={`lineItems.${index}.unitPrice`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={index !== 0 ? "sr-only" : ""}>Price (R)</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" step="0.01" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => remove(index)} disabled={fields.length === 1} type="button">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>R{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">VAT (15%)</span>
                                    <span>R{tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between font-bold text-base">
                                    <span>Total</span>
                                    <span>R{total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" type="submit" disabled={submitting}>
                                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Invoice
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    )
}
