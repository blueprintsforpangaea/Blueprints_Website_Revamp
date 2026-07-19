import { CHAPTERS } from '../../data/chapters.js';
import { Link } from 'react-router-dom';

export default function ChaptersList() {
  const chapters = [...CHAPTERS].sort((a, b) => a.since - b.since || a.name.localeCompare(b.name));

  return (
    <section className="chapters">
      <h2 className="chapters__title">Our Network: 11 Active Chapters &amp; 150+ Members</h2>
      <ul className="chapters__list chapters__timeline">
        {chapters.map((chapter) => (
          <li key={chapter.slug} className="chapters__item">
            <Link to={`/chapters/${chapter.slug}`} className="chapters__link">
              <span className="chapters__identity">
                <span className="chapters__logo-placeholder">
                  <img src={chapter.logo} alt={`${chapter.name} seal`} />
                </span>
                <span className="chapters__name">{chapter.name}</span>
              </span>
              <span className="chapters__location">{chapter.location}</span>
            </Link>
            <span className="chapters__year">{chapter.since}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
