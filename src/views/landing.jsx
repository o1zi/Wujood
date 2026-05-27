// Landing — صفحة المنصة التسويقية

const PLATFORM_FAQS = [
  { id: 'f1', q: 'كيف أحصل على حساب في وجود؟', a: 'تواصل معنا عبر واتساب وأرسل اسم مكتبك وقطاعك. نُعدّ الحساب خلال 24 ساعة من استلام التحويل البنكي.' },
  { id: 'f2', q: 'هل أحتاج خبرة تقنية لإدارة الموقع؟', a: 'لا على الإطلاق. لوحة التحكم مصممة لغير المتخصصين — تضيف مشاريعك وبياناتك بنفس سهولة تعديل ملف Word.' },
  { id: 'f3', q: 'هل يمكنني تغيير القالب لاحقاً؟', a: 'نعم، تغيير القالب لا يمسّ البيانات. باقة Pro فأعلى تتيح كل القوالب، وباقة Premium تشمل قوالب مصممة خصيصاً لقطاعك.' },
  { id: 'f4', q: 'ما طريقة الدفع وهل الاشتراك سنوي؟', a: 'التجديد سنوي عبر التحويل البنكي. لا بطاقات، لا اشتراكات تلقائية. تستلم فاتورة رسمية بعد كل دفعة.' },
  { id: 'f5', q: 'هل يدعم الموقع العربية؟', a: 'الموقع عربي بالكامل — RTL أصيل، خطوط عربية متطورة، وتصميم يحترم ثقافة القطاع المهني السعودي.' },
];

const Landing = ({ go }) => {
  const [faqOpen, setFaqOpen] = React.useState(null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250, 248, 243, 0.88)',
        backdropFilter: 'saturate(180%) blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto', padding: '14px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <Logo size={22} />
          <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="lg-nav">
            {[
              { label: 'الميزات', href: '#features' },
              { label: 'القوالب', href: '#templates' },
              { label: 'الباقات', href: '#pricing' },
              { label: 'الأسئلة', href: '#faq' },
            ].map((x) => (
              <a key={x.label} href={x.href} style={{ padding: '8px 14px', fontSize: 14, color: 'var(--ink-soft)', borderRadius: 8 }}>{x.label}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Btn kind="ghost" size="sm" onClick={() => go('#/login')}>تسجيل الدخول</Btn>
            <Btn kind="primary" size="sm" iconAfter="arrowLeft" onClick={() => window.open('https://wa.me/966500000000', '_blank')}>اطلب حسابك</Btn>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto', padding: '76px 28px 84px',
          display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 64, alignItems: 'center',
        }} className="hero-grid">
          <div>
            <Badge tone="gold">
              <span className="mono">v1.0</span>
              <span style={{ width: 1, background: 'currentColor', height: 12, opacity: .25 }}></span>
              منصة سعودية للمكاتب المهنية
            </Badge>
            <h1 style={{
              margin: '20px 0 18px',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5.5vw, 64px)',
              fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.02em',
            }}>
              وجودك الرقمي
              <br />
              <span style={{ color: 'var(--primary)' }}>يبدأ من هنا.</span>
            </h1>
            <p style={{ fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>
              منصة متكاملة لإطلاق موقع احترافي لمكتبك خلال يوم واحد. اختر قالباً، أدخل بياناتك، وانطلق — بدون أكواد، بدون مصممين، بدون مفاجآت.
            </p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn kind="primary" size="lg" iconAfter="arrowLeft" onClick={() => window.open('https://wa.me/966500000000', '_blank')}>اطلب حسابك عبر واتساب</Btn>
              <Btn kind="secondary" size="lg" icon="eye" onClick={() => go('#/site/demo/modern')}>شاهد عرضاً مباشراً</Btn>
            </div>
            <div style={{ marginTop: 36, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                { v: '6+', l: 'قوالب جاهزة' },
                { v: 'RTL', l: 'دعم عربي كامل' },
                { v: '24h', l: 'تفعيل خلال يوم' },
                { v: '99.9%', l: 'وقت تشغيل' },
              ].map(s => (
                <div key={s.l}>
                  <div className="mono" style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--primary)', fontWeight: 600 }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero preview card */}
          <HeroPreviewCard />
        </div>
      </section>

      {/* Sectors strip */}
      <section style={{ padding: '28px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>قطاعات نخدمها</span>
          {Object.values(SECTORS).slice(0, 7).map(s => (
            <span key={s.label} style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{s.label}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '100px 28px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
            <span style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>المنصة</span>
            <h2 style={{ margin: '12px 0 14px', fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em' }}>
              كل ما يحتاجه مكتبك. <span style={{ color: 'var(--muted)' }}>ولا شيء غير ذلك.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="features-grid">
            {[
              { icon: 'palette', t: 'قوالب احترافية', d: '6 قوالب جاهزة + قوالب مخصصة تُبنى لمكاتب محددة. كل قالب يحترم هوية القطاع.' },
              { icon: 'globe', t: 'دومين خاص', d: 'subdomain.wujood.sa مجاناً، أو دومين مستقل في باقة Premium.' },
              { icon: 'image', t: 'إدارة محتوى ذكية', d: 'ارفع المشاريع والصور، رتّب بالسحب والإفلات، وانشر بضغطة. لا أكواد ولا تعقيد.' },
              { icon: 'shield', t: 'أمان متعدد المستويات', d: 'كل بيانات مكتبك معزولة تماماً. RLS على مستوى قاعدة البيانات، لا يصلها أحد غيرك.' },
              { icon: 'bolt', t: 'سرعة عالية', d: 'صفحات تُحمَّل في أقل من ثانية، مُحسَّنة لمحركات البحث وقابلة للمشاركة على السوشيال.' },
              { icon: 'trend', t: 'تحليلات نظيفة', d: 'تعرف من زار، من أين، وكم بقي. بدون cookies، بدون تتبع شخصي، باحترام كامل للخصوصية.' },
            ].map(f => (
              <FeatureCard key={f.t} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* Templates showcase */}
      <section id="templates" style={{ padding: '80px 28px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>القوالب</span>
              <h2 style={{ margin: '12px 0 6px', fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>6 قوالب أساسية، آلاف الاحتمالات</h2>
              <p style={{ margin: 0, color: 'var(--muted)' }}>كل قالب قابل للتخصيص الكامل من المحرر المرئي — ألوان، خطوط، تخطيطات، تأثيرات.</p>
            </div>
            <Btn kind="secondary" iconAfter="arrowLeft" onClick={() => go('#/site/demo/modern')}>عرض مباشر</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }} className="templates-grid">
            {[
              { id: 'modern',   name: 'Modern',   nameAr: 'العصري',    desc: 'أبيض + أخضر',  colors: ['#ffffff', '#0e3b2e', '#b08a3e'] },
              { id: 'classic',  name: 'Classic',  nameAr: 'الكلاسيكي', desc: 'كريمي + ذهبي', colors: ['#f6efe3', '#5a3e2b', '#c69749'] },
              { id: 'heritage', name: 'Heritage', nameAr: 'التراثي',   desc: 'طيني + نقوش',  colors: ['#f4e9d4', '#b85c3d', '#3a2a1c'] },
              { id: 'minimal',  name: 'Minimal',  nameAr: 'البسيط',    desc: 'أبيض + مساحات',colors: ['#fafafa', '#1a1a1a', '#888888'] },
              { id: 'luxury',   name: 'Luxury',   nameAr: 'الفاخر',    desc: 'داكن + ذهبي',  colors: ['#0a0a0a', '#d4a85a', '#f4ecd8'] },
              { id: 'studio',   name: 'Studio',   nameAr: 'الاستوديو', desc: 'صور + ساج',    colors: ['#fafaf6', '#1a1a1c', '#7a8c6f'] },
            ].map((tpl) => (
              <TemplateMini key={tpl.id} {...tpl} go={go} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '100px 28px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
            <span style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>الباقات</span>
            <h2 style={{ margin: '12px 0 14px', fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em' }}>تسعير واضح. بدون مفاجآت.</h2>
            <p style={{ margin: 0, color: 'var(--muted)' }}>تجديد سنوي، دفع مرة واحدة عن طريق التحويل البنكي. لا اشتراكات تلقائية ولا رسوم خفية.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="pricing-grid">
            {Object.values(PLANS).map((p) => <PricingCard key={p.id} plan={p} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 28px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>الأسئلة</span>
            <h2 style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>أسئلة شائعة</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PLATFORM_FAQS.map(q => (
              <div key={q.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--bg)', overflow: 'hidden' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === q.id ? null : q.id)}
                  style={{ width: '100%', textAlign: 'right', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}
                >
                  <span style={{ flex: 1 }}>{q.q}</span>
                  <span style={{ transform: faqOpen === q.id ? 'rotate(180deg)' : 'none', transition: 'transform .2s', color: 'var(--accent)' }}>
                    {React.createElement(Icons.chevronDown, { size: 18 })}
                  </span>
                </button>
                {faqOpen === q.id && (
                  <div style={{ padding: '0 22px 18px', color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.75 }}>{q.a}</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>سؤال آخر؟ </span>
            <button onClick={() => window.open('https://wa.me/966500000000', '_blank')} style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 500 }}>راسلنا على واتساب</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 28px 100px', paddingTop: 80 }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          background: 'var(--primary)',
          color: '#f4ecd8',
          borderRadius: 'var(--r-xl)',
          padding: '64px 56px',
          display: 'grid',
          gridTemplateColumns: '1.4fr .6fr',
          gap: 40,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }} className="cta-grid">
          <div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.15 }}>
              جاهز لإطلاق وجودك الرقمي؟
            </h2>
            <p style={{ margin: '14px 0 0', color: 'rgba(255,255,255,.75)', fontSize: 16, maxWidth: 540 }}>
              راسلنا على واتساب وأرسل تفاصيل مكتبك. نُفعّل الحساب خلال 24 ساعة بعد التحويل، ونوصلك بخطواتك الأولى.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <Btn kind="accent" size="lg" icon="whatsapp" onClick={() => window.open('https://wa.me/966500000000', '_blank')}>اطلب حسابك الآن</Btn>
            <Btn kind="ghost" size="sm" style={{ color: 'rgba(255,255,255,.7)' }} onClick={() => go('#/login')}>عندي حساب — دخول</Btn>
          </div>
          {/* decorative */}
          <div style={{ position: 'absolute', insetInlineStart: -120, top: -60, width: 360, height: 360, borderRadius: '50%', background: 'rgba(176,138,62,.18)', filter: 'blur(40px)' }}></div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo size={18} />
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>© 2026 — جميع الحقوق محفوظة</span>
          </div>
          <div style={{ display: 'flex', gap: 22, fontSize: 13 }}>
            <a href="#features" style={{ color: 'var(--muted)' }}>الميزات</a>
            <a href="#templates" style={{ color: 'var(--muted)' }}>القوالب</a>
            <a href="#pricing" style={{ color: 'var(--muted)' }}>الباقات</a>
            <a href="#faq" style={{ color: 'var(--muted)' }}>الأسئلة</a>
            <button onClick={() => window.open('https://wa.me/966500000000', '_blank')} style={{ color: 'var(--muted)', fontSize: 13 }}>تواصل</button>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 1080px) {
          .templates-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .templates-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .cta-grid { grid-template-columns: 1fr !important; padding: 36px 28px !important; }
          .lg-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
};

const HeroPreviewCard = () => (
  <div style={{
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--r-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--sh-lg)',
    transform: 'rotate(-1deg)',
  }}>
    <div style={{ background: 'var(--bg-alt)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }}></span>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }}></span>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }}></span>
      </div>
      <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>
        alfarabi.wujood.sa
      </div>
    </div>
    <div style={{ aspectRatio: '4/3', background: 'linear-gradient(140deg, #0e3b2e 0%, #154a3a 100%)', padding: 24, color: '#f4ecd8', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500 }}>الفارابي</span>
        <span style={{ fontSize: 11, opacity: .6 }}>الرئيسية · مشاريع · تواصل</span>
      </div>
      <div>
        <div style={{ fontSize: 10, color: '#b08a3e', letterSpacing: '.18em', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>SINCE 2011</div>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, lineHeight: 1.15 }}>نصمم المساحات<br/>التي تحكي قصة.</h3>
        <p style={{ margin: '10px 0 0', fontSize: 12, opacity: .7, maxWidth: 280 }}>مكتب سعودي للاستشارات الهندسية والتصميم المعماري.</p>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <span style={{ padding: '8px 14px', background: '#b08a3e', borderRadius: 4, fontSize: 11, color: '#0a0a0a', fontWeight: 500 }}>استعرض المشاريع</span>
        <span style={{ padding: '8px 14px', border: '1px solid rgba(255,255,255,.25)', borderRadius: 4, fontSize: 11 }}>تواصل معنا</span>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, t, d }) => (
  <div style={{ padding: 24, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 40, height: 40, borderRadius: 10,
      background: 'var(--primary-soft)', color: 'var(--primary)',
      marginBottom: 16,
    }}>
      {React.createElement(Icons[icon], { size: 19 })}
    </span>
    <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>{t}</h3>
    <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14, lineHeight: 1.65 }}>{d}</p>
  </div>
);

const TemplateMini = ({ id, name, nameAr, desc, colors, go }) => (
  <div
    onClick={() => go && go(`#/site/demo/${id}`)}
    style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden', cursor: 'pointer', transition: 'transform .15s, box-shadow .15s' }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <div style={{
      aspectRatio: '4/5',
      background: colors[0],
      padding: 14,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      color: colors[1],
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 9, fontWeight: 600, opacity: .6 }}>{name.toUpperCase()}</div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: colors[1] }}>مكتب</div>
        <div style={{ height: 3, background: colors[2], width: '60%', marginBottom: 5, borderRadius: 2 }}></div>
        <div style={{ height: 3, background: colors[1], width: '40%', opacity: .3, borderRadius: 2 }}></div>
      </div>
    </div>
    <div style={{ padding: '10px 12px' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{nameAr}</div>
      <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{desc}</div>
    </div>
  </div>
);

const PricingCard = ({ plan }) => {
  const isFeatured = plan.id === 'pro';
  return (
    <div style={{
      position: 'relative',
      padding: 28,
      background: isFeatured ? 'var(--primary)' : 'var(--surface)',
      color: isFeatured ? '#f4ecd8' : 'var(--ink)',
      border: '1px solid ' + (isFeatured ? 'var(--primary)' : 'var(--border)'),
      borderRadius: 'var(--r-lg)',
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      {isFeatured && (
        <span style={{
          position: 'absolute', top: -10, insetInlineEnd: 24,
          background: 'var(--accent)', color: '#fff',
          padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
        }}>الأكثر شيوعاً</span>
      )}
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500, color: isFeatured ? 'var(--accent)' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{plan.label}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, marginTop: 4 }}>{plan.labelAr}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="mono" style={{ fontSize: 40, fontWeight: 600, fontFamily: 'var(--font-display)' }}>{fmtSAR(plan.priceY)}</span>
        <span style={{ fontSize: 14, color: isFeatured ? 'rgba(255,255,255,.6)' : 'var(--muted)' }}>ريال / سنة</span>
      </div>
      <hr style={{ border: 0, borderTop: `1px solid ${isFeatured ? 'rgba(255,255,255,.12)' : 'var(--border)'}` }} />
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
        {[
          `${plan.projects === Infinity ? 'مشاريع غير محدودة' : plan.projects + ' مشروع'}`,
          `${plan.storage} تخزين`,
          plan.templates,
          plan.custom_domain ? 'دومين مستقل ✓' : 'subdomain فقط',
          'دعم فني عبر واتساب',
        ].map((x, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: isFeatured ? 'var(--accent)' : 'var(--primary)', marginTop: 2 }}>{React.createElement(Icons.check, { size: 14 })}</span>
            <span style={{ color: isFeatured ? 'rgba(255,255,255,.85)' : 'var(--ink-soft)' }}>{x}</span>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 'auto' }}>
        <Btn
          kind={isFeatured ? 'accent' : 'secondary'}
          size="md"
          style={{ width: '100%' }}
          onClick={() => window.open('https://wa.me/966500000000', '_blank')}
        >
          ابدأ بـ {plan.labelAr}
        </Btn>
      </div>
    </div>
  );
};

window.Landing = Landing;
