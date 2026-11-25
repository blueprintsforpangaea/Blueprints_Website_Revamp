import { useEffect, useRef } from 'react';

// A row of photos that drifts past on its own and can be moved by hand:
// drag it with a mouse, swipe it on a phone, or scroll it sideways. It
// stops drifting while someone moves it and picks up again a few seconds
// later. The second copy makes the loop seamless and is hidden from
// screen readers. With reduced motion it stays still (by hand only).
const fadeIn = (e) => e.currentTarget.classList.add('is-loaded');
const SPEED = 28; // pixels per second
const RESUME_AFTER = 2500; // ms after the last touch, drag or scroll

export default function PhotoMarquee({ photos, label, className = '' }) {
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // How far the second copy starts from the first: scrolling by this much
    // shows the same picture, so the position can wrap without a jump.
    const loopWidth = () => {
      const items = strip.querySelectorAll('.photo-strip__item');
      const copy = strip.querySelector('.photo-strip__item[aria-hidden="true"]');
      return copy && items[0] ? copy.offsetLeft - items[0].offsetLeft : 0;
    };

    let pos = strip.scrollLeft;
    let holdUntil = 0;
    let drag = null;
    let last = performance.now();
    let frame;

    const hold = () => { holdUntil = performance.now() + RESUME_AFTER; };
    const wrap = () => {
      const width = loopWidth();
      if (!width || reduce) return;
      if (strip.scrollLeft >= width) strip.scrollLeft -= width;
      else if (strip.scrollLeft <= 0) strip.scrollLeft += width;
    };

    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      if (!reduce && !drag && now > holdUntil) {
        pos += SPEED * dt;
        const width = loopWidth();
        if (width && pos >= width) pos -= width;
        strip.scrollLeft = pos;
      } else {
        pos = strip.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Mouse dragging (touch and trackpads scroll natively).
    const down = (e) => {
      hold();
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: strip.scrollLeft, moved: false };
      strip.classList.add('is-dragging');
    };
    const move = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 3) drag.moved = true;
      strip.scrollLeft = drag.left - dx;
      wrap();
      hold();
    };
    const up = () => {
      if (!drag) return;
      drag = null;
      strip.classList.remove('is-dragging');
      hold();
    };
    const userScroll = () => { hold(); wrap(); };

    strip.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    strip.addEventListener('wheel', userScroll, { passive: true });
    strip.addEventListener('touchstart', hold, { passive: true });
    strip.addEventListener('touchmove', userScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      strip.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      strip.removeEventListener('wheel', userScroll);
      strip.removeEventListener('touchstart', hold);
      strip.removeEventListener('touchmove', userScroll);
    };
  }, []);

  return (
    <div ref={stripRef} className={`photo-strip ${className}`} aria-label={label} role="region">
      <div className="photo-strip__track">
        {[0, 1].map((copy) =>
          photos.map((p) => (
            <figure key={`${copy}-${p.src}`} className="photo-strip__item" aria-hidden={copy === 1 || undefined}>
              <img
                src={p.src}
                alt={copy === 0 ? p.alt : ''}
                loading="lazy"
                decoding="async"
                draggable={false}
                onLoad={fadeIn}
                ref={(img) => img?.complete && img.classList.add('is-loaded')}
              />
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          )),
        )}
      </div>
    </div>
  );
}
