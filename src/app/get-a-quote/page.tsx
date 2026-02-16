import { redirect } from "next/navigation"

export const metadata = {
    title: "Request a Quote | Creations",
    description: "Get a customized quote for your accounting, tax, and compliance needs."
}

export default function GetAQuotePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    // Construct query string
    const params = new URLSearchParams()
    params.set('quote', 'true')

    // Preserve other params (category, service, etc)
    Object.entries(searchParams).forEach(([key, value]) => {
        if (typeof value === 'string') {
            params.set(key, value)
        } else if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v))
        }
    })

    redirect(`/?${params.toString()}`)
}
