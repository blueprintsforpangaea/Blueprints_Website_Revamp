import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

const STATS = [
  { to: 9077500, prefix: '$', label: 'in rescued supplies delivered to clinics that need them' },
  { to: 20000, suffix: '+', label: 'pounds carried — box by box, hand to hand' },
  { to: 15, suffix: '+', label: 'countries reached across five continents' },
  { to: 11, label: 'student chapters nationwide, and growing' },
];

function Counter({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 2.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return controls.stop;
  }, [inView, to, reduceMotion]);

  return (
    <span ref={ref} className="counter__value">
      {prefix}
      {Math.round(val).toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

export default function ImpactCounters() {
  return (
    <section className="counters curve-top">
      <div className="container">
        <div className="counters__head">
          <span className="eyebrow eyebrow--center">By the numbers</span>
          <h2 className="counters__title">Small acts add up.<br />Here&rsquo;s the proof.</h2>
        </div>
        <div className="counters__grid">
          {STATS.map((s) => (
            <div className="counter" key={s.label}>
              <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
              <span className="counter__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
