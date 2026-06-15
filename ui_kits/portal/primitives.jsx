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
    primary:   { background: 'var(--p-action)', color: 'var(--p-action-fg)' },
    secondary: { background: 'var(--p-surface)', color: 'var(--p-ink)', borderColor: 'var(--p-ink)' },
    warning:   { background: '#fff', color: '#E5484D', borderColor: '#E5484D' },
    danger:    { background: '#E5484D', color: '#fff' },
    neutral:   { background: '#fff', color: '#364153', borderColor: '#D1D5DC' },
    ghost:     { background: 'transparent', color: 'var(--p-text)', padding: '0 12px', minWidth: 0 },
    neo:       { background: '#fff', color: '#000', border: '1px solid #000', boxShadow: '2px 2px 0 0 #000', letterSpacing: '.05em', height: 39, padding: '0 30px', minWidth: 120, fontSize: 16 },
  };
  const [hover, setHover] = useState(false);
  const hoverBg = {
    primary:   'var(--p-action-hover)',
    secondary: 'var(--p-surface-tint)',
    warning:   'rgba(229,72,77,.05)',
    danger:    '#C93B40',
    neutral:   '#F3F4F6',
    ghost:     'var(--p-surface-tint)',
    neo:       '#F0F7FF',
  }[variant];
  const disabledStyle = disabled ? ({
    primary:   { background: 'var(--p-action-disabled-bg)', color: 'var(--p-action-disabled-fg)', opacity: 1 },
    secondary: { color: 'var(--p-placeholder)', borderColor: 'var(--p-border)', opacity: 1 },
    warning:   { color: 'rgba(229,72,77,.25)', borderColor: 'rgba(229,72,77,.25)', opacity: 1 },
    danger:    { background: 'rgba(229,72,77,.45)', color: '#fff', opacity: 1 },
    neutral:   { background: '#fff', color: '#99A1AF', borderColor: '#E5E7EB', opacity: 1 },
    ghost:     { color: 'var(--p-placeholder)', opacity: 1 },
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
   `error` may be a boolean (red border only) or a string (red border + message).
   `disabled` (1.5): readOnly + tinted bg + not-allowed cursor, no focus ring. */
/* Shared search-syntax hint (the `?` affordance teaches the query grammar — §9 Search). */
const SEARCH_HINT = (
  <span style={{ display: 'grid', gap: 4 }}>
    <span style={{ fontWeight: 700, marginBottom: 1 }}>Search tips</span>
    <span><code>wine red</code> — match both (AND)</span>
    <span><code>wine OR beer</code> — match either</span>
    <span><code>"red wine"</code> — exact phrase</span>
    <span style={{ opacity: .72 }}>Ignores case &amp; accents</span>
  </span>
);

function Input({ icon, value, onChange, placeholder, type = 'text', error, style, inputStyle, onKeyDown, autoFocus, name, clearable, onClear, hint, onFocus, onBlur, helper, disabled, ...rest }) {
  const [focus, setFocus] = useState(false);
  const hasValue = value != null && String(value).length > 0;
  // Auto-clear on search fields; opt-in elsewhere via `clearable`. Renders only when filled.
  const showClear = (clearable ?? icon === 'search') && hasValue && !disabled;
  const showHint = !!hint && !hasValue && !disabled;   // ✕ and ? share the right slot
  const rightPad = (showClear || showHint) ? 32 : 12;
  const clear = () => { if (onClear) onClear(); else onChange?.({ target: { value: '' } }); };
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      {icon && (
        <span style={{ position: 'absolute', left: 10, top: 18, transform: 'translateY(-50%)', color: 'var(--p-placeholder)', pointerEvents: 'none', display: 'flex' }}>
          <Icon name={icon} size={14} />
        </span>
      )}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        name={name} autoFocus={autoFocus} onKeyDown={onKeyDown}
        disabled={disabled} readOnly={disabled}
        onFocus={(e) => { if (disabled) return; setFocus(true); onFocus?.(e); }}
        onBlur={(e) => { setFocus(false); onBlur?.(e.target.value); }}
        style={{
          width: '100%', height: 36, padding: icon ? `0 ${rightPad}px 0 32px` : `0 ${rightPad}px`,
          border: `1px solid ${error ? 'var(--p-danger)' : focus ? 'var(--p-primary)' : 'var(--p-border-strong)'}`,
          borderRadius: 4, font: '400 14px Inter, sans-serif',
          color: disabled ? 'var(--p-placeholder)' : 'var(--p-ink)',
          background: disabled ? 'var(--p-surface-tint)' : '#fff',
          cursor: disabled ? 'not-allowed' : 'text',
          outline: 'none', boxShadow: focus && !disabled ? '0 0 0 3px var(--p-focus-ring)' : 'none',
          transition: 'border-color .12s, box-shadow .12s',
          boxSizing: 'border-box', ...inputStyle,
        }} {...rest} />
      {showClear && (
        <button type="button" aria-label="Clear search" data-testid="input-clear"
          onMouseDown={(e) => e.preventDefault()} onClick={clear}
          style={{ position: 'absolute', right: 8, top: 18, transform: 'translateY(-50%)', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', color: 'var(--p-muted)', display: 'flex' }}>
          <Icon name="close" size={15} />
        </button>
      )}
      {showHint && (
        <span data-testid="input-hint" style={{ position: 'absolute', right: 8, top: 18, transform: 'translateY(-50%)', display: 'flex' }}>
          <Tooltip text={hint === true ? SEARCH_HINT : hint} side="bottom" maxWidth={260}>
            <span style={{ color: 'var(--p-placeholder)', cursor: 'help', display: 'flex' }}><Icon name="help" size={15} /></span>
          </Tooltip>
        </span>
      )}
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

/* ---------------- Toggle (Foundation style) ----------------
   `color` overrides the "on" fill (default --p-primary) for concept-colored switches,
   e.g. the General Stock toggle passes color="var(--p-genstock)". */
function Toggle({ on, onChange, disabled, color }) {
  const fill = color || '#007CFF';
  const track = on ? (color ? `color-mix(in srgb, ${color} 30%, transparent)` : 'rgba(0,124,255,.25)') : '#DADADA';
  return (
    <span onClick={() => !disabled && onChange?.(!on)} style={{ width: 37, height: 20, position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-block', opacity: disabled ? .5 : 1 }}>
      <span style={{ position: 'absolute', left: 0, top: 3, width: 29, height: 14, borderRadius: 10, background: track, transition: 'background .15s' }} />
      <span style={{ position: 'absolute', top: 0, left: on ? 17 : 0, width: 20, height: 20, borderRadius: '50%', background: on ? fill : '#fff', border: on ? `.5px solid ${fill}` : '.5px solid #DADADA', boxShadow: '0 1px 2px rgba(0,0,0,.25)', transition: 'left .15s, background .15s, border-color .15s' }} />
    </span>
  );
}

/* ---------------- Checkbox ----------------
   `disabled` (1.5): muted (tinted box, placeholder-grey check), ignores clicks. */
function Checkbox({ on, onChange, disabled }) {
  return (
    <span onClick={() => !disabled && onChange?.(!on)} style={{
      width: 18, height: 18, borderRadius: 3, cursor: disabled ? 'not-allowed' : 'pointer',
      border: `1.5px solid ${disabled ? 'var(--p-border-strong)' : on ? 'var(--p-primary)' : 'var(--p-border-strong)'}`,
      background: disabled ? 'var(--p-surface-tint)' : on ? 'var(--p-primary)' : '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      color: disabled ? 'var(--p-placeholder)' : '#fff', flexShrink: 0,
    }}>
      {on && <Icon name="check" size={14} color="currentColor" />}
    </span>
  );
}

/* ---------------- Select ----------------
   DS-styled native select (4px radius, 36px). `options` = strings or
   {value,label}. `disabled` (1.5): swaps the trailing `expand_more` chevron
   for a `lock` glyph, tints the field, and is inert (native disabled — does
   not open). The canonical control for read-only / capability-locked dropdowns. */
function Select({ value, onChange, options = [], placeholder, disabled, style }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <select value={value} onChange={(e) => onChange?.(e.target.value)} disabled={disabled}
        style={{
          width: '100%', height: 36, padding: '0 34px 0 12px', appearance: 'none', WebkitAppearance: 'none',
          border: '1px solid var(--p-border-strong)', borderRadius: 4, font: '400 14px Inter, sans-serif',
          color: disabled ? 'var(--p-placeholder)' : 'var(--p-ink)',
          background: disabled ? 'var(--p-surface-tint)' : '#fff',
          cursor: disabled ? 'not-allowed' : 'pointer', outline: 'none', boxSizing: 'border-box',
        }}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const val = typeof o === 'string' ? o : o.value;
          const lbl = typeof o === 'string' ? o : o.label;
          return <option key={val} value={val}>{lbl}</option>;
        })}
      </select>
      <span style={{ position: 'absolute', right: 10, top: 18, transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--p-placeholder)', display: 'flex' }}>
        <Icon name={disabled ? 'lock' : 'expand_more'} size={disabled ? 14 : 18} />
      </span>
    </div>
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
function Chip({ tone = 'neutral', icon, iconRight, children, title, testid, style }) {
  const t = CHIP_TONES[tone] || CHIP_TONES.neutral;
  return (
    <span title={title} data-testid={testid} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, height: 19, padding: '0 7px', borderRadius: 999, background: t.bg, color: t.fg, font: '600 10.5px/1 Inter, sans-serif', whiteSpace: 'nowrap', flexShrink: 0, ...style }}>
      {icon && <Icon name={icon} size={12} color="currentColor" />}{children}{iconRight && <Icon name={iconRight} size={12} color="currentColor" />}
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
            border: 'none', borderBottom: `2px solid ${on ? 'var(--p-ink)' : 'transparent'}`,
            background: 'transparent', cursor: 'pointer',
            color: on ? 'var(--p-ink)' : 'var(--p-text-2)',
            font: '600 15px/1 Inter, sans-serif',
            letterSpacing: '-0.005em',
          }}>
            {it.icon && <Icon name={it.icon} size={16} color={on ? 'var(--p-ink)' : 'var(--p-text-2)'} />}
            {it.label}
            {it.count != null && (
              <span style={{
                font: '500 11px Geist Mono, monospace',
                color: on ? 'var(--p-text)' : 'var(--p-muted)',
                background: on ? 'var(--p-surface-tint)' : 'var(--g-off-white)',
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
function Tooltip({ text, children, side = 'top', maxWidth, z = 4000 }) {
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
          zIndex: z, pointerEvents: 'none', textAlign: 'left',
        }}>{text}</span>,
        document.body
      )}
    </span>
  );
}

/* ---------------- searchQuery (lib/searchQuery.js) ----------------
   Portal-wide query grammar — implemented once here, mirrored on the backend
   (search_utils.py); the two MUST stay in sync. AND by default · a bare,
   exactly-uppercase OR flips to OR · "quoted" = exact phrase · case- &
   accent-insensitive (NFKD + strip combining marks). */
const TOKEN_RE = /"([^"]*)"|(\S+)/g;

function normalize(s) {
  if (!s) return '';
  return String(s).normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

function parseQuery(q) {
  let mode = 'and'; const tokens = [];
  TOKEN_RE.lastIndex = 0; let m;
  while ((m = TOKEN_RE.exec(q || '')) !== null) {
    if (m[1] !== undefined) { const p = normalize(m[1]); if (p) tokens.push(p); }   // quoted phrase
    else { const raw = m[2]; if (raw === 'OR') { mode = 'or'; continue; }            // bare uppercase OR
           const t = normalize(raw); if (t) tokens.push(t); }
  }
  return { mode, tokens };
}

function matchesQuery(q, text) {
  const { mode, tokens } = parseQuery(q);
  if (!tokens.length) return true;
  const h = normalize(text);
  return mode === 'or' ? tokens.some((t) => h.includes(t)) : tokens.every((t) => h.includes(t));
}

/* matchRanges(text, q): merged [start,end) ranges in ORIGINAL-string coords, via a
   per-character diacritic fold + index map, so highlights survive accents. */
function matchRanges(text, q) {
  const t = text == null ? '' : String(text);
  const { tokens } = parseQuery(q);
  if (!tokens.length || !t) return [];
  let folded = ''; const idx = [];
  for (let i = 0; i < t.length; i++) {
    const f = normalize(t[i]);
    for (let k = 0; k < f.length; k++) idx.push(i);
    folded += f;
  }
  const ranges = [];
  for (const tok of tokens) {
    let from = 0, at;
    while ((at = folded.indexOf(tok, from)) !== -1) {
      ranges.push([idx[at], idx[at + tok.length - 1] + 1]);
      from = at + tok.length;
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push(r.slice());
  }
  return merged;
}

/* ---------------- Highlight (search-match wrapper) ----------------
   Wraps the substrings of `text` that satisfy `query` in <mark class="gr-hl">
   (token --p-highlight). Diacritic-folds with an index map so highlights land on
   the un-normalized characters (`pina` highlights `Piña`). Mirrors the BE matcher. */
function Highlight({ text, query }) {
  const t = text == null ? '' : String(text);
  const ranges = useMemo(() => matchRanges(t, query), [t, query]);
  if (!ranges.length) return <>{t}</>;
  const out = []; let last = 0;
  ranges.forEach(([s, e], i) => {
    if (s > last) out.push(<React.Fragment key={`p${i}`}>{t.slice(last, s)}</React.Fragment>);
    out.push(<mark key={`m${i}`} className="gr-hl">{t.slice(s, e)}</mark>);
    last = e;
  });
  if (last < t.length) out.push(<React.Fragment key="end">{t.slice(last)}</React.Fragment>);
  return <>{out}</>;
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

Object.assign(window, { Icon, Logo, Crow, Button, Input, Select, Toggle, Checkbox, Pill, Chip, ChipToggle, AccountTypeIcon, AccountTypePill, ACCOUNT_TYPE_ICONS, FilterChip, SegmentedTabs, StatCard, CountDeltaCell, InfoBanner, Tooltip, StatsToggle, useStatsVisible });
