import umich from './umich.png';
import msu from './msu.png';
import osu from './osu.png';
import wayneState from './wayne-state.png';
import usc from './usc.png';
import washu from './washu.png';
import santaClara from './santa-clara.png';
import nyu from './nyu.png';
import miamiMed from './miami-med.png';
import unomaha from './unomaha.png';
import rutgers from './rutgers.png';
import berkeley from './berkeley.png';
import utahMed from './utah-med.png';

// Slug -> university seal. Kept out of src/data/chapters.js so that
// module stays pure, serializable data that Node can import directly
// (the sitemap generator does exactly that at build time).
export const CHAPTER_LOGOS = {
  'umich': umich,
  'msu': msu,
  'osu': osu,
  'wayne-state': wayneState,
  'usc': usc,
  'washu': washu,
  'santa-clara': santaClara,
  'nyu': nyu,
  'miami-med': miamiMed,
  'unomaha': unomaha,
  rutgers,
  // UC Berkeley seal from Wikimedia Commons.
  'berkeley': berkeley,
  // University of Utah seal from Wikimedia Commons.
  'utah-med': utahMed,
};

export const logoFor = (slug) => CHAPTER_LOGOS[slug];

// Campus photos from the old site's chapter list, one per chapter,
// shown as the banner on each chapter's page.
// utah-med.jpg is "U - University of Utah - DSC02422" by Daderot,
// Wikimedia Commons, CC0.
const campus = import.meta.glob('./campus/*.jpg', { eager: true, import: 'default' });
export const campusFor = (slug) => campus[`./campus/${slug}.jpg`];
