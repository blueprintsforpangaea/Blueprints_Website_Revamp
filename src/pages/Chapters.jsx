import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import ChaptersList from '../components/sections/ChaptersList.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import EmailLink from '../components/ui/EmailLink.jsx';
import { CHAPTERS, EMERGING_CHAPTERS } from '../data/chapters.js';
import { logoFor } from '../assets/chapters/logos.js';
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
      <PageHeader title="Our chapters">
        {TOTALS.chapters} chapters and {TOTALS.members}+ students. Headquarters is the founding
        chapter at the University of Michigan.
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

          <Reveal className="note-row" delay={0.1}>
            <div>
              <h2>Don’t see your school?</h2>
              <p>
                Start one. An expansion manager from headquarters meets with new chapters every
                week.
              </p>
            </div>
            <Link to="/get-involved#chapter" className="btn btn--dark">Start a chapter</Link>
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
      <PageHeader
        title={chapter.name}
      >
        {chapter.location}
      </PageHeader>

      <section className="section">
        <div className="container split split--top">
          <Reveal className="prose">
            {logoFor(chapter.slug) && (
              <img className="chapter-detail__seal" src={logoFor(chapter.slug)} alt="" />
            )}

            {/* Chapters that haven't published a description get the one
                fact we do have, rather than an invented sentence. */}
            {chapter.blurb ? (
              <p className="lead">{chapter.blurb}</p>
            ) : (
              <p className="lead">
                {chapter.name} joined the Blueprints network in {chapter.since}. Reach out to the
                chapter directly to learn what they're working on.
              </p>
            )}

            {chapter.highlight && (
              <div className="chapter-detail__highlight">
                <h3 className="label">Highlight</h3>
                <p>{chapter.highlight}</p>
              </div>
            )}

            {chapter.email && (
              <div className="chapter-detail__block">
                <h3 className="label">Email this chapter</h3>
                <EmailLink email={chapter.email} />
              </div>
            )}
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
                <h3 className="label">Chapter lead</h3>
                <p>{chapter.lead}</p>
              </div>
            )}

            {chapter.partners?.length > 0 && (
              <div className="chapter-detail__block">
                <h3 className="label">Partners</h3>
                <ul className="plain-list">
                  {chapter.partners.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {chapter.instagram && (
              <div className="chapter-detail__block">
                <h3 className="label">Instagram</h3>
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
        <div className="container page-next">
          <Link to="/chapters" className="link-arrow">See all chapters <span className="arrow">→</span></Link>
        </div>
      </section>
    </article>
  );
}

function ChapterNotFound() {
  return (
    <article>
      <PageHeader title="Chapter not found">
        We couldn’t find that chapter. It may have moved or been renamed.
      </PageHeader>
      <section className="section section--tight">
        <div className="container">
          <Link to="/chapters" className="link-arrow">See all chapters <span className="arrow">→</span></Link>
        </div>
      </section>
    </article>
  );
}
