#!/usr/bin/env node
/**
 * E-mail Frederik when a draft is ready in the review dashboard, or when a run failed.
 *
 *   node src/notify.mjs ready  --pr 12           (reads .out/notify.json written by run.mjs)
 *   node src/notify.mjs failed --run-url <url>
 *   add --dry-run to render the mail to .out/email-preview.html instead of sending
 *
 * Sends through Gmail SMTP with an app password:
 *   SMTP_USER          the Gmail address that sends (and, by default, receives)
 *   SMTP_APP_PASSWORD  a Google "app password" for that account
 *   NOTIFY_EMAIL       optional: a different recipient
 * Without credentials it logs and exits 0, so a missing mail setup never fails the workflow.
 */
import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { pathToFileURL } from 'node:url';
import nodemailer from 'nodemailer';
import { loadConfig, readJson, resolveFromEngine } from './util.mjs';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function layout(heading, inner, button) {
  return `<!doctype html><html lang="da"><body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#18181b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden">
<tr><td style="background:#0d0d11;padding:18px 24px;font-family:Menlo,Consolas,monospace;font-size:12px;letter-spacing:2px;color:#FF9F0A">FD SOUND LABS · BLOG</td></tr>
<tr><td style="padding:28px 24px 8px"><h1 style="margin:0 0 12px;font-size:22px;line-height:1.3">${heading}</h1>${inner}</td></tr>
${button ? `<tr><td style="padding:12px 24px 28px"><a href="${esc(button.href)}" style="display:inline-block;background:#FF9F0A;color:#000;text-decoration:none;font-weight:700;padding:14px 22px;border-radius:10px">${esc(button.label)}</a></td></tr>` : ''}
</table>
<p style="font-size:12px;color:#a1a1aa;margin:16px 0 0">Sendt automatisk af content-motoren.</p>
</td></tr></table></body></html>`;
}

export function readyMail({ drafts, prNumber, baseUrl }) {
  const url = `${baseUrl}/review/${prNumber}`;
  const d = drafts[0];
  const checkLine = (x) =>
    x.factCheckFailed
      ? 'Faktatjekket kunne ikke køre. Tjek tallene ekstra grundigt.'
      : x.toReview
        ? `${x.toReview} ting at tjekke (markeret med gult i teksten)`
        : 'Faktatjekket fandt intet, du skal tage stilling til ✓';
  const blocks = drafts
    .map(
      (x) => `<p style="margin:0 0 4px;font-size:18px;font-weight:700">${esc(x.titleDa)}</p>
<p style="margin:0 0 14px;color:#71717a;font-size:14px">${esc(x.titleEn)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;margin-bottom:12px">
<tr><td style="color:#71717a;padding-right:12px">Emne</td><td>${esc(x.pillar)}</td></tr>
<tr><td style="color:#71717a;padding-right:12px">Søgeord</td><td>${esc(x.keywordDa)}</td></tr>
<tr><td style="color:#71717a;padding-right:12px">Længde</td><td>${esc(x.words)} ord</td></tr>
<tr><td style="color:#71717a;padding-right:12px;vertical-align:top">Faktatjek</td><td>${esc(checkLine(x))}${x.fixed ? `<br><span style="color:#71717a">${esc(x.fixed)} rettet automatisk</span>` : ''}</td></tr>
${x.backlinks ? `<tr><td style="color:#71717a;padding-right:12px">Nye links</td><td>${esc(x.backlinks)} i ældre artikler</td></tr>` : ''}
</table>
${x.whyNow ? `<p style="margin:0 0 8px;font-size:14px;color:#3f3f46"><b>Hvorfor nu:</b> ${esc(x.whyNow)}</p>` : ''}`,
    )
    .join('<hr style="border:none;border-top:1px solid #e4e4e7;margin:18px 0">');
  const toReview = drafts.reduce((n, x) => n + x.toReview, 0);
  return {
    subject: `Klar til gennemgang: ${d.titleDa}${drafts.length > 1 ? ` (+${drafts.length - 1})` : ''}`,
    html: layout(
      'Din nye artikel er klar 🎸',
      `${blocks}<p style="margin:16px 0 0;font-size:14px;color:#3f3f46">Læs den, ret hvis nødvendigt, og tryk <b>Udgiv på siden</b>. Det tager typisk under 15 minutter${toReview ? ', inklusive de markerede punkter' : ''}.</p>`,
      { href: url, label: 'Gennemgå artiklen →' },
    ),
    text: [
      'Din nye artikel er klar til gennemgang.',
      '',
      ...drafts.flatMap((x) => [x.titleDa, x.titleEn, `Søgeord: ${x.keywordDa}`, `Faktatjek: ${checkLine(x)}`, '']),
      `Gennemgå og udgiv: ${url}`,
    ].join('\n'),
  };
}

export function failedMail({ runUrl, baseUrl }) {
  return {
    subject: 'Artikel-motoren fejlede i denne uge',
    html: layout(
      'Ugens artikel blev ikke skrevet',
      `<p style="font-size:15px;line-height:1.6;margin:0 0 8px">Den automatiske kørsel stoppede med en fejl, så der er ingen ny kladde i dashboardet.</p>
<p style="font-size:15px;line-height:1.6;margin:0">Send linket herunder til Claude, så bliver det rettet. Du kan også bestille en artikel manuelt i <a href="${esc(baseUrl)}/review" style="color:#b45309">dashboardet</a>.</p>`,
      runUrl ? { href: runUrl, label: 'Se fejlen' } : null,
    ),
    text: `Ugens artikel blev ikke skrevet, fordi kørslen fejlede.\n\nSe fejlen: ${runUrl ?? '(intet link)'}\nDashboard: ${baseUrl}/review`,
  };
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { pr: { type: 'string' }, 'run-url': { type: 'string' }, 'dry-run': { type: 'boolean', default: false } },
  });
  const kind = positionals[0];
  const config = loadConfig();
  const baseUrl = config.site.baseUrl;

  let mail;
  if (kind === 'ready') {
    const prNumber = Number(values.pr);
    const { drafts = [] } = readJson('.out/notify.json', {});
    if (!Number.isInteger(prNumber) || prNumber <= 0 || !drafts.length) {
      console.log('notify: no PR number or draft facts, nothing to send.');
      return;
    }
    mail = readyMail({ drafts, prNumber, baseUrl });
  } else if (kind === 'failed') {
    mail = failedMail({ runUrl: values['run-url'], baseUrl });
  } else {
    throw new Error('usage: notify.mjs ready --pr <n> | failed --run-url <url> [--dry-run]');
  }

  if (values['dry-run']) {
    fs.mkdirSync(resolveFromEngine('.out'), { recursive: true });
    fs.writeFileSync(resolveFromEngine('.out/email-preview.html'), mail.html);
    console.log(`notify (dry run): "${mail.subject}" → .out/email-preview.html`);
    return;
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) {
    console.log('notify: SMTP_USER / SMTP_APP_PASSWORD not set, skipping e-mail.');
    return;
  }
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465, // Gmail: implicit TLS on 465 (other ports only for local testing)
    auth: { user, pass },
  });
  const info = await transport.sendMail({
    from: `"FD Sound Labs content engine" <${user}>`,
    to: process.env.NOTIFY_EMAIL || user,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  });
  console.log(`notify: sent "${mail.subject}" (${info.messageId})`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    // Never fail the workflow because of e-mail; the draft PR is what matters.
    console.error(`notify: could not send e-mail: ${e.message}`);
  });
}
