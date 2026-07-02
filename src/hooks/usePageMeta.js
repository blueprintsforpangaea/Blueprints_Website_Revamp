import { useEffect } from 'react';

const SITE_NAME = 'Blueprints for Pangaea';
const DEFAULT_TITLE = `${SITE_NAME} — Saving Lives One Box at a Time`;
const DEFAULT_DESCRIPTION =
  'Blueprints for Pangaea rescues surplus medical supplies and redistributes them to clinics worldwide. Saving lives one box at a time.';

// Per-page <title> + meta description for SEO and link sharing.
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description || DEFAULT_DESCRIPTION);
    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) meta.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
