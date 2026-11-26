import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Photo from '../components/ui/Photo.jsx';
import { DEPARTMENTS, PIPELINE } from '../data/departments.js';
import useImpactTotals from '../hooks/useImpactTotals.js';
import { departmentPhoto } from '../assets/photos.js';
import { motion, useReducedMotion } from 'framer-motion';
import partnerPhoto from '../assets/images/12dd519c-c348-407b-b191-8031453d39c2-1-105-c.jpg';
import collectPhoto from '../assets/images/726a596d-3249-43ff-a5c2-4c5e01be5098.jpg';
import verifyPhoto from '../assets/images/img-2673.jpg';
import shipPhoto from '../assets/images/9fdcc1e7-5bd6-44dc-8afe-dd642b4a08cadsc-0258.jpg';

// One real photo per step of the route, in PIPELINE order.
const STEP_PHOTOS = [
  { src: partnerPhoto, alt: 'Two people at Hope Clinic holding a box of donated supplies' },
  { src: collectPhoto, alt: 'A volunteer among stacked boxes in the warehouse' },
  { src: verifyPhoto, alt: 'Two members checking a donated pulse oximeter before it is packed' },
  { src: shipPhoto, alt: 'Volunteers loading boxes into a van' },
];


// A department card: photo, name, what the team does. The same for every
// department, and nothing to click.
function DeptCard({ dept }) {
  return (
    <div className="postcard">
      <div className="postcard__face postcard__face--front">
        <Photo src={departmentPhoto(dept.id)} alt="" className="postcard__photo" label="Department photo coming soon" />
        <div className="postcard__body">
          <h3 className="postcard__name">{dept.name}</h3>
          <p className="postcard__line">{dept.about}</p>
          <ul className="postcard__work">
            {dept.work.map((item) => <li key={item}>{item}</li>)}
          </ul>
          {dept.video && (
            <a className="postcard__video" href={dept.video} target="_blank" rel="noreferrer">
              Watch the video →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Mission() {
  const impact = useImpactTotals();
  const reduce = useReducedMotion();
  return (
    <article>
      <PageHeader title="What we do">
        Blueprints for Pangaea is a medical surplus recovery organization. We reallocate
        essential medical supplies from areas of surplus to communities in need.
      </PageHeader>

      {/* The problem first, then the route that answers it. */}
      <section className="band-navy">
        <div className="container band-navy__split">
          <Reveal>
            <p className="big-figure">
              <strong>${Math.floor(impact.suppliesValue / 1_000_000)}M+</strong>
              <span>in medical supplies our chapters have shipped</span>
            </p>
          </Reveal>
          <Reveal className="band-navy__text" delay={0.1}>
            <h2>The problem and our solution</h2>
            <p>
              Clinics around the world run short of basic medical supplies, while U.S. hospitals
              throw out supplies that were never opened. Our university
              chapters and high school clubs collect some of that surplus and ship it to clinics and
              hospitals, in the U.S. and overseas.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Signature: the supply chain as one route, hospital to clinic. */}
      <section className="route-section" aria-labelledby="route-title">
        <div className="container">
          <h2 id="route-title" className="section-title section-title--sm">How a shipment happens</h2>
          <ol className="route">
            <motion.span
              className="route__line"
              aria-hidden="true"
              initial={reduce ? false : { scaleX: 0, scaleY: 0 }}
              whileInView={{ scaleX: 1, scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {PIPELINE.map((s, i) => (
              <Reveal as="li" className="route__stop" key={s.num} delay={0.25 + i * 0.25}>
                <figure className="route__photo">
                  <img src={STEP_PHOTOS[i].src} alt={STEP_PHOTOS[i].alt} loading="lazy" />
                </figure>
                <span className="route__node">{i + 1}</span>
                <h3 className="route__title">{s.title}</h3>
                <p>{s.short}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">Our departments</h2>
            <p>Every member joins one department and works with all of them.</p>
          </Reveal>

          <div className="postcards">
            {DEPARTMENTS.map((d, i) => (
              <Reveal key={d.id} delay={(i % 3) * 0.06}>
                <DeptCard dept={d} />
              </Reveal>
            ))}
          </div>

          <div className="page-next">
            <Link to="/impact" className="link-arrow">
              See where the supplies have gone <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
