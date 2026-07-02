# JOSI Adventure

Marketing landing page for [JOSI Adventure](https://josi-adventure.nl) — small-group wild-camping / hiking weekends for women in the Netherlands and Belgium.

## What's here

A single-file static website. Everything is in `index.html` — HTML, CSS, JS, translations, all inline. No build step, no dependencies to install.

- **Live at**: https://josi-adventure.nl
- **Hosted on**: GitHub Pages (auto-deploys on push to `main`)
- **Bilingual**: English + Dutch, runtime toggle in the top-right of the page

## Working on it

### Edit content

Open `index.html` in any editor. Most text lives inside a `translations` object near the bottom of the `<script>` tag — search for `translations = {` to find it. Every visible piece of copy has both an `en` and a `nl` version keyed under the same string.

**Keep both languages in sync.** If you add a new translatable string, add both `en` and `nl` entries.

### Publish

```bash
git add index.html
git commit -m "your change"
git push
```

GitHub Pages redeploys in ~30 seconds. Hard-refresh the browser (Cmd/Ctrl+Shift+R) if you don't see changes immediately — favicons and analytics beacons cache aggressively.

### Preview locally

Open `index.html` in a browser directly — no server needed. Or run any static server if you prefer, e.g.:

```bash
python3 -m http.server
```

Then open http://localhost:8000/index.html.

## Working with AI

This repo is set up for AI-assisted development:

- **`CLAUDE.md`** — full project brief for Claude Code. Read at every session.
- **`.github/copilot-instructions.md`** — repo-level instructions for GitHub Copilot.

Both files explain the design system, i18n architecture, deployment quirks, and common gotchas. Keep them updated as the project evolves.

## File overview

```
Micro-adventure/
├── index.html                      — the entire site
├── CNAME                           — custom domain (managed by GitHub Pages)
├── CLAUDE.md                       — AI briefing
├── README.md                       — this file
├── .github/
│   └── copilot-instructions.md
└── images/
    ├── hero.jpg
    ├── saturday-morning.jpg
    ├── saturday-evening.jpg
    ├── sunday.jpg
    ├── included.jpg
    └── puck.jpg
```

## Stack

- Vanilla HTML / CSS / JS — no framework, no bundler.
- Google Fonts CDN — Fraunces (serif), Inter (sans), Caveat (handwritten).
- [Cloudflare Web Analytics](https://dash.cloudflare.com) — privacy-friendly analytics, no cookie banner needed.
- Google Forms — currently not used (removed in favor of a WhatsApp funnel).

## Domain & DNS

- Domain registered at GoDaddy (planned move to TransIP after the 60-day ICANN lock).
- DNS points four A records on `@` to GitHub Pages' IPs (`185.199.108-111.153`).
- No CNAME to `josi-adventure.github.io` is required — the default www CNAME points back to the apex which resolves to GitHub via those A records.

If you ever see "NotServedByPagesError" on the Custom Domain settings, it's almost always leftover parking A records at the DNS provider. See `CLAUDE.md` → *Deployment* for the fix.

## License

All rights reserved. Copy, imagery, and brand are property of JOSI Adventure.
