import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { DEPARTMENTS, PIPELINE } from '../data/departments.js';
import { TOTALS } from '../data/stats.js';

export default function Mission() {
  return (
    <article>
      <PageHeader eyebrow="Our mission" title="Reallocating surplus into care">
        Blueprints for Pangaea is a nonprofit medical surplus recovery organization that
        reallocates unused medical supplies from areas of surplus to communities in need.
      </PageHeader>

      {/* ---------- The contradiction we exist to solve ---------- */}
      <section className="section">
        <div className="container split">
          <Reveal className="prose">
            <span className="eyebrow">The problem</span>
            <h2 className="section-title" style={{ margin: '1rem 0 1.5rem' }}>
              Two facts that should not coexist.
            </h2>
            <p>
              Around the world, billions of people lack access to basic medical supplies and
              equipment. Meanwhile the U.S. healthcare system discards over{' '}
              <strong>5 million tons</strong> — roughly <strong>10 billion pounds</strong> — of
              unused medical supplies every year.
            </p>
            <p>
              Through our growing network of university chapters and high school clubs, we collect
              that surplus and redistribute it to underserved communities locally and
              internationally.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="media-frame">
              <div className="media-frame__pattern" />
              <div className="media-frame__stat">
                <div className="big">{(TOTALS.wastePounds / 1_000_000_000).toFixed(0)}B</div>
                <span className="cap">Pounds of unused supplies discarded each year in the U.S.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- The four-step pipeline ---------- */}
      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">How we work</span>
            <h2 className="section-title">From surplus to shipment</h2>
            <p>Four steps, run end to end by students.</p>
          </Reveal>
          <div className="steps">
            {PIPELINE.map((s, i) => (
              <Reveal as="div" className="step" key={s.num} delay={i * 0.1}>
                <div className="step__num">{s.num}</div>
                <div className="step__line" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Departments ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">Our departments</span>
            <h2 className="section-title">Four teams, one supply chain</h2>
            <p>
              Every member joins a department. Each one owns a distinct part of the work — and
              ships projects of its own.
            </p>
          </Reveal>

          <div className="dept-list">
            {DEPARTMENTS.map((d, i) => (
              <Reveal as="section" className="dept" key={d.id} delay={(i % 2) * 0.08}>
                <div className="dept__head">
                  <h3 className="dept__name">{d.name}</h3>
                  <p className="dept__charter">{d.charter}</p>
                </div>

                <div className="dept__body">
                  <div className="dept__block">
                    <span className="dept__label">What the team owns</span>
                    <ul className="dept__responsibilities">
                      {d.responsibilities.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="dept__block">
                    <span className="dept__label">Recent projects</span>
                    {d.projects.map((p) => (
                      <div className="dept__project" key={p.name}>
                        <strong>{p.name}</strong>
                        <p>{p.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/impact" className="btn btn--dark btn--lg">
              See where it goes <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
