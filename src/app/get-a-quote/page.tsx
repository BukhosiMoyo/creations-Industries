"use client"

import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { QuoteWizard } from "@/components/forms/quote-wizard"
import { ReactiveGridPattern } from "@/components/ui/reactive-grid-pattern"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

interface LeadInitialData {
    id: string
    fullName: string
    email: string
    phone: string
    serviceType: string
    urgency: string
    budgetRange: string
    companyName: string
    industry: string
    message: string
    lastStepCompleted: number
}

function QuotePageContent() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [initialData, setInitialData] = useState<LeadInitialData | null>(null)
    const [isLoading, setIsLoading] = useState(!!token)

    useEffect(() => {
        if (!token) return

        async function resumeLead() {
            try {
                const res = await fetch(`/api/leads/resume/${token}`)
                if (res.ok) {
                    const data = await res.json()
                    setInitialData(data)
                }
            } catch (error) {
                console.error("Resume error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        resumeLead()
    }, [token])

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Resuming your session...</p>
            </div>
        )
    }

    return <QuoteWizard initialData={initialData || undefined} resumeToken={token} />
}

export default function GetAQuotePage() {
    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden selection:bg-accent/30">
            {/* Immersive Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/[0.03]" />
                <ReactiveGridPattern
                    className="opacity-[0.15] dark:opacity-[0.2]"
                    gap={60}
                    intensity="subtle"
                />
            </div>

            {/* Navigation Header */}
            <div className="fixed top-0 left-0 right-0 p-6 md:p-10 pointer-events-none z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all px-4 py-2 rounded-2xl hover:bg-muted/50"
                    >
                        <div className="h-8 w-8 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                            <ArrowLeft className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit to home</span>
                    </Link>

                    <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
                        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Session Secured</span>
                    </div>
                </div>
            </div>

            {/* Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[860px] relative z-10 py-20"
            >
                <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-accent" />}>
                    <QuotePageContent />
                </Suspense>
            </motion.div>

            {/* Footer Trust Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-8 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-center items-center gap-8 text-[9px] font-black tracking-[0.3em] uppercase text-muted-foreground/30">
                    <span>POPIA COMPLIANT</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <span>RSA CERTIFIED ACCOUNTANTS</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <span>SECURE CLOUD STORAGE</span>
                </div>
            </div>
        </main>
    )
}
