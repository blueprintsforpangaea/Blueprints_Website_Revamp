import Stats from '../components/sections/Stats.jsx';
import RecentShipments from '../components/sections/RecentShipments.jsx';

export default function Impact() {
  // Detailed metrics, country list, partner orgs, shipment history table.
  return (
    <article className="page page--impact">
      <h1>Our Impact</h1>
      <Stats />
      {/* TODO: map of countries served */}
      {/* TODO: partner organizations list */}
      <RecentShipments />
    </article>
  );
}
