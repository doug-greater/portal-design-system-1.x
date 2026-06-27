// Portal UI Kit — Home dashboard + Saved Views + Stat-Card Customizer + Crow Fact (1.9)
// Reference implementations. Depend on primitives (Button, Icon, Modal, AppLink, Toggle,
// Checkbox, StatCard) + @dnd-kit (DS 1.2). Role-gating keys off REAL role ids
// (exec / deptmgr / itadmin / supervisor / rep) — never invented names (§G1).

const { useState, useMemo } = React;

/* ---------------- SaveViewButton (1.9) ----------------
   Header button that bookmarks the current path + EXACT url query string to the
   per-user `favorites` store, surfaced as ViewCards on Home. Captures
   window.location.search and shows the filters as chips via humanizeSearch. */
function SaveViewButton({ section, icon = 'bookmark_add', defaultName = '', onSave }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(defaultName);
  const [note, setNote] = useState('');
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const chips = humanizeSearch(search);   // [{label, value}] from lib/urlFilters
  const save = () => { onSave?.({ name, note, section, icon, path: window.location.pathname, search }); setOpen(false); };
  return (
    <>
      <Button variant="neutral" icon="bookmark_add" data-testid="save-view-btn" onClick={() => setOpen(true)}>Save View</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Save this view" size="sm"
        footer={<>
          <Button variant="neutral" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={save} disabled={!name.trim()}>Save View</Button>
        </>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="View name" autoFocus />
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note (optional)" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {chips.length
              ? chips.map((c, i) => <Chip key={i} tone="info" testid="save-view-chip">{c.label}: {c.value}</Chip>)
              : <span style={{ font: '400 13px Inter', color: 'var(--p-muted)' }}>No filters applied — saves the unfiltered view.</span>}
          </div>
          <p style={{ margin: 0, font: '400 13px/1.5 Inter', color: 'var(--p-muted)' }}>Find this anytime under <b style={{ color: 'var(--p-text-2)' }}>Home</b> in the sidebar.</p>
        </div>
      </Modal>
    </>
  );
}

/* ---------------- ViewCard — a Saved View on Home (AppLink to path+search) ---------------- */
function ViewCard({ fav, onRename, onDelete }) {
  return (
    <div style={{ position: 'relative', border: '1px solid var(--p-border)', borderRadius: 10, background: 'var(--p-surface)', boxShadow: 'var(--shadow-card)' }}>
      <AppLink to={fav.path + fav.search} data-testid={`fav-open-link-${fav.id}`}
        style={{ display: 'block', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Icon name={fav.icon || 'bookmark'} size={18} color="var(--p-text-2)" />
          <span style={{ font: '600 14px Inter', color: 'var(--p-ink)' }}>{fav.name}</span>
        </div>
        {fav.note && <div style={{ font: '400 12px/1.4 Inter', color: 'var(--p-muted)' }}>{fav.note}</div>}
        <div style={{ font: '400 11px Inter', color: 'var(--p-placeholder)', marginTop: 6 }}>{fav.section}</div>
      </AppLink>
      <Kebab items={[{ label: 'Rename', onClick: () => onRename?.(fav) }, { label: 'Delete', tone: 'danger', onClick: () => onDelete?.(fav) }]}
        style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }} testid={`fav-menu-${fav.id}`} />
    </div>
  );
}

/* ---------------- Stat-Card Customizer (1.9) — @dnd-kit reorder + visibility, persisted ----------------
   The Customize button opens this dropdown of all role-permitted cards. Menu order ==
   tile render order; reorder + toggle persist immediately to user_prefs.cards. Every row
   shows a blanket `sample` label (live tiles stay clean — §D2). */
function StatCardCustomizer({ cards, order, hidden, onReorder, onToggle }) {
  // cards: [{id,label}]; order: [id]; hidden: Set(id). Built on DndContext + SortableContext
  // (vertical) + useSortable per row + arrayMove on drop (see DS 1.2 Arrangement Board).
  return (
    <div data-testid="customize-cards-menu" style={{ width: 320, background: 'var(--p-surface)', border: '1px solid var(--p-border)', borderRadius: 10, boxShadow: 'var(--shadow-float)', padding: 6 }}>
      <div style={{ font: '500 11px Inter', color: 'var(--p-muted)', padding: '8px 10px 6px' }}>Drag to reorder</div>
      {order.map((id) => {
        const c = cards.find((x) => x.id === id); if (!c) return null;
        return (
          <div key={id} data-testid={`card-row-${id}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6 }}>
            <Icon name="drag_indicator" size={18} color="var(--p-placeholder)" data-testid={`card-drag-${id}`} style={{ cursor: 'grab', touchAction: 'none' }} />
            <Checkbox on={!hidden.has(id)} onChange={() => onToggle?.(id)} data-testid={`card-toggle-${id}`} />
            <span style={{ flex: 1, font: '400 14px Inter', color: 'var(--p-ink)' }}>{c.label}</span>
            <span style={{ font: '500 9px/1 Inter', letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--p-placeholder)' }}>sample</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Crow Fact — hover-swap easter egg (1.9) ----------------
   Bottom-pinned. Shows a low-opacity `raven` glyph; on hover the bird fades OUT and a
   random Crow Fact fades IN *in the same centered stage* (layout never grows). Each hover
   rolls a fresh fact. Honors prefers-reduced-motion (bob off). */
function CrowFact({ facts }) {
  const [hover, setHover] = useState(false);
  const [fact, setFact] = useState(() => facts[0]);
  const roll = () => { setHover(true); setFact(facts[(facts.indexOf(fact) + 1 + Math.floor(facts.length / 2)) % facts.length]); };
  return (
    <div data-testid="crow-fact" onMouseEnter={roll} onMouseLeave={() => setHover(false)}
      style={{ marginTop: 'auto', position: 'relative', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ position: 'absolute', opacity: hover ? 0 : 1, transition: 'opacity .25s', color: 'var(--p-placeholder)' }}>
        <Icon name="raven" size={20} fill={0} color="var(--p-placeholder)" />
      </span>
      <span style={{ position: 'absolute', opacity: hover ? 1 : 0, transition: 'opacity .25s', font: '400 13px/1.4 Inter', color: 'var(--p-muted)', textAlign: 'center', maxWidth: 520 }}>{fact}</span>
    </div>
  );
}

/* ---------------- HomeDashboard (1.9) — the post-login landing (/home) ----------------
   Container matches every screen (maxWidth 1600; margin 0 auto inside the shell's
   24px 32px padding). Greeting + Customize (neutral square Button) · Health Stat Card grid
   (320px min) · Saved Views grid · Crow Fact. */
function HomeDashboard({ firstName, greeting, healthCards, favorites, onCustomize, crowFacts }) {
  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100%', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, font: '600 24px/1.2 Inter', letterSpacing: '-.02em', color: 'var(--p-ink)' }}>{greeting}, {firstName}.</h1>
          <p style={{ margin: '4px 0 0', font: '400 14px Inter', color: 'var(--p-muted)' }}>Here's where things stand today.</p>
        </div>
        <Button variant="neutral" icon="tune" data-testid="customize-cards-btn" onClick={onCustomize}>Customize</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12 }}>
        {healthCards.map((c) => (
          <div key={c.id} data-testid={`tile-${c.id}`} style={{ border: '1px solid var(--p-border)', borderRadius: 10, background: 'var(--p-surface)', boxShadow: 'var(--shadow-card)', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: `var(--p-${c.status === 'green' ? 'success' : c.status === 'red' ? 'danger' : c.status === 'yellow' ? 'warning' : 'placeholder'})` }} />
              <span style={{ font: '500 12px Inter', color: 'var(--p-muted)' }}>{c.label}</span>
            </div>
            <div style={{ font: "600 26px/1.1 'Geist Mono', monospace", color: 'var(--p-ink)', margin: '6px 0 2px' }}>{c.value}</div>
            <div style={{ font: '400 12px/1.4 Inter', color: 'var(--p-muted)' }}>{c.hint}</div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <h2 style={{ margin: 0, font: '600 15px Inter', color: 'var(--p-ink)' }}>Saved Views</h2>
          <Tooltip side="bottom" maxWidth={300} text="On any report or list in the Portal, apply the filters you like and press 'Save View' to create a card here.">
            <Icon name="info" size={15} color="var(--p-placeholder)" style={{ cursor: 'help' }} />
          </Tooltip>
        </div>
        {favorites.length
          ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>{favorites.map((f) => <ViewCard key={f.id} fav={f} />)}</div>
          : <p style={{ font: '400 13px/1.5 Inter', color: 'var(--p-muted)', maxWidth: 520 }}>On any report or list, apply the filters you like and tap 'Save View'. It'll show up here so you can quickly jump straight to the things you care about.</p>}
      </div>

      <CrowFact facts={crowFacts} />
    </div>
  );
}
