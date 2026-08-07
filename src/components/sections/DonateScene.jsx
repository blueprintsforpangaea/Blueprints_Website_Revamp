import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { TOTALS } from '../../data/stats.js';

export default function DonateScene() {
  return (
    <section className="section section--ink closing">
      <div className="container closing__inner">
        <Reveal>
          <h2 className="closing__title">Supplies are free.<br />Freight is not.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="closing__body">
            Hospitals give us the surplus. Storing a pallet, verifying it, and putting it on a truck
            is the part that needs funding — and that's where a gift goes.{' '}
            {TOTALS.suppliesValueExact} in supplies has reached clinics this way.
          </p>
          <div className="closing__ctas">
            <Link to="/donate" className="btn btn--white btn--lg">
              Donate <span className="arrow">→</span>
            </Link>
            <Link to="/get-involved" className="btn btn--ghost btn--lg">More ways to help</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
