# PROMPT 3 — Design System & Visual Rules

Rules only. No code. No UI. No components.

---

## 1. CORE VISUAL PRINCIPLES (NON-NEGOTIABLE)

### 1.1 Clarity Over Decoration
Every visual element must serve a purpose: orient the user, emphasise information, or guide an action. If a decorative element does not make the content clearer, it must be removed. This prevents visual noise — the accumulation of elements that compete for attention and reduce readability.

### 1.2 Structure Over Creativity
Layout, spacing, and hierarchy are more important than novel visuals. Consistent section spacing, predictable alignment, and repeatable patterns are mandatory. This prevents disappearing elements — sections that collapse, shift, or vanish because they depend on creative positioning tricks instead of stable document flow.

### 1.3 Subtle Motion Over Constant Motion
Motion is a tool for drawing attention to a single event: a hover, a scroll reveal, a state change. It must never run continuously in a way that distracts from content. This prevents performance degradation and user fatigue.

### 1.4 Layers With Discipline
Every visual element belongs to a defined layer (background, content, floating, navigation, modal). Elements must never be placed outside the system. This prevents z-index bugs — the unpredictable stacking of elements where cards appear behind backgrounds, overlays block buttons, or patterns obscure text.

### 1.5 Readability Always Wins
If any visual treatment reduces text readability — pattern opacity too high, contrast too low, text on busy backgrounds — the treatment must be reduced or removed. There is no exception. This prevents unreadable sections — the most common and most damaging visual failure.

---

## 2. COLOR SYSTEM

### 2.1 Color Roles

| Role | Purpose | Light Mode | Dark Mode |
|------|---------|------------|-----------|
| **Base background** | Page-level background | Off-white (not pure #FFF) | Very dark grey (not pure #000) |
| **Surface** | Card and section backgrounds | White or very light grey | Dark grey, slightly elevated from base |
| **Primary text** | Headings, body copy | Near-black | Off-white |
| **Secondary text** | Captions, labels, helper text | Medium grey | Medium-light grey |
| **Border / divider** | Separators, card edges, input borders | Light grey | Subtle grey |
| **Accent (RED)** | Emphasis, active states, CTAs, critical numbers | Controlled red | Same red, adjusted for contrast |
| **Supporting accent** | Subtle glow, data hints only | Muted indigo or cyan | Same, lower opacity |
| **Success indicator** | Confirmation states | Muted green | Muted green, adjusted |
| **Warning indicator** | Attention states | Muted amber | Muted amber, adjusted |
| **Error indicator** | Error states | Muted red (distinct from accent red) | Muted red, adjusted |

### 2.2 Color Rules

1. **Red is NEVER a background colour.** It must not be used to fill sections, cards, banners, or containers.
2. **Red is NEVER decorative.** It must not appear in patterns, gradients, or ambient glows.
3. **Red is for:** emphasis text, active navigation states, primary CTA button accents, critical numbers (overdue, high-priority), and selected/focused states.
4. **Supporting accent (indigo/cyan):** May ONLY be used for subtle background glows (aurora-style) and data visualisation hints. Never for text, buttons, or borders.
5. **No additional colours.** No bright blues, greens, oranges, or purples beyond the defined roles. If a new colour is needed, it must be proposed and approved before use.
6. **Contrast minimums:** All text must meet WCAG AA contrast ratios — 4.5:1 for body text, 3:1 for large text and UI elements.

---

## 3. THEME SYSTEM RULES

### 3.1 Light Mode
- Background: Off-white (e.g. `#FAFAFA` or `hsl(0, 0%, 98%)`). Not pure white.
- Surface: White or `#FFFFFF` for cards, giving a subtle lift from the background.
- Text: Near-black (e.g. `#1A1A1A`). Not pure `#000`.
- Patterns: Low opacity (5–10%). Visible but quiet.
- Borders: Light grey, subtle but visible enough to define edges.

### 3.2 Dark Mode
- Background: Very dark grey (e.g. `#0A0A0A` or `hsl(0, 0%, 4%)`). Not pure `#000`.
- Surface: Slightly lighter dark grey (e.g. `#141414` or `hsl(0, 0%, 8%)`). Must be visually distinct from the base.
- Text: Off-white (e.g. `#E5E5E5`). Not pure `#FFF` to reduce glare.
- Patterns: Lower opacity than light mode (3–7%). Must not create visual noise.
- Borders: Subtle dark grey, slightly lighter than surface.

### 3.3 Theme Transition Rules
1. Both themes must look **intentionally designed** — not like one is an inversion of the other.
2. No automatic colour inversion hacks. Every colour in dark mode must be explicitly defined.
3. Patterns adapt by **opacity change**, not by removal. They are present in both themes.
4. Glow effects may be slightly more prominent in dark mode (they look better against dark backgrounds).
5. All theme switching must happen instantly — no transition animation on the body background.

---

## 4. BACKGROUND & PATTERN SYSTEM

### 4.1 Dot Grid Overlay

- **Purpose:** Add subtle depth and texture to large background areas, evoking precision and structure (accounting/ledger aesthetic).
- **Where allowed:** Hero section, full-page backgrounds, decorative separator zones.
- **Where NOT allowed:** Text-heavy sections (services lists, FAQ sections, long-form content blocks).
- **Opacity limits:** Light mode 5–10%. Dark mode 3–7%.
- **Z-index:** z-0 to z-1. Must be behind all content.
- **Behaviour:** Static. No animation. Pointer-events disabled.

### 4.2 Line / Math Grid Overlay

- **Purpose:** Create a ledger or graph-paper aesthetic. Adds visual structure without busy detail.
- **Where allowed:** Hero section, section separators, "What You Get" / demo preview sections.
- **Where NOT allowed:** Over body text, over forms, over FAQ sections.
- **Opacity limits:** Light mode 4–8%. Dark mode 3–6%.
- **Z-index:** z-0 to z-1. Must be behind all content.
- **Behaviour:** Static. No animation. Pointer-events disabled.

### 4.3 Subtle Glow Field (Aurora-Style)

- **Purpose:** Add a muted, ambient light effect to create depth and visual interest. Must feel like soft, distant light — not neon, not prominent.
- **Where allowed:** Hero section (behind headline), section transitions, behind the final CTA block.
- **Where NOT allowed:** Over text, over cards, over interactive elements, on every section (use sparingly — 2–3 instances per page maximum).
- **Opacity limits:** Light mode 8–15%. Dark mode 10–20%.
- **Colour:** Muted indigo or cyan ONLY.
- **Z-index:** z-2 to z-5. Behind content, may sit above grid patterns.
- **Behaviour:** May have a very slow, barely perceptible drift animation (10+ second cycle). Must respect prefers-reduced-motion (static fallback).

### 4.4 Absolute Background Rules
1. **No pattern may ever sit above z-10.** Content always wins.
2. **All pattern elements must be `pointer-events: none`.** They must never block clicks.
3. **Patterns are always optional.** Every section must look complete without them.
4. **Patterns may be toggled per section.** The SectionWrapper component must support enabling/disabling each pattern independently.
5. **Never stack all three patterns on the same section.** Maximum of two patterns on any single section (e.g. dots + glow, or grid + glow). Never all three.

---

## 5. Z-INDEX LAYER SYSTEM

| Layer | Z-Index Range | Purpose | Examples |
|-------|---------------|---------|----------|
| **Background patterns** | z-0 to z-5 | Dot grids, line grids, glow fields | DotGridOverlay, LineGridOverlay, AuroraGlowOverlay |
| **Section content** | z-10 | All text, headings, paragraphs, lists, images within sections | H1, body copy, service descriptions |
| **Cards & components** | z-20 | Elevated interactive elements | Service cards, testimonial cards, form containers |
| **Floating overlays** | z-30 | Decorative badges, floating indicators, tooltips | Hero floating elements, notification badges |
| **Navigation** | z-50 | Header, mega menu trigger, mobile menu overlay | Navbar, sticky header |
| **Modals & menus** | z-60+ | Mega menu dropdown, modal dialogs, mobile navigation drawer | Services mega menu, contact modal (if any) |

### Layer Rules
1. **No arbitrary z-index values.** Every element must fit within the defined layers.
2. **No overlapping layer roles.** A card must not be z-30; a pattern must not be z-20.
3. **No `overflow-hidden` on outer containers** that have absolutely positioned children. Rounding must be applied to inner wrappers only.
4. **Stacking context awareness.** `transform`, `opacity`, `filter`, and `will-change` create new stacking contexts. Be aware that z-index inside a stacking context is relative, not global.
5. **Debug rule:** If a visual element is clipped or hidden, first check for `overflow-hidden` on ancestors, then check z-index assignment.

---

## 6. TYPOGRAPHY SYSTEM

### 6.1 Type Scale

| Level | Usage | Weight | Line Height |
|-------|-------|--------|-------------|
| **H1** | Page title. One per page. | Bold (700) | Tight (1.1–1.2) |
| **H2** | Section headings | Semibold (600) | Tight (1.2–1.3) |
| **H3** | Sub-section headings, card titles | Semibold (600) | Normal (1.3–1.4) |
| **H4** | Minor headings, labels | Medium (500) | Normal (1.4) |
| **Body** | Paragraphs, descriptions | Regular (400) | Relaxed (1.6–1.7) |
| **Helper** | Captions, form labels, metadata | Regular (400) | Normal (1.4–1.5) |
| **Numeric / Data** | Statistics, KPI values, financial figures | Semibold or Mono (600) | Tight (1.1–1.2) |

### 6.2 Typography Rules
1. **One H1 per page.** No exceptions.
2. **Headings must be scannable.** A user skimming only headings should understand the page structure.
3. **Paragraphs: maximum 3–4 lines.** Break long paragraphs into shorter blocks or use bullet lists.
4. **Data text must be visually distinct but calm.** Use tabular/mono numerals for financial figures. Slightly larger size or semibold weight is acceptable. No flashy styling.
5. **Font family:** A clean sans-serif. Inter, Geist, or similar. One family only (with weight variations). No serif fonts unless explicitly approved for a specific decorative use.
6. **No decorative fonts for body text.** Display/decorative typefaces are only allowed in the H1 on the homepage, if at all.
7. **Letter spacing:** Default for body text. May be slightly widened for all-caps labels and navigation items.

---

## 7. ICONOGRAPHY RULES

1. **Style:** Line-based icons only (lucide-react). No filled/solid icons unless in active/selected states.
2. **Stroke width:** Consistent across the entire site. Use the library default (typically 1.5–2px).
3. **Size:** Icons must be proportional to adjacent text. Typical sizes: 16px (inline), 20px (labels), 24px (cards), 32–48px (feature illustrations).
4. **Colour:** Icons use the secondary text colour by default. May use accent red for active/selected states.
5. **Icons must never overpower text.** If an icon draws more attention than its label, reduce its size or weight.
6. **No custom icon sets.** Use lucide-react exclusively. If a missing icon is needed, use the closest available alternative — do not introduce another icon library.
7. **Accessibility:** All icons must have an `aria-label` or be marked `aria-hidden="true"` if purely decorative.

---

## 8. MOTION PRINCIPLES

### 8.1 When Motion Is Allowed

| Context | Allowed Motion | Duration |
|---------|---------------|----------|
| **Hover feedback** | Subtle scale lift, shadow deepening, colour shift | 150–200ms |
| **Section reveal** | Fade in + slight upward translate on scroll entry | 300–500ms |
| **Hero floating indicators** | Very slow vertical drift | 6–10s cycle |
| **Button press** | Subtle scale down on press | 100ms |
| **Navigation transitions** | Mega menu fade in/slide | 200–300ms |
| **Theme toggle** | No transition on background; icons may animate | Instant background |
| **FAQ accordion** | Height expand/collapse | 200–300ms |

### 8.2 Motion Rules
1. **Motion must not affect layout.** Animations use `transform` and `opacity` only. No animating `width`, `height`, `margin`, or `padding`.
2. **Motion must be subtle.** Maximum translate distance: 12–20px. Maximum scale change: 1.02–1.05.
3. **Motion must respect `prefers-reduced-motion`.** When this media query matches, all motion must be disabled or reduced to instant opacity changes.
4. **No continuous motion** except hero floating indicators (very slow, barely perceptible) and aurora glow drift (10+ second cycle, optional).
5. **No entrance animations that delay content visibility.** Fade-ins must start immediately on scroll entry, not after a delay.
6. **No exit animations.** When a section scrolls out of view, it simply leaves. No fade-outs.
7. **No page transition animations in Phase 1.** Standard Next.js navigation.

---

## 9. SECTION-LEVEL DESIGN RULES

### 9.1 Section Spacing
- Vertical padding between sections: consistent, generous. Suggested: `py-16` to `py-24` (64px to 96px).
- On mobile: reduce to `py-12` to `py-16` (48px to 64px).
- Internal element spacing within a section: consistent margin/gap system (8px base increments).

### 9.2 Visual Separation
- Sections may alternate between base background and surface background for depth.
- Pattern: Section 1 (base) → Section 2 (surface) → Section 3 (base) — alternating.
- A subtle border-top or gradient divider may be used between sections, but is not required if background alternation provides enough separation.

### 9.3 Alternating Background Depth
- Not every section needs a different background. Alternation should feel natural, not forced.
- Consecutive sections with the same background are acceptable if they have different content types.
- Surface sections may have slightly visible borders or shadow to feel elevated.

### 9.4 Maximum Visual Density Per Section
- **Maximum 3 visual elements per section:** content + (optional pattern) + (optional glow).
- **No section should contain:** pattern + glow + floating elements + animated content simultaneously.
- **White space is required.** Every section must have generous spacing around content. If a section feels cramped, add padding before adding design.

---

## 10. FAQ DESIGN RULES

1. **Collapsible accordion format.** Each Q&A pair is collapsed by default. Clicking the question expands the answer.
2. **Only one answer may be open at a time** (single-expand mode). This prevents the FAQ section from becoming visually overwhelming.
3. **Visual weight:** FAQs must not dominate the page. They sit below the main service content and above the final CTA.
4. **Scannable questions:** Question text must be readable at a glance — bold or semibold weight, slightly larger than body text.
5. **Answer formatting:** Answers use body text weight. May include short bullet lists if helpful.
6. **Present on ALL service pages.** This is mandatory per PROMPT 0.
7. **No FAQ section on the homepage.** FAQ content belongs on service pages.
8. **Chevron or plus/minus indicator** on the right side of each question row to signal interactivity.

---

## 11. DESIGN SAFETY CHECKLIST

Before any page is built, the following must be confirmed:

- [ ] Patterns are subtle and optional — content is readable without them
- [ ] No text is placed on busy backgrounds without sufficient contrast
- [ ] Floating elements cannot be clipped by `overflow-hidden` on any ancestor
- [ ] Light mode looks intentionally designed (not washed out)
- [ ] Dark mode looks intentionally designed (not just inverted)
- [ ] All text meets WCAG AA contrast ratios
- [ ] Z-index values match the defined layer system
- [ ] No arbitrary z-index values exist
- [ ] Background overlays are `pointer-events: none`
- [ ] No experimental visuals have been added without approval
- [ ] Motion respects `prefers-reduced-motion`
- [ ] No continuous animation on content sections
- [ ] Section spacing is consistent
- [ ] Mobile layout does not clip or overflow

---

## SUMMARY: DESIGN RULES (QUICK REFERENCE)

### Allowed Visual Tools
- Dot Grid Overlay (subtle, z-0–1, pointer-events: none)
- Line / Math Grid Overlay (subtle, z-0–1, pointer-events: none)
- Aurora Glow Field (muted indigo/cyan, z-2–5, max 2–3 per page)
- Background alternation (base ↔ surface)
- Subtle hover effects (scale, shadow, colour shift)
- Scroll-triggered fade-in reveals
- Hero floating indicators (very slow drift)
- Red accent for CTAs, emphasis, and active states
- Line-based icons (lucide-react)

### Forbidden Design Behaviours
1. Red used as a background colour
2. Red used decoratively (gradients, patterns, glows)
3. Pure black (#000) or pure white (#FFF) as page backgrounds
4. Patterns placed above z-5
5. Patterns without pointer-events: none
6. overflow-hidden on containers with absolute children
7. Arbitrary z-index values outside the defined layer system
8. Stacking more than 2 patterns on a single section
9. Continuous animation on content sections
10. Motion that affects layout (animating width, height, margins)
11. Entrance animations with delays
12. Additional colours beyond the defined roles
13. Additional icon libraries beyond lucide-react
14. Decorative fonts for body text
15. Fixed pixel heights on dynamic content sections
16. Scroll hijacking or parallax that alters scroll speed

### Long-Term Maintenance Confirmation
This design system is safe for long-term maintenance because:
- **Colour roles are defined, not raw values.** Changing a colour means updating one token, not hunting through files.
- **Z-index is documented and enforced.** No ad-hoc stacking decisions will accumulate over time.
- **Patterns are optional and controlled.** Every section works without them, so they can be turned off without breaking layout.
- **Motion is bounded.** Rules prevent animation creep — no one can add flashy effects without violating a documented rule.
- **Typography is systematic.** A defined type scale prevents inconsistent font sizes and weights from multiplying.
- **Both themes are explicitly designed.** No inversion hacks means no fragile dark mode that breaks with every new component.
- **All rules reference PROMPT 0 as authority.** Conflicts are resolved by checking the rulebook, not by personal preference.
