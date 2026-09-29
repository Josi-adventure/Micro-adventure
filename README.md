# JOSI Adventure

Marketing site for [JOSI Adventure](https://josi-adventure.nl) — small-group micro-adventures for women in the Netherlands and Belgium.

## Structure

```
Micro-adventure/
├── index.html                   ← homepage
├── adventures.html              ← "Find your adventure"
├── .nojekyll                    ← stops GitHub Pages running Jekyll (don't delete)
├── CNAME                        ← custom domain, managed by GitHub Pages
├── assets/
│   ├── styles.css               ← all styling, both pages
│   └── site.js                  ← all logic, translations, sheet URLs
└── images/
    ├── site/                    ← hero, portraits, page furniture
    ├── adventures/<slug>/       ← cover.jpg and reel.jpg per adventure
    └── gallery/                 ← 01.jpg, 02.jpg … for the Glimpses grid
```

Static HTML, CSS and vanilla JS. No build step, no dependencies.

## Where things live

**Copy and translations** → `assets/site.js`, in the `translations` object. Every string has an `en` and an `nl` version under the same key. Keep both in sync.

**Colours, fonts, layout** → `assets/styles.css`. Palette is at the top as CSS variables.

**Adventure dates and reviews** → a published Google Sheet, not the code. See `SETUP-adventures-sheet.md`.

**Gallery photos** → drop numbered files into `images/gallery/`. The page finds them automatically.

## Publishing

```bash
git add .
git commit -m "your change"
git push
```

GitHub Pages redeploys in ~30 seconds. Hard-refresh (Cmd/Ctrl+Shift+R) if you don't see the change — CSS, favicons and analytics cache aggressively.

## Local preview

Because the pages load `assets/` by relative path, opening the file directly works fine:

```bash
open index.html
```

Or run a server if you prefer:

```bash
python3 -m http.server
# then http://localhost:8000
```

## Working with AI

- **`CLAUDE.md`** — full project brief, read by Claude Code at the start of every session
- **`.github/copilot-instructions.md`** — repo-level instructions for GitHub Copilot

Keep both current as the project changes.

## Stack

- Vanilla HTML / CSS / JS, no framework or bundler
- Google Fonts: Poppins (headings), DM Sans (body)
- Google Sheets published as CSV for adventures and reviews
- Ticket Tailor for ticketing — linked per adventure from the sheet
- Cloudflare Web Analytics, no cookies, no consent banner needed

## Domain

`josi-adventure.nl`, four A records on `@` pointing at GitHub Pages (`185.199.108–111.153`). Registered at GoDaddy, planned move to TransIP.

If GitHub Pages ever reports "NotServedByPagesError", it's nearly always leftover parking A records at the DNS provider. See `CLAUDE.md` → Deployment.

## License

All rights reserved. Copy, imagery and brand belong to JOSI Adventure.
