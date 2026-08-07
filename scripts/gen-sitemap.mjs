// Generates public/sitemap.xml from the canonical route list so the two
// can never drift. Runs automatically before every build.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { SITEMAP_PATHS } from '../src/routes/meta.js';

const SITE = 'https://www.blueprintsforpangaea.org';
const today = new Date().toISOString().slice(0, 10);
const here = dirname(fileURLToPath(import.meta.url));

const urls = SITEMAP_PATHS.map(
  (p) =>
    `  <url>\n` +
    `    <loc>${SITE}${p}</loc>\n` +
    `    <lastmod>${today}</lastmod>\n` +
    `    <priority>${p === '/' ? '1.0' : '0.7'}</priority>\n` +
    `  </url>`,
).join('\n');

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const out = resolve(here, '../public/sitemap.xml');
writeFileSync(out, xml);
console.log(`sitemap: ${SITEMAP_PATHS.length} urls -> public/sitemap.xml`);
