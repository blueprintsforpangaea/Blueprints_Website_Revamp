import Reveal from '../ui/Reveal.jsx';
import { TOTALS } from '../../data/stats.js';

export default function ProblemStatement() {
  return (
    <section className="section section--soft">
      <div className="container stated">
        <Reveal className="stated__figure">
          <span className="stated__num">
            {(TOTALS.wasteTons / 1_000_000).toFixed(0)}M
          </span>
          <span className="stated__unit">
            tons of unused medical supplies discarded each year in the U.S.
          </span>
        </Reveal>

        <Reveal className="stated__body" delay={0.12}>
          <p>
            Much of it is sealed and in date — thrown out because hospital inventory rules say it
            must be. At the same time, clinics here and abroad go without the basics.
          </p>
          <p>
            We move supplies from the first situation to the second.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
