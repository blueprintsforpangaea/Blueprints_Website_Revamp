import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import Reveal from '../components/ui/Reveal.jsx';
import DriftGlobe from '../components/pangaea/DriftGlobe.jsx';
import { STEPS } from '../components/pangaea/story.js';
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

function CountUp({ to, prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30% 0px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) { setVal(to); return undefined; }
    const c = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: setVal });
    return c.stop;
  }, [inView, reduce, to]);
  return <span ref={ref}>{prefix}{Math.round(val).toLocaleString('en-US')}</span>;
}

function Step({ children, className = '' }) {
  return (
    <section className={`pg-step ${className}`}>
      <Reveal className="pg-step__text" y={20}>{children}</Reveal>
    </section>
  );
}

export default function Pangaea() {
  const sectionsRef = useRef(null);
  const yearsRef = useRef(null);
  const [step, setStep] = useState(0);
  const onStep = useCallback((i) => setStep(i), []);

  return (
    <div className="pg">
      <header className="pg-nav">
        <Link to="/" className="pg-nav__brand">Blueprints for Pangaea</Link>
        <nav className="pg-nav__links" aria-label="Main">
          <Link to="/mission">What we do</Link>
          <Link to="/impact">Impact</Link>
          <Link to="/chapters">Chapters</Link>
          <Link to="/about">About</Link>
          <Link to="/get-involved">Get involved</Link>
        </nav>
        <Link to="/donate" className="btn btn--primary">Donate</Link>
      </header>

      <div className="pg-story">
        <div className="pg-stage">
          <DriftGlobe sectionsRef={sectionsRef} onStep={onStep} yearsRef={yearsRef} />

          {/* Drawing title block, in plain words: where you are, what the map shows. */}
          <div className="pg-titleblock" aria-hidden="true">
            <div className="pg-titleblock__name">{STEPS[step]?.sheet}</div>
            <div className="pg-titleblock__sheet">
              {step + 1} of {STEPS.length}
            </div>
            <div className="pg-titleblock__time">
              Map: <span ref={yearsRef}>About 200 million years ago</span>
            </div>
          </div>
        </div>

        <div className="pg-steps" ref={sectionsRef}>
          <Step className="pg-step--hero">
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
            <p className="pg-cue">Scroll down to see how it works <span aria-hidden="true">↓</span></p>
          </Step>

          <Step>
            <h2>Why “Pangaea”?</h2>
            <p>
              About 200 million years ago, all of Earth’s land was joined in one piece called
              Pangaea, Greek for “all the earth.” As you scroll, watch the continents drift apart
              into today’s map.
            </p>
          </Step>

          <Step>
            <h2>
              Every year, U.S. hospitals throw away over {(TOTALS.wasteTons / 1_000_000).toFixed(0)}{' '}
              million tons of medical supplies
            </h2>
            <p>Much of it was never opened. Meanwhile, clinics in many countries don’t have enough.</p>
          </Step>

          <Step>
            <h2>College students collect them</h2>
            <p>
              Students at {TOTALS.chapters} universities pick up unused supplies from hospitals near
              their campus. Each dot on the map is one of our chapters.
            </p>
            <Link to="/chapters" className="pg-link">See all {TOTALS.chapters} chapters <span aria-hidden="true">→</span></Link>
          </Step>

          <Step>
            <h2>How it works</h2>
            <ol className="pg-process">
              {PROCESS.map((text, i) => (
                <li key={text}>
                  <span className="pg-process__num">{i + 1}</span>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </Step>

          <Step>
            <h2>
              <CountUp to={Math.round(TOTALS.suppliesValue)} prefix="$" /> in supplies, sent to{' '}
              {TOTALS.countries}+ countries
            </h2>
            <p>Each line on the map is a shipment. A few of them:</p>
            <ul className="pg-ships">
              <li><strong>Honduras.</strong> A shipment every month, run by our Ohio State chapter.</li>
              <li><strong>Nigeria.</strong> More than 60 pallets, worth over $573,000, in July 2025.</li>
              <li><strong>Syria.</strong> Three shipments, including 3,000 pounds after the 2023 earthquake.</li>
            </ul>
            <Link to="/impact" className="pg-link">See all shipments <span aria-hidden="true">→</span></Link>
          </Step>

          <Step className="pg-step--end">
            <h2>Help us send the next shipment</h2>
            <div className="pg-help">
              <div>
                <h3>Have unused supplies?</h3>
                <p>
                  Email <a href={`mailto:${ORG.email}`}>{ORG.email}</a> and we’ll arrange a pickup.
                </p>
                <Link to="/get-involved#supplies" className="pg-link">What we accept <span aria-hidden="true">→</span></Link>
              </div>
              <div>
                <h3>Want to give money?</h3>
                <p>Gifts are tax-deductible.</p>
                <Link to="/donate" className="btn btn--primary btn--lg">Donate</Link>
              </div>
            </div>
            <p className="pg-more">
              You can also <Link to="/get-involved#chapter">start a chapter</Link> or{' '}
              <a href={volunteerUrl} target="_blank" rel="noreferrer">volunteer</a>.
            </p>
          </Step>
        </div>
      </div>
    </div>
  );
}
