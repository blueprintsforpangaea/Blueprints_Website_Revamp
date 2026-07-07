import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { REGION_SUMMARY } from '../../data/destinations.js';

export default function GlobalImpact() {
  return (
    <section className="section section--ink">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow eyebrow--center">Our Global Impact</span>
          <h2 className="section-title">Reaching every corner of the map</h2>
          <p>What began at one university warehouse now reaches clinics across five continents.</p>
        </Reveal>

        <Reveal className="grid-3" delay={0.1} style={{ marginTop: '3rem' }}>
          {REGION_SUMMARY.slice(0, 3).map((r) => (
            <div
              className="feature-card"
              key={r.region}
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <div className="feature-card__count">
                {r.countries}<span>{r.countries === 1 ? 'country' : 'countries'}</span>
              </div>
              <h3 style={{ color: '#fff' }}>{r.region}</h3>
              <p style={{ color: 'var(--on-dark-muted)' }}>{r.blurb}</p>
            </div>
          ))}
        </Reveal>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/impact" className="btn btn--white btn--lg">
            See the Interactive Globe <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
