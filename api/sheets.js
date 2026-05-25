// ============================================================
// api/sheets.js — Vercel Edge Function
// Caching + error-handling proxy for Google Sheets CSV
// Built for Hotel Review Intelligence Database
// (3-row header structure, 26 columns A–Z)
// ============================================================

export const config = {
  runtime: "edge",
};

const SHEETS = {
  main: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqCAoucSr2sR8pdyLobUytm71UaX2Goibvna-a55Kv2Yj5PAGmRqoMcRnrPaWA6Co4-Y6KAZwbcz17/pub?gid=1245614730&single=true&output=csv",
};

const CACHE_SECONDS = 90;
const TIMEOUT_MS    = 8000;

// ── Column map ───────────────────────────────────────────────
// Row 2 of your Sheet contains the actual column names (A–Z).
// We map them to clean camelCase keys for the dashboard.
const COLUMN_MAP = {
  "Check-in Date ★":       "checkInDate",
  "Check-out Date":        "checkOutDate",
  "Night(s) Stayed":       "nightsStayed",
  "Review Month ★":        "reviewMonth",
  "Platform ★":            "platform",
  "Booking Number ★":      "bookingNumber",
  "Room Number ★":         "roomNumber",
  "Room Type ★":           "roomType",
  "Guest Nationality":     "guestNationality",
  "Rating ★":              "rating",
  "Review Text ★":         "reviewText",
  "Mentioned Staff":       "mentionedStaff",
  "Verified Stay":         "verifiedStay",
  "Sentiment ★":           "sentiment",
  "Category ★":            "category",
  "Category ★":            "category",
  "Subcategory ★":         "subcategory",
  "Complaint Summary":     "complaintSummary",
  "Severity ★":            "severity",
  "Maintenance Flag ★":    "maintenanceFlag",
  "HSKP Flag ★":           "hskpFlag",
  "Suggested Action":      "suggestedAction",
  "Resolution Status ★":   "resolutionStatus",
  "Resolved Date":         "resolvedDate",
  "Assigned Department":   "assignedDepartment",
  "Assigned Staff":        "assignedStaff",
  "Resolution Notes":      "resolutionNotes",
};

export default async function handler(req) {
  const url    = new URL(req.url);
  const sheet  = url.searchParams.get("sheet") || "main";

  if (!SHEETS[sheet]) {
    return respond(
      { error: `Unknown sheet: "${sheet}". Available: ${Object.keys(SHEETS).join(", ")}` },
      { status: 400 }
    );
  }

  // ── Fetch from Google ────────────────────────────────────
  let csvText   = null;
  let fetchError = null;

  try {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(SHEETS[sheet], {
      signal: controller.signal,
      headers: { "User-Agent": "VercelEdge/1.0 OpsCache" },
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error(`Google returned HTTP ${res.status}`);

    csvText = await res.text();

    if (csvText.trim().startsWith("<!DOCTYPE") || csvText.trim().startsWith("<html")) {
      throw new Error("Google returned an HTML page instead of CSV — check the Sheet is still published");
    }
  } catch (err) {
    fetchError = err.message;
  }

  const fetchedAt = new Date().toISOString();

  if (fetchError) {
    return respond(
      { ok: false, error: fetchError, fetchedAt, reviews: null, summary: null },
      { status: 503, headers: corsHeaders() }
    );
  }

  // ── Parse the 3-row header structure ────────────────────
  // Row 1: Section labels (STAY INFO, BOOKING, REVIEW, OPERATIONAL, RESOLUTION)
  // Row 2: Column names  ← this is the real header row
  // Row 3: Instructions/examples (skip)
  // Row 4+: Actual review data
  const { reviews, summary } = parseReviewSheet(csvText);

  return respond(
    { ok: true, source: "live", fetchedAt, reviewCount: reviews.length, reviews, summary },
    {
      status: 200,
      headers: {
        ...corsHeaders(),
        "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=30`,
      },
    }
  );
}

// ── Sheet parser ─────────────────────────────────────────────
function parseReviewSheet(csv) {
  const allLines = csv.trim().split("\n");
  if (allLines.length < 4) return { reviews: [], summary: emptySummary() };

  // Row 2 (index 1) = real column headers
  const headers = splitCSVLine(allLines[1]);

  // Rows 4+ (index 3+) = data
  const reviews = [];

  for (let i = 3; i < allLines.length; i++) {
    const values = splitCSVLine(allLines[i]);

    // Skip blank rows
    if (values.every(v => v.trim() === "")) continue;

    // Skip rows that look like embedded notes (no date in column A)
    const rawDate = (values[0] || "").trim();
    if (!rawDate.match(/^\d{1,2}-[A-Za-z]{3}-\d{4}$/)) continue;

    // Build the row object using the column map
    const row = {};
    headers.forEach((h, idx) => {
      const key = COLUMN_MAP[h.trim()];
      if (key) row[key] = (values[idx] || "").trim();
    });

    // Normalise rating to a /5 scale
    row.ratingNormalised = normaliseRating(row.rating);

    reviews.push(row);
  }

  // Build summary stats for the dashboard
  const summary = buildSummary(reviews);

  return { reviews, summary };
}

// ── Normalise ratings to /5 ──────────────────────────────────
function normaliseRating(raw) {
  if (!raw) return null;
  const match = raw.match(/([\d.]+)\s*\/\s*(\d+)/);
  if (!match) return null;
  const score = parseFloat(match[1]);
  const scale = parseFloat(match[2]);
  return Math.round((score / scale) * 5 * 10) / 10; // 1 decimal place
}

// ── Summary stats ────────────────────────────────────────────
function buildSummary(reviews) {
  if (!reviews.length) return emptySummary();

  const rated   = reviews.filter(r => r.ratingNormalised !== null);
  const avgRating = rated.length
    ? Math.round(rated.reduce((s, r) => s + r.ratingNormalised, 0) / rated.length * 10) / 10
    : null;

  // Platform breakdown
  const byPlatform = {};
  reviews.forEach(r => {
    if (!r.platform) return;
    byPlatform[r.platform] = (byPlatform[r.platform] || 0) + 1;
  });

  // Resolution breakdown
  const byResolution = {};
  reviews.forEach(r => {
    const status = r.resolutionStatus || "Not set";
    byResolution[status] = (byResolution[status] || 0) + 1;
  });

  // Sentiment breakdown
  const bySentiment = {};
  reviews.forEach(r => {
    const s = r.sentiment || "Not set";
    bySentiment[s] = (bySentiment[s] || 0) + 1;
  });

  // Open / escalated issues
  const openIssues      = reviews.filter(r => r.resolutionStatus === "Open").length;
  const escalatedIssues = reviews.filter(r => r.resolutionStatus === "Escalated").length;
  const resolvedIssues  = reviews.filter(r => r.resolutionStatus === "Resolved").length;

  // Low ratings (below 3/5)
  const lowRatings = rated.filter(r => r.ratingNormalised < 3).length;

  return {
    totalReviews:    reviews.length,
    avgRating,
    openIssues,
    escalatedIssues,
    resolvedIssues,
    lowRatings,
    byPlatform,
    byResolution,
    bySentiment,
  };
}

function emptySummary() {
  return {
    totalReviews: 0, avgRating: null,
    openIssues: 0, escalatedIssues: 0, resolvedIssues: 0, lowRatings: 0,
    byPlatform: {}, byResolution: {}, bySentiment: {},
  };
}

// ── Helpers ──────────────────────────────────────────────────
function respond(body, { status = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function splitCSVLine(line) {
  const result = [];
  let current  = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current); current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}
