import { RECENT_SHIPMENTS } from '../../data/shipments.js';
import Card from '../ui/Card.jsx';

export default function RecentShipments() {
  // SAMS, Project C.U.R.E., Hope Clinic, etc.
  return (
    <section className="shipments">
      <h2 className="shipments__title">Recent Shipments</h2>
      <div className="shipments__grid">
        {RECENT_SHIPMENTS.map((s) => (
          <Card
            key={s.id}
            title={s.partner}
            subtitle={`${s.destination} · ${s.date}`}
            body={s.description}
            image={s.image}
          />
        ))}
      </div>
    </section>
  );
}
