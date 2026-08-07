import { useMemo, useState } from 'react';
import Reveal from '../ui/Reveal.jsx';
import { SHIPMENTS, REGIONS } from '../../data/shipments.js';

export default function RecentShipments() {
  const [region, setRegion] = useState('All');

  // Counts come from the record itself, so the pills can never
  // disagree with the rows they filter.
  const counts = useMemo(() => {
    const c = { All: SHIPMENTS.length };
    for (const s of SHIPMENTS) c[s.region] = (c[s.region] || 0) + 1;
    return c;
  }, []);

  const rows = region === 'All' ? SHIPMENTS : SHIPMENTS.filter((s) => s.region === region);

  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow eyebrow--center">Shipment record</span>
          <h2 className="section-title">Where the boxes went</h2>
          <p>Every documented delivery, by the chapter that ran it. Filter by region.</p>
        </Reveal>

        <Reveal className="filter-pills" delay={0.08}>
          {REGIONS.map((r) => (
            <button
              key={r}
              className={`filter-pill ${region === r ? 'is-active' : ''}`}
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
            >
              {r === 'All' ? 'All regions' : r}
              {counts[r] != null && <span className="filter-pill__count">{counts[r]}</span>}
            </button>
          ))}
        </Reveal>

        <div className="shiplog">
          {rows.map((s, i) => (
            <Reveal as="article" className="shiplog__row" key={s.id} delay={Math.min(i, 8) * 0.04} y={16}>
              <div className="shiplog__place">
                <h3>{s.place}</h3>
                <span className="shiplog__region">{s.region}</span>
              </div>

              <div className="shiplog__body">
                {s.partner && <span className="shiplog__partner">{s.partner}</span>}
                {s.detail && <p className="shiplog__detail">{s.detail}</p>}
              </div>

              <div className="shiplog__meta">
                {s.value && <span className="shiplog__value">{s.value}</span>}
                {s.chapter && <span className="shiplog__chapter">{s.chapter}</span>}
                {s.date && <span className="shiplog__date">{s.date}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
