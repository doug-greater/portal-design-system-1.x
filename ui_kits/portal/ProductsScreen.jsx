// Products ("In the Market") screen — hero stat row + filter bar + table.
// Based on Figma /Page-1/Products-Menu-Portal-Features/ (node 1:619).

// Pager — numbered page control (see Pagination spec). Keeps first, last, current ±1.
function pageList(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out = [1];
  if (cur > 3) out.push('…');
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) out.push(i);
  if (cur < total - 2) out.push('…');
  out.push(total);
  return out;
}
function Pager({ page, pageCount, onPage }) {
  const navStyle = (disabled) => ({ minWidth: 30, height: 30, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid var(--p-border-strong)', color: disabled ? 'var(--p-placeholder)' : 'var(--p-muted)', cursor: disabled ? 'default' : 'pointer' });
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span style={navStyle(page <= 1)} onClick={page > 1 ? () => onPage(page - 1) : undefined}><Icon name="chevron_left" size={15} /></span>
      {pageList(page, pageCount).map((p, i) => p === '…'
        ? <span key={'e' + i} style={{ minWidth: 22, textAlign: 'center', color: 'var(--p-placeholder)', font: '500 13px Inter' }}>…</span>
        : <span key={p} onClick={() => onPage(p)} style={{ minWidth: 30, height: 30, padding: '0 8px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '500 13px/1 Inter', cursor: 'pointer', background: p === page ? 'var(--p-primary)' : 'transparent', color: p === page ? '#fff' : 'var(--p-text)' }}>{p}</span>
      )}
      <span style={navStyle(page >= pageCount)} onClick={page < pageCount ? () => onPage(page + 1) : undefined}><Icon name="chevron_right" size={15} /></span>
    </div>
  );
}


const SAMPLE_PRODUCTS = [
  { id: 'P0057', name: 'Absolut Vodka Original',         brand: 'Absolut',          accts: 16, cs: 241.7, cat: 'Spirits', size: '750ml · Bottle' },
  { id: 'P0015', name: 'Amstel Light',                   brand: 'Heineken',         accts: 13, cs: 229.1, cat: 'Beer',    size: '12oz · Bottle' },
  { id: 'P0071', name: 'Athletic Brewing Run Wild IPA',  brand: 'Athletic Brewing', accts:  9, cs: 125.3, cat: 'Non-Alcoholic', size: '12oz · Can' },
  { id: 'P0054', name: 'Bacardi Superior White Rum',     brand: 'Bacardi',          accts:  8, cs:  97.1, cat: 'Spirits', size: '750ml · Bottle' },
  { id: 'P0041', name: 'Barefoot Pinot Grigio',          brand: 'Barefoot Cellars', accts: 13, cs: 263.1, cat: 'Wine',    size: '750ml · Bottle', flag: '~1' },
  { id: 'P0043', name: 'Barefoot Rosé',                  brand: 'Barefoot Cellars', accts: 27, cs: 454.5, cat: 'Wine',    size: '750ml · Bottle' },
  { id: 'P0011', name: 'Blue Moon Belgian White',        brand: 'Molson Coors',     accts: 22, cs: 480.7, cat: 'Beer',    size: '12oz · Bottle' },
  { id: 'P0002', name: 'Bud Light Lager',                brand: 'Anheuser-Busch',   accts: 20, cs: 408.5, cat: 'Beer',    size: '12oz · Can',    flag: '~1' },
  { id: 'P0003', name: 'Bud Light Lime',                 brand: 'Anheuser-Busch',   accts: 27, cs: 528.2, cat: 'Beer',    size: '12oz · Bottle' },
  { id: 'P0063', name: 'Bud Light Seltzer Strawberry',   brand: 'Anheuser-Busch',   accts: 20, cs: 326.5, cat: 'RTD',     size: '12oz · Can' },
];

function ProductsScreen() {
  const [tab, setTab] = useState('market');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const coverageBucket = (n) => (n >= 20 ? 'High (20+ accounts)' : n >= 10 ? 'Medium (10–19 accounts)' : 'Low (under 10)');
  const BRANDS = [...new Set(SAMPLE_PRODUCTS.map((p) => p.brand))].sort();

  const PRODUCT_FILTERS = [
    { id: 'Category', label: 'Category', icon: 'category', type: 'enum', options: ['Beer', 'Wine', 'Spirits', 'RTD', 'Non-Alcoholic'] },
    { id: 'Brand', label: 'Brand', icon: 'bookmark', type: 'enum', options: BRANDS },
    { id: 'Coverage', label: 'Coverage', icon: 'location_on', type: 'enum', options: ['High (20+ accounts)', 'Medium (10–19 accounts)', 'Low (under 10)'] },
    { id: 'Account', label: 'Account', icon: 'storefront', type: 'search', data: window.ALL_ACCOUNTS || [] },
  ];

  const rows = SAMPLE_PRODUCTS.filter((p) => {
    if (query && !(p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()))) return false;
    if (filters.Category?.size && !filters.Category.has(p.cat)) return false;
    if (filters.Brand?.size && !filters.Brand.has(p.brand)) return false;
    if (filters.Coverage?.size && !filters.Coverage.has(coverageBucket(p.accts))) return false;
    return true;
  });

  // Mock totals so the result count matches the tab badges. The sample table is a
  // slice; when nothing is filtered we show the tab's full total (Market 64 / All 71).
  const TOTAL = 71;
  const tabTotal = tab === 'all' ? 71 : 64;
  const anyFilter = !!query || Object.values(filters).some((s) => s && s.size);
  const shownCount = anyFilter ? rows.length : tabTotal;
  const countLabel = `${shownCount} of ${TOTAL} products`;

  // Footer pagination — count + pager live at the bottom of the table.
  const PAGE_SIZE = 50;
  const footerTotal = anyFilter ? rows.length : tabTotal;
  const pageCount = Math.max(1, Math.ceil(footerTotal / PAGE_SIZE));
  const rangeStart = footerTotal === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min((page - 1) * PAGE_SIZE + rows.length, footerTotal);
  useEffect(() => { setPage(1); }, [tab, query, filters]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1280, height: '100%', minHeight: 0 }}>
      {/* header */}
      <div>
        <h1 className="g-h1" style={{ margin: '0 0 4px' }}>In the Market</h1>
        <p className="g-body-1" style={{ color: 'var(--p-muted)', margin: 0 }}>Track products and their availability across your accounts.</p>
      </div>

      {/* stat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        <StatCard value="21.1k" color="blue" label="Cases in Market" />
        <StatCard value="1,258"         label="Active Placements" />
        <StatCard value="50"            label="Points of Distribution" />
        <StatCard value="1"   color="green" label="Pending Additions"     action="Show" />
        <StatCard value="1"   color="red"   label="Pending Discontinue"   action="Show" />
        <StatCard value="4"   color="gold"  label="Discontinued & Draining" action="Show" />
      </div>

      {/* filter row — ONE consolidated Filters menu (+ applied tokens), not a chip per column */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <Input icon="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by ID, name, or brand…" style={{ width: 300 }} />
        <FilterMenu
          attributes={PRODUCT_FILTERS}
          value={filters}
          onChange={setFilters}
          resultLabel={countLabel}
        />
      </div>

      {/* tabs */}
      <SegmentedTabs value={tab} onChange={setTab} items={[
        { id: 'market', label: 'Products in Market', count: 64 },
        { id: 'all',    label: 'All Products',       count: '+7' },
      ]} />

      {/* table */}
      <div style={{ background: '#fff', border: '1px solid var(--p-border)', borderRadius: 8, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {/* header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 90px 110px 1fr 130px 140px 40px', alignItems: 'center', height: 40, flexShrink: 0, padding: '0 20px', background: 'var(--p-surface-alt)', borderBottom: '1px solid var(--p-border)', font: '500 11px/1 Inter', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--p-muted)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--p-primary)' }}>PRODUCT <Icon name="arrow_upward" size={11} /></span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>ACCOUNTS <Icon name="unfold_more" size={11} /></span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>IN MARKET <Icon name="unfold_more" size={11} /></span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>BRAND <Icon name="unfold_more" size={11} /></span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>CATEGORY <Icon name="unfold_more" size={11} /></span>
          <span>SIZE / PKG</span>
          <span>COVERAGE</span>
        </div>
        {/* rows */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {rows.map((r) => {
          return (
            <div key={r.id} style={{
              display: 'grid', gridTemplateColumns: '1.6fr 90px 110px 1fr 130px 140px 40px',
              alignItems: 'center', height: 56, padding: '0 20px',
              borderBottom: '1px solid var(--p-border)',
              background: '#fff',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ font: "400 11px 'Geist Mono', monospace", color: 'var(--p-muted)' }}>{r.id}</span>
                <span style={{ font: '500 14px Inter', color: 'var(--p-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Icon name="storefront" size={13} color="var(--p-placeholder)" />
                <span style={{ font: '500 13px Inter', color: 'var(--p-ink)' }}>{r.accts}</span>
                {r.flag && <span style={{ font: "500 10px 'Geist Mono', monospace", color: 'var(--p-warning)', background: 'var(--g-gold-10)', padding: '1px 5px', borderRadius: 999 }}>{r.flag}</span>}
              </div>
              <span style={{ font: "500 13px 'Geist Mono', monospace", color: 'var(--p-text)' }}>{r.cs} cs</span>
              <span style={{ font: '400 14px Inter', color: 'var(--p-text)' }}>{r.brand}</span>
              <span><Pill kind={r.cat} /></span>
              <span style={{ font: '400 13px Inter', color: 'var(--p-muted)' }}>{r.size}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: 'var(--p-primary-soft)', color: 'var(--p-primary)' }}><Icon name="map" size={13} /></span>
            </div>
          );
        })}
        </div>
        {/* footer — result count (left) + rows-per-page + pager (right). Replaces the old top-bar "N of M" count. */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexShrink: 0, padding: '10px 16px', background: 'var(--p-surface-alt)', borderTop: '1px solid var(--p-border)' }}>
          <span style={{ font: '400 13px Inter', color: 'var(--p-muted)' }}>Showing <b style={{ color: 'var(--p-text)', fontWeight: 600 }}>{rangeStart}–{rangeEnd}</b> of <b style={{ color: 'var(--p-text)', fontWeight: 600 }}>{footerTotal.toLocaleString()}</b> products</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, font: '400 13px Inter', color: 'var(--p-muted)' }}>Rows
              <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', height: 30, border: '1px solid var(--p-border-strong)', borderRadius: 6, background: '#fff', padding: '0 28px 0 10px', font: '500 13px Inter', color: 'var(--p-ink)' }}>{PAGE_SIZE}<Icon name="expand_more" size={14} color="var(--p-muted)" style={{ position: 'absolute', right: 7 }} /></span>
            </span>
            <Pager page={page} pageCount={pageCount} onPage={setPage} />
          </div>
        </div>
      </div>

    </div>
  );
}

Object.assign(window, { ProductsScreen });
