import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import ChaptersList from '../components/sections/ChaptersList.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { CHAPTERS, EMERGING_CHAPTERS } from '../data/chapters.js';
import { TOTALS } from '../data/stats.js';

export default function Chapters() {
  const { chapterSlug } = useParams();

  if (chapterSlug) {
    const chapter = CHAPTERS.find((c) => c.slug === chapterSlug);
    if (!chapter) return <ChapterNotFound />;
    return <ChapterDetail chapter={chapter} />;
  }

  return (
    <article>
      <PageHeader eyebrow="Our network" title={`${TOTALS.chapters} chapters, one mission`}>
        From our University of Michigan headquarters to campuses coast to coast,{' '}
        {TOTALS.members}+ students keep supplies moving. Find yours — or start a new one.
      </PageHeader>
      <section className="section">
        <div className="container">
          <ChaptersList />

          {EMERGING_CHAPTERS.length > 0 && (
            <Reveal className="emerging" delay={0.1}>
              <span className="emerging__label">In formation</span>
              <p>
                {EMERGING_CHAPTERS.map((c) => `${c.name} (${c.since})`).join(' · ')}
              </p>
            </Reveal>
          )}

          <Reveal className="cta-banner" delay={0.1} style={{ marginTop: '3.5rem' }}>
            <h2>Don't see your school?</h2>
            <p>
              Bring Blueprints for Pangaea to your campus. We'll hand you the playbook and connect
              you to the network.
            </p>
            <div className="cta-banner__buttons">
              <Link to="/get-involved#chapter" className="btn btn--primary btn--lg">
                Start a chapter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

function ChapterDetail({ chapter }) {
  const facts = [
    chapter.since && { label: 'Established', value: chapter.since },
    chapter.members && { label: 'Members', value: chapter.members },
    chapter.valueShipped && { label: 'Supplies shipped', value: chapter.valueShipped },
  ].filter(Boolean);

  return (
    <article>
      <PageHeader eyebrow={chapter.isHQ ? 'Headquarters' : 'Chapter'} title={chapter.name}>
        {chapter.location}
      </PageHeader>

      <section className="section">
        <div className="container split">
          <Reveal className="prose">
            {chapter.logo && (
              <img className="chapter-detail__seal" src={chapter.logo} alt="" />
            )}

            {chapter.blurb ? (
              <p className="lead">{chapter.blurb}</p>
            ) : (
              <p className="lead">
                Our {chapter.name} chapter joined the network in {chapter.since} and is building
                its local partnerships and first shipments now.
              </p>
            )}

            {chapter.highlight && (
              <div className="chapter-detail__highlight">
                <span className="chapter-detail__highlight-label">Highlight</span>
                <p>{chapter.highlight}</p>
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {chapter.email && (
                <a href={`mailto:${chapter.email}`} className="btn btn--dark">
                  Contact this chapter
                </a>
              )}
              <Link to="/chapters" className="btn btn--outline">
                <span className="arrow arrow--back">←</span> All chapters
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {facts.length > 0 && (
              <dl className="spec-list">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {chapter.lead && (
              <div className="chapter-detail__block">
                <h3 className="side-head">Chapter lead</h3>
                <p>{chapter.lead}</p>
              </div>
            )}

            {chapter.partners?.length > 0 && (
              <div className="chapter-detail__block">
                <h3 className="side-head">Partners</h3>
                <ul className="plain-list">
                  {chapter.partners.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {chapter.instagram && (
              <div className="chapter-detail__block">
                <h3 className="side-head">Follow along</h3>
                <a
                  href={`https://www.instagram.com/${chapter.instagram}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{chapter.instagram}
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </article>
  );
}

function ChapterNotFound() {
  return (
    <article>
      <PageHeader eyebrow="404" title="Chapter not found">
        We couldn't find that chapter.
      </PageHeader>
      <section className="section">
        <div className="container narrow">
          <Link to="/chapters" className="btn btn--dark">
            <span className="arrow arrow--back">←</span> Back to all chapters
          </Link>
        </div>
      </section>
    </article>
  );
}
