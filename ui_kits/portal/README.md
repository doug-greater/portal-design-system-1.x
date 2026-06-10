# Portal UI Kit

Interactive hi-fi build of the Greater Portal — the maintained reference implementation.

## Files

**Foundations & primitives**
- `index.html` — entry point. Login → app shell with switchable screens.
- `primitives.jsx` — Icon, Button (primary · secondary · warning · **danger** · neutral · ghost · neo, with `loading`), Input, Toggle, Checkbox, Pill, FilterChip, SegmentedTabs, StatCard (with drill-in `active` state), **StatsToggle / `useStatsVisible`**, InfoBanner, Logo.
- `overlays.jsx` — Overlay foundation + Modal (default/confirm, now with `subtitle` + custom `width`), Drawer (with `subtitle`), Menu, SplitButton (Title-Cases its label), Kebab.
- `feedback.jsx` — Toast (+ `window.toast`), Spinner, Skeleton, EmptyState, **EchoPulse**.
- `tables.jsx` — Pagination + RowsSelect.
- `dates.jsx` — Calendar / DateField (now with `min`/`max` bounds, context-aware preset rails via `direction`, and `dropUp`).
- `FilterMenu.jsx` — consolidated single-button table filter (two-pane popover, per-attribute type-to-search for large sets, removable applied-filter tokens). Replaces per-column filter chips.

**New in 1.1**
- `wizard.jsx` — `WizardShell` + `StepHeader`, `SelectionTable`, `SelectedPopover`, `Check`, `CopyToAllChip`, `ActionSegment` — the full-screen multi-step creation flow.
- `audit.jsx` — `AuditLogModal` + `ChangeRow` (the shared diff primitive) + `DEMO_AUDIT`.
- `SCREENS-1.1.md` — notes on the four 1.1 flows (POD Planner, Store Promotions, Audit Log, Settings) and how they compose these parts.

**New in Phase 3 (Store Layouts)**
- `layout-board.jsx` — structural **Arrangement Board** reference (section cards, placement rows, inline capacity control, Unassigned tray, General Stock empty-state). Production drag uses `@dnd-kit`.
- `SCREENS-phase3.md` — notes on the Store Layouts list + in-shell editor flows.
- `primitives.jsx` also gains **Chip**, **ChipToggle**, **Tooltip**; `overlays.jsx` gains **MenuButton**.

**Screens**
- `LoginScreen.jsx` — email sign-in with neo-brutalist Next button.
- `AppShell.jsx` — collapsible sidebar nav (+ flyout) + bottom utility nav (Help Center · Audit Log · Settings · Account · Sign Out).
- `ProductsScreen.jsx` — "In the Market" — stat row, filters, segmented tabs, sortable table.
- `UsersScreen.jsx` — users list + detail (Profile / Role & Permissions / Team).
- `RoutesScreen.jsx` — sidebar list + Leaflet-style map with numbered stops.
- `ScenarioScreen.jsx` — agent-configuration form with toggles and numeric inputs.

## Origins

The layouts started from the Figma reference (`Page-1`), primarily:

- `Products-Menu-Portal-Features` (1:619) — the hero layout
- `Alert-Low-No-stock` (1:502) — info banner style
- `TableView` (1:21217) — map popover pattern
- `login-email*` — sign-in flow
- `Property1=ON/OFF` (1:400 / 1:394) — toggle visuals
- `PrimaryButton*`, `SecondaryButton*` — button system

## Caveats

- The portal chrome (sidebar/topbar) is an original design built from the documented tokens (`AppShell`).
- Icons: Material Symbols (Sharp) font — `<Icon name="…">` renders a glyph by its ligature name (e.g. `search`, `expand_more`).
- Map: `brand-maps.html` runs a live Leaflet route sample; the Coverage Map hexbin overlay is shown as a static specimen (D3 isn't bundled into the kit).

## Implementation notes (1.4 learnings)

1. **Leaflet overlay pointer-events.** Leaflet's overlay pane is `pointer-events: none`; interactive SVG overlay elements (`.g-hex-outline`, `.g-cov-pin`) must force `pointer-events: all !important` or hover/click silently never fires. Keep non-interactive layers (fills, the lattice, pin labels) at `none`. (§Maps)
2. **Map overlay z-index ladder.** Floating overlay cards `z-index: 500`; the hex tooltip `600`; the portal `Tooltip` `4000` (so DS tooltips still beat map UI). Keep these distinct.
3. **Re-render the analytic overlay on state + map events.** Recompute/redraw the hexbin (or pins) on mode toggle, filter/spotlight change, and Leaflet `move`/`zoom`/`resize` — projected pixel positions are only valid for the current view.
4. **Tooltip is portal-rendered and re-measures on open.** It positions from `getBoundingClientRect` at hover time; for anchors that move while shown, re-open to re-measure.
5. **Mask masked inputs in `onChange`.** `FloatingField`/`Input` forwards no `maxLength`/`inputMode`; enforce numeric/length in the change handler.
6. **Secrets never come back from the API.** Return a `*Set` boolean; "leave blank to keep current." Strip the hash from every response shape (list, detail, create, update).
7. **Generalize count helpers before adding a non-Set facet value.** Adding the `daterange` `{from,to}` value to a Set-keyed value map stays safe only because every count read goes through one `attrCount` helper — route counts through one helper before introducing a differently-shaped value.
