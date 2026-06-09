# Portal UI Kit — Phase 3 Flows (Store Layouts notes)

Store Layouts shipped two flows. As with the 1.1 screens, this note documents how each
composes the kit's primitives + `layout-board.jsx` rather than re-shipping full screen
clones. See `Greater Design System.md` §9 for the authoritative specs.

## Store Layouts list (`/store-layouts`)
- Nav under **Accounts**, listed **before** Store Promotions.
- Tabs (`SegmentedTabs`): **Active · Scheduled · Drafts**. A **row-checkbox table** (header select-all + per-row checkbox that `stopPropagation`s so it never triggers the row's navigate-to-editor click).
- **Batch Actions** (header dropdown / `MenuButton`) is **tab-conditional** — Active → *Apply Template*; Scheduled → *Edit Effective Date · Cancel to Draft · Cancel & Discard*; Drafts → *Publish Now · Schedule…*. A **"{n} selected" Chip** sits left of it; selection **clears on tab switch**. Shared `BatchDateModal` (Date Picker, `fromDate = tomorrow`) for date actions; partial results surface as a **success + warning two-toast**.
- Active rows carry **clickable status pills** (Chip visual): amber "Reset {date}" (`event_upcoming`) and gray "Draft" (`edit_note`) that deep-link into that version's editor.
- **CSV Import** entry (validate → preview → commit; see §9 CSV Import) and a round-trippable **Export**.

## Store Layout Editor (`/store-layouts/:accountId/:version`, version ∈ active | scheduled | draft)
- An **in-shell detail editor** (sticky header + opaque backing div; `headerH` threaded into the board's sticky section headers; both tabs mounted; scroll-to-top on open; exit guard — see §9 App Shell → In-shell detail editor).
- Tabs over the **same editable model**: **Layout Editor** (the `LayoutBoard` — sections, placements, Unassigned tray, capacity controls, General Stock) ⇄ **Product List**.
- Header action bar: dirty indicator ("● Unsaved changes") + `History` + `Export` + a **MenuButton** `Publish ▾` (`Publish Now · Schedule For Later` / `Reschedule`).
- Cross-version `InfoBanner`s: amber "editing a scheduled reset" / info "this is a draft", each with a `.g-textlink` to the sibling version.

## Terminology (canon)
Sections → ordered **Placements** (product *instances*); the **Unassigned tray** holds **unplaced** SKUs. **Capacity** + **unit** (`units` | `cases`); a **Display** placement reads "Display Size". **General Stock Area** = variable inventory, no fixed list. A future change is a **scheduled reset** (effective on its **go-live date**); versions are **active · scheduled · draft**. Bulk load = **CSV Import**; reverse = **Export**; starter = **Template**.
