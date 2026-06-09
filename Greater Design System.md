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
   - **New in 1.1:** [Wizard (multi-step flow)](#wizard-multi-step-flow) · [Audit Log, Change Row & Restore](#audit-log-change-row--restore) · [Echo Pulse](#echo-pulse-brand-moment) · [Expandable Rows](#expandable-rows) · [Batch Actions](#batch-actions-header-dropdown)
   - **New in Phase 3 (Store Layouts):** [Chip](#chip-micro-status) · [Tooltip](#tooltip) · [MenuButton](#menubutton-off-table-disclosure) · [Arrangement Board](#arrangement-board-drag-and-drop) · [Meta Row](#meta-row-progressive-disclosure) · [General Stock Area](#general-stock-area-arrangement-board-sub-pattern) · [Inline Quantity Control](#inline-quantity-control) · [Add-items Picker](#add-items-picker-grouped-multi-select) · [CSV Import](#csv-import)
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
| `--p-surface` | `#FFFFFF` | Default surface (cards, tables, nav, modals) |
| `--p-surface-alt` | `#F9FAFB` | Table header / zebra rows |
| `--p-surface-tint` | `#F3F4F6` | Tab-strip background |
| `--p-shell` | `#FDFCF9` | **Page / canvas background** — warm off-white; never for cards |

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
- **Page canvas = `--p-shell` (#FDFCF9); surfaces = white.** The app content area, the wizard workflow area, the login screen, and the loading screens render on Shell. Cards, tables, panels, modals, popovers, the side nav, and wizard chrome stay white (`--p-surface`) so they lift off the warm canvas — never paint a full page white. (Login is the raven centered on Shell; the restraint is still the brand.)

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
| `.g-section-title` | Inter Medium 13 UPPERCASE, ls +0.06em, muted | Section title, column header |
| `.g-subtitle-1` | Inter Medium 14 UPPERCASE, ls +0.05em, medium-gray | Subtitle under H1 |
| `.g-subtitle-2` | Inter Regular 11 / 1.3, medium-gray | Fine print / legal |
| `.g-body-1` | Inter Regular 16 / 1.4 | Standard page & table content |
| `.g-body-2` | Inter Bold 16 / 1.4 | Emphasized body |
| `.g-body-3` | Inter Regular 16 / 1.4, medium-gray | Subdued body |
| `.g-body-4` | Inter Regular 16 / 1.4, ls +0.025em | Toggle descriptions |
| `.g-overline` | Inter Regular 12 UPPERCASE, ls +0.05em, dark-gray | Overline labels |
| `.g-overline-tag` | As overline, on `#F5F5F5` pill with 4px radius | Overline on soft-gray pill |
| `.g-link` | Inter Medium, primary blue, no underline (underline on hover) | Text hyperlinks |
| `.g-textlink` | Inter Medium 14, primary blue, button-as-link (no border/bg), underline on hover | Inline links inside banners / sentences |
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
  - **Actions & overlay headers: Title Case** (see the rule below)

**Title Case for actions & overlay headers.** Title Case is mandatory for **all** button and link-button labels, SplitButton labels, segmented-control labels used as actions, and **Modal / Drawer / Dialog headers**. Capitalize the first and last word and every major word; keep short articles, conjunctions, and prepositions (*a, an, the, and, or, to, of, in*) lowercase unless first or last. Examples: **"Save Changes"** (not "Save changes"), **"Clear All"**, **"Copy to All"**, **"Add Report"**, **"Create Another Plan"**, **"Restore This Version"**, **"Batch Actions"**. This applies to new components too — never ship a sentence-case button label or overlay header.

Everything that is **not** an action or overlay header stays **sentence case**: body text, table cell content, helper / validation text, info banners, empty-state bodies, tooltips, and toasts.

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
| `--shadow-card` | `0 1px 2px -1px rgba(0,0,0,.10), 0 1px 3px 0 rgba(0,0,0,.10)` | **Small** elements (stat cards, secondary buttons) |
| `--shadow-surface` | `0 1px 2px 0 rgba(16,24,40,.04), 0 6px 16px -8px rgba(16,24,40,.10)` | **Large** resting surfaces (tables, detail cards, ledgers) lifting off the shell |
| `--shadow-float` | `0 4px 6px -4px rgba(0,0,0,.10), 0 10px 15px -3px rgba(0,0,0,.10)` | Elevated floating / transient layers (menus, popovers, tooltips, toasts) |
| `--shadow-brutal` | `2px 2px 0 0 rgb(0,0,0)` | Foundation brand-moment buttons only |

Cards in-table have **no shadow**.

> **Two elevation tiers by size.** Small elements use the tight `--shadow-card`; large resting surfaces (tables, detail cards, ledgers) use the soft diffuse `--shadow-surface` (ink-tinted `rgba(16,24,40,…)`, softer against the warm shell). Keep the 1px `--p-border` on surfaces — **border + soft shadow together**; the shadow doesn't replace the border. Floating transient layers keep `--shadow-float`.

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

**Store Layouts (Phase 3):** `dashboard_customize` (Layout Editor / Edit Layout), `drag_indicator` (drag handle), `shuffle` (General Stock Area), `curtains` (Display placement), `move_down` (drag-here empty state), `fit_width` (Set Capacity For All), `sticky_note_2` (section note), `lightbulb` (Suggested), `draft` / `edit_note` (drafts), `event_upcoming` (scheduled reset), `event_busy` (cancel reset), `publish` (Publish), `history` (History), `download` (Export), `cloud_upload` / `upload_file` / `library_add` / `add_circle` (CSV import), `format_list_bulleted` (Product List tab), `remove_shopping_cart` / `add_business` (plan chips). All outline weight (`FILL 0`).

**Account-type icons** (rendered inside the Account Type Icon avatar — see §9): `storefront` (Retail / Store), `fastfood` (Restaurant), `shopping_cart` (Grocery), `local_convenience_store` (C-Store), `local_bar` (Bar), `attach_money` (Discount Store). All outline weight (`FILL 0`).

### Special Characters

- Bullet separator: `•` (e.g. `"Thursday, Apr 23 • Kenny D'Amica"`)
- Ranges: en-dash `–`
- No arrows via unicode — always use SVG

---

## 9. Components

### Buttons

All buttons share a base: `height: 36px`, `border-radius: 4px`, `font: 500 14px/1 Inter` (no extra letter-spacing — only the Neo variant is tracked), `padding: 0 20px`, `min-width: 88px`, `transition: background .12s`.

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

**Danger (solid)** — red fill, white text; for an **already-confirmed, terminal** destructive action. **The rule:** an at-rest destructive button in a **table or header** uses outline **Secondary · Warning** — it *opens* a `confirm`; only the **terminal commit inside that confirm** uses **solid Danger**. Never use solid danger for a button that merely opens a dialog.

```css
background: #E5484D;
color: #fff;
/* hover */ background: #C93B40;
/* disabled */ background: rgba(229,72,77,.45); color: #fff;
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
padding: 0 12px;
min-width: 0;          /* ghost hugs its label */
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
| `sm` | 30px | `0 16px` | 64px |
| `md` (default) | 36px | `0 20px` | 88px |
| `lg` | 40px | `0 28px` | 120px |
| `ghost` | 36px | `0 12px` | 0 (hugs label) |

#### Button Examples

```
Primary:    Confirm  /  Save Changes  /  Finalize for Simulation (disabled)
Secondary:  Edit Section  /  Save as Draft  /  Next (disabled)
Warning:    Delete  /  Discontinue
Ghost:      Go Back  /  Show More
Neo:        Next  (login screen only)
```

---

### Row Actions (in-table: Menu, Split button, Kebab)

Actions attached to a table row. There is **one primitive and two triggers** — do not add anything beyond these. Reference: `preview/components-buttons.html`.

- **Menu popover** — *the primitive.* A floating list of actions. Both triggers below open this exact surface; it is never duplicated per-trigger.
- **Split button** — *a trigger.* A labeled button + a caret; the button performs one action, the caret opens the Menu. It is **not limited to the last table column** — it may also be the **primary action inside an expanded / disclosure panel** (see [Expandable Rows](#expandable-rows)), with `menuAlign="right"`. Its label is **always Title Case** (the component enforces it).
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

#### MenuButton (off-table disclosure)

SplitButton and Kebab are tuned for **28px table rows**. In a page header, detail action bar, or toolbar you often want the same "primary action + a menu of alternatives" but at **full button height** so it lines up with its neighbors — that's **MenuButton**: a normal `Button` (any variant) with a trailing `expand_more` that opens the **identical Menu popover**.

- **Inside a data-table row →** SplitButton or Kebab (28px).
- **Outside tables (header / action bar / toolbar) →** MenuButton (36px `Button` + chevron). Choose `variant` by intent (primary for the encouraged action); default `menuAlign="right"`. Never a second menu style — it opens the same `Menu`.

Example (`StoreLayoutEditor` action bar): `Publish ▾` → `[Publish Now · Schedule For Later]`, aligned with the adjacent Save / Discard buttons.

#### Do not

- **Never use the vertical `more_vert` ("⋮") kebab.** The overflow / kebab trigger is **always** the horizontal `more_horiz` — in list rows, cards, panel headers, and menus alike. `more_vert` is **banned portal-wide** (the `.g-kebab` class renders `more_horiz`).
- Do not ship a "secondary" split button as a repeated table column — if viewing is the row's job, make the row clickable and put extras in a kebab.
- Do not treat "button + kebab" as a distinct component — it is simply a slim button beside a kebab.

---

### Tooltip

A dark popover (`--p-ink` bg, white text) anchored to its trigger; hover-only, `pointer-events: none`, `z-index: 200`. Pairs naturally with a 14px `info` glyph (`cursor: help`). Default is a single nowrap line (`font: 500 11px/1.3 Inter; padding: 4px 8px; border-radius: 6px; box-shadow: var(--shadow-float)`). Reference: `preview/components-tooltip.html`.

- **`maxWidth` (px)** — for multi-line / educational copy. Switches to `white-space: normal`, sets `width: {maxWidth}`, `max-width: calc(100vw - 32px)`, `line-height: 1.5`, `padding: 7px 10px`, left-aligned. **Required** whenever the body runs longer than ~6 words — otherwise it shrink-wraps to one nowrap line that runs off-screen.
- **`side`** — `"top"` (default) or `"bottom"`. Use `"bottom"` for any trigger near the top edge of the viewport (e.g. an in-card control) so the tooltip can't be clipped above the fold.

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
| Soft-required (unset) | `1px solid var(--p-warning)` | `var(--g-gold-10)` | Encouraged-but-optional field left empty — **amber, not red**. It's a nudge ("adding one is encouraged"), not an error. E.g. an unset Capacity. |
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

#### Chip Toggle

A pill that toggles a single **boolean attribute** on a dense row — when a `Toggle` is too big and a checkbox would read as *selection* (e.g. "is this a Display?" on a placement row).

```css
display: inline-flex; align-items: center; gap: 4px;
height: 26px; padding: 0 9px; border-radius: 999px;
font: 500 12px/1 Inter; cursor: pointer;
/* off */ border: 1px solid var(--p-border-strong); background: #fff; color: var(--p-muted);
/* on  */ border: 1px solid var(--p-primary); background: var(--p-primary-tint); color: var(--p-primary-ink);
/* leading icon 13px: --p-placeholder off / --p-primary on */
```

Distinct from the **Filter Chip** (32px, opens a filter) and from **Chip** (status, non-interactive) — use only for an always-visible label + icon boolean.

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

**Clarifications**

- **Per-attribute icons.** Each left-rail attribute row carries an icon matching its column — e.g. Chain → `account_tree`, Account → `storefront`, plus Brand / Category / Size / Supplier.
- **Leading scope chip.** A filter step may begin with a **scope** chip that changes the *candidate set* rather than filtering it — e.g. Store Promotions' product step toggles "All Products" vs "Carried at Selected Accounts" (defaults to carried). It sits to the left of the attribute filters.
- **Searchable single-chip (`ChipFilter`).** When exactly one high-cardinality attribute is filtered standalone (e.g. a Chain with hundreds of values), a single searchable chip is acceptable instead of opening the full menu — the bridge between "one Filter Chip" and "the consolidated menu".

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

**Lifecycle mappings (examples — reuse a tone, don't re-mint one).**
- **Store Promotion:** Active → **Info** (blue, live dot) · Upcoming → **Pending** (amber) · Past → **Neutral** (gray).
- **User:** Active → **Success** (green) "Active" · Deactivated → **Neutral** (gray) "Deactivated".

---

### Chip (micro status)

The smallest inline indicator: a **soft tinted pill (~19px tall) with an optional 12px leading icon**. Use on dense rows where a Status Badge (with its dot) or a category Pill would be too heavy — a plan flag ("Adds Aug 1"), a presence marker ("1 Display"), a soft warning ("Draft exists"). This is the single spec for these micro-chips; do **not** hand-roll new ones. Reference: `preview/components-chip.html`.

```css
display: inline-flex; align-items: center; gap: 3px;
height: 19px; padding: 0 7px; border-radius: 999px;
font: 600 10.5px/1 Inter; white-space: nowrap; flex-shrink: 0;
/* optional leading icon: 12px, color = currentColor */
```

| Tone | Background | Text | Typical use |
|---|---|---|---|
| `neutral` | `--p-surface-tint` | `--p-text-2` | Generic / count tags |
| `info` | `--p-primary-tint` | `--p-primary-ink` | Plan add ("Adds Aug 1"), presence ("1 Display") |
| `amber` | `--g-gold-10` | `--p-warning` | Soft warning ("New to store", "Draft exists", "Suggested") |
| `danger` | `--g-red-10` | `--p-danger-strong` | Removal / discontinue ("Disc. Sep 1") |
| `success` | `#ECFDF5` | `#047857` | Positive confirmation |

**Rules**

- **Tone = meaning.** Map to the nearest tone; never mint a per-feature color.
- **Chip vs Status Badge vs Pill:** Chip = micro flag / marker (icon, **no dot**, 10.5px). Status Badge = lifecycle state (**dot**, no icon, 12px). Pill = category / role tag (12px, no dot / icon).
- **Copy:** one to three words; an icon is optional and only when it adds clarity.

**Canonical icon + tone + copy map** (battle-tested — adopt verbatim):

| Meaning | Tone | Icon | Copy template |
|---|---|---|---|
| Pending add (future) | `info` | `schedule` | `Adds {Mon D}` |
| Pending discontinue | `danger` | `remove_shopping_cart` | `Disc. {Mon D}` |
| Not yet at store | `amber` | `add_business` | `New to store` |
| Display presence (count) | `info` | `curtains` | `{n} Display` |
| Existing draft warning | `amber` | *(none)* | `Draft exists` |
| Suggested setting | `amber` | `lightbulb` | `Suggested` |

**Clickable status pills.** A row may carry a Chip that is *interactive* — e.g. amber "Reset {Mon D, YYYY}" (`event_upcoming`) or gray "Draft" (`edit_note`) that deep-links into a version's editor. It uses the Chip visual but is a `<button>`: it must `stopPropagation` from the row's own click and expose a `title` / aria-label.

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

#### Count-up animation

Every StatCard **value counts up from 0** on mount and whenever the value changes (e.g. a filter narrows the set), using **ease-out-quart** (`1 − (1−t)⁴`, ~760ms, no bounce) with a **coupled opacity ramp** (`opacity = min(1, 0.15 + t·1.9)`) so the number is faint exactly while the digits churn fastest — a graceful fade-in, not a flicker. The component owns this, so **don't reimplement per screen**. Prefix / suffix are preserved so formats survive (`30%`, `15.1k`, `2.5x`, `$1,234`, `4.9`; grouping + decimals re-applied each frame); non-numeric values (`—`, `N/A`) render as-is. Respects `prefers-reduced-motion` (snaps to final). The value stays **Geist Mono 700/20** so tabular digits don't jitter width. Reference: `useCountUp` / `parseStatValue` / `formatStat` in `primitives.jsx`.

#### Drill-in & active state

A stat card can act as a **filter shortcut**: clicking its value (or the "Show" link) applies the matching table filter — e.g. "Pending Additions" toggles the Action filter; "Ending ≤ 7 Days" applies a `today..+7` date range. When a stat is the **live drill target** it takes an **`active` state** — its border, an inset `1px` ring, and the action link all adopt the card's semantic color (`box-shadow: inset 0 0 0 1px {color}, var(--shadow-card)`).

#### Informational vs drill-in

`action` is **optional**. Omit `action` / `onClick` for an **informational** StatCard — a pure KPI with no clean 1:1 filter to drill into (e.g. "Layout Coverage", "Avg. Placements"). It shows `value` + `label` only (still count-up animated, still elevated), with no link styling. Use a **drill-in** StatCard when clicking it filters the list to that subset (the `active` state mirrors whether that filter is on). **Don't duplicate the tabs:** if a card would be 1:1 with a segmented tab's count, prefer a derived KPI instead. (Store Layouts dropped its tab-mirroring cards for Layout Coverage / Avg. Sections / Avg. Placements — all informational.)

#### Filter-responsive

**Stat cards reflect the page's active search + facet filters, and are tab-independent.** Compute stats over the *filtered* population (before the tab split) and fold them into the **list response** (`{ items, counts, stats }`) so they update in lockstep with the list on every filter change — never a separate, unfiltered `/stats` request. The segmented tab does **not** change the stat values (only search + facets do); the tab counts live on the tabs. Initialize with zero defaults so first paint is clean (the count-up then animates 0 → real value).

#### Show / Hide Stats

A **Neutral** Button toggles the whole stat row's visibility, **persisted per page** in `localStorage` under `gr-stats-visible:{key}`. Labels are **"Show Stats" / "Hide Stats"** (Title Case) with `visibility` / `visibility_off` icons.

---

### Tables

```css
/* Wrapper (large surface — border + soft shadow on shell, see §7) */
border: 1px solid var(--p-border);
border-radius: 8px;
box-shadow: var(--shadow-surface);
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

**Grid-row tables (read-only feeds).** Ultra-dense, fixed-schema, read-only ledgers (e.g. the Audit Log) may be built from CSS-grid `div` rows instead of a real `<table>`, to control 7–8 fixed/elastic columns precisely. Allowed **only** for read-only data feeds, and only if it keeps the standard chrome: the `#F9FAFB` / `11px` caps / `.08em` header, 1px row borders, the hover tint, and the standard footer. Anything interactive or selectable (e.g. the wizard `SelectionTable`) stays a real `<table>`.

Columns auto-size to content with a `max-width: 300px` cap. Headers support column-resize via a drag handle (6px, highlights `--p-primary` on hover).

#### Pending-delta count cell

A count of items at a record, followed by clickable **`+N` (green)** / **`−N` (red)** mono chips for pending changes (additions / discontinues coming via Product Plans) — each a **deep-link** (see Navigation → deep-linking). Reference: `CountDeltaCell` in `primitives.jsx`.

`[ count ]  [ +N ]  [ −N ]` → renders `—` (`--p-placeholder`) when all are zero.
- **Count** — `Geist Mono 500/13`, `--p-text` (or `--p-placeholder` at 0), with a Tooltip ("N products carried at this store"); not clickable.
- **`+N` chip** — `Geist Mono 500/11`, `padding: 2px 7px`, `radius 999`, **no border**, `color: --p-success` on `--g-green-10`. Tooltip: "N pending addition(s) — view in POD Planner".
- **`−N` chip** — same shape, `color: --p-danger` on `--g-red-10`, using a **minus sign `−` (U+2212)**, never a hyphen.
- **Counts are never netted** — `+5` and `−2` show independently (never collapse to `+3`). Chips `stopPropagation` so the row's own click doesn't also fire.

Distinct from **Chip** (status flags): this is a fixed green/red **signed-delta** with mono numerals.

---

### Info Banners

```css
/* Info (blue tint) */
background: var(--p-primary-tint);   /* #EFF6FF */
color: var(--p-ink);
border-radius: 8px;
padding: 10px 12px;
font: 400 14px/1.4 Inter;

/* Amber (warning tint) — e.g. "editing a scheduled reset", CSV import warnings */
background: var(--g-gold-10);
color: var(--p-ink);

/* Danger (red tint) */
background: rgba(255,107,107,.12);
color: var(--p-danger-strong);
```

**Three tones:** **info** (blue), **amber** (warning / "heads-up" context), **danger** (red). Amber is for non-blocking context an operator should notice (cross-version editing banners, partial-import warnings) — not an error.

Example usage:
> "Select one or more products below, then press 'Continue' to choose a desired action for each product. (Step 1 of 4)"

---

### Selection Bar (floating)

> **One of two selection patterns.** For operator **list / table pages with a footer + pager, the [Batch Actions header dropdown](#batch-actions-header-dropdown) is the default** — it sits with the data-table chrome instead of floating over it. Reserve this **floating** Selection Bar for **canvas / non-tabular surfaces** (maps, boards, galleries) where there is no table footer to anchor to.

A floating bar that appears when one or more rows are selected, showing the live count and bulk actions. Sticks to the bottom of the viewport, right-aligned, and floats above content. Reference: the selection bar in `ProductsScreen.jsx`.

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

#### Batch Actions (header dropdown)

The **default** multi-select pattern for operator list / table pages. Bulk actions live in a persistent header control rather than a floating bar, so they sit with the table footer (count + pager) instead of fighting it. Reference: `screens/PodPlanner.js`, `screens/Promotions.js`, `screens/Users.js`.

- A **Neutral** Button labeled **"Batch Actions"** with a trailing `expand_more`, placed in the page header **to the left of the primary "New …" CTA**.
- **Always present**, but **disabled** until `selected > 0`. When active it opens the standard **Menu** popover of bulk actions (e.g. *Edit Dates*, *Edit Qty*, *Delete*); destructive items go **last**, in `--p-danger`.
- Pairs with a **header-checkbox select-all (visible page)** and the standard table footer (`Showing X–Y of Z` + `RowsSelect` + Pagination).
- **Do not** also float a Selection Bar on the same surface — pick one. On tables, that's Batch Actions.

**Row-checkbox tables (the full pattern).** Store Layouts is the reference (`screens/StoreLayouts.js`): a header **select-all** + a per-row checkbox whose cell **stops propagation** (ticking it never triggers the row's navigate-to-detail). A **"{n} selected" chip** (`--p-primary-tint` pill, hidden at 0) sits left of the Batch Actions button.

- **Tab-conditional menu:** the action list depends on the active tab (e.g. Active → *Apply Template*; Scheduled → *Edit Effective Date · Cancel to Draft · Cancel & Discard (danger)*; Drafts → *Publish Now · Schedule…*). Keep the trigger identical; vary only the Menu items. **Selection clears on tab switch** (selections aren't valid across different record sets).
- **Shared date modal (`BatchDateModal`):** for any "apply one future date to N records" action (Schedule…, Edit Effective Date) — a `Modal` with a Date Picker (`fromDate = tomorrow`), confirm disabled until a date is picked. Reuse it; don't build per-action date modals.
- **Partial results = two toasts:** a green success for the converted count *and* a separate red toast naming blocked records (e.g. "1 skipped — a draft already exists for: Bluewater Bistro"). Document this success+warning convention for partial batch outcomes.

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
- **Bottom utility nav** — pinned to the bottom. Top → bottom: **Help Center** [external], **Audit Log**, **Settings**, **Account**, **Sign Out**. "Audit Log" (`/audit-log`) and "Settings" (`/settings`) are real routes and carry an **active/selected** state (`rgba(0,124,255,.10)` tint + `--p-primary` icon, like the primary nav); Help Center opens externally, Account and Sign Out are utilities. (The former "Ops Tools" toggle has been removed.)

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

#### In-shell detail editor

A **full-page editor that stays inside the App Shell** (left nav visible) — not a modal, drawer, or separate chrome. Reference: `screens/StoreLayoutEditor.js`.

- **Sticky page header** (`position: sticky; top: 0; z-index: 20; background: #fff; border-bottom`). Because the shell's scroll region has 24–32px padding, add an **opaque backing `<div>`** behind the header content (`absolute; left: -12; right: -12; top: -28; bottom: 0; background: #fff; z-index: -1; pointer-events: none`) so card shadows don't peek at the edges. The backing **must** be `z-index: -1`, or it paints over the title / tabs.
- **Measure the header height** (`ref` + `ResizeObserver` → `headerH`) and thread `stickyTop = headerH − 1` into the board's sticky section headers and the Unassigned tray, so each sub-header pins flush under the page header. Re-measure on tab change.
- **Scroll-to-top on open:** route changes don't reset the shell's scroll container — walk up to the nearest scrollable ancestor and set `scrollTop = 0` on load. **Never `autoFocus` an input on mount inside a scroll container** (it yanks scroll); gate autofocus to freshly-created items.
- **Tabs over shared editable state must not unmount.** When a page tabs over the *same* model (Layout Editor ⇄ Product List), keep both mounted (`display: none`) — unmounting wipes in-progress edits.
- **Header action bar** (right): a **dirty indicator** ("● Unsaved changes", `--p-warning`) + `History` + `Export` (neutral) + the version-specific Save / Publish controls (a **MenuButton**).
- **Cross-version banners:** `InfoBanner tone="amber"` for "editing a scheduled reset" and `tone="info"` for "this is a draft", each with an inline `.g-textlink` to jump to the sibling version.
- **Exit guard:** leaving with unsaved edits opens a `confirm` Modal ("Discard Unsaved Changes?").

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
- **Behavior:** auto-dismiss ~4s (success) / ~6s (error); pause on hover. A trailing dismiss **`✕`** (22px, 6px radius, 80% opacity) is **always present**, so a user can clear a toast — or a whole stack — without waiting it out. (It's the same affordance on every toast; no `persistent`/`actionable` flag needed.)
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

Custom widths are allowed for dense content — e.g. **560px** for the Audit Log timeline modal.

- **Header** — title (`600 18px`, `-.01em`, **Title Case**) with an optional **`subtitle`** beneath (`400 13px --p-muted`, single-line ellipsized — e.g. the record name on the Audit Log modal) + `close` icon button, padding `18px 20px 14px 24px`.
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

- **Header** — overline (`500 11px` caps, `--p-muted`) + title (`600 20px`, **Title Case**) + optional **`subtitle`** (`400 13px --p-muted`, ellipsized), `border-bottom: 1px --p-border`.
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
| **No results** (search / filter) | `search_off` / `filter_alt_off` | Ghost **Clear Filters** — never a create CTA |
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

- **Page size:** options are **25 / 50 / 100**. **50 is the canonical default on every operator table** — it matches the Filter Menu's 50-row search cap so the two never disagree. Drop to **25** only when rows are exceptionally tall; otherwise always default to 50.
- **Load More:** a centered Neutral button + `N of M loaded` caption — for feed-like / append-only lists where position doesn't matter. Use numbered paging for tables operators scan and jump around. Never both on one surface.

---

### Date Picker

Single-date and range, both built on the floating-label field. Reference: `preview/components-datepicker.html`.

#### Trigger

Two trigger variants:
- **Field** — the standard 44px floating-label field with a leading icon — `calendar_today` (single) / `date_range` (range). Value formats as `Jun 11, 2026` / `Apr 20 – Apr 26, 2026` (en-dash range).
- **Filter chip** — a **36px** filter-chip-style trigger for table **range filters**: reads `Date: {from – to}` and tints `--p-primary-tint` when active (matches the Filter Chip pattern).

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

Endpoints are solid primary circles; the span between fills a `--p-primary-tint` band, rounded only at the two ends. Apply on second click (start → end). Operators pick presets far more than exact dates.

**Context-aware preset rails.** A range picker carries a left preset rail, and **the rail must match the field's temporal direction:**
- **Forward-looking** (go-live / start dates): Today · Tomorrow · Next 7 Days · Next 30 Days · This Month · Next Month.
- **Backward-looking** (audit / history): Today · Yesterday · Last 7 Days · Last 14 Days · Last 30 Days.

**Rail styling.** Two-pane layout filled on `--p-surface-alt`; the active preset is a raised white row with a `--p-primary` semibold label; a `Clear` (danger text) is pinned to the rail bottom.

#### Bounds (min / max)

`fromDate` / `min` disables earlier days; `max` disables later days. Future-only fields (e.g. anything created in a wizard) enforce **`min = today`**; the Audit Log enforces **`max = today`** so you can't pick the future. Disabled days render `--p-placeholder`, with no hover and `cursor: default`.

#### Positioning (portaled + auto-flip)

The calendar is **portaled to `<body>`** with `position: fixed`, so it escapes `overflow: hidden` on modals and table cells, and it **opens upward (`dropUp`)** when there isn't room below — so an in-modal picker never covers the modal's Save button. Treat portaled + auto-flip as **required** for any picker used inside a modal.

- **Behavior:** close on outside-click and `Escape`.

---

### Wizard (multi-step flow)

A **full-screen, position-fixed** multi-step creation / editing flow that renders over the App Shell (`position: fixed; inset: 0; z-index: 9000`) while its route stays inside the protected layout. Introduced for POD Planner and Store Promotions. Reference: `ui_kits/portal/wizard.jsx` (live: `components/Wizard.js`).

**Anatomy (top → bottom)**

1. **Top bar** — `height: 60px`, white, `1px --p-border` bottom. Greater logotype + `1px` divider + flow **title** (`600 16px Inter`, `-.01em`). Right side: a **Neutral** Button "Exit" with a `close` icon.
2. **Step indicator** — white strip, `12px 32px` padding, centered to `max-width: 1320px`. Each step is a clickable chip: a `24px` circular badge + label.
   - **Active:** badge `--p-ink` fill, white number (`600 12px Geist Mono`); label `600 14px --p-ink`.
   - **Complete (not current):** badge `--p-success` fill, white `check`; label `500 14px --p-success`; **clickable to jump back**.
   - **Upcoming:** badge `--p-surface-tint`, `--p-placeholder` number; label `500 14px --p-placeholder`; not clickable. Connector lines `1px --p-border` fill the gaps.
   - **Completion rule:** a step counts as *complete* only when `n < current` **and** it is valid — never mark the current step green prematurely, and never show a "Saved" badge.
3. **Body** — scroll-contained, centered `max-width: 1320px`, padding `20px 32px 24px`; per-step arrival animation `gr-tab-in` (`key={current}`).
4. **Footer nav** — `height: 72px`, white, top border + soft top shadow `0 -2px 12px rgba(16,24,40,.05)`.
   - Left: **Neutral** Button "Back" (`arrow_back`, `size=lg`), disabled on step 1.
   - Right: `Step N of M` caption (`500 13px --p-muted`) + **Primary** Button (`size=lg`, `min-width: 160`) whose label / icon switch on the last step (`arrow_forward` → `check`; e.g. "Continue" → "Create Store Promo"). Disabled until the step's `canNext` is satisfied; shows an inline spinner when `busy`.

**Rules / learnings**

- The Wizard renders **over** the shell (`z-index: 9000`); the route stays inside the protected layout.
- **Edit = wizard, not modal.** Editing an existing record reuses the same wizard, prefilled at step 1 (with a fetch fallback on hard refresh); the final CTA relabels to "Update …". The Review step shows a **change-diff summary** (the **Change Row** primitive, documented under Audit Log below).
- Prev / Next live **only** in the bottom footer — no duplicate inline controls.
- Date inputs inside a wizard enforce `min = today`.

**Sub-components** (all in `wizard.jsx`)

- **`SelectionTable`** — the reusable selection step: search `Input` + optional filter slot + sortable column headers (`unfold_more` / `arrow_upward` / `arrow_downward`, active head `--p-primary`) + a `44px` checkbox column with **select-all (filtered set)** + per-row `Check`. Row click toggles selection; selected rows tint `--p-primary-tint` (`.wz-row-selected`). Built on a CSS `<table>` with sticky `thead`. Inline footer: `Showing X of Y {noun}s · N selected`. Skeleton rows while loading. Testids: `selection-row-{id}`, `selection-checkbox-{id}`, `selection-select-all`, `selection-sort-{key}`, `selection-search`.
- **`SelectedPopover`** — a pill trigger "**N selected**" (rounded, `--p-primary-tint` / `--p-primary-soft` border / `--p-primary-ink`) opening a 300px review list with per-item remove + "Clear All". Lets you trim a large multi-select without leaving the step.
- **`Check`** — table-tuned binary checkbox: `18px`, `radius 4`, `1.5px` border; on = `--p-primary` fill + white `check`.
- **`CopyToAllChip`** — inline action pill ("Copy to All", `content_copy`, `26px`, pill, `--p-primary-tint`) that propagates one row's configured value to every selected row (POD Planner "Configure Actions" step).
- **`ActionSegment`** — a 2-option segmented control (Add / Discontinue) where **Add = `--p-success`** and **Discontinue = `--p-danger`** when active (`30px`, `radius 4`, `600 13px`) — an example of semantic-colored segments.
- **`StepHeader`** — step title (`600 20px --p-ink`, `-.01em`) + optional **helper banner** (`--p-primary-tint` bg, `--p-text`, `radius 8`, `10px 14px`, `400 14px`). The canonical home for the "Select one or more… (Step 1 of 4)" info copy.

CSS used: `.wz-row`, `.wz-row-selected`, `.wz-num` focus ring, `gr-tab-in` (see §10 / §13).

---

### Audit Log, Change Row & Restore

A first-class, cross-portal capability with three surfaces, backed by per-entity immutable audit collections. The UI is fully reusable. Reference: `ui_kits/portal/audit.jsx` (live: `components/AuditLog.js`, `components/ChangeLog.js`, `screens/AuditLog.js`).

**Action accents (new semantic taxonomy):** Created = `--p-primary` (`flag` / `add_circle`), Updated = **gold `#B7791F`** (`edit`), Restored = **teal `--p-restore` `#0D9488`** (`settings_backup_restore`), Deleted = `--p-danger` (`delete`). Tokens: `--p-audit-created` / `-updated` / `-restored` / `-deleted` (§13).

#### Audit Log timeline modal (`AuditLogModal`)

A vertical **timeline** of one record's history. Each node:
- A `26px` circular icon chip outlined in the action accent + a vertical connector to the next node.
- Header line: action label (`600 13px`), a **"Current"** chip on the newest node, "by {actor}", and a right-aligned mono timestamp.
- Body: the change set rendered as **Change Rows** (below). A `created` node labels its rows **"Initial values"** and lists every starting field (nothing → value).
- **Restore control:** every non-current node with a snapshot shows a **"Restore This Version"** button (teal) with an inline confirm ("Restore to this version?") → Cancel / Restore.
- Driven by props (`auditUrl`, `restoreUrl(id)`, `formatValue(field, value)`, `createdMessage`, `restoredNoun`, `title`, `subtitle`), so any entity reuses it. Rendered in a Modal at the 560px custom width.

#### Audit Log ledger page (`/audit-log`)

A **single, generic, immutable ledger table** that flattens every entity's audit events into **one row per changed attribute**:

`When · Record Type · Record · Action · Attribute · Removed · Added · Changed By`

- The value columns are **"Removed" / "Added"**, not "Old Value / New Value" — this reads correctly for every change kind: a scalar edit (Name "A"→"B") is Removed:A / Added:B; a multi-select edit is literally what was removed vs added; a Created row is Removed:— / Added:value. Removed values render struck-through in `--p-muted`; Added values render in `--p-ink`.
- **Record Type** is a **plain-text** column (e.g. "Store Promotion", "POD Plan", "User") — **no icon, no color pill**.
- **Toolbar:** search · date-range filter (backward-looking preset rail — see Date Picker) · "All Record Types" · "All Actions" · "All Users" (actor) filters.
- **Footer:** standard data-table footer (`Showing X–Y of Z changes` + `RowsSelect` + Pagination, default 50).
- Built as a **grid-row table** (read-only feed — see Tables). Deletions are recorded as **tombstones** (the record's name persists as the label after the record itself is gone).

#### Change Row (`ChangeRow`)

The shared diff primitive used by the audit modal **and** the wizard Review step. Two modes:
- **Scalar:** `<label> oldValue → newValue` — old struck-through `--p-muted`, `arrow_forward` glyph, new `--p-ink 500`. When `from` is null/undefined (creation) it shows only the new value.
- **Membership:** `+ name` chips (green success text on `--g-green-10`) and `− name` chips (`--p-danger`, struck-through, on `--g-red-10`).
- Label is an uppercase micro-caps tag (`600 11px`, `.04em`, `--p-text-2`, min-width 84).

---

### Echo Pulse (brand moment)

A brand-forward loading mark shown on the post-auth transition into the portal: the Greater raven with two expanding **Intelligence-gradient** rings (conic `#007CFF → #5359F1 → #F153A9`). A **Foundation-tier** moment — the one place the Intelligence gradient (see §3) animates. Reference: `.echo-pulse` + the `ep-echo` keyframes in `colors_and_type.css` (live: `components/EchoPulse.js`).

- Markup: `.echo-pulse` wraps the raven `<img>`; two `::before` / `::after` rings, conic-gradient masked to a 2px stroke, animated by `ep-echo` (scale .55 → 1.9, fading out) and offset by half the cycle.
- Respects `prefers-reduced-motion` (rings disabled). Use it **only** for the auth → portal transition — not as a general spinner (that's the Spinner in Loading & Skeleton).

---

### Expandable Rows

A table row can **expand in place** to reveal related detail — Store Promotions reveals its Accounts and Products via a lazy `GET /promotions/{id}`. Reference: `screens/Promotions.js`.

- **Affordance:** an accessible chevron button at the row's lead toggles the panel (`expand_more`, rotated when open).
- **Animation:** a **`grid-rows` disclosure** — animate `grid-template-rows: 0fr → 1fr` over a `min-height: 0` inner wrapper, so the panel height-animates without measuring.
- **Lazy-load:** fetch the detail on first expand; show a skeleton until it resolves.
- **The expanded panel — not a new column — is the correct home for in-context detail and actions.** This is where a **Split button** serves as the panel's primary action (see Row Actions), with `menuAlign="right"`.

---

### Arrangement Board (drag-and-drop)

A direct-manipulation board for arranging **sections** and the **product placements** within them, with an **Unassigned tray** of unplaced SKUs. Built on **`@dnd-kit`** (core + sortable + utilities) for accessible, keyboard-operable drag-and-drop — the only new runtime dependency. Reference: `ui_kits/portal/layout-board.jsx` (structural; live: `components/layout/LayoutBoard.js`).

**Layout.** Two-column grid: `grid-template-columns: minmax(0,1fr) 340px; gap: 20px; align-items: start` — editor column (left) + a sticky Unassigned tray (right).

**Section card.**

```css
border: 1px solid var(--p-border); border-radius: 10px; background: #fff; box-shadow: var(--shadow-card);
/* header (sticky): */ position: sticky; top: {headerH}; z-index: 6;
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  background: var(--p-surface-alt); border-radius: 10px 10px 0 0;
  border-bottom: 1px solid var(--p-border);   /* none + radius 10px when collapsed */
```

Header L→R: **drag handle** (`drag_indicator` 20px, `cursor: grab`, `touch-action: none`), **Section Name control** (preset `Select` + "Custom…"), an **item-count** (`{n} items`, mono) *or* a **"General Stock" badge**, a **collapse** chevron (rotates −90° when collapsed), and a **Kebab** → `[Add Product · Set Capacity For All · Delete Section (danger)]`.

**Section name control.** A `Select` of canonical presets **+ a trailing "Custom…"** entry; choosing Custom reveals an inline free-text input (168px). Presets come from the backend (`/meta.sectionTypes`). Document the pattern: **"preset dropdown + Custom… escape hatch"** for any constrained-but-extensible name field.

**Placement row.**

```css
display: flex; align-items: center; gap: 10px; padding: 8px 10px;
border: 1px solid var(--p-border); border-radius: 8px; background: #fff;
/* dragging: opacity .4 */
```

Contents: drag handle (`drag_indicator` 18px) · **sequence chip** (mono `{n}` in a `--p-surface-alt` 6px box) · product name (500 14px) + category **Pill** + plan **Chip** + `brand · size` sub-line · **Inline Quantity Control** · **Chip Toggle "Display"** (`curtains`) · a `close` remove button (hover → `--g-red-10` / `--p-danger`).

**Empty section drop-zone.** `1px dashed --p-border; radius 8; min-height 52px`, centered "Drag products here" with a `move_down` glyph.

**Unassigned tray.**

```css
/* sticky at top: {headerH}; label row: inventory_2 + "Unassigned" + mono count pill */
border: 1px dashed var(--p-border-strong); border-radius: 10px;
background: var(--p-surface-alt); padding: 10px; min-height: 120px;
/* active drop target: border-color --p-primary; background --p-primary-tint */
```

Tray chips are compact (name 13px + `category · size` + plan Chip). Helper: *"Products at this store that aren't placed in any section appear here. Drag one into a section to place it."* Empty: *"Every authorized product is placed."*

**Drag overlay.** Use `@dnd-kit` `DragOverlay` (no drop animation): a product ghost (white card, 1px `--p-primary` border, `--shadow-float`) or a section-name ghost — keeps the dragged item legible above sticky headers.

**Drag / drop rules (real product rules — document them):**

1. A product **may live in multiple sections**, so **dragging a placement into the tray is forbidden** (ambiguous "remove from where?"). The tray only *emits* unplaced SKUs; it never *accepts* placements.
2. A **General Stock Area** section rejects all drops.
3. After any move, **self-heal tray membership** (unplaced = full catalog − placed).
4. **Keyboard:** `KeyboardSensor` + `sortableKeyboardCoordinates`; `PointerSensor` with a 6px activation distance so clicks aren't swallowed.

**A11y / motion:** honor `prefers-reduced-motion`; drag handles get `aria-label`; collapse / menu are real buttons. No springy drop animations — motion is garnish.

---

### Meta Row (progressive disclosure)

Condenses a section's secondary config into one ~28px row: a rep **Note** (left, progressive disclosure) + a compact **General Stock** control (right).

- **Row:** `display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 28px`.
- **Note (left) — three states:**
  - *empty* → ghost button: `sticky_note_2` 14px + muted "Add a note about this section" (`cursor: text`).
  - *click* → inline input (28px, `1px --p-primary`, `box-shadow 0 0 0 3px rgba(0,124,255,.12)`, autofocus); commit on Enter / blur, cancel on Esc.
  - *filled* → the ghost button showing the truncated note (`--p-text-2`).
  - **Rule:** for optional, rarely-set free text on a dense row, prefer this **ghost → inline → text** disclosure over an always-present empty input.
- **General Stock control (right):** optional amber **Chip "Suggested"** (only when off *and* the section name implies variable stock) · a `shuffle` 14px glyph + "General Stock Area" label (turns `--p-primary-ink` when on) · an `info` glyph carrying the educational **Tooltip** (`side="bottom" maxWidth={340}`) · a `Toggle`.

---

### General Stock Area (Arrangement Board sub-pattern)

A section that holds **variable inventory with no fixed list / sequence** (back stock, cold storage). Marking it "General Stock" means **no product list, no sequence, no drops** — just a tracked container.

- Toggling **on while placements exist** opens a **confirm** first (placements return to Unassigned): title **"Mark As General Stock Area?"**, body *"General stock areas do not have a stable and defined list of products within them. Any products that are currently listed in this section will be removed."* + *"{n} product placement(s) will be removed from this section."*; action **"Mark As General Stock Area"** (`shuffle`, `--p-warning`).
- When **on**: Add Product / Set Capacity hidden, drops blocked, the header shows a neutral **"General Stock"** badge (`shuffle` 13px), and the body becomes a centered **info empty-state** (`1px dashed --p-border` on `--p-surface-alt`, `inventory_2` 24px): "General Stock Area" + *"Products can't be placed here. Use this section to track variable inventory."*
- **Nudge, don't force:** the amber "Suggested" Chip only *hints* for back-stock-like section names; never auto-enable.

---

### Inline Quantity Control

A dense, encouraged-but-optional **capacity + unit** control for a placement row.

```css
display: inline-flex; align-items: center; height: 30px; border-radius: 6px; overflow: hidden;
border: 1px solid var(--p-border-strong);   /* unset → 1px solid var(--p-warning) */
background: #fff;                            /* unset → var(--g-gold-10) */
```

- A muted **label** ("Capacity"), a right-aligned `<input type=number>` (46px), and a **unit toggle** ("units" ⇄ "cases") separated by a 1px divider.
- **Unset cue:** when empty, the control takes the amber border + `--g-gold-10` fill — the canonical **"soft-required"** affordance (amber, *not* red; see Inputs & Forms).
- **Animated label swap:** when the placement's **Display** toggle is on, the label morphs "Capacity" → "Display Size" via the `gr-label-swap` keyframe (keyed span so React re-mounts).
- **Bulk apply:** a section kebab action **"Set Capacity For All"** opens a small modal (number + units / cases) that writes one value to every placement — the pattern: *per-row control + a "set for all" bulk shortcut in the container's menu*.

---

### Add-items Picker (grouped multi-select)

A centered overlay (480px, max-height 82vh) for adding several items to a destination at once — prioritizing what's already in scope while still allowing out-of-scope picks. Built on the `Modal` primitive. (Store Layouts: add products to a section.)

- **Header:** title + "Into **{section}** · select one or more", then a search input.
- **Scroll body — two groups separated by a divider:**
  - **"At This Store · N"** (carried + pending) on top.
  - **"Not At This Store · M"** as a **collapsible** group (chevron). When expanded it shows an **amber note** — *"Any products selected will be added to the account when this layout is published."* — then its rows.
- **Rows** are multi-select (custom 18px `PickCheck`, primary fill when checked; selected row tints `--p-primary-tint`). An item already in *this* section renders disabled with a green `check_circle` + "Placed".
- **Footer:** "{n} selected" (left); **Cancel** + **Done** (disabled at 0) on the right — adds all at once, no reopening.
- **Rule:** selection **survives search-filtering** — resolve picks against a full-source `byId` map, not the rendered subset. Group labels: `600 11px Inter; letter-spacing: .06em; uppercase; --p-muted`.

This mirrors the **Filter Menu** search pattern (SELECTED-on-top, capped results) but for *adding* rather than *filtering* — see Filter Menu.

---

### CSV Import

A two-step **upload / paste → validate → preview → commit** flow — the canonical bulk-import pattern (it also fulfills the Empty States "first-run / import" cause). Built on the `Modal` primitive (540px step 1, 760px preview). Reference: `preview/components-csv-import.html`.

**Step 1 — input.** A **dashed dropzone** button (`cloud_upload` 30px, primary; hover → `--p-primary-tint`) reading "Choose a CSV file" + a one-line schema hint, an **"or paste rows"** divider, and a **monospace textarea**. Footer: **Download Template** (neutral, `download`) + **Validate** (primary, disabled until input). Selecting a file auto-validates.

**Step 2 — preview.** Four mini **stat tiles** (Accounts / Sections / Placements / **New to Store** highlighted blue); conditional **InfoBanners** (amber "*N rows will be skipped*", info "*N accounts have an existing draft*"); a scrollable **per-account list** — each row shows id + name + an amber **Chip "Draft exists"** on conflict, with a **Replace / Skip** segmented control (one draft per account); non-conflicts show a green "New draft" marker. A collapsible **`<details>` of skipped rows** ("Row {n} — {message}"). Footer: **Back** + **Import {N} Draft(s)** (count reflects skips). On commit → success toast → land on the **Drafts** tab.

**Rules**

- **Validate-then-commit, always** — never import blind. Show totals, skipped rows (with reasons), and conflicts up front; resolve conflicts inline before committing.
- **Partial success is fine:** invalid rows are listed and skipped; valid rows still import.
- Pair every import with a **Download Template** and a round-trippable **Export** (the editor emits the same CSV shape).
- **CSV shape** (one row per placement; section fields repeat per row): `account_id, section_name, section_note, general_stock, product_id, capacity, capacity_unit, display, sequence`.

---

## 10. Motion

Animation is minimal — the portal reads as mostly static.

| Interaction | Duration | Easing |
|---|---|---|
| Hover states (buttons, rows) | 120ms | ease-out |
| Panels opening | 180ms | ease-out |
| Toggle knob slide | 150ms | ease |

Rules: no bounces, no springs. Treat motion as a garnish, not a feature.

### Keyframes

These named keyframes ship in `colors_and_type.css` and back every entrance / loading animation:

| Keyframe | Used for |
|---|---|
| `gr-fade-in` | simple opacity reveals |
| `gr-pop-in` | menus / popovers / tooltips |
| `gr-flyout-in` | collapsed-nav flyout |
| `gr-toast-in` | toast entrance (top-center) |
| `gr-spin` | spinner |
| `gr-shimmer` | skeleton shimmer |
| `gr-rise-in` | login / staggered entrance (`--i` index delay) |
| `gr-slide-fwd` / `gr-slide-back` | directional step transitions |
| `gr-tab-in` | tab-panel & wizard-step arrival |
| `gr-bar-in` | bottom-anchored bar (keeps `translate(-50%, …)` centering) |
| `ep-echo` | Echo Pulse rings (see §9 Echo Pulse) |
| `gr-label-swap` | inline label morph (Capacity → Display Size) — fade + 5px rise + slight blur |
| `gr-drawer-in` | drawer / side-sheet entrance |

**Transform-first rule.** Entrance animations must animate a transform, not opacity alone. A backgrounded iframe can freeze an opacity-only keyframe at `0`, leaving content permanently invisible — always pair opacity with a `translate`/`scale`. Honor `prefers-reduced-motion`: the stylesheet collapses durations and disables the Echo Pulse rings.

### JS animations (count-ups, asymmetric timing)

- **JS count-ups use ease-out-quart** (`1 − (1−t)⁴`), ~720–760ms, no bounce/elastic — the JS sibling of the CSS `cubic-bezier(0.22, 1, 0.36, 1)` family (`.gr-rise` / `.gr-step-*` / `.gr-tab-in`). The StatCard value count-up (see §9 Stat Cards) is the canonical example.
- **Asymmetric enter/exit timing is an approved technique.** When an element should *leave* quickly but *arrive* gently (or arrive only after a sibling settles), set different transition delays / durations per state (read the `transition` string from the current state). Documented examples: the StatCard opacity ramp and the sidebar company-name reveal (§9 App Shell).
- **Reduced motion covers JS too.** The global `prefers-reduced-motion` rule neutralizes CSS transitions; JS animations additionally **check `matchMedia` and snap to the final value** (see `useCountUp`). New motion must keep both safeties.

---

## 11. Voice & Copy

### Principles

- **Plainspoken, operational, slightly wry.** Product copy is literal and straightforward.
- **Second-person, sparingly.** "Sign in to your account." Never cutesy ("Hey! Let's get you signed in 👋"). No first-person.
- **Sentence case** for prose; **Title Case** for actions & overlay headers. Sentence case everywhere except column headers, overlines, tab/chip labels, and — per §4 — every button / link-button / SplitButton label and Modal·Drawer·Dialog header (see Typography → Sentence Case Rules).
- **Numbers carry weight.** Stat cards lead with large bold numbers. Use abbreviations: `21.1k`, `$482.7k`, `1,258`.
- **Verb-first** for actions, in Title Case: "Save Changes", "Finalize for Simulation", "Go Back".
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

— Store Layouts (Phase 3) —
"Manage where products exist in each store — arrange sections and placements, publish or schedule resets."
"Products at this store that aren't placed in any section appear here. Drag one into a section to place it."
"Every authorized product is placed."
"Add a note about this section"  /  "Add a note for reps — where to find it, inventory tips…"
"General Stock Area"  /  "Products can't be placed here. Use this section to track variable inventory."
"You're editing an upcoming reset (goes live {date}). Changes here do not affect the current live layout."
"This is a draft with no go-live date yet. Publish it to make it live, or schedule it for a future date."
"Any products selected will be added to the account when this layout is published."
"N rows will be skipped due to errors below — the rest import normally."
"1 skipped — a draft already exists for: Bluewater Bistro"
```

**Phase-3 actions stay Title Case** — "Save as Draft", "Publish Now", "Schedule For Later", "Set Capacity For All", "Mark As General Stock Area", "Import N Drafts"; the helper / banner / tooltip strings above remain sentence case.

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
  --p-shell: #FDFCF9;          /* page / canvas background */

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

  /* Intelligence gradient — AI / confidence / predictive */
  --g-intel-gradient: linear-gradient(90deg, #007CFF 0%, #5359F1 50%, #F153A9 100%);

  /* Restore / audit action accents */
  --p-restore: #0D9488;             /* teal — restore / revert + `restored` audit state */
  --g-teal-10: rgba(20,184,166,.12);
  --p-audit-created: var(--p-primary);
  --p-audit-updated: #B7791F;
  --p-audit-restored: var(--p-restore);
  --p-audit-deleted: var(--p-danger);

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
  --shadow-surface: 0 1px 2px 0 rgba(16,24,40,.04), 0 6px 16px -8px rgba(16,24,40,.10);
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
