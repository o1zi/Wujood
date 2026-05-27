// Public Site — موقع المكتب العام
// يدير اختيار القالب من بين 6 قوالب ويعرض منتقي قوالب عائم للمعاينة

const TEMPLATES = [
  { id: 'modern',    label: 'Modern',    labelAr: 'العصري',     desc: 'أبيض + أخضر داكن'  },
  { id: 'classic',   label: 'Classic',   labelAr: 'الكلاسيكي',  desc: 'كريمي + بني + Serif' },
  { id: 'heritage',  label: 'Heritage',  labelAr: 'التراثي',    desc: 'طيني + نقوش هندسية' },
  { id: 'minimal',   label: 'Minimal',   labelAr: 'البسيط',     desc: 'أبيض + مساحات واسعة' },
  { id: 'luxury',    label: 'Luxury',    labelAr: 'الفاخر',     desc: 'داكن + ذهبي' },
  { id: 'studio',    label: 'Studio',    labelAr: 'الاستوديو',  desc: 'صور كبيرة + ساج' },
];

const PublicSite = ({ slug, template = 'modern', go }) => {
  const [picker, setPicker] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!slug || slug === 'demo') {
          setData({ t: DEMO_TENANT, projects: DEMO_PROJECTS, services: DEMO_SERVICES, features: DEMO_FEATURES, stats: DEMO_STATS, testimonials: DEMO_TESTIMONIALS, faqs: DEMO_FAQS });
          setLoading(false);
          return;
        }
        setData({ t: DEMO_TENANT, projects: DEMO_PROJECTS, services: DEMO_SERVICES, features: DEMO_FEATURES, stats: DEMO_STATS, testimonials: DEMO_TESTIMONIALS, faqs: DEMO_FAQS });
        setLoading(false);
        const { data: tenant } = await sbGetTenantBySlug(slug);
        if (!tenant) {
          setData({ t: DEMO_TENANT, projects: DEMO_PROJECTS, services: DEMO_SERVICES, features: DEMO_FEATURES, stats: DEMO_STATS, testimonials: DEMO_TESTIMONIALS, faqs: DEMO_FAQS });
          return;
        }
        // Merge with DEMO_TENANT so null DB fields don't crash templates
        const safeTenant = { ...DEMO_TENANT, ...tenant };
        const [projRes, svcRes, statsRes, testiRes, faqRes] = await Promise.all([
          sbGetProjects(tenant.id), sbGetServices(tenant.id), sbGetStats(tenant.id),
          sbGetTestimonials(tenant.id), sbGetFaqs(tenant.id),
        ]);
        setData({
          t: safeTenant,
          projects: projRes?.data?.length ? projRes.data : DEMO_PROJECTS,
          services: svcRes?.data?.length ? svcRes.data : DEMO_SERVICES,
          features: (svcRes?.data || []).filter(s => s.type === 'feature').length > 0 ? svcRes.data.filter(s => s.type === 'feature') : DEMO_FEATURES,
          stats: statsRes?.data?.length ? statsRes.data : DEMO_STATS,
          testimonials: testiRes?.data?.length ? testiRes.data : DEMO_TESTIMONIALS,
          faqs: faqRes?.data?.length ? faqRes.data : DEMO_FAQS,
        });
      } catch (e) {
        console.error('PublicSite load error:', e);
        setData({ t: DEMO_TENANT, projects: DEMO_PROJECTS, services: DEMO_SERVICES, features: DEMO_FEATURES, stats: DEMO_STATS, testimonials: DEMO_TESTIMONIALS, faqs: DEMO_FAQS });
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
          <div style={{ width: 30, height: 30, border: '2px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 14px', animation: 'spin 0.7s linear infinite' }} />
          <div style={{ fontSize: 14 }}>جاري تحميل الموقع...</div>
        </div>
      </div>
    );
  }

  const props = data;
  if (!data) return null;

  let view;
  if (template === 'classic')   view = <TplClassic {...props} />;
  else if (template === 'heritage')  view = <TplHeritage {...props} />;
  else if (template === 'minimal')   view = <TplMinimal {...props} />;
  else if (template === 'luxury')    view = <TplLuxury {...props} />;
  else if (template === 'studio')    view = <TplStudio {...props} />;
  else view = <TplModern {...props} go={go} />;

  const isDemo = !slug || slug === 'demo';
  const goTpl = (tid) => go(`#/site/${slug}/${tid}`);
  const current = TEMPLATES.find(x => x.id === template) || TEMPLATES[0];

  return (
    <>
      {view}
      {/* Floating template picker — only for demo */}
      {isDemo && <div style={{
        position: 'fixed', top: 14, insetInlineStart: 14,
        zIndex: 200,
        background: 'rgba(20,32,26,.92)',
        backdropFilter: 'blur(16px)',
        borderRadius: 999,
        padding: '6px 6px 6px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 12px 28px -8px rgba(0,0,0,.4)',
        fontFamily: 'var(--font-sans)',
        direction: 'rtl',
      }}>
        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,.45)', letterSpacing: '.08em' }}>قالب:</span>
        <button
          onClick={() => setPicker(!picker)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', borderRadius: 999,
            background: 'rgba(176,138,62,.18)', color: '#f4ecd8',
            fontSize: 12, fontWeight: 500,
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)' }}>{current.labelAr}</span>
          <span style={{ opacity: .6, fontSize: 10 }}>{React.createElement(Icons.chevronDown, { size: 12 })}</span>
        </button>
        {picker && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', insetInlineStart: 0,
            background: 'rgba(20,32,26,.97)', backdropFilter: 'blur(16px)',
            borderRadius: 14, padding: 6,
            display: 'flex', flexDirection: 'column', gap: 2,
            minWidth: 240,
            boxShadow: '0 12px 28px -8px rgba(0,0,0,.5)',
            border: '1px solid rgba(255,255,255,.06)',
          }}>
            {TEMPLATES.map(tp => (
              <button
                key={tp.id}
                onClick={() => { goTpl(tp.id); setPicker(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 8,
                  background: template === tp.id ? 'rgba(176,138,62,.18)' : 'transparent',
                  color: template === tp.id ? '#fff' : 'rgba(255,255,255,.85)',
                  textAlign: 'right',
                  transition: 'background .12s',
                }}
                onMouseEnter={(e) => template !== tp.id && (e.currentTarget.style.background = 'rgba(255,255,255,.04)')}
                onMouseLeave={(e) => template !== tp.id && (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ display: 'flex', gap: 2 }}>
                  {tp.id === 'modern' && <><span style={{ width: 10, height: 16, background: '#0e3b2e' }}></span><span style={{ width: 10, height: 16, background: '#b08a3e' }}></span></>}
                  {tp.id === 'classic' && <><span style={{ width: 10, height: 16, background: '#f6efe3' }}></span><span style={{ width: 10, height: 16, background: '#a37c2c' }}></span></>}
                  {tp.id === 'heritage' && <><span style={{ width: 10, height: 16, background: '#b85c3d' }}></span><span style={{ width: 10, height: 16, background: '#f4e9d4' }}></span></>}
                  {tp.id === 'minimal' && <><span style={{ width: 10, height: 16, background: '#fcfcfc' }}></span><span style={{ width: 10, height: 16, background: '#1a1a1a' }}></span></>}
                  {tp.id === 'luxury' && <><span style={{ width: 10, height: 16, background: '#0a0a0a' }}></span><span style={{ width: 10, height: 16, background: '#d4a85a' }}></span></>}
                  {tp.id === 'studio' && <><span style={{ width: 10, height: 16, background: '#1a1a1c' }}></span><span style={{ width: 10, height: 16, background: '#7a8c6f' }}></span></>}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500 }}>{tp.labelAr}</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,.45)' }}>{tp.desc}</div>
                </div>
                {template === tp.id && <span style={{ color: '#b08a3e' }}>{React.createElement(Icons.check, { size: 14 })}</span>}
              </button>
            ))}
          </div>
        )}
      </div>}
    </>
  );
};

// Re-named: existing Modern implementation
const TplModern = ({ t, projects, services, features, stats, testimonials, faqs, go }) => {
  const slug = t.slug;
  const [filter, setFilter] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const theme = {
    primary: '#0e3b2e', accent: '#b08a3e', bg: '#ffffff', text: '#14201a',
    surface: '#fafaf7', border: '#eeeae0', muted: '#6e7770',
    fontHead: 'Reem Kufi', fontBody: 'IBM Plex Sans Arabic',
    radius: 8,
  };

  const featured = projects.filter(p => p.featured);
  const allCats = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProj = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const cssVars = {
    '--p-primary': theme.primary,
    '--p-accent': theme.accent,
    '--p-bg': theme.bg,
    '--p-text': theme.text,
    '--p-surface': theme.surface,
    '--p-border': theme.border,
    '--p-muted': theme.muted,
    '--p-r': theme.radius + 'px',
    '--p-fhead': `'${theme.fontHead}', sans-serif`,
    '--p-fbody': `'${theme.fontBody}', sans-serif`,
  };

  return (
    <div style={{
      ...cssVars,
      background: 'var(--p-bg)',
      color: 'var(--p-text)',
      fontFamily: 'var(--p-fbody)',
      minHeight: '100vh',
    }}>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(theme.fontHead)}:wght@400;500;600;700&family=${encodeURIComponent(theme.fontBody)}:wght@300;400;500;600&display=swap`} />

      {/* Nav */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--p-border)' : '1px solid transparent',
        transition: 'all .25s',
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          padding: '16px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <a href="#" style={{
            fontFamily: 'var(--p-fhead)', fontSize: 20, fontWeight: 600,
            color: scrolled ? 'var(--p-text)' : '#fff',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--p-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: 'var(--p-fhead)' }}>{(t.name_ar || 'م').charAt(0)}</span>
            {t.name_ar}
          </a>
          <nav style={{ display: 'flex', gap: 4 }} className="ps-nav">
            {[['الرئيسية','#hero'],['من نحن','#about'],['المشاريع','#projects'],['الخدمات','#services'],['تواصل','#contact']].map(([label, href]) => (
              <a key={label} href={href} style={{ padding: '8px 14px', fontSize: 14, color: scrolled ? 'var(--p-text)' : '#fff', opacity: .85, fontWeight: 500 }}>{label}</a>
            ))}
          </nav>
          <a
            href={`https://wa.me/${t.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            style={{
              padding: '9px 18px',
              background: 'var(--p-accent)',
              color: '#fff',
              borderRadius: 'var(--p-r)',
              fontSize: 13.5, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            <span>{React.createElement(Icons.whatsapp, { size: 15 })}</span>
            تواصل
          </a>
        </div>
      </header>

      {/* Hero — full bleed */}
      <section id="hero" style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(14,59,46,.55) 0%, rgba(14,59,46,.85) 100%), linear-gradient(135deg, oklch(.55 .07 142) 0%, oklch(.32 .06 142) 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        {/* decorative pattern */}
        <svg viewBox="0 0 1240 800" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#fff" strokeWidth=".5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px 92px', width: '100%', position: 'relative' }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 12px', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(6px)',
              borderRadius: 999, fontSize: 12, marginBottom: 28, letterSpacing: '.05em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--p-accent)' }}></span>
              مكتب سعودي للاستشارات الهندسية · منذ 1432هـ
            </div>
            <h1 style={{
              margin: 0,
              fontFamily: 'var(--p-fhead)',
              fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 600,
              lineHeight: 1.05, letterSpacing: '-0.025em',
            }}>
              نصمم المساحات
              <br/>
              <span style={{ color: 'var(--p-accent)' }}>التي تحكي قصة.</span>
            </h1>
            <p style={{ marginTop: 22, fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,.85)', maxWidth: 560 }}>
              {t.about_ar.slice(0, 180)}...
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#projects" style={{ padding: '14px 28px', background: 'var(--p-accent)', color: '#fff', borderRadius: 'var(--p-r)', fontSize: 14.5, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                استعرض مشاريعنا {React.createElement(Icons.arrowLeft, { size: 16 })}
              </a>
              <a href="#contact" style={{ padding: '14px 28px', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(6px)', color: '#fff', border: '1px solid rgba(255,255,255,.2)', borderRadius: 'var(--p-r)', fontSize: 14.5, fontWeight: 500 }}>تواصل معنا</a>
            </div>
          </div>
          {/* Stats overlay */}
          <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,.18)' }} className="ps-hero-stats">
            {stats.map(s => (
              <div key={s.id}>
                <div className="mono" style={{ fontFamily: 'var(--p-fhead)', fontSize: 38, fontWeight: 600, color: 'var(--p-accent)', display: 'flex', alignItems: 'baseline' }}>
                  {s.value}<span style={{ fontSize: 22 }}>{s.suffix}</span>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '120px 28px', background: 'var(--p-surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'center' }} className="ps-about">
          <div>
            <ProjectCover seed={1} h={420} radius={parseInt(theme.radius) * 1.5} />
          </div>
          <div>
            <span style={{ fontSize: 12, color: 'var(--p-accent)', letterSpacing: '.15em', textTransform: 'uppercase' }}>من نحن</span>
            <h2 style={{ margin: '12px 0 18px', fontFamily: 'var(--p-fhead)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              منذ 2011 ونحن نُؤمن أن المعمار <span style={{ color: 'var(--p-primary)' }}>يبدأ من الناس.</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--p-muted)' }}>{t.about_ar}</p>
            <div style={{ marginTop: 28, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <Btn kind="primary" iconAfter="arrowLeft" style={{ background: 'var(--p-primary)' }}>تعرف أكثر</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '120px 28px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <span style={{ fontSize: 12, color: 'var(--p-accent)', letterSpacing: '.15em', textTransform: 'uppercase' }}>خدماتنا</span>
            <h2 style={{ margin: '12px 0 14px', fontFamily: 'var(--p-fhead)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
              من الفكرة الأولى إلى التسليم النهائي.
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: 'var(--p-muted)' }}>أربع خدمات متكاملة تغطي كل مراحل المشروع المعماري والإنشائي.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} className="ps-services">
            {services.map((s, i) => (
              <div key={s.id} style={{
                padding: 24,
                background: 'var(--p-surface)',
                border: '1px solid var(--p-border)',
                borderRadius: 'var(--p-r)',
                display: 'flex', flexDirection: 'column', gap: 14,
                position: 'relative',
                transition: 'all .2s',
              }}>
                <span style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'var(--p-primary)', color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {React.createElement(Icons[s.icon] || Icons.cube, { size: 20 })}
                </span>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--p-fhead)', fontSize: 18, fontWeight: 600 }}>{s.title}</h3>
                  <p style={{ margin: 0, color: 'var(--p-muted)', fontSize: 13.5, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
                <span style={{ fontFamily: 'var(--p-fhead)', fontSize: 12, color: 'var(--p-accent)', opacity: .6, position: 'absolute', top: 18, insetInlineEnd: 22 }}>0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: '120px 28px', background: 'var(--p-surface)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <span style={{ fontSize: 12, color: 'var(--p-accent)', letterSpacing: '.15em', textTransform: 'uppercase' }}>المشاريع</span>
              <h2 style={{ margin: '12px 0 0', fontFamily: 'var(--p-fhead)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                مختارات من أعمالنا الأخيرة.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {allCats.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  style={{
                    padding: '8px 14px', fontSize: 13, borderRadius: 'var(--p-r)',
                    background: filter === c ? 'var(--p-primary)' : 'transparent',
                    color: filter === c ? '#fff' : 'var(--p-text)',
                    border: '1px solid ' + (filter === c ? 'var(--p-primary)' : 'var(--p-border)'),
                    fontWeight: 500,
                    transition: 'all .15s',
                  }}
                >{c === 'all' ? 'الكل' : c}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="ps-proj-grid">
            {filteredProj.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setProject(p)}
                style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--p-r)' }}>
                  <ProjectCover seed={p.cover_seed} h={280} radius={parseInt(theme.radius)} />
                  <div style={{ position: 'absolute', top: 14, insetInlineStart: 14 }}>
                    <span style={{ padding: '4px 10px', background: 'rgba(255,255,255,.95)', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{p.category}</span>
                  </div>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--p-fhead)', fontSize: 19, fontWeight: 600 }}>{p.title_ar}</h3>
                  <div style={{ marginTop: 4, fontSize: 13, color: 'var(--p-muted)', display: 'flex', gap: 12 }}>
                    <span>{p.location}</span>
                    <span style={{ color: 'var(--p-accent)' }} className="mono">{p.year}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '120px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: 12, color: 'var(--p-accent)', letterSpacing: '.15em', textTransform: 'uppercase' }}>لماذا نحن</span>
            <h2 style={{ margin: '12px 0 0', fontFamily: 'var(--p-fhead)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
              أربع نقاط <span style={{ color: 'var(--p-primary)' }}>تفصلنا</span> عن الآخرين.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} className="ps-features">
            {features.map((f, i) => (
              <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 24, borderInlineStart: i > 0 ? '1px solid var(--p-border)' : 'none' }} className="ps-feature">
                <span style={{ color: 'var(--p-accent)' }}>
                  {React.createElement(Icons[f.icon] || Icons.star, { size: 26 })}
                </span>
                <h3 style={{ margin: 0, fontFamily: 'var(--p-fhead)', fontSize: 18, fontWeight: 600 }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: 'var(--p-muted)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '100px 28px', background: 'var(--p-primary)', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 12, color: 'var(--p-accent)', letterSpacing: '.15em', textTransform: 'uppercase' }}>شهادات</span>
            <h2 style={{ margin: '12px 0 0', fontFamily: 'var(--p-fhead)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
              عملاؤنا يحكون عنا.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="ps-testi">
            {testimonials.map(tm => (
              <div key={tm.id} style={{ padding: 28, background: 'rgba(255,255,255,.05)', backdropFilter: 'blur(6px)', borderRadius: 'var(--p-r)', border: '1px solid rgba(255,255,255,.08)' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[...Array(tm.rating)].map((_, i) => (
                    <span key={i} style={{ color: 'var(--p-accent)' }}>{React.createElement(Icons.star, { size: 14 })}</span>
                  ))}
                </div>
                <p style={{ margin: '0 0 22px', fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,.92)' }}>"{tm.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={tm.name} size={38} bg="rgba(176,138,62,.3)" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{tm.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>{tm.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '120px 28px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--p-accent)', letterSpacing: '.15em', textTransform: 'uppercase' }}>أسئلة</span>
            <h2 style={{ margin: '12px 0 0', fontFamily: 'var(--p-fhead)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
              الأسئلة الشائعة.
            </h2>
          </div>
          <PublicFaq items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '0 28px 100px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          background: 'var(--p-primary)',
          color: '#fff',
          borderRadius: 'calc(var(--p-r) * 2)',
          padding: '64px 56px',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--p-fhead)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
            مشروعك القادم يستحق <span style={{ color: 'var(--p-accent)' }}>الأفضل.</span>
          </h2>
          <p style={{ margin: '14px 0 28px', color: 'rgba(255,255,255,.7)', fontSize: 16, maxWidth: 560, marginInline: 'auto' }}>
            راسلنا لأي استشارة أولية مجانية، ودعنا نناقش رؤيتك وكيف نُحوّلها إلى مكان حقيقي.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${t.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              style={{ padding: '14px 28px', background: 'var(--p-accent)', color: '#fff', borderRadius: 'var(--p-r)', fontSize: 14.5, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              {React.createElement(Icons.whatsapp, { size: 18 })} ابدأ محادثة واتساب
            </a>
            <a
              href={`tel:${t.phone.replace(/\s/g, '')}`}
              style={{ padding: '14px 28px', background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.2)', borderRadius: 'var(--p-r)', fontSize: 14.5, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              {React.createElement(Icons.phone, { size: 16 })} {t.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0a0a0a', color: 'rgba(255,255,255,.6)', padding: '60px 28px 30px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }} className="ps-footer">
            <div>
              <div style={{ fontFamily: 'var(--p-fhead)', fontSize: 24, fontWeight: 600, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ width: 28, height: 28, borderRadius: 4, background: 'var(--p-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700 }}>{(t.name_ar || 'م').charAt(0)}</span>
                {t.name_ar}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 340 }}>
                {t.about_ar?.slice(0, 160) || 'مكتب هندسي متخصص في التصميم المعماري والاستشارات الهندسية.'}
              </p>
              <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
                {[
                  { i: 'instagram', u: '#' },
                  { i: 'twitter', u: '#' },
                  { i: 'linkedin', u: '#' },
                ].map(s => (
                  <a key={s.i} href={s.u} style={{ width: 36, height: 36, background: 'rgba(255,255,255,.05)', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    {React.createElement(Icons[s.i], { size: 15 })}
                  </a>
                ))}
              </div>
            </div>
            <FooterCol title="استكشف" items={['الرئيسية', 'من نحن', 'المشاريع', 'الخدمات', 'تواصل']} />
            <FooterCol title="تواصل" items={[t.phone, t.email, t.address_ar]} />
            <FooterCol title="ساعات العمل" items={['الأحد - الخميس', '8:00 ص - 5:00 م', '', 'الجمعة - السبت', 'مغلق']} />
          </div>
          <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, fontSize: 12 }}>
            <div>© 2026 {t.name_ar}. جميع الحقوق محفوظة.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: .5 }}>
              مدعوم بواسطة <Logo size={14} color="#fff" />
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${t.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        style={{
          position: 'fixed', bottom: 80, insetInlineStart: 24,
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37,211,102,.4)',
          zIndex: 40,
        }}
      >
        {React.createElement(Icons.whatsapp, { size: 26 })}
      </a>

      {/* Project lightbox */}
      <ProjectDetail project={project} onClose={() => setProject(null)} theme={theme} />

      <style>{`
        @media (max-width: 980px) {
          .ps-nav { display: none !important; }
          .ps-about { grid-template-columns: 1fr !important; }
          .ps-services, .ps-features, .ps-testi, .ps-proj-grid, .ps-footer { grid-template-columns: repeat(2, 1fr) !important; }
          .ps-hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .ps-feature { border-inline-start: none !important; }
        }
        @media (max-width: 620px) {
          .ps-services, .ps-features, .ps-testi, .ps-proj-grid, .ps-footer { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const FooterCol = ({ title, items }) => (
  <div>
    <h4 style={{ margin: '0 0 14px', color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'var(--p-fhead)' }}>{title}</h4>
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
      {items.map((x, i) => <li key={i}>{x ? <a href="#" style={{ color: 'rgba(255,255,255,.6)' }}>{x}</a> : <span style={{ height: 6 }}></span>}</li>)}
    </ul>
  </div>
);

const PublicFaq = ({ items }) => {
  const [open, setOpen] = useState(items[0]?.id);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map(q => (
        <div key={q.id} style={{ border: '1px solid var(--p-border)', borderRadius: 'var(--p-r)', background: 'var(--p-surface)' }}>
          <button
            onClick={() => setOpen(open === q.id ? null : q.id)}
            style={{ width: '100%', textAlign: 'right', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--p-fhead)', fontSize: 16, fontWeight: 500 }}
          >
            <span style={{ flex: 1 }}>{q.q}</span>
            <span style={{ transform: open === q.id ? 'rotate(180deg)' : 'none', transition: 'transform .2s', color: 'var(--p-accent)' }}>
              {React.createElement(Icons.chevronDown, { size: 18 })}
            </span>
          </button>
          {open === q.id && (
            <div style={{ padding: '0 22px 18px', color: 'var(--p-muted)', fontSize: 14.5, lineHeight: 1.75 }}>{q.a}</div>
          )}
        </div>
      ))}
    </div>
  );
};

const ProjectDetail = ({ project, onClose, theme }) => {
  if (!project) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        animation: 'wjFadeIn .2s',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 16, maxWidth: 960, width: '100%',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        <div style={{ position: 'relative' }}>
          <ProjectCover seed={project.cover_seed} h={400} radius={0} />
          <button onClick={onClose} style={{ position: 'absolute', top: 14, insetInlineEnd: 14, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,.5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(Icons.x, { size: 18 })}
          </button>
        </div>
        <div style={{ padding: 32 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Badge tone="green">{project.category}</Badge>
            <Badge>{project.location}</Badge>
            <Badge tone="gold">{project.year}</Badge>
          </div>
          <h2 style={{ margin: 0, fontFamily: theme.fontHead, fontSize: 30, fontWeight: 600, letterSpacing: '-0.01em' }}>{project.title_ar}</h2>
          <p style={{ marginTop: 14, color: 'var(--p-muted)', fontSize: 15, lineHeight: 1.75 }}>
            {project.title_ar} هو أحد المشاريع المعمارية المميزة التي نفّذها مكتب الفارابي. صُمّم بعناية ليجمع بين الجمال الوظيفي والاستدامة، مع احترام تام لطبيعة الموقع وثقافة المستخدمين. يمتد المشروع على مساحة {project.area || '—'} متر مربع، وقد تم تنفيذه بمعايير كود البناء السعودي بالكامل.
          </p>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: 18, background: 'var(--p-surface)', borderRadius: 'var(--p-r)' }}>
            <InfoRow label="الموقع" value={project.location} />
            <InfoRow label="السنة" value={project.year} />
            <InfoRow label="المساحة" value={project.area ? `${project.area} م²` : '—'} />
            <InfoRow label="الحالة" value={project.status} />
          </div>
          <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[2, 3, 4, 5, 6, 7].map(i => <ProjectCover key={i} seed={(project.cover_seed + i) % 8 + 1} h={140} radius={8} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

window.PublicSite = PublicSite;
