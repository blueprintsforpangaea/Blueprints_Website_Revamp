import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { TOTALS } from '../data/stats.js';

const VALUES = [
  { num: '01', title: 'Dignity First', body: 'Every community deserves quality care. We deliver supplies with respect, never as charity-for-show.' },
  { num: '02', title: 'Zero Waste', body: 'Usable supplies belong in clinics, not landfills. Sustainability is built into our model.' },
  { num: '03', title: 'Student-Led', body: 'Real responsibility in students’ hands — logistics, partnerships, and impact, all run by young leaders.' },
  { num: '04', title: 'Radical Transparency', body: 'We track and report what we ship, where it goes, and the value delivered — down to the dollar.' },
];

const STEPS = [
  { num: '01', title: 'Partner', body: 'Relationships with hospitals and suppliers with surplus, in-date inventory.' },
  { num: '02', title: 'Collect', body: 'Volunteers recover usable supplies before they enter the waste stream.' },
  { num: '03', title: 'Verify', body: 'Each item sorted, inspected, and cataloged for safe redistribution.' },
  { num: '04', title: 'Ship', body: 'Delivered to vetted clinics and relief partners worldwide.' },
];

export default function Mission() {
  usePageMeta(
    'Our Mission',
    'We recover unused medical supplies from areas of surplus and redistribute them to resource-limited communities — saving lives one box at a time.',
  );
  return (
    <article>
      <PageHeader eyebrow="Our Mission" title="Redistributing surplus into care">
        Blueprints for Pangaea recovers unused medical supplies from areas of surplus and
        redistributes them to resource-limited communities — saving lives one box at a time.
      </PageHeader>

      <section className="section">
        <div className="container split">
          <Reveal className="prose">
            <span className="eyebrow">The Vision</span>
            <h2 className="section-title" style={{ margin: '1rem 0 1.5rem' }}>A world where no clinic goes without.</h2>
            <p>
              More than <strong>5 million tons</strong> of medical supplies are wasted every year while
              clinics around the world lack the basics. That contradiction is the problem we exist to solve.
            </p>
            <p>
              We imagine a global network where surplus flows efficiently to need — where a box of sutures
              destined for a landfill instead reaches a surgeon who needs it, anywhere on earth.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="media-frame">
              <div className="media-frame__pattern" />
              <div className="media-frame__stat">
                <div className="big">{TOTALS.dollarsDisplay}</div>
                <span className="cap">Supplies redistributed to date</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">Our Values</span>
            <h2 className="section-title">What we stand for</h2>
          </Reveal>
          <div className="grid-4">
            {VALUES.map((v, i) => (
              <Reveal as="div" className="value-card" key={v.num} delay={(i % 4) * 0.08}>
                <div className="value-card__num">{v.num}</div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">How We Work</span>
            <h2 className="section-title">The pipeline</h2>
          </Reveal>
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal as="div" className="step" key={s.num} delay={i * 0.1}>
                <div className="step__num">{s.num}</div>
                <div className="step__line" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/impact" className="btn btn--dark btn--lg">See Where It Goes <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>
    </article>
  );
}
