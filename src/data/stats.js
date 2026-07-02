// ============================================================
// SINGLE SOURCE OF TRUTH for every number shown on the site.
// Update a value here and it changes everywhere — hero, counters,
// mission page, donate flow. Never hardcode these in components.
// ============================================================
export const TOTALS = {
  dollarsRedistributed: 9077500,     // running total, USD
  dollarsDisplay: '$9M+',            // short display form
  dollarsExact: '$9,077,500',        // exact display form
  poundsDelivered: 20000,
  countries: 15,
  continents: 5,
  chapters: 11,
  founded: 2013,
  boxCost: 35,                       // dollars to ship one box of supplies
  tonsWastedPerYear: '5,000,000',    // US medical supply waste, tons/year
};

export const YEARS_ACTIVE = new Date().getFullYear() - TOTALS.founded;

// Headline hero stats (the X/X/X strip under the hero).
export const HERO_STATS = [
  { label: 'Pounds of Medical Supplies Delivered', value: '20K+' },
  { label: 'Countries Reached',                    value: `${TOTALS.countries}+` },
  { label: 'Chapters Across the Nation',           value: `${TOTALS.chapters}` },
];

// "Our Global Impact" stats (navy section).
export const IMPACT_STATS = [
  { value: `${YEARS_ACTIVE}+`,           label: 'Years of Impact',                sub: `Founded ${TOTALS.founded}` },
  { value: `${TOTALS.countries}+`,       label: 'Countries Reached',              sub: `Across ${TOTALS.continents} continents` },
  { value: TOTALS.dollarsDisplay,        label: 'Medical Supplies Redistributed', sub: `${TOTALS.dollarsExact} and counting` },
];

// Donation ladder — every dollar figure a donor sees comes from here,
// anchored to boxCost so "$35 sends a box" reads the same site-wide.
// NOTE: placeholder impact claims — verify with ops before launch.
export const GIVING_LADDER = [
  { amount: TOTALS.boxCost,     text: 'Ships one box of rescued medical supplies to a clinic that has run out.' },
  { amount: TOTALS.boxCost * 2, text: 'Sends two boxes — enough to restock a rural clinic’s essentials.' },
  { amount: 250,                text: 'Covers logistics for an international relief shipment.' },
  { amount: 500,                text: 'Helps launch a new chapter and its first collection drive.' },
];

export const PRESET_AMOUNTS = [TOTALS.boxCost, TOTALS.boxCost * 2, 100, 250, 500, 1000];

// Kept for the legacy <Stats /> / <StatCounter /> components.
export const HEADLINE_STATS = [
  { label: 'Supplies redistributed', value: 9.07, prefix: '$', suffix: 'M+' },
  { label: 'Countries served',       value: TOTALS.countries, prefix: '', suffix: '+' },
  { label: 'National chapters',      value: TOTALS.chapters,  prefix: '', suffix: '+' },
];
