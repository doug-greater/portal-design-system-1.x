// Routes screen — real Leaflet map, Greater map design system.
// Tokens and pin classes come from /maps.css.

function RoutesScreen() {
  const stops = [
    { n: 1, name: 'Winthrop Liquors',       eta: '9:15 AM',  cs: 42, coords: [42.3751, -70.9870] },
    { n: 2, name: 'Boston Downtown Market', eta: '10:30 AM', cs: 68, coords: [42.3555, -71.0605] },
    { n: 3, name: 'Melrose Beer Garden',    eta: '12:45 PM', cs: 24, coords: [42.4584, -71.0662] },
    { n: 4, name: 'Waltham Package Store',  eta: '2:00 PM',  cs: 55, coords: [42.3765, -71.2356] },
    { n: 5, name: 'Newton Wine & Spirits',  eta: '3:30 PM',  cs: 38, coords: [42.3370, -71.2092] },
  ];

  const mapRef = React.useRef(null);
  const mapInstance = React.useRef(null);

  React.useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false })
      .setView([42.385, -71.10], 10);
    mapInstance.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      attribution:
        '<a href="https://leafletjs.com">Leaflet</a> | © ' +
        '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © ' +
        '<a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20,
    }).addTo(map);

    L.polyline(stops.map(s => s.coords), {
      color: '#007CFF', opacity: 0.7, weight: 3, lineCap: 'round', lineJoin: 'round',
    }).addTo(map);

    stops.forEach((s, i) => {
      const isActive = i === 1; // highlight stop #2 as the focused one
      L.marker(s.coords, {
        icon: L.divIcon({
          className: 'g-map-pin-icon',
          html: `<div class="g-map-pin${isActive ? ' is-active' : ''}"><div>${s.n}</div></div>`,
          iconSize: [28, 28], iconAnchor: [14, 14],
        }),
        zIndexOffset: isActive ? 1000 : 0,
      }).addTo(map);
    });

    // Unassigned stop — not yet on the route
    L.marker([42.3500, -71.0720], {
      icon: L.divIcon({
        className: 'g-map-pin-icon',
        html: `<div class="g-map-pin is-unassigned"><div></div></div>`,
        iconSize: [32, 32], iconAnchor: [16, 16],
      }),
    }).addTo(map);

    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1280 }}>
      <div>
        <h1 className="g-h1" style={{ margin: '0 0 4px' }}>Routes</h1>
        <p className="g-body-1" style={{ color: 'var(--p-muted)', margin: 0 }}>Plan and review sales-rep routes across the week.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 16, alignItems: 'flex-start' }}>
        {/* sidebar list */}
        <div style={{ background: '#fff', border: '1px solid var(--p-border)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--p-border)' }}>
            <div style={{ font: '600 16px Inter', color: 'var(--p-ink)' }}>Thursday, Apr 23 · Kenny D’Amica</div>
            <div style={{ font: '400 13px Inter', color: 'var(--p-muted)', marginTop: 2 }}>5 stops · 227 cs planned</div>
          </div>
          {stops.map((s) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--p-border)' }}>
              <span className="g-map-pin" style={{ flex: '0 0 auto' }}>
                <div>{s.n}</div>
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '500 14px Inter', color: 'var(--p-ink)' }}>{s.name}</div>
                <div style={{ font: '400 12px Inter', color: 'var(--p-muted)' }}>{s.eta} · {s.cs} cs</div>
              </div>
              <Icon name="chevron-right" size={14} color="var(--p-placeholder)" />
            </div>
          ))}
        </div>

        {/* real Leaflet map */}
        <div className="g-map" style={{ minHeight: 520 }}>
          <div ref={mapRef} style={{ position: 'absolute', inset: 0 }} />
          <div className="g-map-title">
            <div>
              <div>Thursday, Apr 23 · Kenny D’Amica</div>
              <div className="sub">5 stops</div>
            </div>
            <Icon name="expand" size={14} color="var(--p-muted)" />
            <Icon name="x" size={14} color="var(--p-muted)" />
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RoutesScreen });
