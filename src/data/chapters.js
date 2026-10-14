
// ============================================================
// 12 active chapters. Every `since` year, member count, partner
// list, and contact below is taken from that chapter's own page on
// blueprintsforpangaea.org (rechecked Oct. 2026). Blurbs keep each
// page's facts in plainer wording.
// A chapter lead is listed only where that page names one with a
// title. UC Berkeley (2025) has no page yet, so it carries only
// its name, city, and year; its email is headquarters'.
//
// Note: Rutgers is not a separate chapter — Rutgers students run
// the Greater New Jersey chapter. UC Berkeley is an emerging
// 2025 chapter with no page yet (see EMERGING_CHAPTERS).
//
// Seals live in src/assets/chapters/logos.js, keyed by slug, so this
// module stays pure data importable outside the bundler.
//
// Fields are intentionally optional: a chapter that has not
// published a member count or shipment value simply omits it
// rather than carrying a placeholder.
//
// Chapters can add their own content without touching any code:
//   photos   — drop any number of photos in
//              src/assets/images/chapters/<slug>/
//   sections — extra blocks for the chapter page, in order:
//              sections: [
//                { title: 'Our first shipment', body: 'Text…' },
//                { title: 'Day of Service', body: ['Paragraph one', 'Paragraph two'] },
//              ]
// ============================================================
export const CHAPTERS = [
  {
    slug: 'umich',
    name: 'University of Michigan',
    location: 'Ann Arbor, MI',
    since: 2013,
    isHQ: true,
    lead: 'Aakash Gummidela, Chief Executive Officer',
    email: 'contact@b4pglobal.org',
    blurb:
      'Our founding chapter and national headquarters. The team here runs the Ann Arbor warehouse and supports the other chapters.',
    partners: [
      'Hope Clinic',
      'Packard Health',
      'Food Gatherers',
      'UM Student-Run Free Clinic',
      'Wolverine Street Med',
      'Delonis Center',
      'Ann Arbor Public Schools',
    ],
  },
  {
    slug: 'msu',
    name: 'Michigan State University',
    location: 'East Lansing, MI',
    since: 2016,
    members: '15–20',
    email: 'blueprintsforpangaea.msu@gmail.com',
    instagram: 'blueprints4pangaea_msu',
    blurb:
      'The Michigan State chapter is building up its operations right now, with a focus on fundraising and inventory.',
    partners: ['UNICEF', 'Global Brigades'],
  },
  {
    slug: 'osu',
    name: 'Ohio State University',
    location: 'Columbus, OH',
    since: 2016,
    members: '25–30',
    email: 'blueprintsforpangaea.osu@gmail.com',
    instagram: 'b4posu',
    blurb:
      'The Ohio State chapter sends medical supplies to Honduras every month and supports free clinics in Columbus.',
    highlight:
      'Wellness Within Reach, a mental health awareness project started at Ohio State. It produces brochures listing local clinics and resources, and other chapters have since adopted it.',
    partners: ['Ronald McDonald House', 'Island Pacific Academy alumni'],
  },
  {
    slug: 'wayne-state',
    name: 'Wayne State University',
    location: 'Detroit, MI',
    since: 2017,
    members: '~50',
    lead: 'Tamanna Garu, President',
    email: 'blueprintsforpangaea-waynestate@b4pglobal.org',
    instagram: 'blueprints4pangaea_wsu',
    blurb:
      'The Wayne State chapter works on medical supply waste and access to care, in Detroit and overseas.',
    partners: ['University of Southern California chapter (joint Nigeria shipment)'],
  },
  {
    slug: 'usc',
    name: 'University of Southern California',
    location: 'Los Angeles, CA',
    since: 2020,
    members: '~36',
    valueShipped: '$2,134,415.78',
    lead: 'Sophia Dettweiler, President',
    email: 'blueprintsforpangaea-usc@b4pglobal.org',
    instagram: 'blueprints4pangaea_usc',
    blurb:
      'The USC chapter sends surplus medical supplies to underserved communities in Los Angeles and overseas.',
    highlight:
      'July 2025 Nigeria shipment: more than 60 pallets of medical supplies, PPE, and sanitary products valued at over $573,000.',
    partners: ['Keck Medicine of USC', 'Connect With Africa', 'Claris Health', 'Shelter Partnership'],
  },
  {
    slug: 'washu',
    name: 'Washington University in St. Louis',
    location: 'St. Louis, MO',
    since: 2022,
    members: '~40',
    email: 'b4pangaea@gmail.com',
    instagram: 'b4p_washu',
    blurb:
      'The WashU chapter is actively building partnerships with hospitals and clinics to secure its first shipment agreement.',
  },
  {
    slug: 'santa-clara',
    name: 'Santa Clara University',
    location: 'Santa Clara, CA',
    since: 2023,
    members: '~20',
    lead: 'Senit Ghile, President',
    email: 'blueprintsforpangaea.scu@gmail.com',
    instagram: 'blueprints4pangaea_scu',
    blurb:
      'The Santa Clara chapter works on access to healthcare in Santa Clara and nearby communities.',
    partners: ['MedCycle'],
  },
  {
    slug: 'nyu',
    name: 'New York University',
    location: 'New York, NY',
    since: 2024,
    email: 'contact@b4pglobal.org',
    instagram: 'blueprints4pangaea_nyu',
  },
  {
    slug: 'miami-med',
    name: 'University of Miami Medical School',
    location: 'Miami, FL',
    since: 2023,
    members: '9',
    lead: 'Vivian Gao, Project Lead',
    email: 'blueprintsforpangaea.umiami@gmail.com',
    instagram: 'blueprints4pangaea_umiami',
    blurb:
      'The Miami Medical School chapter has two primary aims: to establish partnerships with health systems and organize medical supply shipments, and to conduct donation drives.',
    partners: [
      'UM Miller School of Medicine Global Institute of Community Health & Development',
    ],
  },
  {
    slug: 'unomaha',
    name: 'University of Nebraska Omaha',
    location: 'Omaha, NE',
    since: 2025,
    email: 'contact@b4pglobal.org',
    instagram: 'blueprints4pangaea_unomaha',
  },
  {
    slug: 'berkeley',
    name: 'UC Berkeley',
    location: 'Berkeley, CA',
    since: 2025,
    email: 'contact@b4pglobal.org',
  },
  {
    slug: 'greater-nj',
    name: 'Greater New Jersey',
    location: 'New Jersey',
    since: 2020,
    valueShipped: '$15,000+',
    email: 'contact@b4pglobal.org',
    instagram: 'blueprints4pangaea_gnj',
    blurb:
      'Led by students at Rutgers University, the Greater New Jersey chapter has run several local shipments using supplies donated by St. Peter’s Hospital and Robert Wood Johnson Hospital.',
    partners: ['St. Peter’s Hospital', 'Robert Wood Johnson Hospital', 'Local GNJ clinics'],
  },
];

// Chapters in formation — listed on the network page but not yet
// counted in TOTALS.chapters and without a public page of their own.
export const EMERGING_CHAPTERS = [];
