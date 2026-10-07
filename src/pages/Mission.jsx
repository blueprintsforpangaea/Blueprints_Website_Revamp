import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { DEPARTMENTS, DEPARTMENT_COUNT_WORD, PIPELINE } from '../data/departments.js';
import { C_SUITE, VICE_PRESIDENTS } from '../data/team.js';
import { TOTALS } from '../data/stats.js';
import vanPhoto from '../assets/images/efd3cc03-681e-468b-8608-f746800f9dc2dsc-0260.jpg';

const ROSTER = [...C_SUITE, ...VICE_PRESIDENTS];
const leadsFor = (dept) =>
  (dept.leads || []).map((role) => ROSTER.find((p) => p.role === role)).filter(Boolean);

export default function Mission() {
  return (
    <article>
      <PageHeader title="What we do">
        Blueprints for Pangaea is a medical surplus recovery organization. We reallocate
        essential medical supplies from areas of surplus to communities in need.
      </PageHeader>

      <section className="section">
        <div className="container split">
          <Reveal className="prose">
            <h2 className="section-title">The problem</h2>
            <p>
              Billions of people around the world lack basic medical supplies and equipment. At the
              same time, the U.S. healthcare system discards over{' '}
              <strong>{(TOTALS.wasteTons / 1_000_000).toFixed(0)} million tons</strong> of unused
              medical supplies every year. That’s roughly{' '}
              {(TOTALS.wastePounds / 1_000_000_000).toFixed(0)} billion pounds.
            </p>
            <p>
              Our university chapters and high school clubs collect some of that surplus and ship
              it to clinics and hospitals, in the U.S. and overseas.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="photo">
              <img
                src={vanPhoto}
                alt="Three Blueprints volunteers sitting in a van loaded with boxes of supplies"
                loading="lazy"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">How a shipment happens</h2>
          </Reveal>
          <ol className="steps">
            {PIPELINE.map((s, i) => (
              <Reveal as="li" className="step" key={s.num} delay={i * 0.06}>
                <span className="step__num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">Our departments</h2>
            <p>
              Every member at headquarters joins one of {DEPARTMENT_COUNT_WORD} departments.
            </p>
          </Reveal>

          <div className="dept-list">
            {DEPARTMENTS.map((d) => {
              const leads = leadsFor(d);
              return (
                <Reveal as="section" className="dept" key={d.id}>
                  <div className="dept__head">
                    <h3 className="dept__name">{d.name}</h3>
                    {d.charter && <p className="dept__charter">{d.charter}</p>}
                    {leads.length > 0 && (
                      <p className="dept__lead">
                        {leads.map((p) => `${p.name}, ${p.role}`).join(' · ')}
                      </p>
                    )}
                  </div>

                  {(d.responsibilities || d.projects) && (
                    <div className="dept__body">
                      {d.responsibilities && (
                        <div>
                          <h4 className="label">Responsible for</h4>
                          <ul className="dept__responsibilities">
                            {d.responsibilities.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {d.projects && (
                        <div>
                          <h4 className="label">Recent projects</h4>
                          {d.projects.map((p) => (
                            <div className="dept__project" key={p.name}>
                              <strong>{p.name}</strong>
                              <p>{p.detail}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <div className="page-next">
            <Link to="/impact" className="link-arrow">
              See where the supplies have gone <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
