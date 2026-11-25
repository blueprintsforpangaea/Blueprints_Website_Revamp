import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import ShipmentMapSection from '../components/sections/ShipmentMapSection.jsx';
import { impactStats } from '../data/stats.js';
import useImpactTotals from '../hooks/useImpactTotals.js';
import { ORG } from '../data/site.js';
import PhotoMarquee from '../components/ui/PhotoMarquee.jsx';
import hopeClinic from '../assets/images/12dd519c-c348-407b-b191-8031453d39c2-1-105-c.jpg';
import vanCrew from '../assets/images/efd3cc03-681e-468b-8608-f746800f9dc2dsc-0260.jpg';
import gnj from '../assets/images/chapters/rutgers/img-5664.jpg';
import wsu from '../assets/images/chapters/wayne-state/img-2328.jpg';
import lebanonTruck from '../assets/images/img-7929.jpg';
import wrapping from '../assets/images/img-2668.jpg';
import stacking from '../assets/images/img-2634.jpg';
import hallway from '../assets/images/dsc07615.jpg';

// Our members with the supplies, from pickups to deliveries.
const PHOTOS = [
  { src: hopeClinic, alt: 'A delivery of donated supplies at Hope Clinic', caption: 'Hope Clinic' },
  { src: lebanonTruck, alt: 'A shipping container loaded with boxes of medical supplies', caption: 'Lebanon' },
  { src: wrapping, alt: 'A member shrink-wrapping a pallet of supplies in the warehouse' },
  { src: gnj, alt: 'Rutgers members with donated supplies', caption: 'Rutgers' },
  { src: stacking, alt: 'Members stacking boxes of donated supplies' },
  { src: wsu, alt: 'Wayne State members packing supplies', caption: 'Wayne State' },
  { src: hallway, alt: 'A member pulling a Blueprints pallet jack down the warehouse hallway' },
  { src: vanCrew, alt: 'Three members sitting in a van full of boxes' },
];

export default function Impact() {
  const IMPACT_STATS = impactStats(useImpactTotals());
  return (
    <article>
      <section className="globe-section">
        <div className="container">
          <Reveal className="globe-hero">
            <h1 className="globe-hero__title">Where our supplies have gone</h1>
            <p className="globe-hero__lead">
              The map shows our recorded shipments. Each line runs from the chapter that sent it to
              where the supplies went. Click or tap a pin to see what we sent there.
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
