// ============================================================
// TOTALS — the single source of truth for every number on the
// site. Never hardcode a statistic in a component; derive it
// from here so one edit updates every surface.
//
// Provenance / conflicts resolved (live site, Aug 2026):
//  · suppliesValue: $9,077,500.09 appears on the home and impact
//    pages and is the most specific figure published. The Mission
//    page's Operations blurb says "over $8 million" — that is
//    department-scoped and older, so it is not used as the total.
//  · chapters: the About Us page states "11 Active Chapters &
//    150+ Members". The home page's "10+ National Chapters" is
//    the older, rounded-down phrasing. 11 is used.
//    Rutgers is not a 12th chapter — Rutgers students lead the
//    Greater New Jersey chapter. UC Berkeley is an emerging 2025
//    chapter and is tracked in chapters.js, not in this count.
//  · wasteTons: 5 million tons ≈ 10 billion pounds of unused
//    medical supplies discarded by the U.S. system each year.
// ============================================================

export const TOTALS = {
  suppliesValue: 9_077_500.09,
  suppliesValueExact: '$9,077,500.09',
  suppliesValueShort: '$9M+',
  countries: 15,
  chapters: 11,
  members: 150,
  founded: 2013,
  wasteTons: 5_000_000,
  wastePounds: 10_000_000_000,
  // Project C.U.R.E. partnership, expanded winter 2017.
  projectCureValue: 2_000_000,
  projectCureSince: 2017,
};

const yearsOfImpact = new Date().getFullYear() - TOTALS.founded;

// "Our Global Impact" band.
export const IMPACT_STATS = [
  {
    value: TOTALS.suppliesValueShort,
    label: 'Medical supplies redistributed',
    sub: `${TOTALS.suppliesValueExact} to date`,
  },
  {
    value: `${TOTALS.countries}+`,
    label: 'Countries reached',
    sub: 'Across five continents',
  },
  {
    value: `${yearsOfImpact}+`,
    label: 'Years of impact',
    sub: `Founded ${TOTALS.founded} at the University of Michigan`,
  },
];
