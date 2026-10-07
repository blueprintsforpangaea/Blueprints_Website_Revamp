import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { DEPARTMENTS, PIPELINE } from '../data/departments.js';
import { TOTALS } from '../data/stats.js';
import vanPhoto from '../assets/images/efd3cc03-681e-468b-8608-f746800f9dc2dsc-0260.jpg';

// Departments with published copy get a card; the rest are named in
// one line until their teams write a description.
const DESCRIBED = DEPARTMENTS.filter((d) => d.charter);
const UNDESCRIBED = DEPARTMENTS.filter((d) => !d.charter);

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
          </Reveal>

          <div className="dept-grid">
            {DESCRIBED.map((d, i) => (
              <Reveal as="section" className="dept" key={d.id} delay={(i % 2) * 0.06}>
                <h3 className="dept__name">{d.name}</h3>
                <p className="dept__charter">{d.charter}</p>
                {d.responsibilities && (
                  <p className="dept__line">
                    <strong>Responsible for:</strong> {d.responsibilities.join(', ')}.
                  </p>
                )}
                {d.projects && (
                  <ul className="dept__projects">
                    {d.projects.map((p) => (
                      <li key={p.name}><strong>{p.name}.</strong> {p.detail}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>

          {UNDESCRIBED.length > 0 && (
            <p className="dept-more">
              Headquarters also has {new Intl.ListFormat('en').format(UNDESCRIBED.map((d) => d.name))}{' '}
              {UNDESCRIBED.length > 1 ? 'departments' : 'department'}.
            </p>
          )}

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
