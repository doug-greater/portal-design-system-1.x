/* NavGuard — global unsaved-changes navigation guard (Portal 1.8).
   Covers EVERY in-app navigation (sidebar + programmatic + in-page tabs + hard
   reload / tab close) under a declarative <BrowserRouter> — no data router needed.

   Why it works without `createBrowserRouter`/`useBlocker`: instead of blocking
   *router transitions*, we gate the navigation *call*. The sidebar navigates
   programmatically (not via <a>/<Link>), so wrapping that one call site is enough.
   A dirty screen registers a predicate; the guard consults it before proceeding.

   Three adopter obligations:
   1. Wrap the authenticated shell: <NavGuardProvider> around <AppShell> (inside the
      router, outside the routed screens).
   2. Sidebar uses the guarded navigate: `const navigate = useGuardedNavigate()`.
   3. A dirty screen registers + guards its own in-page leaves:
        const { register, guard } = useNavGuard();
        useEffect(() => register(() => dirty), [register, dirty]);   // sidebar/unload
        const requestTab = (t) => (tabDirty ? guard(() => setTab(t)) : setTab(t)); */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./overlays";
import { Button } from "./primitives";

const NavGuardContext = createContext(null);

export function NavGuardProvider({ children }) {
  const blockRef = useRef(null);                 // () => boolean — true means "block"
  const [pending, setPending] = useState(null);  // proceed fn (wrapped) or null

  // A screen registers its dirty-predicate; returns an unregister fn for cleanup.
  const register = useCallback((shouldBlock) => {
    blockRef.current = shouldBlock;
    return () => { if (blockRef.current === shouldBlock) blockRef.current = null; };
  }, []);

  // Run `proceed` now, or stash it behind the discard prompt if currently blocked.
  const guard = useCallback((proceed) => {
    if (blockRef.current && blockRef.current()) setPending(() => proceed);
    else proceed();
  }, []);

  // Hard reload / tab close. Reads blockRef live, so it never needs re-binding.
  useEffect(() => {
    const h = (e) => { if (blockRef.current && blockRef.current()) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, []);

  const keep = () => setPending(null);
  const leave = () => { const p = pending; setPending(null); if (p) p(); };

  const value = useMemo(() => ({ register, guard }), [register, guard]);
  return (
    <NavGuardContext.Provider value={value}>
      {children}
      <Modal open={!!pending} onClose={keep} variant="confirm" tone="danger" icon="warning"
        title="Discard Unsaved Changes?" testid="discard-changes-modal"
        footer={<>
          <Button variant="ghost" onClick={keep} data-testid="discard-cancel">Keep Editing</Button>
          <Button variant="warning" onClick={leave} data-testid="discard-confirm">Discard &amp; Leave</Button>
        </>}>
        You have unsaved changes that haven't been saved yet. Leave this page anyway?
      </Modal>
    </NavGuardContext.Provider>
  );
}

// Safe no-op fallback if a consumer is rendered outside the provider.
export function useNavGuard() {
  return useContext(NavGuardContext) || { register: () => () => {}, guard: (p) => p() };
}

// Drop-in replacement for useNavigate that routes every nav through the guard.
export function useGuardedNavigate() {
  const navigate = useNavigate();
  const ctx = useContext(NavGuardContext);
  return useCallback((to, opts) => {
    if (ctx?.guard) ctx.guard(() => navigate(to, opts));
    else navigate(to, opts);
  }, [navigate, ctx]);
}
