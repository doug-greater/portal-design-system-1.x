# Portal UI Kit — 1.3 ("Shell + Motion") notes

The 1.3 pass is mostly tokens + StatCard + App Shell motion (see `Greater Design System.md`).
Two screen-level changes are worth recording, plus the route rename. *(Phase 3 = the 1.2
delta; this is 1.3 on top of it.)*

## Store Layouts list — updated
- **Tabs** are now **Active · No Layout · Scheduled · Drafts** — a **"No Layout"** tab was added for accounts with no active layout.
- **Stat cards** dropped the tab-mirroring counts in favor of **informational KPIs**: **Layout Coverage** (% of accounts with an active layout), **Avg. Sections**, and **Avg. Placements** — all filter-responsive (reflect search + facets, tab-independent) and count-up animated. (See §9 Stat Cards → Informational vs drill-in / Filter-responsive.)

## In the Market — route rename
- Route is now **`/in-the-market`** (was `/products`); the nav label stays **"In the Market"** (under the Products group, beside POD Planner). Old `/products` **301s** to it with the query string preserved. **Back-end API paths are unchanged.**

## Shell + elevation (all screens)
- Page canvas is **`--p-shell`**; white is reserved for surfaces. Large surfaces (list tables, detail cards, ledgers) carry **`--shadow-surface`** + the 1px border. The wizard workspace, login, and loading screens also sit on shell.
