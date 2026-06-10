# Portal UI Kit — 1.5 ("Dark Mode + governed UI") notes

The 1.5 pass adds **Global Dark Mode** (the headline) plus a governed-UI / hardening
sweep. Most of it lives in `Greater Design System.md` (Theming §3, dark token block,
Palette A Conditions, disabled/locked states, Permissions & Affordances, Unsaved-Changes
guard, Login, the §H–§R clarifications, Appendix A). This file records the screen-level
and kit-file specifics.

## Theming (all screens)

- **`theme.js`** — the theme store: `pref` (`system|light|dark`, persisted in
  `localStorage["gr-theme"]`) → `resolved` (`light|dark`), applied as `data-theme` on
  `<html>`. Read via **`useSyncExternalStore`** (one module-level store — a per-component
  copy would not re-fire the Coverage-Map tile-rebuild effect). A **no-flash inline
  bootstrap** in `index.html` sets `data-theme` before React mounts.
- **App Shell** carries the **theme toggle** in the utility nav (cycles
  light→dark→system; `data-testid="theme-toggle"`) and swaps the wordmark/crow to **KO**
  marks in dark. *(In this kit the toggle is inlined so the demo flips live; production
  uses `theme.js`.)*
- **Login** carries the same toggle **flat, bottom-left**.

## Login — two-step (rewritten)

- **Step 1** email lookup → **Step 2** greeting (*"Good evening, {First}."*) + masked
  password + **Edit** link back. Directional transitions (`gr-step-fwd`/`gr-step-back`),
  staggered `gr-rise` entrance. Auth inputs are **56px / 4px radius** (§H).
- **Dev quick sign-in (dev-only):** one dashed `bolt` button per dev account
  ("Sign in as {Role} ({email})"), prefilling email+password and **advancing the real
  two-step flow** (never one-shot bypass). Driven by `GET /auth/config →
  { devLoginEnabled, devAccounts }`; `data-testid="dev-login-<slug>"`.

## Governed Users / Accounts (hide vs disable)

- **Hide** affordances with no capability: the **Users** nav (no `users.view`), the
  **Accounts** group (no `acct.view`), and page-level **New / Batch / Save /
  Deactivate** for view-only roles.
- **Disable + lock** in-dimension controls the user can see but not change: e.g. a
  Department Manager edits a profile but the **Role** `Select` (lock glyph) and
  **Permission** `Checkbox`es are disabled — pair with the amber **capability-lock
  banner** explaining why ("Ask an administrator…").
- **"View only"** label on a card readable but not editable (e.g. Account *App
  Requirements* without `acct.edit`).
- **Self-guard:** never edit your **own** role / permissions / warehouse access.
- Backend enforces (403 / drops locked fields); the UI gating is UX only.
- Capability vocabulary + role baseline: `Greater Design System.md` → **Appendix A**.

## Edit surfaces — Unsaved-Changes guard

- Dirty = JSON snapshot of editable fields ≠ last-saved snapshot. Intercept the in-page
  Back/exit → danger **confirm** Modal ("Discard Unsaved Changes?" · Keep Editing /
  Discard & Leave). Add a `beforeunload` guard while dirty; re-baseline after save.
- **Caveat:** declarative `<BrowserRouter>` has no `useBlocker` — covers the back link +
  hard unloads, not in-app sidebar nav. Adopt a **data router** for full coverage.

## Store Layouts — Replace-in-place

- A placement gains a **Replace** action (`compare_arrows`) that swaps the product while
  **preserving position + display settings** (sequence, capacity, capacity type, display
  flags) — distinct from remove-then-add. Change records resolve to
  `"{Account} · {Product}"` scoped rows (§O).

## Kit files added/changed in 1.5

- **`theme.js`** (new) — theme store (reference ESM module).
- **`conditions.js`** (new) — Palette A source-of-truth mirror (`var(--cond-…)`).
- **`primitives.jsx`** — new **`Select`** primitive; `disabled` on `Checkbox` / `Input`;
  `Icon` GRAD wired to `--ms-grad`.
- **`AppShell.jsx`** — theme toggle + KO logo swap.
- **`LoginScreen.jsx`** — two-step + dev sign-in + bottom-left toggle.
- **`colors_and_type.css`** — full `html[data-theme="dark"]` block + light flip-pairs;
  Palette A `--cond-*` (renamed to full-key) in both modes.
- **`maps.css`** — dark basemap/overlay overrides.
