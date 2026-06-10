// api/check-duplicate.js
// GET endpoint: checks whether a booking number already exists in Supabase.
// Returns { exists: true/false }. Used by the intake form before submission
// to catch duplicates before they hit the database.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-TSH-Key');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const requiredKey = process.env.TSH_INTAKE_KEY;
  if (requiredKey && req.headers['x-tsh-key'] !== requiredKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const SUPABASE_URL = 'https://nhckdbehipfibgesnkwj.supabase.co';
  const serviceKey   = process.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) return res.status(500).json({ error: 'SUPABASE_SERVICE_KEY not configured' });

  const booking = (req.query.booking || '').trim();
  if (!booking) return res.status(400).json({ error: 'booking param required' });

  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/reviews?booking_number=eq.${encodeURIComponent(booking)}&select=id&limit=1`,
      { headers: { 'apikey': serviceKey, 'Authorization': `Bearer ${serviceKey}` } }
    );
    const rows = await r.json();
    return res.status(200).json({ exists: Array.isArray(rows) && rows.length > 0 });
  } catch (err) {
    // Fail open — if the check fails, let the submission proceed
    // (submit.js + the unique constraint will catch true duplicates)
    return res.status(200).json({ exists: false });
  }
}
