/* ==========================================================================
   JOSI Adventure — shared site script
   Loaded by both index.html (homepage) and adventures.html
   Each page only renders the bits it actually contains.
   ========================================================================== */

/* ============================================================
   1. CONFIG
   ============================================================ */

/* Published Google Sheet tabs (File → Share → Publish to web → CSV) */
const ADVENTURES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTOB3ULSOvcX71ZDG09c3p_ulePq0_JzQjEmMlNxw3YqSAl6x1eN7qTniL2gmxwBza9vGtg2YZP9Njd/pub?gid=0&single=true&output=csv';
const REVIEWS_CSV_URL    = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTOB3ULSOvcX71ZDG09c3p_ulePq0_JzQjEmMlNxw3YqSAl6x1eN7qTniL2gmxwBza9vGtg2YZP9Njd/pub?gid=2005033756&single=true&output=csv';

/* Social */
const INSTAGRAM_URL = 'https://www.instagram.com/puckjb/';
const LINKEDIN_URL  = 'https://www.linkedin.com/in/puck-josefien-blokland-015/';
const WHATSAPP_URL  = 'https://chat.whatsapp.com/IxuM4BLckEXEuDXC5jCITK';

/* Gallery auto-discovery: drop numbered photos into images/gallery/
   as 01.jpg, 02.jpg, 03.jpg … and they appear by themselves. */
const GALLERY_PATH  = 'images/gallery/';
const GALLERY_EXT   = '.jpg';
const GALLERY_MAX   = 60;   // highest number we'll ever look for
const GALLERY_BATCH = 6;    // stop once a whole batch of 6 is missing

/* Used when the sheet is unreachable, so the page never renders empty */
const FALLBACK_ADVENTURES = [
  {
    id: '2026-11-autumn-hike-hut',
    start_date: '2026-11-07',
    end_date: '2026-11-08',
    status: 'open',
    meta_en: '1 night | 7-8 November',
    meta_nl: '1 nacht | 7-8 november',
    title_en: 'Autumn Hike & Hut',
    title_nl: 'Herfstwandeling & Hut',
    desc_en: '35km of walking, a cozy hut & offline time',
    desc_nl: '35 km wandelen, een gezellige hut & offline tijd',
    cover_image: 'images/adventures/2026-11-autumn-hike-hut/cover.jpg',
    link_url: ''
  }
];

/* ============================================================
   2. TRANSLATIONS
   ============================================================ */
const translations = {
  en: {
    'nav.all': "All adventures",

    'hero.h1': "Micro adventures<br/>for women",
    'hero.sub': "Small enough to fit in a weekend, big enough to feel like a real adventure",
    'hero.cta': "Upcoming adventures",

    'whatIs.h2': "What is a micro-adventure?",
    'whatIs.p1': "A micro-adventure is a small, short adventure into nature, close to home, that still feels like the real thing. The term comes from adventurer Alastair Humphreys, who wanted to prove you don't need a plane ticket or a big budget to feel that same spark.",
    'whatIs.p2': "It can be hiking with a tent on your back, a night under the stars, a day out mountainbiking, getting up early for sunrise, or hopping from hut to hut. What it looks like matters less than what it feels like: being offline for a bit, outside, and surrounded by women who get why you would want that.",
    'whatIs.tag1': "Adventurous",
    'whatIs.tag2': "Nature",
    'whatIs.tag3': "Close to home",
    'whatIs.tag4': "Offline",

    'adv.h2': "Upcoming adventures",
    'adv.loading': "Loading dates…",
    'adv.emptyTitle': "No dates on the calendar right now",
    'adv.emptyBody': "New adventures are being planned. Join the WhatsApp community and you'll be the first to know when dates go live.",
    'adv.emptyCta': "Join the community",
    'adv.all': "Find all adventures",
    'adv.seeTrip': "See this trip",
    'adv.full': "Fully booked",
    'adv.waitlist': "Join the waitlist",
    'adv.error': "Couldn't load the dates right now. Join the WhatsApp community for the latest.",

    'page.advH1': "Find your adventure",
    'page.results': "See <strong>{n}</strong> results",
    'page.result1': "See <strong>1</strong> result",
    'page.allMonths': "All months",
    'page.filterLabel': "Filter by month",

    'glimpse.pill': "Our stories",
    'glimpse.h2': "Glimpses of past adventures",
    'glimpse.sub': "Photos from the trails, the camps and the mornings after.",

    'who.h2': "Who is it for?",
    'who.intro': "Whether you've already been on lots of adventures or you're keen to give it a try, this is for you. It's for women who want to spend more time outdoors, who collect outdoor inspiration but rarely get around to living it, and who want to meet other women who love it too.",
    'who.t1': "You want to spend more time in nature",
    'who.t2': "You love trying small adventures",
    'who.t3': "You want to explore the beauty closer to home",
    'who.t4': "You've saved more hikes than you've actually done",
    'who.t5': "You want to meet likeminded women",
    'who.t6': "You like the idea of a day or weekend with no plan",
    'who.pull': "If even one of those felt familiar, you're in the right place.",

    'about.h2': "About me",
    'about.p1': "I've been in love with mountains, hiking trails, and sleeping under the stars for years. The kind of weekends where you walk for hours, cook dinner on a tiny stove, and fall asleep listening to the wind in the trees. Those are the ones I keep coming back to.",
    'about.p2': "What started as my own adventure became something I wanted to share. So I started organising small weekends for other women: to make the outdoors feel less out of reach, and a lot more fun.",
    'about.p3': "If you've been waiting for the right group, or the right moment, or just someone else to plan the route, I'd love to have you along.",
    'about.sign': "x Puck",

    'wa.h2': "Join the community",
    'wa.p1': "A WhatsApp community for women who love the outdoors and want to do more of it. Get updates on upcoming adventures, meet other (outdoorsy) women, and get a feel for the vibe before you commit to anything.",
    'wa.p2': "No spam or endless messages, just the occasional update and a heads-up when a new adventure is being launched.",
    'wa.p3': "And it's not only about our trips: planning your own hike or weekend away? This is a good place to find a buddy for that too.",
    'wa.p4': "P.S. You can always leave with one click, so why not?",
    'wa.cta': "Join the community",

    'rev.h2': "Reviews",

    'faq.h2': "Your questions answered",
    'faq.q1.s': "What kind of adventures does JOSI do?",
    'faq.q1.a': "Hiking and wildcamping weekends are the core of it, but not the only thing — think day trips close to home, a night in a simple hut instead of a tent, winter adventures, and other formats as they come up. Every listing says exactly what kind of adventure it is and what to expect.",
    'faq.q2.s': "Is this only for beginners?",
    'faq.q2.a': "Not at all. Whether you're brand new to being outside or you've done this a hundred times, you'll fit in. Some women come for the adventure, some for the community, some just want time outside with people who get it.",
    'faq.q3.s': "What gear do I need?",
    'faq.q3.a': "Depends on the adventure — every listing spells it out. As a starting point, most people already own what they need: proper shoes, layers, something for the rain. Missing something specific, like a sleeping bag for an overnight? I can point you to rentals or gear worth borrowing.",
    'faq.q4.s': "What about food?",
    'faq.q4.a': "Depends on the trip. For an overnight, dinner and breakfast are included and you bring your own lunch and snacks; for a day adventure, you'll usually sort your own food. Each listing says which, and I'll send tips on what works well for whatever we're doing.",
    'faq.q5.s': "Is it safe?",
    'faq.q5.a': "Yes. I'm with you for the whole thing, routes (and camping spots, for anything overnight) are scouted in advance, and small groups mean nobody gets lost in the shuffle.",
    'faq.q6.s': "What if it rains?",
    'faq.q6.a': "We go anyway, that's part of it. You'll be prepped with the right gear, and honestly, a rainy hike — or a wet night in a tent — makes for the best stories. If the weather's genuinely unsafe, we adapt.",
    'faq.q7.s': "How fit do I need to be?",
    'faq.q7.a': "Depends on the adventure, and each listing says what to expect. As a rule: if you can be active outdoors for a few hours, you're set. It's not about a punishing pace — we move so people can still chat and look around.",
    'faq.q8.s': "What do you mean by \"women\"?",
    'faq.q8.a': "Everyone who identifies as a woman is welcome — cis women, trans women, and anyone whose experience or identity feels connected to womanhood and who'd feel at home in a women-centered space. What matters here is kindness, respect and looking out for each other, not fitting a strict definition. Not sure if this is the right space for you? Reach out and ask — you're always welcome to.",
    'faq.q9.s': "Why are these adventures only for women?",
    'faq.q9.a': "I started these because I wanted a space where women could try new things and ask the obvious questions without feeling like they already had to know what they're doing. Outdoor spaces can feel male-dominated, and that changes how comfortable you feel showing up as a beginner. This isn't about excluding anyone — it's about building something around a specific kind of group, where people can show up as they are, ask for help without embarrassment, and meet others looking for the same thing. My hope is just that more women end up outside more often, doing things they weren't sure they could.",

    'footer.tagline': "Micro-adventures for women. Based in the Netherlands."
  },

  nl: {
    'nav.all': "Alle avonturen",

    'hero.h1': "Micro avonturen<br/>voor vrouwen",
    'hero.sub': "Klein genoeg voor een weekend, groot genoeg om als een echt avontuur te voelen",
    'hero.cta': "Aankomende avonturen",

    'whatIs.h2': "Wat is een micro-adventure?",
    'whatIs.p1': "Een micro-adventure is een klein, kort avontuur de natuur in, dicht bij huis, dat toch als een echt avontuur voelt. De term komt van avonturier Alastair Humphreys, die wilde bewijzen dat je geen vliegticket of groot budget nodig hebt om datzelfde gevoel te beleven.",
    'whatIs.p2': "Het kan wandelen zijn met een tent op je rug, een nacht onder de sterren, een dag mountainbiken, vroeg opstaan voor zonsopkomst, of van hut naar hut trekken. Hoe het eruitziet is minder belangrijk dan hoe het voelt: even offline en buiten zijn, samen met vrouwen die snappen waarom je dat wilt.",
    'whatIs.tag1': "Avontuurlijk",
    'whatIs.tag2': "Natuur",
    'whatIs.tag3': "Dicht bij huis",
    'whatIs.tag4': "Offline",

    'adv.h2': "Aankomende avonturen",
    'adv.loading': "Data laden…",
    'adv.emptyTitle': "Nog geen data in de agenda",
    'adv.emptyBody': "Er worden nieuwe avonturen gepland. Word lid van de WhatsApp community en je hoort als eerste wanneer de data live gaan.",
    'adv.emptyCta': "Word lid",
    'adv.all': "Bekijk alle avonturen",
    'adv.seeTrip': "Bekijk deze trip",
    'adv.full': "Volgeboekt",
    'adv.waitlist': "Zet me op de wachtlijst",
    'adv.error': "De data konden even niet geladen worden. Word lid van de WhatsApp community voor het laatste nieuws.",

    'page.advH1': "Vind jouw avontuur",
    'page.results': "Bekijk <strong>{n}</strong> resultaten",
    'page.result1': "Bekijk <strong>1</strong> resultaat",
    'page.allMonths': "Alle maanden",
    'page.filterLabel': "Filter op maand",

    'glimpse.pill': "Onze verhalen",
    'glimpse.h2': "Glimpses van eerdere avonturen",
    'glimpse.sub': "Foto's van de paden, de kampjes en de ochtenden erna.",

    'who.h2': "Voor wie is het?",
    'who.intro': "Of je nu al heel wat avonturen achter de rug hebt of er juist graag eens eentje wilt proberen: dit is voor jou. Voor vrouwen die vaker naar buiten willen, eindeloos outdoor-inspiratie opslaan maar er te weinig aan toekomen, en het leuk vinden om andere vrouwen te ontmoeten die daar net zo enthousiast van worden.",
    'who.t1': "Je wilt meer tijd in de natuur doorbrengen",
    'who.t2': "Je vindt het leuk om kleine avonturen te proberen",
    'who.t3': "Je wilt de natuur dichter bij huis ontdekken",
    'who.t4': "Je hebt meer wandelingen opgeslagen dan je er gelopen hebt",
    'who.t5': "Je wilt gelijkgestemde vrouwen ontmoeten",
    'who.t6': "Je houdt van het idee van een dag of weekend zonder plan",
    'who.pull': "Als zelfs één daarvan bekend voelt, ben je hier op de juiste plek.",

    'about.h2': "Over mij",
    'about.p1': "Ik ben al jaren gek op bergen, lange wandelingen en slapen onder de sterren. Van die weekenden waarop je uren loopt, 's avonds op een klein gasbrandertje je eten maakt en in slaap valt met de wind door de bomen. Ik krijg er eigenlijk nooit genoeg van.",
    'about.p2': "En toch weet ik ook hoe makkelijk het is om zo'n weekend steeds uit te stellen. Niemand die mee kan, geen idee waar je moet beginnen, of je denkt gewoon: laat ik dat later wel een keer doen.",
    'about.p3': "Daarom ben ik begonnen met het organiseren van micro-adventures. Om het nét wat makkelijker te maken om naar buiten te gaan. Om samen op pad te gaan, nieuwe plekken te ontdekken en vooral veel tijd buiten door te brengen.",
    'about.p4': "Dus als je al een tijdje denkt: <em>ik wil eigenlijk vaker dit soort dingen doen</em>, kom gezellig mee.",
    'about.sign': "x Puck",

    'wa.h2': "Join de Whatsapp Community",
    'wa.p1': "Een WhatsApp-community voor vrouwen die graag buiten zijn en daar eigenlijk best wat meer van willen doen.",
    'wa.p2': "Je hoort als eerste wanneer er nieuwe avonturen zijn, ontmoet andere vrouwen die net zo graag naar buiten gaan en krijgt alvast een beetje een gevoel voordat je een keer meegaat. Geen spam of eindeloze berichten. Gewoon af en toe iets leuks: een nieuw avontuur, een recap of een kleine update.",
    'wa.p3': "En het gaat niet alleen over deze avonturen. Heb je zelf een hike, weekendje weg of avontuur gepland en zoek je nog iemand om mee te gaan? Ook daarvoor is dit een fijne plek.",
    'wa.p4': "En bevalt het niet? Je bent met één klik weer weg. Dus waarom niet?",
    'wa.cta': "Word lid",

    'rev.h2': "Reviews",

    'faq.h2': "Jouw vragen beantwoord",
    'faq.q1.s': "Wat voor avonturen doet JOSI?",
    'faq.q1.a': "Wandel- en kampeerweekenden vormen de basis, maar daar blijft het niet bij. Denk aan dagactiviteiten dicht bij huis, een nacht in een simpele hut, winterse avonturen en nog veel meer. Bij ieder avontuur staat duidelijk aangegeven wat voor soort avontuur het is en wat je kunt verwachten.",
    'faq.q2.s': "Is dit alleen voor beginners?",
    'faq.q2.a': "Helemaal niet. Of je nu compleet nieuw bent in de outdoor scene of je hebt al honderd keer iets avontuurlijks gedaan, je kan mee. Sommige vrouwen komen voor het avontuur, sommigen voor de community, sommigen willen gewoon tijd buiten spenderen met andere leuke vrouwen.",
    'faq.q3.s': "Welke uitrusting heb ik nodig?",
    'faq.q3.a': "Hangt af van het avontuur — bij elk avontuur staat het erbij. Om te beginnen: de meeste mensen hebben al wat ze nodig hebben. Goede schoenen, laagjes, iets tegen de regen. Mis je iets specifieks, zoals een slaapzak voor een overnachting? Ik kan je wijzen op verhuur of spullen die je kunt lenen.",
    'faq.q4.s': "En het eten?",
    'faq.q4.a': "Hangt af van de trip. Bij een overnachting zijn avondeten en ontbijt inbegrepen en neem je zelf je lunch en tussendoortjes mee; bij een dagavontuur regel je meestal je eigen eten. Bij elk avontuur staat welke van de twee, en ik stuur tips over wat goed werkt voor wat we gaan doen.",
    'faq.q5.s': "Is het veilig?",
    'faq.q5.a': "Ja. Ik ben er de hele tijd bij, routes (en plekken waar we overnachten) worden vooraf gescout, en kleine groepen betekent dat niemand uit het oog verloren wordt.",
    'faq.q6.s': "En als het regent?",
    'faq.q6.a': "Dan gaan we toch, dat hoort erbij. Je hebt de juiste uitrusting bij je, en eerlijk, een regenachtige wandeling — of een natte nacht in een tent — levert de beste verhalen op. Als het weer echt onveilig is, passen we het aan.",
    'faq.q7.s': "Hoe fit moet ik zijn?",
    'faq.q7.a': "Hangt af van het avontuur, en bij elk avontuur staat wat je kunt verwachten. Als vuistregel: als je een paar uur actief buiten kunt zijn, zit je goed. Het gaat niet om een moordend tempo — we gaan zo dat mensen nog kunnen kletsen en rondkijken.",
    'faq.q8.s': "Wat bedoel je met \"vrouwen\"?",
    'faq.q8.a': "Iedereen die zich identificeert als vrouw is welkom — cis vrouwen, trans vrouwen, en iedereen wiens ervaring of identiteit zich verbonden voelt met vrouw-zijn en die zich thuis zou voelen in een vrouwgerichte ruimte. Wat hier telt is vriendelijkheid, respect en oog hebben voor elkaar, niet het passen binnen een strikte definitie. Niet zeker of dit de juiste plek voor je is? Neem contact op en vraag het — dat mag altijd.",
    'faq.q9.s': "Waarom zijn deze avonturen alleen voor vrouwen?",
    'faq.q9.a': "Ik ben hiermee begonnen omdat ik een plek wilde waar vrouwen nieuwe dingen konden proberen en de voor de hand liggende vragen konden stellen zonder het gevoel te hebben dat ze het al moesten weten. Outdoor plekken kunnen mannen-gedomineerd aanvoelen, en dat verandert hoe comfortabel je je voelt om als beginner te komen. Dit gaat er niet om iemand uit te sluiten — het gaat om iets bouwen rond een specifiek soort groep, waar mensen kunnen zijn wie ze zijn, om hulp kunnen vragen zonder schaamte, en anderen ontmoeten die hetzelfde zoeken. Mijn hoop is gewoon dat meer vrouwen vaker buiten zijn, dingen doen waarvan ze niet zeker wisten of ze het konden.",

    'footer.tagline': "Micro-avonturen voor vrouwen. Gevestigd in Nederland."
  }
};

/* ============================================================
   3. STATE + HELPERS
   ============================================================ */
let CURRENT_LANG = 'en';
let ADVENTURES = [];
let REVIEWS = [];
let GALLERY = [];
let MONTH_FILTER = 'all';

const t = (key, lang) => {
  const L = lang || CURRENT_LANG;
  return (translations[L] && translations[L][key]) || translations.en[key] || '';
};

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const ARROW_SVG = '<span class="pill-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg></span>';

/* ---- CSV ---- */
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c !== '\r') field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/* Alias map so a slightly different column name still works */
const HEADER_ALIASES = {
  title: 'title_en', name: 'title_en', heading: 'title_en',
  description: 'desc_en', desc: 'desc_en', subtitle: 'desc_en', summary: 'desc_en',
  meta: 'meta_en', date: 'meta_en', dates: 'meta_en', when: 'meta_en',
  image: 'cover_image', cover: 'cover_image', photo: 'cover_image', img: 'cover_image',
  link: 'link_url', url: 'link_url', trip_url: 'link_url',
  ticket_url: 'link_url', tickets: 'link_url', ticket_tailor: 'link_url', tickettailor: 'link_url',
  instagram: 'instagram_url', insta: 'instagram_url', reel: 'instagram_url', reel_url: 'instagram_url',
  poster: 'video_poster', thumbnail: 'video_poster', video_thumb: 'video_poster',
  start: 'start_date', begin: 'start_date',
  end: 'end_date', finish: 'end_date',
  rating: 'stars', score: 'stars',
  text: 'text_en', review: 'text_en', quote: 'text_en', review_text: 'text_en'
};

function csvToObjects(text, label) {
  const rows = parseCSV(text);
  if (rows.length < 2) {
    console.warn('[' + label + '] sheet loaded but has no data rows.');
    return [];
  }
  const headers = rows[0].map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
  console.info('[' + label + '] columns found:', headers.filter(Boolean).join(', '));

  return rows.slice(1)
    .filter(r => r.some(c => c && c.trim()))
    .map(r => {
      const o = {};
      headers.forEach((h, i) => { if (h) o[h] = (r[i] || '').trim(); });
      for (const alias in HEADER_ALIASES) {
        const canon = HEADER_ALIASES[alias];
        if (o[alias] && !o[canon]) o[canon] = o[alias];
      }
      return o;
    });
}

/* ---- dates ---- */
function advDate(a) {
  const d = a.end_date || a.start_date;
  if (!d) return null;
  const parsed = new Date(d + 'T23:59:59');
  return isNaN(parsed) ? null : parsed;
}
function isUpcoming(a) {
  const d = advDate(a);
  return d === null ? true : d >= new Date();
}
function isPast(a) {
  const d = advDate(a);
  return d === null ? false : d < new Date();
}
function monthKey(a) {
  if (!a.start_date) return '';
  const d = new Date(a.start_date + 'T12:00:00');
  return isNaN(d) ? '' : d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}
function monthLabel(key, lang) {
  const [y, m] = key.split('-');
  const d = new Date(Number(y), Number(m) - 1, 1);
  const label = d.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}
const byStartDate = (a, b) => String(a.start_date || '').localeCompare(String(b.start_date || ''));

/* ============================================================
   4. ADVENTURE CARDS
   ============================================================ */
function buildCard(a, lang) {
  const isFull = (a.status || '').toLowerCase() === 'full';
  const meta   = a['meta_' + lang]  || a.meta_en  || '';
  const title  = a['title_' + lang] || a.title_en || '';
  const desc   = a['desc_' + lang]  || a.desc_en  || '';
  const label  = isFull ? t('adv.waitlist', lang) : t('adv.seeTrip', lang);

  /* Ticket Tailor (or any external) link opens in a new tab.
     With no link yet, fall back to the community so the button still does something. */
  const external = !!a.link_url;
  const href = a.link_url || WHATSAPP_URL;
  const targetAttr = ' target="_blank" rel="noopener"';

  const card = document.createElement('article');
  card.className = 'adv-card';
  card.innerHTML =
    '<div class="adv-card-bg">' +
      (a.cover_image ? '<img src="' + esc(a.cover_image) + '" alt="" onerror="this.remove()">' : '') +
    '</div>' +
    (isFull ? '<div class="adv-badge">' + esc(t('adv.full', lang)) + '</div>' : '') +
    '<div class="adv-card-body">' +
      (meta  ? '<p class="adv-meta">' + esc(meta) + '</p>' : '') +
      (title ? '<h3 class="adv-title">' + esc(title) + '</h3>' : '') +
      (desc  ? '<p class="adv-desc">' + esc(desc) + '</p>' : '') +
      '<a class="pill ' + (isFull ? 'pill--sage' : 'pill--orange') + '" href="' + esc(href) + '"' + targetAttr + '>' +
        '<span>' + esc(label) + '</span>' + ARROW_SVG +
      '</a>' +
    '</div>';
  return card;
}

/* Homepage: the three-up teaser */
function renderHomeAdventures() {
  const grid   = document.getElementById('advGrid');
  if (!grid) return;                       // not on this page
  const status = document.getElementById('advStatus');
  const empty  = document.getElementById('advEmpty');
  const footer = document.getElementById('advFooter');
  const lang   = CURRENT_LANG;

  const list = ADVENTURES.filter(isUpcoming).sort(byStartDate).slice(0, 3);
  if (status) status.hidden = true;

  if (!list.length) {
    grid.hidden = true;
    if (footer) footer.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;
  grid.hidden = false;
  if (footer) footer.hidden = false;
  grid.dataset.count = list.length;
  grid.innerHTML = '';
  list.forEach(a => grid.appendChild(buildCard(a, lang)));
}

/* Sub-page: everything upcoming, filtered by month */
function renderPageAdventures() {
  const grid = document.getElementById('pageAdvGrid');
  if (!grid) return;                       // not on this page
  const status  = document.getElementById('pageAdvStatus');
  const empty   = document.getElementById('pageAdvEmpty');
  const countEl = document.getElementById('advCount');
  const select  = document.getElementById('monthFilter');
  const lang    = CURRENT_LANG;

  const upcoming = ADVENTURES.filter(isUpcoming).sort(byStartDate);

  /* rebuild the month dropdown from what's actually there */
  if (select) {
    const months = [...new Set(upcoming.map(monthKey).filter(Boolean))].sort();
    if (!months.includes(MONTH_FILTER)) MONTH_FILTER = 'all';
    select.innerHTML =
      '<option value="all">' + esc(t('page.allMonths', lang)) + '</option>' +
      months.map(k => '<option value="' + esc(k) + '"' + (k === MONTH_FILTER ? ' selected' : '') + '>' + esc(monthLabel(k, lang)) + '</option>').join('');
    select.setAttribute('aria-label', t('page.filterLabel', lang));
  }

  const list = MONTH_FILTER === 'all' ? upcoming : upcoming.filter(a => monthKey(a) === MONTH_FILTER);

  if (status) status.hidden = true;
  if (countEl) {
    countEl.innerHTML = list.length === 1
      ? t('page.result1', lang)
      : t('page.results', lang).replace('{n}', list.length);
  }

  if (!list.length) {
    grid.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;
  grid.hidden = false;
  grid.innerHTML = '';
  list.forEach(a => grid.appendChild(buildCard(a, lang)));
}

async function loadAdventures() {
  if (!document.getElementById('advGrid') && !document.getElementById('pageAdvGrid')) return;
  try {
    const res = await fetch(ADVENTURES_CSV_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const rows = csvToObjects(await res.text(), 'adventures');
    ADVENTURES = rows.length ? rows : FALLBACK_ADVENTURES;
  } catch (err) {
    console.warn('[adventures] sheet unreachable, using fallback:', err);
    ADVENTURES = FALLBACK_ADVENTURES;
    const s1 = document.getElementById('advStatus');
    const s2 = document.getElementById('pageAdvStatus');
    if (s1) s1.textContent = t('adv.error');
    if (s2) s2.textContent = t('adv.error');
  }
  renderHomeAdventures();
  renderPageAdventures();
}

/* ============================================================
   5. REVIEWS
   ============================================================ */
function renderReviews() {
  const section = document.getElementById('reviews');
  if (!section) return;
  const wave = document.getElementById('revWave');
  const grid = document.getElementById('revGrid');
  const lang = CURRENT_LANG;

  if (!REVIEWS.length) {
    section.hidden = true;
    if (wave) wave.hidden = true;
    return;
  }
  section.hidden = false;
  if (wave) wave.hidden = false;
  grid.innerHTML = '';

  REVIEWS.forEach(r => {
    const stars = Math.max(0, Math.min(5, parseInt(r.stars, 10) || 5));
    const text  = r['text_' + lang] || r.text_en || '';
    const div = document.createElement('div');
    div.innerHTML =
      '<div class="review-stars" aria-label="' + stars + ' out of 5">' + '★'.repeat(stars) + '☆'.repeat(5 - stars) + '</div>' +
      '<p class="review-text">' + esc(text) + '</p>' +
      '<p class="review-name">' + esc(r.name || '') + '</p>' +
      '<p class="review-date">' + esc(r.date || '') + '</p>';
    grid.appendChild(div);
  });
}

async function loadReviews() {
  if (!document.getElementById('reviews')) return;
  if (!REVIEWS_CSV_URL) { renderReviews(); return; }
  try {
    const res = await fetch(REVIEWS_CSV_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    REVIEWS = csvToObjects(await res.text(), 'reviews');
  } catch (err) {
    console.warn('[reviews] sheet unreachable:', err);
    REVIEWS = [];
  }
  renderReviews();
}

/* ============================================================
   6. GLIMPSES — gallery photos + Instagram reels
   ============================================================ */
function probeImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/* Looks for images/gallery/01.jpg, 02.jpg … and stops once a whole
   batch comes back missing. Just drop numbered files in the folder. */
async function discoverGallery() {
  const found = [];
  for (let start = 1; start <= GALLERY_MAX; start += GALLERY_BATCH) {
    const nums = [];
    for (let n = start; n < start + GALLERY_BATCH && n <= GALLERY_MAX; n++) nums.push(n);
    const hits = (await Promise.all(
      nums.map(n => probeImage(GALLERY_PATH + String(n).padStart(2, '0') + GALLERY_EXT))
    )).filter(Boolean);
    found.push(...hits);
    if (!hits.length) break;
  }
  return found;
}

/* ---------------------------------------------------------------------------
   Gallery layout — photos are published in groups of five.

   Numbering starts at the BOTTOM RIGHT and runs right-to-left, bottom-to-top,
   so the newest group always sits at the top of the section.

   Each group of five fills two rows:
       top row     wide + narrow   (the wide slot swaps sides each group)
       bottom row  three narrow

   That's why 4, 10, 14, 20 … always land in a wide slot and should be
   LANDSCAPE photos, while everything else should be PORTRAIT.

   Nothing is ever stretched. An incomplete group (fewer than five uploaded so
   far) renders as plain narrow tiles and simply leaves the space empty.
   --------------------------------------------------------------------------- */
const GALLERY_GROUP = 5;

function galleryLayout(srcs) {
  // srcs arrive in ascending filename order: 01, 02, 03 …
  const groups = [];
  for (let i = 0; i < srcs.length; i += GALLERY_GROUP) {
    groups.push(srcs.slice(i, i + GALLERY_GROUP));
  }

  const out = [];
  // walk groups newest-first so the highest numbers render at the top
  for (let g = groups.length - 1; g >= 0; g--) {
    const grp = groups[g];
    const groupNo = g + 1;                 // 1-based, matches the photo numbering
    const wideOnRight = groupNo % 2 === 1;  // alternates each group

    if (grp.length === GALLERY_GROUP) {
      const [n1, n2, n3, n4, n5] = grp;
      // top row — reading left to right on screen
      if (wideOnRight) out.push({ src: n5, span: 1 }, { src: n4, span: 2 });
      else             out.push({ src: n5, span: 2 }, { src: n4, span: 1 });
      // bottom row — three narrow, newest on the left
      out.push({ src: n3, span: 1 }, { src: n2, span: 1 }, { src: n1, span: 1 });
    } else {
      // Partial group (fewer than five uploaded yet): narrow tiles, newest
      // first, nothing stretched. Blank cells pad out the row so the finished
      // group below still starts on a clean row of its own.
      for (let i = grp.length - 1; i >= 0; i--) out.push({ src: grp[i], span: 1 });
      const pad = (3 - (grp.length % 3)) % 3;
      for (let i = 0; i < pad; i++) out.push({ spacer: true, span: 1 });
    }
  }
  return out;
}

/* Maps a gallery filename → Instagram URL, using the adventures sheet.
   Matching is on filename only, so images/gallery/05.jpg, gallery/05.jpg
   and 05.jpg in the sheet all resolve to the same tile. */
function instagramByPhoto() {
  const map = {};
  ADVENTURES.forEach(a => {
    if (!a.instagram_url) return;
    const base = String(a.video_poster || '').split('/').pop().trim().toLowerCase();
    if (base) map[base] = a.instagram_url;
  });
  return map;
}

const PLAY_ICON =
  '<span class="gal-play" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' +
  '</span>';

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  const section = document.getElementById('glimpses');

  if (!GALLERY.length) {
    grid.hidden = true;
    if (section) section.hidden = true;
    return;
  }
  if (section) section.hidden = false;
  grid.hidden = false;

  const reels = instagramByPhoto();

  grid.innerHTML = galleryLayout(GALLERY).map(tile => {
    // blank cell, used to pad out an incomplete group
    if (tile.spacer) return '<span class="gal-spacer" aria-hidden="true"></span>';

    const base = tile.src.split('/').pop().toLowerCase();
    const link = reels[base];
    const img  = '<img src="' + esc(tile.src) + '" alt="" loading="lazy">';

    // a photo listed in the sheet becomes a clickable Instagram reel
    if (link) {
      return '<a class="gal-tile gal-tile--reel" data-span="' + tile.span + '" ' +
             'href="' + esc(link) + '" target="_blank" rel="noopener">' +
             img + PLAY_ICON + '</a>';
    }
    return '<figure class="gal-tile" data-span="' + tile.span + '">' + img + '</figure>';
  }).join('');
}

async function loadGlimpses() {
  if (!document.getElementById('galleryGrid')) return;
  GALLERY = await discoverGallery();
  console.info('[gallery] photos found:', GALLERY.length);
  renderGallery();
}

/* ============================================================
   7. LANGUAGE
   ============================================================ */
function setLang(lang) {
  if (!translations[lang]) lang = 'en';
  CURRENT_LANG = lang;
  try { localStorage.setItem('josi-lang', lang); } catch (e) {}
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = translations[lang][el.dataset.i18n];
    if (val !== undefined) el.innerHTML = val;
    /* NL About has a 4th paragraph that EN doesn't — hide it when missing */
    if (el.dataset.i18nOptional !== undefined) el.hidden = (val === undefined);
  });
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang)
  );

  renderHomeAdventures();
  renderPageAdventures();
  renderReviews();
  renderGallery();
}

/* ============================================================
   8. INIT
   ============================================================ */
document.querySelectorAll('.lang-btn').forEach(b =>
  b.addEventListener('click', () => setLang(b.dataset.lang))
);

const monthSelect = document.getElementById('monthFilter');
if (monthSelect) {
  monthSelect.addEventListener('change', e => {
    MONTH_FILTER = e.target.value;
    renderPageAdventures();
  });
}

let initialLang = 'en';
try {
  initialLang = localStorage.getItem('josi-lang') ||
    (navigator.language && navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en');
} catch (e) {}

setLang(initialLang);
loadAdventures();
loadReviews();
loadGlimpses();
