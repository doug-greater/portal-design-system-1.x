// Portal UI Kit — Wizard (multi-step creation flow)
// A full-screen, position-fixed flow that renders OVER the App Shell (z-index 9000).
// Load AFTER primitives.jsx (Icon, Button, Input, Skeleton), overlays.jsx (useOutside),
// and feedback.jsx (Spinner). Exposes its parts globally for the kit screens.
//
// Parts: WizardShell · StepHeader · SelectionTable · Check · CopyToAllChip · ActionSegment.
// Reference for the spec: "Greater Design System.md" → §9 Wizard (multi-step flow).

const { useMemo } = React;  // useState / useRef are declared globally in primitives.jsx

/* =====================================================================
   WizardShell — branded top bar · numbered step indicator · body ·
   footer nav (Back / Step N of M / primary advance). Completed steps are
   clickable ("jump back"). The advance button relabels on the last step.
   ===================================================================== */
function WizardShell({
  title, steps, current, isComplete, onJump,
  onPrev, onNext, onExit, canNext, nextLabel = "Continue", busy, children,
}) {
  const lastStep = current === steps.length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, height: "100vh", display: "flex", flexDirection: "column", background: "var(--p-surface-alt)" }}>
      {/* Top bar */}
      <div style={{ height: 60, flexShrink: 0, display: "flex", alignItems: "center", gap: 16, padding: "0 24px", background: "#fff", borderBottom: "1px solid var(--p-border)" }}>
        <img src="../../assets/greater-logotype.png" alt="Greater" style={{ height: 22, width: "auto", display: "block" }} />
        <span style={{ width: 1, height: 24, background: "var(--p-border-strong)" }} />
        <span style={{ font: "600 16px/1 Inter", color: "var(--p-ink)", letterSpacing: "-.01em" }}>{title}</span>
        <div style={{ flex: 1 }} />
        <Button variant="neutral" icon="close" onClick={onExit} aria-label="Exit wizard">Exit</Button>
      </div>

      {/* Step indicator */}
      <div style={{ flexShrink: 0, background: "#fff", borderBottom: "1px solid var(--p-border)", padding: "12px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 1320, margin: "0 auto" }}>
          {steps.map((label, i) => {
            const n = i + 1;
            const done = isComplete(n) && current !== n;   // complete only when n < current AND valid
            const active = current === n;
            const clickable = n < current || done;
            return (
              <React.Fragment key={label}>
                <button onClick={() => clickable && onJump?.(n)} disabled={!clickable}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", background: "transparent", padding: "4px 6px", borderRadius: 4, cursor: clickable ? "pointer" : "default", flexShrink: 0 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    background: active || done ? "var(--p-action)" : "var(--p-surface-tint)",
                    color: active || done ? "var(--p-action-fg)" : "var(--p-placeholder)", font: "600 12px/1 Geist Mono, monospace" }}>
                    {done ? <Icon name="check" size={14} color="var(--p-action-fg)" /> : n}
                  </span>
                  <span style={{ font: `${active ? 600 : 500} 14px/1 Inter`, whiteSpace: "nowrap", color: active ? "var(--p-ink)" : done ? "var(--p-text)" : "var(--p-placeholder)" }}>{label}</span>
                </button>
                {n < steps.length && <span style={{ flex: 1, height: 1, background: "var(--p-border)", minWidth: 16 }} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Body — per-step arrival animation via key={current} */}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div key={current} className="gr-tab-in" style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", maxWidth: 1320, width: "100%", margin: "0 auto", padding: "20px 32px 24px" }}>
          {children}
        </div>
      </div>

      {/* Footer nav — Prev/Next live ONLY here */}
      <div style={{ flexShrink: 0, height: 72, background: "#fff", borderTop: "1px solid var(--p-border)", boxShadow: "0 -2px 12px rgba(16,24,40,.05)", display: "flex", alignItems: "center", padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, maxWidth: 1320, width: "100%", margin: "0 auto" }}>
          <Button variant="neutral" size="lg" icon="arrow_back" onClick={onPrev} disabled={current === 1}>Back</Button>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ font: "500 13px/1 Inter", color: "var(--p-muted)" }}>Step {current} of {steps.length}</span>
            <Button variant="primary" size="lg" iconRight={lastStep ? "check" : "arrow_forward"} onClick={onNext} disabled={!canNext || busy} loading={busy} style={{ minWidth: 160 }}>{nextLabel}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- StepHeader — step title + optional helper banner ---------------- */
function StepHeader({ title, children }) {
  return (
    <div style={{ flexShrink: 0, marginBottom: 16 }}>
      <h1 style={{ margin: 0, font: "600 20px/1.3 Inter", color: "var(--p-ink)", letterSpacing: "-.01em" }}>{title}</h1>
      {children && (
        <div style={{ marginTop: 10, background: "var(--p-primary-tint)", color: "var(--p-text)", borderRadius: 8, padding: "10px 14px", font: "400 14px/1.45 Inter" }}>{children}</div>
      )}
    </div>
  );
}

/* =====================================================================
   SelectionTable — searchable / filterable / sortable table with row
   checkboxes, select-all (filtered set), and an "N selected" review popover.
   Built on a real <table> with a sticky thead (interactive → not grid rows).
   ===================================================================== */
function SelectionTable({
  columns, rows, getId, selectedIds, onToggle, onToggleAll,
  searchPlaceholder = "Search…", matchSearch, filterSlot, filterFn,
  itemNoun = "item", renderSelectedRow, loading = false,
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: columns.find((c) => c.sortAccessor)?.key, dir: "asc" });
  const terms = useMemo(() => search.toLowerCase().split(/\s+/).filter(Boolean), [search]);

  const filtered = useMemo(
    () => rows.filter((r) => (filterFn ? filterFn(r) : true) && (terms.length === 0 || matchSearch(r, terms))),
    [rows, terms, filterFn, matchSearch]
  );

  const sorted = useMemo(() => {
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortAccessor) return filtered;
    return [...filtered].sort((a, b) => {
      const av = col.sortAccessor(a), bv = col.sortAccessor(b);
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [filtered, columns, sort]);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const filteredIds = useMemo(() => filtered.map(getId), [filtered, getId]);
  const allSelected = filteredIds.length > 0 && filteredIds.every((id) => selectedSet.has(id));

  const setSortKey = (key) => setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  const sortIcon = (key) => (sort.key !== key ? "unfold_more" : sort.dir === "asc" ? "arrow_upward" : "arrow_downward");

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexShrink: 0 }}>
        <Input icon="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={searchPlaceholder} style={{ width: 320 }} />
        {filterSlot}
        <div style={{ flex: 1 }} />
        {selectedIds.length > 0 && (
          <SelectedPopover rows={rows} getId={getId} selectedIds={selectedIds} onToggle={onToggle} itemNoun={itemNoun} renderSelectedRow={renderSelectedRow} />
        )}
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--p-border)", borderRadius: 8, overflow: "hidden", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", background: "#fff" }}>
        <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--p-surface-alt)" }}>
                <th style={{ width: 44, padding: "0 0 0 16px", height: 40, borderBottom: "1px solid var(--p-border-strong)" }}>
                  <Check on={allSelected} onChange={() => onToggleAll(filteredIds)} />
                </th>
                {columns.map((c) => (
                  <th key={c.key} style={{ textAlign: c.align || "left", padding: "0 16px", height: 40, borderBottom: "1px solid var(--p-border-strong)", whiteSpace: "nowrap" }}>
                    {c.sortAccessor ? (
                      <button onClick={() => setSortKey(c.key)}
                        style={{ display: "inline-flex", alignItems: "center", gap: 4, border: "none", background: "transparent", cursor: "pointer", padding: 0, font: "500 11px/1 Inter", letterSpacing: ".07em", textTransform: "uppercase", color: sort.key === c.key ? "var(--p-primary)" : "var(--p-muted)" }}>
                        {c.label} <Icon name={sortIcon(c.key)} size={12} color={sort.key === c.key ? "var(--p-primary)" : "var(--p-placeholder)"} />
                      </button>
                    ) : (
                      <span style={{ font: "500 11px/1 Inter", letterSpacing: ".07em", textTransform: "uppercase", color: "var(--p-muted)" }}>{c.label}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={`sk-${i}`} style={{ borderBottom: "1px solid var(--p-border)" }}>
                    <td style={{ padding: "0 0 0 16px", height: 52 }}><Skeleton width={18} height={18} radius={4} /></td>
                    {columns.map((c, ci) => (
                      <td key={c.key} style={{ padding: "0 16px", height: 52 }}><Skeleton width={ci === 1 ? 160 : 70} height={12} /></td>
                    ))}
                  </tr>
                ))
              ) : sorted.length === 0 ? (
                <tr><td colSpan={columns.length + 1} style={{ padding: "48px 16px", textAlign: "center", font: "400 14px Inter", color: "var(--p-placeholder)" }}>No {itemNoun}s match your search.</td></tr>
              ) : sorted.map((row) => {
                const id = getId(row);
                const on = selectedSet.has(id);
                return (
                  <tr key={id} onClick={() => onToggle(id)} className={"wz-row" + (on ? " wz-row-selected" : "")}
                    style={{ cursor: "pointer", borderBottom: "1px solid var(--p-border)" }}>
                    <td style={{ padding: "0 0 0 16px", height: 52 }} onClick={(e) => e.stopPropagation()}>
                      <Check on={on} onChange={() => onToggle(id)} />
                    </td>
                    {columns.map((c) => (
                      <td key={c.key} style={{ textAlign: c.align || "left", padding: "0 16px", height: 52 }}>{c.render(row, terms)}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ flexShrink: 0, padding: "10px 16px", background: "var(--p-surface-alt)", borderTop: "1px solid var(--p-border)", font: "400 13px Inter", color: "var(--p-muted)" }}>
          {loading ? `Loading ${itemNoun}s…` : (
            <>
              Showing <b style={{ color: "var(--p-text)", fontWeight: 600 }}>{filtered.length}</b> of {rows.length} {itemNoun}s
              {selectedIds.length > 0 && <> · <b style={{ color: "var(--p-primary)", fontWeight: 600 }}>{selectedIds.length}</b> selected</>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* SelectedPopover — "N selected" pill opening a review list with per-item remove + Clear All. */
function SelectedPopover({ rows, getId, selectedIds, onToggle, itemNoun, renderSelectedRow }) {
  const [open, setOpen] = useState(false);
  const ref = useOutside(() => setOpen(false));
  const map = useMemo(() => new Map(rows.map((r) => [getId(r), r])), [rows, getId]);
  const selected = selectedIds.map((id) => map.get(id)).filter(Boolean);

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={() => setOpen((o) => !o)}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 30, padding: "0 12px", borderRadius: 999, border: "1px solid var(--p-primary-soft)", background: "var(--p-primary-tint)", color: "var(--p-primary-ink)", font: "500 13px/1 Inter", cursor: "pointer" }}>
        {selectedIds.length} selected <Icon name="expand_more" size={16} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
      </button>
      {open && (
        <div style={{ position: "absolute", right: 0, top: 38, zIndex: 50, width: 300, background: "#fff", border: "1px solid var(--p-border)", borderRadius: 8, boxShadow: "var(--shadow-float)", overflow: "hidden", animation: "gr-pop-in .12s ease-out" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid var(--p-border)" }}>
            <span style={{ font: "500 11px/1 Inter", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--p-muted)" }}>{selectedIds.length} {itemNoun}{selectedIds.length !== 1 ? "s" : ""} selected</span>
            <button onClick={() => selectedIds.forEach(onToggle)} style={{ border: "none", background: "transparent", color: "var(--p-danger)", font: "500 12px Inter", cursor: "pointer" }}>Clear All</button>
          </div>
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            {selected.map((r) => (
              <div key={getId(r)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid var(--p-surface-tint)" }}>
                <div style={{ flex: 1, minWidth: 0 }}>{renderSelectedRow ? renderSelectedRow(r) : <span style={{ font: "400 14px Inter", color: "var(--p-text)" }}>{getId(r)}</span>}</div>
                <button onClick={() => onToggle(getId(r))} title="Remove" style={{ border: "none", background: "transparent", color: "var(--p-placeholder)", cursor: "pointer", display: "flex" }}><Icon name="close" size={15} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

/* ---------------- Check — table-tuned binary checkbox (matches DS Checkbox) ---------------- */
function Check({ on, onChange }) {
  return (
    <span onClick={(e) => { e.stopPropagation(); onChange?.(); }} role="checkbox" aria-checked={!!on}
      style={{ width: 18, height: 18, borderRadius: 4, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        border: on ? "1.5px solid var(--p-primary)" : "1.5px solid var(--p-border-strong)",
        background: on ? "var(--p-primary)" : "#fff", color: "#fff", transition: "background .1s, border-color .1s" }}>
      {on ? <Icon name="check" size={14} color="#fff" /> : null}
    </span>
  );
}

/* ---------------- CopyToAllChip — propagate one row's value to every selected row ---------------- */
function CopyToAllChip({ onClick, label = "Copy to All" }) {
  return (
    <button onMouseDown={(e) => e.preventDefault()} onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 26, padding: "0 10px", borderRadius: 999, border: "1px solid var(--p-primary-soft)", background: "var(--p-primary-tint)", color: "var(--p-primary-ink)", font: "500 12px/1 Inter", cursor: "pointer", whiteSpace: "nowrap", animation: "gr-pop-in .12s ease-out" }}>
      <Icon name="content_copy" size={13} /> {label}
    </button>
  );
}

/* ---------------- ActionSegment — semantic-colored 2-option segment (Add / Discontinue) ---------------- */
function ActionSegment({ value, onChange }) {
  const opt = (val, color) => {
    const on = value === val;
    return (
      <button onClick={() => onChange(val)}
        style={{ height: 30, padding: "0 14px", borderRadius: 4, border: "1px solid", cursor: "pointer", font: "600 13px/1 Inter", transition: "background .12s, border-color .12s, color .12s",
          borderColor: on ? color : "var(--p-border-strong)", background: on ? color : "#fff", color: on ? "#fff" : "var(--p-text-2)" }}>
        {val}
      </button>
    );
  };
  return <div style={{ display: "inline-flex", gap: 8 }}>{opt("Add", "var(--p-success)")}{opt("Discontinue", "var(--p-danger)")}</div>;
}

Object.assign(window, { WizardShell, StepHeader, SelectionTable, Check, CopyToAllChip, ActionSegment });
