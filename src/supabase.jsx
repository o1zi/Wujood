// Supabase client + data layer — Wujood Platform

const ENV = window.__ENV__ || {};
const SUPABASE_URL  = ENV.SUPABASE_URL  || 'https://aslqblelcwjpduzmcyxn.supabase.co';
const SUPABASE_ANON = ENV.SUPABASE_ANON || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbHFibGVsY3dqcGR1em1jeXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NTQ0OTEsImV4cCI6MjA5NTQzMDQ5MX0.amSCUOQp8pCG9qNh8V9RMOn1BnjbclCNowIM5uj4VPw';
const SUPABASE_SVC  = ENV.SUPABASE_SVC  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbHFibGVsY3dqcGR1em1jeXhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg1NDQ5MSwiZXhwIjoyMDk1NDMwNDkxfQ.M3o8pKsdWPP57n5gPss6YuumhJkE9AB8vfv-g0vfKik';

const _createClient = window.supabase.createClient;

let sb = _createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: { persistSession: true, storageKey: 'wujood_session' },
});
let sbAdm = _createClient(SUPABASE_URL, SUPABASE_SVC, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ── Field mappers (DB → app) ──────────────────────────────────
const mapSvc  = s => ({ ...s, desc: s.description });
const mapTesti= t => ({ ...t, text: t.body });
const mapFaq  = f => ({ ...f, q: f.question, a: f.answer });
const mapLog  = l => ({ ...l, by: l.by_user, at: (l.created_at || '').split('T')[0] });

// ── Toast ─────────────────────────────────────────────────────
const showToast = (msg, tone = 'ok') => {
  const el = document.createElement('div');
  el.textContent = msg;
  const bg = tone === 'ok' ? '#0e3b2e' : tone === 'warn' ? '#7d5a17' : '#7e2418';
  el.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:${bg};color:#fff;padding:10px 20px;border-radius:10px;font-size:13px;z-index:9999;box-shadow:0 4px 14px rgba(0,0,0,.3);font-family:var(--font-sans);pointer-events:none;`;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(() => el.remove(), 300); }, 2000);
};

// ── Auth ──────────────────────────────────────────────────────
const sbSignIn = (email, pw) => {
  if (!sb || !sb.auth) return Promise.reject(new Error('Supabase client not ready'));
  return sb.auth.signInWithPassword({ email, password: pw });
};
const sbSignOut = async () => {
  sessionStorage.removeItem('wujood_admin');
  try { await sb.auth.signOut(); } catch (e) {}
};
const sbGetSession = async () => { const { data: { session } } = await sb.auth.getSession(); return session; };
const sbOnAuthChange = cb => sb.auth.onAuthStateChange(cb);
const sbIsAdmin = async () => {
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session?.user) return false;
    const { data } = await sbAdm.from('admins').select('id').eq('id', session.user.id).maybeSingle();
    return !!data;
  } catch (e) { return false; }
};

// ── Tenant ────────────────────────────────────────────────────
const sbGetMyTenant = async () => {
  const { data: { session } } = await sb.auth.getSession();
  if (!session?.user) return { data: null, error: 'no_user' };
  // Use service role to bypass RLS — result is still scoped to the current user's owner_id
  return sbAdm.from('tenants').select('*').eq('owner_id', session.user.id).maybeSingle();
};

const sbGetTenantBySlug = slug =>
  sb.from('tenants').select('*').eq('slug', slug).maybeSingle();

const sbGetAllTenants = () =>
  sbAdm.from('tenants').select('*').order('created_at', { ascending: false });

const sbUpdateTenant = (id, updates) =>
  sb.from('tenants').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single();

const sbCreateTenant = async ({ tenantData, ownerEmail, ownerPassword, planData, note }) => {
  const { data: ud, error: ue } = await sbAdm.auth.admin.createUser({
    email: ownerEmail, password: ownerPassword, email_confirm: true,
  });
  if (ue) return { data: null, error: ue.message };

  const { data: tenant, error: te } = await sbAdm.from('tenants').insert({
    ...tenantData,
    owner_id: ud.user.id,
    subdomain: `${tenantData.slug}.wujood.sa`,
    starts_at: planData.starts_at,
    ends_at: planData.ends_at,
    plan: planData.plan,
    active: true,
  }).select().single();

  if (te) { await sbAdm.auth.admin.deleteUser(ud.user.id); return { data: null, error: te.message }; }

  await sbAdm.from('subscription_logs').insert({
    tenant_id: tenant.id, action: 'تفعيل أولي', plan: planData.plan,
    amount: PLANS[planData.plan]?.priceY || 0, note: note || 'إنشاء حساب جديد', by_user: 'admin',
  });

  return { data: tenant, error: null };
};

const sbDeleteTenant = async (id) => {
  const { data: t } = await sbAdm.from('tenants').select('owner_id').eq('id', id).single();
  const { error } = await sbAdm.from('tenants').delete().eq('id', id);
  if (error) return { error: error.message };
  if (t?.owner_id) await sbAdm.auth.admin.deleteUser(t.owner_id);
  return { error: null };
};

const sbToggleTenant = (id, active) =>
  sbAdm.from('tenants').update({ active }).eq('id', id).select().single();

const sbRenewTenant = async (id, months = 12) => {
  const { data: t } = await sbAdm.from('tenants').select('plan, ends_at').eq('id', id).single();
  if (!t) return { error: 'tenant_not_found' };
  const newEnd = new Date(t.ends_at);
  newEnd.setMonth(newEnd.getMonth() + months);
  const planRev = { basic: 1200, pro: 2000, premium: 3500 };
  const { error } = await sbAdm.from('tenants').update({
    ends_at: newEnd.toISOString().split('T')[0], active: true,
  }).eq('id', id);
  if (error) return { error: error.message };
  await sbAdm.from('subscription_logs').insert({
    tenant_id: id, action: 'تجديد اشتراك', plan: t.plan,
    amount: planRev[t.plan] || 0, note: `تجديد ${months} شهر`, by_user: 'admin',
  });
  return { error: null };
};

const sbUpgradePlan = async (id, newPlan) => {
  const { data: t } = await sbAdm.from('tenants').select('plan').eq('id', id).single();
  if (!t) return { error: 'tenant_not_found' };
  const planRev = { basic: 1200, pro: 2000, premium: 3500 };
  const { error } = await sbAdm.from('tenants').update({ plan: newPlan }).eq('id', id);
  if (error) return { error: error.message };
  await sbAdm.from('subscription_logs').insert({
    tenant_id: id, action: 'ترقية باقة', plan: newPlan,
    amount: planRev[newPlan] - (planRev[t.plan] || 0), note: `ترقية من ${t.plan} إلى ${newPlan}`, by_user: 'admin',
  });
  return { error: null };
};

const sbPauseTenant = async (id) => {
  const { error } = await sbAdm.from('tenants').update({ active: false }).eq('id', id);
  if (error) return { error: error.message };
  await sbAdm.from('subscription_logs').insert({
    tenant_id: id, action: 'إيقاف مؤقت', plan: '', amount: 0, note: 'إيقاف من قبل الأدمن', by_user: 'admin',
  });
  return { error: null };
};

const sbGetPlatformSettings = () =>
  sbAdm.from('platform_settings').select('*').eq('id', 1).single();

const sbSavePlatformSettings = (data) =>
  sbAdm.from('platform_settings').update({ ...data, updated_at: new Date().toISOString() }).eq('id', 1).select().single();

// ── Projects ──────────────────────────────────────────────────
const sbGetProjects = tid =>
  sb.from('projects').select('*').eq('tenant_id', tid).order('order_idx');

const sbAddProject = proj =>
  sb.from('projects').insert(proj).select().single();

const sbUpdateProject = (id, upd) =>
  sb.from('projects').update(upd).eq('id', id).select().single();

const sbDeleteProject = id => sb.from('projects').delete().eq('id', id);

// ── Services ──────────────────────────────────────────────────
const sbGetServices = async (tid) => {
  const { data, error } = await sb.from('services').select('*').eq('tenant_id', tid).order('order_idx');
  return { data: data?.map(mapSvc) ?? null, error };
};

const sbAddService = async (svc) => {
  const payload = { ...svc, description: svc.desc ?? svc.description ?? '' };
  delete payload.desc;
  const { data, error } = await sb.from('services').insert(payload).select().single();
  return { data: data ? mapSvc(data) : null, error };
};

const sbUpdateService = async (id, upd) => {
  const payload = { ...upd };
  if ('desc' in payload) { payload.description = payload.desc; delete payload.desc; }
  const { data, error } = await sb.from('services').update(payload).eq('id', id).select().single();
  return { data: data ? mapSvc(data) : null, error };
};

const sbDeleteService = id => sb.from('services').delete().eq('id', id);

// ── Stats ─────────────────────────────────────────────────────
const sbGetStats = tid => sb.from('stats').select('*').eq('tenant_id', tid).order('order_idx');
const sbAddStat    = s  => sb.from('stats').insert(s).select().single();
const sbUpdateStat = (id, u) => sb.from('stats').update(u).eq('id', id).select().single();
const sbDeleteStat = id => sb.from('stats').delete().eq('id', id);

// ── Testimonials ──────────────────────────────────────────────
const sbGetTestimonials = async (tid) => {
  const { data, error } = await sb.from('testimonials').select('*').eq('tenant_id', tid).order('order_idx');
  return { data: data?.map(mapTesti) ?? null, error };
};

const sbAddTestimonial = async (t) => {
  const payload = { ...t, body: t.text ?? t.body ?? '' }; delete payload.text;
  const { data, error } = await sb.from('testimonials').insert(payload).select().single();
  return { data: data ? mapTesti(data) : null, error };
};

const sbUpdateTestimonial = async (id, upd) => {
  const payload = { ...upd };
  if ('text' in payload) { payload.body = payload.text; delete payload.text; }
  const { data, error } = await sb.from('testimonials').update(payload).eq('id', id).select().single();
  return { data: data ? mapTesti(data) : null, error };
};

const sbDeleteTestimonial = id => sb.from('testimonials').delete().eq('id', id);

// ── FAQs ──────────────────────────────────────────────────────
const sbGetFaqs = async (tid) => {
  const { data, error } = await sb.from('faqs').select('*').eq('tenant_id', tid).order('order_idx');
  return { data: data?.map(mapFaq) ?? null, error };
};

const sbAddFaq = async (f) => {
  const payload = { ...f, question: f.q ?? f.question ?? '', answer: f.a ?? f.answer ?? '' };
  delete payload.q; delete payload.a;
  const { data, error } = await sb.from('faqs').insert(payload).select().single();
  return { data: data ? mapFaq(data) : null, error };
};

const sbUpdateFaq = async (id, upd) => {
  const payload = { ...upd };
  if ('q' in payload) { payload.question = payload.q; delete payload.q; }
  if ('a' in payload) { payload.answer   = payload.a; delete payload.a; }
  const { data, error } = await sb.from('faqs').update(payload).eq('id', id).select().single();
  return { data: data ? mapFaq(data) : null, error };
};

const sbDeleteFaq = id => sb.from('faqs').delete().eq('id', id);

// ── Subscription Logs ─────────────────────────────────────────
const sbGetSubLogs = async (tid) => {
  const { data, error } = await sbAdm.from('subscription_logs').select('*').eq('tenant_id', tid).order('created_at', { ascending: false });
  return { data: data?.map(mapLog) ?? null, error };
};

const sbAddSubLog = (log) =>
  sbAdm.from('subscription_logs').insert({ ...log, by_user: log.by ?? 'admin' }).select().single();

// ── Admin platform stats ──────────────────────────────────────
const sbGetAdminStats = async () => {
  const { data } = await sbAdm.from('tenants').select('id, active, plan, ends_at');
  if (!data?.length) return ADMIN_PLATFORM_STATS;
  const now = new Date();
  const planRev = { basic: 1200, pro: 2000, premium: 3500 };
  return {
    total_tenants: data.length,
    active_tenants: data.filter(t => t.active).length,
    ending_soon: data.filter(t => { const d = Math.ceil((new Date(t.ends_at) - now) / 86400000); return t.active && d <= 30 && d > 0; }).length,
    expired: data.filter(t => !t.active).length,
    monthly_revenue: Math.round(data.filter(t => t.active).reduce((s, t) => s + (planRev[t.plan] || 0), 0) / 12),
    total_visitors_30d: 47820,
  };
};

// ── Storage upload ────────────────────────────────────────────
const sbUpload = async (bucket, path, file) => {
  const { error } = await sb.storage.from(bucket).upload(path, file, { upsert: true, contentType: file.type });
  if (error) return { url: null, error: error.message };
  const { data: { publicUrl } } = sb.storage.from(bucket).getPublicUrl(path);
  return { url: publicUrl, error: null };
};

// ── Expose ────────────────────────────────────────────────────
Object.assign(window, {
  sb, sbAdm, showToast,
  sbSignIn, sbSignOut, sbGetSession, sbOnAuthChange, sbIsAdmin,
  sbGetMyTenant, sbGetTenantBySlug, sbGetAllTenants,
  sbUpdateTenant, sbCreateTenant, sbDeleteTenant, sbToggleTenant,
  sbRenewTenant, sbUpgradePlan, sbPauseTenant,
  sbGetPlatformSettings, sbSavePlatformSettings,
  sbGetProjects, sbAddProject, sbUpdateProject, sbDeleteProject,
  sbGetServices, sbAddService, sbUpdateService, sbDeleteService,
  sbGetStats, sbAddStat, sbUpdateStat, sbDeleteStat,
  sbGetTestimonials, sbAddTestimonial, sbUpdateTestimonial, sbDeleteTestimonial,
  sbGetFaqs, sbAddFaq, sbUpdateFaq, sbDeleteFaq,
  sbGetSubLogs, sbAddSubLog,
  sbGetAdminStats, sbUpload,
  mapLog,
});
