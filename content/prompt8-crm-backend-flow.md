# PROMPT 8 — CRM/Backend Flow Plan

No code. Architecture, flows, data models, and phased rollout only.

---

## PHASE 1 — EMAIL-ONLY LEADS (NO DATABASE)

### 1.1 Lead Capture Sources

| Source | URL/Location | What Is Captured |
|---|---|---|
| Quote/Onboarding Wizard | `/quote` | Full lead: name, email, phone, company, company type, services needed, description, referral source, conditional fields |
| Contact Form | `/contact` | General enquiry: name, email, phone (optional), subject, message |
| Service Page CTAs | `/services/[slug]` | Routes to `/quote` with service pre-selected via URL parameter |

### 1.2 Phase 1 Flow (Step-by-Step)

```
1. VISITOR fills out form (Quote Wizard or Contact Form)
   ↓
2. CLIENT-SIDE: Form validates per-step (react-hook-form + zod)
   ↓
3. CLIENT-SIDE: Honeypot field checked (if filled → reject silently)
   ↓
4. CLIENT-SIDE: Submit POST to /api/quote or /api/contact
   ↓
5. SERVER-SIDE: Validate all fields again (zod schema, server-side)
   ↓
6. SERVER-SIDE: Rate limit check (max 3 submissions per IP per hour)
   ↓
7. SERVER-SIDE: Generate reference ID (format: CRE-YYYYMMDD-XXXX)
   ↓
8. SERVER-SIDE: Send NEW LEAD email to business inbox(es) via Resend
   ↓
9. SERVER-SIDE: Send CONFIRMATION email to client via Resend
   ↓
10. SERVER-SIDE: Return success response with reference ID
    ↓
11. CLIENT-SIDE: Display confirmation message with reference ID
    (same page, no redirect)
```

### 1.3 Reference ID Format

Format: `CRE-YYYYMMDD-XXXX`
- `CRE` = firm prefix
- `YYYYMMDD` = submission date
- `XXXX` = 4-character alphanumeric (random, uppercase)
- Example: `CRE-20260212-A7K2`

Purpose: Gives the client and firm a shared reference for follow-up. Not a database ID — just a tracking label for email threads.

### 1.4 Email Template Outlines

#### Template 1: New Lead Notification (Internal)

**Sent to:** Business inbox (configurable via env variable)
**Subject:** `New Lead: [Service Name] — [Company Name] (CRE-XXXXXXXX-XXXX)`

```
SECTIONS:
─────────────────────────────────────
HEADER:     "New Lead Received"
REFERENCE:  CRE-20260212-A7K2
TIMESTAMP:  12 February 2026, 14:32 SAST

CONTACT DETAILS:
  Name:       [Full Name]
  Email:      [Email]
  Phone:      [Phone]
  Company:    [Company Name]
  Type:       [Pty Ltd / CC / Sole Proprietor / etc.]

SERVICES REQUESTED:
  - [Service 1]
  - [Service 2]
  (with any conditional fields: compliance deadline,
   software used, employee count)

DESCRIPTION:
  [Client's free-text description]

REFERRAL SOURCE:
  [Google / Referral / Social Media / Other]

FOOTER:
  "Reply to this email to begin your internal process.
   This lead was submitted via [domain]/quote."
─────────────────────────────────────
```

#### Template 2: Client Confirmation

**Sent to:** Client's email address
**Subject:** `We've received your enquiry — [Firm Name] (CRE-XXXXXXXX-XXXX)`

```
SECTIONS:
─────────────────────────────────────
HEADER:     "Thank you for reaching out"

BODY:
  "We've received your enquiry and a member of our team
   will be in touch within one business day.

   For your reference, your submission ID is: CRE-20260212-A7K2

   If you need to reach us before then, you can
   contact us at [phone] or [email]."

WHAT HAPPENS NEXT:
  1. We review your submission
  2. We prepare a scope and proposal
  3. We contact you to discuss next steps

FOOTER:
  [Firm name, address, phone, email]
  "This is an automated confirmation. Please do not reply
   to this email directly."
─────────────────────────────────────
```

#### Template 3: Follow-Up Reminder (Internal)

**Sent to:** Business inbox
**Trigger:** 48 hours after lead received, if no reply detected (Phase 2 feature — placeholder for now)
**Subject:** `Follow-up Reminder: [Company Name] (CRE-XXXXXXXX-XXXX)`

```
SECTIONS:
─────────────────────────────────────
HEADER:     "This lead has not been actioned"

BODY:
  "The following lead was received 48 hours ago and
   has not been marked as contacted.

   Lead: [Company Name]
   Service: [Primary service requested]
   Reference: CRE-20260212-A7K2

   Please follow up or mark as actioned."
─────────────────────────────────────
```

**Phase 1 note:** Follow-up reminders require tracking state, which requires a database. This template is defined now but implemented in Phase 2.

### 1.5 Anti-Spam Measures

| Measure | Implementation | Phase |
|---|---|---|
| Honeypot field | Hidden input field. If filled by bots, submission is silently rejected. | Phase 1 |
| Rate limiting | Max 3 submissions per IP per hour via API route middleware. | Phase 1 |
| Server-side validation | All fields re-validated server-side (zod). No trusting client input. | Phase 1 |
| No attachments | File uploads are disabled. Document handling is Phase 2 (portal). | Phase 1 |
| Email verification | Confirm email format. No email verification link in Phase 1. | Phase 1 |
| CAPTCHA | Not in Phase 1. Evaluate if spam volume warrants it post-launch. | Phase 2 (if needed) |

---

## PHASE 2 — REAL CRM (DATABASE + PIPELINE)

### 2.1 Entity Model

#### Entity: Lead

| Field | Type | Purpose |
|---|---|---|
| id | UUID | Primary key |
| reference_id | String | Human-readable reference (CRE-XXXXXXXX-XXXX) |
| source | Enum | QUOTE_FORM, CONTACT_FORM, MANUAL_ENTRY |
| status | Enum | Pipeline stage (see 2.2) |
| created_at | DateTime | Submission timestamp |
| updated_at | DateTime | Last modification |
| assigned_to | FK → User | Staff member handling this lead |
| notes | Relation | → Notes/Activities |

**Relationships:** belongs to one Company (optional at creation), has many ServiceRequests, has many Notes.

#### Entity: Company

| Field | Type | Purpose |
|---|---|---|
| id | UUID | Primary key |
| name | String | Company name |
| type | Enum | PTY_LTD, CC, SOLE_PROPRIETOR, NON_PROFIT, OTHER |
| registration_number | String (optional) | CIPC registration number |
| tax_number | String (optional) | SARS tax reference |
| industry | String (optional) | Business sector |
| created_at | DateTime | Date company was added |

**Relationships:** has many Contacts, has many ServiceRequests, has many Documents.

#### Entity: Contact

| Field | Type | Purpose |
|---|---|---|
| id | UUID | Primary key |
| company_id | FK → Company | Which company this person belongs to |
| full_name | String | Contact's name |
| email | String | Primary email |
| phone | String (optional) | Phone number |
| role | String (optional) | Position at company |
| is_primary | Boolean | Primary contact for communications |

**Relationships:** belongs to one Company, associated with Leads.

#### Entity: ServiceRequest

| Field | Type | Purpose |
|---|---|---|
| id | UUID | Primary key |
| lead_id | FK → Lead | Originating lead |
| company_id | FK → Company | Client company |
| service_type | Enum | One of the 11 defined services |
| status | Enum | Pipeline stage for this specific service |
| description | Text | Requirements/notes |
| deadline | DateTime (optional) | Compliance deadline if applicable |
| created_at | DateTime | When requested |
| completed_at | DateTime (optional) | When delivered |

**Relationships:** belongs to one Lead, belongs to one Company. One lead can generate multiple ServiceRequests (multi-service selection).

#### Entity: PipelineStage (Reference Data)

| Field | Type | Purpose |
|---|---|---|
| id | UUID | Primary key |
| name | String | Stage name |
| order | Integer | Display order |
| category | Enum | LEAD, SERVICE, GENERAL |
| is_terminal | Boolean | Whether this stage ends the pipeline |

#### Entity: Note / Activity

| Field | Type | Purpose |
|---|---|---|
| id | UUID | Primary key |
| lead_id | FK → Lead (optional) | Associated lead |
| company_id | FK → Company (optional) | Associated company |
| service_request_id | FK → ServiceRequest (optional) | Associated service |
| author_id | FK → User | Who wrote it |
| type | Enum | NOTE, CALL, EMAIL, MEETING, STATUS_CHANGE |
| content | Text | Note body |
| created_at | DateTime | Timestamp |

**Relationships:** belongs to Lead, Company, or ServiceRequest (at least one).

#### Entity: Document (Future)

| Field | Type | Purpose |
|---|---|---|
| id | UUID | Primary key |
| company_id | FK → Company | Owning company |
| service_request_id | FK → ServiceRequest (optional) | Related service |
| file_name | String | Original filename |
| file_type | String | MIME type |
| file_url | String | Storage URL (S3/Supabase Storage) |
| uploaded_by | FK → User or Contact | Who uploaded |
| category | Enum | FINANCIAL, CORPORATE, TAX, PAYROLL, TENDER, OTHER |
| created_at | DateTime | Upload timestamp |

**Phase 2 note:** Documents entity is defined for Phase 3 (portal). Schema is documented now so Phase 2 database design accounts for it.

#### Entity: Task / Reminder (Future)

| Field | Type | Purpose |
|---|---|---|
| id | UUID | Primary key |
| title | String | Task description |
| due_date | DateTime | When it's due |
| assigned_to | FK → User | Responsible staff member |
| lead_id | FK → Lead (optional) | Related lead |
| service_request_id | FK → ServiceRequest (optional) | Related service |
| status | Enum | PENDING, IN_PROGRESS, DONE, OVERDUE |
| created_at | DateTime | Created timestamp |

### 2.2 Pipeline Stages

#### Default Pipeline (All Services)

| Order | Stage | Type | Description |
|---|---|---|---|
| 1 | New | Lead | Submitted, unreviewed |
| 2 | Contacted | Lead | Firm has reached out to the lead |
| 3 | Qualified | Lead | Lead is viable, scope understood |
| 4 | Awaiting Documents | Service | Client needs to provide information/documents |
| 5 | In Progress | Service | Work is underway |
| 6 | Submitted/Filed | Service | Deliverable submitted (to SARS, CIPC, client) |
| 7 | Completed | Terminal | Service delivered and closed |
| 8 | On Hold | Non-terminal | Paused — waiting on client or external factor |
| 9 | Lost | Terminal | Lead did not convert or engagement cancelled |

#### Service-Specific Variations

| Service Category | Additional/Modified Stages |
|---|---|
| **Tax Services** | "Awaiting Documents" → "Tax Return Prepared" → "Filed with SARS" → "Assessment Received" → "Completed" |
| **CIPC Compliance** | "Awaiting Documents" → "Filed with CIPC" → "CIPC Response Received" → "Completed" |
| **Payroll** | "Setup" → "First Run" → "Monthly Processing" (recurring, does not terminate) |
| **Tender Readiness** | "Requirements Gathered" → "Documents Prepared" → "Submission Ready" → "Submitted" → "Completed" |
| **Advisory / Analytics** | "Discovery" → "Analysis" → "Report Delivered" → "Completed" |

### 2.3 Workflow Logic

#### How a Lead Becomes a Client

```
1. LEAD SUBMITTED (New)
   ↓
2. FIRM REVIEWS (move to Contacted)
   ↓
3. INITIAL CONSULTATION (phone/email/meeting)
   ↓
4. SCOPE CONFIRMED (move to Qualified)
   → Company entity created (if not existing)
   → Contact entity linked to Company
   → ServiceRequest(s) created for each service needed
   ↓
5. PROPOSAL SENT (tracked as a Note/Activity)
   ↓
6. PROPOSAL ACCEPTED
   → Lead status → In Progress
   → ServiceRequest(s) → their own pipeline stages
   → Company is now an active client
```

#### How Multiple Services for One Client Are Handled
- One Lead can generate multiple ServiceRequests.
- Each ServiceRequest has its own pipeline stage (one client can have Tax "Filed with SARS" and Bookkeeping "Monthly Processing" simultaneously).
- Company is the stable parent entity. ServiceRequests come and go.
- Dashboard shows: Company view (all services for this client) and Pipeline view (all service requests at a given stage).

#### How Internal Handoffs Work (Future Team Use)
- Each Lead and ServiceRequest has an `assigned_to` field.
- Reassignment creates a Note/Activity of type STATUS_CHANGE.
- Notifications (via Resend) fire on reassignment.
- Role-based access (Phase 2+): staff see only their assigned work; admin sees all.

---

## PHASE 3 — CLIENT PORTAL

### 3.1 Portal Features

| Feature | Purpose | Priority |
|---|---|---|
| **Client Login** | Secure access to their own data. Email + password, or magic link. | Essential |
| **Status Tracking** | View current stage of each ServiceRequest. Read-only. | Essential |
| **Document Upload** | Upload financial records, corporate documents, tax docs. | Essential |
| **Document Library** | View and download previously uploaded and firm-provided documents. | Essential |
| **Message Centre** | Send/receive messages linked to a ServiceRequest. Threaded. | High |
| **Invoice/Statement Access** | View and download invoices. Xero/Sage integration (future). | Medium |
| **Notifications** | Email alerts when status changes, documents requested, deadlines approach. | High |

### 3.2 Portal Security Rules
- All portal routes under `/portal/*`.
- All portal routes are NOINDEX, NOFOLLOW (per PROMPT 6).
- Authentication required for all portal pages.
- Clients can only see their own Company data.
- Document uploads scanned for type/size limits (PDF, XLSX, CSV, JPG, PNG — max 10MB per file).
- No direct database queries from client-side. All data accessed via authenticated API routes.

### 3.3 Portal Data Access

| Data | Client Can | Client Cannot |
|---|---|---|
| Own ServiceRequests | View status, timeline | Edit, delete, reassign |
| Own Documents | Upload, view, download | Delete (firm controls retention) |
| Own Contact Info | View, request changes | Edit directly (firm verifies) |
| Messages | Send, view thread | Delete sent messages |
| Invoices | View, download | Edit, dispute (must contact firm) |
| Other Clients' Data | Nothing | See any other company's data |

---

## AUTOMATION TRIGGERS (RESEND)

### Notification Events

| # | Trigger | Recipients | Email Contains |
|---|---|---|---|
| 1 | **New Lead Submitted** | Business inbox | Full lead details, reference ID, CTA to review |
| 2 | **Lead Stage Changed** | Assigned staff member | Lead name, old stage → new stage, who changed it |
| 3 | **Documents Requested** | Client (contact email) | Which documents needed, upload link (portal), deadline |
| 4 | **Documents Uploaded** | Assigned staff member | Client name, document list, link to review |
| 5 | **Overdue Follow-Up** | Assigned staff member + admin | Lead/service reference, days overdue, CTA to action |
| 6 | **Service Completed** | Client (contact email) | Service name, summary, next steps, feedback request |
| 7 | **Proposal Sent** | Client (contact email) | Scope summary, timeline, CTA to accept/discuss |
| 8 | **Upcoming Compliance Deadline** (future) | Client + assigned staff | Deadline date, what's needed, current status |
| 9 | **New Message in Portal** (future) | Client or staff (whoever didn't send it) | Message preview, link to thread |
| 10 | **Invoice Issued** (future) | Client (contact email) | Amount, due date, download link |

### Automation Phases

| Trigger | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| New Lead | ✅ Email | ✅ Email + DB record | ✅ |
| Stage Change | ❌ | ✅ Email | ✅ |
| Documents Requested | ❌ | ✅ Email (manual) | ✅ Portal + Email |
| Documents Uploaded | ❌ | ❌ | ✅ Portal trigger |
| Overdue Follow-Up | ❌ | ✅ Scheduled check | ✅ |
| Service Completed | ❌ | ✅ Email | ✅ Portal + Email |
| Proposal Sent | ❌ | ✅ Email | ✅ |
| Compliance Deadline | ❌ | ❌ | ✅ Scheduled |
| Portal Message | ❌ | ❌ | ✅ |
| Invoice Issued | ❌ | ❌ | ✅ |

---

## SECURITY & COMPLIANCE

### Security Rules

| Rule | Phase | Details |
|---|---|---|
| Server-side validation | Phase 1 | All form inputs validated with zod on the API route. Never trust client input. |
| Secure environment variables | Phase 1 | Resend API key, business email, domain — all in `.env.local`, never in client code. |
| HTTPS only | Phase 1 | All traffic over HTTPS. HTTP redirects to HTTPS. |
| Rate limiting | Phase 1 | Max 3 form submissions per IP per hour. |
| Honeypot spam prevention | Phase 1 | Hidden field rejects automated submissions. |
| Audit logs | Phase 2 | Every status change, assignment, and data modification is logged with timestamp, user, and action. |
| Role-based access | Phase 2 | Staff roles: Admin (full access), Manager (team view), Staff (own assignments). |
| Authentication | Phase 3 | Client portal login via email+password or magic link. Session management via secure HTTP-only cookies. |
| Data isolation | Phase 3 | Clients can only access their own Company data. Enforced at API layer, not just UI. |
| POPIA awareness | All phases | Personal data (names, emails, phone numbers, financial documents) is handled responsibly. Privacy policy explains what is collected, why, and how long it is retained. No data sold. No unnecessary data collection. |

**POPIA note:** This is not legal advice. The firm should consult with a POPIA compliance specialist for formal compliance. The system is designed to minimise data collection and handle data responsibly, but formal POPIA compliance requires legal review.

---

## RISKS & MITIGATION

| # | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| 1 | **Spam submissions** overwhelm inbox | Medium | High | Honeypot + rate limiting + server validation. Add CAPTCHA in Phase 2 if needed. |
| 2 | **Email delivery failures** (Resend outage) | High | Low | Resend has high reliability. Log submissions server-side even if email fails (add in-memory queue in Phase 1, DB in Phase 2). |
| 3 | **Lost leads** due to email-only tracking | High | Medium | Phase 1 risk. Mitigate by moving to Phase 2 (DB) quickly. Reference IDs help track via email search. |
| 4 | **Data breach** of client information | Critical | Low | Server-side only handling. No client data in localStorage or client-side state after submission. HTTPS enforced. |
| 5 | **Duplicate submissions** (user double-clicks) | Low | Medium | Disable submit button after first click. Server-side deduplication by email+timestamp window (5 minutes). |
| 6 | **Missing follow-ups** (no automated reminders in Phase 1) | Medium | High | Phase 1 limitation. Manual tracking via email. Phase 2 adds automated reminders. |
| 7 | **Portal security vulnerabilities** | Critical | Medium | Phase 3 concern. Enforce data isolation at API layer. Penetration testing before portal launch. |
| 8 | **Phase 2 migration complexity** (email-only → DB) | Medium | Medium | Entity model defined now (Phase 2 section). Phase 1 reference IDs can be imported as initial records. |
| 9 | **POPIA non-compliance** | High | Medium | Privacy policy in place. Minimal data collection. Consult legal specialist before handling sensitive financial documents. |
| 10 | **Scope creep** in CRM features | Medium | High | Strict phased rollout. Each phase has a defined scope. No Phase 2 features built during Phase 1. |

---

## PHASED ROLLOUT CHECKLIST

### Phase 1: Email-Only Leads (Build Now)

| # | Task | Depends On | Priority |
|---|---|---|---|
| 1 | Set up Resend account + verify domain | Domain access | Critical |
| 2 | Create `/api/quote` route handler | Next.js project scaffold | Critical |
| 3 | Create `/api/contact` route handler | Next.js project scaffold | Critical |
| 4 | Implement server-side zod validation | API routes | Critical |
| 5 | Implement honeypot field in forms | Form components | High |
| 6 | Implement rate limiting middleware | API routes | High |
| 7 | Build New Lead email template (Resend) | Resend setup | Critical |
| 8 | Build Client Confirmation email template | Resend setup | Critical |
| 9 | Generate reference IDs (CRE-XXXXXXXX-XXXX) | API routes | High |
| 10 | Display confirmation message on form submission | Form components | High |
| 11 | Test end-to-end: form → API → emails | All above | Critical |

### Phase 2: Database + Pipeline (Build Next)

| # | Task | Depends On | Priority |
|---|---|---|---|
| 1 | Set up database (Supabase / PlanetScale / Neon) | Hosting decision | Critical |
| 2 | Create Prisma schema from entity model | Database setup | Critical |
| 3 | Migrate Phase 1 email leads into Lead table | Database + import script | High |
| 4 | Build internal dashboard (admin-only) | Auth + database | Critical |
| 5 | Implement pipeline view (kanban or list) | Dashboard | High |
| 6 | Implement lead detail view | Dashboard | High |
| 7 | Add stage change automation (Resend notifications) | Pipeline logic | Medium |
| 8 | Add follow-up reminder scheduling | Task system | Medium |
| 9 | Implement role-based access | Auth system | High |
| 10 | Add audit logging | Database | Medium |

### Phase 3: Client Portal (Build Later)

| # | Task | Depends On | Priority |
|---|---|---|---|
| 1 | Implement client authentication (email+password or magic link) | Auth system | Critical |
| 2 | Build portal layout (separate from public site) | Auth + routes | Critical |
| 3 | Implement status tracking view | ServiceRequest data | High |
| 4 | Implement document upload (S3/Supabase Storage) | Storage setup | High |
| 5 | Implement document library | Storage + database | High |
| 6 | Implement message centre | Database + real-time (optional) | Medium |
| 7 | Implement invoice/statement access | Xero/Sage integration | Low |
| 8 | Add portal notification emails | Resend templates | Medium |
| 9 | Security audit + penetration testing | All portal features | Critical |
| 10 | POPIA compliance review | Legal consultation | Critical |
