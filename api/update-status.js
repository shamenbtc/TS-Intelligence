// api/update-status.js
// Updates resolution fields for a specific row in Google Sheets.
// Called when a manager updates an alert status directly from the dashboard.
// Writes to columns V (Resolution Status), W (Resolved Date),
// X (Assigned Department), Y (Assigned Staff), Z (Resolution Notes).

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const saEmail = process.env.GOOGLE_SA_EMAIL;
  const saKey   = process.env.GOOGLE_SA_PRIVATE_KEY;
  const SPREADSHEET_ID = '15gzSANBAwhZPfNoi3Jh2W4tMTVAHVKjv3g4hGXHq3-w';
  const SHEET_TAB      = 'Review Data';

  if (!saEmail || !saKey) {
    return res.status(500).json({ error: 'Google credentials not configured' });
  }

  const { bookingNumber, resolutionStatus, resolvedDate, assignedDept, assignedStaff, resolutionNotes } = req.body;

  if (!bookingNumber) {
    return res.status(400).json({ error: 'bookingNumber is required to identify the row' });
  }
  if (!resolutionStatus) {
    return res.status(400).json({ error: 'resolutionStatus is required' });
  }

  try {
    const token = await getGoogleAccessToken(saEmail, saKey);

    // Step 1: Find the row number by matching Booking Number (column F)
    const rowNum = await findRowByBookingNumber(bookingNumber, token, SPREADSHEET_ID, SHEET_TAB);
    if (!rowNum) {
      return res.status(404).json({ error: `Booking number "${bookingNumber}" not found in sheet` });
    }

    // Step 2: Write resolution fields to that row
    // V = Resolution Status, W = Resolved Date, X = Assigned Dept, Y = Assigned Staff, Z = Notes, AA = Last Updated
    const updates = [
      { range: `${SHEET_TAB}!V${rowNum}`, values: [[resolutionStatus]] },
      { range: `${SHEET_TAB}!W${rowNum}`, values: [[resolvedDate || '']] },
      { range: `${SHEET_TAB}!X${rowNum}`, values: [[assignedDept || '']] },
      { range: `${SHEET_TAB}!Y${rowNum}`, values: [[assignedStaff || '']] },
      { range: `${SHEET_TAB}!Z${rowNum}`, values: [[resolutionNotes || '']] },
      { range: `${SHEET_TAB}!AA${rowNum}`, values: [[sgTimestamp()]] },
    ];

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ valueInputOption: 'USER_ENTERED', data: updates })
    });

    const data = await resp.json();
    if (data.error) throw new Error('Sheets API error: ' + data.error.message);

    return res.status(200).json({
      success: true,
      rowNum,
      resolutionStatus,
      message: `Row ${rowNum} updated — ${resolutionStatus}`
    });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Update failed' });
  }
}

// ── FIND ROW BY BOOKING NUMBER ────────────────────────────────────────────────
// Reads column F (Booking Number) and finds the matching row index.
// Returns the 1-based sheet row number, or null if not found.
async function findRowByBookingNumber(bookingNumber, token, spreadsheetId, sheetTab) {
  // Read column F (Booking Number) — all rows
  const range = encodeURIComponent(`${sheetTab}!F:F`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
  const resp = await fetch(url, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await resp.json();
  if (data.error) throw new Error('Sheets read error: ' + data.error.message);

  const rows = data.values || [];
  const searchStr = String(bookingNumber).trim().replace(/\.0$/, '');

  for (let i = 0; i < rows.length; i++) {
    const cellVal = String(rows[i][0] || '').trim().replace(/\.0$/, '');
    if (cellVal === searchStr) {
      return i + 1; // 1-based row number
    }
  }
  return null;
}

// ── SINGAPORE TIMESTAMP ────────────────────────────────────────────────────────
// Vercel runs in UTC. Singapore is UTC+8 (no DST). Format: "03-Jun-2026 2:30pm".
function sgTimestamp() {
  const sg = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dd = String(sg.getUTCDate()).padStart(2, '0');
  const mon = months[sg.getUTCMonth()];
  const yyyy = sg.getUTCFullYear();
  let h = sg.getUTCHours();
  const m = String(sg.getUTCMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12; if (h === 0) h = 12;
  return `${dd}-${mon}-${yyyy} ${h}:${m}${ampm}`;
}

// ── GOOGLE JWT AUTH ───────────────────────────────────────────────────────────
async function getGoogleAccessToken(email, pemKey) {
  const { createSign } = await import('crypto');
  const now = Math.floor(Date.now() / 1000);
  const header  = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url');
  const sigInput = header + '.' + payload;
  const fixedKey = pemKey.replace(/\\n/g, '\n');
  const sign = createSign('RSA-SHA256');
  sign.update(sigInput);
  const sig = sign.sign(fixedKey, 'base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
  const jwt = sigInput + '.' + sig;
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + jwt
  });
  const data = await resp.json();
  if (!data.access_token) throw new Error('Google auth failed: ' + JSON.stringify(data));
  return data.access_token;
}
