import { z } from "zod"

// -----------------------------------------------------------------------------
// ENUMS & TYPES
// -----------------------------------------------------------------------------

export type ServiceCategory =
    | "Accounting Services"
    | "Tax & SARS Services"
    | "Bookkeeping Services"
    | "Company & CIPC Services"
    | "Compliance & Registrations"
    | "Shelf Companies"

export const ServiceCategories: ServiceCategory[] = [
    "Accounting Services",
    "Tax & SARS Services",
    "Bookkeeping Services",
    "Company & CIPC Services",
    "Compliance & Registrations",
    "Shelf Companies"
]

export interface ServiceOffering {
    slug: string
    category: ServiceCategory
    label: string
    description: string
    urgency: "Low" | "Medium" | "High" | "Urgent"
    requiredDocs?: string[]
}

// -----------------------------------------------------------------------------
// SERVICE CATALOG
// -----------------------------------------------------------------------------

export const SERVICE_CATALOG: ServiceOffering[] = [
    // ACCOUNTING
    { slug: "monthly-accounting-services", category: "Accounting Services", label: "Monthly Accounting", description: "Full-service accounting for ongoing compliance.", urgency: "Medium", requiredDocs: ["Bank Statements (3 months)", "Last Annual Financial Statements", "ID Copy", "CIPC Documents"] },
    { slug: "financial-statements-preparation", category: "Accounting Services", label: "Financial Statements", description: "Preparation of Annual Financial Statements (AFS).", urgency: "Medium", requiredDocs: ["Trial Balance", "Fixed Asset Register", "Bank Confirmations"] },
    { slug: "management-accounts", category: "Accounting Services", label: "Management Accounts", description: "Monthly or quarterly performance reports.", urgency: "Low", requiredDocs: ["Bank Statements", "Sales & Expense Ledgers"] },
    { slug: "business-budgeting-forecasting", category: "Accounting Services", label: "Budgeting & Forecasting", description: "Forward-looking financial planning.", urgency: "Low", requiredDocs: ["Historical AFS", "Business Plan"] },
    { slug: "cash-flow-management", category: "Accounting Services", label: "Cash Flow Management", description: "Strategies to optimize liquidity.", urgency: "High", requiredDocs: ["Debtors Age Analysis", "Creditors Age Analysis"] },
    { slug: "payroll-service", category: "Accounting Services", label: "Payroll Services", description: "Payslips, EMP201s, and UIF declarations.", urgency: "Urgent", requiredDocs: ["Employee List", "Salary Schedule", "ID Copies"] },

    // TAX
    { slug: "vat-registration-returns", category: "Tax & SARS Services", label: "VAT Registration & Returns", description: "VAT registration and bi-monthly submissions.", urgency: "High", requiredDocs: ["Bank Statements", "Invoices (Sales/Purchase)", "ID Copy", "CIPC Documents"] },
    { slug: "business-income-tax-returns", category: "Tax & SARS Services", label: "Business Tax (CIT)", description: "Annual corporate income tax returns (IT14).", urgency: "Medium", requiredDocs: ["Annual Financial Statements", "Trial Balance"] },
    { slug: "sars-penalties-disputes", category: "Tax & SARS Services", label: "SARS Penalties & Disputes", description: "Negotiation and dispute resolution.", urgency: "Urgent", requiredDocs: ["SARS Correspondence", "Proof of Payments", "Dispute Motivation"] },
    { slug: "tax-clearance-certificates", category: "Tax & SARS Services", label: "Tax Clearance Certificate", description: "Application for Good Standing status.", urgency: "High", requiredDocs: [] },
    { slug: "personal-tax", category: "Tax & SARS Services", label: "Personal Income Tax", description: "Filing for directors and individuals (IT12).", urgency: "Medium", requiredDocs: ["IRP5 Certificates", "Medical Aid Certificate", "Retirement Annuity Certificate"] },
    { slug: "paye-registration", category: "Tax & SARS Services", label: "PAYE Registration", description: "Payroll tax registration for employers.", urgency: "High", requiredDocs: ["EMP101 Form", "Bank Confirmation Letter", "ID Copy"] },
    { slug: "provisional-tax", category: "Tax & SARS Services", label: "Provisional Tax (IRP6)", description: "Bi-annual tax estimates and payments.", urgency: "Urgent", requiredDocs: ["Management Accounts", "Cash Flow Forecast"] },
    { slug: "emp201-submissions", category: "Tax & SARS Services", label: "EMP201/EMP501", description: "Monthly payroll tax declarations.", urgency: "Urgent", requiredDocs: ["Payroll Summary Report"] },
    { slug: "tax-debt-arrangements", category: "Tax & SARS Services", label: "Tax Debt Compromise", description: "Negotiating payment plans with SARS.", urgency: "Urgent", requiredDocs: ["Bank Statements", "Cash Flow Forecast", "Asset Register"] },
    { slug: "public-officer", category: "Tax & SARS Services", label: "Public Officer Appt", description: "Appointing legal SARS representative.", urgency: "High", requiredDocs: ["ID Copy", "Board Resolution", "Proof of Residence"] },
    { slug: "trust-tax", category: "Tax & SARS Services", label: "Trust Tax Services", description: "Registration and filing for Trusts.", urgency: "Medium", requiredDocs: ["Trust Deed", "Letters of Authority", "Trustee IDs"] },
    { slug: "pbo-registration", category: "Tax & SARS Services", label: "PBO Registration", description: "Tax exemption for Non-Profits.", urgency: "Low", requiredDocs: ["NPO Certificate", "Constitution", "List of Activities"] },

    // BOOKKEEPING
    { slug: "monthly-bookkeeping", category: "Bookkeeping Services", label: "Monthly Bookkeeping", description: "Capturing and reconciling transactions.", urgency: "Medium", requiredDocs: ["Bank Statements", "Invoices / Receipts"] },
    { slug: "catch-up-bookkeeping", category: "Bookkeeping Services", label: "Catch-up / Cleanup", description: "Bringing backlog accounts up to date.", urgency: "Medium", requiredDocs: ["Past Bank Statements (12 months+)"] },
    { slug: "xero-support", category: "Bookkeeping Services", label: "Xero Support & Setup", description: "Migration to Xero or fixing setup errors.", urgency: "Low", requiredDocs: [] },

    // COMPANY SERVICES
    { slug: "company-registration", category: "Company & CIPC Services", label: "Company Registration", description: "New PTY (Ltd) registration.", urgency: "High", requiredDocs: ["ID Copies of Directors", "Proof of Address", "3 Proposed Names"] },
    { slug: "company-amendments", category: "Company & CIPC Services", label: "Company Amendments", description: "Changing directors, address, or details.", urgency: "Medium", requiredDocs: ["Board Resolution", "Director IDs", "Signed Mandate"] },
    { slug: "annual-returns-filing", category: "Company & CIPC Services", label: "Annual Returns Filing", description: "Mandatory CIPC annual duty filing.", urgency: "Medium", requiredDocs: ["Turnover Figure", "CIPC Disclosure Cert"] },
    { slug: "company-deregistration", category: "Company & CIPC Services", label: "Company Deregistration", description: "Closing down a company legally.", urgency: "Low", requiredDocs: ["Board Resolution", "Tax Clearance Certificate"] },
    { slug: "beneficial-ownership", category: "Company & CIPC Services", label: "Beneficial Ownership", description: "Mandatory BO registry filing.", urgency: "High", requiredDocs: ["Shareholder Register", "ID Copies of Beneficial Owners"] },

    // SHELF COMPANIES
    { slug: "shelf-companies", category: "Shelf Companies", label: "Shelf Companies", description: "Ready-to-trade companies.", urgency: "Urgent", requiredDocs: ["ID Copies of New Directors"] },

    // COMPLIANCE
    { slug: "coida-registration", category: "Compliance & Registrations", label: "COIDA / Letter of Good Standing", description: "Workmen's Comp registration.", urgency: "High", requiredDocs: ["CIPC Documents", "ID Copy", "Staff Count"] },
    { slug: "uif-registration", category: "Compliance & Registrations", label: "UIF Registration", description: "Dept of Labour registration.", urgency: "Medium", requiredDocs: ["CIPC Documents", "ID Copy", "UI-8 / UI-19 Forms"] },
    { slug: "csd-registration", category: "Compliance & Registrations", label: "CSD Registration", description: "Central Supplier Database for tenders.", urgency: "High", requiredDocs: ["Tax Clearance Pin", "CIPC Documents", "Bank Confirmation Letter"] },
    { slug: "cidb-registration", category: "Compliance & Registrations", label: "CIDB Registration", description: "Construction Industry Development Board.", urgency: "Medium", requiredDocs: ["Annual Financial Statements", "Track Record Documents"] },
    { slug: "import-export-license", category: "Compliance & Registrations", label: "Import/Export License", description: "Customs code registration.", urgency: "Medium", requiredDocs: ["Bank Confirmation Letter", "CIPC Documents", "ID Copy", "Proof of Address"] },
    { slug: "b-bbee-certificate", category: "Compliance & Registrations", label: "B-BBEE Affidavit/Cert", description: "Black Economic Empowerment status.", urgency: "High", requiredDocs: ["ID Copies", "Share Register", "Affidavit Form (Sworn)"] },
    { slug: "nhbrc-registration", category: "Compliance & Registrations", label: "NHBRC Registration", description: "Home Builders Registration Council.", urgency: "Low", requiredDocs: ["Technical Exam Result", "ID Copy", "CIPC Documents"] },
    { slug: "trade-license", category: "Compliance & Registrations", label: "Trade License", description: "Municipal compliance for trades.", urgency: "Low", requiredDocs: ["Zoning Certificate", "Health Dept Certificate"] }
]

// -----------------------------------------------------------------------------
// FIELD DEFINITIONS
// -----------------------------------------------------------------------------

export type FieldType = "text" | "email" | "tel" | "select" | "textarea" | "number" | "radio" | "checkbox"

export interface FieldDefinition {
    key: string
    label: string
    type: FieldType
    options?: { label: string; value: string }[]
    placeholder?: string
    required?: boolean
    validation?: z.ZodSchema
    condition?: (category: ServiceCategory | undefined, slug: string | undefined) => boolean
}

// 1. GLOBAL FIELDS (Step 1)
export const GLOBAL_FIELDS: FieldDefinition[] = [
    {
        key: "fullName", label: "Full Name", type: "text", required: true,
        validation: z.string().min(3, "Name must be at least 3 characters")
    },
    {
        key: "email", label: "Email Address", type: "email", required: true,
        validation: z.string().email("Invalid email address")
    },
    {
        key: "phone", label: "Phone Number", type: "tel", required: true,
        validation: z.string().min(10, "Phone number must be valid")
    },
    {
        key: "city", label: "Nearest City", type: "select", required: true,
        options: [
            { label: "Johannesburg", value: "Johannesburg" },
            { label: "Pretoria", value: "Pretoria" },
            { label: "Centurion", value: "Centurion" },
            { label: "Cape Town", value: "Cape Town" },
            { label: "Durban", value: "Durban" },
            { label: "Other", value: "Other" }
        ]
    },
    {
        key: "urgency", label: "How soon do you need this?", type: "select", required: true,
        options: [
            { label: "As soon as possible", value: "Urgent_24_48h" },
            { label: "Within a week", value: "Soon_7d" },
            { label: "Just planning / researching", value: "Flexible_30d" }
        ]
    },
    {
        key: "existingClient", label: "Are you an existing client?", type: "radio", required: true,
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
        ]
    }
]

// 2. BUSINESS CONTEXT FIELDS (Step 3 - Conditional)
export const BUSINESS_FIELDS: FieldDefinition[] = [
    { key: "companyName", label: "Company Name", type: "text", required: false, placeholder: "Optional if new business" },
    {
        key: "industry", label: "Industry", type: "select", required: false,
        options: [
            { label: "Construction", value: "Construction" },
            { label: "Consulting / Professional", value: "Consulting" },
            { label: "Retail / E-commerce", value: "Retail" },
            { label: "Logistics / Transport", value: "logistics" },
            { label: "Technology / IT", value: "Tech" },
            { label: "Healthcare", value: "Healthcare" },
            { label: "Other", value: "Other" }
        ]
    },
    {
        key: "turnoverRange", label: "Annual Turnover", type: "select", required: false,
        condition: (cat, slug) => cat === "Tax & SARS Services" || cat === "Accounting Services",
        options: [
            { label: "New / Pre-revenue", value: "New" },
            { label: "Under R1 Million", value: "<1m" },
            { label: "R1m - R5m", value: "1m-5m" },
            { label: "R5m - R20m", value: "5m-20m" },
            { label: "Over R20m", value: ">20m" }
        ]
    },
    {
        key: "accountingSoftware", label: "Current Software", type: "select", required: false,
        condition: (cat, slug) => cat === "Accounting Services" || cat === "Bookkeeping Services",
        options: [
            { label: "None / Excel", value: "None" },
            { label: "Xero", value: "Xero" },
            { label: "Sage", value: "Sage" },
            { label: "QuickBooks", value: "QuickBooks" },
            { label: "Other", value: "Other" }
        ]
    },
    {
        key: "employeeCount", label: "Number of Employees", type: "number", required: true, placeholder: "1",
        condition: (cat, slug) => slug === "payroll-service" || slug === "coida-registration"
    }
]

// 3. SERVICE SPECIFIC FIELDS (Step 3 - Dynamic)

export const SHELF_COMPANY_FIELDS: FieldDefinition[] = [
    {
        key: "shelfType", label: "Company Type Needed", type: "select", required: true,
        options: [
            { label: "Standard Shelf Company (No VAT)", value: "Standard" },
            { label: "Shelf Company with VAT Number", value: "With_VAT" },
            { label: "Shelf Company with VAT + Import/Export", value: "With_VAT_Customs" }
        ]
    },
    { key: "directorCount", label: "Number of Directors", type: "number", required: true, placeholder: "1" }
]

export const VAT_FIELDS: FieldDefinition[] = [
    {
        key: "vatReason", label: "Reason for Registration", type: "select", required: true,
        options: [
            { label: "Voluntary Registration (Turnover > R50k)", value: "Voluntary" },
            { label: "Mandatory Registration (Turnover > R1m)", value: "Mandatory" }
        ]
    },
    {
        key: "tradingTime", label: "How long have you traded?", type: "select", required: true,
        options: [
            { label: "New Business", value: "New" },
            { label: "Less than 3 months", value: "<3m" },
            { label: "More than 3 months", value: ">3m" }
        ]
    }
]

export const COMPANY_REG_FIELDS: FieldDefinition[] = [
    {
        key: "companyType", label: "Entity Type", type: "select", required: true,
        options: [
            { label: "Pty (Ltd)", value: "Pty" },
            { label: "Non-Profit (NPC)", value: "NPC" },
            { label: "Inc (Professional)", value: "Inc" }
        ]
    },
    { key: "proposedNames", label: "Proposed Names (Optional)", type: "textarea", required: false, placeholder: "List up to 3 names..." }
]

export const PAYROLL_FIELDS: FieldDefinition[] = [
    {
        key: "payFrequency", label: "Pay Cycle", type: "select", required: true,
        options: [
            { label: "Monthly", value: "Monthly" },
            { label: "Weekly", value: "Weekly" },
            { label: "Fortnightly", value: "Fortnightly" }
        ]
    }
]

// Helper to get fields for a specific slug
export function getServiceSpecificFields(slug: string): FieldDefinition[] {
    switch (slug) {
        case "shelf-companies": return SHELF_COMPANY_FIELDS
        case "vat-registration-returns": return VAT_FIELDS
        case "company-registration": return COMPANY_REG_FIELDS
        case "payroll-service": return PAYROLL_FIELDS
        // Add more mappings as needed
        default: return []
    }
}
