// Vercel build script — يولّد .env.js من Environment Variables
const fs = require('fs');

const env = {
  SUPABASE_URL:  process.env.SUPABASE_URL  || '',
  SUPABASE_ANON: process.env.SUPABASE_ANON || '',
  SUPABASE_SVC:  process.env.SUPABASE_SVC  || '',
};

const content = `window.__ENV__ = {
  SUPABASE_URL:  '${env.SUPABASE_URL}',
  SUPABASE_ANON: '${env.SUPABASE_ANON}',
  SUPABASE_SVC:  '${env.SUPABASE_SVC}',
};
`;

fs.writeFileSync('.env.js', content);
console.log('.env.js generated successfully');
