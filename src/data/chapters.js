
// ============================================================
// 11 active chapters. Every `since` year, member count, blurb,
// partner list, and contact below is taken from that chapter's
// own page on blueprintsforpangaea.org.
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
      'Our founding chapter and national headquarters. The Ann Arbor warehouse receives, inventories, and stages supplies for every outbound shipment, and the HQ team supports all other chapters.',
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
    lead: 'Maya Marina, President',
    email: 'blueprintsforpangaea-michiganstate@b4pglobal.org',
    instagram: 'blueprints4pangaea_msu',
    blurb:
      'The Michigan State chapter is currently focused on building up its operations through fundraising, inventorying, and member engagement.',
    partners: ['UNICEF', 'Global Brigades'],
  },
  {
    slug: 'osu',
    name: 'Ohio State University',
    location: 'Columbus, OH',
    since: 2016,
    members: '25–30',
    lead: 'Siddharth Varman & Naomi Mukka, Presidents',
    email: 'blueprintsforpangaea-ohiostate@b4pglobal.org',
    instagram: 'b4posu',
    blurb:
      'Committed to addressing global and local healthcare disparities through sustainable medical redistribution and educational outreach. The chapter runs monthly supply shipments to Honduras and supports free clinics locally.',
    highlight:
      'Wellness Within Reach — a mental-health awareness project started at Ohio State that produces brochures of local clinics and resources, since adopted by other chapters.',
    partners: ['Ronald McDonald House', 'Island Pacific Academy alumni'],
  },
  {
    slug: 'wayne-state',
    name: 'Wayne State University',
    location: 'Detroit, MI',
    since: 2017,
    members: '~50',
    lead: 'Deidre Nicole Crockett, President',
    email: 'blueprintsforpangaea-waynestate@b4pglobal.org',
    instagram: 'blueprints4pangaea_wsu',
    blurb:
      'The Wayne State chapter is dedicated to addressing medical supply waste and improving healthcare access both locally and globally.',
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
      'The USC chapter bridges healthcare gaps by reallocating surplus medical supplies to underserved communities, with a focus on sustainability and social responsibility.',
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
    lead: 'Alina Alqazaha, President',
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
    email: 'sghile@scu.edu',
    instagram: 'blueprints4pangaea_scu',
    blurb:
      'Located in the heart of Silicon Valley, the SCU chapter is dedicated to addressing healthcare accessibility challenges in Santa Clara and its surrounding communities.',
    partners: ['MedCycle'],
  },
  {
    slug: 'nyu',
    name: 'New York University',
    location: 'New York, NY',
    since: 2024,
    lead: 'Keya Chhabra, President',
    email: 'kc5125@nyu.edu',
    instagram: 'blueprints4pangaea_nyu',
  },
  {
    slug: 'miami-med',
    name: 'University of Miami Medical School',
    location: 'Miami, FL',
    since: 2023,
    members: '9',
    lead: 'Alex Pedowitz, President',
    email: 'ajp365@med.miami.edu',
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
    lead: 'Abby Lauder & Amina Hussain, Presidents',
    email: 'contact@b4pglobal.org',
    instagram: 'blueprints4pangaea_unomaha',
  },
  {
    slug: 'greater-nj',
    name: 'Greater New Jersey',
    location: 'New Jersey',
    since: 2020,
    valueShipped: '$15,000+',
    lead: 'Pranav Manchiraju, President',
    email: 'b4p-rutgers@b4pglobal.org',
    instagram: 'blueprints4pangaea_gnj',
    blurb:
      'Led by students at Rutgers University, the Greater New Jersey chapter has run several local shipments using supplies donated by St. Peter’s Hospital and Robert Wood Johnson Hospital.',
    partners: ['St. Peter’s Hospital', 'Robert Wood Johnson Hospital', 'Local GNJ clinics'],
  },
];

// Chapters in formation — listed on the network page but not yet
// counted in TOTALS.chapters and without a public page of their own.
export const EMERGING_CHAPTERS = [
  { name: 'UC Berkeley', location: 'Berkeley, CA', since: 2025 },
];
