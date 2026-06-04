// api/classify.js
// Vercel serverless function — calls Claude API using key from environment variable.
// The key never touches the HTML file or GitHub.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured in Vercel environment variables' });
  }

  const { platform, roomNumber, roomType, rating, checkinDate, reviewText } = req.body;

  if (!reviewText || !platform || !roomNumber) {
    return res.status(400).json({ error: 'Missing required fields: reviewText, platform, roomNumber' });
  }

  const prompt = `You are a hotel operations analyst for The Sultan Hotel Singapore.
Analyse this guest input and return a JSON object with ALL fields filled.

The input may be one of two formats:
1. A written guest review (narrative text)
2. A ratings-only entry — sub-category scores copied from a booking platform, e.g.:
   "Staff 10 / Cleanliness 10 / Location 7.5 / Comfort 10 / Room view 5"

For ratings-only entries: infer sentiment from the overall rating and sub-scores. A sub-score below 6 is a weak point — treat it as a mild complaint signal. No written complaint means severity is at most 2 unless a sub-score is below 5. Set complaint_summary to the weakest sub-category if any score is below 7, otherwise leave empty.

Review details:
- Platform: ${platform}
- Room: ${roomNumber} (${roomType || 'unknown'})
- Rating: ${rating}
- Check-in: ${checkinDate}
- Review text / ratings: ${reviewText}

Return ONLY valid JSON, no markdown, no explanation. Use exactly these fields:
{
  "sentiment": "Positive" | "Neutral" | "Negative",
  "category": "Room Comfort & Quality" | "Cleanliness" | "Staff" | "Facilities" | "Value for Money" | "F&B" | "Location" | "Other",
  "subcategory": string,
  "complaint_summary": string (5-10 words, or empty string if no issues),
  "severity": 1 | 2 | 3 | 4 | 5,
  "maintenance_flag": "Yes" | "No",
  "hskp_flag": "Yes" | "No",
  "suggested_action": string,
  "resolution_status": "Open" | "Resolved" | "Escalated" | "In Progress" | "Monitoring",
  "assigned_department": "Engineering" | "Housekeeping" | "Front Office" | "F&B" | "Management" | "",
  "mixed_sentiment": true | false,
  "mixed_sentiment_note": string,
  "analyst_note": string,
  "confidence_sentiment": "high" | "med" | "low",
  "confidence_category": "high" | "med" | "low",
  "confidence_severity": "high" | "med" | "low"
}

Rules:
- sentiment = overall guest experience, not individual sub-scores
- A Positive review CAN have maintenance_flag or hskp_flag = Yes if it mentions a physical issue
- For ratings-only: if Room view, Comfort, or Facilities score < 6 → consider maintenance_flag or hskp_flag
- severity 5 = pest/mould/health risk, 4 = urgent (broken AC, no hot water), 3 = action within week, 2 = low, 1 = informational
- Ratings-only with no sub-score below 6: severity = 1, resolution_status = "Resolved"
- If severity >= 3, default resolution_status to "Open" unless clearly resolved
- If purely positive with no issues: severity = 1, resolution_status = "Resolved"
- Use "Location" as category when the main signal is about the hotel's location or nearby environment
- analyst_note: flag issues masked by service recovery, safety concerns, recurring patterns, or low sub-scores worth monitoring`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: 'Claude API error: ' + (err.error?.message || response.status) });
    }

    const data = await response.json();
    const text = data.content[0].text.trim().replace(/^```json?\n?/, '').replace(/\n?```$/, '');
    const result = JSON.parse(text);
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Classification failed' });
  }
}
