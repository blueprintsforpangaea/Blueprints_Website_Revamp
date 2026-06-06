import { Link } from 'react-router-dom';

export default function Hero() {
  // Tagline + headline impact stats from current site.
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Saving Lives One Box at a Time</h1>
        <p className="hero__subtitle">
          Redistributing surplus medical supplies to clinics and hospitals
          around the world.
        </p>
        <div className="hero__ctas">
          <Link to="/get-involved" className="btn btn--primary">Get Involved</Link>
          <Link to="/donate" className="btn btn--secondary">Donate</Link>
        </div>
      </div>
      <div className="hero__metrics">
        {/* Filled by <Stats /> below or inline counters */}
      </div>
    </section>
  );
}
