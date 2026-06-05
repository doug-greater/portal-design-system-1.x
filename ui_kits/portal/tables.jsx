// Portal UI Kit — Tables
// Pagination (numbered pager). Material Symbols (uses shared window.MIcon from overlays.jsx).
// Load AFTER primitives.jsx and overlays.jsx.
// (The page-range helper is kept local so it never collides with per-screen pagers.)

function Pagination({ page = 1, pageCount = 1, onPage }) {
  const go = (p) => { if (onPage && p >= 1 && p <= pageCount && p !== page) onPage(p); };

  // Which page numbers to show: always first, last, and current ±1; ellipses fill the gaps.
  const range = (() => {
    const out = [];
    if (pageCount <= 7) { for (let i = 1; i <= pageCount; i++) out.push(i); return out; }
    out.push(1);
    if (page > 3) out.push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) out.push(i);
    if (page < pageCount - 2) out.push('…');
    out.push(pageCount);
    return out;
  })();

  const navBtn = (icon, target, disabled, key) => (
    <span key={key} onClick={disabled ? undefined : () => go(target)} style={{
      minWidth: 30, height: 30, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: '#fff', border: '1px solid var(--p-border-strong)',
      color: disabled ? 'var(--p-placeholder)' : 'var(--p-muted)', cursor: disabled ? 'default' : 'pointer',
    }}><MIcon name={icon} size={18} /></span>
  );

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {navBtn('chevron_left', page - 1, page <= 1, 'prev')}
      {range.map((p, i) => p === '…'
        ? <span key={'e' + i} style={{ minWidth: 22, textAlign: 'center', color: 'var(--p-placeholder)', font: '500 13px Inter, sans-serif' }}>…</span>
        : <span key={p} onClick={() => go(p)} style={{
            minWidth: 30, height: 30, padding: '0 8px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            font: '500 13px/1 Inter, sans-serif', cursor: 'pointer',
            background: p === page ? 'var(--p-primary)' : 'transparent', color: p === page ? '#fff' : 'var(--p-text)',
          }}>{p}</span>
      )}
      {navBtn('chevron_right', page + 1, page >= pageCount, 'next')}
    </div>
  );
}

Object.assign(window, { Pagination });
