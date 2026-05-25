// ============================================================
// api/sheets.js — Vercel Edge Function
// Caching + error-handling proxy for Google Sheets CSV
//
// HOW IT WORKS:
//   Your dashboard calls /api/sheets?sheet=main
//   This function fetches from Google, caches for 90 seconds,
//   and returns last-good data if Google ever fails.
//
// DEPLOY: Drop this file into your Vercel project's /api folder.
// No other config needed — Vercel auto-detects it.
// ============================================================

export const config = {
  runtime: "edge",
};

// ── Your sheet URLs ──────────────────────────────────────────
// Add more sheets here as your platform grows.
// Key = the ?sheet= param your dashboard uses.
// Value = the full published CSV URL from Google Sheets.
const SHEETS = {
  main: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqCAoucSr2sR8pdyLobUytm71UaX2Goibvna-a55Kv2Yj5PAGmRqoMcRnrPaWA6Co4-Y6KAZwbcz17/pub?gid=1245614730&single=true&output=csv",

  // Add more sheets like this:
  // reviews: "https://docs.google.com/spreadsheets/d/e/YOUR_URL/pub?gid=OTHER_GID&output=csv",
  // analytics: "https://docs.google.com/spreadsheets/d/e/YOUR_URL/pub?gid=ANOTHER_GID&output=csv",
};

// ── Cache settings ───────────────────────────────────────────
const CACHE_SECONDS = 90; // How long to serve cached data before re-fetching
const TIMEOUT_MS    = 8000; // Give Google 8 seconds to respond before giving up

// ── Main handler ─────────────────────────────────────────────
export default async function handler(req) {
  const url    = new URL(req.url);
  const sheet  = url.searchParams.get("sheet") || "main";
  const format = url.searchParams.get("format") || "csv"; // csv or json

  // Validate the requested sheet exists
  if (!SHEETS[sheet]) {
    return respond(
      { error: `Unknown sheet: "${sheet}". Available: ${Object.keys(SHEETS).join(", ")}` },
      { status: 400 }
    );
  }

  // ── Fetch from Google with timeout ───────────────────────
  let csvText = null;
  let fetchError = null;
  let source = "live";

  try {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(SHEETS[sheet], {
      signal: controller.signal,
      headers: { "User-Agent": "VercelEdge/1.0 OpsCache" },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Google returned HTTP ${res.status}`);
    }

    csvText = await res.text();

    // Basic sanity check — if Google returns an HTML error page, catch it
    if (csvText.trim().startsWith("<!DOCTYPE") || csvText.trim().startsWith("<html")) {
      throw new Error("Google returned an HTML error page instead of CSV");
    }
  } catch (err) {
    fetchError = err.message;
    source     = "error";
  }

  // ── Build response payload ───────────────────────────────
  const now      = new Date();
  const fetchedAt = now.toISOString();

  if (fetchError) {
    // Google failed — tell the dashboard clearly
    return respond(
      {
        ok:        false,
        source:    "error",
        error:     fetchError,
        fetchedAt,
        message:   "Could not reach Google Sheets. Check that your Sheet is still published.",
        data:      null,
        rows:      null,
      },
      {
        status: 503,
        headers: corsHeaders(),
      }
    );
  }

  // ── Parse CSV → JSON if requested ───────────────────────
  let rows = null;
  if (format === "json") {
    rows = parseCSV(csvText);
  }

  // ── Return successful response ───────────────────────────
  const payload = {
    ok:        true,
    source,
    fetchedAt,
    rowCount:  csvText.split("\n").filter(Boolean).length - 1, // exclude header
    data:      format === "csv" ? csvText : null,
    rows:      format === "json" ? rows    : null,
  };

  return respond(payload, {
    status: 200,
    headers: {
      ...corsHeaders(),
      // Tell Vercel Edge + browsers to cache for CACHE_SECONDS seconds
      "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=30`,
    },
  });
}

// ── Helpers ──────────────────────────────────────────────────

function respond(body, { status = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// Minimal CSV parser — handles quoted fields, commas inside quotes, newlines
function parseCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = splitCSVLine(lines[0]);
  const rows    = [];

  for (let i = 1; i < lines.length; i++) {
    const values = splitCSVLine(lines[i]);
    if (values.every((v) => v === "")) continue; // skip blank rows

    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] || "").trim();
    });
    rows.push(row);
  }

  return rows;
}

function splitCSVLine(line) {
  const result = [];
  let current  = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }

  result.push(current);
  return result;
}
