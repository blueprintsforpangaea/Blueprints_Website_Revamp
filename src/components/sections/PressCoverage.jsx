import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import PressList from '../ui/PressList.jsx';
import { PRESS_ITEMS } from '../../data/press.js';

// Only items with a real, resolving link belong on the landing page —
// the unlinked ones live on /press where the context explains them.
const LINKED = PRESS_ITEMS.filter((p) => p.url).slice(0, 3);

export default function PressCoverage() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head section-head--split">
          <h2 className="section-title">In the news</h2>
          <Link to="/press" className="link-arrow">
            All coverage <span className="arrow">→</span>
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <PressList items={LINKED} />
        </Reveal>
      </div>
    </section>
  );
}
