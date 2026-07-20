// Headline hero stats (the stat card strip under the hero, with a fast count-up ticker).
export const HERO_STATS = [
  {
    format: 'currency',
    value: 9077500.09,
    label: 'Worth of Medical Supplies',
    sub: 'Redistributed to communities in need',
  },
  {
    format: 'plain',
    value: 15,
    suffix: '+',
    label: 'Countries Reached',
    sub: 'B4P has donated medical supplies to locations worldwide',
  },
  {
    format: 'plain',
    value: 10,
    suffix: '+',
    label: 'National Chapters',
    sub: 'Across the nation',
  },
];

// "Our Global Impact" stats (navy section).
export const IMPACT_STATS = [
  { value: '12+',  label: 'Years of Impact',                sub: 'Founded 2013' },
  { value: '15+',  label: 'Countries Reached',              sub: 'Across 5 continents' },
  { value: '$9M+', label: 'Medical Supplies Redistributed', sub: '$9,077,500.09 and counting' },
];

// Kept for the legacy <Stats /> / <StatCounter /> components.
export const HEADLINE_STATS = [
  { label: 'Supplies redistributed', value: 9.07, prefix: '$', suffix: 'M+' },
  { label: 'Countries served',       value: 15,   prefix: '',  suffix: '+' },
  { label: 'National chapters',      value: 11,   prefix: '',  suffix: '+' },
];
