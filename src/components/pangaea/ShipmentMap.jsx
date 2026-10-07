import { useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3-geo';
import { plateMatrices, plateGeometry, PLATE_COLOR, LOGO } from './plates.js';
import { ROUTES, OTHER_ROUTES, CHAPTER_PINS } from './story.js';
import { DESTINATIONS } from '../../data/destinations.js';

// A flat wall map of today's world in the logo's colours, with every
// documented international shipment drawn from the chapter that ran
// it (headquarters otherwise). The Impact page's counterpart to the
// home page globe.
//

const W = 1000;
const ALL = [...ROUTES, ...OTHER_ROUTES];
const LAND = plateGeometry(plateMatrices(1)).filter((g) => g.id !== 'ant');
const LAND_FC = { type: 'FeatureCollection', features: LAND.map((g) => ({ type: 'Feature', geometry: g })) };

// Where each country's label sits relative to its pin, so the
// Caribbean cluster doesn't overlap. [dx, dy, anchor]. Labels set
// well away from their pin get a short leader line.
const LABEL = {
  Mexico: [-10, 3, 'end'],
  Guatemala: [-10, 17, 'end'],
  Honduras: [0, 32, 'middle'],
  Jamaica: [6, 26, 'start'],
  'Dominican Republic': [12, -26, 'start'],
  'Puerto Rico': [10, 6, 'start'],
  Ecuador: [-10, 5, 'end'],
  Ghana: [-10, 16, 'end'],
  Nigeria: [10, 16, 'start'],
  Ukraine: [10, -4, 'start'],
  India: [10, 5, 'start'],
  Myanmar: [10, 5, 'start'],
};

const PLACES = [
  ...new Map(
    DESTINATIONS.filter((d) => d.region !== 'United States').map((d) => [d.country, d]),
  ).values(),
];

export default function ShipmentMap() {
  const reduce = useReducedMotion();
  const svgRef = useRef(null);

  const geo = useMemo(() => {
    const proj = geoNaturalEarth1().fitWidth(W, LAND_FC);
    const p = geoPath(proj);
    const [[, y0], [, y1]] = p.bounds(LAND_FC);
    proj.translate([proj.translate()[0], proj.translate()[1] - y0 + 12]);
    const pt = (lng, lat) => proj([lng, lat]);
    // Gentle arcs that bow upward, like flight paths on a wall map.
    const routes = ALL.map((r) => {
      const a = pt(r.from.lng, r.from.lat);
      const b = pt(r.to.lng, r.to.lat);
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const c = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - d * 0.28];
      return { id: r.id, a, b, c, d: `M${a[0]},${a[1]} Q${c[0]},${c[1]} ${b[0]},${b[1]}` };
    });
    return { h: Math.ceil(y1 - y0 + 24), path: p, project: pt, routes };
  }, []);

  // Keep labels, dots, and lines one size on screen as the map
  // scales with its frame.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const update = () => {
      const r = svg.getBoundingClientRect();
      // With "meet", one SVG unit is the smaller of the two scales.
      const scale = Math.min(r.width / W, r.height / geo.h) || 1;
      svg.style.setProperty('--u', String(1 / scale));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(svg);
    return () => ro.disconnect();
  }, [geo]);

  const grid = geoGraticule().step([20, 20])();

  return (
    <figure className="shipmap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${geo.h}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="shipmap-title"
      >
        <title id="shipmap-title">
          World map with lines from our chapters to {PLACES.length} countries we have shipped to
        </title>
        <defs>
          <clipPath id="shipmap-land">
            {LAND.map((g) => <path key={g.id} d={geo.path(g)} />)}
          </clipPath>
        </defs>

        <path d={geo.path(geoGraticule().step([10, 10])())} className="shipmap__grid" />
        {LAND.map((g) => (
          <path key={g.id} d={geo.path(g)} fill={PLATE_COLOR[g.id] || LOGO.navy} />
        ))}
        <path d={geo.path(grid)} clipPath="url(#shipmap-land)" className="shipmap__landgrid" />
        {LAND.map((g) => <path key={`s-${g.id}`} d={geo.path(g)} className="shipmap__seam" />)}

        {geo.routes.map((r, i) => {
          const draw = {
            initial: reduce ? false : { pathLength: 0 },
            whileInView: { pathLength: 1 },
            viewport: { once: true },
            transition: { duration: 1.4, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
          };
          return (
            <g key={r.id}>
              <motion.path d={r.d} className="shipmap__casing" {...draw} />
              <motion.path d={r.d} className="shipmap__route" {...draw} />
            </g>
          );
        })}

        {CHAPTER_PINS.map((c) => {
          const [x, y] = geo.project(c.lng, c.lat);
          return <circle key={c.id} cx={x} cy={y} className={`shipmap__pin ${c.hq ? 'shipmap__pin--hq' : ''}`} />;
        })}

        {PLACES.map((d) => {
          const [x, y] = geo.project(d.lng, d.lat);
          const [dx, dy, anchor] = LABEL[d.country] || [10, 5, 'start'];
          return (
            <g key={d.country} className="shipmap__place">
              {Math.abs(dy) > 20 && (
                <line
                  x1={x} y1={y}
                  x2={x + dx * 0.8} y2={y + dy + (dy < 0 ? 4 : -14)}
                  className="shipmap__leader"
                />
              )}
              <circle cx={x} cy={y} className="shipmap__pin" />
              {/* Offsets in em so they track the label's on-screen size. */}
              <text x={x} y={y} dx={`${dx / 15}em`} dy={`${dy / 15}em`} textAnchor={anchor} className="shipmap__label">
                {d.country}
              </text>
            </g>
          );
        })}

      </svg>
    </figure>
  );
}
