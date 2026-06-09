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

- **New components:** the **Wizard** (full-screen multi-step flow), **Audit Log, Change Row & Restore** (timeline modal + portal-wide ledger), **Echo Pulse** (post-auth brand moment), **Expandable Rows**, and the header **Batch Actions** dropdown (now the default selection pattern for tables — the floating Selection Bar is reserved for canvas surfaces). Plus a solid **danger** button, stat-card **drill-in** + Show/Hide Stats, and Date Picker **min/max + context-aware preset rails**.
- **Casing rule changed:** Title Case is now **mandatory** for all button / link-button / SplitButton labels and Modal · Drawer · Dialog headers. Body copy, helper text, banners, and toasts stay sentence case.
- **App Shell bottom nav reworked:** "Ops Tools" removed; the utility nav is now **Help Center · Audit Log · Settings · Account · Sign Out** (Audit Log and Settings are routed, with an active state).
- The vertical `more_vert` kebab is **banned** portal-wide — overflow triggers always use horizontal `more_horiz`.

## What's new in Phase 3 (Store Layouts)

- **New primitives:** the **Chip** (micro status — the canonical small tinted pill, replacing one-off badges), **Chip Toggle**, a documented **Tooltip** (`maxWidth` + downward `side`), and **MenuButton** (a full-height header/toolbar disclosure — the off-table sibling of SplitButton).
- **New patterns:** the **Arrangement Board** (drag-and-drop sections + placements + an Unassigned tray, on `@dnd-kit`), the **Section Meta Row**, **General Stock Area**, the **Inline Quantity Control** (amber "soft-required" cue), the grouped **Add-items Picker**, and a **CSV Import** (validate → preview → commit) flow.
- **Extended:** Batch Actions now covers **row-checkbox tables** with a tab-conditional menu and partial-result two-toasts; the App Shell documents an **in-shell detail editor**; Info Banners gain an **amber** tone; a **soft-required = amber** input state; plus `.g-textlink`, `gr-label-swap`, and ~25 Store-Layouts icons.
- **`@dnd-kit`** (core / sortable / utilities) is the one new runtime dependency.
