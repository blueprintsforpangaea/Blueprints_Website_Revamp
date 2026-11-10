// A row of photos that drifts past on its own. The second copy makes
// the loop seamless and is hidden from screen readers. Photos fade in
// as they finish loading instead of popping in. With reduced motion
// it stays still and scrolls by hand.
const fadeIn = (e) => e.currentTarget.classList.add('is-loaded');

export default function PhotoMarquee({ photos, label, className = '' }) {
  return (
    <div className={`photo-strip ${className}`} aria-label={label} role="region">
      <div className="photo-strip__track">
        {[0, 1].map((copy) =>
          photos.map((p) => (
            <figure key={`${copy}-${p.src}`} className="photo-strip__item" aria-hidden={copy === 1 || undefined}>
              <img
                src={p.src}
                alt={copy === 0 ? p.alt : ''}
                loading="lazy"
                decoding="async"
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
