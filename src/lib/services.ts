import { ServiceContent, PillarContent } from "@/types/service"

export const pillars: PillarContent[] = [
    {
        slug: "compliance",
        title: "Compliance",
        description: "Stay on the right side of SARS and CIPC. We handle your tax filings, annual returns, and statutory obligations so you can focus on business.",
        services: ["tax-services", "cipc-compliance", "companies-act-compliance", "tender-readiness"]
    },
    {
        slug: "accounting",
        title: "Accounting",
        description: "Clean books for sound decisions. From monthly bookkeeping to annual financial statements, we ensure your records are accurate and up to date.",
        services: ["bookkeeping", "accounting", "payroll-service", "audit-readiness"]
    },
    {
        slug: "intelligence",
        title: "Intelligence",
        description: "Turn your numbers into direction. Our advisory and analytics services help you understand your performance and plan for growth.",
        services: ["advisory-services", "data-analytics-services", "business-it-solutions"]
    }
]

export const services: ServiceContent[] = [
    {
        slug: "bookkeeping",
        title: "Bookkeeping Services",
        pillar: "Accounting",
        hero: {
            heading: "Accurate, Monthly Bookkeeping — So You Always Know Where You Stand",
            subheading: "Professional bookkeeping for South African SMEs and start-ups. Accurate monthly records, bank reconciliations, and financial reporting you can rely on."
        },
        whoIsThisFor: [
            "Small businesses wanting to outsource admin",
            "SMEs needing accurate monthly reports",
            "Startups setting up their first financial systems"
        ],
        deliverables: [
            "Monthly bank reconciliations",
            "Creditor and debtor management",
            "Expense categorisation and processing",
            "Monthly management accounts",
            "Trial balance and general ledger maintenance",
            "VAT-ready transaction records",
            "Xero / Sage / QuickBooks data management"
        ],
        process: [
            { step: 1, title: "Initial review", description: "We assess your current bookkeeping status and identify any backlogs or gaps." },
            { step: 2, title: "System setup", description: "We configure or integrate your accounting software for clean, ongoing processing." },
            { step: 3, title: "Monthly processing", description: "Transactions are recorded, categorised, and reconciled each month." },
            { step: 4, title: "Reporting", description: "You receive monthly management accounts with a summary of key figures." },
            { step: 5, title: "Ongoing support", description: "We answer questions, adjust categories, and keep your books audit-ready." }
        ],
        requirements: ["Bank statements (view access)", "Invoices and receipts", "Payroll data"],
        timeline: "Monthly cycle",
        faqs: [
            { question: "What accounting software do you support?", answer: "We work with Xero, Sage, QuickBooks, and most major cloud accounting platforms. If you do not currently have software, we can recommend and set up the right one for your business." },
            { question: "I have a backlog of several months. Can you catch it up?", answer: "Yes. We regularly take on clients with outstanding bookkeeping. We will assess the backlog and provide a timeline and quote to bring everything up to date." },
            { question: "How often will I receive reports?", answer: "We provide monthly management accounts as standard. If you need weekly or fortnightly reporting, we can accommodate that based on the scope of your engagement." },
            { question: "Do I need to provide physical documents?", answer: "No. We work digitally. You can share bank statements, invoices, and receipts via email, cloud storage, or directly through your accounting software." },
            { question: "Is bookkeeping the same as accounting?", answer: "Not quite. Bookkeeping is the recording and organising of financial transactions. Accounting includes interpreting that data, preparing financial statements, and advising on tax and compliance. We offer both." },
            { question: "Can this help with my VAT submissions?", answer: "Yes. Accurate bookkeeping ensures your VAT records are correct and ready for submission. We work closely with our tax services team to keep everything aligned." },
            { question: "What if I am a sole proprietor — do I still need bookkeeping?", answer: "Yes, especially if you are registered for income tax or VAT. Proper records make annual tax filing easier, support deductions, and reduce the risk of SARS queries." }
        ],
        relatedServices: [
            { slug: "accounting", title: "Accounting" },
            { slug: "payroll-service", title: "Payroll Service" }
        ],
        stats: [
            { label: "Year-End Savings", value: "40%", description: "Typically saved with monthly bookkeeping." },
            { label: "Monthly Deadline", value: "10th", description: "Records finalized by the 10th each month." },
            { label: "SARS Retention", value: "5 Years", description: "All records maintained for the legal period." },
            { label: "Catch-up Speed", value: "2-3 Wks", description: "Rapid reconstruction of backlog data." }
        ],
        insights: [
            "Reconstructing a year's worth of bookkeeping typically costs 2x more than maintaining it monthly.",
            "Monthly bookkeeping allows you to spot financial red flags before they become crises.",
            "Structured records are the primary requirement for successful South African government tender applications."
        ],
        problemsSolved: [
            "Manual data entry backlog and chaos",
            "Lost or unorganized digital receipts",
            "Unreconciled bank statements affecting cash flow visibility",
            "Lack of a digital audit trail for SARS inquiries"
        ],
        complianceContext: "Accurate bookkeeping is the foundation for VAT, Income Tax, and B-BBEE evidence compliance. We ensure every record meets the standards required by the South African Tax Administration Act.",
        visualType: "flow"
    },
    {
        slug: "accounting",
        title: "Accounting Services",
        pillar: "Accounting",
        seoTitle: "Accounting Services South Africa | Professional SME Accounting Firm",
        seoDescription: "Professional accounting services for South African small businesses and SMEs. Monthly accounting, financial statements, and SARS compliance support. Request a quote today.",
        hero: {
            heading: "Professional Accounting Services for South African Businesses",
            subheading: "Structured financial management that turns complex data into clear, actionable insights for your business growth and compliance.",
            helperStrip: [
                "SARS and CIPC Compliance Aligned",
                "Decision-Ready Management Accounts",
                "Scalable Monthly Support Options",
                "Expert Advisory for Growing SMEs"
            ]
        },
        whoIsThisFor: [
            "Owner-Managed SMEs needing professional financial oversight",
            "Growing Businesses transitioning from basic bookkeeping to formal accounting",
            "Startups requiring investor-ready financial reports and sound structures",
            "Companies preparing for SARS audits or tender applications",
            "Businesses looking to outsource their finance function to a professional firm"
        ],
        deliverables: [
            "Annual financial statements (AFS)",
            "Monthly or quarterly management accounts",
            "Income statements, balance sheets, and cash flow reports",
            "General ledger review and reconciliations",
            "Year-end adjustments and journal entries",
            "Audit readiness and trial balance preparation",
            "Financial data packs for banks and investors"
        ],
        process: [
            { step: 1, title: "Financial Discovery", description: "We assess your current records, software, and reporting requirements." },
            { step: 2, title: "Onboarding & Migration", description: "We harmonize your data into a professional accounting framework (Xero, Sage, or QuickBooks)." },
            { step: 3, title: "Monthly Cycle", description: "Transaction reviews, reconciliations, and internal audits are performed on a set schedule." },
            { step: 4, title: "Reporting & Review", description: "You receive clear reports with a professional summary of your financial position." },
            { step: 5, title: "Annual Closing", description: "We finalize your year-end records and prepare the necessary compliant statements." }
        ],
        requirements: [
            "Financial Access: View-only access to bank feeds or statements",
            "Source Documents: Invoices, receipts, and payroll records (digital preferred)",
            "Previous Records: Prior year financial statements and tax returns",
            "Communication: Timely responses to queries regarding specific transactions"
        ],
        timeline: "Monthly Support (every 30 days) or Annual Finalization (2–4 weeks)",
        faqs: [
            { question: "How much do your accounting services cost?", answer: "Pricing is based on transaction volume and the complexity of your reporting requirements. We offer packages tailored for SMEs to ensure you only pay for the oversight you actually need." },
            { question: "Can you catch up on multiple years of outstanding records?", answer: "Yes. We specialize in reconstruction and cleanup for businesses that have fallen behind. We will provide a specific catch-up quote after an initial assessment." },
            { question: "Do I need to switch my software to work with you?", answer: "Not necessarily. We work with Xero, Sage, and QuickBooks. If you are using an outdated or manual system, we can help you migrate to a more efficient cloud solution." },
            { question: "How is this different from bookkeeping?", answer: "Bookkeeping is the daily recording of transactions. Accounting is the analysis, professional adjustment, and formal reporting of that data to ensure it is compliant and strategically useful." },
            { question: "Will this help me get a bank loan or a tender?", answer: "Absolutely. Most South African banks and government tenders require at least two years of professionally prepared Annual Financial Statements. Our service ensures yours are ready and compliant." }
        ],
        relatedServices: [
            { slug: "bookkeeping", title: "Bookkeeping" },
            { slug: "tax-services", title: "Tax Services" },
            { slug: "audit-readiness", title: "Audit Readiness" }
        ],
        stats: [
            { label: "Compliance Rate", value: "100%", description: "Ensuring AFS meet IFRS for SMEs standards." },
            { label: "Reporting Cycle", value: "30 Days", description: "Fresh financial data delivered every month." },
            { label: "Preparation Time", value: "2-4 Wks", description: "Standard turnaround for year-end finalization." },
            { label: "Audit Readiness", value: "High", description: "Books structured for seamless financial review." }
        ],
        insights: [
            "Do not wait for February (year-end) to look at your numbers. Monthly management accounts are your 'early warning system'.",
            "Most South African businesses that fail do so due to cash flow timing, not a lack of profit.",
            "Professional accounting bridges the gap between daily data and strategic business planning."
        ],
        problemsSolved: [
            "Unclear Profitability and margin confusion",
            "Inefficient or incorrect Record-Keeping cleanups",
            "Audit Anxiety and SARS query preparation",
            "Inconsistent Reporting and lack of management counts",
            "Compliance Risk ensuring AFS align with IFRS for SMEs"
        ],
        complianceContext: "Our services are built on the Companies Act No. 71 of 2008 and the latest SARS eFiling standards, ensuring your records support POPIA compliance and Tax Clearance applications.",
        visualType: "strategic"
    },
    {
        slug: "tax-services",
        title: "Tax Services",
        pillar: "Compliance",
        hero: {
            heading: "SARS Compliance, Tax Returns, and Advisory — Filed on Time, Every Time",
            subheading: "Tax return preparation, SARS eFiling, provisional tax, VAT, and income tax services for South African businesses and individuals. Reliable and on time."
        },
        whoIsThisFor: [
            "Individuals filing ITR12 returns",
            "Companies filing ITR14 and IRP6 returns",
            "VAT vendors requiring reliable submissions"
        ],
        deliverables: [
            "Annual income tax returns (ITR12 / ITR14)",
            "Provisional tax submissions (IRP6)",
            "VAT returns (VAT201)",
            "PAYE reconciliations (EMP501)",
            "Tax clearance certificate applications",
            "SARS eFiling management",
            "Responses to SARS queries and verifications",
            "Tax computation schedules"
        ],
        process: [
            { step: 1, title: "Assessment", description: "We review your tax obligations and identify all required filings." },
            { step: 2, title: "Data gathering", description: "We collect financial statements, supporting documents, and prior year returns." },
            { step: 3, title: "Preparation", description: "Returns are calculated, reviewed, and prepared for submission." },
            { step: 4, title: "Filing", description: "All returns are submitted to SARS via eFiling before the deadline." },
            { step: 5, title: "Confirmation", description: "You receive filing confirmations and a summary of your tax position." }
        ],
        requirements: ["E-Filing profile access", "Supporting documents", "Financial statements"],
        timeline: "Per Submission Deadline",
        faqs: [
            { question: "What types of tax returns do you handle?", answer: "We prepare and file ITR12 (individuals), ITR14 (companies), IRP6 (provisional tax), VAT201 (VAT returns), and EMP501 (PAYE reconciliations), among others." },
            { question: "Can you help with a SARS audit or query?", answer: "Yes. We assist with SARS verification requests, audits, and objections. We prepare the necessary supporting documentation and manage communication with SARS on your behalf." },
            { question: "What if I have unfiled returns from previous years?", answer: "We can help. We will assess what is outstanding, prepare the necessary returns, and submit them. Penalties may apply from SARS, but resolving the situation is always better than leaving it unaddressed." },
            { question: "Do you handle VAT registration?", answer: "Yes. We assist with voluntary and compulsory VAT registration, including preparing and submitting the application to SARS." },
            { question: "How do I know if I need to register for provisional tax?", answer: "If you earn income that is not subject to PAYE — such as freelance income, rental income, or business profits — you are likely required to register as a provisional taxpayer. We can assess your situation." },
            { question: "Can you help me get a tax clearance certificate?", answer: "Yes. We handle tax clearance applications through SARS eFiling. A valid tax clearance requires that all returns are up to date and there are no outstanding SARS debts." },
            { question: "What is the deadline for income tax submissions?", answer: "Deadlines vary by taxpayer type and filing method. We track all applicable deadlines for our clients and ensure submissions are made on time." }
        ],
        relatedServices: [
            { slug: "cipc-compliance", title: "CIPC Compliance" },
            { slug: "companies-act-compliance", title: "Companies Act" }
        ],
        stats: [
            { label: "Audit Mitigation", value: "70%", description: "Less likely to face SARS verification stalls." },
            { label: "Filing Accuracy", value: "High", description: "Defensible submissions based on Tax Law." },
            { label: "Response Time", value: "7-14 Days", description: "Average turnaround for SARS query responses." },
            { label: "Compliance Status", value: "Green", description: "Maintaining 'Good Standing' for tender eligibility." }
        ],
        insights: [
            "Setting aside a monthly 'Tax Reserve' is the best habit for SA business financial health.",
            "Administrative penalties for late filing accrue monthly and can be avoided with proactive support.",
            "Professional tax oversight ensures you claim all legal deductions while remaining audit-safe."
        ],
        problemsSolved: [
            "Missed SARS filing deadlines and penalties",
            "Incorrect tax calculations leading to audits",
            "Lack of representation during SARS queries",
            "Inefficient tax planning causing cash flow stress"
        ],
        complianceContext: "Tax compliance is strictly governed by the Tax Administration Act. We ensure your filings are defensible, accurate, and submitted via registered practitioners to maintain your good standing.",
        visualType: "compliance"
    },
    {
        slug: "advisory-services",
        title: "Advisory Services",
        pillar: "Intelligence",
        hero: {
            heading: "Strategic Financial Advice — Grounded in Your Data, Not Guesswork",
            subheading: "Business advisory for South African SMEs. Strategic financial planning, cash flow analysis, and growth support grounded in real data."
        },
        whoIsThisFor: [
            "Business owners planning for growth",
            "Companies managing cash flow challenges",
            "Startups needing financial modeling"
        ],
        deliverables: [
            "Cash flow analysis and forecasting",
            "Budgets and financial projections",
            "Scenario modelling (growth, cost reduction, investment)",
            "Business plan financial sections",
            "Investor-ready financial packs",
            "Monthly or quarterly advisory meetings",
            "KPI dashboards and performance tracking"
        ],
        process: [
            { step: 1, title: "Discovery", description: "We understand your business goals, challenges, and current financial position." },
            { step: 2, title: "Analysis", description: "We review your financial data and identify key patterns, risks, and opportunities." },
            { step: 3, title: "Recommendations", description: "We present clear, data-backed options with pros, cons, and projected outcomes." },
            { step: 4, title: "Implementation support", description: "We help you apply the recommendations and track progress." },
            { step: 5, title: "Ongoing review", description: "Regular check-ins ensure the strategy stays relevant as your business evolves." }
        ],
        requirements: ["Financial data access", "Management accounts", "Strategic goals"],
        timeline: "Project or Retainer",
        faqs: [
            { question: "Is this the same as having a CFO?", answer: "It can be. Our advisory services range from project-based analysis to ongoing CFO-level support. You get the strategic insight without the full-time cost." },
            { question: "I am a small start-up. Is advisory relevant for me?", answer: "Yes. In fact, early-stage financial planning — budgeting, cash flow forecasting, and pricing strategy — can prevent problems that are expensive to fix later." },
            { question: "Do I need up-to-date financials before I can use this service?", answer: "Ideally, yes. Advisory is most effective when based on current data. If your books are behind, we can help catch them up first through our bookkeeping or accounting services." },
            { question: "What kind of decisions can advisory help with?", answer: "Common scenarios include: evaluating whether to hire, planning for a new location, deciding between financing options, restructuring costs, and preparing for a sale or investment round." },
            { question: "How often would we meet?", answer: "That depends on the scope. Some clients meet monthly, others quarterly. Ad-hoc advisory for a specific project may involve a concentrated series of sessions." },
            { question: "Can you prepare financial projections for a bank or investor?", answer: "Yes. We prepare professional, data-backed financial projections and supporting packs formatted for bank loan applications or investor presentations." }
        ],
        relatedServices: [
            { slug: "data-analytics-services", title: "Data Analytics" },
            { slug: "business-it-solutions", title: "Business IT" }
        ]
    },
    {
        slug: "cipc-compliance",
        title: "CIPC Compliance",
        pillar: "Compliance",
        hero: {
            heading: "Company Registrations, Annual Returns, and CIPC Amendments — Handled",
            subheading: "CIPC annual returns, company registrations, amendments, and compliance support for South African businesses. Stay compliant, avoid penalties."
        },
        whoIsThisFor: [
            "New businesses needing registration",
            "Companies with overdue Annual Returns",
            "Directors needing details updated"
        ],
        deliverables: [
            "New company and close corporation registrations",
            "Annual return filing (AR)",
            "Director and member amendments (CoR39)",
            "Registered office address changes",
            "Company name reservations and changes",
            "Entity status checks and compliance reports",
            "Deregistration and reinstatement support"
        ],
        process: [
            { step: 1, title: "Status check", description: "We retrieve your entity's CIPC status and identify any overdue filings or issues." },
            { step: 2, title: "Document preparation", description: "We gather the required resolutions, IDs, and supporting documents." },
            { step: 3, title: "Filing and submission", description: "All forms are submitted to CIPC and tracked to completion." },
            { step: 4, title: "Confirmation", description: "You receive filing confirmations and updated company documents." },
            { step: 5, title: "Ongoing monitoring", description: "We track annual return deadlines and notify you in advance." }
        ],
        requirements: ["ID documents", "Proof of address", "Director details"],
        timeline: "3-5 days (Registration)",
        faqs: [
            { question: "What happens if I miss my CIPC annual return?", answer: "CIPC may impose penalties and eventually deregister your company for non-compliance. This can affect your ability to trade, open bank accounts, or bid on tenders." },
            { question: "Can you register a new company for me?", answer: "Yes. We handle the full registration process, including name reservation, submission of incorporation documents, and issuing of the registration certificate." },
            { question: "How do I change a director on my company?", answer: "Director changes require a CoR39 filing with CIPC. We prepare the necessary resolutions and submit the change on your behalf." },
            { question: "What is the difference between a company and a close corporation?", answer: "A company (Pty Ltd) is governed by the Companies Act, 2008. A close corporation (CC) is an older entity form that can no longer be newly registered but can still operate and must comply with CIPC requirements." },
            { question: "Can you reinstate a deregistered company?", answer: "In most cases, yes. We assess the reason for deregistration, prepare the application, and submit to CIPC. Results depend on the specific circumstances." },
            { question: "Do you handle B-BBEE compliance related to CIPC?", answer: "We ensure your CIPC records support B-BBEE verification. For the full B-BBEE scorecard and certification, we may refer you to a specialist agency." },
            { question: "How often must annual returns be filed?", answer: "Annual returns must be filed once per year, based on the anniversary of your company's registration date. The filing window and fees are set by CIPC." }
        ],
        relatedServices: [
            { slug: "companies-act-compliance", title: "Companies Act" },
            { slug: "tax-services", title: "Tax Services" }
        ]
    },
    {
        slug: "companies-act-compliance",
        title: "Companies Act Compliance",
        pillar: "Compliance",
        hero: {
            heading: "Statutory Compliance, Board Resolutions, and Corporate Governance — Managed",
            subheading: "Companies Act compliance and secretarial services for SA companies. Board resolutions, MOI amendments, statutory registers, and governance support."
        },
        whoIsThisFor: [
            "Companies needing statutory registers",
            "Directors requiring board resolutions",
            "Entities updating their MOI"
        ],
        deliverables: [
            "Statutory register maintenance (directors, shareholders, beneficial interests)",
            "Board and shareholder resolutions",
            "MOI drafting and amendments",
            "Share register and certificate management",
            "Annual compliance calendar",
            "Written resolutions for specific corporate actions",
            "Governance documentation and advisory"
        ],
        process: [
            { step: 1, title: "Compliance audit", description: "We review your existing corporate records and identify gaps or overdue items." },
            { step: 2, title: "Remediation", description: "We prepare any outstanding resolutions, registers, or filings." },
            { step: 3, title: "Ongoing management", description: "We maintain your registers and prepare required resolutions as events occur." },
            { step: 4, title: "Annual review", description: "We conduct an annual review of your statutory records and compliance calendar." }
        ],
        requirements: ["Company Registration Documents", "Current MOI", "Shareholder details"],
        timeline: "Ongoing",
        faqs: [
            { question: "What statutory records must a company keep?", answer: "Under the Companies Act, companies must maintain registers of directors, shareholders, beneficial interest holders, and company secretary details. They must also keep copies of board and shareholder resolutions." },
            { question: "Do I need a company secretary?", answer: "Public companies and state-owned companies are required to appoint a company secretary. Private companies (Pty Ltd) are not required to, but many benefit from having one for governance and compliance purposes." },
            { question: "What is an MOI and why does it matter?", answer: "The Memorandum of Incorporation (MOI) is the founding document that governs how your company operates. It sets out shareholder rights, director powers, and key processes. If your MOI is outdated or generic, it can create problems during disputes, shareholder changes, or audits." },
            { question: "How do I pass a board resolution?", answer: "Board resolutions can be passed at a meeting or by written consent (round-robin). We draft the resolution and manage the process to ensure it is properly recorded." },
            { question: "Is this service relevant for small companies?", answer: "Yes. The Companies Act applies to all registered companies, regardless of size. Non-compliance can result in penalties and legal exposure." },
            { question: "Can you help during a dispute between shareholders?", answer: "We can ensure corporate records and resolutions are in order, which is often critical during disputes. For legal representation, we would refer you to a specialist attorney." }
        ],
        relatedServices: [
            { slug: "cipc-compliance", title: "CIPC Compliance" },
            { slug: "tender-readiness", title: "Tender Readiness" }
        ]
    },
    {
        slug: "payroll-service",
        title: "Payroll Services",
        pillar: "Accounting",
        hero: {
            heading: "Payslips, PAYE, UIF, and SDL — Processed Accurately Every Month",
            subheading: "Reliable payroll processing for SA employers. Payslips, PAYE, UIF, SDL, and COIDA submissions handled accurately and on time each month."
        },
        whoIsThisFor: [
            "Small to medium employers",
            "Companies needing SARS PAYE compliance",
            "Businesses with simplified payroll needs"
        ],
        deliverables: [
            "Monthly payslip generation for all employees",
            "PAYE, UIF, and SDL calculations and submissions (EMP201)",
            "Bi-annual PAYE reconciliations (EMP501)",
            "IRP5 / IT3(a) certificate generation",
            "COIDA return of earnings preparation",
            "Leave balance tracking (where applicable)",
            "New employee tax registration",
            "Payroll summary reports"
        ],
        process: [
            { step: 1, title: "Setup", description: "We collect employee details, salary structures, and SARS employer registration information." },
            { step: 2, title: "Monthly processing", description: "We calculate gross-to-net pay, deductions, and employer contributions each cycle." },
            { step: 3, title: "Payslip distribution", description: "Payslips are generated and shared with you for employee distribution." },
            { step: 4, title: "SARS submission", description: "EMP201 returns are submitted to SARS on time each month." },
            { step: 5, title: "Reconciliation", description: "Bi-annual EMP501 reconciliations are completed and submitted with IRP5 certificates." }
        ],
        requirements: ["Employee details", "Salary data", "Timesheets"],
        timeline: "Monthly",
        faqs: [
            { question: "What is included in the monthly payroll cycle?", answer: "Gross-to-net calculation for each employee, payslip generation, PAYE/UIF/SDL calculation, and EMP201 submission to SARS." },
            { question: "Do you handle commission, overtime, and bonuses?", answer: "Yes. We accommodate variable pay, overtime, commissions, bonuses, and other allowances as part of the monthly calculation." },
            { question: "What is an EMP501?", answer: "The EMP501 is a bi-annual PAYE reconciliation that employers must submit to SARS. It includes IRP5 and IT3(a) certificates for each employee." },
            { question: "Can you register my company as an employer with SARS?", answer: "Yes. We assist with employer PAYE, UIF, and SDL registration with SARS and the Department of Labour." },
            { question: "How do you handle employee confidentiality?", answer: "Payroll data is processed securely and only shared with authorised contacts within your organisation. We follow strict confidentiality practices." },
            { question: "What if I only have a few employees?", answer: "Our payroll service accommodates businesses of all sizes. Whether you have 2 employees or 200, the process is the same — accurate, compliant, and timely." },
            { question: "Do you help with COIDA?", answer: "Yes. We prepare the annual return of earnings for COIDA and ensure your registration is in order. COIDA is compulsory for all employers in South Africa." }
        ],
        relatedServices: [
            { slug: "bookkeeping", title: "Bookkeeping" },
            { slug: "tax-services", title: "Tax Services" }
        ]
    },
    {
        slug: "audit-readiness",
        title: "Audit Readiness",
        pillar: "Accounting",
        hero: {
            heading: "Prepare Your Records, Systems, and Documentation — Before the Auditors Arrive",
            subheading: "Audit readiness preparation for SA businesses. We prepare your records, resolve gaps, and ensure your documentation is audit-ready."
        },
        whoIsThisFor: [
            "Companies facing statutory audit",
            "SMEs preparing for due diligence",
            "Organisations with donor funding"
        ],
        deliverables: [
            "Pre-audit assessment and gap analysis",
            "Bank and inter-company reconciliations",
            "Fixed asset register review",
            "Creditor and debtor confirmations",
            "Supporting schedules and working papers",
            "Audit file assembly",
            "Recommendations for process improvements",
            "Liaison support during the audit (if requested)"
        ],
        process: [
            { step: 1, title: "Pre-audit review", description: "We assess the state of your records and identify items that need attention." },
            { step: 2, title: "Gap remediation", description: "We resolve discrepancies, prepare missing schedules, and complete reconciliations." },
            { step: 3, title: "File assembly", description: "We compile a structured audit file with all required documentation." },
            { step: 4, title: "Readiness confirmation", description: "We confirm that records are ready and brief you on what to expect." },
            { step: 5, title: "Audit support", description: "If needed, we liaise with auditors during the engagement to respond to queries." }
        ],
        requirements: ["Trial Balance", "General Ledger", "Prior Audit Report"],
        timeline: "8-12 weeks pre-audit",
        faqs: [
            { question: "Do you perform the actual audit?", answer: "No. We prepare your records and documentation so the audit process runs smoothly. The audit itself must be conducted by a registered auditor." },
            { question: "When should I start preparing for an audit?", answer: "Ideally, preparation should begin at least eight to twelve weeks before the audit date. The earlier we start, the more thoroughly we can resolve any issues." },
            { question: "What does a gap analysis include?", answer: "We review your trial balance, reconciliations, supporting documentation, and statutory filings to identify anything that is incomplete, inconsistent, or missing." },
            { question: "Can you help if our records are in poor shape?", answer: "Yes. Part of our service involves reconstructing and reconciling records where needed. The scope and timeline will depend on the extent of the issues." },
            { question: "Is audit readiness only for statutory audits?", answer: "No. We also prepare businesses for donor audits, voluntary audits, and due diligence processes required for tenders, investors, or acquisitions." },
            { question: "Will this reduce our audit fees?", answer: "In most cases, yes. A well-prepared audit file means auditors spend less time on queries and follow-ups, which typically reduces the time and cost of the engagement." }
        ],
        relatedServices: [
            { slug: "accounting", title: "Accounting" },
            { slug: "advisory-services", title: "Advisory" }
        ]
    },
    {
        slug: "tender-readiness",
        title: "Tender Readiness Support",
        pillar: "Compliance",
        hero: {
            heading: "CSD, B-BBEE, Tax Clearance — Everything Your Tender Application Requires",
            subheading: "Tender preparation services for SA businesses. CSD registration, B-BBEE verification, tax clearance, and compliance document preparation."
        },
        whoIsThisFor: [
            "Businesses bidding for government tenders",
            "Suppliers needing CSD registration",
            "SMEs requiring tax clearance"
        ],
        deliverables: [
            "CSD registration and profile management",
            "Tax clearance certificate applications",
            "B-BBEE affidavit preparation (EME/QSE)",
            "CIPC compliance documentation assembly",
            "Company registration and good standing confirmations",
            "Financial statement preparation for tender packs",
            "Document checklist and gap analysis",
            "Renewal tracking for time-sensitive documents"
        ],
        process: [
            { step: 1, title: "Requirements review", description: "We identify the compliance documents required for your target tenders." },
            { step: 2, title: "Gap analysis", description: "We check which documents you have, which are expired, and which need preparation." },
            { step: 3, title: "Document preparation", description: "We prepare, apply for, or renew all required compliance items." },
            { step: 4, title: "Pack assembly", description: "We compile a complete, organised tender compliance pack ready for submission." },
            { step: 5, title: "Ongoing maintenance", description: "We track document expiry dates and notify you when renewals are due." }
        ],
        requirements: ["Company documents", "Directors IDs", "Bank confirmation"],
        timeline: "Variable",
        faqs: [
            { question: "What is the CSD?", answer: "The Central Supplier Database (CSD) is the South African government's supplier registration portal. Registration is mandatory for any business that wants to supply goods or services to a government entity." },
            { question: "Do you write the actual tender bid?", answer: "No. Our service covers the compliance and financial documentation required to qualify. For bid writing, we can refer you to a specialist." },
            { question: "How long does it take to get a tax clearance certificate?", answer: "If all your SARS returns are up to date and there are no outstanding debts, the certificate is typically issued within a few business days. If there are outstanding issues, it will take longer and we can help resolve them." },
            { question: "What is a B-BBEE affidavit?", answer: "Businesses with turnover under R10 million (EMEs) or under R50 million (QSEs, in certain cases) can use a sworn affidavit to confirm their B-BBEE level. This is a simpler alternative to a full verification process." },
            { question: "Can you help if my CSD profile has errors?", answer: "Yes. We review and correct CSD profile information, update contact and banking details, and resolve common verification issues." },
            { question: "What documents do government tenders typically require?", answer: "Most require: a valid tax clearance, CSD registration, B-BBEE certificate or affidavit, CIPC registration certificate, proof of banking, company directors information, and recent financial statements." },
            { question: "Do these documents expire?", answer: "Yes. Tax clearance certificates, B-BBEE certificates, and CSD registrations all have validity periods. We track these and prompt you before they lapse." }
        ],
        relatedServices: [
            { slug: "tax-services", title: "Tax Services" },
            { slug: "companies-act-compliance", title: "Companies Act" }
        ]
    },
    {
        slug: "data-analytics-services",
        title: "Data Analytics",
        pillar: "Intelligence",
        hero: {
            heading: "Turn Your Business Data Into Clear, Actionable Insights",
            subheading: "Data analytics and custom dashboards for SA businesses. Transform your financial and operational data into clear, decision-ready insights."
        },
        whoIsThisFor: [
            "Business owners wanting better visibility",
            "Companies with disconnected data systems",
            "Managers needing automated reporting"
        ],
        deliverables: [
            "Custom KPI dashboards (revenue, expenses, cash flow, debtors)",
            "Data extraction and integration from existing systems",
            "Automated report generation (monthly/weekly)",
            "Trend analysis and performance tracking",
            "Visual data packs for stakeholder presentations",
            "Dashboard training and handover documentation"
        ],
        process: [
            { step: 1, title: "Data audit", description: "We identify your data sources, systems, and reporting needs." },
            { step: 2, title: "Design", description: "We define the KPIs, metrics, and dashboard layouts that suit your business." },
            { step: 3, title: "Build", description: "We connect to your data sources and build the dashboards." },
            { step: 4, title: "Review", description: "We walk you through the dashboards and refine based on your feedback." },
            { step: 5, title: "Handover and support", description: "You receive training, access, and ongoing support." }
        ],
        requirements: ["Access to data sources", "Reporting goals", "Defined KPIs"],
        timeline: "Project-based",
        faqs: [
            { question: "What tools do you use for dashboards?", answer: "We use industry-standard tools such as Power BI, Google Data Studio (Looker Studio), and Excel-based dashboards depending on your needs and budget." },
            { question: "Do I need to change my accounting software?", answer: "No. We integrate with your existing systems. If your data is in Xero, Sage, QuickBooks, spreadsheets, or even manual records, we work with it." },
            { question: "How often are dashboards updated?", answer: "Update frequency depends on your data and systems. Dashboards connected to cloud software can refresh daily. Spreadsheet-based dashboards are typically updated weekly or monthly." },
            { question: "Can this help with investor or board reporting?", answer: "Yes. We build presentation-ready data packs and visual reports suitable for board meetings, investor updates, and management reviews." },
            { question: "What if I don't know what metrics to track?", answer: "That is part of our process. We assess your business model and recommend the KPIs and metrics that are most relevant to your operations and goals." },
            { question: "Is this only for large businesses?", answer: "Not at all. Even small businesses benefit from seeing their financial data clearly. We scale the solution to match your size and needs." }
        ],
        relatedServices: [
            { slug: "advisory-services", title: "Advisory" },
            { slug: "business-it-solutions", title: "Business IT" }
        ]
    },
    {
        slug: "business-it-solutions",
        title: "Business IT Solutions",
        pillar: "Intelligence",
        hero: {
            heading: "Practical Technology Setup for Businesses That Want to Work Smarter",
            subheading: "Practical IT solutions for SA businesses. Cloud setup, accounting software, workflow automation, and digital tools tailored to your operations."
        },
        whoIsThisFor: [
            "SMEs moving to the cloud",
            "Teams needing remote work setup",
            "Businesses modernizing their software"
        ],
        deliverables: [
            "Accounting software setup and migration (Xero, Sage, QuickBooks)",
            "Cloud storage and document management configuration",
            "Workflow and process automation setup",
            "Email and communication platform configuration",
            "Software training and documentation",
            "Ongoing IT support and maintenance (optional)"
        ],
        process: [
            { step: 1, title: "Needs assessment", description: "We evaluate your current tools, pain points, and goals." },
            { step: 2, title: "Solution design", description: "We recommend tools and configurations that fit your budget and operations." },
            { step: 3, title: "Implementation", description: "We set up, configure, and integrate the selected tools." },
            { step: 4, title: "Training", description: "We train your team and provide documentation for ongoing use." },
            { step: 5, title: "Support", description: "We provide post-setup support and help resolve issues as they arise." }
        ],
        requirements: ["Current IT audit", "Access credentials", "Team list"],
        timeline: "1-6 weeks",
        faqs: [
            { question: "Do you provide hardware or only software solutions?", answer: "Our focus is on software, cloud, and workflow solutions. If you need hardware procurement, we can advise and refer you to a trusted supplier." },
            { question: "Can you help us move from spreadsheets to proper accounting software?", answer: "Yes. This is one of our most common projects. We handle data migration, software setup, and training to ensure a smooth transition." },
            { question: "What accounting software do you recommend?", answer: "It depends on your business size, needs, and budget. We work with Xero, Sage, and QuickBooks, and we will recommend the best fit during the assessment." },
            { question: "Do you offer ongoing IT support?", answer: "Yes. We offer optional ongoing support for the tools and systems we set up. This includes troubleshooting, updates, and configuration adjustments." },
            { question: "What kinds of automations can you set up?", answer: "Common automations include invoice reminders, recurring billing, document approvals, data backups, report scheduling, and workflow notifications." },
            { question: "Can you set up tools for a remote team?", answer: "Yes. We configure cloud-based tools that enable remote collaboration, including project management platforms, shared drives, and communication tools." },
            { question: "How long does a typical IT setup take?", answer: "Simple setups like accounting software can be completed in one or two weeks. More complex projects involving multiple integrations may take four to six weeks." }
        ],
        relatedServices: [
            { slug: "advisory-services", title: "Advisory" },
            { slug: "data-analytics-services", title: "Data Analytics" }
        ]
    },
    {
        slug: "cloud-accounting-services",
        title: "Cloud Accounting Services",
        pillar: "Accounting",
        hero: {
            heading: "Modern Cloud Accounting Services for the Remote Era",
            subheading: "Move your business finances into the future with automated, real-time cloud accounting that gives you total visibility from any device."
        },
        whoIsThisFor: [
            "Mobile Business Owners on the move",
            "Tech-Forward Startups needing a foundation",
            "E-commerce Businesses (Shopify, etc.)",
            "Established companies moving from desktop"
        ],
        deliverables: [
            "Xero / Sage Business Cloud Setup",
            "Automated Bank Feed Integration",
            "Digital Receipting (Dext/Hubdoc)",
            "Real-Time Management Dashboards"
        ],
        process: [
            { step: 1, title: "Tech Audit", description: "Choosing the best cloud platform for your specific business." },
            { step: 2, title: "Migration", description: "Moving historical data and opening balances cleanly." },
            { step: 3, title: "Setup", description: "Connecting bank feeds and integrating business apps." },
            { step: 4, title: "Training", description: "Empowering your team to use the mobile accounting apps." },
            { step: 5, title: "Live Ops", description: "Real-time reconciliation and continuous cloud support." }
        ],
        requirements: [
            "Willingness to move away from paper",
            "Software advisor access",
            "Commitment to digital document capture"
        ],
        timeline: "Cloud migration typically takes 3–10 business days.",
        faqs: [
            { question: "Is the cloud safe for financials?", answer: "Yes. Modern platforms use bank-level encryption and multiple redundant backups, far exceeding office PC safety." },
            { question: "Do I lose my data if I cancel?", answer: "No. You own your data and can export it or take your subscription with you at any time." },
            { question: "What about poor internet?", answer: "These platforms are very light; even a basic mobile data connection is usually enough to work." }
        ],
        relatedServices: [
            { slug: "monthly-accounting-services", title: "Monthly Accounting" },
            { slug: "bookkeeping", title: "Bookkeeping" }
        ],
        stats: [
            { label: "Admin Savings", value: "80%", description: "Reduction in manual data entry via automation." },
            { label: "Migration Time", value: "3-10 Days", description: "Fast transition from legacy systems." },
            { label: "Uptime", value: "99.9%", description: "Guaranteed access to your financial data." },
            { label: "Security", value: "Bank-Level", description: "Encrypted data hosting (Xero/Sage)." }
        ],
        insights: [
            "82% of businesses fail due to cash flow—cloud accounting gives you a live dashboard to prevent this.",
            "Moving to the cloud allows for a 100% remote yet deeply collaborative accounting relationship.",
            "Automated bank feeds reduce manual errors and provide a defensible digital paper trail for SARS."
        ],
        problemsSolved: [
            "Manual data entry errors and fatigue",
            "Lost or scattered paper trails",
            "In-office dependencies for financial work",
            "Duplicate document handling and storage",
            "Delayed audit preparedness"
        ],
        complianceContext: "Cloud accounting is supported by SARS and aligns with the Companies Act. Platforms use data centers meeting strict POPIA standards, ensuring your South African financial data is secure and private.",
        visualType: "cloud"
    },
    {
        slug: "monthly-accounting-services",
        title: "Monthly Accounting Services",
        pillar: "Accounting",
        hero: {
            heading: "Predictable Monthly Accounting — No Surprises, Just Results",
            subheading: "Switch to a structured monthly service that provides continuous oversight and total compliance for your South African business."
        },
        whoIsThisFor: [
            "Active SMEs with weekly transactions",
            "VAT-Registered Businesses",
            "Employer Entities with PAYE/UIF",
            "Scaling Startups needing real-time data"
        ],
        deliverables: [
            "Monthly Bank Reconciliations",
            "Management Accounts (P&L, Balance Sheet)",
            "VAT / PAYE Returns Submission",
            "SARS Compliance Certificate Maintenance"
        ],
        process: [
            { step: 1, title: "Scoping", description: "Determining target volume and reporting depth." },
            { step: 2, title: "Integration", description: "Connecting your business apps to our cloud suite." },
            { step: 3, title: "Operations", description: "Digital document submission and real-time processing." },
            { step: 4, title: "Support", description: "Flagging discrepancies immediately as they occur." },
            { step: 5, title: "Reporting", description: "Receiving your structured financial pack by the 15th." }
        ],
        requirements: [
            "Consistent document submission",
            "Active bank feed connections",
            "Primary contact for high-level decisions"
        ],
        timeline: "Recurring monthly service; reports delivered by the 15th.",
        faqs: [
            { question: "Can I stop at any time?", answer: "Yes. Our agreements are flexible, typically requiring a 30-day notice period." },
            { question: "How are fees calculated?", answer: "Based on transaction volume, employee count, and tax complexity (e.g., VAT status)." },
            { question: "Do you handle backlogs?", answer: "Yes. We perform a catch-up/cleanup phase before transitioning you to the monthly cycle." }
        ],
        relatedServices: [
            { slug: "tax-services", title: "Tax Services" },
            { slug: "accounting", title: "Accounting" }
        ],
        stats: [
            { label: "Efficiency Gain", value: "25%", description: "Average reduction in annual admin costs." },
            { label: "Report Deadline", value: "15th", description: "Reports delivered halfway through the next month." },
            { label: "Notice Period", value: "30 Days", description: "Flexible month-to-month engagement." },
            { label: "Audit Confidence", value: "High", description: "Continuous reconciliation reduces year-end risk." }
        ],
        insights: [
            "Businesses reviewing management accounts monthly are 40% more likely to identify profitable growth opportunities early.",
            "Monthly accounting turns the year-end 'death march' into just another standard month.",
            "Predictable fixed fees allow for better business budgeting and cash flow management."
        ],
        problemsSolved: [
            "The year-end deadline panic and rush",
            "Unpredictable accounting and tax billing",
            "Critical financial data gaps",
            "Disconnected bookkeeping and tax returns",
            "Compliance oversight missing deadlines"
        ],
        complianceContext: "Monthly accounting is the most robust way to comply with the Tax Administration Act and the Companies Act, ensuring your digital paper trail is always current for SARS verifications.",
        visualType: "flow"
    },
    {
        slug: "outsourcing-accounting-services",
        title: "Outsourcing Accounting Services",
        pillar: "Accounting",
        hero: {
            heading: "Strategic Accounting Outsourcing for Growing Teams",
            subheading: "Replace the cost of an in-house team with a specialized external partner that delivers total accuracy and senior-level expertise."
        },
        whoIsThisFor: [
            "SMEs outgrowing junior bookkeepers",
            "International subsidiaries in SA",
            "Startups wanting to stay lean",
            "Professional Practices focused on billing"
        ],
        deliverables: [
            "Full-Cycle Finance Function",
            "Senior Accountant (CFO-level) Oversight",
            "Integrated Payroll Management",
            "Strategic Cash Flow Forecasting"
        ],
        process: [
            { step: 1, title: "Discovery", description: "Mapping internal processes for external transition." },
            { step: 2, title: "Onboarding", description: "Structured handover of systems and records." },
            { step: 3, title: "Integration", description: "Setting up your Virtual CFO dashboard." },
            { step: 4, title: "Management", description: "Our team takes over daily and monthly finance tasks." },
            { step: 5, title: "Optimization", description: "Regular strategy reviews to scale with your growth." }
        ],
        requirements: [
            "Authorization for view-only banking",
            "Agreement on approval workflows",
            "Dedicated internal contact person"
        ],
        timeline: "Onboarding takes 14–30 days for a full handover.",
        faqs: [
            { question: "Is it safe to give you access?", answer: "Yes. We use view-only bank access; you remain the final approver for all payments." },
            { question: "How is this different from an accountant?", answer: "Traditional accountants work annually; we work as your internal finance dept, every week." },
            { question: "Can you scale down?", answer: "Yes. Our service models are designed to be flexible. If your transaction volume drops significantly, our fees can adjust accordingly." }
        ],
        relatedServices: [
            { slug: "cloud-accounting-services", title: "Cloud Accounting" },
            { slug: "monthly-accounting-services", title: "Monthly Accounting" }
        ],
        stats: [
            { label: "Cost Reduction", value: "35%", description: "Average savings vs. hiring a full-time in-house team." },
            { label: "Time Reclaimed", value: "20 hrs/mo", description: "Admin time gained back by the business owner." },
            { label: "Professional Ratio", value: "Full Team", description: "Access to multiple specialists, not just one person." },
            { label: "Error Reduction", value: "High", description: "Multiple eyes on every high-level submission." }
        ],
        insights: [
            "Outsourcing eliminates 'Single Person Risk' where your business stalls if one employee leaves.",
            "Most SME owners gain back 15–20 hours a month—time they can reinvest in sales and growth.",
            "An outsourced team brings diverse industry knowledge that a single in-house hire rarely possesses."
        ],
        problemsSolved: [
            "The 'Single Person Risk' of internal staff",
            "High overhead of in-house finance teams",
            "Compliance drift during growth phases",
            "Lack of senior-level financial oversight"
        ],
        complianceContext: "Our outsourcing model is built on POPIA-compliant data handling and the latest SARS practitioner standards, providing a layer of protection a non-registered internal staffer cannot offer.",
        visualType: "team"
    },
    {
        slug: "accounting-services-company",
        title: "Accounting Services Company",
        pillar: "Accounting",
        hero: {
            heading: "A Dedicated Accounting Services Company for Your Business",
            subheading: "Professional, scalable, and results-oriented financial management that treats your business goals as our mission."
        },
        whoIsThisFor: [
            "Ambitious SMEs professionalizing back-office",
            "Retail & E-commerce Hubs (high-volume)",
            "Commercial & Industrial Firms",
            "High-Growth Startups preparing for scale"
        ],
        deliverables: [
            "Scalable Monthly Record-Keeping",
            "Compliant Annual Financial Statements",
            "SARS eFiling Practitioner Representation",
            "Cloud Ecosystem Implementation (Xero/Sage)"
        ],
        process: [
            { step: 1, title: "Corporate Scoping", description: "Analyzing your company's scale and industry goals." },
            { step: 2, title: "Migration", description: "Professional handover of existing records to high-capacity platforms." },
            { step: 3, title: "Execution", description: "Specialized team takes over the daily and monthly cycle." },
            { step: 4, title: "Insights", description: "Structured, data-driven reports delivered every month." },
            { step: 5, title: "Optimization", description: "Periodic reviews to align with business trajectory." }
        ],
        requirements: ["Operational transparency", "Financial access", "Feedback loop"],
        timeline: "Predictable monthly delivery (10 business days)",
        faqs: [
            { question: "Individual vs. Company?", answer: "Scale and continuity. A company offers experts, advanced systems, and guaranteed coverage." },
            { question: "Payroll support?", answer: "Yes, we offer integrated payroll management linked to your accounting." },
            { question: "Outside Johannesburg?", answer: "Yes, our cloud-first approach allows us to serve businesses nationwide." }
        ],
        relatedServices: [
            { slug: "accounting-services-firm", title: "Accounting Firm" },
            { slug: "monthly-accounting-services", title: "Monthly Accounting" }
        ],
        stats: [
            { label: "Delivery Time", value: "10 Days", description: "Reports finalized within 10 business days." },
            { label: "Reliability", value: "100%", description: "No 'single point of failure' in your accounting." },
            { label: "Data Safety", value: "POPIA", description: "Secure, compliant data management." }
        ],
        problemsSolved: [
            "Operational fragility and key-person risk",
            "Compliance friction during rapid growth",
            "Strategic fog in financial decision making",
            "Software and system silos"
        ],
        complianceContext: "Our company operates strictly within the Companies Act and national tax laws, ensuring records are maintained for SARS Tax Clearance and vendor applications.",
        visualType: "strategic"
    },
    {
        slug: "accounting-services-firm",
        title: "Accounting Services Firm",
        pillar: "Accounting",
        hero: {
            heading: "A Professional Accounting Services Firm for Growing SMEs",
            subheading: "Much more than a 'bookkeeper' — we provide the high-level expertise and regulatory weight of a professional accounting firm."
        },
        whoIsThisFor: [
            "SMEs wanting corporate-level professionalism",
            "Businesses tired of the freelancer model",
            "Companies requiring Independent Review",
            "Franchise Owners needing consistent reporting"
        ],
        deliverables: [
            "Professional Financial Reporting (AFS)",
            "Firm-Level SARS & CIPC Compliance",
            "Strategic Senior Partner Reviews",
            "Secure Cloud-Based Ecosystems"
        ],
        process: [
            { step: 1, title: "Firm Consult", description: "Understanding objectives and financial health." },
            { step: 2, title: "Handover", description: "Structured transition from previous accountant." },
            { step: 3, title: "Allocation", description: "Assigning a dedicated team of specialists." },
            { step: 4, title: "Delivery", description: "Proven cycle of recording and reporting." },
            { step: 5, title: "Review", description: "Ensuring accounting aligns with growth trajectory." }
        ],
        requirements: ["Financial transparency", "Technological adoption", "Active engagement"],
        timeline: "Strict SLA-based monthly cycles",
        faqs: [
            { question: "Bookkeeper vs. Firm?", answer: "A firm provides analysis, tax planning, and legal sign-off on financials." },
            { question: "Real person contact?", answer: "Yes, you'll have a dedicated accountant available for consultations." },
            { question: "SARS Registered?", answer: "Yes, the firm and practitioners are fully registered with SARS and RCBs." }
        ],
        relatedServices: [
            { slug: "accounting-services-company", title: "Accounting Company" },
            { slug: "bookkeeping", title: "Bookkeeping" }
        ],
        stats: [
            { label: "Standards", value: "SAIPA/SAICA", description: "Adherence to national professional standards." },
            { label: "SLA Adherence", value: "Strict", description: "Reliable delivery even during peak seasons." },
            { label: "Trust Factor", value: "High", description: "Registered Tax Practitioner status." }
        ],
        problemsSolved: [
            "Lack of professional 'weight' for stakeholders",
            "Compliance inconsistency and errors",
            "Strategic isolation of business owners",
            "Sub-standard or informal reporting"
        ],
        complianceContext: "Our firm is strictly governed by the Tax Administration Act and Companies Act, operating according to professional body codes for integrity and POPIA compliance.",
        visualType: "compliance"
    },
    {
        slug: "business-accounting-services",
        title: "Business Accounting Services",
        pillar: "Accounting",
        hero: {
            heading: "Professional Business Accounting Services",
            subheading: "Strategic financial oversight for established businesses and corporations that require rigorous reporting and data-driven direction."
        },
        whoIsThisFor: [
            "Mid-Market SMEs with complex structures",
            "Commercial & Industrial Entities (Manufacturing, Construction)",
            "Franchise Groups & retailers requiring consolidated reporting",
            "Professional Services Firms (Architects, Engineers)"
        ],
        deliverables: [
            "Corporate Financial Reporting (AFS)",
            "Advanced Cash Flow & Liquidity Analysis",
            "Corporate Income Tax (ITR14) Management",
            "CIPC Secretarial Maintenance & Compliance"
        ],
        process: [
            { step: 1, title: "Commercial Review", description: "Analyzing your company structure and reporting requirements." },
            { step: 2, title: "Onboarding", description: "Finalizing balances and aligning records into a professional framework." },
            { step: 3, title: "Reporting Cycle", description: "Board-level management packs delivered monthly or quarterly." },
            { step: 4, title: "Tax Management", description: "Monthly monitoring of your tax position." },
            { step: 5, title: "Annual Closing", description: "Seamless hand-over to auditors or direct SARS filing." }
        ],
        requirements: ["Executive involvement", "Systems integration", "Supporting documentation"],
        timeline: "Ongoing strategic engagement",
        faqs: [
            { question: "Can you work with our internal team?", answer: "Yes. We often act as the reviewing accountant or strategic advisor for internal bookkeeping teams." },
            { question: "Industry specialization?", answer: "We have deep experience in logistics, retail, manufacturing, and professional services." },
            { question: "Board-ready reports?", answer: "Absolutely. We prepare professional packs highlighting KPIs relevant to your model." }
        ],
        relatedServices: [
            { slug: "outsourcing-accounting-services", title: "Outsourced Accounting" },
            { slug: "tax-services", title: "Tax Services" }
        ],
        stats: [
            { label: "Turnaround", value: "30 Days", description: "Complex year-end finalization time." },
            { label: "Accuracy", value: "Audit-Ready", description: "Records meet external audit standards." },
            { label: "Compliance", value: "Companies Act", description: "Adherence to Act No. 71 of 2008." }
        ],
        problemsSolved: [
            "Financial invisibility across divisions",
            "Regulatory non-compliance with CIPC/SARS",
            "Inefficient internal finance processes",
            "Inaccurate financial forecasting"
        ],
        complianceContext: "Our services are built on the Companies Act and IFRS for SMEs, ensuring your business maintains a defensible tax status and high transparency.",
        visualType: "strategic"
    },
    {
        slug: "small-business-accounting-services",
        title: "Small Business Accounting Services",
        pillar: "Accounting",
        hero: {
            heading: "Specialized Small Business Accounting Services",
            subheading: "Professional support designed specifically for the unique challenges, budgets, and growth goals of South African SMEs."
        },
        whoIsThisFor: [
            "Sole Proprietors transitioning to Pty Ltd",
            "Family-Owned Businesses needing oversight",
            "E-commerce & Retail Startups on lean budgets",
            "Service Providers (Plumbers, Consultants)"
        ],
        deliverables: [
            "Monthly Record-Keeping & Reconciliations",
            "SARS eFiling Maintenance & Submissions",
            "Simplified Management Accounts",
            "CIPC Annual Return Filings"
        ],
        process: [
            { step: 1, title: "SME Scoping", description: "Analyzing your business type and financial pain points." },
            { step: 2, title: "Onboarding", description: "Setting up a streamlined document workflow via app." },
            { step: 3, title: "Continuous Tracking", description: "Records updated in real-time, not just at month-end." },
            { step: 4, title: "Monthly Check-in", description: "A quick summary of your position is delivered." },
            { step: 5, title: "Annual Review", description: "Handling compliance to ensure you are ready for the next year." }
        ],
        requirements: ["Digital bank feeds", "Photos of receipts/invoices", "Monthly cooperation"],
        timeline: "Monthly cycle (delivered by 10th)",
        faqs: [
            { question: "Too small for accounting?", answer: "If you have a business bank account and sales, it's never too early to start right." },
            { question: "Help with first tax return?", answer: "Yes, we specialize in helping businesses navigate their first year of compliance." },
            { question: "Accounting software?", answer: "We'll help you choose and set up Xero or Sage at partner rates." }
        ],
        relatedServices: [
            { slug: "accounting-services", title: "Accounting" },
            { slug: "bookkeeping", title: "Bookkeeping" }
        ],
        stats: [
            { label: "Delivery", value: "10th", description: "Reports updated by the 10th each month." },
            { label: "SME Success", value: "2x", description: "Likelihood of scaling successful past 3 years." },
            { label: "Tax Rate", value: "SBC", description: "Checking eligibility for lower tax rates." }
        ],
        problemsSolved: [
            "Financial confusion vs growth goals",
            "Administrative fatigue for owners",
            "Missing SARS filing windows",
            "Fragmented spreadsheet-based systems"
        ],
        complianceContext: "We specialize in Companies Act requirements for SMEs and SARS Small Business Tax (SBC) rules, ensuring POPIA-compliant digital management.",
        visualType: "flow"
    },
    {
        slug: "tax-and-accounting-services",
        title: "Tax and Accounting Services",
        pillar: "Accounting",
        hero: {
            heading: "Integrated Tax and Accounting Services",
            subheading: "A unified approach that ensures your accounting records and tax submissions are perfectly synchronized."
        },
        whoIsThisFor: [
            "Growing SMEs needs a single accountable partner",
            "Directors wanting to simplify administrative life",
            "Companies on supplier panels needing 'Always-Green' status",
            "Entities with complex VAT or provisional tax obligations"
        ],
        deliverables: [
            "Full Monthly/Quarterly Accounting",
            "Preparation of Compliant AFS",
            "Income Tax Return Preparation (ITR14/ITR12)",
            "Provisional Tax & VAT Return Management"
        ],
        process: [
            { step: 1, title: "Unified Audit", description: "Reviewing accounting records and SARS status simultaneously." },
            { step: 2, title: "System Alignment", description: "Setting up a digital environment where data feeds into tax." },
            { step: 3, title: "Execution", description: "Managing books and taxes in a single rolling monthly workflow." },
            { step: 4, title: "Strategic Review", description: "Discussing profit and expected tax position." },
            { step: 5, title: "Filing", description: "Approval and filing through one unified team." }
        ],
        requirements: ["Centralized data access", "Full eFiling authorization", "Transparency on major decisions"],
        timeline: "Highly efficient linked delivery",
        faqs: [
            { question: "Is bundling more expensive?", answer: "Usually it's more cost-effective as it eliminates duplicative review work." },
            { question: "Personal taxes too?", answer: "Yes, we manage company and personal taxes for total alignment." },
            { question: "Already have a bookkeeper?", answer: "We can provide the high-level oversight and tax signing-off they need." }
        ],
        relatedServices: [
            { slug: "taxes-and-accounting-services", title: "Comprehensive Taxes & Accounting" },
            { slug: "tax-services", title: "Tax Services" }
        ],
        stats: [
            { label: "Closure Speed", value: "30% Faster", description: "Average reduction in year-end closure time." },
            { label: "Query Reduction", value: "Significant", description: "Fewer SARS queries due to data alignment." },
            { label: "Status", value: "Compliant", description: "Maintaining green status 365 days a year." }
        ],
        problemsSolved: [
            "Vendor finger-pointing between separate firms",
            "Data inconsistency between ledger and returns",
            "Administrative overload from multiple contacts",
            "Compliance blind spots on major decisions"
        ],
        complianceContext: "By integrating the Companies Act and Income Tax Act frameworks, we ensure your business meets 'fair presentation' while adhering to strict SARS rules.",
        visualType: "strategic"
    },
    {
        slug: "taxes-and-accounting-services",
        title: "Taxes and Accounting Services",
        pillar: "Accounting",
        hero: {
            heading: "Comprehensive Taxes and Accounting Services for SMEs",
            subheading: "Professional management of all your business taxes and accounting requirements under one roof."
        },
        whoIsThisFor: [
            "Businesses with employees (PAYE/UIF/SDL)",
            "VAT-Registered SMEs with bi-monthly filings",
            "Companies with multiple directors (Linked tax management)",
            "International subsidiaries requiring local expertise"
        ],
        deliverables: [
            "Strategic Tax Management (ITR14/ITR12/IRP6)",
            "Bi-monthly VAT Return Management (VAT201)",
            "Monthly Payroll Tax Filings (EMP201/EMP501)",
            "Unified Monthly Accounting & AFS Preparation"
        ],
        process: [
            { step: 1, title: "Tax Audit", description: "Reviewing every tax type for outstanding items." },
            { step: 2, title: "Unified Setup", description: "Linking accounting software to tax preparation tools." },
            { step: 3, title: "Compliance Cycle", description: "Synchronized monthly workflow for all tax types." },
            { step: 4, title: "Deadline Board", description: "Providing clear visibility on all upcoming dates." },
            { step: 5, title: "Integrated Reporting", description: "Monthly summaries of health and tax obligations." }
        ],
        requirements: ["Full eFiling transparency", "Consistent bank/sales data", "Decision updates"],
        timeline: "Always active, per-deadline management",
        faqs: [
            { question: "Handle every tax type?", answer: "Yes: Income Tax, VAT, PAYE, UIF, SDL, and Dividend Tax." },
            { question: "SARs debt on one tax?", answer: "SARS treats your profile as a whole; we help resolve individual blocks to get the profile Green." },
            { question: "Switching from others?", answer: "Yes, we handle professional handovers and consolidate your data." }
        ],
        relatedServices: [
            { slug: "tax-and-accounting-services", title: "Integrated Tax & Accounting" },
            { slug: "payroll-service", title: "Payroll Service" }
        ],
        stats: [
            { label: "Filing Accuracy", value: "100%", description: "Eliminating automated reconciliation queries." },
            { label: "Monitoring", value: "Real-time", description: "SARS 'My Compliance Profile' daily monitoring." },
            { label: "Deadlines", value: "Guaranteed", description: "Never miss a SARS filing window." }
        ],
        problemsSolved: [
            "The 'Missing Return' trap across multiple tax types",
            "Inaccurate tax-to-turnover ratios triggering audits",
            "Cash flow crashes due to unexpected tax bills",
            "Data discrepancies across different tax filings"
        ],
        complianceContext: "Our service covers the Income Tax Act, VAT Act, and Skills Development Levies Act, ensuring a unified and defensible audit trail.",
        visualType: "compliance"
    },
    {
        slug: "accounting-services-packages",
        title: "Accounting Services Packages",
        pillar: "Accounting",
        hero: {
            heading: "Transparent Accounting Services Packages for SMEs",
            subheading: "Flexible, value-driven structures designed to grow with your business — no hidden fees, just professional support."
        },
        whoIsThisFor: [
            "Early-Stage Startups on a limited budget",
            "Growing SMEs needing management accounts",
            "High-Transaction Businesses (Retail, E-commerce)",
            "Professional Practices needing a virtual finance department"
        ],
        deliverables: [
            "Predictable Monthly Engagement",
            "Tiered Inclusions (Bookkeeping, Tax, AFS)",
            "Integrated Compliance Management",
            "Clear Growth-Path Scaling"
        ],
        process: [
            { step: 1, title: "Needs Assessment", description: "Determining transaction volume and compliance needs." },
            { step: 2, title: "Package Selection", description: "Recommending the tier that fits your stage." },
            { step: 3, title: "Migration", description: "Setting up your files in our cloud systems." },
            { step: 4, title: "Execution", description: "Consistent work delivered per package scope." },
            { step: 5, title: "Scaling", description: "Periodic reviews to ensure alignment with growth." }
        ],
        requirements: ["System integration (Bank feeds)", "Document discipline", "Open feedback"],
        timeline: "Monthly recurring service",
        faqs: [
            { question: "Don't know which package?", answer: "Start with a consultation; we'll recommend the most cost-effective tier." },
            { question: "Can I change later?", answer: "Yes, you can move tiers with 30 days' notice." },
            { question: "Setup fees?", answer: "Often included if books are in order; catch-up work is quoted separately." }
        ],
        relatedServices: [
            { slug: "bookkeeping", title: "Bookkeeping" },
            { slug: "tax-services", title: "Tax Services" }
        ],
        stats: [
            { label: "Pricing", value: "Fixed", description: "Predicable monthly fees with no surprises." },
            { label: "Delivery", value: "15th", description: "Reports delivered by mid-month." },
            { label: "Flexibility", value: "High", description: "Scale up or down with growth." }
        ],
        problemsSolved: [
            "Billing uncertainty and surprise invoices",
            "Critical compliance gaps (SARS/CIPC)",
            "Inefficient scaling of finance support",
            "Resource overload from financial admin"
        ],
        complianceContext: "Our packages satisfy SARS and CIPC standards by bundling Income Tax, VAT, and Accounting into one synchronized cycle.",
        visualType: "flow"
    },
    {
        slug: "accounting-services-tenders",
        title: "Accounting Services for Tenders",
        pillar: "Compliance",
        hero: {
            heading: "Professional Accounting Services for Tenders and Bids",
            subheading: "Secure the financial documentation you need to compete effectively for government and private sector contracts."
        },
        whoIsThisFor: [
            "Civil & Construction SMEs",
            "Logistics & Transport Firms",
            "Professional Service Providers (IT, Consulting)",
            "Manufacturing & Supply Companies"
        ],
        deliverables: [
            "Compliant Annual Financial Statements (AFS)",
            "SARS Tax Compliance Status (TCS) Support",
            "CSD Profile Alignment",
            "Solvency & Liquidity Certificates"
        ],
        process: [
            { step: 1, title: "Tender Review", description: "Analyzing financial requirements of your target bid." },
            { step: 2, title: "Gap Analysis", description: "Identifying missing documents or status blocks." },
            { step: 3, title: "Data Finalization", description: "Rapid reconciliation to produce needed reports." },
            { step: 4, title: "Assembly", description: "Compiling a responsive financial pack." },
            { step: 5, title: "On-Call Support", description: "Handling clarification requests from boards." }
        ],
        requirements: ["Tender document specs", "Bid deadline", "Full CSD/SARS transparency"],
        timeline: "7–14 days (or 1-2 days if books are current)",
        faqs: [
            { question: "Tender closes in 24 hours?", answer: "Difficult but possible if bookkeeping is 100% current. Contact us immediately." },
            { question: "CSD number needed?", answer: "Yes, we assist with MAAA number registration and maintenance." },
            { question: "Audited vs Reviewed?", answer: "We advise based on the bid requirements (Audit vs Review)." }
        ],
        relatedServices: [
            { slug: "tax-services", title: "Tax Services" },
            { slug: "accounting", title: "Accounting" }
        ],
        stats: [
            { label: "Success Rate", value: "3x", description: "Higher responsive rate with prepared records." },
            { label: "Turnaround", value: "Fast", description: "Ready to meet tight submission windows." },
            { label: "Compliance", value: "CSD/PPPFA", description: "Built on National Treasury rules." }
        ],
        problemsSolved: [
            "Immediate disqualification on administrative errors",
            "Last-minute panic before tender box closure",
            "CSD profile discrepancies with SARS",
            "Solvency proof and financial questionnaire hurdles"
        ],
        complianceContext: "Our support is built on the PPPFA and CSD rules, ensuring every document is legally compliant and defensible under audit.",
        visualType: "shield"
    }
]
