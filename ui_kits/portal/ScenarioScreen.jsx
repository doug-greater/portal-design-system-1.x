// Scenario / agent-configuration screen.
// Based on /Page-1/agent-configuration/ — toggles, numeric inputs, notes.

function ScenarioScreen() {
  const [autoRoute, setAutoRoute] = useState(true);
  const [reorder, setReorder] = useState(false);
  const [notify, setNotify] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 800 }}>
      <div>
        <h1 className="g-h1" style={{ margin: '0 0 4px' }}>Agent configuration</h1>
        <p className="g-body-1" style={{ color: 'var(--p-muted)', margin: 0 }}>Tune how Greater plans routes and reorders for this scenario.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--p-border)', borderRadius: 10, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <section>
          <h2 className="g-section-title" style={{ margin: '0 0 4px' }}>Sales rep defaults</h2>
          <p className="g-subtitle-1" style={{ margin: 0, textTransform: 'none', color: 'var(--p-muted)', letterSpacing: 0 }}>These values seed every rep in this scenario.</p>
        </section>

        <FormRow label="Daily route suggestions" help="Greater proposes optimal stops each morning based on yesterday's activity.">
          <Toggle on={autoRoute} onChange={setAutoRoute} />
        </FormRow>
        <FormRow label="Automatic reorder" help="Trigger replenishment orders when cases-in-market drop below threshold.">
          <Toggle on={reorder} onChange={setReorder} />
        </FormRow>
        <FormRow label="Push notifications" help="Ping reps when a high-priority account needs a visit.">
          <Toggle on={notify} onChange={setNotify} />
        </FormRow>

        <div style={{ borderTop: '1px solid var(--p-border)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 className="g-section-title" style={{ margin: 0 }}>Work-week constraints</h2>
          <FormRow label="Max stops / day">
            <Input value="12" style={{ width: 90 }} />
          </FormRow>
          <FormRow label="Driving window">
            <div style={{ display: 'inline-flex', gap: 8 }}>
              <Input value="7:30 AM" style={{ width: 110 }} />
              <span style={{ alignSelf: 'center', color: 'var(--p-muted)' }}>–</span>
              <Input value="5:30 PM" style={{ width: 110 }} />
            </div>
          </FormRow>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--p-border)', paddingTop: 20 }}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </div>
      </div>
    </div>
  );
}

function FormRow({ label, help, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center' }}>
      <div>
        <div style={{ font: '500 14px Inter', color: 'var(--p-ink)' }}>{label}</div>
        {help && <div style={{ font: '400 13px Inter', color: 'var(--p-muted)', marginTop: 2 }}>{help}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

Object.assign(window, { ScenarioScreen, FormRow });
