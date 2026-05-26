// قالب Classic — كلاسيكي رصين بطابع Serif

const TplClassic = ({ t, projects, services, features, stats, testimonials, faqs }) => {
  const [filter, setFilter] = useState('all');
  const [project, setProject] = useState(null);
  const cats = ['all', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

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
            <span style={{ width: 38, height: 38, border: '2px solid #a37c2c', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", color: '#a37c2c' }}>F</span>
            <div>
              <div style={{ fontFamily: "'Markazi Text', serif", fontSize: 24, fontWeight: 600, lineHeight: 1 }}>الفارابي</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: '#a37c2c', letterSpacing: '.15em', textTransform: 'uppercase', marginTop: 2 }}>EST. MMXI · 1432H</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 32, fontSize: 16, fontFamily: "'Markazi Text', serif" }} className="cls-nav">
            {['الرئيسية', 'من نحن', 'مشاريعنا', 'خدماتنا', 'تواصل'].map(x => (
              <a key={x} href="#" style={{ color: '#3a2618', fontWeight: 500, paddingBottom: 4, borderBottom: x === 'الرئيسية' ? '1.5px solid #a37c2c' : 'none' }}>{x}</a>
            ))}
          </nav>
          <a href={`https://wa.me/${t.whatsapp.replace(/\D/g, '')}`} target="_blank" style={{ padding: '10px 22px', border: '1.5px solid #3a2618', color: '#3a2618', fontFamily: "'Markazi Text', serif", fontSize: 14, fontWeight: 500 }}>تواصل معنا</a>
        </div>
      </header>

      {/* Hero — split layout, framed image */}
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

      {/* Stats — classical bar */}
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

      {/* About — symmetric narrative */}
      <section style={{ padding: '110px 40px', background: '#f6efe3' }}>
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

      {/* Services — flat cards w/ thin frame */}
      <section style={{ padding: '90px 40px', background: '#efe5d2', borderTop: '1px solid #d8c89e', borderBottom: '1px solid #d8c89e' }}>
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
                position: 'relative',
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, color: '#d4a85a', fontWeight: 500, lineHeight: 1, marginBottom: 18, opacity: .35 }}>
                  {['I', 'II', 'III', 'IV'][i]}
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

      {/* Testimonials — single quote */}
      <section style={{ padding: '100px 40px', background: '#3a2618', color: '#f6efe3', textAlign: 'center' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, color: '#d4a85a', lineHeight: .5, marginBottom: 24 }}>“</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.6, fontWeight: 400 }}>
            {testimonials[0].text}
          </p>
          <div style={{ width: 60, height: 1, background: '#d4a85a', margin: '32px auto' }}></div>
          <div style={{ fontFamily: "'Markazi Text', serif", fontSize: 18, fontWeight: 600 }}>— {testimonials[0].name}</div>
          <div style={{ fontSize: 13, color: 'rgba(246,239,227,.6)', marginTop: 4, letterSpacing: '.08em' }}>{testimonials[0].role}</div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '110px 40px', background: '#f6efe3', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: '.25em', textTransform: 'uppercase', color: '#a37c2c' }}>— Chapter IV —</span>
          <h2 style={{ margin: '16px 0 22px', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 600, lineHeight: 1.1 }}>
            هل ترغب بالتشاور؟
          </h2>
          <p style={{ fontSize: 18, color: '#5a4128', lineHeight: 1.85, marginBottom: 36 }}>
            أول استشارة مجانية. تواصل معنا لمناقشة مشروعك في جلسة هادئة.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${t.whatsapp.replace(/\D/g, '')}`} target="_blank" style={{ padding: '14px 30px', background: '#3a2618', color: '#f6efe3', fontFamily: "'Markazi Text', serif", fontSize: 15, fontWeight: 500 }}>عبر واتساب</a>
            <a href={`tel:${t.phone.replace(/\s/g, '')}`} style={{ padding: '14px 30px', border: '1.5px solid #3a2618', color: '#3a2618', fontFamily: "'Markazi Text', serif", fontSize: 15, fontWeight: 500 }}>اتصال هاتفي</a>
          </div>
          <div style={{ marginTop: 56, fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#a37c2c', letterSpacing: '.18em', textTransform: 'uppercase' }}>{t.address_ar}</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #d8c89e', background: '#efe5d2', padding: '36px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', fontSize: 13, color: '#7a5d3b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <span>© MMXXVI · مكتب الفارابي للاستشارات الهندسية</span>
          <span style={{ display: 'inline-flex', gap: 14, alignItems: 'center' }}>
            <span>{t.phone}</span><span>·</span><span>{t.email}</span>
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 980px) {
          .cls-nav { display: none !important; }
          .cls-hero, .cls-srv, .cls-stats { grid-template-columns: 1fr !important; }
          .cls-proj { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          .cls-proj { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

window.TplClassic = TplClassic;
