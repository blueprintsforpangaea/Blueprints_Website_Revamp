import Reveal from '../ui/Reveal.jsx';
import { PRESS_ITEMS } from '../../data/press.js';

export default function PressCoverage() {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow eyebrow--center">In the News</span>
          <h2 className="section-title">In the press</h2>
        </Reveal>

        <Reveal className="press-list" delay={0.1}>
          {PRESS_ITEMS.map((item) => (
            <div key={item.id} className="press-item">
              <a href={item.url} target="_blank" rel="noreferrer">
                <span className="press-item__outlet">{item.outlet}</span>
                <span className="press-item__headline">{item.headline}</span>
                <span className="press-item__date">{item.date}</span>
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
