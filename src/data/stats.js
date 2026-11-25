// ============================================================
// TOTALS — the single source of truth for every number on the
// site. Never hardcode a statistic in a component; derive it
// from here so one edit updates every surface.
//
// Provenance / conflicts resolved (live site, Aug 2026):
//  · suppliesValue, poundsShipped, shipments: LIVE from the
//    Blueprints Hub (IMPACT_API_URL below), the same totals as the
//    Hub's Impact page: every recorded shipment, HQ and chapters.
//    Pages read them through useImpactTotals(). The numbers here
//    are only the fallback (Hub totals on Nov. 24, 2026) for when
//    the Hub can't be reached, and for page descriptions (meta.js).
//    They replaced the old site's $9,077,500.09, which was HQ-era
//    and left out chapter shipments (per Rohan, Nov. 2026).
//  · chapters: the About Us page states "11 Active Chapters &
//    150+ Members". The home page's "10+ National Chapters" is
//    the older, rounded-down phrasing. UC Berkeley (2025) is
//    now active too, per leadership, so the count is 12. The
//    University of Utah School of Medicine (2026) joined in
//    Nov. 2026, per Rohan, making it 13.
//    Rutgers is the former Greater New Jersey chapter (renamed
//    after it gained Rutgers affiliation), not a 13th chapter.
//  · wasteTons: U.S. hospitals produce more than 5 million tons
//    (≈ 10 billion pounds) of waste a year: ALL hospital waste, not
//    just unused supplies (Practice Greenhealth; APHA 2023 policy
//    statement puts all U.S. health care waste at 5-6 million tons).
//    Copy must say "waste", never "unused supplies", for this number.
// ============================================================

// The Hub's public impact totals: { totalValueUsd, totalPounds, totalShipments, ... }.
export const IMPACT_API_URL = 'https://b4p-hub.vercel.app/api/quant/public/impact';

const FALLBACK_VALUE = 13_190_072.06;

export const TOTALS = {
  suppliesValue: FALLBACK_VALUE,
  suppliesValueExact: formatUsd(FALLBACK_VALUE),
  suppliesValueShort: `$${Math.floor(FALLBACK_VALUE / 1_000_000)} million+`,
  poundsShipped: 322_650,
  shipments: 164,
  countries: 15,
  chapters: 13,
  members: 150,
  founded: 2013,
  wasteTons: 5_000_000,
  wastePounds: 10_000_000_000,
  // Project C.U.R.E. partnership, expanded winter 2017.
  projectCureValue: 2_000_000,
  projectCureSince: 2017,
};

export function formatUsd(value) {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// TOTALS with the Hub's live figures in place of the fallback ones.
// Anything missing or not a positive number keeps the fallback.
export function withLiveTotals(live) {
  const ok = (n) => typeof n === 'number' && Number.isFinite(n) && n > 0;
  if (!live) return TOTALS;
  const value = ok(live.totalValueUsd) ? live.totalValueUsd : TOTALS.suppliesValue;
  return {
    ...TOTALS,
    suppliesValue: value,
    suppliesValueExact: formatUsd(value),
    suppliesValueShort: `$${Math.floor(value / 1_000_000)} million+`,
    poundsShipped: ok(live.totalPounds) ? Math.round(live.totalPounds) : TOTALS.poundsShipped,
    shipments: ok(live.totalShipments) ? live.totalShipments : TOTALS.shipments,
  };
}

const yearsOfImpact = new Date().getFullYear() - TOTALS.founded;

// "Our Global Impact" band, from TOTALS or withLiveTotals(...).
export const impactStats = (totals) => [
  {
    value: totals.suppliesValueShort,
    label: 'Medical supplies redistributed',
    sub: `${totals.suppliesValueExact} to date`,
  },
  {
    value: totals.poundsShipped.toLocaleString('en-US'),
    label: 'Pounds of supplies shipped',
  },
  {
    value: totals.shipments.toLocaleString('en-US'),
    label: 'Shipments sent',
  },
  {
    value: `${totals.countries}+`,
    label: 'Countries reached',
    sub: 'Across five continents',
  },
  {
    value: String(totals.chapters),
    label: 'University chapters',
  },
  {
    value: `${yearsOfImpact}+`,
    label: 'Years of impact',
    sub: `Founded ${TOTALS.founded} at the University of Michigan`,
  },
];

export const IMPACT_STATS = impactStats(TOTALS);
