import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import ShipmentMapSection from '../components/sections/ShipmentMapSection.jsx';
import { IMPACT_STATS } from '../data/stats.js';

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

      <section className="section section--soft section--tight">
        <div className="container">
          <Reveal className="prose">
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
