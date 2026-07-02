import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import ChaptersList from '../components/sections/ChaptersList.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { CHAPTERS } from '../data/chapters.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { TOTALS } from '../data/stats.js';

export default function Chapters() {
  const { chapterSlug } = useParams();
  usePageMeta(
    'Chapters',
    `${TOTALS.chapters} student-run university chapters keep rescued medical supplies moving nationwide. Find yours or start a new one.`,
  );

  if (chapterSlug) {
    const chapter = CHAPTERS.find((c) => c.slug === chapterSlug);
    if (!chapter) return <ChapterNotFound />;
    return <ChapterDetail chapter={chapter} />;
  }

  return (
    <article>
      <PageHeader eyebrow="Our Network" title={`${TOTALS.chapters} chapters, one mission`}>
        From our University of Michigan headquarters to campuses coast to coast, student-run chapters
        keep supplies moving. Find yours — or start a new one.
      </PageHeader>
      <section className="section">
        <div className="container">
          <ChaptersList />
          <Reveal className="cta-banner" delay={0.1} style={{ marginTop: '3.5rem' }}>
            <div className="cta-banner__glow" />
            <h2>Don't see your school?</h2>
            <p>Bring Blueprints for Pangaea to your campus. We'll hand you the playbook and connect you to the network.</p>
            <div className="cta-banner__buttons">
              <Link to="/get-involved" className="btn btn--primary btn--lg">Start a Chapter</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

function ChapterDetail({ chapter }) {
  return (
    <article>
      <PageHeader eyebrow={chapter.isHQ ? 'Headquarters' : 'Chapter'} title={chapter.name}>
        {chapter.location}
      </PageHeader>
      <section className="section">
        <div className="container narrow">
          <Reveal className="prose">
            <p>
              The {chapter.name} chapter recovers surplus medical supplies from local hospitals and
              partners and redistributes them to clinics and communities in need
              {chapter.isHQ ? ', and serves as our national headquarters.' : '.'}
            </p>
            <p>
              Interested in joining, partnering, or learning more? Reach out — chapter leadership
              would love to hear from you.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/get-involved" className="btn btn--dark">Join This Chapter</Link>
              <Link to="/chapters" className="btn btn--outline">← All Chapters</Link>
            </div>
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
          <Link to="/chapters" className="btn btn--dark">← Back to all chapters</Link>
        </div>
      </section>
    </article>
  );
}
