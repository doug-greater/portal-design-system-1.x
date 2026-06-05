# Greater Design System
### Portal 1.0 · May 2026

> Greater Industries builds AI that helps wholesalers and distributors make the smartest, most efficient, most profitable decisions across their entire business. From warehouse workers and truck drivers to sales reps and owners — Greater's portal is the cockpit that connects the people who power local economies.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Brand & Logo](#2-brand--logo)
3. [Colors](#3-colors)
4. [Typography](#4-typography)
5. [Spacing](#5-spacing)
6. [Borders & Radii](#6-borders--radii)
7. [Elevation & Shadows](#7-elevation--shadows)
8. [Iconography](#8-iconography)
9. [Components](#9-components)
   - [Buttons](#buttons) (primary · secondary · warning · neutral · ghost · neo)
   - [Row Actions](#row-actions) (Menu primitive · Split button · Kebab)
   - [Inputs & Forms](#inputs--forms)
   - [Controls (Toggle, Checkbox, Radio)](#controls-toggle-checkbox-radio)
   - [Filter Chips](#filter-chips) · [Filter Menu](#filter-menu-consolidated)
   - [Tabs](#tabs)
   - [Pills (Category · Role · label)](#pills-category--role--label)
   - [Status Badge](#status-badge)
   - [Stat Cards](#stat-cards)
   - [Tables](#tables) · [Pagination](#pagination)
   - [Info Banners](#info-banners) · [Selection Bar](#selection-bar-floating)
   - [User Avatars](#user-avatars) · [Role Pills](#role-pills-the-pill-applied-to-roles) · [Account Type Icon](#account-type-icon)
   - [Permission Cards](#permission-cards)
   - [Modal & Drawer](#modal--drawer) (incl. the `confirm` variant — formerly Confirmation Dialog)
   - [Toast](#toast) · [Loading & Skeleton](#loading--skeleton) · [Empty States](#empty-states)
   - [Date Picker](#date-picker)
   - [Page Detail Header](#page-detail-header)
   - [App Shell & Navigation Sidebar](#app-shell--navigation-sidebar)
   - [Maps](#maps)
10. [Motion](#motion)
11. [Voice & Copy](#voice--copy)
12. [Layout](#layout)
13. [CSS Token Reference](#13-css-token-reference)
14. [Fonts](#14-fonts)
15. [Working With This System](#15-working-with-this-system)

---

## 1. Overview

The Portal design system supports two coexisting visual languages:

| Language | Where Used | Primary Color | Character |
|---|---|---|---|
| **Portal** | Shipping product UI | `#155DFC` / `#007CFF` | Cool-gray neutrals, 14–16px Inter, tight headlines |
| **Foundation** | Brand / marketing / onboarding moments | `#007CFF` | Black headings, five-accent palette, neo-brutalist button |

**Prefer Portal tokens for all product work.** Fall back to Foundation tokens for brand-forward moments (login, landing pages, onboarding).

The portal is information-dense — big data tables, filter chips, stat cards, comparison charts. It is designed for operators who live in the tool all day, not marketing surfaces.

---

## 2. Brand & Logo

### Assets

| Asset | File | Usage |
|---|---|---|
| Wordmark (primary) | `assets/greater-logotype.png` | Default in-product mark. Nav, auth screens, emails, documents. |
| Wordmark (knockout) | `assets/greater-logotype-ko.png` | Dark surfaces, photography overlays, dark-mode chrome. |
| Crow mark | `assets/greater-crow.png` | Tight spaces: app icon, favicon, avatar, loading states, tab icon. |
| Crow mark (knockout) | `assets/greater-crow-ko.png` | Dark-mode favicon, inverse avatars. |

### Rules

- **Do not** use the combined lockup (crow + wordmark) inside the product — that is the corporate marketing logo. In-app, use the wordmark or the crow, never both together.
- Use the wordmark at 100–300px wide. Do not skew, do not recolor.
- Brand name is always **"Greater"** or **"Greater Industries"** — never abbreviated, never all-caps, never stylized.

---

## 3. Colors

### Foundation Neutrals

| Token | Hex | Role |
|---|---|---|
| `--g-black` | `#000000` | Absolute black, headlines |
| `--g-dark-gray` | `#5F5E5E` | Secondary text |
| `--g-medium-gray` | `#8A8A8A` | Placeholder text |
| `--g-light-gray` | `#DADADA` | Inactive / dividers |
| `--g-off-white` | `#F5F5F5` | Surface backgrounds |
| `--g-white` | `#FFFFFF` | Pure white |

### Foundation Transparency Ladder (overlays on black)

| Token | Value | Role |
|---|---|---|
| `--g-black-100` | `rgba(0,0,0,1)` | Full opacity |
| `--g-black-25` | `rgba(0,0,0,.25)` | Inactive buttons |
| `--g-black-10` | `rgba(0,0,0,.10)` | Label-tag backgrounds |
| `--g-black-05` | `rgba(0,0,0,.05)` | Selected row backgrounds |

### Foundation Accent Quintet

| Token | Hex | Name | Role |
|---|---|---|---|
| `--g-primary-blue` | `#007CFF` | Primary blue | Primary actions, links |
| `--g-secondary-green` | `#00BC57` | Secondary green | Success, positive feedback |
| `--g-secondary-red` | `#E5484D` | Secondary red (True Red) | Errors, danger, destructive actions |
| `--g-tertiary-gold` | `#DB9E03` | Tertiary gold | Warnings, draining states |
| `--g-tertiary-purple` | `#7B68EE` | Tertiary purple | Accent use |
| `--g-seldom-sky` | `#55A7FF` | Seldom sky | Escape hatch; use sparingly |

### Foundation Tinted Surfaces (25% / 10% / 5% of accent over white)

| Token | Value |
|---|---|
| `--g-blue-25` | `rgba(0,124,255,.25)` |
| `--g-blue-10` | `rgba(0,124,255,.10)` |
| `--g-blue-05` | `rgba(0,124,255,.05)` |
| `--g-red-10` | `rgba(229,72,77,.12)` |
| `--g-green-10` | `rgba(0,188,87,.12)` |
| `--g-gold-10` | `rgba(219,158,3,.12)` |
| `--g-purple-10` | `rgba(123,104,238,.12)` |

### Portal Neutral Ramp

| Token | Hex | Role |
|---|---|---|
| `--p-ink` | `#101828` | Headings |
| `--p-text` | `#364153` | Body text, icon defaults |
| `--p-text-2` | `#4A5565` | Body secondary |
| `--p-muted` | `#6A7282` | Metadata / captions |
| `--p-placeholder` | `#99A1AF` | Input placeholder / muted count |
| `--p-border` | `#E5E7EB` | 1px dividers, table borders |
| `--p-border-strong` | `#D1D5DC` | Input borders |
| `--p-surface` | `#FFFFFF` | Default surface |
| `--p-surface-alt` | `#F9FAFB` | Table header / zebra rows |
| `--p-surface-tint` | `#F3F4F6` | Tab-strip background |

### Portal Primary Blue

| Token | Hex | Role |
|---|---|---|
| `--p-primary` | `#007CFF` | Primary actions |
| `--p-primary-hover` | `#0066D6` | Hover state |
| `--p-primary-soft` | `#DBEAFE` | Active count badge backgrounds |
| `--p-primary-tint` | `#EFF6FF` | Row hover / info backgrounds |
| `--p-primary-ink` | `#155DFC` | Link text |

### Portal Feedback

| Token | Hex | Role |
|---|---|---|
| `--p-success` | `#00BC57` | Success |
| `--p-warning` | `#DB9E03` | Warning |
| `--p-danger` | `#E5484D` | Danger / error |
| `--p-danger-strong` | `#DC2626` | Strong danger |

### Portal Category Pills

| Category | Background Token | Foreground Token | Bg Hex | Fg Hex |
|---|---|---|---|---|
| Beer | `--p-pill-beer-bg` | `--p-pill-beer-fg` | `#FFFBEB` | `#BB4D00` |
| Wine | `--p-pill-wine-bg` | `--p-pill-wine-fg` | `#F5F3FF` | `#6B21A8` |
| Spirits | `--p-pill-spirits-bg` | `--p-pill-spirits-fg` | `#FFF7ED` | `#C2410C` |
| RTD | `--p-pill-rtd-bg` | `--p-pill-rtd-fg` | `#EFF6FF` | `#1447E6` |
| Non-Alcoholic | `--p-pill-nonalc-bg` | `--p-pill-nonalc-fg` | `#ECFDF5` | `#047857` |

### Semantic Aliases

```css
--fg-1: var(--p-ink)          /* Strongest text */
--fg-2: var(--p-text)
--fg-3: var(--p-muted)
--fg-4: var(--p-placeholder)
--fg-link: var(--p-primary)
--fg-invert: var(--g-white)

--bg-1: var(--p-surface)
--bg-2: var(--p-surface-alt)
--bg-3: var(--p-surface-tint)
--bg-hover: var(--p-primary-tint)

--border-1: var(--p-border)
--border-2: var(--p-border-strong)
--border-focus: var(--p-primary)
```

### Color Rules

- Tints are always 25% / 10% / 5% of the accent over white — never ad-hoc.
- No gradients in product surfaces. No full-bleed imagery. No repeating patterns.
- The login screen is a sea of white with the raven logo centered — that restraint is the brand.

---

## 4. Typography

### Font Families

| Token | Stack | Role |
|---|---|---|
| `--font-sans` | `"Inter", "Inter Fallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif` | All UI text |
| `--font-mono` | `"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace` | IDs, codes, tabular data |

Inter is the **only** UI family (Regular / Medium / Semibold / Bold / Light). No serif, no display face.

### Type Scale

| Token | px | Role |
|---|---|---|
| `--fs-10` | 10px | Legal / fine print |
| `--fs-11` | 11px | Subtitle-2, micro-labels |
| `--fs-12` | 12px | Overline, table-header caps, mono |
| `--fs-14` | 14px | Body, section title caps |
| `--fs-16` | 16px | Default page body |
| `--fs-18` | 18px | Headline 3 / sign-in heading |
| `--fs-20` | 20px | Headline 2 / stat values |
| `--fs-24` | 24px | Headline 1 (page title) |
| `--fs-32` | 32px | Headline 1 display (reporting) |
| `--fs-40` | 40px | Hero |
| `--fs-48` | 48px | Brand |

### Letter Spacing

| Token | Value | Role |
|---|---|---|
| `--tracking-tight` | `-0.02em` | Large headings |
| `--tracking-normal` | `0` | Default |
| `--tracking-wide` | `0.05em` | Buttons, 105% letter spacing |
| `--tracking-caps` | `0.05em` | All-caps labels |
| `--tracking-micro` | `0.025em` | 14px filter labels |

### Semantic Type Classes

| Class | Spec | Usage |
|---|---|---|
| `.g-h1-display` | Inter Bold 32 / 1.05, ls 0 | Reporting / detail page title |
| `.g-h1` | Inter Semibold 24 / 1.33, ls −0.025em | Portal page title |
| `.g-h2` | Inter Semibold 20 / 1.2, ls 0 | Compact page title |
| `.g-h3` | Inter Regular 18 / 1.33, ls +0.05em | Secondary info, sign-in heading |
| `.g-section-title` | Inter Medium 14 UPPERCASE, ls +0.05em | Section title, column header |
| `.g-subtitle-1` | Inter Medium 14 UPPERCASE, ls +0.05em, medium-gray | Subtitle under H1 |
| `.g-subtitle-2` | Inter Regular 11 / 1.3, medium-gray | Fine print / legal |
| `.g-body-1` | Inter Regular 16 / 1.4 | Standard page & table content |
| `.g-body-2` | Inter Bold 16 / 1.4 | Emphasized body |
| `.g-body-3` | Inter Regular 16 / 1.4, medium-gray | Subdued body |
| `.g-body-4` | Inter Regular 16 / 1.4, ls +0.025em | Toggle descriptions |
| `.g-overline` | Inter Regular 12 UPPERCASE, ls +0.05em, dark-gray | Overline labels |
| `.g-overline-tag` | As overline, on `#F5F5F5` pill with 4px radius | Overline on soft-gray pill |
| `.g-link` | Inter Medium, primary blue, no underline (underline on hover) | Text hyperlinks |
| `.g-error` | Inter Medium 12, danger red | Error messages below fields |
| `.g-mono` | Geist Mono 12 | Code / IDs |
| `.g-info` | Inter Regular 14, blue-tint bg, 8px radius | Inline info callout |
| `.g-info.danger` | As above, red-tint bg | Inline danger callout |
| `.g-tooltip-headline` | Inter Medium 14, `--p-ink` | Tooltip heading |
| `.g-tooltip-body` | Inter Regular 14 / 1.4, dark-gray | Tooltip body |

### Inline Links

Two variants, distinguished by whether the link color alone signals interactivity.

**Primary (blue)** — the default. Blue (`#007CFF`) *is* the affordance, so there is **no underline at rest**.

```css
color: #007CFF;
font-weight: 500;
text-decoration: none;
/* hover */ color: #0066D6; text-decoration: underline; text-underline-offset: 2px; text-decoration-thickness: 1px;
```

**Subdued (neutral color)** — a link rendered in a muted/gray color (e.g. the "Show" action on stat cards, or metadata rows). With no blue cue, it **must be underlined** to read as interactive.

```css
color: var(--p-muted);
font-weight: 500;
text-decoration: underline;
text-decoration-thickness: 1px;
text-decoration-color: #C4C9D2;
text-underline-offset: 2px;
/* hover */ color: var(--p-ink); text-decoration-color: var(--p-ink);
```

**Rules**

- Never use a **dotted** underline — solid only.
- Blue links: no rest-state underline; underline on hover for affordance.
- Any non-blue (gray/neutral) link: always underlined at rest.
- Don't underline blue links inside dense UI just for emphasis — the color carries it.

### Sentence Case Rules

- **Sentence case everywhere** except:
  - Column headers: all caps, tracked (`PRODUCT`, `ACCOUNTS`, `IN MARKET`)
  - Overlines: all caps (`OVERLINE 1`)
  - Tab labels & filter chips: Title Case (`Products in Market`, `All Products`)

---

## 5. Spacing

Base unit is **4px**. All spacing tokens are multiples of this base.

| Token | Value |
|---|---|
| `--space-0-5` | 2px |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

---

## 6. Borders & Radii

### Border Styles

| Context | Value |
|---|---|
| Cards / tables | `1px solid #E5E7EB` (`--p-border`) |
| Inputs (default) | `1px solid #D1D5DC` (`--p-border-strong`) |
| Inputs (focus) | `1px solid #007CFF` + `box-shadow: 0 0 0 3px rgba(21,93,252,.15)` |
| Inputs (error) | `1px solid #E5484D` |
| Inputs (disabled) | `1px solid #E5E7EB`, bg `#fff` (white, dimmed via uniform `#99A1AF`) |

### Border Radius Tokens

| Token | Value | Usage |
|---|---|---|
| `--radius-xs` | 2px | — |
| `--radius-sm` | 4px | Buttons, pill-with-text, inputs |
| `--radius-md` | 6px | Filter chips, stat cards |
| `--radius-lg` | 8px | Prompt callouts, large cards, info banners |
| `--radius-xl` | 10px | Elevated floating cards (TableView) |
| `--radius-pill` | 999px | Badges, tags, toggle track |

---

## 7. Elevation & Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-tooltip` | `0 2px 6px 0 rgba(0,0,0,.15)` | Tooltip popovers |
| `--shadow-card` | `0 1px 2px -1px rgba(0,0,0,.10), 0 1px 3px 0 rgba(0,0,0,.10)` | Stat cards, secondary buttons |
| `--shadow-float` | `0 4px 6px -4px rgba(0,0,0,.10), 0 10px 15px -3px rgba(0,0,0,.10)` | Elevated floating cards (route popover) |
| `--shadow-brutal` | `2px 2px 0 0 rgb(0,0,0)` | Foundation brand-moment buttons only |

Cards in-table have **no shadow**. Use `--shadow-card` for stat cards and `--shadow-float` for detached popovers.

---

## 8. Iconography

Greater uses **Material Symbols (Rounded)** for all in-product iconography.

> **One icon system.** Material Symbols Rounded is the *only* icon set, delivered as the variable **font** and addressed by ligature name (e.g. `search`, `expand_more`, `unfold_more`). Lucide and Iconify have been fully removed from the kit. In React, use the shared `Icon` component (`<Icon name="expand_more" size={16} />`); in plain HTML, a `<span class="material-symbols-rounded">expand_more</span>`. The only non-glyph exceptions are CSS background marks (e.g. the native `<select>` chevron data-URI) and map illustration.

### Loading

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
```

### Usage

```html
<span class="material-symbols-rounded">search</span>
```

### Defaults

- Weight: 400
- Optical size: 24
- Fill: 0 (outlined)
- Color: inherits from text

Use variable-font axes (`FILL`, `wght`, `GRAD`, `opsz`) sparingly — prefer outline 400/24 unless there is a deliberate reason to switch.

### Sizes

| Context | Size |
|---|---|
| Default | 24px |
| Dense tables / chips | 20px |
| Inside button labels | 16px |
| Tight inline-with-caption | 14px |

### Common Icons in Portal

`search`, `filter_alt`, `expand_more`, `unfold_more`, `storefront` (Products in Market), `inventory_2` (All Products), `location_on`, `more_horiz`, `close`, `check`, `info`, `arrow_outward`, `fullscreen`, `account_circle`, `bar_chart`, `settings`, `home`, `apartment`, `route`, `schedule`, `notifications`, `help`, `edit`, `delete`

**Account-type icons** (rendered inside the Account Type Icon avatar — see §9): `storefront` (Retail / Store), `fastfood` (Restaurant), `shopping_cart` (Grocery), `local_convenience_store` (C-Store), `local_bar` (Bar), `attach_money` (Discount Store). All outline weight (`FILL 0`).

### Special Characters

- Bullet separator: `•` (e.g. `"Thursday, Apr 23 • Kenny D'Amica"`)
- Ranges: en-dash `–`
- No arrows via unicode — always use SVG

---

## 9. Components

### Buttons

All buttons share a base: `height: 36px`, `border-radius: 4px`, `font: 500 14px/1 Inter`, `padding: 0 24px`, `min-width: 96px`, `transition: background .12s`.

#### Variants

**Primary** — blue fill, white text

```css
background: #007CFF;
color: #fff;
/* hover */ background: #0066D6;
/* disabled */ background: rgba(0,124,255,.25); color: #fff;
```

**Secondary** — white fill, blue stroke, blue text

```css
background: #fff;
color: #007CFF;
border: 1px solid #007CFF;
/* hover */ background: rgba(0,124,255,.05);
/* disabled */ color: rgba(0,124,255,.25); border-color: rgba(0,124,255,.25);
```

**Secondary · Warning** — white fill, red stroke, red text

```css
background: #fff;
color: #E5484D;
border: 1px solid #E5484D;
/* hover */ background: rgba(229,72,77,.05);
/* disabled */ color: rgba(229,72,77,.25); border-color: rgba(229,72,77,.25);
```

**Neutral** — white fill, gray stroke, dark text; use alongside a primary for secondary page-level actions (e.g. "Batch Actions")

```css
background: #fff;
color: #364153;
border: 1px solid #D1D5DC;
/* hover */ background: #F3F4F6;
/* disabled */ color: #99A1AF; border-color: #E5E7EB;
```

**Tertiary (Ghost)** — no fill, no stroke, blue text

```css
background: transparent;
color: #007CFF;
padding: 0 16px;
min-width: 72px;
/* hover */ background: rgba(0,124,255,.05);
/* disabled */ color: rgba(0,124,255,.25);
```

**Foundation Neo** — brand moments only (e.g. login Next button)

```css
height: 39px;
padding: 0 30px;
min-width: 120px;
border-radius: 4px;
background: #fff;
color: #000;
border: 1px solid #000;
box-shadow: 2px 2px 0 0 #000;   /* --shadow-brutal */
font: 500 16px/1 Inter;
letter-spacing: .05em;
/* hover */ background: #F0F7FF;
```

#### Sizes

| Size | Height | Padding | Min-width |
|---|---|---|---|
| `sm` | 30px | `0 16px` | 72px |
| `md` (default) | 36px | `0 24px` | 96px |
| `lg` | 40px | `0 28px` | 120px |

#### Button Examples

```
Primary:    Confirm  /  Save changes  /  Finalize for Simulation (disabled)
Secondary:  Edit Section  /  Save as Draft  /  Next (disabled)
Warning:    Delete  /  Discontinue
Ghost:      Go Back  /  Show more
Neo:        Next  (login screen only)
```

---

### Row Actions (in-table: Menu, Split button, Kebab)

Actions attached to a table row. There is **one primitive and two triggers** — do not add anything beyond these. Reference: `preview/components-buttons.html`.

- **Menu popover** — *the primitive.* A floating list of actions. Both triggers below open this exact surface; it is never duplicated per-trigger.
- **Split button** — *a trigger.* A labeled button + a caret; the button performs one action, the caret opens the Menu.
- **Kebab** — *a trigger.* A single `more_horiz` icon button that opens the Menu.
- A plain **slim button** (the existing button at 28px) covers the one-action / no-menu case.

#### When to use which — decision rules (apply in order)

1. **Default to no control.** If a row exists to be opened, make the **whole row** navigate to its detail / drawer — and do **not** add a "View"/"Open" button, which only duplicates the row click. A *genuine* action (Reassign, Export, Duplicate) is different and may still appear. Action controls stop the row click (they perform their action; they don't also navigate).
2. **If a row needs actions, they live in a Menu.** Decide only *how the Menu opens*:
   - Use a **Kebab** (`more_horiz`, pinned to the right of the row, **always visible** — never hover-only) when the actions are **peers with no single one worth encouraging**, or the row is space-constrained.
   - Use a **Split button** (labeled button + caret) when **one action is worth encouraging**: the button performs it in one click; the caret opens the Menu of its *related* alternatives.
3. **Button intent** = the visible button's color. Use **primary** for the encouraged happy-path action; use **error** *only* when that action resolves a problem (clicking it opens the fix). **Never use a red button merely to signal a bad state — that is a Status Badge, not a button.**
4. **One trigger per row.** Row actions are **28px** tall and right-aligned in the last column. Unrelated extra actions go **inside the Menu**, never as a second button. Never hide a row's single most important action behind a kebab alone.
5. **Always visible — never hover-only.** Row actions render at rest. Do **not** reveal them on hover (it fails discoverability, touch, and keyboard); hover may *tint* the row but must not change which controls are present.

#### Specs

- **Split button:** `height: 28px`, `border-radius: 6px`, `font: 500 13px Inter`. Main area `padding: 0 11px`; caret area `26px` wide with a `1px` divider (`rgba(255,255,255,.28)` on filled intents, the border color on outline). Intents: **primary** (`#007CFF` fill, white) and **error** (`#E5484D` fill, white). Optional leading icon (`report` for error, `check_circle` for confirm-style).
- **Kebab:** `28×28px`, `border-radius: 6px`, `more_horiz` at 20px, `--p-muted`; hover `rgba(0,0,0,.05)`.
- **Menu popover:** `border-radius: 8px`, `--shadow-float`, 1px `--p-border`, `padding: 4px`, `min-width: ~208px`. Items `34px`, `padding: 0 10px`, `400 14px Inter`, optional 18px `--p-muted` leading icon. Group with an uppercase label + `1px --p-border` divider when there are more than ~5 items; destructive items go **last**, in `--p-danger`. Opens on click; closes on outside-click, `Escape`, or selection.

#### Do not

- Do not ship a "secondary" split button as a repeated table column — if viewing is the row's job, make the row clickable and put extras in a kebab.
- Do not treat "button + kebab" as a distinct component — it is simply a slim button beside a kebab.

---

### Inputs & Forms

All form inputs use the **floating-label** pattern — one canonical style across all pages.

#### Field

```css
height: 44px;
border-radius: 6px;          /* --radius-md */
padding: 0 14px;
font: 400 15px Inter;
border: 1px solid #D1D5DC;   /* --p-border-strong */
background: #fff;
```

#### States

| State | Border | Background | Other |
|---|---|---|---|
| Default | `1px solid #D1D5DC` | `#fff` | — |
| Focus | `1px solid #007CFF` | `#fff` | `box-shadow: 0 0 0 3px rgba(0,124,255,.15)` |
| Error | `1px solid #E5484D` | `#fff` | Error message below: 12px 500 Inter, `#E5484D` |
| Disabled | `1px solid #E5E7EB` | `#fff` | `color: #99A1AF; -webkit-text-fill-color: #99A1AF; opacity: 1; cursor: not-allowed` — label, value, border &amp; chevron all use one gray |

#### Floating label

```css
position: absolute;
top: -7px; left: 10px;
padding: 0 4px;
background: #fff;       /* clips over the border — stays #fff even when disabled */
font: 400 12px/1 Inter;
color: #6A7282;         /* focus: #007CFF; error: #E5484D; disabled: #99A1AF */
```

Label sits at `z-index: 2` so it clips cleanly over a styled `<select>` box.

Required fields append ` *` to the label string.

#### Disabled state

Disabled fields keep a **white background** (never gray) and dim the whole control to one consistent gray, `#99A1AF`, applied to label, value text, border, and select chevron. Both `color` and `-webkit-text-fill-color` are set (to override the browser's `-webkit-text-fill-color` default), and `opacity: 1` is forced — native `<select>` ships a default `opacity: 0.7` when disabled, which otherwise makes a select read lighter than an identically-colored input. Input and select are pixel-consistent as a result.

#### Variants

- **Text field** — standard floating-label, `padding: 0 14px`
- **Monospace field** — same shell, `font-family: 'Geist Mono', monospace` — used for PIN, Route ID, codes
- **Select / Dropdown** — same 44px shell, `padding-right: 36px`, custom chevron SVG at right 12px, `appearance: none`

#### Search Bar (list pages)

Taller search input used at the top of list views (Users, Products).

```css
height: 48px;
border-radius: 8px;          /* --radius-lg */
padding: 0 14px 0 44px;      /* 44px accommodates the 18px icon + gutter */
font: 400 15px Inter;

/* Search icon: 18px SVG, stroke #6A7282, left 14px, vertically centered */
```

Floating "Search" label sits at `top: -7px; left: 12px`.

---

### Controls (Toggle, Checkbox, Radio)

#### Toggle

```
Track: 37×20px (29×14px visible), border-radius 999px
Knob: 20×20px circle, white, box-shadow: 0 1px 2px rgba(0,0,0,.25)

Off: track bg #DADADA, knob left 0
On:  track bg rgba(0,124,255,.25), knob left 17px, border .5px solid #007CFF
     knob bg #007CFF
Transition: left .15s, background .15s
```

#### Checkbox

```
18×18px, border-radius 3px
Off: border 1.5px solid #D1D5DC, bg #fff
On:  border 1.5px solid #007CFF, bg #007CFF, white checkmark (12px, stroke-width 3)
```

#### Radio

```
18×18px circle
Off: border 1.5px solid #D1D5DC, bg #fff
On:  border 1.5px solid #007CFF, inner 8px circle bg #007CFF
```

---

### Filter Chips

```css
height: 32px;
padding: 0 12px;
border-radius: 6px;
font: 500 14px/1 Inter;
border: 1px solid var(--p-border-strong);
color: var(--p-ink);
background: #fff;
gap: 6px;
```

**Active state:**
```css
border-color: #007CFF;
color: #007CFF;
/* count badge */ background: rgba(0,124,255,.12); color: #007CFF;
```

**Inactive count badge:**
```css
background: var(--g-off-white);
color: var(--p-muted);
font: 500 11px Geist Mono, monospace;
padding: 1px 6px;
border-radius: 999px;
```

Chips always include a filter icon (left) and chevron-down icon (right). Count badge appears between label and chevron when a filter is active.

> **When to use a single Filter Chip vs. the consolidated Filter Menu:** a standalone chip is fine for **one or two** filterable attributes. The moment a table can be filtered on **three or more** columns — or any attribute has a large value set (hundreds–thousands of options) — switch to the **Filter Menu** below. Do not line up a separate dropdown per column; the bar runs out of room and large option sets can't be browsed in a plain dropdown.

---

### Filter Menu (consolidated)

The canonical pattern for filtering tables. **One** "Filters" button opens a two-pane popover that holds every filterable attribute, so the bar stays compact no matter how many columns are filterable. Reference implementation: `ui_kits/portal/FilterMenu.jsx`.

**Anatomy**

- **Trigger** — a single button styled like a Filter Chip: `sliders-horizontal` icon + "Filters" + total-active-count badge + chevron. Turns primary (`border`/`text` `#007CFF`, `background: var(--p-primary-tint)`) whenever any filter is active or the menu is open.
- **Popover** — `540px` wide, `border-radius: 10px`, `box-shadow: var(--shadow-float)`, anchored `8px` below the trigger. Two panes over a fixed `360px` height, plus a footer.
  - **Left rail** (`184px`, `background: var(--p-surface-alt)`) — one row per attribute (icon + label + per-attribute count badge). The active row gets a solid `var(--p-primary-tint)` fill with primary-colored, semibold label (no border accent).
  - **Right pane** — the value selector for the active attribute (see value types below). List area scrolls; rows are `34px`, checkbox + label, hover `var(--p-surface-alt)`.
  - **Footer** (`var(--p-surface-alt)`) — live result count on the left; `Clear all` (ghost) + `Done` (primary) on the right. Filters apply live; `Done` only closes.

**Value-selector types**

| Attribute size | Selector |
|---|---|
| Small enumerable (Category, Coverage, Status) | Plain checkbox list of all options. |
| Large (Account, Brand, Product — hundreds–thousands) | `type: 'search'` — a search `Input` at the top of the pane filters the list live (placeholder names the count, e.g. "Search 3,600 accounts…"). A **Select all N matches** row sits at the very top of the results (primary blue) — it selects/deselects the *entire* current match set, not just the rendered rows, so a search-then-select-all flow works even past the render cap. Currently-selected items pin to the top under a **`SELECTED · N`** group; results render under an **`N matches`** group, **capped at 50** with a "keep typing to narrow" note. Each row may show a secondary value (e.g. account type) right-aligned in `--p-muted`. |

**Applied-filter tokens**

Every attribute with a selection renders a removable token in the bar, right of the Filters button:

```css
/* token shell */ height: 32px; border-radius: 6px; border: 1px solid var(--p-border-strong); background: #fff; overflow: hidden;
/* body (click to reopen that attribute in the menu) */ padding: 0 4px 0 10px; white-space: nowrap;
/*   "Label:" in --p-muted, value in 500 weight */
/* ✕ (clears just that attribute) */ width: 26px; border-left: 1px solid var(--p-border); color: var(--p-placeholder);
```

Token summary text: list the values when ≤2 are selected (`Category: Wine`), otherwise `N selected` (`Account: 12 selected`). A `Clear all` text button (primary) follows the last token when any filter is active.

**Rules**

- Filters apply live — the table and result count update on each toggle; never gate behind an Apply step (the `Done` button only dismisses the popover).
- Every filterable column lives in the menu — do **not** mix per-column dropdowns with the menu.
- Clicking a token body reopens the menu focused on that attribute; the ✕ clears only that attribute.
- For large search sets, **Select all** operates on the full match set (every item matching the query), not just the rows currently rendered under the 50-item cap — so "search → select all" reliably captures everything that matched.
- Close on outside-click and on `Escape`.

---

### Tabs

#### Page-Level Tabs (Underlined)

```css
/* Container */
display: flex;
gap: 12px;
border-bottom: 1px solid var(--p-border);
padding: 0 4px;

/* Tab */
padding: 14px 16px;
font: 600 15px/1 Inter;
letter-spacing: -0.005em;
color: #4A5565;
border-bottom: 2px solid transparent;
margin-bottom: -1px;

/* Active tab */
color: #007CFF;
border-bottom-color: #007CFF;
```

#### Segmented Tabs (In-page)

```css
/* Strip container */
display: inline-flex;
gap: 2px;
padding: 3px;
background: var(--p-surface-tint);   /* #F3F4F6 */
border-radius: 6px;

/* Segment */
padding: 5px 10px;
border-radius: 4px;
font: 500 14px/1 Inter;
color: var(--p-text-2);

/* Active segment */
background: #fff;
color: var(--p-ink);
box-shadow: var(--shadow-card);

/* Count badge (active) */
font: 500 11px Geist Mono, monospace;
color: #007CFF;
background: rgba(0,124,255,.12);
padding: 1px 6px;
border-radius: 999px;
```

---

### Pills (Category · Role · label)

One flat **tinted-label** component — used for product categories, user roles, and any short label. Tinted background + deep text only, **no dot** (the dot is reserved for the Status Badge). The shell is the shared `.g-role-pill` class in `colors_and_type.css` (single source of truth); colors are passed inline per palette entry. Sizes `md` (default) and `sm` (11px).

```css
display: inline-flex;
align-items: center;
padding: 2px 10px;          /* sm: 1px 8px */
border-radius: var(--radius-pill);
font: 500 12px/1.5 Inter;   /* sm: 11px */
letter-spacing: .02em;
white-space: nowrap;
```

**The 10-color pill palette** (tint background / deep text). Map any category, role, or label to the nearest entry — never invent a per-feature color.

| Color | Background | Text | Used for (examples) |
|---|---|---|---|
| Amber | `#FFFBEB` | `#BB4D00` | Beer |
| Purple | `#F5F3FF` | `#6B21A8` | Wine · Executive |
| Orange | `#FFF7ED` | `#C2410C` | Spirits · Supervisor |
| Blue | `#EFF6FF` | `#1447E6` | RTD · Department Manager |
| Green | `#ECFDF5` | `#047857` | Non-Alcoholic · IT / Admin |
| Red | `#FEECEC` | `#C8252B` | Cider |
| Gold | `rgba(219,158,3,.12)` | `#92610A` | Mead |
| Teal | `rgba(20,184,166,.12)` | `#0D9488` | Sake |
| Sky | `rgba(85,167,255,.12)` | `#0369A1` | Seltzer |
| Neutral | `#F3F4F6` | `#4A5565` | Sales Rep · Other |

The user **Avatar** draws from the same palette — tinted background + deep-text initials — via the shared `.g-avatar` class; its ring variant uses the role's **text** color. (See Role Pills and Avatar.)

---

### Status Badge

A lifecycle-state indicator: a **soft tinted pill + a leading dot**. The dot is what separates it from Pills — Pills never carry a dot, Status Badges always do. Reference: `preview/components-status-badge.html`.

```css
display: inline-flex;
align-items: center;
gap: 6px;
padding: 2px 10px;          /* sm: 1px 8px */
border-radius: 999px;
font: 500 12px/1.5 Inter;
/* dot */ width: 6px; height: 6px; border-radius: 50%;
```

**One form, six tones — no emphasis levels.** The *tone* carries both meaning and how much it draws the eye (amber leans in, gray recedes); the single in-progress state earns a **live, pulsing dot**.

| Tone | Background | Text | Dot | Typical states |
|---|---|---|---|---|
| Neutral | `#F3F4F6` | `#4A5565` | `#99A1AF` | Draft · Past · Archived · Inactive · Deactivated |
| Info | `#EFF6FF` | `#1447E6` | `#155DFC` | Active · In progress · New *(live dot)* |
| Pending (amber) | `#FFFBEB` | `#B45309` | `#DB9E03` | Pending · Invited · Scheduled |
| Success | `#ECFDF5` | `#047857` | `#00BC57` | Complete · Approved · Paid · In market |
| At-risk (orange) | `#FFF7ED` | `#C2410C` | `#C2410C` | At risk · Draining · Expiring |
| Danger | `#FEECEC` | `#C8252B` | `#E5484D` | Failed · Overdue · Rejected · Discontinued |

**Borderless variant** — when a row already shows a Role/Category Pill, drop the pill fill and keep the dot + colored label, so the two don't read as twins.

**Rules**

- **Tone = meaning, not feature.** Map a status to the nearest of the six tones; never mint a per-feature color. Pending (amber) and At-risk (orange) are deliberately distinct hues so “awaiting” never reads as “problem”.
- **Attention is built in** — loudness comes from the tone + the live dot (reserved for genuinely in-progress states; respects `prefers-reduced-motion`). There is no “Solid” or “Quiet” emphasis variant.
- **Copy:** one or two words, Title Case. No icons by default — color + dot carry it.

---

### Stat Cards

```css
background: #fff;
border: 1px solid var(--p-border);
border-radius: 6px;
padding: 14px 16px;
display: flex;
gap: 10px;
align-items: center;
box-shadow: var(--shadow-card);
```

**Value:** `font: 700 20px/1 'Geist Mono', monospace` — color varies by semantic meaning:

| Color | Token | Use case |
|---|---|---|
| Blue | `var(--p-primary)` | Hero metric (e.g. Cases in Market) |
| Ink | `var(--p-ink)` | Neutral metrics |
| Green | `var(--p-success)` | Positive pending (Pending Additions) |
| Red | `var(--p-danger)` | Negative pending (Pending Discontinue) |
| Gold | `var(--p-warning)` | Draining / warning (Discontinued & Draining) |

**Label:** `font: 400 14px/1.3 Inter; color: var(--p-text-2)`

**Action link** (optional, e.g. "Show"): subdued-link style — `font: 500 12px/1 Inter; color: var(--p-muted); text-decoration: underline; text-decoration-color: #C4C9D2; text-decoration-thickness: 1px; text-underline-offset: 2px` (hover → `--p-ink`). Solid underline, never dotted — see Inline Links.

Numbers use abbreviations: `21.1k`, `$482.7k`, `1,258`.

Stat cards are laid out in 3-up rows.

#### Examples

```
21.1k   Cases in Market
1,258   Active Placements
50      Points of Distribution
1       Pending Additions          Show
1       Pending Discontinue        Show
4       Discontinued & Draining    Show
```

---

### Tables

```css
/* Wrapper */
border: 1px solid var(--p-border);
border-radius: 8px;
overflow: hidden;

/* Header row */
background: #F9FAFB;
font: 500 11px/1 Inter;
letter-spacing: .08em;
text-transform: uppercase;
color: var(--p-muted);
padding: 10px 16px;
height: 40px;

/* Body rows */
font: 400 14px Inter;
color: var(--p-ink);
padding: 10px 16px;
height: 45px;
border-bottom: 1px solid var(--p-border);

/* Row hover */
background: var(--p-primary-tint);   /* #EFF6FF */

/* ID cells */
font-family: 'Geist Mono', monospace;
font-size: 12px;
color: var(--p-muted);

/* Numeric cells */
font-family: 'Geist Mono', monospace;
font-size: 13px;
color: var(--p-text);

/* Product name */
font-weight: 500;
```

Columns auto-size to content with a `max-width: 300px` cap. Headers support column-resize via a drag handle (6px, highlights `--p-primary` on hover).

---

### Info Banners

```css
/* Info (blue tint) */
background: var(--p-primary-tint);   /* #EFF6FF */
color: var(--p-ink);
border-radius: 8px;
padding: 10px 12px;
font: 400 14px/1.4 Inter;

/* Danger (red tint) */
background: rgba(255,107,107,.12);
color: var(--p-danger-strong);
```

Example usage:
> "Select one or more products below, then press 'Continue' to choose a desired action for each product. (Step 1 of 4)"

---

### Selection Bar (floating)

A floating bar that appears when one or more rows in a table are selected, showing the live count and bulk actions. Sticks to the bottom of the viewport, right-aligned, and floats above content. Reference: the selection bar in `ProductsScreen.jsx`.

```css
position: sticky;
bottom: 16px;
align-self: flex-end;          /* right-aligned in a flex column */
display: inline-flex;
align-items: center;
gap: 10px;
padding: 10px 14px;
background: #fff;
border: 1px solid var(--p-border);
border-radius: 10px;
box-shadow: var(--shadow-float);
```

**Contents (left → right)**

- **Count** — `{n} selected`, `500 14px Inter`, `--p-ink`. This is the core of the component and always present.
- **Divider** — `1px × 20px`, `--p-border`.
- **Actions** — start with a `Clear` ghost button (deselects all). Append context-specific bulk actions (e.g. Deactivate, Export) as the surrounding feature requires — but only actions that belong to *this* page's job. Do not stuff cross-flow steps (a "Continue to a multi-step wizard" CTA, etc.) into a list page's selection bar; route those from their own flow.

**Rules**

- Renders only when `selected.size > 0`; animates in/out is optional (none by default — the portal reads as static).
- The count + Clear pairing is the reusable minimum. Everything else is feature-specific and should be justified per screen.

Role-colored initials circle used wherever a user is represented (tables, detail headers, team rosters).

```css
/* Base */
display: inline-flex;
align-items: center;
justify-content: center;
border-radius: 50%;
font: 600 {size * 0.38}px/1 Inter;
letter-spacing: .01em;

/* Background + foreground = role colors (see Role Pill token table) */
```

#### Sizes

| Size | Use case |
|---|---|
| 22px | Inline in table cells alongside a name |
| 32px | Table body rows |
| 40px | Cards, team rosters |
| 52px | Page detail header |

#### Ring variant

Used on avatar stacks and in identity headers to visually separate overlapping avatars:

```css
box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px {role.dot};
```

---

### Role Pills (the Pill, applied to roles)

A user's role rendered as a **Pill** — the *same component* as a Category Pill, just assigned a color from the shared pill palette. **There is no separate Role Pill component or token set**: to add or change a role, map it to a palette color and give its avatar a matching ring. No dot (that is reserved for the Status Badge, which keeps pills and status visually distinct).

The Pill is a flat tinted label: tinted background + deep colored text only.

```css
display: inline-flex;
align-items: center;
gap: 6px;
padding: 2px 10px;   /* sm: 1px 8px */
border-radius: 999px;
font: 500 12px/1.5 Inter;   /* sm: 11px */
letter-spacing: .02em;
white-space: nowrap;
```

#### Role → palette mapping

Roles draw from the same 10-color pill palette as categories (see Category Pills / the Pills color card). The **ring** column is the role's avatar ring — always the *same* color as the Pill's text.

| Role | Palette color | Background | Text | Ring |
|---|---|---|---|---|
| Executive | Purple | `#F5F3FF` | `#6B21A8` | `#6B21A8` |
| Department Manager | Blue | `#EFF6FF` | `#1447E6` | `#1447E6` |
| Supervisor | Orange | `#FFF7ED` | `#C2410C` | `#C2410C` |
| Sales Representative | Gray | `#F3F4F6` | `#4A5565` | `#4A5565` |
| IT / Admin | Green | `#ECFDF5` | `#047857` | `#047857` |

Sizes: `md` (default, 12px) and `sm` (11px, 1px vertical padding). To expand the role set, pick another palette color — don't mint new tokens.

---

### Account Type Icon

White circle with a thin dark ring and a dark **outline** Material Symbols Rounded icon inside. Used wherever an Account is represented — tables, detail headers, search results.

```css
/* Shell */
display: inline-flex;
align-items: center;
justify-content: center;
border-radius: 50%;
background: #fff;
border: 1.5px solid #1C1C1E;
color: #1C1C1E;

/* Icon size = container × 0.5  (e.g. 52px container → 26px icon) */
/* Material Symbols Rounded, outline (FILL 0) */
```

#### Account types & icons

| Account Type | Material Symbol |
|---|---|
| Retail / Store | `storefront` |
| Restaurant | `fastfood` |
| Grocery | `shopping_cart` |
| C-Store | `local_convenience_store` |
| Bar | `local_bar` |
| Discount Store | `attach_money` |

#### Sizes

Shares the same 4-step scale as User Avatars:

| Size | Use case |
|---|---|
| 22px | Inline in table cells |
| 32px | Table body rows |
| 40px | Cards, list rows |
| 52px | Page detail header |

#### Account Type Pill

In page headers, pair the icon with an Account Type Pill. Uses the same pill shell as Role Pill but with a neutral background (no role color):

```css
background: #F3F4F6;
color: #4A5565;
/* Contains: 13px icon + label text */
```

#### In the Page Detail Header

The Account type icon (52px) replaces the initials avatar. The Account Type Pill sits inline with the account name. Back nav reads "Accounts".

---

### Permission Cards

Used on the Role & Permissions tab to display and override a user's capability grants.

```css
/* Card shell */
border: 1px solid var(--p-border);
border-radius: 10px;
overflow: hidden;

/* Section header */
padding: 11px 14px;
background: #FBFCFD;
border-bottom: 1px solid #F0F1F3;

/* Section icon chip: 28×28px, border-radius: 7px, bg: #F3F4F6 */

/* Row */
padding: 9px 14px;
border-top: 1px solid #F4F5F7;
```

Capability rows each contain: label (500 13px when on, 400/muted when off), an optional override badge, and a small toggle.

#### Override badge

Appears inline when a capability differs from the role baseline.

```css
font: 500 9px/1 Inter;
letter-spacing: .04em;
text-transform: uppercase;
border-radius: 999px;
padding: 2px 6px;
border: 1px solid;

/* Added */   color: #C2410C; background: #FFF7ED; border-color: #FCD9B6;
/* Removed */ color: #1447E6; background: #EFF6FF; border-color: #BFDBFE;
```

Override rows get a subtle warm tint: `background: rgba(219,158,3,.05)`.

#### Status indicator

Sits above the card grid; shows how many capabilities deviate from the role baseline.

```css
/* Matches role */ background: #F3F4F6; color: #6A7282;
/* N overrides  */ background: #FFF7ED; color: #C2410C;
padding: 6px 11px; border-radius: 8px; font: 500 12px/1 Inter;
```

#### Empty state (no role selected)

Dashed border card with lock icon and instructional copy:

```css
border: 1px dashed var(--p-border-strong);
border-radius: 10px;
padding: 48px 24px;
background: #FBFCFD;
text-align: center;
```

---

### Confirmation Dialog → see Modal (`confirm` variant)

The Confirmation Dialog is no longer a separate component — it is the **`confirm` variant of Modal**: the same centered card, with an icon chip, no close ✕ (the user must make an explicit choice), an optional warning callout, and a destructive footer. Full spec under **Modal & Drawer** below.

---

### Page Detail Header

Full-width header above the tab body on user (and similar entity) detail pages.

**Structure:**

1. **Back nav** (optional) — `chevron_left` + section name, 13px 500, `--p-muted`. Omit on new-entity forms.
2. **Identity row** — Avatar (52px) · Name (700 28px, `letter-spacing: -.02em`) · Role Pill · Subtitle (14px, `--p-muted`) — then actions flush right.
3. **Actions** — Existing entity: Warning Secondary ("Deactivate") + Primary ("Save"). New entity: both buttons disabled until required fields are complete.
4. **Tab strip** — Page-level underlined tabs (Profile · Role & Permissions · Team), sits at the bottom of the header padding with `margin-bottom: -1px` to merge with the divider.

New-entity state: Avatar placeholder is a 52px gray circle (`#F3F4F6`) with `person_add` icon; no role pill; "New User" headline.

---

### App Shell & Navigation Sidebar

The portal frame: a persistent left navigation sidebar + a scrolling content area. Reference: `ui_kits/portal/AppShell.jsx`.

#### Shell layout

The shell is locked to the viewport so the nav stays put and only content scrolls:

```css
/* wrapper */ height: 100vh; display: flex; overflow: hidden;
/* sidebar (aside) */ width: 248px /* or 72px collapsed */; flex-shrink: 0; height: 100vh;
/* main */ flex: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column;
/* scroll region (main > div) */ flex: 1; min-height: 0; overflow-y: auto; padding: 24px;
```

The sidebar must sit **outside** the scroll region (a sibling of `main`), never inside it — that is what keeps it fixed while the table/content scrolls.

#### Sidebar dimensions & chrome

| Property | Value |
|---|---|
| Width — expanded | `248px` |
| Width — collapsed | `72px` |
| Width transition | `width 180ms ease` |
| Background | `#fff` |
| Right divider | `1px solid var(--p-border)` on the **`<aside>` itself** (full height — must NOT live on an inner top-nav container, or it stops above the bottom utility nav) |
| Collapse toggle | 26×26px circle, `right: -13px`, `top: 28px`, floats on the divider edge; chevron icon flips |

- **Org header** — wordmark (collapsed: crow mark) + company name + city selector. City selector hidden when collapsed.
- **Primary nav** — parent rows (40px, icon + 15px label + `expand_more` chevron when it has children) with expandable child lists. Active leaf / open group tints `rgba(0,124,255,.10)` with `--p-primary` icon; hover `rgba(0,124,255,.05)`. Active **child** row: solid `#007CFF` fill, white text, `30px` min-height.
- **Bottom utility nav** — pinned to the bottom (Ops Tools toggle, Help Center [external], account, Sign Out). Ops Tools toggle hidden when collapsed.

#### Collapsed Flyout

When collapsed (72px), hovering a nav icon opens a flyout so users navigate without expanding the rail.

| Property | Value |
|---|---|
| Width | `208px` |
| Border-radius | `8px` |
| Shadow | `var(--shadow-float)` |
| Positioning | `position: fixed` (escapes the sidebar's `overflow: hidden`) — `left = iconRect.right + 6`, `top = iconRect.top − 6` |
| Trigger | `mouseenter` on a collapsed icon |
| Close delay | **150ms grace period** (lets the cursor travel icon → panel without closing); cancels on panel `mouseenter` |
| Entrance | slide `translateX(−7px) → 0`, 120ms ease-out |

- **Parent icon** → panel with an uppercase group-label header (`500 11px`, `--p-muted`, `letter-spacing: .06em`) + a list of all sub-items. The active sub-item is a solid `#007CFF` row with white text and a small dot; others are `--p-ink`, hover `rgba(0,124,255,.06)`. Clicking a sub-item navigates and closes the flyout.
- **Leaf icon** (no children, e.g. Accounts, Users) → same panel shell showing **only the label** (a tooltip); clicking the icon navigates directly.
- The hovered icon tints blue (`--p-primary`) while its flyout is open. The flyout closes automatically when the rail is expanded.

> **Entrance animation caveat:** animate the flyout's entrance with **transform only**, not opacity. Backgrounded/throttled iframes pause `requestAnimationFrame`, which can freeze an `opacity: 0 → 1` keyframe at 0 and leave the panel invisible. A transform-only slide always rests fully opaque.

---

### Maps

Maps use **Leaflet 1.9.x** with **CARTO "Light All" @2x retina tiles** (muted neutral — never satellite).

#### Map Tokens

```css
--map-bg:           #DDDDDD      /* fallback while tiles load */
--map-route-stroke: #007CFF      /* = --p-primary */
--map-route-opacity: 0.7
--map-route-width:  3px
--map-radius:       var(--radius-xl)   /* 10px floating card */
--map-border:       1px solid var(--p-border)
--map-shadow:       var(--shadow-float)
```

#### Container Classes

```css
.g-map          /* floating popover — 10px radius, border, shadow-float */
.g-map.is-inline /* inline card — 6px radius, no shadow */
```

#### Pin Types

**Default numbered stop pin** — 28px, ink ring, white core:
```html
<div class="g-map-pin"><div>{N}</div></div>
```
```css
width: 28px; height: 28px; border-radius: 50%;
background: #282838;
/* inner */ width: 22px; height: 22px; background: #ffffff;
font: 600 11px/1 Inter; color: #282838;
```

**Active / focused pin** — blue fill + halo ring:
```css
.g-map-pin.is-active {
  background: #007CFF;
  box-shadow: 0 0 0 4px rgba(0,124,255,.18),
              0 0 0 8px rgba(0,124,255,.10),
              0 4px 10px rgba(0,124,255,.35);
  transform: scale(1.07);
}
```

**Unassigned pin** — 32px, red ring:
```css
.g-map-pin.is-unassigned {
  width: 32px; height: 32px;
  background: #DA1010;
  box-shadow: 0 2px 8px rgba(218,16,16,.35);
}
/* inner fill: #FFF8F8 */
```

#### Map Title Overlay

```css
.g-map-title {
  position: absolute; top: 16px; left: 16px; z-index: 400;
  background: var(--p-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-float);
  padding: 10px 14px;
  font: 500 14px/1.2 Inter;
  color: var(--p-ink);
}
/* Sub-label */ font: 400 12px/1.2 Inter; color: var(--p-muted);
```

Example: `"Thursday, Apr 23 · Kenny D'Amica · 5 stops"`

---

### Toast

Transient confirmation of an action. Solid-fill pill, top-center, floating above all content. Confirmations and failures **only** — anything richer belongs in an Info Banner or Dialog. Reference: `preview/components-toast.html`.

```css
display: inline-flex;
align-items: center;
gap: 10px;
padding: 13px 22px 13px 18px;
border-radius: 12px;
color: #fff;
font: 500 16px/1.2 Inter;
letter-spacing: -.005em;
box-shadow: 0 6px 16px rgba(0,0,0,.14), 0 2px 4px rgba(0,0,0,.08);
```

| Tone | Background | Icon (22px, leading) |
|---|---|---|
| Success | `var(--p-success)` (`#00BC57`) | `check` (outline) |
| Error | `var(--p-danger)` (`#E5484D`) | `error` (FILL 1 — reads clearer on a solid fill) |

**Rules**

- **Position:** `position: fixed`, top-center, `top: 18px`, above all content. Stack downward with a 10px gap when more than one is live.
- **Behavior:** auto-dismiss ~4s (success) / ~6s (error); pause on hover. Add a trailing `✕` (22px, 6px radius, 80% opacity) only when the message is persistent or actionable.
- **Motion:** slide in with a 180ms ease-out translate (transform-only, never opacity-only — backgrounded iframes can freeze an opacity keyframe at 0).
- Two tones only. No info/warning toasts — use an Info Banner inline.

---

### Modal & Drawer

All overlays sit on one invisible **Overlay** primitive — scrim, focus-trap, `Escape`, return-focus, and ARIA `role="dialog"` / `aria-modal`. Two visible surfaces build on it: the centered **Modal** (with `default` and `confirm` variants) and the edge-anchored **Drawer**. Reference: `preview/components-modal-drawer.html`.

```
Overlay              ← scrim · focus-trap · Esc · return-focus · a11y
├─ Modal             ← centered card
│   ├─ default       (form / content — has ✕; sm/md/lg)
│   └─ confirm       (icon chip · no ✕ · optional warning callout · destructive footer)
└─ Drawer            ← edge-anchored sheet
```

> Naming: the surface is called **Modal** (ARIA role `dialog`). The old "Confirmation Dialog" is now `Modal variant="confirm"`.

#### Modal — default

Short, self-contained tasks (invite a user, rename).

```css
border-radius: 12px;
border: 1px solid var(--p-border);
box-shadow: 0 8px 28px rgba(0,0,0,.18), 0 2px 6px rgba(0,0,0,.08);
overflow: hidden;
```

| Size | Width |
|---|---|
| `sm` | 420px |
| `md` (default) | 520px |
| `lg` | 640px |

- **Header** — title (`600 18px`, `-.01em`) + `close` icon button, padding `18px 20px 14px 24px`.
- **Body** — padding `4px 24px 8px`; 20px gap between fields.
- **Footer** — `border-top: 1px solid #F0F1F3`, right-aligned, Ghost/Neutral cancel + Primary confirm.

#### Modal — `confirm` (was "Confirmation Dialog")

For destructive or consequential decisions. Same shell, fixed at `sm`/`md` width, with four differences from `default`:

- **No close ✕** — the user must make an explicit choice; Cancel is the only escape (plus `Escape`).
- **Icon chip** (34×34px, `border-radius: 8px`): background is the 12% tint of the action tone (e.g. `rgba(229,72,77,.12)` for danger), icon in the tone color.
- **Footer** is Ghost (Cancel) + a tone-matched action button (Warning for destructive), right-aligned, `padding: 14px 24px`, `border-top: 1px solid #F0F1F3`.
- **Warning callout** (optional): when the action has downstream consequences (e.g. deactivating a user who manages a team) — `background: #FFF7ED`, `border-radius: 8px`, orange text + warning icon. When present, the action button relabels to "Continue" (a confirmation step follows) rather than the terminal verb.

Uses the softer shadow `0 8px 28px rgba(0,0,0,.12), 0 2px 6px rgba(0,0,0,.06)`.

#### Drawer (side sheet)

Right-anchored, full content-height. Use to view/edit a record in context without leaving the table.

```css
border-left: 1px solid var(--p-border);
box-shadow: var(--shadow-float);
```

| Size | Width |
|---|---|
| `sm` | 400px |
| `md` (default) | 460px |
| `lg` | 560px |

- **Header** — overline (`500 11px` caps, `--p-muted`) + title (`600 20px`), `border-bottom: 1px --p-border`.
- **Body** — scrolls (`flex: 1; overflow-y: auto`).
- **Footer** — pinned, `border-top: 1px --p-border`, typically two full-width actions.

#### Shared rules (Overlay)

- **Scrim:** `rgba(16,24,40,.45)`, no blur.
- **Motion:** modal — 180ms ease-out, scale `0.98 → 1` + scrim fade. Drawer — 180ms ease-out `translateX(16px → 0)` (transform-only). Honor `prefers-reduced-motion`.
- **Behavior:** trap focus while open; restore focus to the trigger on close. `default` and `Drawer` close on scrim-click, `✕`, and `Escape`. `confirm` closes on **Cancel** or `Escape` only — never scrim-click — to prevent accidental dismissal of a consequential choice.

---

### Loading & Skeleton

Prefer **skeletons** over spinners for any layout whose shape is known (tables, stat rows, cards) — they hold page geometry so content doesn't jump. Reserve the bare spinner for unknown-shape or sub-second waits. Reference: `preview/components-loading.html`.

#### Spinner

```css
border-radius: 50%;
border: 2.5px solid var(--p-border);
border-top-color: var(--p-primary);
animation: rot .7s linear infinite;
/* @keyframes rot { to { transform: rotate(360deg); } } */
```

Sizes 16 / 20 / 24px. On a colored fill, use the **on-fill** variant: `border-color: rgba(255,255,255,.4); border-top-color: #fff`. Inside a busy button, swap the label for an on-fill spinner + verb ("Saving…") and dim the fill to `rgba(0,124,255,.85)`.

#### Skeleton

```css
background: #EDEFF2;
border-radius: 4px;      /* mirror the real element's radius */
/* shimmer: a left→right white sweep, 1.3s ease-in-out infinite */
```

- Each block mirrors the real element's size & radius (text lines ~12–13px tall, pills 18px/999px, avatars circular).
- Render 3–6 placeholder rows, never a full page of them.
- **Motion:** under `prefers-reduced-motion`, drop the shimmer to a static tint and the spinner to a 1s step rotation.

---

### Empty States

One restrained pattern, three causes. Reference: `preview/components-empty-states.html`.

```css
/* container */
border: 1px solid var(--p-border);
border-radius: 10px;
padding: 48px 28px;
display: flex; flex-direction: column; align-items: center; text-align: center;

/* icon badge */
width: 56px; height: 56px; border-radius: 50%;
background: var(--p-surface-tint);
color: var(--p-muted);   /* 28px outline Material Symbol */

/* title */ font: 600 16px/1.3 Inter; color: var(--p-ink);
/* body */  font: 400 14px/1.5 Inter; color: var(--p-muted); max-width: 320px;
```

| Cause | Icon | Action |
|---|---|---|
| **No results** (search / filter) | `search_off` / `filter_alt_off` | Ghost **Clear filters** — never a create CTA |
| **Empty set** (nothing exists yet) | the surface's nav icon (`inventory_2`, `group`, `route`) | Primary create CTA |
| **First-run / import** | `upload_file` | Dashed dropzone (`1px dashed --p-border-strong`, `#FBFCFD`) + primary + helper (template) |

- **In-table variant:** drop the border/background and render inside the existing table card, keeping the header row so the page doesn't collapse (`padding: 44px 24px`).
- **Restraint:** no illustrations, no emoji — one outline glyph only. Copy is plain, second-person.

---

### Pagination

For information-dense tables. Reference: `preview/components-pagination.html`.

#### Footer bar

Attaches to the table's bottom edge (shares its border), `background: var(--p-surface-alt)`, `border-radius: 0 0 8px 8px`, padding `10px 16px`.

- **Left:** result range — `Showing 1–50 of 3,600`, `--p-muted` with bold figures. Counts read as prose (not mono).
- **Right:** rows-per-page select + pager.

#### Pager

```css
/* cell */ min-width: 30px; height: 30px; border-radius: 6px; font: 500 13px/1 Inter;
/* active */ background: var(--p-primary); color: #fff;
/* default */ background: transparent; color: var(--p-text);  /* hover: --p-surface-tint */
/* prev/next */ border: 1px solid var(--p-border-strong); background: #fff; color: --p-muted;  /* disabled at ends */
```

Collapse long ranges with an ellipsis, always keeping first, last, and current ±1.

#### Page size & Load more

- **Page size:** 25 / 50 / 100. **Default 50** — matches the Filter Menu's 50-row search cap so the two never disagree.
- **Load more:** a centered Neutral button + `N of M loaded` caption — for feed-like / append-only lists where position doesn't matter. Use numbered paging for tables operators scan and jump around. Never both on one surface.

---

### Date Picker

Single-date and range, both built on the floating-label field. Reference: `preview/components-datepicker.html`.

#### Trigger

Standard 44px floating-label field with a leading icon — `calendar_today` (single) / `date_range` (range). Value formats as `Jun 11, 2026` / `Apr 20 – Apr 26, 2026` (en-dash range).

#### Calendar popover

```css
width: 280px;
border: 1px solid var(--p-border);
border-radius: 10px;
box-shadow: var(--shadow-float);
padding: 14px;          /* anchored 8px below the field */
```

- Week starts **Sunday**. Weekday header `500 11px --p-muted`. Day cells 36px with a 32px circular hit target (`500 13px`).
- **States:** today = 1.5px inset `--p-primary` ring + primary text; selected = solid `--p-primary` circle, white text; adjacent-month days = `--p-placeholder`; hover = `--p-surface-tint`; disabled = `--p-placeholder`, no hover.

#### Range

Endpoints are solid primary circles; the span between fills a `--p-primary-tint` band, rounded only at the two ends. Pair the calendar with a left **preset rail** (Today, Yesterday, This week, Last 7 days, This month, Last 30 days) — operators pick these far more than exact dates. Apply on second click (start → end).

- **Behavior:** close on outside-click and `Escape`.

---

## 10. Motion

Animation is minimal — the portal reads as mostly static.

| Interaction | Duration | Easing |
|---|---|---|
| Hover states (buttons, rows) | 120ms | ease-out |
| Panels opening | 180ms | ease-out |
| Toggle knob slide | 150ms | ease |

Rules: no bounces, no springs. Treat motion as a garnish, not a feature.

---

## 11. Voice & Copy

### Principles

- **Plainspoken, operational, slightly wry.** Product copy is literal and straightforward.
- **Second-person, sparingly.** "Sign in to your account." Never cutesy ("Hey! Let's get you signed in 👋"). No first-person.
- **Sentence case** everywhere except column headers, overlines, and tab/chip labels (see Typography).
- **Numbers carry weight.** Stat cards lead with large bold numbers. Use abbreviations: `21.1k`, `$482.7k`, `1,258`.
- **Verb-first** for actions: "Save changes", "Finalize for Simulation", "Go Back".
- **No emoji in product.** Emoji-free.
- **Inline status words are colored** — not bolded, not badged. The color conveys the meaning.

### Error & Feedback Copy

- Errors: `#E5484D` (danger red), 12px Inter Medium, placed below the field.
- Info prompts: soft blue pill, 14px, sentence case.

### Examples (verbatim)

```
"Sign in to your account"
"By clicking 'Next' you are agreeing to the Greater Industries User Terms of Service and Privacy Policy"
"Track products and their availability across your accounts."
"Select one or more products below, then press 'Continue' to choose a desired action for each product. (Step 1 of 4)"
"64 of 71 products"
"Thursday, Apr 23 • Kenny D'Amica   ·   5 stops"
"Pending Additions"  /  "Pending Discontinue"  /  "Discontinued & Draining"
```

---

## 12. Layout

| Property | Value |
|---|---|
| Max content width | ~1320px, centered |
| Page gutter | 32px |
| Card gap | 16px |
| Stat card row | 3-up grid |
| Table header height | 40px |
| Table body row height | 45px |
| Table cell padding | `10px 16px` |

No gradients on surfaces. No full-bleed imagery. Backgrounds are flat white with `#F9FAFB` for table headers and `#F3F4F6` for tab-strip wells.

---

## 13. CSS Token Reference

All tokens are defined in `colors_and_type.css`. Load it first, then optionally `fonts/fonts.css` (Google Fonts), then optionally `maps.css`.

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="fonts/fonts.css">
<link rel="stylesheet" href="maps.css"> <!-- only if map views are needed -->
```

### Full `:root` block (abbreviated)

```css
:root {
  /* Foundation neutrals */
  --g-black: #000000;
  --g-dark-gray: #5F5E5E;
  --g-medium-gray: #8A8A8A;
  --g-light-gray: #DADADA;
  --g-off-white: #F5F5F5;
  --g-white: #FFFFFF;

  /* Foundation transparency */
  --g-black-100: rgba(0,0,0,1);
  --g-black-25: rgba(0,0,0,.25);
  --g-black-10: rgba(0,0,0,.10);
  --g-black-05: rgba(0,0,0,.05);

  /* Foundation accents */
  --g-primary-blue: #007CFF;
  --g-secondary-green: #00BC57;
  --g-secondary-red: #E5484D;
  --g-tertiary-gold: #DB9E03;
  --g-tertiary-purple: #7B68EE;
  --g-seldom-sky: #55A7FF;

  /* Accent tints */
  --g-blue-25: rgba(0,124,255,.25);
  --g-blue-10: rgba(0,124,255,.10);
  --g-blue-05: rgba(0,124,255,.05);
  --g-red-10: rgba(229,72,77,.12);
  --g-green-10: rgba(0,188,87,.12);
  --g-gold-10: rgba(219,158,3,.12);
  --g-purple-10: rgba(123,104,238,.12);

  /* Portal neutrals */
  --p-ink: #101828;
  --p-text: #364153;
  --p-text-2: #4A5565;
  --p-muted: #6A7282;
  --p-placeholder: #99A1AF;
  --p-border: #E5E7EB;
  --p-border-strong: #D1D5DC;
  --p-surface: #FFFFFF;
  --p-surface-alt: #F9FAFB;
  --p-surface-tint: #F3F4F6;

  /* Portal primary */
  --p-primary: #007CFF;
  --p-primary-hover: #0066D6;
  --p-primary-soft: #DBEAFE;
  --p-primary-tint: #EFF6FF;
  --p-primary-ink: #155DFC;

  /* Portal category pills */
  --p-pill-beer-bg: #FFFBEB;    --p-pill-beer-fg: #BB4D00;
  --p-pill-wine-bg: #F5F3FF;    --p-pill-wine-fg: #6B21A8;
  --p-pill-spirits-bg: #FFF7ED; --p-pill-spirits-fg: #C2410C;
  --p-pill-rtd-bg: #EFF6FF;     --p-pill-rtd-fg: #1447E6;
  --p-pill-nonalc-bg: #ECFDF5;  --p-pill-nonalc-fg: #047857;

  /* Portal feedback */
  --p-success: #00BC57;
  --p-warning: #DB9E03;
  --p-danger: #E5484D;
  --p-danger-strong: #DC2626;

  /* Radii */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 10px;
  --radius-pill: 999px;

  /* Elevation */
  --shadow-tooltip: 0 2px 6px 0 rgba(0,0,0,.15);
  --shadow-card: 0 1px 2px -1px rgba(0,0,0,.10), 0 1px 3px 0 rgba(0,0,0,.10);
  --shadow-float: 0 4px 6px -4px rgba(0,0,0,.10), 0 10px 15px -3px rgba(0,0,0,.10);
  --shadow-brutal: 2px 2px 0 0 rgb(0,0,0);

  /* Spacing (4px base) */
  --space-0-5: 2px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Type families */
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;

  /* Type scale */
  --fs-10: 10px;  --fs-11: 11px;  --fs-12: 12px;
  --fs-14: 14px;  --fs-16: 16px;  --fs-18: 18px;
  --fs-20: 20px;  --fs-24: 24px;  --fs-32: 32px;
  --fs-40: 40px;  --fs-48: 48px;

  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-caps: 0.05em;
  --tracking-micro: 0.025em;

  /* Semantic aliases */
  --fg-1: var(--p-ink);
  --fg-2: var(--p-text);
  --fg-3: var(--p-muted);
  --fg-4: var(--p-placeholder);
  --fg-link: var(--p-primary);
  --fg-invert: var(--g-white);

  --bg-1: var(--p-surface);
  --bg-2: var(--p-surface-alt);
  --bg-3: var(--p-surface-tint);
  --bg-hover: var(--p-primary-tint);

  --border-1: var(--p-border);
  --border-2: var(--p-border-strong);
  --border-focus: var(--p-primary);
}
```

---

## 14. Fonts

Both fonts are loaded from Google Fonts. Self-hosting is recommended for production.

```html
<!-- fonts/fonts.css -->
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
```

Or directly in HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap">
```

---

## 15. Working With This System

### For new components

- Match the 4px spacing base.
- Use `--p-border` / `--p-primary` / `--p-ink` for borders, accents, and text.
- Prefer `14px Inter Medium` for interactive labels.
- Use `Geist Mono` for any numeric / tabular / ID data.

### For production code

Lift tokens from `colors_and_type.css`. Consume components from `ui_kits/portal/*.jsx` as hi-fi reference implementations — the canonical patterns, not a published npm package.

### For prototypes and mocks

Import `colors_and_type.css`, copy the logo assets, load Material Symbols from Google Fonts. Stick to Portal tokens unless you are designing a brand-forward moment (then use the Foundation quintet and `--shadow-brutal`).

### When to use Foundation vs Portal

| Scenario | Use |
|---|---|
| Data tables, filters, stat cards, forms | Portal tokens |
| Login screen, onboarding, marketing pages | Foundation tokens |
| Brand moments (hero buttons, launch screens) | Foundation + `--shadow-brutal` |
| Any doubt | Portal tokens |

### Substitution notes

- **Fonts:** Inter + Geist Mono from Google Fonts. Some references to "Helvetica Neue" in map attribution are acceptable as system-font fallback.
- **Icon set:** Material Symbols (Rounded), one system everywhere — the variable font, addressed by ligature name. Lucide and Iconify have been fully removed.
- **Portal chrome (global nav, user menu):** designed from first principles and shipped as the **App Shell + Navigation Sidebar** (see §9).
- **Map tiles:** CARTO Light All `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`

---

*Greater Design System · Portal 1.0 · Exported May 2026*
