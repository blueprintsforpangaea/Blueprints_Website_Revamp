// ============================================================
// The four departments, verbatim from the Mission page.
// Each has its charter, its standing responsibilities, and two
// past projects the department actually shipped.
// ============================================================

export const DEPARTMENTS = [
  {
    id: 'operations',
    num: '01',
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
          'Systematized the warehouse workflow end to end — categorized inventorying and a shelving system that made stock legible at a glance.',
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
    num: '02',
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
          'Built an Instagram multimedia series — reels and branded materials — to carry the mission past our own campuses.',
      },
    ],
  },
  {
    id: 'expansion',
    num: '03',
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
    num: '04',
    name: 'Finance',
    charter:
      'Finance ensures the long-term sustainability and growth of Blueprints for Pangaea by securing the resources that power our mission. Through fundraising, partnerships, and data-driven strategy, Finance maintains the financial foundation that allows every chapter to thrive.',
    responsibilities: [
      'Grants — 10 to 12 annually',
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
];

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
    short: 'Every item is checked for quality and integrity, then sorted for shipment.',
    body:
      'We work with nonprofit partners to verify medical supply quality and integrity. Supplies are then sorted and prepared for shipment.',
  },
  {
    num: '04',
    title: 'Ship',
    short: 'We arrange transport, and the supplies arrive free to the communities that need them.',
    body:
      'Blueprints for Pangaea — independently or via a nonprofit partner — arranges transport. These shipments are sent to communities in need across the globe.',
  },
];
