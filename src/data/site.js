// ============================================================
// Organization-level facts. Every value here is taken from the
// live site (blueprintsforpangaea.org). Do not invent additions —
// if a field is unknown, leave it out rather than guessing.
// ============================================================

export const ORG = {
  name: 'Blueprints for Pangaea',
  shortName: 'B4P',
  founded: 2013,
  foundedAt: 'University of Michigan',
  founder: 'Ben Rathi',
  hq: 'Ann Arbor, MI',
  // Word joiners keep "501(c)(3)" from breaking across lines.
  taxStatus: '501\u2060(c)\u2060(3) nonprofit',
  // B4P's sector term for what it does — used verbatim on the live site.
  classification: 'medical surplus recovery organization (MSRO)',
  email: 'contact@b4pglobal.org',
  expansionEmail: 'expansion@b4pglobal.org',
};

// Single canonical donation destination — the live site's DONATE button.
export const DONATE_URL = 'https://givebutter.com/b4p';

export const SOCIALS = [
  { label: 'Instagram', handle: '@blueprints4pangaea', url: 'https://www.instagram.com/blueprints4pangaea/' },
  { label: 'LinkedIn',  handle: 'Blueprints for Pangaea', url: 'https://www.linkedin.com/company/blueprints-for-pangaea/' },
  { label: 'Facebook',  handle: 'b4pangaea', url: 'https://www.facebook.com/b4pangaea/' },
];

export const DOCUMENTS = [
  {
    label: 'Executive Summary',
    url: 'https://www.blueprintsforpangaea.org/_files/ugd/36437b_fb4b05ddb1a44695a3cdb09907c866eb.pdf',
  },
  {
    label: 'Bylaws',
    url: 'https://www.blueprintsforpangaea.org/_files/ugd/36437b_1e4a9a691dab433b8730a1c83ecb3a8e.pdf',
  },
];
