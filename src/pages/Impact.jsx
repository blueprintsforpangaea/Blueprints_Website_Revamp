import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import ImpactGlobe from '../components/globe/ImpactGlobe.jsx';
import RecentShipments from '../components/sections/RecentShipments.jsx';
import { IMPACT_STATS, TOTALS } from '../data/stats.js';
import { DESTINATIONS } from '../data/destinations.js';
import { PARTNERSHIPS } from '../data/partnerships.js';

// International destinations, de-duplicated. Several countries
// received more than one shipment.
const COUNTRIES = [
  ...new Set(
    DESTINATIONS.filter((d) => d.region !== 'United States').map((d) => d.country),
  ),
];

const PROJECT_CURE = PARTNERSHIPS.find((p) => p.id === 'project-cure');

export default function Impact() {
  return (
    <article>
      <section className="globe-section">
        <div className="container globe-hero">
          <Reveal>
            <h1 className="globe-hero__title">Where our supplies have gone</h1>
            <p className="globe-hero__lead">
              Each line runs from our Ann Arbor headquarters to a place we’ve shipped to. Drag to
              turn the globe. Countries outside the U.S.:
            </p>
            <p className="globe-hero__countries">{COUNTRIES.join(', ')}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <ImpactGlobe />
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal className="stat-row">
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label} className="stat">
                <div className="stat__value">{stat.value}</div>
                <div className="stat__label">{stat.label}</div>
                <div className="stat__sub">{stat.sub}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {PROJECT_CURE && (
        <section className="section section--soft">
          <div className="container split">
            <Reveal className="prose">
              <h2 className="section-title">{PROJECT_CURE.name}</h2>
              <p>{PROJECT_CURE.description}</p>
            </Reveal>
            <Reveal className="stat-row stat-row--stack" delay={0.1}>
              <div className="stat">
                <div className="stat__value">
                  ${(TOTALS.projectCureValue / 1_000_000).toFixed(0)} million+
                </div>
                <div className="stat__label">in supplies reallocated together</div>
              </div>
              <div className="stat">
                <div className="stat__value">{TOTALS.projectCureSince}</div>
                <div className="stat__label">the year the partnership expanded</div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <RecentShipments />

      <section className="section section--soft">
        <div className="container narrow center">
          <Reveal>
            <h2 className="section-title">Have supplies to donate?</h2>
            <p className="lead">
              Email us and we’ll arrange a pickup.
            </p>
            <div className="btn-row btn-row--center">
              <Link to="/get-involved#supplies" className="btn btn--dark">Donate supplies</Link>
              <Link to="/donate" className="link-arrow">Or donate money <span className="arrow">→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
