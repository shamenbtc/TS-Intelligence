// api/supabase.js
// Shared Supabase client helper for all serverless functions.
// Uses the service_role key (from env) which bypasses RLS for server-side writes.

const SUPABASE_URL = 'https://nhckdbehipfibgesnkwj.supabase.co';

export function getSupabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_KEY not configured in Vercel env vars');
  return {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
}

export async function supabaseInsert(table, row) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...getSupabaseHeaders(), 'Prefer': 'return=minimal' },
    body: JSON.stringify(row)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase insert failed (${res.status}): ${err}`);
  }
  return true;
}

export async function supabaseUpdate(table, match, updates) {
  const params = Object.entries(match).map(([k,v]) => `${k}=eq.${encodeURIComponent(v)}`).join('&');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    method: 'PATCH',
    headers: { ...getSupabaseHeaders(), 'Prefer': 'return=minimal' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase update failed (${res.status}): ${err}`);
  }
  // Return number of rows updated (from Content-Range header or count)
  const range = res.headers.get('content-range');
  return range ? parseInt(range.split('/')[1]) || 0 : 0;
}

export async function supabaseSelect(table, params = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${params ? '?' + params : ''}`, {
    headers: { ...getSupabaseHeaders(), 'Prefer': 'count=exact' }
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase select failed (${res.status}): ${err}`);
  }
  return res.json();
}

export { SUPABASE_URL };
