import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
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
            U.S. hospitals throw out medical supplies that were never opened
          </h2>
          <p>
            Our chapters and high school clubs collect them from hospitals and suppliers, check
            them, and send them to clinics that are running short.
          </p>
          <Link to="/mission" className="link-arrow">
            More about what we do <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
