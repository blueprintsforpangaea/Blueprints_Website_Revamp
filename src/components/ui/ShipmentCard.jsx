import Reveal from './Reveal.jsx';
import Photo from './Photo.jsx';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import { shipmentPhoto } from '../../assets/photos.js';
import ShipmentGlobe from '../pangaea/ShipmentGlobe.jsx';

// The headline figure for a shipment. Dollar values are the worth of
// the supplies themselves, not the cost of shipping them.
export const shipmentHeadline = (s) => (s.value ? `${s.value} worth of supplies` : s.figure);

const chapterName = (c) => c && `${c} ${c.includes('&') ? 'chapters' : 'chapter'}`;

// A shipment's photo, or until one exists, a small globe with the
// route from the chapter that sent it.
export function ShipmentVisual({ shipment: s }) {
  const photo = shipmentPhoto(s.id);
  if (photo) return <Photo src={photo} alt="" className="ship__photo" />;
  return <span className="ship__photo ship__photo--globe"><ShipmentGlobe shipment={s} /></span>;
}

// The same four facts for every shipment, in the same order, so no
// card looks like it's missing a record.
export function ShipmentFacts({ shipment: s }) {
  const facts = [
    ['When', s.date],
    ['Chapter', chapterName(s.chapter)],
    ['Partner', s.partner],
    ['Value of supplies', s.value],
  ];
  return (
    <dl className="ship__facts">
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || '—'}</dd>
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
          <span className="ship__place">{s.place}</span>
          {headline && <span className="ship__figure">{headline}</span>}
        </summary>
        <ShipmentVisual shipment={s} />
        <Body s={s} />
      </details>
    );
  }

  return (
    <Reveal as="article" className="ship" delay={delay}>
      <ShipmentVisual shipment={s} />
      <h3 className="ship__place">{s.place}</h3>
      {headline && <p className="ship__figure">{headline}</p>}
      <Body s={s} />
    </Reveal>
  );
}
