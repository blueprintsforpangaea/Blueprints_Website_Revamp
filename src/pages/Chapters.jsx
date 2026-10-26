import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import ChaptersList from '../components/sections/ChaptersList.jsx';
import ChapterMap from '../components/pangaea/ChapterMap.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import EmailLink from '../components/ui/EmailLink.jsx';
import { CHAPTERS } from '../data/chapters.js';
import { logoFor, campusFor } from '../assets/chapters/logos.js';
import { chapterPhotos } from '../assets/photos.js';
import Photo from '../components/ui/Photo.jsx';
import Recruitment from '../components/sections/Recruitment.jsx';
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
      {/* Signature: every chapter on one map. */}
      <section className="chapmap-section">
        <div className="container">
          <p className="chapmap-section__hint">
            <span className="chapmap-section__wide">Click a school’s logo to see its chapter page.</span>
            <span className="chapmap-section__narrow">Tap a school’s logo to see its chapter page.</span>
          </p>
          <ChapterMap />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <ChaptersList />

        </div>
      </section>

      <section className="band-navy">
        <div className="container band-navy__split">
          <Reveal className="band-navy__text">
            <h2>Don’t see your school?</h2>
            <p>
              Start a chapter. An expansion manager from headquarters meets with new chapters every
              week.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/get-involved#chapter" className="btn btn--light btn--lg">Start a chapter</Link>
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

      {campusFor(chapter.slug) && (
        <div className="container">
          <img className="chapter-detail__campus" src={campusFor(chapter.slug)} alt={`${chapter.name} campus`} />
        </div>
      )}

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
                {chapter.name} started a chapter in {chapter.since}. Email the chapter to hear what
                they’re working on.
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
        {/* Headquarters recruits at U-M each semester. */}
        {chapter.isHQ && (
          <div className="container chapter-recruit" id="recruitment">
            <h2 className="section-title section-title--sm">Join headquarters</h2>
            <Recruitment />
          </div>
        )}

        {chapter.sections?.length > 0 && (
          <div className="container chapter-sections">
            {chapter.sections.map((sec) => (
              <Reveal as="section" className="chapter-section" key={sec.title}>
                <h2 className="section-title section-title--sm">{sec.title}</h2>
                {[].concat(sec.body).map((para) => <p key={para}>{para}</p>)}
              </Reveal>
            ))}
          </div>
        )}

        <div className="container">
          <ChapterGallery chapter={chapter} />
        </div>

        <div className="container page-next">
          <Link to="/chapters" className="link-arrow">See all chapters <span className="arrow">→</span></Link>
        </div>
      </section>
    </article>
  );
}

// The chapter's photos, from src/assets/images/chapters/<slug>/.
// Until a chapter sends some, empty frames mark where they'll go.
function ChapterGallery({ chapter }) {
  const photos = chapterPhotos(chapter.slug);
  return (
    <Reveal className="chapter-gallery">
      <h2 className="section-title section-title--sm">Photos</h2>
      <div className="chapter-gallery__grid">
        {photos.length > 0
          ? photos.map((src) => <Photo key={src} src={src} alt={`${chapter.name} chapter members`} />)
          : [0, 1, 2].map((n) => <Photo key={n} label="Chapter photo coming soon" />)}
      </div>
    </Reveal>
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
