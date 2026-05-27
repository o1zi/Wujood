// Vercel build script — يستبدل .env.js بسكربت inline يحوي مفاتيح Supabase
const fs = require('fs');
const path = require('path');

console.log('🔧 Running build.js...');
console.log('   SUPABASE_URL:', process.env.SUPABASE_URL ? process.env.SUPABASE_URL.substring(0, 25) + '...' : '❌ NOT SET');
console.log('   SUPABASE_ANON:', process.env.SUPABASE_ANON ? '✅ SET' : '❌ NOT SET');
console.log('   SUPABASE_SVC:', process.env.SUPABASE_SVC ? '✅ SET' : '❌ NOT SET');

const SUPABASE_URL  = process.env.SUPABASE_URL  || '';
const SUPABASE_ANON = process.env.SUPABASE_ANON || '';
const SUPABASE_SVC  = process.env.SUPABASE_SVC  || SUPABASE_ANON;

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const injection = `<script>window.__ENV__={SUPABASE_URL:'${SUPABASE_URL}',SUPABASE_ANON:'${SUPABASE_ANON}',SUPABASE_SVC:'${SUPABASE_SVC}'};</script>`;

const replaced = html.replace(
  /<script src="\.env\.js"><\/script>/,
  injection
);

if (replaced === html) {
  console.error('❌ Failed to find .env.js script tag in index.html!');
  process.exit(1);
}

fs.writeFileSync(htmlPath, replaced);
console.log('✅ Env vars injected into index.html');
