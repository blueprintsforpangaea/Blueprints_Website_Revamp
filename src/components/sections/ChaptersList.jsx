import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { CHAPTERS } from '../../data/chapters.js';
import { logoFor } from '../../assets/chapters/logos.js';

// Initials stand in for a chapter that doesn't have a logo file yet.
const initials = (name) =>
  name
    .split(/\s+/)
    .filter((w) => !['of', 'in', 'the'].includes(w))
    .map((w) => (w === w.toUpperCase() ? w : w[0]))
    .join('')
    .slice(0, 3);

export default function ChaptersList() {
  return (
    <ul className="chapter-grid">
      {CHAPTERS.map((chapter, i) => {
        const logo = logoFor(chapter.slug);
        return (
          <Reveal as="li" key={chapter.slug} delay={(i % 3) * 0.06}>
            <Link
              to={`/chapters/${chapter.slug}`}
              className={`chapter-card ${chapter.isHQ ? 'chapter-card--hq' : ''}`}
            >
              <span className="chapter-card__seal">
                {logo ? <img src={logo} alt="" loading="lazy" /> : <span>{initials(chapter.name)}</span>}
              </span>
              <span className="chapter-card__text">
                <h3>
                  {chapter.name}
                  {chapter.isHQ && <span className="chapter-card__badge">HQ</span>}
                </h3>
                <span className="chapter-card__loc">{chapter.location} · since {chapter.since}</span>
              </span>
              <span className="chapter-card__more" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
