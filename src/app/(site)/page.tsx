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

export default function Home() {
  return (
    <main>
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
