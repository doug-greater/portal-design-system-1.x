// Portal UI Kit — Feedback
// Toast (+ ToastHost / window.toast), Spinner, Skeleton, EmptyState.
// Material Symbols (uses the shared window.MIcon from overlays.jsx).
// Load AFTER primitives.jsx and overlays.jsx.

(function injectFeedbackCSS() {
  if (document.getElementById('g-feedback-css')) return;
  const s = document.createElement('style');
  s.id = 'g-feedback-css';
  s.textContent = `
    @keyframes g-rot { to { transform: rotate(360deg); } }
    @keyframes g-shim { 100% { transform: translateX(100%); } }
    @keyframes g-toast-in { from { transform: translateY(-10px); } to { transform: translateY(0); } }
    @media (prefers-reduced-motion: reduce) { [style*="g-toast-in"]{ animation: none !important; } }
  `;
  document.head.appendChild(s);
})();

/* ---------------- Toast ----------------
   Mount <ToastHost/> once near the app root, then call window.toast(msg, tone, ttl).
   tone: 'success' (default) | 'error'. */
function Toast({ tone = 'success', children, onClose }) {
  const bg = tone === 'error' ? 'var(--p-danger)' : 'var(--p-success)';
  return (
    <div role="status" style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '13px 22px 13px 18px', borderRadius: 12, background: bg, color: '#fff',
      font: '500 16px/1.2 Inter, sans-serif', letterSpacing: '-.005em',
      boxShadow: '0 6px 16px rgba(0,0,0,.14), 0 2px 4px rgba(0,0,0,.08)', whiteSpace: 'nowrap',
    }}>
      <MIcon name={tone === 'error' ? 'error' : 'check'} size={22} fill={tone === 'error' ? 1 : 0} color="#fff" />
      <span>{children}</span>
      {onClose && (
        <span onClick={onClose} style={{ marginLeft: 6, width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, opacity: .8, cursor: 'pointer' }}>
          <MIcon name="close" size={18} color="#fff" />
        </span>
      )}
    </div>
  );
}

function ToastHost() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    let id = 0;
    window.toast = (msg, tone = 'success', ttl) => {
      const key = ++id;
      setItems((l) => [...l, { key, msg, tone }]);
      setTimeout(() => setItems((l) => l.filter((t) => t.key !== key)), ttl || (tone === 'error' ? 6000 : 4000));
    };
    return () => { delete window.toast; };
  }, []);
  return (
    <div style={{ position: 'fixed', top: 18, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', pointerEvents: 'none' }}>
      {items.map((t) => (
        <div key={t.key} style={{ pointerEvents: 'auto', animation: 'g-toast-in .18s ease-out' }}>
          <Toast tone={t.tone} onClose={() => setItems((l) => l.filter((x) => x.key !== t.key))}>{t.msg}</Toast>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Spinner ---------------- */
function Spinner({ size = 20, onFill = false }) {
  const bw = size <= 16 ? 2 : size >= 24 ? 3 : 2.5;
  return <span style={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', border: `${bw}px solid ${onFill ? 'rgba(255,255,255,.4)' : 'var(--p-border)'}`, borderTopColor: onFill ? '#fff' : 'var(--p-primary)', animation: 'g-rot .7s linear infinite' }} />;
}

/* ---------------- Skeleton ---------------- */
function Skeleton({ width = '100%', height = 12, radius = 4, circle = false, style }) {
  return (
    <span style={{ display: 'block', width, height, borderRadius: circle ? '50%' : radius, background: '#EDEFF2', position: 'relative', overflow: 'hidden', ...style }}>
      <span style={{ position: 'absolute', inset: 0, transform: 'translateX(-100%)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.65), transparent)', animation: 'g-shim 1.3s ease-in-out infinite' }} />
    </span>
  );
}

/* ---------------- EchoPulse — branded post-auth loading mark ----------------
   The raven inside two expanding intelligence-gradient rings. The .echo-pulse
   class + ep-echo keyframes live in colors_and_type.css (disabled under
   prefers-reduced-motion). Use ONLY for the auth → portal transition.
   The host loader screen (FullScreenLoader / post-auth overlay) sits on
   --p-shell; the mark itself is transparent, so it needs no change. */
function EchoPulse({ size = 92, ring = 150, speed = '2.4s', label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
      <div className="echo-pulse" style={{ '--ep-size': `${size}px`, '--ep-ring': `${ring}px`, '--ep-speed': speed }}>
        <img src="../../assets/greater-crow.png" alt="Greater" draggable="false" />
      </div>
      {label && <div style={{ font: "500 13px/1 'Geist Mono', monospace", color: 'var(--p-muted)', letterSpacing: '.02em' }}>{label}</div>}
    </div>
  );
}

/* ---------------- EmptyState ---------------- */
function EmptyState({ icon = 'inbox', title, body, action, dashed = false, inTable = false }) {
  return (
    <div style={{
      border: inTable ? 'none' : dashed ? '1px dashed var(--p-border-strong)' : '1px solid var(--p-border)',
      borderRadius: inTable ? 0 : 10, background: dashed ? '#FBFCFD' : '#fff',
      padding: inTable ? '44px 24px' : '48px 28px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
    }}>
      <span style={{ width: 56, height: 56, borderRadius: '50%', background: dashed ? '#fff' : 'var(--p-surface-tint)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p-muted)', marginBottom: 16 }}><MIcon name={icon} size={28} /></span>
      <h3 style={{ margin: '0 0 6px', font: '600 16px/1.3 Inter, sans-serif', color: 'var(--p-ink)' }}>{title}</h3>
      {body && <p style={{ margin: '0 0 18px', font: '400 14px/1.5 Inter, sans-serif', color: 'var(--p-muted)', maxWidth: 320 }}>{body}</p>}
      {action && <div style={{ display: 'flex', gap: 8 }}>{action}</div>}
    </div>
  );
}

Object.assign(window, { Toast, ToastHost, Spinner, Skeleton, EmptyState, EchoPulse });
