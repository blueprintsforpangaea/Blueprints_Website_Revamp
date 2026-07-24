import { PRESS_ITEMS } from '../../data/press.js';

export default function PressCoverage() {
  return (
    <section className="section">
      <div className="container press__container">
        <ul className="press__list">
          {PRESS_ITEMS.map((item) => (
            <li key={item.id} className="press__item">
              <a href={item.url} target="_blank" rel="noreferrer">
                <span className="press__outlet">{item.outlet}</span>
                <span className="press__date">{item.date}</span>
                <span className="press__headline">{item.headline} &#8599;</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
