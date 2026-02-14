import { GuideContent } from "@/types/service"

export const guides: GuideContent[] = [
    {
        slug: "vat-number-lookup-south-africa",
        title: "How to Check a VAT Number in South Africa",
        hero: {
            heading: "How to Check a VAT Number in South Africa",
            subheading: "A step-by-step guide to verifying VAT numbers using the SARS eFiling VAT Vendor Search tool.",
            helperStrip: ["Verify Vendors", "Avoid Fraud", "claim Input Tax"]
        },
        seoTitle: "VAT Number Check South Africa | Verify SARS VAT Vendor Status",
        seoDescription: "Learn how to check a VAT number in South Africa using the official SARS VAT Vendor Search. Verify your suppliers and ensure your input tax claims are valid.",
        whoIsThisFor: [
            "Business owners verifying suppliers",
            "Bookkeepers processing invoices",
            "Creditors clerks opening new accounts",
            "Anyone suspecting a fraudulent VAT number"
        ],
        process: [
            { step: 1, title: "Go to SARS eFiling", description: "Navigate to the official SARS eFiling website (sars.gov.za)." },
            { step: 2, title: "Find VAT Vendor Search", description: "Look for the 'VAT Vendor Search' option in the sidebar or under the 'Home' menu. You do not need to log in." },
            { step: 3, title: "Enter Details", description: "Enter the VAT number you want to check. You can also search by trading name, but the number is more accurate." },
            { step: 4, title: "Verify Result", description: "SARS will return the registered trading name associated with that number. Match this exactly to the invoice you received." }
        ],
        requirements: ["Internet access", "The VAT number you want to check", "The trading name (for cross-referencing)"],
        faqs: [
            { question: "Is the VAT Vendor Search free?", answer: "Yes, the SARS VAT Vendor Search is a free public service provided by SARS." },
            { question: "Do I need to login to eFiling to use it?", answer: "No. The search tool is available on the public side of the eFiling website; no login is required." },
            { question: "What if the number doesn't exist?", answer: "If SARS returns 'No record found', the number is likely invalid or deregistered. Do not pay VAT to this supplier until they provide a valid Tax Clearance Pin." },
            { question: "Can I claim VAT if the name doesn't match?", answer: "Be very careful. If the trading name on the invoice differs from the SARS record, SARS may disallow your input claim. Request a confirmation of banking details or a company registration document to verify the link." }
        ],
        relatedServices: [
            { slug: "vat-registration", title: "VAT Registration" },
            { slug: "vat-compliance-support", title: "VAT Compliance Support" }
        ],
        stats: [
            { label: "Cost", value: "Free", description: "SARS Service." },
            { label: "Speed", value: "Instant", description: "Online check." },
            { label: "Access", value: "Public", description: "No login needed." },
            { label: "Reliability", value: "100%", description: "Official data." }
        ],
        insights: [
            "Fraudulent invoices often use fake VAT numbers or numbers belonging to other companies (like Woolworths or Telkom). Always check!",
            "Section 20 of the VAT Act prohibits you from claiming input tax if the VAT invoice is invalid; checking the number is your first line of defence.",
            "If a supplier charges you VAT but is not registered, they are committing a crime. Report them to the SARS fraud hotline."
        ],
        detailedSections: [
            {
                title: "Why You Must Verify VAT Numbers",
                content: "In South Africa, you can only claim Input VAT if you possess a 'valid tax invoice'. A critical part of validity is that the supplier must be a registered VAT vendor. If you pay VAT to a supplier who is not registered (or whose number is fake), SARS will disallow your claim, and you will lose that 15%.\n\nFurthermore, using a fake VAT number is a common fraud tactic. By verifying the number, you confirm that the business exists and is known to SARS, adding a layer of due diligence to your procurement process.",
                highlights: [
                    "Prevent disallowed input tax claims",
                    "Avoid paying 15% extra to fraudsters",
                    "Ensure Section 20 compliance",
                    "Pass SARS audits with confidence"
                ],
                illustrationType: "shield"
            },
            {
                title: "Common \"Red Flags\" on Invoices",
                content: "While the online check is definitive, there are signs you can spot immediately on an invoice. A valid VAT number in South Africa is always 10 digits long and starts with a '4'. If a number has 9 or 11 digits, or starts with any other number, it is invalid.\n\nAlso, watch out for generic invoices bought from stationery shops that have a handwritten VAT number, or invoices where the VAT amount is calculated incorrectly (e.g., not exactly 15% of the total).",
                highlights: [
                    "VAT numbers must be 10 digits long",
                    "VAT numbers must start with '4'",
                    "Calculations must be mathematically correct",
                    "Trading name must match the SARS record"
                ],
                illustrationType: "compliance"
            }
        ],
        visualType: "shield"
    }
]
