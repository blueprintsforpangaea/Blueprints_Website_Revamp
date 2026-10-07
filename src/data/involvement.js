import { ORG } from './site.js';
import { DEPARTMENT_LIST } from './departments.js';

// Where volunteers sign up for a warehouse shift. Every volunteer
// link on the site reads this one value. Paste the Calendly link
// here; until then it falls back to the old SignUpGenius page.
export const CALENDLY_URL = '';
const SIGNUPGENIUS_URL = 'https://www.signupgenius.com/go/10C054BA4AA2AA1FBCF8-58352664-blueprints#/';
export const VOLUNTEER_URL = CALENDLY_URL || SIGNUPGENIUS_URL;

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
      `Join the Ann Arbor team in ${DEPARTMENT_LIST}. Recruitment runs each semester.`,
    cta: 'See recruitment',
    to: '/get-involved#recruitment',
  },
  {
    id: 'chapter',
    num: '02',
    audience: 'students',
    title: 'Start a university chapter',
    body:
      'Three interviews over one to two months. Once you launch, an expansion manager meets with your chapter every week.',
    cta: 'Start a chapter',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScuMFnvbCJuHMaKY-ZKl95_i69SFd-hoTTkD82A9nFxw3UGJw/viewform',
  },
  {
    id: 'volunteer',
    num: '03',
    audience: 'everyone',
    title: 'Volunteer with us',
    body:
      'Sort and catalog donated supplies at the warehouse. No experience needed, and B4P members run every session. Dress warmly.',
    cta: 'Sign up to volunteer',
    url: VOLUNTEER_URL,
  },
  {
    id: 'internship',
    num: '04',
    audience: 'students',
    title: 'High school summer internship',
    body:
      'A project-based summer working with our analysts on partnerships, inventory, fundraising, media, and outreach. It ends with a community project you design and present to leadership.',
    cta: 'Apply now',
    url: 'https://forms.gle/WZF94ze2WRebMKTN7',
  },
  {
    id: 'donate',
    num: '05',
    audience: 'everyone',
    title: 'Donate to headquarters',
    body:
      'Give online through Givebutter. Blueprints for Pangaea is a 501\u2060(c)\u2060(3) nonprofit.',
    cta: 'Donate',
    to: '/donate',
  },
  {
    id: 'supplies',
    num: '06',
    audience: 'organizations',
    title: 'Donate supplies',
    body:
      'For hospitals, clinics, and suppliers with unused inventory.',
    cta: 'See what we accept',
    to: '/get-involved#supplies',
  },
];

// ---------- High school internship ----------
export const INTERNSHIP = {
  title: 'High School Summer Internship',
  commitment: '10–15 hours per week · hybrid or virtual',
  eligibility: 'High school students or rising college freshmen',
  compensation: 'Unpaid',
  // Set `open` to true and update `applications` when the form reopens.
  open: false,
  applications: 'Reopening SP/SU 2027',
  closedNote: 'Applications reopen in SP/SU 2027.',
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
  'Expired items, including medications, PPE, and dressings',
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
    a: 'No. We pride ourselves on our diversity in majors and perspectives.',
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
    a: 'Three interviews: personality, chapter viability, and leadership. The full process takes one to two months.',
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
    a: 'We recommend fewer than 30 students per chapter. In our experience, that size works best.',
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
