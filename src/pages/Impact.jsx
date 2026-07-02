import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import Icon from '../components/ui/Icon.jsx';
import ImpactGlobe from '../components/globe/ImpactGlobe.jsx';
import RecentShipments from '../components/sections/RecentShipments.jsx';
import { IMPACT_STATS } from '../data/stats.js';
import { DESTINATIONS, REGION_SUMMARY } from '../data/destinations.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Impact() {
  usePageMeta(
    'Our Impact',
    'Explore the interactive globe of shipments — every arc is rescued medical supplies reaching a clinic across 15+ countries and 5 continents.',
  );
  return (
    <article className="page--impact">
      {/* ---------- Globe hero ---------- */}
      <section className="globe-section">
        <div className="page-header__glow" />
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
                  <span className="globe-legend__dot" style={{ background: '#7fb2ff' }} /> HQ · Ann Arbor
                </span>
                <span className="globe-legend__item">
                  <span className="globe-legend__dot" style={{ background: '#2e6be6' }} /> Destination clinics
                </span>
                <span className="globe-legend__item">
                  <span className="globe-legend__dot" style={{ background: 'linear-gradient(90deg,#7fb2ff,#2e6be6)' }} /> Active shipment routes
                </span>
              </div>

              <div className="dest-chips">
                {DESTINATIONS.filter((d) => d.region !== 'USA').map((d) => (
                  <span className="dest-chip" key={d.city}>{d.country}</span>
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
            <span className="eyebrow eyebrow--center">Where We Work</span>
            <h2 className="section-title">Impact by region</h2>
            <p>Five continents, one mission — surplus turned into care wherever it's needed.</p>
          </Reveal>
          <div className="grid-3">
            {REGION_SUMMARY.map((r, i) => (
              <Reveal as="div" className="feature-card" key={r.region} delay={(i % 3) * 0.08}>
                <div className="feature-card__icon"><Icon name="globe" /></div>
                <h3>{r.region}</h3>
                <p style={{ marginBottom: '0.75rem' }}>{r.blurb}</p>
                <span className="tag">{r.countries} {r.countries === 1 ? 'country / region' : 'countries'}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RecentShipments />

      {/* ---------- Partner CTA ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="cta-banner">
            <div className="cta-banner__glow" />
            <h2>Put your surplus on the map</h2>
            <p>
              If your organization has medical supplies to give — or a community that
              needs them — let's add the next arc to this globe together.
            </p>
            <div className="cta-banner__buttons">
              <Link to="/get-involved" className="btn btn--primary btn--lg">Partner With Us</Link>
              <Link to="/donate" className="btn btn--ghost btn--lg">Fund a Shipment</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
