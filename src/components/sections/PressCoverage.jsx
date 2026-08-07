import Reveal from '../ui/Reveal.jsx';
import PressList from '../ui/PressList.jsx';
import { PRESS_ITEMS } from '../../data/press.js';

export default function PressCoverage() {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow eyebrow--center">Coverage</span>
          <h2 className="section-title">In the press</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <PressList items={PRESS_ITEMS.slice(0, 5)} />
        </Reveal>
      </div>
    </section>
  );
}
