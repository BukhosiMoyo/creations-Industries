import { IndustryContent } from "@/types/service"

export const industries: IndustryContent[] = [
    {
        slug: "start-up",
        title: "The New Start-up",
        hero: {
            heading: "Launch Your Business on Solid Ground",
            subheading: "From CIPC registration to your first tax clearance. We handle the red tape so you can focus on building your product.",
            helperStrip: [
                "Fast Company Registration",
                "Tax Compliance Setup",
                "Business Bank Account Support",
                "Founder Advisory"
            ]
        },
        seoTitle: "Accounting for Startups South Africa | Registration & Tax Services",
        seoDescription: "Professional accounting services for South African startups. Company registration, tax compliance, and financial setup for new businesses.",
        whoIsThisFor: [
            "Solo founders needing to formalize",
            "Tech startups seeking investment readiness",
            "New retail or service businesses"
        ],
        deliverables: [
            "Company Registration (Pty Ltd)",
            "Income Tax & VAT Registration",
            "B-BBEE Sworn Affidavit",
            "Share Certificates",
            "Opening Balances Setup",
            "Cloud Accounting Software Training"
        ],
        process: [
            { step: 1, title: "Structure", description: "We help you choose the right legal entity and shareholding structure." },
            { step: 2, title: "Registration", description: "We handle CIPC registration and get your official documents." },
            { step: 3, title: "Tax Setup", description: "We register you with SARS for Income Tax, and VAT/PAYE if needed." },
            { step: 4, title: "System", description: "We set up Xero or Sage to track your first expenses and income." },
            { step: 5, title: "Launch", description: "You receive a 'New Business Pack' with everything you need to trade." }
        ],
        requirements: ["ID Copies", "Address Proof", "Proposed Company Names"],
        timeline: "1-2 Weeks for Full Setup",
        faqs: [
            { question: "Do I need to register for VAT immediately?", answer: "No. VAT registration is only tailored for businesses expecting to exceed R50,000 turnover in 12 months (voluntary) or R1 million (compulsory). We advise on the best timing." },
            { question: "Can you help open a bank account?", answer: "Yes. We work with major SA banks to fast-track your business account opening once CIPC documents are ready." },
            { question: "What if I haven't made any money yet?", answer: "Compliance starts from day one. You still need to file 'Nil' returns to keep your company active and compliant with SARS and CIPC." }
        ],
        relatedServices: [
            { slug: "cipc-compliance", title: "CIPC Compliance" },
            { slug: "tax-services", title: "Tax Services" }
        ],
        stats: [
            { label: "Success Rate", value: "100%", description: "Successful registrations handled." },
            { label: "Speed", value: "5 Days", description: "Average turnaround for CIPC." },
            { label: "Savings", value: "R20k+", description: "Avoided penalties in first year." }
        ],
        insights: [
            "The most common startup failure in SA is getting bogged down in compliance admin instead of selling.",
            "Structuring your shares correctly from the start prevents painful legal issues when investors arrive."
        ],
        problemsSolved: [
            "Confusion over CIPC and SARS requirements",
            "Risk of fines for non-compliance",
            "Difficulty opening business bank accounts",
            "Messy personal vs. business finance mixing"
        ],
        complianceContext: "We ensure your startup complies with the Companies Act 2008 and Tax Administration Act from the very first transaction."
    },
    {
        slug: "growing-sme",
        title: "The Growing SME",
        hero: {
            heading: "Scale Without the Financial Chaos",
            subheading: "Monthly reconciliations, payroll handling, and financials for scaling businesses that need more than just a shoebox of receipts.",
            helperStrip: [
                "Monthly Management Accounts",
                "Payroll & HR Admin",
                "VAT Optimization",
                "Cloud Migration"
            ]
        },
        seoTitle: "Accounting for SMEs South Africa | Monthly Bookkeeping & Advisory",
        seoDescription: "Comprehensive accounting solutions for growing SMEs. Monthly management accounts, payroll, and strategic financial advice to support growth.",
        whoIsThisFor: [
            "Businesses with R1m - R50m turnover",
            "Teams growing beyond 5 employees",
            "Founders needing to step back from admin"
        ],
        deliverables: [
            "Monthly Management Reports",
            "Full Payroll Function (Payslips, EMP201)",
            "VAT201 Submissions",
            "Annual Financial Statements",
            "Cash Flow Forecasting",
            "Tax Planning Sessions"
        ],
        process: [
            { step: 1, title: "Audit", description: "We review your current systems and health-check your compliance." },
            { step: 2, title: "Clean-up", description: "We fix historical errors and organize your data." },
            { step: 3, title: "Automate", description: "We implement cloud tools (Xero/Sage/Dext) to cut manual data entry." },
            { step: 4, title: "Routine", description: "We take over the monthly cycle of reconciling, filing, and reporting." },
            { step: 5, title: "Grow", description: "We meet quarterly to discuss the numbers and plan for the next quarter." }
        ],
        requirements: ["Bank Feed Access", "Cloud Accounting Access", "Payroll Data"],
        timeline: "Monthly Retainer",
        faqs: [
            { question: "Is this cheaper than hiring a full-time accountant?", answer: "Typically, yes. You get access to a team of experts (bookkeeper, tax practitioner, CA) for less than the cost of one junior employee." },
            { question: "How involved do I need to be?", answer: "We aim to minimize your admin time. Once setup is complete, you mainly just need to approve payments and review reports." },
            { question: "Can you handle PAYE and UIF?", answer: "Yes. We manage the full payroll cycle, including all SARS and Dept of Labour submissions." }
        ],
        relatedServices: [
            { slug: "monthly-accounting-services", title: "Monthly Accounting" },
            { slug: "payroll-service", title: "Payroll Services" }
        ],
        stats: [
            { label: "Time Saved", value: "20 Hrs", description: "Per month for business owners." },
            { label: "Accuracy", value: "99.9%", description: "On all reconciled transactions." },
            { label: "Growth", value: "2x", description: "Faster scaling with clear financials." }
        ],
        insights: [
            "Comparing monthly performance against targets is the single best habit for sustainable growth.",
            " Outsourcing finance allows the founder to focus entirely on product and sales."
        ],
        problemsSolved: [
            "Founder burnout from late-night admin",
            "Cash flow surprises",
            "Late penalties from SARS",
            "Lack of visibility into profitability"
        ],
        complianceContext: "Our processes ensure full compliance with IFRS for SMEs and all relevant labour laws."
    },
    {
        slug: "tender-driven-business",
        title: "The Tender-Driven Business",
        hero: {
            heading: "Always Ready to Bid",
            subheading: "Tax clearance, B-BBEE, and CSD registration support. Never miss a tender opportunity because your paperwork wasn't ready.",
            helperStrip: [
                "Valid Tax Clearance",
                "CSD Registration Updates",
                "B-BBEE Strategies",
                "Financial Statements"
            ]
        },
        seoTitle: "Tender Compliance Services SA | Tax Clearance & CSD",
        seoDescription: "Specialized accounting support for tender-based businesses. Tax clearance, CSD registration, B-BBEE, and financial statements for government bids.",
        whoIsThisFor: [
            "Construction & Engineering Firms",
            "Government Suppliers",
            "Logistics Companies",
            "Service Providers to State Entities"
        ],
        deliverables: [
            "Tax Clearance Certificate (TCC)",
            "CSD Report Management",
            "B-BBEE Affidavit / Certificate Facilitation",
            "Audited/Reviewed Financial Statements",
            "Company Registration Documents",
            "Joint Venture Structuring Support"
        ],
        process: [
            { step: 1, title: "Check", description: "We run a compliance diagnostic to see what's valid and what's expiring." },
            { step: 2, title: "Update", description: "We renew tax clearance, update CSD, and refresh CIPC details." },
            { step: 3, title: "Prepare", description: "We compile your Annual Financial Statements (AFS) required for the bid." },
            { step: 4, title: "Verify", description: "We ensure your B-BBEE status is optimized and valid." },
            { step: 5, title: "Maintain", description: "We monitor expiration dates so you never get caught out." }
        ],
        requirements: ["CSD Login Details", "SARS E-Filing Access", "Tender Requirements"],
        timeline: "Ongoing Maintenance",
        faqs: [
            { question: "How quickly can you get a Tax Clearance Certificate?", answer: "If your tax affairs are in order, we can pull it instantly. If there are outstanding returns or debt, we must resolve those first." },
            { question: "Do you complete the tender document itself?", answer: "No, we specialize in the compliance documents (tax, CSD, financials, B-BBEE). We do not write the technical proposal." },
            { question: "Why is CSD important?", answer: "Government entities cannot pay you if your CSD (Central Supplier Database) status is non-compliant." }
        ],
        relatedServices: [
            { slug: "tender-readiness", title: "Tender Readiness" },
            { slug: "audit-readiness", title: "Audit Readiness" }
        ],
        stats: [
            { label: "Win Rate", value: "+40%", description: "Increase with compliant paperwork." },
            { label: "Uptime", value: "100%", description: "Compliance always valid." },
            { label: "Speed", value: "Instant", description: "Access to valid TCCs." }
        ],
        insights: [
            "Disqualification on administrative grounds is the most common reason for losing tender bids.",
            "Having a 'Tender Pack' ready on your server allows you to bid on short-notice RFQs immediately."
        ],
        problemsSolved: [
            "Disqualification due to expired Tax Clearance",
            "CSD 'Non-Compliant' status freezing payments",
            "Scrambling for financials at the last minute",
            "Inconsistent B-BBEE levels"
        ],
        complianceContext: "We align strictly with the PFMA and PPPFA requirements to ensure your bid is administratively compliant."
    },
    {
        slug: "professional-practice",
        title: "The Professional Practice",
        hero: {
            heading: "Financial Peace of Mind for Professionals",
            subheading: "Provisional tax and annual financials for freelancers, doctors, lawyers, and sole proprietors. You look after clients; we look after you.",
            helperStrip: [
                "Provisional Tax (IRP6)",
                "Personal Income Tax (ITR12)",
                "Trust Accounting",
                "Wealth Planning"
            ]
        },
        seoTitle: "Accounting for Professionals SA | Doctors, Lawyers & Freelancers",
        seoDescription: "Tailored accounting services for independent professionals. Provisional tax, annual financials, and wealth planning for doctors, lawyers, and freelancers.",
        whoIsThisFor: [
            "Medical Practitioners",
            "Legal Professionals & Advocates",
            "Engineers & Architects",
            "IT Contractors & Freelancers"
        ],
        deliverables: [
            "Provisional Tax Estimates & Filing",
            "Personal Income Tax Returns",
            "Annual Financial Statements",
            "Trust & Estate Planning",
            "Expense Optimization Review",
            "Retirement Annuity Tax Planning"
        ],
        process: [
            { step: 1, title: "Review", description: "We analyze your income streams and current tax exposure." },
            { step: 2, title: "Plan", description: "We structure your salary, dividends, and expenses for tax efficiency." },
            { step: 3, title: "File", description: "We submit your provisional (Feb/Aug) and annual returns." },
            { step: 4, title: "Save", description: "We ensure you are claiming all valid deductions and allowances." },
            { step: 5, title: "Advise", description: "We help plan for long-term wealth creation outside the practice." }
        ],
        requirements: ["Income Statements", "Expense Records", "Investment Certificates"],
        timeline: "Bi-Annual Cycle + Annual Return",
        faqs: [
            { question: "I'm a provisional taxpayer. What does that mean?", answer: "It means you earn income other than a salary (like consulting fees or investment income) and must pay tax twice a year in advance to avoid penalties." },
            { question: "Can I deduct my home office expenses?", answer: "Strict rules apply. We can assess if you qualify based on exclusivity and regular use of the space for trade." },
            { question: "Do you handle trust accounts for attorneys?", answer: "Yes, we can assist with the accounting for Section 86 trust accounts, ensuring Law Society compliance." }
        ],
        relatedServices: [
            { slug: "tax-services", title: "Tax Services" },
            { slug: "advisory-services", title: "Advisory" }
        ],
        stats: [
            { label: "Tax Saved", value: "Max", description: "Through legal deductions." },
            { label: "Penalties", value: "Zero", description: "No late filing fines." },
            { label: "Stress", value: "None", description: "We handle SARS queries." }
        ],
        insights: [
            "Professionals often overpay tax by failing to structure their practice correctly (e.g., Sole Prop vs. Inc).",
            "Provisional tax penalties are severe (up to 20% for underestimation); accurate forecasting is essential."
        ],
        problemsSolved: [
            "Unexpected dominance of tax bills",
            "Difficulty getting vehicle or home finance",
            "Mixing personal and business expenses",
            "Fear of SARS audits"
        ],
        complianceContext: "We ensure compliance with specific industry bodies (HPCSA, LPC) where finance overlaps with professional conduct."
    }
]
