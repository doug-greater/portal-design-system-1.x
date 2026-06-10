// FilterMenu.jsx — Consolidated, single-button table filtering.
//
// Why: a table can be filtered on many columns, but a row of per-column
// dropdowns runs out of horizontal room fast. Instead we use ONE "Filters"
// button that opens a two-pane popover:
//   • left rail  — the filterable attributes (each shows its active count)
//   • right pane — the value selector for the chosen attribute
//        - small enumerable sets (Category, Coverage) → checkbox list
//        - large sets (Account: thousands) → type-to-search + pinned selections
// Applied filters render as removable TOKENS in the bar so they stay visible
// and the bar never grows with the number of filterable columns.

const { useState: _useState, useEffect: _useEffect, useRef: _useRef, useMemo: _useMemo } = React;

/* Generate a realistic large account set (~3,600) to exercise type-to-search. */
const _genAccounts = () => {
  const CHAINS = ['Coastal Mart', 'Harbor Foods', 'Sunrise Grocery', 'Metro Beverage', 'Pacific Spirits',
    'Valley Market', 'Riverside Wine & Spirits', 'Downtown Deli', 'Gateway Liquors', 'Summit Foods',
    'Lakeside Market', 'Urban Provisions', 'Golden Gate Grocers', 'Bayview Bottle Shop', 'Hilltop Tavern'];
  const CITIES = ['Farmville', 'Greenwood', 'Oakdale', 'Fairview', 'Riverton', 'Bristol', 'Clinton',
    'Springfield', 'Madison', 'Georgetown', 'Salem', 'Auburn', 'Dayton', 'Milton', 'Newport',
    'Ashland', 'Burlington', 'Manchester', 'Kingston', 'Marion'];
  const TYPES = ['Retail / Store', 'Restaurant', 'Grocery', 'C-Store', 'Bar', 'Discount Store'];
  const out = [];
  let n = 1;
  for (const chain of CHAINS) {
    for (const city of CITIES) {
      for (let s = 1; s <= 12; s++) {
        out.push({ id: 'A' + String(n).padStart(4, '0'), name: `${chain} #${s} · ${city}`, type: TYPES[n % TYPES.length] });
        n++;
      }
    }
  }
  return out;
};
const ALL_ACCOUNTS = _genAccounts();

const fmStyles = {
  bar: { display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  token: {
    display: 'inline-flex', alignItems: 'center', gap: 0, height: 32, borderRadius: 6,
    border: '1px solid var(--p-border-strong)', background: '#fff', overflow: 'hidden',
  },
  tokenBody: {
    display: 'inline-flex', alignItems: 'center', gap: 6, height: '100%', padding: '0 4px 0 10px',
    cursor: 'pointer', font: '400 13px/1 Inter, sans-serif', color: 'var(--p-text)', background: 'transparent', border: 'none', whiteSpace: 'nowrap',
  },
  tokenLabel: { color: 'var(--p-muted)' },
  tokenX: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: '100%',
    borderLeft: '1px solid var(--p-border)', cursor: 'pointer', color: 'var(--p-placeholder)', background: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none',
  },
  clearAll: { background: 'transparent', border: 'none', cursor: 'pointer', font: '500 13px/1 Inter, sans-serif', color: 'var(--p-primary)', padding: '0 4px' },
  pop: {
    position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 60,
    width: 540, background: '#fff', border: '1px solid var(--p-border)', borderRadius: 10,
    boxShadow: 'var(--shadow-float, 0 10px 30px rgba(0,0,0,.14))', overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
  },
  panes: { display: 'flex', height: 360 },
  rail: { width: 184, borderRight: '1px solid var(--p-border)', padding: 8, overflowY: 'auto', flexShrink: 0, background: 'var(--p-surface-alt)' },
  railItem: (on) => ({
    display: 'flex', alignItems: 'center', gap: 8, width: '100%', height: 38, padding: '0 10px',
    borderRadius: 6, cursor: 'pointer', border: 'none', textAlign: 'left',
    background: on ? 'var(--p-primary-tint)' : 'transparent',
    font: on ? '600 14px/1 Inter, sans-serif' : '400 14px/1 Inter, sans-serif',
    color: on ? 'var(--p-primary)' : 'var(--p-text)',
  }),
  railCount: { marginLeft: 'auto', font: '500 11px Geist Mono, monospace', color: 'var(--p-primary)', background: 'var(--p-primary-soft)', padding: '1px 6px', borderRadius: 999 },
  pane: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
  paneHead: { padding: '14px 16px 10px', borderBottom: '1px solid var(--p-border)' },
  list: { flex: 1, overflowY: 'auto', padding: '6px 8px' },
  groupLabel: { font: '500 10px/1 Inter, sans-serif', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--p-muted)', padding: '10px 10px 6px' },
  valRow: {
    display: 'flex', alignItems: 'center', gap: 10, minHeight: 34, padding: '4px 10px',
    borderRadius: 6, cursor: 'pointer', font: '400 14px/1.3 Inter, sans-serif', color: 'var(--p-ink)',
  },
  selectAll: {
    display: 'flex', alignItems: 'center', gap: 10, minHeight: 36, padding: '4px 10px', margin: '2px 0 4px',
    borderRadius: 6, cursor: 'pointer', font: '500 14px/1.3 Inter, sans-serif',
    borderBottom: '1px solid var(--p-border)',
  },
  valSub: { font: '400 12px Inter, sans-serif', color: 'var(--p-muted)', marginLeft: 'auto', whiteSpace: 'nowrap' },
  capNote: { font: '400 12px/1.4 Inter, sans-serif', color: 'var(--p-muted)', padding: '10px 12px', textAlign: 'center' },
  empty: { font: '400 13px/1.4 Inter, sans-serif', color: 'var(--p-muted)', padding: '24px 12px', textAlign: 'center' },
  footer: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderTop: '1px solid var(--p-border)', background: 'var(--p-surface-alt)' },
  footCount: { font: '400 13px Inter, sans-serif', color: 'var(--p-muted)' },
};

const _MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const _toISO = (d) => d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` : '';
const _fmShort = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return isNaN(d) ? iso : `${_MON[d.getMonth()]} ${d.getDate()}`;
};

function _summarize(attr, sel) {
  // daterange value is an object { from, to } (ISO strings) — not a Set.
  if (attr.type === 'daterange') {
    const f = _fmShort(sel.from), t = _fmShort(sel.to);
    if (f && t) return `${f} – ${t}`;
    if (f) return `${f} – …`;
    if (t) return `… – ${t}`;
    return 'Any date';
  }
  const arr = [...sel];
  if (attr.type === 'search') return `${arr.length} selected`;
  if (arr.length <= 2) return arr.join(', ');
  return `${arr.length} selected`;
}

function FilterMenu({ attributes, value, onChange, resultLabel }) {
  const [open, setOpen] = _useState(false);
  const [activeId, setActiveId] = _useState(attributes[0].id);
  const [query, setQuery] = _useState('');
  const wrapRef = _useRef(null);

  _useEffect(() => {
    if (!open) return;
    const h = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const k = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', h);
    document.addEventListener('keydown', k);
    return () => { document.removeEventListener('mousedown', h); document.removeEventListener('keydown', k); };
  }, [open]);

  _useEffect(() => { setQuery(''); }, [activeId]);

  // Per-attribute active count. Generalized so Set-valued facets AND the
  // {from,to} daterange value both work — route EVERY count read through this
  // (totalCount, rail badge, applied-token visibility) before adding a
  // differently-shaped value, or the Set path (.size) throws on the object.
  const attrCount = (a) => {
    const v = value[a.id];
    if (!v) return 0;
    if (a.type === 'daterange') return (v.from || v.to) ? 1 : 0;
    return v.size || 0;          // Set-valued facets unchanged
  };

  const totalCount = attributes.reduce((s, a) => s + attrCount(a), 0);
  const activeAttr = attributes.find((a) => a.id === activeId) || attributes[0];

  const setSel = (attrId, next) => onChange({ ...value, [attrId]: next });
  const clearAttr = (a) => setSel(a.id, a.type === 'daterange' ? { from: '', to: '' } : new Set());
  const toggleVal = (attrId, v) => {
    const cur = new Set(value[attrId] || []);
    cur.has(v) ? cur.delete(v) : cur.add(v);
    setSel(attrId, cur);
  };

  const openTo = (id) => { setActiveId(id); setOpen(true); };

  /* Right-pane value list */
  const isDateRange = activeAttr.type === 'daterange';
  const selSet = (isDateRange ? null : value[activeId]) || new Set();
  const isSearch = activeAttr.type === 'search';
  const q = query.trim().toLowerCase();

  /* daterange bridge: facet value is { from, to } ISO; the kit Calendar speaks
     { start, end } Dates. Grid clicks accumulate from → to; presets set both. */
  const drVal = isDateRange ? (value[activeId] || { from: '', to: '' }) : null;
  const drRange = isDateRange
    ? { start: drVal.from ? new Date(drVal.from + 'T00:00:00') : null, end: drVal.to ? new Date(drVal.to + 'T00:00:00') : null }
    : null;
  const drGridPick = (d) => {
    const iso = _toISO(d);
    // start a new range if none open or one already complete; else close it (ordered)
    if (!drVal.from || (drVal.from && drVal.to)) { setSel(activeId, { from: iso, to: '' }); return; }
    const a = drVal.from, b = iso;
    setSel(activeId, b < a ? { from: b, to: a } : { from: a, to: b });
  };
  const drPickRange = (r) => setSel(activeId, { from: _toISO(r.start), to: _toISO(r.end) });

  let pinned = [], rest = [], totalMatches = 0, allMatchIds = [], allMatchesSelected = false;
  const CAP = 50;
  if (isSearch) {
    const ds = activeAttr.data || [];
    pinned = ds.filter((d) => selSet.has(d.id));
    // every item matching the current query (regardless of selection) — drives Select all
    const allMatched = q ? ds.filter((d) => d.name.toLowerCase().includes(q)) : ds;
    allMatchIds = allMatched.map((d) => d.id);
    allMatchesSelected = allMatchIds.length > 0 && allMatchIds.every((id) => selSet.has(id));
    const matches = allMatched.filter((d) => !selSet.has(d.id));
    totalMatches = matches.length;
    rest = matches.slice(0, CAP);
  }

  const toggleSelectAllMatches = () => {
    const next = new Set(selSet);
    if (allMatchesSelected) {
      allMatchIds.forEach((id) => next.delete(id));
    } else {
      allMatchIds.forEach((id) => next.add(id));
    }
    setSel(activeId, next);
  };

  return (
    <div ref={wrapRef} style={{ ...fmStyles.bar, position: 'relative' }}>
      {/* Filters button */}
      <button onClick={() => setOpen((o) => !o)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px',
        background: totalCount > 0 ? 'var(--p-primary-tint)' : '#fff', borderRadius: 6, cursor: 'pointer',
        border: `1px solid ${(open || totalCount > 0) ? 'var(--p-primary)' : 'var(--p-border-strong)'}`,
        color: (open || totalCount > 0) ? 'var(--p-primary)' : 'var(--p-ink)', font: '500 14px/1 Inter, sans-serif',
      }}>
        <Icon name="filter_list" size={13} color={(open || totalCount > 0) ? 'var(--p-primary)' : 'var(--p-muted)'} />
        Filters
        {totalCount > 0 && <span style={fmStyles.railCount}>{totalCount}</span>}
        <Icon name="expand_more" size={12} color={(open || totalCount > 0) ? 'var(--p-primary)' : 'var(--p-muted)'} />
      </button>

      {/* Applied tokens */}
      {attributes.map((a) => {
        if (attrCount(a) === 0) return null;
        const sel = value[a.id];
        return (
          <span key={a.id} style={fmStyles.token}>
            <button style={fmStyles.tokenBody} onClick={() => openTo(a.id)}>
              <span style={fmStyles.tokenLabel}>{a.label}:</span>
              <span style={{ fontWeight: 500 }}>{_summarize(a, sel)}</span>
            </button>
            <button style={fmStyles.tokenX} onClick={() => clearAttr(a)} aria-label={`Clear ${a.label}`}>
              <Icon name="close" size={13} />
            </button>
          </span>
        );
      })}

      {totalCount > 0 && <button style={fmStyles.clearAll} onClick={() => onChange({})}>Clear all</button>}

      {/* Popover — wider when a date-range attr is active (calendar > facet list) */}
      {open && (
        <div style={{ ...fmStyles.pop, width: isDateRange ? 640 : 540 }}>
          <div style={fmStyles.panes}>
            {/* Left rail */}
            <div style={fmStyles.rail}>
              {attributes.map((a) => {
                const c = attrCount(a);
                return (
                  <button key={a.id} style={fmStyles.railItem(a.id === activeId)} onClick={() => setActiveId(a.id)}>
                    <Icon name={a.icon || 'filter'} size={15} color={a.id === activeId ? 'var(--p-primary)' : 'var(--p-muted)'} />
                    {a.label}
                    {c > 0 && <span style={fmStyles.railCount}>{c}</span>}
                  </button>
                );
              })}
            </div>

            {/* Right pane */}
            <div style={fmStyles.pane}>
              {isDateRange ? (
                <React.Fragment>
                  <div style={{ ...fmStyles.paneHead, font: '600 14px/1 Inter, sans-serif', color: 'var(--p-ink)' }}>{activeAttr.label}</div>
                  <div style={{ padding: 14 }}>
                    {/* The embedded range calendar (preset rail + grid). The host stores the
                        range inside its filter value as { from, to } ISO strings. */}
                    <Calendar
                      range={drRange}
                      direction={activeAttr.direction || 'forward'}
                      onChange={drGridPick}
                      onPickRange={drPickRange} />
                  </div>
                </React.Fragment>
              ) : isSearch ? (
                <React.Fragment>
                  <div style={fmStyles.paneHead}>
                    <Input icon="search" value={query} onChange={(e) => setQuery(e.target.value)}
                      placeholder={`Search ${(activeAttr.data || []).length.toLocaleString()} ${activeAttr.label.toLowerCase()}s…`}
                      style={{ width: '100%' }} />
                  </div>
                  <div style={fmStyles.list}>
                    {allMatchIds.length > 0 && (
                      <div style={fmStyles.selectAll} onClick={toggleSelectAllMatches}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--p-surface-alt)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                        <Checkbox on={allMatchesSelected} onChange={toggleSelectAllMatches} />
                        <span style={{ fontWeight: 500, color: 'var(--p-primary)' }}>
                          {allMatchesSelected ? 'Deselect' : 'Select'} all{q ? ` ${allMatchIds.length.toLocaleString()} match${allMatchIds.length === 1 ? '' : 'es'}` : ` ${allMatchIds.length.toLocaleString()}`}
                        </span>
                      </div>
                    )}
                    {pinned.length > 0 && (
                      <React.Fragment>
                        <div style={fmStyles.groupLabel}>Selected · {pinned.length}</div>
                        {pinned.map((d) => (
                          <div key={d.id} style={fmStyles.valRow} onClick={() => toggleVal(activeId, d.id)}>
                            <Checkbox on={true} onChange={() => toggleVal(activeId, d.id)} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                            <span style={fmStyles.valSub}>{d.type}</span>
                          </div>
                        ))}
                        <div style={{ height: 1, background: 'var(--p-border)', margin: '6px 10px' }} />
                      </React.Fragment>
                    )}
                    {rest.length === 0 && pinned.length === 0 && <div style={fmStyles.empty}>No accounts match “{query}”.</div>}
                    {rest.length > 0 && q && <div style={fmStyles.groupLabel}>{totalMatches.toLocaleString()} match{totalMatches === 1 ? '' : 'es'}</div>}
                    {rest.map((d) => (
                      <div key={d.id} style={fmStyles.valRow} onClick={() => toggleVal(activeId, d.id)}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--p-surface-alt)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                        <Checkbox on={false} onChange={() => toggleVal(activeId, d.id)} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                        <span style={fmStyles.valSub}>{d.type}</span>
                      </div>
                    ))}
                    {totalMatches > CAP && (
                      <div style={fmStyles.capNote}>Showing first {CAP} of {totalMatches.toLocaleString()} — keep typing to narrow.</div>
                    )}
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div style={{ ...fmStyles.paneHead, font: '600 14px/1 Inter, sans-serif', color: 'var(--p-ink)' }}>{activeAttr.label}</div>
                  <div style={fmStyles.list}>
                    {(activeAttr.options || []).map((opt) => {
                      const on = selSet.has(opt);
                      return (
                        <div key={opt} style={fmStyles.valRow} onClick={() => toggleVal(activeId, opt)}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--p-surface-alt)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                          <Checkbox on={on} onChange={() => toggleVal(activeId, opt)} />
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={fmStyles.footer}>
            <span style={fmStyles.footCount}>{resultLabel}</span>
            <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 8 }}>
              <Button variant="ghost" onClick={() => onChange({})} disabled={totalCount === 0}>Clear all</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Done</Button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { FilterMenu, ALL_ACCOUNTS });
