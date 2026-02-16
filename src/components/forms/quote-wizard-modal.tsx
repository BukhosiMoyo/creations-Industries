
"use client"

import * as React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Loader2, X, FileText, ArrowLeft, ShieldCheck, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

import {
    SERVICE_CATALOG,
    GLOBAL_FIELDS,
    BUSINESS_FIELDS,
    getServiceSpecificFields,
    ServiceCategory,
    ServiceCategories,
    FieldDefinition
} from "@/lib/quote-catalog"

// -----------------------------------------------------------------------------
// TYPES & STATE
// -----------------------------------------------------------------------------

type Step = 1 | 2 | 3 | 4 | 5 | 6 // 1=Contact, 2=Service, 3=Details, 4=Docs, 5=Review, 6=Success

interface ServiceSelection {
    category: ServiceCategory
    slug: string
    details: any
}

interface WizardState {
    step: Step
    leadId?: string
    resumeToken?: string
    // Multi-service state
    services: ServiceSelection[]
    // Temporary state for current selection flow
    currentCategory?: ServiceCategory
    currentServiceSlug?: string
    currentDetails?: any

    contactData?: any
    docsAcknowledged?: boolean

    // Success State
    trackingToken?: string
    userExists?: boolean
}

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------


export function QuoteWizardModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const searchParams = useSearchParams()
    const pathname = usePathname() // Context-aware hook

    // -- State --
    const [state, setState] = React.useState<WizardState>({ step: 1, services: [] })
    const [isLoading, setIsLoading] = React.useState(false)
    const [isContextAware, setIsContextAware] = React.useState(false) // Track if auto-selected

    // -- Prefill & Resume Logic --
    React.useEffect(() => {
        if (!isOpen) return

        const categoryParam = searchParams.get("category")
        const serviceParam = searchParams.get("service")
        const resumeToken = searchParams.get("resume")

        if (resumeToken) {
            // Resume Flow
            setIsLoading(true)
            fetch(`/api/leads/resume?token=${resumeToken}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.lead) {
                        const meta = data.lead.metadata || {}
                        setState({
                            step: (data.lead.lastStepCompleted ? (data.lead.lastStepCompleted + 1) as Step : 3),
                            leadId: data.lead.id,
                            resumeToken: resumeToken,
                            contactData: {
                                fullName: data.lead.fullName,
                                email: data.lead.email,
                                phone: data.lead.phone,
                                location: data.lead.location,
                                urgency: data.lead.urgency,
                                existingClient: data.lead.metadata?.existingClient || "no"
                            },
                            // Restore context - handling legacy single service data or new array
                            services: meta.services || (meta.serviceSlug ? [{
                                category: meta.category,
                                slug: meta.serviceSlug,
                                details: { ...meta.businessDetails, ...meta.serviceDetails }
                            }] : []),
                            // If we were in the middle of adding a service
                            currentCategory: meta.category,
                            currentServiceSlug: meta.serviceSlug,
                            currentDetails: { ...meta.businessDetails, ...meta.serviceDetails }
                        })
                    }
                })
                .catch(err => console.error("Resume failed", err))
                .finally(() => setIsLoading(false))
        } else {
            // Context Flow
            // 1. Check URL Params (Strongest signal)
            let validCategory = ServiceCategories.find(c => c === categoryParam)
            let validService = SERVICE_CATALOG.find(s => s.slug === serviceParam)

            // 2. Check Pathname (Context signal)
            if (!validService && !validCategory && pathname) {
                // Try to match pathname to service slug
                // Assumption: Path might be /services/[slug] or /[slug]
                validService = SERVICE_CATALOG.find(s => pathname.includes(s.slug))
                if (validService) setIsContextAware(true)
            }

            if (validService) {
                setState(prev => ({
                    ...prev,
                    currentCategory: validService?.category,
                    currentServiceSlug: validService?.slug,
                    step: 1 // Always start at Contact
                }))
            } else if (validCategory) {
                setState(prev => ({
                    ...prev,
                    currentCategory: validCategory,
                    step: 1
                }))
            } else {
                // Reset if no context and not checking resume
                setState(prev => ({ ...prev, step: 1 }))
                setIsContextAware(false)
            }
        }
    }, [isOpen, searchParams, pathname])

    // -- Helper Data --
    const currentService = SERVICE_CATALOG.find(s => s.slug === state.currentServiceSlug)
    const requiredDocs = currentService?.requiredDocs || []

    // -- API Handlers --

    async function handleContactSubmit(data: any) {
        setIsLoading(true)
        try {
            const res = await fetch("/api/leads/draft", {
                method: "POST",
                body: JSON.stringify({
                    ...data,
                    services: state.services, // Send existing if any
                    // Temporary current selection
                    category: state.currentCategory,
                    serviceSlug: state.currentServiceSlug
                })
            })
            const json = await res.json()

            if (json.success) {
                // Determine next step
                // If service is already selected (prefilled), skip Step 2 -> Go to Step 3
                const nextStep = state.currentServiceSlug ? 3 : 2

                setState(prev => ({
                    ...prev,
                    leadId: json.leadId,
                    resumeToken: json.resumeToken,
                    contactData: data,
                    step: nextStep
                }))
            } else {
                console.error("Draft API Failed:", json)
            }
        } catch (err) {
            console.error("Draft API Exception:", err)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleServiceSelect(category: ServiceCategory, slug: string) {
        setIsLoading(true)
        try {
            if (state.leadId) {
                await fetch(`/api/leads/${state.leadId}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        resumeToken: state.resumeToken,
                        category, // Current context
                        serviceSlug: slug,
                        lastStepCompleted: 2
                    })
                })
            }

            setState(prev => ({
                ...prev,
                currentCategory: category,
                currentServiceSlug: slug,
                step: 3
            }))
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleDetailsSubmit(data: any) {
        setIsLoading(true)
        try {
            if (state.leadId) {
                await fetch(`/api/leads/${state.leadId}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        resumeToken: state.resumeToken,
                        metadata: {
                            currentDetails: data
                        },
                        lastStepCompleted: 3
                    })
                })
            }
            // Check Docs
            const hasDocs = (SERVICE_CATALOG.find(s => s.slug === state.currentServiceSlug)?.requiredDocs?.length || 0) > 0

            setState(prev => {
                const newState = {
                    ...prev,
                    currentDetails: data,
                }

                // If NO docs, we effectively "finish" this service add
                if (!hasDocs) {
                    return completeServiceSelection(newState)
                }

                return {
                    ...newState,
                    step: 4
                }
            })
        } catch (err) {
            console.error(err)
            setIsLoading(false)
        } finally {
            // Note: If going to step 4, loading ends. 
            // If completing service, completeServiceSelection doesn't do async, so safe to end loading.
            setIsLoading(false)
        }
    }

    function completeServiceSelection(currentState: WizardState): WizardState {
        if (!currentState.currentCategory || !currentState.currentServiceSlug) return currentState

        const newService: ServiceSelection = {
            category: currentState.currentCategory,
            slug: currentState.currentServiceSlug,
            details: currentState.currentDetails
        }

        return {
            ...currentState,
            services: [...currentState.services, newService],
            // Reset current
            currentCategory: undefined,
            currentServiceSlug: undefined,
            currentDetails: undefined,
            step: 5 // Go to Review
        }
    }

    function handleDocsSubmit() {
        // Docs acknowledged for current service
        setState(prev => completeServiceSelection(prev))
    }

    async function handleFinalSubmit() {
        setIsLoading(true)
        try {
            const res = await fetch("/api/leads/submit", {
                method: "POST",
                body: JSON.stringify({
                    leadId: state.leadId,
                    resumeToken: state.resumeToken,
                    services: state.services,
                    contactData: state.contactData
                })
            })
            const json = await res.json()
            if (json.success) {
                setState(prev => ({
                    ...prev,
                    step: 6,
                    trackingToken: json.trackingToken,
                    userExists: json.userExists
                }))
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    // -- Change Service Handler --
    const handleChangeService = () => {
        // Reset service selection and go to Step 2 (Service Selection)
        setState(prev => ({
            ...prev,
            currentCategory: undefined,
            currentServiceSlug: undefined,
            step: 2
        }))
        setIsContextAware(false) // User manually opted out of context
    }

    // -- Render --

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 font-sans">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-5xl bg-card border border-border shadow-2xl rounded-none md:rounded-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-[650px] md:max-h-[90vh]"
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground z-10 transition-colors">
                    <X className="w-5 h-5" />
                </button>

                {/* Left Sidebar (Progress & Summary) */}
                <div className="hidden md:flex w-72 bg-muted/30 border-r border-border p-6 flex-col gap-6 overflow-y-auto">
                    {/* Logo */}
                    <Link href="/" onClick={onClose} className="flex items-center space-x-2 mb-2">
                        <Image
                            src="/logo.png"
                            alt="Creations"
                            width={140}
                            height={40}
                            className="h-8 w-auto object-contain dark:hidden"
                        />
                        <Image
                            src="/logo-dark.png"
                            alt="Creations"
                            width={140}
                            height={40}
                            className="h-8 w-auto object-contain hidden dark:block"
                        />
                    </Link>

                    <div className="space-y-4 flex-1">
                        <StepIndicator step={1} current={state.step} label="Contact Info" />
                        <StepIndicator step={2} current={state.step} label="Service Selection" skipped={!!state.currentServiceSlug && state.step > 1} />
                        <StepIndicator step={3} current={state.step} label="Details" />
                        <StepIndicator step={4} current={state.step} label="Documents" skipped={requiredDocs.length === 0 && state.step > 4} />
                        <StepIndicator step={5} current={state.step} label="Review" isLast />
                    </div>

                    {/* Multi-Service Sidebar List */}
                    {state.services.length > 0 && (
                        <div className="bg-background rounded-xl p-4 border border-border mt-auto mb-4">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Your Cart</p>
                            <div className="space-y-2">
                                {state.services.map((s, idx) => {
                                    const serviceLabel = SERVICE_CATALOG.find(cat => cat.slug === s.slug)?.label
                                    return (
                                        <div key={idx} className="flex items-center gap-2 text-sm font-semibold border-l-2 border-primary pl-2">
                                            <span className="truncate">{serviceLabel}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {state.currentServiceSlug && (
                        <div className="bg-background rounded-xl p-4 border border-border mt-auto">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Adding Service</p>
                            <p className="font-semibold text-sm">{currentService?.label}</p>
                            {isContextAware && state.step > 1 && (
                                <button onClick={handleChangeService} className="text-xs text-primary hover:underline mt-2 flex items-center">
                                    <ArrowLeft className="w-3 h-3 mr-1" /> Change Selection
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Header (Step Indicator) */}
                <div className="md:hidden bg-muted/30 border-b border-border p-4 flex items-center justify-between">
                    <Link href="/" onClick={onClose} className="flex items-center">
                        {/* Compact Logo for Mobile */}
                        <span className="font-bold text-lg">Creations</span>
                    </Link>
                    <div className="text-sm font-medium text-muted-foreground">
                        Step {state.step} of 5
                    </div>
                </div>

                {/* Right Panel (Form) */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
                    <AnimatePresence mode="wait">
                        {state.step === 1 && (
                            <Step1Contact
                                key="step1"
                                isLoading={isLoading}
                                initialData={state.contactData}
                                onSubmit={handleContactSubmit}
                            />
                        )}
                        {state.step === 2 && (
                            <Step2Service
                                key="step2"
                                onSelect={handleServiceSelect}
                            />
                        )}
                        {state.step === 3 && (
                            <Step3Details
                                key="step3"
                                isLoading={isLoading}
                                category={state.currentCategory}
                                serviceSlug={state.currentServiceSlug}
                                initialData={state.currentDetails}
                                onSubmit={handleDetailsSubmit}
                                onBack={() => {
                                    if (state.currentServiceSlug && state.step === 3) {
                                        // If we skipped step 2, back goes to step 1
                                        setState(prev => ({ ...prev, step: 1 }))
                                    } else {
                                        setState(prev => ({ ...prev, step: 2 }))
                                    }
                                }}
                                isContextAware={isContextAware}
                                onChangeService={handleChangeService}
                            />
                        )}
                        {state.step === 4 && (
                            <Step4Docs
                                key="step4"
                                docs={requiredDocs}
                                onNext={handleDocsSubmit}
                                onBack={() => setState(prev => ({ ...prev, step: 3 }))}
                            />
                        )}
                        {state.step === 5 && (
                            <Step5Review
                                key="step5"
                                isLoading={isLoading}
                                state={state}
                                onSubmit={handleFinalSubmit}
                                onAddService={() => setState(prev => ({ ...prev, step: 2 }))}
                                onBack={() => setState(prev => ({ ...prev, step: requiredDocs.length > 0 ? 4 : 3 }))}
                            />
                        )}
                        {state.step === 6 && (
                            <Step6Success key="step6" onClose={onClose} state={state} />
                        )}
                    </AnimatePresence>
                </div>

            </motion.div>
        </div>
    )
}

// -----------------------------------------------------------------------------
// SUB-COMPONENTS
// -----------------------------------------------------------------------------

function StepIndicator({ step, current, label, skipped, isLast }: { step: number, current: number, label: string, skipped?: boolean, isLast?: boolean }) {
    const status = step === current ? "active" : step < current ? "completed" : "pending"

    // Don't show success step indicator
    if (step > 5) return null

    return (
        <div className="relative flex items-center gap-4 text-sm transition-colors duration-300 group">
            {/* Connector Line */}
            {!isLast && (
                <div className={cn("absolute left-5 top-10 w-0.5 h-12 -z-10 transition-colors",
                    step < current ? "bg-primary" : "bg-border"
                )} style={{ height: "40px" }} />
            )}

            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm transition-all font-bold shrink-0",
                status === "active" ? "border-primary bg-primary text-white shadow-lg scale-110" :
                    status === "completed" ? "border-primary bg-primary/10 text-primary" :
                        "border-border bg-background text-muted-foreground"
            )}>
                {status === "completed" ? <Check className="w-5 h-5" /> : step}
            </div>
            <span className={cn("font-medium transition-all",
                status === "active" ? "text-foreground text-base" : "text-muted-foreground",
                skipped && "line-through opacity-50"
            )}>{label}</span>
        </div>
    )
}

// STEP 1: CONTACT
function Step1Contact({ onSubmit, isLoading, initialData }: any) {
    // Build Zod schema dynamically from GLOBAL_FIELDS
    const schemaObj: any = {}
    GLOBAL_FIELDS.forEach(field => {
        if (field.validation) schemaObj[field.key] = field.validation
        else if (field.required) schemaObj[field.key] = z.string().min(1, "Required")
        else schemaObj[field.key] = z.string().optional()
    })
    const schema = z.object(schemaObj)

    // Prepare default values
    const defaultValues = {
        ...initialData,
        city: initialData?.city || "",   // Force user to select
        urgency: initialData?.urgency || "", // Force user to select
        existingClient: initialData?.existingClient || "no"
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues
    })

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Let&apos;s get started</h2>
                <p className="text-muted-foreground">We need a few details to create your quote.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {GLOBAL_FIELDS.filter(f => f.key !== "existingClient").map((field) => {
                        const Icon = field.key === "fullName" ? User : field.key === "email" ? Mail : field.key === "phone" ? Phone : null

                        return (
                            <div key={field.key} className={cn("space-y-2", field.key === "email" || field.key === "fullName" ? "md:col-span-1" : "")}>
                                <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
                                <div className="relative">
                                    {Icon && (
                                        <div className="absolute left-3 top-2.5 text-muted-foreground/50">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                    )}
                                    {field.type === "select" ? (
                                        <select {...register(field.key)} className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors pl-3">
                                            <option value="" disabled>Select...</option>
                                            {field.options?.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <Input
                                            {...register(field.key)}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className={cn("h-11", Icon && "pl-11")}
                                        />
                                    )}
                                </div>
                                {errors[field.key] && <p className="text-xs text-destructive font-medium mt-1">{errors[field.key]?.message as string}</p>}
                            </div>
                        )
                    })}
                </div>

                {/* Radio for Existing Client */}
                <div className="space-y-2">
                    <Label>Are you an existing client?</Label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <input type="radio" value="yes" {...register("existingClient")} className="accent-primary" />
                            <span className="text-sm">Yes, I am</span>
                        </label>
                        <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <input type="radio" value="no" {...register("existingClient")} className="accent-primary" />
                            <span className="text-sm">No, new customer</span>
                        </label>
                    </div>
                    {errors.existingClient && <p className="text-xs text-destructive">{errors.existingClient?.message as string}</p>}
                </div>

                <div className="pt-4 flex justify-end">
                    <Button type="submit" disabled={isLoading} size="lg" className="w-full md:w-auto min-w-[140px] text-white font-semibold h-12 text-base">
                        {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                        Next Step
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </form>
        </motion.div>
    )
}

// STEP 2: CATEGORY & SERVICE (Interactive Grid)
function Step2Service({ onSelect }: { onSelect: (cat: ServiceCategory, slug: string) => void }) {
    const [view, setView] = React.useState<"categories" | "services">("categories")
    const [activeCat, setActiveCat] = React.useState<ServiceCategory | null>(null)

    const filteredServices = SERVICE_CATALOG.filter(s => s.category === activeCat)

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    {view === "services" && (
                        <Button variant="ghost" size="sm" onClick={() => setView("categories")} className="h-8 px-2 -ml-2">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                    )}
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                    {view === "categories" ? "What do you need help with?" : `${activeCat || "Service"} Options`}
                </h2>
                <p className="text-muted-foreground">Select an option to proceed.</p>
            </div>

            {view === "categories" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ServiceCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCat(cat); setView("services") }}
                            className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/40 transition-all text-left group"
                        >
                            <span className="font-medium">{cat}</span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                        </button>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3">
                    {filteredServices.map((service) => (
                        <button
                            key={service.slug}
                            onClick={() => onSelect(service.category, service.slug)}
                            className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/40 transition-all text-left group"
                        >
                            <div className="flex-1">
                                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{service.label}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors mt-1" />
                        </button>
                    ))}
                </div>
            )}
        </motion.div>
    )
}

// STEP 3: DETAILS (Dynamic)
function Step3Details({ onSubmit, onBack, isLoading, category, serviceSlug, initialData, isContextAware, onChangeService }: any) {
    // 1. Merge relevant fields
    // Business Fields (Conditional)
    const businessFields = BUSINESS_FIELDS.filter(f => f.condition ? f.condition(category, serviceSlug) : true)
    // Service Specific Fields
    const serviceFields = serviceSlug ? getServiceSpecificFields(serviceSlug) : []
    const allFields = [...businessFields, ...serviceFields]

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData
    })

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Additional Details</h2>
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Tell us a bit more about your requirements.</p>
                    {isContextAware && (
                        <Button variant="link" size="sm" onClick={onChangeService} className="text-xs h-auto p-0 text-primary">
                            Change Service
                        </Button>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {allFields.length === 0 && <p className="text-sm text-muted-foreground italic">No additional details required for this service.</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {allFields.map((field) => (
                        <div key={field.key} className={cn("space-y-2", field.type === "textarea" ? "md:col-span-2" : "")}>
                            <Label>
                                {field.label} {field.required && <span className="text-destructive">*</span>}
                            </Label>
                            {field.type === "select" ? (
                                <select {...register(field.key, { required: field.required })} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors">
                                    <option value="" disabled>Select...</option>
                                    {field.options?.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            ) : field.type === "textarea" ? (
                                <Textarea {...register(field.key, { required: field.required })} placeholder={field.placeholder} />
                            ) : (
                                <Input {...register(field.key, { required: field.required })} type={field.type} placeholder={field.placeholder} />
                            )}
                            {errors[field.key] && <p className="text-xs text-destructive">Required</p>}
                        </div>
                    ))}
                </div>

                <div className="pt-4 flex justify-between">
                    <Button type="button" variant="ghost" onClick={onBack} size="lg" className="h-12">Back</Button>
                    <Button type="submit" disabled={isLoading} size="lg" className="text-white h-12 text-base px-8">
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Next Step
                    </Button>
                </div>
            </form>
        </motion.div>
    )
}

// STEP 4: DOCS CHECKLIST
function Step4Docs({ docs, onNext, onBack }: { docs: string[], onNext: () => void, onBack: () => void }) {
    const [checked, setChecked] = React.useState<string[]>([])
    const allChecked = checked.length === docs.length

    const toggle = (doc: string) => {
        setChecked(prev => prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc])
    }

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Required Documents</h2>
                <p className="text-muted-foreground">Please prepare the following documents. You can upload them later or email them.</p>
            </div>

            <div className="space-y-3 bg-muted/20 p-4 rounded-xl border border-border">
                {docs.map((doc) => (
                    <label key={doc} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-border transition-all">
                        <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors",
                            checked.includes(doc) ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 bg-background"
                        )}>
                            {checked.includes(doc) && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <input type="checkbox" className="hidden" onChange={() => toggle(doc)} checked={checked.includes(doc)} />
                        <span className={cn("text-sm transition-opacity", checked.includes(doc) ? "text-foreground font-medium" : "text-muted-foreground")}>{doc}</span>
                    </label>
                ))}
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-xl text-sm">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <p>We do not require these immediately, but having them ready will speed up your application significantly.</p>
            </div>

            <div className="pt-4 flex justify-between">
                <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
                <Button onClick={onNext} disabled={!allChecked} size="lg" className={cn("text-white h-12 text-base min-w-[140px]", !allChecked && "opacity-50")}>
                    I Understand
                    <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </motion.div>
    )
}

// STEP 5: REVIEW
function Step5Review({ state, onSubmit, onBack, onAddService, isLoading }: any) {
    const { contactData, services } = state

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Review & Submit</h2>
                <p className="text-muted-foreground">Please review your details before submitting.</p>
            </div>

            <div className="space-y-6">
                {/* Section: Contact */}
                <div className="border border-border rounded-xl p-4 space-y-3 bg-muted/20">
                    <div className="flex items-center justify-between border-b pb-2 border-border/50">
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Contact Details</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground text-xs">Name</p>
                            <p className="font-medium">{contactData?.fullName}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs">Email</p>
                            <p className="font-medium">{contactData?.email}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs">Phone</p>
                            <p className="font-medium">{contactData?.phone}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs">Location</p>
                            <p className="font-medium">{contactData?.city}</p>
                        </div>
                    </div>
                </div>

                {/* Section: Services List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Selected Services ({services.length})</h4>
                        <Button variant="outline" size="sm" onClick={onAddService} className="h-8 gap-2">
                            <ArrowLeft className="w-3 h-3" /> Add Another Service
                        </Button>
                    </div>

                    {services.map((service: ServiceSelection, idx: number) => {
                        const catalogItem = SERVICE_CATALOG.find(s => s.slug === service.slug)
                        return (
                            <div key={idx} className="border border-border rounded-xl p-4 space-y-3 relative group hover:border-primary/50 transition-colors">
                                <div className="flex items-center justify-between border-b pb-3 border-border/50">
                                    <h4 className="font-semibold text-primary">{catalogItem?.label || service.slug}</h4>
                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{service.category}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2">
                                    {Object.entries(service.details || {}).map(([key, value]) => {
                                        if (!value) return null
                                        return (
                                            <div key={key} className="flex flex-col">
                                                <span className="text-[10px] uppercase text-muted-foreground font-medium tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="font-medium truncate">{String(value)}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="pt-4 flex justify-between gap-4">
                    <Button type="button" variant="ghost" onClick={onBack} size="lg" className="h-12 text-muted-foreground hover:text-foreground">Back</Button>

                    <Button onClick={onSubmit} disabled={isLoading} size="lg" className="flex-1 text-white h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                        {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                        Submit Quote
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

// STEP 6: SUCCESS & OPTIONAL ACCOUNT
function Step6Success({ onClose, state }: { onClose: () => void, state: WizardState }) {
    const { trackingToken, userExists, contactData } = state
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMsg, setErrorMsg] = React.useState("")

    const handleCreateAccount = async () => {
        if (!password || password.length < 8) {
            setErrorMsg("Password must be at least 8 characters")
            return
        }

        setStatus("loading")
        try {
            const res = await fetch("/api/auth/register-from-lead", {
                method: "POST",
                body: JSON.stringify({
                    token: trackingToken,
                    password
                })
            })
            const json = await res.json()
            if (res.ok) {
                setStatus("success")
            } else {
                setErrorMsg(json.error || "Failed to create account")
                setStatus("error")
            }
        } catch (err) {
            setErrorMsg("Something went wrong")
            setStatus("error")
        }
    }

    if (status === "success") {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center space-y-6 p-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 shadow-xl">
                    <Check className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Account Created!</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        Your account is ready. You can now log in to track your request and upload documents.
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Button onClick={() => window.location.href = "/login"} size="lg" className="w-full text-white">
                        Go to Login
                    </Button>
                    <Button onClick={onClose} variant="ghost" className="w-full">
                        Close
                    </Button>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center space-y-6 p-6 max-w-lg mx-auto">
            <div className="space-y-2">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
                    <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Request Received</h2>
                <p className="text-muted-foreground">
                    We have received your details. One of our accountants will be in touch shortly.
                </p>
            </div>

            {/* Account Offer Card */}
            <div className="w-full bg-card border border-border rounded-xl p-6 shadow-sm text-left space-y-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Track your request</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Create a secure account to track status, upload documents, and communicate with us.
                        </p>
                    </div>
                </div>

                {userExists ? (
                    <div className="bg-muted/50 p-4 rounded-lg text-sm text-center space-y-3">
                        <p className="text-muted-foreground">It looks like you already have an account with <strong>{contactData?.email}</strong>.</p>
                        <Button onClick={() => window.location.href = "/login"} className="w-full" variant="outline">
                            Log in to Track Request
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label htmlFor="create-password">Create a password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="create-password"
                                    type={showPassword ? "text" : "password"}
                                    className="pl-9 pr-10"
                                    placeholder="Min 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errorMsg && <p className="text-xs text-destructive font-medium">{errorMsg}</p>}
                        </div>

                        <Button
                            onClick={handleCreateAccount}
                            disabled={status === "loading" || !password}
                            className="w-full text-white font-semibold"
                        >
                            {status === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Create Account
                        </Button>
                    </div>
                )}
            </div>

            <Button onClick={onClose} variant="ghost" className="text-muted-foreground hover:text-foreground w-full max-w-xs">
                Not now
            </Button>
        </motion.div>
    )
}
