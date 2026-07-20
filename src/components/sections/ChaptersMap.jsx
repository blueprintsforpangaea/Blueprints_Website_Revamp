import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

// Fix Leaflet's broken default icon path under Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: '', shadowUrl: '', iconRetinaUrl: '' });

const CHAPTERS_GEO = [
  { slug: 'umich',       name: 'University of Michigan',            abbr: 'UMich', location: 'Ann Arbor, MI',    isHQ: true, level: 0, lat: 42.2808, lng: -83.7430 },
  { slug: 'msu',         name: 'Michigan State University',          abbr: 'MSU',   location: 'East Lansing, MI', level: 1,             lat: 42.7018, lng: -84.4822 },
  { slug: 'osu',         name: 'Ohio State University',              abbr: 'OSU',   location: 'Columbus, OH',     level: 1,             lat: 39.9612, lng: -82.9988 },
  { slug: 'wayne-state', name: 'Wayne State University',             abbr: 'Wayne', location: 'Detroit, MI',      level: 2,             lat: 42.3574, lng: -83.0676 },
  { slug: 'usc',         name: 'Univ. of Southern California',       abbr: 'USC',   location: 'Los Angeles, CA',  level: 2,             lat: 34.0224, lng: -118.2851 },
  { slug: 'washu',       name: 'Washington Univ. in St. Louis',      abbr: 'WashU', location: 'St. Louis, MO',    level: 2,             lat: 38.6488, lng: -90.3108 },
  { slug: 'nyu',         name: 'New York University',                abbr: 'NYU',   location: 'New York, NY',     level: 2,             lat: 40.7295, lng: -73.9965 },
  { slug: 'greater-nj',  name: 'Greater New Jersey',                 abbr: 'GNJ',   location: 'New Jersey',       level: 3,             lat: 40.4774, lng: -74.2591 },
  { slug: 'santa-clara', name: 'Santa Clara University',             abbr: 'SCU',   location: 'Santa Clara, CA',  level: 3,             lat: 37.3496, lng: -121.9390 },
  { slug: 'unomaha',     name: 'Univ. of Nebraska Omaha',            abbr: 'UNO',   location: 'Omaha, NE',        level: 3,             lat: 41.2565, lng: -95.9345 },
  { slug: 'miami-med',   name: 'Univ. of Miami Medical School',      abbr: 'Med',   location: 'Miami, FL',        level: 3,             lat: 25.7617, lng: -80.1918 },
];

// Holographic color palette, ordered by recency
const LEVEL_COLORS = {
  0: { fill: '#818cf8', glow: 'rgba(129,140,248,0.75)', base: 22 },  // luminous indigo (founding)
  1: { fill: '#fb7185', glow: 'rgba(251,113,133,0.75)', base: 19 },  // coral rose (early)
  2: { fill: '#22d3ee', glow: 'rgba(34,211,238,0.75)',  base: 17 },  // aqua cyan (established)
  3: { fill: '#e879f9', glow: 'rgba(232,121,249,0.75)', base: 16 },  // orchid pink (newest)
};

const LEVEL_LABEL = ['Founding Chapter', 'Early Chapter', 'Established Chapter', 'Newest Chapter'];

function makeIcon(chapter, isSelected) {
  const { fill, glow, base } = LEVEL_COLORS[chapter.level];
  const s          = isSelected ? Math.round(base * 1.5) : base;
  const glowOuter  = isSelected ? 22 : 10;
  const border     = isSelected ? 2.5 : 2;
  const selClass   = isSelected ? 'cmap-pin--selected' : '';

  return L.divIcon({
    className: '',
    html: `
      <div class="cmap-pin ${selClass}" style="
        position:relative;
        width:${s}px; height:${s}px;
        background:${fill};
        border-radius:50%;
        border:${border}px solid rgba(255,255,255,0.95);
        box-shadow:0 0 ${glowOuter}px ${glow}, 0 0 6px ${fill}, 0 2px 6px rgba(0,0,0,0.2);
        cursor:pointer;
      ">
        ${isSelected ? `<span style="
          position:absolute;
          top:${s + 6}px;
          left:50%;
          transform:translateX(-50%);
          white-space:nowrap;
          font:700 9px/1 'Figtree',system-ui,sans-serif;
          color:${fill};
          letter-spacing:0.05em;
          pointer-events:none;
          text-shadow:0 0 8px ${glow};
        ">${chapter.abbr}</span>` : ''}
      </div>
    `,
    iconSize: [s, s],
    iconAnchor: [s / 2, s / 2],
  });
}

export default function ChaptersMap() {
  const [selected, setSelected] = useState(null);
  const sel = CHAPTERS_GEO.find(c => c.slug === selected) ?? null;

  function toggle(slug) {
    setSelected(s => (s === slug ? null : slug));
  }

  return (
    <section className="cmap">
      <div className="cmap__header container">
        <p className="eyebrow">Explore</p>
        <h2 className="ctree__heading">Our Reach</h2>
        <p className="ctree__sub">Click any marker to learn about that chapter.</p>
      </div>

      <div className="cmap__canvas container">
        <div className="cmap__map-wrap">
          <MapContainer
            center={[38.5, -97.0]}
            zoom={4}
            className="cmap__map"
            scrollWheelZoom={false}
            zoomControl
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              maxZoom={18}
              subdomains="abcd"
            />
            {CHAPTERS_GEO.map(ch => (
              <Marker
                key={ch.slug}
                position={[ch.lat, ch.lng]}
                icon={makeIcon(ch, selected === ch.slug)}
                eventHandlers={{ click: () => toggle(ch.slug) }}
              />
            ))}
          </MapContainer>
          {/* Subtle blue wash over the map */}
          <div className="cmap__wash" aria-hidden="true" />
        </div>

        {/* Info strip */}
        {sel && (
          <div className="ctree__panel cmap__info" key={sel.slug}>
            <div
              className="ctree__panel-icon"
              style={{ background: LEVEL_COLORS[sel.level].fill }}
            >
              {sel.abbr}
            </div>
            <div className="ctree__panel-body">
              {sel.isHQ && <span className="ctree__hq-badge">HQ</span>}
              <p className="ctree__panel-level">{LEVEL_LABEL[sel.level]}</p>
              <h3 className="ctree__panel-name">{sel.name}</h3>
              <p className="ctree__panel-loc">{sel.location}</p>
            </div>
            <Link to={`/chapters/${sel.slug}`} className="btn btn--primary ctree__panel-btn">
              Visit Chapter →
            </Link>
            <button className="ctree__close" onClick={() => setSelected(null)} aria-label="Close">×</button>
          </div>
        )}

        {/* Legend */}
        <div className="cmap__legend">
          {[
            { color: '#818cf8', label: 'Founding Chapter' },
            { color: '#fb7185', label: 'Early Chapters' },
            { color: '#22d3ee', label: 'Established Chapters' },
            { color: '#e879f9', label: 'Newest Chapters' },
          ].map(({ color, label }) => (
            <div className="ctree__legend-item" key={label}>
              <span className="ctree__legend-dot" style={{ background: color }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
