import Link from "next/link"
import { ArrowRight, Calculator, Landmark, Shield, BookOpen } from "lucide-react"

interface RelatedServicesProps {
    tags?: string[]
    category: string
}

const SERVICE_MAP = [
    {
        id: "tax",
        keywords: ["tax", "sars", "vat", "provisional", "efiling", "compliance"],
        title: "Business Tax Services",
        desc: "Don't let tax compliance keep you up at night. We handle submissions, disputes, and planning.",
        href: "/services/tax",
        icon: Shield
    },
    {
        id: "bookkeeping",
        keywords: ["bookkeeping", "xero", "receipts", "reconciliation", "financials", "invoicing"],
        title: "Monthly Bookkeeping",
        desc: "Clean, up-to-date financial records. We turn your shoebox of receipts into actionable reports.",
        href: "/services/bookkeeping",
        icon: BookOpen
    },
    {
        id: "accounting",
        keywords: ["accounting", "financial statements", "cipc", "registration", "advisory", "payroll", "paye"],
        title: "Accounting & Advisory",
        desc: "Strategic financial advice to help you grow. From annual financials to monthly management accounts.",
        href: "/services/accounting",
        icon: Calculator
    }
]

export function RelatedServices({ tags = [], category }: RelatedServicesProps) {
    // Combine tags and category for matching
    const searchTerms = [...tags, category].map(t => t.toLowerCase())

    // Find matching services
    const matches = SERVICE_MAP.filter(service =>
        service.keywords.some(keyword =>
            searchTerms.some(term => term.includes(keyword))
        )
    )

    // Fallback to Accounting if no matches
    const displayedServices = matches.length > 0 ? matches.slice(0, 2) : [SERVICE_MAP[2]]

    if (displayedServices.length === 0) return null

    return (
        <div className="mt-16 pt-10 border-t border-border">
            <h3 className="text-2xl font-bold mb-6">Need help with this?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedServices.map((service) => (
                    <Link key={service.id} href={service.href} className="group">
                        <div className="h-full rounded-xl border border-border/50 bg-surface p-6 hover:border-primary/30 hover:shadow-sm transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <service.icon className="h-5 w-5" />
                                </div>
                                <ArrowRight className="h-5 w-5 text-border group-hover:text-primary transition-colors" />
                            </div>
                            <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h4>
                            <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
