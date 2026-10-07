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
    'An evening for students to meet business and healthcare professionals. There’s a reception, a pitch competition, and a research showcase.',
};

export const GALA_TRACKS = [
  {
    id: 'rsvp',
    num: '01',
    name: 'Attend',
    body:
      'Reserve your spot to attend the 2026 Blueprints Gala and network with business and healthcare professionals.',
    cta: 'RSVP',
    url: 'https://forms.gle/4vzqD7BvhJ5LSbzdA',
    primary: true,
  },
  {
    id: 'shark-tank',
    num: '02',
    name: 'Shark Tank',
    body:
      'Pitch your innovative healthcare solutions to Eli Lilly executives for $850 in prizes.',
    deadline: 'March 20, 2026 · 11:59 PM',
    cta: 'Apply to pitch',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSd63llIPawVSYO_EaHAm9LwHG6QM6M9i7mQNbjZQ3c5AzL_uQ/viewform',
  },
  {
    id: 'symposium',
    num: '03',
    name: 'Research Symposium',
    body:
      'Present your work at the gala and meet industry professionals from Michigan Medicine and beyond.',
    deadline: 'March 20, 2026 · 11:59 PM',
    cta: 'Submit research',
    url: 'https://forms.gle/6xC3jg1fUeAYaQ3u6',
  },
];

export const GALA_SPONSORS = ['Eli Lilly', 'Huntington', 'MHA'];
