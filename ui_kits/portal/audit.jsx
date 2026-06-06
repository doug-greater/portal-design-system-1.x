// Portal UI Kit — Audit Log, Change Row & Restore
// A reusable per-record history timeline (in a Modal) + the shared ChangeRow diff
// primitive (also used by the Wizard "Review" step). Load AFTER primitives.jsx
// (Icon) and overlays.jsx (Modal). Reference: "Greater Design System.md" → §9
// "Audit Log, Change Row & Restore".
//
// Data is prop-driven so the kit renders without a backend:
//   <AuditLogModal items={DEMO_AUDIT} onClose={…} onRestore={async (id) => {…}} />
// In the live portal these come from GET {auditUrl} / POST {restoreUrl(id)}.

function fmtStamp(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return "—";
  return d.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

// New semantic action taxonomy (see §13 audit tokens):
const ACTION_META = {
  created:  { label: "Created",  icon: "flag",                     accent: "var(--p-audit-created, #007CFF)" },
  updated:  { label: "Updated",  icon: "edit",                     accent: "var(--p-audit-updated, #B7791F)" },
  restored: { label: "Restored", icon: "settings_backup_restore",  accent: "var(--p-restore, #0D9488)" },
};

/* ---------------- ChangeRow — shared diff primitive (scalar | membership) ---------------- */
function ChangeRow({ label, from, to, added, removed }) {
  const isList = added !== undefined || removed !== undefined;
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", font: "400 13px Inter" }}>
      <span style={{ font: "600 11px/1 Inter", letterSpacing: ".04em", textTransform: "uppercase", color: "var(--p-text-2)", minWidth: 84, paddingTop: 2 }}>{label}</span>
      {isList ? (
        <span style={{ display: "inline-flex", flexWrap: "wrap", gap: 5 }}>
          {(added || []).map((n) => (
            <span key={`a-${n}`} style={{ font: "500 12px Inter", color: "var(--p-success-ink, #027a48)", background: "var(--g-green-10, #ecfdf3)", borderRadius: 999, padding: "2px 9px" }}>+ {n}</span>
          ))}
          {(removed || []).map((n) => (
            <span key={`r-${n}`} style={{ font: "500 12px Inter", color: "var(--p-danger)", background: "var(--g-red-10, #fef3f2)", borderRadius: 999, padding: "2px 9px", textDecoration: "line-through" }}>− {n}</span>
          ))}
        </span>
      ) : (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
          {from === undefined || from === null ? (
            <span style={{ color: "var(--p-ink)", fontWeight: 500 }}>{to}</span>
          ) : (
            <>
              <span style={{ color: "var(--p-muted)", textDecoration: "line-through" }}>{from}</span>
              <Icon name="arrow_forward" size={13} color="var(--p-placeholder)" />
              <span style={{ color: "var(--p-ink)", fontWeight: 500 }}>{to}</span>
            </>
          )}
        </span>
      )}
    </div>
  );
}

/* ---------------- AuditLogModal — vertical timeline + per-version restore ---------------- */
function AuditLogModal({
  title = "Audit Log", subtitle, items = [], formatValue = (f, v) => v,
  createdMessage = "Record was created.", restoredNoun = "record", onClose, onRestore, onRestored,
}) {
  const toast = window.toast || (() => {});
  const [restoringId, setRestoringId] = useState(null);
  const lastIdx = items.length - 1;

  async function handleRestore(id) {
    setRestoringId(id);
    try {
      await onRestore?.(id);
      toast(`${restoredNoun[0].toUpperCase()}${restoredNoun.slice(1)} restored to the selected version`, "success");
      onRestored?.();
    } catch {
      toast("Restore failed", "error");
    } finally {
      setRestoringId(null);
    }
  }

  return (
    <Modal open onClose={onClose} title={title} subtitle={subtitle} width={560}>
      <div style={{ paddingTop: 4, paddingBottom: 20, maxHeight: "56vh", overflowY: "auto", paddingRight: 4 }}>
        {items.length === 0 ? (
          <div style={{ font: "400 13px Inter", color: "var(--p-muted)", padding: "8px 0" }}>No history recorded yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((e, i) => (
              <AuditEntry key={e.id} entry={e} last={i === lastIdx} isCurrent={i === lastIdx}
                restorable={i !== lastIdx && !!e.snapshot} busy={restoringId === e.id} anyBusy={!!restoringId}
                formatValue={formatValue} createdMessage={createdMessage} onRestore={() => handleRestore(e.id)} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

function AuditEntry({ entry, last, isCurrent, restorable, busy, anyBusy, formatValue, createdMessage, onRestore }) {
  const [confirming, setConfirming] = useState(false);
  const meta = ACTION_META[entry.action] || ACTION_META.updated;
  const hasChanges = (entry.changes || []).length > 0;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "26px 1fr", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "#fff", border: `1.5px solid ${meta.accent}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={meta.icon} size={14} color={meta.accent} />
        </span>
        {!last && <span style={{ flex: 1, width: 2, background: "var(--p-border)", marginTop: 2, minHeight: 14 }} />}
      </div>
      <div style={{ paddingBottom: last ? 4 : 22, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ font: "600 13px Inter", color: "var(--p-ink)" }}>{meta.label}</span>
          {isCurrent && <span style={{ font: "600 10px/1 Inter", letterSpacing: ".05em", textTransform: "uppercase", color: "var(--p-success-ink, #027a48)", background: "var(--g-green-10, #ecfdf3)", borderRadius: 999, padding: "3px 7px" }}>Current</span>}
          <span style={{ font: "400 12px Inter", color: "var(--p-muted)" }}>by <b style={{ fontWeight: 600, color: "var(--p-text-2)" }}>{entry.actorName || "System"}</b></span>
          <span style={{ font: "400 12px Geist Mono, monospace", color: "var(--p-placeholder)", marginLeft: "auto" }}>{fmtStamp(entry.at)}</span>
        </div>

        {hasChanges ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
            {entry.action === "created" && (
              <span style={{ font: "600 10px/1 Inter", letterSpacing: ".05em", textTransform: "uppercase", color: "var(--p-placeholder)", marginBottom: 1 }}>Initial values</span>
            )}
            {entry.changes.map((c) => ("added" in c || "removed" in c)
              ? <ChangeRow key={c.field} label={c.label} added={c.added} removed={c.removed} />
              : <ChangeRow key={c.field} label={c.label} from={c.from == null ? undefined : formatValue(c.field, c.from)} to={formatValue(c.field, c.to)} />)}
          </div>
        ) : (
          <div style={{ font: "400 12px Inter", color: "var(--p-muted)", marginTop: 4 }}>{entry.action === "created" ? createdMessage : "No tracked field changes."}</div>
        )}

        {restorable && (
          <div style={{ marginTop: 10 }}>
            {confirming ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 6px 6px 12px", background: "var(--p-surface-alt)", border: "1px solid var(--p-border)", borderRadius: 8 }}>
                <span style={{ font: "400 12px Inter", color: "var(--p-text-2)" }}>Restore to this version?</span>
                <button type="button" onClick={() => setConfirming(false)} disabled={busy}
                  style={{ border: "none", background: "transparent", cursor: busy ? "default" : "pointer", font: "500 12px Inter", color: "var(--p-muted)", padding: "5px 8px", borderRadius: 6 }}>Cancel</button>
                <button type="button" onClick={onRestore} disabled={busy}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "none", background: "var(--p-restore, #0D9488)", color: "#fff", cursor: busy ? "default" : "pointer", font: "600 12px Inter", padding: "6px 12px", borderRadius: 6, opacity: busy ? 0.7 : 1 }}>
                  {busy ? <span style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,.5)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "gr-spin .7s linear infinite" }} /> : <Icon name="settings_backup_restore" size={14} color="#fff" />}
                  Restore
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirming(true)} disabled={anyBusy}
                style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 28, padding: "0 11px", background: "#fff", border: "1px solid var(--p-border-strong)", borderRadius: 6, cursor: anyBusy ? "default" : "pointer", font: "500 12px Inter", color: "var(--p-text)", opacity: anyBusy ? 0.5 : 1 }}>
                <Icon name="settings_backup_restore" size={14} color="var(--p-restore, #0D9488)" /> Restore This Version
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Demo history so the kit / preview cards render standalone (oldest → newest; last = current).
const DEMO_AUDIT = [
  { id: "a1", action: "created", actorName: "Dana Ruiz", at: "2026-05-02T15:04:00Z", changes: [
      { field: "name", label: "Name", from: null, to: "Summer Reset" },
      { field: "window", label: "Dates", from: null, to: "Jun 1 – Jun 30" },
      { field: "accounts", label: "Accounts", added: ["Coastal #12", "Coastal #19"] },
  ] },
  { id: "a2", action: "updated", actorName: "Marco Hale", at: "2026-05-09T18:22:00Z", snapshot: true, changes: [
      { field: "window", label: "Dates", from: "Jun 1 – Jun 30", to: "Jun 1 – Jul 15" },
      { field: "accounts", label: "Accounts", added: ["Coastal #07"], removed: ["Coastal #19"] },
  ] },
  { id: "a3", action: "restored", actorName: "Dana Ruiz", at: "2026-05-11T13:10:00Z", changes: [] },
];

Object.assign(window, { AuditLogModal, ChangeRow, fmtStamp, DEMO_AUDIT });
