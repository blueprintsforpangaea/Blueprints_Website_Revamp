import Reveal from './Reveal.jsx';
import Photo from './Photo.jsx';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import { shipmentPhoto } from '../../assets/photos.js';

// The headline figure for a shipment, always in dollars so every
// card reads in the same unit: the worth of the supplies themselves,
// not the cost of shipping them. Weights and pallet counts stay in
// the detail line. No dollar value on record means no headline.
export const shipmentHeadline = (s) => (s.value ? `${s.value} worth of supplies` : null);

// Local deliveries are named for the clinic or group that got them
// (most share a city); international ones for the country.
const isLocal = (s) => s.region === 'United States' && s.partner;
export const shipmentTitle = (s) => (isLocal(s) ? s.partner : s.place);

const chapterName = (c) => c && `${c} ${c.includes('&') ? 'chapters' : 'chapter'}`;

// A shipment's real photo, if one has been added. Cards without one
// show no picture rather than a stand-in graphic.
export function ShipmentVisual({ shipment: s }) {
  const photo = shipmentPhoto(s.id);
  return photo ? <Photo src={photo} alt="" className="ship__photo" /> : null;
}

// When, which chapter, and which partner, in that order. Facts we
// don't have on record are left out instead of shown as blanks.
export function ShipmentFacts({ shipment: s }) {
  const facts = [
    ['When', s.date],
    ['Chapter', chapterName(s.chapter)],
    isLocal(s) ? ['Where', s.place] : ['Partner', s.partner],
  ].filter(([, value]) => value);
  if (!facts.length) return null;
  return (
    <dl className="ship__facts">
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Body({ s }) {
  return (
    <>
      {s.detail && <p className="ship__detail">{s.detail}</p>}
      <ShipmentFacts shipment={s} />
      {s.story && (
        <details className="ship__story">
          <summary>Read more</summary>
          <p>{s.story}</p>
        </details>
      )}
    </>
  );
}

// One shipment: photo, place, headline, then the shared facts. On
// phones each one folds into a dropdown so the list stays short.
export default function ShipmentCard({ shipment: s, delay = 0 }) {
  const phone = useMediaQuery('(max-width: 700px)');
  const headline = shipmentHeadline(s);

  if (phone) {
    return (
      <details className="ship ship--fold">
        <summary>
          <span className="ship__place">{shipmentTitle(s)}</span>
          {headline && <span className="ship__figure">{headline}</span>}
        </summary>
        <ShipmentVisual shipment={s} />
        <Body s={s} />
      </details>
    );
  }

  return (
    <Reveal as="article" className={`ship ${shipmentPhoto(s.id) ? '' : 'ship--text'}`} delay={delay}>
      <ShipmentVisual shipment={s} />
      <h3 className="ship__place">{shipmentTitle(s)}</h3>
      {headline && <p className="ship__figure">{headline}</p>}
      <Body s={s} />
    </Reveal>
  );
}
