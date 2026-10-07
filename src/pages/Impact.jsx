import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import ShipmentMapSection from '../components/sections/ShipmentMapSection.jsx';
import { IMPACT_STATS, TOTALS } from '../data/stats.js';
import { PARTNERSHIPS } from '../data/partnerships.js';

const PROJECT_CURE = PARTNERSHIPS.find((p) => p.id === 'project-cure');

export default function Impact() {
  return (
    <article>
      <section className="globe-section">
        <div className="container">
          <Reveal className="globe-hero">
            <h1 className="globe-hero__title">Where our supplies have gone</h1>
            <p className="globe-hero__lead">
              The map shows the shipments we have records for. Each line runs from the chapter
              that sent it; the dots in the U.S. are our chapters.
            </p>
            <ul className="impact-facts">
              {IMPACT_STATS.map((stat) => (
                <li key={stat.label}><strong>{stat.value}</strong>{stat.label}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ShipmentMapSection />

      {/* Our largest partner and the supplies ask, side by side. */}
      <section className="section section--soft section--tight">
        <div className="container split split--top">
          {PROJECT_CURE && (
            <Reveal className="prose">
              <h2 className="section-title section-title--sm">{PROJECT_CURE.name}</h2>
              <p>{PROJECT_CURE.description}</p>
              <p>
                <strong>${(TOTALS.projectCureValue / 1_000_000).toFixed(0)} million+</strong> in
                supplies reallocated together since {TOTALS.projectCureSince}.
              </p>
            </Reveal>
          )}
          <Reveal className="prose" delay={0.08}>
            <h2 className="section-title section-title--sm">Have supplies to donate?</h2>
            <p>Email us and we’ll arrange a pickup.</p>
            <div className="btn-row">
              <Link to="/get-involved#supplies" className="btn btn--dark">Donate supplies</Link>
              <Link to="/donate" className="link-arrow">Or donate money <span className="arrow">→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
