import { CHAPTERS } from '../data/chapters.js';
import { TOTALS } from '../data/stats.js';
import { ORG } from '../data/site.js';

const SUFFIX = `${ORG.name}`;

// Per-route title and description. A single-page app serves one
// index.html to every URL, so without this every route shares the
// home page's title in search results, browser tabs, and history.
const ROUTES = {
  '/': {
    title: `${ORG.name} — Saving lives one box at a time`,
    description: `A student-led ${ORG.taxStatus} recovering surplus medical supplies from hospitals and redistributing them to clinics in ${TOTALS.countries}+ countries.`,
  },
  '/mission': {
    title: `What we do — ${SUFFIX}`,
    description:
      'The U.S. healthcare system discards over 5 million tons of unused medical supplies a year. Our chapters collect some of it and ship it to clinics that are short on supplies.',
  },
  '/impact': {
    title: `Impact — ${SUFFIX}`,
    description: `${TOTALS.suppliesValueExact} in medical supplies redistributed to ${TOTALS.countries}+ countries, with a record of every documented shipment.`,
  },
  '/about': {
    title: `About us — ${SUFFIX}`,
    description: `Founded ${TOTALS.founded} at the University of Michigan. ${TOTALS.chapters} chapters, ${TOTALS.members}+ students, and the leadership team behind them.`,
  },
  '/chapters': {
    title: `Our chapters — ${SUFFIX}`,
    description: `${TOTALS.chapters} university chapters and ${TOTALS.members}+ students, with headquarters at the University of Michigan in Ann Arbor.`,
  },
  '/press': {
    title: `Press — ${SUFFIX}`,
    description:
      'News coverage of our students, our shipments, and medical waste.',
  },
  '/get-involved': {
    title: `Get involved — ${SUFFIX}`,
    description:
      'Join at headquarters, start a chapter, volunteer at the warehouse, apply for the high school internship, or donate supplies.',
  },
  '/gala': {
    title: `Blueprints Healthcare Business Gala — ${SUFFIX}`,
    description:
      'March 28, 2026 at the Ross School of Business. Attend the reception, pitch in the Shark Tank, or present at the research symposium.',
  },
  '/donate': {
    title: `Donate — ${SUFFIX}`,
    description: `Give online through Givebutter. ${ORG.name} is a ${ORG.taxStatus}, so gifts are tax-deductible.`,
  },
};

export function metaForPath(pathname) {
  const exact = ROUTES[pathname];
  if (exact) return exact;

  // /chapters/:slug
  const slug = pathname.match(/^\/chapters\/([^/]+)$/)?.[1];
  if (slug) {
    const chapter = CHAPTERS.find((c) => c.slug === slug);
    if (chapter) {
      return {
        title: `${chapter.name} chapter — ${SUFFIX}`,
        description:
          chapter.blurb ||
          `The ${chapter.name} chapter of ${ORG.name}, in ${chapter.location}, established ${chapter.since}.`,
      };
    }
  }

  return {
    title: `Page not found — ${SUFFIX}`,
    description: ROUTES['/'].description,
  };
}

// Every canonical URL, used to generate the sitemap.
export const SITEMAP_PATHS = [
  ...Object.keys(ROUTES),
  ...CHAPTERS.map((c) => `/chapters/${c.slug}`),
];
