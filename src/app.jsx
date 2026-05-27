// Main app — hash-based router + Supabase auth state

const useHashRoute = () => {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const h = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);
  return [hash, (h) => { window.location.hash = h.startsWith('#') ? h.slice(1) : h; window.scrollTo(0, 0); }];
};

const App = () => {
  const [hash, go]      = useHashRoute();
  const route           = hash.replace(/^#/, '') || '/';

  if (window.__ENV_MISSING__) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
        <Logo size={32} />
        <div style={{ maxWidth: 500, textAlign: 'center', padding: '0 20px' }}>
          <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--danger)' }}>خطأ في الإعداد</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            متغيرات البيئة (SUPABASE_URL) غير مضبوطة.
            <br/>
            تأكد من إضافتها في <strong>Vercel Dashboard → Settings → Environment Variables</strong> ثم أعد النشر.
          </p>
        </div>
      </div>
    );
  }
  const [authReady, setAuthReady] = useState(false);
  const [user,   setUser]   = useState(null);
  const [isAdmin,setIsAdmin]= useState(false);
  const [tenant, setTenant] = useState(null);

  const refreshTenant = async () => {
    const { data } = await sbGetMyTenant();
    setTenant(data || null);
  };

  useEffect(() => {
    sbGetSession().then(async (session) => {
      if (session?.user) {
        setUser(session.user);
        const admin = await sbIsAdmin();
        setIsAdmin(admin);
        if (!admin) await refreshTenant();
      }
      setAuthReady(true);
    });

    const { data: { subscription } } = sbOnAuthChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const admin = await sbIsAdmin();
        setIsAdmin(admin);
        if (!admin) await refreshTenant();
        else setTenant(null);
      } else {
        setUser(null); setIsAdmin(false); setTenant(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!authReady) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
      <Logo size={32} />
      <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>جاري التحميل...</p>
    </div>
  );

  let view;
  if (route === '/' || route === '') {
    view = <Landing go={go} />;
  } else if (route === '/login') {
    if (user) { setTimeout(() => go(isAdmin ? '#/admin' : '#/dashboard'), 0); return null; }
    view = <Auth go={go} />;
  } else if (route.startsWith('/dashboard')) {
    if (!user) { setTimeout(() => go('#/login'), 0); return null; }
    view = <Tenant go={go} tenant={tenant} setTenant={setTenant} />;
  } else if (route === '/theme-builder') {
    view = <ThemeBuilder go={go} />;
  } else if (route.startsWith('/admin')) {
    if (!user || !isAdmin) { setTimeout(() => go('#/login'), 0); return null; }
    view = <Admin go={go} />;
  } else if (route.startsWith('/site/')) {
    const parts = route.split('/site/')[1].split('/');
    view = <PublicSite slug={parts[0]} template={parts[1] || 'modern'} go={go} />;
  } else {
    view = <Landing go={go} />;
  }

  const routes = [
    { id: '/', short: 'الرئيسية' },
    { id: '/login', short: 'دخول' },
    { id: 'sep1' },
    { id: '/dashboard', short: 'داشبورد المكتب' },
    { id: 'sep2' },
    { id: '/admin', short: 'داشبورد الأدمن' },
    { id: '/theme-builder', short: 'محرر القوالب' },
    { id: 'sep3' },
    { id: '/site/alfarabi', short: 'موقع المكتب' },
    { id: '/site/alfarabi/classic', short: 'كلاسيكي' },
    { id: '/site/alfarabi/heritage', short: 'تراثي' },
    { id: '/site/alfarabi/minimal', short: 'بسيط' },
    { id: '/site/alfarabi/luxury', short: 'فاخر' },
    { id: '/site/alfarabi/studio', short: 'استوديو' },
  ];

  const isMatch = (id) => {
    if (id === '/') return route === '/' || route === '';
    if (id === '/site/alfarabi') return route === '/site/alfarabi' || route === '/site/alfarabi/modern';
    if (id.startsWith('/site/alfarabi/')) return route === id;
    return route.startsWith(id);
  };

  return (
    <>
      {view}
      <div className="wj-nav-switcher">
        <span className="wj-nav-label">{user ? (isAdmin ? '👑 admin' : '👤 tenant') : 'demo'}</span>
        {routes.map((r) => r.id.startsWith('sep') ? (
          <span key={r.id} className="sep" />
        ) : (
          <button key={r.id} className={isMatch(r.id) ? 'active' : ''} onClick={() => go('#' + r.id)}>
            {r.short}
          </button>
        ))}
        {user && (
          <>
            <span className="sep" />
            <button onClick={() => sbSignOut().then(() => go('#/'))} style={{ color: 'rgba(255,100,100,.85)' }}>
              خروج
            </button>
          </>
        )}
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
