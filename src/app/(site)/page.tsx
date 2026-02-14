import { HeroSection } from "@/components/home/hero-section"
import { PillarsSection } from "@/components/home/pillars-section"
import { ServicesGridSection } from "@/components/home/services-grid"
import { HowItWorksSection } from "@/components/home/how-it-works"
import { DeliverablesSection } from "@/components/home/deliverables-preview"
import { AboutPreviewSection } from "@/components/home/about-preview"
import { UseCasesSection } from "@/components/home/use-cases"
import { TestimonialsSection } from "@/components/home/testimonials"
import { FaqSection } from "@/components/home/faq-section"
import { FinalCtaSection } from "@/components/home/final-cta"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Organization, WithContext, LocalBusiness } from "schema-dts"

export const metadata = constructMetadata({
  title: "Accounting Services South Africa | Creations",
  description: "Specialised accounting, tax, and compliance services for South African businesses. We turn complex regulations into simple, actionable steps."
})

export default function Home() {
  const jsonLd: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "AccountingService", // specific subtype of LocalBusiness
    name: "Creations",
    image: "https://creations.co.za/logo.png",
    "@id": "https://creations.co.za",
    url: "https://creations.co.za",
    telephone: "+27101234567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 West Street",
      addressLocality: "Sandton",
      postalCode: "2196",
      addressCountry: "ZA"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -26.107567,
      longitude: 28.056702
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        opens: "08:00",
        closes: "17:00"
      }
    ],
    priceRange: "$$"
  }

  return (
    <main>
      <JsonLd data={jsonLd} />
      <HeroSection />
      <PillarsSection />
      <ServicesGridSection />
      <HowItWorksSection />
      <DeliverablesSection />
      <AboutPreviewSection />
      <UseCasesSection />
      <TestimonialsSection />
      {/* Resources Preview skipped for now as per instructions (Coming Soon) */}
      <FaqSection />
      <FinalCtaSection />
    </main>
  )
}
