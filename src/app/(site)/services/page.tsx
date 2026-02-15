import { ServicesClient } from "./services-client"
import { constructMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = constructMetadata({
    title: "Our Services",
    description: "Comprehensive accounting, compliance, and advisory solutions designed for South African businesses at every stage of growth."
})

export default function ServicesPage() {
    return <ServicesClient />
}
