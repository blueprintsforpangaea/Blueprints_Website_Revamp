import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { geoAlbers, geoPath, geoGraticule, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import { CHAPTER_PINS } from './story.js';
import { CHAPTERS } from '../../data/chapters.js';
import { LOGO } from './plates.js';

// The Chapters page's signature: the lower 48 states in the logo's
// blue, with a dot for every chapter. Each dot and name links to
// that chapter's page.

const W = 1000;

// The U.S. without Alaska and Hawaii, where we have no chapters.
const US = (() => {
  const us = feature(world, world.objects.countries).features.find((f) => f.id === '840');
  const polys = us.geometry.coordinates.filter((poly) => {
    const [lon, lat] = geoCentroid({ type: 'Polygon', coordinates: poly });
    return lon > -130 && lat < 50;
  });
  return { type: 'Feature', geometry: { type: 'MultiPolygon', coordinates: polys } };
})();

// Where each name sits relative to its dot, [dx, dy, anchor], so the
// Michigan and New York clusters don't overlap. Names set well away
// from their dot get a short leader line.
const LABEL = {
  umich: [-14, 26, 'end'],
  msu: [-14, -14, 'end'],
  'wayne-state': [12, -16, 'start'],
  osu: [12, 22, 'start'],
  nyu: [12, -14, 'start'],
  'greater-nj': [12, 20, 'start'],
  usc: [12, 22, 'start'],
  'santa-clara': [12, 5, 'start'],
  washu: [0, 26, 'middle'],
  unomaha: [0, -16, 'middle'],
  'miami-med': [-12, 5, 'end'],
};

const NAME = Object.fromEntries(CHAPTERS.map((c) => [c.slug, c]));

export default function ChapterMap() {
  const reduce = useReducedMotion();
  const svgRef = useRef(null);

  const geo = useMemo(() => {
    const proj = geoAlbers().rotate([96, 0]).center([0, 38.5]).parallels([29.5, 45.5]);
    proj.fitWidth(W, US);
    const path = geoPath(proj);
    const [[, y0], [, y1]] = path.bounds(US);
    proj.translate([proj.translate()[0], proj.translate()[1] - y0 + 30]);
    return { proj, path, h: Math.ceil(y1 - y0 + 60) };
  }, []);

  // Keep names and dots one size on screen as the map scales.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const update = () => {
      const r = svg.getBoundingClientRect();
      const scale = Math.min(r.width / W, r.height / geo.h) || 1;
      svg.style.setProperty('--u', String(1 / scale));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(svg);
    return () => ro.disconnect();
  }, [geo]);

  const grid = geoGraticule().step([5, 5])();

  return (
    <figure className="chapmap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${geo.h}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="chapmap-title"
      >
        <title id="chapmap-title">Map of the United States with our {CHAPTER_PINS.length} chapters</title>
        <defs>
          <clipPath id="chapmap-land"><path d={geo.path(US)} /></clipPath>
        </defs>
        <path d={geo.path(US)} fill={LOGO.dark} />
        <path d={geo.path(grid)} clipPath="url(#chapmap-land)" className="chapmap__grid" />

        {CHAPTER_PINS.map((pin, i) => {
          const [x, y] = geo.proj([pin.lng, pin.lat]);
          const [dx, dy, anchor] = LABEL[pin.id] || [12, 5, 'start'];
          const chapter = NAME[pin.id];
          return (
            <motion.g
              key={pin.id}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <Link to={`/chapters/${pin.id}`} className={`chapmap__place ${pin.hq ? 'chapmap__place--hq' : ''}`} aria-label={chapter.name}>
                {Math.abs(dy) > 20 && (
                  <line
                    x1={x} y1={y}
                    x2={x + dx * 0.7} y2={y + dy * 0.62}
                    className="chapmap__leader"
                  />
                )}
                <circle cx={x} cy={y} className={`chapmap__pin ${pin.hq ? 'chapmap__pin--hq' : ''}`} />
                {/* Offsets in em so they track the name's on-screen size. */}
                <text x={x} y={y} dx={`${dx / 16}em`} dy={`${(dy + 5) / 16}em`} textAnchor={anchor} className="chapmap__label">
                  {pin.short}
                </text>
              </Link>
            </motion.g>
          );
        })}
      </svg>
    </figure>
  );
}
