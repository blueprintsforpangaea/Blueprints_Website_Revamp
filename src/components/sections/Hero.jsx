import { Link } from 'react-router-dom';
import { HERO_STATS } from '../../data/stats.js';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Blueprints for Pangaea</p>
          <h1 className="hero__title">
            Saving Lives<br />One Box<br />at a Time
          </h1>
          <p className="hero__subtitle">
            We rescue surplus medical supplies from U.S. hospitals and
            redistribute them to clinics and communities that need them most —
            here at home and around the world.
          </p>
          <div className="hero__ctas">
            <Link to="/donate" className="btn btn--primary">Donate Today</Link>
            <Link to="/get-involved" className="btn btn--ghost">Get Involved</Link>
          </div>
        </div>
        <div className="hero__art" aria-hidden="true">📦</div>
      </div>

      <div className="container">
        <div className="hero-stats">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <div className="hero-stat__value">{stat.value}</div>
              <span className="hero-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
