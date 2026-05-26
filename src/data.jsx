// Mock data + shared helpers

const SECTORS = {
  architecture: { label: 'هندسة معمارية وإنشائية', projectWord: 'مشاريع', actionLabel: 'استعرض مشاريعنا' },
  contractor:   { label: 'مقاولات بناء',            projectWord: 'مشاريع منجزة', actionLabel: 'أعمالنا' },
  realestate:   { label: 'تطوير عقاري',             projectWord: 'وحدات سكنية', actionLabel: 'استعرض الوحدات' },
  interior:     { label: 'ديكور داخلي',             projectWord: 'أعمال',     actionLabel: 'استعرض الأعمال' },
  photo:        { label: 'تصوير',                   projectWord: 'بورتفوليو', actionLabel: 'استعرض الأعمال' },
  legal:        { label: 'استشارات قانونية',        projectWord: 'خدمات',     actionLabel: 'خدماتنا' },
  medical:      { label: 'عيادات طبية',             projectWord: 'تخصصات',    actionLabel: 'خدماتنا' },
  general:      { label: 'مكتب عام',                projectWord: 'أعمال',     actionLabel: 'أعمالنا' },
};

const PLANS = {
  basic:   { id: 'basic',   label: 'Basic',   labelAr: 'أساسية', priceY: 1200, projects: 10,  storage: '500 ميجا', custom_domain: false, templates: 'قالب Modern فقط' },
  pro:     { id: 'pro',     label: 'Pro',     labelAr: 'احترافية', priceY: 2000, projects: 30,  storage: '2 جيجا',   custom_domain: false, templates: 'كل القوالب الأساسية + المخصصة العامة' },
  premium: { id: 'premium', label: 'Premium', labelAr: 'بريميوم',  priceY: 3500, projects: Infinity, storage: '10 جيجا', custom_domain: true,  templates: 'كل القوالب بما فيها الخاصة' },
};

// Demo tenant (الفارابي)
const DEMO_TENANT = {
  id: 't-1',
  slug: 'alfarabi',
  name_ar: 'مكتب الفارابي للاستشارات الهندسية',
  name_en: 'Al-Farabi Engineering Consultants',
  short_ar: 'مكتب الفارابي',
  sector: 'architecture',
  about_ar: 'مكتب الفارابي للاستشارات الهندسية مكتب سعودي متخصص في التصميم المعماري والإشراف الإنشائي، تأسس عام 1432هـ ويضم نخبة من المهندسين والمعماريين. نقدم خدماتنا للقطاعين العام والخاص بمعايير دولية وحسّ محلي عميق، ونؤمن أن المعمار الجيد يبدأ من فهم المكان والناس قبل الخط الأول على الورق.',
  about_en: 'Al-Farabi is a Saudi architecture and engineering consultancy founded in 2011, specializing in architectural design and construction supervision across public and private sectors.',
  phone: '+966 50 123 4567',
  whatsapp: '+966 50 123 4567',
  email: 'info@alfarabi-eng.sa',
  address_ar: 'الرياض، حي الورود، طريق الملك فهد',
  social: { instagram: 'alfarabi.eng', twitter: 'alfarabi_eng', linkedin: 'alfarabi-engineering', snapchat: '', tiktok: '' },
  plan: 'premium',
  active: true,
  starts_at: '2025-09-01',
  ends_at:   '2026-09-01',
  current_template: 'modern',
  custom_domain: 'alfarabi-eng.com',
  subdomain: 'alfarabi.wujood.sa',
};

const DEMO_PROJECTS = [
  { id: 'p1', tenant_id: 't-1', title_ar: 'مجمع الواحة السكني', title_en: 'Al-Waha Residential Compound', category: 'سكني', location: 'الرياض - حي الياسمين', year: 2024, featured: true, status: 'مكتمل', area: 18500, rooms: null, baths: null, cover_seed: 1, tags: ['سكني', 'فلل'] },
  { id: 'p2', tenant_id: 't-1', title_ar: 'برج النخيل التجاري', title_en: 'Al-Nakheel Commercial Tower', category: 'تجاري', location: 'الرياض - المركز المالي', year: 2024, featured: true, status: 'تحت الإنشاء', area: 42000, rooms: null, baths: null, cover_seed: 2, tags: ['تجاري', 'برج'] },
  { id: 'p3', tenant_id: 't-1', title_ar: 'مدرسة الرواد الأهلية', title_en: 'Al-Rowad Private School', category: 'تعليمي', location: 'جدة - حي الزهراء', year: 2023, featured: true, status: 'مكتمل', area: 12000, rooms: null, baths: null, cover_seed: 3, tags: ['تعليمي'] },
  { id: 'p4', tenant_id: 't-1', title_ar: 'فيلا الورود الخاصة', title_en: 'Al-Wurood Private Villa', category: 'سكني', location: 'الرياض - حي الورود', year: 2024, featured: true, status: 'مكتمل', area: 850, rooms: 6, baths: 7, cover_seed: 4, tags: ['فيلا', 'سكني'] },
  { id: 'p5', tenant_id: 't-1', title_ar: 'مستشفى الأمير سلطان', title_en: 'Prince Sultan Hospital Extension', category: 'صحي', location: 'الدمام', year: 2023, featured: false, status: 'مكتمل', area: 28000, rooms: null, baths: null, cover_seed: 5, tags: ['صحي'] },
  { id: 'p6', tenant_id: 't-1', title_ar: 'مجمع الياسمين التجاري', title_en: 'Yasmin Commercial Plaza', category: 'تجاري', location: 'الرياض', year: 2023, featured: false, status: 'مكتمل', area: 9500, rooms: null, baths: null, cover_seed: 6, tags: ['تجاري'] },
  { id: 'p7', tenant_id: 't-1', title_ar: 'مسجد الفرقان', title_en: 'Al-Furqan Mosque', category: 'ديني', location: 'الرياض', year: 2022, featured: false, status: 'مكتمل', area: 2100, rooms: null, baths: null, cover_seed: 7, tags: ['ديني'] },
  { id: 'p8', tenant_id: 't-1', title_ar: 'استراحة الصحراء', title_en: 'Desert Retreat', category: 'سكني', location: 'العلا', year: 2024, featured: false, status: 'مكتمل', area: 1800, rooms: 4, baths: 4, cover_seed: 8, tags: ['سكني', 'استراحة'] },
];

const DEMO_SERVICES = [
  { id: 's1', type: 'service', title: 'التصميم المعماري', desc: 'حلول تصميمية متكاملة من المخطط الأولي إلى المخططات التنفيذية', icon: 'cube', published: true },
  { id: 's2', type: 'service', title: 'الإشراف الإنشائي', desc: 'إشراف ميداني دقيق على كل مراحل التنفيذ مع تقارير أسبوعية', icon: 'shield', published: true },
  { id: 's3', type: 'service', title: 'دراسات الجدوى', desc: 'دراسات فنية واقتصادية مفصّلة قبل بدء أي مشروع', icon: 'bar', published: true },
  { id: 's4', type: 'service', title: 'التصميم الداخلي', desc: 'تنسيق داخلي ينسجم مع الهوية المعمارية للمشروع', icon: 'palette', published: true },
];

const DEMO_FEATURES = [
  { id: 'f1', type: 'feature', title: '14 سنة خبرة', desc: 'منذ 2011 ونحن نُسلّم بنفس الجودة', icon: 'star', published: true },
  { id: 'f2', type: 'feature', title: 'فريق سعودي بالكامل', desc: 'مهندسون ومعماريون من الجامعات الرائدة', icon: 'users', published: true },
  { id: 'f3', type: 'feature', title: 'كود البناء السعودي', desc: 'كل مشاريعنا متوافقة مع SBC بالكامل', icon: 'shield', published: true },
  { id: 'f4', type: 'feature', title: 'تسليم في الموعد', desc: '94% من مشاريعنا تُسلّم في الموعد المتفق عليه', icon: 'clock', published: true },
];

const DEMO_STATS = [
  { id: 'st1', value: 14, suffix: '+', label: 'سنة خبرة', order: 1 },
  { id: 'st2', value: 220, suffix: '+', label: 'مشروع منجز', order: 2 },
  { id: 'st3', value: 38, suffix: '', label: 'جائزة وتكريم', order: 3 },
  { id: 'st4', value: 96, suffix: '%', label: 'رضا العملاء', order: 4 },
];

const DEMO_TESTIMONIALS = [
  { id: 'tm1', name: 'م. عبدالله الراجحي', role: 'مدير عام، شركة الراجحي للاستثمار', text: 'تعاملنا مع الفارابي على ثلاثة مشاريع كبرى. الجودة والالتزام بالمواعيد لم يخذلانا ولا مرة.', rating: 5, published: true },
  { id: 'tm2', name: 'أ. منى السبيعي', role: 'مالكة فيلا خاصة', text: 'تصميم فاق التوقعات. الفريق صبور جداً واستوعب كل تعديلاتي حتى وصلنا للنتيجة المثالية.', rating: 5, published: true },
  { id: 'tm3', name: 'د. سعد القحطاني', role: 'رئيس مجلس إدارة، مدارس الرواد', text: 'مشروع المدرسة كان معقداً ومليئاً بالاشتراطات. أنجزوه بمرونة عالية ودقة هندسية ممتازة.', rating: 5, published: true },
];

const DEMO_FAQS = [
  { id: 'q1', q: 'ما المناطق التي يخدمها مكتبكم؟', a: 'نخدم جميع مناطق المملكة العربية السعودية، مع تركيز خاص على الرياض وجدة والدمام.', published: true },
  { id: 'q2', q: 'كم تستغرق المرحلة التصميمية للفيلا؟', a: 'عادةً ما بين 6 إلى 10 أسابيع للفيلا الخاصة، حسب درجة التخصيص ومدى تفاعل العميل في مراجعات التصميم.', published: true },
  { id: 'q3', q: 'هل تشرفون على التنفيذ بعد التصميم؟', a: 'نعم، نقدم خدمة الإشراف الإنشائي الكاملة كخدمة مستقلة أو مكملة لخدمة التصميم.', published: true },
  { id: 'q4', q: 'كيف يتم احتساب الأتعاب؟', a: 'نسبة من قيمة المشروع للتصميم، ورسوم شهرية ثابتة للإشراف. نرسل عرضاً تفصيلياً بعد الاجتماع الأول.', published: true },
];

// Admin: list of tenants in the platform
const ADMIN_TENANTS = [
  { id: 't-1', name: 'مكتب الفارابي للاستشارات الهندسية', slug: 'alfarabi', sector: 'architecture', plan: 'premium', active: true, ends_at: '2026-09-01', projects: 8, custom_domain: 'alfarabi-eng.com', created: '2024-09-01' },
  { id: 't-2', name: 'شركة دار البناء للمقاولات',         slug: 'darbinaa', sector: 'contractor', plan: 'pro', active: true, ends_at: '2025-12-15', projects: 18, custom_domain: null, created: '2024-12-15' },
  { id: 't-3', name: 'مجموعة الأبراج للتطوير العقاري',     slug: 'alabraj', sector: 'realestate', plan: 'premium', active: true, ends_at: '2026-03-20', projects: 24, custom_domain: 'alabraj.sa', created: '2024-03-20' },
  { id: 't-4', name: 'استوديو نوى للديكور الداخلي',        slug: 'nawa-studio', sector: 'interior', plan: 'pro', active: true, ends_at: '2025-08-10', projects: 31, custom_domain: null, created: '2024-08-10' },
  { id: 't-5', name: 'فهد الشهري للتصوير',                slug: 'fahad-photo', sector: 'photo', plan: 'basic', active: true, ends_at: '2025-07-05', projects: 9, custom_domain: null, created: '2024-07-05' },
  { id: 't-6', name: 'مكتب الزهراني للمحاماة',            slug: 'zahrani-law', sector: 'legal', plan: 'pro', active: false, ends_at: '2025-06-01', projects: 6, custom_domain: null, created: '2024-06-01' },
  { id: 't-7', name: 'عيادات النخبة الطبية',              slug: 'elite-clinic', sector: 'medical', plan: 'premium', active: true, ends_at: '2026-01-30', projects: 12, custom_domain: 'elite-clinics.sa', created: '2024-01-30' },
  { id: 't-8', name: 'مكتب الرواد الهندسي',               slug: 'rowad-eng', sector: 'architecture', plan: 'basic', active: true, ends_at: '2025-06-15', projects: 7, custom_domain: null, created: '2024-06-15' },
  { id: 't-9', name: 'شركة المعمار الذهبي',                slug: 'golden-arch', sector: 'architecture', plan: 'pro', active: true, ends_at: '2026-04-22', projects: 14, custom_domain: null, created: '2025-04-22' },
  { id: 't-10', name: 'استوديو خط للديكور',               slug: 'khat-studio', sector: 'interior', plan: 'basic', active: true, ends_at: '2026-02-18', projects: 5, custom_domain: null, created: '2025-02-18' },
  { id: 't-11', name: 'مجموعة البيت المعماري',            slug: 'house-group', sector: 'architecture', plan: 'pro', active: true, ends_at: '2026-06-04', projects: 11, custom_domain: null, created: '2024-06-04' },
  { id: 't-12', name: 'مكاتب القمة الاستشارية',           slug: 'qimah', sector: 'general', plan: 'basic', active: false, ends_at: '2025-05-20', projects: 3, custom_domain: null, created: '2024-05-20' },
];

const ADMIN_PLATFORM_STATS = {
  total_tenants: 12,
  active_tenants: 10,
  ending_soon: 3,
  expired: 2,
  monthly_revenue: 24600,
  total_visitors_30d: 47820,
};

// Subscription log
const SUBSCRIPTION_LOG = [
  { id: 'sl1', action: 'تجديد سنوي', plan: 'premium', amount: 3500, note: 'تحويل #4827 - عبر الراجحي', by: 'admin', at: '2025-09-01' },
  { id: 'sl2', action: 'ترقية الباقة', plan: 'premium', amount: 1500, note: 'فرق ترقية من Pro', by: 'admin', at: '2024-12-10' },
  { id: 'sl3', action: 'تجديد سنوي', plan: 'pro', amount: 2000, note: 'تحويل #2104', by: 'admin', at: '2024-09-01' },
  { id: 'sl4', action: 'تفعيل أولي', plan: 'pro', amount: 2000, note: 'تحويل #0011', by: 'admin', at: '2023-09-01' },
];

// Color palettes for theme builder
const PALETTES = [
  { name: 'الأخضر الكلاسيكي', primary: '#0e3b2e', accent: '#b08a3e', bg: '#faf8f3', text: '#14201a' },
  { name: 'الأزرق العميق',    primary: '#0b2545', accent: '#d4a72c', bg: '#fafbfc', text: '#0f172a' },
  { name: 'الفاخر الداكن',    primary: '#0a0a0a', accent: '#d4a85a', bg: '#0a0a0a', text: '#f4ecd8', dark: true },
  { name: 'الأرضي الدافئ',    primary: '#5a3e2b', accent: '#c69749', bg: '#f7f0e5', text: '#2a1f15' },
  { name: 'النحاسي الراقي',   primary: '#3a2618', accent: '#b87333', bg: '#f9f4ec', text: '#1c0f08' },
  { name: 'الرصاصي الحديث',   primary: '#1f2937', accent: '#0ea5a4', bg: '#fafafa', text: '#0f172a' },
  { name: 'الزيتوني',         primary: '#3a4a1e', accent: '#9c7a1f', bg: '#f6f4ec', text: '#1c2410' },
  { name: 'البحري الفاخر',    primary: '#0a1d36', accent: '#cfa44d', bg: '#0e1f3a', text: '#f0e7d2', dark: true },
];

const HEADING_FONTS = ['Reem Kufi', 'Cairo', 'Tajawal', 'Almarai', 'IBM Plex Sans Arabic', 'Amiri', 'Markazi Text', 'Noto Naskh Arabic'];
const BODY_FONTS = ['IBM Plex Sans Arabic', 'Tajawal', 'Cairo', 'Almarai', 'Noto Sans Arabic', 'Markazi Text'];

const HERO_STYLES = ['ملء الشاشة', 'مقسم نص-صورة', 'مقسم معكوس', 'مركزي', 'بسيط', 'سينمائي'];

// Helpers
const fmtSAR = (n) => n.toLocaleString('en-US');
const daysUntil = (dateStr) => {
  const d = new Date(dateStr); const now = new Date();
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
};
const fmtDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
};
const initials = (name) => name.split(' ').slice(0, 2).map(x => x[0]).join('');

Object.assign(window, {
  SECTORS, PLANS,
  DEMO_TENANT, DEMO_PROJECTS, DEMO_SERVICES, DEMO_FEATURES, DEMO_STATS, DEMO_TESTIMONIALS, DEMO_FAQS,
  ADMIN_TENANTS, ADMIN_PLATFORM_STATS, SUBSCRIPTION_LOG,
  PALETTES, HEADING_FONTS, BODY_FONTS, HERO_STYLES,
  fmtSAR, daysUntil, fmtDate, initials,
});
