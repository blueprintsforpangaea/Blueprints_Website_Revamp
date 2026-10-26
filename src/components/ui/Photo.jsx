// A photo, or a labeled empty frame where one belongs. Leave `src`
// out until the real photo exists; the frame keeps the layout
// finished and shows the team exactly where a picture goes.
export default function Photo({ src, alt = '', label = 'Photo coming soon', ratio, className = '' }) {
  const style = ratio ? { aspectRatio: ratio } : undefined;
  if (src) {
    return <img className={`ph ${className}`} src={src} alt={alt} loading="lazy" decoding="async" style={style} />;
  }
  return (
    <span className={`ph ph--empty ${className}`} style={style} role="img" aria-label={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h3l2-2.5h6L17 7h3v12H4z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span>{label}</span>
    </span>
  );
}
