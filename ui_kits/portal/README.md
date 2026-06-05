# Portal UI Kit

Interactive hi-fi build of the Greater Portal — the maintained reference implementation.

## Files

- `index.html` — entry point. Login → app shell with switchable screens.
- `primitives.jsx` — Icon, Button, Input, Toggle, Checkbox, Pill, FilterChip, SegmentedTabs, StatCard, InfoBanner, Logo.
- `FilterMenu.jsx` — consolidated single-button table filter (two-pane popover, per-attribute type-to-search for large sets, removable applied-filter tokens). Replaces per-column filter chips.
- `LoginScreen.jsx` — email sign-in with neo-brutalist Next button.
- `AppShell.jsx` — sidebar nav + top breadcrumb/search bar.
- `ProductsScreen.jsx` — "In the Market" — stat row, filters, segmented tabs, sortable table with row selection → floating action bar.
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
