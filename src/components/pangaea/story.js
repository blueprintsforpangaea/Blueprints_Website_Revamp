// ============================================================
// What the globe shows at each step of the Pangaea page.
// Every place, route, and figure traces to src/data — chapter
// coordinates are each campus's city, and each route starts at
// the chapter the shipment record credits (Ann Arbor otherwise).
// ============================================================

import { CHAPTERS } from '../../data/chapters.js';
import { DESTINATIONS, HQ } from '../../data/destinations.js';
import { plateOf } from './plates.js';

// Campus cities for the 12 chapters, keyed by chapters.js slug.
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
  berkeley: { lat: 37.8719, lng: -122.2585, short: 'UC Berkeley', dx: -1, dy: -1 },
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
];

// Every other international delivery, drawn from headquarters for
// the overview step.
const FEATURED_CITIES = new Set(['Tegucigalpa', 'Lagos']);
export const OTHER_ROUTES = DESTINATIONS.filter(
  (d) => d.region !== 'United States' && !FEATURED_CITIES.has(d.city),
).map((d) => ({
  id: `all-${d.city}`,
  from: { lat: HQ.lat, lng: HQ.lng, plate: 'nam' },
  to: { lat: d.lat, lng: d.lng, label: d.country, plate: plateOf(d.country, d.lng, d.lat) },
}));

// Globe state for each section of the page, in order. Between
// sections every value eases against scroll position, so the globe
// moves only as fast as you read. drift: 0 = Pangaea, 1 = today.
// scale: 1 = whole globe. arcs: how much of each route is drawn.
// pins: chapter dots. focus: routes that get a label.
const ALL_ARCS = { hon: 1, 'nga-usc': 1, 'nga-wsu': 1, all: 1 };
// Phones: the same story played on its own, in seconds, once the
// globe scrolls into view (a pinned globe doesn't fit a phone).
export const FILM = [
  { at: 0, drift: 0, lon: -5, lat: 6, scale: 1, spin: 1 },
  { at: 1.5, drift: 0, lon: -5, lat: 6, scale: 1, spin: 1 },
  { at: 5, drift: 1, lon: -40, lat: 22, scale: 1 },
  { at: 7.5, drift: 1, lon: -90, lat: 37, scale: 2.1, pins: 1 },
  { at: 9, drift: 1, lon: -90, lat: 37, scale: 2.1, pins: 1 },
  { at: 12, drift: 1, lon: -32, lat: 24, scale: 1, pins: 0.7, arcs: ALL_ARCS, focus: ['hon', 'nga-usc', 'nga-wsu'] },
  { at: 14, drift: 1, lon: -32, lat: 24, scale: 1, pins: 0.7, arcs: ALL_ARCS, focus: ['hon', 'nga-usc', 'nga-wsu'], spin: 0.4 },
];

export const STEPS = [
  { id: 'hero', drift: 0, lon: -5, lat: 6, scale: 1, spin: 1 },
  { id: 'how', drift: 1, lon: -90, lat: 37, scale: 2.3, pins: 1 },
  { id: 'where', drift: 1, lon: -32, lat: 24, scale: 1, pins: 0.7, arcs: ALL_ARCS, focus: ['hon', 'nga-usc', 'nga-wsu'] },
  { id: 'help', drift: 0, lon: -5, lat: 6, scale: 1, pins: 0.7, arcs: ALL_ARCS, spin: 1 },
];

