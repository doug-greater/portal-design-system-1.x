// Portal UI Kit — Inventory Conditions scale (source-of-truth mirror)
// ---------------------------------------------------------------------------
// Greater's fixed 6-level SKU-health scale (depletion simulation verdict).
// "Palette A" (1.5): a colour-blind-safe diverging ramp Orange → Gold → Teal →
// Blue → Purple, WCAG ≥3:1 against both CARTO basemaps. Supersedes the 1.4 scale.
//
// Define the scale ONCE and import it everywhere (the In-the-Market Condition
// column AND the Coverage-Map hexbin color). `level` is the ordinal severity
// (0 = worst stockout → 5 = worst overstock; 3 = healthy middle); averaging a
// bin's levels and rounding yields its representative condition.
//
// IMPORTANT: colors return `var(--cond-…)` token strings, NOT hex — so they stay
// theme-aware (light :root vs html[data-theme="dark"]). Never resolve to hex in JS.
// ---------------------------------------------------------------------------
export const CONDITIONS = [
  { level: 0, key: "out_of_stock",     label: "Out of Stock",     short: "Out of Stock", color: "var(--cond-out_of_stock)" },
  { level: 1, key: "high_risk",        label: "High Risk of OOS", short: "High Risk",    color: "var(--cond-high_risk)" },
  { level: 2, key: "at_risk",          label: "At Risk of OOS",   short: "At Risk",      color: "var(--cond-at_risk)" },
  { level: 3, key: "optimal",          label: "Optimal",          short: "Optimal",      color: "var(--cond-optimal)" },
  { level: 4, key: "slight_overstock", label: "Slight Overstock", short: "Slight Over",  color: "var(--cond-slight_overstock)" },
  { level: 5, key: "heavy_overstock",  label: "Heavy Overstock",  short: "Heavy Over",   color: "var(--cond-heavy_overstock)" },
];

export const COND_BY_KEY = Object.fromEntries(CONDITIONS.map((c) => [c.key, c]));
export const COND_BY_LEVEL = CONDITIONS.slice();   // index === level

// Token strings for the two non-scale states.
export const CONDITION_EMPTY = "var(--cond-empty)";       // no data
export const CONDITION_PENDING = "var(--cond-pending)";   // pending-change pin

// Color for a key; falls back to the no-data token for unknown keys.
export function conditionColor(key) {
  return (COND_BY_KEY[key] || { color: CONDITION_EMPTY }).color;
}

// Average a set of levels → the representative condition (rounds to nearest index).
export function averageCondition(levels) {
  if (!levels || !levels.length) return null;
  const avg = levels.reduce((s, n) => s + n, 0) / levels.length;
  return COND_BY_LEVEL[Math.max(0, Math.min(5, Math.round(avg)))];
}
