import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import photo from '../../assets/images/img-2715.jpg';

export default function DonateScene() {
  return (
    <section className="closing">
      <img className="closing__img" src={photo} alt="" loading="lazy" aria-hidden="true" />
      <div className="closing__scrim" aria-hidden="true" />
      <div className="container closing__inner">
        <Reveal>
          <h2 className="closing__title">Help us send the next shipment</h2>
          <div className="closing__ctas">
            <Link to="/donate" className="btn btn--white btn--lg">Donate</Link>
            <Link to="/get-involved" className="btn btn--ghost btn--lg">Other ways to help</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
