import { CHAPTERS } from '../../data/chapters.js';

export default function ChapterLogos() {
  return (
    <section className="section chapter-logos">
      <div className="container">
        <p className="chapter-logos__eyebrow">Chapters powering the mission</p>
        <div className="chapter-logos__row">
          {CHAPTERS.map((chapter) => (
            <img
              key={chapter.slug}
              src={chapter.logo}
              alt={chapter.name}
              className="chapter-logos__logo"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
