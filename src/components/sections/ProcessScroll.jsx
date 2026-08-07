import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import imgPartner from '../../assets/images/dsc04163.jpg';
import imgRescue from '../../assets/images/img-2678.jpg';
import imgVerify from '../../assets/images/img-2753.jpg';
import imgDeliver from '../../assets/images/9fdcc1e7-5bd6-44dc-8afe-dd642b4a08cadsc-0258.jpg';
import { TOTALS } from '../../data/stats.js';

const STEPS = [
  {
    n: '01',
    t: 'Partner',
    img: imgPartner,
    alt: 'Hospital and community health leaders speaking on a panel at a Blueprints event',
    b: 'Hospitals and suppliers hand us the sealed, in-date surplus they can no longer use — instead of sending it to a landfill.',
  },
  {
    n: '02',
    t: 'Rescue',
    img: imgRescue,
    alt: 'A volunteer wheeling a cart of donated supplies through the warehouse',
    b: 'Student volunteers pick up every donation by hand, giving good supplies a second chance at doing good.',
  },
  {
    n: '03',
    t: 'Sort & check',
    img: imgVerify,
    alt: 'Volunteers inspecting a wrapped pallet of donated medical supplies',
    b: 'Together we sort, inspect, and catalog every item against safe-redistribution standards — so everything we send is ready to use.',
  },
  {
    n: '04',
    t: 'Deliver',
    img: imgDeliver,
    alt: 'Volunteers loading boxes of medical supplies into a delivery van',
    b: `Supplies arrive — completely free — at clinics down the street and across ${TOTALS.countries}+ countries.`,
  },
];

function StepPanel({ step }) {
  return (
    <div className="container process__panel-inner">
      <div className="process__copy">
        <span className="process__index">{step.n} / 04</span>
        <h3 className="process__step-title">{step.t}</h3>
        <p className="process__step-body">{step.b}</p>
      </div>
      <figure className="process__photo">
        <img src={step.img} alt={step.alt} loading="lazy" />
      </figure>
    </div>
  );
}

export default function ProcessScroll() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Dwell on each panel, then slide quickly to the next (plateaus = readable steps).
  const x = useTransform(
    scrollYProgress,
    [0, 0.14, 0.30, 0.44, 0.58, 0.72, 0.86, 1],
    ['0%', '0%', '-100%', '-100%', '-200%', '-200%', '-300%', '-300%'],
  );
  const barW = useTransform(scrollYProgress, [0, 1], ['25%', '100%']);

  if (reduceMotion) {
    return (
      <section className="process process--static curve-top">
        <div className="container process__head">
          <span className="eyebrow">How we help</span>
          <h2 className="process__title">Four steps,<br />powered by people.</h2>
        </div>
        {STEPS.map((s) => (
          <article className="process__panel" key={s.n}>
            <StepPanel step={s} />
          </article>
        ))}
      </section>
    );
  }

  return (
    <section className="process curve-top" ref={ref} style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="process__sticky">
        <div className="container process__head">
          <span className="eyebrow">How we help</span>
          <h2 className="process__title">Four steps,<br />powered by people.</h2>
        </div>

        <motion.div className="process__track" style={{ x }}>
          {STEPS.map((s) => (
            <article className="process__panel" key={s.n}>
              <StepPanel step={s} />
            </article>
          ))}
        </motion.div>

        <div className="container process__bar" aria-hidden="true">
          <motion.span style={{ width: barW }} />
        </div>
      </div>
    </section>
  );
}
