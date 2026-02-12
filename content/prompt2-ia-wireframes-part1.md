# PROMPT 2 — Information Architecture & Wireframes (Part 1)

Sections 1–4: Navigation, Pillars, Page Types, Homepage Wireframe.

---

## 1. TOP-LEVEL NAVIGATION

### 1.1 Header Navigation

| Nav Item | User Intent | Why It Exists | Destination |
|----------|-------------|---------------|-------------|
| Home | Orient, explore, start fresh | Default entry point and trust-building landing | `/` |
| Services | Find a specific service or browse all | Primary conversion path — services are the product | `/services` (hub) with mega menu |
| About | Understand who the firm is | Builds credibility and trust before conversion | `/about` |
| Contact | Reach the firm directly | Low-friction communication for prospects not ready to quote | `/contact` |
| Get a Quote | Submit a structured enquiry | Primary site-wide CTA — captures qualified leads | `/quote` |
| Client Portal | Access existing client tools | Signals professionalism; placeholder for Phase 2 backend | `/portal` (disabled, placeholder) |

### 1.2 Services Mega Menu Structure

The mega menu organises services under 3 pillars. It appears on hover/tap of "Services" in the header.

**Layout logic:** Three columns, one per pillar. Each column lists the pillar name, then its services as links. A final row spans the full width with a link to the Services Hub page.

```
┌─────────────────────────────────────────────────────────────────┐
│  Compliance            │  Accounting            │  Intelligence │
│  ─────────             │  ─────────             │  ──────────── │
│  Tax Services          │  Bookkeeping           │  Advisory     │
│  CIPC Compliance       │  Accounting            │  Data         │
│  Companies Act         │  Payroll Service       │    Analytics  │
│  Tender Readiness      │  Audit Readiness       │  Business IT  │
│                        │                        │    Solutions  │
├─────────────────────────────────────────────────────────────────┤
│                    View All Services →                          │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile:** The mega menu collapses into an accordion. Each pillar is a collapsible group. Services are listed as links within each group.

### 1.3 Footer Navigation Groups

**Group 1: Services**
- Bookkeeping
- Accounting
- Tax Services
- Advisory Services
- CIPC Compliance Services
- Companies Act Compliance
- Payroll Service
- Audit Readiness
- Tender Readiness Support
- Data Analytics Services
- Business IT Solutions

**Group 2: Company**
- About
- How It Works
- Use Cases
- Contact

**Group 3: Resources**
- Blog / Insights (coming soon)
- FAQ (link to service-specific FAQs or a central FAQ page if created)
- HTML Sitemap

**Group 4: Legal**
- Privacy Policy
- Terms of Service

**Bottom bar:**
- Copyright notice
- "Get a Quote" link repeated

---

## 2. SERVICE PILLARS

### Pillar 1: Compliance
- **Purpose:** Help businesses stay on the right side of SARS, CIPC, and the Companies Act.
- **Services:**
  - Tax Services
  - CIPC Compliance Services
  - Companies Act Compliance
  - Tender Readiness Support
- **Why this grouping:** These services all address regulatory and statutory obligations. A business looking for CIPC help is likely also concerned about SARS filings or tender documentation. Grouping them reduces navigation time and encourages cross-service discovery.

### Pillar 2: Accounting
- **Purpose:** Provide financial record-keeping, reporting, payroll, and audit preparation.
- **Services:**
  - Bookkeeping
  - Accounting
  - Payroll Service
  - Audit Readiness
- **Why this grouping:** These are operationally connected — bookkeeping feeds into accounting, accounting feeds into audit readiness, and payroll runs parallel to all of them. Clients who need bookkeeping almost always need one or more of the others.

### Pillar 3: Intelligence
- **Purpose:** Deliver strategic, data-driven, and technology services that go beyond traditional accounting.
- **Services:**
  - Advisory Services
  - Data Analytics Services
  - Business IT Solutions
- **Why this grouping:** These services differentiate the firm from traditional accounting practices. They appeal to growth-oriented businesses that want more than compliance — they want insight and efficiency. Grouping them signals a modern, forward-thinking offering.

---

## 3. PAGE TYPES (CANONICAL LIST)

### 3.1 Home (`/`)
- **Primary goal:** Communicate what the firm does, build trust, and route visitors to the right service or action.
- **Secondary goal:** Provide SEO value as the highest-authority page for the brand.
- **Key user action:** Click "Request a Quote" or navigate to a specific service.

### 3.2 Services Hub (`/services`)
- **Primary goal:** Give an overview of all services, organised by pillar, so visitors can quickly find what they need.
- **Secondary goal:** Act as an SEO parent page that distributes authority to pillar and service pages.
- **Key user action:** Navigate to a pillar or specific service page.

### 3.3 Pillar Overview Page (`/services/compliance`, `/services/accounting`, `/services/intelligence`)
- **Primary goal:** Explain the pillar and list its services with enough context for a visitor to choose the right one.
- **Secondary goal:** Support internal linking between related services.
- **Key user action:** Click through to an individual service page.

### 3.4 Individual Service Page (`/services/[service-slug]`)
- **Primary goal:** Explain the service clearly enough that a qualified visitor is ready to request a quote.
- **Secondary goal:** Answer common questions (FAQ) and build search visibility for the service keyword.
- **Key user action:** Click "Request a Quote" or "Book a Consultation."

### 3.5 About (`/about`)
- **Primary goal:** Build trust by explaining who the firm is, what it values, and how it operates.
- **Secondary goal:** Support brand keywords and "about [firm name]" search queries.
- **Key user action:** Navigate to Services or Contact.

### 3.6 How It Works (`/how-it-works`)
- **Primary goal:** Remove uncertainty by showing the onboarding process step by step.
- **Secondary goal:** Reduce friction for prospects who want to understand the engagement before committing.
- **Key user action:** Click "Book a Consultation" or "Request a Quote."

### 3.7 Use Cases / Industries (`/use-cases`)
- **Primary goal:** Help visitors self-identify by showing scenarios that match their business type.
- **Secondary goal:** Capture long-tail search traffic for "accounting for [industry/scenario]" queries.
- **Key user action:** Navigate to the relevant service or request a quote.

### 3.8 Contact (`/contact`)
- **Primary goal:** Provide a low-barrier way to reach the firm (form, email, phone, location).
- **Secondary goal:** Support local SEO signals (address, map embed, phone number).
- **Key user action:** Submit the general contact form.

### 3.9 Quote / Onboarding (`/quote`)
- **Primary goal:** Capture a structured lead with enough information to prepare a proposal.
- **Secondary goal:** Signal professionalism — the form itself builds confidence.
- **Key user action:** Complete and submit the quote request form.

### 3.10 Privacy Policy (`/privacy`)
- **Primary goal:** Comply with POPIA and build trust with transparency about data handling.
- **Secondary goal:** Required legal page.
- **Key user action:** Read and understand data practices.

### 3.11 Terms of Service (`/terms`)
- **Primary goal:** Define service terms and set expectations.
- **Secondary goal:** Required legal page.
- **Key user action:** Read and understand terms.

### 3.12 HTML Sitemap (`/sitemap`)
- **Primary goal:** Support navigation fallback and crawlability by listing all public pages.
- **Secondary goal:** Improve internal link equity distribution.
- **Key user action:** Find a page that was not visible via navigation.

---

## 4. HOMEPAGE WIREFRAME

Exact section order from PROMPT 0. No sections omitted. No order changes.

### Section 1: Hero
- **Purpose:** Immediately communicate the firm's offer and audience. Drive first action.
- **Content:** H1 headline, subheadline, 2 CTA buttons, trust row (4 items).
- **Primary CTA:** Request a Quote
- **Secondary CTA:** View Our Services

### Section 2: Pillars Overview
- **Purpose:** Introduce the three core pillars so visitors can quickly orient by need.
- **Content:** 3 pillar cards — each with title, 2–3 bullets, and a one-line "why it matters."
- **Primary CTA:** Explore Our Services
- **Secondary CTA:** Request a Quote

### Section 3: Services Preview Grid
- **Purpose:** Display the full breadth of services in a scannable grid layout.
- **Content:** 9 service cards (one per service) with title and one-line description. Grid CTA below.
- **Primary CTA per card:** View Details
- **Grid CTA:** View All Services

### Section 4: How It Works (Timeline)
- **Purpose:** Reduce uncertainty about what happens after first contact.
- **Content:** 5 numbered steps with titles and 1–2 line descriptions. Vertical or horizontal timeline layout.
- **Primary CTA:** Book a Consultation

### Section 5: What You Get (Demo Preview)
- **Purpose:** Make the value tangible — show what clients actually receive.
- **Content:** Short intro paragraph + deliverables list (8 items). Optional: mini dashboard mockup.
- **Primary CTA:** Request a Quote

### Section 6: About Preview
- **Purpose:** Build trust by introducing the firm before the user navigates to the full About page.
- **Content:** 80–120 word paragraph summarising the firm's approach and experience.
- **Primary CTA:** Learn More About Us

### Section 7: Use Cases / Industries
- **Purpose:** Help visitors self-identify by matching their business type to a scenario.
- **Content:** 4 use case cards — each with a title and 1–2 line description.
- **Primary CTA:** Find Your Service
- **Secondary CTA:** Request a Quote

### Section 8: Testimonials
- **Purpose:** Provide social proof from client voices.
- **Content:** 6–9 testimonial cards. Each includes a quote and a label (name, role, business type). Marked as "Sample" until replaced with real testimonials.
- **No CTA in this section.** Social proof leads naturally into the next section.

### Section 9: Resources / Blog Preview
- **Purpose:** Signal expertise and future content value.
- **Content:** 3 blog post previews (title + one-line summary). "Coming soon" label.
- **Primary CTA:** Subscribe for Updates (future)

### Section 10: Final CTA Block
- **Purpose:** Capture visitors who have scrolled the full page with a direct, confident call to action.
- **Content:** CTA headline, reassurance line, CTA button.
- **Primary CTA:** Request a Free Quote

### Section 11: Footer
- **Purpose:** Provide navigation fallback, legal links, and sitemap access.
- **Content:** 4 link groups (Services, Company, Resources, Legal) + bottom bar with copyright and sitemap link.
- **Sitemap link:** "View full site map" — links to `/sitemap`.
