import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Photo from '../components/ui/Photo.jsx';
import { DEPARTMENTS, PIPELINE } from '../data/departments.js';
import { TOTALS } from '../data/stats.js';
import { departmentPhoto } from '../assets/photos.js';
import useMediaQuery from '../hooks/useMediaQuery.js';
import { motion, useReducedMotion } from 'framer-motion';
import partnerPhoto from '../assets/images/12dd519c-c348-407b-b191-8031453d39c2-1-105-c.jpg';
import collectPhoto from '../assets/images/726a596d-3249-43ff-a5c2-4c5e01be5098.jpg';
import verifyPhoto from '../assets/images/img-2540.jpg';
import shipPhoto from '../assets/images/9fdcc1e7-5bd6-44dc-8afe-dd642b4a08cadsc-0258.jpg';

// One real photo per step of the route, in PIPELINE order.
const STEP_PHOTOS = [
  { src: partnerPhoto, alt: 'Two people at Hope Clinic holding a box of donated supplies' },
  { src: collectPhoto, alt: 'A volunteer among stacked boxes in the warehouse' },
  { src: verifyPhoto, alt: 'Hands sealing a box of checked supplies' },
  { src: shipPhoto, alt: 'Volunteers loading boxes into a van' },
];


// A department as a postcard: photo and name on the front; what the
// team is responsible for and its projects on the back. Click to flip.
function DeptCard({ dept }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const phone = useMediaQuery('(max-width: 600px)');
  const hasBack = Boolean(dept.charter);
  const photo = departmentPhoto(dept.id);

  const front = (
    <>
      <Photo src={photo} alt="" className="postcard__photo" label="Department photo coming soon" />
      <div className="postcard__body">
        <h3 className="postcard__name">{dept.name}</h3>
        {dept.summary && <p className="postcard__line">{dept.summary}</p>}
        {hasBack && <span className="postcard__turn">See their projects <span aria-hidden="true">↻</span></span>}
      </div>
    </>
  );

  if (!hasBack && phone) {
    return (
      <div className="deptrow">
        <div className="deptrow__head">
          <Photo src={photo} alt="" className="deptrow__photo" label="Photo soon" />
          <span className="deptrow__text"><span className="postcard__name">{dept.name}</span></span>
        </div>
      </div>
    );
  }

  if (!hasBack) {
    return <div className="postcard"><div className="postcard__face postcard__face--front">{front}</div></div>;
  }

  // Phones: a compact row that opens downward. A flipping card would
  // have to be as tall as its longest side, which wastes a phone screen.
  if (phone) {
    return (
      <details className="deptrow">
        <summary>
          <Photo src={photo} alt="" className="deptrow__photo" label="Photo soon" />
          <span className="deptrow__text">
            <span className="postcard__name">{dept.name}</span>
            <span className="deptrow__line">{dept.summary}</span>
          </span>
        </summary>
        <div className="deptrow__more">
          {dept.responsibilities && <p className="postcard__resp">{dept.responsibilities.join(' · ')}</p>}
          {dept.projects && (
            <ul className="postcard__projects">
              {dept.projects.map((p) => (
                <li key={p.name}><strong>{p.name}</strong>{p.detail}</li>
              ))}
            </ul>
          )}
          {dept.video && <a className="postcard__video" href={dept.video} target="_blank" rel="noreferrer">Watch the video →</a>}
        </div>
      </details>
    );
  }

  return (
    <button
      type="button"
      className={`postcard postcard--flips ${flipped ? 'is-flipped' : ''} ${reduce ? 'postcard--still' : ''}`}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${dept.name}: ${flipped ? 'show photo' : 'show projects'}`}
    >
      <div className="postcard__face postcard__face--front" aria-hidden={flipped}>{front}</div>
      <div className="postcard__face postcard__face--back" aria-hidden={!flipped}>
        <h3 className="postcard__name">{dept.name}</h3>
        {dept.responsibilities && (
          <p className="postcard__resp">{dept.responsibilities.join(' · ')}</p>
        )}
        {dept.projects && (
          <ul className="postcard__projects">
            {dept.projects.map((p) => (
              <li key={p.name}><strong>{p.name}</strong>{p.detail}</li>
            ))}
          </ul>
        )}
        {dept.video && (
          <a
            className="postcard__video"
            href={dept.video}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Watch the video →
          </a>
        )}
        <span className="postcard__turn">Back to photo <span aria-hidden="true">↻</span></span>
      </div>
    </button>
  );
}

export default function Mission() {
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
              <strong>{(TOTALS.wasteTons / 1_000_000).toFixed(0)} million tons</strong>
              <span>of unused medical supplies thrown away by U.S. healthcare every year</span>
            </p>
          </Reveal>
          <Reveal className="band-navy__text" delay={0.1}>
            <h2>The problem and our solution</h2>
            <p>
              Billions of people around the world lack basic medical supplies and equipment, while
              roughly {(TOTALS.wastePounds / 1_000_000_000).toFixed(0)} billion pounds go to waste here.
              Our university chapters and high school clubs collect some of that surplus and ship it
              to clinics and hospitals, in the U.S. and overseas.
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
            <p>Click or tap a department to see what the team works on.</p>
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
