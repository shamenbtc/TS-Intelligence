// api/submit.js
// Vercel serverless function — appends a row to Google Sheets.
// Uses service account credentials from environment variables.
// No credentials ever touch the HTML file or GitHub.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const saEmail = process.env.GOOGLE_SA_EMAIL;
  const saKey = process.env.GOOGLE_SA_PRIVATE_KEY;
  const spreadsheetId = '15gzSANBAwhZPfNoi3Jh2W4tMTVAHVKjv3g4hGXHq3-w';
  const sheetTab = 'Review Data';

  if (!saEmail || !saKey) {
    return res.status(500).json({ error: 'Google service account credentials not configured in Vercel environment variables' });
  }

  const { row } = req.body;
  if (!row || !Array.isArray(row)) {
    return res.status(400).json({ error: 'Missing row data' });
  }

  try {
    // Build JWT for Google OAuth
    const token = await getGoogleAccessToken(saEmail, saKey);

    // Append row to sheet
    const range = encodeURIComponent(sheetTab + '!A:Z');
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: [row] })
    });

    const data = await response.json();
    if (data.error) {
      return res.status(500).json({ error: 'Sheets API error: ' + data.error.message });
    }

    return res.status(200).json({ success: true, updatedRange: data.updates?.updatedRange });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Submission failed' });
  }
}

// ── JWT SIGNING ──────────────────────────────────────────────────────────────
// Node.js server-side JWT signing using the crypto module
async function getGoogleAccessToken(email, pemKey) {
  const { createSign } = await import('crypto');

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url');

  const sigInput = header + '.' + payload;

  // Fix key formatting — Vercel env vars may collapse \n to literal backslash-n
  const fixedKey = pemKey.replace(/\\n/g, '\n');

  const sign = createSign('RSA-SHA256');
  sign.update(sigInput);
  const signature = sign.sign(fixedKey, 'base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  const jwt = sigInput + '.' + signature;

  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + jwt
  });

  const data = await resp.json();
  if (!data.access_token) throw new Error('Google auth failed: ' + JSON.stringify(data));
  return data.access_token;
}
