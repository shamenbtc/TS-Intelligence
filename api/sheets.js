// ============================================================
// api/sheets.js — Vercel Edge Function
// Returns RAW CSV so the dashboard parseCSV() works unchanged.
// ============================================================

export const config = {
  runtime: "edge",
};

const SHEETS = {
  main: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqCAoucSr2sR8pdyLobUytm71UaX2Goibvna-a55Kv2Yj5PAGmRqoMcRnrPaWA6Co4-Y6KAZwbcz17/pub?gid=1245614730&single=true&output=csv",
};

const CACHE_SECONDS = 90;
const TIMEOUT_MS    = 8000;

export default async function handler(req) {
  const url   = new URL(req.url);
  const sheet = url.searchParams.get("sheet") || "main";

  if (!SHEETS[sheet]) {
    return new Response(`Unknown sheet: "${sheet}"`, { status: 400 });
  }

  // ── Fetch from Google ──────────────────────────────────────
  let csvText   = null;
  let fetchError = null;

  try {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(SHEETS[sheet], {
      signal:  controller.signal,
      headers: { "User-Agent": "VercelEdge/1.0" },
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error(`Google returned HTTP ${res.status}`);

    csvText = await res.text();

    if (csvText.trim().startsWith("<!DOCTYPE") || csvText.trim().startsWith("<html")) {
      throw new Error("Google returned an HTML page — check the Sheet is still published as CSV");
    }
  } catch (err) {
    fetchError = err.message;
  }

  // ── If Google failed, return a clear error as plain text ──
  if (fetchError) {
    return new Response(
      `Google Sheets fetch failed: ${fetchError}`,
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // ── Return RAW CSV — no JSON wrapper ──────────────────────
  // This matches exactly what the dashboard's parseCSV() expects.
  return new Response(csvText, {
    status: 200,
    headers: {
      "Content-Type":                "text/csv; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control":               `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=30`,
      "X-Sheet":                     sheet,
      "X-Fetched-At":                new Date().toISOString(),
    },
  });
}
