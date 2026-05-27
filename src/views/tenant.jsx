// Tenant Dashboard — داشبورد المكتب (Supabase integrated)

// ── Shell ─────────────────────────────────────────────────────
const TenantShell = ({ children, page, setPage, go, tenant }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = tenant || DEMO_TENANT;

  const nav = [
    { id: 'home',         label: 'الرئيسية',          icon: 'home' },
    { id: 'info',         label: 'المعلومات الأساسية', icon: 'building' },
    { id: 'projects',     label: 'المشاريع والأعمال',  icon: 'briefcase' },
    { id: 'services',     label: 'الخدمات والمميزات',  icon: 'layers' },
    { id: 'stats',        label: 'الإحصاءات',           icon: 'bar' },
    { id: 'testimonials', label: 'شهادات العملاء',      icon: 'star' },
    { id: 'faqs',         label: 'الأسئلة الشائعة',     icon: 'faq' },
    { id: 'theme',        label: 'القالب',               icon: 'palette' },
    { id: 'domain',       label: 'الدومين',              icon: 'globe' },
    { id: 'subscription', label: 'الاشتراك',             icon: 'card' },
    { id: 'analytics',    label: 'التحليلات',             icon: 'trend' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside className="td-sidebar" style={{ width: 260, flexShrink: 0, borderInlineStart: '1px solid var(--border)', background: 'var(--surface)', padding: 16, display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo size={20} />
          <IconBtn icon="menu" size={32} title="القائمة" onClick={() => setMobileOpen(false)} className="td-mobile-close" />
        </div>

        <div style={{ padding: 12, background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {t.logo_url
              ? <img src={t.logo_url} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }} />
              : <Avatar name={t.short_ar || t.name_ar} size={36} bg="var(--primary)" />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.short_ar || t.name_ar}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{t.subdomain || `${t.slug}.wujood.sa`}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <PlanPill plan={t.plan || 'basic'} />
            <a href={`/site/${t.slug}`} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--primary)', fontWeight: 500 }}>
              زيارة الموقع {React.createElement(Icons.external, { size: 11 })}
            </a>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflowY: 'auto', margin: '0 -4px', padding: '0 4px' }}>
          {nav.map(n => (
            <SideNavItem key={n.id} {...n} active={page === n.id} onClick={() => { setPage(n.id); setMobileOpen(false); }} />
          ))}
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SideNavItem icon="user" label={t.short_ar || 'المكتب'} onClick={() => {}} />
          <SideNavItem icon="logout" label="تسجيل الخروج" onClick={async () => { await sbSignOut(); go('/login'); }} />
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>
        <header style={{ height: 60, background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, padding: '0 26px', position: 'sticky', top: 0, zIndex: 30 }}>
          <IconBtn icon="menu" size={36} className="td-mobile-toggle" onClick={() => setMobileOpen(true)} />
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500 }}>
            {nav.find(n => n.id === page)?.label}
          </h2>
          <div style={{ flex: 1 }} />
          <div style={{ flexShrink: 0, fontSize: 12, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }} className="td-status">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.active ? 'var(--success)' : 'var(--danger)' }} />
            {t.active ? 'موقع منشور' : 'موقع موقوف'}
          </div>
          <IconBtn icon="bell" />
          <Avatar name={t.short_ar || t.name_ar} size={32} />
        </header>

        <div style={{ padding: '26px 28px 60px', maxWidth: 1200, margin: '0 auto' }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 980px) {
          .td-sidebar { position: fixed !important; insetInlineStart: 0; top: 0; bottom: 0; z-index: 100; transform: translateX(${mobileOpen ? '0' : '100%'}); transition: transform .2s ease; }
          .td-mobile-toggle { display: inline-flex !important; }
        }
        @media (min-width: 981px) { .td-mobile-toggle, .td-mobile-close { display: none !important; } }
        @media (max-width: 720px) { .td-status { display: none !important; } }
      `}</style>
    </div>
  );
};

// ── Loading spinner ───────────────────────────────────────────
const PageLoading = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 0', color: 'var(--muted)', gap: 10 }}>
    <div style={{ width: 20, height: 20, border: '2px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    <span style={{ fontSize: 14 }}>جاري التحميل...</span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ── Home ──────────────────────────────────────────────────────
const TenantHome = ({ go, setPage, tenant }) => {
  const t = tenant || DEMO_TENANT;
  const days = daysUntil(t.ends_at);
  return (
    <>
      <SectionHeader
        title={`أهلاً، ${t.short_ar || t.name_ar}`}
        sub={`اشتراكك ينتهي بعد ${days} يوم — ${fmtDate(t.ends_at)}`}
        action={<Btn kind="primary" icon="external" onClick={() => window.open(`/site/${t.slug}`, '_blank')}>زيارة موقعي</Btn>}
      />

      {days <= 30 && (
        <div style={{ marginBottom: 18 }}>
          <Alert tone="warn" icon="warn" title="اشتراكك يقارب الانتهاء"
            action={<Btn kind="accent" size="sm" icon="whatsapp" onClick={() => window.open('https://wa.me/966500000000','_blank')}>تجديد</Btn>}>
            تواصل معنا على واتساب لتجديد اشتراكك قبل الانتهاء وتفادي توقف الموقع.
          </Alert>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }} className="td-stats">
        <StatCard label="حالة الاشتراك" value={t.active ? 'نشط' : 'موقوف'} icon="shield" tone="gold" hint={PLANS[t.plan || 'basic']?.labelAr} />
        <StatCard label="القالب الحالي" value={t.current_template || 'modern'} icon="palette" />
        <StatCard label="أيام متبقية" value={days} suffix="يوم" icon="clock" />
        <StatCard label="الباقة" value={PLANS[t.plan || 'basic']?.labelAr} icon="card" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }} className="td-home-grid">
        <Card>
          <SectionHeader title="نظرة سريعة على الموقع" sub="آخر النشاط على موقعك خلال 30 يوماً" />
          <MiniChart />
          <hr className="wj-hr" style={{ margin: '20px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[{ label: 'إجمالي الزيارات', value: '1,847', icon: 'eye' }, { label: 'مشاهدات المشاريع', value: '623', icon: 'briefcase' }, { label: 'ضغطات الواتساب', value: '94', icon: 'whatsapp' }].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--bg-alt)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  {React.createElement(Icons[s.icon], { size: 16 })}
                </span>
                <div>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-display)' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card>
            <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>الخطوات التالية</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { done: !!(t.name_ar && t.about_ar), label: 'إعداد المعلومات الأساسية', click: 'info' },
                { done: !!t.logo_url, label: 'رفع الشعار وصورة الغلاف', click: 'info' },
                { done: false, label: 'إضافة شهادات العملاء', click: 'testimonials' },
                { done: false, label: 'ضبط الأسئلة الشائعة', click: 'faqs' },
              ].map((s, i) => (
                <button key={i} onClick={() => s.click && setPage(s.click)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', textAlign: 'right', color: s.done ? 'var(--muted)' : 'var(--ink)', textDecoration: s.done ? 'line-through' : 'none' }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: s.done ? 'var(--primary)' : 'var(--bg-alt)', color: s.done ? '#fff' : 'var(--muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: s.done ? 'none' : '1px solid var(--border-strong)', flexShrink: 0 }}>
                    {s.done && React.createElement(Icons.check, { size: 12 })}
                  </span>
                  <span style={{ fontSize: 13.5, flex: 1 }}>{s.label}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>روابط موقعك</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <LinkRow label="Subdomain" value={t.subdomain || `${t.slug}.wujood.sa`} />
              {t.custom_domain && <LinkRow label="دومين مخصص" value={t.custom_domain} verified />}
            </div>
          </Card>
        </div>
      </div>

      <style>{`@media (max-width: 980px) { .td-stats { grid-template-columns: repeat(2, 1fr) !important; } .td-home-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
};

const LinkRow = ({ label, value, verified }) => {
  const copy = () => { navigator.clipboard.writeText(value); showToast('تم النسخ ✓'); };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'var(--bg-alt)', borderRadius: 8, fontSize: 13 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{label}</div>
        <div className="mono" style={{ fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
      </div>
      {verified && <Badge tone="green" dot>متحقق</Badge>}
      <IconBtn icon="copy" size={28} title="نسخ" onClick={copy} />
    </div>
  );
};

const MiniChart = () => {
  const data = [30, 42, 35, 58, 48, 65, 72, 60, 78, 85, 76, 92, 88, 95, 102, 89, 110, 124, 118, 105, 134, 142, 128, 156, 148, 162, 175, 168, 184, 190];
  const max = Math.max(...data);
  return (
    <svg viewBox="0 0 320 100" preserveAspectRatio="none" style={{ width: '100%', height: 110 }}>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e3b2e" stopOpacity=".18" />
          <stop offset="100%" stopColor="#0e3b2e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M0,${100 - (data[0] / max) * 90} ${data.map((v, i) => `L${(i / (data.length - 1)) * 320},${100 - (v / max) * 90}`).join(' ')} L320,100 L0,100 Z`} fill="url(#g1)" />
      <path d={`M0,${100 - (data[0] / max) * 90} ${data.map((v, i) => `L${(i / (data.length - 1)) * 320},${100 - (v / max) * 90}`).join(' ')}`} fill="none" stroke="#0e3b2e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ── Info page ─────────────────────────────────────────────────
const normalizeTenant = (src) => {
  const base = { ...DEMO_TENANT, ...(src || {}) };
  return {
    ...base,
    name_ar: base.name_ar || '', name_en: base.name_en || '', short_ar: base.short_ar || '',
    about_ar: base.about_ar || '', about_en: base.about_en || '',
    phone: base.phone || '', whatsapp: base.whatsapp || '', email: base.email || '',
    address_ar: base.address_ar || '', maps_url: base.maps_url || '',
    social: base.social || {}, video_url: base.video_url || '',
    logo_url: base.logo_url || '', cover_url: base.cover_url || '',
    whatsapp_note: base.whatsapp_note || '',
  };
};

const TenantInfo = ({ tenant, setTenant }) => {
  const [t, setT]   = useState(() => normalizeTenant(tenant));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const upd = (k, v) => setT(prev => ({ ...prev, [k]: v }));

  const save = async () => {
    if (!t.id) { setSaved(true); setTimeout(() => setSaved(false), 1800); return; }
    setSaving(true);
    const { data, error } = await sbUpdateTenant(t.id, {
      name_ar: t.name_ar, name_en: t.name_en, short_ar: t.short_ar,
      about_ar: t.about_ar, about_en: t.about_en,
      phone: t.phone, whatsapp: t.whatsapp, email: t.email,
      address_ar: t.address_ar, maps_url: t.maps_url,
      social: t.social, video_url: t.video_url, whatsapp_note: t.whatsapp_note,
      logo_url: t.logo_url, cover_url: t.cover_url,
    });
    setSaving(false);
    if (!error && data) { setTenant(data); setT(data); setSaved(true); setTimeout(() => setSaved(false), 1800); showToast('تم الحفظ بنجاح ✓'); }
    else showToast('حدث خطأ أثناء الحفظ', 'err');
  };

  const handleUpload = async (bucket, field, file) => {
    if (!file) return;
    const path = `${t.id || 'demo'}/${Date.now()}.${file.name.split('.').pop()}`;
    const { url, error } = await sbUpload(bucket, path, file);
    if (!error && url) upd(field, url);
    else showToast('فشل رفع الصورة', 'err');
  };

  return (
    <>
      <SectionHeader
        title="المعلومات الأساسية"
        sub="هذه البيانات تظهر على موقعك مباشرة. اضغط حفظ بعد التعديل."
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn kind="secondary" icon="refresh" onClick={() => setT(normalizeTenant(tenant))}>إلغاء</Btn>
            <Btn kind="primary" icon="check" onClick={save} disabled={saving}>{saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}</Btn>
          </div>
        }
      />

      {saved && (
        <div style={{ marginBottom: 14 }}>
          <Alert tone="success" icon="check" title="تم الحفظ">سيظهر التحديث على موقعك خلال ثوانٍ.</Alert>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 14, alignItems: 'flex-start' }} className="info-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Brand / images */}
          <Card>
            <h3 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>الهوية البصرية</h3>
            <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--muted)' }}>الشعار وصورة الغلاف اللي تظهر في موقعك.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14 }}>
              <UploadSlot label="الشعار" hint="PNG/SVG · 2MB" ratio="1/1" currentUrl={t.logo_url}
                onUpload={url => upd('logo_url', url)}
                onFile={f => handleUpload('logos', 'logo_url', f)} />
              <UploadSlot label="صورة الغلاف" hint="JPG/WebP · 5MB" ratio="16/9" currentUrl={t.cover_url}
                onUpload={url => upd('cover_url', url)}
                onFile={f => handleUpload('covers', 'cover_url', f)} />
            </div>
            <hr className="wj-hr" style={{ margin: '18px 0' }} />
            <Field label="رابط الفيديو التعريفي (اختياري)" hint="رابط من يوتيوب أو فيمو">
              <Input dir="ltr" style={{ textAlign: 'left' }} placeholder="https://youtube.com/watch?v=..." value={t.video_url || ''} onChange={e => upd('video_url', e.target.value)} />
            </Field>
          </Card>

          {/* Names */}
          <Card>
            <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>الاسم والنبذة</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="الاسم بالعربي *"><Input value={t.name_ar} onChange={e => upd('name_ar', e.target.value)} /></Field>
              <Field label="الاسم بالإنجليزي"><Input value={t.name_en} onChange={e => upd('name_en', e.target.value)} dir="ltr" style={{ textAlign: 'left' }} /></Field>
            </div>
            <div style={{ marginTop: 14 }}>
              <Field label="النبذة التعريفية (عربي)" hint={`${(t.about_ar || '').length} / 600 حرف`}>
                <Textarea value={t.about_ar} onChange={e => upd('about_ar', e.target.value)} rows={4} />
              </Field>
            </div>
            <div style={{ marginTop: 14 }}>
              <Field label="النبذة التعريفية (English)">
                <Textarea value={t.about_en} onChange={e => upd('about_en', e.target.value)} dir="ltr" style={{ textAlign: 'left' }} rows={3} />
              </Field>
            </div>
          </Card>

          {/* Contact */}
          <Card>
            <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>التواصل</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="رقم الهاتف"><Input value={t.phone} onChange={e => upd('phone', e.target.value)} dir="ltr" style={{ textAlign: 'left' }} /></Field>
              <Field label="رقم واتساب"><Input value={t.whatsapp} onChange={e => upd('whatsapp', e.target.value)} dir="ltr" style={{ textAlign: 'left' }} /></Field>
              <Field label="البريد الإلكتروني للعرض" hint="غير بريد الدخول"><Input value={t.email} onChange={e => upd('email', e.target.value)} dir="ltr" style={{ textAlign: 'left' }} /></Field>
              <Field label="ملاحظة واتساب" hint="تظهر في رسالة الواتساب"><Input value={t.whatsapp_note || ''} onChange={e => upd('whatsapp_note', e.target.value)} placeholder="مرحباً، أود الاستفسار عن خدماتكم..." /></Field>
              <Field label="العنوان"><Input value={t.address_ar} onChange={e => upd('address_ar', e.target.value)} /></Field>
              <Field label="رابط Google Maps"><Input dir="ltr" value={t.maps_url || ''} onChange={e => upd('maps_url', e.target.value)} placeholder="https://maps.google.com/..." style={{ textAlign: 'left' }} /></Field>
            </div>
          </Card>

          {/* Social */}
          <Card>
            <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>السوشيال ميديا</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {[
                { k: 'instagram', l: 'إنستقرام', ic: 'instagram' },
                { k: 'twitter',   l: 'تويتر / X', ic: 'twitter' },
                { k: 'linkedin',  l: 'لينكدإن',   ic: 'linkedin' },
                { k: 'snapchat',  l: 'سناب شات',  ic: 'snapchat' },
                { k: 'tiktok',    l: 'تيك توك',   ic: 'tiktok' },
              ].map(s => (
                <div key={s.k} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 10, border: '1px solid var(--border)', borderRadius: 10 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--bg-alt)', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.createElement(Icons[s.ic], { size: 14 })}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--muted)', minWidth: 60 }}>{s.l}</span>
                  <input className="wj-input sm" style={{ flex: 1, textAlign: 'left' }} dir="ltr" placeholder="@username"
                    value={(t.social || {})[s.k] || ''}
                    onChange={e => upd('social', { ...(t.social || {}), [s.k]: e.target.value })} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Live preview */}
        <div style={{ position: 'sticky', top: 80 }} className="info-aside">
          <Card pad={false}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>معاينة مصغّرة</span>
              <span style={{ marginInlineStart: 'auto' }}><Badge tone="green" dot>مباشر</Badge></span>
            </div>
            <div style={{ padding: 14 }}>
              {t.cover_url
                ? <img src={t.cover_url} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
                : <ProjectCover seed={2} h={120} radius={8} />}
              <div style={{ marginTop: 12 }}>
                {t.logo_url && <img src={t.logo_url} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', marginBottom: 8, border: '1px solid var(--border)' }} />}
                <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>{t.short_ar || t.name_ar}</h4>
                <p style={{ margin: '6px 0 0', fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {(t.about_ar || '').slice(0, 130)}{t.about_ar?.length > 130 ? '...' : ''}
                </p>
              </div>
              <div style={{ marginTop: 12, padding: 10, background: 'var(--bg-alt)', borderRadius: 8, fontSize: 11.5, color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span>📞 {t.phone}</span>
                <span>✉ {t.email}</span>
                <span>📍 {t.address_ar}</span>
              </div>
            </div>
          </Card>
          <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>التغييرات تظهر على موقعك مباشرة بعد الحفظ.</p>
        </div>
      </div>

      <style>{`@media (max-width: 980px) { .info-grid { grid-template-columns: 1fr !important; } .info-aside { position: static !important; } }`}</style>
    </>
  );
};

const UploadSlot = ({ label, hint, ratio = '1/1', currentUrl, onFile }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(currentUrl || '');
  const [uploading, setUploading] = useState(false);

  useEffect(() => { if (currentUrl) setPreview(currentUrl); }, [currentUrl]);

  const onChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setPreview(URL.createObjectURL(file));
    if (onFile) await onFile(file);
    setUploading(false);
  };

  return (
    <Field label={label} hint={hint}>
      <div
        onClick={() => inputRef.current?.click()}
        style={{ aspectRatio: ratio, border: preview ? 'none' : '1.5px dashed var(--border-strong)', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, background: preview ? 'transparent' : 'var(--bg-alt)', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
      >
        <input type="file" ref={inputRef} style={{ display: 'none' }} accept="image/*" onChange={onChange} />
        {preview
          ? <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <><span style={{ color: 'var(--muted)' }}>{React.createElement(Icons.upload, { size: 22 })}</span><span style={{ fontSize: 12, color: 'var(--muted)' }}>{uploading ? 'جاري الرفع...' : 'اسحب صورة أو اضغط للرفع'}</span></>}
        {preview && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity .2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
            <span style={{ background: 'rgba(0,0,0,.6)', color: '#fff', padding: '6px 12px', borderRadius: 8, fontSize: 12 }}>{uploading ? 'جاري الرفع...' : 'تغيير'}</span>
          </div>
        )}
      </div>
    </Field>
  );
};

// ── Projects ──────────────────────────────────────────────────
const TenantProjects = ({ tenantId, plan }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('all');
  const [view, setView]         = useState('grid');
  const [editing, setEditing]   = useState(null);

  useEffect(() => {
    if (!tenantId) { setProjects(DEMO_PROJECTS); setLoading(false); return; }
    sbGetProjects(tenantId).then(({ data }) => {
      setProjects(data?.length ? data : DEMO_PROJECTS);
      setLoading(false);
    });
  }, [tenantId]);

  const saveProject = async (form) => {
    if (!tenantId) { setEditing(null); return; }
    if (form.id) {
      const { data, error } = await sbUpdateProject(form.id, form);
      if (!error) setProjects(prev => prev.map(p => p.id === form.id ? data : p));
      else showToast('خطأ في الحفظ', 'err');
    } else {
      const { data, error } = await sbAddProject({ ...form, tenant_id: tenantId, order_idx: projects.length });
      if (!error) setProjects(prev => [...prev, data]);
      else showToast('خطأ في الإضافة', 'err');
    }
    setEditing(null);
    showToast(form.id ? 'تم تحديث المشروع ✓' : 'تمت إضافة المشروع ✓');
  };

  const deleteProject = async (id) => {
    if (!confirm('هل تريد حذف هذا المشروع نهائياً؟')) return;
    await sbDeleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
    setEditing(null);
    showToast('تم الحذف');
  };

  const filtered = projects.filter(p => {
    if (filter !== 'all' && p.category !== filter) return false;
    if (search && !p.title_ar.includes(search)) return false;
    return true;
  });

  const cats = ['all', ...new Set(projects.map(p => p.category))];
  const planLimit = PLANS[plan || 'basic'].projects;
  const usedPct   = planLimit === Infinity ? 0 : (projects.length / planLimit) * 100;

  if (loading) return <PageLoading />;

  return (
    <>
      <SectionHeader
        title="المشاريع والأعمال"
        sub={`${projects.length} ${planLimit === Infinity ? 'مشروع منشور — غير محدود' : `من ${planLimit} مسموح به`}`}
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn kind="primary" icon="plus" onClick={() => setEditing({})}>إضافة مشروع</Btn>
          </div>
        }
      />

      {planLimit !== Infinity && (
        <div style={{ marginBottom: 18, padding: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)', flexShrink: 0 }}>استخدام الباقة</span>
          <div style={{ flex: 1, height: 6, background: 'var(--bg-alt)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${usedPct}%`, background: usedPct > 80 ? 'var(--warn)' : 'var(--primary)', borderRadius: 999, transition: 'width .3s' }} />
          </div>
          <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{projects.length} / {planLimit}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}><SearchInput value={search} onChange={setSearch} placeholder="بحث في المشاريع..." /></div>
        <Select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 160 }}>
          {cats.map(c => <option key={c} value={c}>{c === 'all' ? 'كل التصنيفات' : c}</option>)}
        </Select>
        <div style={{ display: 'inline-flex', gap: 2, padding: 3, background: 'var(--bg-alt)', borderRadius: 8 }}>
          {['grid', 'list'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: '6px 10px', borderRadius: 6, background: view === v ? 'var(--surface)' : 'transparent', color: view === v ? 'var(--ink)' : 'var(--muted)' }}>
              {React.createElement(Icons[v], { size: 15 })}
            </button>
          ))}
        </div>
      </div>

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="proj-grid">
          {filtered.map(p => (
            <div key={p.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                {p.cover_url
                  ? <img src={p.cover_url} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                  : <ProjectCover seed={p.cover_seed || 1} label={p.title_ar} h={150} radius={0} />}
                {p.featured && (
                  <span style={{ position: 'absolute', top: 10, insetInlineStart: 10, padding: '4px 8px', background: 'rgba(255,255,255,.95)', color: 'var(--accent)', borderRadius: 6, fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {React.createElement(Icons.star, { size: 11 })} مميّز
                  </span>
                )}
              </div>
              <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}><Badge>{p.category}</Badge><Badge>{p.year}</Badge></div>
                <h3 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>{p.title_ar}</h3>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', flex: 1 }}>{p.location}</p>
                <div style={{ display: 'flex', gap: 4, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <Btn kind="ghost" size="sm" icon="edit" onClick={() => setEditing(p)}>تعديل</Btn>
                  <Btn kind="ghost" size="sm" icon="trash" onClick={() => deleteProject(p.id)}>حذف</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card pad={false}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--bg-alt)' }}>
              <tr>{['', 'العنوان', 'التصنيف', 'الموقع', 'السنة', 'مميّز', ''].map((h, i) => (
                <th key={i} style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, color: 'var(--muted)', fontWeight: 500, borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ width: 48, height: 36, borderRadius: 5, overflow: 'hidden' }}>
                      {p.cover_url ? <img src={p.cover_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ProjectCover seed={p.cover_seed || 1} h={36} radius={5} />}
                    </div>
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: 13.5, fontWeight: 500 }}>{p.title_ar}</td>
                  <td style={{ padding: '10px 14px' }}><Badge>{p.category}</Badge></td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)' }}>{p.location}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13 }} className="mono">{p.year}</td>
                  <td style={{ padding: '10px 14px' }}>{p.featured && <span style={{ color: 'var(--accent)' }}>{React.createElement(Icons.star, { size: 15 })}</span>}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      <IconBtn icon="edit" size={28} onClick={() => setEditing(p)} />
                      <IconBtn icon="trash" size={28} onClick={() => deleteProject(p.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <ProjectModal
        project={editing}
        onClose={() => setEditing(null)}
        onSave={saveProject}
        onDelete={deleteProject}
        tenantId={tenantId}
      />

      <style>{`@media (max-width: 980px) { .proj-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 600px) { .proj-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
};

const ProjectModal = ({ project, onClose, onSave, onDelete, tenantId }) => {
  const [form, setForm] = useState({
    title_ar: '', title_en: '', category: 'سكني', location: '', year: new Date().getFullYear(),
    description: '', featured: false, status: 'مكتمل', area: '', rooms: '', baths: '',
    cover_seed: Math.ceil(Math.random() * 8),
  });
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    if (project) setForm({ title_ar: '', title_en: '', category: 'سكني', location: '', year: new Date().getFullYear(), description: '', featured: false, status: 'مكتمل', area: '', rooms: '', baths: '', cover_seed: Math.ceil(Math.random() * 8), ...project });
  }, [project]);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.title_ar.trim()) { showToast('العنوان بالعربي مطلوب', 'err'); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      title={form.id ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
      width={760}
      footer={
        <>
          <Btn kind="primary" icon="check" onClick={submit} disabled={saving}>{saving ? 'جاري...' : 'حفظ'}</Btn>
          <Btn kind="ghost" onClick={onClose}>إلغاء</Btn>
          <div style={{ marginInlineStart: 'auto' }}>
            {form.id && <Btn kind="danger" icon="trash" onClick={() => onDelete(form.id)}>حذف</Btn>}
          </div>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="العنوان (عربي) *"><Input value={form.title_ar} onChange={e => upd('title_ar', e.target.value)} /></Field>
        <Field label="العنوان (English)"><Input value={form.title_en} onChange={e => upd('title_en', e.target.value)} dir="ltr" style={{ textAlign: 'left' }} /></Field>
        <Field label="التصنيف">
          <Select value={form.category} onChange={e => upd('category', e.target.value)}>
            {['سكني','تجاري','تعليمي','صحي','ديني','حكومي','صناعي','ترفيهي'].map(c => <option key={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="الموقع"><Input value={form.location} onChange={e => upd('location', e.target.value)} /></Field>
        <Field label="السنة"><Input type="number" value={form.year} onChange={e => upd('year', +e.target.value)} className="mono" /></Field>
        <Field label="الحالة">
          <Select value={form.status} onChange={e => upd('status', e.target.value)}>
            {['تحت الإنشاء','مكتمل','للبيع'].map(s => <option key={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="المساحة (م²)"><Input type="number" value={form.area || ''} onChange={e => upd('area', e.target.value)} /></Field>
        <Field label="عدد الغرف"><Input type="number" value={form.rooms || ''} onChange={e => upd('rooms', e.target.value)} /></Field>
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label="الوصف"><Textarea rows={3} value={form.description || ''} onChange={e => upd('description', e.target.value)} /></Field>
      </div>
      <div style={{ marginTop: 14, padding: 14, background: 'var(--bg-alt)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 500, fontSize: 14 }}>مشروع مميّز</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>يظهر في الصفحة الرئيسية</div>
        </div>
        <Toggle on={form.featured} onChange={v => upd('featured', v)} />
      </div>
    </Modal>
  );
};

// ── Services & Features ───────────────────────────────────────
const TenantServices = ({ tenantId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState('service');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!tenantId) { setItems([...DEMO_SERVICES, ...DEMO_FEATURES]); setLoading(false); return; }
    sbGetServices(tenantId).then(({ data }) => {
      setItems(data?.length ? data : [...DEMO_SERVICES, ...DEMO_FEATURES]);
      setLoading(false);
    });
  }, [tenantId]);

  const togglePublished = async (item) => {
    const newVal = !item.published;
    if (tenantId) await sbUpdateService(item.id, { published: newVal });
    setItems(prev => prev.map(x => x.id === item.id ? { ...x, published: newVal } : x));
  };

  const saveItem = async (form) => {
    if (!tenantId) { setEditing(null); return; }
    const payload = { ...form, type: tab };
    if (form.id) {
      const { data, error } = await sbUpdateService(form.id, payload);
      if (!error) setItems(prev => prev.map(x => x.id === form.id ? data : x));
    } else {
      const { data, error } = await sbAddService({ ...payload, tenant_id: tenantId, order_idx: items.length });
      if (!error) setItems(prev => [...prev, data]);
    }
    setEditing(null);
    showToast('تم الحفظ ✓');
  };

  const deleteItem = async (id) => {
    if (!confirm('هل تريد الحذف؟')) return;
    if (tenantId) await sbDeleteService(id);
    setItems(prev => prev.filter(x => x.id !== id));
    setEditing(null);
    showToast('تم الحذف');
  };

  const filtered = items.filter(x => x.type === tab);
  if (loading) return <PageLoading />;

  return (
    <>
      <SectionHeader
        title="الخدمات والمميزات"
        sub="إدارة الخدمات اللي يقدمها مكتبك والنقاط التنافسية."
      />
      <TabBar tabs={[{ id: 'service', label: 'الخدمات', icon: 'briefcase' }, { id: 'feature', label: 'المميزات', icon: 'sparkles' }]} active={tab} onChange={setTab} />
      <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <Btn kind="primary" icon="plus" onClick={() => setEditing({})}>إضافة {tab === 'service' ? 'خدمة' : 'ميزة'}</Btn>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }} className="srv-grid">
        {filtered.map(s => (
          <Card key={s.id}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(Icons[s.icon] || Icons.cube, { size: 20 })}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600 }}>{s.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{s.desc || s.description}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                <Toggle on={s.published} onChange={() => togglePublished(s)} />
                <div style={{ display: 'flex', gap: 2 }}>
                  <IconBtn icon="edit" size={26} onClick={() => setEditing(s)} />
                  <IconBtn icon="trash" size={26} onClick={() => deleteItem(s.id)} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ServiceModal item={editing} type={tab} onClose={() => setEditing(null)} onSave={saveItem} onDelete={deleteItem} />
      <style>{`@media (max-width: 720px) { .srv-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
};

const ServiceModal = ({ item, type, onClose, onSave, onDelete }) => {
  const [form, setForm] = useState({ title: '', desc: '', icon: 'cube', published: true });
  useEffect(() => { if (item) setForm({ title: '', desc: '', icon: 'cube', published: true, ...item, desc: item.desc || item.description || '' }); }, [item]);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const icons = ['cube', 'shield', 'bar', 'palette', 'star', 'users', 'clock', 'layers', 'briefcase', 'check', 'home', 'globe'];
  return (
    <Modal open={!!item} onClose={onClose} title={form.id ? `تعديل ${type === 'service' ? 'الخدمة' : 'الميزة'}` : `إضافة ${type === 'service' ? 'خدمة' : 'ميزة'}`} width={500}
      footer={<><Btn kind="primary" icon="check" onClick={() => onSave(form)}>حفظ</Btn><Btn kind="ghost" onClick={onClose}>إلغاء</Btn><div style={{ marginInlineStart: 'auto' }}>{form.id && <Btn kind="danger" icon="trash" onClick={() => onDelete(form.id)}>حذف</Btn>}</div></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="العنوان *"><Input value={form.title} onChange={e => upd('title', e.target.value)} /></Field>
        <Field label="الوصف"><Textarea rows={3} value={form.desc} onChange={e => upd('desc', e.target.value)} /></Field>
        <Field label="الأيقونة">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {icons.map(ic => (
              <button key={ic} onClick={() => upd('icon', ic)} style={{ width: 38, height: 38, borderRadius: 8, border: `2px solid ${form.icon === ic ? 'var(--primary)' : 'var(--border)'}`, background: form.icon === ic ? 'var(--primary-soft)' : 'var(--bg-alt)', color: form.icon === ic ? 'var(--primary)' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(Icons[ic], { size: 16 })}
              </button>
            ))}
          </div>
        </Field>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--bg-alt)', borderRadius: 10 }}>
          <span style={{ fontSize: 14 }}>نشر على الموقع</span>
          <Toggle on={form.published} onChange={v => upd('published', v)} />
        </div>
      </div>
    </Modal>
  );
};

// ── Stats ─────────────────────────────────────────────────────
const TenantStats = ({ tenantId }) => {
  const [stats, setStats]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!tenantId) { setStats(DEMO_STATS); setLoading(false); return; }
    sbGetStats(tenantId).then(({ data }) => {
      setStats(data?.length ? data : DEMO_STATS);
      setLoading(false);
    });
  }, [tenantId]);

  const saveStat = async (form) => {
    if (!tenantId) { setEditing(null); return; }
    if (form.id) {
      const { data } = await sbUpdateStat(form.id, { value: +form.value, suffix: form.suffix, label: form.label });
      if (data) setStats(prev => prev.map(s => s.id === form.id ? data : s));
    } else {
      const { data } = await sbAddStat({ ...form, value: +form.value, tenant_id: tenantId, order_idx: stats.length });
      if (data) setStats(prev => [...prev, data]);
    }
    setEditing(null);
    showToast('تم الحفظ ✓');
  };

  const deleteStat = async (id) => {
    if (!confirm('حذف هذا الرقم؟')) return;
    if (tenantId) await sbDeleteStat(id);
    setStats(prev => prev.filter(s => s.id !== id));
    showToast('تم الحذف');
  };

  if (loading) return <PageLoading />;

  return (
    <>
      <SectionHeader title="الإحصاءات" sub="الأرقام اللي تظهر في قسم 'من نحن' على موقعك."
        action={<Btn kind="primary" icon="plus" onClick={() => setEditing({ value: '', suffix: '+', label: '' })}>إضافة رقم</Btn>} />
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {stats.map(s => (
            <div key={s.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted)' }}>{React.createElement(Icons.drag, { size: 16 })}</span>
              <span className="mono" style={{ fontSize: 22, fontWeight: 600, color: 'var(--primary)', minWidth: 60 }}>{s.value}{s.suffix}</span>
              <span style={{ flex: 1, fontSize: 14, color: 'var(--muted)' }}>{s.label}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <IconBtn icon="edit" size={28} onClick={() => setEditing(s)} />
                <IconBtn icon="trash" size={28} onClick={() => deleteStat(s.id)} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <StatModal stat={editing} onClose={() => setEditing(null)} onSave={saveStat} />
    </>
  );
};

const StatModal = ({ stat, onClose, onSave }) => {
  const [form, setForm] = useState({ value: '', suffix: '+', label: '' });
  useEffect(() => { if (stat) setForm({ value: '', suffix: '+', label: '', ...stat }); }, [stat]);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <Modal open={!!stat} onClose={onClose} title={form.id ? 'تعديل الرقم' : 'إضافة رقم جديد'} width={400}
      footer={<><Btn kind="primary" icon="check" onClick={() => onSave(form)}>حفظ</Btn><Btn kind="ghost" onClick={onClose}>إلغاء</Btn></>}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <Field label="الرقم"><Input type="number" value={form.value} onChange={e => upd('value', e.target.value)} className="mono" /></Field>
        <Field label="اللاحقة"><Input value={form.suffix} onChange={e => upd('suffix', e.target.value)} className="mono" placeholder="+" /></Field>
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label="التسمية"><Input value={form.label} onChange={e => upd('label', e.target.value)} placeholder="مثال: سنة خبرة" /></Field>
      </div>
    </Modal>
  );
};

// ── Testimonials ──────────────────────────────────────────────
const TenantTestimonials = ({ tenantId }) => {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!tenantId) { setItems(DEMO_TESTIMONIALS); setLoading(false); return; }
    sbGetTestimonials(tenantId).then(({ data }) => {
      setItems(data?.length ? data : DEMO_TESTIMONIALS);
      setLoading(false);
    });
  }, [tenantId]);

  const togglePub = async (item) => {
    const v = !item.published;
    if (tenantId) await sbUpdateTestimonial(item.id, { published: v });
    setItems(prev => prev.map(x => x.id === item.id ? { ...x, published: v } : x));
  };

  const saveItem = async (form) => {
    if (!tenantId) { setEditing(null); return; }
    if (form.id) {
      const { data } = await sbUpdateTestimonial(form.id, form);
      if (data) setItems(prev => prev.map(x => x.id === form.id ? data : x));
    } else {
      const { data } = await sbAddTestimonial({ ...form, tenant_id: tenantId });
      if (data) setItems(prev => [...prev, data]);
    }
    setEditing(null);
    showToast('تم الحفظ ✓');
  };

  const deleteItem = async (id) => {
    if (!confirm('حذف هذه الشهادة؟')) return;
    if (tenantId) await sbDeleteTestimonial(id);
    setItems(prev => prev.filter(x => x.id !== id));
    showToast('تم الحذف');
  };

  if (loading) return <PageLoading />;

  return (
    <>
      <SectionHeader title="شهادات العملاء" sub="آراء عملائك اللي تظهر على موقعك."
        action={<Btn kind="primary" icon="plus" onClick={() => setEditing({ name: '', role: '', text: '', rating: 5, published: true })}>إضافة شهادة</Btn>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }} className="srv-grid">
        {items.map(t => (
          <Card key={t.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <Avatar name={t.name} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.role}</div>
                </div>
              </div>
              <Toggle on={t.published} onChange={() => togglePub(t)} />
            </div>
            <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: i < (t.rating || 5) ? 'var(--accent)' : 'var(--border)' }}>{React.createElement(Icons.star, { size: 14 })}</span>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.65 }}>"{t.text || t.body}"</p>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
              <IconBtn icon="edit" size={28} onClick={() => setEditing(t)} />
              <IconBtn icon="trash" size={28} onClick={() => deleteItem(t.id)} />
            </div>
          </Card>
        ))}
      </div>
      <TestimonialModal item={editing} onClose={() => setEditing(null)} onSave={saveItem} />
    </>
  );
};

const TestimonialModal = ({ item, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', role: '', text: '', rating: 5, published: true });
  useEffect(() => { if (item) setForm({ name: '', role: '', text: '', rating: 5, published: true, ...item, text: item.text || item.body || '' }); }, [item]);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <Modal open={!!item} onClose={onClose} title={form.id ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'} width={500}
      footer={<><Btn kind="primary" icon="check" onClick={() => onSave(form)}>حفظ</Btn><Btn kind="ghost" onClick={onClose}>إلغاء</Btn></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="الاسم *"><Input value={form.name} onChange={e => upd('name', e.target.value)} /></Field>
          <Field label="الصفة / الشركة"><Input value={form.role} onChange={e => upd('role', e.target.value)} /></Field>
        </div>
        <Field label="نص الشهادة *"><Textarea rows={4} value={form.text} onChange={e => upd('text', e.target.value)} /></Field>
        <Field label="التقييم">
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3,4,5].map(r => (
              <button key={r} onClick={() => upd('rating', r)} style={{ color: r <= form.rating ? 'var(--accent)' : 'var(--border)', padding: 4 }}>
                {React.createElement(Icons.star, { size: 22 })}
              </button>
            ))}
          </div>
        </Field>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--bg-alt)', borderRadius: 10 }}>
          <span style={{ fontSize: 14 }}>نشر على الموقع</span>
          <Toggle on={form.published} onChange={v => upd('published', v)} />
        </div>
      </div>
    </Modal>
  );
};

// ── FAQs ──────────────────────────────────────────────────────
const TenantFaqs = ({ tenantId }) => {
  const [faqs, setFaqs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!tenantId) { setFaqs(DEMO_FAQS); setLoading(false); return; }
    sbGetFaqs(tenantId).then(({ data }) => {
      setFaqs(data?.length ? data : DEMO_FAQS);
      setLoading(false);
    });
  }, [tenantId]);

  const togglePub = async (faq) => {
    const v = !faq.published;
    if (tenantId) await sbUpdateFaq(faq.id, { published: v });
    setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, published: v } : f));
  };

  const saveAnswer = async (faq) => {
    if (!tenantId) return;
    await sbUpdateFaq(faq.id, { answer: faq.a });
    showToast('تم الحفظ ✓');
  };

  const saveNewFaq = async (form) => {
    if (!tenantId) { setEditing(null); return; }
    if (form.id) {
      const { data } = await sbUpdateFaq(form.id, form);
      if (data) setFaqs(prev => prev.map(f => f.id === form.id ? data : f));
    } else {
      const { data } = await sbAddFaq({ ...form, tenant_id: tenantId });
      if (data) setFaqs(prev => [...prev, data]);
    }
    setEditing(null);
    showToast('تم الحفظ ✓');
  };

  const deleteFaq = async (id) => {
    if (!confirm('حذف هذا السؤال؟')) return;
    if (tenantId) await sbDeleteFaq(id);
    setFaqs(prev => prev.filter(f => f.id !== id));
    showToast('تم الحذف');
  };

  if (loading) return <PageLoading />;

  return (
    <>
      <SectionHeader title="الأسئلة الشائعة" sub="الأسئلة اللي يكررها زوار موقعك."
        action={<Btn kind="primary" icon="plus" onClick={() => setEditing({ q: '', a: '', published: true })}>إضافة سؤال</Btn>} />
      <Card pad={false}>
        {faqs.map((q, i) => (
          <div key={q.id} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <button onClick={() => setOpen(open === q.id ? null : q.id)}
              style={{ width: '100%', textAlign: 'right', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: 'var(--muted)' }}>{React.createElement(Icons.drag, { size: 14 })}</span>
              <span style={{ flex: 1, fontWeight: 500, fontSize: 14.5 }}>{q.q || q.question}</span>
              <Toggle on={q.published} onChange={() => togglePub(q)} />
              <span style={{ transform: open === q.id ? 'rotate(180deg)' : 'none', transition: 'transform .2s', color: 'var(--muted)' }}>
                {React.createElement(Icons.chevronDown, { size: 16 })}
              </span>
            </button>
            {open === q.id && (
              <div style={{ padding: '0 20px 16px 56px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Textarea defaultValue={q.a || q.answer} rows={3}
                  onChange={e => setFaqs(prev => prev.map(f => f.id === q.id ? { ...f, a: e.target.value } : f))} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn kind="primary" size="sm" icon="check" onClick={() => saveAnswer(q)}>حفظ</Btn>
                  <Btn kind="ghost" size="sm" icon="edit" onClick={() => setEditing(q)}>تعديل السؤال</Btn>
                  <Btn kind="danger" size="sm" icon="trash" onClick={() => deleteFaq(q.id)}>حذف</Btn>
                </div>
              </div>
            )}
          </div>
        ))}
      </Card>
      <FaqModal faq={editing} onClose={() => setEditing(null)} onSave={saveNewFaq} />
    </>
  );
};

const FaqModal = ({ faq, onClose, onSave }) => {
  const [form, setForm] = useState({ q: '', a: '', published: true });
  useEffect(() => { if (faq) setForm({ q: '', a: '', published: true, ...faq, q: faq.q || faq.question || '', a: faq.a || faq.answer || '' }); }, [faq]);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <Modal open={!!faq} onClose={onClose} title={form.id ? 'تعديل السؤال' : 'إضافة سؤال جديد'} width={500}
      footer={<><Btn kind="primary" icon="check" onClick={() => onSave(form)}>حفظ</Btn><Btn kind="ghost" onClick={onClose}>إلغاء</Btn></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="السؤال *"><Input value={form.q} onChange={e => upd('q', e.target.value)} /></Field>
        <Field label="الجواب"><Textarea rows={4} value={form.a} onChange={e => upd('a', e.target.value)} /></Field>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--bg-alt)', borderRadius: 10 }}>
          <span style={{ fontSize: 14 }}>نشر على الموقع</span>
          <Toggle on={form.published} onChange={v => upd('published', v)} />
        </div>
      </div>
    </Modal>
  );
};

// ── Theme picker ──────────────────────────────────────────────
const TenantTheme = ({ tenant, setTenant }) => {
  const t = tenant || DEMO_TENANT;
  const [active, setActive] = useState(t.current_template || 'modern');
  const [saving, setSaving] = useState(false);

  const themes = [
    { id: 'modern',  name: 'Modern',  desc: 'أبيض نظيف + أخضر',  plan: 'basic',   colors: ['#ffffff', '#0e3b2e', '#b08a3e'] },
    { id: 'classic', name: 'Classic', desc: 'كريمي + بني',         plan: 'pro',     colors: ['#f6efe3', '#5a3e2b', '#c69749'] },
    { id: 'minimal', name: 'Minimal', desc: 'مساحات بيضاء',        plan: 'pro',     colors: ['#fafafa', '#1a1a1a', '#888'] },
    { id: 'luxury',  name: 'Luxury',  desc: 'أسود + ذهبي',         plan: 'pro',     colors: ['#0a0a0a', '#d4a85a', '#f4ecd8'] },
    { id: 'heritage',name: 'Heritage',desc: 'طيني + تراثي',        plan: 'premium', colors: ['#f4e9d4', '#b85c3d', '#3d2b1f'] },
    { id: 'studio',  name: 'Studio',  desc: 'داكن + أخضر ساج',     plan: 'premium', colors: ['#1a1a1c', '#7a8c6f', '#f5f3ee'] },
  ];

  const applyTheme = async (id) => {
    const locked = t.plan === 'basic' && themes.find(x => x.id === id)?.plan !== 'basic';
    if (locked) { showToast('هذا القالب يحتاج ترقية الباقة', 'warn'); return; }
    setActive(id);
    if (!t.id) return;
    setSaving(true);
    const { data } = await sbUpdateTenant(t.id, { current_template: id });
    if (data) setTenant(data);
    setSaving(false);
    showToast('تم تطبيق القالب ✓');
  };

  return (
    <>
      <SectionHeader title="اختيار القالب" sub={`القالب الحالي: ${active}${saving ? ' — جاري الحفظ...' : ''}`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }} className="tmpl-grid">
        {themes.map(th => {
          const locked = t.plan === 'basic' && th.plan !== 'basic';
          return (
            <button key={th.id} onClick={() => applyTheme(th.id)} disabled={locked}
              style={{ textAlign: 'right', background: 'var(--surface)', border: `2px solid ${active === th.id ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative', opacity: locked ? 0.6 : 1, cursor: locked ? 'not-allowed' : 'pointer', transition: 'border-color .2s' }}>
              <div style={{ aspectRatio: '4/3', background: th.colors[0], padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 11, color: th.colors[1], opacity: .7 }}>STUDIO</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: th.colors[1] }}>مكتب</div>
                  <div style={{ height: 4, background: th.colors[2], width: '50%', marginTop: 8, borderRadius: 2 }} />
                </div>
              </div>
              <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {th.name}
                    {active === th.id && <Badge tone="green" dot>الحالي</Badge>}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{th.desc}</div>
                </div>
                {locked && <Badge tone="gold">{PLANS[th.plan].labelAr}</Badge>}
              </div>
            </button>
          );
        })}
      </div>
      <style>{`@media (max-width: 980px) { .tmpl-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 600px) { .tmpl-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
};

// ── Domain ────────────────────────────────────────────────────
const TenantDomain = ({ tenant }) => {
  const t = tenant || DEMO_TENANT;
  const isPrem = t.plan === 'premium';
  const [verified, setVerified] = useState(!!t.custom_domain);
  const copyLink = (val) => { navigator.clipboard.writeText(val); showToast('تم النسخ ✓'); };

  return (
    <>
      <SectionHeader title="الدومين" sub="رابط موقعك على الإنترنت." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="dom-grid">
        <Card>
          <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontSize: 16 }}>Subdomain (مجاني)</h3>
          <div style={{ padding: 12, background: 'var(--bg)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, flex: 1 }}>{t.subdomain || `${t.slug}.wujood.sa`}</span>
            <Badge tone="green" dot>نشط</Badge>
            <IconBtn icon="copy" title="نسخ" onClick={() => copyLink(t.subdomain || `${t.slug}.wujood.sa`)} />
            <IconBtn icon="external" title="فتح" onClick={() => window.open(`/site/${t.slug}`, '_blank')} />
          </div>
          <p style={{ marginTop: 12, fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
            هذا الرابط متاح لجميع الباقات وغير قابل للتغيير بعد الإنشاء.
          </p>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16 }}>دومين مخصص</h3>
            <Badge tone="gold">Premium</Badge>
          </div>
          {!isPrem ? (
            <Alert tone="info" title="غير متاح في باقتك">
              الدومين المخصص متاح في باقة Premium فقط. <a href="#" style={{ color: 'var(--primary)' }}>الترقية</a>
            </Alert>
          ) : (
            <>
              <Field label="الدومين المخصص">
                <Input defaultValue={t.custom_domain || ''} dir="ltr" style={{ textAlign: 'left' }} placeholder="moktab.com" />
              </Field>
              <div style={{ marginTop: 12, padding: 12, background: 'var(--bg)', borderRadius: 10, fontSize: 12.5, fontFamily: 'var(--font-mono)' }}>
                <div style={{ color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>أضف هذا السجل في إعدادات DNS:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 6 }}>
                  <span style={{ color: 'var(--muted)' }}>Type</span><span>CNAME</span>
                  <span style={{ color: 'var(--muted)' }}>Name</span><span>@</span>
                  <span style={{ color: 'var(--muted)' }}>Value</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>cname.wujood.sa <IconBtn icon="copy" size={22} onClick={() => copyLink('cname.wujood.sa')} /></span>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                {verified ? <Badge tone="green" dot>تم التحقق</Badge> : <Badge tone="amber" dot>قيد الانتظار</Badge>}
                <Btn kind="secondary" size="sm" icon="refresh" onClick={() => { setVerified(true); showToast('تم التحقق ✓'); }}>إعادة الفحص</Btn>
              </div>
            </>
          )}
        </Card>
      </div>
      <style>{`@media (max-width: 880px) { .dom-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
};

// ── Subscription ──────────────────────────────────────────────
const TenantSubscription = ({ tenant }) => {
  const t = tenant || DEMO_TENANT;
  const [logs, setLogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const days = daysUntil(t.ends_at);

  useEffect(() => {
    if (!t.id) { setLogs(SUBSCRIPTION_LOG); setLoading(false); return; }
    sbGetSubLogs(t.id).then(({ data }) => {
      setLogs(data?.length ? data : SUBSCRIPTION_LOG);
      setLoading(false);
    });
  }, [t.id]);

  return (
    <>
      <SectionHeader title="الاشتراك" sub="حالة باقتك وسجل التجديدات." />
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginBottom: 18 }} className="sub-grid">
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.08em' }}>الباقة الحالية</div>
              <h2 style={{ margin: '4px 0', fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600 }}>{PLANS[t.plan]?.labelAr}</h2>
              <div style={{ fontSize: 14, color: 'var(--muted)' }}><span className="mono">{fmtSAR(PLANS[t.plan]?.priceY || 0)}</span> ريال / سنة</div>
            </div>
            <PlanPill plan={t.plan || 'basic'} />
          </div>
          <hr className="wj-hr" style={{ margin: '20px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <InfoRow label="ينتهي بتاريخ" value={fmtDate(t.ends_at)} />
            <InfoRow label="آخر تجديد" value={t.starts_at ? fmtDate(t.starts_at) : '—'} />
            <InfoRow label="الأيام المتبقية" value={`${days} يوم`} />
            <InfoRow label="حالة الاشتراك" value={t.active ? 'نشط' : 'موقوف'} />
          </div>
          <hr className="wj-hr" style={{ margin: '20px 0' }} />
          <Alert tone="warn" icon="info" title="للتجديد أو الترقية">
            تواصل معنا على واتساب وسنُحدّث اشتراكك خلال 24 ساعة.
            <div style={{ marginTop: 10 }}>
              <Btn kind="accent" icon="whatsapp" onClick={() => window.open('https://wa.me/966500000000','_blank')}>تجديد عبر واتساب</Btn>
            </div>
          </Alert>
        </Card>
        <Card>
          <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontSize: 16 }}>مميزات باقتك</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              `${PLANS[t.plan]?.projects === Infinity ? 'مشاريع غير محدودة' : (PLANS[t.plan]?.projects || 10) + ' مشروع'}`,
              `${PLANS[t.plan]?.storage || '500 ميجا'} تخزين`,
              PLANS[t.plan]?.templates || 'قالب أساسي',
              PLANS[t.plan]?.custom_domain ? 'دومين مستقل' : 'subdomain فقط',
              'دعم فني عبر واتساب',
            ].map((x, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5 }}>
                <span style={{ color: 'var(--primary)' }}>{React.createElement(Icons.check, { size: 16 })}</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card pad={false}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16 }}>سجل الاشتراكات</h3>
        </div>
        {loading ? <PageLoading /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--bg-alt)' }}>
              <tr>{['التاريخ', 'الإجراء', 'الباقة', 'المبلغ', 'الملاحظة'].map(h => (
                <th key={h} style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={l.id || i} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{l.at || l.created_at?.split('T')[0]}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13.5, fontWeight: 500 }}>{l.action}</td>
                  <td style={{ padding: '12px 14px' }}><PlanPill plan={l.plan || 'basic'} /></td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{fmtSAR(l.amount || 0)} ريال</td>
                  <td style={{ padding: '12px 14px', fontSize: 12.5, color: 'var(--muted)' }}>{l.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      <style>{`@media (max-width: 880px) { .sub-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
};

const InfoRow = ({ label, value }) => (
  <div>
    <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.05em' }}>{label}</div>
    <div style={{ fontSize: 14, fontWeight: 500, marginTop: 3 }}>{value}</div>
  </div>
);

// ── Analytics ─────────────────────────────────────────────────
const TenantAnalytics = () => (
  <>
    <SectionHeader title="التحليلات" sub="إحصاءات زوار موقعك خلال آخر 30 يوماً." action={
      <Select defaultValue="30"><option value="7">آخر 7 أيام</option><option value="30">آخر 30 يوم</option><option value="90">آخر 90 يوم</option></Select>
    } />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 14 }} className="td-stats">
      <StatCard label="إجمالي الزيارات" value="1,847" icon="eye" hint="+23% عن الفترة السابقة" />
      <StatCard label="زوار فريدون" value="1,124" icon="users" />
      <StatCard label="مشاهدات الصفحات" value="4,632" icon="layers" />
      <StatCard label="متوسط مدة الزيارة" value="2:47" icon="clock" tone="gold" />
    </div>
    <Card><SectionHeader title="الزيارات عبر الزمن" sub="" /><MiniChart /></Card>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 14 }} className="an-grid">
      <Card>
        <h4 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 15 }}>أكثر الصفحات زيارة</h4>
        {[{ p: '/ (الرئيسية)', c: 1247 }, { p: '/projects', c: 893 }, { p: '/contact', c: 287 }].map(x => (
          <div key={x.p} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: '1px solid var(--border)', fontSize: 13 }}>
            <span style={{ flex: 1, fontFamily: 'var(--font-mono)', color: 'var(--ink-soft)' }}>{x.p}</span>
            <span className="mono" style={{ color: 'var(--muted)' }}>{x.c.toLocaleString('en-US')}</span>
          </div>
        ))}
      </Card>
      <Card>
        <h4 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 15 }}>الأجهزة</h4>
        {[{ d: 'الجوال', p: 68 }, { d: 'سطح المكتب', p: 24 }, { d: 'التابلت', p: 8 }].map(x => (
          <div key={x.d} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}><span>{x.d}</span><span className="mono" style={{ color: 'var(--muted)' }}>{x.p}%</span></div>
            <div style={{ height: 5, background: 'var(--bg-alt)', borderRadius: 999 }}><div style={{ height: '100%', width: `${x.p}%`, background: 'var(--primary)', borderRadius: 999 }} /></div>
          </div>
        ))}
      </Card>
      <Card>
        <h4 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 15 }}>مصادر الزيارات</h4>
        {[{ s: 'Google', p: 46 }, { s: 'مباشر', p: 22 }, { s: 'Instagram', p: 16 }, { s: 'WhatsApp', p: 10 }].map(x => (
          <div key={x.s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: '1px solid var(--border)', fontSize: 13 }}>
            <span style={{ flex: 1 }}>{x.s}</span>
            <span className="mono" style={{ color: 'var(--muted)', fontSize: 12 }}>{x.p}%</span>
          </div>
        ))}
      </Card>
    </div>
    <style>{`@media (max-width: 980px) { .an-grid { grid-template-columns: 1fr !important; } }`}</style>
  </>
);

// ── Main Tenant component ─────────────────────────────────────
const Tenant = ({ go, tenant, setTenant, user }) => {
  const [page, setPage] = useState('home');
  const [checking, setChecking] = useState(!tenant);

  // Auto-fetch on mount — bypasses any hanging sbGetSession by using the
  // user object already resolved by App's auth init
  useEffect(() => {
    if (tenant) { setChecking(false); return; }
    let cancelled = false;
    const timer = setTimeout(() => { if (!cancelled) setChecking(false); }, 6000);

    sbGetMyTenant().then(({ data }) => {
      if (cancelled) return;
      clearTimeout(timer);
      if (data) setTenant(data);
      setChecking(false);
    }).catch(() => {
      if (!cancelled) { clearTimeout(timer); setChecking(false); }
    });

    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  const [retrying, setRetrying] = useState(false);
  const retry = async () => {
    setRetrying(true);
    try {
      const { data } = await sbGetMyTenant();
      if (data) setTenant(data);
    } catch(e) { console.error(e); }
    setRetrying(false);
  };

  if (checking) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 12, background: 'var(--bg)' }}>
      <Logo size={28} />
      <div style={{ width: 28, height: 28, border: '2px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <div style={{ fontSize: 14, color: 'var(--muted)' }}>جاري تحميل بيانات مكتبك...</div>
    </div>
  );

  if (!tenant) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
      <Logo size={32} />
      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22 }}>لا يوجد مكتب مرتبط بحسابك</h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>تواصل مع مدير المنصة لتفعيل حسابك.</p>
      {user?.email && (
        <p className="mono" style={{ fontSize: 12, color: 'var(--muted)', margin: 0, padding: '6px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
          {user.email}
        </p>
      )}
      {user?.id && (
        <p className="mono" style={{ fontSize: 10, color: 'var(--muted)', margin: 0, padding: '4px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, opacity: 0.7 }}>
          ID: {user.id}
        </p>
      )}
      <Btn kind="primary" icon="refresh" onClick={retry} disabled={retrying}>{retrying ? 'جاري المحاولة...' : 'إعادة المحاولة'}</Btn>
      <Btn kind="secondary" icon="whatsapp" onClick={() => window.open('https://wa.me/966500000000','_blank')}>تواصل عبر واتساب</Btn>
      <Btn kind="ghost" onClick={async () => { await sbSignOut(); go('/login'); }}>تسجيل خروج</Btn>
    </div>
  );

  const map = {
    home:         <TenantHome go={go} setPage={setPage} tenant={tenant} />,
    info:         <TenantInfo tenant={tenant} setTenant={setTenant} />,
    projects:     <TenantProjects tenantId={tenant.id} plan={tenant.plan} />,
    services:     <TenantServices tenantId={tenant.id} />,
    stats:        <TenantStats tenantId={tenant.id} />,
    testimonials: <TenantTestimonials tenantId={tenant.id} />,
    faqs:         <TenantFaqs tenantId={tenant.id} />,
    theme:        <TenantTheme tenant={tenant} setTenant={setTenant} />,
    domain:       <TenantDomain tenant={tenant} />,
    subscription: <TenantSubscription tenant={tenant} />,
    analytics:    <TenantAnalytics />,
  };

  return (
    <TenantShell page={page} setPage={setPage} go={go} tenant={tenant}>
      {map[page] || null}
    </TenantShell>
  );
};

window.Tenant = Tenant;
