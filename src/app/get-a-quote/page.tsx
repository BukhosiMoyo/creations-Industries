import { GetAQuoteClient } from "./quote-client"
import { constructMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = constructMetadata({
    title: "Request a Quote",
    description: "Get a customized quote for your accounting, tax, and compliance needs. Fast, transparent pricing for South African businesses."
})

export default function GetAQuotePage() {
    return (
        <main>
            <h1 className="sr-only">Request a Quote</h1>
            <GetAQuoteClient />
        </main>
    )
}
