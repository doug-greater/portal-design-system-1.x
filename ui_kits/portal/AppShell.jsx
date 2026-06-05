// App shell — persistent left nav + content area.
// Mirrors the real Greater portal side navigation: org header with city
// selector, expandable nav with solid-blue active state, bottom utility
// rows + Ops Tools toggle. Supports a collapsed (icon-only) state.

function AppShell({ currentRoute = 'route-assignments', onNavigate, userName = 'Greater CBC', children }) {
  const [expanded, setExpanded] = React.useState({ products: true });
  const [opsTools, setOpsTools] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(() => localStorage.getItem('gr-nav-collapsed') === '1');
  React.useEffect(() => { localStorage.setItem('gr-nav-collapsed', collapsed ? '1' : '0'); }, [collapsed]);

  const toggle = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  // ── Collapsed flyout: hover a collapsed icon → floating panel (sub-items, or just a label for leaves) ──
  const [flyout, setFlyout] = React.useState(null); // { item, x, y }
  const closeRef = React.useRef(null);
  const openFlyout = (item, e) => {
    if (!collapsed) return;
    clearTimeout(closeRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setFlyout({ item, x: rect.right + 6, y: rect.top - 6 });
  };
  const scheduleClose = () => { closeRef.current = setTimeout(() => setFlyout(null), 150); };
  const cancelClose = () => clearTimeout(closeRef.current);
  React.useEffect(() => { if (!collapsed) { clearTimeout(closeRef.current); setFlyout(null); } }, [collapsed]);

  const BRAND_BLUE = '#007CFF';
  const INK = '#101828';
  const GRAY_600 = '#4A5565';
  const GRAY_800 = '#1E2939';
  const BORDER_LIGHT = 'var(--p-border)';

  const nav = [
    { id: 'insights', label: 'Insights', icon: 'insights', disabled: true, children: null },
    { id: 'sales', label: 'Sales', icon: 'paid', disabled: true, children: null },
    { id: 'orchestration', label: 'Orchestration', icon: 'graph_7', disabled: true, children: null },
    { id: 'products', label: 'Products', icon: 'category', children: [
      { id: 'in-the-market', label: 'In the Market' },
    ]},
    { id: 'accounts', label: 'Accounts', icon: 'storefront', disabled: true, children: null },
    { id: 'users', label: 'Users', icon: 'group', children: null },
  ];

  const MS = (name, size = 20, color = 'currentColor') => (
    <span className="material-symbols-rounded" style={{
      fontFamily: '"Material Symbols Rounded"',
      fontWeight: 'normal', fontStyle: 'normal',
      fontSize: size, lineHeight: 1, color,
      letterSpacing: 'normal', textTransform: 'none', whiteSpace: 'nowrap',
      wordWrap: 'normal', direction: 'ltr',
      fontFeatureSettings: "'liga'",
      WebkitFontFeatureSettings: "'liga'",
      WebkitFontSmoothing: 'antialiased',
      fontVariationSettings: `'FILL' 0,'wght' 400,'GRAD' 0,'opsz' ${size}`,
      display: 'inline-block', flexShrink: 0,
    }}>{name}</span>
  );

  const ParentRow = ({ item }) => {
    const isOpen = expanded[item.id];
    const hasChildren = !!item.children;
    const groupActive = hasChildren && item.children.some((c) => c.id === currentRoute);
    const isActiveLeaf = !hasChildren && currentRoute === item.id;
    const onClick = () => hasChildren ? toggle(item.id) : onNavigate?.(item.id);

    // Inactive items (not part of this preview) render grayed-out and non-interactive.
    if (item.disabled) {
      return (
        <li style={{ listStyle: 'none' }}>
          <div style={collapsed
            ? { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, margin: '0 auto', borderRadius: 6, opacity: .4, cursor: 'default' }
            : { display: 'flex', alignItems: 'center', padding: 8, gap: 12, borderRadius: 6, opacity: .45, cursor: 'default' }}>
            {MS(item.icon, 22, '#99A1AF')}
            {!collapsed && <span style={{ flex: 1, textAlign: 'left', font: '400 15px/1.25 Inter', color: '#99A1AF' }}>{item.label}</span>}
          </div>
        </li>
      );
    }

    if (collapsed) {
      const isFlyoutOpen = flyout?.item?.id === item.id;
      const tint = isActiveLeaf || groupActive || isFlyoutOpen;
      return (
        <li style={{ listStyle: 'none' }}>
          <button
            onClick={() => { if (!hasChildren) onNavigate?.(item.id); }}
            onMouseEnter={(e) => openFlyout(item, e)}
            onMouseLeave={scheduleClose}
            style={{
              width: '100%', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer',
            }}>
            <div className="gr-row" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40, margin: '0 auto', borderRadius: 6,
              background: tint ? 'rgba(0,124,255,0.10)' : '#fff',
              color: tint ? BRAND_BLUE : INK,
              transition: 'background-color 50ms',
            }}>
              {MS(item.icon, 22, tint ? BRAND_BLUE : INK)}
            </div>
          </button>
        </li>
      );
    }

    return (
      <li style={{ listStyle: 'none' }}>
        <button onClick={onClick} style={{
          width: '100%', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer',
        }}>
          <div className={isActiveLeaf ? undefined : 'gr-row'} style={{
            display: 'flex', alignItems: 'center', padding: 8, borderRadius: 6,
            background: isActiveLeaf ? BRAND_BLUE : (groupActive ? 'rgba(0,124,255,0.10)' : '#fff'),
            color: isActiveLeaf ? '#fff' : (groupActive ? BRAND_BLUE : INK), gap: 12, transition: 'background-color 50ms',
          }}>
            {MS(item.icon, 22, isActiveLeaf ? '#fff' : (groupActive ? BRAND_BLUE : INK))}
            <span style={{ flex: 1, textAlign: 'left', font: `${isActiveLeaf || groupActive ? 500 : 400} 15px/1.25 Inter`, color: isActiveLeaf ? '#fff' : (groupActive ? BRAND_BLUE : INK) }}>{item.label}</span>
            {hasChildren && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, borderRadius: 999, color: GRAY_800,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms',
              }}>
                {MS('expand_more', 16, GRAY_800)}
              </span>
            )}
          </div>
        </button>
        {hasChildren && isOpen && (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {item.children.map((c) => {
              const on = currentRoute === c.id;
              return (
                <li key={c.id}>
                  <button onClick={() => onNavigate?.(c.id)} style={{
                    width: '100%', border: 'none', padding: 0, cursor: 'pointer', background: 'transparent',
                  }}>
                    <div className="gr-sub" data-on={on ? '1' : '0'} style={{
                      display: 'flex', alignItems: 'center', padding: '6px 8px 6px 36px',
                      borderRadius: 6,
                      background: on ? BRAND_BLUE : '#fff',
                      color: on ? '#fff' : GRAY_800,
                      font: `${on ? 500 : 400} 14px/20px Inter`,
                      transition: 'background-color 50ms',
                      minHeight: 32,
                    }}>
                      {c.label}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  const BottomRow = ({ icon, label, external, onClick, trailing }) => {
    if (collapsed) {
      return (
        <li style={{ listStyle: 'none' }}>
          <button onClick={onClick}
            onMouseEnter={(e) => openFlyout({ label, children: null }, e)}
            onMouseLeave={scheduleClose}
            style={{
              width: '100%', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer',
            }}>
            <div className="gr-util" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 36, margin: '0 auto', borderRadius: 6,
              color: GRAY_600,
            }}>
              {MS(icon, 20, GRAY_600)}
            </div>
          </button>
        </li>
      );
    }
    return (
      <li style={{ listStyle: 'none' }}>
        <button onClick={onClick} style={{
          width: '100%', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer',
        }}>
          <div className="gr-util" style={{
            display: 'flex', alignItems: 'center', padding: '0 8px', minHeight: 34,
            borderRadius: 6, background: '#fff', color: GRAY_600, gap: 12,
            font: '400 14px/20px Inter',
          }}>
            {MS(icon, 20, GRAY_600)}
            <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
            {external && MS('open_in_new', 14, '#99A1AF')}
            {trailing}
          </div>
        </button>
      </li>
    );
  };

  // Tiny toggle for Ops Tools
  const Toggle = ({ checked, onChange }) => (
    <span role="switch" aria-checked={checked} onClick={(ev)=>{ ev.stopPropagation(); onChange(!checked); }}
      style={{
        position: 'relative', display: 'inline-flex', width: 40, height: 16, borderRadius: 999,
        background: checked ? 'rgba(0,124,255,0.10)' : 'rgba(0,0,0,0.12)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)', transition: 'background 120ms', cursor: 'pointer', flexShrink: 0,
      }}>
      <span style={{
        position: 'absolute', top: '50%', left: 0, transform: `translate(${checked ? 20 : 0}px, -50%)`,
        width: 20, height: 20, borderRadius: '50%',
        background: checked ? BRAND_BLUE : '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        transition: 'transform 150ms ease-out, background 150ms',
      }}/>
    </span>
  );

  // Flyout panel — parent shows label header + children; leaf shows just the label (tooltip).
  const FlyoutPanel = ({ item }) => {
    if (!item) return null;
    return (
      <div style={{
        width: 208, background: '#fff', border: `1px solid ${BORDER_LIGHT}`,
        borderRadius: 8, boxShadow: 'var(--shadow-float)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '9px 14px 8px', font: '500 11px/1 Inter', letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--p-muted)',
          borderBottom: item.children ? `1px solid ${BORDER_LIGHT}` : 'none',
        }}>{item.label}</div>
        {item.children && (
          <ul style={{ margin: 0, padding: '4px 0', listStyle: 'none' }}>
            {item.children.map((c) => {
              const on = currentRoute === c.id;
              return (
                <li key={c.id}>
                  <button
                    className={on ? '' : 'flyout-child'}
                    onClick={() => { onNavigate?.(c.id); clearTimeout(closeRef.current); setFlyout(null); }}
                    style={{
                      width: '100%', border: 'none', padding: '7px 14px',
                      background: on ? BRAND_BLUE : 'transparent', color: on ? '#fff' : INK,
                      font: `${on ? 600 : 400} 13px/20px Inter`, cursor: 'pointer', textAlign: 'left',
                      transition: 'background 100ms', display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                    {on && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,.7)', flexShrink: 0 }} />}
                    {c.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  const W = collapsed ? 72 : 248;

  return (
    <div style={{ height: '100vh', display: 'flex', background: '#fff', overflow: 'hidden' }}>
      <style>{`
        .gr-row:hover { background: rgba(0,124,255,0.05) !important; }
        .gr-sub:hover[data-on="0"] { background: rgba(0,124,255,0.05) !important; }
        .gr-util:hover { background: #F3F4F6 !important; }
        .gr-collapse-btn:hover { background: #F3F4F6 !important; color: ${INK} !important; }
        .flyout-child:hover { background: rgba(0,124,255,0.06) !important; }
        @keyframes flyout-in { from { transform: translateX(-7px); } to { transform: translateX(0); } }
      `}</style>
      <aside style={{
        position: 'relative',
        width: W, flexShrink: 0, background: '#fff',
        display: 'block', height: '100vh', overflow: 'visible',
        borderRight: `1px solid ${BORDER_LIGHT}`,
        font: '400 16px/24px Inter', color: 'rgba(0,0,0,0.87)',
        transition: 'width 180ms ease',
      }}>
        {/* Collapse/expand button — floats on the right edge */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="gr-collapse-btn"
          title={collapsed ? 'Expand menu' : 'Collapse menu'}
          style={{
            position: 'absolute', top: 28, right: -13,
            width: 26, height: 26, borderRadius: '50%',
            border: `1px solid ${BORDER_LIGHT}`, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: GRAY_600, cursor: 'pointer', zIndex: 10,
            boxShadow: '0 1px 3px rgba(0,0,0,0.10)',
            transition: 'background 120ms, color 120ms',
            clipPath: 'none', overflow: 'visible',
          }}>
          {MS(collapsed ? 'chevron_right' : 'chevron_left', 18, GRAY_600)}
        </button>

        {/* TOP: header + primary nav — absolutely positioned, no internal scroll */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          padding: collapsed ? '28px 12px 16px' : '28px 16px 16px 24px',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 20, alignItems: collapsed ? 'center' : 'stretch' }}>
            <a href="#" onClick={(e)=>e.preventDefault()} style={{ display: 'inline-flex' }}>
              {collapsed
                ? <img src="../../assets/greater-crow.png" alt="Greater" width="28" height="30" style={{ height: 30, width: 'auto', display: 'block' }} />
                : <img src="../../assets/greater-logotype.png" alt="Greater" width="132" height="30" style={{ height: 30, width: 132, display: 'block' }} />
              }
            </a>
            {!collapsed && (
              <div>
                <p style={{ margin: 0, font: '400 14px/20px Inter', color: INK }}>Coastal Beverage Company</p>
                <div style={{ marginTop: 8, width: '100%' }}>
                  <button type="button" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', minHeight: 28, padding: '4px 4px 4px 8px', gap: 8,
                    borderRadius: 8, border: '0.5px solid #D1D5DB', background: '#fff',
                    font: '500 13px/20px Inter', color: INK, cursor: 'pointer',
                  }}>
                    <span>Elizabeth City</span>
                    {MS('arrow_drop_down', 18, GRAY_800)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Primary nav */}
          <nav data-testid="side-navigation" style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {nav.map((n) => <ParentRow key={n.id} item={n} />)}
            </ul>
          </nav>
        </div>

        {/* BOTTOM: utility nav — pinned to the bottom, always visible, occludes content under it */}
        <nav style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2,
          padding: collapsed ? '8px 12px 16px' : '8px 16px 16px 24px',
          background: '#fff',
          boxShadow: '0 -8px 16px -8px rgba(255,255,255,1), 0 -1px 0 rgba(0,0,0,0.04)',
        }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {!collapsed && <BottomRow icon="engineering" label="Ops Tools" trailing={<Toggle checked={opsTools} onChange={setOpsTools} />} />}
            <BottomRow icon="public" label="Help Center" external onClick={() => window.open('https://help.greater.co', '_blank')} />
            <BottomRow icon="person" label={userName} />
            <BottomRow icon="logout" label="Sign Out" />
          </ul>
        </nav>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        <div style={{ flex: 1, minHeight: 0, padding: 24, overflowY: 'auto', background: '#fff' }}>{children}</div>
      </main>

      {/* Collapsed flyout — fixed-positioned so it escapes the sidebar's overflow clipping */}
      {flyout && collapsed && (
        <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}
          style={{ position: 'fixed', left: flyout.x, top: flyout.y, zIndex: 9999, animation: 'flyout-in 120ms ease-out' }}>
          <FlyoutPanel item={flyout.item} />
        </div>
      )}
    </div>
  );
}

Object.assign(window, { AppShell });
