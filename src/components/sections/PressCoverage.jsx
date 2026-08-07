import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import PressList from '../ui/PressList.jsx';
import { PRESS_ITEMS } from '../../data/press.js';

// Only items with a real, resolving link belong on the landing page —
// the unlinked ones live on /press where the context explains them.
const LINKED = PRESS_ITEMS.filter((p) => p.url).slice(0, 4);

export default function PressCoverage() {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Coverage</span>
          <h2 className="section-title">What others have written.</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <PressList items={LINKED} />
        </Reveal>

        <Reveal className="flow__more" delay={0.12}>
          <Link to="/press" className="link-arrow">
            All press coverage <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
