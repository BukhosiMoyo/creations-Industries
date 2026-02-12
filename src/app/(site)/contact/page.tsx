import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ContactForm } from "@/components/forms/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <main>
            <SectionWrapper showGlow patternIntensity="subtle" padding="lg">
                <Container className="text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Get in Touch</h1>
                    <p className="text-xl text-text-secondary mb-8">
                        Have a question or need to discuss your requirements? We are here to help.
                    </p>
                </Container>
            </SectionWrapper>

            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Details */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    <Mail className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Email Us</h3>
                                    <p className="text-text-secondary">info@creations.africa</p>
                                    <p className="text-text-muted text-sm mt-1">We typically reply within 24 hours.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    <Phone className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Call Us</h3>
                                    <p className="text-text-secondary">+27 (0) 10 123 4567</p>
                                    <p className="text-text-muted text-sm mt-1">Mon-Fri from 8am to 5pm.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    <MapPin className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Our Office</h3>
                                    <p className="text-text-secondary">
                                        100 West Street, Sandton<br />
                                        Johannesburg, 2196<br />
                                        South Africa
                                    </p>
                                    <p className="text-text-muted text-sm mt-1">By appointment only.</p>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="w-full h-64 bg-surface-elevated rounded-xl border border-border flex items-center justify-center mt-8">
                                <p className="text-text-muted text-sm">Interactive Map Loading...</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-background rounded-2xl border border-border p-6 md:p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                            <ContactForm />
                        </div>
                    </div>
                </Container>
            </SectionWrapper>
        </main>
    )
}
