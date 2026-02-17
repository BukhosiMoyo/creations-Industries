export interface TemplateConfig {
    key: string;
    label: string;
    category: "Auth" | "Lead" | "Request" | "Task" | "System" | "Invoice";
    editableFields: string[]; // Keys in the body JSON that are editable
    variables: string[]; // Available placeholders
}

export const EMAIL_TEMPLATE_CONFIG: Record<string, TemplateConfig> = {
    // AUTH
    "auth.welcome.client": {
        key: "auth.welcome.client",
        label: "Welcome Email (Client)",
        category: "Auth",
        editableFields: ["introText", "bodyText", "closingText"],
        variables: ["firstName", "brandName", "actionUrl"]
    },
    "auth.verify-email": {
        key: "auth.verify-email",
        label: "Verify Email",
        category: "Auth",
        editableFields: ["introText", "verifyButtonText"],
        variables: ["verifyUrl"]
    },
    "auth.password-reset.request": {
        key: "auth.password-reset.request",
        label: "Password Reset Request",
        category: "Auth",
        editableFields: [],
        variables: ["resetUrl", "brandName"]
    },
    "auth.password-reset.success": {
        key: "auth.password-reset.success",
        label: "Password Reset Success",
        category: "Auth",
        editableFields: [],
        variables: ["brandName"]
    },
    "auth.welcome.linked": {
        key: "auth.welcome.linked",
        label: "Welcome (Linked Account)",
        category: "Auth",
        editableFields: [],
        variables: ["firstName", "brandName"]
    },
    "auth.finish.setup": {
        key: "auth.finish.setup",
        label: "Finish Account Setup",
        category: "Auth",
        editableFields: [],
        variables: ["firstName", "actionUrl"]
    },

    // LEAD
    "lead.received.client": {
        key: "lead.received.client",
        label: "Lead Received Acknowledgment",
        category: "Lead",
        editableFields: ["intro", "nextSteps", "timeline"],
        variables: ["firstName", "serviceType", "brandName"]
    },
    "lead.new.internal": {
        key: "lead.new.internal",
        label: "New Lead Notification (Internal)",
        category: "Lead",
        editableFields: [],
        variables: ["firstName", "lastName", "email", "serviceType", "dashboardUrl"]
    },
    "lead.abandoned.reminder-1": {
        key: "lead.abandoned.reminder-1",
        label: "Abandoned Cart/Lead Reminder",
        category: "Lead",
        editableFields: [],
        variables: ["firstName", "actionUrl"]
    },
    "lead.converted.onboarded.client": {
        key: "lead.converted.onboarded.client",
        label: "Lead Onboarding Welcome",
        category: "Lead",
        editableFields: [],
        variables: ["firstName", "dashboardUrl"]
    },
    "lead.track.request": {
        key: "lead.track.request",
        label: "Track Request Link",
        category: "Lead",
        editableFields: [],
        variables: ["firstName", "trackUrl"]
    },

    // REQUEST
    "request.created.client": {
        key: "request.created.client",
        label: "Service Request Confirmation",
        category: "Request",
        editableFields: ["confirmationText", "expectations"],
        variables: ["clientName", "requestId", "serviceType", "actionUrl"]
    },
    "request.created.internal": {
        key: "request.created.internal",
        label: "New Request Notification (Internal)",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId", "serviceType", "dashboardUrl"]
    },
    "request.docs-needed.client": {
        key: "request.docs-needed.client",
        label: "Documents Needed Request",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId", "actionUrl"]
    },
    "request.docs-uploaded.client": {
        key: "request.docs-uploaded.client",
        label: "Documents Uploaded Confirmation",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId"]
    },
    "request.docs-uploaded.internal": {
        key: "request.docs-uploaded.internal",
        label: "Documents Uploaded (Internal)",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId", "dashboardUrl"]
    },
    "request.stage-update.client": {
        key: "request.stage-update.client",
        label: "Request Stage Update",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId", "stageName", "actionUrl"]
    },
    "request.completed.client": {
        key: "request.completed.client",
        label: "Request Completed",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId", "reviewUrl"]
    },
    "request.delayed.client": {
        key: "request.delayed.client",
        label: "Request Delayed Notice",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId", "reason"]
    },
    "request.cancelled.client": {
        key: "request.cancelled.client",
        label: "Request Cancelled",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId"]
    },
    "request.cancelled.internal": {
        key: "request.cancelled.internal",
        label: "Request Cancelled (Internal)",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId", "reason"]
    },

    // TASK
    "task.assigned.internal": {
        key: "task.assigned.internal",
        label: "Task Assigned",
        category: "Task",
        editableFields: [],
        variables: ["assigneeName", "taskTitle", "dueDate", "dashboardUrl"]
    },
    "task.due-soon.internal": {
        key: "task.due-soon.internal",
        label: "Task Due Soon",
        category: "Task",
        editableFields: [],
        variables: ["taskTitle", "dueDate"]
    },
    "task.overdue.internal": {
        key: "task.overdue.internal",
        label: "Task Overdue",
        category: "Task",
        editableFields: [],
        variables: ["taskTitle", "dueDate"]
    },

    // SYSTEM & NOTIFICATIONS
    "digest.daily.internal": {
        key: "digest.daily.internal",
        label: "Daily Digest",
        category: "System",
        editableFields: [],
        variables: ["date", "stats"]
    },
    "system.role-changed.internal": {
        key: "system.role-changed.internal",
        label: "User Role Changed",
        category: "System",
        editableFields: [],
        variables: ["userName", "newRole"]
    },
    "system.xero.connected.internal": {
        key: "system.xero.connected.internal",
        label: "Xero Connected",
        category: "System",
        editableFields: [],
        variables: ["orgName"]
    },
    "system.xero.failed.internal": {
        key: "system.xero.failed.internal",
        label: "Xero Sync Failed",
        category: "System",
        editableFields: [],
        variables: ["error"]
    },
    "system.email-failed.internal": {
        key: "system.email-failed.internal",
        label: "Email Delivery Failed",
        category: "System",
        editableFields: [],
        variables: ["recipient", "error"]
    },
    "reminder.missing-docs.client": {
        key: "reminder.missing-docs.client",
        label: "Missing Documents Reminder",
        category: "Request",
        editableFields: [],
        variables: ["clientName", "requestId", "actionUrl"]
    },
    "reminder.consultation.client": {
        key: "reminder.consultation.client",
        label: "Consultation Reminder",
        category: "Lead",
        editableFields: [],
        variables: ["clientName", "time", "joinUrl"]
    },

    // INVOICE (Xero Managed)
    "invoice.issued": {
        key: "invoice.issued",
        label: "Invoice Issued",
        category: "Invoice",
        editableFields: [],
        variables: ["invoiceNumber", "amount", "dueDate"]
    },
    "invoice.reminder": {
        key: "invoice.reminder",
        label: "Invoice Reminder",
        category: "Invoice",
        editableFields: [],
        variables: ["invoiceNumber", "amount", "dueDate"]
    },
    "invoice.paid": {
        key: "invoice.paid",
        label: "Invoice Paid",
        category: "Invoice",
        editableFields: [],
        variables: ["invoiceNumber", "amount"]
    }
};

export const XERO_TEMPLATE_KEYS = ["invoice.issued", "invoice.reminder", "invoice.paid"];
