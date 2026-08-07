import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { CHAPTERS } from '../../data/chapters.js';

export default function ChaptersList() {
  return (
    <div className="grid-3">
      {CHAPTERS.map((chapter, i) => (
        <Reveal key={chapter.slug} delay={(i % 3) * 0.06}>
          <Link
            to={`/chapters/${chapter.slug}`}
            className={`chapter-card ${chapter.isHQ ? 'chapter-card--hq' : ''}`}
          >
            {chapter.isHQ && <span className="chapter-card__badge">HQ</span>}
            {chapter.logo && (
              <span className="chapter-card__seal">
                <img src={chapter.logo} alt="" loading="lazy" />
              </span>
            )}
            <h3>{chapter.name}</h3>
            <span className="chapter-card__loc">{chapter.location}</span>
            {chapter.lead && <span className="chapter-card__lead">{chapter.lead}</span>}
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
