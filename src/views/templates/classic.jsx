// قالب Classic — كلاسيكي رصين بطابع Serif

const TplClassic = ({ t, projects, services, features, stats, testimonials, faqs }) => {
  const [filter, setFilter] = useState('all');
  const [project, setProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const cats = ['all', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const wa = `https://wa.me/${t.whatsapp.replace(/\D/g, '')}`;

  return (
    <div style={{
      background: '#f6efe3',
      color: '#3a2618',
      fontFamily: "'Markazi Text', 'Cormorant Garamond', serif",
      minHeight: '100vh',
      direction: 'rtl',
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Markazi+Text:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap" />

      {/* Nav */}
      <header style={{ padding: '24px 40px', borderBottom: '1px solid #d8c89e', background: '#f6efe3' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 38, height: 38, border: '2px solid #a37c2c', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", color: '#a37c2c' }}>
              {(t.name_ar || 'م').charAt(t.name_ar?.startsWith('مكتب') ? 5 : 0)}
            </span>
            <div>
              <div style={{ fontFamily: "'Markazi Text', serif", fontSize: 22, fontWeight: 600, lineHeight: 1 }}>{t.name_ar}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: '#a37c2c', letterSpacing: '.15em', textTransform: 'uppercase', marginTop: 2 }}>EST. MMXI · 1432H</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 32, fontSize: 16, fontFamily: "'Markazi Text', serif" }} className="cls-nav">
            {[['الرئيسية', '#'], ['من نحن', '#about'], ['مشاريعنا', '#projects'], ['خدماتنا', '#services'], ['تواصل', '#contact']].map(([x, h]) => (
              <a key={x} href={h} style={{ color: '#3a2618', fontWeight: 500, paddingBottom: 4, borderBottom: h === '#' ? '1.5px solid #a37c2c' : 'none' }}>{x}</a>
            ))}
          </nav>
          <a href={wa} target="_blank" style={{ padding: '10px 22px', border: '1.5px solid #3a2618', color: '#3a2618', fontFamily: "'Markazi Text', serif", fontSize: 14, fontWeight: 500 }}>تواصل معنا</a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '80px 40px 100px', background: '#f6efe3' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 70, alignItems: 'center' }} className="cls-hero">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <span style={{ width: 60, height: 1, background: '#a37c2c' }}></span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '.25em', textTransform: 'uppercase', color: '#a37c2c' }}>Architectural Consultancy</span>
            </div>
            <h1 style={{ margin: 0, fontFamily: "'Markazi Text', serif", fontSize: 'clamp(48px, 6.5vw, 88px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.01em' }}>
              ميراث من العمارة
              <br/>
              <em style={{ fontStyle: 'italic', color: '#a37c2c', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>يحترم المكان.</em>
            </h1>
            <p style={{ marginTop: 26, fontSize: 19, lineHeight: 1.85, color: '#5a4128', maxWidth: 540, fontWeight: 400 }}>
              {t.about_ar.slice(0, 200)}
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 16, alignItems: 'center' }}>
              <a href="#projects" style={{ padding: '14px 32px', background: '#3a2618', color: '#f6efe3', fontFamily: "'Markazi Text', serif", fontSize: 15, fontWeight: 500, letterSpacing: '.02em' }}>استعرض الأعمال</a>
              <a href="#contact" style={{ fontSize: 15, fontFamily: "'Markazi Text', serif", color: '#3a2618', borderBottom: '1px solid #a37c2c', paddingBottom: 4, fontWeight: 500 }}>تواصل مباشر</a>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -14, border: '1px solid #a37c2c', zIndex: 0 }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}><ProjectCover seed={1} h={460} radius={0} /></div>
            <div style={{ position: 'absolute', bottom: -28, insetInlineEnd: -28, background: '#3a2618', color: '#f6efe3', padding: '18px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 600, lineHeight: 1, color: '#d4a85a' }}>14</div>
              <div style={{ fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', marginTop: 4 }}>سنة من العمل</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#3a2618', color: '#f6efe3', padding: '50px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }} className="cls-stats">
          {stats.map((s, i) => (
            <div key={s.id} style={{ textAlign: 'center', borderInlineStart: i > 0 ? '1px solid rgba(212,168,90,.3)' : 'none', paddingInlineStart: i > 0 ? 30 : 0 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, color: '#d4a85a', fontWeight: 600, lineHeight: 1 }}>{s.value}{s.suffix}</div>
              <div style={{ marginTop: 8, fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(246,239,227,.7)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '110px 40px', background: '#f6efe3' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '.25em', textTransform: 'uppercase', color: '#a37c2c' }}>— Chapter I —</span>
          <h2 style={{ margin: '20px 0 24px', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 600, lineHeight: 1.15 }}>
            من فلسفتنا إلى مشروعك.
          </h2>
          <div style={{ width: 80, height: 1, background: '#a37c2c', margin: '0 auto 28px' }}></div>
          <p style={{ fontSize: 19, lineHeight: 1.95, color: '#5a4128', fontWeight: 400 }}>
            {t.about_ar}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '90px 40px', background: '#efe5d2', borderTop: '1px solid #d8c89e', borderBottom: '1px solid #d8c89e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '.25em', textTransform: 'uppercase', color: '#a37c2c' }}>— Chapter II —</span>
            <h2 style={{ margin: '14px 0 0', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 600 }}>الخدمات.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }} className="cls-srv">
            {services.map((s, i) => (
              <div key={s.id} style={{
                padding: '38px 28px',
                background: '#f6efe3',
                borderInlineStart: i > 0 ? '1px solid #d8c89e' : 'none',
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, color: '#d4a85a', fontWeight: 500, lineHeight: 1, marginBottom: 18, opacity: .35 }}>
                  {['I', 'II', 'III', 'IV'][i] || (i + 1)}
                </div>
                <h3 style={{ margin: '0 0 12px', fontFamily: "'Markazi Text', serif", fontSize: 22, fontWeight: 600 }}>{s.title}</h3>
                <div style={{ width: 28, height: 1, background: '#a37c2c', marginBottom: 14 }}></div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: '#5a4128' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: '110px 40px', background: '#f6efe3' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '.25em', textTransform: 'uppercase', color: '#a37c2c' }}>— Chapter III —</span>
              <h2 style={{ margin: '14px 0 0', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 600 }}>مختارات من أعمالنا.</h2>
            </div>
            <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #d8c89e' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{
                  padding: '10px 18px', fontSize: 15, fontFamily: "'Markazi Text', serif",
                  color: filter === c ? '#3a2618' : '#8c6e44',
                  borderBottom: filter === c ? '2px solid #a37c2c' : '2px solid transparent',
                  marginBottom: -1, fontWeight: 500,
                }}>{c === 'all' ? 'الكل' : c}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="cls-proj">
            {filtered.map(p => (
              <button key={p.id} onClick={() => setProject(p)} style={{ textAlign: 'right', background: 'transparent', cursor: 'pointer' }}>
                <div style={{ padding: 6, background: '#fff', border: '1px solid #d8c89e' }}>
                  <ProjectCover seed={p.cover_seed} h={280} radius={0} />
                </div>
                <div style={{ paddingTop: 18 }}>
                  <div style={{ fontSize: 12, color: '#a37c2c', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 4, fontFamily: "'Cormorant Garamond', serif" }}>{p.category} — {p.year}</div>
                  <h3 style={{ margin: '0 0 4px', fontFamily: "'Markazi Text', serif", fontSize: 22, fontWeight: 600 }}>{p.title_ar}</h3>
                  <div style={{ fontSize: 14, color: '#7a5d3b' }}>{p.location}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '100px 40px', background: '#3a2618', color: '#f6efe3', textAlign: 'center' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, color: '#d4a85a', lineHeight: .5, marginBottom: 24 }}>"</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.6, fontWeight: 400 }}>
            {testimonials[0]?.text || ''}
          </p>
          <div style={{ width: 60, height: 1, background: '#d4a85a', margin: '32px auto' }}></div>
          <div style={{ fontFamily: "'Markazi Text', serif", fontSize: 18, fontWeight: 600 }}>— {testimonials[0]?.name || ''}</div>
          <div style={{ fontSize: 13, color: 'rgba(246,239,227,.6)', marginTop: 4, letterSpacing: '.08em' }}>{testimonials[0]?.role || ''}</div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 40px', background: '#efe5d2' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '.25em', textTransform: 'uppercase', color: '#a37c2c' }}>— Chapter IV —</span>
            <h2 style={{ margin: '14px 0 0', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 600 }}>أسئلة شائعة.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqs.map(q => (
              <div key={q.id} style={{ borderBottom: '1px solid #d8c89e' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === q.id ? null : q.id)}
                  style={{ width: '100%', textAlign: 'right', padding: '20px 0', display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'Markazi Text', serif", fontSize: 18, fontWeight: 600, color: '#3a2618' }}
                >
                  <span style={{ flex: 1 }}>{q.q}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: '#a37c2c', transform: faqOpen === q.id ? 'rotate(45deg)' : 'none', transition: '.2s', display: 'inline-block' }}>+</span>
                </button>
                {faqOpen === q.id && (
                  <div style={{ paddingBottom: 20, fontSize: 16, lineHeight: 1.85, color: '#5a4128', fontFamily: "'Markazi Text', serif" }}>{q.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '110px 40px', background: '#f6efe3', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '.25em', textTransform: 'uppercase', color: '#a37c2c' }}>— Chapter V —</span>
          <h2 style={{ margin: '16px 0 22px', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 600, lineHeight: 1.1 }}>
            هل ترغب بالتشاور؟
          </h2>
          <p style={{ fontSize: 18, color: '#5a4128', lineHeight: 1.85, marginBottom: 36 }}>
            أول استشارة مجانية. تواصل معنا لمناقشة مشروعك في جلسة هادئة.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={wa} target="_blank" style={{ padding: '14px 30px', background: '#3a2618', color: '#f6efe3', fontFamily: "'Markazi Text', serif", fontSize: 15, fontWeight: 500 }}>عبر واتساب</a>
            <a href={`tel:${t.phone.replace(/\s/g, '')}`} style={{ padding: '14px 30px', border: '1.5px solid #3a2618', color: '#3a2618', fontFamily: "'Markazi Text', serif", fontSize: 15, fontWeight: 500 }}>اتصال هاتفي</a>
          </div>
          <div style={{ marginTop: 56, fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#a37c2c', letterSpacing: '.18em', textTransform: 'uppercase' }}>{t.address_ar}</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #d8c89e', background: '#efe5d2', padding: '36px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', fontSize: 13, color: '#7a5d3b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <span>© MMXXVI · {t.name_ar}</span>
          <span style={{ display: 'inline-flex', gap: 14, alignItems: 'center' }}>
            <span>{t.phone}</span><span>·</span><span>{t.email}</span>
          </span>
          <a href="/" style={{ fontSize: 11, color: '#a37c2c', opacity: .6, letterSpacing: '.06em' }}>مدعوم بواسطة وجود</a>
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
        <div onClick={() => setProject(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(58,38,24,.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#f6efe3', border: '1px solid #d8c89e', maxWidth: 900, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ position: 'relative' }}>
              <ProjectCover seed={project.cover_seed} h={380} radius={0} />
              <button onClick={() => setProject(null)} style={{ position: 'absolute', top: 14, insetInlineEnd: 14, width: 36, height: 36, background: 'rgba(58,38,24,.8)', color: '#f6efe3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, borderRadius: 0 }}>×</button>
            </div>
            <div style={{ padding: '28px 36px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: '#a37c2c', letterSpacing: '.25em', textTransform: 'uppercase', marginBottom: 10 }}>{project.category} — {project.year}</div>
              <h2 style={{ margin: '0 0 10px', fontFamily: "'Markazi Text', serif", fontSize: 30, fontWeight: 600 }}>{project.title_ar}</h2>
              <div style={{ color: '#7a5d3b', fontFamily: "'Markazi Text', serif", fontSize: 16, marginBottom: 18 }}>{project.location}{project.area ? ` · ${project.area} م²` : ''}</div>
              <p style={{ margin: '0 0 22px', fontSize: 16, lineHeight: 1.85, color: '#5a4128', fontFamily: "'Markazi Text', serif" }}>
                مشروع معماري مميز صُمّم بعناية ليعكس هوية المكان ويُلبّي احتياجات أصحابه. نُفّذ وفق أعلى معايير الجودة مع الالتزام الكامل بكود البناء السعودي.
              </p>
              <a href={wa} target="_blank" style={{ display: 'inline-block', padding: '12px 24px', background: '#3a2618', color: '#f6efe3', fontFamily: "'Markazi Text', serif", fontSize: 14, fontWeight: 500 }}>استفسر عن هذا المشروع</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .cls-nav { display: none !important; }
          .cls-hero, .cls-stats { grid-template-columns: 1fr !important; }
          .cls-srv { grid-template-columns: repeat(2, 1fr) !important; }
          .cls-proj { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          .cls-srv, .cls-proj { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

window.TplClassic = TplClassic;
