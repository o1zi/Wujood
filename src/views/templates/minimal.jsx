// قالب Minimal — مساحات بيضاء واسعة، خطوط خفيفة، تركيز قصوى على المحتوى

const TplMinimal = ({ t, projects, services, features, stats, testimonials, faqs }) => {
  const [project, setProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);

  const wa = `https://wa.me/${t.whatsapp.replace(/\D/g, '')}`;

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

      {/* Nav */}
      <header style={{ padding: '36px 60px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ fontSize: 16, fontWeight: 500, letterSpacing: '.02em', color: '#1a1a1a' }}>{t.name_ar}</a>
          <nav style={{ display: 'flex', gap: 36, fontSize: 13.5, fontWeight: 400 }} className="min-nav">
            {[['أعمال', '#projects'], ['خدمات', '#services'], ['فلسفة', '#about'], ['تواصل', '#contact']].map(([x, h]) => (
              <a key={x} href={h} style={{ color: '#1a1a1a' }}>{x}</a>
            ))}
          </nav>
          <a href={wa} target="_blank" style={{ fontSize: 13.5, color: '#1a1a1a', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a' }}></span>
            متاحون للعمل
          </a>
        </div>
      </header>

      {/* Hero */}
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

      {/* Featured image */}
      <section style={{ padding: '0 60px 160px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <ProjectCover seed={1} h={620} radius={0} />
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 13, color: '#9a9a9a' }}>
            <div>
              <div style={{ color: '#1a1a1a', fontSize: 14, marginBottom: 2, fontWeight: 400 }}>{projects[0]?.title_ar || ''}</div>
              <div>{projects[0]?.location || ''} · {projects[0]?.year || ''}</div>
            </div>
            <div style={{ fontSize: 12 }}>01 / مختارة</div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '120px 60px', borderTop: '1px solid #ececec', borderBottom: '1px solid #ececec' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }} className="min-about-wrap">
          <div>
            <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 18, letterSpacing: '.04em' }}>② فلسفتنا</div>
            <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              لماذا
              <br/>
              نحن؟
            </h2>
          </div>
          <div style={{ alignSelf: 'center' }}>
            <p style={{ margin: '0 0 24px', fontSize: 17, lineHeight: 1.85, color: '#5a5a5a', fontWeight: 300 }}>{t.about_ar}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              {stats.slice(0, 4).map(s => (
                <div key={s.id} style={{ paddingTop: 16, borderTop: '1px solid #ececec' }}>
                  <div style={{ fontSize: 40, fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {s.value}<span style={{ fontSize: 22, color: '#9a9a9a' }}>{s.suffix}</span>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 13, color: '#9a9a9a' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '120px 60px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }} className="min-srv-wrap">
          <div>
            <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 18, letterSpacing: '.04em' }}>③ ما نقدمه</div>
            <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              خدماتنا،
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

      {/* Projects */}
      <section id="projects" style={{ padding: '160px 60px', background: '#f7f6f3' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 80, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 18, letterSpacing: '.04em' }}>④ مختارات</div>
              <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                أعمال نختار أن نُريك إيّاها.
              </h2>
            </div>
            <span style={{ fontSize: 14, color: '#9a9a9a' }}>كل الأعمال ({projects.length})</span>
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

      {/* Testimonial */}
      <section style={{ padding: '160px 60px', borderTop: '1px solid #ececec', borderBottom: '1px solid #ececec' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 36, letterSpacing: '.04em' }}>⑤ شهادة</div>
          <p style={{ margin: 0, fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.55, fontWeight: 300, letterSpacing: '-0.01em' }}>
            "{testimonials[0]?.text || ''}"
          </p>
          <div style={{ marginTop: 36, fontSize: 14 }}>
            <span style={{ color: '#1a1a1a' }}>{testimonials[0]?.name || ''}</span>
            <span style={{ color: '#9a9a9a', marginInlineStart: 8 }}>— {testimonials[0]?.role || ''}</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '120px 60px', background: '#f7f6f3' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 50, letterSpacing: '.04em' }}>⑥ أسئلة</div>
          <div>
            {faqs.map(q => (
              <div key={q.id} style={{ borderTop: '1px solid #ececec' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === q.id ? null : q.id)}
                  style={{ width: '100%', textAlign: 'right', padding: '24px 0', display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.01em' }}
                >
                  <span style={{ flex: 1 }}>{q.q}</span>
                  <span style={{ fontSize: 22, color: '#9a9a9a', transform: faqOpen === q.id ? 'rotate(45deg)' : 'none', transition: '.2s', display: 'inline-block' }}>+</span>
                </button>
                {faqOpen === q.id && (
                  <div style={{ paddingBottom: 24, fontSize: 15, lineHeight: 1.8, color: '#5a5a5a', fontWeight: 300 }}>{q.a}</div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid #ececec' }}></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '160px 60px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: '#9a9a9a', marginBottom: 36, letterSpacing: '.04em' }}>⑦ تواصل</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(40px, 5vw, 76px)', fontWeight: 200, lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: 880 }}>
            <span style={{ color: '#9a9a9a' }}>هل لديك مشروع؟</span>
            <br/>
            دعنا نتحدث.
          </h2>
          <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, maxWidth: 720 }} className="min-contact">
            <ContactLine label="واتساب" value={t.whatsapp} href={wa} />
            <ContactLine label="هاتف" value={t.phone} href={`tel:${t.phone.replace(/\s/g, '')}`} />
            <ContactLine label="بريد" value={t.email} href={`mailto:${t.email}`} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 60px', borderTop: '1px solid #ececec' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, fontSize: 12, color: '#9a9a9a' }}>
          <span>© 2026 {t.name_ar}</span>
          <span>{t.address_ar}</span>
          <a href="/" style={{ color: '#9a9a9a', opacity: .7 }}>مدعوم بواسطة وجود</a>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={wa} target="_blank" style={{
        position: 'fixed', bottom: 24, insetInlineStart: 24,
        width: 52, height: 52, borderRadius: '50%',
        background: '#25D366', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(37,211,102,.4)', zIndex: 40,
      }}>
        {React.createElement(Icons.whatsapp, { size: 24 })}
      </a>

      {/* Project Modal */}
      {project && (
        <div onClick={() => setProject(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fcfcfc', maxWidth: 900, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ position: 'relative' }}>
              <ProjectCover seed={project.cover_seed} h={420} radius={0} />
              <button onClick={() => setProject(null)} style={{ position: 'absolute', top: 14, insetInlineEnd: 14, width: 36, height: 36, background: 'rgba(0,0,0,.5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>×</button>
            </div>
            <div style={{ padding: '36px 48px' }}>
              <div style={{ fontSize: 11, color: '#9a9a9a', letterSpacing: '.08em', marginBottom: 14 }}>{project.category} · {project.year}</div>
              <h2 style={{ margin: '0 0 10px', fontSize: 30, fontWeight: 300, letterSpacing: '-0.02em' }}>{project.title_ar}</h2>
              <div style={{ fontSize: 14, color: '#9a9a9a', marginBottom: 22 }}>{project.location}{project.area ? ` · ${project.area} م²` : ''}</div>
              <p style={{ margin: '0 0 28px', fontSize: 16, lineHeight: 1.8, color: '#5a5a5a', fontWeight: 300 }}>
                مشروع معماري يُجسّد التوازن بين الوظيفة والجمال. صُمّم بعناية مع مراعاة طبيعة الموقع واحتياجات مستخدميه.
              </p>
              <a href={wa} target="_blank" style={{ display: 'inline-block', fontSize: 14, paddingBottom: 6, borderBottom: '1px solid #1a1a1a', color: '#1a1a1a' }}>تواصل بشأن المشروع →</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .min-nav { display: none !important; }
          .min-hero-foot, .min-srv-wrap, .min-about-wrap, .min-proj, .min-contact { grid-template-columns: 1fr !important; gap: 40px !important; }
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
