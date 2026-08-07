import umichLogo from '../assets/chapters/umich.png';
import msuLogo from '../assets/chapters/msu.png';
import osuLogo from '../assets/chapters/osu.png';
import wayneStateLogo from '../assets/chapters/wayne-state.png';
import uscLogo from '../assets/chapters/usc.png';
import washuLogo from '../assets/chapters/washu.png';
import santaClaraLogo from '../assets/chapters/santa-clara.png';
import nyuLogo from '../assets/chapters/nyu.png';
import miamiMedLogo from '../assets/chapters/miami-med.png';
import unomahaLogo from '../assets/chapters/unomaha.png';
import greaterNjLogo from '../assets/chapters/greater-nj.png';

// 11 chapters. Mark UMich as HQ.
export const CHAPTERS = [
  { slug: 'umich',         name: 'University of Michigan',         location: 'Ann Arbor, MI',  logo: umichLogo, since: 2013, isHQ: true },
  { slug: 'msu',           name: 'Michigan State University',      location: 'East Lansing, MI', logo: msuLogo, since: 2016 },
  { slug: 'osu',           name: 'Ohio State University',          location: 'Columbus, OH',     logo: osuLogo, since: 2016 },
  { slug: 'wayne-state',   name: 'Wayne State University',         location: 'Detroit, MI',      logo: wayneStateLogo, since: 2017 },
  { slug: 'usc',           name: 'University of Southern California', location: 'Los Angeles, CA', logo: uscLogo, since: 2020 },
  { slug: 'washu',         name: 'Washington University in St. Louis', location: 'St. Louis, MO',  logo: washuLogo, since: 2022 },
  { slug: 'santa-clara',   name: 'Santa Clara University',         location: 'Santa Clara, CA',  logo: santaClaraLogo, since: 2023 },
  { slug: 'nyu',           name: 'New York University',            location: 'New York, NY',     logo: nyuLogo, since: 2024 },
  { slug: 'miami-med',     name: 'University of Miami Medical School', location: 'Miami, FL',      logo: miamiMedLogo, since: 2023 },
  { slug: 'unomaha',       name: 'University of Nebraska Omaha',   location: 'Omaha, NE',        logo: unomahaLogo, since: 2025 },
  { slug: 'greater-nj',    name: 'Greater New Jersey',             location: 'New Jersey',       logo: greaterNjLogo, since: 2020 },
];
