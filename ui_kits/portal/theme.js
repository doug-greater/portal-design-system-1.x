// Portal UI Kit — Theme store (1.5)
// ---------------------------------------------------------------------------
// The production theming module (ES module, ~80 lines). Three preferences,
// two resolved themes:
//   pref     : "system" | "light" | "dark"  (persisted in localStorage["gr-theme"])
//   resolved : "light" | "dark"             ("system" → matchMedia, follows OS live)
// Applied by setting document.documentElement.setAttribute("data-theme", resolved).
// Light is the bare :root; all dark tokens live under html[data-theme="dark"].
//
// CRITICAL: theme state MUST live in ONE module-level store (not per-component
// useState) and be read via useSyncExternalStore. JS-driven views (the Leaflet
// Coverage Map) rebuild tiles in an effect keyed on `resolved`; if each
// useTheme() held its own copy, the map would not re-render on toggle.
//
// (The rest of this kit is Babel-in-browser UMD; this file is shown as the
// real ESM module the app ships. A no-flash inline bootstrap in index.html
// must read localStorage["gr-theme"] and set data-theme BEFORE React mounts.)
// ---------------------------------------------------------------------------
import { useCallback, useSyncExternalStore } from "react";
const STORAGE_KEY = "gr-theme";
const mql = () => window.matchMedia("(prefers-color-scheme: dark)");

export function getPref() {
  try { const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" || v === "system" ? v : "system";
  } catch { return "system"; }
}
export function resolveTheme(pref) {
  if (pref === "dark") return "dark";
  if (pref === "light") return "light";
  return mql().matches ? "dark" : "light";
}
export function applyPref(pref) {
  const resolved = resolveTheme(pref);
  document.documentElement.setAttribute("data-theme", resolved);
  return resolved;
}
let _pref = getPref(), _resolved = resolveTheme(_pref);
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
function setPrefGlobal(p) {
  if (p === _pref) return;
  _pref = p; _resolved = applyPref(p);
  try { localStorage.setItem(STORAGE_KEY, p); } catch {}
  emit();
}
let _systemBound = false;
function ensureSystemListener() {
  if (_systemBound) return; _systemBound = true;
  mql().addEventListener("change", () => {
    if (_pref !== "system") return;
    const next = resolveTheme("system");
    if (next !== _resolved) { _resolved = applyPref("system"); emit(); }
  });
}
function subscribe(cb) { ensureSystemListener(); listeners.add(cb); return () => listeners.delete(cb); }
export function useTheme() {
  const pref = useSyncExternalStore(subscribe, () => _pref);
  const resolved = useSyncExternalStore(subscribe, () => _resolved);
  const setPref = useCallback((p) => setPrefGlobal(p), []);
  const cycle = useCallback(
    () => setPrefGlobal(_pref === "light" ? "dark" : _pref === "dark" ? "system" : "light"), []);
  return { pref, resolved, setPref, cycle };
}
