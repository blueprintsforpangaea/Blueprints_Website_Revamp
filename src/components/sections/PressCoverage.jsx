import { PRESS_ITEMS } from '../../data/press.js';

export default function PressCoverage() {
  return (
    <section className="press">
      <h2 className="press__title">In the Press</h2>
      <ul className="press__list">
        {PRESS_ITEMS.map((item) => (
          <li key={item.id} className="press__item">
            <a href={item.url} target="_blank" rel="noreferrer">
              <span className="press__outlet">{item.outlet}</span>
              <span className="press__headline">{item.headline}</span>
              <span className="press__date">{item.date}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
