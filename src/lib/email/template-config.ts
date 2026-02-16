export interface TemplateConfig {
    key: string;
    label: string;
    category: "Auth" | "Lead" | "Request" | "Task" | "System" | "Invoice";
    editableFields: string[]; // Keys in the body JSON that are editable
    variables: string[]; // Available placeholders
}

export const EMAIL_TEMPLATE_CONFIG: Record<string, TemplateConfig> = {
    "auth.welcome.client": {
        key: "auth.welcome.client",
        label: "Welcome Email (Client)",
        category: "Auth",
        editableFields: ["introText", "bodyText", "closingText"],
        variables: ["firstName", "brandName", "actionUrl"]
    },
    "lead.received.client": {
        key: "lead.received.client",
        label: "Lead Received Acknowledgment",
        category: "Lead",
        editableFields: ["intro", "nextSteps", "timeline"],
        variables: ["firstName", "serviceType", "brandName"]
    },
    "request.created.client": {
        key: "request.created.client",
        label: "New Service Request Confirmation",
        category: "Request",
        editableFields: ["confirmationText", "expectations"],
        variables: ["clientName", "requestId", "serviceType", "actionUrl"]
    },
    // Add more as needed based on inventory
    "invoice.issued": {
        key: "invoice.issued",
        label: "Invoice Issued",
        category: "Invoice",
        editableFields: [],
        variables: ["invoiceNumber", "amount", "dueDate"]
    }
};

export const XERO_TEMPLATE_KEYS = ["invoice.issued", "invoice.reminder", "invoice.paid"];
