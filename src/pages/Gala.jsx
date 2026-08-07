import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { GALA, GALA_TRACKS, GALA_SPONSORS } from '../data/gala.js';
import { ORG } from '../data/site.js';

export default function Gala() {
  return (
    <article>
      <PageHeader eyebrow={`${GALA.year} Blueprints Gala`} title={GALA.name}>
        {GALA.intro}
      </PageHeader>

      {/* ---------- When / where ---------- */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="event-bar">
            <div className="event-bar__item">
              <span className="event-bar__label">Date</span>
              <strong>{GALA.date}</strong>
            </div>
            <div className="event-bar__item">
              <span className="event-bar__label">Time</span>
              <strong>{GALA.time}</strong>
            </div>
            <div className="event-bar__item">
              <span className="event-bar__label">Venue</span>
              <strong>{GALA.venue}</strong>
              <span className="event-bar__sub">{GALA.city}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Three ways to take part ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">Take part</span>
            <h2 className="section-title">Three ways in</h2>
            <p>Attend the reception, pitch a venture, or present your research.</p>
          </Reveal>

          <div className="grid-3">
            {GALA_TRACKS.map((t, i) => (
              <Reveal
                as="div"
                className={`track-card ${t.primary ? 'track-card--primary' : ''}`}
                key={t.id}
                delay={(i % 3) * 0.08}
              >
                <span className="track-card__num">{t.num}</span>
                <h3>{t.name}</h3>
                <p>{t.body}</p>
                {t.deadline && (
                  <span className="track-card__deadline">
                    Applications close {t.deadline}
                  </span>
                )}
                <a
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn ${t.primary ? 'btn--primary' : 'btn--outline'}`}
                >
                  {t.cta}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Sponsors ---------- */}
      <section className="section section--soft">
        <div className="container narrow" style={{ textAlign: 'center' }}>
          <Reveal>
            <span className="eyebrow eyebrow--center">With support from</span>
            <div className="sponsor-row">
              {GALA_SPONSORS.map((s) => (
                <span className="sponsor-row__name" key={s}>{s}</span>
              ))}
            </div>
            <p style={{ marginTop: '2rem', color: 'var(--muted)' }}>
              Interested in sponsoring the {GALA.year} gala? Reach out at{' '}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
