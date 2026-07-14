import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { IMPACT_STATS } from '../../data/stats.js';
import { REGION_SUMMARY } from '../../data/destinations.js';

export default function GlobalImpact() {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow eyebrow--center">Our global reach</span>
          <h2 className="section-title">Care that travels well.</h2>
          <p>
            What began in one campus warehouse now reaches clinics on five
            continents — carried there by students, partners, and supporters
            like you.
          </p>
        </Reveal>

        <Reveal className="stat-band" delay={0.1}>
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="stat-tile">
              <div className="stat-tile__value">{stat.value}</div>
              <span className="stat-tile__label">{stat.label}</span>
              <span className="stat-tile__sub">{stat.sub}</span>
            </div>
          ))}
        </Reveal>

        <div className="grid-3" style={{ marginTop: '3rem' }}>
          {REGION_SUMMARY.slice(0, 3).map((r, i) => (
            <Reveal
              className="feature-card"
              key={r.region}
              delay={0.12 + i * 0.08}
            >
              <div className="feature-card__count">
                {r.countries}<span>{r.countries === 1 ? 'country' : 'countries'}</span>
              </div>
              <h3>{r.region}</h3>
              <p>{r.blurb}</p>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ textAlign: 'center', marginTop: '3rem' }} delay={0.2}>
          <Link to="/impact" className="btn btn--dark btn--lg">
            Explore the interactive globe <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
