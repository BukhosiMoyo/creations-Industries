"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { quoteSchema, QuoteFormValues } from "@/lib/schemas"
import { useState } from "react"
import { CheckCircle2, Loader2, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const serviceOptions = [
    { id: "bookkeeping", label: "Monthly Bookkeeping", description: "Regular daily/weekly recording of financial transactions." },
    { id: "accounting", label: "Annual Financial Statements", description: "Year-end reporting and compliance." },
    { id: "tax", label: "Tax Services (SARS)", description: "Income tax, VAT, PAYE, and tax planning." },
    { id: "payroll", label: "Payroll Services", description: "Payslips, EMP201s, and SARS submissions." },
    { id: "cipc", label: "CIPC & Secretarial", description: "Annual returns and company registration." },
    { id: "advisory", label: "Business Advisory", description: "Strategic planning and financial consulting." },
    { id: "tender", label: "Tender Readiness", description: "B-BBEE certificates and CSD registration." },
]

type Step = 1 | 2 | 3 | 4

export function QuoteForm() {
    const [step, setStep] = useState<Step>(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<QuoteFormValues>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            companyName: "",
            industry: "",
            services: [],
            message: "",
        },
        mode: "onChange",
    })

    const [referenceId, setReferenceId] = useState<string | null>(null)

    async function onSubmit(data: QuoteFormValues) {
        setIsSubmitting(true)
        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to submit")
            }

            const result = await response.json()
            setReferenceId(result.referenceId)
            setIsSuccess(true)
            form.reset()
            setStep(1)
        } catch (error) {
            console.error("Error submitting quote:", error)
            // Show error toast
        } finally {
            setIsSubmitting(false)
        }
    }

    const nextStep = async () => {
        let fieldsToValidate: (keyof QuoteFormValues)[] = []
        if (step === 1) fieldsToValidate = ["firstName", "lastName", "email", "phone"]
        if (step === 2) fieldsToValidate = ["companyName", "industry"]
        if (step === 3) fieldsToValidate = ["services"]

        const isValid = await form.trigger(fieldsToValidate)
        if (isValid) {
            setStep((s) => (s + 1) as Step)
        }
    }

    const prevStep = () => {
        setStep((s) => (s - 1) as Step)
    }

    const progressValue = (step / 4) * 100

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Alert className="bg-success/10 border-success/20 text-success p-8 border-2">
                    <CheckCircle2 className="h-8 w-8 mb-4" />
                    <AlertTitle className="text-2xl font-bold mb-2">Request Received</AlertTitle>
                    <AlertDescription className="text-lg">
                        Thank you for your request. We will prepare a custom quote and contact you within 24 hours.
                        {referenceId && (
                            <div className="mt-4 p-4 bg-white/50 rounded-lg border border-success/20">
                                <span className="text-sm text-success/80 block">Your Reference ID:</span>
                                <span className="text-xl font-bold font-mono">{referenceId}</span>
                            </div>
                        )}
                    </AlertDescription>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setIsSuccess(false)}
                        className="mt-8 border-success/20 hover:bg-success/20 font-semibold"
                    >
                        Submit Another Request
                    </Button>
                </Alert>
            </motion.div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-text-muted mb-2">
                    <span>Step {step} of 4</span>
                    <span>{Math.round(progressValue)}% Complete</span>
                </div>
                <Progress value={progressValue} className="h-2" />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-[400px] flex flex-col justify-between">
                    {/* Honeypot Field - Hidden from users */}
                    <input
                        type="text"
                        name="_honey"
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                    />
                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="space-y-6"
                            >
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold tracking-tight">Personal Information</h3>
                                            <p className="text-sm text-text-muted">Start with your basic contact details.</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="firstName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>First Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="John" {...field} className="h-12" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="lastName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Last Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Doe" {...field} className="h-12" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email Address</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="john@example.com" {...field} className="h-12" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone Number</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="082 123 4567" {...field} className="h-12" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold tracking-tight">Company Details</h3>
                                            <p className="text-sm text-text-muted">Tell us about your business.</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            <FormField
                                                control={form.control}
                                                name="companyName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Company Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Acme Pty Ltd" {...field} className="h-12" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="industry"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Industry / Sector</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="h-12">
                                                                    <SelectValue placeholder="Select your industry" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="construction">Construction & Engineering</SelectItem>
                                                                <SelectItem value="retail">Retail & E-commerce</SelectItem>
                                                                <SelectItem value="professional">Professional Services</SelectItem>
                                                                <SelectItem value="tech">Technology & IT</SelectItem>
                                                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                                                <SelectItem value="logistics">Logistics & Transport</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold tracking-tight">Services Required</h3>
                                            <p className="text-sm text-text-muted">What can we help you with today? (Select all that apply)</p>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="services"
                                            render={() => (
                                                <FormItem className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {serviceOptions.map((item) => (
                                                            <FormField
                                                                key={item.id}
                                                                control={form.control}
                                                                name="services"
                                                                render={({ field }) => {
                                                                    const isChecked = field.value?.includes(item.id)
                                                                    return (
                                                                        <div
                                                                            onClick={() => {
                                                                                const newValue = isChecked
                                                                                    ? field.value?.filter((v) => v !== item.id)
                                                                                    : [...(field.value || []), item.id]
                                                                                field.onChange(newValue)
                                                                            }}
                                                                            className={cn(
                                                                                "group relative flex cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-accent/5",
                                                                                isChecked
                                                                                    ? "border-accent bg-accent/10 shadow-sm"
                                                                                    : "border-border/50 bg-background"
                                                                            )}
                                                                        >
                                                                            <div className="flex w-full items-start space-x-3">
                                                                                <Checkbox
                                                                                    checked={isChecked}
                                                                                    className="mt-1 border-2"
                                                                                />
                                                                                <div className="grid gap-1.5 leading-none">
                                                                                    <label className="text-sm font-semibold leading-none cursor-pointer">
                                                                                        {item.label}
                                                                                    </label>
                                                                                    <p className="text-xs text-text-muted line-clamp-1">
                                                                                        {item.description}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold tracking-tight">Final Details</h3>
                                            <p className="text-sm text-text-muted">Anything else we should know before we prep your quote?</p>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Notes / Specific Requirements (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="E.g. We have a backlog of 6 months, or we use Sage/Xero..."
                                                            className="min-h-[160px] resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Please mention if you have any pressing deadlines.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={prevStep}
                            disabled={step === 1 || isSubmitting}
                            className={cn(step === 1 && "invisible")}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back
                        </Button>

                        {step < 4 ? (
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="px-8"
                            >
                                Continue <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 bg-accent hover:bg-accent/90"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                                    </>
                                ) : (
                                    <>
                                        Request Final Quote <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}
