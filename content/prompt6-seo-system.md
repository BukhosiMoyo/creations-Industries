# PROMPT 6 — SEO System, Schema, Internal Linking & Future Tools

No code. No schema JSON. No UI.

---

## 1. INDEXATION RULES

### Pages That MUST Be Indexable

| Page | URL | Index Status | Reason |
|------|-----|-------------|--------|
| Home | `/` | INDEX, FOLLOW | Primary landing page, highest authority |
| Services Hub | `/services` | INDEX, FOLLOW | Central service discovery page |
| Pillar: Compliance | `/services/compliance` | INDEX, FOLLOW | Pillar topic page |
| Pillar: Accounting | `/services/accounting` | INDEX, FOLLOW | Pillar topic page |
| Pillar: Intelligence | `/services/intelligence` | INDEX, FOLLOW | Pillar topic page |
| Bookkeeping | `/services/bookkeeping` | INDEX, FOLLOW | Individual service page |
| Accounting | `/services/accounting-services` | INDEX, FOLLOW | Individual service page |
| Tax Services | `/services/tax-services` | INDEX, FOLLOW | Individual service page |
| Advisory Services | `/services/advisory-services` | INDEX, FOLLOW | Individual service page |
| CIPC Compliance | `/services/cipc-compliance` | INDEX, FOLLOW | Individual service page |
| Companies Act Compliance | `/services/companies-act-compliance` | INDEX, FOLLOW | Individual service page |
| Payroll Service | `/services/payroll` | INDEX, FOLLOW | Individual service page |
| Audit Readiness | `/services/audit-readiness` | INDEX, FOLLOW | Individual service page |
| Tender Readiness | `/services/tender-readiness` | INDEX, FOLLOW | Individual service page |
| Data Analytics | `/services/data-analytics` | INDEX, FOLLOW | Individual service page |
| Business IT Solutions | `/services/business-it-solutions` | INDEX, FOLLOW | Individual service page |
| About | `/about` | INDEX, FOLLOW | Trust and authority page |
| How It Works | `/how-it-works` | INDEX, FOLLOW | Informational conversion page |
| Use Cases | `/use-cases` | INDEX, FOLLOW | Audience segmentation page |
| Contact | `/contact` | INDEX, FOLLOW | Local SEO + conversion |
| Quote | `/quote` | INDEX, FOLLOW | Primary conversion page |
| Blog / Insights | `/insights` | INDEX, FOLLOW | Content hub |
| Blog Articles | `/insights/[slug]` | INDEX, FOLLOW | Individual content pages |
| HTML Sitemap | `/sitemap` | INDEX, FOLLOW | Crawl support page |
| Privacy Policy | `/privacy` | INDEX, NOFOLLOW | Legal requirement, low SEO value |
| Terms of Service | `/terms` | INDEX, NOFOLLOW | Legal requirement, low SEO value |

### Pages That MUST NOT Be Indexed

| Page / Route | URL Pattern | Index Status | Reason |
|------|-----|-------------|--------|
| Client Portal | `/portal/*` | NOINDEX, NOFOLLOW | Private client area |
| Admin Routes | `/admin/*` | NOINDEX, NOFOLLOW | Internal tooling |
| API Routes | `/api/*` | N/A (not HTML) | Server-side only |
| Auth Routes | `/auth/*` | NOINDEX, NOFOLLOW | Login/session management |
| Thank You Pages | `/thank-you` | NOINDEX, FOLLOW | Post-submission, no search value |
| Draft Content | `/insights/draft/*` | NOINDEX, NOFOLLOW | Unpublished content |
| Internal Tools | `/internal/*` | NOINDEX, NOFOLLOW | Staff-only dashboards |
| Future Tools (initially) | `/tools/*` | NOINDEX until reviewed | See section 10 |

### URL Rules
- All URLs must be lowercase, hyphenated, human-readable.
- No query parameters for content pages.
- No trailing slashes (enforce via middleware or config).
- No URL changes after launch without 301 redirects.

---

## 2. ROBOTS.TXT

```
# Robots.txt for [firm domain]

User-agent: *
Allow: /

Disallow: /admin/
Disallow: /portal/
Disallow: /api/
Disallow: /auth/
Disallow: /internal/
Disallow: /thank-you
Disallow: /insights/draft/

# Sitemap
Sitemap: https://[domain]/sitemap.xml
```

**Rules:**
- Must be at site root (`/robots.txt`).
- Must reference the XML sitemap.
- Must not block CSS or JS files that render page content.
- Must be reviewed before any new route category is added.

---

## 3. SITEMAPS

### 3A: XML Sitemap (`/sitemap.xml`)

**Must include:**
- All indexable pages from the table in section 1
- `<lastmod>` dates reflecting actual content changes
- `<changefreq>` values: `monthly` for service pages, `weekly` for insights, `yearly` for legal pages
- `<priority>` values: 1.0 (home), 0.8 (pillars, services hub), 0.7 (individual services), 0.6 (about, contact, how it works), 0.5 (insights, use cases), 0.3 (legal, sitemap)

**Must exclude:**
- All NOINDEX pages
- API routes
- Parameter-based URLs
- Duplicate URLs (no trailing slash variants)

**Implementation:** Auto-generated via Next.js `sitemap.ts` route handler.

### 3B: HTML Sitemap (`/sitemap`)

**Must include:**
- All public pages grouped by section:
  - Services (grouped by pillar)
  - Company (About, How It Works, Use Cases, Contact)
  - Resources (Insights, coming soon note)
  - Legal (Privacy, Terms)
- Descriptive link text (service names, not generic labels)

**Must:**
- Be linked in every page footer
- Be human-readable (visual hierarchy, not a raw list)
- Reflect the IA hierarchy from PROMPT 2
- Help reduce crawl depth (every page reachable within 2–3 clicks from home)

---

## 4. CANONICAL & DUPLICATION CONTROL

### Canonical Rules

| Rule | Specification |
|------|---------------|
| **Self-canonical** | Every indexable page includes `<link rel="canonical" href="[self URL]" />` |
| **No wrong canonicals** | Service pages must NEVER canonical to homepage or another service page |
| **Trailing slash** | Enforce no trailing slash site-wide. `/services/tax-services` not `/services/tax-services/` |
| **Protocol** | All canonicals use `https://` |
| **Domain** | One canonical domain (www vs non-www — pick one, redirect the other) |
| **Pillar vs Service** | `/services/accounting` (pillar) and `/services/accounting-services` (service) are distinct pages with distinct canonicals — no overlap |

### Duplication Prevention

1. **No duplicate content across service pages.** Each service page has unique copy written in PROMPT 1 (Deliverable D).
2. **No parameter-based page variants.** Content pages do not use query parameters.
3. **No pagination issues.** Blog listing uses `rel="next"` and `rel="prev"` if paginated (future consideration).
4. **No language duplicates.** English-only site. No hreflang needed in Phase 1.

---

## 5. SCHEMA MARKUP — PAGE TYPE MAPPING

### Schema Types Per Page

| Page Type | Schema Types | Priority |
|-----------|-------------|----------|
| **Home** | Organization, LocalBusiness, WebSite, FAQPage | Critical |
| **Services Hub** | Organization (reference), ItemList | High |
| **Pillar Pages** | ProfessionalService, ItemList | High |
| **Individual Service Pages** | Service, FAQPage | Critical |
| **About** | Organization, AboutPage | Medium |
| **How It Works** | HowTo (if step structure fits) | Medium |
| **Use Cases** | Organization (reference) | Low |
| **Contact** | LocalBusiness, ContactPage | High |
| **Quote** | ContactPage | Medium |
| **Blog / Insights Hub** | CollectionPage | Medium |
| **Blog Articles** | Article, BreadcrumbList | High |
| **HTML Sitemap** | SiteNavigationElement | Low |

### Schema Type Definitions

#### A) Organization
- **Applied to:** Home, About
- **Properties:** name, url, logo, contactPoint (phone, email), sameAs (social profiles), address
- **Rule:** Must match visible page content exactly. No properties that are not displayed on the page.

#### B) LocalBusiness
- **Applied to:** Home, Contact
- **Properties:** name, address (South African address), geo (coordinates), areaServed ("South Africa"), telephone, openingHours, priceRange
- **Rule:** Address must be real and verifiable. areaServed confirms South African market targeting.

#### C) ProfessionalService
- **Applied to:** Pillar pages
- **Properties:** name, description, provider (Organization reference), areaServed, serviceType
- **Rule:** serviceType must match the pillar category (e.g., "Compliance Services", "Accounting Services", "Business Intelligence Services").

#### D) Service
- **Applied to:** Individual service pages
- **Properties:** name, description, provider (Organization reference), areaServed, serviceType, offers (if pricing info is added later)
- **Rule:** One Service schema per service page. name must match the H1. description must match the meta description.

#### E) FAQPage
- **Applied to:** Homepage FAQ (section 9), all individual service page FAQ sections
- **Properties:** mainEntity (array of Question + acceptedAnswer)
- **Rule:** Every Q&A visible on the page must be in the schema. No hidden or JS-only FAQ content.

#### F) Article
- **Applied to:** Blog / insights articles (future)
- **Properties:** headline, datePublished, dateModified, author, description, image (if applicable)
- **Rule:** datePublished must reflect actual publication date. author must reference a real person or the organization.

#### G) BreadcrumbList
- **Applied to:** All pages except Home
- **Properties:** itemListElement with position, name, item (URL)
- **Example path:** Home → Services → Compliance → CIPC Compliance Services
- **Rule:** Breadcrumbs must match visible breadcrumb navigation on the page.

### Schema Rules (Global)
1. **JSON-LD only.** No inline microdata, no RDFa.
2. **Placed in `<head>`.** Via Next.js metadata or Script component.
3. **Must reflect visible content.** No schema properties for content that is not displayed on the page.
4. **No spammy properties.** No fake reviews, no fabricated ratings, no invented aggregate data.
5. **Tested before launch.** All schema must pass Google's Rich Results Test without errors.

---

## 6. INTERNAL LINKING SYSTEM

### Linking Direction Rules

Every page must link in three directions:

| Direction | Definition | Example |
|-----------|-----------|---------|
| **Up** | To its parent in the hierarchy | Service page → Pillar page → Services Hub → Home |
| **Sideways** | To related pages at the same level | Tax Services → CIPC Compliance (related service) |
| **Down** | To supporting or child content | Pillar page → Individual service pages |

### Page-Level Linking Requirements

| Page | Links Up To | Links Sideways To | Links Down To |
|------|------------|-------------------|---------------|
| **Home** | N/A (top of hierarchy) | N/A | 3 pillars, 9+ services, About, Contact, Quote, Sitemap |
| **Services Hub** | Home | About, Quote | 3 pillars, 11 services |
| **Pillar Page** | Services Hub, Home | Other 2 pillar pages | All services in the pillar, Quote |
| **Service Page** | Parent pillar, Services Hub | 2 related services (per Deliverable E map) | FAQ section (internal anchors), Quote |
| **About** | Home | Services Hub, Contact, Quote | N/A |
| **How It Works** | Home | Services Hub, Quote | N/A |
| **Use Cases** | Home | Relevant service pages (2–3 per use case) | Quote |
| **Contact** | Home | Quote, About | N/A |
| **Quote** | Home | Services Hub | N/A |
| **Blog Article** | Insights hub | Related articles, relevant service pages | N/A |

### Anchor Text Rules (Reinforced)
1. **Descriptive and keyword-relevant.** "View our bookkeeping services" — not "click here."
2. **Consistent service naming.** Always use the exact service name as defined in PROMPT 1.
3. **No orphan pages.** Every indexable page must be reachable from at least 2 other pages.
4. **No broken links.** Internal links must be validated during build (automated check).
5. **Breadcrumb navigation.** Present on all pages except Home. Reflects the hierarchy: Home → [Section] → [Page].

### Link Density Guidelines
- **Homepage:** 20–30 internal links (highest on the site — it distributes authority)
- **Services Hub:** 15–20 internal links
- **Pillar Pages:** 8–12 internal links
- **Service Pages:** 6–10 internal links
- **Blog Articles:** 3–5 internal links

---

## 7. CONTENT QUALITY RULES (SA-FOCUSED)

### E-E-A-T Implementation

| Signal | How It Is Demonstrated |
|--------|----------------------|
| **Experience** | Testimonials referencing real service delivery (section 7 homepage). Service process descriptions showing practical knowledge. |
| **Expertise** | Service page content written with ZA-specific detail (SARS, CIPC, Companies Act). FAQs answering real compliance questions. |
| **Authoritativeness** | Organization schema with real contact details. SARS eFiling and CIPC registration references. Local presence signals. |
| **Trustworthiness** | POPIA compliance statement. No fabricated statistics. No guaranteed outcomes. Real address and contact information. |

### South African Content Rules
1. Use ZAR (R) for any currency examples.
2. Reference SA compliance bodies (SARS, CIPC) naturally, not stuffed.
3. Reference SA-specific frameworks (Companies Act No. 71 of 2008, VAT Act) where contextually relevant.
4. Do not claim to operate in regions where the firm does not have presence.
5. "South Africa" or "South African" appears naturally 3–5 times on the homepage, once in the meta description, and at least once per service page.

### Content That Must Never Appear
- Copied or templated content from other accounting firm websites.
- AI-generated content that has not been reviewed and personalised.
- Generic content that could apply to any firm in any country.
- Claims of guaranteed SARS refunds, CIPC approvals, or specific outcomes.
- Fabricated statistics, client counts, or success rates.

---

## 8. PERFORMANCE & TECHNICAL SEO

### Core Web Vitals Targets

| Metric | Target | How |
|--------|--------|-----|
| **LCP** (Largest Contentful Paint) | < 2.5 seconds | Optimise hero image/content, use font-display: swap, preload critical assets |
| **FID/INP** (Interaction to Next Paint) | < 200ms | No heavy JS on initial load, defer non-critical scripts |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Fixed dimensions on images, no late-loading content shifts, font-display: swap |

### Technical Requirements
1. **Server-side rendering.** All SEO-critical content must be in the initial HTML response (Next.js SSR/SSG).
2. **No content behind JS-only rendering.** FAQ answers, service descriptions, and all indexable text must be in the DOM on initial load.
3. **No content hidden behind interactions.** FAQ answers are collapsed but present in the DOM. Mega menu links are in the DOM.
4. **Mobile-first.** Google uses mobile-first indexing. The mobile version must contain all content, links, and schema.
5. **HTTPS enforced.** All pages served over HTTPS. HTTP redirects to HTTPS.
6. **Clean HTML.** Semantic elements (header, nav, main, section, article, footer). No div soup.
7. **Image optimisation.** Next.js Image component with proper alt text, width/height, and lazy loading for below-fold images.
8. **Font loading.** font-display: swap. Preload primary font file. No FOIT (Flash of Invisible Text).

---

## 9. FUTURE TOOLS & EXPANSION

### Planned Tool Types

| Tool | URL | Index Status | Purpose |
|------|-----|-------------|---------|
| Tax Calculator | `/tools/tax-calculator` | NOINDEX initially, review for INDEX when content is substantial | Informational lead magnet |
| Compliance Checklist | `/tools/compliance-checklist` | NOINDEX initially | Self-assessment tool |
| Filing Readiness Tool | `/tools/filing-readiness` | NOINDEX initially | Pre-engagement qualifier |

### Tool SEO Rules
1. **All tools live under `/tools/`.** No tools mixed into `/services/` or root paths.
2. **Tools must not cannibalise service pages.** A tax calculator must not target "tax services South Africa" — it targets "calculate tax South Africa" (informational intent, not commercial).
3. **Tools must link back to services.** Every tool page must include a contextual link to the relevant service page (e.g., tax calculator links to Tax Services page).
4. **Tools are NOINDEX by default.** They become INDEX only after review confirms: unique content, no cannibalisation, clear informational value.
5. **Tools must not contain duplicate service page content.** Tool descriptions must be unique.

### Future Content Expansion
- Blog articles (`/insights/[slug]`) — INDEX once published, NOINDEX while draft.
- Case studies (future) — would live under `/insights/case-studies/[slug]`, INDEX when published.
- Resource downloads (future) — landing pages INDEX, the file itself is not indexed.

### Expansion Safety Rule
**Any new page or feature must:**
1. Declare INDEX or NOINDEX explicitly before deployment.
2. Fit into the internal linking hierarchy (link up, sideways, down).
3. Include appropriate schema (at minimum BreadcrumbList).
4. Not create URL conflicts with existing pages.
5. Be added to the XML sitemap if indexable.
6. Be added to the HTML sitemap.

---

## 10. CONFIRMATION

### 1. SEO System Completeness — CONFIRMED

All 11 areas specified in this prompt are addressed:

| Area | Status |
|------|--------|
| Indexation rules | ✅ 26+ pages classified with explicit index/noindex |
| Robots.txt | ✅ Defined with allow/disallow rules and sitemap reference |
| XML Sitemap | ✅ Auto-generated, includes all indexable pages, excludes noindex |
| HTML Sitemap | ✅ Linked in footer, follows IA hierarchy |
| Canonical control | ✅ Self-canonical on all pages, trailing slash enforcement |
| Schema markup | ✅ 7 schema types mapped to all page types |
| Internal linking | ✅ 3-direction linking system, per-page requirements, density guidelines |
| Content quality | ✅ E-E-A-T implementation, ZA-specific rules, forbidden content list |
| Performance | ✅ Core Web Vitals targets, SSR requirement, mobile-first |
| Future tools | ✅ `/tools/` namespace, NOINDEX default, anti-cannibalisation rules |
| Global safety rule | ✅ New pages must declare index status, fit hierarchy, include schema |

### 2. How This System Enables SA Dominance

1. **LocalBusiness schema** with verified South African address and areaServed signals to Google that this is a local business serving the SA market.
2. **ZA-specific content** (SARS, CIPC, Companies Act, PAYE, UIF, SDL) across all service pages creates deep topical relevance that generic "accounting services" competitors cannot match.
3. **FAQPage schema** on 12+ pages (homepage + 11 service pages) creates multiple opportunities for FAQ rich results in South African search queries.
4. **Internal linking density** (20–30 links from homepage, 6–10 per service page) creates a tightly connected content web that Google can crawl efficiently and understand as a cohesive topic cluster.
5. **Pillar → Service hierarchy** mirrors how Google evaluates topical authority — broad topic pages supported by deep, specific service pages. This architecture outperforms flat sites with unrelated pages.
6. **No cannibalisation.** Each page targets a distinct keyword theme. The `/services/accounting` pillar targets "accounting services SA" broadly, while `/services/accounting-services` targets the specific service. No two pages compete for the same query.

### 3. Future Additions Will Not Break SEO — CONFIRMED

The system is designed to scale safely:
- **New service pages** follow the existing template and slot into the pillar hierarchy.
- **New tools** live under `/tools/`, are NOINDEX by default, and link back to services.
- **New blog content** lives under `/insights/`, follows Article schema, and links to services.
- **New pages** must pass the expansion safety rule (section 9) before deployment.
- **No URL changes** are made without 301 redirects.
- **The internal linking system** has clear rules for where new pages connect, preventing orphan pages or broken link chains.
