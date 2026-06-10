# Portal UI Kit — 1.4 ("Coverage Map + unified filters") notes

The 1.4 pass is the **Accounts → Coverage Map → unified-filters** round on top of 1.3.
Most of it is captured in `Greater Design System.md` (Sharp icons, portal Tooltip,
Chip `atrisk`, Account Type primitives, Inventory Conditions palette, the Maps pattern +
multivariate encoding rule, the Filter Menu `daterange` type, and the form patterns).
This file records the **screen-level** specifics.

## Coverage Map — new screen family

A full-bleed Leaflet basemap (CARTO "Light All" @2x) with a **D3 `d3-hexbin` SVG overlay**.
Ships as `maps.css`; see `Greater Design System.md` → §Maps → "Coverage Map".

- **Two scopes / routes:**
  - **Single product** — `/in-the-market/:productId/map`
  - **All products / aggregate** — `/in-the-market/coverage-map`
- **The analytic layer encodes two dimensions:** color = average **Condition** of the
  bin's stores (the §Inventory Conditions palette, via averaged `level`); fill **area** =
  a magnitude (avg **Demand velocity**, cs/wk), scaled `prop = max(0.34, sqrt(avg/max))`
  inside a fixed `HEX_R = 20` outline hex. Area — **not opacity** — encodes magnitude.
- **A full hex lattice** is drawn across the viewport so empty cells read as "no coverage
  here," not "missing map."
- **Modes (`ModeBtn`, segmented):** **Hexbin ⇄ Stores**. Stores mode draws one `.g-cov-pin`
  per store (color = that store's condition; `.is-pending` → dashed stroke). The overlay
  re-renders on mode toggle, on any filter/spotlight change, and on Leaflet
  `move`/`zoom`/`resize`.
- **Overlay cards (floating `.g-map-card`):** **Title** TL (`.g-map-title`, max-width 340 —
  states scope and that *"Filters set on In the Market will apply here."*), **Controls** TR
  (`.g-map-controls` — the `ModeBtn`), **Legend** BL (`.g-map-legend` — Condition
  `.g-legend-swatch` rows + a note "Fill size = avg demand (cs/wk)").
- **Legend spotlight:** clicking a condition row isolates that condition (dims the rest);
  the row label toggles **"Only" → "Showing"**, and a **"Show all"** link clears it
  (`condFilter` state). The map analogue of a facet filter.
- **Summary stats above the map (`SummaryStat`):** values **Geist Mono `600 22px`**,
  unit-suffixed (§Stats/Voice).
  - **Aggregate:** `Accounts` · `Products` · `Average Demand` (`12.5 cs/wk`) · `Average On Hand` (`45 days`).
  - **Single product:** `Accounts` · `In Market` (`471 cs`) · `Average Demand` · `Average On Hand`.
- **Scope chips:** the active In-the-Market facets render as **removable chips** above the
  map, carried via the deep-link query (1.3 URL-facet deep-linking), so the map's scope is
  explicit and adjustable.

> **CRITICAL — Leaflet overlay pointer-events.** Leaflet's overlay pane is
> `pointer-events: none`; interactive SVG (`.g-hex-outline`, `.g-cov-pin`) must force
> `pointer-events: all !important` or hover/click silently never fires. Keep
> non-interactive layers (`.g-hex-fill`, `.g-hex-grid`, pin labels) at `none`.
> z-index ladder: overlay cards `500` · hex tooltip `600` · DS `Tooltip` `4000`.

## In the Market — table additions

- **Condition column** — the per-store SKU-health verdict, rendered from the shared
  Inventory Conditions scale (table cell uses the palette / the `atrisk` chip tint for At
  Risk; the map uses the saturated `--cond-*` swatch). See §Inventory Conditions.
- **Coverage row-expand** — a product row expands to a per-store coverage panel (condition +
  the educational "What are Conditions?" Tooltip carrying the canonical education copy).
- **Count-delta `~N draining` chip** — extends 1.3's `CountDeltaCell`: alongside the green
  `+N` (pending adds) and red `−N` (pending discontinues), a soft-orange **`~N`** chip
  (Chip `atrisk` tone) marks SKUs *draining* toward out-of-stock. Like the others it is
  **never netted**, is click-through (stops propagation), and deep-links into context.
- **Warehouse facet** — a **related-record facet**: filters products by the `market`
  (warehouse) of the **accounts** that carry them (set-intersection on `accountIds`). The
  same guard applies to the stats and the coverage map so every surface reflects the
  identical filtered population. (See §Filtering → related-record facet.)
