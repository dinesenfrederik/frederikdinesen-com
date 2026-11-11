# FD Sound Labs content engine

Automated SEO + GEO blog drafting for frederikdinesen.com. You review every article before it goes live.

```
 Twice a week (GitHub Actions)
 ┌────────────────────────────────────────────────────────────────────────────┐
 │ 1. SCAN      Google autocomplete · Reddit · Google News/RSS · YouTube ·    │
 │              your own Google Search Console queries                        │
 │ 2. PICK      Gemini + Google Search proposes 10 topics and scores them on  │
 │              demand, trend, business fit and competition gap. Duplicates   │
 │              of existing or rejected topics are skipped.                   │
 │ 3. RESEARCH  Gemini watches the top YouTube tutorials and researches the   │
 │              web, then writes a fact brief with sources                    │
 │ 4. WRITE     Claude writes the Danish article in your tone of voice, then  │
 │              the English adaptation. Automatic checks fix format problems. │
 │ 5. PR        Opens a pull request with both .md files plus sitemap entries │
 └────────────────────────────────────────────────────────────────────────────┘
        │
        ▼  Vercel builds a preview of the PR automatically
 YOU: read the preview → edit if needed → Merge = published  (Close = rejected)
```

## One-time setup

### 1. API keys: repo → Settings → Secrets and variables → Actions → *New repository secret*

| Secret | Required | Where to get it |
|---|---|---|
| `GEMINI_API_KEY` | yes | [Google AI Studio](https://aistudio.google.com/apikey). This is separate from your Google AI Pro subscription, which doesn't include API access. |
| `ANTHROPIC_API_KEY` | yes | [Claude Console](https://console.anthropic.com/settings/keys). Add a few dollars of credit. |
| `YOUTUBE_API_KEY` | recommended | Google Cloud Console → enable **YouTube Data API v3** → Credentials → API key (free quota). Without it, Gemini finds videos through Google Search instead. |
| `GSC_SERVICE_ACCOUNT_JSON` | recommended once you have traffic | See step 3. |

### 2. Let the workflow open PRs
Repo → Settings → Actions → General → *Workflow permissions* → tick **"Allow GitHub Actions to create and approve pull requests"**.

### 3. Google Search Console (optional, the best data source over time)
1. In Google Cloud Console, create a service account (no roles needed), then create a JSON key for it.
2. In Search Console → Settings → Users and permissions, add the service account's e-mail as a **Restricted** user.
3. Paste the whole JSON file into the `GSC_SERVICE_ACCOUNT_JSON` secret.
4. If your property is a URL-prefix property rather than a domain property, change `sources.searchConsole.siteUrl` in `config.json` to `https://frederikdinesen.com/`.

## Running it

- **Automatically:** Mondays and Thursdays at 06:17 Danish time (`.github/workflows/content-engine.yml`).
- **Manually:** GitHub → Actions → *Content engine* → *Run workflow*. Optional inputs:
  - **topic:** write about exactly this topic, e.g. "Kompression og EQ til moderne rock-trommer".
  - **count:** how many articles to draft in this run.
  - **scan_only:** only list scored topic ideas in the run summary. No article is written.

Locally (needs Node 22+):

```bash
cd content-engine && npm install
npm run mock                       # offline dry run, no keys needed (delete the generated files afterwards)
GEMINI_API_KEY=… npm run scan      # only scan + score topics
GEMINI_API_KEY=… ANTHROPIC_API_KEY=… node src/run.mjs --topic "mudret low-end i metal"
npm test
```

## Reviewing a draft (target: under 15 minutes)
1. You get a GitHub notification for a new PR named **"Blog draft: …"**.
2. Click the **Vercel preview** link in the PR and add `/blog/<slug>` to it (both paths are listed in the PR description).
3. To fix wording, go to **Files changed → ⋯ → Edit file** on the `.md` file and commit. Vercel rebuilds the preview.
4. **Merge** to publish. **Close** the PR to reject: that topic won't be proposed again.

The PR description shows why the topic was picked, the keywords, the research sources, any warnings from the automatic checks, and the other topic ideas from the scan.

## Tuning

| Want to change… | Edit |
|---|---|
| Voice, phrases, do's and don'ts | `prompts/tone-of-voice.md` |
| SEO/GEO and format rules for the writer | `prompts/writer.md` |
| What counts as a good topic | `prompts/scout.md` |
| Pillars, seed keywords, subreddits, YouTube queries, RSS feeds | `config.json` |
| Models, effort, articles per run, minimum length | `config.json` → `models` / `run` |
| Schedule | `cron` line in `.github/workflows/content-engine.yml` |

Your best published articles are the strongest style signal. The writer currently imitates `vokalindspilning-hjemmestudie.md`. Change the file names in `src/claude.mjs` to point at a newer favourite.

## Files
- `src/run.mjs`: the orchestrator. `src/sources/*`: trend collectors. `src/gemini.mjs`: scouting, video analysis and research. `src/claude.mjs`: writing. `src/validate.mjs`: checks against the site's renderer rules. `src/publish.mjs`: writes the files and updates the sitemap.
- `data/history.json`: topics drafted so far. `data/topic-candidates.json`: the latest scored scan. `data/briefs/`: the research brief behind each article, for fact-checking.

## Known limits
- Free SEMrush and Ahrefs plans have no API, so they aren't used. Search Console plus autocomplete covers most of that data for free.
- Reddit sometimes blocks anonymous requests from cloud servers. When that happens the run logs a warning and continues.
- The article's `date` is the day the draft was generated. Edit it in the PR if you merge much later.
- Articles use the site's default OG image. Per-article cover images aren't generated.
