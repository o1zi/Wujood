// قالب Studio — موجّه للصور، غير متماثل، خط ضخم لكن أنيق، accent ساج

const TplStudio = ({ t, projects, services, features, stats, testimonials, faqs }) => {
  const [filter, setFilter] = useState('all');
  const [project, setProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const cats = ['all', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const wa = `https://wa.me/${t.whatsapp.replace(/\D/g, '')}`;

  return (
    <div style={{
      background: '#fafaf6',
      color: '#1a1a1c',
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
      minHeight: '100vh',
      direction: 'rtl',
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Reem+Kufi:wght@400;500;600;700&display=swap" />

      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,250,246,.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(26,26,28,.08)' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 36, height: 36, background: '#1a1a1c', color: '#fafaf6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Reem Kufi', sans-serif", fontWeight: 700, fontSize: 16 }}>
              {(t.name_ar || 'م').charAt(t.name_ar?.startsWith('مكتب') ? 5 : 0)}
            </span>
            <div>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 17, fontWeight: 600, lineHeight: 1 }}>{t.name_ar}</div>
              <div style={{ fontSize: 10, color: '#7a8c6f', letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 600, marginTop: 3 }}>Architecture Studio</div>
            </div>
          </a>
          <nav style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500 }} className="std-nav">
            {[['أعمال', '#projects', '01'], ['خدمات', '#services', '02'], ['عن المكتب', '#about', '03'], ['تواصل', '#contact', '04']].map(([ar, h, num]) => (
              <a key={num} href={h} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, color: '#1a1a1c' }}>
                <span style={{ fontSize: 10, color: '#7a8c6f', fontFamily: "'Reem Kufi', sans-serif" }}>{num}</span>
                {ar}
              </a>
            ))}
          </nav>
          <a href={wa} target="_blank" style={{
            padding: '10px 22px', background: '#1a1a1c', color: '#fafaf6',
            fontSize: 13, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7a8c6f' }}></span>
            متاحون
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '40px 40px 80px', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 50, flex: 1, alignItems: 'stretch' }} className="std-hero">
          <div style={{ position: 'relative', minHeight: 540 }}>
            <ProjectCover seed={1} h={'100%'} radius={2} />
            <div style={{ position: 'absolute', bottom: 24, insetInlineStart: 24, background: 'rgba(26,26,28,.85)', backdropFilter: 'blur(8px)', padding: '14px 18px', color: '#fafaf6', maxWidth: 280 }}>
              <div style={{ fontSize: 10, color: '#bccdaf', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Featured · 2024</div>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 16, fontWeight: 600 }}>{projects[0]?.title_ar || 'مجمع الواحة السكني'}</div>
              <div style={{ fontSize: 12, color: 'rgba(250,250,246,.6)', marginTop: 4 }}>{projects[0]?.location || 'الرياض'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 30 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 30 }}>
                <span style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a8c6f', fontWeight: 600 }}>Studio Nº 14</span>
                <span style={{ flex: 1, height: 1, background: '#d6d8d2' }}></span>
                <span style={{ fontSize: 11, color: '#7a8c6f', fontFamily: "'Reem Kufi', sans-serif" }}>RYD — KSA</span>
              </div>
              <h1 style={{
                margin: 0, fontFamily: "'Reem Kufi', sans-serif",
                fontSize: 'clamp(48px, 7vw, 108px)', fontWeight: 600,
                lineHeight: .95, letterSpacing: '-0.035em', color: '#1a1a1c',
              }}>
                نُصمّم
                <br/>
                لمن يَسكُن
                <br/>
                <span style={{ color: '#7a8c6f' }}>الفِكرة.</span>
              </h1>
              <p style={{ marginTop: 26, fontSize: 16, lineHeight: 1.75, color: '#4a4a4c', maxWidth: 440 }}>
                {t.about_ar.slice(0, 180)}
              </p>
            </div>
            <div style={{ marginTop: 30, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#projects" style={{
                padding: '14px 28px', background: '#1a1a1c', color: '#fafaf6',
                fontSize: 13.5, fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                {projects.length} مشروع · استعرض الكل {React.createElement(Icons.arrowLeft, { size: 14 })}
              </a>
              <a href="#contact" style={{ fontSize: 13.5, color: '#1a1a1c', borderBottom: '1px solid #1a1a1c', paddingBottom: 4, fontWeight: 500 }}>محادثة سريعة ←</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px 40px', borderTop: '1px solid rgba(26,26,28,.08)', borderBottom: '1px solid rgba(26,26,28,.08)' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30 }} className="std-stats">
          {stats.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderInlineStart: i > 0 ? '1px solid rgba(26,26,28,.08)' : 'none', paddingInlineStart: i > 0 ? 20 : 0 }}>
              <span style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 56, fontWeight: 600, color: '#1a1a1c', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}<span style={{ color: '#7a8c6f', fontSize: 28 }}>{s.suffix}</span></span>
              <span style={{ fontSize: 12, color: '#6a6a6c', letterSpacing: '.02em', flex: 1, lineHeight: 1.4 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '100px 40px', background: '#f0f0ea' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="std-about">
          <div>
            <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a8c6f', fontWeight: 600, marginBottom: 16 }}>03 · عن المكتب</div>
            <h2 style={{ margin: '0 0 24px', fontFamily: "'Reem Kufi', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              نُؤمن أن<br/><span style={{ color: '#7a8c6f' }}>التصميم الحقيقي</span><br/>يبدأ من الناس.
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#4a4a4c' }}>{t.about_ar}</p>
          </div>
          <div>
            <ProjectCover seed={3} h={480} radius={2} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, marginBottom: 50 }} className="std-srv-head">
            <div>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a8c6f', fontWeight: 600, marginBottom: 16 }}>02 · ما نقدمه</div>
              <h2 style={{ margin: 0, fontFamily: "'Reem Kufi', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                خدماتنا.
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: '#4a4a4c', alignSelf: 'end' }}>
              من الفكرة الأولى إلى آخر تفصيلة في الموقع. نُدير المشروع نقطة بنقطة، وننقله من رسمة على ورق إلى مكان حقيقي ينبض بالحياة.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((s, i) => (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 2fr 50px', gap: 30, padding: '32px 0', borderTop: '1px solid rgba(26,26,28,.12)', alignItems: 'center' }} className="std-srv-row">
                <span style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 22, fontWeight: 500, color: '#7a8c6f' }}>0{i + 1}</span>
                <h3 style={{ margin: 0, fontFamily: "'Reem Kufi', sans-serif", fontSize: 26, fontWeight: 600, letterSpacing: '-0.015em' }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 15, color: '#4a4a4c', lineHeight: 1.7 }}>{s.desc}</p>
                <span style={{ color: '#7a8c6f', textAlign: 'left' }}>{React.createElement(Icons.arrowLeft, { size: 22 })}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: '40px 0 120px' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a8c6f', fontWeight: 600, marginBottom: 14 }}>01 · أعمال مختارة</div>
              <h2 style={{ margin: 0, fontFamily: "'Reem Kufi', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.025em' }}>
                المشاريع.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {cats.slice(0, 5).map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{
                  padding: '7px 14px', fontSize: 13, fontWeight: 500,
                  background: filter === c ? '#1a1a1c' : 'transparent',
                  color: filter === c ? '#fafaf6' : '#1a1a1c',
                  border: '1px solid ' + (filter === c ? '#1a1a1c' : 'rgba(26,26,28,.15)'),
                }}>{c === 'all' ? 'الكل' : c}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Asymmetric grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {filtered.slice(0, 4).map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={p.id} style={{
                display: 'grid',
                gridTemplateColumns: reversed ? '1fr 1.6fr' : '1.6fr 1fr',
                gap: 40, alignItems: 'center',
                maxWidth: 1280, margin: '0 auto', width: '100%',
                padding: '0 40px',
              }} className="std-proj-row">
                <div style={{ order: reversed ? 2 : 1, cursor: 'pointer' }} onClick={() => setProject(p)}>
                  <ProjectCover seed={p.cover_seed} h={520} radius={2} />
                </div>
                <div style={{ order: reversed ? 1 : 2, padding: reversed ? '0 20px 0 0' : '0 0 0 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
                    <span style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 13, color: '#7a8c6f', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')} —</span>
                    <span style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a8c6f', fontWeight: 600 }}>{p.category} · {p.year}</span>
                  </div>
                  <h3 style={{ margin: '0 0 14px', fontFamily: "'Reem Kufi', sans-serif", fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    {p.title_ar}
                  </h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: '#4a4a4c', maxWidth: 420 }}>
                    {p.location}. مشروع يجمع بين الجمال الوظيفي والاستدامة، مع احترام تام لطبيعة الموقع.
                  </p>
                  <button onClick={() => setProject(p)} style={{ marginTop: 22, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#1a1a1c', borderBottom: '1px solid #1a1a1c', paddingBottom: 4, background: 'transparent' }}>
                    اقرأ المزيد {React.createElement(Icons.arrowLeft, { size: 14 })}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ padding: '120px 40px', background: '#1a1a1c', color: '#fafaf6' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50, alignItems: 'center' }} className="std-testi">
          <div>
            <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#bccdaf', fontWeight: 600, marginBottom: 14 }}>04 · شهادة</div>
            <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 80, fontWeight: 600, color: '#7a8c6f', lineHeight: .9 }}>"</div>
          </div>
          <div>
            <p style={{ margin: 0, fontFamily: "'Reem Kufi', sans-serif", fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.4, fontWeight: 400, letterSpacing: '-0.015em' }}>
              {testimonials[0]?.text || ''}
            </p>
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 30, height: 1, background: '#7a8c6f' }}></span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{testimonials[0]?.name || ''}</div>
                <div style={{ fontSize: 13, color: 'rgba(250,250,246,.55)', marginTop: 2 }}>{testimonials[0]?.role || ''}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 40px', background: '#f0f0ea' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 60 }}>
            <div>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a8c6f', fontWeight: 600, marginBottom: 14 }}>05 · أسئلة</div>
              <h2 style={{ margin: 0, fontFamily: "'Reem Kufi', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.025em' }}>
                شائعة.
              </h2>
            </div>
          </div>
          <div>
            {faqs.map(q => (
              <div key={q.id} style={{ borderTop: '1px solid rgba(26,26,28,.12)' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === q.id ? null : q.id)}
                  style={{ width: '100%', textAlign: 'right', padding: '24px 0', display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'Reem Kufi', sans-serif", fontSize: 18, fontWeight: 500, color: '#1a1a1c' }}
                >
                  <span style={{ flex: 1 }}>{q.q}</span>
                  <span style={{ fontSize: 22, color: '#7a8c6f', transform: faqOpen === q.id ? 'rotate(45deg)' : 'none', transition: '.2s', display: 'inline-block' }}>+</span>
                </button>
                {faqOpen === q.id && (
                  <div style={{ paddingBottom: 22, fontSize: 15, lineHeight: 1.8, color: '#4a4a4c' }}>{q.a}</div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(26,26,28,.12)' }}></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60 }} className="std-cta">
            <div>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a8c6f', fontWeight: 600, marginBottom: 14 }}>06 · تواصل</div>
              <h2 style={{ margin: 0, fontFamily: "'Reem Kufi', sans-serif", fontSize: 'clamp(44px, 7vw, 96px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: .95 }}>
                لنبدأ
                <br/>
                <span style={{ color: '#7a8c6f' }}>المحادثة.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 16 }}>
              <ContactRow label="واتساب" value={t.whatsapp} href={wa} />
              <ContactRow label="هاتف" value={t.phone} href={`tel:${t.phone.replace(/\s/g, '')}`} />
              <ContactRow label="بريد" value={t.email} href={`mailto:${t.email}`} />
              <ContactRow label="موقع" value={t.address_ar} href="#" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px', borderTop: '1px solid rgba(26,26,28,.08)' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, fontSize: 12, color: '#6a6a6c' }}>
          <span>© 2026 {t.name_ar} — استوديو هندسة معمارية</span>
          <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7a8c6f' }}></span>
            متاحون لمشاريع 2026
          </span>
          <a href="/" style={{ color: '#7a8c6f', opacity: .7 }}>مدعوم بواسطة وجود</a>
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
        <div onClick={() => setProject(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(26,26,28,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fafaf6', maxWidth: 900, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ position: 'relative' }}>
              <ProjectCover seed={project.cover_seed} h={420} radius={0} />
              <button onClick={() => setProject(null)} style={{ position: 'absolute', top: 14, insetInlineEnd: 14, width: 36, height: 36, background: 'rgba(26,26,28,.8)', color: '#fafaf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>×</button>
            </div>
            <div style={{ padding: '32px 40px' }}>
              <div style={{ fontFamily: "'Reem Kufi', sans-serif", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#7a8c6f', fontWeight: 600, marginBottom: 14 }}>{project.category} · {project.year}</div>
              <h2 style={{ margin: '0 0 10px', fontFamily: "'Reem Kufi', sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>{project.title_ar}</h2>
              <div style={{ fontSize: 14, color: '#6a6a6c', marginBottom: 20 }}>{project.location}{project.area ? ` · ${project.area} م²` : ''}</div>
              <p style={{ margin: '0 0 28px', fontSize: 16, lineHeight: 1.8, color: '#4a4a4c' }}>
                مشروع يجمع بين الجمال الوظيفي والاستدامة. صُمّم بعناية مع احترام تام لطبيعة الموقع وثقافة المستخدمين.
              </p>
              <a href={wa} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#1a1a1c', color: '#fafaf6', fontSize: 13, fontWeight: 500 }}>
                {React.createElement(Icons.whatsapp, { size: 16 })} استفسر عن المشروع
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .std-nav { display: none !important; }
          .std-hero, .std-stats, .std-srv-head, .std-proj-row, .std-testi, .std-cta, .std-about { grid-template-columns: 1fr !important; }
          .std-srv-row { grid-template-columns: 40px 1fr !important; }
          .std-srv-row > p, .std-srv-row > span:last-child { display: none; }
        }
      `}</style>
    </div>
  );
};

const ContactRow = ({ label, value, href }) => (
  <a href={href} target="_blank" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 20px', gap: 14, padding: '14px 0', borderTop: '1px solid rgba(26,26,28,.12)', alignItems: 'center', textDecoration: 'none', color: '#1a1a1c' }}>
    <span style={{ fontSize: 11, color: '#7a8c6f', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
    <span style={{ fontSize: 15, fontWeight: 500 }}>{value}</span>
    <span>{React.createElement(Icons.arrowLeft, { size: 14 })}</span>
  </a>
);

window.TplStudio = TplStudio;
