// Vercel build script — يستبدل .env.js بسكربت inline يحوي مفاتيح Supabase
const fs = require('fs');
const path = require('path');

const SUPABASE_URL  = process.env.SUPABASE_URL  || '';
const SUPABASE_ANON = process.env.SUPABASE_ANON || '';
const SUPABASE_SVC  = process.env.SUPABASE_SVC  || SUPABASE_ANON;

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const injection = `<script>window.__ENV__={SUPABASE_URL:'${SUPABASE_URL}',SUPABASE_ANON:'${SUPABASE_ANON}',SUPABASE_SVC:'${SUPABASE_SVC}'};</script>`;

html = html.replace(
  /<script src="\.env\.js"><\/script>/,
  injection
);

fs.writeFileSync(htmlPath, html);
console.log('✅ Env vars injected into index.html');
