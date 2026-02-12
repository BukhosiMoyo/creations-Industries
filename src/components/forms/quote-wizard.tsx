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
    Building2,
    User,
    FileCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
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

const STEPS = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Business", icon: Building2 },
    { id: 3, title: "Documents", icon: Upload },
    { id: 4, title: "Review", icon: FileCheck },
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

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
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
        )
    }

    return (
        <Card className="border-none bg-card/60 backdrop-blur-3xl shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)] overflow-hidden rounded-[3rem] ring-1 ring-border/50">
            <CardContent className="p-0 flex flex-col md:flex-row min-h-[650px]">
                {/* Left Side: Stepper */}
                <div className="md:w-[320px] bg-accent/[0.02] border-r border-border/40 p-12 hidden md:flex flex-col justify-between">
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-white font-black italic shadow-xl shadow-accent/30 text-lg">C</div>
                            <span className="font-black tracking-tighter text-xl uppercase italic">Creations</span>
                        </div>

                        <div className="space-y-8">
                            {STEPS.map((s) => (
                                <div key={s.id} className="flex items-center gap-5 group">
                                    <div className={cn(
                                        "h-12 w-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500",
                                        step > s.id ? "bg-accent border-accent text-white" :
                                            step === s.id ? "border-accent text-accent shadow-xl shadow-accent/10 scale-105" :
                                                "border-muted text-muted-foreground opacity-30 group-hover:opacity-60"
                                    )}>
                                        {step > s.id ? <CheckCircle2 className="h-6 w-6" /> : <s.icon className="h-6 w-6" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-[0.25em] leading-none mb-1.5",
                                            step === s.id ? "text-accent" : "text-muted-foreground/50"
                                        )}>Step 0{s.id}</span>
                                        <span className={cn(
                                            "font-black text-sm tracking-tight",
                                            step === s.id ? "text-foreground" : "text-muted-foreground/60"
                                        )}>{s.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-accent/[0.04] rounded-[2rem] space-y-4 border border-accent/10">
                        <div className="flex items-center gap-3 text-accent">
                            <Shield className="h-5 w-5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">End-to-End Secure</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed font-bold opacity-80 uppercase tracking-wide">
                            Your fiscal data remains private & encrypted at all times.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form Panel */}
                <div className="flex-1 flex flex-col">
                    {/* Top Mobile Stepper */}
                    <div className="md:hidden p-8 border-b border-border/40 flex justify-between items-center bg-card/40">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Step {step} of 4</span>
                        <Progress value={(step / 4) * 100} className="w-24 h-1.5" />
                    </div>

                    <div className="flex-1 p-8 md:p-16 overflow-y-auto max-h-[75vh] custom-scrollbar">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-10"
                            >
                                {step === 1 && <PersonalStep data={data} onChange={handleChange} />}
                                {step === 2 && <BusinessStep data={data} onChange={handleChange} />}
                                {step === 3 && <DocumentStep portalToken={portalToken || "new"} />}
                                {step === 4 && <ReviewStep data={data} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Footer */}
                    <div className="p-10 md:p-16 pt-0 flex items-center justify-between mt-auto">
                        <Button
                            variant="ghost"
                            onClick={() => handleStepChange(false)}
                            disabled={step === 1 || isSaving}
                            className={cn("rounded-[1.25rem] h-14 px-8 font-black uppercase text-[11px] tracking-[0.2em] text-muted-foreground/60 hover:text-foreground transition-all active:scale-95", step === 1 && "invisible")}
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" /> back
                        </Button>

                        <div className="flex items-center gap-6">
                            {isSaving && (
                                <div className="flex items-center gap-3 text-[10px] font-black text-accent uppercase tracking-[0.25em] animate-pulse">
                                    <Loader2 className="h-4 w-4 animate-spin" /> Saving
                                </div>
                            )}
                            {step < 4 ? (
                                <Button
                                    onClick={() => handleStepChange(true)}
                                    disabled={step === 1 && (!data.fullName || !data.email)}
                                    className="rounded-[1.25rem] h-14 px-10 font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-accent/25 transition-all active:scale-[0.97] hover:shadow-accent/40"
                                >
                                    Continue <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={onFinalSubmit}
                                    className="rounded-[1.25rem] h-14 px-12 font-black uppercase text-[11px] tracking-[0.2em] bg-accent hover:bg-accent/90 shadow-2xl shadow-accent/30 transition-all active:scale-[0.97]"
                                >
                                    Review & Complete <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

interface PersonalStepProps {
    data: LeadData
    onChange: (field: keyof LeadData, value: string) => void
}

function PersonalStep({ data, onChange }: PersonalStepProps) {
    return (
        <div className="space-y-10">
            <div className="space-y-3">
                <h2 className="text-4xl font-black tracking-tight leading-tight">Secure your<br />accounting partner.</h2>
                <p className="text-muted-foreground text-lg">Start by sharing your primary contact details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-2">Full Name</Label>
                    <Input
                        placeholder="e.g. Nicolaas van der Merwe"
                        value={data.fullName}
                        onChange={(e) => onChange("fullName", e.target.value)}
                        className="h-16 rounded-[1.25rem] bg-muted/30 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/30 font-black px-8 text-lg transition-all"
                    />
                </div>
                <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-2">Work Email</Label>
                    <Input
                        type="email"
                        placeholder="name@company.co.za"
                        value={data.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        className="h-16 rounded-[1.25rem] bg-muted/30 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/30 font-black px-8 text-lg transition-all"
                    />
                </div>
                <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-2">Mobile Number</Label>
                    <Input
                        placeholder="+27 82 000 0000"
                        value={data.phone}
                        onChange={(e) => onChange("phone", e.target.value)}
                        className="h-16 rounded-[1.25rem] bg-muted/30 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/30 font-black px-8 text-lg transition-all"
                    />
                </div>
                <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-2">Objective</Label>
                    <Select value={data.serviceType} onValueChange={(v) => onChange("serviceType", v)}>
                        <SelectTrigger className="h-16 rounded-[1.25rem] bg-muted/30 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/30 font-black px-8 text-lg transition-all">
                            <SelectValue placeholder="What do you need?" />
                        </SelectTrigger>
                        <SelectContent className="rounded-[1.25rem] border-border/40 p-2 shadow-2xl">
                            <SelectItem value="Bookkeeping" className="rounded-xl font-bold py-3">Monthly Bookkeeping</SelectItem>
                            <SelectItem value="Accounting" className="rounded-xl font-bold py-3">Annual Financials</SelectItem>
                            <SelectItem value="Tax" className="rounded-xl font-bold py-3">Tax Compliance</SelectItem>
                            <SelectItem value="Payroll" className="rounded-xl font-bold py-3">Payroll System</SelectItem>
                            <SelectItem value="CIPC" className="rounded-xl font-bold py-3">CIPC Secretarial</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-6 pt-4">
                <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-2">How urgent is this?</Label>
                <RadioGroup value={data.urgency} onValueChange={(v) => onChange("urgency", v)} className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        { id: "Urgent_24_48h", label: "ASAP", desc: "48 hours" },
                        { id: "Soon_7d", label: "Standard", desc: "7 days" },
                        { id: "Flexible_30d", label: "Flexible", desc: "30 days" },
                    ].map((opt) => (
                        <div key={opt.id} className="relative">
                            <RadioGroupItem value={opt.id} id={opt.id} className="peer sr-only" />
                            <Label
                                htmlFor={opt.id}
                                className="flex flex-col p-6 rounded-[1.5rem] border-2 border-border/40 bg-card/40 cursor-pointer transition-all duration-300 peer-aria-checked:border-accent peer-aria-checked:bg-accent/[0.04] peer-aria-checked:shadow-xl peer-aria-checked:shadow-accent/5 hover:bg-muted/40 hover:border-border/60"
                            >
                                <span className="text-sm font-black tracking-tight">{opt.label}</span>
                                <span className="text-[10px] text-muted-foreground font-black mt-2 uppercase tracking-widest opacity-60">{opt.desc}</span>
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
        <div className="space-y-10">
            <div className="space-y-3">
                <h2 className="text-4xl font-black tracking-tight leading-tight">Market & Profile.</h2>
                <p className="text-muted-foreground text-lg">Define your business landscape to help us prepare.</p>
            </div>

            <div className="space-y-8 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-2">Entity Name</Label>
                        <Input
                            placeholder="e.g. Acme Holdings"
                            value={data.companyName}
                            onChange={(e) => onChange("companyName", e.target.value)}
                            className="h-16 rounded-[1.25rem] bg-muted/30 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/30 font-black px-8 text-lg transition-all"
                        />
                    </div>
                    <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-2">Industry Sector</Label>
                        <Select value={data.industry} onValueChange={(v) => onChange("industry", v)}>
                            <SelectTrigger className="h-16 rounded-[1.25rem] bg-muted/30 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/30 font-black px-8 text-lg transition-all">
                                <SelectValue placeholder="Where do you operate?" />
                            </SelectTrigger>
                            <SelectContent className="rounded-[1.25rem] border-border/40 p-2 shadow-2xl">
                                <SelectItem value="Retail" className="rounded-xl font-bold py-3">Retail / Wholesale</SelectItem>
                                <SelectItem value="Tech" className="rounded-xl font-bold py-3">SaaS / Software</SelectItem>
                                <SelectItem value="Construction" className="rounded-xl font-bold py-3">Construction & Engineering</SelectItem>
                                <SelectItem value="Professional" className="rounded-xl font-bold py-3">Professional Services</SelectItem>
                                <SelectItem value="Manufacturing" className="rounded-xl font-bold py-3">Manufacturing</SelectItem>
                                <SelectItem value="Logistics" className="rounded-xl font-bold py-3">Logistics & Transport</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60 ml-2">Strategic Notes (Optional)</Label>
                    <Textarea
                        placeholder="Detail any complex tax requirements or specific goals..."
                        value={data.message}
                        onChange={(e) => onChange("message", e.target.value)}
                        className="min-h-[160px] rounded-[1.5rem] bg-muted/30 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent/30 font-black p-8 text-lg transition-all resize-none"
                    />
                </div>
            </div>
        </div>
    )
}

function DocumentStep({ portalToken }: { portalToken: string }) {
    return (
        <div className="space-y-10">
            <div className="space-y-3">
                <h2 className="text-4xl font-black tracking-tight leading-tight">Insight Vault.</h2>
                <p className="text-muted-foreground text-lg">Upload identifying docs or current financials for a faster quote.</p>
            </div>

            <div className="p-10 border-2 border-dashed border-accent/20 rounded-[2.5rem] bg-accent/[0.015] hover:bg-accent/[0.03] transition-colors group">
                <PortalUploadZone token={portalToken} onUploadSuccess={() => { }} />
            </div>

            <div className="bg-muted/20 p-8 rounded-[1.5rem] flex items-start gap-5 border border-border/40">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-accent" />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Privacy Guard</p>
                    <p className="text-xs font-bold text-muted-foreground/80 leading-relaxed">
                        RSA POPIA Compliant. Your documents are stored in an encrypted vault accessible only to your assigned financial lead.
                    </p>
                </div>
            </div>
        </div>
    )
}

function ReviewStep({ data }: { data: LeadData }) {
    return (
        <div className="space-y-10">
            <div className="space-y-3">
                <h2 className="text-4xl font-black tracking-tight leading-tight">Integrity Check.</h2>
                <p className="text-muted-foreground text-lg">Confirm your details before we initialize your account.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/20 p-8 rounded-[1.5rem] space-y-2 border border-border/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50">Full Identity</span>
                    <p className="font-black tracking-tight text-xl">{data.fullName}</p>
                </div>
                <div className="bg-muted/20 p-8 rounded-[1.5rem] space-y-2 border border-border/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50">Connectivity</span>
                    <p className="font-black tracking-tight text-xl break-all">{data.email}</p>
                </div>
                <div className="bg-muted/20 p-8 rounded-[1.5rem] space-y-2 border border-accent/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/60">Selected Vertical</span>
                    <p className="font-black tracking-tight text-xl text-accent">{data.serviceType || "Primary Assessment"}</p>
                </div>
                <div className="bg-muted/20 p-8 rounded-[1.5rem] space-y-2 border border-border/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50">Entity Context</span>
                    <p className="font-black tracking-tight text-xl">{data.companyName || "Personal Onboarding"}</p>
                </div>
            </div>

            <div className="p-8 rounded-[1.5rem] bg-accent/[0.04] border border-accent/15">
                <p className="text-xs font-bold leading-relaxed text-muted-foreground/70 italic text-center">
                    By clicking complete, you authorize Creations to process your request in accordance with the South African Privacy Act.
                </p>
            </div>
        </div>
    )
}
