import AuthWelcomeClient from "@/emails/templates/AuthWelcomeClient";
import AuthVerifyEmail from "@/emails/templates/AuthVerifyEmail";
import AuthPasswordResetRequest from "@/emails/templates/AuthPasswordResetRequest";
import AuthPasswordResetSuccess from "@/emails/templates/AuthPasswordResetSuccess";
import LeadReceivedClient from "@/emails/templates/LeadReceivedClient";
import LeadNewInternal from "@/emails/templates/LeadNewInternal";
import LeadAbandonedReminder from "@/emails/templates/LeadAbandonedReminder";
import LeadConvertedOnboardedClient from "@/emails/templates/LeadConvertedOnboardedClient";
import RequestCreatedClient from "@/emails/templates/RequestCreatedClient";
import RequestCreatedInternal from "@/emails/templates/RequestCreatedInternal";
import RequestDocsNeededClient from "@/emails/templates/RequestDocsNeededClient";
import RequestDocsUploadedClient from "@/emails/templates/RequestDocsUploadedClient";
import RequestDocsUploadedInternal from "@/emails/templates/RequestDocsUploadedInternal";
import RequestStageUpdateClient from "@/emails/templates/RequestStageUpdateClient";
import RequestCompletedClient from "@/emails/templates/RequestCompletedClient";
import RequestDelayedClient from "@/emails/templates/RequestDelayedClient";
import RequestCancelledClient from "@/emails/templates/RequestCancelledClient";
import RequestCancelledInternal from "@/emails/templates/RequestCancelledInternal";
import TaskAssignedInternal from "@/emails/templates/TaskAssignedInternal";
import TaskDueSoonInternal from "@/emails/templates/TaskDueSoonInternal";
import TaskOverdueInternal from "@/emails/templates/TaskOverdueInternal";
import ReminderMissingDocsClient from "@/emails/templates/ReminderMissingDocsClient";
import ReminderConsultationClient from "@/emails/templates/ReminderConsultationClient";
import DigestDailyInternal from "@/emails/templates/DigestDailyInternal";
import SystemRoleChangedInternal from "@/emails/templates/SystemRoleChangedInternal";
import SystemXeroConnectedInternal from "@/emails/templates/SystemXeroConnectedInternal";
import SystemXeroFailedInternal from "@/emails/templates/SystemXeroFailedInternal";
import SystemEmailFailedInternal from "@/emails/templates/SystemEmailFailedInternal";
import LeadTrackRequest from "@/emails/templates/LeadTrackRequest";
import AuthWelcomeLinked from "@/emails/templates/AuthWelcomeLinked";
import AuthFinishSetup from "@/emails/templates/AuthFinishSetup";

import InvoiceIssued from "@/emails/templates/InvoiceIssued";

export const EMAIL_TEMPLATES: Record<string, React.ComponentType<any>> = {
    // Auth
    "auth.welcome.client": AuthWelcomeClient,
    "auth.verify-email": AuthVerifyEmail,
    "auth.password-reset.request": AuthPasswordResetRequest,
    "auth.password-reset.success": AuthPasswordResetSuccess,

    // Leads
    "lead.received.client": LeadReceivedClient,
    "lead.new.internal": LeadNewInternal,
    "lead.abandoned.reminder-1": LeadAbandonedReminder,
    "lead.abandoned.reminder-2": LeadAbandonedReminder, // Reusing same template for now
    "lead.converted.onboarded.client": LeadConvertedOnboardedClient,

    // Requests
    "request.created.client": RequestCreatedClient,
    "request.created.internal": RequestCreatedInternal,
    "request.docs-needed.client": RequestDocsNeededClient,

    // Invoices
    "invoice.issued": InvoiceIssued,
    "request.docs-uploaded.client": RequestDocsUploadedClient,
    "request.docs-uploaded.internal": RequestDocsUploadedInternal,
    "request.stage-update.client": RequestStageUpdateClient,
    "request.completed.client": RequestCompletedClient,
    "request.delayed.client": RequestDelayedClient,
    "request.cancelled.client": RequestCancelledClient,
    "request.cancelled.internal": RequestCancelledInternal,

    // Tasks
    "task.assigned.internal": TaskAssignedInternal,
    "task.due-soon.internal": TaskDueSoonInternal,
    "task.overdue.internal": TaskOverdueInternal,
    "reminder.missing-docs.client": ReminderMissingDocsClient,
    "reminder.consultation.client": ReminderConsultationClient,
    "digest.daily.internal": DigestDailyInternal,

    // System
    "system.role-changed.internal": SystemRoleChangedInternal,
    "system.xero.connected.internal": SystemXeroConnectedInternal,
    "system.xero.failed.internal": SystemXeroFailedInternal,
    "system.email-failed.internal": SystemEmailFailedInternal,

    // New Flow
    "lead.track.request": LeadTrackRequest,
    "auth.welcome.linked": AuthWelcomeLinked,
    "auth.finish.setup": AuthFinishSetup,
};

export const EMAIL_KEYS = Object.keys(EMAIL_TEMPLATES);
