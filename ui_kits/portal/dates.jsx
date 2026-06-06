// Portal UI Kit — Dates
// Calendar, CalendarGrid, DateField (single date; pass range for a range calendar).
// Material Symbols (uses shared window.MIcon from overlays.jsx).
// Load AFTER primitives.jsx and overlays.jsx.

const gMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const gFmt = (d) => d ? `${gMonths[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}` : '';
const gSameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
const gNavStyle = { width: 28, height: 28, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p-muted)', cursor: 'pointer' };

function CalendarGrid({ view, value, range, onPick, min, max }) {
  const y = view.getFullYear(), m = view.getMonth();
  const first = new Date(y, m, 1);
  const start = new Date(y, m, 1 - first.getDay());
  const today = new Date();
  const minT = min ? new Date(min).setHours(0,0,0,0) : null;   // fromDate / future-only fields
  const maxT = max ? new Date(max).setHours(0,0,0,0) : null;   // e.g. Audit Log enforces max = today
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const inMonth = d.getMonth() === m;
    const dayT = new Date(d).setHours(0,0,0,0);
    const disabled = (minT != null && dayT < minT) || (maxT != null && dayT > maxT);
    let inRange = false, isStart = false, isEnd = false, sel = false;
    if (range && range.start && range.end) {
      const t = new Date(d).setHours(0,0,0,0); const s = new Date(range.start).setHours(0,0,0,0); const e = new Date(range.end).setHours(0,0,0,0);
      inRange = t >= s && t <= e; isStart = t === s; isEnd = t === e;
    } else {
      sel = gSameDay(d, value) || (range && gSameDay(d, range.start));
    }
    cells.push({ d: new Date(d), inMonth, isToday: gSameDay(d, today), inRange, isStart, isEnd, sel, disabled });
    if (i >= 34 && d.getMonth() !== m && d.getDay() === 6) break;
  }
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', padding: '0 14px 14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 2 }}>
        {['S','M','T','W','T','F','S'].map((w, i) => <span key={i} style={{ textAlign: 'center', font: '500 11px/1 Inter, sans-serif', color: 'var(--p-muted)', padding: '6px 0' }}>{w}</span>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
        {cells.map((c, i) => {
          const endpt = c.isStart || c.isEnd || c.sel;
          return (
            <div key={i} style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
              background: c.inRange ? 'var(--p-primary-tint)' : 'transparent',
              borderRadius: c.isStart ? '999px 0 0 999px' : c.isEnd ? '0 999px 999px 0' : 0 }}>
              <span onClick={() => !c.disabled && onPick && onPick(c.d)} style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                font: '500 13px/1 Inter, sans-serif', cursor: c.disabled ? 'default' : 'pointer', opacity: c.disabled ? 0.5 : 1,
                color: c.disabled ? 'var(--p-placeholder)' : endpt ? '#fff' : !c.inMonth ? 'var(--p-placeholder)' : c.isToday ? 'var(--p-primary)' : 'var(--p-text)',
                background: endpt && !c.disabled ? 'var(--p-primary)' : 'transparent',
                boxShadow: c.isToday && !endpt && !c.disabled ? 'inset 0 0 0 1.5px var(--p-primary)' : 'none',
              }}>{c.d.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Context-aware range presets — the rail must match the field's temporal direction.
const RANGE_PRESETS = {
  forward: [
    { label: 'Today', d: [0, 0] }, { label: 'Tomorrow', d: [1, 1] },
    { label: 'Next 7 Days', d: [0, 6] }, { label: 'Next 30 Days', d: [0, 29] },
    { label: 'This Month', d: 'thisMonth' }, { label: 'Next Month', d: 'nextMonth' },
  ],
  backward: [
    { label: 'Today', d: [0, 0] }, { label: 'Yesterday', d: [-1, -1] },
    { label: 'Last 7 Days', d: [-6, 0] }, { label: 'Last 14 Days', d: [-13, 0] }, { label: 'Last 30 Days', d: [-29, 0] },
  ],
};
function computePreset(spec) {
  const base = new Date(); base.setHours(0, 0, 0, 0);
  if (spec === 'thisMonth') return { start: new Date(base.getFullYear(), base.getMonth(), 1), end: new Date(base.getFullYear(), base.getMonth() + 1, 0) };
  if (spec === 'nextMonth') return { start: new Date(base.getFullYear(), base.getMonth() + 1, 1), end: new Date(base.getFullYear(), base.getMonth() + 2, 0) };
  const s = new Date(base); s.setDate(base.getDate() + spec[0]);
  const e = new Date(base); e.setDate(base.getDate() + spec[1]);
  return { start: s, end: e };
}

// Set `direction` ('forward' | 'backward') to show a matching preset rail (range pickers).
function Calendar({ value, range, onChange, onPickRange, min, max, direction }) {
  const [view, setView] = useState(value || (range && range.start) || new Date());
  const presets = direction ? RANGE_PRESETS[direction] : null;
  return (
    <div style={{ display: 'flex', background: '#fff', border: '1px solid var(--p-border)', borderRadius: 10, boxShadow: 'var(--shadow-float)', overflow: 'hidden' }}>
      {presets && (
        <div style={{ width: 150, background: 'var(--p-surface-alt)', borderRight: '1px solid var(--p-border)', padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {presets.map((p) => (
            <button key={p.label} onClick={() => onPickRange && onPickRange(computePreset(p.d))}
              style={{ textAlign: 'left', border: 'none', background: 'transparent', borderRadius: 6, padding: '7px 10px', font: '500 13px/1 Inter, sans-serif', color: 'var(--p-text-2)', cursor: 'pointer' }}>{p.label}</button>
          ))}
          <div style={{ flex: 1, minHeight: 8 }} />
          <button onClick={() => onPickRange && onPickRange({ start: null, end: null })}
            style={{ textAlign: 'left', border: 'none', background: 'transparent', borderRadius: 6, padding: '7px 10px', font: '500 13px/1 Inter, sans-serif', color: 'var(--p-danger)', cursor: 'pointer' }}>Clear</button>
        </div>
      )}
      <div style={{ width: 280 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px 4px' }}>
          <span onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} style={gNavStyle}><MIcon name="chevron_left" size={20} /></span>
          <span style={{ font: '600 14px/1 Inter, sans-serif', color: 'var(--p-ink)' }}>{gMonths[view.getMonth()]} {view.getFullYear()}</span>
          <span onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} style={gNavStyle}><MIcon name="chevron_right" size={20} /></span>
        </div>
        <CalendarGrid view={view} value={value} range={range} onPick={onChange} min={min} max={max} />
      </div>
    </div>
  );
}

// Field-triggered date picker. Pass `direction` for a range picker with a preset rail;
// `min`/`max` to bound selectable days; `dropUp` to open upward (in production the popover
// is portaled to <body> and auto-flips so it never covers a modal's Save button).
function DateField({ value, onChange, label = 'Date', range = false, min, max, direction, dropUp = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc); return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const isRange = range || !!direction;
  const display = isRange
    ? (value && value.start ? `${gFmt(value.start)}${value.end ? ' – ' + gFmt(value.end) : ''}` : '')
    : (value ? gFmt(value) : '');
  return (
    <div ref={ref} style={{ position: 'relative', width: isRange ? 280 : 240 }}>
      <label style={{ position: 'absolute', top: -7, left: 10, padding: '0 4px', background: '#fff', font: '400 12px/1 Inter, sans-serif', color: open ? 'var(--p-primary)' : 'var(--p-muted)', zIndex: 2 }}>{label}</label>
      <div onClick={() => setOpen((o) => !o)} style={{ width: '100%', height: 44, border: `1px solid ${open ? 'var(--p-primary)' : 'var(--p-border-strong)'}`, borderRadius: 6, padding: '0 14px 0 40px', font: '400 15px Inter, sans-serif', color: display ? 'var(--p-ink)' : 'var(--p-placeholder)', background: '#fff', boxSizing: 'border-box', display: 'flex', alignItems: 'center', cursor: 'pointer', boxShadow: open ? '0 0 0 3px rgba(0,124,255,.15)' : 'none' }}>
        <span style={{ position: 'absolute', left: 12, color: 'var(--p-muted)' }}><MIcon name={isRange ? 'date_range' : 'calendar_today'} size={20} /></span>
        {display || (isRange ? 'Select a range' : 'Select a date')}
      </div>
      {open && (
        <div style={{ position: 'absolute', left: 0, zIndex: 50, ...(dropUp ? { bottom: 52 } : { top: 52 }) }}>
          <Calendar value={isRange ? undefined : value} range={isRange ? value : undefined} min={min} max={max} direction={direction}
            onChange={(d) => { onChange && onChange(d); if (!isRange) setOpen(false); }}
            onPickRange={(r) => { onChange && onChange(r); setOpen(false); }} />
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Calendar, CalendarGrid, DateField });
