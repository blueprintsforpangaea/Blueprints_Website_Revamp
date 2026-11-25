import { useEffect, useState } from 'react';
import { IMPACT_API_URL, TOTALS, withLiveTotals } from '../data/stats.js';

// The site's totals with the Blueprints Hub's live supplies value, pounds and
// shipment count. Fetched once per visit and shared by every page; until it
// arrives, or if the Hub can't be reached, the fallback numbers in TOTALS show.
let request = null;
let latest = null;

function loadImpact() {
  if (!request) {
    request = fetch(IMPACT_API_URL)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null)
      .then((live) => {
        latest = live ? withLiveTotals(live) : null;
        return latest;
      });
  }
  return request;
}

export default function useImpactTotals() {
  const [totals, setTotals] = useState(latest || TOTALS);
  useEffect(() => {
    let active = true;
    loadImpact().then((live) => {
      if (active && live) setTotals(live);
    });
    return () => {
      active = false;
    };
  }, []);
  return totals;
}
