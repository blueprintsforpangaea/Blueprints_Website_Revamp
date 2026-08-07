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
import greaterNj from './greater-nj.png';

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
  'greater-nj': greaterNj,
};

export const logoFor = (slug) => CHAPTER_LOGOS[slug];
