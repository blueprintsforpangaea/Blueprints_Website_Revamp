import { PRESS_ITEMS } from '../../data/press.js';

export default function PressCoverage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">In the News</p>
        <h2 className="section-title">In the Press</h2>
        <ul className="press__list">
          {PRESS_ITEMS.map((item) => (
            <li key={item.id} className="press__item">
              <a href={item.url} target="_blank" rel="noreferrer">
                <span className="press__outlet">{item.outlet}</span>
                <span className="press__date">{item.date}</span>
                <span className="press__headline">{item.headline}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
