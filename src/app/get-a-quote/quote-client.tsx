"use client"

import { QuoteWizard } from "@/components/forms/quote-wizard"
import { Loader2 } from "lucide-react"
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
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Resuming your session...</p>
            </div>
        )
    }

    return <QuoteWizard initialData={initialData || undefined} resumeToken={token} />
}

export function GetAQuoteClient() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        }>
            <QuotePageContent />
        </Suspense>
    )
}
