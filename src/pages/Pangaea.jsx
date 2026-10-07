import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DriftGlobe from '../components/pangaea/DriftGlobe.jsx';
import { TOTALS } from '../data/stats.js';
import { ORG } from '../data/site.js';
import { PATHWAYS } from '../data/involvement.js';
import '../styles/pangaea.css';

const volunteerUrl = PATHWAYS.find((p) => p.id === 'volunteer').url;

// The four steps from the Mission page, in plain words.
const PROCESS = [
  'We partner with hospitals and clinics that have extra supplies.',
  'We pick up the supplies and store them in a warehouse.',
  'We check that everything is safe to use, then pack it.',
  'We ship it to a clinic, or to a partner group that delivers it.',
];

const SHIPMENTS = [
  ['Honduras', 'A shipment every month, run by our Ohio State chapter.'],
  ['Nigeria', 'More than 60 pallets, worth over $573,000, in July 2025.'],
  ['Ghana', 'A 20-foot container of medical aid, with the Ghana Ministry of Health.'],
];

export default function Pangaea() {
  const yearsRef = useRef(null);
  const stepsRef = useRef(null);
  const [playKey, setPlayKey] = useState(0);
  // Phones get the globe's story as a short film instead of following
  // scroll; same breakpoint as the stylesheet.
  const [isPhone, setIsPhone] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 899px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 899px)');
    const on = () => setIsPhone(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  return (
    <div className="pg">
      <div className="pg-story">
        {/* The globe stays in view and follows whichever section you're reading. */}
        <aside className="pg-aside" aria-label="Map">
          <div className="pg-globe">
            <DriftGlobe stepsRef={stepsRef} yearsRef={yearsRef} film={isPhone} playKey={playKey} />
          </div>
          <div className="pg-caption">
            <div className="pg-caption__row">
              <p className="pg-caption__time">
                Map: <strong ref={yearsRef}>About 200 million years ago</strong>
              </p>
              {isPhone && (
                <button type="button" className="pg-replay" onClick={() => setPlayKey((k) => k + 1)}>
                  Play again
                </button>
              )}
            </div>
            <p>
              Our name and logo come from Pangaea, the one landmass that held every continent about
              200 million years ago.{' '}
              <span className="pg-wide-only">Scroll and the map follows along.</span>
            </p>
          </div>
        </aside>

        <div className="pg-steps" ref={stepsRef}>
          <section className="pg-step pg-step--hero">
            <h1 className="pg-title">We send unused medical supplies to clinics that need them</h1>
            <p>
              Blueprints for Pangaea is a nonprofit run by college students. We started at the
              University of Michigan in {TOTALS.founded}.
            </p>
            <ul className="pg-facts">
              <li><strong>{TOTALS.suppliesValueShort}</strong> in supplies</li>
              <li><strong>{TOTALS.countries}+</strong> countries</li>
              <li><strong>{TOTALS.chapters}</strong> chapters</li>
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
              ${Math.round(TOTALS.suppliesValue).toLocaleString('en-US')} worth so far, to more
              than {TOTALS.countries} countries. Each line on the map is a shipment. A few of them:
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
              Email <a href={`mailto:${ORG.email}`}>{ORG.email}</a> and we’ll arrange a pickup.{' '}
              <Link to="/get-involved#supplies">See what we accept</Link>.
            </p>
            <h2 className="pg-step__second">Want to give money?</h2>
            <p>Gifts are tax-deductible.</p>
            <Link to="/donate" className="btn btn--primary btn--lg pg-step__btn">Donate</Link>
            <p className="pg-small">
              You can also <Link to="/get-involved#chapter">start a chapter</Link> or{' '}
              <a href={volunteerUrl} target="_blank" rel="noreferrer">volunteer</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
