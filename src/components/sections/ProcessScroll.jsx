import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  { n: '01', t: 'Partner', b: 'We build relationships with hospitals and suppliers sitting on surplus, in-date medical inventory they can no longer use.' },
  { n: '02', t: 'Rescue', b: 'Student volunteers recover the supplies by hand — before a single sealed box ever reaches the waste stream.' },
  { n: '03', t: 'Verify', b: 'Every item is sorted, inspected, and cataloged against safe-redistribution standards. Nothing ships unchecked.' },
  { n: '04', t: 'Deliver', b: 'Supplies reach vetted clinics and relief partners — free of charge — at home and across 15+ countries.' },
];

export default function ProcessScroll() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Dwell on each panel, then slide quickly to the next (plateaus = readable steps).
  const x = useTransform(
    scrollYProgress,
    [0, 0.14, 0.30, 0.44, 0.58, 0.72, 0.86, 1],
    ['0%', '0%', '-100%', '-100%', '-200%', '-200%', '-300%', '-300%'],
  );
  const barW = useTransform(scrollYProgress, [0, 1], ['25%', '100%']);

  return (
    <section className="process" ref={ref} style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="process__sticky">
        <div className="container process__head">
          <span className="eyebrow">How we work</span>
          <h2 className="process__title">From surplus<br />to saved lives.</h2>
        </div>

        <motion.div className="process__track" style={{ x }}>
          {STEPS.map((s) => (
            <article className="process__panel" key={s.n}>
              <div className="container process__panel-inner">
                <span className="process__ghost" aria-hidden="true">{s.n}</span>
                <div className="process__copy">
                  <span className="process__index">{s.n} / 04</span>
                  <h3 className="process__step-title">{s.t}</h3>
                  <p className="process__step-body">{s.b}</p>
                </div>
              </div>
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
