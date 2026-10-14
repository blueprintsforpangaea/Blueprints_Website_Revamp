import { useMemo } from 'react';
import { geoOrthographic, geoPath, geoGraticule, geoInterpolate, geoDistance } from 'd3-geo';
import { plateMatrices, plateGeometry, CONTINENT_COLOR, LOGO } from './plates.js';
import { CHAPTER_PINS } from './story.js';
import { DESTINATIONS, HQ } from '../../data/destinations.js';

// A small logo-style globe for a shipment card that has no photo yet:
// a line from the chapter that sent it to where it went. Decorative;
// the card's text says the same thing.

const W = 400;
const H = 300;
const LAND = plateGeometry(plateMatrices(1)).filter((g) => g.id !== 'ant');
const GRID = geoGraticule().step([20, 20])();

// U.S. places in the shipment record that aren't destination cities.
const US_PLACES = {
  'Ypsilanti, MI': [-83.613, 42.2411],
  'Southfield, MI': [-83.2219, 42.4734],
  Michigan: [-84.55, 42.73],
};

const CHAPTER_IDS = { USC: 'usc', 'Wayne State': 'wayne-state', 'Ohio State': 'osu', UMich: 'umich' };

function endpoints(s) {
  const d = DESTINATIONS.find((x) => x.country === s.place || x.city === s.place);
  const to = d ? [d.lng, d.lat] : US_PLACES[s.place];
  const slugs = (s.chapter || '').split(/\s*&\s*/).map((c) => CHAPTER_IDS[c]).filter(Boolean);
  const from = (slugs.length ? slugs : ['umich'])
    .map((id) => CHAPTER_PINS.find((p) => p.id === id))
    .map((p) => (p ? [p.lng, p.lat] : [HQ.lng, HQ.lat]));
  return { to, from };
}

export default function ShipmentGlobe({ shipment, className = '' }) {
  const g = useMemo(() => {
    const { to, from } = endpoints(shipment);
    if (!to) return null;
    const far = Math.max(...from.map((f) => geoDistance(f, to))) * (180 / Math.PI);
    const center = geoInterpolate(from[0], to)(0.5);
    // Zoom in on short, local trips so the dots don't sit on top of each other.
    const zoom = Math.min(4, Math.max(1, 55 / Math.max(far, 1)));
    const proj = geoOrthographic().translate([W / 2, H / 2]).scale(125 * zoom).rotate([-center[0], -center[1] + 8]).clipAngle(90);
    const path = geoPath(proj);
    return {
      sphere: path({ type: 'Sphere' }),
      land: LAND.map((l) => ({ id: l.id, d: path(l) })),
      grid: path(GRID),
      routes: far > 0.5 ? from.map((f) => path({ type: 'LineString', coordinates: [f, to] })) : [],
      to: proj(to),
      from: from.map((f) => proj(f)),
    };
  }, [shipment]);

  if (!g) return null;
  return (
    <svg className={`shipglobe ${className}`} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <path d={g.sphere} fill="#fff" />
      <path d={g.grid} fill="none" stroke={LOGO.navy} strokeOpacity="0.12" />
      {g.land.map((l) => <path key={l.id} d={l.d} fill={CONTINENT_COLOR[l.id] || LOGO.navy} stroke="#fff" strokeWidth="1" />)}
      <path d={g.sphere} fill="none" stroke={LOGO.navy} strokeOpacity="0.5" strokeWidth="1.5" />
      {g.routes.map((d, i) => <path key={i} d={d} fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />)}
      {g.routes.map((d, i) => <path key={`r${i}`} d={d} fill="none" stroke={LOGO.navy} strokeWidth="2.5" strokeLinecap="round" />)}
      {g.routes.length > 0 && g.from.map((p, i) => p && <circle key={i} cx={p[0]} cy={p[1]} r="4.5" fill="#fff" stroke={LOGO.navy} strokeWidth="2.5" />)}
      {g.to && <circle cx={g.to[0]} cy={g.to[1]} r="7" fill="#0069f3" stroke="#fff" strokeWidth="3" />}
    </svg>
  );
}
