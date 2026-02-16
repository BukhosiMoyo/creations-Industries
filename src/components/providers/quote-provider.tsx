"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { QuoteWizardModal } from "@/components/forms/quote-wizard-modal"

interface QuoteContextType {
    openQuoteWizard: () => void
    closeQuoteWizard: () => void
    isOpen: boolean
}

const QuoteContext = React.createContext<QuoteContextType | undefined>(undefined)

export function QuoteProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const searchParams = useSearchParams()

    // Auto-open if ?quote=true (optional feature, useful for external links)
    React.useEffect(() => {
        if (searchParams.get("quote") === "true") {
            setIsOpen(true)
        }
    }, [searchParams])

    const openQuoteWizard = () => setIsOpen(true)
    const closeQuoteWizard = () => setIsOpen(false)

    return (
        <QuoteContext.Provider value={{ openQuoteWizard, closeQuoteWizard, isOpen }}>
            {children}
            <QuoteWizardModal isOpen={isOpen} onClose={closeQuoteWizard} />
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
