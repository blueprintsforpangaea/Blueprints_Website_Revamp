const PARTNER_NAMES = [
  'SAMS', 'Project C.U.R.E.', 'Hope Clinic', 'Medical Bridges', 'Packard Health',
  'Food Gatherers', 'Wolverine Street Med', 'UM Free Clinic', 'Asian Center SE Michigan',
];

export default function TrustBar() {
  const loop = [...PARTNER_NAMES, ...PARTNER_NAMES];
  return (
    <div className="trustbar">
      <div className="container">
        <p className="trustbar__label">Partnering with clinics, hospitals & relief organizations</p>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {loop.map((name, i) => (
            <span className="marquee__item" key={i}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
