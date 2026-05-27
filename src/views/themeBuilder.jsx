// Theme Builder — محرر القوالب المرئي

const ThemeBuilder = ({ go }) => {
  const [tab, setTab] = useState('basics');
  const [theme, setTheme] = useState({
    name: 'قالب جديد',
    description: 'قالب احترافي للمكاتب الهندسية',
    requiredPlan: 'pro',
    visibility: 'public',
    primary: '#0e3b2e',
    accent: '#b08a3e',
    bg: '#ffffff',
    text: '#14201a',
    surface: '#fafaf7',
    border: '#eeeae0',
    muted: '#6e7770',
    fontHead: 'Reem Kufi',
    fontBody: 'IBM Plex Sans Arabic',
    headSize: 48,
    bodySize: 16,
    uppercase: false,
    radius: 8,
    heroStyle: 0,
    heroHeight: 100,
    heroOverlay: 60,
    navStyle: 'transparent',
    cardStyle: 'soft',
    projectColumns: 3,
    showStats: true,
    animations: true,
  });
  const [showStarter, setShowStarter] = useState(true);
  const upd = (k, v) => setTheme({ ...theme, [k]: v });

  const tabs = [
    { id: 'basics', label: 'الأساسيات', icon: 'info' },
    { id: 'colors', label: 'الألوان', icon: 'swatch' },
    { id: 'fonts', label: 'الخطوط', icon: 'type' },
    { id: 'hero', label: 'الهيرو', icon: 'hero' },
    { id: 'layout', label: 'التخطيط', icon: 'grid' },
    { id: 'nav', label: 'التنقل', icon: 'nav' },
    { id: 'projects', label: 'المشاريع', icon: 'briefcase' },
    { id: 'cards', label: 'البطاقات', icon: 'card' },
    { id: 'effects', label: 'التأثيرات', icon: 'sparkles' },
    { id: 'contact', label: 'التواصل', icon: 'mail' },
    { id: 'identity', label: 'الهوية', icon: 'palette' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <header style={{
        height: 60, background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14, flexShrink: 0,
      }}>
        <IconBtn icon="arrowRight" onClick={() => go('#/admin')} title="رجوع" />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>محرر القوالب</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>· {theme.name}</span>
        </div>
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn kind="ghost" icon="eye" onClick={() => window.open('/site/demo/modern', '_blank')}>معاينة كاملة</Btn>
          <Btn kind="secondary" icon="download" onClick={() => { localStorage.setItem('wujood_theme_draft', JSON.stringify(theme)); showToast('تم حفظ المسودة محلياً ✓'); }}>حفظ كمسودة</Btn>
          <Btn kind="primary" icon="check" onClick={() => { localStorage.setItem('wujood_theme_published', JSON.stringify(theme)); showToast('تم نشر القالب ✓ (محلياً)'); }}>نشر القالب</Btn>
        </div>
      </header>

      {/* Main split */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left: settings panel */}
        <aside style={{
          width: 380, flexShrink: 0,
          background: 'var(--surface)',
          borderInlineStart: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          height: 'calc(100vh - 60px)', overflowY: 'auto',
        }} className="tb-panel">
          {/* Tabs */}
          <div style={{ position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 5, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', overflowX: 'auto', gap: 0, padding: '0 12px' }} className="tb-tabs">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    padding: '12px 12px',
                    fontSize: 12.5, fontWeight: 500,
                    color: tab === t.id ? 'var(--primary)' : 'var(--muted)',
                    borderBottom: tab === t.id ? '2px solid var(--primary)' : '2px solid transparent',
                    marginBottom: -1,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {React.createElement(Icons[t.icon], { size: 14 })}
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: 18 }}>
            {tab === 'basics' && <BasicsPanel theme={theme} upd={upd} />}
            {tab === 'colors' && <ColorsPanel theme={theme} upd={upd} />}
            {tab === 'fonts' && <FontsPanel theme={theme} upd={upd} />}
            {tab === 'hero' && <HeroPanel theme={theme} upd={upd} />}
            {tab === 'layout' && <LayoutPanel theme={theme} upd={upd} />}
            {tab === 'nav' && <NavPanel theme={theme} upd={upd} />}
            {tab === 'projects' && <ProjectsPanel theme={theme} upd={upd} />}
            {tab === 'cards' && <CardsPanel theme={theme} upd={upd} />}
            {tab === 'effects' && <EffectsPanel theme={theme} upd={upd} />}
            {tab === 'contact' && <ContactPanel theme={theme} upd={upd} />}
            {tab === 'identity' && <IdentityPanel theme={theme} />}
          </div>
        </aside>

        {/* Right: live preview */}
        <main style={{ flex: 1, background: 'var(--bg-alt)', overflow: 'auto', position: 'relative' }}>
          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'inline-flex', background: 'var(--surface)', borderRadius: 8, padding: 3, border: '1px solid var(--border)' }}>
                {['desktop', 'tablet', 'mobile'].map(d => (
                  <button key={d} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 6, background: d === 'desktop' ? 'var(--bg-alt)' : 'transparent', color: d === 'desktop' ? 'var(--ink)' : 'var(--muted)' }}>{d}</button>
                ))}
              </div>
              <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>1240 × auto · live</span>
            </div>
            <div style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 10,
              overflow: 'hidden',
              boxShadow: 'var(--sh-md)',
              minHeight: 'calc(100vh - 160px)',
              maxHeight: 'calc(100vh - 140px)',
              overflowY: 'auto',
            }}>
              <PreviewPane theme={theme} />
            </div>
          </div>
        </main>
      </div>

      <Modal
        open={showStarter}
        onClose={() => setShowStarter(false)}
        title="ابدأ من نموذج جاهز"
        width={820}
        footer={<Btn kind="ghost" onClick={() => setShowStarter(false)}>ابدأ من صفحة بيضاء</Btn>}
      >
        <p style={{ margin: '0 0 18px', color: 'var(--muted)', fontSize: 13.5 }}>
          اختر نموذجاً جاهزاً للبدء — يمكنك تخصيصه بالكامل بعد ذلك.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="adm-tmpl-grid">
          {[
            { id: 's1', n: 'الفاخر الداكن', d: 'أسود + ذهبي، Playfair', c: ['#0a0a0a', '#d4a85a'] },
            { id: 's2', n: 'العصري النظيف', d: 'أبيض + أزرق، Raleway', c: ['#fff', '#0066ff'] },
            { id: 's3', n: 'الجريء القوي', d: 'أسود + أحمر، Bebas', c: ['#0a0a0a', '#ff3b30'] },
            { id: 's4', n: 'الكلاسيكي الرصين', d: 'كريمي + بني، Cormorant', c: ['#f6efe3', '#5a3e2b'] },
            { id: 's5', n: 'البحري الفاخر', d: 'كحلي + ذهبي، Montserrat', c: ['#0a1d36', '#cfa44d'] },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setShowStarter(false)}
              style={{ textAlign: 'right', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}
            >
              <div style={{ aspectRatio: '4/3', background: s.c[0], padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 11, color: s.c[1], opacity: .8 }}>STUDIO</div>
                <div style={{ fontSize: 22, fontWeight: 600, color: s.c[1] }}>مكتب</div>
                <div style={{ height: 4, background: s.c[1], width: '40%', opacity: .5 }}></div>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.n}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{s.d}</div>
              </div>
            </button>
          ))}
        </div>
      </Modal>

      <style>{`
        @media (max-width: 980px) {
          .tb-panel { display: none; }
        }
      `}</style>
    </div>
  );
};

const BasicsPanel = ({ theme, upd }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <PanelHeading title="الأساسيات" desc="معلومات القالب التي تظهر للأدمن." />
    <Field label="اسم القالب">
      <Input value={theme.name} onChange={(e) => upd('name', e.target.value)} />
    </Field>
    <Field label="الوصف">
      <Textarea value={theme.description} onChange={(e) => upd('description', e.target.value)} rows={2} />
    </Field>
    <Field label="الباقة المطلوبة">
      <Select value={theme.requiredPlan} onChange={(e) => upd('requiredPlan', e.target.value)}>
        <option value="basic">Basic - جميع الباقات</option>
        <option value="pro">Pro - الباقات المدفوعة</option>
        <option value="premium">Premium فقط</option>
      </Select>
    </Field>
    <Field label="الرؤية">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { v: 'public', l: 'عام', d: 'كل مكتب مؤهل يراه' },
          { v: 'private', l: 'خاص', d: 'لمكاتب محددة فقط' },
        ].map(o => (
          <label key={o.v} style={{
            padding: 12, border: `2px solid ${theme.visibility === o.v ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: 8, cursor: 'pointer', textAlign: 'right',
          }}>
            <input type="radio" name="vis" checked={theme.visibility === o.v} onChange={() => upd('visibility', o.v)} style={{ accentColor: 'var(--primary)' }} />
            <div style={{ marginTop: 6, fontWeight: 500, fontSize: 13 }}>{o.l}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{o.d}</div>
          </label>
        ))}
      </div>
    </Field>
  </div>
);

const ColorsPanel = ({ theme, upd }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
    <PanelHeading title="الألوان" desc="اختر لوحة جاهزة أو خصّص الألوان يدوياً." />

    <div>
      <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 10, fontWeight: 500 }}>لوحات جاهزة</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {PALETTES.map(p => (
          <button
            key={p.name}
            onClick={() => { upd('primary', p.primary); upd('accent', p.accent); upd('bg', p.bg); upd('text', p.text); }}
            style={{
              border: '1px solid var(--border)', borderRadius: 8, padding: 8, background: 'var(--bg-alt)', textAlign: 'center',
            }}
            title={p.name}
          >
            <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 28, marginBottom: 6 }}>
              <span style={{ flex: 1, background: p.primary }}></span>
              <span style={{ flex: 1, background: p.accent }}></span>
              <span style={{ flex: 1, background: p.bg, border: '1px solid var(--border)' }}></span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
          </button>
        ))}
      </div>
    </div>

    <hr className="wj-hr" />
    <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 500 }}>تخصيص يدوي</div>
    {[
      { k: 'primary', l: 'الأساسي' },
      { k: 'accent', l: 'الـ Accent' },
      { k: 'bg', l: 'الخلفية' },
      { k: 'text', l: 'النص' },
      { k: 'surface', l: 'خلفية البطاقات' },
      { k: 'border', l: 'الحدود' },
    ].map(c => (
      <ColorRow key={c.k} label={c.l} value={theme[c.k]} onChange={(v) => upd(c.k, v)} />
    ))}
  </div>
);

const ColorRow = ({ label, value, onChange }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px', alignItems: 'center', gap: 10 }}>
    <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{label}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--border)', borderRadius: 7, padding: 4, background: 'var(--bg)' }}>
      <span style={{ width: 28, height: 28, borderRadius: 5, background: value, border: '1px solid var(--border)', position: 'relative' }}>
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
      </span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mono" style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 12.5, outline: 'none', fontFamily: 'var(--font-mono)' }} />
    </div>
    <span style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>{value.toUpperCase()}</span>
  </div>
);

const FontsPanel = ({ theme, upd }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <PanelHeading title="الخطوط" desc="اختر خط العناوين وخط النصوص." />
    <Field label="خط العناوين" hint={`${HEADING_FONTS.length} خط متاح`}>
      <Select value={theme.fontHead} onChange={(e) => upd('fontHead', e.target.value)}>
        {HEADING_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
      </Select>
    </Field>
    <div style={{ padding: 14, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)', fontFamily: `'${theme.fontHead}', sans-serif`, fontSize: 22, fontWeight: 600 }}>
      نموذج العنوان — مكتب الاستشارات الهندسية
    </div>

    <Field label="خط النصوص">
      <Select value={theme.fontBody} onChange={(e) => upd('fontBody', e.target.value)}>
        {BODY_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
      </Select>
    </Field>
    <div style={{ padding: 14, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)', fontFamily: `'${theme.fontBody}', sans-serif`, fontSize: 14, lineHeight: 1.7 }}>
      نموذج النص العادي. مكتب سعودي للاستشارات الهندسية، يقدم خدماته للقطاعين العام والخاص بمعايير دولية وحسّ محلي عميق.
    </div>

    <SliderRow label="حجم العناوين (px)" value={theme.headSize} onChange={(v) => upd('headSize', v)} min={32} max={96} />
    <SliderRow label="حجم النص (px)" value={theme.bodySize} onChange={(v) => upd('bodySize', v)} min={13} max={20} />

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'var(--bg-alt)', borderRadius: 8 }}>
      <span style={{ fontSize: 13 }}>UPPERCASE للعناوين</span>
      <Toggle on={theme.uppercase} onChange={(v) => upd('uppercase', v)} />
    </div>
  </div>
);

const HeroPanel = ({ theme, upd }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <PanelHeading title="قسم الهيرو" desc="القسم الأول الذي يراه الزائر." />
    <Field label="نمط الهيرو">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {HERO_STYLES.map((s, i) => (
          <button
            key={s}
            onClick={() => upd('heroStyle', i)}
            style={{
              padding: 10, border: `2px solid ${theme.heroStyle === i ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 8, fontSize: 12, fontWeight: 500, textAlign: 'center', background: 'var(--surface)',
            }}
          >
            <div style={{ height: 36, marginBottom: 6, borderRadius: 4, background: 'var(--bg-alt)', display: 'flex', padding: 4, gap: 3 }}>
              {i === 0 && <span style={{ flex: 1, background: 'var(--primary)', borderRadius: 2 }}></span>}
              {i === 1 && <><span style={{ flex: 1, background: 'var(--primary)', borderRadius: 2 }}></span><span style={{ flex: 1, background: 'var(--bg)', borderRadius: 2 }}></span></>}
              {i === 2 && <><span style={{ flex: 1, background: 'var(--bg)', borderRadius: 2 }}></span><span style={{ flex: 1, background: 'var(--primary)', borderRadius: 2 }}></span></>}
              {i === 3 && <span style={{ flex: 1, background: 'var(--primary)', borderRadius: 2, opacity: .6 }}></span>}
              {i === 4 && <span style={{ flex: 1, background: 'var(--bg)', borderRadius: 2, border: '1px solid var(--border)' }}></span>}
              {i === 5 && <span style={{ flex: 1, background: 'var(--ink)', borderRadius: 2 }}></span>}
            </div>
            {s}
          </button>
        ))}
      </div>
    </Field>
    <SliderRow label="ارتفاع الهيرو (vh)" value={theme.heroHeight} onChange={(v) => upd('heroHeight', v)} min={50} max={100} />
    <SliderRow label="شفافية الطبقة (%)" value={theme.heroOverlay} onChange={(v) => upd('heroOverlay', v)} min={0} max={100} />
  </div>
);

const LayoutPanel = ({ theme, upd }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <PanelHeading title="التخطيط" desc="انحناء الزوايا والمسافات وترتيب الأقسام." />
    <SliderRow label="انحناء الزوايا (px)" value={theme.radius} onChange={(v) => upd('radius', v)} min={0} max={24} />

    <div>
      <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 10, fontWeight: 500 }}>ترتيب الأقسام (اسحب لإعادة الترتيب)</div>
      {['hero', 'about', 'services', 'projects', 'features', 'testimonials', 'faq', 'cta', 'footer'].map(s => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--bg)', borderRadius: 6, marginBottom: 4, border: '1px solid var(--border)' }}>
          <span style={{ color: 'var(--muted)', cursor: 'grab' }}>{React.createElement(Icons.drag, { size: 14 })}</span>
          <span style={{ flex: 1, fontSize: 13 }}>{s}</span>
          <Toggle on={s !== 'cta'} onChange={() => {}} />
        </div>
      ))}
    </div>
  </div>
);

const ProjectsPanel = ({ theme, upd }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <PanelHeading title="عرض المشاريع" desc="كيف تُعرض شبكة المشاريع في الموقع." />
    <Field label="عدد الأعمدة">
      <div style={{ display: 'flex', gap: 8 }}>
        {[2, 3, 4].map(n => (
          <button
            key={n}
            onClick={() => upd('projectColumns', n)}
            style={{
              flex: 1, padding: '10px', border: `2px solid ${theme.projectColumns === n ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 8, background: 'var(--surface)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600,
            }}
          >{n}</button>
        ))}
      </div>
    </Field>
    <Field label="نمط العرض">
      <Select defaultValue="grid">
        <option value="grid">شبكة منتظمة</option>
        <option value="masonry">Masonry</option>
        <option value="list">قائمة</option>
        <option value="magazine">مجلة</option>
        <option value="filmstrip">شريط أفقي</option>
      </Select>
    </Field>
    <Field label="نسبة الصورة">
      <Select defaultValue="4/3">
        <option value="1/1">مربع 1:1</option>
        <option value="4/3">4:3</option>
        <option value="3/2">3:2</option>
        <option value="16/9">عريض 16:9</option>
      </Select>
    </Field>
  </div>
);

const EffectsPanel = ({ theme, upd }) => {
  const [toggles, setToggles] = useState([true, true, true, false, true, true, false, true]);
  return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <PanelHeading title="التأثيرات البصرية" desc="تأثيرات حركية تُضيف لمسة احترافية." />
    {[
      'تلاشي عند التمرير (Fade)',
      'رفع البطاقات عند المرور (Hover lift)',
      'تمرير سلس بين الأقسام',
      'توهج الأزرار',
      'Glassmorphism للبطاقات',
      'تكبير صور المشاريع عند المرور',
      'خط متحرك تحت الروابط',
      'نبضة على لون الـ accent',
    ].map((x, i) => (
      <div key={x} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, background: 'var(--bg)', borderRadius: 7, border: '1px solid var(--border)' }}>
        <span style={{ fontSize: 13 }}>{x}</span>
        <Toggle on={toggles[i]} onChange={(v) => setToggles(prev => prev.map((t, j) => j === i ? v : t))} />
      </div>
    ))}
  </div>
  );
};

const IdentityPanel = ({ theme }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <PanelHeading title="هوية القالب" desc="وصف وملخص الإعدادات الحالية." />
    <Field label="وصف المزاج العام">
      <Textarea defaultValue="قالب احترافي راسخ ينقل ثقة وخبرة، مناسب للمكاتب الهندسية والاستشارية." rows={3} />
    </Field>
    <Field label="كثافة المحتوى">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {['بسيط', 'عادي', 'مكثف'].map((x, i) => (
          <button key={x} style={{ padding: '8px', border: `1px solid ${i === 1 ? 'var(--primary)' : 'var(--border)'}`, color: i === 1 ? 'var(--primary)' : 'var(--ink)', background: i === 1 ? 'var(--primary-soft)' : 'var(--surface)', borderRadius: 7, fontSize: 12.5 }}>{x}</button>
        ))}
      </div>
    </Field>
    <Field label="درجة التباين">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {['منخفض', 'عادي', 'عالي'].map((x, i) => (
          <button key={x} style={{ padding: '8px', border: `1px solid ${i === 1 ? 'var(--primary)' : 'var(--border)'}`, color: i === 1 ? 'var(--primary)' : 'var(--ink)', background: i === 1 ? 'var(--primary-soft)' : 'var(--surface)', borderRadius: 7, fontSize: 12.5 }}>{x}</button>
        ))}
      </div>
    </Field>
    <hr className="wj-hr" />
    <div style={{ padding: 14, background: 'var(--bg)', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.8, color: 'var(--muted)' }}>
      <div style={{ color: 'var(--ink-soft)', fontWeight: 600, marginBottom: 6 }}>ملخص الإعدادات</div>
      Primary: {theme.primary}<br/>
      Accent: {theme.accent}<br/>
      Font: {theme.fontHead} / {theme.fontBody}<br/>
      Radius: {theme.radius}px<br/>
      Hero: {HERO_STYLES[theme.heroStyle]}<br/>
      Columns: {theme.projectColumns}
    </div>
  </div>
);

const NavPanel = ({ theme, upd }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <PanelHeading title="التنقل (Nav)" desc="تخصيص شريط التنقل العلوي للموقع." />
    <Field label="نمط شريط التنقل">
      <Select value={theme.navStyle} onChange={(e) => upd('navStyle', e.target.value)}>
        <option value="transparent">شفاف (Transparent)</option>
        <option value="solid">صلب (Solid)</option>
        <option value="glass">زجاجي (Glassmorphism)</option>
        <option value="minimal">بسيط خط سفلي</option>
      </Select>
    </Field>
    <Field label="الروابط الظاهرة">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {['الرئيسية', 'من نحن', 'المشاريع', 'الخدمات', 'تواصل'].map(x => (
          <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--bg)', borderRadius: 6, border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)' }}>{React.createElement(Icons.drag, { size: 14 })}</span>
            <span style={{ flex: 1, fontSize: 13 }}>{x}</span>
            <Toggle on={true} onChange={() => {}} />
          </div>
        ))}
      </div>
    </Field>
    <Field label="زر CTA في التنقل">
      <Input value="تواصل" onChange={() => {}} />
    </Field>
  </div>
);

const CardsPanel = ({ theme, upd }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <PanelHeading title="البطاقات" desc="تخصيص شكل البطاقات في الموقع." />
    <Field label="نمط البطاقات">
      <Select value={theme.cardStyle} onChange={(e) => upd('cardStyle', e.target.value)}>
        <option value="soft">ناعمة (Soft)</option>
        <option value="outlined">محددة (Outlined)</option>
        <option value="elevated">مرتفعة (Elevated)</option>
        <option value="flat">مسطحة (Flat)</option>
        <option value="glass">زجاجية (Glass)</option>
      </Select>
    </Field>
    <SliderRow label="الحشو الداخلي (px)" value={16} onChange={() => {}} min={8} max={40} />
    <Field label="نمط الأيقونات">
      <Select defaultValue="filled">
        <option value="filled">خلفية ممتلئة</option>
        <option value="outline">حدود فقط</option>
        <option value="ghost">شفافة</option>
      </Select>
    </Field>
    <Field label="ترقيم البطاقات">
      <div style={{ display: 'flex', gap: 8 }}>
        <Toggle on={false} onChange={() => {}} />
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>إظهار رقم ترتيبي</span>
      </div>
    </Field>
  </div>
);

const ContactPanel = ({ theme, upd }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <PanelHeading title="صفحة التواصل" desc="تخطيط الصفحة، الأزرار، عرض الخريطة." />
    <Field label="تخطيط الصفحة">
      <Select defaultValue="split">
        <option value="split">نص - خريطة (مقسم)</option>
        <option value="full">خريطة بعرض كامل</option>
        <option value="centered">محتوى مركزي</option>
      </Select>
    </Field>
    <Field label="أزرار التواصل">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { id: 'whatsapp', label: 'واتساب', icon: 'whatsapp' },
          { id: 'phone', label: 'اتصال هاتفي', icon: 'phone' },
          { id: 'email', label: 'بريد إلكتروني', icon: 'mail' },
          { id: 'maps', label: 'خرائط Google', icon: 'map' },
        ].map(x => (
          <div key={x.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--bg)', borderRadius: 6, border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)' }}>{React.createElement(Icons[x.icon], { size: 14 })}</span>
            <span style={{ flex: 1, fontSize: 13 }}>{x.label}</span>
            <Toggle on={true} onChange={() => {}} />
          </div>
        ))}
      </div>
    </Field>
    <Field label="إظهار الخريطة">
      <Toggle on={true} onChange={() => {}} />
    </Field>
    <hr className="wj-hr" />
    <Field label="نموذج الاتصال">
      <Toggle on={false} onChange={() => {}} />
      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
        عند التفعيل يُظهر نموذج (اسم، إيميل، رسالة)
      </div>
    </Field>
  </div>
);

const PanelHeading = ({ title, desc }) => (
  <div style={{ marginBottom: 6 }}>
    <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>{title}</h3>
    <p style={{ margin: '4px 0 12px', fontSize: 12.5, color: 'var(--muted)' }}>{desc}</p>
  </div>
);

const SliderRow = ({ label, value, onChange, min, max, step = 1 }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
      <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{label}</span>
      <span className="mono" style={{ fontSize: 12, color: 'var(--primary)' }}>{value}</span>
    </div>
    <input
      type="range"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min} max={max} step={step}
      style={{ width: '100%', accentColor: 'var(--primary)' }}
    />
  </div>
);

// Live preview pane — uses simplified mini version
const PreviewPane = ({ theme }) => {
  return (
    <div style={{
      fontFamily: `'${theme.fontBody}', sans-serif`,
      color: theme.text,
      background: theme.bg,
    }}>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(theme.fontHead)}:wght@400;500;600;700&family=${encodeURIComponent(theme.fontBody)}:wght@400;500&display=swap`} />

      {/* Mini Nav */}
      <div style={{ padding: '14px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: `'${theme.fontHead}', sans-serif`, fontSize: 18, fontWeight: 600 }}>الفارابي</span>
        <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
          <span>الرئيسية</span><span>من نحن</span><span>المشاريع</span><span>تواصل</span>
        </div>
        <span style={{ padding: '6px 14px', background: theme.accent, color: '#fff', borderRadius: theme.radius, fontSize: 12 }}>تواصل</span>
      </div>

      {/* Mini hero */}
      <div style={{
        background: `linear-gradient(180deg, ${theme.primary}cc, ${theme.primary}ee), linear-gradient(135deg, #4a8369, #2a5340)`,
        color: '#fff', padding: '64px 32px', minHeight: 360, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,255,255,.15)', borderRadius: 999, fontSize: 11, marginBottom: 18, width: 'fit-content' }}>
          مكتب سعودي · منذ 2011
        </span>
        <h1 style={{
          margin: 0,
          fontFamily: `'${theme.fontHead}', sans-serif`,
          fontSize: Math.min(theme.headSize, 56), fontWeight: 600, lineHeight: 1.1,
          textTransform: theme.uppercase ? 'uppercase' : 'none',
        }}>
          نصمم المساحات<br/>
          <span style={{ color: theme.accent }}>التي تحكي قصة.</span>
        </h1>
        <p style={{ marginTop: 14, fontSize: theme.bodySize, opacity: .8, maxWidth: 460 }}>
          مكتب سعودي للاستشارات الهندسية والتصميم المعماري.
        </p>
        <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
          <span style={{ padding: '10px 20px', background: theme.accent, color: '#fff', borderRadius: theme.radius, fontSize: 13 }}>استعرض المشاريع</span>
          <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', borderRadius: theme.radius, fontSize: 13 }}>تواصل</span>
        </div>
      </div>

      {/* Mini about */}
      <div style={{ padding: '60px 32px', background: theme.surface, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32, alignItems: 'center' }}>
        <ProjectCover seed={1} h={240} radius={theme.radius} />
        <div>
          <span style={{ fontSize: 11, color: theme.accent, letterSpacing: '.15em', textTransform: 'uppercase' }}>من نحن</span>
          <h2 style={{ margin: '10px 0 14px', fontFamily: `'${theme.fontHead}', sans-serif`, fontSize: 28, fontWeight: 600 }}>
            منذ 2011 ونحن نُؤمن أن المعمار يبدأ من الناس.
          </h2>
          <p style={{ margin: 0, fontSize: theme.bodySize, color: theme.muted, lineHeight: 1.7 }}>{DEMO_TENANT.about_ar.slice(0, 160)}...</p>
        </div>
      </div>

      {/* Mini services */}
      <div style={{ padding: '60px 32px' }}>
        <h2 style={{ margin: '0 0 28px', fontFamily: `'${theme.fontHead}', sans-serif`, fontSize: 26, fontWeight: 600 }}>خدماتنا.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${theme.projectColumns}, 1fr)`, gap: 14 }}>
          {DEMO_SERVICES.slice(0, theme.projectColumns).map(s => (
            <div key={s.id} style={{ padding: 18, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: theme.radius }}>
              <span style={{ display: 'inline-flex', width: 36, height: 36, background: theme.primary, color: '#fff', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                {React.createElement(Icons[s.icon] || Icons.cube, { size: 17 })}
              </span>
              <h4 style={{ margin: '0 0 4px', fontSize: 15, fontFamily: `'${theme.fontHead}', sans-serif`, fontWeight: 600 }}>{s.title}</h4>
              <p style={{ margin: 0, fontSize: 12.5, color: theme.muted }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini projects */}
      <div style={{ padding: '60px 32px', background: theme.surface }}>
        <h2 style={{ margin: '0 0 28px', fontFamily: `'${theme.fontHead}', sans-serif`, fontSize: 26, fontWeight: 600 }}>مختارات من أعمالنا.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${theme.projectColumns}, 1fr)`, gap: 14 }}>
          {DEMO_PROJECTS.slice(0, theme.projectColumns).map(p => (
            <div key={p.id} style={{ overflow: 'hidden' }}>
              <ProjectCover seed={p.cover_seed} h={180} radius={theme.radius} />
              <div style={{ marginTop: 10 }}>
                <h4 style={{ margin: 0, fontFamily: `'${theme.fontHead}', sans-serif`, fontSize: 15, fontWeight: 600 }}>{p.title_ar}</h4>
                <div style={{ marginTop: 2, fontSize: 11.5, color: theme.muted }}>{p.location} · {p.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini CTA */}
      <div style={{ padding: '60px 32px' }}>
        <div style={{ background: theme.primary, color: '#fff', borderRadius: theme.radius * 1.5, padding: '40px 32px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: `'${theme.fontHead}', sans-serif`, fontSize: 28, fontWeight: 600 }}>
            مشروعك القادم يستحق <span style={{ color: theme.accent }}>الأفضل.</span>
          </h2>
          <div style={{ marginTop: 18 }}>
            <span style={{ padding: '12px 24px', background: theme.accent, color: '#fff', borderRadius: theme.radius, fontSize: 14 }}>ابدأ محادثة واتساب</span>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ThemeBuilder = ThemeBuilder;
