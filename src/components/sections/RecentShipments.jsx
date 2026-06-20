import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { useState } from 'react';
import { RECENT_SHIPMENTS, REGIONS, SHIPMENT_REGION_COUNTS } from '../../data/shipments.js';

export default function RecentShipments() {
  const [region, setRegion] = useState('All');
  const { ref, isVisible } = useScrollAnimation();

  const shipments =
    region === 'All'
      ? RECENT_SHIPMENTS
      : RECENT_SHIPMENTS.filter((s) => s.region === region);

  return (
    <section
      ref={ref}
      className={`section reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container">
        <p className="eyebrow">Shipment History</p>
        <h2 className="section-title">Recent Shipments</h2>

        <div className="region-filter region-filter--light">
          {REGIONS.map((r) => (
            <button
              key={r}
              className={`region-pill ${region === r ? 'is-active' : ''}`}
              onClick={() => setRegion(r)}
            >
              {r === 'All' ? 'All' : r}
              {SHIPMENT_REGION_COUNTS[r] != null && (
                <span className="region-pill__count">{SHIPMENT_REGION_COUNTS[r]}</span>
              )}
            </button>
          ))}
        </div>

        <div className="shipments__grid">
          {shipments.map((s) => (
            <article key={s.id} className="card">
              <div className="card__media" aria-hidden="true">
                <span className="card__badge">{s.chapter}</span>
                {s.partner}
              </div>
              <div className="card__content">
                <h3 className="card__title">{s.partner}</h3>
                <p className="card__subtitle">{s.destination}</p>
                <span className="card__date">{s.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
