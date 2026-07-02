# Blueprints for Pangaea — Website Deliverables

Goal: take the site from "good landing page" to a cohesive, cinematic, donation-driving
experience across every page. The new landing page (`src/pages/Home.jsx`) is the
quality bar — everything else should rise to match it.

---

## 0. Shared design contract (READ FIRST — applies to everyone)

These are non-negotiable so the site stays consistent across five people:

- **Color:** navy + blue + white. **Never teal/green.** Use the tokens in
  `src/styles/variables.css` (the `--teal*` names exist but resolve to blue — don't
  hardcode hex, use the vars).
- **No emojis** anywhere in the UI. Replace with inline SVG icons or typographic
  elements. (Current offenders to clean up are listed per-owner below.)
- **Type:** `Archivo` for display headlines (tight, heavy), `Inter` for body/UI/data.
  Loaded in `index.html`. Use `--font-display` / `--font-sans`.
- **Feel:** editorial + cinematic. Full-bleed sections, real photography, intentional
  motion, generous whitespace. **Avoid boxy card grids** as the default layout.
- **Quality floor for every PR:** responsive to 360px, works in Safari + Firefox (not
  just Chrome — prefix `backdrop-filter`, etc.), visible keyboard focus, and
  `prefers-reduced-motion` respected.
- **Workflow:** branch per person → PR into `main` → at least one review. Don't push
  straight to `main`. Keep the design contract in review.

---

## Rishi — Motion & interaction system + Press / Gala

You own how the site **moves**, plus the Press and Gala pages (you already have the
`rishi-press-gala` branch).

**Motion system**
- [ ] Build a small motion utility layer on top of `framer-motion` (extend
  `src/components/ui/Reveal.jsx`): shared easing, durations, and variants so the team
  isn't re-declaring `[0.22, 1, 0.36, 1]` everywhere.
- [ ] Route/page transitions (fade/slide between pages via `AnimatePresence`).
- [ ] Micro-interactions: button hovers, link arrows, card lifts, nav scroll state.
- [ ] Scroll-reveals on every section that doesn't have one yet (inner pages are static).
- [ ] Ambient polish on the hero image + globe (subtle, not distracting).
- [ ] **Hard requirement:** every animation must no-op under `prefers-reduced-motion`
  and must not cause layout shift or drop below ~60fps. Test on a real phone.

**Press + Gala pages** (`src/pages/Press.jsx`, `src/pages/Gala.jsx`, `PressCoverage.jsx`)
- [ ] Redesign both to match the cinematic landing (no boxy cards).
- [ ] Press: animated logo strip / "as seen in" + article list with hover reveals.
- [ ] Gala: hero moment + animated countdown to the event, ticket/RSVP CTA.
- [ ] Remove the 4 emojis in `Gala.jsx` and the ✓ markers → SVG/typographic.

---

## Vishnav — Design system & site-wide consistency

You own the **component kit** and making every inner page match the landing (you have
the `vishnav/frontend-redesign` branch).

- [ ] Audit `src/styles/global.css` + `variables.css`; document the tokens and the
  reusable classes (eyebrow, section, btn variants) in a short `STYLEGUIDE.md`.
- [ ] Build/standardize a reusable component set so the team stops copy-pasting:
  `Button`, `Section`, `Eyebrow`, `PageHeader`, `Card`, `Stat`.
- [ ] Bring the **boxy inner pages up to the landing's bar** — kill generic card grids
  on `AboutUs`, `Mission`, `GetInvolved`, `Chapters` and replace with editorial,
  full-bleed, photographic layouts.
- [ ] Navbar + Footer pass (`src/components/layout/`): scroll states, active link
  styling, mobile menu polish, focus states.
- [ ] Cross-browser + responsive sweep on shared CSS (Safari/Firefox, down to 360px).
- [ ] Remove the legacy/unused sections that no longer fit (`ProblemStatement`,
  `HowWeWork`, `FeaturedPartnerships`, `RecentShipments`, `AudienceSplit`, `TrustBar`,
  `Stats`, `StatCounter`) — keep only what's used, or repurpose for inner pages.

---

## Mia — Impact page + globe + real data

You own the **proof**: the Impact page and the data behind every number on the site.

- [ ] Make `src/pages/Impact.jsx` a cinematic experience to match the landing.
- [ ] Replace the **placeholder globe destinations** in `src/data/destinations.js`
  (currently a representative stub) with real, verified shipment locations.
- [ ] Establish a single source of truth for stats in `src/data/stats.js` and wire
  `ImpactCounters.jsx` + hero proof to it (no more hardcoded `$9,077,500` in two places).
- [ ] Remove emojis: `Impact.jsx` (🌐), `ImpactGlobe.jsx` labels (📍📦), and the 16
  flag emojis in `destinations.js` → clean country list / SVG flags or none.
- [ ] Consider an interactive shipments view (filter by region/year) using
  `src/data/shipments.js`.

---

## Navya — Donate flow + Get Involved (conversion)

You own the pages that **turn visitors into supporters** — the highest-value work.

- [ ] `src/pages/Donate.jsx`: the form is a stub (`status` placeholder). Integrate a
  real provider (Stripe / Donorbox / Givebutter). Suggested amounts tied to real
  impact ("$35 sends a box"), one-time + recurring, real confirmation state.
- [ ] `src/pages/GetInvolved.jsx`: redesign + remove the 6 emojis (🏥📦🤝🎓🚀🧰).
  Three clear paths — partner with us / volunteer / start a chapter — each with a
  working form or mailto + validation + success/empty/error states.
- [ ] Accessible forms: labels, focus order, error messaging in the interface's voice.
- [ ] Coordinate copy with Stacey so CTAs read consistently end-to-end (a button that
  says "Donate" leads to a flow that confirms "Thank you").

---

## Stacey — Content, photography & story pages

You own the **words and images** — the single biggest lever for "ooze to donate."

- [ ] **Real photography.** Replace the placeholder `public/boxes.jpg` (an Unsplash
  render) used by the hero + donate scene with real Blueprints photos — warehouse,
  students packing, deliveries arriving at clinics. Optimize/compress (WebP, sized).
- [ ] `src/pages/AboutUs.jsx` + `Mission.jsx`: real story, founding history timeline,
  team (`src/data/team.js`), values — cinematic, not boxy. Remove emojis.
- [ ] `src/pages/Chapters.jsx` + `ChaptersList.jsx`: real chapter list/map
  (`src/data/chapters.js`), remove the 📍 emojis.
- [ ] Sitewide copy pass: emotional, specific, donation-driving, consistent voice.
- [ ] SEO/meta: per-page titles + descriptions, Open Graph image, alt text on all
  images (accessibility + sharing).

---

## Cross-cutting (whoever finishes first / pairs up)

- [ ] **Zero emojis** check before launch (`grep` the `src/` tree).
- [ ] Accessibility audit: keyboard nav, focus visible, color contrast, reduced motion.
- [ ] Performance: image sizes, the globe chunk is already lazy-loaded — keep it that way.
- [ ] Analytics + a real deploy pipeline (Vercel/Netlify) with preview URLs per PR.

---

### Suggested order of attack
1. Vishnav locks the component kit + tokens (unblocks everyone).
2. Stacey gets real photos in early (the hero/donate depend on them).
3. Navya ships the donate flow (the money path).
4. Mia wires real data so numbers are trustworthy.
5. Rishi layers motion on top once layouts are stable (animate last, not first).
