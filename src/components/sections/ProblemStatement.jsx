import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { TOTALS } from '../../data/stats.js';
import warehousePhoto from '../../assets/images/726a596d-3249-43ff-a5c2-4c5e01be5098.jpg';

export default function ProblemStatement() {
  return (
    <section className="section">
      <div className="container intro">
        <Reveal className="intro__photo">
          <img
            src={warehousePhoto}
            alt="A volunteer surrounded by stacked boxes of donated supplies in the storage unit"
            loading="lazy"
          />
        </Reveal>

        <Reveal className="intro__copy" delay={0.08}>
          <h2 className="section-title">
            Every year, over {(TOTALS.wasteTons / 1_000_000).toFixed(0)} million tons of medical
            supplies are thrown away
          </h2>
          <p>
            Much of it was never opened. Our chapters and high school clubs collect it from
            hospitals and suppliers, check it, and send it to clinics that are running short.
          </p>
          <Link to="/mission" className="link-arrow">
            More about what we do <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
