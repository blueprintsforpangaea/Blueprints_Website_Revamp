import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { TOTALS } from '../../data/stats.js';

const STATS = [
  { to: TOTALS.dollarsRedistributed, prefix: '$', label: 'In medical supplies redistributed' },
  { to: TOTALS.poundsDelivered, suffix: '+', label: 'Pounds delivered, and counting' },
  { to: TOTALS.countries, suffix: '+', label: `Countries across ${TOTALS.continents} continents` },
  { to: TOTALS.chapters, label: 'University chapters nationwide' },
];

function Counter({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  // Write straight to the DOM node — a setState here re-renders React on
  // every animation frame for every counter at once.
  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 2.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v).toLocaleString('en-US')}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix]);

  return (
    <span ref={ref} className="counter__value">
      {prefix}0{suffix}
    </span>
  );
}

export default function ImpactCounters() {
  return (
    <section className="counters">
      <div className="container">
        <div className="counters__head">
          <span className="eyebrow eyebrow--center">By the numbers</span>
          <h2 className="counters__title">What waste, rescued,<br />adds up to.</h2>
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
