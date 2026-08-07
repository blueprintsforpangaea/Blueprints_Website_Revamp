import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { PIPELINE } from '../../data/departments.js';
import imgPartner from '../../assets/images/dsc04163.jpg';
import imgCollect from '../../assets/images/img-2678.jpg';
import imgVerify from '../../assets/images/img-2753.jpg';
import imgShip from '../../assets/images/9fdcc1e7-5bd6-44dc-8afe-dd642b4a08cadsc-0258.jpg';

// One photo per step. The order matches PIPELINE.
const PHOTOS = [
  { src: imgPartner, alt: 'Hospital and community health leaders speaking at a Blueprints event' },
  { src: imgCollect, alt: 'A volunteer wheeling a cart of donated supplies through the warehouse' },
  { src: imgVerify, alt: 'Volunteers inspecting a wrapped pallet of donated medical supplies' },
  { src: imgShip, alt: 'Volunteers loading boxes of medical supplies into a delivery van' },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title">Four steps, run by students.</h2>
        </Reveal>

        <div className="flow">
          {PIPELINE.map((step, i) => (
            <Reveal as="article" className="flow__step" key={step.num} delay={i * 0.07}>
              <figure className="flow__photo">
                <img src={PHOTOS[i].src} alt={PHOTOS[i].alt} loading="lazy" />
              </figure>
              <span className="flow__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.short}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="flow__more" delay={0.1}>
          <Link to="/mission" className="link-arrow">
            How the supply chain works in detail <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
