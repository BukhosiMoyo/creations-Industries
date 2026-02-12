# PROMPT 2 — Information Architecture & Wireframes (Part 2)

Sections 5–8: Services Hub, Pillar Pages, Service Pages, User Flows.

---

## 5. SERVICES HUB WIREFRAME (`/services`)

### How Pillars Are Introduced
The Services Hub opens with a short introductory paragraph (2–3 sentences) that frames the firm's service range. Below the intro, the three pillars are presented as distinct groups, each with a heading, a one-line description, and its service list.

### Layout Structure
```
┌─────────────────────────────────────────────┐
│  H1: Our Services                           │
│  Intro paragraph (2–3 sentences)            │
├─────────────────────────────────────────────┤
│  Pillar 1: Compliance                       │
│  One-line pillar description                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ Service  │ │ Service  │ │ Service  │    │
│  │ Card     │ │ Card     │ │ Card     │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│  ┌──────────┐                               │
│  │ Service  │                               │
│  │ Card     │                               │
│  └──────────┘                               │
├─────────────────────────────────────────────┤
│  Pillar 2: Accounting                       │
│  (same structure — 4 service cards)         │
├─────────────────────────────────────────────┤
│  Pillar 3: Intelligence                     │
│  (same structure — 3 service cards)         │
├─────────────────────────────────────────────┤
│  CTA: Request a Quote                       │
└─────────────────────────────────────────────┘
```

### Navigation Path
- **Services Hub** shows all pillars and all services.
- Clicking a **pillar heading** goes to the Pillar Overview page.
- Clicking a **service card** goes directly to the Individual Service page.
- This creates two valid paths: Hub → Service (direct) or Hub → Pillar → Service.

### How Overload Is Avoided
- Services are grouped under pillars, not listed in a single flat list.
- Each card shows only the service name and a one-line description — no long text.
- Pillar headings act as visual anchors, breaking the page into scannable sections.
- On mobile, cards stack vertically within each pillar group.

---

## 6. PILLAR OVERVIEW PAGE WIREFRAME

One page per pillar: `/services/compliance`, `/services/accounting`, `/services/intelligence`.

### Structure (Same for All Pillars)

```
┌─────────────────────────────────────────────┐
│  H1: [Pillar Name]                          │
│  Intro paragraph: what this pillar covers   │
│  and why it matters (80–120 words)          │
├─────────────────────────────────────────────┤
│  Section: Services Under This Pillar        │
│  ┌──────────────────────────────────────┐   │
│  │ Service 1: Title + 2–3 line summary  │   │
│  │ Deliverables preview (3–4 bullets)   │   │
│  │ CTA: View Full Service Details       │   │
│  └──────────────────────────────────────┘   │
│  (Repeat for each service in the pillar)    │
├─────────────────────────────────────────────┤
│  Section: Related Pillars                   │
│  Brief cross-reference to other 2 pillars   │
│  with links to their pillar pages           │
├─────────────────────────────────────────────┤
│  CTA Block: Request a Quote                 │
└─────────────────────────────────────────────┘
```

### Educational vs Decision-Making Balance
- The intro paragraph is educational — it explains what the pillar covers and why it matters.
- The service listings are decision-making — they give enough detail to help the visitor choose which service page to visit.
- The CTA block is action-oriented — it captures visitors who are ready to enquire without needing the individual page.

### CTA Placement Logic
- **Top of page:** No CTA — let the user read first.
- **After each service listing:** "View Full Service Details" link.
- **Bottom of page:** Full-width CTA block — "Request a Quote."

---

## 7. SERVICE PAGE WIREFRAME

Uses the template from PROMPT 1 (Deliverable C). All 11 service pages follow this structure.

### Section 1: Service Hero
- **Purpose:** Immediately tell the visitor what service this is and who it helps.
- **What problem it addresses:** Visitors arriving from search need instant orientation — they must know they are on the right page within 3 seconds.
- **How it moves the user forward:** CTA buttons ("Request a Quote" / "Book a Consultation") are visible without scrolling.

### Section 2: Who This Is For
- **Purpose:** Help the visitor self-qualify — is this service relevant to their situation?
- **What problem it addresses:** Many visitors are unsure whether they need this specific service or a related one.
- **How it moves the user forward:** If they see themselves in the list, they continue reading. If not, internal links guide them to the right service.

### Section 3: What's Included (Deliverables)
- **Purpose:** Show exactly what the client receives.
- **What problem it addresses:** Ambiguity about what "the service" actually includes. Clients want concrete outputs, not vague descriptions.
- **How it moves the user forward:** Seeing tangible deliverables builds confidence and moves the visitor closer to enquiry.

### Section 4: Process (Step-by-Step)
- **Purpose:** Explain the engagement workflow from start to delivery.
- **What problem it addresses:** Fear of the unknown — "What happens after I enquire?"
- **How it moves the user forward:** Clarity about process reduces friction for submitting a quote request.

### Section 5: What We Need From You
- **Purpose:** Set expectations about client responsibilities.
- **What problem it addresses:** Prospects worry about effort, complexity, and being overwhelmed with demands.
- **How it moves the user forward:** A short, manageable checklist shows that onboarding is straightforward.

### Section 6: Timeline Expectations
- **Purpose:** Give a general indication of how long things take.
- **What problem it addresses:** Urgency — prospects often need services before a deadline (SARS filing, tender submission, audit date).
- **How it moves the user forward:** Even a general timeline helps prospects plan and motivates earlier action.

### Section 7: FAQs
- **Purpose:** Answer real questions that would otherwise become barriers to conversion.
- **What problem it addresses:** Unanswered objections — pricing concerns, process uncertainty, ZA-specific regulatory questions.
- **How it moves the user forward:** Each answer reduces a reason to leave the page without acting.

### Section 8: CTA Block
- **Purpose:** Final conversion prompt with reassurance.
- **What problem it addresses:** Visitors who read the full page need one clear, low-risk action to take.
- **How it moves the user forward:** "No obligation. We respond within one business day." removes the last hesitation.

---

## 8. CORE USER FLOWS

### Flow 1: First-Time Visitor (General)
- **Entry page:** Home (`/`)
- **Path:** Hero → scans Pillars → clicks a Service Card → reads Service Page → clicks "Request a Quote"
- **Decision points:**
  1. Hero: "Is this relevant to me?" → Trust row and subheadline answer this.
  2. Pillars: "Which area do I need?" → Pillar descriptions help orient.
  3. Services Grid: "Which specific service?" → Card descriptions guide selection.
  4. Service Page: "Do I trust them enough to enquire?" → FAQs, deliverables, and process answer this.
- **Exit page:** Quote form (`/quote`) — form submitted.

### Flow 2: Compliance-Driven Business
- **Entry page:** Home (`/`) or directly via search to a compliance service page.
- **Path A (from Home):** Hero → Pillars Overview → clicks "Compliance" → Pillar Page → selects specific service → Service Page → "Request a Quote"
- **Path B (from search):** Lands on `/services/tax-services` → reads page → clicks "Request a Quote"
- **Decision points:**
  1. "Do they handle SARS / CIPC / Companies Act?" → Pillar content and service page confirm.
  2. "Will they meet my deadline?" → Timeline section addresses this.
  3. "What exactly do I get?" → Deliverables section is decisive.
- **Exit page:** Quote form (`/quote`) — form submitted with compliance service pre-selected.

### Flow 3: Tender-Driven Business
- **Entry page:** Likely via search landing on `/services/tender-readiness-support`.
- **Path:** Service Page → reads CSD, B-BBEE, tax clearance details → checks FAQ → clicks "Request a Quote"
- **Decision points:**
  1. "Do they understand tender compliance?" → Service intro and deliverables confirm.
  2. "Can they handle the whole package or just parts?" → Deliverables list shows breadth.
  3. "How fast can they turn it around?" → Timeline section addresses urgency.
- **Exit page:** Quote form (`/quote`) — form submitted.
- **Secondary path:** Tender page → sees internal link to Tax Services or CIPC Compliance → reads related service → returns to quote.
