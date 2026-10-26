// Writes src/data/world-110m.json: Natural Earth's 110m countries
// (world-atlas) with every country name removed except the few that
// plates.js matches on to pick a continent. The shapes are unchanged.
// Run with: node scripts/trim-world.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const world = JSON.parse(readFileSync('node_modules/world-atlas/countries-110m.json', 'utf8'));
const plates = readFileSync('src/components/pangaea/plates.js', 'utf8');

for (const g of world.objects.countries.geometries) {
  const name = g.properties?.name;
  g.properties = name && plates.includes(`'${name}'`) ? { name } : {};
}
writeFileSync('src/data/world-110m.json', JSON.stringify(world));
