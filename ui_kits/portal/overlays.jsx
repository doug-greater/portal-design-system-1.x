// Portal UI Kit — Overlays
// The Overlay foundation (MIcon · Scrim · useDismiss · useOutside) + the surfaces built on it:
//   Modal (default + confirm), Drawer, and the Menu primitive with its two triggers (SplitButton, Kebab).
// Material Symbols. Load AFTER primitives.jsx (which declares the shared React hooks) and the
// Material Symbols stylesheet. This file defines the shared MIcon used by the other kit files.

(function injectOverlayCSS() {
  if (document.getElementById('g-overlays-css')) return;
  const s = document.createElement('style');
  s.id = 'g-overlays-css';
  s.textContent = `
    @keyframes g-modal-in { from { transform: scale(.98); } to { transform: scale(1); } }
    @keyframes g-drawer-in { from { transform: translateX(16px); } to { transform: translateX(0); } }
    @media (prefers-reduced-motion: reduce) { [style*="g-modal-in"],[style*="g-drawer-in"]{ animation: none !important; } }
    .g-split { display:inline-flex; height:28px; border-radius:6px; overflow:hidden; font:500 13px/1 Inter,sans-serif; vertical-align:middle; box-sizing:border-box; }
    .g-split .g-split-main { display:inline-flex; align-items:center; gap:6px; padding:0 11px; cursor:pointer; border:none; background:transparent; font:inherit; color:inherit; }
    .g-split .g-split-caret { display:inline-flex; align-items:center; justify-content:center; width:26px; cursor:pointer; border:none; background:transparent; color:inherit; }
    .g-split.primary { background:#007CFF; color:#fff; }
    .g-split.primary .g-split-caret { border-left:1px solid rgba(255,255,255,.28); }
    .g-split.primary .g-split-main:hover, .g-split.primary .g-split-caret:hover { background:rgba(255,255,255,.14); }
    .g-split.error { background:#E5484D; color:#fff; }
    .g-split.error .g-split-caret { border-left:1px solid rgba(255,255,255,.32); }
    .g-split.error .g-split-main:hover, .g-split.error .g-split-caret:hover { background:rgba(255,255,255,.14); }
    .g-menu { background:#fff; border:1px solid var(--p-border); border-radius:8px; box-shadow:var(--shadow-float); padding:4px; min-width:208px; }
    .g-menu-item { display:flex; align-items:center; gap:10px; height:34px; padding:0 10px; border-radius:6px; font:400 14px/1 Inter,sans-serif; color:var(--p-ink); cursor:pointer; white-space:nowrap; }
    .g-menu-item:hover { background:var(--p-surface-alt); }
    .g-menu-item.danger { color:var(--p-danger); }
    .g-menu-kbd { margin-left:auto; font:400 11px 'Geist Mono',monospace; color:var(--p-placeholder); }
    .g-menu-label { font:500 10px/1 Inter,sans-serif; letter-spacing:.07em; text-transform:uppercase; color:var(--p-muted); padding:9px 10px 5px; }
    .g-menu-div { height:1px; background:var(--p-border); margin:4px -4px; }
    .g-kebab { width:28px; height:28px; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; color:var(--p-muted); cursor:pointer; border:none; background:transparent; }
    .g-kebab:hover { background:rgba(0,0,0,.05); color:var(--p-text); }
  `;
  document.head.appendChild(s);
})();

/* ---------------- MIcon (Material Symbols) — shared icon helper for the kit ---------------- */
function MIcon({ name, size = 20, fill = 0, color, style }) {
  return (
    <span className="material-symbols-sharp" style={{
      fontFamily: "'Material Symbols Sharp'", fontSize: size, lineHeight: 1,
      fontVariationSettings: `'FILL' ${fill}`, color, display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center', userSelect: 'none', ...style,
    }}>{name}</span>
  );
}

/* ---------------- Overlay foundation ---------------- */
function useDismiss(open, onClose) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
}

// Ref + outside-click/Escape handler for popovers (Menu triggers).
function useOutside(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [onClose]);
  return ref;
}

function Scrim({ children, onClose, justify = 'center' }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(16,24,40,.45)',
      display: 'flex', alignItems: justify === 'center' ? 'center' : 'stretch',
      justifyContent: justify === 'right' ? 'flex-end' : 'center',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex' }}>{children}</div>
    </div>
  );
}

/* ---------------- Modal (default + confirm) ----------------
   Unsaved-changes "Discard" guard (1.5): use the danger `confirm` variant when
   a dirty edit surface intercepts a Back/exit. Pair with a window `beforeunload`
   guard while dirty; re-baseline the snapshot after a successful save.
     <Modal open={leaving} variant="confirm" tone="danger" title="Discard Unsaved Changes?"
       onClose={() => setLeaving(false)}
       footer={<>
         <Button variant="ghost" data-testid="x-keep-editing" onClick={() => setLeaving(false)}>Keep Editing</Button>
         <Button variant="danger" data-testid="x-confirm-leave" onClick={confirmLeave}>Discard &amp; Leave</Button>
       </>}>
       You have unsaved changes that haven't been saved yet. Leave this page anyway?
     </Modal>
   Caveat: declarative BrowserRouter has no useBlocker — covers the back link +
   hard unloads, not in-app sidebar nav (adopt a data router for full coverage). */
function Modal({ open, onClose, title, subtitle, children, footer, size = 'md', width, variant = 'default', tone = 'danger', icon = 'warning', warning }) {
  useDismiss(open, onClose);
  if (!open) return null;
  const confirm = variant === 'confirm';
  // size map, or a custom width for dense content (e.g. the 560px audit timeline)
  const w = width || ({ sm: 420, md: 520, lg: 640 }[size] || 520);
  const TONES = {
    danger:  { tint: 'rgba(229,72,77,.12)', color: 'var(--p-danger)' },
    warning: { tint: 'rgba(219,158,3,.12)', color: 'var(--p-warning)' },
    primary: { tint: 'var(--p-primary-tint)', color: 'var(--p-primary)' },
    success: { tint: 'rgba(0,188,87,.12)', color: 'var(--p-success)' },
    general: { tint: 'var(--p-genstock-tint)', color: 'var(--p-genstock)' },  // General Stock (purple concept accent)
  };
  const t = TONES[tone] || TONES.danger;
  return (
    <Scrim onClose={confirm ? undefined : onClose}>
      <div style={{ width: w, background: '#fff', borderRadius: 12, border: '1px solid var(--p-border)', boxShadow: confirm ? '0 8px 28px rgba(0,0,0,.12), 0 2px 6px rgba(0,0,0,.06)' : '0 8px 28px rgba(0,0,0,.18), 0 2px 6px rgba(0,0,0,.08)', overflow: 'hidden', animation: 'g-modal-in .18s ease-out' }}>
        {confirm ? (
          <div style={{ padding: '22px 24px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: t.tint, color: t.color }}><MIcon name={icon} size={20} /></span>
              <h2 style={{ margin: 0, font: '700 19px/1.2 Inter, sans-serif', color: 'var(--p-ink)' }}>{title}</h2>
            </div>
            <div style={{ font: '400 14px/1.5 Inter, sans-serif', color: 'var(--p-text-2)' }}>{children}</div>
            {warning && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 14, padding: '10px 12px', background: '#FFF7ED', borderRadius: 8 }}>
                <MIcon name="warning" size={18} color="#C2410C" style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ font: '400 13px/1.45 Inter, sans-serif', color: '#C2410C' }}>{warning}</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '18px 20px 14px 24px' }}>
              <div style={{ minWidth: 0 }}>
                <h2 style={{ margin: 0, font: '600 18px/1.3 Inter, sans-serif', letterSpacing: '-.01em', color: 'var(--p-ink)' }}>{title}</h2>
                {subtitle && <div style={{ font: '400 13px/1.3 Inter, sans-serif', color: 'var(--p-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{subtitle}</div>}
              </div>
              <span onClick={onClose} style={{ width: 32, height: 32, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p-muted)', cursor: 'pointer', flexShrink: 0 }}><MIcon name="close" size={20} /></span>
            </div>
            <div style={{ padding: '4px 24px 8px', display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
          </>
        )}
        {footer && <div style={{ padding: confirm ? '14px 24px' : '16px 24px', borderTop: '1px solid #F0F1F3', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>{footer}</div>}
      </div>
    </Scrim>
  );
}

/* ---------------- Drawer (side sheet) ---------------- */
function Drawer({ open, onClose, title, overline, children, footer, size = 'md' }) {
  useDismiss(open, onClose);
  if (!open) return null;
  const width = { sm: 400, md: 460, lg: 560 }[size] || 460;
  return (
    <Scrim onClose={onClose} justify="right">
      <div style={{ width, height: '100vh', background: '#fff', borderLeft: '1px solid var(--p-border)', boxShadow: 'var(--shadow-float)', display: 'flex', flexDirection: 'column', animation: 'g-drawer-in .18s ease-out' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 20px 16px 24px', borderBottom: '1px solid var(--p-border)' }}>
          <div>
            {overline && <div style={{ font: '500 11px/1 Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--p-muted)', marginBottom: 6 }}>{overline}</div>}
            <h3 style={{ margin: 0, font: '600 20px/1.25 Inter, sans-serif', letterSpacing: '-.01em', color: 'var(--p-ink)' }}>{title}</h3>
          </div>
          <span onClick={onClose} style={{ width: 32, height: 32, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p-muted)', cursor: 'pointer' }}><MIcon name="close" size={20} /></span>
        </div>
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>
        {footer && <div style={{ padding: '14px 24px', borderTop: '1px solid var(--p-border)', display: 'flex', gap: 10 }}>{footer}</div>}
      </div>
    </Scrim>
  );
}

/* ---------------- Menu (the popover primitive) ----------------
   items: array of
     { label, icon?, danger?, kbd?, onClick? }   — an action row
     { divider: true }                            — a 1px divider
     { header: 'LABEL' }                          — an uppercase group label
*/
function Menu({ items = [], onSelect, style }) {
  return (
    <div className="g-menu" role="menu" style={style}>
      {items.map((it, i) => {
        if (it.divider) return <div key={i} className="g-menu-div" />;
        if (it.header) return <div key={i} className="g-menu-label">{it.header}</div>;
        return (
          <div key={i} role="menuitem" className={'g-menu-item' + (it.danger ? ' danger' : '')}
            onClick={() => { it.onClick && it.onClick(); onSelect && onSelect(it); }}>
            {it.icon && <MIcon name={it.icon} size={18} color={it.danger ? 'var(--p-danger)' : 'var(--p-muted)'} />}
            <span>{it.label}</span>
            {it.kbd && <span className="g-menu-kbd">{it.kbd}</span>}
          </div>
        );
      })}
    </div>
  );
}

/* Title Case for action labels — keep short articles/conjunctions/prepositions lowercase (see §4). */
function toTitleCase(s) {
  if (typeof s !== 'string') return s;
  const small = new Set(['a', 'an', 'the', 'and', 'or', 'to', 'of', 'in', 'for', 'on', 'at', 'by', 'with', 'as']);
  return s.split(' ').map((w, i, arr) =>
    (i !== 0 && i !== arr.length - 1 && small.has(w.toLowerCase()))
      ? w.toLowerCase()
      : w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ');
}

/* ---------------- SplitButton (trigger) ----------------
   A visible action + a caret that opens the Menu. intent: 'primary' | 'error'.
   The main label is always rendered in Title Case (DS §4); it may serve as a
   row's last-column trigger OR the primary action inside an expanded panel. */
function SplitButton({ children, onClick, items = [], intent = 'primary', icon, menuAlign = 'left' }) {
  const [open, setOpen] = useState(false);
  const ref = useOutside(() => setOpen(false));
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <span className={'g-split ' + intent}>
        <button className="g-split-main" onClick={onClick}>{icon && <MIcon name={icon} size={15} />}{toTitleCase(children)}</button>
        <button className="g-split-caret" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}><MIcon name="expand_more" size={17} /></button>
      </span>
      {open && <div style={{ position: 'absolute', top: 34, [menuAlign === 'right' ? 'right' : 'left']: 0, zIndex: 60 }}><Menu items={items} onSelect={() => setOpen(false)} /></div>}
    </span>
  );
}

/* ---------------- Kebab (trigger) ----------------
   An overflow icon button that opens the Menu. */
function Kebab({ items = [], align = 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useOutside(() => setOpen(false));
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button className="g-kebab" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}><MIcon name="more_horiz" size={20} /></button>
      {open && <div style={{ position: 'absolute', top: 32, [align]: 0, zIndex: 60 }}><Menu items={items} onSelect={() => setOpen(false)} /></div>}
    </span>
  );
}

/* ---------------- MenuButton (off-table disclosure) ----------------
   A full-height Button + trailing chevron that opens the same Menu popover.
   Use in headers / toolbars where a 28px SplitButton would look stunted. */
function MenuButton({ label, items = [], variant = 'primary', icon, disabled, loading, menuAlign = 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useOutside(() => setOpen(false));
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <Button variant={variant} icon={icon} iconRight="expand_more" disabled={disabled} loading={loading}
        onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>{label}</Button>
      {open && (
        <div style={{ position: 'absolute', top: 42, [menuAlign === 'right' ? 'right' : 'left']: 0, zIndex: 60 }}>
          <Menu items={items} onSelect={() => setOpen(false)} />
        </div>
      )}
    </span>
  );
}

/* ---------------- Command Palette (⌘K · 1.7) ----------------
   Global launcher. Opens on ⌘K / Ctrl-K (or a sidebar "Search" button). Grouped,
   deep-linked results + page-jumps. Backdrop z-index 12000 — top of the ladder
   (Tooltip 4000 · Wizard 9000 · Modal 10000 · ⌘K 12000). Runs on the searchQuery
   grammar + <Highlight> (primitives); rows carry the entity icon (§8 canon) + related
   POD Plans / Store Promos deep-link chips; the in-field ? hint passes z=12001 so its
   tooltip floats above the backdrop. The active row (↑↓ / hover) is the ink cursor.
   `groups`: [{ label, items: [{ id, icon, title, subtitle, related:[{icon,label}], onSelect }] }]. */
const CMDK_Z = 12000;
function CommandPalette({ open, onClose, query = '', onQuery, groups = [] }) {
  const flat = React.useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const [active, setActive] = React.useState(0);
  React.useEffect(() => { setActive(0); }, [query, open]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, flat.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
      else if (e.key === 'Enter') { flat[active]?.onSelect?.(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, flat, active, onClose]);
  if (!open) return null;
  let idx = -1;
  return ReactDOM.createPortal(
    <div data-testid="command-palette" onMouseDown={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: CMDK_Z, background: 'var(--p-backdrop, rgba(16,24,40,.45))', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '56px 24px' }}>
      <div onMouseDown={(e) => e.stopPropagation()}
        style={{ width: 560, maxWidth: '100%', background: 'var(--p-surface)', border: '1px solid var(--p-border)', borderRadius: 12, boxShadow: 'var(--shadow-float)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 52, padding: '0 14px', borderBottom: '1px solid var(--p-border)', gap: 10 }}>
          <Icon name="search" size={20} color="var(--p-placeholder)" />
          <input autoFocus value={query} onChange={(e) => onQuery?.(e.target.value)} placeholder="Search…" data-testid="command-palette-input"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: '400 16px Inter, sans-serif', color: 'var(--p-ink)' }} />
          {query
            ? <button type="button" data-testid="command-palette-clear" onClick={() => onQuery?.('')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--p-muted)', display: 'flex' }}><Icon name="close" size={18} /></button>
            : <Tooltip text={SEARCH_HINT} side="bottom" maxWidth={260} z={CMDK_Z + 1}><span style={{ color: 'var(--p-placeholder)', cursor: 'help', display: 'flex' }}><Icon name="help" size={18} /></span></Tooltip>}
        </div>
        <div style={{ maxHeight: 380, overflow: 'auto', padding: '6px 0' }}>
          {groups.map((g) => (
            <div key={g.label}>
              <div style={{ font: '500 10px/1 Inter, sans-serif', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--p-muted)', padding: '12px 16px 6px' }}>{g.label}</div>
              {g.items.map((it) => {
                idx += 1; const on = idx === active;
                return (
                  <div key={it.id} onMouseEnter={() => setActive(flat.indexOf(it))} onClick={it.onSelect}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px', cursor: 'pointer', background: on ? 'var(--p-action)' : 'transparent', color: on ? 'var(--p-action-fg)' : 'var(--p-ink)' }}>
                    <Icon name={it.icon} size={20} color={on ? 'var(--p-action-fg)' : 'var(--p-text-2)'} />
                    <span style={{ font: '500 14px Inter, sans-serif' }}><Highlight text={it.title} query={query} /></span>
                    {it.subtitle && <span style={{ font: '400 12px Inter, sans-serif', color: on ? 'var(--p-action-fg)' : 'var(--p-muted)', marginLeft: 6 }}><Highlight text={it.subtitle} query={query} /></span>}
                    {it.related?.length > 0 && (
                      <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 6 }}>
                        {it.related.map((r) => <Chip key={r.label} tone="info" icon={r.icon} style={on ? { background: 'rgba(255,255,255,.18)', color: 'var(--p-action-fg)' } : undefined}>{r.label}</Chip>)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

Object.assign(window, { MIcon, useDismiss, useOutside, Scrim, Modal, Drawer, Menu, SplitButton, Kebab, MenuButton });
