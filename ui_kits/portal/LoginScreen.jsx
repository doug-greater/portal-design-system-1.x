// Login screen — matches Figma /Page-1/login-email/... pattern.
// Centered logo + heading + email field + neo-brutalist Next button.

function LoginScreen({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    if (!email.includes('@')) { setError(true); return; }
    setError(false);
    onSignIn?.(email);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 360, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <Logo width={130} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="g-h3" style={{ color: '#000', margin: 0 }}>Sign in to your account</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ font: '500 12px/1.2 Inter', color: 'var(--p-text)', letterSpacing: '.04em', textTransform: 'uppercase' }}>Email</label>
          <Input value={email} onChange={(e) => { setEmail(e.target.value); setError(false); }} placeholder="you@company.com" style={{ width: '100%' }} error={error} />
          {error && <span className="g-error">Enter a valid email address.</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <a href="#" className="g-link" style={{ fontSize: 14 }}>Use SSO instead</a>
          <Button variant="neo" onClick={submit}>Next</Button>
        </div>
        <div className="g-subtitle-2" style={{ textAlign: 'center', lineHeight: 1.5 }}>
          By clicking 'Next' you are agreeing to the Greater Industries <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>User Terms of Service</a> and <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen });
