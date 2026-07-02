import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const STEPS = [
  { n: '01', t: 'Partner', b: 'We build relationships with hospitals and suppliers sitting on surplus, in-date medical inventory they can no longer use.' },
  { n: '02', t: 'Rescue', b: 'Student volunteers recover the supplies by hand — before a single sealed box ever reaches the waste stream.' },
  { n: '03', t: 'Verify', b: 'Every item is sorted, inspected, and cataloged against safe-redistribution standards. Nothing ships unchecked.' },
  { n: '04', t: 'Deliver', b: 'Supplies reach vetted clinics and relief partners — free of charge — at home and across 15+ countries.' },
];

export default function ProcessScroll() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Spring-smoothed so the slide between panels glides instead of stepping
  // with each wheel tick.
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  // Linear mapping: panels track the scrollbar 1:1, so motion never stalls or lurches.
  // Percent is relative to the track (one viewport tall), so -100% = one panel.
  const y = useTransform(progress, [0, 1], ['0%', `-${(STEPS.length - 1) * 100}%`]);
  const barH = useTransform(progress, [0, 1], ['25%', '100%']);

  return (
    <section className="process" ref={ref} style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="process__sticky">
        <div className="container process__head">
          <span className="eyebrow">How we work</span>
          <h2 className="process__title">From surplus<br />to saved lives.</h2>
        </div>

        <div className="process__viewport">
          <motion.div className="process__track" style={{ y }}>
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
        </div>

        <div className="process__bar" aria-hidden="true">
          <motion.span style={{ height: barH }} />
        </div>
      </div>
    </section>
  );
}
