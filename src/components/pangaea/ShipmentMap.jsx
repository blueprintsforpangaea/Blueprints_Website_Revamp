import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3-geo';
import { plateMatrices, plateGeometry, CONTINENT_COLOR, LOGO } from './plates.js';
import { ROUTES, OTHER_ROUTES, CHAPTER_PINS } from './story.js';
import { DESTINATIONS } from '../../data/destinations.js';
import { SHIPMENTS, FEATURED_SHIPMENTS } from '../../data/shipments.js';
import { shipmentHeadline, ShipmentFacts } from '../ui/ShipmentCard.jsx';

// A flat wall map of today's world in the logo's colours, with every
// documented international shipment drawn from the chapter that ran
// it (headquarters otherwise). Countries aren't named on the map;
// click a dot to see what was shipped there.

const W = 1000;
const ALL = [...ROUTES, ...OTHER_ROUTES];
const LAND = plateGeometry(plateMatrices(1)).filter((g) => g.id !== 'ant');
const LAND_FC = { type: 'FeatureCollection', features: LAND.map((g) => ({ type: 'Feature', geometry: g })) };

const PLACES = [
  ...new Map(
    DESTINATIONS.filter((d) => d.region !== 'United States').map((d) => [d.country, d]),
  ).values(),
];

// One shipment per place: the featured one if there is one.
const shipmentTo = (country) => {
  const all = SHIPMENTS.filter((s) => s.place === country);
  return all.find((s) => FEATURED_SHIPMENTS.includes(s)) || all[0];
};

export default function ShipmentMap() {
  const reduce = useReducedMotion();
  const svgRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [hover, setHover] = useState(null);
  const lit = open || hover;

  // Close the pop-up with Escape or a click anywhere else.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    const onDown = (e) => !e.target.closest('.shipmap__dot, .shipmap__pop') && setOpen(null);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const geo = useMemo(() => {
    const proj = geoNaturalEarth1().fitWidth(W, LAND_FC);
    const p = geoPath(proj);
    const [[, y0], [, y1]] = p.bounds(LAND_FC);
    proj.translate([proj.translate()[0], proj.translate()[1] - y0 + 12]);
    const pt = (lng, lat) => proj([lng, lat]);
    // Arcs that bow away from the straight line, like flight paths on
    // a wall map. Routes leaving the same chapter in similar directions
    // get different bows, so they fan out instead of stacking.
    const raw = ALL.map((r) => {
      const a = pt(r.from.lng, r.from.lat);
      const b = pt(r.to.lng, r.to.lat);
      return { r, a, b, angle: Math.atan2(b[1] - a[1], b[0] - a[0]) };
    });
    const order = [...raw].sort((x, y) => x.angle - y.angle);
    const routes = raw.map(({ r, a, b }) => {
      const rank = order.findIndex((o) => o.r === r);
      const bow = 0.12 + 0.3 * ((rank % 4) / 3);
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const d = Math.hypot(dx, dy);
      // Bend toward the top of the map.
      let nx = dy / d, ny = -dx / d;
      if (ny > 0) { nx = -nx; ny = -ny; }
      const c = [(a[0] + b[0]) / 2 + nx * d * bow, (a[1] + b[1]) / 2 + ny * d * bow];
      return { id: r.id, country: r.to.label, a, b, c, d: `M${a[0]},${a[1]} Q${c[0]},${c[1]} ${b[0]},${b[1]}` };
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
          World map with lines from our chapters to the {PLACES.length} places outside the mainland U.S. we have shipped to
        </title>
        <defs>
          <clipPath id="shipmap-land">
            {LAND.map((g) => <path key={g.id} d={geo.path(g)} />)}
          </clipPath>
        </defs>

        <path d={geo.path(geoGraticule().step([10, 10])())} className="shipmap__grid" />
        {LAND.map((g) => (
          <path key={g.id} d={geo.path(g)} fill={CONTINENT_COLOR[g.id] || LOGO.navy} />
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
            <g key={r.id} className={`shipmap__line ${lit ? (lit === r.country ? 'is-lit' : 'is-dim') : ''}`}>
              <motion.path d={r.d} className="shipmap__casing" {...draw} />
              <motion.path d={r.d} className="shipmap__route" {...draw} />
            </g>
          );
        })}

        {CHAPTER_PINS.map((c) => {
          const [x, y] = geo.project(c.lng, c.lat);
          return <circle key={c.id} cx={x} cy={y} className="shipmap__pin" />;
        })}

        {PLACES.map((d) => {
          const [x, y] = geo.project(d.lng, d.lat);
          return <circle key={d.country} cx={x} cy={y} className={`shipmap__pin ${open === d.country ? 'is-open' : ''}`} />;
        })}
      </svg>

      {/* Click targets laid over the dots, and the pop-up for the open one. */}
      <ul className="shipmap__dots">
        {PLACES.map((d) => {
          const [x, y] = geo.project(d.lng, d.lat);
          const left = (x / W) * 100;
          const top = (y / geo.h) * 100;
          const isOpen = open === d.country;
          return (
            <li key={d.country} style={{ left: `${left}%`, top: `${top}%` }}>
              <button
                type="button"
                className="shipmap__dot"
                aria-label={`Shipments to ${d.country}`}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : d.country)}
                onPointerEnter={() => setHover(d.country)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(d.country)}
                onBlur={() => setHover(null)}
              />
              {isOpen && (
                <div
                  className={`shipmap__pop ${left > 55 ? 'shipmap__pop--left' : ''} ${top > 55 ? 'shipmap__pop--up' : ''}`}
                  role="dialog"
                  aria-label={d.country}
                >
                  <div className="shipmap__pop-head">
                    <h3>{d.country}</h3>
                    <button type="button" className="shipmap__close" onClick={() => setOpen(null)} aria-label="Close">×</button>
                  </div>
                  {[shipmentTo(d.country)].filter(Boolean).map((s) => (
                    <div className="shipmap__pop-item" key={s.id}>
                      {shipmentHeadline(s) && <p className="ship__figure">{shipmentHeadline(s)}</p>}
                      {s.detail && <p className="ship__detail">{s.detail}</p>}
                      <ShipmentFacts shipment={s} />
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
