import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { PRESS_ITEMS } from '../data/press.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Press() {
  usePageMeta(
    'Press',
    'News coverage of Blueprints for Pangaea — students rescuing surplus medical supplies and the fight against medical waste.',
  );
  return (
    <article>
      <PageHeader eyebrow="Press" title="In the news">
        Coverage of our students, shipments, and the fight against medical waste.
      </PageHeader>

      <section className="section">
        <div className="container">
          <Reveal className="press-list">
            {PRESS_ITEMS.map((item) => (
              <div key={item.id} className="press-item">
                <a href={item.url} target="_blank" rel="noreferrer">
                  <span className="press-item__outlet">{item.outlet}</span>
                  <span className="press-item__headline">{item.headline}</span>
                  <span className="press-item__date">{item.date}</span>
                </a>
              </div>
            ))}
          </Reveal>

          <Reveal className="cta-banner" delay={0.1} style={{ marginTop: '3.5rem' }}>
            <div className="cta-banner__glow" />
            <h2>Media inquiries</h2>
            <p>Writing about medical waste, global health, or student-led nonprofits? We'd love to talk.</p>
            <div className="cta-banner__buttons">
              <a href="mailto:press@blueprintsforpangaea.org" className="btn btn--primary btn--lg">Contact Press Team</a>
              <Link to="/impact" className="btn btn--ghost btn--lg">See Our Impact</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
