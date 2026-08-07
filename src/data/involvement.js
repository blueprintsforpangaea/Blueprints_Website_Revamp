import { DONATE_URL, ORG } from './site.js';

// ============================================================
// The six real ways in, with the actual application forms.
// Order matches the live Get Involved page.
// ============================================================

export const PATHWAYS = [
  {
    id: 'member',
    num: '01',
    audience: 'students',
    title: 'Become a member at headquarters',
    body:
      'Join the Ann Arbor team across Operations, Development, Expansion, Finance, or Technology. Recruitment runs each semester.',
    cta: 'See recruitment',
    to: '/get-involved#recruitment',
  },
  {
    id: 'chapter',
    num: '02',
    audience: 'students',
    title: 'Start a university chapter',
    body:
      'Bring Blueprints to your campus. Three interviews, one to two months, and a dedicated expansion manager once you launch.',
    cta: 'Start a chapter',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScuMFnvbCJuHMaKY-ZKl95_i69SFd-hoTTkD82A9nFxw3UGJw/viewform',
  },
  {
    id: 'volunteer',
    num: '03',
    audience: 'everyone',
    title: 'Volunteer with us',
    body:
      'Sort, organize, and catalog donated supplies at the warehouse. No experience needed — B4P members guide every session. Dress warmly.',
    cta: 'Sign up to volunteer',
    url: 'https://www.signupgenius.com/go/10C054BA4AA2AA1FBCF8-58352664-blueprints#/',
  },
  {
    id: 'internship',
    num: '04',
    audience: 'students',
    title: 'High school summer internship',
    body:
      'A project-based summer working alongside analysts on partnerships, inventory, fundraising, media, and outreach — closing with a community project you design and present to leadership.',
    cta: 'Apply now',
    url: 'https://forms.gle/WZF94ze2WRebMKTN7',
  },
  {
    id: 'donate',
    num: '05',
    audience: 'everyone',
    title: 'Donate to headquarters',
    body:
      'Fund the logistics that move surplus into care. Blueprints for Pangaea is a 501(c)(3) nonprofit.',
    cta: 'Donate',
    url: DONATE_URL,
  },
  {
    id: 'supplies',
    num: '06',
    audience: 'organizations',
    title: 'Donate supplies',
    body:
      'Hospitals, clinics, and suppliers: give new life to unused inventory instead of discarding it.',
    cta: 'See what we accept',
    to: '/get-involved#supplies',
  },
];

// ---------- High school internship ----------
export const INTERNSHIP = {
  title: 'High School Summer Internship',
  commitment: '10–15 hours per week · hybrid or virtual',
  eligibility: 'High schoolers at least 16 years old as of June 1',
  compensation: 'Unpaid',
  deadline: 'June 15, 2026 · 11:59 PM',
  url: 'https://forms.gle/WZF94ze2WRebMKTN7',
};

// ---------- Supply donations (HQ, Ann Arbor only) ----------
export const SUPPLIES_ACCEPTED = [
  'Personal protective equipment (PPE)',
  'Unused surgical instruments',
  'Unopened bandages, gauze, and dressings',
  'Unopened diagnostic equipment in working condition',
  'New, unopened personal hygiene items',
  'Functional mobility and rehabilitation equipment',
  'Other non-expired, usable medical items',
];

export const SUPPLIES_DECLINED = [
  'Expired items — medications, PPE, dressings',
  'Opened or partially used items',
  'Controlled substances or pharmaceuticals',
  'Hazardous or biohazardous materials',
  'Used single-use devices',
  'Non-functional equipment',
  'Large capital equipment such as MRI or CT machines, unless pre-approved',
];

// ---------- FAQ ----------
export const MEMBER_FAQ = [
  {
    q: 'Is there a GPA or grade requirement?',
    a: 'There are no GPA or grade requirements to apply. We accept undergraduate and graduate students.',
  },
  {
    q: 'Do you have restrictions on majors?',
    a: 'No — we pride ourselves on our diversity in majors and perspectives.',
  },
  {
    q: 'What is the time commitment?',
    a: 'Generally, members commit to 5–7 hours per week.',
  },
  {
    q: 'What are you looking for in applicants?',
    a: 'Individuals interested in the intersection of health and business, passionate about solving global health inequities.',
  },
];

export const CHAPTER_FAQ = [
  {
    q: 'What does the application process look like?',
    a: 'Three interviews — personality, chapter viability, and leadership. The full process takes one to two months.',
  },
  {
    q: 'How much contact will we have with HQ?',
    a: 'Each chapter has its own expansion manager who meets with them on a weekly basis.',
  },
  {
    q: 'How do we choose partners?',
    a: 'We encourage chapters to partner with national and local nonprofits to make the impact that they want.',
  },
  {
    q: 'How large should a chapter be?',
    a: 'We recommend fewer than 30 students per chapter — in our experience that is the optimal size.',
  },
];

// Steps in the chapter application, from /start-a-chapter.
export const CHAPTER_STEPS = [
  { num: '01', title: 'Apply', body: 'Submit the Start a Chapter form to open your application.' },
  { num: '02', title: 'Personality', body: 'A conversation about your fit with the Blueprints mission. Invite only.' },
  { num: '03', title: 'Viability', body: 'An assessment of the chapter’s ability to succeed in your location. Invite only.' },
  { num: '04', title: 'Leadership', body: 'A review of your leadership experience and plan for launching. Invite only.' },
];

export const EXPANSION_CONTACT = ORG.expansionEmail;
