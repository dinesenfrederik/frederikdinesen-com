---
name: publishing-websites
description: End-to-end workflow for pushing web projects to GitHub and deploying them live on Vercel with zero hiccups. Use when the user asks to publish, deploy, host, make live, push to GitHub, or update an already-deployed website.
---

# Publishing Websites (GitHub + Vercel)

## When to use this skill
- Brugeren beder om at udgive eller hoste sit website (fx "deploy", "gør siden live", "læg den online", "push til github").
- Brugeren vil oprette et GitHub-repository for projektet eller konfigurere Vercel hosting.
- Brugeren vil udrulle opdateringer til et allerede udgivet site.

## Workflow Checklist
- [ ] Trin 1: Værktøjs- & login-kontrol (GitHub CLI & Vercel CLI)
- [ ] Trin 2: Klargøring af projektfiler (statisk struktur, .gitignore)
- [ ] Trin 3: Oprettelse/tilknytning af GitHub repository
- [ ] Trin 4: Git commit og push
- [ ] Trin 5: Udrulning til Vercel (med automatisk framework-genkendelse)
- [ ] Trin 6: Verifikation af live URL
- [ ] Trin 7: Afrapportering til brugeren

## Instructions

### Trin 1: Præ-tjek af værktøjer og login
Kør følgende kontroller før udførelse:
```bash
which gh && gh auth status 2>&1
which vercel && vercel whoami 2>&1
```

**Håndtering af manglende værktøjer eller login:**
- **GitHub CLI (`gh`):**
  - Hvis mangler: Installer via `brew install gh` eller instruer brugeren.
  - Hvis ikke logget ind: Kør `gh auth login` og vejled brugeren i browser-/engangskode godkendelse.
- **Vercel CLI (`vercel`):**
  - Hvis mangler: Installer via `npm i -g vercel` eller `brew install vercel`.
  - Hvis ikke logget ind: Kør `vercel login` og vejled brugeren interaktivt.

---

### Trin 2: Klargøring af projektfiler
1. Sikr at `.gitignore` eksisterer i rodmappen og indeholder følsomme og midlertidige filer:
```text
.DS_Store
.tmp/
node_modules/
.env*
.vercel/
```
2. Bekræft at `index.html` ligger i projektets rodmappe for statiske websites.

---

### Trin 3: Oprettelse eller tilknytning af GitHub Repository
Hvis projektet ikke allerede er et Git-repo:
```bash
git init
```
Tjek om remote er sat:
```bash
git remote -v
```
Hvis der ikke findes et remote repo på GitHub, opret det via GitHub CLI:
```bash
gh repo create [repo-navn] --public --source=. --remote=origin
```

---

### Trin 4: Git Commit og Push
Staging, commit og push til standard-grenen (`main`):
```bash
git add .
git commit -m "feat: deploy ready production build"
git branch -M main
git push -u origin main
```

---

### Trin 5: Udrulning til Vercel
Kør Vercel udrulning til produktion:
```bash
vercel --prod --yes
```
Vercel analyserer projektet automatisk og tildeler et produktionsdomæne (`*.vercel.app`).

---

### Trin 6: Verifikation af Live URL
Efter udrulningen verificeres URL'en via HTTP status-forespørgsel:
```bash
curl -I [LIVE_URL]
```
Bekræft HTTP 200 OK samt korrekt routing.

---

### Trin 7: Afrapportering til brugeren
Lever en overskuelig oversigt til brugeren med:
1. 🌐 **Live Website URL:** Link til det offentlige Vercel-domæne.
2. 🐙 **GitHub Repository:** Link til kildekoden.
3. 🚀 **Deployment Status:** Produktionsudrulning bekræftet.
