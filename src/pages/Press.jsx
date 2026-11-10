import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import PressList from '../components/ui/PressList.jsx';
import { PRESS_ITEMS, PUBLICATIONS } from '../data/press.js';
import { ORG } from '../data/site.js';

const FEATURED = PRESS_ITEMS.find((p) => p.featured);
// Stories with a link first; the few we only have as clippings go last.
const REST = PRESS_ITEMS.filter((p) => !p.featured).sort((a, b) => Boolean(b.url) - Boolean(a.url));
const PAPERS = PUBLICATIONS.map((p) => ({
  id: p.id, outlet: p.venue, date: p.date, headline: p.title, byline: p.authors, excerpt: p.summary, url: p.url,
}));

export default function Press() {
  return (
    <article>
      <PageHeader title="Press">
        News coverage of our work, and papers and articles written by our members.
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

      {/* ---------- Written by our members ---------- */}
      <section className="section section--soft section--tight">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">Our publications</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <PressList items={PAPERS} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Full coverage list ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">More coverage</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <PressList items={REST} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Media inquiries ---------- */}
      <section className="section section--soft">
        <div className="container">
          <Reveal className="note-row" delay={0.1}>
            <div>
              <h2>Media inquiries</h2>
              <p>Reporters can reach us at {ORG.email}.</p>
            </div>
            <a href={`mailto:${ORG.email}`} className="btn btn--dark">Email us</a>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
