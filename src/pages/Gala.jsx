import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';

const TIERS = [
  { name: 'Individual', price: '$75', perks: ['Dinner & program', 'Impact reception', 'Name in program'] },
  { name: 'Supporter', price: '$250', perks: ['Two seats', 'Premium reception', 'Recognition wall'], featured: true },
  { name: 'Sponsor Table', price: '$2,000', perks: ['Table for eight', 'Logo placement', 'Speaking moment'] },
];

export default function Gala() {
  return (
    <article>
      <PageHeader eyebrow="Annual Gala" title="An evening for global health">
        Join students, partners, and supporters for a night celebrating the supplies we've
        rescued — and funding the shipments still to come.
      </PageHeader>

      <section className="section">
        <div className="container grid-3">
          <Reveal as="div" className="feature-card">
            <div className="feature-card__icon">📅</div>
            <h3>When</h3>
            <p>Spring 2026 · Date to be announced. Join our list to be first to know.</p>
          </Reveal>
          <Reveal as="div" className="feature-card" delay={0.08}>
            <div className="feature-card__icon">📍</div>
            <h3>Where</h3>
            <p>Ann Arbor, Michigan · Venue details shared with ticket holders.</p>
          </Reveal>
          <Reveal as="div" className="feature-card" delay={0.16}>
            <div className="feature-card__icon">🎯</div>
            <h3>Why</h3>
            <p>Proceeds directly fund shipping and logistics for partner clinics worldwide.</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">Tickets & Sponsorships</span>
            <h2 className="section-title">Reserve your seat</h2>
          </Reveal>
          <div className="grid-3">
            {TIERS.map((t, i) => (
              <Reveal as="div" key={t.name} delay={(i % 3) * 0.08}
                className="pathway-card"
                style={t.featured ? { borderColor: 'var(--teal)', boxShadow: 'var(--shadow)' } : undefined}>
                {t.featured && <span className="tag" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>Most popular</span>}
                <h3>{t.name}</h3>
                <div style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: '2rem', color: 'var(--ink)', margin: '0.25rem 0 1rem' }}>{t.price}</div>
                <ul style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem', flex: 1 }}>
                  {t.perks.map((p) => (
                    <li key={p} style={{ color: 'var(--muted)' }}>✓ {p}</li>
                  ))}
                </ul>
                <Link to="/donate" className={`btn ${t.featured ? 'btn--primary' : 'btn--outline'}`}>Reserve</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
