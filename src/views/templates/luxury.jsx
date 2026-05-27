// قالب Luxury — داكن، سينمائي، ذهبي + كريمي، glassmorphism + serif

const TplLuxury = ({ t, projects, services, features, stats, testimonials, faqs }) => {
  const [filter, setFilter] = useState('all');
  const [project, setProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const cats = ['all', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const wa = `https://wa.me/${t.whatsapp.replace(/\D/g, '')}`;

  return (
    <div style={{
      background: '#0a0a0a',
      color: '#f4ecd8',
      fontFamily: "'Cormorant Garamond', 'Markazi Text', serif",
      minHeight: '100vh',
      direction: 'rtl',
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Markazi+Text:wght@400;500;600;700&family=Montserrat:wght@300;400;500&display=swap" />

      {/* Nav */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(10,10,10,.4)', backdropFilter: 'blur(20px) saturate(180%)', borderBottom: '1px solid rgba(212,168,90,.15)' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 1, height: 24, background: '#d4a85a' }}></span>
            <div>
              <div style={{ fontFamily: "'Markazi Text', serif", fontSize: 20, fontWeight: 600, lineHeight: 1, color: '#f4ecd8' }}>{t.name_ar}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, color: '#d4a85a', letterSpacing: '.3em', textTransform: 'uppercase', marginTop: 4 }}>EST. MMXI</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 36, fontSize: 11, fontFamily: "'Montserrat', sans-serif", fontWeight: 400, letterSpacing: '.12em', textTransform: 'uppercase' }} className="lx-nav">
            {[['Home', '#'], ['Story', '#about'], ['Works', '#projects'], ['Services', '#services'], ['Contact', '#contact']].map(([en, h]) => (
              <a key={en} href={h} style={{ color: 'rgba(244,236,216,.7)' }}>{en}</a>
            ))}
          </nav>
          <a href={wa} target="_blank" style={{ padding: '11px 22px', border: '1px solid #d4a85a', color: '#d4a85a', fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase' }}>Inquire</a>
        </div>
      </header>

      {/* Hero — cinematic full screen */}
      <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, background: `
          linear-gradient(180deg, rgba(10,10,10,.3) 0%, rgba(10,10,10,.65) 60%, #0a0a0a 100%),
          linear-gradient(135deg, oklch(.45 .04 80) 0%, oklch(.22 .03 80) 100%)
        ` }}></div>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .15 }}>
          <defs>
            <pattern id="lx-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#d4a85a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lx-dots)" />
        </svg>

        <div style={{ position: 'relative', maxWidth: 1340, margin: '0 auto', padding: '0 40px 120px', width: '100%' }}>
          <div style={{ maxWidth: 880 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
              <span style={{ width: 50, height: 1, background: '#d4a85a' }}></span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '.4em', textTransform: 'uppercase', color: '#d4a85a' }}>Bespoke Architecture</span>
            </div>
            <h1 style={{
              margin: 0,
              fontFamily: "'Markazi Text', serif",
              fontSize: 'clamp(60px, 9vw, 140px)',
              fontWeight: 500, lineHeight: 1, letterSpacing: '-0.025em',
              color: '#f4ecd8',
            }}>
              تُراث
              <br/>
              <em style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", color: '#d4a85a', fontWeight: 400 }}>يدوم.</em>
            </h1>
            <p style={{ marginTop: 32, maxWidth: 540, fontSize: 19, lineHeight: 1.85, color: 'rgba(244,236,216,.7)', fontFamily: "'Markazi Text', serif" }}>
              {t.about_ar.slice(0, 180)}
            </p>
            <div style={{ marginTop: 48, display: 'flex', gap: 16, alignItems: 'center' }}>
              <a href="#projects" style={{ padding: '15px 32px', background: '#d4a85a', color: '#0a0a0a', fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 500 }}>View Portfolio</a>
              <a href="#contact" style={{ fontSize: 12, color: 'rgba(244,236,216,.85)', fontFamily: "'Montserrat', sans-serif", letterSpacing: '.2em', textTransform: 'uppercase', borderBottom: '1px solid #d4a85a', paddingBottom: 6 }}>Begin Inquiry →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — glassmorphism */}
      <section style={{ padding: '0 40px', marginTop: -60, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', background: 'rgba(20,16,8,.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(212,168,90,.2)', padding: '50px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30 }} className="lx-stats">
          {stats.map((s, i) => (
            <div key={s.id} style={{ textAlign: 'center', borderInlineStart: i > 0 ? '1px solid rgba(212,168,90,.15)' : 'none' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 68, color: '#d4a85a', fontWeight: 400, lineHeight: 1 }}>{s.value}<span style={{ fontSize: 32, fontStyle: 'italic' }}>{s.suffix}</span></div>
              <div style={{ marginTop: 12, fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(244,236,216,.55)', fontFamily: "'Montserrat', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '160px 40px 120px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'center' }} className="lx-about">
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', insetInlineStart: -16, top: -16, right: 30, bottom: 30, border: '1px solid #d4a85a' }}></div>
            <div style={{ position: 'relative' }}><ProjectCover seed={2} h={500} radius={0} /></div>
          </div>
          <div>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '.4em', textTransform: 'uppercase', color: '#d4a85a' }}>— The Studio</span>
            <h2 style={{ margin: '20px 0 28px', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.015em' }}>
              <em style={{ color: '#d4a85a', fontFamily: "'Cormorant Garamond', serif" }}>الفخامة</em>
              <br/>
              في تفاصيلها.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.95, color: 'rgba(244,236,216,.7)', fontFamily: "'Markazi Text', serif", margin: 0 }}>{t.about_ar}</p>
            <div style={{ marginTop: 36, paddingTop: 36, borderTop: '1px solid rgba(212,168,90,.2)', display: 'flex', alignItems: 'center', gap: 30, fontFamily: "'Cormorant Garamond', serif" }}>
              <span style={{ fontSize: 13, letterSpacing: '.15em', textTransform: 'uppercase', color: '#d4a85a' }}>Founded in</span>
              <span style={{ fontSize: 32, fontStyle: 'italic', color: '#f4ecd8' }}>MMXI</span>
              <span style={{ fontSize: 13, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(244,236,216,.5)' }}>Riyadh, KSA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '120px 40px', background: '#0e0c08', borderTop: '1px solid rgba(212,168,90,.1)', borderBottom: '1px solid rgba(212,168,90,.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '.4em', textTransform: 'uppercase', color: '#d4a85a' }}>— Services</span>
            <h2 style={{ margin: '20px 0 0', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 500, letterSpacing: '-0.015em' }}>عمارة بِحرفية.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30 }} className="lx-srv">
            {services.map((s, i) => (
              <div key={s.id} style={{
                padding: 40,
                background: 'rgba(244,236,216,.03)',
                border: '1px solid rgba(212,168,90,.15)',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 22 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 38, color: '#d4a85a' }}>{['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'][i] || (i + 1)}</span>
                  <span style={{ flex: 1, height: 1, background: 'rgba(212,168,90,.2)' }}></span>
                </div>
                <h3 style={{ margin: '0 0 14px', fontFamily: "'Markazi Text', serif", fontSize: 26, fontWeight: 600 }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: 'rgba(244,236,216,.65)', fontFamily: "'Markazi Text', serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: '160px 40px 120px' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '.4em', textTransform: 'uppercase', color: '#d4a85a' }}>— Portfolio</span>
              <h2 style={{ margin: '20px 0 0', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 500, letterSpacing: '-0.015em' }}>
                <em style={{ color: '#d4a85a', fontFamily: "'Cormorant Garamond', serif" }}>Sélection</em> 2024.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              {cats.slice(0, 4).map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: filter === c ? '#d4a85a' : 'rgba(244,236,216,.5)', paddingBottom: 4, borderBottom: filter === c ? '1px solid #d4a85a' : 'none' }}>
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
          </div>

          {filtered[0] && (
            <div style={{ marginBottom: 40, position: 'relative', cursor: 'pointer' }} onClick={() => setProject(filtered[0])}>
              <ProjectCover seed={filtered[0].cover_seed} h={520} radius={0} />
              <div style={{ position: 'absolute', bottom: 30, insetInlineStart: 30, background: 'rgba(10,10,10,.85)', backdropFilter: 'blur(12px)', padding: '24px 30px', border: '1px solid rgba(212,168,90,.3)', maxWidth: 460 }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: '#d4a85a', marginBottom: 10 }}>Featured · {filtered[0].year}</div>
                <h3 style={{ margin: 0, fontFamily: "'Markazi Text', serif", fontSize: 28, fontWeight: 600 }}>{filtered[0].title_ar}</h3>
                <div style={{ marginTop: 8, fontSize: 14, color: 'rgba(244,236,216,.7)', fontFamily: "'Markazi Text', serif" }}>{filtered[0].location}</div>
              </div>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }} className="lx-proj-grid">
            {filtered.slice(1, 7).map(p => (
              <div key={p.id} style={{ cursor: 'pointer' }} onClick={() => setProject(p)}>
                <ProjectCover seed={p.cover_seed} h={260} radius={0} />
                <div style={{ padding: '16px 0' }}>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#d4a85a' }}>{p.category} — {p.year}</div>
                  <h3 style={{ margin: '6px 0 0', fontFamily: "'Markazi Text', serif", fontSize: 19, fontWeight: 600 }}>{p.title_ar}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ padding: '120px 40px', background: 'linear-gradient(180deg, transparent, rgba(212,168,90,.04), transparent)' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 80, color: '#d4a85a', lineHeight: .5, marginBottom: 24 }}>"</div>
          <p style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.55, color: 'rgba(244,236,216,.9)' }}>
            {testimonials[0]?.text || ''}
          </p>
          <div style={{ marginTop: 40, fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#d4a85a' }}>— {testimonials[0]?.name || ''}</div>
          <div style={{ fontFamily: "'Markazi Text', serif", fontSize: 14, color: 'rgba(244,236,216,.5)', marginTop: 6 }}>{testimonials[0]?.role || ''}</div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 40px', background: '#0e0c08', borderTop: '1px solid rgba(212,168,90,.1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 70 }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '.4em', textTransform: 'uppercase', color: '#d4a85a' }}>— FAQ</span>
            <h2 style={{ margin: '20px 0 0', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 500 }}>أسئلة شائعة.</h2>
          </div>
          <div>
            {faqs.map(q => (
              <div key={q.id} style={{ borderBottom: '1px solid rgba(212,168,90,.12)' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === q.id ? null : q.id)}
                  style={{ width: '100%', textAlign: 'right', padding: '22px 0', display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'Markazi Text', serif", fontSize: 18, fontWeight: 500, color: '#f4ecd8' }}
                >
                  <span style={{ flex: 1 }}>{q.q}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: '#d4a85a', transform: faqOpen === q.id ? 'rotate(45deg)' : 'none', transition: '.2s', display: 'inline-block' }}>+</span>
                </button>
                {faqOpen === q.id && (
                  <div style={{ paddingBottom: 22, fontSize: 16, lineHeight: 1.85, color: 'rgba(244,236,216,.65)', fontFamily: "'Markazi Text', serif" }}>{q.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '120px 40px 160px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', padding: '80px 60px', border: '1px solid rgba(212,168,90,.25)', position: 'relative' }}>
          <div style={{ position: 'absolute', insetInlineStart: 14, insetInlineEnd: 14, top: 14, bottom: 14, border: '1px solid rgba(212,168,90,.15)', pointerEvents: 'none' }}></div>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '.4em', textTransform: 'uppercase', color: '#d4a85a' }}>— Begin</span>
          <h2 style={{ margin: '24px 0 28px', fontFamily: "'Markazi Text', serif", fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.1 }}>
            مشروعك التالي،
            <br/>
            <em style={{ fontFamily: "'Cormorant Garamond', serif", color: '#d4a85a' }}>يستحق الأناقة.</em>
          </h2>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={wa} target="_blank" style={{ padding: '14px 32px', background: '#d4a85a', color: '#0a0a0a', fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600 }}>WhatsApp Inquiry</a>
            <a href={`tel:${t.phone.replace(/\s/g, '')}`} style={{ padding: '14px 32px', border: '1px solid rgba(212,168,90,.4)', color: '#f4ecd8', fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase' }}>{t.phone}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '50px 40px', borderTop: '1px solid rgba(212,168,90,.1)' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Markazi Text', serif", fontSize: 26, fontWeight: 600, color: '#f4ecd8' }}>{t.name_ar}</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: '#d4a85a', letterSpacing: '.4em', textTransform: 'uppercase', marginTop: 6 }}>EST. MMXI · MAINTAINED BY HAND</div>
          <div style={{ marginTop: 24, fontSize: 12, color: 'rgba(244,236,216,.4)', letterSpacing: '.05em' }}>© MMXXVI · {t.name_ar}</div>
          <a href="/" style={{ display: 'block', marginTop: 10, fontSize: 11, color: '#d4a85a', opacity: .5 }}>مدعوم بواسطة وجود</a>
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
        <div onClick={() => setProject(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#0e0c08', border: '1px solid rgba(212,168,90,.2)', maxWidth: 900, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ position: 'relative' }}>
              <ProjectCover seed={project.cover_seed} h={420} radius={0} />
              <button onClick={() => setProject(null)} style={{ position: 'absolute', top: 14, insetInlineEnd: 14, width: 36, height: 36, background: 'rgba(0,0,0,.6)', color: '#d4a85a', border: '1px solid rgba(212,168,90,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>×</button>
            </div>
            <div style={{ padding: '32px 40px' }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: '#d4a85a', marginBottom: 14 }}>{project.category} · {project.year}</div>
              <h2 style={{ margin: '0 0 10px', fontFamily: "'Markazi Text', serif", fontSize: 30, fontWeight: 600, color: '#f4ecd8' }}>{project.title_ar}</h2>
              <div style={{ fontSize: 14, color: 'rgba(244,236,216,.6)', marginBottom: 20, fontFamily: "'Markazi Text', serif" }}>{project.location}{project.area ? ` · ${project.area} م²` : ''}</div>
              <p style={{ margin: '0 0 28px', fontSize: 16, lineHeight: 1.85, color: 'rgba(244,236,216,.7)', fontFamily: "'Markazi Text', serif" }}>
                مشروع يجمع بين الأناقة الراقية والتنفيذ الاستثنائي. صُمّم بأدق التفاصيل وفق أعلى معايير الفخامة المعمارية.
              </p>
              <a href={wa} target="_blank" style={{ display: 'inline-block', padding: '13px 28px', background: '#d4a85a', color: '#0a0a0a', fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600 }}>Begin Inquiry</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .lx-nav { display: none !important; }
          .lx-stats, .lx-about, .lx-srv { grid-template-columns: 1fr !important; }
          .lx-proj-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          .lx-proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

window.TplLuxury = TplLuxury;
