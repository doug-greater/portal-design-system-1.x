// Portal UI Kit — Arrangement Board (Store Layouts)
// STRUCTURAL reference for the drag-and-drop merchandising board. The live portal
// wires drag with @dnd-kit (core + sortable + utilities, the only new runtime dep);
// this kit reference shows the layout, section card, placement row, inline capacity
// control, and the Unassigned tray — interactive where it doesn't need DnD (drag is
// omitted, since the kit has no bundler). See "Greater Design System.md" §9
// "Arrangement Board (drag-and-drop)". Load AFTER primitives.jsx + overlays.jsx.

/* Inline Quantity Control — capacity + unit; amber when unset; label morphs on Display. */
function CapacityControl({ display }) {
  const [val, setVal] = useState('');
  const [unit, setUnit] = useState('units');
  const unset = val === '';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', height: 30, borderRadius: 6, overflow: 'hidden', flexShrink: 0,
      border: `1px solid ${unset ? 'var(--p-warning)' : 'var(--p-border-strong)'}`, background: unset ? 'var(--g-gold-10)' : '#fff' }}>
      <span key={display ? 'd' : 'c'} className="gr-label-swap" style={{ font: '500 11px/1 Inter', color: 'var(--p-muted)', padding: '0 8px', whiteSpace: 'nowrap' }}>{display ? 'Display Size' : 'Capacity'}</span>
      <input type="number" value={val} onChange={(e) => setVal(e.target.value)} placeholder="—"
        style={{ width: 46, height: 28, border: 'none', outline: 'none', background: 'transparent', font: '500 13px Inter', color: 'var(--p-ink)', textAlign: 'right' }} />
      <button onClick={() => setUnit((u) => (u === 'units' ? 'cases' : 'units'))}
        style={{ height: 30, padding: '0 8px', border: 'none', borderLeft: `1px solid ${unset ? 'rgba(219,158,3,.3)' : 'var(--p-border)'}`, background: 'transparent', font: '500 12px Inter', color: 'var(--p-text-2)', cursor: 'pointer' }}>{unit}</button>
    </span>
  );
}

/* Placement row — the draggable item (drag handle is decorative here). */
function PlacementRow({ seq, name, brand, size, category, plan }) {
  const [display, setDisplay] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', border: '1px solid var(--p-border)', borderRadius: 8, background: '#fff' }}>
      <Icon name="drag_indicator" size={18} color="var(--p-placeholder)" style={{ cursor: 'grab' }} />
      <span style={{ font: '600 11px/1 Geist Mono, monospace', color: 'var(--p-muted)', background: 'var(--p-surface-alt)', borderRadius: 6, width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{seq}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ font: '500 14px Inter', color: 'var(--p-ink)' }}>{name}</span>
          <Pill kind={category}>{category}</Pill>
          {plan && <Chip tone={plan.tone} icon={plan.icon}>{plan.label}</Chip>}
        </div>
        <div style={{ font: '400 12px Inter', color: 'var(--p-muted)' }}>{brand} · {size}</div>
      </div>
      <CapacityControl display={display} />
      <ChipToggle on={display} onClick={() => setDisplay((v) => !v)} icon="curtains" label="Display" />
      <button title="Remove" style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--p-placeholder)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="close" size={18} /></button>
    </div>
  );
}

/* Section card — sticky header (drag handle · name · count · collapse · kebab) + meta row + rows. */
function SectionCard({ name, count, children, general }) {
  const [open, setOpen] = useState(true);
  const kebab = [
    { label: 'Add Product', icon: 'add' },
    { label: 'Set Capacity For All', icon: 'fit_width' },
    { divider: true },
    { label: 'Delete Section', icon: 'delete', danger: true },
  ];
  return (
    <div style={{ border: '1px solid var(--p-border)', borderRadius: 10, background: '#fff', boxShadow: 'var(--shadow-card)', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--p-surface-alt)', borderRadius: open ? '10px 10px 0 0' : 10, borderBottom: open ? '1px solid var(--p-border)' : 'none' }}>
        <Icon name="drag_indicator" size={20} color="var(--p-placeholder)" style={{ cursor: 'grab' }} />
        <span style={{ font: '600 14px Inter', color: 'var(--p-ink)' }}>{name}</span>
        {general
          ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: '500 11px Inter', color: 'var(--p-muted)' }}><Icon name="shuffle" size={13} /> General Stock</span>
          : <span style={{ font: '500 12px/1 Geist Mono, monospace', color: 'var(--p-muted)' }}>{count} items</span>}
        <div style={{ flex: 1 }} />
        <button onClick={() => setOpen((o) => !o)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--p-muted)', display: 'inline-flex' }}><Icon name="expand_more" size={20} style={{ transform: open ? 'none' : 'rotate(-90deg)', transition: 'transform .15s' }} /></button>
        <Kebab items={kebab} />
      </div>
      {open && <div style={{ padding: 12 }}>{children}</div>}
    </div>
  );
}

/* Section meta row — progressive-disclosure note + compact general-stock control. */
function MetaRow() {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState('');
  const [general, setGeneral] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 28, marginBottom: 10 }}>
      {editing ? (
        <input autoFocus value={note} onChange={(e) => setNote(e.target.value)} onBlur={() => setEditing(false)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') setEditing(false); }}
          placeholder="Add a note for reps — where to find it, inventory tips…"
          style={{ flex: 1, height: 28, border: '1px solid var(--p-primary)', borderRadius: 6, padding: '0 8px', font: '400 13px Inter', outline: 'none', boxShadow: '0 0 0 3px rgba(0,124,255,.12)' }} />
      ) : (
        <button onClick={() => setEditing(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: 'none', background: 'transparent', cursor: 'text', font: '400 13px Inter', color: note ? 'var(--p-text-2)' : 'var(--p-muted)' }}>
          <Icon name="sticky_note_2" size={14} /> {note || 'Add a note about this section'}
        </button>
      )}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Icon name="shuffle" size={14} color={general ? 'var(--p-primary)' : 'var(--p-muted)'} />
        <span style={{ font: '500 13px Inter', color: general ? 'var(--p-primary-ink)' : 'var(--p-text-2)' }}>General Stock Area</span>
        <Tooltip side="bottom" maxWidth={340} text="General stock areas do not have a stable list of products or sequence — like a back stock area. Inventory may change with each delivery.">
          <Icon name="info" size={14} color="var(--p-placeholder)" style={{ cursor: 'help' }} />
        </Tooltip>
        <Toggle on={general} onChange={setGeneral} />
      </span>
    </div>
  );
}

/* Unassigned tray (sticky, right column). Emits unplaced SKUs; never accepts placements. */
function UnassignedTray({ items }) {
  return (
    <div style={{ border: '1px dashed var(--p-border-strong)', borderRadius: 10, background: 'var(--p-surface-alt)', padding: 10, minHeight: 120 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Icon name="inventory_2" size={16} color="var(--p-muted)" />
        <span style={{ font: '600 13px Inter', color: 'var(--p-ink)' }}>Unassigned</span>
        <span style={{ font: '500 11px/1 Geist Mono, monospace', color: 'var(--p-muted)', background: '#fff', border: '1px solid var(--p-border)', borderRadius: 999, padding: '2px 7px' }}>{items.length}</span>
      </div>
      {items.map((p) => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', background: '#fff', border: '1px solid var(--p-border)', borderRadius: 8, marginBottom: 6, cursor: 'grab' }}>
          <Icon name="drag_indicator" size={16} color="var(--p-placeholder)" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '500 13px Inter', color: 'var(--p-ink)' }}>{p.name}</div>
            <div style={{ font: '400 11px Inter', color: 'var(--p-muted)' }}>{p.category} · {p.size}</div>
          </div>
          {p.plan && <Chip tone={p.plan.tone} icon={p.plan.icon}>{p.plan.label}</Chip>}
        </div>
      ))}
      <p style={{ font: '400 12px/1.4 Inter', color: 'var(--p-muted)', margin: '8px 4px 0' }}>Products at this store that aren't placed in any section appear here. Drag one into a section to place it.</p>
    </div>
  );
}

/* Composed board — two columns: editor (left) + sticky tray (right). */
function LayoutBoard() {
  const tray = [
    { name: 'Hazy IPA 6pk', category: 'Beer', size: '6×12oz', plan: { tone: 'amber', icon: 'add_business', label: 'New to store' } },
    { name: 'Cold Brew 4pk', category: 'Non-Alcoholic', size: '4×11oz' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 20, alignItems: 'start', padding: 24, background: 'var(--p-surface-alt)' }}>
      <div>
        <SectionCard name="Cold Shelves" count={2}>
          <MetaRow />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <PlacementRow seq={1} name="Pilsner 12pk" brand="North Coast" size="12×12oz" category="Beer" plan={{ tone: 'info', icon: 'schedule', label: 'Adds Aug 1' }} />
            <PlacementRow seq={2} name="Rosé 750ml" brand="Maison" size="750ml" category="Wine" plan={{ tone: 'danger', icon: 'remove_shopping_cart', label: 'Disc. Sep 1' }} />
          </div>
          <div style={{ marginTop: 8, border: '1px dashed var(--p-border)', borderRadius: 8, minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--p-placeholder)', font: '400 13px Inter' }}>
            <Icon name="move_down" size={18} /> Drag products here
          </div>
        </SectionCard>

        <SectionCard name="Back Stock" general>
          <div style={{ border: '1px dashed var(--p-border)', borderRadius: 8, background: 'var(--p-surface-alt)', padding: '28px 16px', textAlign: 'center' }}>
            <Icon name="inventory_2" size={24} color="var(--p-muted)" />
            <div style={{ font: '600 14px Inter', color: 'var(--p-ink)', marginTop: 8 }}>General Stock Area</div>
            <div style={{ font: '400 13px Inter', color: 'var(--p-muted)', marginTop: 2 }}>Products can't be placed here. Use this section to track variable inventory.</div>
          </div>
        </SectionCard>
      </div>
      <div style={{ position: 'sticky', top: 0 }}><UnassignedTray items={tray} /></div>
    </div>
  );
}

Object.assign(window, { LayoutBoard, SectionCard, PlacementRow, CapacityControl, MetaRow, UnassignedTray });
