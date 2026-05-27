// Auth — صفحة تسجيل الدخول (Supabase real auth)

const Auth = ({ go }) => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [role,     setRole]     = useState('tenant');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let cancelled = false;
    const safety = setTimeout(() => {
      cancelled = true;
      setLoading(false);
      setError('انتهت مهلة الاتصال. حاول مرة أخرى.');
    }, 10000);

    try {
      console.log('[Login] calling sbSignIn...');
      const res = await sbSignIn(email, password);
      console.log('[Login] sbSignIn result:', res?.error ? 'error' : 'ok');
      clearTimeout(safety);
      if (cancelled) return;

      if (res?.error) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        setLoading(false);
        return;
      }

      console.log('[Login] checking isAdmin...');
      let admin = false;
      try { admin = await sbIsAdmin(); } catch (err) { console.error('isAdmin err:', err); }
      if (cancelled) return;

      if (role === 'admin' && !admin) {
        setError('هذا الحساب ليس أدمناً على المنصة.');
        await sbSignOut();
        setLoading(false);
        return;
      }

      sessionStorage.setItem('wujood_admin', admin ? '1' : '0');
      setLoading(false);
      console.log('[Login] navigating to', admin ? '/admin' : '/dashboard');
      go(admin ? '/admin' : '/dashboard');
    } catch (err) {
      clearTimeout(safety);
      if (cancelled) return;
      console.error('[Login] error:', err);
      setError('حدث خطأ في الاتصال. حاول مرة أخرى.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="auth-grid">

      {/* ── Form ── */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '32px 40px', justifyContent: 'space-between' }}>
        <div onClick={() => go('#/')} style={{ cursor: 'pointer', display: 'inline-flex' }}>
          <Logo size={22} />
        </div>

        <div style={{ maxWidth: 380, margin: '0 auto', width: '100%' }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>
            أهلاً بعودتك.
          </h1>
          <p style={{ marginTop: 8, color: 'var(--muted)', fontSize: 15 }}>
            سجّل الدخول للوصول إلى داشبورد مكتبك.
          </p>

          {/* Role toggle */}
          <div style={{ margin: '24px 0 8px', display: 'inline-flex', background: 'var(--bg-alt)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
            {[
              { id: 'tenant', label: 'مكتب' },
              { id: 'admin',  label: 'أدمن المنصة' },
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                style={{
                  padding: '6px 14px', fontSize: 13, fontWeight: 500, borderRadius: 7,
                  background: role === r.id ? 'var(--surface)' : 'transparent',
                  color:      role === r.id ? 'var(--ink)' : 'var(--muted)',
                  boxShadow:  role === r.id ? 'var(--sh-xs)' : 'none',
                  transition: 'all .15s',
                }}
              >{r.label}</button>
            ))}
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
            <Field label="البريد الإلكتروني">
              <Input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                dir="ltr" style={{ textAlign: 'left' }} required autoComplete="email"
              />
            </Field>

            <Field label="كلمة المرور">
              <div style={{ position: 'relative' }}>
                <Input
                  type={showPw ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  dir="ltr" style={{ textAlign: 'left', paddingInlineEnd: 40 }}
                  required autoComplete="current-password"
                />
                <button
                  type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', insetInlineEnd: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', padding: 6 }}
                >
                  {React.createElement(Icons.eye, { size: 16 })}
                </button>
              </div>
            </Field>

            {error && (
              <div style={{ padding: '10px 14px', background: 'var(--danger-soft)', border: '1px solid #e7c3be', borderRadius: 8, fontSize: 13, color: '#7e2418', display: 'flex', gap: 8, alignItems: 'center' }}>
                {React.createElement(Icons.warn, { size: 15 })}
                {error}
              </div>
            )}

            <Btn type="submit" kind="primary" size="lg" disabled={loading}>
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </Btn>
          </form>

          <div style={{ marginTop: 22, padding: 14, background: 'var(--accent-soft)', borderRadius: 10, fontSize: 13, color: '#7d5a17', display: 'flex', gap: 10 }}>
            <span style={{ marginTop: 2 }}>{React.createElement(Icons.info, { size: 16 })}</span>
            <div>
              <strong>منصة حقيقية:</strong> أدخل بريدك الإلكتروني وكلمة المرور.
              لإنشاء حساب تواصل معنا على واتساب.
            </div>
          </div>
        </div>

        <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', margin: 0 }}>
          باستخدامك للمنصة فأنت توافق على{' '}
          <a href="#" style={{ color: 'var(--primary)' }}>الشروط</a>
          {' '}و<a href="#" style={{ color: 'var(--primary)' }}>الخصوصية</a>.
        </p>
      </div>

      {/* ── Visual panel ── */}
      <div
        style={{
          background: 'var(--primary)', color: '#f4ecd8',
          padding: 48, display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
        }}
        className="auth-visual"
      >
        <div style={{ position: 'absolute', top: -100, insetInlineEnd: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(176,138,62,.18)', filter: 'blur(60px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Badge tone="gold">منذ 2025</Badge>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#fff' }}>
            مكتبك يستحق<br />
            <span style={{ color: 'var(--accent)' }}>وجوداً يليق به.</span>
          </h2>
          <p style={{ marginTop: 18, maxWidth: 380, color: 'rgba(255,255,255,.7)', fontSize: 15, lineHeight: 1.7 }}>
            انضم لأكثر من 12 مكتباً مهنياً سعودياً اختاروا "وجود" لإطلاق وجودهم الرقمي بصورة احترافية تحترم القطاع وتُحاكي الجمهور.
          </p>
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 24 }}>
          {[
            { v: '12+', l: 'مكتب نشط' },
            { v: '220+', l: 'مشروع منشور' },
            { v: '99.9%', l: 'وقت تشغيل' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--accent)', fontWeight: 600 }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .auth-grid { grid-template-columns: 1fr !important; }
          .auth-visual { display: none !important; }
        }
      `}</style>
    </div>
  );
};

window.Auth = Auth;
