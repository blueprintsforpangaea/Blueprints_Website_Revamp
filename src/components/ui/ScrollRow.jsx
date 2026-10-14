import { useEffect, useRef, useState } from 'react';

// A row that scrolls sideways, with arrow buttons for mouse users.
// Swiping and trackpads work as usual; the page itself never moves.
export default function ScrollRow({ children, className = '', label }) {
  const ref = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () =>
      setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  const go = (dir) => {
    const el = ref.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={`scroll-row ${className}`}>
      <div className="scroll-row__track" ref={ref} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className="scroll-row__nav">
        <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label="Scroll back">←</button>
        <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label="Scroll forward">→</button>
      </div>
    </div>
  );
}
