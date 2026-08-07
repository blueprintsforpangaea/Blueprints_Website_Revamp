import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import PressList from '../components/ui/PressList.jsx';
import { PRESS_ITEMS, PRESS_UPDATES } from '../data/press.js';
import { ORG } from '../data/site.js';

const FEATURED = PRESS_ITEMS.find((p) => p.featured);
const REST = PRESS_ITEMS.filter((p) => !p.featured);

export default function Press() {
  return (
    <article>
      <PageHeader eyebrow="Press" title="In the news">
        Coverage of our students, our shipments, and the fight against medical waste.
      </PageHeader>

      {/* ---------- Featured story ---------- */}
      {FEATURED && (
        <section className="section section--tight">
          <div className="container">
            <Reveal>
              <a
                className="press-feature"
                href={FEATURED.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="press-feature__outlet">{FEATURED.outlet}</span>
                <h2 className="press-feature__headline">{FEATURED.headline}</h2>
                <p className="press-feature__excerpt">{FEATURED.excerpt}</p>
                <span className="press-feature__meta">
                  {FEATURED.byline} · {FEATURED.date}
                </span>
                <span className="link-arrow">
                  Read the story <span className="arrow">→</span>
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- Full coverage list ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Coverage</span>
            <h2 className="section-title">More about our work</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <PressList items={REST} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Chapter updates ---------- */}
      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Updates</span>
            <h2 className="section-title">From the chapters</h2>
          </Reveal>
          <div className="grid-3">
            {PRESS_UPDATES.map((u, i) => (
              <Reveal as="article" className="update-card" key={u.id} delay={(i % 3) * 0.08}>
                <span className="update-card__kind">{u.kind}</span>
                <h3>{u.title}</h3>
                <p>{u.detail}</p>
                {u.date && <span className="update-card__date">{u.date}</span>}
              </Reveal>
            ))}
          </div>

          <Reveal className="cta-banner" delay={0.1} style={{ marginTop: '3.5rem' }}>
            <h2>Media inquiries</h2>
            <p>
              Writing about medical waste, global health, or student-led nonprofits? We'd love to
              talk.
            </p>
            <div className="cta-banner__buttons">
              <a href={`mailto:${ORG.email}`} className="btn btn--primary btn--lg">
                {ORG.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
