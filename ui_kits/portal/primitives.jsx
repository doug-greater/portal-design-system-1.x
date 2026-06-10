// Portal UI Kit — shared primitives
// Exposed globally so other <script type="text/babel"> files can use them.

const { useState, useEffect, useRef, useMemo } = React;

/* ---------------- Icon (Material Symbols Sharp font) ---------------- */
// `name` is a Material Symbols glyph name (e.g. "search", "expand_more"). Outline by default.
function Icon({ name, size = 16, color, fill = 0, style }) {
  return (
    <span className="material-symbols-sharp" style={{
      fontFamily: "'Material Symbols Sharp'", fontSize: size, lineHeight: 1,
      // GRAD wired to --ms-grad (0 light, -25 dark) — optical correction so light
      // glyphs on a dark surface don't read bolder. (§A, 1.5)
      fontVariationSettings: `'FILL' ${fill}, 'GRAD' var(--ms-grad, 0)`, color,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      userSelect: 'none', flexShrink: 0, ...style,
    }}>{name}</span>
  );
}

/* ---------------- Logo ---------------- */
// In-product logo = wordmark only (never the full crow+wordmark lockup).
function Logo({ width = 110 }) {
  return <img src="../../assets/greater-logotype.png" alt="Greater" style={{ width, height: 'auto', display: 'block' }} />;
}
// Crow mark, for favicon / avatar / tight spots.
function Crow({ size = 24 }) {
  return <img src="../../assets/greater-crow.png" alt="" style={{ height: size, width: 'auto', display: 'block' }} />;
}

/* ---------------- Button ---------------- */
function Button({ variant = 'primary', size = 'md', icon, iconRight, children, onClick, disabled, loading, style, type, ...rest }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    height: size === 'sm' ? 30 : size === 'lg' ? 40 : 36,
    padding: size === 'sm' ? '0 16px' : size === 'lg' ? '0 28px' : '0 20px',
    minWidth: size === 'sm' ? 64 : size === 'lg' ? 120 : 88,
    borderRadius: 4, cursor: disabled ? 'not-allowed' : 'pointer',
    font: '500 14px/1 Inter, sans-serif', border: '1px solid transparent',
    transition: 'background .12s, border-color .12s', opacity: disabled ? 0.45 : 1,
    whiteSpace: 'nowrap',
  };
  const variants = {
    primary:   { background: '#007CFF', color: '#fff' },
    secondary: { background: '#fff', color: '#007CFF', borderColor: '#007CFF' },
    warning:   { background: '#fff', color: '#E5484D', borderColor: '#E5484D' },
    danger:    { background: '#E5484D', color: '#fff' },
    neutral:   { background: '#fff', color: '#364153', borderColor: '#D1D5DC' },
    ghost:     { background: 'transparent', color: '#007CFF', padding: '0 12px', minWidth: 0 },
    neo:       { background: '#fff', color: '#000', border: '1px solid #000', boxShadow: '2px 2px 0 0 #000', letterSpacing: '.05em', height: 39, padding: '0 30px', minWidth: 120, fontSize: 16 },
  };
  const [hover, setHover] = useState(false);
  const hoverBg = {
    primary:   '#0066D6',
    secondary: 'rgba(0,124,255,.05)',
    warning:   'rgba(229,72,77,.05)',
    danger:    '#C93B40',
    neutral:   '#F3F4F6',
    ghost:     'rgba(0,124,255,.05)',
    neo:       '#F0F7FF',
  }[variant];
  const disabledStyle = disabled ? ({
    primary:   { background: 'rgba(0,124,255,.25)', color: '#fff', opacity: 1 },
    secondary: { color: 'rgba(0,124,255,.25)', borderColor: 'rgba(0,124,255,.25)', opacity: 1 },
    warning:   { color: 'rgba(229,72,77,.25)', borderColor: 'rgba(229,72,77,.25)', opacity: 1 },
    danger:    { background: 'rgba(229,72,77,.45)', color: '#fff', opacity: 1 },
    neutral:   { background: '#fff', color: '#99A1AF', borderColor: '#E5E7EB', opacity: 1 },
    ghost:     { color: 'rgba(0,124,255,.25)', opacity: 1 },
    neo:       { opacity: 0.4 },
  }[variant] || {}) : {};
  return (
    <button type={type || 'button'} onClick={disabled || loading ? undefined : onClick} disabled={disabled || loading}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}
      style={{ ...base, ...variants[variant], ...(hover && !disabled ? { background: hoverBg } : {}), ...disabledStyle, ...style }}>
      {loading ? <Spinner size={15} onFill={variant === 'primary' || variant === 'danger'} /> : (icon && <Icon name={icon} size={14} />)}
      {children}
      {iconRight && <Icon name={iconRight} size={14} />}
    </button>
  );
}

/* ---------------- Input ----------------
   `onBlur(value)` — fires the field's value (not the event) on blur; used by
   the async field-level uniqueness check (§J). `helper` — muted sub-label text
   rendered UNDER the field; SUPPRESSED while an `error` shows (error wins).
   `error` may be a boolean (red border only) or a string (red border + message). */
function Input({ icon, value, onChange, placeholder, type = 'text', error, style, onFocus, onBlur, helper }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      {icon && (
        <span style={{ position: 'absolute', left: 10, top: 18, transform: 'translateY(-50%)', color: 'var(--p-placeholder)', pointerEvents: 'none', display: 'flex' }}>
          <Icon name={icon} size={14} />
        </span>
      )}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={(e) => { setFocus(true); onFocus?.(e); }}
        onBlur={(e) => { setFocus(false); onBlur?.(e.target.value); }}
        style={{
          width: '100%', height: 36, padding: icon ? '0 12px 0 32px' : '0 12px',
          border: `1px solid ${error ? 'var(--p-danger)' : focus ? 'var(--p-primary)' : 'var(--p-border-strong)'}`,
          borderRadius: 4, font: '400 14px Inter, sans-serif', color: 'var(--p-ink)', background: '#fff',
          outline: 'none', boxShadow: focus ? '0 0 0 3px rgba(21,93,252,.15)' : 'none',
          transition: 'border-color .12s, box-shadow .12s',
          boxSizing: 'border-box',
        }} />
      {error
        ? (typeof error === 'string'
            ? <div className="g-error" style={{ font: '500 12px/1.4 Inter, sans-serif', color: 'var(--p-danger)', marginTop: 4 }}>{error}</div>
            : null)
        : (helper
            ? <div style={{ font: '400 13px/1.4 Inter, sans-serif', color: 'var(--p-muted)', marginTop: 4 }}>{helper}</div>
            : null)}
    </div>
  );
}

/* ---------------- Toggle (Foundation style) ---------------- */
function Toggle({ on, onChange }) {
  return (
    <span onClick={() => onChange?.(!on)} style={{ width: 37, height: 20, position: 'relative', cursor: 'pointer', display: 'inline-block' }}>
      <span style={{ position: 'absolute', left: 0, top: 3, width: 29, height: 14, borderRadius: 10, background: on ? 'rgba(0,124,255,.25)' : '#DADADA', transition: 'background .15s' }} />
      <span style={{ position: 'absolute', top: 0, left: on ? 17 : 0, width: 20, height: 20, borderRadius: '50%', background: on ? '#007CFF' : '#fff', border: on ? '.5px solid #007CFF' : '.5px solid #DADADA', boxShadow: '0 1px 2px rgba(0,0,0,.25)', transition: 'left .15s, background .15s, border-color .15s' }} />
    </span>
  );
}

/* ---------------- Checkbox ---------------- */
function Checkbox({ on, onChange }) {
  return (
    <span onClick={() => onChange?.(!on)} style={{
      width: 18, height: 18, borderRadius: 3, cursor: 'pointer',
      border: on ? '1.5px solid var(--p-primary)' : '1.5px solid var(--p-border-strong)',
      background: on ? 'var(--p-primary)' : '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
      flexShrink: 0,
    }}>
      {on && <Icon name="check" size={14} />}
    </span>
  );
}

/* ---------------- Pill (category) ---------------- */
function Pill({ kind = 'Beer', children }) {
  const map = {
    Beer:    { bg: 'var(--p-pill-beer-bg)',    fg: 'var(--p-pill-beer-fg)' },
    Wine:    { bg: 'var(--p-pill-wine-bg)',    fg: 'var(--p-pill-wine-fg)' },
    Spirits: { bg: 'var(--p-pill-spirits-bg)', fg: 'var(--p-pill-spirits-fg)' },
    RTD:     { bg: 'var(--p-pill-rtd-bg)',     fg: 'var(--p-pill-rtd-fg)' },
    'Non-Alcoholic': { bg: 'var(--p-pill-nonalc-bg)', fg: 'var(--p-pill-nonalc-fg)' },
  };
  const c = map[kind] || map.Beer;
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: 999, background: c.bg, color: c.fg, font: '500 12px/1.5 Inter, sans-serif', letterSpacing: '.02em', whiteSpace: 'nowrap' }}>{children || kind}</span>;
}

/* ---------------- Chip (micro status) ----------------
   Smallest inline indicator: ~19px soft-tinted pill + optional 12px icon.
   No dot (that's Status Badge); smaller than a category Pill. */
const CHIP_TONES = {
  neutral: { bg: 'var(--p-surface-tint)', fg: 'var(--p-text-2)' },
  info:    { bg: 'var(--p-primary-tint)', fg: 'var(--p-primary-ink)' },
  amber:   { bg: 'var(--g-gold-10)',      fg: 'var(--p-warning)' },
  atrisk:  { bg: 'var(--g-orange-10)',    fg: 'var(--p-atrisk-strong)' },  // soft orange between amber & danger — "At Risk" / "~N draining" (§C)
  danger:  { bg: 'var(--g-red-10)',       fg: 'var(--p-danger-strong)' },
  success: { bg: '#ECFDF5',               fg: '#047857' },
};
function Chip({ tone = 'neutral', icon, children, title, style }) {
  const t = CHIP_TONES[tone] || CHIP_TONES.neutral;
  return (
    <span title={title} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, height: 19, padding: '0 7px', borderRadius: 999, background: t.bg, color: t.fg, font: '600 10.5px/1 Inter, sans-serif', whiteSpace: 'nowrap', flexShrink: 0, ...style }}>
      {icon && <Icon name={icon} size={12} color="currentColor" />}{children}
    </span>
  );
}

/* ---------------- ChipToggle (boolean attribute pill) ---------------- */
function ChipToggle({ on, onClick, icon, label }) {
  return (
    <button onClick={onClick} title={label}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 26, padding: '0 9px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
        border: `1px solid ${on ? 'var(--p-primary)' : 'var(--p-border-strong)'}`, background: on ? 'var(--p-primary-tint)' : '#fff',
        color: on ? 'var(--p-primary-ink)' : 'var(--p-muted)', font: '500 12px/1 Inter, sans-serif' }}>
      <Icon name={icon} size={13} color={on ? 'var(--p-primary)' : 'var(--p-placeholder)'} /> {label}
    </button>
  );
}

/* ---------------- Account Type Icon + Pill (§D) ----------------
   The canonical mark + label for an Account's type (Retail Store, Restaurant,
   Grocery, C-Store, Bar, Discount Store). AccountTypeIcon: white disc, thin
   neutral ring, dark outline glyph (glyph = container × 0.5). AccountTypePill:
   neutral gray category pill that names the type. Pass an explicit `icon` to
   override the type→glyph map; `ring={false}` inside a container that already
   provides one. Extend ACCOUNT_TYPE_ICONS as new types appear (default storefront). */
const ACCOUNT_TYPE_ICONS = {
  'Retail Store': 'storefront',
  'Restaurant': 'fastfood',
  'Grocery': 'shopping_cart',
  'C-Store': 'local_convenience_store',
  'Bar': 'local_bar',
  'Discount Store': 'attach_money',
};
function AccountTypeIcon({ type, icon, size = 32, ring = true }) {
  const name = icon || ACCOUNT_TYPE_ICONS[type] || 'storefront';
  return (
    <span style={{ width: size, height: size, borderRadius: '50%', background: '#fff',
      border: ring ? '1.5px solid #DDE1E6' : 'none', color: '#1C1C1E',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon name={name} size={Math.round(size * 0.5)} color="#1C1C1E" />
    </span>
  );
}
function AccountTypePill({ type }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px',
      borderRadius: 999, background: '#F3F4F6', color: '#4A5565',
      font: '500 12px/1.5 Inter', letterSpacing: '.02em', whiteSpace: 'nowrap' }}>
      {type}
    </span>
  );
}

/* ---------------- FilterChip ---------------- */
function FilterChip({ icon = 'filter_list', label, count, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px',
      background: '#fff', borderRadius: 6, cursor: 'pointer',
      border: `1px solid ${active ? 'var(--p-primary)' : 'var(--p-border-strong)'}`,
      color: active ? 'var(--p-primary)' : 'var(--p-ink)',
      font: '500 14px/1 Inter, sans-serif',
    }}>
      <Icon name={icon} size={12} color={active ? 'var(--p-primary)' : 'var(--p-muted)'} />
      {label}
      {count != null && (
        <span style={{ background: active ? 'var(--p-primary-soft)' : 'var(--g-off-white)', color: active ? 'var(--p-primary)' : 'var(--p-muted)', padding: '1px 6px', borderRadius: 999, font: '500 11px Geist Mono, monospace', marginLeft: 2 }}>{count}</span>
      )}
      <Icon name="expand_more" size={14} color={active ? 'var(--p-primary)' : 'var(--p-muted)'} />
    </button>
  );
}

/* ---------------- SegmentedTabs — page-level underlined ---------------- */
function SegmentedTabs({ value, onChange, items }) {
  return (
    <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid var(--p-border)', padding: '0 4px' }}>
      {items.map((it) => {
        const on = value === it.id;
        return (
          <button key={it.id} onClick={() => onChange?.(it.id)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 16px', marginBottom: -1,
            border: 'none', borderBottom: `2px solid ${on ? '#007CFF' : 'transparent'}`,
            background: 'transparent', cursor: 'pointer',
            color: on ? '#007CFF' : '#4A5565',
            font: '600 15px/1 Inter, sans-serif',
            letterSpacing: '-0.005em',
          }}>
            {it.icon && <Icon name={it.icon} size={16} color={on ? '#007CFF' : '#4A5565'} />}
            {it.label}
            {it.count != null && (
              <span style={{
                font: '500 11px Geist Mono, monospace',
                color: on ? '#007CFF' : 'var(--p-muted)',
                background: on ? 'rgba(0,124,255,.12)' : 'var(--g-off-white)',
                padding: '1px 6px', borderRadius: 999,
              }}>{it.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- StatCard count-up (ease-out-quart + coupled opacity) ----------------
   Parse a value ("30%", "15.1k", 4.9, "1,234", "—") into an animatable numeric core +
   prefix/suffix and count up from 0 on mount / value change. Reduced-motion aware. */
function parseStatValue(value) {
  const str = String(value);
  const m = str.match(/[\d,]*\.?\d+/);
  if (!m) return null;
  const raw = m[0];
  const target = parseFloat(raw.replace(/,/g, ''));
  if (!isFinite(target)) return null;
  const dot = raw.indexOf('.');
  return { prefix: str.slice(0, m.index), suffix: str.slice(m.index + raw.length), target,
    decimals: dot === -1 ? 0 : raw.length - dot - 1, grouped: raw.includes(',') };
}
function formatStat(n, decimals, grouped) {
  return grouped
    ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : n.toFixed(decimals);
}
function useCountUp(value, duration = 760) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const [state, setState] = useState(() =>
    parsed ? { text: parsed.prefix + formatStat(0, parsed.decimals, parsed.grouped) + parsed.suffix, op: 0 }
           : { text: String(value), op: 1 });
  const rafRef = useRef(0);
  useEffect(() => {
    if (!parsed) { setState({ text: String(value), op: 1 }); return; }
    const reduce = typeof window !== 'undefined' && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const full = parsed.prefix + formatStat(parsed.target, parsed.decimals, parsed.grouped) + parsed.suffix;
    if (reduce || parsed.target === 0) { setState({ text: full, op: 1 }); return; }
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 4); // ease-out-quart (no bounce)
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const num = parsed.prefix + formatStat(parsed.target * ease(t), parsed.decimals, parsed.grouped) + parsed.suffix;
      const op = Math.min(1, 0.15 + t * 1.9); // fully opaque by ~t=0.45
      setState({ text: num, op });
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [parsed, value, duration]);
  return state; // { text, op }
}

/* ---------------- StatCard ----------------
   Values count up from 0 (ease-out-quart + fade). Drill-in: pass `onClick` (filter
   shortcut) + `active` (live target → border/ring/link adopt its color). Omit
   `action` for an INFORMATIONAL StatCard (a pure KPI with no drill-in). */
function StatCard({ value, label, color = 'ink', action, active, onClick }) {
  const colors = { ink: 'var(--p-ink)', blue: 'var(--p-primary)', green: 'var(--p-success)', red: 'var(--p-danger)', gold: 'var(--p-warning)' };
  const c = colors[color] || colors.ink;
  const { text: animated, op: animOp } = useCountUp(value);
  return (
    <div onClick={onClick} style={{ background: '#fff', border: `1px solid ${active ? c : 'var(--p-border)'}`, borderRadius: 6, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'baseline', boxShadow: active ? `inset 0 0 0 1px ${c}, var(--shadow-card)` : 'var(--shadow-card)', cursor: onClick ? 'pointer' : 'default', transition: 'border-color .12s, box-shadow .12s' }}>
      <span style={{ font: "700 20px/1 'Geist Mono', monospace", color: c, opacity: animOp }}>{animated}</span>
      <span style={{ font: '400 14px/1.3 Inter, sans-serif', color: 'var(--p-text-2)' }}>{label}</span>
      {action && <span style={{ marginLeft: 'auto', font: '500 12px/1 Inter, sans-serif', color: active ? c : 'var(--p-muted)', cursor: 'pointer', textDecoration: 'underline', textDecorationColor: active ? c : '#C4C9D2', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>{action}</span>}
    </div>
  );
}

/* ---------------- Tooltip (portal-rendered) ----------------
   Dark hover popover rendered into document.body via ReactDOM.createPortal
   (position:fixed, z-index 4000). It tracks the anchor with getBoundingClientRect
   on hover and clamps its center to the viewport [90, innerWidth−90], so it never
   clips inside scrolling tables, transformed cards, or map overlays — and floats
   above modals/popovers/the map overlay. `maxWidth` (px) switches to multi-line
   wrap (required for copy longer than ~6 words); `side="bottom"` opens downward.
   Re-measures on each open (hover) — for anchors that move while shown, re-open.
   (1.4: replaces the 1.2 absolutely-positioned implementation; maxWidth preserved.) */
function Tooltip({ text, children, side = 'top', maxWidth }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Clamp the horizontal center so the translateX(-50%) bubble stays on-screen.
    const cx = Math.min(Math.max(r.left + r.width / 2, 90), window.innerWidth - 90);
    setCoords({ top: side === 'top' ? r.top - 6 : r.bottom + 6, left: cx });
  };
  const open = () => { update(); setShow(true); };

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={open} onMouseLeave={() => setShow(false)}>
      {children}
      {show && text && ReactDOM.createPortal(
        <span role="tooltip" style={{
          position: 'fixed', top: coords.top, left: coords.left,
          transform: side === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
          whiteSpace: maxWidth ? 'normal' : 'nowrap',
          width: maxWidth,
          maxWidth: maxWidth ? `min(${maxWidth}px, calc(100vw - 24px))` : 'calc(100vw - 24px)',
          background: 'var(--p-ink)', color: '#fff',
          font: `500 11px/${maxWidth ? '1.5' : '1.3'} Inter, sans-serif`,
          padding: maxWidth ? '7px 10px' : '4px 8px',
          borderRadius: 6, boxShadow: 'var(--shadow-float)',
          zIndex: 4000, pointerEvents: 'none', textAlign: 'left',
        }}>{text}</span>,
        document.body
      )}
    </span>
  );
}

/* ---------------- CountDeltaCell — count + pending +N / −N deep-link chips ----------------
   A carried count followed by clickable green +N / red −N mono chips (pending adds /
   discontinues). Counts are NOT netted (+5 and −2 both show). The minus is U+2212 (−),
   not a hyphen. Distinct from Chip (status flags) — these are signed numeric deltas. */
function CountDeltaCell({ count = 0, adds = 0, discontinues = 0, onAdds, onDiscontinues, unit = 'product', testid }) {
  if (!count && !adds && !discontinues)
    return <span style={{ font: '400 13px Inter', color: 'var(--p-placeholder)' }} data-testid={testid}>—</span>;
  const chip = { font: "500 11px 'Geist Mono', monospace", padding: '2px 7px', borderRadius: 999, border: 'none' };
  const stop = (fn) => (e) => { e.stopPropagation(); fn && fn(); };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }} data-testid={testid}>
      <Tooltip text={`${count} ${unit}${count === 1 ? '' : 's'} carried at this store`}>
        <span style={{ font: "500 13px 'Geist Mono', monospace", color: count ? 'var(--p-text)' : 'var(--p-placeholder)', cursor: 'default' }}>{count}</span>
      </Tooltip>
      {adds > 0 && (
        <Tooltip text={`${adds} pending addition${adds === 1 ? '' : 's'} — view in POD Planner`}>
          <button onClick={stop(onAdds)} style={{ ...chip, color: 'var(--p-success)', background: 'var(--g-green-10)', cursor: onAdds ? 'pointer' : 'default' }}>+{adds}</button>
        </Tooltip>
      )}
      {discontinues > 0 && (
        <Tooltip text={`${discontinues} pending discontinue${discontinues === 1 ? '' : 's'} — view in POD Planner`}>
          <button onClick={stop(onDiscontinues)} style={{ ...chip, color: 'var(--p-danger)', background: 'var(--g-red-10)', cursor: onDiscontinues ? 'pointer' : 'default' }}>−{discontinues}</button>
        </Tooltip>
      )}
    </span>
  );
}

/* ---------------- InfoBanner ---------------- */
function InfoBanner({ tone = 'info', children }) {
  const tones = {
    info: { bg: 'var(--p-primary-tint)', fg: 'var(--p-ink)' },
    amber: { bg: 'var(--g-gold-10)', fg: 'var(--p-ink)' },
    danger: { bg: 'rgba(255,107,107,.12)', fg: 'var(--p-danger-strong)' },
  };
  return <div style={{ background: tones[tone].bg, color: tones[tone].fg, borderRadius: 8, padding: '10px 12px', font: '400 14px/1.4 Inter, sans-serif' }}>{children}</div>;
}

/* ---------------- Show / Hide Stats — per-page persisted toggle ---------------- */
function useStatsVisible(key) {
  const storageKey = `gr-stats-visible:${key}`;
  const [visible, setVisible] = useState(() => {
    try { const v = localStorage.getItem(storageKey); return v === null ? true : v === '1'; } catch (e) { return true; }
  });
  useEffect(() => { try { localStorage.setItem(storageKey, visible ? '1' : '0'); } catch (e) {} }, [storageKey, visible]);
  return [visible, setVisible];
}

function StatsToggle({ visible, onToggle }) {
  return (
    <Button variant="neutral" icon={visible ? 'visibility_off' : 'visibility'} onClick={onToggle}>
      {visible ? 'Hide Stats' : 'Show Stats'}
    </Button>
  );
}

Object.assign(window, { Icon, Logo, Crow, Button, Input, Toggle, Checkbox, Pill, Chip, ChipToggle, AccountTypeIcon, AccountTypePill, ACCOUNT_TYPE_ICONS, FilterChip, SegmentedTabs, StatCard, CountDeltaCell, InfoBanner, Tooltip, StatsToggle, useStatsVisible });
