const STEPS = [
  { num: 1, title: 'Partner',  body: 'Build relationships with hospitals and clinics that have surplus supplies.' },
  { num: 2, title: 'Collect',  body: 'Recover usable, in-date supplies before they enter the waste stream.' },
  { num: 3, title: 'Verify',   body: 'Sort, inspect, and catalog inventory for safe redistribution.' },
  { num: 4, title: 'Ship',     body: 'Deliver supplies to vetted partner organizations worldwide.' },
];

export default function HowWeWork() {
  return (
    <section className="how">
      <h2 className="how__title">How We Work</h2>
      <ol className="how__steps">
        {STEPS.map((step) => (
          <li key={step.num} className="how__step">
            <span className="how__num">{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
