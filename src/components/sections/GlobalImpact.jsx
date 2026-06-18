import { useState } from 'react';
import { IMPACT_STATS } from '../../data/stats.js';
import { REGIONS } from '../../data/shipments.js';

export default function GlobalImpact() {
  const [region, setRegion] = useState('All');

  return (
    <section className="section section--navy">
      <div className="container">
        <h2 className="section-title">Our Global Impact</h2>

        <div className="impact-stats">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="impact-stat">
              <div className="impact-stat__value">{stat.value}</div>
              <span className="impact-stat__label">{stat.label}</span>
              <span className="impact-stat__sub">{stat.sub}</span>
            </div>
          ))}
        </div>

        <div className="region-filter">
          {REGIONS.map((r) => (
            <button
              key={r}
              className={`region-pill ${region === r ? 'is-active' : ''}`}
              onClick={() => setRegion(r)}
            >
              {r === 'All' ? 'All Regions' : r}
            </button>
          ))}
        </div>

        <div className="impact-map" role="img" aria-label="World map of regions served">
          {region === 'All'
            ? 'Interactive impact map — highlighting all 15+ countries served'
            : `Highlighting our work across ${region}`}
        </div>
      </div>
    </section>
  );
}
