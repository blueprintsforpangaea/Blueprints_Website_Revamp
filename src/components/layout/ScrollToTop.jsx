import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reset scroll position on every route change. React Router's <Link>
// pushes history without triggering the browser's own fragment scroll,
// so a `to="/page#section"` link has to be scrolled here or it lands
// at the top of the page instead of at the section.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
      // Unknown fragment — fall through and reset to the top.
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);

  return null;
}
