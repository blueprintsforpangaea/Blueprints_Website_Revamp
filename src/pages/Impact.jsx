import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import ShipmentMapSection from '../components/sections/ShipmentMapSection.jsx';
import { IMPACT_STATS } from '../data/stats.js';
import { ORG } from '../data/site.js';

export default function Impact() {
  return (
    <article>
      <section className="globe-section">
        <div className="container">
          <Reveal className="globe-hero">
            <h1 className="globe-hero__title">Where our supplies have gone</h1>
            <p className="globe-hero__lead">
              The map shows our recorded shipments. Each line runs from the chapter that sent it,
              and the dots in the U.S. are our chapters. Click or tap a dot to see what we sent there.
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

      <section className="band-navy">
        <div className="container band-navy__split">
          <Reveal className="band-navy__text">
            <h2>Have supplies to give?</h2>
            <p>
              We’d love to work with you. If your hospital or company has unused inventory, email{' '}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a> and we’ll arrange a pickup.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="btn-row">
            <Link to="/get-involved#supplies" className="btn btn--light btn--lg">What we accept</Link>
            <Link to="/donate" className="btn btn--ghost btn--lg">Donate money</Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
