import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { GALA, GALA_TRACKS, GALA_SPONSORS } from '../data/gala.js';
import { ORG } from '../data/site.js';

export default function Gala() {
  return (
    <article>
      <PageHeader title={GALA.name}>
        {GALA.intro}
      </PageHeader>

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

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">Ways to take part</h2>
          </Reveal>

          <div className="grid-3">
            {GALA_TRACKS.map((t, i) => (
              <Reveal
                as="div"
                className={`track-card ${t.primary ? 'track-card--primary' : ''}`}
                key={t.id}
                delay={(i % 3) * 0.08}
              >
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
                  className={`btn ${t.primary ? 'btn--dark' : 'btn--outline'}`}
                >
                  {t.cta}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container narrow center">
          <Reveal>
            <h2 className="label">Sponsors</h2>
            <div className="sponsor-row">
              {GALA_SPONSORS.map((s) => (
                <span className="sponsor-row__name" key={s}>{s}</span>
              ))}
            </div>
            <p className="muted" style={{ marginTop: '2rem' }}>
              Interested in sponsoring the {GALA.year} gala? Email{' '}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
