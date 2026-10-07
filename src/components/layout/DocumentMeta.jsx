import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaForPath } from '../../routes/meta.js';
import { ORG } from '../../data/site.js';

const SITE = 'https://www.blueprintsforpangaea.org';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attr === 'property' ? 'meta' : 'meta');
    const [, key] = selector.match(/\[(?:name|property)="([^"]+)"\]/) || [];
    if (key) el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

// Keeps <title>, the description, the canonical URL, and the Open Graph
// tags in step with the current route. Without this, every URL in a
// single-page app inherits the home page's metadata.
export default function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = metaForPath(pathname);

    // The tab always reads just the organization's name.
    document.title = ORG.name;
    setMeta('meta[name="description"]', 'name', description);
    setMeta('meta[property="og:title"]', 'property', title);
    setMeta('meta[property="og:description"]', 'property', description);
    setMeta('meta[property="og:url"]', 'property', SITE + pathname);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', SITE + pathname);
  }, [pathname]);

  return null;
}
