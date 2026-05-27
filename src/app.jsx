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
  const [authReady, setAuthReady] = useState(false);
  const [user,   setUser]   = useState(null);
  const [isAdmin,setIsAdmin]= useState(false);
  const [tenant, setTenant] = useState(null);

  const refreshTenant = async () => {
    const { data } = await sbGetMyTenant();
    setTenant(data || null);
  };

  useEffect(() => {
    if (typeof sbGetSession !== 'function') {
      console.error('sbGetSession not available, setting authReady');
      setAuthReady(true);
      return;
    }
    sbGetSession().then(async (session) => {
      try {
        if (session?.user) {
          setUser(session.user);
          const admin = await sbIsAdmin();
          setIsAdmin(admin);
          if (!admin) await refreshTenant();
        }
      } catch (e) {
        console.error('Auth init error:', e);
      }
      setAuthReady(true);
    }).catch(() => setAuthReady(true));

    if (typeof sbOnAuthChange === 'function') {
    const { data: { subscription } } = sbOnAuthChange(async (event, session) => {
      try {
        if (session?.user) {
          setUser(session.user);
          const admin = await sbIsAdmin();
          setIsAdmin(admin);
          if (!admin) await refreshTenant();
          else setTenant(null);
        } else {
          setUser(null); setIsAdmin(false); setTenant(null);
        }
      } catch (e) {
        console.error('Auth change error:', e);
        setAuthReady(true);
      }
    });

    return () => subscription?.unsubscribe?.();
    }
    return () => {};
  }, []);

  if (!authReady) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 8, background: 'var(--bg)' }}>
      <Logo size={28} />
    </div>
  );

  let view;
  const isAdminEffective = isAdmin || sessionStorage.getItem('wujood_admin') === '1';
  if (route === '/' || route === '') {
    view = <Landing go={go} />;
  } else if (route === '/login') {
    if (user) { setTimeout(() => go(isAdminEffective ? '#/admin' : '#/dashboard'), 0); return null; }
    view = <Auth go={go} />;
  } else if (route.startsWith('/dashboard')) {
    if (!user && !sessionStorage.getItem('wujood_admin')) { setTimeout(() => go('#/login'), 0); return null; }
    if (isAdminEffective) { setTimeout(() => go('#/admin'), 0); return null; }
    view = <Tenant go={go} tenant={tenant} setTenant={setTenant} />;
  } else if (route === '/theme-builder') {
    view = <ThemeBuilder go={go} />;
  } else if (route.startsWith('/admin')) {
    if (!user && !sessionStorage.getItem('wujood_admin')) { setTimeout(() => go('#/login'), 0); return null; }
    if (!isAdminEffective) { setTimeout(() => go('#/dashboard'), 0); return null; }
    view = <Admin go={go} />;
  } else if (route.startsWith('/site/')) {
    const parts = route.split('/site/')[1].split('/');
    view = <PublicSite slug={parts[0]} template={parts[1] || 'modern'} go={go} />;
  } else {
    view = <Landing go={go} />;
  }

  return (
    <>
      {view}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
