// قالب Minimal — مساحات بيضاء واسعة، خطوط خفيفة، تركيز قصوى على المحتوى

const TplMinimal = ({ t, projects, services, features, stats, testimonials, faqs }) => {
  const [project, setProject] = useState(null);

  return (
    <div style={{
      background: '#fcfcfc',
      color: '#1a1a1a',
      fontFamily: "'Tajawal', 'Inter', sans-serif",
      minHeight: '100vh',
      direction: 'rtl',
      fontWeight: 300,
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700&family=Inter:wght@200;300;400;500;600&display=swap" />

      {/* Nav — minimal */}
      <header style={{ padding: '36px 60px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ fontSize: 16, fontWeight: 500, letterSpacing: '.02em', color: '#1a1a1a' }}>الفارابي</a>
          <nav style={{ display: 'flex', gap: 36, fontSize: 13.5, fontWeight: 400 }} className="min-nav">
            {['أعمال', 'فلسفة', 'تواصل'].map(x => (
              <a key={x} href="#" style={{ color: '#1a1a1a' }}>{x}</a>
            ))}
          </nav>
          <a href={`https://wa.me/${t.whatsapp.replace(/\D/g, '')}`} target="_blank" style={{ fontSize: 13.5, color: '#1a1a1a', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a' }}></span>
            متاحون للعمل
          </a>
        </div>
      </header>

      {/* Hero — massive whitespace, tiny type */}
      <section style={{ padding: '160px 60px 200px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ maxWidth: 880 }}>
            <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 32, letterSpacing: '.04em' }}>
              ① مكتب استشارات هندسية — الرياض، السعودية
            </div>
            <h1 style={{
              margin: 0,
              fontSize: 'clamp(38px, 5vw, 76px)',
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}>
              نُصمّم بحساسية،
              <br/>
              ونبني بدقة. نُؤمن أن
              <br/>
              <span style={{ color: '#9a9a9a' }}>أقل هو الأكثر.</span>
            </h1>
          </div>
          <div style={{ marginTop: 100, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80, alignItems: 'end' }} className="min-hero-foot">
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: '#5a5a5a', fontWeight: 300, maxWidth: 540 }}>
              {t.about_ar.slice(0, 200)}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="#projects" style={{ fontSize: 14, color: '#1a1a1a', paddingBottom: 8, borderBottom: '1px solid #1a1a1a', display: 'inline-block', width: 'fit-content' }}>
                استعرض الأعمال →
              </a>
              <a href="#contact" style={{ fontSize: 14, color: '#9a9a9a', paddingBottom: 8, borderBottom: '1px solid #d4d4d4', display: 'inline-block', width: 'fit-content' }}>
                تواصل →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image — full bleed */}
      <section style={{ padding: '0 60px 160px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <ProjectCover seed={1} h={620} radius={0} />
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 13, color: '#9a9a9a' }}>
            <div>
              <div style={{ color: '#1a1a1a', fontSize: 14, marginBottom: 2, fontWeight: 400 }}>{projects[0].title_ar}</div>
              <div>{projects[0].location} · {projects[0].year}</div>
            </div>
            <div style={{ fontSize: 12 }}>01 / مختارة</div>
          </div>
        </div>
      </section>

      {/* Services — minimal list */}
      <section style={{ padding: '120px 60px', borderTop: '1px solid #ececec' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }} className="min-srv-wrap">
          <div>
            <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 18, letterSpacing: '.04em' }}>② ما نقدمه</div>
            <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              أربع خدمات،
              <br/>
              تركيز واحد.
            </h2>
          </div>
          <div>
            {services.map((s, i) => (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', padding: '32px 0', borderTop: '1px solid #ececec', gap: 30, alignItems: 'start' }}>
                <span style={{ fontSize: 13, color: '#9a9a9a', paddingTop: 4 }}>0{i + 1}</span>
                <div>
                  <h3 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em' }}>{s.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, color: '#5a5a5a', lineHeight: 1.8, maxWidth: 540 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects — 2 columns, lots of whitespace */}
      <section id="projects" style={{ padding: '160px 60px', background: '#f7f6f3' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 80, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 18, letterSpacing: '.04em' }}>③ مختارات</div>
              <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                أعمال نختار أن نُريك إيّاها.
              </h2>
            </div>
            <a href="#" style={{ fontSize: 14, paddingBottom: 6, borderBottom: '1px solid #1a1a1a' }}>كل الأعمال ({projects.length}) →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }} className="min-proj">
            {projects.slice(0, 4).map((p, i) => (
              <button key={p.id} onClick={() => setProject(p)} style={{ textAlign: 'right', background: 'transparent', cursor: 'pointer', marginTop: i % 2 === 1 ? 100 : 0 }} className="min-pcard">
                <ProjectCover seed={p.cover_seed} h={i % 2 === 0 ? 460 : 380} radius={0} />
                <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 400 }}>{p.title_ar}</h3>
                    <div style={{ fontSize: 13, color: '#9a9a9a' }}>{p.location}</div>
                  </div>
                  <div style={{ fontSize: 13, color: '#9a9a9a' }}>{p.year}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats — text-driven */}
      <section style={{ padding: '120px 60px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 50, letterSpacing: '.04em' }}>④ أرقام نتحدث بها</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }} className="min-stats">
            {stats.map((s, i) => (
              <div key={s.id} style={{ padding: '24px 0', borderTop: '1px solid #ececec', paddingInlineEnd: 30 }}>
                <div style={{ fontSize: 56, fontWeight: 200, lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {s.value}<span style={{ fontSize: 30, color: '#9a9a9a' }}>{s.suffix}</span>
                </div>
                <div style={{ marginTop: 14, fontSize: 13, color: '#9a9a9a' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial — single, minimal */}
      <section style={{ padding: '160px 60px', borderTop: '1px solid #ececec', borderBottom: '1px solid #ececec' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 36, letterSpacing: '.04em' }}>⑤ شهادة</div>
          <p style={{ margin: 0, fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.55, fontWeight: 300, letterSpacing: '-0.01em' }}>
            "{testimonials[0].text}"
          </p>
          <div style={{ marginTop: 36, fontSize: 14 }}>
            <span style={{ color: '#1a1a1a' }}>{testimonials[0].name}</span>
            <span style={{ color: '#9a9a9a', marginInlineStart: 8 }}>— {testimonials[0].role}</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '160px 60px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 36, letterSpacing: '.04em' }}>⑥ تواصل</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(40px, 5vw, 76px)', fontWeight: 200, lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: 880 }}>
            <span style={{ color: '#9a9a9a' }}>هل لديك مشروع؟</span>
            <br/>
            دعنا نتحدث.
          </h2>
          <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, maxWidth: 720 }} className="min-contact">
            <ContactLine label="واتساب" value={t.whatsapp} href={`https://wa.me/${t.whatsapp.replace(/\D/g, '')}`} />
            <ContactLine label="هاتف" value={t.phone} href={`tel:${t.phone.replace(/\s/g, '')}`} />
            <ContactLine label="بريد" value={t.email} href={`mailto:${t.email}`} />
          </div>
        </div>
      </section>

      {/* Footer — one line */}
      <footer style={{ padding: '40px 60px', borderTop: '1px solid #ececec' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, fontSize: 12, color: '#9a9a9a' }}>
          <span>© 2026 الفارابي</span>
          <span>{t.address_ar}</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 980px) {
          .min-nav { display: none !important; }
          .min-hero-foot, .min-srv-wrap, .min-proj, .min-stats, .min-contact { grid-template-columns: 1fr !important; gap: 40px !important; }
          .min-pcard { margin-top: 0 !important; }
        }
      `}</style>
    </div>
  );
};

const ContactLine = ({ label, value, href }) => (
  <a href={href} target="_blank" style={{ display: 'block', textDecoration: 'none', color: '#1a1a1a' }}>
    <div style={{ fontSize: 11, color: '#9a9a9a', marginBottom: 8, letterSpacing: '.04em' }}>{label}</div>
    <div style={{ fontSize: 16, paddingBottom: 8, borderBottom: '1px solid #1a1a1a', fontWeight: 400 }}>{value}</div>
  </a>
);

window.TplMinimal = TplMinimal;
