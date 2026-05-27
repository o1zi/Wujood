// Main app — pushState router + Supabase auth state

const usePushRoute = () => {
  const [route, setRoute] = useState(window.location.pathname || '/');
  useEffect(() => {
    const h = () => setRoute(window.location.pathname || '/');
    window.addEventListener('popstate', h);
    return () => window.removeEventListener('popstate', h);
  }, []);
  const go = (to) => {
    // Accept both '/dashboard' and '#/dashboard' (legacy callers)
    const path = (to || '/').replace(/^#/, '') || '/';
    if (window.location.pathname !== path) history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo(0, 0);
  };
  return [route, go];
};

const App = () => {
  const [route, go] = usePushRoute();
  const [authReady, setAuthReady] = useState(false);
  const [user,   setUser]   = useState(null);
  const [isAdmin,setIsAdmin]= useState(false);
  const [tenant, setTenant] = useState(null);

  const refreshTenant = async () => {
    const { data } = await sbGetMyTenant();
    setTenant(data || null);
  };

  useEffect(() => {
    const forceReady = setTimeout(() => { setAuthReady(true); }, 3000);
    
    if (typeof sbGetSession !== 'function') {
      console.error('sbGetSession not available, setting authReady');
      setAuthReady(true);
      return () => clearTimeout(forceReady);
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
      clearTimeout(forceReady);
    }).catch(() => { setAuthReady(true); clearTimeout(forceReady); });

    if (typeof sbOnAuthChange === 'function') {
    const { data: { subscription } } = sbOnAuthChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') return; // handled by sbGetSession above
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

  const hostname = window.location.hostname;
  const isOfficeSubdomain = hostname !== 'wujood-plat.vercel.app' && hostname.endsWith('.wujood-plat.vercel.app');
  const officeSlug = isOfficeSubdomain ? hostname.replace('.wujood-plat.vercel.app', '') : '';

  if (isOfficeSubdomain && officeSlug && officeSlug !== 'www') {
    view = <PublicSite slug={officeSlug} template="modern" go={go} />;
    return (<>{view}</>);
  }

  const isAdminEffective = isAdmin || sessionStorage.getItem('wujood_admin') === '1';
  if (route === '/' || route === '') {
    view = <Landing go={go} />;
  } else if (route === '/login') {
    view = <Auth go={go} />;
  } else if (route.startsWith('/dashboard')) {
    if (!user && !sessionStorage.getItem('wujood_admin')) { setTimeout(() => go('/login'), 0); return null; }
    if (isAdminEffective) { setTimeout(() => go('/admin'), 0); return null; }
    view = <Tenant go={go} tenant={tenant} setTenant={setTenant} user={user} />;
  } else if (route === '/theme-builder') {
    view = <ThemeBuilder go={go} />;
  } else if (route.startsWith('/admin')) {
    if (!user && !sessionStorage.getItem('wujood_admin')) { setTimeout(() => go('/login'), 0); return null; }
    if (!isAdminEffective) { setTimeout(() => go('/dashboard'), 0); return null; }
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
