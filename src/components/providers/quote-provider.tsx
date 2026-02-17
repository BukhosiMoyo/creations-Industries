"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { QuoteWizardModal } from "@/components/forms/quote-wizard-modal"
import { Suspense } from "react"

interface QuoteContextType {
    openQuoteWizard: () => void
    closeQuoteWizard: () => void
    isOpen: boolean
}

const QuoteContext = React.createContext<QuoteContextType | undefined>(undefined)

function QuoteAutoOpener() {
    const searchParams = useSearchParams()
    const { openQuoteWizard } = useQuote()

    React.useEffect(() => {
        if (searchParams.get("quote") === "true") {
            openQuoteWizard()
        }
    }, [searchParams, openQuoteWizard])

    return null
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false)

    const openQuoteWizard = React.useCallback(() => setIsOpen(true), [])
    const closeQuoteWizard = React.useCallback(() => setIsOpen(false), [])

    return (
        <QuoteContext.Provider value={{ openQuoteWizard, closeQuoteWizard, isOpen }}>
            {children}
            <QuoteWizardModal isOpen={isOpen} onClose={closeQuoteWizard} />
            <Suspense fallback={null}>
                <QuoteAutoOpener />
            </Suspense>
        </QuoteContext.Provider>
    )
}

export function useQuote() {
    const context = React.useContext(QuoteContext)
    if (context === undefined) {
        throw new Error("useQuote must be used within a QuoteProvider")
    }
    return context
}
