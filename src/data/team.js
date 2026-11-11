// ============================================================
// National leadership, verbatim from /hq-executive-team.
//
// Note: the About Us page lists a different CEO (Stephanie Chan).
// /hq-executive-team is the current roster — it is the more
// specific page and matches the present officer set.
// ============================================================

export const C_SUITE = [
  { name: 'Aakash Gummidela',     role: 'Chief Executive Officer' },
  { name: 'Liya Berry',           role: 'Chief Operating Officer' },
  { name: 'Rahul Nanwani',        role: 'Chief Financial Officer' },
  { name: 'Rohan Kolli',          role: 'Chief Technology Officer' },
  { name: 'Belinda Chang',        role: 'Chief Development Officer' },
  { name: 'Katelyn Knickerbocker', role: 'Chief of Expansion' },
  { name: 'Romel Patel',          role: 'Chief of Staff' },
];

export const VICE_PRESIDENTS = [
  { name: 'Mia Zhong',    role: 'VP of Development' },
  { name: 'Sahran Hassan', role: 'VP of Operations' },
  { name: 'Farhan Ibrahim', role: 'VP of Finance' },
  { name: 'Russell Day',  role: 'VP of Technology' },
  { name: 'Sania Azhar',  role: 'VP of Expansion' },
  { name: 'Amy Mui',      role: 'VP of Internal' },
];

// Each expansion manager supports named chapters week to week.
export const EXPANSION_MANAGERS = [
  { name: 'Jia Anand',       role: 'Rutgers' },
  { name: 'Timothy Jho',     role: 'Ohio State & WashU' },
  { name: 'Aditya Chada',    role: 'U-Miami Medical' },
  { name: 'Aisha Tokovic',   role: 'NYU & Nebraska Omaha' },
  { name: 'Grisham Halapeti', role: 'USC & UC Berkeley' },
  { name: 'Ajan Arora',      role: 'Wayne State & Michigan State' },
];

export const BOARD = [
  { name: 'Ben Rathi',      role: 'Director, Founder' },
  { name: 'James Ha',       role: 'Director' },
  { name: 'Elliane Siebert', role: 'Director' },
  { name: 'Anurag Bolneni', role: 'Director' },
  { name: 'Sana Shah',      role: 'Director' },
  { name: 'Hadi Juratli',   role: 'Director' },
  { name: 'Grant Veldhuis', role: 'Director' },
  { name: 'Maya Nassif',    role: 'Director' },
];

// Analysts at headquarters (Ann Arbor), from the fall 2026 roster
// leadership sent. Names only. Members on a semester off (Divya
// Balaji, Lexy Aguirre) are left off until they're back.
export const SENIOR_ANALYSTS = [
  'Philip Hadiwidjaja', 'Rishi Garigipati', 'Samaria Noel', 'Rajas Visal',
  'Jacqueline Suarez', 'Lasya Kolli',
];

export const ANALYSTS = [
  'Vishnav Ramesh', 'Stacey Liu', 'Yug Patel', 'LolaRose Song', 'Anjali Kakarla',
  'Arnav Akhaury', 'Caleb Knickerbocker', 'Navya Yerrapu', 'Addison Richmond',
  'Devarshi Dalal', 'Yusuf Halilovic', 'Missole Doe', 'Max Hampel', 'Ritvik Sampath',
];

export const NEW_ANALYSTS = [
  'Ansh Khosa', 'Neel Bangera', 'Sonia Patel', 'Madi Ashmead', 'Prisha Shah',
  'Rhea Chokhalingam', 'Daniel Su', 'Clinton Brenner', 'Gemma Galdon Ordas',
  'Ayush Patel', 'Sai Tallapally',
];

// Shown as headshot grids under leadership; initials until a photo
// is added to src/assets/team.
export const ANALYST_GROUPS = [
  { id: 'senior-analysts', title: 'Senior Analysts', names: SENIOR_ANALYSTS },
  { id: 'analysts', title: 'Analysts', names: ANALYSTS },
  { id: 'new-analysts', title: 'New Analysts', names: NEW_ANALYSTS },
];

// Grouped for rendering. Headshots live in src/assets/team (see
// headshots.js).
export const LEADERSHIP_GROUPS = [
  { id: 'c-suite',   title: 'C-Suite',            people: C_SUITE },
  { id: 'vps',       title: 'Vice Presidents',    people: VICE_PRESIDENTS },
  { id: 'expansion', title: 'Expansion Managers', people: EXPANSION_MANAGERS },
  { id: 'board',     title: 'Board of Directors', people: BOARD },
];
