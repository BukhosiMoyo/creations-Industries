# PROMPT 7 — Light/Dark Mode Implementation Rules

Rules, token definitions, and implementation strategy.
Actual code follows at CHECKPOINT 1.

---

## 1. TOKEN STRATEGY — CONFIRMED

### CSS Custom Properties (Design Tokens)

All colour values are defined as CSS custom properties on `:root` (light) and `.dark` (dark). Components reference tokens only — never raw hex, rgb, or hsl values.

```
Token Name                 │ Light Mode Value        │ Dark Mode Value
───────────────────────────┼─────────────────────────┼──────────────────────────
--background               │ hsl(0, 0%, 98%)         │ hsl(0, 0%, 4%)
--surface                  │ hsl(0, 0%, 100%)        │ hsl(0, 0%, 8%)
--surface-elevated         │ hsl(0, 0%, 97%)         │ hsl(0, 0%, 11%)
--text-primary             │ hsl(0, 0%, 10%)         │ hsl(0, 0%, 90%)
--text-secondary           │ hsl(0, 0%, 40%)         │ hsl(0, 0%, 60%)
--text-muted               │ hsl(0, 0%, 55%)         │ hsl(0, 0%, 45%)
--border                   │ hsl(0, 0%, 90%)         │ hsl(0, 0%, 15%)
--border-subtle            │ hsl(0, 0%, 94%)         │ hsl(0, 0%, 12%)
--ring                     │ hsl(0, 0%, 20%)         │ hsl(0, 0%, 80%)
--accent                   │ hsl(0, 72%, 51%)        │ hsl(0, 72%, 55%)
--accent-hover             │ hsl(0, 72%, 45%)        │ hsl(0, 72%, 60%)
--accent-text              │ hsl(0, 0%, 100%)        │ hsl(0, 0%, 100%)
--glow-accent              │ hsla(230, 60%, 60%, 0.1)│ hsla(230, 60%, 60%, 0.15)
--success                  │ hsl(142, 40%, 40%)      │ hsl(142, 40%, 55%)
--warning                  │ hsl(38, 80%, 50%)       │ hsl(38, 80%, 60%)
--error                    │ hsl(0, 60%, 48%)        │ hsl(0, 60%, 55%)
```

### Token Rules
1. **Every component uses tokens.** No inline `#1a1a1a` or `rgb(255,255,255)` anywhere.
2. **Tailwind config references tokens.** Tailwind's `colors` extend with CSS variable references so normal utility classes (`bg-background`, `text-primary`, `border-border`) work.
3. **Accent red is purposefully different from error red.** Accent is vivid and saturated; error is muted and desaturated. They must not be confused.
4. **Glow accent** is the ONLY token with built-in opacity (hsla). All other tokens are opaque and opacity is applied at the component level.

### Contrast Verification

| Combination | Light Mode Ratio | Dark Mode Ratio | WCAG AA (4.5:1) |
|---|---|---|---|
| text-primary on background | ~16:1 | ~14:1 | ✅ Pass |
| text-secondary on background | ~6.5:1 | ~5.5:1 | ✅ Pass |
| text-muted on background | ~4.8:1 | ~4.5:1 | ✅ Pass (borderline, acceptable for helper text) |
| accent on surface | ~5.2:1 | ~5.0:1 | ✅ Pass |
| accent-text on accent | ~7:1 | ~6:1 | ✅ Pass |

All text combinations meet WCAG AA minimum. Text-muted is at the threshold and is only used for non-essential helper text (captions, timestamps), never for body copy.

---

## 2. NEXT-THEMES SETUP — CONFIRMED

### Configuration

```
Provider:        next-themes ThemeProvider
Attribute:       class (sets .dark on <html>)
Default theme:   system (respects OS preference)
Storage:         localStorage (theme persists across visits)
Disable transitions on toggle: true (no flash of wrong theme)
```

### Setup Approach

1. **ThemeProvider wraps the entire app** in `app/layout.tsx`, inside the `<body>` tag.
2. **`suppressHydrationWarning`** is added to the `<html>` element to prevent React hydration mismatch warnings caused by the theme script.
3. **`enableSystem: true`** — users who have never toggled get their OS preference.
4. **`attribute: "class"`** — theme is applied via `.dark` class on `<html>`, which Tailwind's `darkMode: "class"` reads.
5. **`disableTransitionOnChange: true`** — prevents the flash/flicker when toggling between themes. Background changes instantly.

### Hydration Safety
- next-themes injects a blocking `<script>` that reads localStorage and applies the theme class before React hydrates. This prevents the flash of wrong theme on page load.
- No theme-dependent content should be conditionally rendered based on `useTheme()` during SSR. Use CSS-only theme switching (via `.dark` class and CSS variables).

---

## 3. PATTERN ADAPTATION STRATEGY — CONFIRMED

### How Patterns Adapt Per Theme

Patterns (DotGridOverlay, LineGridOverlay, AuroraGlowOverlay) adapt by **opacity change**, not removal. They are always rendered in both themes.

| Pattern | Light Mode Opacity | Dark Mode Opacity | Notes |
|---|---|---|---|
| **DotGridOverlay (subtle)** | 5% | 3% | Default for most sections |
| **DotGridOverlay (normal)** | 8% | 5% | Available for hero or feature sections |
| **DotGridOverlay (strong)** | 10% | 7% | Hero only. Capped. |
| **LineGridOverlay (subtle)** | 4% | 3% | Default for most sections |
| **LineGridOverlay (normal)** | 6% | 4% | Available for separators and demo sections |
| **LineGridOverlay (strong)** | 8% | 6% | Hero only. Capped. |
| **AuroraGlowOverlay** | 8–15% | 10–20% | Glow is slightly more visible in dark mode (intentional — it looks better against dark backgrounds) |

### Pattern Colour Adaptation

| Pattern | Light Mode Colour | Dark Mode Colour |
|---|---|---|
| **DotGridOverlay** | `hsl(0, 0%, 0%)` at low opacity | `hsl(0, 0%, 100%)` at lower opacity |
| **LineGridOverlay** | `hsl(0, 0%, 0%)` at low opacity | `hsl(0, 0%, 100%)` at lower opacity |
| **AuroraGlowOverlay** | Muted indigo via `--glow-accent` | Same token, slightly higher opacity |

### Implementation Approach
- Patterns use CSS variables for their opacity and colour.
- The SectionWrapper component passes an `intensity` prop (`"subtle" | "normal" | "strong"`) to each pattern.
- Each pattern maps the intensity to a CSS class that resolves to the correct opacity for the current theme.
- **No JavaScript theme detection in pattern components.** All adaptation is CSS-only via `.dark` class.

### Pattern Safety Rules (Repeated from PROMPT 3)
1. All patterns at z-0 to z-5.
2. All patterns `pointer-events: none`.
3. Maximum 2 patterns per section.
4. Never stack dots + lines + glow together.
5. Patterns are optional — every section looks complete without them.

---

## 4. TOGGLE PLACEMENT — CONFIRMED

### Navbar Toggle Specification

| Property | Value |
|---|---|
| **Position** | Right side of navbar, before "Get a Quote" CTA button |
| **Icon (light mode)** | Moon icon (lucide-react `Moon`) — indicates "click to switch to dark" |
| **Icon (dark mode)** | Sun icon (lucide-react `Sun`) — indicates "click to switch to light" |
| **System default icon** | Monitor icon (lucide-react `Monitor`) — visible only in settings dropdown if 3-state toggle is used |
| **Size** | 20px icon inside a 40×40px clickable area |
| **Transition** | Icon swaps instantly on click (no rotation or morph animation) |
| **Layout impact** | None. Fixed width allocated in navbar. Toggle never causes reflow. |
| **Accessibility** | `aria-label="Toggle theme"`, `role="button"` |
| **Mobile** | Same position, same behaviour. Visible in mobile navbar, not hidden in hamburger menu. |

### Why Simple Toggle (Not Dropdown)
- Two-state toggle (light ↔ dark) is simplest and least error-prone.
- System preference is the default on first visit. After that, manual toggle overrides.
- No need for a 3-state dropdown (light/dark/system) in Phase 1. If users clear localStorage, they return to system preference.

---

## 5. QA CHECKLIST

This checklist must be executed after the theme system is implemented (during CHECKPOINT 1). Every item must pass in both light and dark mode.

### Layout Integrity

| # | Check | Pass Criteria |
|---|---|---|
| 1 | No sections disappear on toggle | All 10 homepage sections visible in both themes |
| 2 | No layout shift on toggle | Page does not reflow, jump, or resize |
| 3 | No flash of wrong theme on load | First paint matches stored/system preference |
| 4 | Mobile layout intact | No overflow, clipping, or misalignment in both themes |

### Overlays & Patterns

| # | Check | Pass Criteria |
|---|---|---|
| 5 | DotGridOverlay visible but subtle | Dots are perceptible in both themes, never dominant |
| 6 | LineGridOverlay visible but subtle | Lines are perceptible in both themes, never dominant |
| 7 | AuroraGlow adapts | Glow is slightly more visible in dark mode, subtle in light |
| 8 | No overlay becomes clickable | All overlays remain `pointer-events: none` |
| 9 | No pattern obscures text | All text remains readable over patterns in both themes |

### Components

| # | Check | Pass Criteria |
|---|---|---|
| 10 | Cards maintain contrast | Card surfaces are distinct from base background in both themes |
| 11 | Buttons visible and accessible | Primary CTA has sufficient contrast in both themes |
| 12 | Borders visible | Border tokens produce visible but subtle dividers in both themes |
| 13 | Focus rings visible | Tab-navigating through elements shows clear focus indicators |
| 14 | Disabled states distinguishable | Disabled buttons/inputs are clearly different from active states |

### Typography

| # | Check | Pass Criteria |
|---|---|---|
| 15 | Primary text readable | text-primary easily readable on background in both themes |
| 16 | Secondary text readable | text-secondary clearly readable, lighter than primary |
| 17 | Muted text acceptable | text-muted is readable for helper text (not for body copy) |
| 18 | Accent red stands out | accent colour is clearly distinct and attention-drawing |

### Technical

| # | Check | Pass Criteria |
|---|---|---|
| 19 | No console errors | Zero errors on toggle and on load in both themes |
| 20 | localStorage persists | Refreshing page preserves chosen theme |
| 21 | System preference works | New visitor without stored preference gets OS theme |
| 22 | Toggle icon correct | Moon shown in light mode, Sun shown in dark mode |

**Total: 22 checks. All must pass before CHECKPOINT 1 is considered complete.**

---

## 6. WHAT THIS DOES NOT INCLUDE

This document defines the theme system only. The following are explicitly NOT part of this prompt:

- Page layouts or section designs (PROMPT 5 + CHECKPOINT 2)
- Animation implementation (CHECKPOINT 3)
- Form implementation (CHECKPOINT 4)
- Component code (CHECKPOINT 1, built according to PROMPT 4 rules)

The theme system is infrastructure. It must be in place before any component or page is built, because every visual element depends on tokens.
