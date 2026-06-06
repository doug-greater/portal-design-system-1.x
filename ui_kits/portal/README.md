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
- Icons: Material Symbols (Rounded) font — `<Icon name="…">` renders a glyph by its ligature name (e.g. `search`, `expand_more`).
- Map: static SVG/CSS mock; no Leaflet integration.
