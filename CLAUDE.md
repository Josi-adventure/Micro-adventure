# JOSI Adventure — Project brief for AI assistants

Read this file at the start of every session. It's the working memory for the JOSI Adventure landing page.

## What this is

Marketing landing page for **JOSI Adventure** — small-group wild-camping / hiking weekends for women in the Netherlands and Belgium. Founder and host: **Puck**. The brand mark used in copy is `JOSI Adventure` (was briefly "JOSI Outdoor"; do not use that anymore).

- **Live at**: https://josi-adventure.nl (also `www.` chains through the DNS)
- **Hosted on**: GitHub Pages, repo `Josi-adventure/Micro-adventure`
- **Purpose**: Explain what a weekend is, show upcoming dates, funnel visitors into the WhatsApp community. Booking happens via DM after joining the community — there is no form or checkout on the site.
- **Owner audience**: Puck (non-developer). Assume she's editing text and dates most of the time, not restructuring.

## File structure

```
Micro-adventure/                     — repo root, served by GitHub Pages
├── index.html                       — THE ENTIRE SITE (single file, no build step)
├── CNAME                            — added by GitHub Pages; contains josi-adventure.nl
├── CLAUDE.md                        — this file
├── README.md
├── .github/
│   └── copilot-instructions.md
└── images/
    ├── hero.jpg                     — wide 16:9 hero image
    ├── saturday-morning.jpg         — portrait 4:5 — trailhead
    ├── saturday-evening.jpg         — portrait 4:5 — camp dinner
    ├── sunday.jpg                   — portrait 4:5 — morning coffee
    ├── included.jpg                 — portrait 4:5 — shown in "What you get"
    └── puck.jpg                     — portrait 4:5 — About Me
```

Everything (HTML, CSS, JS, translations, design system) lives in `index.html`, which GitHub Pages serves directly as the site root. There is no separate `josi-outdoor.html` — the file has always been `index.html` in this repo's history.

## Tech stack

- **Single HTML file**, everything inline (CSS in `<style>`, JS in `<script>`)
- **No build tools**, no npm, no bundler
- **No frameworks** — vanilla HTML/CSS/JS
- Fonts loaded from Google Fonts CDN: **Fraunces** (serif display), **Inter** (body), **Caveat** (handwritten accents)
- Deployment = `git push` → GitHub Pages redeploys automatically (~30 seconds)

**Do not introduce a build system** unless there's a very strong reason. The single-file simplicity is deliberate.

## Design system

### Colors (CSS variables, defined at top of `<style>`)

| Variable | Hex | Where |
|---|---|---|
| `--green` | `#2F4A43` | primary brand green, matches logo |
| `--green-deep` | `#243832` | footer, hover states |
| `--green-soft` | `#E5DFC9` | soft cream-green section backgrounds |
| `--cream` | `#F5F1E4` | page background, matches logo bg |
| `--cream-warm` | `#EEE7D2` | alternate section background |
| `--burgundy` | `#6B1F1C` | accent for eyebrows, italic emphasis, some buttons |
| `--burgundy-soft` | `#B5615F` | rare, used on "not included" column border |
| `--orange` | `#F39A60` | small accents (hero sun, wavy underlines) |
| `--orange-soft` | `#F8C49B` | on dark-green sections for eyebrows/em text, washi-tape stickers |
| `--ink` | `#1B2823` | body text |
| `--muted` | `#5B6661` | secondary text |

**Never introduce a new color** without checking if one of these fits first.

### Fonts

- `Fraunces` — h1/h2/h3, dates, signature elements. Chunky serif, comes in italic. Emulates the brand's paid font "Margin".
- `Inter` — body copy, buttons, labels. Emulates the brand's paid font "TT Fors".
- `Caveat` — handwritten "eyebrows" (small tags above headings), day-of-week tags in the weekend section, "Puck" signature, price labels. Slightly rotated for a hand-drawn feel.

### Decorative motifs

- **Wavy `.divider` SVGs** between sections. Each is a `<div class="divider"><svg>...</svg></div>` with `fill=` matching the color of the section on the visually-filled side. Pattern alternates (up-fill / down-fill).
- **`.squiggle` underline** — orange wavy line under key words in headings. Applied by wrapping text in `<span class="squiggle">...</span>`.
- **Rotated cards** — Micro-adventure tiles and camp-photo cards have small alternating rotations (`nth-child` CSS) that straighten on hover.
- **Washi-tape stickers** — orange-soft rectangles pseudo-elements on the hero image and Puck's photo.
- **Paper-grain texture** — subtle SVG noise on `body::before`.

## Section anatomy (top to bottom)

Order at time of writing:

1. **Nav** — logo (`JOSI Adventure`), language toggle (EN/NL), primary CTA
2. **Hero** (`<header class="hero">`) — eyebrow, big h1, lead paragraph, two buttons, wide hero image
3. **What is a micro-adventure** (`#what`, `.what-is`) — 5 tiles with hand-drawn-style icons
4. **Weekend rows** (`.weekend`) — three editorial rows (Saturday morning / Saturday evening / Sunday), each with a Caveat day-tag, heading, prose, and a portrait image; middle row is `.row-reverse`
5. **Who it's for** (`.for-who`) — dark green section, narrative body + 6-item benefits list with star bullets
6. **About me** (`.about-me`) — Puck's photo (rotated with washi tape) + 3-paragraph bio + signature
7. **What you get** (`.included`) — 3 pillars (Before / During / The little things)
8. **Practical bits** (`#practical`, `.practical`) — 4 detail boxes (Location, Group, Duration, Price) + two-column Included / Not included lists
9. **Upcoming dates** (`#dates`, `.dates`) — 2 date cards side by side + how-it-works blurb + green primary CTA
10. **WhatsApp banner** (`#whatsapp`, `.whatsapp-banner`) — dark green, one heading, one paragraph, real WhatsApp-green button that opens the group chat
11. **FAQ** (`.faq`) — 6 `<details>` accordions on soft-green background
12. **Footer**

**Every section transition uses a `.divider` SVG**. When adding a new section, don't forget the divider before and after it.

## Language system (i18n) — READ THIS BEFORE EDITING COPY

The site is bilingual EN/NL with a runtime toggle in the top-right of the nav. The system works like this:

### How it works

1. Every translatable element in the HTML has a `data-i18n="some.key"` attribute.
2. A `translations` object at the bottom of the `<script>` block holds `en: {...}` and `nl: {...}` maps from key → HTML string.
3. `setLang(lang)` walks all `[data-i18n]` elements and sets their `innerHTML` from the map.
4. User's choice is persisted in `localStorage['josi-lang']`. First-time visitors get NL if `navigator.language` starts with "nl", otherwise EN.

### Rules when editing translated content

- **Both languages must be kept in sync.** If you add a new `data-i18n` key, add entries in both `en` and `nl`. If you delete one, delete from both. Missing keys silently fall back to whatever HTML default was there — which is confusing to debug.
- **The HTML default text should match the English translation.** Not required by the code but easier to reason about.
- **Escape double quotes inside strings.** JS strings are wrapped in double quotes. If a translation contains `"wild spot"` etc., escape with `\"`: `'A hiking route, a \"wild spot\" to camp...'`. **Do not use `replace_all` blindly** — it once corrupted the JS by leaving unescaped quotes and broke the whole page silently. Always run `node --check` mentally after editing translations.
- **HTML is allowed inside translation strings.** `<em>`, `<span class="squiggle">`, `<br/>` all work because we use `innerHTML`. If a heading needs an italic burgundy word, wrap it in `<em>`.
- **When adding a whole section**: add its keys under a namespace (`dates.*`, `whatsapp.*`, etc.), keep them clustered together in the translations object.

### Key namespaces currently in use

`nav`, `hero`, `whatIs`, `weekend.sat1/sat2/sun`, `forWho`, `about`, `included`, `practical.location/group/duration/price/in/out`, `dates`, `whatsapp`, `faq.q1..q6`, `cta`, `footer`.

## CTAs and anchors

| Location | Text | Anchor |
|---|---|---|
| Nav | "Find upcoming dates" / "Beschikbare weekenden" | `#dates` |
| Hero primary | same | `#dates` |
| Hero secondary | "See what we'll do" / "Wat gaan we doen?" | `#what` |
| After Weekend rows | "Claim your spot" / "Claim je plek" | `#whatsapp` |
| After For Who | same | `#whatsapp` |
| Inside What You Get | same | `#whatsapp` |
| Dates section | "Join the WhatsApp community" / "Word lid van de WhatsApp community" | `#whatsapp` |
| WhatsApp banner (external!) | same | `https://chat.whatsapp.com/IxuM4BLckEXEuDXC5jCITK` (opens in new tab) |
| Date-card price link | "→ see what's included" / "→ zie wat er inbegrepen is" | `#practical` |

All in-page anchors currently resolve to real IDs. If you add a new CTA, make sure the anchor exists.

## Content style guide

### Tone (both languages)

- First-person from Puck's voice ("I'll be there", "I've got you covered", "*Ik* ben er natuurlijk bij").
- Warm, direct, non-corporate. Talks to a friend, not a customer.
- Inclusive — for both beginners and experienced women. Do NOT frame anything as "first-timers only".
- **No em-dashes in visible copy.** Use comma, colon, hyphen, or split into two sentences instead. This is a Puck preference. Em-dashes inside JS/HTML *comments* are fine. Signature line uses hyphen: `- Puck`.
- Contractions are fine ("I'll", "you'll", "je bent").

### Copy quirks

- "Micro-adventure" / "micro-adventures" — **stays in English** even in the Dutch version. Puck explicitly chose this over "micro-avontuur".
- The brand name is **JOSI Adventure** (was Outdoor). Do not backslide.
- Puck's real name is spelled **Puck**. Not Puk, not Pucky.
- **Price**: currently €120. Was €70 → €90 → €95 → €115 → €120 over the project. When updating, use a single `Edit(replace_all: true)` on the exact string `€120` — check if that catches the small print in date cards too.

## Deployment

### GitHub Pages

- Custom domain: `josi-adventure.nl` (set in Settings → Pages → Custom domain).
- HTTPS is enforced (green padlock).
- Every push to `main` triggers a rebuild in ~30 seconds.
- If DNS ever breaks, GitHub shows "NotServedByPagesError". Most common cause: leftover parking A records at the registrar. Solution: at DNS provider, delete any A records on `@` that aren't GitHub's four IPs.

### DNS (currently GoDaddy, moving to TransIP)

Four A records on `@` point to GitHub Pages:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

The default `www` CNAME on GoDaddy is locked and cannot be edited or deleted. It points `www` back to the apex, which then resolves via the A records — so www still works via a DNS chain. Nothing in the DNS references `josi-adventure.github.io` directly.

**Planned migration**: transfer domain to TransIP after the 60-day ICANN lock lifts. Re-enter the same A records at TransIP. Nothing on GitHub needs to change.

## Third-party integrations

### Cloudflare Web Analytics

- Beacon script in `<head>` (search `cloudflareinsights`).
- Privacy-friendly, no cookies, no consent banner needed.
- Token: `e699db5ba7a04d6f966d9309abe2cbd4`.
- Dashboard: [dash.cloudflare.com](https://dash.cloudflare.com) → Web Analytics.
- Some visitors (Brave, uBlock, strict Firefox) block the beacon. That's expected and unfixable — data still lands for ~75-90% of visitors.

### WhatsApp community

- Group invite link: `https://chat.whatsapp.com/IxuM4BLckEXEuDXC5jCITK`.
- Referenced only in the WhatsApp banner button. All other CTAs use the in-page `#whatsapp` anchor.
- If the invite link ever rotates, only one place to update.

### Google Form

- **Removed.** There was an embedded interest form; it's gone. Do not reintroduce unless Puck explicitly asks. The path forward is "WhatsApp community → DM Puck → payment details".

### Favicon

- Inline SVG data URI in `<head>` — a small green tent on a dark green rounded square. No `favicon.ico` file. Browsers cache favicons aggressively — hard refresh (Cmd/Ctrl+Shift+R) after changing it.

## Common gotchas (from real bugs during this project)

1. **`opacity: 0.7` creates a stacking context** in CSS. If you have an image with `position: absolute` covering a sibling with opacity, the sibling paints on top even though it comes first in the source. Fix: replace `opacity: 0.7` with `color: rgba(..., 0.7)` on text elements, or give the image a positive `z-index`. This bit us with the `<small>` placeholder labels showing through the images.

2. **`replace_all` in JS translation strings.** If the string contains characters that break JS syntax (double quotes, especially), a blind replace will corrupt the script silently. Always inspect the JS afterwards or run `node --check`. When adding literal quotes inside a translated string, escape with `\"`.

3. **Google Form iframe negative margin.** There was CSS pulling the form iframe up 180px to hide Google's header. That's gone now (form removed). If a future integration needs cropping, dial the value with the actual header height, not a guess.

4. **Divider color parity.** When inserting a new section, remember to update both the divider *before* and *after* the section — their `fill=` must match the color of the section they visually blend into. Getting this wrong makes a jarring color band.

5. **Language toggle button visual state.** `.lang-btn.active` is styled via a class the JS sets. If you add a new lang, make sure the JS knows about it.

6. **DNS caching**: after any DNS change, expect a 15-60 minute propagation window. `dnschecker.org` is the fastest way to see if it's landed.

7. **Favicon caching**: browsers hold onto old favicons for days. Hard refresh + close/reopen tab. If really stuck, try a private window.

## How to do common things

### Add a new date to Upcoming dates

Duplicate one of the two `<div class="date-card">` blocks inside `<section class="dates">` and rename data-i18n keys to `dates.w3.*`. Then add the matching keys under `dates.w3.*` in both `en` and `nl` translations.

### Change the price everywhere

Find-and-replace `€120` (be careful with `€1200` or similar collisions — unlikely here). Then confirm both language translations and both date cards updated. Also check the Practical box (`practical.price.v`).

### Add a new FAQ item

Add a `<details>` block inside `.faq-list` with new `data-i18n` keys `faq.q7.s` (summary) and `faq.q7.a` (answer). Add both to `en` and `nl`.

### Add a new section

1. Insert `<div class="divider">...</div>` before and after the new `<section>`, using the correct fill colors.
2. Give the section an `id="..."` if any CTA will anchor to it.
3. Add CSS if needed — but check if existing patterns (`.included`, `.what-is`, etc.) can be reused first.
4. Add all its translatable strings under a new key namespace, in both languages.

### Update Puck's bio

Search for `about.p1`, `about.p2`, `about.p3` in the translations object. Update in both languages, or come tell Puck if there's ambiguity — her tone is specific.

### Change the WhatsApp link

Only appears once, in the anchor tag inside `<section class="whatsapp-banner">`. Search for `chat.whatsapp.com`.

### Add a new language (e.g. German)

Add a new key set `de: { ... }` in the translations object matching all existing keys. Add a new `<button class="lang-btn" data-lang="de">DE</button>` to the nav. That's it — the setLang function handles the rest.

## When Puck asks for things

- **She rarely wants a build step, a framework, or new dependencies.** Push back gently if a change would introduce one.
- **She prefers concise responses and direct edits.** Don't over-explain in chat when a small diff will do.
- **She likes design details** — playful wavy underlines, handwritten fonts, rotated cards. If she asks for "more" of something visual, that's the vocabulary.
- **She will iterate on copy heavily.** Assume every heading and paragraph is a draft, not a final. Do not push back on rewrite requests.
- **Watch for scope creep in bilingual edits.** If she says "change X" without specifying language, ask or assume both.

## Suggested next improvements (if asked)

- Move the `images/` files through an image optimizer (tinypng, squoosh). Some are probably larger than needed for a 4:5 crop.
- Consider a real `favicon.ico` file (multi-size) once Puck has a proper brand mark exported.
- Add Open Graph meta tags (`og:image`, `og:title`, `og:description`) so link previews on Instagram / iMessage / WhatsApp look on-brand.
- Consider a small "past weekends" gallery once trips have happened — social proof beats copy.

## Maintaining this file

Keep it updated as things change. If you add a new integration, note it under "Third-party integrations." If you hit a new gotcha, add it. This file is worth more than the code — it's the memory.
