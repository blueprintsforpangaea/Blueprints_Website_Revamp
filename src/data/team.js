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
  { name: 'Jia Anand',       role: 'Greater New Jersey' },
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
  { name: 'Maya Nassif',    role: 'Director' },
];

// Grouped for rendering; the analyst corps (30+) is summarized
// rather than listed, matching how the live site presents it.
export const LEADERSHIP_GROUPS = [
  { id: 'c-suite',   title: 'C-Suite',            people: C_SUITE },
  { id: 'vps',       title: 'Vice Presidents',    people: VICE_PRESIDENTS },
  { id: 'expansion', title: 'Expansion Managers', people: EXPANSION_MANAGERS },
  { id: 'board',     title: 'Board of Directors', people: BOARD },
];
