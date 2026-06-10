// Login screen (1.5) — two-step auth: email lookup → greeting + password.
// Directional step transitions, dev quick sign-in (dev-only), and a flat
// theme toggle bottom-left. Auth inputs are 56px tall / 4px radius (§H).

// Dev quick sign-in accounts. In production these come from a public
// GET /auth/config → { devLoginEnabled, devAccounts: [{label,email,password}] }
// and the list renders dynamically — adding a role is a config change, not UI.
const DEV_ACCOUNTS = [
  { label: 'Executive',          email: 'exec@coastalbev.com',       password: 'demo' },
  { label: 'Department Manager', email: 'manager@coastalbev.com',    password: 'demo' },
  { label: 'Supervisor',         email: 'supervisor@coastalbev.com', password: 'demo' },
  { label: 'Sales Rep',          email: 'rep@coastalbev.com',        password: 'demo' },
];
const DEV_LOGIN_ENABLED = true;   // gated by /auth/config in production

const authField = {
  width: '100%', height: 56, padding: '0 16px', boxSizing: 'border-box',
  border: '1px solid var(--p-border-strong)', borderRadius: 4,  // §H: 4px on auth
  font: '400 16px Inter', color: 'var(--p-ink)', background: 'var(--p-surface)', outline: 'none',
};

function greeting() {
  // (Date.now() is fine in the browser kit; just a cosmetic greeting.)
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}
function firstNameFrom(email) {
  const local = (email.split('@')[0] || '').replace(/[._-]+/g, ' ').trim();
  return local ? local.charAt(0).toUpperCase() + local.slice(1) : 'there';
}

function LoginScreen({ onSignIn }) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState('fwd');         // gr-step-fwd / gr-step-back
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Inline theme toggle (mirrors theme.js; flat, bottom-left on Login).
  const [pref, setPref] = useState(() => { try { const v = localStorage.getItem('gr-theme'); return v === 'light' || v === 'dark' || v === 'system' ? v : 'system'; } catch { return 'system'; } });
  const resolve = (p) => p === 'dark' ? 'dark' : p === 'light' ? 'light' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  useEffect(() => { document.documentElement.setAttribute('data-theme', resolve(pref)); try { localStorage.setItem('gr-theme', pref); } catch {} }, [pref]);
  const tMeta = { light: { icon: 'light_mode', label: 'Light' }, dark: { icon: 'dark_mode', label: 'Dark' }, system: { icon: 'contrast', label: 'System' } }[pref];
  const cycle = () => setPref((p) => (p === 'light' ? 'dark' : p === 'dark' ? 'system' : 'light'));

  const toPassword = () => {
    if (!email.includes('@')) { setError(true); return; }
    setError(false); setDir('fwd'); setStep(2);
  };
  const editEmail = () => { setDir('back'); setStep(1); };
  const finish = () => { if (!password) { setError(true); return; } onSignIn?.(email); };
  const devSignIn = (acct) => { setEmail(acct.email); setPassword(acct.password); setError(false); setDir('fwd'); setStep(2); };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: 'var(--p-shell)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div key={step} className={dir === 'fwd' ? 'gr-step-fwd' : 'gr-step-back'}
        style={{ width: 360, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }} className="gr-rise" data-i="0">
          <Logo width={130} />
        </div>

        {step === 1 ? (
          <React.Fragment>
            <div style={{ textAlign: 'center' }} className="gr-rise" data-i="1">
              <div className="g-h3" style={{ color: 'var(--p-ink)', margin: 0 }}>Sign in to your account</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} className="gr-rise" data-i="2">
              <label style={{ font: '500 12px/1.2 Inter', color: 'var(--p-text)', letterSpacing: '.04em', textTransform: 'uppercase' }}>Email</label>
              <input type="email" value={email} placeholder="you@company.com" style={{ ...authField, borderColor: error ? 'var(--p-danger)' : 'var(--p-border-strong)' }}
                onChange={(e) => { setEmail(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && toPassword()} autoFocus />
              {error && <span className="g-error">Enter a valid email address.</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }} className="gr-rise" data-i="3">
              <a href="#" className="g-link" style={{ fontSize: 14 }} onClick={(e) => e.preventDefault()}>Use SSO instead</a>
              <Button variant="neo" onClick={toPassword}>Next</Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ textAlign: 'center' }} className="gr-rise" data-i="1">
              <div className="g-h3" style={{ color: 'var(--p-ink)', margin: 0 }}>{greeting()}, {firstNameFrom(email)}.</div>
              <div style={{ font: '400 14px Inter', color: 'var(--p-muted)', marginTop: 4 }}>
                {email} · <a href="#" className="g-link" onClick={(e) => { e.preventDefault(); editEmail(); }}>Edit</a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} className="gr-rise" data-i="2">
              <label style={{ font: '500 12px/1.2 Inter', color: 'var(--p-text)', letterSpacing: '.04em', textTransform: 'uppercase' }}>Password</label>
              <input type="password" value={password} placeholder="••••••••" style={{ ...authField, borderColor: error ? 'var(--p-danger)' : 'var(--p-border-strong)' }}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && finish()} autoFocus />
              {error && <span className="g-error">Enter your password.</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }} className="gr-rise" data-i="3">
              <Button variant="neo" onClick={finish}>Sign In</Button>
            </div>
          </React.Fragment>
        )}

        <div className="g-subtitle-2" style={{ textAlign: 'center', lineHeight: 1.5 }}>
          By continuing you agree to the Greater Industries <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>User Terms of Service</a> and <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a>.
        </div>

        {/* Dev quick sign-in (development only) — exercises the real two-step flow */}
        {DEV_LOGIN_ENABLED && (
          <div style={{ marginTop: 4, paddingTop: 16, borderTop: '1px solid var(--p-border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ font: '500 11px/1.2 Inter', color: 'var(--p-muted)', letterSpacing: '.04em', textTransform: 'uppercase', textAlign: 'center' }}>Dev quick sign-in</span>
            {DEV_ACCOUNTS.map((a) => (
              <button key={a.email} data-testid={`dev-login-${a.label.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => devSignIn(a)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', height: 40, padding: '0 12px', borderRadius: 4, cursor: 'pointer',
                  border: '1px dashed var(--p-border-strong)', background: 'transparent', color: 'var(--p-text)', font: '500 13px Inter' }}>
                <Icon name="bolt" size={15} color="var(--p-muted)" />
                Sign in as {a.label} ({a.email})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Theme toggle — flat, bottom-left, no card chrome (§A) */}
      <button data-testid="theme-toggle" onClick={cycle}
        style={{ position: 'absolute', left: 20, bottom: 20, display: 'inline-flex', alignItems: 'center', gap: 8,
          border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--p-muted)', font: '500 13px Inter' }}>
        <Icon name={tMeta.icon} size={18} color="currentColor" /> {tMeta.label}
      </button>
    </div>
  );
}

Object.assign(window, { LoginScreen });
