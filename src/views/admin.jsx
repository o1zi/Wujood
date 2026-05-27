// Admin Dashboard — داشبورد المنصة

const AdminShell = ({ children, page, setPage, go }) => {
  const nav = [
    { id: 'home', label: 'الرئيسية', icon: 'home' },
    { id: 'tenants', label: 'المكاتب', icon: 'building' },
    { id: 'templates', label: 'القوالب المخصصة', icon: 'palette' },
    { id: 'stats', label: 'إحصاءات المنصة', icon: 'bar' },
    { id: 'logs', label: 'سجل العمليات', icon: 'list' },
    { id: 'settings', label: 'الإعدادات', icon: 'settings' },
  ];
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside
        className="adp-sidebar"
        style={{
          width: 240, flexShrink: 0,
          borderInlineStart: '1px solid var(--border)',
          background: 'var(--ink)',
          color: '#e8eae5',
          padding: 16,
          display: 'flex', flexDirection: 'column', gap: 14,
          position: 'sticky', top: 0, height: '100vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>
            <span style={{ color: '#fff' }}>وجود</span>
            <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%' }}></span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', fontFamily: 'var(--font-mono)', marginInlineStart: 4 }}>admin</span>
          </span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, marginTop: 8 }}>
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', padding: '10px 12px', borderRadius: 8,
                fontSize: 14, fontWeight: 500,
                color: page === n.id ? '#fff' : 'rgba(255,255,255,.6)',
                background: page === n.id ? 'rgba(176,138,62,.18)' : 'transparent',
                textAlign: 'right',
                transition: 'all .15s',
                position: 'relative',
              }}
              onMouseEnter={(e) => page !== n.id && (e.currentTarget.style.background = 'rgba(255,255,255,.04)')}
              onMouseLeave={(e) => page !== n.id && (e.currentTarget.style.background = 'transparent')}
            >
              {page === n.id && <span style={{ position: 'absolute', insetInlineEnd: -1, top: 8, bottom: 8, width: 2, background: 'var(--accent)', borderRadius: 2 }}></span>}
              {React.createElement(Icons[n.icon], { size: 16 })}
              <span style={{ flex: 1 }}>{n.label}</span>
              {n.badge && <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,.4)' }}>{n.badge}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: 12, background: 'rgba(255,255,255,.04)', borderRadius: 10, fontSize: 12, color: 'rgba(255,255,255,.65)' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
            <Avatar name="مالك المنصة" size={32} bg="rgba(176,138,62,.3)" />
            <div style={{ minWidth: 0 }}>
              <div style={{ color: '#fff', fontWeight: 500 }}>مالك المنصة</div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>admin@wujood.sa</div>
            </div>
          </div>
          <button onClick={async () => { await sbSignOut(); go('/login'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,.55)', fontSize: 12 }}>
            {React.createElement(Icons.logout, { size: 13 })} تسجيل الخروج
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>
        <header style={{
          height: 60, background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 14, padding: '0 26px',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500 }}>
            {nav.find(n => n.id === page)?.label}
          </h2>
          <Badge tone="red" dot>Admin</Badge>
          <div style={{ flex: 1 }}></div>
          <div style={{ width: 280 }} className="adp-search"><SearchInput placeholder="بحث عن مكتب، sluغ، دومين..." /></div>
          <IconBtn icon="bell" />
        </header>
        <div style={{ padding: '26px 28px 60px', maxWidth: 1340, margin: '0 auto' }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 880px) {
          .adp-search { display: none !important; }
        }
      `}</style>
    </div>
  );
};

// === Admin Home ===
const AdminHome = ({ setPage }) => {
  const [stats, setStats] = useState(ADMIN_PLATFORM_STATS);
  const [allTenants, setAllTenants] = useState(ADMIN_TENANTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([sbGetAdminStats(), sbGetAllTenants()]).then(([statsRes, tenantsRes]) => {
      if (statsRes && !statsRes.error) setStats(statsRes);
      if (tenantsRes?.data?.length) setAllTenants(tenantsRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const endingSoon = allTenants.filter(t => t.active && daysUntil(t.ends_at) <= 60 && daysUntil(t.ends_at) > 0);
  const recent = [...allTenants].sort((a, b) => (new Date(b.created_at || b.created || 0)) - (new Date(a.created_at || a.created || 0))).slice(0, 5);

  return (
    <>
      <SectionHeader
        title="نظرة عامة"
        sub="إحصائيات سريعة عن منصتك وما يحتاج متابعة."
        action={<Btn kind="primary" icon="plus">إضافة مكتب جديد</Btn>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }} className="adp-stats">
        <StatCard label="إجمالي المكاتب" value={loading ? '...' : stats.total_tenants} icon="building" />
        <StatCard label="المكاتب النشطة" value={loading ? '...' : stats.active_tenants} icon="check" tone="gold" />
        <StatCard label="ستنتهي خلال 30 يوم" value={loading ? '...' : stats.ending_soon} icon="clock" hint="تحتاج متابعة" />
        <StatCard label="إيرادات سنوية" value={loading ? '...' : fmtSAR(stats.monthly_revenue * 12 / 1000) + 'K'} suffix="ريال" icon="trend" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }} className="adp-home-grid">
        <Card pad={false}>
          <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16 }}>اشتراكات تحتاج متابعة</h3>
              <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--muted)' }}>المكاتب اللي اشتراكها يقارب الانتهاء.</p>
            </div>
            <Btn kind="ghost" size="sm" iconAfter="arrowLeft" onClick={() => setPage('tenants')}>عرض كل المكاتب</Btn>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--bg-alt)' }}>
              <tr>{['المكتب', 'الباقة', 'ينتهي', 'المتبقي', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'right', fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {endingSoon.map(t => {
                const days = daysUntil(t.ends_at);
                const tName = t.name_ar || t.name || '';
                const tSlug = t.slug || '';
                return (
                  <tr key={t.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={tName} size={32} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{tName}</div>
                        <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{tSlug}.wujood.sa</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}><PlanPill plan={t.plan} /></td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{t.ends_at}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge tone={days <= 14 ? 'red' : days <= 30 ? 'amber' : 'default'}>
                        {days} يوم
                      </Badge>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Btn kind="secondary" size="sm" icon="whatsapp">تذكير</Btn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <Card>
          <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontSize: 16 }}>آخر المكاتب المضافة</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recent.map(t => {
              const tName = t.name_ar || t.name || '';
              const created = t.created_at || t.created || '';
              return (
              <div key={t.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Avatar name={tName} size={34} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tName}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{created}</div>
                </div>
                <PlanPill plan={t.plan} />
              </div>
            )})}
          </div>
        </Card>
      </div>

      <style>{`
        @media (max-width: 980px) { .adp-stats { grid-template-columns: repeat(2, 1fr) !important; } .adp-home-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
};

// === Admin: Tenants ===
const AdminTenants = ({ go }) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [plan, setPlan] = useState('all');
  const [adding, setAdding] = useState(false);
  const [opening, setOpening] = useState(null);
  const [tenants, setTenants] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTenants = async () => {
    setLoading(true);
    const { data, error } = await sbGetAllTenants();
    if (!error && data?.length) setTenants(data);
    else setTenants(ADMIN_TENANTS);
    setLoading(false);
  };

  useEffect(() => { loadTenants(); }, []);

  const refreshAfterAction = () => { loadTenants(); };

  const source = tenants || ADMIN_TENANTS;

  const filtered = source.filter(t => {
    if (search && !((t.name || t.name_ar || '').includes(search) || (t.slug || '').includes(search))) return false;
    if (status === 'active' && !t.active) return false;
    if (status === 'inactive' && t.active) return false;
    if (status === 'ending' && (!t.active || daysUntil(t.ends_at) > 60)) return false;
    if (plan !== 'all' && t.plan !== plan) return false;
    return true;
  });

  return (
    <>
      <SectionHeader
        title="إدارة المكاتب"
        sub={loading ? 'جاري التحميل...' : `${filtered.length} مكتب`}
        action={<Btn kind="primary" icon="plus" onClick={() => setAdding(true)}>إضافة مكتب جديد</Btn>}
      />

      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}><SearchInput value={search} onChange={setSearch} placeholder="بحث بالاسم أو slug..." /></div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: 150 }}>
          <option value="all">كل الحالات</option>
          <option value="active">نشط</option>
          <option value="ending">قارب الانتهاء</option>
          <option value="inactive">موقوف</option>
        </Select>
        <Select value={plan} onChange={(e) => setPlan(e.target.value)} style={{ width: 130 }}>
          <option value="all">كل الباقات</option>
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="premium">Premium</option>
        </Select>
      </div>

      <Card pad={false}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
            <thead style={{ background: 'var(--bg-alt)' }}>
              <tr>{['المكتب', 'القطاع', 'الباقة', 'الحالة', 'ينتهي', 'المشاريع', 'الدومين', ''].map(h => (
                <th key={h} style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, color: 'var(--muted)', fontWeight: 500, borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map(t => {
                const name = t.name_ar || t.name || '';
                const slug = t.slug || '';
                const projectsCount = t.projects || 0;
                return (
                <tr
                  key={t.id}
                  onClick={() => setOpening(t)}
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background .15s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={name} size={32} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{name}</div>
                        <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 12.5 }}>{SECTORS[t.sector]?.label}</td>
                  <td style={{ padding: '12px 14px' }}><PlanPill plan={t.plan} /></td>
                  <td style={{ padding: '12px 14px' }}><StatePill active={t.active} endsAt={t.ends_at} /></td>
                  <td style={{ padding: '12px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{t.ends_at}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontFamily: 'var(--font-mono)' }}>{projectsCount}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    {t.custom_domain ? t.custom_domain : <span style={{ opacity: .5 }}>—</span>}
                  </td>
                  <td style={{ padding: '12px 14px' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <IconBtn icon="external" size={28} title="فتح موقع المكتب" onClick={() => window.open(`/site/${slug}`, '_blank')} />
                      <IconBtn icon="edit" size={28} title="تعديل" onClick={() => setOpening(t)} />
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </Card>

      <AddTenantModal open={adding} onClose={() => setAdding(false)} onCreated={refreshAfterAction} />
      <TenantDetailModal tenant={opening} onClose={() => setOpening(null)} go={go} onRefresh={refreshAfterAction} />
    </>
  );
};

const AddTenantModal = ({ open, onClose, onCreated }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [sector, setSector] = useState('architecture');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [plan, setPlan] = useState('pro');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (name) setSlug(name.toLowerCase().replace(/[^\w\u0600-\u06FF]+/g, '-').replace(/^-|-$/g, '').slice(0, 40));
  }, [name]);

  useEffect(() => {
    if (!open) { setStep(1); setName(''); setSlug(''); setSector('architecture'); setOwnerEmail(''); setOwnerPassword(''); setPlan('pro'); setStartDate(new Date().toISOString().split('T')[0]); setEndDate(new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]); setNote(''); setCreating(false); }
  }, [open]);

  const handleCreate = async () => {
    if (!name || !slug || !ownerEmail) { showToast('يرجى تعبئة الحقول المطلوبة', 'warn'); return; }
    setCreating(true);
    const { data, error } = await sbCreateTenant({
      tenantData: { name_ar: name, slug, sector },
      ownerEmail,
      ownerPassword: ownerPassword || Math.random().toString(36).slice(2) + 'Aa1!',
      planData: { plan, starts_at: startDate, ends_at: endDate },
      note: note || 'إنشاء حساب جديد',
    });
    setCreating(false);
    if (!error && data) {
      showToast('تم إنشاء المكتب بنجاح ✓');
      onClose();
      if (onCreated) onCreated();
    } else {
      showToast('فشل إنشاء المكتب: ' + (error || 'خطأ غير معروف'), 'err');
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="إضافة مكتب جديد"
      width={620}
      footer={
        step === 1 ? (
            <Btn kind="primary" iconAfter="arrowLeft" onClick={() => { if (!name) { showToast('يرجى إدخال اسم المكتب', 'warn'); return; } setStep(2); }} disabled={!name}>التالي</Btn>
          ) : (
            <>
              <Btn kind="primary" icon="check" onClick={handleCreate} disabled={creating}>{creating ? 'جاري الإنشاء...' : 'إنشاء الحساب وإرسال إيميل ترحيب'}</Btn>
              <Btn kind="ghost" onClick={() => setStep(1)} disabled={creating}>رجوع</Btn>
          </>
        )
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <StepDot label="1. معلومات المكتب" active={step === 1} done={step > 1} />
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }}></span>
        <StepDot label="2. الباقة والاشتراك" active={step === 2} done={false} />
      </div>

      {step === 1 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="اسم المكتب (عربي) *">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: مكتب الرواد الهندسي" />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Slug (الرابط)" hint="لا يتغير بعد الإنشاء — يحدد الـ subdomain">
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} dir="ltr" style={{ textAlign: 'left' }} className="mono" />
            </Field>
            <Field label="القطاع المهني *">
              <Select value={sector} onChange={(e) => setSector(e.target.value)}>
                {Object.entries(SECTORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </Select>
            </Field>
          </div>
          {slug && (
            <div style={{ padding: 12, background: 'var(--primary-soft)', borderRadius: 10, fontSize: 13 }}>
              <span style={{ color: 'var(--muted)' }}>الرابط الناتج: </span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 500 }}>{slug}.wujood.sa</span>
            </div>
          )}
          <hr className="wj-hr" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="بريد المالك (للدخول)"><Input dir="ltr" type="email" style={{ textAlign: 'left' }} placeholder="owner@example.com" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} /></Field>
            <Field label="كلمة المرور (اختياري — تُولّد آلياً إن تُركت فارغة)"><Input placeholder="اتركها فارغة للتوليد التلقائي" value={ownerPassword} onChange={e => setOwnerPassword(e.target.value)} /></Field>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {Object.values(PLANS).map(p => (
              <label key={p.id} onClick={() => setPlan(p.id)} style={{ padding: 14, border: `2px solid ${plan === p.id ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer' }}>
                <input type="radio" name="plan" checked={plan === p.id} onChange={() => setPlan(p.id)} style={{ accentColor: 'var(--primary)' }} />
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontWeight: 600 }}>{p.labelAr}</div>
                  <div className="mono" style={{ fontSize: 18, fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>{fmtSAR(p.priceY)}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>ريال / سنة</div>
                </div>
              </label>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="تاريخ بداية الاشتراك"><Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></Field>
            <Field label="تاريخ انتهاء الاشتراك"><Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></Field>
          </div>
          <Field label="ملاحظة (رقم التحويل، اسم المحوّل)" hint="تظهر في سجل الاشتراكات">
            <Textarea rows={2} placeholder="مثال: تحويل #4827 بنك الراجحي - عبدالله الفارابي" value={note} onChange={e => setNote(e.target.value)} />
          </Field>
          <Alert tone="info" title="عند الإنشاء">
            سيُنشأ حساب Supabase Auth، سجل في جدول tenants، يُربط بالمستخدم، ويُسجّل في subscription_logs.
            وسيُرسل إيميل ترحيب تلقائي عبر Resend.
          </Alert>
        </div>
      )}
    </Modal>
  );
};

const StepDot = ({ label, active, done }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontSize: 13,
    color: active ? 'var(--primary)' : done ? 'var(--ink)' : 'var(--muted)',
    fontWeight: active ? 600 : 400,
  }}>
    <span style={{
      width: 22, height: 22, borderRadius: '50%',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: done ? 'var(--primary)' : active ? 'var(--primary-soft)' : 'var(--bg-alt)',
      color: done ? '#fff' : active ? 'var(--primary)' : 'var(--muted)',
      fontSize: 12, fontWeight: 600,
    }}>{done ? React.createElement(Icons.check, { size: 12 }) : label.slice(0, 1)}</span>
    {label}
  </span>
);

const TenantDetailModal = ({ tenant, onClose, go, onRefresh }) => {
  const [busy, setBusy] = useState(null);
  const [subLogs, setSubLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    if (!tenant?.id) return;
    setLogsLoading(true);
    sbGetSubLogs(tenant.id).then(({ data }) => {
      setSubLogs(data?.length ? data : SUBSCRIPTION_LOG);
      setLogsLoading(false);
    });
  }, [tenant?.id]);

  if (!tenant) return null;
  const name = tenant.name_ar || tenant.name || '';
  const slug = tenant.slug || '';
  const days = daysUntil(tenant.ends_at);

  const handleAction = async (action) => {
    setBusy(action);
    let result;
    if (action === 'renew') result = await sbRenewTenant(tenant.id, 12);
    else if (action === 'upgrade') {
      const plans = ['basic', 'pro', 'premium'];
      const cur = plans.indexOf(tenant.plan);
      const nextPlan = plans[Math.min(cur + 1, plans.length - 1)];
      if (nextPlan === tenant.plan) { showToast('المكتب بالفعل على أعلى باقة', 'warn'); setBusy(null); return; }
      result = await sbUpgradePlan(tenant.id, nextPlan);
    }
    else if (action === 'pause') result = await sbPauseTenant(tenant.id);
    else if (action === 'delete') {
      if (!confirm('هل أنت متأكد من حذف هذا المكتب نهائياً؟ لا يمكن التراجع.')) { setBusy(null); return; }
      result = await sbDeleteTenant(tenant.id);
    }
    setBusy(null);
    if (!result?.error) {
      showToast(`تم ${action === 'renew' ? 'تجديد الاشتراك' : action === 'upgrade' ? 'ترقية الباقة' : action === 'pause' ? 'إيقاف المكتب' : 'حذف المكتب'} ✓`);
      onClose();
      if (onRefresh) onRefresh();
    } else {
      showToast('حدث خطأ: ' + (result.error || 'غير معروف'), 'err');
    }
  };

  return (
    <Modal
      open={!!tenant}
      onClose={onClose}
      title={name}
      width={720}
      footer={
        <>
          <Btn kind="primary" icon="external" onClick={() => window.open(`/site/${slug}`, '_blank')}>فتح موقع المكتب</Btn>
          <Btn kind="secondary" icon="user" onClick={() => { onClose(); if (slug) go(`/site/${slug}`); }}>دخول كصاحب المكتب</Btn>
          <div style={{ marginInlineStart: 'auto' }}><Btn kind="danger" icon="trash" onClick={() => handleAction('delete')} disabled={busy}>حذف نهائي</Btn></div>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 18 }}>
        <InfoRow label="Slug" value={slug} />
        <InfoRow label="القطاع" value={SECTORS[tenant.sector]?.label} />
        <InfoRow label="الباقة" value={PLANS[tenant.plan]?.labelAr || tenant.plan} />
        <InfoRow label="الحالة" value={tenant.active ? 'نشط' : 'موقوف'} />
        <InfoRow label="تاريخ الإنشاء" value={tenant.created_at || tenant.created || '—'} />
        <InfoRow label="تاريخ الانتهاء" value={`${tenant.ends_at} (${days} يوم)`} />
        <InfoRow label="عدد المشاريع" value={tenant.projects || 0} />
        <InfoRow label="الدومين المخصص" value={tenant.custom_domain || '—'} />
      </div>

      <hr className="wj-hr" />

      <h4 style={{ margin: '16px 0 12px', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}>إجراءات سريعة</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <Btn kind="secondary" size="sm" icon="refresh" onClick={() => handleAction('renew')} disabled={busy}>{busy === 'renew' ? 'جاري...' : 'تجديد الاشتراك'}</Btn>
        <Btn kind="secondary" size="sm" icon="bolt" onClick={() => handleAction('upgrade')} disabled={busy}>{busy === 'upgrade' ? 'جاري...' : 'ترقية الباقة'}</Btn>
        <Btn kind="secondary" size="sm" icon="warn" onClick={() => handleAction('pause')} disabled={busy}>{busy === 'pause' ? 'جاري...' : 'إيقاف مؤقت'}</Btn>
      </div>

      <hr className="wj-hr" style={{ margin: '18px 0' }} />

      <h4 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}>سجل الإجراءات</h4>
      {logsLoading ? (
        <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, padding: 20 }}>جاري تحميل السجل...</div>
      ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {subLogs.slice(0, 5).map(l => (
          <div key={l.id} style={{ padding: 10, background: 'var(--bg-alt)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }}></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{l.action}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{l.note}</div>
            </div>
            <span style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{l.at || l.created_at?.split('T')[0]}</span>
          </div>
        ))}
      </div>
      )}
    </Modal>
  );
};

// === Admin: Custom Templates ===
const AdminTemplates = ({ go }) => {
  const uploadRef = useRef(null);
  const templates = [
    { id: 'ct1', name: 'القانوني الكلاسيكي', vis: 'private', plan: 'premium', tenants: 2, created: '2025-03-10', colors: ['#1a1a1a', '#a37c2c', '#fafafa'] },
    { id: 'ct2', name: 'العقاري الفاخر', vis: 'public', plan: 'premium', tenants: 5, created: '2025-04-22', colors: ['#0b2545', '#d4a72c', '#fafbfc'] },
    { id: 'ct3', name: 'الطبي الناعم', vis: 'public', plan: 'pro', tenants: 3, created: '2025-05-15', colors: ['#f0f7f5', '#2a7a5a', '#fff'] },
    { id: 'ct4', name: 'الديكور الفني', vis: 'private', plan: 'pro', tenants: 1, created: '2025-06-02', colors: ['#f7f0e5', '#5a3e2b', '#c69749'] },
  ];

  const handleUploadZip = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const path = `templates/${Date.now()}_${file.name}`;
    const { url, error } = await sbUpload('projects', path, file);
    if (!error && url) showToast('تم رفع القالب بنجاح ✓');
    else showToast('فشل رفع القالب', 'err');
  };
  return (
    <>
      <SectionHeader
        title="القوالب المخصصة"
        sub="قوالب تُبنى من المحرر المرئي أو تُرفع كـ ZIP، وتُخصَّص لمكاتب معينة."
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="file" ref={uploadRef} style={{ display: 'none' }} accept=".zip" onChange={handleUploadZip} />
            <Btn kind="secondary" icon="upload" onClick={() => uploadRef.current?.click()}>رفع ZIP</Btn>
            <Btn kind="primary" icon="palette" onClick={() => go('#/theme-builder')}>محرر القوالب</Btn>
          </div>
        }
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }} className="adm-tmpl-grid">
        {templates.map(t => (
          <Card key={t.id} pad={false}>
            <div style={{ aspectRatio: '16/10', background: t.colors[0], padding: 18, color: t.colors[1], position: 'relative' }}>
              <div style={{ fontSize: 12, marginBottom: 6, opacity: .8 }}>STUDIO</div>
              <div style={{ fontSize: 22, fontFamily: 'var(--font-display)', fontWeight: 600 }}>مكتب</div>
              <div style={{ position: 'absolute', bottom: 14, insetInlineStart: 18, display: 'flex', gap: 6 }}>
                {t.colors.map((c, i) => <span key={i} style={{ width: 18, height: 18, borderRadius: 4, background: c, border: '1px solid rgba(255,255,255,.2)' }}></span>)}
              </div>
              <div style={{ position: 'absolute', top: 14, insetInlineEnd: 14 }}>
                {t.vis === 'private' ? <Badge tone="amber">خاص</Badge> : <Badge tone="green">عام</Badge>}
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 15 }}>{t.name}</h4>
                <PlanPill plan={t.plan} />
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 14 }}>
                <span>{t.tenants} مكتب يستخدمه</span>
                <span className="mono">{t.created}</span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
                <Btn kind="ghost" size="sm" icon="edit" onClick={() => go('#/theme-builder')}>تعديل</Btn>
                <Btn kind="ghost" size="sm" icon="users" onClick={() => showToast('سيُفتح منتقي المكاتب لتخصيص القالب')}>تخصيص</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <style>{`@media (max-width: 980px) { .adm-tmpl-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
    </>
  );
};

// === Admin: Platform stats ===
const AdminStats = () => {
  const [stats, setStats] = useState(ADMIN_PLATFORM_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sbGetAdminStats().then((data) => {
      if (data && !data.error) setStats(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
  <>
    <SectionHeader title="إحصاءات المنصة" sub="نظرة شاملة على أداء المنصة." />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }} className="adp-stats">
      <StatCard label="زيارات المنصة (30 يوم)" value={fmtSAR(stats.total_visitors_30d)} icon="eye" />
      <StatCard label="معدل الاحتفاظ" value="87%" icon="trend" tone="gold" />
      <StatCard label="متوسط إيرادات/مكتب" value="2,050" suffix="ريال" icon="card" />
      <StatCard label="مكاتب جديدة (شهري)" value={loading ? '...' : stats.total_tenants > 0 ? Math.round(stats.total_tenants / 12 * 10) / 10 : '—'} icon="plus" />
    </div>
    <Card>
      <SectionHeader title="توزيع المكاتب حسب القطاع" sub="" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 8 }}>
        {[
          { s: 'هندسة معمارية', c: 4, p: 33 },
          { s: 'ديكور داخلي', c: 2, p: 17 },
          { s: 'تطوير عقاري', c: 1, p: 8 },
          { s: 'مقاولات', c: 1, p: 8 },
          { s: 'تصوير', c: 1, p: 8 },
          { s: 'محاماة', c: 1, p: 8 },
          { s: 'عيادات', c: 1, p: 8 },
          { s: 'عام', c: 1, p: 8 },
        ].map(x => (
          <div key={x.s} style={{ padding: 12, background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{x.s}</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-display)', marginTop: 4 }}>{x.c}</div>
            <div style={{ height: 4, background: 'var(--bg-alt)', borderRadius: 999, marginTop: 8 }}>
              <div style={{ height: '100%', width: `${x.p}%`, background: 'var(--accent)', borderRadius: 999 }}></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
    </>
  );
};

// === Admin: Logs ===
const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sbAdm.from('subscription_logs').select('*').order('created_at', { ascending: false }).limit(50).then(({ data }) => {
      setLogs(data?.length ? data.map(l => ({ ...l, by: l.by_user, at: (l.created_at || '').split('T')[0] })) : SUBSCRIPTION_LOG);
      setLoading(false);
    });
  }, []);

  return (
  <>
    <SectionHeader title="سجل العمليات" sub="كل إجراء تم على المنصة." />
    <Card pad={false}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: 'var(--bg-alt)' }}>
          <tr>{['التاريخ', 'الإجراء', 'المكتب', 'الباقة', 'المبلغ', 'الملاحظة', 'بواسطة'].map(h => (
            <th key={h} style={{ padding: '12px 14px', textAlign: 'right', fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {logs.slice(0, 20).map((l, i) => (
            <tr key={l.id || i} style={{ borderTop: '1px solid var(--border)' }}>
              <td style={{ padding: '12px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{l.at || l.created_at?.split('T')[0]}</td>
              <td style={{ padding: '12px 14px', fontSize: 13.5, fontWeight: 500 }}>{l.action}</td>
              <td style={{ padding: '12px 14px', fontSize: 13 }}>—</td>
              <td style={{ padding: '12px 14px' }}><PlanPill plan={l.plan} /></td>
              <td style={{ padding: '12px 14px', fontSize: 13, fontFamily: 'var(--font-mono)' }}>{fmtSAR(l.amount || 0)}</td>
              <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--muted)' }}>{l.note}</td>
              <td style={{ padding: '12px 14px', fontSize: 12 }}><Badge tone="red">{l.by_user || l.by || 'admin'}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    </>
  );
};

const AdminSettings = () => {
  const [form, setForm] = useState({ name: 'وجود', domain: 'wujood.sa', whatsapp: '+966 50 000 0000' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    sbGetPlatformSettings().then(({ data }) => {
      if (data) setForm({ name: data.name || 'وجود', domain: data.domain || 'wujood.sa', whatsapp: data.whatsapp || '' });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    const { error } = await sbSavePlatformSettings(form);
    setSaving(false);
    if (!error) showToast('تم حفظ الإعدادات ✓');
    else showToast('حدث خطأ أثناء الحفظ', 'err');
  };

  const upd = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
  <>
    <SectionHeader title="إعدادات المنصة" sub="إعدادات عامة، إيميلات، متغيرات البيئة."
      action={<Btn kind="primary" icon="check" onClick={save} disabled={saving || loading}>{saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}</Btn>} />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="adm-settings">
      <Card>
        <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontSize: 16 }}>معلومات المنصة</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="اسم المنصة"><Input value={form.name} onChange={e => upd('name', e.target.value)} /></Field>
          <Field label="الدومين الرئيسي"><Input value={form.domain} onChange={e => upd('domain', e.target.value)} dir="ltr" style={{ textAlign: 'left' }} className="mono" /></Field>
          <Field label="رقم واتساب الدعم"><Input value={form.whatsapp} onChange={e => upd('whatsapp', e.target.value)} dir="ltr" style={{ textAlign: 'left' }} /></Field>
        </div>
      </Card>
      <Card>
        <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontSize: 16 }}>قوالب الإيميلات</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['إنشاء حساب جديد', 'تفعيل الحساب', 'تجديد الاشتراك', 'إيقاف الحساب', '30 يوم قبل الانتهاء', '7 أيام قبل الانتهاء'].map(x => (
            <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'var(--bg)', borderRadius: 8 }}>
              <span style={{ flex: 1, fontSize: 13.5 }}>{x}</span>
              <Badge tone="green" dot>نشط</Badge>
              <IconBtn icon="edit" size={28} />
            </div>
          ))}
        </div>
      </Card>
    </div>
    <style>{`@media (max-width: 980px) { .adm-settings { grid-template-columns: 1fr !important; } }`}</style>
  </>
  );
};

const Admin = ({ go }) => {
  const [page, setPage] = useState('home');
  const map = {
    home: <AdminHome setPage={setPage} />,
    tenants: <AdminTenants go={go} />,
    templates: <AdminTemplates go={go} />,
    stats: <AdminStats />,
    logs: <AdminLogs />,
    settings: <AdminSettings />,
  };
  return <AdminShell page={page} setPage={setPage} go={go}>{map[page]}</AdminShell>;
};

window.Admin = Admin;
