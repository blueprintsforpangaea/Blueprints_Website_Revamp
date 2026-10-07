import Reveal from './Reveal.jsx';

// One shipment, always in the same order: where, how much, what,
// then who and when. Shared by the home page and the Impact page.
export default function ShipmentCard({ shipment: s, delay = 0 }) {
  const headline = s.value ? `${s.value} in supplies` : s.figure;
  const chapter = s.chapter && `${s.chapter} ${s.chapter.includes('&') ? 'chapters' : 'chapter'}`;
  const meta = [s.partner, chapter, s.date].filter(Boolean);

  return (
    <Reveal as="article" className="ship" delay={delay}>
      <h3 className="ship__place">{s.place}</h3>
      {headline && <p className="ship__figure">{headline}</p>}
      {s.detail && <p className="ship__detail">{s.detail}</p>}
      {meta.length > 0 && (
        <p className="ship__meta">
          {meta.map((m, i) => (
            <span key={m}>{i > 0 && ' · '}{m}</span>
          ))}
        </p>
      )}
    </Reveal>
  );
}
