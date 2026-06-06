import { CHAPTERS } from '../../data/chapters.js';
import { Link } from 'react-router-dom';

export default function ChaptersList() {
  // 11 chapters total — UMich HQ flagged separately.
  return (
    <section className="chapters">
      <h2 className="chapters__title">Our Chapters</h2>
      <div className="chapters__grid">
        {CHAPTERS.map((chapter) => (
          <Link
            to={`/chapters/${chapter.slug}`}
            key={chapter.slug}
            className={`chapter-card ${chapter.isHQ ? 'chapter-card--hq' : ''}`}
          >
            <h3>{chapter.name}</h3>
            <p>{chapter.location}</p>
            {chapter.isHQ && <span className="chapter-card__badge">HQ</span>}
          </Link>
        ))}
      </div>
    </section>
  );
}
