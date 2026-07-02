# GitHub Copilot instructions — JOSI Adventure

These instructions apply to all files in this repository. See `CLAUDE.md` at the repo root for the full context — this file is a condensed version optimised for inline code suggestions.

## Project

Single-file static marketing landing page for JOSI Adventure — women-only wild-camping weekends in the Netherlands and Belgium. Hosted on GitHub Pages at `josi-adventure.nl`. Founder: Puck.

**Everything is in `index.html`.** HTML, CSS, JS, translations, and design system live in that one file. No build step. No dependencies to install.

## Code style

- **Two-space indentation** for HTML, CSS, JS.
- **CSS variables at the top of `<style>`** — never hard-code colors. If you need a color, check the palette first (`--green`, `--cream`, `--burgundy`, etc.).
- **Vanilla JS only.** No React, no frameworks, no build step. `document.querySelectorAll` + `addEventListener` is the pattern.
- **Inline SVGs preferred over icon fonts / images** for small decorations.
- **HTML entities**: `&amp;`, `&nbsp;`, `&mdash;` are fine in HTML but be careful inside JS strings — use the literal character or escape properly.

## Design system

Colors (already defined as CSS variables — use these, don't add new ones lightly):

```
--green:        #2F4A43   brand primary
--green-deep:   #243832   footer, hover
--green-soft:   #E5DFC9   soft green section bg
--cream:        #F5F1E4   page background
--cream-warm:   #EEE7D2   alternate section bg
--burgundy:     #6B1F1C   accent, eyebrows, italic emphasis
--orange:       #F39A60   small accents, wavy underlines
--orange-soft:  #F8C49B   for dark-section eyebrows / washi tape
--ink:          #1B2823   body text
--muted:        #5B6661   secondary text
```

Fonts (loaded from Google Fonts):
- `Fraunces` — headings, dates
- `Inter` — body copy, buttons
- `Caveat` — handwritten eyebrows, day tags, signatures

## Bilingual content (i18n)

Every translatable element uses `data-i18n="namespace.key"`. Translations live in the `translations` object near the bottom of the `<script>` block, under `en: {}` and `nl: {}`.

**Rules:**

1. When adding a new `data-i18n` key, add matching entries to **both** `en` and `nl`. Never leave one language behind.
2. When editing a copy string, edit **both** language entries plus the HTML default text.
3. Translation strings support inline HTML (`<em>`, `<span class="squiggle">`, `<br/>`). Because rendering uses `innerHTML`.
4. Escape literal double quotes inside translation strings with `\"`. Blind find-and-replace has broken JS syntax before — always verify.
5. "Micro-adventure" stays in English even inside Dutch translations — this is a Puck preference.

## Anchors and CTAs

Do not create CTAs that point to non-existent anchors. Current anchors: `#what`, `#practical`, `#dates`, `#whatsapp`. The WhatsApp button in the banner is the only CTA that links to an external URL (`https://chat.whatsapp.com/...`).

## Copy conventions

- **No em-dashes (—) in visible copy.** Use commas, colons, hyphens, or split sentences. Em-dashes in HTML/JS comments are fine.
- **First person from Puck's voice** ("I'll be there", "I've got you covered").
- **Inclusive tone** — the weekends are for beginners AND experienced women. Don't frame anything as first-timers-only.
- Brand name: **JOSI Adventure**. Never "JOSI Outdoor" (legacy) or "Josi Adventures" (typo).
- Signature line: `- Puck` (hyphen, not em-dash).

## Deployment

- Push to `main` → GitHub Pages redeploys in ~30 seconds.
- Custom domain `josi-adventure.nl` is set in `Settings → Pages`. Do not remove the `CNAME` file — GitHub Pages manages it.
- Cloudflare Web Analytics beacon is in `<head>`. Don't remove.

## Common gotchas

1. **Stacking contexts**: `opacity < 1` creates a new stacking context in CSS. If a positioned image should cover a sibling but doesn't, check for `opacity` on the sibling. Use `color: rgba(...)` for text transparency instead of `opacity`.
2. **JS string escaping**: literal double quotes inside `translations` values must be `\"` — blind `replace_all` operations have silently broken this in the past.
3. **Divider colors**: each `.divider` SVG has a `fill=` that must match the color of the section it visually connects to. Mismatches produce a jarring color band between sections.
4. **Favicon and analytics cache** aggressively — hard refresh (Cmd/Ctrl+Shift+R) after changes.

## What to avoid

- Introducing a build tool, bundler, or npm dependency.
- Adding a JS framework (React, Vue, Svelte). This is deliberately vanilla.
- Adding tracking beyond Cloudflare Web Analytics (Puck values privacy and the no-cookie-banner setup).
- Re-embedding a Google Form. It was removed intentionally in favor of the WhatsApp funnel.
- Adding new colors outside the defined palette.
- Introducing complexity that a non-developer editor (Puck) can't easily navigate.
