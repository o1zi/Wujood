// Shared atoms: Logo, Button, Card, Badge, Toggle, Input, Field, EmptyImage, Avatar

const { useState, useEffect, useRef, useMemo, useCallback } = React;

const Logo = ({ size = 22, color, withTagline = false }) => (
  <span className="wj-logo" style={{ fontSize: size, color: color || 'var(--ink)' }}>
    <span>وجود</span>
    <span className="wj-logo-dot" style={{ width: size * 0.32, height: size * 0.32 }}></span>
    {withTagline && <span style={{ fontSize: size * 0.55, fontWeight: 400, color: 'var(--muted)', fontFamily: 'var(--font-sans)' }}>منصة</span>}
  </span>
);

const Btn = ({ kind = 'primary', size = 'md', icon, iconAfter, children, className = '', ...rest }) => (
  <button className={`wj-btn wj-btn-${kind} ${size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : ''} ${className}`} {...rest}>
    {icon && React.createElement(Icons[icon], { size: size === 'sm' ? 14 : 16 })}
    {children}
    {iconAfter && React.createElement(Icons[iconAfter], { size: size === 'sm' ? 14 : 16 })}
  </button>
);

const IconBtn = ({ icon, title, size = 36, ...rest }) => (
  <button
    title={title}
    className="wj-btn wj-btn-ghost icon"
    style={{ width: size, height: size, borderRadius: 8 }}
    {...rest}
  >
    {React.createElement(Icons[icon], { size: 16 })}
  </button>
);

const Card = ({ children, pad = true, className = '', style }) => (
  <div className={`wj-card ${pad ? 'wj-card-pad' : ''} ${className}`} style={style}>{children}</div>
);

const Badge = ({ tone = 'default', dot = false, children }) => (
  <span className={`wj-badge ${tone} ${dot ? 'dot' : ''}`}>{children}</span>
);

const Toggle = ({ on, onChange }) => (
  <button className={`wj-toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)} aria-pressed={on}></button>
);

const Field = ({ label, hint, children, error }) => (
  <label className="wj-field">
    {label && <span className="wj-label">{label}</span>}
    {children}
    {hint && !error && <span className="wj-hint">{hint}</span>}
    {error && <span className="wj-hint" style={{ color: 'var(--danger)' }}>{error}</span>}
  </label>
);

const Input = (props) => <input className="wj-input" {...props} />;
const Textarea = (props) => <textarea className="wj-textarea" {...props} />;
const Select = ({ children, ...rest }) => <select className="wj-select" {...rest}>{children}</select>;

// Placeholder image — striped, with text label
const EmptyImg = ({ label, w = '100%', h = 160, radius = 10, style = {} }) => (
  <div className="wj-placeholder" style={{ width: w, height: h, borderRadius: radius, ...style }}>
    {label || 'صورة'}
  </div>
);

// Generates a deterministic colored placeholder for project covers
const ProjectCover = ({ seed = 1, label, h = 180, radius = 10 }) => {
  const hues = [142, 32, 200, 18, 90, 260, 350, 50];
  const hue = hues[(seed - 1) % hues.length];
  return (
    <div
      style={{
        width: '100%',
        height: h,
        borderRadius: radius,
        background: `
          linear-gradient(135deg, oklch(.72 .07 ${hue}) 0%, oklch(.55 .09 ${(hue + 30) % 360}) 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 14,
      }}
    >
      <svg viewBox="0 0 200 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .2 }}>
        <path d={`M0,${60 + seed * 3} Q50,${30 + seed * 2} 100,${50 + seed} T200,${40 + seed * 2} L200,100 L0,100 Z`} fill="rgba(255,255,255,.7)" />
        <path d={`M0,${75 - seed} Q60,${50 - seed * 2} 120,${70 - seed} T200,${65 - seed * 2} L200,100 L0,100 Z`} fill="rgba(0,0,0,.15)" />
      </svg>
      {label && (
        <span style={{
          position: 'relative', color: '#fff', fontWeight: 500, fontSize: 13,
          textShadow: '0 1px 4px rgba(0,0,0,.3)', letterSpacing: '.01em',
        }}>{label}</span>
      )}
    </div>
  );
};

const Avatar = ({ name, size = 36, bg }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: bg || 'var(--primary-soft)',
    color: 'var(--primary)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-display)', fontWeight: 500,
    fontSize: size * 0.4,
    border: '1px solid var(--border)',
    flexShrink: 0,
  }}>{initials(name || '؟')}</div>
);

// Simple modal / sheet
const Modal = ({ open, onClose, title, children, width = 560, footer }) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(20, 32, 26, 0.4)',
        backdropFilter: 'blur(2px)',
        zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'wjFadeIn .15s ease',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--r-lg)',
          width: '100%', maxWidth: width,
          maxHeight: 'calc(100vh - 40px)',
          display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--sh-xl)',
          overflow: 'hidden',
        }}
      >
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>{title}</h3>
            <IconBtn icon="x" size={32} onClick={onClose} title="إغلاق" />
          </div>
        )}
        <div style={{ padding: 22, overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
        {footer && (
          <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, justifyContent: 'flex-start', background: 'var(--bg)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Tab bar
const TabBar = ({ tabs, active, onChange, fullWidth }) => (
  <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', gap: 4 }}>
    {tabs.map(t => (
      <button
        key={t.id}
        onClick={() => onChange(t.id)}
        style={{
          padding: '12px 16px',
          fontSize: 14,
          fontWeight: 500,
          color: active === t.id ? 'var(--primary)' : 'var(--muted)',
          borderBottom: active === t.id ? '2px solid var(--primary)' : '2px solid transparent',
          marginBottom: -1,
          flex: fullWidth ? 1 : '0 0 auto',
          display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center',
          transition: 'color .15s ease',
        }}
      >
        {t.icon && React.createElement(Icons[t.icon], { size: 15 })}
        {t.label}
      </button>
    ))}
  </div>
);

// Plan pill
const PlanPill = ({ plan }) => {
  const map = { basic: 'default', pro: 'green', premium: 'gold' };
  const p = PLANS[plan] || PLANS.basic;
  return <Badge tone={map[plan] || 'default'}>{p.labelAr}</Badge>;
};

// Sector pill
const SectorPill = ({ sector }) => (
  <Badge>{SECTORS[sector]?.label || sector}</Badge>
);

// Active state pill
const StatePill = ({ active, endsAt }) => {
  if (!active) return <Badge tone="red" dot>موقوف</Badge>;
  const days = daysUntil(endsAt);
  if (days < 0) return <Badge tone="red" dot>منتهي</Badge>;
  if (days <= 30) return <Badge tone="amber" dot>قارب الانتهاء</Badge>;
  return <Badge tone="green" dot>نشط</Badge>;
};

// Stat card
const StatCard = ({ label, value, suffix, icon, hint, tone }) => (
  <div className="wj-card wj-card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ color: 'var(--muted)', fontSize: 13 }}>{label}</span>
      {icon && (
        <span style={{
          width: 30, height: 30, borderRadius: 8,
          background: tone === 'gold' ? 'var(--accent-soft)' : 'var(--primary-soft)',
          color: tone === 'gold' ? 'var(--accent)' : 'var(--primary)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>{React.createElement(Icons[icon], { size: 15 })}</span>
      )}
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
      <span className="mono" style={{ fontSize: 30, fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>{value}</span>
      {suffix && <span className="mono" style={{ fontSize: 18, color: 'var(--muted)' }}>{suffix}</span>}
    </div>
    {hint && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{hint}</span>}
  </div>
);

// Inline alert
const Alert = ({ tone = 'info', icon = 'info', title, children, action }) => {
  const toneMap = {
    info:    { bg: '#eef4f1', bd: '#cfe0d6', fg: '#0e3b2e' },
    warn:    { bg: 'var(--warn-soft)', bd: '#e7cf9c', fg: '#7d5a17' },
    danger:  { bg: 'var(--danger-soft)', bd: '#e7c3be', fg: '#7e2418' },
    success: { bg: 'var(--primary-soft)', bd: '#c5d8cd', fg: 'var(--primary)' },
  }[tone];
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 14,
      background: toneMap.bg, borderRadius: 'var(--r-md)',
      border: `1px solid ${toneMap.bd}`,
      padding: '14px 16px',
      color: toneMap.fg,
    }}>
      <span style={{ marginTop: 2 }}>{React.createElement(Icons[icon], { size: 18 })}</span>
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{title}</div>}
        <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>{children}</div>
      </div>
      {action}
    </div>
  );
};

// Search input
const SearchInput = ({ value, onChange, placeholder = 'بحث...' }) => (
  <div style={{ position: 'relative' }}>
    <input
      className="wj-input"
      style={{ paddingInlineStart: 38 }}
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
    />
    <span style={{ position: 'absolute', insetInlineStart: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
      {React.createElement(Icons.search, { size: 16 })}
    </span>
  </div>
);

// Sidebar nav item
const SideNavItem = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 12,
      width: '100%',
      padding: '9px 12px',
      borderRadius: 8,
      fontSize: 14, fontWeight: 500,
      color: active ? 'var(--primary)' : 'var(--ink-soft)',
      background: active ? 'var(--primary-soft)' : 'transparent',
      transition: 'all .15s ease',
      textAlign: 'right',
    }}
    onMouseEnter={(e) => !active && (e.currentTarget.style.background = 'var(--bg-alt)')}
    onMouseLeave={(e) => !active && (e.currentTarget.style.background = 'transparent')}
  >
    <span style={{ color: active ? 'var(--primary)' : 'var(--muted)' }}>
      {React.createElement(Icons[icon], { size: 17 })}
    </span>
    <span style={{ flex: 1 }}>{label}</span>
    {badge && <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{badge}</span>}
  </button>
);

// Section header
const SectionHeader = ({ title, sub, action }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
    <div>
      <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</h1>
      {sub && <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 14 }}>{sub}</p>}
    </div>
    {action}
  </div>
);

Object.assign(window, {
  Logo, Btn, IconBtn, Card, Badge, Toggle, Field, Input, Textarea, Select,
  EmptyImg, ProjectCover, Avatar, Modal, TabBar,
  PlanPill, SectorPill, StatePill, StatCard, Alert, SearchInput, SideNavItem, SectionHeader,
});
