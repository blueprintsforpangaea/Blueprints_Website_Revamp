import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DriftGlobe from '../components/pangaea/DriftGlobe.jsx';
import CountUp from '../components/ui/CountUp.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { shipmentHeadline, ShipmentVisual } from '../components/ui/ShipmentCard.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';
import { TOTALS } from '../data/stats.js';
import { ORG } from '../data/site.js';
import { VOLUNTEER_URL } from '../data/involvement.js';
import { RECENT_SHIPMENTS } from '../data/shipments.js';

// The four steps from the Mission page, in plain words.
const PROCESS = [
  'We partner with hospitals and clinics that have extra supplies.',
  'We pick up the supplies and store them in a warehouse.',
  'We check that everything is safe to use, then pack it.',
  'We ship it to a clinic, or to a partner group that delivers it.',
];

const SHIPMENTS = [
  ['Nigeria', 'More than 60 pallets, worth over $573,000, in July 2025.'],
  ['Honduras', 'A shipment every month, run by our Ohio State chapter.'],
];

export default function Pangaea() {
  const stepsRef = useRef(null);
  const [playKey, setPlayKey] = useState(0);
  // Phones get the globe's story as a short film instead of following
  // scroll; same breakpoint as the stylesheet.
  const isPhone = useMediaQuery('(max-width: 899px)');

  return (
    <div className="pg">
      <div className="pg-story">
        {/* The globe stays in view and follows whichever section you're reading. */}
        <aside className="pg-aside" aria-label="Map">
          <div className="pg-globe">
            <DriftGlobe stepsRef={stepsRef} film={isPhone} playKey={playKey} />
          </div>
          <div className="pg-caption">
            <p>
              Our name comes from Pangaea, the single landmass that once held every continent. The
              lines show where our chapters have shipped supplies.
            </p>
            {isPhone && (
              <button type="button" className="pg-replay" onClick={() => setPlayKey((k) => k + 1)}>
                Play again
              </button>
            )}
            <p className="pg-wide-only"><strong>Scroll and learn more about Blueprints.</strong> Drag the globe to spin it.</p>
          </div>
        </aside>

        <div className="pg-steps" ref={stepsRef}>
          <section className="pg-step pg-step--hero">
            <h1 className="pg-title">Saving lives one box at a time</h1>
            <p>
              We send unused medical supplies to clinics that need them. Blueprints for Pangaea is a
              nonprofit run by college students, started at the University of Michigan in{' '}
              {TOTALS.founded}.
            </p>
            <ul className="pg-facts">
              <li className="pg-facts__lead">
                <strong><CountUp to={Math.floor(TOTALS.suppliesValue / 1_000_000)} prefix="$" suffix="M+" /></strong>
                in medical supplies redistributed
              </li>
              <li><strong><CountUp to={TOTALS.countries} suffix="+" /></strong> countries</li>
              <li><strong><CountUp to={TOTALS.chapters} /></strong> chapters</li>
              <li><strong><CountUp to={TOTALS.members} suffix="+" /></strong> members</li>
            </ul>
            <div className="pg-ctas">
              <Link to="/donate" className="btn btn--primary btn--lg">Donate</Link>
              <Link to="/get-involved#supplies" className="btn btn--dark btn--lg">Give supplies</Link>
            </div>
          </section>

          <section className="pg-step">
            <h2>How it works</h2>
            <p>
              U.S. hospitals throw away over {(TOTALS.wasteTons / 1_000_000).toFixed(0)} million tons
              of medical supplies a year, much of it never opened. Students at our{' '}
              {TOTALS.chapters} chapters, the dots on the map, collect some of it:
            </p>
            <ol className="pg-list pg-list--num">
              {PROCESS.map((text, i) => (
                <li key={text}><span className="pg-list__num">{i + 1}</span>{text}</li>
              ))}
            </ol>
          </section>

          <section className="pg-step">
            <h2>Where the supplies go</h2>
            <p>
              Clinics and hospitals in more than {TOTALS.countries} countries. Each line on the map
              is a shipment, for example:
            </p>
            <ul className="pg-list">
              {SHIPMENTS.map(([place, text]) => (
                <li key={place}><strong>{place}.</strong> {text}</li>
              ))}
            </ul>
            <Link to="/impact" className="pg-link">See all shipments →</Link>
          </section>

          <section className="pg-step">
            <h2>Have unused supplies?</h2>
            <p>
              Email <a href={`mailto:${ORG.email}`}>{ORG.email}</a> and we’ll arrange a pickup. <Link to="/get-involved#supplies">See what we accept</Link>.
            </p>
            <h2 className="pg-step__second">Want to give money?</h2>
            <p>Gifts are tax-deductible.</p>
            <Link to="/donate" className="btn btn--primary btn--lg pg-step__btn">Donate</Link>
            <p className="pg-small">
              You can also <Link to="/get-involved#chapter">start a chapter</Link> or{' '}
              <a href={VOLUNTEER_URL} target="_blank" rel="noreferrer">volunteer</a>.
            </p>
          </section>
        </div>
      </div>

      {/* Recent work, with photos, once the globe story ends. */}
      <section className="pg-recent">
        <div className="pg-recent__head">
          <h2>Recent shipments</h2>
          <Link to="/impact" className="pg-link">See all shipments →</Link>
        </div>
        {/* One fade for the row: cards scrolled off to the side on a
            phone would never count as "in view" on their own. */}
        <Reveal className="pg-recent__grid">
          {RECENT_SHIPMENTS.map((s) => (
            <article className="pg-recent__card" key={s.id}>
              <ShipmentVisual shipment={s} />
              <h3>{s.place}</h3>
              {shipmentHeadline(s) && <p className="pg-recent__figure">{shipmentHeadline(s)}</p>}
              {s.detail && <p>{s.detail}</p>}
            </article>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
