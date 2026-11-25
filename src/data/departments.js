// ============================================================
// The six headquarters departments, in the order leadership lists
// them. Every card shows the same three things, with no flipping:
// a photo, `about` (one or two plain sentences), and `work` (what
// the team does day to day). Keep both short and specific; never
// write placeholder or marketing copy.
//
// Sources (Nov. 2026): Technology from what the team has built
// (the member Hub, the dashboards, the Medical Supply Request
// System). Internal and Expansion's high school work per Rohan
// (CTO). Operations, Development and Finance from the old Mission
// page's lists, minus the marketing wording. Development does not
// work with high schools; Expansion does.
//
// `video` (optional): a link to the department's explainer video.
// Photos live in src/assets/images/departments/<id>.jpg.
// `leads` are exact role titles from team.js.
// ============================================================

export const DEPARTMENTS = [
  {
    id: 'technology',
    leads: ['Chief Technology Officer', 'VP of Technology'],
    name: 'Technology',
    about:
      'Builds and runs the software Blueprints uses, from the member Hub to the site clinics use to request supplies.',
    work: [
      'The member Hub',
      'Inventory, shipment and finance dashboards',
      'The Medical Supply Request System',
    ],
  },
  {
    id: 'operations',
    leads: ['VP of Operations'],
    name: 'Operations',
    about: 'Runs our supply chain, from taking in donated supplies to sending each shipment.',
    work: [
      'Supplier and recipient relations',
      'Warehouse inventory',
      'Shipment coordination',
    ],
  },
  {
    id: 'development',
    leads: ['VP of Development'],
    name: 'Development',
    about: 'Runs our social media, publications and community outreach.',
    work: [
      'Social media and branding',
      'News, media and publications',
      'Community outreach and partnerships',
    ],
  },
  {
    id: 'expansion',
    leads: ['VP of Expansion'],
    name: 'Expansion',
    about: 'Starts new university chapters and high school clubs, and supports the ones we have.',
    work: [
      'Chapter recruitment and onboarding',
      'Chapter support and coordination',
      'High school clubs',
    ],
  },
  {
    id: 'finance',
    leads: ['VP of Finance'],
    name: 'Finance',
    about: 'Raises money for Blueprints and keeps track of how it’s spent.',
    work: [
      'Grants (10 to 12 a year)',
      'Fundraising and corporate sponsorships',
      'Financial planning and reporting',
    ],
  },
  {
    id: 'internal',
    leads: ['VP of Internal'],
    name: 'Internal',
    about: 'Looks after our members, from recruitment to member events.',
    work: [
      'Recruitment and onboarding',
      'Socials and member events',
      'Bigs and littles',
    ],
  },
];

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

// "six", for use in running copy.
export const DEPARTMENT_COUNT_WORD = NUMBER_WORDS[DEPARTMENTS.length] ?? String(DEPARTMENTS.length);

// "Technology, Operations, …, or Internal", for use in running copy.
export const DEPARTMENT_LIST = new Intl.ListFormat('en', { type: 'disjunction' }).format(
  DEPARTMENTS.map((d) => d.name),
);

// The four-step supply chain. `body` is verbatim from the Mission page
// and is what that page renders; `short` is the one-line version used
// on the landing page, where the full text is more than it needs.
export const PIPELINE = [
  {
    num: '01',
    title: 'Partner',
    short: 'Chapters partner with university medical centers and local clinics that have surplus.',
    body:
      'Our chapters at universities across the country partner with affiliated university medical centers and other local clinics to collect surplus medical supplies.',
  },
  {
    num: '02',
    title: 'Collect',
    short: 'Supplies come to a warehouse, where students inventory and store them.',
    body:
      'These supplies are transported to one of our storage warehouses, where they are inventoried and stored until a sufficient quantity for shipment has been collected.',
  },
  {
    num: '03',
    title: 'Verify',
    short: 'Supplies are checked for quality and prepared for shipment.',
    body:
      'We work with nonprofit partners to verify medical supply quality and integrity. Supplies are then sorted and prepared for shipment.',
  },
  {
    num: '04',
    title: 'Ship',
    short: 'We arrange transport to the clinic or partner receiving them.',
    body:
      'Blueprints for Pangaea — independently or via a nonprofit partner — arranges transport. These shipments are sent to communities in need across the globe.',
  },
];
