import { useEffect, useRef, useState } from 'react';

// Fast odometer-style count-up from 0 -> target, triggered once `active` is true.
export function useCountUp(target, { duration = 1200, decimals = 0, active = true } = {}) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();
    let frame;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(progress >= 1 ? target : target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return Number(value.toFixed(decimals));
}
