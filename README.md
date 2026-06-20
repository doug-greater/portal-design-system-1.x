# Greater Portal Design System

This repository is our **shared design system** — the single source of truth for Greater Portal's tokens, components, voice, and UI. Design and code should both point here when building anything new.

## For AI agents

**Read [`Greater Design System.md`](./Greater%20Design%20System.md) first — it is the source of truth.** Treat it as authoritative for tokens, components, patterns, and voice before doing any design or implementation work.

**Before creating any new component, review this design system first.** Most needs are already covered by existing components, tokens, and patterns. Only build something new once you've confirmed an existing component can't be used or extended — a new component should be the exception, not the default.

## What's here

- **`Greater Design System.md`** — the source of truth (read this first)
- **`DESIGN-SYSTEM-OVERVIEW.md`** — detailed index and origin of the system
- **`SKILL.md`** — Claude-Code-compatible skill entry point
- **`colors_and_type.css`** — design tokens (CSS variables)
- **`fonts/`** — Inter + Geist Mono
- **`assets/`** — logos and brand marks
- **`ui_kits/portal/`** — component library and sample screens
- **`preview/`** — specimen cards for reference
- **`screenshots/`**, **`uploads/`** — reference imagery

## What's new in Portal 1.1

- **New components:** the **Wizard** (full-screen multi-step flow), **Audit Log, Change Row & Restore** (timeline modal + portal-wide ledger), **Echo Pulse** (post-auth brand moment), **Expandable Rows**, and the header **Batch Actions** dropdown (the multi-select pattern for tables). Plus a solid **danger** button, stat-card **drill-in** + Show/Hide Stats, and Date Picker **min/max + context-aware preset rails**.
- **Casing rule changed:** Title Case is now **mandatory** for all button / link-button / SplitButton labels and Modal · Drawer · Dialog headers. Body copy, helper text, banners, and toasts stay sentence case.
- **App Shell bottom nav reworked:** "Ops Tools" removed; the utility nav is now **Help Center · Audit Log · Settings · Account · Sign Out** (Audit Log and Settings are routed, with an active state).
- The vertical `more_vert` kebab is **banned** portal-wide — overflow triggers always use horizontal `more_horiz`.

## What's new in Phase 3 (Store Layouts)

- **New primitives:** the **Chip** (micro status — the canonical small tinted pill, replacing one-off badges), **Chip Toggle**, a documented **Tooltip** (`maxWidth` + downward `side`), and **MenuButton** (a full-height header/toolbar disclosure — the off-table sibling of SplitButton).
- **New patterns:** the **Arrangement Board** (drag-and-drop sections + placements + an Unassigned tray, on `@dnd-kit`), the **Section Meta Row**, **General Stock Area**, the **Inline Quantity Control** (amber "soft-required" cue), the grouped **Add-items Picker**, and a **CSV Import** (validate → preview → commit) flow.
- **Extended:** Batch Actions now covers **row-checkbox tables** with a tab-conditional menu and partial-result two-toasts; the App Shell documents an **in-shell detail editor**; Info Banners gain an **amber** tone; a **soft-required = amber** input state; plus `.g-textlink`, `gr-label-swap`, and ~25 Store-Layouts icons.
- **`@dnd-kit`** (core / sortable / utilities) is the one new runtime dependency.

## What's new in Portal 1.3

> *(Phase 3 above = the Portal 1.2 delta; this is the 1.3 "shell + motion" pass on top of it.)*

- **Shell background:** pages, the wizard workspace, login, and loaders now sit on a warm off-white **`--p-shell` (#FDFCF9)**; white is reserved for surfaces (cards, tables, side nav, wizard chrome) so they lift off the canvas.
- **Surface elevation:** new **`--shadow-surface`** soft-diffuse shadow for large resting surfaces (cards / tables / ledgers); the tight `--shadow-card` stays for small elements.
- **StatCard motion:** values **count up** from 0 (ease-out-quart) with a coupled fade-in; formats (`%`, `k`, `x`, `$`, decimals, grouping) are preserved; respects reduced-motion.
- **Filter-responsive stats:** stat cards now reflect the page's active search + facet filters (tab-independent); stats fold into the list response. Plus an **informational StatCard** (no drill-in action) for derived KPIs like coverage / averages.
- **Pending-delta count cell:** a carried count followed by clickable **`+N` (green) / `−N` (red)** mono chips for pending adds / discontinues — each a deep-link (`CountDeltaCell`).
- **Deep-linking:** list filters are URL-addressable; cross-page chips / links navigate with a facet query (`?account=…`); renamed routes redirect **preserving the query string**.
- **Route rename:** the catalog page is now **`/in-the-market`** (old `/products` 301s to it).
- **App Shell motion:** the collapsible nav **crossfades** its logo (wordmark ↔ crow) and reveals the company name with a `grid-template-rows` animation that wraps freely at full width and is hidden during the transition (no 2-line flash, and **no truncation** of long names).

## What's new in Portal 1.4

> *(The "Accounts → Coverage Map → unified-filters" pass, on top of 1.3. Two items **supersede** earlier specs — update, don't append: Sharp icons and the portal Tooltip.)*

- **Iconography → Sharp.** The portal icon family is now **Material Symbols *Sharp*** (was Rounded) — one font import + the `Icon` class. Glyph names are unchanged, so every existing icon reference keeps working.
- **Tooltip → portal.** `Tooltip` renders into `document.body` (`position: fixed`, viewport-clamped, `z-index: 4000`), so it never clips inside scrolling tables, transformed cards, or map overlays. Keeps the `maxWidth` wrapping variant.
- **New Chip tone `atrisk`** (`#FFF7ED` / `#C2410C`) for "at risk" / "draining" semantics.
- **New primitives: `AccountTypeIcon` + `AccountTypePill`** — the canonical mark + label for an account's type (white disc, thin ring, dark glyph; neutral pill).
- **Inventory "Conditions" palette** — a fixed 6-level diverging health scale (Out of Stock → Heavy Overstock) with locked colors (`--cond-*`) and an ordinal severity, shared by the table and the map.
- **Coverage Map** — a Leaflet basemap (CARTO Light) with a **D3 hexbin overlay** that encodes **two** variables at once (color = Condition, fill area = Demand velocity), plus pins⇄hexbin modes, a click-to-isolate condition legend, floating overlay cards, and a custom hex tooltip. Ships as `maps.css`.
- **Filter Menu `daterange` attribute type** — date ranges are now a first-class facet (rail item → calendar, applied token, "N filters" count). Retires one-off "Date" toolbar buttons.
- **Related-record facet** — filter a list by an attribute of a related record (e.g. Warehouse filters products by the carrying accounts' market).
- **Form patterns** — conditional (toggle-gated) required fields with input masking; **write-only secrets** (`*Set` boolean, "leave blank to keep current"); **async field-level uniqueness** checks with Reactivate / View-profile branches; `FloatingField`/`Input` gain `onBlur(value)` + `helper`.
- **Conventions** — numeric summary values are Geist Mono; spell out "Average"; unit-suffix the value (`12.5 cs/wk`, `45 days`, `471 cs`); encode magnitude as fill **area**, not opacity.
- **Deps** — `leaflet` 1.9.x, `d3-hexbin`, `d3-scale`, `d3-array`; basemap tiles **CARTO "Light All" / "Dark All" @2x** (with the required OpenStreetMap + CARTO attribution).

## What's new in Portal 1.5

> *the "Dark Mode + governed UI" pass on top of 1.4. Two items **supersede** earlier specs: the Conditions palette and "Days on Hand."*

- **Global Dark Mode.** A live, no-reload **light / dark / system** theme (`data-theme` on `<html>`, a `useSyncExternalStore` store, no-flash bootstrap), a full inverted-neutral dark token set (elevation via inset highlight + deep shadow), an App-Shell **theme toggle** (cycles light→dark→system), KO brand marks, and a negative Material-Symbols grade in dark. The Coverage Map swaps to CARTO **dark_all** tiles and themes its overlays. Authoring rule: tinted status/role/category surfaces are **bg/fg token pairs** (`theme.js` is the reference store).
- **Conditions palette → "Palette A"** *(supersedes 1.4)*. A colour-blind-safe diverging Orange→Teal→Purple ramp, WCAG ≥3:1 against both basemaps; same token names, severity, and helpers (`conditions.js` returns `var(--cond-…)`, never hex).
- **Governed UI.** A **hide-vs-disable** affordance model for role capabilities, first-class **disabled** states for `Select` / `Checkbox` / `Input` (lock glyph), and an amber **capability-lock banner**.
- **Forms & flows.** An **Unsaved-Changes "Discard" guard** (with a data-router caveat), a fully specified **two-step Login + dev quick sign-in**, and a tightened **write-only secret** (Mobile PIN) rule.
- **Hardening.** 4px control radii, unified **pending-change** tint language, mono bare-code table columns with em-dash empties + filter↔column parity, granular **audit-record** format, a **Replace-in-place** placement action, the **Route** facet, and **"Days on Hand"** (supersedes "Weeks on Hand").
- **Deps** — adds the CARTO **dark_all** basemap (no new packages).

## What's new in Portal 1.6

> *the "Ink-Forward" pass — primary actions & active navigation move blue → ink.*

- **Ink-forward.** Primary buttons, the active nav row / tab / wizard step / pagination page, and view-mode toggles use **brand ink** (`--p-action`), which **inverts to a white surface in dark**. **Blue** (`--p-primary`) is narrowed to selection / state / focus *inside content* (links, focus, selected rows, filters, controls, calendar, info).
- **Components.** A single **ink wizard track** (green reserved for genuine success), the **ink spinner**, adaptive `--shadow-brutal` + a neo press, the illustrated **EmptyArt** empty states (state-accent dot), and a neutral **row-action icon button**.
- **Brand.** A squared **crow icon** + multi-size favicon for square slots (favicon / app icon / avatar).

## What's new in Portal 1.7

> *the "search + ⌘K + General Stock" pass.*

- **Command Palette (⌘K)** + a portal-wide **Search Query Grammar** (`AND` default · uppercase `OR` · `"exact phrase"` · case- & accent-insensitive) + **`<Highlight>`** match-painting, front-end and back-end in sync.
- **Tokens.** A **search-highlight** family (`--p-highlight` — the only sanctioned yellow) and the **General Stock purple** concept accent (`--p-genstock*`).
- **Iconography.** A canonical **entity-icon** table (one glyph per entity — POD Planner `blur_medium`, Store Promotions `award_star`).
- **Component props.** `Input` clearable ✕ + `?` hint, `Toggle.color`, `Chip.iconRight`, `Tooltip.z`, `Modal tone="general"`.
- **Arrangement Board.** Tray kebab (Add to Section / Discontinue), `Adding` / `Discontinuing` badges, single-indicator **purple** General Stock, the "Suggested →" nudge, and the **Section Picker**.

## What's new in Portal 1.8

> *the "governed + guarded" pass on top of 1.7.*

- **Global Navigation Guard.** The unsaved-changes "Discard" guard now covers **all in-app navigation — sidebar, programmatic, in-page tabs, and hard unloads — under the existing declarative router** (a tiny `register/guard` context; no data router required). *Supersedes the 1.5 back-link-only caveat.*
- **Role-derived RBAC + Settings → Roles & Permissions.** Permissions are now **role-level with no per-user overrides**, edited in a new Settings matrix that **re-syncs every user of a role on save**; the user page is **read-only** about permissions. *Supersedes the 1.5 per-user editor.*
- **Assignment-Edit pattern.** A wide calendar + **live route preview** editor that codifies the **Amber = your edit / Red = real-world conflict** color law, a **legend-as-mini-cell** rule, and an amber **"(preview)"** label for staged views.
- **Maps.** Pins moved to **hover-to-reveal** (with a grace timer) and carry an in-popup **"Edit Assignment"** deep-link back to the list editor.
- **Hardening.** **Masonry** packing for variable-height cards, **native `title=` retired** in favor of the portal `Tooltip`, and **Cancel is ghost/neutral** (blue "Cancel" links retired). New tokens `--p-danger-soft` / `--g-gold-04`; new `NavGuard.jsx` kit + `SCREENS-1.8.md`.
