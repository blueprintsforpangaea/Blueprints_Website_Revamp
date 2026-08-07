import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import ImpactGlobe from '../components/globe/ImpactGlobe.jsx';
import RecentShipments from '../components/sections/RecentShipments.jsx';
import { IMPACT_STATS, TOTALS } from '../data/stats.js';
import { DESTINATIONS, REGION_SUMMARY } from '../data/destinations.js';
import { PARTNERSHIPS } from '../data/partnerships.js';
import { DONATE_URL } from '../data/site.js';

// International destinations, de-duplicated — several countries
// received more than one shipment.
const COUNTRIES = [
  ...new Set(
    DESTINATIONS.filter((d) => d.region !== 'United States').map((d) => d.country),
  ),
];

const PROJECT_CURE = PARTNERSHIPS.find((p) => p.id === 'project-cure');

export default function Impact() {
  return (
    <article className="page--impact">
      {/* ---------- Globe hero ---------- */}
      <section className="globe-section">
        <div className="container">
          <div className="globe-hero">
            <Reveal>
              <span className="eyebrow">Our Impact</span>
              <h1 className="page-header__title display" style={{ fontSize: 'clamp(2.6rem,6vw,4.4rem)', color: '#fff', margin: '1rem 0 1.1rem' }}>
                From Ann Arbor<br />to the <span className="text-accent">world</span>
              </h1>
              <p className="lead" style={{ color: 'var(--on-dark-muted)' }}>
                Every arc is a shipment. Every dot is a clinic, hospital, or relief
                site that received supplies we rescued from the waste stream. Drag
                to spin the globe and explore where we work.
              </p>

              <div className="globe-legend">
                <span className="globe-legend__item">
                  <span className="globe-legend__dot" style={{ background: '#cbdbff' }} /> HQ · Ann Arbor
                </span>
                <span className="globe-legend__item">
                  <span className="globe-legend__dot" style={{ background: '#0069f3' }} /> Destination clinics
                </span>
                <span className="globe-legend__item">
                  <span className="globe-legend__dot" style={{ background: 'linear-gradient(90deg,#cbdbff,#0069f3)' }} /> Active shipment routes
                </span>
              </div>

              <div className="dest-chips">
                {COUNTRIES.map((country) => (
                  <span className="dest-chip" key={country}>{country}</span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <ImpactGlobe />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Stat band ---------- */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="stat-band">
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label} className="stat-tile">
                <div className="stat-tile__value">{stat.value}</div>
                <span className="stat-tile__label">{stat.label}</span>
                <span className="stat-tile__sub">{stat.sub}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Region breakdown ---------- */}
      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">Where we work</span>
            <h2 className="section-title">Impact by region</h2>
            <p>Five continents, one mission — surplus turned into care wherever it's needed.</p>
          </Reveal>
          <div className="grid-3">
            {REGION_SUMMARY.map((r, i) => (
              <Reveal as="div" className="feature-card" key={r.region} delay={(i % 3) * 0.08}>
                <div className="feature-card__count">
                  {r.countries}<span>{r.countries === 1 ? 'country' : 'countries'}</span>
                </div>
                <h3>{r.region}</h3>
                <p>{r.blurb}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Project C.U.R.E. ---------- */}
      {PROJECT_CURE && (
        <section className="section">
          <div className="container narrow">
            <Reveal className="feature-panel">
              <span className="eyebrow">Longest-running partnership</span>
              <h2 className="section-title">{PROJECT_CURE.name}</h2>
              <p className="lead">{PROJECT_CURE.description}</p>
              <div className="feature-panel__stats">
                <div>
                  <strong>${(TOTALS.projectCureValue / 1_000_000).toFixed(0)}M+</strong>
                  <span>Reallocated together</span>
                </div>
                <div>
                  <strong>{TOTALS.projectCureSince}</strong>
                  <span>Partnership expanded</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <RecentShipments />

      {/* ---------- Partner CTA ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="cta-banner">
            <h2>Put your surplus on the map</h2>
            <p>
              If your organization has medical supplies to give — or a community that
              needs them — let's add the next arc to this globe together.
            </p>
            <div className="cta-banner__buttons">
              <Link to="/get-involved" className="btn btn--primary btn--lg">Partner with us</Link>
              <a href={DONATE_URL} target="_blank" rel="noreferrer" className="btn btn--ghost btn--lg">
                Fund a shipment
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
