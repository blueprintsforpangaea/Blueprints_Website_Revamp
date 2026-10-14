import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import ShipmentMapSection from '../components/sections/ShipmentMapSection.jsx';
import { IMPACT_STATS } from '../data/stats.js';
import { ORG } from '../data/site.js';
import PhotoMarquee from '../components/ui/PhotoMarquee.jsx';
import hopeClinic from '../assets/images/12dd519c-c348-407b-b191-8031453d39c2-1-105-c.jpg';
import vanLoad from '../assets/images/9fdcc1e7-5bd6-44dc-8afe-dd642b4a08cadsc-0258.jpg';
import vanCrew from '../assets/images/efd3cc03-681e-468b-8608-f746800f9dc2dsc-0260.jpg';
import gnj from '../assets/images/chapters/greater-nj/img-5664.jpg';
import wsu from '../assets/images/chapters/wayne-state/img-2328.jpg';
import boxes from '../assets/images/238939e5-8c3b-4744-bfd5-5a90886e10a3dsc-0252.jpg';
import warehouse from '../assets/images/726a596d-3249-43ff-a5c2-4c5e01be5098.jpg';
import packing from '../assets/images/img-2753.jpg';

// Our members with the supplies, from pickups to deliveries.
const PHOTOS = [
  { src: hopeClinic, alt: 'A delivery of donated supplies at Hope Clinic', caption: 'Hope Clinic' },
  { src: vanLoad, alt: 'Volunteers loading boxes of supplies into a van' },
  { src: gnj, alt: 'Greater New Jersey members with donated supplies', caption: 'Greater New Jersey' },
  { src: vanCrew, alt: 'Three members sitting in a van full of boxes' },
  { src: wsu, alt: 'Wayne State members packing supplies', caption: 'Wayne State' },
  { src: boxes, alt: 'Members in front of stacked boxes of supplies' },
  { src: warehouse, alt: 'A member among stacked boxes in the warehouse' },
  { src: packing, alt: 'Two members next to a wrapped pallet of supplies' },
];

export default function Impact() {
  return (
    <article>
      <section className="globe-section">
        <div className="container">
          <Reveal className="globe-hero">
            <h1 className="globe-hero__title">Where our supplies have gone</h1>
            <p className="globe-hero__lead">
              The map shows our recorded shipments. Each line runs from the chapter that sent it,
              and the dots in the U.S. are our chapters. Click or tap a dot to see what we sent there.
            </p>
            <ul className="impact-facts">
              {IMPACT_STATS.map((stat) => (
                <li key={stat.label}><strong>{stat.value}</strong>{stat.label}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ShipmentMapSection />

      <section className="impact-photos" aria-labelledby="impact-photos-title">
        <div className="container">
          <h2 id="impact-photos-title" className="section-title section-title--sm">Our members at work</h2>
        </div>
        <PhotoMarquee photos={PHOTOS} label="Photos of our members with supplies" />
      </section>

      <section className="band-navy">
        <div className="container band-navy__split">
          <Reveal className="band-navy__text">
            <h2>Have supplies to give?</h2>
            <p>
              We’d love to work with you. If your hospital or company has unused inventory, email{' '}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a> and we’ll arrange a pickup.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="btn-row">
            <Link to="/get-involved#supplies" className="btn btn--light btn--lg">What we accept</Link>
            <Link to="/donate" className="btn btn--ghost btn--lg">Donate money</Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
