// ============================================================
// The 2026 Blueprints Healthcare Business Gala.
//
// Note: the live site publishes NO ticket prices or sponsorship
// tiers — attendance is by RSVP. Any priced tier on this page
// would be invented, so there are none.
// ============================================================

export const GALA = {
  name: 'Blueprints Healthcare Business Gala',
  year: 2026,
  date: 'March 28, 2026',
  time: '6:00 – 8:30 PM',
  venue: 'Tauber Colloquium, Ross School of Business',
  city: 'Ann Arbor, MI',
  intro:
    'An evening where students meet business and healthcare professionals. The program has a reception, a Shark Tank pitch competition, and a research symposium.',
};

export const GALA_TRACKS = [
  {
    id: 'rsvp',
    num: '01',
    name: 'Attend',
    body:
      'Reserve a seat at the 2026 Blueprints Gala.',
    cta: 'RSVP',
    url: 'https://forms.gle/4vzqD7BvhJ5LSbzdA',
    primary: true,
  },
  {
    id: 'shark-tank',
    num: '02',
    name: 'Shark Tank',
    body:
      'Pitch a healthcare idea to Eli Lilly executives. Prizes total $850.',
    deadline: 'March 20, 2026 · 11:59 PM',
    cta: 'Apply to pitch',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSd63llIPawVSYO_EaHAm9LwHG6QM6M9i7mQNbjZQ3c5AzL_uQ/viewform',
  },
  {
    id: 'symposium',
    num: '03',
    name: 'Research Symposium',
    body:
      'Present your research at the gala. Professionals from Michigan Medicine will be there.',
    deadline: 'March 20, 2026 · 11:59 PM',
    cta: 'Submit research',
    url: 'https://forms.gle/6xC3jg1fUeAYaQ3u6',
  },
];

export const GALA_SPONSORS = ['Eli Lilly', 'Huntington', 'MHA'];
