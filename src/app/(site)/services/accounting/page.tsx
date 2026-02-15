import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, CheckCircle2, FileText, Globe, HelpCircle, LayoutGrid, PieChart, Shield, TrendingUp, Users, Clock, AlertTriangle, XCircle, Building2, Gavel, Stethoscope, HardHat } from "lucide-react"
import { trackEvent, ConversionEvents } from "@/lib/analytics"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { IconList } from "@/components/ui/icon-list"
import { QuoteLink } from "@/components/common/quote-link"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { FAQPage, WithContext, Service, BreadcrumbList } from "schema-dts"
import { TestimonialCard } from "@/components/trust/testimonial-card"
import { TrustBlock } from "@/components/trust/trust-block"

// -----------------------------------------------------------------------------
// METADATA
// -----------------------------------------------------------------------------

export const metadata: Metadata = constructMetadata({
    title: "Accounting Services South Africa",
    description: "Professional accounting services for South African businesses. We keep you compliant, cash-flow aware, and ready to grow. Pretoria, JHB, Centurion.",
})

// -----------------------------------------------------------------------------
// CONTENT DATA
// -----------------------------------------------------------------------------

const whoIsThisFor = [
    "A growing SME that needs reliable monthly reporting",
    "A founder who wants clean books for funding or scaling",
    "A business that’s VAT registered or preparing for it",
    "A company dealing with payroll & multiple expense categories",
    "A business with messy records or missing documents",
    "A business owner who suspects they’re paying too much tax"
]

const whatMeans = [
    {
        title: "Bookkeeping (Foundation)",
        icon: FileText,
        points: [
            "Capturing transactions (income/expenses)",
            "Allocating categories",
            "Reconciliation (bank vs records)",
            "Keeping source documents"
        ]
    },
    {
        title: "Accounting (Decision Layer)",
        icon: PieChart,
        points: [
            "Interpreting the numbers",
            "Producing financial statements & reports",
            "Ensuring compliance alignment (SARS/CIPC)",
            "Advising on tax, cash flow & profitability"
        ]
    }
]

const problemsSolved = [
    {
        title: "“I don’t trust my numbers”",
        desc: "When transactions aren’t reconciled properly, your profit can look good on paper while cash is disappearing. Accurate accounting gives you numbers you can actually rely on."
    },
    {
        title: "“We’re always behind”",
        desc: "If you’re doing catch-up every quarter, the business runs blind most of the year. A monthly process keeps you current and reduces stress."
    },
    {
        title: "“VAT and tax are always a panic”",
        desc: "Most tax problems start with weak record-keeping: missing invoices, miscategorised expenses, or inconsistent reporting."
    },
    {
        title: "“We can’t scale”",
        desc: "Scaling without clean accounting creates chaos: unclear margins, uncontrolled costs, and low confidence from partners, banks, and investors."
    },
    {
        title: "“We’re not audit-ready”",
        desc: "Even if you’re not being audited today, your business should be able to answer basic financial questions quickly and confidently."
    }
]

const servicesIncluded = [
    {
        title: "Monthly Accounting & Reconciliations",
        icon: FileText,
        description: "Bank reconciliation, allocation of income/expenses, anomaly review, and basic accuracy checks."
    },
    {
        title: "Monthly Management Reporting",
        icon: PieChart,
        description: "Profit & Loss, Balance Sheet basics, cash flow visibility, and simple commentary on what changed."
    },
    {
        title: "Compliance-Ready Record Keeping",
        icon: Shield,
        description: "Structured document handling, correct expense classification, and clear trails for SARS queries."
    },
    {
        title: "Year-End Support",
        icon: CheckCircle2,
        description: "Year-end pack preparation, financial statement coordination, and clean ledger handover."
    },
    {
        title: "Advisory & Decision Support",
        icon: TrendingUp,
        description: "Budgeting support, cost control improvements, and profitability analysis (Optional but Powerful)."
    }
]

const processSteps = [
    { step: 1, title: "Quick Discovery & Assessment", description: "We understand your business type, current accounting state (clean/messy), tools (Xero/Sage), and key monthly needs." },
    { step: 2, title: "Setup & Structure", description: "We align on a practical chart of accounts, document flow rules, and a stable monthly timeline." },
    { step: 3, title: "Monthly Execution & Reporting", description: "Every month: Receive documents -> Reconcile -> Review anomalies -> Generate reports -> Provide feedback." },
    { step: 4, title: "Continuous Improvement", description: "We keep improving accuracy by reducing recurring errors and clarifying expenses vs drawings." }
]

const timelines = [
    "Initial setup / onboarding: often 3–10 business days",
    "Monthly close: commonly 3–7 business days after docs received",
    "Catch-up work: assessed per case (depends on backlog)"
]

const faqs = [
    {
        question: "What’s the difference between accounting and bookkeeping?",
        answer: "Bookkeeping is recording and reconciling transactions (the foundation). Accounting interprets those numbers, prepares reports, and aligns with compliance/strategy (the decision layer). If you don't know how your business is performing, you need accounting, not just bookkeeping."
    },
    {
        question: "Do I need monthly accounting if I’m a small business?",
        answer: "Yes. If you have regular sales and expenses, monthly accounting keeps you in control, reduces VAT/tax panic, and helps you spot issues like rising costs or missing income early."
    },
    {
        question: "Can you help if my accounting is behind?",
        answer: "Yes, we handle catch-up accounting. We assess your backlog and record condition first, then propose a cleanup plan before moving to a stable monthly cycle."
    },
    {
        question: "Do you work with Xero?",
        answer: "Yes, Xero is our preferred tool for SMEs due to its bank feeds and reporting. We can also help structure messy Xero files to make them reliable."
    },
    {
        question: "What documents do you need from me each month?",
        answer: "Typically: bank statements (or feed access), invoices issued, supplier invoices/receipts, and payroll info. Consistency is key for fast reporting."
    },
    {
        question: "Can you help with VAT and tax as part of accounting?",
        answer: "Yes. Accurate accounting is the basis for safe VAT and tax compliance. We coordinate closely with tax workflows to ensure reporting accuracy."
    },
    {
        question: "Do you offer accounting services in Pretoria / JHB?",
        answer: "Yes. We support Gauteng businesses (Pretoria, Johannesburg, Sandton, Centurion) with digital-first accounting and practical consultations."
    },
    {
        question: "How do I know if my books are “clean”?",
        answer: "If your bank reconciles, categories make sense, and reports match reality, they are clean. If you have missing invoices, duplicates, or unclear balances, they likely need cleanup."
    }
]

// -----------------------------------------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------------------------------------

export default function AccountingPage() {
    // Schema
    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Accounting Services South Africa",
        description: "Professional accounting, reporting, compliance and financial advisory designed for SMEs and scaling companies.",
        provider: {
            "@type": "Organization",
            name: "Creations",
            url: "https://creations.co.za"
        },
        areaServed: {
            "@type": "Country",
            name: "South Africa"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Accounting Services",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monthly Financial Reporting" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Annual Financial Statements" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Compliance" } }
            ]
        }
    }

    const breadcrumbs: WithContext<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://creations.co.za" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://creations.co.za/services" },
            { "@type": "ListItem", position: 3, name: "Accounting", item: "https://creations.co.za/services/accounting" }
        ]
    }

    const faqSchema: WithContext<FAQPage> = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
            }
        }))
    }

    return (
        <div className="flex flex-col">
            <JsonLd data={jsonLd} />
            <JsonLd data={breadcrumbs} />
            <JsonLd data={faqSchema} />

            {/* 1. HERO */}
            <SectionWrapper variant="base" padding="lg" showGlow showReactiveGrid patternIntensity="subtle" className="border-b border-border/40">
                <Container>
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <StaggerChildren className="w-full">
                            <MotionWrapper direction="down" delay={0.1}>
                                <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-6 font-medium">
                                    Accounting Services
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.2}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent mb-6 leading-[1.1]">
                                    Accounting Services for South African Businesses
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper delay={0.3}>
                                <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto text-lg">
                                    Professional accounting support that keeps you compliant, cash-flow aware, and ready to grow.
                                </p>
                            </MotionWrapper>

                            <MotionWrapper delay={0.35}>
                                <div className="text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base bg-surface/50 p-6 rounded-xl border border-border/50">
                                    Running a business in South Africa means juggling invoices, bank feeds, payroll, VAT, provisional tax, and compliance deadlines. If your books are behind or reporting is inconsistent, the real cost isn't just penalties — it's poor decisions and stress.
                                </div>
                            </MotionWrapper>

                            <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                                <QuoteLink eventLabel="service_hero_cta">
                                    <Button variant="glow" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">Get a Quote <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </QuoteLink>
                                <Link href="/contact">
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-base text-text-primary border-border hover:bg-surface w-full sm:w-auto">Book Consultation</Button>
                                </Link>
                            </MotionWrapper>
                        </StaggerChildren>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2. WHO THIS IS FOR */}
            <SectionWrapper variant="surface" padding="lg" showDotGrid patternIntensity="subtle">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <MotionWrapper className="lg:col-span-4">
                            <h2 className="text-3xl font-bold mb-6">Who This Is For</h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                This service is built for business owners and managers who want their finances to be accurate, up to date, and useful — without becoming accounting experts.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Link href="/locations/pretoria">
                                    <Button variant="link" className="p-0 h-auto text-accent group justify-start">
                                        Pretoria Location Hub <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="lg:col-span-8">
                            <IconList
                                items={whoIsThisFor}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                itemClassName="p-4 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-all flex items-center gap-3"
                                iconClassName="h-5 w-5 text-accent shrink-0"
                            />
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 2a. INDUSTRIES WE SUPPORT (NEW) */}
            <SectionWrapper variant="base" padding="md" className="border-b border-border/40">
                <Container>
                    <MotionWrapper className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Industries We Commonly Support</h2>
                        <p className="text-text-secondary mt-2">Specialized accounting for specific verticals.</p>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: "Medical Professionals", href: "/industries/medical-professionals", icon: Stethoscope },
                            { name: "Engineering Consultants", href: "/industries/engineering-consultants", icon: HardHat },
                            { name: "Legal Attorneys", href: "/industries/legal-attorneys", icon: Gavel },
                            { name: "Construction Projects", href: "/industries/construction-projects", icon: Building2 },
                        ].map((item, i) => (
                            <Link key={i} href={item.href}>
                                <div className="group flex items-center gap-3 p-4 rounded-xl bg-surface border border-border/50 hover:border-accent/40 hover:shadow-sm transition-all">
                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-sm text-text-primary group-hover:text-accent transition-colors">{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* 3. WHAT ACCOUNTING MEANS */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold mb-4">What Accounting Means (And What It’s Not)</h2>
                        <p className="text-text-secondary">If bookkeeping is “recording the game,” accounting is “reviewing the match and improving the strategy.”</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {whatMeans.map((item, i) => (
                            <MotionWrapper key={i} delay={i * 0.1} className="h-full">
                                <div className="bg-surface border border-border rounded-2xl p-8 h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-bold">{item.title}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {item.points.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-text-secondary">
                                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/50 shrink-0" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                        <Link href="/services/bookkeeping" className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center">
                            See Bookkeeping Services <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                        <Link href="/services/tax-services" className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center">
                            See Tax Services <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 4. PROBLEMS SOLVED */}
            <SectionWrapper padding="lg" variant="surface" showLineGrid>
                <Container>
                    <MotionWrapper className="mb-10 text-center">
                        <h2 className="text-3xl font-bold mb-4">The Real Business Problems We Solve</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">We don't just file forms; we fix the financial chaos that holds businesses back.</p>
                    </MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {problemsSolved.map((problem, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="h-full bg-background border-border/50 hover:border-accent/20 transition-colors">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-bold mb-3 text-text-primary">{problem.title}</h3>
                                        <p className="text-sm text-text-secondary leading-relaxed">{problem.desc}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>

            {/* TRUST SIGNAL 1 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="We finally have clarity on our numbers and no longer stress about month-end or compliance."
                        author="Director"
                        role="Professional Services Firm"
                        variant="primary"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>


            {/* 5. WHAT'S INCLUDED */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">What’s Included</h2>
                        <p className="text-text-secondary">The core deliverables most South African SMEs need.</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicesIncluded.map((service, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <Card className="h-full bg-surface/50 border-border/50 hover:border-accent/20 transition-all hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent">
                                            <service.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
                                    </CardContent>
                                </Card>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>



            {/* TRUST BLOCK */}
            <TrustBlock />

            {/* 6. TIMELINES */}
            <SectionWrapper padding="md" variant="surface" className="border-y border-border/40">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <MotionWrapper className="md:w-1/3">
                            <h3 className="text-2xl font-bold mb-2">Typical Timelines</h3>
                            <p className="text-text-secondary text-sm">We don't guess timelines without seeing your state, but here are realistic ranges.</p>
                        </MotionWrapper>
                        <MotionWrapper delay={0.2} className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            {timelines.map((time, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-medium p-3 bg-background rounded-lg border border-border/50">
                                    <Clock className="h-4 w-4 text-accent shrink-0" />
                                    {time}
                                </div>
                            ))}
                        </MotionWrapper>
                    </div>
                </Container>
            </SectionWrapper>


            {/* 7. COMPARISON TABLE */}
            <SectionWrapper variant="base" padding="lg">
                <Container>
                    <MotionWrapper className="mb-10 text-center">
                        <h2 className="text-3xl font-bold mb-4">Choosing the Right Option</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">Compare detailed accounting options for your stage of growth.</p>
                    </MotionWrapper>

                    <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
                        <table className="w-full text-sm text-left min-w-[800px]">
                            <thead className="text-xs text-text-secondary uppercase bg-surface-elevated border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 font-bold w-1/5">Option</th>
                                    <th className="px-6 py-4 font-bold w-2/5">Best For</th>
                                    <th className="px-6 py-4 font-bold w-2/5">Outcome / Risks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border bg-background">
                                <tr className="hover:bg-surface transition-colors">
                                    <td className="px-6 py-4 font-semibold text-text-primary">1. DIY Accounting</td>
                                    <td className="px-6 py-4 text-text-secondary">Micro businesses with very low volume & discipline.</td>
                                    <td className="px-6 py-4 text-text-secondary text-orange-400"><strong>Risks:</strong> Missed compliance, messy records, slow decisions.</td>
                                </tr>
                                <tr className="hover:bg-surface transition-colors">
                                    <td className="px-6 py-4 font-semibold text-text-primary">2. Bookkeeper Only</td>
                                    <td className="px-6 py-4 text-text-secondary">Capturing info but no deep reporting needed.</td>
                                    <td className="px-6 py-4 text-text-secondary text-yellow-400"><strong>Risks:</strong> Lack of insight, tax planning, and Year-End structure.</td>
                                </tr>
                                <tr className="hover:bg-surface transition-colors bg-accent/5">
                                    <td className="px-6 py-4 font-bold text-accent">3. Accounting Firm (Us)</td>
                                    <td className="px-6 py-4 text-text-secondary">SMEs needing consistency, compliance & clarity.</td>
                                    <td className="px-6 py-4 text-text-secondary text-accent"><strong>Outcome:</strong> Stable month-end, better decisions, less stress.</td>
                                </tr>
                                <tr className="hover:bg-surface transition-colors">
                                    <td className="px-6 py-4 font-semibold text-text-primary">4. In-house Accountant</td>
                                    <td className="px-6 py-4 text-text-secondary">Larger businesses with complex daily ops.</td>
                                    <td className="px-6 py-4 text-text-secondary"><strong>Risk:</strong> Higher fixed cost; still requires management oversight.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Container>
            </SectionWrapper>

            {/* 8. LOCATIONS */}
            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Accounting Support Across Gauteng</h2>
                        <p className="text-text-secondary mt-2">Localise your support. Visit our area hubs.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { name: "Pretoria", href: "/locations/pretoria" },
                            { name: "Johannesburg", href: "/locations/johannesburg" },
                            { name: "Sandton", href: "/locations/johannesburg" }, // Sandton maps to JHB Hub for now
                            { name: "Centurion", href: "/locations/centurion" }
                        ].map((loc, i) => (
                            <Link key={i} href={loc.href}>
                                <Button variant="outline" className="border-border/50 text-text-secondary hover:text-accent hover:border-accent/30">
                                    {loc.name} Accounting Hub
                                </Button>
                            </Link>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>


            {/* PROCESS */}
            <SectionWrapper padding="lg" variant="base">
                <Container>
                    <MotionWrapper className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Our Process</h2>
                        <p className="text-text-secondary">How we get from "messy" to "managed".</p>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, i) => (
                            <MotionWrapper key={i} delay={i * 0.1}>
                                <div className="relative pl-6 border-l-2 border-border/50 group hover:border-accent transition-colors">
                                    <div className="text-xs uppercase font-bold text-accent mb-1">Step {step.step}</div>
                                    <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                                    <p className="text-text-secondary text-xs leading-relaxed">{step.description}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>


            {/* 9. FAQ */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <MotionWrapper className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    </MotionWrapper>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-background px-4">
                                <AccordionTrigger className="font-semibold text-text-primary hover:text-accent hover:no-underline py-4 text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-text-secondary pb-4 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Container>
            </SectionWrapper>

            {/* 10. TRUST & CREDIBILITY */}
            <SectionWrapper variant="base" padding="lg">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {[
                            { label: "Compliance", value: "100%", desc: "SARS & CIPC Aligned" },
                            { label: "Response", value: "24hr", desc: "Dedicated Support" },
                            { label: "Experience", value: "Expert", desc: "Qualified Accountants" },
                            { label: "Security", value: "Bank-Grade", desc: "Encrypted Data" }
                        ].map((stat, i) => (
                            <MotionWrapper key={i} delay={i * 0.1} className="text-center p-6 rounded-2xl bg-surface border border-border/50">
                                <div className="text-3xl font-black text-accent mb-1">{stat.value}</div>
                                <div className="font-bold text-text-primary mb-1">{stat.label}</div>
                                <div className="text-xs text-text-secondary uppercase tracking-wider">{stat.desc}</div>
                            </MotionWrapper>
                        ))}
                    </div>
                </Container>
            </SectionWrapper>



            {/* TRUST SIGNAL 2 */}
            <SectionWrapper variant="base" padding="md">
                <Container>
                    <TestimonialCard
                        quote="Working with Creations Accounting helped us clean up our records and plan properly."
                        author="Managing Director"
                        role="Gauteng-based SME"
                        variant="subtle"
                        className="max-w-4xl mx-auto"
                    />
                </Container>
            </SectionWrapper>

            {/* 10B. RELATED SERVICES */}
            <SectionWrapper variant="surface" padding="md" className="border-t border-border/40">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
                        <div className="text-text-secondary font-medium">Explore Related Services & Locations:</div>
                        <div className="flex flex-wrap gap-4 md:gap-8">
                            <Link href="/services/tax" className="text-text-muted hover:text-accent transition-colors">Tax Services</Link>
                            <Link href="/services/bookkeeping" className="text-text-muted hover:text-accent transition-colors">Bookkeeping Services</Link>
                            <Link href="/locations/pretoria/accounting" className="text-text-muted hover:text-accent transition-colors">Accounting in Pretoria</Link>
                            <Link href="/locations/pretoria" className="text-text-muted/60 hover:text-accent transition-colors text-xs border-l border-border pl-4">Pretoria Hub</Link>
                        </div>
                    </div>
                </Container>
            </SectionWrapper >

            {/* 11. FINAL CTA */}
            <SectionWrapper padding="lg" variant="base" showGlow patternIntensity="strong">
                <Container className="max-w-4xl mx-auto text-center">
                    <MotionWrapper>
                        <div className="rounded-3xl bg-surface border border-border/50 p-12 relative overflow-hidden">
                            {/* Decorative background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get an Accounting Plan That Fits Your Business</h2>
                                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                                    You don't need "more accounting". You need the right setup for your business stage. Request a consultation and we'll guide you.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <QuoteLink eventLabel="service_bottom_cta">
                                        <Button variant="glow" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto">
                                            Request Consultation
                                        </Button>
                                    </QuoteLink>
                                    <Link href="/locations/pretoria/accounting">
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg text-text-primary w-full sm:w-auto">
                                            View Pretoria Services
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                </Container>
            </SectionWrapper >
        </div >
    )
}
