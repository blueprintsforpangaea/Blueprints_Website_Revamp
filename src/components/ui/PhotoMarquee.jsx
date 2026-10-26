// A row of photos that drifts past on its own and pauses on hover.
// The second copy makes the loop seamless and is hidden from screen
// readers. With reduced motion it stays still and scrolls by hand.
export default function PhotoMarquee({ photos, label, className = '' }) {
  return (
    <div className={`photo-strip ${className}`} aria-label={label} role="region">
      <div className="photo-strip__track">
        {[0, 1].map((copy) =>
          photos.map((p) => (
            <figure key={`${copy}-${p.src}`} className="photo-strip__item" aria-hidden={copy === 1 || undefined}>
              <img src={p.src} alt={copy === 0 ? p.alt : ''} loading="lazy" decoding="async" />
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          )),
        )}
      </div>
    </div>
  );
}
