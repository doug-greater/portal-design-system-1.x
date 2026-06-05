// Portal UI Kit — Dates
// Calendar, CalendarGrid, DateField (single date; pass range for a range calendar).
// Material Symbols (uses shared window.MIcon from overlays.jsx).
// Load AFTER primitives.jsx and overlays.jsx.

const gMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const gFmt = (d) => d ? `${gMonths[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}` : '';
const gSameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
const gNavStyle = { width: 28, height: 28, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p-muted)', cursor: 'pointer' };

function CalendarGrid({ view, value, range, onPick }) {
  const y = view.getFullYear(), m = view.getMonth();
  const first = new Date(y, m, 1);
  const start = new Date(y, m, 1 - first.getDay());
  const today = new Date();
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const inMonth = d.getMonth() === m;
    let inRange = false, isStart = false, isEnd = false, sel = false;
    if (range && range.start && range.end) {
      const t = d.setHours(0,0,0,0); const s = new Date(range.start).setHours(0,0,0,0); const e = new Date(range.end).setHours(0,0,0,0);
      inRange = t >= s && t <= e; isStart = t === s; isEnd = t === e;
    } else {
      sel = gSameDay(d, value) || (range && gSameDay(d, range.start));
    }
    cells.push({ d: new Date(d), inMonth, isToday: gSameDay(d, today), inRange, isStart, isEnd, sel });
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
              <span onClick={() => onPick && onPick(c.d)} style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                font: '500 13px/1 Inter, sans-serif', cursor: 'pointer',
                color: endpt ? '#fff' : !c.inMonth ? 'var(--p-placeholder)' : c.isToday ? 'var(--p-primary)' : 'var(--p-text)',
                background: endpt ? 'var(--p-primary)' : 'transparent',
                boxShadow: c.isToday && !endpt ? 'inset 0 0 0 1.5px var(--p-primary)' : 'none',
              }}>{c.d.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Calendar({ value, range, onChange }) {
  const [view, setView] = useState(value || (range && range.start) || new Date());
  return (
    <div style={{ width: 280, background: '#fff', border: '1px solid var(--p-border)', borderRadius: 10, boxShadow: 'var(--shadow-float)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px 4px' }}>
        <span onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} style={gNavStyle}><MIcon name="chevron_left" size={20} /></span>
        <span style={{ font: '600 14px/1 Inter, sans-serif', color: 'var(--p-ink)' }}>{gMonths[view.getMonth()]} {view.getFullYear()}</span>
        <span onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} style={gNavStyle}><MIcon name="chevron_right" size={20} /></span>
      </div>
      <CalendarGrid view={view} value={value} range={range} onPick={onChange} />
    </div>
  );
}

// Field-triggered date picker. Set range to render a range calendar (pass {start,end} as value via range prop).
function DateField({ value, onChange, label = 'Date', range = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc); return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative', width: range ? 280 : 240 }}>
      <label style={{ position: 'absolute', top: -7, left: 10, padding: '0 4px', background: '#fff', font: '400 12px/1 Inter, sans-serif', color: open ? 'var(--p-primary)' : 'var(--p-muted)', zIndex: 2 }}>{label}</label>
      <div onClick={() => setOpen((o) => !o)} style={{ width: '100%', height: 44, border: `1px solid ${open ? 'var(--p-primary)' : 'var(--p-border-strong)'}`, borderRadius: 6, padding: '0 14px 0 40px', font: '400 15px Inter, sans-serif', color: value ? 'var(--p-ink)' : 'var(--p-placeholder)', background: '#fff', boxSizing: 'border-box', display: 'flex', alignItems: 'center', cursor: 'pointer', boxShadow: open ? '0 0 0 3px rgba(0,124,255,.15)' : 'none' }}>
        <span style={{ position: 'absolute', left: 12, color: 'var(--p-muted)' }}><MIcon name={range ? 'date_range' : 'calendar_today'} size={20} /></span>
        {value ? gFmt(value) : 'Select a date'}
      </div>
      {open && <div style={{ position: 'absolute', top: 52, left: 0, zIndex: 50 }}><Calendar value={value} onChange={(d) => { onChange && onChange(d); setOpen(false); }} /></div>}
    </div>
  );
}

Object.assign(window, { Calendar, CalendarGrid, DateField });
