# PROMPT 4 — Component System & Interaction Rules

Rules only. No code. No JSX. No page layouts.

---

## 1. GLOBAL COMPONENT RULES (NON-NEGOTIABLE)

### 1.1 Component Isolation

Every component MUST be:
- **Self-contained.** It renders correctly without knowledge of what wraps it or sits beside it.
- **Background-agnostic.** It must look correct on base background, surface background, and pattern backgrounds.
- **Overflow-safe.** It must never rely on a parent's `overflow-hidden` to look correct. If it has internal overflow needs, it handles them itself on an inner wrapper only.
- **Reusable.** If the component cannot be placed in a second location and still work, it is not a component — it is page code.

No component may:
- Set `body` styles or global CSS.
- Control z-index above its documented layer.
- Inject background patterns directly (patterns are a section concern, not a component concern).
- Assume it will always have a specific sibling above or below it.

### 1.2 Component Layer Constraints

| Component Type | Allowed Z-Index | Notes |
|----------------|-----------------|-------|
| Structural (wrappers, grids) | z-10 | Content layer |
| Content (headings, text, badges) | z-10 | Content layer |
| Cards & interactive components | z-20 | Elevated layer |
| Hero floating elements ONLY | z-30 | Approved exception, documented |
| All other components | z-10 to z-20 | No exceptions |

**No component may:**
- Use z-index above z-30 under any circumstance.
- Override section or layout layer assignments.
- Create stacking contexts that interfere with the global layer system (avoid unnecessary `transform`, `filter`, or `will-change` on wrapper elements).

---

## 2. COMPONENT CATEGORY SUMMARY

### Category A: Structural Components

| Component | Purpose | Layer |
|-----------|---------|-------|
| **SectionWrapper** | Wraps each homepage/page section. Controls vertical padding, background variant, optional pattern slots. | z-10 |
| **Container** | Centers content with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Used inside every section. | z-10 |
| **GridWrapper** | Flexible grid container for card layouts. Handles responsive column counts. | z-10 |
| **Divider** | Visual separator between sections or within sections. May be a line, subtle gradient, or spacing block. | z-10 |

**Rules:**
- SectionWrapper is the ONLY component that may accept pattern overlay props (showDotGrid, showLineGrid, showGlow). It passes these to overlay components rendered within it.
- Container must never have a max-height. It expands with content.
- GridWrapper uses CSS Grid or Flexbox with defined gap values. No ad-hoc spacing.

---

### Category B: Content Components

| Component | Purpose | Layer |
|-----------|---------|-------|
| **HeadingBlock** | Renders H1–H4 with consistent sizing, weight, and spacing. Accepts heading level as prop. | z-10 |
| **TextBlock** | Renders body paragraphs with correct line height and max-width for readability. | z-10 |
| **IconTextBlock** | Icon + label/description pair. Icon left or top, text beside or below. | z-10 |
| **Badge / StatusPill** | Small label element for tags, statuses, or categories. Compact, muted colours. | z-10 |

**Rules:**
- HeadingBlock enforces that only one H1 exists per page. If multiple H1s are passed, it must warn.
- TextBlock has a maximum content width (~65ch) for readability. Paragraphs must not span the full viewport.
- IconTextBlock icons use lucide-react only. Icon size is proportional to text size.
- Badge/StatusPill uses muted backgrounds (not red). Red is reserved for "critical" or "active" statuses only.

---

### Category C: Action Components

| Component | Purpose | Layer |
|-----------|---------|-------|
| **PrimaryButton** | Main CTA button. High visual weight. Accent colour treatment. | z-20 |
| **SecondaryButton** | De-emphasised alternative action. Outlined or ghost style. | z-20 |
| **TextLink** | Inline or standalone link. Uses descriptive anchor text per linking rules. | z-10 |

**Rules:**
- PrimaryButton may use accent red as background or border accent. It is the ONLY component where red may fill a surface (the button surface itself, not a section background).
- SecondaryButton must be visually lighter than PrimaryButton. It must never compete for attention.
- TextLink must use descriptive text. Generic labels ("click here", "learn more") are forbidden.
- All buttons must have a minimum tap target of 44×44px on mobile.
- All buttons support disabled state with clear visual indication.
- All buttons render as `<button>` for actions or `<a>` for navigation. Never a `<div>` with an onClick.

---

### Category D: Data & Trust Components

| Component | Purpose | Layer |
|-----------|---------|-------|
| **MetricCard** | Displays a number + label (e.g., "11 Services", "3 Pillars"). | z-20 |
| **StatusIndicator** | Small dot or icon showing a state (active, pending, complete). | z-10 |
| **TrustBadge** | Compact credential (e.g., "SARS eFiling Registered"). Icon + short text. | z-10 |
| **ComplianceLabel** | Marks a service or document as compliance-relevant (e.g., "CIPC Required"). | z-10 |

**Rules:**
- MetricCard numbers use the numeric/data typography style (semibold or mono, slightly larger).
- MetricCard may use accent red for a single highlighted number, but never for all metrics.
- TrustBadge must be compact. It appears in horizontal rows (hero trust row) and must not wrap awkwardly on mobile — it should gracefully stack or scroll.
- StatusIndicator colours: green (active/success), amber (pending), muted red (overdue). These are the ONLY coloured indicators allowed.
- ComplianceLabel uses muted styling — it informs, it does not alert.

---

### Category E: Utility Components

| Component | Purpose | Layer |
|-----------|---------|-------|
| **FAQAccordion** | Collapsible Q&A pairs. Keyboard + ARIA accessible. | z-20 |
| **TestimonialCard** | Client quote with name, role, and business type. | z-20 |
| **ServiceCard** | Service name + one-line description + CTA link. Used in preview grids. | z-20 |
| **BlogPreviewCard** | Article title + one-line summary + "Coming soon" label. | z-20 |

**Rules:**
- FAQAccordion: see Section 5 below for mandatory rules.
- TestimonialCard must include quotation marks or a visual quote indicator. Must NOT include star ratings or fabricated metrics.
- ServiceCard links to the individual service page. CTA text must be "View Details" (consistent, per IA rules).
- BlogPreviewCard may show a "Coming Soon" tag. Must not look broken or empty.

---

## 3. HERO COMPONENT RULES (CRITICAL)

### 3.1 Hero Structure

The hero is a two-column layout:

```
┌──────────────────────────────────────────────────┐
│                                                  │
│   LEFT COLUMN              RIGHT COLUMN          │
│   ────────────             ─────────────         │
│   H1 headline              Visual container      │
│   Subheadline               ┌─────────────┐     │
│   CTA buttons                │ Mock UI /   │     │
│   Trust row                  │ Dashboard   │     │
│                              │             │     │
│                              │  [float 1]  │     │
│                              │  [float 2]  │     │
│                              │  [float 3]  │     │
│                              └─────────────┘     │
│                                                  │
└──────────────────────────────────────────────────┘
```

**On mobile:** Stacks vertically. Left column (content) first, right column (visual) second. Visual container may be hidden or reduced on very small screens if it does not add value.

### 3.2 Hero Rules

1. **Left column** contains: H1 (one of three options from content blueprint), subheadline, primary + secondary CTA buttons, trust row (4 badges).
2. **Right column** contains: a visual container holding a mock UI or dashboard illustration. This is the ONLY element in the right column.
3. **Visual container** must have `position: relative` and defined dimensions. All floating elements are positioned within it.
4. **Visual container** must NOT use `overflow-hidden`. Floating elements may partially extend beyond the container edges (by a controlled amount).
5. **The hero section** must NOT use `overflow-hidden`. If the page-level container clips the hero, the clipping must be removed.

### 3.3 Visual Container Content

The visual container shows a static or lightly animated mock dashboard. This is NOT a real product demo — it is a trust signal showing the type of output clients receive.

Content may include:
- A simplified financial summary card
- A chart or graph placeholder
- A compliance status indicator
- A sample report preview

The mock must look professional and relevant to accounting/compliance. It must NOT contain real data, real names, or misleading statistics.

---

## 4. FLOATING ELEMENT RULES (STRICT)

### 4.1 Definition

Floating elements are small, decorative-informative components that "float" around the hero visual container. They add visual interest and reinforce the firm's capabilities.

### 4.2 Constraints

| Rule | Specification |
|------|---------------|
| **Maximum count** | 3 per hero. No exceptions. |
| **Positioning** | `position: absolute` relative to the visual container. |
| **Z-index** | z-30. Fixed. Documented. |
| **Clipping** | Must NEVER be clipped. Visual container must not have overflow-hidden. |
| **Content** | Short text + optional icon. Examples: "SARS Compliant", "99.8% On-Time Filing", "12 Services". |
| **Size** | Small. Must not compete with H1 or CTAs for attention. |
| **Motion** | May have slow vertical drift (6–10 second cycle, 4–8px range). Must respect prefers-reduced-motion (static fallback). |
| **Interaction** | `pointer-events: none`. Not clickable. |
| **Colour** | Uses surface background + border. May have subtle shadow. No red backgrounds. |

### 4.3 Floating Element Positioning Rules

1. **Float 1:** Top-right of visual container. Partially overlapping the container edge is acceptable.
2. **Float 2:** Middle-left or bottom-left of visual container.
3. **Float 3:** Bottom-right of visual container.

No two floats may overlap each other. Minimum gap: 24px between floating element edges.

### 4.4 Mobile Behaviour

On mobile (below `md` breakpoint):
- Reduce to maximum 2 floating elements.
- Reposition to avoid overlapping the stacked content column.
- If the visual container is hidden on mobile, floating elements are also hidden.

---

## 5. FAQ COMPONENT RULES (MANDATORY)

1. **Accessibility:** Each question is a `<button>` inside a heading element. Each answer panel uses `aria-expanded` and `aria-controls`. Keyboard navigation (Tab, Enter, Space) must work.
2. **Default state:** All items collapsed on page load.
3. **Expansion mode:** Single-expand. Opening one item closes any previously open item.
4. **Expand direction:** Vertical only. The answer expands downward, pushing subsequent items down. No horizontal expansion, no overlays, no popups.
5. **Animation:** Height expand/collapse, 200–300ms. Must use a method that does not cause layout shift for content below the accordion (animate max-height or use Framer Motion's layout animation).
6. **Theme:** Must look correct in both light and dark mode. Question row uses a slightly elevated surface. Answer area uses base background.
7. **Chevron indicator:** Right-aligned chevron (or plus/minus) that rotates on expand. Uses secondary text colour.
8. **Content:** Question text is semibold. Answer text is regular weight. Answers may contain bullet lists.
9. **Spacing:** Consistent gap between accordion items. No touching borders between items.
10. **Mandatory placement:** Present on ALL individual service pages, positioned between the main service content and the final CTA block.

---

## 6. FORM COMPONENT RULES (DEFINE ONLY — BUILD LATER)

### 6.1 Form Architecture

| Rule | Specification |
|------|---------------|
| **Format** | Multi-step wizard, not a single long form. |
| **Steps** | One logical group per step (e.g., Step 1: contact info, Step 2: business info, Step 3: service selection, Step 4: details). |
| **Progress indicator** | Required. Shows current step, total steps, and completed steps. |
| **Validation** | Per-step validation. User cannot advance until current step is valid. |
| **Error display** | Inline errors below the relevant field. No alert boxes. No toast notifications for validation. |
| **Submission** | Final step shows a summary before sending. Submit button appears only on the last step. |
| **Confirmation** | Success message replaces the form on the same page. No redirect. |

### 6.2 Form Field Rules

1. All fields use `<label>` elements explicitly associated with inputs.
2. Required fields are marked with an asterisk (*) and `aria-required="true"`.
3. Error states use border colour change + inline error message below the field.
4. Error messages are descriptive (not just "Invalid" — say "Please enter a valid email address").
5. Form inputs must have visible focus indicators that meet WCAG.
6. Dropdowns use native `<select>` or an accessible Radix Select. No custom dropdown that breaks keyboard navigation.

### 6.3 Spam Prevention

- Honeypot field (hidden input, no CAPTCHA in Phase 1).
- Rate limiting on the API route (basic).
- No client-side-only submission — all submissions go through a server-side route.

---

## 7. INTERACTION RULES (COMPONENT-LEVEL)

### 7.1 Allowed Interactions

| Interaction | Where | Specification |
|-------------|-------|---------------|
| **Hover scale** | Cards (service, testimonial, blog) | Scale ≤ 1.03, duration 150–200ms |
| **Hover shadow** | Cards, buttons | Shadow deepens subtly, duration 150–200ms |
| **Hover border colour** | Cards, form inputs | Border shifts to accent or lighter shade, 150ms |
| **Icon micro-shift** | IconTextBlock, card icons | Translate 2–4px upward on hover, 200ms |
| **Button press** | All buttons | Scale 0.97–0.98 on active/press, 100ms |
| **Focus ring** | All interactive elements | Visible outline, uses accent or system focus colour |
| **FAQ expand** | FAQ accordion | Height transition 200–300ms, chevron rotation |
| **Scroll reveal** | All sections | Fade in + 12–20px translate-up, 300–500ms, triggered once |

### 7.2 Forbidden Interactions

1. **No layout-affecting animation.** No animating width, height, margin, or padding (except FAQ accordion height).
2. **No continuous animation on cards, buttons, or text.** These are static until interacted with.
3. **No bounce, elastic, or spring effects.** Easing must be smooth (ease-out or cubic-bezier).
4. **No scroll-triggered animation that replays.** Once an element reveals, it stays revealed.
5. **No parallax scroll effects.** Content scrolls at the same rate as the page.
6. **No hover effects on mobile.** Hover styles are `@media (hover: hover)` only.
7. **No tooltip on mobile.** If information is in a tooltip on desktop, it must be visible inline on mobile.
8. **No animation that delays readability.** Content must be readable immediately — reveal animations fade FROM 0 opacity but start ON scroll intersection, not after a delay.

---

## 8. BACKGROUND & PATTERN USAGE AT COMPONENT LEVEL

### 8.1 Separation of Concerns

- **Sections** own backgrounds. The SectionWrapper component accepts pattern props and renders overlay components within itself.
- **Components** do NOT own backgrounds. A ServiceCard, for example, has a surface background for its own card body, but it does not render dot grids or glows.
- **Components sit above backgrounds.** All component content is at z-10 or z-20. All backgrounds are at z-0 to z-5.

### 8.2 What This Prevents

- No component will render a pattern that conflicts with another component's pattern.
- No component will create a stacking context that pushes a pattern above text.
- No component will apply `overflow-hidden` that clips a section-level pattern.
- Background control is centralised, making it easy to adjust or disable patterns globally.

---

## 9. ERROR PREVENTION CHECKLIST

Before any component is approved for use, it must pass these checks:

| # | Check | Pass Criteria |
|---|-------|---------------|
| 1 | Z-index compliance | Component uses only z-10 to z-20 (z-30 only for approved hero floats) |
| 2 | Light mode | Component renders correctly and intentionally in light mode |
| 3 | Dark mode | Component renders correctly and intentionally in dark mode |
| 4 | Reuse safety | Component renders correctly when placed in a second, different section |
| 5 | No magic spacing | Component uses defined spacing tokens, not ad-hoc pixel values |
| 6 | SEO safety | Interactive content (FAQ answers, tabbed content) is in the DOM on render, not lazy-loaded behind JS |
| 7 | Accessibility | Keyboard navigable, ARIA attributes present, focus indicators visible |
| 8 | Mobile rendering | Component does not overflow, clip, or become unreadable below 375px width |
| 9 | No overflow-hidden leaks | Component does not apply overflow-hidden on a wrapper that has absolute children |
| 10 | No parent dependency | Component does not rely on a specific parent to look correct |

**If any check fails, the component is rejected until fixed.**

---

## 10. FORBIDDEN COMPONENT BEHAVIOURS (COMPLETE LIST)

1. Setting global body or html styles from within a component.
2. Using z-index above z-30 (nav and modal layers are page-level only).
3. Applying `overflow-hidden` on any wrapper that has absolutely positioned children.
4. Injecting background patterns (dot grid, line grid, glow) directly — this is a section concern.
5. Using red as a card background, section background, or badge background (red is CTA/emphasis only).
6. Adding new colours outside the defined colour roles.
7. Using icons from a library other than lucide-react.
8. Rendering generic link text ("click here", "learn more", "read more").
9. Creating continuous animations on interactive components.
10. Animating width, height, margin, or padding (except FAQ accordion).
11. Using fixed pixel heights that clip dynamic content.
12. Hiding content behind interactions on mobile (tooltips, hover-only reveals).
13. Using custom scroll behaviour within a component.
14. Rendering `<div>` with onClick instead of `<button>` or `<a>`.
15. Omitting `aria-label` on icon-only buttons.
16. Relying on colour alone to convey meaning (must pair with icon or text).
17. Using `position: fixed` inside a component (fixed positioning is page-level only).
18. Creating components that assume a specific viewport width.

---

## 11. CONFIRMATION: SYSTEM PREVENTS PREVIOUS BUILD ISSUES

This component system is specifically designed to prevent the following issues observed in prior builds:

| Previous Issue | How This System Prevents It |
|---|---|
| **Cards clipped behind section borders** | Components never apply overflow-hidden on wrappers with absolute children. Z-index is enforced per layer. |
| **Floating elements disappearing** | Floating elements are explicitly z-30, container must not use overflow-hidden, max 3 floats, all positioned relative to a defined container. |
| **Background patterns obscuring text** | Components do not own patterns. Patterns are section-level only, always behind content (z-0–5 vs z-10+). |
| **Broken dark mode** | Every component must pass both light and dark mode checks before approval. No colour inversion hacks. |
| **Inconsistent spacing** | Components use defined spacing tokens. No ad-hoc pixel values. Grid/flex gaps are standardised. |
| **Layout shifts on interaction** | No interaction may animate layout properties. Only transform and opacity are allowed. |
| **Inaccessible interactions** | All interactive components require keyboard support and ARIA attributes. Minimum 44×44px tap targets. |
| **Forms that overwhelm users** | Multi-step wizard format enforced. One logical group per step. Progress indicator required. |
| **FAQ sections dominating page** | Single-expand mode. Collapsed by default. Positioned after main content, before final CTA. |
| **Mobile overflow and clipping** | Every component must render correctly at 375px. No fixed heights on dynamic content. No horizontal overflow. |
