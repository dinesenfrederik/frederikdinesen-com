import crypto from 'node:crypto';
import { fetchJson, warn } from '../util.mjs';

const b64url = (buf) => Buffer.from(buf).toString('base64url');

/** Exchange a service-account key for an OAuth access token (no extra dependencies). */
async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const signature = crypto.createSign('RSA-SHA256').update(`${header}.${claims}`).sign(sa.private_key);
  const jwt = `${header}.${claims}.${b64url(signature)}`;
  const res = await fetchJson('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  return res.access_token;
}

/**
 * Real search queries frederikdinesen.com already shows up for (Google Search Console).
 * Needs GSC_SERVICE_ACCOUNT_JSON (service account added as a user on the property).
 * The most valuable rows are "striking distance" queries: many impressions, position 8-30.
 */
export async function collectSearchConsole(cfg) {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    warn('search console: GSC_SERVICE_ACCOUNT_JSON not set, skipping.');
    return [];
  }
  try {
    const token = await getAccessToken(JSON.parse(raw));
    const end = new Date(Date.now() - 2 * 864e5); // GSC data lags ~2 days
    const start = new Date(end.getTime() - (cfg.days ?? 28) * 864e5);
    const res = await fetchJson(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(cfg.siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: start.toISOString().slice(0, 10),
          endDate: end.toISOString().slice(0, 10),
          dimensions: ['query', 'page'],
          rowLimit: cfg.rowLimit ?? 200,
        }),
      },
    );
    return (res.rows ?? []).map((r) => ({
      query: r.keys[0],
      page: r.keys[1],
      clicks: r.clicks,
      impressions: r.impressions,
      position: Math.round(r.position * 10) / 10,
    }));
  } catch (e) {
    warn(`search console: ${e.message}`);
    return [];
  }
}
