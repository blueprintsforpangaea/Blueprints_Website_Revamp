import { PARTNERSHIPS } from '../../data/partnerships.js';
import { SHIPMENTS } from '../../data/shipments.js';

// Names come from the real partnership and shipment records, so this
// bar can never drift into listing an organization we don't work with.
const PARTNER_NAMES = [
  ...new Set([
    ...PARTNERSHIPS.map((p) => p.name),
    ...SHIPMENTS.map((s) => s.partner).filter(Boolean),
  ]),
];

export default function TrustBar() {
  const loop = [...PARTNER_NAMES, ...PARTNER_NAMES];
  return (
    <div className="trustbar">
      <div className="container">
        <p className="trustbar__label">
          Partnering with clinics, hospitals &amp; relief organizations
        </p>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {loop.map((name, i) => (
            <span className="marquee__item" key={`${name}-${i}`}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
