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

// Which side of its dot each name sits on, so the Michigan, New
// York, and Bay Area clusters don't overlap.
const SIDE = {
  umich: 'left',
  msu: 'above',
  'wayne-state': 'right',
  osu: 'below',
  nyu: 'above',
  'greater-nj': 'below',
  berkeley: 'above-right',
  'santa-clara': 'right',
  usc: 'right',
  washu: 'below',
  unomaha: 'left',
  'miami-med': 'left',
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

  // Keep dots one size on screen as the map scales.
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

        {CHAPTER_PINS.map((pin) => {
          const [x, y] = geo.proj([pin.lng, pin.lat]);
          return (
            <Link key={pin.id} to={`/chapters/${pin.id}`} tabIndex={-1} aria-hidden="true">
              <circle cx={x} cy={y} className={`chapmap__pin ${pin.hq ? 'chapmap__pin--hq' : ''}`} />
            </Link>
          );
        })}
      </svg>

      {/* School names are real links laid over the map, styled as
          buttons so it's clear they can be clicked. */}
      <ul className="chapmap__tags">
        {CHAPTER_PINS.map((pin, i) => {
          const [x, y] = geo.proj([pin.lng, pin.lat]);
          return (
            <motion.li
              key={pin.id}
              className={`chapmap__tag chapmap__tag--${SIDE[pin.id] || 'right'}`}
              style={{ left: `${(x / W) * 100}%`, top: `${(y / geo.h) * 100}%` }}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
            >
              <Link to={`/chapters/${pin.id}`} className={pin.hq ? 'is-hq' : ''}>
                {NAME[pin.id].name === 'University of Michigan' ? 'Michigan (HQ)' : pin.short}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </figure>
  );
}
