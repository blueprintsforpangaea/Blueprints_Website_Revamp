// ============================================================
// The six headquarters departments, in the order leadership lists
// them. Operations, Development, Expansion, and Finance are
// verbatim from the Mission page. Technology and Internal are not
// described on the live site yet, so they carry only a name.
// Fill in `charter`, `responsibilities`, and `projects` once the
// teams provide real copy. Never write placeholder descriptions.
//
// `leads` are exact role titles from team.js. Only confirmed
// leadership is listed: the CTO leads Technology (confirmed by the
// CTO), and each other department lists only its VP until its
// chief is confirmed.
// ============================================================

export const DEPARTMENTS = [
  {
    id: 'technology',
    leads: ['Chief Technology Officer', 'VP of Technology'],
    name: 'Technology',
  },
  {
    id: 'operations',
    leads: ['VP of Operations'],
    name: 'Operations',
    charter:
      'Operations manages the backbone of Blueprints for Pangaea: our supply chain. From sourcing and storing medical supplies to ensuring they reach communities in need, Operations turns our mission into measurable impact.',
    responsibilities: [
      'Supplier & recipient relations',
      'Inventory management',
      'Shipment coordination',
      'Process optimization',
      'Technology & innovation',
    ],
    projects: [
      {
        name: 'Infrastructure Overhaul',
        detail:
          'Reorganized the warehouse workflow, with categorized inventory and a shelving system that shows what’s in stock at a glance.',
      },
      {
        name: 'App Development',
        detail:
          'Automated supply labeling through Google Apps Script and added AI-assisted item recognition to speed up intake.',
      },
    ],
  },
  {
    id: 'development',
    leads: ['VP of Development'],
    name: 'Development',
    charter:
      "Development leads Blueprints for Pangaea's public image, outreach, and engagement. We focus on growing awareness of our mission through creative storytelling, digital strategy, and community collaboration.",
    responsibilities: [
      'High school engagement & expansion',
      'Digital operations & branding',
      'News, media & publications',
      'Community outreach & partnerships',
      'Professional development',
    ],
    projects: [
      {
        name: 'Day of Service',
        detail:
          'A volunteer event combining medical supply sorting, food drives, hygiene-kit assembly, and blanket and card making.',
      },
      {
        name: 'Social Media Transformation',
        detail:
          'Built an Instagram series of reels and branded posts to reach people beyond our own campuses.',
      },
    ],
  },
  {
    id: 'expansion',
    leads: ['VP of Expansion'],
    name: 'Expansion',
    charter:
      "Expansion drives Blueprints for Pangaea's national growth and sustainability. We ensure that each chapter — current or emerging — has the tools, structure, and guidance to operate effectively and uphold Blueprints' mission.",
    responsibilities: [
      'Chapter oversight & support',
      'Chapter recruitment & onboarding',
      'Cross-chapter coordination',
      'Public policy and advocacy',
      'Standardization & resources',
    ],
    projects: [
      {
        name: 'Project Elevate',
        detail:
          'A chapter performance rubric with KPI tracking across engagement, shipment output, fundraising, and partnerships.',
      },
      {
        name: 'Public Policy Project',
        detail:
          'An op-ed on healthcare sustainability, new faculty connections, and mental-health resource distribution at Ohio State.',
      },
    ],
  },
  {
    id: 'finance',
    leads: ['VP of Finance'],
    name: 'Finance',
    charter:
      'Finance ensures the long-term sustainability and growth of Blueprints for Pangaea by securing the resources that power our mission. Through fundraising, partnerships, and data-driven strategy, Finance maintains the financial foundation that allows every chapter to thrive.',
    responsibilities: [
      'Grants (10 to 12 a year)',
      'Fundraising',
      'Corporate sponsorships & partnerships',
      'Financial planning & reporting',
    ],
    projects: [
      {
        name: 'Impact Dashboard',
        detail:
          'A unified Tableau data-visualization layer showing shipment value, volume, and geographic distribution in one place.',
      },
      {
        name: 'Charity Week',
        detail:
          'A restaurant partnership model where partners pledge up to 50% of revenue on designated days.',
      },
    ],
  },
  {
    id: 'internal',
    leads: ['VP of Internal'],
    name: 'Internal',
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
