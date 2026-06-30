import { useState } from 'react';
import Reveal from '../ui/Reveal.jsx';
import { RECENT_SHIPMENTS, REGIONS, SHIPMENT_REGION_COUNTS } from '../../data/shipments.js';

export default function RecentShipments() {
  const [region, setRegion] = useState('All');

  const shipments =
    region === 'All'
      ? RECENT_SHIPMENTS
      : RECENT_SHIPMENTS.filter((s) => s.region === region);

  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow eyebrow--center">Shipment History</span>
          <h2 className="section-title">Recent shipments</h2>
          <p>A running record of supplies delivered by our chapters — filter by region.</p>
        </Reveal>

        <div className="filter-pills">
          {REGIONS.map((r) => (
            <button
              key={r}
              className={`filter-pill ${region === r ? 'is-active' : ''}`}
              onClick={() => setRegion(r)}
            >
              {r === 'All' ? 'All Regions' : r}
              {SHIPMENT_REGION_COUNTS[r] != null && (
                <span className="filter-pill__count">{SHIPMENT_REGION_COUNTS[r]}</span>
              )}
            </button>
          ))}
        </div>

        <div className="grid-4">
          {shipments.map((s, i) => (
            <Reveal as="article" className="ship-card" key={s.id} delay={(i % 4) * 0.08}>
              <div className="ship-card__media" aria-hidden="true">
                <span className="ship-card__badge">{s.chapter}</span>
                {s.partner}
              </div>
              <div className="ship-card__content">
                <h3 className="ship-card__title">{s.partner}</h3>
                <p className="ship-card__sub">{s.destination}</p>
                <span className="ship-card__date">{s.date}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
