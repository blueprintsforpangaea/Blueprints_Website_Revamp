import Reveal from '../ui/Reveal.jsx';
import ShipmentCard from '../ui/ShipmentCard.jsx';
import { FEATURED_SHIPMENTS, OTHER_SHIPMENTS } from '../../data/shipments.js';

export default function RecentShipments() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <h2 className="section-title">Shipments</h2>
        </Reveal>

        <div className="ships">
          {FEATURED_SHIPMENTS.map((s, i) => (
            <ShipmentCard shipment={s} key={s.id} delay={(i % 3) * 0.06} />
          ))}
        </div>

        <Reveal as="details" className="ship-more">
          <summary className="link-arrow">
            See {OTHER_SHIPMENTS.length} more shipments
          </summary>
          <ul className="ship-list">
            {OTHER_SHIPMENTS.map((s) => (
              <li key={s.id}>
                <span className="ship-list__place">{s.place}</span>
                <span className="ship-list__what">{s.partner || s.detail}</span>
                <span className="ship-list__when">
                  {[s.value, s.date].filter(Boolean).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
