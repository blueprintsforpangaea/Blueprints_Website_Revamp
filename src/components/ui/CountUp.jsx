import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

// A number that counts up from zero the first time it scrolls into view.
export default function CountUp({ to, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setVal });
    return controls.stop;
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{Math.round(val).toLocaleString('en-US')}{suffix}
    </span>
  );
}
