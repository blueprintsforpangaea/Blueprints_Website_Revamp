import { useState } from 'react';
import { Link } from 'react-router-dom';

const VW = 920;
const VH = 660;

// Tree topology: UMich = root, then two splits per level
// Level 0: UMich (HQ, founding)
// Level 1: MSU, OSU (early, trunk branches)
// Level 2: Wayne State, USC, WashU, NYU (established)
// Level 3: Greater NJ, Santa Clara, UNO, Miami Med (newest, leaves)
const NODES = [
  { slug: 'umich',       name: 'University of Michigan',            abbr: 'UMich',  location: 'Ann Arbor, MI',   isHQ: true, level: 0, x: 460, y: 598, r: 30, parent: null },
  { slug: 'msu',         name: 'Michigan State University',          abbr: 'MSU',    location: 'East Lansing, MI', level: 1, x: 220, y: 458, r: 22, parent: 'umich' },
  { slug: 'osu',         name: 'Ohio State University',              abbr: 'OSU',    location: 'Columbus, OH',    level: 1, x: 700, y: 458, r: 22, parent: 'umich' },
  { slug: 'wayne-state', name: 'Wayne State University',             abbr: 'Wayne',  location: 'Detroit, MI',     level: 2, x: 88,  y: 312, r: 17, parent: 'msu' },
  { slug: 'usc',         name: 'University of Southern California',  abbr: 'USC',    location: 'Los Angeles, CA', level: 2, x: 332, y: 296, r: 17, parent: 'msu' },
  { slug: 'washu',       name: 'Washington University in St. Louis', abbr: 'WashU',  location: 'St. Louis, MO',   level: 2, x: 588, y: 296, r: 17, parent: 'osu' },
  { slug: 'nyu',         name: 'New York University',                abbr: 'NYU',    location: 'New York, NY',    level: 2, x: 832, y: 312, r: 17, parent: 'osu' },
  { slug: 'greater-nj',  name: 'Greater New Jersey',                 abbr: 'GNJ',    location: 'New Jersey',      level: 3, x: 52,  y: 164, r: 13, parent: 'wayne-state' },
  { slug: 'santa-clara', name: 'Santa Clara University',             abbr: 'SCU',    location: 'Santa Clara, CA', level: 3, x: 262, y: 152, r: 13, parent: 'usc' },
  { slug: 'unomaha',     name: 'University of Nebraska Omaha',       abbr: 'UNO',    location: 'Omaha, NE',       level: 3, x: 618, y: 152, r: 13, parent: 'washu' },
  { slug: 'miami-med',   name: 'University of Miami Medical School', abbr: 'Med',    location: 'Miami, FL',       level: 3, x: 820, y: 164, r: 13, parent: 'nyu' },
];

const NODE_MAP = Object.fromEntries(NODES.map(n => [n.slug, n]));

const BRANCH_COLOR = {
  1: '#7a5533',  // umich → level 1: warm trunk-brown
  2: '#8a6b3a',  // level 1 → 2: lighter brown
  3: '#4e7848',  // level 2 → 3: forest green
};
const BRANCH_WIDTH = { 1: 4, 2: 3, 3: 2 };

const NODE_FILL = {
  0: '#1f2a5e',  // navy (founding)
  1: '#6b4928',  // brown (early)
  2: '#586e3c',  // olive-green (established)
  3: '#3a7850',  // leaf-green (newest)
};

const LEVEL_LABEL = ['Founding Chapter', 'Early Chapter', 'Established Chapter', 'Newest Chapter'];

function curvePath(p, c) {
  const mid = (p.y + c.y) / 2;
  return `M ${p.x} ${p.y} C ${p.x} ${mid}, ${c.x} ${mid}, ${c.x} ${c.y}`;
}

function getAncestors(node) {
  const set = new Set();
  let cur = node;
  while (cur && cur.parent) {
    set.add(cur.parent);
    cur = NODE_MAP[cur.parent];
  }
  return set;
}

export default function ChaptersTree() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered]   = useState(null);

  const sel       = selected ? NODE_MAP[selected] : null;
  const ancestors = sel ? getAncestors(sel) : new Set();

  function toggle(slug) {
    setSelected(s => (s === slug ? null : slug));
  }

  return (
    <section className="ctree">
      <div className="ctree__intro">
        <p className="eyebrow">Our Network</p>
        <h2 className="ctree__heading">A Growing Network</h2>
        <p className="ctree__sub">
          From our roots at the University of Michigan, Blueprints has grown into a
          national network of eleven chapters. Select any node to explore.
        </p>
      </div>

      <div className="ctree__wrap">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="ctree__svg"
          aria-label="Blueprints chapter growth tree"
        >
          {/* Soil / ground accent */}
          <ellipse cx={460} cy={632} rx={90} ry={9} fill="#7a5533" opacity={0.1} />
          <line x1={415} y1={628} x2={505} y2={628} stroke="#7a5533" strokeWidth={3.5} strokeLinecap="round" opacity={0.3} />

          {/* Branches */}
          {NODES.filter(n => n.parent).map(node => {
            const par     = NODE_MAP[node.parent];
            const color   = BRANCH_COLOR[node.level];
            const width   = BRANCH_WIDTH[node.level];
            const isLit   = !selected || selected === node.slug || ancestors.has(node.slug);
            return (
              <path
                key={`br-${node.slug}`}
                d={curvePath(par, node)}
                fill="none"
                stroke={color}
                strokeWidth={isLit ? width : width * 0.7}
                strokeLinecap="round"
                opacity={selected ? (isLit ? 0.88 : 0.14) : 0.72}
                style={{ transition: 'opacity 0.3s ease, stroke-width 0.25s ease' }}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map(node => {
            const isSel    = selected === node.slug;
            const isHov    = hovered  === node.slug;
            const isDimmed = !!selected && !isSel && !ancestors.has(node.slug);
            const fill     = node.isHQ ? '#2746c9' : NODE_FILL[node.level];
            const scale    = isSel ? 1.28 : isHov ? 1.13 : 1;
            const r        = node.r * scale;
            const fsize    = node.level === 0 ? 11 : node.level <= 2 ? 9.5 : 8.5;

            return (
              <g
                key={node.slug}
                transform={`translate(${node.x},${node.y})`}
                onClick={() => toggle(node.slug)}
                onMouseEnter={() => setHovered(node.slug)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-label={node.name}
                aria-pressed={isSel}
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle(node.slug)}
              >
                {/* Selection / HQ halo */}
                {(isSel || node.isHQ) && (
                  <circle
                    r={r + 9}
                    fill="none"
                    stroke={node.isHQ ? '#2746c9' : fill}
                    strokeWidth={1.5}
                    opacity={isSel ? 0.45 : 0.22}
                    style={{ transition: 'all 0.25s ease' }}
                  />
                )}

                {/* Main circle */}
                <circle
                  r={r}
                  fill={fill}
                  opacity={isDimmed ? 0.2 : 1}
                  style={{ transition: 'all 0.25s ease' }}
                />

                {/* Blueprints-blue accent dot above HQ */}
                {node.isHQ && (
                  <circle r={5} cy={-r - 5} fill="#8fa6ff" opacity={0.9} style={{ transition: 'all 0.25s ease' }} />
                )}

                {/* Leaf bud above level-3 nodes */}
                {node.level === 3 && (
                  <ellipse
                    rx={4.5} ry={7} cy={-r - 5}
                    fill="#74b87f"
                    opacity={isDimmed ? 0.12 : 0.8}
                    style={{ transition: 'opacity 0.3s ease' }}
                  />
                )}

                {/* Inner label — levels 0-2 */}
                {node.level < 3 && (
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize={fsize}
                    fontWeight="700"
                    fontFamily="'Figtree', system-ui, sans-serif"
                    letterSpacing="0.02em"
                    opacity={isDimmed ? 0.18 : 1}
                    style={{ transition: 'opacity 0.3s ease', pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {node.abbr}
                  </text>
                )}

                {/* External label below — level 3 leaves */}
                {node.level === 3 && (
                  <text
                    textAnchor="middle"
                    y={r + 14}
                    fill={isDimmed ? '#c0c8d4' : NODE_FILL[3]}
                    fontSize={8.5}
                    fontWeight="700"
                    fontFamily="'Figtree', system-ui, sans-serif"
                    letterSpacing="0.04em"
                    style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.3s ease' }}
                  >
                    {node.abbr}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Info strip */}
        {sel && (
          <div className="ctree__panel" key={sel.slug}>
            <div className="ctree__panel-icon" style={{ background: sel.isHQ ? '#2746c9' : NODE_FILL[sel.level] }}>
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
            <button className="ctree__close" onClick={() => setSelected(null)} aria-label="Close panel">×</button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="ctree__legend">
        {[
          { color: '#2746c9', label: 'Founding Chapter' },
          { color: '#6b4928', label: 'Early Chapters' },
          { color: '#586e3c', label: 'Established Chapters' },
          { color: '#3a7850', label: 'Newest Chapters' },
        ].map(({ color, label }) => (
          <div className="ctree__legend-item" key={label}>
            <span className="ctree__legend-dot" style={{ background: color }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
