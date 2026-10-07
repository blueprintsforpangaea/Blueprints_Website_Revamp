import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { PIPELINE } from '../../data/departments.js';
import imgPartner from '../../assets/images/dsc04163.jpg';
import imgCollect from '../../assets/images/img-2678.jpg';
import imgVerify from '../../assets/images/img-2753.jpg';
import imgShip from '../../assets/images/9fdcc1e7-5bd6-44dc-8afe-dd642b4a08cadsc-0258.jpg';

// One photo per step, in PIPELINE order.
const PHOTOS = [
  { src: imgPartner, alt: 'Hospital and community health leaders speaking at a Blueprints event' },
  { src: imgCollect, alt: 'A volunteer wheeling a cart of donated supplies through the warehouse' },
  { src: imgVerify, alt: 'Volunteers inspecting a wrapped pallet of donated medical supplies' },
  { src: imgShip, alt: 'Volunteers loading boxes of medical supplies into a delivery van' },
];

export default function HowItWorks() {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal className="section-head section-head--split">
          <h2 className="section-title">How we work</h2>
          <Link to="/mission" className="link-arrow">
            More detail <span className="arrow">→</span>
          </Link>
        </Reveal>

        <ol className="flow">
          {PIPELINE.map((step, i) => (
            <Reveal as="li" className="flow__step" key={step.num} delay={i * 0.06}>
              <figure className="flow__photo">
                <img src={PHOTOS[i].src} alt={PHOTOS[i].alt} loading="lazy" />
              </figure>
              <h3>
                <span className="flow__num">{i + 1}</span>
                {step.title}
              </h3>
              <p>{step.short}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
