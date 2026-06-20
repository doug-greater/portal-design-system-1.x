# Greater Design System — Overview

> **For the full spec of every component and how to use it, see [`Greater Design System.md`](./Greater%20Design%20System.md) — that is the source of truth.** This file is the high-level orientation layer: company context, voice, visual foundations, and a file map.

> Greater Industries builds AI that helps wholesalers and distributors make the smartest, most efficient, most profitable decisions across their entire business. From warehouse workers and truck drivers to sales reps and owners — Greater's portal is the cockpit that connects the people who power local economies.
>
> This folder is the shared visual language: tokens, components, voice, and enough working UI to pattern-match against when designing anything new.

---

## Sources

This is the **maintained design system** for Greater Portal. The per-component source of truth is [`Greater Design System.md`](./Greater%20Design%20System.md); this overview covers the surrounding context (company, voice, visual foundations, file map). The system originated from a Figma reference and live portal screens:

- **Portal 1.0 Design System scrape.fig** — `Page-1` (37 frames)
  - Foundation sections: `Typography`, `THE COLORS, DUKE. THE COLORS.`, `Glyphs`, `Buttons n stuff`, `Products Menu Portal Features`
  - Live screen exports from `https://portal.greater.co/*` (login, scenarios, orchestration, agent-configuration)
  - 285 local components, 35 page-scoped externals

Everything in this repo — `colors_and_type.css`, the `preview/` spec cards, and the `ui_kits/portal/` build — is maintained here directly and is the reference that design and code should point to (not the original Figma), with `Greater Design System.md` as the authoritative component spec.

The system has since been **extended well beyond that origin** with
net-new components designed from first principles: the consolidated Filter
Menu, User Avatars & Role Pills, the Account
Type Icon, Permission Cards, the Confirmation Dialog (now the Modal
`confirm` variant), the Page Detail Header, and a full app shell with a
collapsible Navigation Sidebar.

---

## Index

```
/
├── README.md                    ← repo intro + AI-agent guidance
├── Greater Design System.md      ← source of truth: full component specs
├── DESIGN-SYSTEM-OVERVIEW.md     ← this file (orientation + foundations)
├── SKILL.md                     ← Claude-Code-compatible skill frontmatter
├── colors_and_type.css          ← all design tokens (CSS variables)
├── fonts/fonts.css              ← @import for Inter + Geist Mono
├── assets/
│   ├── greater-logotype.png     ← "Greater" wordmark (in-product logo)
│   ├── greater-crow.png         ← raven-only mark (favicon / tight spots)
│   ├── greater-crow-ko.png      ← raven mark, knockout (dark backgrounds)
│   └── greater-logotype-ko.png  ← wordmark, knockout (dark backgrounds)
├── preview/                     ← design-system cards (one HTML per concept)
├── ui_kits/portal/              ← working hi-fi portal build
└── slides/                      ← (none — no decks were attached)
```

---

## Company / product context

**Portal** — the product — is an internal-facing web app organized around these surfaces (inferred from scraped URLs):

| Surface | Role |
|---|---|
| `/login` | Branded email-only sign-in (logo-forward). |
| `/scenarios/:id/agent-configuration/*` | Configure AI agents — sales rep week defaults, call patterns, route planning. |
| `/scenarios/:id/general-settings/*` | Scenario-level settings (work-week, constraints). |
| `/orchestration/visualize-impact/*` | Line/area charts showing baseline vs. selected scenario impact ($ savings, workload). |
| `/in-the-market` ("In the Market") | Inventory table — products × accounts × coverage, with category pills and placement counts. (Renamed from `/products`, which 301s here with the query string preserved; back-end API paths unchanged.) |
| `/accounts` | Account directory + detail pages (Account Type Icon identity header). |
| `/users` | User management — list, detail (Profile / Role & Permissions / Team), with role pills and permission cards. |
| `/store-layouts` | Per-account drag-and-drop merchandising — sections, placements, an Unassigned tray, drafts / scheduled resets, CSV import (`@dnd-kit`). In-shell editor at `/store-layouts/:accountId/:version`. |

The portal is **information-dense**: big data tables, filter chips, stat
cards, comparison charts. It's designed for operators who live in the tool
all day, not marketing surfaces. Copy is literal, never cute.

Two visual languages coexist and the system supports both:

- **Portal** — the shipping UI. Cool-gray neutrals, a single brand blue
  (`#007CFF`) for links/selection (primary actions are ink — `--p-action`),
  14/16px Inter, tight headlines (−0.025em), `E5E7EB` borders,
  colored category pills (Beer=amber, Wine=purple, Spirits=orange…).
- **Brand moments** — a small, deliberate set of louder surfaces: the login
  Next / Sign In button and the post-auth Echo Pulse. The only brand-specific
  elements are the **neo-brutalist** button (1px black border + `2px 2px 0`
  offset shadow) and the **intelligence gradient** — everything else is Portal.

Use Portal tokens for everything; the neutral ramp is the ink-forward ramp (no
separate gray scale) and there is a single brand blue.

---

## Content fundamentals

**Voice:** plainspoken, operational, slightly wry. The Figma section
called "THE COLORS, DUKE. THE COLORS." signals that the team is willing
to be a little playful behind the scenes, but product copy itself is
straightforward and verb-first.

- **Second-person, sparingly.** "Sign in to your account." / "Track
  products and their availability across your accounts." Never cutesy
  ("Hey! Let's get you signed in 👋"). No first-person.
- **Title Case for UI chrome; sentence case for prose.** Title Case is now
  **mandatory** for all interactive labels and overlay headers — page titles
  ("In the Market"), nav items, tab labels, stat-card labels ("Active
  Placements"), **every button / link-button / SplitButton label**, and
  **Modal / Drawer / Dialog headers**. Never ship a sentence-case button label
  or overlay header. Reserve **sentence case** for descriptive and body copy:
  page subtitles, helper text, info banners, empty-state bodies, tooltips,
  toasts, and error messages.
  - Column headers: `PRODUCT`, `ACCOUNTS`, `IN MARKET`, `CATEGORY` — all caps, tracked.
  - Overlines: `OVERLINE 1` — all caps.
- **Numbers carry weight.** Stat cards lead with a large 20px bold number
  colored by importance (`21.1k` in primary blue for the hero metric;
  neutrals for secondary). Use abbreviations: `21.1k`, `$482.7k`, `1,258`.
- **Inline status words** are colored: `Pending Discontinue` shows a red
  `1`; `Discontinued & Draining` shows a gold `4`.
- **Inline links.** Blue links carry **no underline** — the color is the
  affordance; underline appears on hover only. Links shown in a
  **subdued / gray** color (e.g. the `Show` link-verb after a stat-card
  metric, or metadata-row actions) **are underlined** so they read as
  interactive without the blue cue. Solid underline, never dotted.
  Agreement / legal text is small (12px), centered, medium-gray, with
  underlined link spans.
- **Empty states & errors.** Field errors use `#E5484D` (danger red), 12px
  Inter Medium, placed below the input. Info prompts use a soft blue
  pill ("Select one or more products below, then press 'Continue'…").
- **No emoji in product.** The portal is emoji-free. Emoji occasionally
  show up in internal Figma labels (❤️) but never reach users.
- **Brand name.** Always "Greater" or "Greater Industries" — never
  abbreviated, never all-caps, never stylized.

Examples taken verbatim from the Figma scrape:

> "Sign in to your account"
> "By clicking 'Next' you are agreeing to the Greater Industries **User Terms of Service** and **Privacy Policy**"
> "Track products and their availability across your accounts."
> "Select one or more products below, then press 'Continue' to choose a desired action for each product. (Step 1 of 4)"
> "64 of 71 products"
> "Thursday, Apr 23 • Kenny D'Amica   ·   5 stops"

---

## Visual foundations

**Colors.** Black / dark-gray / medium-gray / light-gray / off-white /
white forms the neutral spine. The brand blue is a single `#007CFF`
(`--p-primary`), reserved for links / selection / focus;
primary actions & active nav are **ink** (`--p-action`, see ink-forward).
The feedback accents (green/red/gold) and the brand blue cover state; the
10-color pill palette covers categories and roles. Tints are always computed as 25%/10%/5% of the accent over
white, never ad-hoc.

**Type.** Inter is the only UI family (Regular/Medium/Semibold/Bold/Light),
with Geist Mono for IDs, codes, and tabular data. No serif, no display
face. Headings use tight tracking (−0.025em at 24px, 0 at larger); caps
labels use +5% tracking.

**Backgrounds.** Surfaces are flat white with `#F9FAFB` for table headers
and `#F3F4F6` for tab-strip wells. **No gradients in product.** No
full-bleed imagery. No repeating patterns. The login screen is a sea of
white with the raven logo centered — that restraint IS the brand.

**Imagery.** The only illustration is the raven-on-wordmark. Map tiles
(Leaflet + OpenStreetMap + CARTO light basemap) appear in the routing
view with `#007CFF` polylines and 28px black-bordered numbered pin
circles.

**Animation.** None documented in the scrape — the portal reads as mostly
static. Adopt: 120ms ease-out for hovers, 180ms for panels, no bounces,
no springs. Treat motion as a garnish.

**Hover / press states.**
- Buttons: primary → `--p-primary-hover` (darken ~8%). Secondary → add
  `--p-primary-tint` fill. Tertiary → underline text.
- Table rows: on hover, fill with `--p-primary-tint` (`#EFF6FF`).
- Icon buttons: `rgba(0,0,0,.05)` circular/rounded-4 fill on hover.
- Press: no scale. Deepen hover color by ~4%.
- **Foundation "neo" variant** (login Next): default = white-transparent
  fill + 1px black border + `shadow-brutal`; hover = fill `#F0F7FF`.

**Borders.** `1px solid #E5E7EB` for cards/tables; `1px solid #D1D5DC`
for inputs; `1px dashed rgb(0,0,0)` at `0.5px` for Figma-only guide
rails (don't ship). Radii: 4px (buttons), 6px (floating-label inputs /
filters / stat cards), 8px (callouts / search bar / flyout), 10px
(floating cards), 999px for pills.

**Shadows.**
- `--shadow-tooltip` for tooltips.
- `--shadow-card` on stat cards / secondary buttons (flat whisper).
- `--shadow-float` for elevated floating cards (TableView: route popover).
- `--shadow-brutal` — `2px 2px 0 0 #000` — for brand-moment buttons only.

**Transparency & blur.** Rare. Map attributions use
`rgba(255,255,255,.8)` strips. Chart area fills use
`linear-gradient(rgba(0,124,255,.6) → 0)`. No `backdrop-filter` seen.

**Imagery color grade.** Monochrome raven (cool-grey facets). Maps keep
CARTO's muted neutral palette — never full-color satellite.

**Cards.** White fill, 1px `#E5E7EB` border. In-table rows carry no
shadow; **stat cards use `--shadow-card`** to lift off a white page;
`shadow-float` for detached popovers and the collapsed-nav flyout. Inner
padding 16px. Corner radius 4px (table cells) / 6px (stat cards) /
8px (flyout) / 10px (TableView popover).

**Layout rules.** Max-content width in the portal is ~1320px, centered.
Page gutter is 32px. Cards gap 16px. Stat rows layout as 3-up. Tables
are full-width with a sticky-feeling 40px header and roomy body rows. The
app shell is now fully built: a persistent left **Navigation Sidebar**
(248px expanded / 72px collapsed, with a collapsed-icon **flyout** for
sub-navigation) sits *outside* a viewport-locked scrolling content region,
so the nav stays fixed while only content scrolls. See the Navigation
Sidebar component.

---

## Iconography

Greater uses **Material Symbols (Sharp)** for all in-product
iconography. Default rendering: weight 400, optical size 24, fill 0
(outlined), color inherits from text. Variable-font axes (`FILL`,
`wght`, `GRAD`, `opsz`) are used sparingly — prefer outline 400/24 for
everything unless there's a deliberate reason to switch.

Load the stylesheet once per page:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@24,400,0,0">
```

Render an icon by putting the glyph name as the text content:

```html
<span class="material-symbols-sharp">search</span>
```

Common icons used across Portal: `search`, `filter_alt`, `expand_more`,
`unfold_more`, `storefront` (Products in Market), `inventory_2`
(All Products), `location_on`, `more_horiz`, `close`, `check`, `info`,
`arrow_outward`, `fullscreen`, `account_circle`, `bar_chart`,
`settings`, `home`, `apartment`, `route`, `schedule`, `notifications`,
`help`, `edit`, `delete`.

Sizing: default 24px. Use 20px in dense tables/chips, 16px inside
button labels, and 14px only in tight inline-with-caption contexts.

**Unicode chars.** The bullet `•` is used as a separator ("Thursday, Apr
23 • Kenny D'Amica"). En-dash `–` in ranges. No arrows via unicode —
always SVG.

**Logo asset.** The in-product logo is the wordmark
`assets/greater-logotype.png`; use the raven mark `assets/greater-crow.png`
for favicons and tight spots, with `*-ko.png` knockout variants on dark
backgrounds. Never use the combined crow + wordmark marketing lockup
inside the product. Don't skew, don't recolor.

---

## Flagged substitutions / caveats

- **Fonts:** Inter + Geist Mono are pulled from Google Fonts. The Figma
  file lists "Helvetica Neue" as a bit-part (map attribution); we don't
  ship it — system-font fallback is fine.
- **Icon set:** Material Symbols (Sharp) font, used everywhere in the UI kit.
  Lucide and Iconify have been fully removed.
- **Portal chrome (global nav, user menu):** not present in the original
  Figma scrape — designed from first principles in this system. The UI kit
  now ships a full app shell: a collapsible Navigation Sidebar (with
  collapsed-icon flyout), org header + global search, and a bottom utility
  nav. Only the user menu remains a light placeholder.
- **One full map/illustration:** TableView's Leaflet map uses a
  placeholder CSS-gradient tile and numbered pins — not a real tile
  layer.

---

## Component library

Each concept is documented as a standalone card in `preview/`. Current
coverage:

- **Foundations** — Colors (neutrals, accents, the **10-color pill palette**, the **Inventory Conditions** scale, Intelligence gradient, opacity), Type
  (headings, body, mono, voice), Spacing (scale, radii, shadows),
  Iconography (**Material Symbols Sharp** only), Brand (logo, maps incl. the **Coverage Map** hexbin overlay).
- **Controls & forms** — Buttons (primary / secondary / warning / **solid danger** / **neutral** / ghost /
  neo), Inputs & Forms (floating-label field, search bar,
  disabled states), Toggle / Checkbox / Radio.
- **Navigation & filtering** — Page-level & segmented Tabs, Filter Chips,
  the consolidated **Filter Menu**, the **Navigation Sidebar** (expanded
  / collapsed + collapsed flyout), and **Row actions** — the **Menu** popover
  primitive opened by either a **Split button** or a **Kebab** trigger. Portal-wide **Search** (one query grammar + `<Highlight>` match-painting) powers every list field and the ⌘K palette.
- **Overlays & feedback** — **Modal** (`default` + `confirm` variants, incl. the purple `tone="general"`) and **Drawer**
  on a shared **Overlay** foundation (both now take an optional `subtitle`), **Toast** (success / error, top-center, always-present ✕),
  **Loading & Skeleton**, **Empty States**, the **Command Palette (⌘K)** global launcher, and the **Echo Pulse** post-auth brand moment.
- **Data display** — Tables (incl. **grid-row** read-only ledgers), **Pagination** (footer count + page-size + pager),
  **Stat Cards** (with drill-in `active` state + Show / Hide Stats), **Pills** (one tinted-label component for Category *and* Role on the
  shared 10-color palette), the **Status Badge** (soft pill + dot, 6 tones),
  Info Banners, the header **Batch Actions** dropdown for multi-select, and the **Date Picker** (single + range, context-aware preset rails, min/max, drop-up).
- **Identity & detail** — **User Avatars & Role Pills** (dotless; ring = the role's
  text color; both via the shared `.g-avatar` / `.g-role-pill` classes), the
  **Account Type Icon + Pill** (`AccountTypeIcon` / `AccountTypePill` primitives), and the **Page Detail Header**.
- **Permissions** — **Permission Cards** and the **Confirmation Dialog** (now the
  `confirm` variant of Modal).
- **New in 1.1** — the **Wizard** (full-screen multi-step flow + `SelectionTable`,
  `CopyToAllChip`, `ActionSegment`, `StepHeader`), the **Audit Log, Change Row & Restore**
  family (timeline modal + portal-wide ledger), **Echo Pulse**, and **Expandable Rows**.
- **New in Phase 3 (Store Layouts)** — the **Chip** (micro status) + **Chip Toggle**, a
  documented **Tooltip** (`maxWidth` / `side`), **MenuButton** (off-table disclosure), the
  **Arrangement Board** (drag-and-drop, on `@dnd-kit`) with its **Meta Row** / **General
  Stock Area** / **Inline Quantity Control**, the **Add-items Picker**, and **CSV Import**.
- **New in Portal 1.3 (shell + motion)** — the **`--p-shell`** page canvas + **`--shadow-surface`**
  elevation tier; **StatCard count-up** + the **informational (no-action)** variant +
  **filter-responsive** stats; the **pending-delta count cell** (`CountDeltaCell`); **URL-facet
  deep-linking** + the `/in-the-market` route rename; and **App Shell collapse/expand motion**
  (logo crossfade + wrap-safe company-name reveal). *(Phase 3 above = the Portal 1.2 delta.)*
- **New in Portal 1.4 (Coverage Map + unified filters)** — **Material Symbols Sharp** replaces
  Rounded app-wide; the **Tooltip** is now **portal-rendered** (`position: fixed`, viewport-clamped,
  `z-index: 4000`); a new **Chip `atrisk`** tone (`--g-orange-10` / `--p-atrisk-strong`); the
  **`AccountTypeIcon` + `AccountTypePill`** primitives; the **Inventory Conditions** palette
  (fixed 6-level diverging health scale, `--cond-*`); the **Coverage Map** (Leaflet basemap + D3
  hexbin overlay — color = Condition, fill area = Demand velocity — pins⇄hexbin modes, legend
  spotlight, floating overlay cards; ships as `maps.css`); the Filter Menu **`daterange`** attribute
  type + the **related-record facet**; the **conditional / write-only-secret** and **async
  field-level uniqueness** form patterns; `FloatingField`/`Input` **`onBlur(value)` + `helper`**;
  and the conventions (mono summary values, "Average", unit-suffixed values, magnitude-as-area).
  **Deps:** `leaflet` 1.9.x, `d3-hexbin`, `d3-scale`, `d3-array`; CARTO "Light All" tiles.
  *(Two items **supersede** earlier specs: Sharp icons and the portal Tooltip.)*
- **New in Portal 1.5 (Dark Mode + governed UI)** — **Global Dark Mode**: a live
  light/dark/system theme (`data-theme` on `<html>`, a `useSyncExternalStore` store in
  `theme.js`, no-flash bootstrap), a full inverted-neutral dark token block (elevation via
  inset-highlight + deep shadow), the **flip-pairs** authoring rule, an App-Shell **theme
  toggle**, KO brand marks, and `--ms-grad` optical correction; the Coverage Map swaps to
  CARTO **dark_all**. **Conditions → "Palette A"** (colour-blind-safe, WCAG ≥3:1; *supersedes*
  1.4 — same token names/severity; `conditions.js` returns `var(--cond-…)`). **Governed UI**:
  the **hide-vs-disable** Permissions & Affordances pattern, first-class **`disabled`** states
  for `Select` (lock glyph) / `Checkbox` / `Input`, and the amber **capability-lock banner**.
  The **Unsaved-Changes "Discard" guard** (data-router caveat), the two-step **Login + dev
  sign-in**, a tightened **write-only PIN** rule. Hardening: **4px control radii**, unified
  **pending-change tint** language, mono bare-code table columns + em-dash empties +
  filter↔column parity, granular **audit records**, a **Replace-in-place** placement action,
  the **Route** facet, and **"Days on Hand"** (*supersedes* "Weeks on Hand"). New files:
  `theme.js`, `conditions.js`, a `Select` primitive; Appendix A documents the RBAC vocabulary.
- **New in Portal 1.6 (Ink-Forward)** — primary actions & active navigation moved **blue → ink**
  (`--p-action`, inverting to a white surface in dark); blue narrowed to selection / state / focus;
  adaptive `--shadow-brutal`; a single **ink wizard track**; the **ink spinner**; the illustrated
  **EmptyArt** empty states (state-accent dot); the neutral **row-action icon button**; and a squared
  **crow icon** for favicons / square slots.
- **New in Portal 1.7 (Search · ⌘K · General Stock)** — the **Command Palette (⌘K)** + a portal-wide
  **Search Query Grammar** (`AND` default · uppercase `OR` · `"phrase"` · accent-insensitive) +
  **`<Highlight>`** match-painting; the **search-highlight** token `--p-highlight` (the only sanctioned
  yellow) and the **General Stock purple** concept tokens (`--p-genstock*`); the **entity-icon canon**
  (one glyph per entity — POD Planner `blur_medium`, Store Promotions `award_star`); `Input` clearable
  ✕ + `?` hint, `Toggle.color`, `Chip.iconRight`, `Tooltip.z`, `Modal tone="general"`; the
  **Arrangement Board** tray kebab (Add to Section / Discontinue), `Adding` / `Discontinuing` badges,
  single-indicator **purple** General Stock, and the "Suggested →" nudge; the **Section Picker**; and
  the z-index ladder + the fixed-inside-`sticky`/`transform` rule.
- **New in Portal 1.8 (Governed RBAC · Global Nav Guard · Assignment-Edit)** — the unsaved-changes
  "Discard" guard goes **global** (sidebar + programmatic + in-page tabs + hard unload under the
  declarative router; new **`NavGuard.jsx`**) *(supersedes the 1.5 data-router caveat)*; **role-derived
  RBAC** — one role→capability matrix in **Settings → Roles & Permissions** that re-syncs every user of
  a role on save, with the user page now **read-only** about permissions *(supersedes the 1.5 per-user
  editor)*; **Masonry** packing for variable-height cards; the **Assignment-Edit** modal codifying the
  **Amber = your edit / Red = real-world conflict** color law, **legend-as-mini-cell**, and an amber
  **"(preview)"** label; Maps **hover-to-reveal** pins + an in-popup **"Edit Assignment"** deep-link;
  native **`title=` retired** for the portal `Tooltip`; **Cancel = ghost / neutral** (blue links
  retired); new tokens `--p-danger-soft` / `--g-gold-04`; and **`SCREENS-1.8.md`**.

**Terminology (1.1 canon).** "Store Promotions" (short "Store Promos", `/store-promotions`),
"POD Planner" (`/pod-planner`), "Audit Log" (events Created / Updated / Restored / Deleted;
value columns Removed / Added), "Batch Actions" (not "Bulk actions"), "Restore This Version"
(teal). Company shown in-shell: "Coastal Beverage Company".

**Terminology (Phase 3 — Store Layouts).** "Store Layouts" (nav under Accounts, before Store Promotions; `/store-layouts`); ordered **Sections** → **Placements** (unplaced ones sit in the **Unassigned tray**); **Capacity** + **unit** (`units` / `cases`, "Display Size" when a Display); **General Stock Area** = variable inventory, no fixed list; a future change is a **scheduled reset** (versions: **active · scheduled · draft**); bulk load = **CSV Import** / **Export** / **Template**.

The full spec for every component lives in `Greater Design System.md`.

---

## UI kits

- **`ui_kits/portal/`** — click-thru recreation of the Greater Portal. Open
  `ui_kits/portal/index.html`: login → app shell → **Products / In the Market**
  table and the full **Users / Permissions / Teams** page (the other nav sections
  are intentionally grayed out for this preview), plus the routes map and scenario
  configuration. Built entirely on the shared tokens + primitives:
  - `primitives.jsx` — core (Icon, Button incl. **danger** + `loading`, Input, Toggle, Checkbox, Pill, Tabs, StatCard with drill-in, **StatsToggle**…).
  - `overlays.jsx` — the Overlay foundation (MIcon · Scrim · focus-trap) + Modal / Drawer (with `subtitle`), **Menu**, **SplitButton** (Title-Cases its label), **Kebab**.
  - `feedback.jsx` — Toast (+ `window.toast`), Spinner, Skeleton, EmptyState, **EchoPulse**.
  - `tables.jsx` — Pagination · `dates.jsx` — Calendar / DateField (min/max, context-aware presets, drop-up).
  - **`wizard.jsx`** — WizardShell + SelectionTable + Check + CopyToAllChip + ActionSegment + StepHeader · **`audit.jsx`** — AuditLogModal + ChangeRow.
  - **`layout-board.jsx`** — structural Arrangement Board (sections · placements · capacity control · Unassigned tray · General Stock); production drag uses **`@dnd-kit`** (the one new runtime dependency). Plus `Chip` / `ChipToggle` / `Tooltip` (primitives) and `MenuButton` (overlays).
  - `FilterMenu.jsx`, `AppShell.jsx`, and screens: `LoginScreen`, `ProductsScreen`, `UsersScreen`, `RoutesScreen`, `ScenarioScreen` (+ `SCREENS-1.1.md` notes for POD Planner, Store Promotions, Audit Log, Settings).
  - `interactive-primitives.html` — a click-to-test harness for the behavioral components.
  - **Icons are Material Symbols (font) only** — Lucide and Iconify have been removed.

No slide template was attached, so `slides/` is intentionally empty.

## Working with this system

- **For production code:** lift tokens from `colors_and_type.css`; consume
  components from `ui_kits/portal/*.jsx` as hi-fi reference implementations,
  not as an `npm` package.
- **For prototypes / mocks / slides:** import the CSS, copy the logo,
  load Material Symbols from Google Fonts. Stick to Portal tokens
  unless you're doing a brand-forward moment (then reach for the
  neo button + the intelligence gradient).
- **For new components:** match the spacing base (4px), use
  `--p-border` / `--p-primary` / `--p-ink`, and prefer 14px Inter Medium
  for interactive labels.
