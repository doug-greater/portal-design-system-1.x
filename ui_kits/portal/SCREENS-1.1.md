# Portal UI Kit — 1.1 Flows (notes)

These four flows shipped in Portal 1.1. Rather than re-ship full screen clones, this
note documents how each composes the kit's primitives plus the new `wizard.jsx` and
`audit.jsx`. See `Greater Design System.md` §9 for the authoritative specs.

## POD Planner (`/pod-planner`)
- Pending / Completed tabs (`SegmentedTabs`); 4 `StatCard`s with **drill-in** (click a stat → applies the matching table filter; the live target shows the `active` ring) + `StatsToggle` (Show / Hide Stats, persisted via `useStatsVisible('pod-planner')`).
- Consolidated `FilterMenu`; a Go-Live date-range filter (`DateField direction="forward"`, `min = today`); sortable columns; row Edit / Delete (Kebab or SplitButton).
- **Batch Actions** header dropdown (Neutral Button + `expand_more`, left of the "New Plan" CTA; disabled until rows are selected) — the default selection pattern for tables.
- Standard footer (`Pagination` + `RowsSelect`, default 50).
- **4-step wizard** (`WizardShell`): Select Products → Configure Actions (`ActionSegment` + `CopyToAllChip`) → Select Accounts (`SelectionTable`) → Review (`ChangeRow` diff). Audit Log + Restore per plan (`AuditLogModal`).

## Store Promotions (`/store-promotions`)
- Active & Upcoming / Past tabs; `StatusBadge` dots (Active → Info, Upcoming → Pending, Past → Neutral); stat cards; `FilterMenu` with a leading "All Products / Carried at Selected Accounts" **scope chip**.
- **Expandable rows** reveal Accounts & Products (lazy `GET /promotions/{id}`); the expanded panel hosts a `SplitButton` ("Edit Store Promo" + Duplicate / Delete, `menuAlign="right"`).
- CSV export; Batch Actions; standard footer.
- **4-step wizard** with a coverage column + a change-diff Review. Audit Log + Restore per promo.

## Audit Log (`/audit-log`)
- The portal-wide ledger: one **grid-row** table row per changed attribute — `When · Record Type · Record · Action · Attribute · Removed · Added · Changed By`.
- Toolbar: search · date-range (`DateField direction="backward"`, `max = today`) · All Record Types · All Actions · All Users.
- Action tags: Created (green) · Updated (gold) · Restored (teal) · Deleted (red). Deletions are recorded as tombstones. Standard footer (default 50).

## Settings (`/settings`)
- Placeholder route, registered in the bottom utility nav. No persisted settings yet — do not assume a "settings audit" exists.
