# PROMPT 2 — Information Architecture & Wireframes (Part 3)

Sections 9–12: Forms, Backend Mapping, UX Safety Rules, Common Failures.

---

## 9. FORMS & ONBOARDING (STRUCTURE ONLY)

### 9.1 General Contact Form

**When it appears:** On the Contact page (`/contact`).

**What it collects:**
- Full name
- Email address
- Phone number (optional)
- Subject (dropdown: General Enquiry, Support, Partnership, Other)
- Message (free text, max 500 characters)

**What it does NOT collect:**
- Company details (not needed for general contact)
- Service selection (that is for the quote form)
- Documents or attachments (Phase 2)

---

### 9.2 Quote / Onboarding Form

**When it appears:** On the Quote page (`/quote`). Also accessible via all "Request a Quote" CTAs site-wide.

**What it collects:**
- Full name
- Email address
- Phone number
- Company name
- Company type (dropdown: Sole Proprietor, Close Corporation, Pty Ltd, Non-Profit, Other)
- Service(s) needed (multi-select checkboxes matching the 11 services)
- Brief description of needs (free text, max 800 characters)
- How did you hear about us? (dropdown: Google, Referral, Social Media, Other)

**Service-specific branching logic:**
- If the user selects any Compliance service (Tax, CIPC, Companies Act, Tender Readiness), an optional field appears: "Do you have any upcoming compliance deadlines?" (free text).
- If the user selects Bookkeeping or Accounting, an optional field appears: "What accounting software do you currently use?" (dropdown: Xero, Sage, QuickBooks, None, Other).
- If the user selects Payroll, an optional field appears: "How many employees do you have?" (dropdown: 1–5, 6–20, 21–50, 51–100, 100+).

**What it does NOT collect:**
- Financial documents (Phase 2 — client portal upload)
- Detailed pricing preferences (pricing is proposal-based)
- ID numbers or sensitive personal information

---

### 9.3 Form Behaviour Rules

1. All forms submit to a server-side API route (Next.js route handler).
2. Submissions are sent via Resend to the firm's inbox.
3. The submitter receives a confirmation email.
4. No data is stored in a database in Phase 1 — email only.
5. All forms must include honeypot spam prevention (hidden field).
6. All forms must show clear validation errors inline, not in alert boxes.
7. After successful submission, the user sees a confirmation message on the same page (no redirect to a separate page).

---

## 10. FRONTEND → BACKEND MAPPING (FUTURE-READY)

### 10.1 Lead Stages

| Stage | Description | Trigger |
|-------|-------------|---------|
| New | Lead submitted via form, unreviewed | Quote or contact form submission |
| Qualified | Firm has reviewed and confirmed the lead is viable | Manual review (future CRM) |
| In Progress | Engagement has started, services being delivered | Proposal accepted (future) |
| Complete | Engagement delivered or closed | Service delivery confirmed (future) |

### 10.2 How Service Selection Affects Workflow

- **Compliance-heavy services** (Tax, CIPC, Companies Act, Tender Readiness): These leads typically involve deadlines and regulatory urgency. Future backend should flag compliance leads for priority triage.
- **Accounting services** (Bookkeeping, Accounting, Payroll, Audit Readiness): These are usually ongoing engagements with monthly deliverables. Future backend should support recurring workflow triggers.
- **Advisory / Intelligence services** (Advisory, Data Analytics, IT): These are project-based or ongoing advisory. Future backend should support milestone tracking and deliverable sign-off.

### 10.3 Where Documents Will Later Attach

In Phase 2 (client portal), the following document types will need upload and storage:
- Financial records (bank statements, invoices, receipts)
- Corporate documents (CIPC certificates, MOI, resolutions)
- Tax documents (prior returns, SARS correspondence)
- Payroll inputs (employee details, salary schedules)
- Tender requirements (bid documents, checklists)

**Phase 1 implication:** The quote form should NOT attempt to collect documents. The form structure should be clean and fast. Document handling is a portal feature.

---

## 11. NON-NEGOTIABLE UX RULES

1. **No hidden sections.** Every section listed in the wireframe must be rendered on first load. No use of display:none or visibility:hidden on content sections.

2. **No conditional rendering that removes content.** Sections must not disappear based on viewport, user state, or JavaScript conditions. Collapsed sections (like FAQ accordions) are acceptable only if the trigger to expand is always visible.

3. **No dynamic layout shifts.** No content may push other content out of position after initial render. Images must have explicit dimensions. Fonts must use font-display: swap.

4. **No content behind overlays.** Background patterns, glows, and decorations must never sit above text or interactive elements. All overlays must be pointer-events-none.

5. **All sections visible by default.** Sections must not require user interaction to become visible (except FAQ accordion answers and mega menu contents).

6. **No scroll hijacking.** The page must scroll normally. No custom scroll behaviours, parallax effects that alter scroll speed, or scroll-locked sections.

7. **No horizontal scroll.** No section or component may cause horizontal overflow on any viewport width above 320px.

8. **No fixed-height containers for dynamic content.** Sections with variable content (testimonials, FAQs, service lists) must use flexible height. No truncation of content.

9. **All interactive elements must be reachable.** Buttons, links, and form fields must be tappable on mobile (minimum 44×44px tap target) and reachable without horizontal scrolling.

10. **All navigation must work without JavaScript on first render.** Links must be standard anchor tags. The mega menu on mobile must degrade gracefully.

---

## 12. COMMON FAILURES TO AVOID

### 10 Mistakes That Cause Broken Layouts

1. Applying `overflow-hidden` on a container that has absolutely positioned children — clips decorations and floating elements.
2. Using fixed pixel heights on sections with dynamic content — causes text overflow and clipping.
3. Setting a hero section to `100vh` without accounting for mobile browser chrome — content gets cut off on iOS/Android.
4. Nesting CSS Grid or Flexbox containers without clear sizing — causes unexpected collapse on small screens.
5. Using `position: fixed` on background patterns without `pointer-events: none` — blocks clicks on content.
6. Loading web fonts without `font-display: swap` — causes content layout shift on render.
7. Forgetting `max-width` on images inside flex containers — images stretch to fill and break layout.
8. Using `z-index` without a defined layer system — elements randomly appear above or behind each other.
9. Mega menus that overflow the viewport width — causes horizontal scroll on mobile.
10. Applying `transform` or `will-change` on parent containers — creates stacking context that breaks child z-index expectations.

### 10 Mistakes That Confuse Users

1. Using "Learn More" as the only CTA — does not communicate what the user will get.
2. Hiding relevant services behind a "show more" toggle — users miss services they need.
3. Placing the quote CTA only at the bottom — users ready to act must scroll past 10 sections.
4. Using vague pillar or service names — "Solutions" means nothing without specifics.
5. Not indicating the current page in navigation — users lose orientation.
6. Showing a "Client Portal" link that leads to a dead page with no explanation — erodes trust.
7. Mixing unrelated services in one section — undermines the pillar grouping logic.
8. Using different terminology for the same service on different pages — creates confusion.
9. Not showing a confirmation after form submission — users resubmit or doubt their action.
10. Inconsistent CTA labels — "Get a Quote", "Request a Quote", "Ask for a Quote" on different pages creates uncertainty about whether they go to the same place.
