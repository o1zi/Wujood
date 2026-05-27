// قالب Heritage — تراثي سعودي، طيني + كريمي + نقوش هندسية ناعمة

const TplHeritage = ({ t, projects, services, features, stats, testimonials, faqs }) => {
  const [filter, setFilter] = useState('all');
  const [project, setProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const cats = ['all', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const wa = `https://wa.me/${t.whatsapp.replace(/\D/g, '')}`;

  // Star pattern SVG
  const star = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'><g fill='none' stroke='#b85c3d' stroke-width='.6' opacity='.18'><path d='M30 4l6 14 14 2-10 10 3 14L30 38l-13 6 3-14-10-10 14-2z'/><circle cx='30' cy='30' r='28'/></g></svg>`);
  const pattern = `url("data:image/svg+xml,${star}")`;

  return (
    <div style={{
      background: '#f4e9d4',
      color: '#3a2a1c',
      fontFamily: "'Markazi Text', 'Amiri', serif",
      minHeight: '100vh',
      direction: 'rtl',
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Markazi+Text:wght@400;500;600;700&family=Reem+Kufi:wght@400;500;600;700&display=swap" />

      {/* Nav */}
      <header style={{ background: '#f4e9d4', borderBottom: '1px solid #d4c19a' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '22px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{
              width: 46, height: 46,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              background: '#b85c3d',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: '#f4e9d4', fontFamily: "'Amiri', serif", fontSize: 24, fontWeight: 700,
            }}>{(t.name_ar || 'م').charAt(t.name_ar?.startsWith('مكتب') ? 5 : 0)}</span>
            <div>
              <div style={{ fontFamily: "'Amiri', serif", fontSize: 22, fontWeight: 700, lineHeight: 1, color: '#3a2a1c' }}>{t.name_ar}</div>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 10, color: '#b85c3d', letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 4 }}>للاستشارات الهندسية · 1432هـ</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 30, fontSize: 16, fontFamily: "'Markazi Text', serif", fontWeight: 500 }} className="hrt-nav">
            {[['الرئيسية', '#'], ['من نحن', '#about'], ['أعمالنا', '#projects'], ['خدماتنا', '#services'], ['تواصل', '#contact']].map(([x, h]) => (
              <a key={x} href={h} style={{ color: '#3a2a1c', paddingBottom: 4 }}>{x}</a>
            ))}
          </nav>
          <a href={wa} target="_blank" style={{
            padding: '11px 24px',
            borderRadius: '999px',
            background: '#b85c3d', color: '#f4e9d4',
            fontFamily: "'Markazi Text', serif", fontSize: 15, fontWeight: 500,
          }}>تواصل معنا</a>
        </div>
        {/* Pattern strip */}
        <div style={{ height: 8, background: pattern, backgroundSize: '40px 40px', borderTop: '1px solid #d4c19a' }}></div>
      </header>

      {/* Hero */}
      <section style={{ padding: '70px 36px 90px', background: '#f4e9d4', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: pattern, backgroundSize: '120px 120px', opacity: .4, pointerEvents: 'none' }}></div>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative' }} className="hrt-hero">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 26 }}>
              <span style={{ width: 8, height: 8, background: '#b85c3d', transform: 'rotate(45deg)' }}></span>
              <span style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: '#b85c3d', fontWeight: 600 }}>عمارة سعودية · حِسٌّ محلي</span>
              <span style={{ flex: 1, height: 1, background: '#d4c19a' }}></span>
            </div>
            <h1 style={{
              margin: 0, fontFamily: "'Amiri', serif",
              fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700,
              lineHeight: 1.05, letterSpacing: '-0.015em', color: '#3a2a1c',
            }}>
              من بيتٍ
              <br/>
              <span style={{ color: '#b85c3d' }}>إلى مدينة.</span>
            </h1>
            <p style={{ marginTop: 26, fontSize: 19, lineHeight: 1.85, color: '#5c4830', fontFamily: "'Markazi Text', serif", maxWidth: 520 }}>
              {t.about_ar.slice(0, 200)}
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#projects" style={{
                padding: '14px 28px', borderRadius: 999,
                background: '#3a2a1c', color: '#f4e9d4',
                fontFamily: "'Markazi Text', serif", fontSize: 15, fontWeight: 500,
              }}>استعرض أعمالنا</a>
              <a href="#contact" style={{ fontSize: 15, fontFamily: "'Markazi Text', serif", color: '#3a2a1c', borderBottom: '1.5px solid #b85c3d', paddingBottom: 6, fontWeight: 500 }}>تواصل مباشر ←</a>
            </div>
          </div>
          {/* Arched image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '50% 50% 8px 8px / 35% 35% 8px 8px',
              overflow: 'hidden',
              border: '1px solid #d4c19a',
              boxShadow: '0 30px 60px -20px rgba(58,42,28,.3)',
            }}>
              <ProjectCover seed={1} h={540} radius={0} />
            </div>
            <div style={{
              position: 'absolute', bottom: 28, insetInlineStart: -20,
              background: '#f4e9d4', border: '1px solid #b85c3d',
              padding: '14px 22px', borderRadius: 12,
              textAlign: 'center', boxShadow: '0 8px 20px rgba(58,42,28,.12)',
            }}>
              <div style={{ fontFamily: "'Amiri', serif", fontSize: 36, color: '#b85c3d', fontWeight: 700, lineHeight: 1 }}>14</div>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 10, color: '#5c4830', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 4 }}>سنة من الإبداع</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#3a2a1c', color: '#f4e9d4', padding: '54px 36px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: pattern, backgroundSize: '60px 60px', opacity: .25, filter: 'invert(1)' }}></div>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 36, position: 'relative' }} className="hrt-stats">
          {stats.map((s, i) => (
            <div key={s.id} style={{ textAlign: 'center', borderInlineStart: i > 0 ? '1px dashed rgba(244,233,212,.25)' : 'none' }}>
              <div style={{ fontFamily: "'Amiri', serif", fontSize: 60, color: '#e8a878', fontWeight: 700, lineHeight: 1 }}>{s.value}<span style={{ fontSize: 30 }}>{s.suffix}</span></div>
              <div style={{ marginTop: 10, fontSize: 13, fontFamily: "'Reem Kufi', sans-serif", letterSpacing: '.1em', color: 'rgba(244,233,212,.7)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '110px 36px', background: '#f4e9d4', position: 'relative' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 22 }}>
            <span style={{ height: 1, width: 50, background: '#b85c3d' }}></span>
            <span style={{ width: 8, height: 8, background: '#b85c3d', transform: 'rotate(45deg)' }}></span>
            <span style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: '#b85c3d', fontWeight: 600 }}>قصتنا</span>
            <span style={{ width: 8, height: 8, background: '#b85c3d', transform: 'rotate(45deg)' }}></span>
            <span style={{ height: 1, width: 50, background: '#b85c3d' }}></span>
          </div>
          <h2 style={{ margin: '0 0 28px', fontFamily: "'Amiri', serif", fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 700, lineHeight: 1.15, color: '#3a2a1c' }}>
            عمارةٌ تَنبُتُ من المكان،
            <br/>
            <span style={{ color: '#b85c3d' }}>وتحترم الناس.</span>
          </h2>
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.95, color: '#5c4830', fontFamily: "'Markazi Text', serif" }}>
            {t.about_ar}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '90px 36px', background: '#e3d3b5', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: pattern, backgroundSize: '100px 100px', opacity: .35, pointerEvents: 'none' }}></div>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: '#b85c3d', fontWeight: 600, marginBottom: 12 }}>خدماتنا</div>
            <h2 style={{ margin: 0, fontFamily: "'Amiri', serif", fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 700 }}>أربعُ حِرَفٍ، رؤيةٌ واحدة.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }} className="hrt-srv">
            {services.map((s, i) => (
              <div key={s.id} style={{
                background: '#f4e9d4',
                padding: '34px 26px 28px',
                borderRadius: '12px 12px 50% 50% / 12px 12px 8% 8%',
                border: '1px solid #d4c19a',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 60, height: 60,
                  background: '#3a2a1c', color: '#f4e9d4',
                  borderRadius: '50%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16, border: '2px solid #b85c3d',
                }}>
                  {React.createElement(Icons[s.icon] || Icons.cube, { size: 22 })}
                </div>
                <h3 style={{ margin: '0 0 10px', fontFamily: "'Amiri', serif", fontSize: 22, fontWeight: 700 }}>{s.title}</h3>
                <div style={{ width: 30, height: 1, background: '#b85c3d', margin: '0 auto 12px' }}></div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: '#5c4830', fontFamily: "'Markazi Text', serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: '110px 36px', background: '#f4e9d4' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: '#b85c3d', fontWeight: 600, marginBottom: 12 }}>أعمالنا</div>
              <h2 style={{ margin: 0, fontFamily: "'Amiri', serif", fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 700 }}>مختاراتٌ من بناءاتنا.</h2>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {cats.slice(0, 5).map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{
                  padding: '8px 18px', borderRadius: 999, fontSize: 14, fontWeight: 500,
                  background: filter === c ? '#3a2a1c' : 'transparent',
                  color: filter === c ? '#f4e9d4' : '#3a2a1c',
                  border: '1px solid ' + (filter === c ? '#3a2a1c' : '#d4c19a'),
                  fontFamily: "'Markazi Text', serif",
                }}>{c === 'all' ? 'الكل' : c}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }} className="hrt-proj">
            {filtered.slice(0, 6).map(p => (
              <div key={p.id} onClick={() => setProject(p)} style={{ background: '#fff', border: '1px solid #d4c19a', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 16px -8px rgba(58,42,28,.2)', cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <ProjectCover seed={p.cover_seed} h={240} radius={0} />
                  <span style={{ position: 'absolute', top: 14, insetInlineStart: 14, padding: '4px 12px', background: 'rgba(58,42,28,.92)', color: '#f4e9d4', borderRadius: 999, fontSize: 11, fontFamily: "'Reem Kufi', sans-serif", letterSpacing: '.08em' }}>{p.category}</span>
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <h3 style={{ margin: '0 0 6px', fontFamily: "'Amiri', serif", fontSize: 20, fontWeight: 700 }}>{p.title_ar}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#7a6240', fontFamily: "'Markazi Text', serif" }}>
                    <span>{p.location}</span>
                    <span style={{ color: '#b85c3d' }}>{p.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ padding: '90px 36px', background: '#b85c3d', color: '#f4e9d4', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: pattern, backgroundSize: '80px 80px', opacity: .15, filter: 'invert(.7)' }}></div>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 72, lineHeight: .5, marginBottom: 22, opacity: .6 }}>"</div>
          <p style={{ margin: 0, fontFamily: "'Amiri', serif", fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.65, fontWeight: 400 }}>
            {testimonials[0]?.text || ''}
          </p>
          <div style={{ width: 50, height: 1, background: '#f4e9d4', margin: '32px auto', opacity: .5 }}></div>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 18, fontWeight: 700 }}>— {testimonials[0]?.name || ''}</div>
          <div style={{ fontSize: 13, opacity: .8, marginTop: 4, fontFamily: "'Reem Kufi', sans-serif" }}>{testimonials[0]?.role || ''}</div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '90px 36px', background: '#e3d3b5', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: pattern, backgroundSize: '100px 100px', opacity: .2, pointerEvents: 'none' }}></div>
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: '#b85c3d', fontWeight: 600, marginBottom: 14 }}>أسئلة شائعة</div>
            <h2 style={{ margin: 0, fontFamily: "'Amiri', serif", fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 700, color: '#3a2a1c' }}>استفساراتُكم.</h2>
          </div>
          <div>
            {faqs.map(q => (
              <div key={q.id} style={{ borderBottom: '1px solid #c8b58a', background: 'transparent' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === q.id ? null : q.id)}
                  style={{ width: '100%', textAlign: 'right', padding: '20px 0', display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'Amiri', serif", fontSize: 19, fontWeight: 700, color: '#3a2a1c' }}
                >
                  <span style={{ flex: 1 }}>{q.q}</span>
                  <span style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 18, color: '#b85c3d', transform: faqOpen === q.id ? 'rotate(45deg)' : 'none', transition: '.2s', display: 'inline-block' }}>+</span>
                </button>
                {faqOpen === q.id && (
                  <div style={{ paddingBottom: 20, fontSize: 16, lineHeight: 1.85, color: '#5c4830', fontFamily: "'Markazi Text', serif" }}>{q.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '100px 36px', background: '#f4e9d4', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ width: 70, height: 70, background: '#3a2a1c', color: '#f4e9d4', borderRadius: '50% 50% 8px 8px / 35% 35% 8px 8px', margin: '0 auto 22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(Icons.whatsapp, { size: 28 })}
          </div>
          <h2 style={{ margin: '0 0 18px', fontFamily: "'Amiri', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1 }}>
            بيتُك القادم
            <br/>
            <span style={{ color: '#b85c3d' }}>على بُعدِ رسالة.</span>
          </h2>
          <p style={{ fontSize: 18, color: '#5c4830', fontFamily: "'Markazi Text', serif", lineHeight: 1.85, marginBottom: 30 }}>
            أول استشارة مجانية. تواصل معنا لنناقش رؤيتك.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={wa} target="_blank" style={{ padding: '14px 30px', borderRadius: 999, background: '#3a2a1c', color: '#f4e9d4', fontFamily: "'Markazi Text', serif", fontSize: 15, fontWeight: 500 }}>عبر واتساب</a>
            <a href={`tel:${t.phone.replace(/\s/g, '')}`} style={{ padding: '14px 30px', borderRadius: 999, background: 'transparent', border: '1.5px solid #3a2a1c', color: '#3a2a1c', fontFamily: "'Markazi Text', serif", fontSize: 15, fontWeight: 500 }}>{t.phone}</a>
          </div>
          <div style={{ marginTop: 36, fontSize: 14, color: '#7a6240', fontFamily: "'Markazi Text', serif" }}>
            {t.address_ar}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#3a2a1c', color: '#f4e9d4', padding: '40px 36px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, fontFamily: "'Markazi Text', serif" }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Amiri', serif", fontSize: 22, fontWeight: 700 }}>{t.name_ar}</span>
            <span style={{ opacity: .5 }}>·</span>
            <span style={{ opacity: .7 }}>منذ 1432هـ</span>
          </div>
          <span style={{ opacity: .7 }}>© 2026 — جميع الحقوق محفوظة</span>
          <a href="/" style={{ fontSize: 11, color: '#e8a878', opacity: .6 }}>مدعوم بواسطة وجود</a>
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
        <div onClick={() => setProject(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(58,42,28,.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#f4e9d4', border: '1px solid #d4c19a', borderRadius: 12, maxWidth: 900, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ position: 'relative' }}>
              <ProjectCover seed={project.cover_seed} h={380} radius={0} />
              <button onClick={() => setProject(null)} style={{ position: 'absolute', top: 14, insetInlineEnd: 14, width: 36, height: 36, background: 'rgba(58,42,28,.8)', color: '#f4e9d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, borderRadius: '50%' }}>×</button>
            </div>
            <div style={{ padding: '28px 32px' }}>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, color: '#b85c3d', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 10 }}>{project.category} · {project.year}</div>
              <h2 style={{ margin: '0 0 10px', fontFamily: "'Amiri', serif", fontSize: 30, fontWeight: 700, color: '#3a2a1c' }}>{project.title_ar}</h2>
              <div style={{ color: '#7a6240', fontFamily: "'Markazi Text', serif", fontSize: 16, marginBottom: 18 }}>{project.location}{project.area ? ` · ${project.area} م²` : ''}</div>
              <p style={{ margin: '0 0 22px', fontSize: 16, lineHeight: 1.85, color: '#5c4830', fontFamily: "'Markazi Text', serif" }}>
                مشروع يحمل روح المكان وعمق الموروث المعماري السعودي. صُمّم بعناية ليُجسّد الهوية ويُلبّي متطلبات العصر مع احترام القيم الأصيلة.
              </p>
              <a href={wa} target="_blank" style={{ display: 'inline-block', padding: '12px 24px', borderRadius: 999, background: '#3a2a1c', color: '#f4e9d4', fontFamily: "'Markazi Text', serif", fontSize: 14, fontWeight: 500 }}>استفسر عن هذا المشروع</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .hrt-nav { display: none !important; }
          .hrt-hero, .hrt-stats { grid-template-columns: 1fr !important; }
          .hrt-srv, .hrt-proj { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 620px) {
          .hrt-srv, .hrt-proj { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

window.TplHeritage = TplHeritage;
