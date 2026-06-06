# Blueprints for Pangaea — Website Revamp

React + Vite + React Router stub for the BFP website rebuild.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Folder structure

```
b4p_website_revamp/
├── index.html
├── package.json
├── vite.config.js
├── public/
└── src/
    ├── main.jsx                # React entry, mounts <App /> with BrowserRouter
    ├── App.jsx                 # Wraps routes in <Layout />
    ├── routes/
    │   └── AppRoutes.jsx       # All <Route> definitions
    ├── components/
    │   ├── layout/             # Navbar, Footer, Layout shell
    │   ├── ui/                 # Button, Card, StatCounter (primitives)
    │   └── sections/           # Hero, Stats, ProblemStatement,
    │                           # HowWeWork, RecentShipments,
    │                           # PressCoverage, ChaptersList,
    │                           # GetInvolvedCTA
    ├── pages/                  # Home, Mission, Impact, AboutUs, Press,
    │                           # GetInvolved, Gala, Donate, Chapters, NotFound
    ├── data/                   # Static content — stats, chapters,
    │                           # shipments, press, team
    ├── hooks/                  # useScrollAnimation, useDonationForm
    ├── utils/                  # formatters, api (createDonation, etc.)
    ├── context/                # (reserved for React context providers)
    ├── assets/                 # images, logos, icons
    └── styles/                 # global.css, variables.css
```

## Where each section of the current site lives

| Current site section          | Stub location |
| ----------------------------- | --- |
| Hero / "Saving Lives..."      | `src/components/sections/Hero.jsx` |
| Impact metrics ($9.07M+, etc) | `src/components/sections/Stats.jsx` + `src/data/stats.js` |
| "5 million tons" problem      | `src/components/sections/ProblemStatement.jsx` |
| Partner → Collect → Verify → Ship | `src/components/sections/HowWeWork.jsx` |
| Recent shipments              | `src/components/sections/RecentShipments.jsx` + `src/data/shipments.js` |
| Press coverage                | `src/components/sections/PressCoverage.jsx` + `src/data/press.js` |
| University chapters (11)      | `src/components/sections/ChaptersList.jsx` + `src/data/chapters.js` |
| Mission page                  | `src/pages/Mission.jsx` |
| Impact page                   | `src/pages/Impact.jsx` |
| About Us                      | `src/pages/AboutUs.jsx` + `src/data/team.js` |
| Press page                    | `src/pages/Press.jsx` |
| Get Involved                  | `src/pages/GetInvolved.jsx` |
| Gala                          | `src/pages/Gala.jsx` |
| Donate ($10/$20/$30 + custom) | `src/pages/Donate.jsx` + `src/hooks/useDonationForm.js` |
| Per-chapter detail            | `src/pages/Chapters.jsx` (uses `:chapterSlug`) |
| Footer (contact, socials, docs) | `src/components/layout/Footer.jsx` |

## Next steps

1. `npm install` to pull React, React Router, Vite.
2. Drop logos/images into `src/assets/`.
3. Fill `TODO:` blocks in each file with real copy and styling.
4. Wire `src/utils/api.js → createDonation` to Stripe (or chosen processor).
5. Define brand palette in `src/styles/variables.css`.
