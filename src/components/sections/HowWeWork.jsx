import Reveal from '../ui/Reveal.jsx';

const STEPS = [
  { num: '01', title: 'Partner', body: 'We build relationships with hospitals and suppliers that have surplus, in-date medical inventory.' },
  { num: '02', title: 'Collect', body: 'Our student volunteers recover usable supplies before they ever enter the waste stream.' },
  { num: '03', title: 'Verify', body: 'Every item is sorted, inspected, and cataloged to meet safe redistribution standards.' },
  { num: '04', title: 'Ship', body: 'Supplies are delivered to vetted clinics and relief partners — at home and around the world.' },
];

export default function HowWeWork() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow eyebrow--center">How We Work</span>
          <h2 className="section-title">From surplus to <span className="text-accent">saved lives</span></h2>
          <p>A simple, accountable pipeline that turns waste into care — run by students, trusted by partners.</p>
        </Reveal>

        <div className="steps">
          {STEPS.map((step, i) => (
            <Reveal as="div" className="step" key={step.num} delay={i * 0.1}>
              <div className="step__num">{step.num}</div>
              <div className="step__line" />
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
