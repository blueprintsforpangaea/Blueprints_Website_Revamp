// ============================================================
// What the globe shows at each step of the Pangaea page.
// Every place, route, and figure traces to src/data — chapter
// coordinates are each campus's city, and each route starts at
// the chapter the shipment record credits (Ann Arbor otherwise).
// ============================================================

import { CHAPTERS } from '../../data/chapters.js';
import { DESTINATIONS, HQ } from '../../data/destinations.js';
import { plateOf } from './plates.js';

// Campus cities for the 11 chapters, keyed by chapters.js slug.
const CAMPUS = {
  umich: { lat: 42.2808, lng: -83.743, short: 'Michigan · HQ', dx: -1 },
  msu: { lat: 42.737, lng: -84.4839, short: 'Michigan State', dx: -1, dy: -1 },
  'wayne-state': { lat: 42.3591, lng: -83.0665, short: 'Wayne State', dy: -1 },
  osu: { lat: 40.0067, lng: -83.0305, short: 'Ohio State', dy: 1 },
  usc: { lat: 34.0224, lng: -118.2851, short: 'USC' },
  washu: { lat: 38.6488, lng: -90.3108, short: 'WashU', dx: -1 },
  'santa-clara': { lat: 37.3496, lng: -121.939, short: 'Santa Clara', dx: -1 },
  nyu: { lat: 40.7295, lng: -73.9965, short: 'NYU', dy: -1 },
  'miami-med': { lat: 25.79, lng: -80.21, short: 'Miami' },
  unomaha: { lat: 41.2587, lng: -96.0067, short: 'Nebraska Omaha', dx: -1 },
  'greater-nj': { lat: 40.5008, lng: -74.4474, short: 'Greater NJ', dy: 1 },
};

export const CHAPTER_PINS = CHAPTERS.filter((c) => CAMPUS[c.slug]).map((c) => ({
  id: c.slug,
  ...CAMPUS[c.slug],
  plate: 'nam',
  hq: c.slug === 'umich',
}));

const city = (name) => {
  const d = DESTINATIONS.find((x) => x.city === name);
  return { lat: d.lat, lng: d.lng, label: d.country, plate: plateOf(d.country, d.lng, d.lat) };
};
const campus = (slug) => ({ ...CAMPUS[slug], plate: 'nam' });

// Featured routes, each told in its own step.
export const ROUTES = [
  { id: 'hon', from: campus('osu'), to: city('Tegucigalpa') },
  { id: 'nga-usc', from: campus('usc'), to: city('Lagos') },
  { id: 'nga-wsu', from: campus('wayne-state'), to: city('Lagos') },
  { id: 'syr', from: campus('umich'), to: city('Aleppo') },
];

// Every other international delivery, drawn from headquarters for
// the overview step.
const FEATURED_CITIES = new Set(['Tegucigalpa', 'Lagos', 'Aleppo']);
export const OTHER_ROUTES = DESTINATIONS.filter(
  (d) => d.region !== 'United States' && !FEATURED_CITIES.has(d.city),
).map((d) => ({
  id: `all-${d.city}`,
  from: { lat: HQ.lat, lng: HQ.lng, plate: 'nam' },
  to: { lat: d.lat, lng: d.lng, label: d.country, plate: plateOf(d.country, d.lng, d.lat) },
}));

// Globe state per step. Between steps every number is interpolated
// against scroll position, so the globe moves only as fast as you
// scroll. drift: 0 = Pangaea, 1 = today. scale: 1 = whole globe.
// arcs: how much of each route is drawn. pins: chapter dots.
// focus: which route endpoint gets a label.
export const STEPS = [
  { id: 'hero', sheet: 'What we do', drift: 0, lon: 0, lat: -8, scale: 1, spin: 1 },
  { id: 'name', sheet: 'Our name', drift: 0.55, lon: -14, lat: 6, scale: 1 },
  { id: 'waste', sheet: 'The problem', drift: 1, lon: -40, lat: 22, scale: 1.05 },
  { id: 'chapters', sheet: 'Our chapters', drift: 1, lon: -92, lat: 37, scale: 2.7, pins: 1 },
  { id: 'process', sheet: 'How it works', drift: 1, lon: -86, lat: 38, scale: 2.1, pins: 1 },
  { id: 'shipments', sheet: 'Where it goes', drift: 1, lon: -32, lat: 24, scale: 1, pins: 0.6, arcs: { hon: 1, 'nga-usc': 1, 'nga-wsu': 1, syr: 1, all: 1 }, focus: ['hon', 'nga-usc', 'syr'] },
  { id: 'together', sheet: 'How to help', drift: 0, lon: 0, lat: -8, scale: 1, pins: 0.6, arcs: { hon: 1, 'nga-usc': 1, 'nga-wsu': 1, syr: 1, all: 1 }, spin: 1 },
];
