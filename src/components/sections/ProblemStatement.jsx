import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';

export default function ProblemStatement() {
  return (
    <section className="section section--soft">
      <div className="container split split--media-right">
        <Reveal className="prose">
          <span className="eyebrow">The Problem</span>
          <h2 className="section-title" style={{ margin: '1rem 0 1.5rem' }}>
            Every year, over <span className="text-accent">5 million tons</span> of medical supplies are wasted.
          </h2>
          <p>
            Much of it is in-date, sealed, and perfectly usable — discarded simply because of
            hospital inventory rules. Meanwhile, clinics here at home and around the world go
            without the basics they need to care for patients.
          </p>
          <p>
            <strong>We bridge that gap.</strong> We recover usable supplies before they hit the
            landfill and get them to the people who need them most — cutting waste and saving
            lives in the same motion.
          </p>
          <div className="tag-row">
            <span className="tag">Less landfill waste</span>
            <span className="tag">More care delivered</span>
            <span className="tag">Zero cost to recipients</span>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/mission" className="btn btn--dark">How It Works <span className="arrow">→</span></Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="media-frame">
            <div className="media-frame__pattern" />
            <div className="media-frame__stat">
              <div className="big">5M</div>
              <span className="cap">Tons wasted every year</span>
            </div>
            <div className="media-badge">
              <span className="media-badge__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" />
                </svg>
              </span>
              <span className="media-badge__text">
                <strong>We intercept the surplus</strong>
                <span>and route it to vetted clinics</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
