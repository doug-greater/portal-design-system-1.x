# Portal UI Kit — 1.8 ("Governed RBAC · Global Nav Guard · Assignment-Edit") notes

The 1.8 pass adds two structural reframings (a **global unsaved-changes guard** and
**role-derived RBAC**) plus the **Assignment-Edit** surface. Most of it lives in
`Greater Design System.md` (Unsaved-changes guard §9, Permissions & Affordances,
Settings · Roles & Permissions, Users, the Assignment-Edit pattern + Amber/Red color
law, Maps live-preview / hover-pins, §K tokens, Appendix A). This file records the
screen-level and kit-file specifics. Live reference: `frontend/src/contexts/NavGuard.js`,
`screens/Settings.js`, `screens/Users.js`,
`screens/planned-assignments/{EditAssignmentModal,EditRow,RepDayMap,RouteMapCanvas}.js`.

## Global Navigation Guard (all edit surfaces)

- **`NavGuard.jsx`** — `NavGuardProvider` (wraps `<AppShell>`), `useNavGuard()`
  (`{ register, guard }`, safe no-op outside the provider), `useGuardedNavigate()`
  (drop-in for `useNavigate`). Covers sidebar + programmatic nav + in-page tabs + hard
  unload **under a declarative `<BrowserRouter>` — no data router.**
- A dirty screen: `useEffect(() => register(() => dirty), [register, dirty])` and wraps
  in-page leaves with `guard(() => proceed())`. The sidebar uses `useGuardedNavigate()`.
- Discard Modal: `confirm` / `tone="danger"` / `icon="warning"`, "Discard Unsaved
  Changes?" · **Keep Editing** (ghost) / **Discard & Leave** (warning). testids:
  `discard-changes-modal`, `discard-cancel`, `discard-confirm`.
- Adopters: Settings (Roles tab + tab-switch), Users detail editor, Planned Assignments
  edit mode, Store Layout editor. Each tracks `dirty` as a snapshot diff, re-baselines
  after save.

## Settings · Roles & Permissions (new screen)

- **Source of truth for permissions** — a role → capability matrix, edited only here.
  Gated by `users.roles` (else a locked empty state). Blue `InfoBanner tone="info"`:
  *"Select a role, then edit the permissions associated with that role. Changes will be
  applied to all users with that role."*
- **272px role rail** + **permission editor**. Role card = `RolePill` + "N users";
  selected = `--p-primary` border/tint + trailing `chevron_right`; a **7px `--p-warning`
  dot** marks any role with an unsaved draft. testids `role-select-<role>`,
  `role-dirty-dot-<role>`.
- **Editor** = header (role label + amber "Unsaved changes" pill) + a **Masonry** grid
  (`column-count: 2`; every card `break-inside: avoid`) of capability sections. Each card:
  icon chip + section name + mono `granted/total`, then `label + Toggle` rows. **A
  toggled-but-unsaved row tints `--g-gold-10`** (amber = pending edit). Header: `Reset`
  (ghost sm) · `Save Changes` (primary sm, Title Case). testids `role-section-<key>`,
  `role-cap-<capId>`, `roles-save-btn`, `roles-reset-btn`, `roles-dirty`, `roles-info`.
- **Per-role drafts:** a `drafts` map (`roleId → Set(caps)`); a role enters it only once
  touched; switching roles never wipes another role's edits; "any dirty" drives the
  NavGuard; re-baseline after save.
- **Save confirm:** `confirm` / `tone="warning"` / `icon="group"`, *"Update {Role}
  permissions?"* → **"Apply to N users"**. testids `roles-confirm-modal`,
  `roles-confirm-save`.
- **Backend:** `GET /api/roles`, `PUT /api/roles/{role}/permissions` (re-syncs all users
  of the role) — see `Greater Design System.md` Appendix A.

## Users → Access tab (now read-only)

- The Role selector + Permission toggles are **gone.** The Access tab renders the
  **same Masonry matrix** as Settings but with **static checkmarks** (not toggles) + a
  one-line pointer: *roles are managed in Settings → Roles & Permissions*. Identical
  packing so the two screens read as one system. No editable permission control for
  anyone — informational only.

## Edit Assignment modal (new pattern)

- Wide `Modal width={1040}`: a 5-column grid — **detail/controls · divider · month
  calendar · divider · live route preview** — with a bottom **"Changes to save"** ledger.
- **Amber = your edit / Red = real-world conflict** (the §E color law). Changed fields →
  `--p-warning` / `--g-gold-10`; buffer/date violations → `--p-danger` text on
  `--p-danger-soft`, plus a `3px var(--p-danger)` left-border callout. Never mix them.
- **Calendar legend** = literal mini cells (§F legend-as-mini-cell): 22px cells with the
  same radius / fill token / dot as the grid (delivery dot · red-soft buffer cell · faded
  unavailable cell).
- **Live route preview** (§G): the right pane recomputes as date/rep/sequence change —
  edited stop inserted at `seq`, day renumbered `1..n`, edited pin `activeId`; header
  shows `{date} · {rep}` + an amber **`(preview)`** while dirty. Non-destructive.
- **Changes ledger:** `difference` icon + "Changes to save" + mono count + neutral
  **"Reset all"** (not blue). One `ChangeRow` per field (`from → to`) + a per-row **Undo**
  icon button wrapped in a portal `Tooltip` (*"Undo date change"*). testids `ea-modal`,
  `ea-changes`, `ea-revert-<key>`, `ea-reset-all`, `ea-cancel`, `ea-apply`.
- **Map → list → modal hand-off** (§H): the full-screen route map's pins are
  **hover-to-reveal** (grace timer ~180ms); the popup's **"Edit Assignment"** is a blue
  `.g-map-popup-edit` link that deep-links to the list and opens that stop's edit modal —
  maps never embed a second editor.
