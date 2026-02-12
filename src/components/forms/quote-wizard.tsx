"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    ArrowRight,
    Loader2,
    Shield,
    Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { PortalUploadZone } from "@/components/leads/portal-upload-zone"
import { QuoteFormLayout } from "@/components/forms/quote-form-layout"

const STEPS = [
    { id: 1, title: "Personal Details", description: "Who are you?" },
    { id: 2, title: "Business Profile", description: "What do you do?" },
    { id: 3, title: "Documents", description: "Insight Vault" },
    { id: 4, title: "Review", description: "Final Check" },
]

interface LeadData {
    fullName: string
    email: string
    phone: string
    serviceType: string
    urgency: string
    budgetRange: string
    companyName: string
    industry: string
    message: string
}

interface QuoteWizardProps {
    initialData?: Partial<LeadData> & { id: string, lastStepCompleted: number }
    resumeToken?: string | null
}

export function QuoteWizard({ initialData, resumeToken: _resumeToken }: QuoteWizardProps) {
    const [step, setStep] = React.useState(initialData?.lastStepCompleted || 1)
    const [leadId, setLeadId] = React.useState<string | null>(initialData?.id || null)
    const [portalToken, setPortalToken] = React.useState<string | null>(null)

    const [data, setData] = React.useState<LeadData>({
        fullName: initialData?.fullName || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        serviceType: initialData?.serviceType || "",
        urgency: initialData?.urgency || "Soon_7d",
        budgetRange: initialData?.budgetRange || "Unknown",
        companyName: initialData?.companyName || "",
        industry: initialData?.industry || "",
        message: initialData?.message || "",
    })

    const [isSaving, setIsSaving] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)

    // Autosave Logic
    const lastSavedData = React.useRef(data)

    const triggerAutosave = React.useCallback(async (currentData: LeadData, currentStep: number) => {
        // Only save if data has changed or it's a new step
        if (JSON.stringify(currentData) === JSON.stringify(lastSavedData.current) && currentStep === step) {
            return
        }

        // For initial creation, we need name and email
        if (!leadId && (!currentData.fullName || !currentData.email)) {
            return
        }

        setIsSaving(true)
        try {
            const res = await fetch("/api/leads/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    leadId,
                    step: currentStep,
                    data: currentData,
                    deviceMetadata: {
                        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "Server",
                        screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "Unknown"
                    }
                })
            })

            const result = await res.json()
            if (result.success) {
                if (result.leadId) setLeadId(result.leadId)
                if (result.portalToken) setPortalToken(result.portalToken)
                lastSavedData.current = currentData
            }
        } catch (error) {
            console.error("Autosave error:", error)
        } finally {
            setIsSaving(false)
        }
    }, [leadId, step])

    const handleStepChange = async (next: boolean) => {
        const nextStep = next ? step + 1 : step - 1
        await triggerAutosave(data, step)
        setStep(nextStep)
    }

    const handleChange = (field: keyof LeadData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }))
    }

    const onFinalSubmit = async () => {
        setIsSaving(true)
        try {
            await triggerAutosave(data, 4)
            setIsSuccess(true)
        } catch (error) {
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    const currentStepInfo = STEPS.find(s => s.id === step)

    if (isSuccess) {
        return (
            <QuoteFormLayout steps={STEPS.map(s => ({ ...s, isCompleted: true, isActive: false }))} currentStep={4}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6"
                >
                    <div className="h-24 w-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-accent/5">
                        <CheckCircle2 className="h-12 w-12 text-accent" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black tracking-tight">Request Received!</h2>
                        <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                            Excellent. We&apos;ve received your details and our team is already reviewing them. Expect a call within 2-4 business hours.
                        </p>
                    </div>
                    <div className="pt-8">
                        <Button onClick={() => window.location.href = "/"} size="lg" className="rounded-2xl h-14 px-10 font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-accent/20">
                            View Dashboard preview
                        </Button>
                    </div>
                </motion.div>
            </QuoteFormLayout>
        )
    }

    return (
        <QuoteFormLayout
            steps={STEPS.map(s => ({
                ...s,
                isCompleted: step > s.id,
                isActive: step === s.id
            }))}
            currentStep={step}
            isLoading={isSaving}
        >
            <div className="flex flex-col h-full min-h-[calc(100vh-12rem)]">
                {/* Header */}
                <div className="mb-8 space-y-2">
                    <div className="flex items-center gap-3 text-muted-foreground/60 text-[10px] font-black uppercase tracking-[0.25em]">
                        <span>Step 0{step}</span>
                        <span>/</span>
                        <span>04</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
                        {currentStepInfo?.title}
                    </h1>
                    {currentStepInfo?.description && (
                        <p className="text-lg text-muted-foreground font-medium">{currentStepInfo.description}</p>
                    )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-10 pb-12"
                        >
                            {step === 1 && <PersonalStep data={data} onChange={handleChange} />}
                            {step === 2 && <BusinessStep data={data} onChange={handleChange} />}
                            {step === 3 && <DocumentStep portalToken={portalToken || "new"} />}
                            {step === 4 && <ReviewStep data={data} />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Footer */}
                <div className="flex items-center justify-between pt-8 border-t border-border/40 mt-auto">
                    <Button
                        variant="ghost"
                        onClick={() => handleStepChange(false)}
                        disabled={step === 1 || isSaving}
                        className={cn("rounded-[1.25rem] h-12 px-6 font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground/60 hover:text-foreground transition-all active:scale-95", step === 1 && "invisible")}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" /> back
                    </Button>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="hidden md:flex text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                            Autosaving...
                        </div>

                        {isSaving && (
                            <div className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-[0.25em] animate-pulse">
                                <Loader2 className="h-3 w-3 animate-spin" /> <span className="hidden sm:inline">Saving</span>
                            </div>
                        )}

                        {step < 4 ? (
                            <Button
                                onClick={() => handleStepChange(true)}
                                disabled={step === 1 && (!data.fullName || !data.email)}
                                className="rounded-[1.25rem] h-12 md:h-14 px-8 md:px-10 font-black uppercase text-[10px] md:text-[11px] tracking-[0.2em] shadow-2xl shadow-accent/25 transition-all active:scale-[0.97] hover:shadow-accent/40 text-white"
                            >
                                Continue <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={onFinalSubmit}
                                className="rounded-[1.25rem] h-12 md:h-14 px-10 md:px-12 font-black uppercase text-[10px] md:text-[11px] tracking-[0.2em] bg-accent hover:bg-accent/90 shadow-2xl shadow-accent/30 transition-all active:scale-[0.97] text-white"
                            >
                                Review & Complete <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </QuoteFormLayout>
    )
}

interface PersonalStepProps {
    data: LeadData
    onChange: (field: keyof LeadData, value: string) => void
}

function PersonalStep({ data, onChange }: PersonalStepProps) {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-2">
                <Label className="text-xl font-bold tracking-tight">Contact Information</Label>
                <p className="text-sm text-muted-foreground">We need these details to create your secure portal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-1">Full Name <span className="text-red-500">*</span></Label>
                    <Input
                        placeholder="e.g. Nicolaas van der Merwe"
                        value={data.fullName}
                        onChange={(e) => onChange("fullName", e.target.value)}
                        className="h-14 rounded-2xl bg-muted/30 border-2 border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/30 font-medium px-6 text-base transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-1">Work Email <span className="text-red-500">*</span></Label>
                    <Input
                        type="email"
                        placeholder="name@company.co.za"
                        value={data.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        className="h-14 rounded-2xl bg-muted/30 border-2 border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/30 font-medium px-6 text-base transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-1">Mobile Number <span className="text-red-500">*</span></Label>
                    <Input
                        placeholder="+27 82 000 0000"
                        value={data.phone}
                        onChange={(e) => onChange("phone", e.target.value)}
                        className="h-14 rounded-2xl bg-muted/30 border-2 border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/30 font-medium px-6 text-base transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-1">Objective <span className="text-red-500">*</span></Label>
                    <Select value={data.serviceType} onValueChange={(v) => onChange("serviceType", v)}>
                        <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-2 border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/30 font-medium px-6 text-base transition-all">
                            <SelectValue placeholder="What do you need?" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/40 p-2 shadow-2xl">
                            <SelectItem value="Bookkeeping" className="rounded-lg font-medium py-2.5">Monthly Bookkeeping</SelectItem>
                            <SelectItem value="Accounting" className="rounded-lg font-medium py-2.5">Annual Financials</SelectItem>
                            <SelectItem value="Tax" className="rounded-lg font-medium py-2.5">Tax Compliance</SelectItem>
                            <SelectItem value="Payroll" className="rounded-lg font-medium py-2.5">Payroll System</SelectItem>
                            <SelectItem value="CIPC" className="rounded-lg font-medium py-2.5">CIPC Secretarial</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-1">Target Timeline <span className="text-red-500">*</span></Label>
                <RadioGroup value={data.urgency} onValueChange={(v) => onChange("urgency", v)} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { id: "Urgent_24_48h", label: "ASAP", desc: "Within 48 hours" },
                        { id: "Soon_7d", label: "Standard", desc: "Within 7 days" },
                        { id: "Flexible_30d", label: "Flexible", desc: "Within 30 days" },
                    ].map((opt) => (
                        <div key={opt.id} className="relative">
                            <RadioGroupItem value={opt.id} id={opt.id} className="peer sr-only" />
                            <Label
                                htmlFor={opt.id}
                                className="flex flex-col p-5 rounded-2xl border-2 border-border/40 bg-card/40 cursor-pointer transition-all duration-300 peer-aria-checked:border-accent peer-aria-checked:bg-accent/[0.04] peer-aria-checked:shadow-lg peer-aria-checked:shadow-accent/5 hover:bg-muted/40 hover:border-border/60 relative z-10"
                            >
                                <span className="text-sm font-black tracking-tight">{opt.label}</span>
                                <span className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-wide opacity-70">{opt.desc}</span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}

interface BusinessStepProps {
    data: LeadData
    onChange: (field: keyof LeadData, value: string) => void
}

function BusinessStep({ data, onChange }: BusinessStepProps) {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-2">
                <Label className="text-xl font-bold tracking-tight">Business Profile</Label>
                <p className="text-sm text-muted-foreground">Tell us about your organization.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-1">Entity Name</Label>
                    <Input
                        placeholder="e.g. Acme Holdings"
                        value={data.companyName}
                        onChange={(e) => onChange("companyName", e.target.value)}
                        className="h-14 rounded-2xl bg-muted/30 border-2 border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/30 font-medium px-6 text-base transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-1">Industry Sector</Label>
                    <Select value={data.industry} onValueChange={(v) => onChange("industry", v)}>
                        <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-2 border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/30 font-medium px-6 text-base transition-all">
                            <SelectValue placeholder="Where do you operate?" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/40 p-2 shadow-2xl">
                            <SelectItem value="Retail" className="rounded-lg font-medium py-2.5">Retail / Wholesale</SelectItem>
                            <SelectItem value="Tech" className="rounded-lg font-medium py-2.5">SaaS / Software</SelectItem>
                            <SelectItem value="Construction" className="rounded-lg font-medium py-2.5">Construction & Engineering</SelectItem>
                            <SelectItem value="Professional" className="rounded-lg font-medium py-2.5">Professional Services</SelectItem>
                            <SelectItem value="Manufacturing" className="rounded-lg font-medium py-2.5">Manufacturing</SelectItem>
                            <SelectItem value="Logistics" className="rounded-lg font-medium py-2.5">Logistics & Transport</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-1">Strategic Notes (Optional)</Label>
                <Textarea
                    placeholder="Detail any complex tax requirements or specific goals..."
                    value={data.message}
                    onChange={(e) => onChange("message", e.target.value)}
                    className="min-h-[140px] rounded-2xl bg-muted/30 border-2 border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/30 font-medium p-6 text-base transition-all resize-none"
                />
            </div>
        </div>
    )
}

function DocumentStep({ portalToken }: { portalToken: string }) {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-2">
                <Label className="text-xl font-bold tracking-tight">Insight Vault</Label>
                <p className="text-sm text-muted-foreground">Upload identifying docs or current financials for a faster quote.</p>
            </div>

            <div className="p-8 border-2 border-dashed border-accent/20 rounded-[2rem] bg-accent/[0.015] hover:bg-accent/[0.03] transition-colors group">
                <PortalUploadZone token={portalToken} onUploadSuccess={() => { }} />
            </div>

            <div className="bg-muted/20 p-6 rounded-2xl flex items-start gap-5 border border-border/40">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-accent" />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Privacy Guard</p>
                    <p className="text-xs font-medium text-muted-foreground/80 leading-relaxed">
                        RSA POPIA Compliant. Your documents are stored in an encrypted vault accessible only to your assigned financial lead.
                    </p>
                </div>
            </div>
        </div>
    )
}

function ReviewStep({ data }: { data: LeadData }) {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-2">
                <Label className="text-xl font-bold tracking-tight">Integrity Check</Label>
                <p className="text-sm text-muted-foreground">Confirm your details before we initialize your account.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/20 p-6 rounded-2xl space-y-1 border border-border/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50">Full Identity</span>
                    <p className="font-bold tracking-tight text-lg">{data.fullName}</p>
                </div>
                <div className="bg-muted/20 p-6 rounded-2xl space-y-1 border border-border/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50">Connectivity</span>
                    <p className="font-bold tracking-tight text-lg break-all">{data.email}</p>
                </div>
                <div className="bg-muted/20 p-6 rounded-2xl space-y-1 border border-accent/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/60">Selected Vertical</span>
                    <p className="font-bold tracking-tight text-lg text-accent">{data.serviceType || "Primary Assessment"}</p>
                </div>
                <div className="bg-muted/20 p-6 rounded-2xl space-y-1 border border-border/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50">Entity Context</span>
                    <p className="font-bold tracking-tight text-lg">{data.companyName || "Personal Onboarding"}</p>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-accent/[0.04] border border-accent/15">
                <p className="text-xs font-medium leading-relaxed text-muted-foreground/70 italic text-center">
                    By clicking complete, you authorize Creations to process your request in accordance with the South African Privacy Act.
                </p>
            </div>
        </div>
    )
}
