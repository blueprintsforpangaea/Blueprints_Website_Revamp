import { useParams } from 'react-router-dom';
import ChaptersMap from '../components/sections/ChaptersMap.jsx';
import ChaptersList from '../components/sections/ChaptersList.jsx';
import { CHAPTERS } from '../data/chapters.js';

export default function Chapters() {
  const { chapterSlug } = useParams();

  if (chapterSlug) {
    const chapter = CHAPTERS.find((c) => c.slug === chapterSlug);
    if (!chapter) return <p style={{ padding: '3rem 1.5rem' }}>Chapter not found.</p>;
    return <ChapterDetail chapter={chapter} />;
  }

  return (
    <div className="chapters-page">
      <div className="chapters-page__hero">
        <div className="container">
          <p className="chapters-page__eyebrow">Our Network</p>
          <h1 className="chapters-page__title">Our Chapters</h1>
          <p className="chapters-page__sub">
            11 chapters. One mission. United by a commitment to equitable healthcare access.
          </p>
        </div>
      </div>

      {/* Interactive map */}
      <ChaptersMap />

      {/* Divider */}
      <div className="chapters-page__divider container" />

      {/* Growth tree */}
      <ChaptersList />
    </div>
  );
}

function ChapterDetail({ chapter }) {
  return (
    <article className="page page--chapter-detail">
      <h1>{chapter.name}</h1>
      <p>{chapter.location}</p>
    </article>
  );
}
