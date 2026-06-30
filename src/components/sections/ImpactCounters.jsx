import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

const STATS = [
  { to: 9077500, prefix: '$', label: 'In medical supplies redistributed' },
  { to: 20000, suffix: '+', label: 'Pounds delivered, and counting' },
  { to: 15, suffix: '+', label: 'Countries across five continents' },
  { to: 11, label: 'University chapters nationwide' },
];

function Counter({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return controls.stop;
  }, [inView, to]);

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
