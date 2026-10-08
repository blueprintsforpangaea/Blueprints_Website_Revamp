import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { DEPARTMENTS, PIPELINE } from '../data/departments.js';
import { TOTALS } from '../data/stats.js';
import { motion, useReducedMotion } from 'framer-motion';
import partnerPhoto from '../assets/images/12dd519c-c348-407b-b191-8031453d39c2-1-105-c.jpg';
import collectPhoto from '../assets/images/726a596d-3249-43ff-a5c2-4c5e01be5098.jpg';
import verifyPhoto from '../assets/images/img-2540.jpg';
import shipPhoto from '../assets/images/9fdcc1e7-5bd6-44dc-8afe-dd642b4a08cadsc-0258.jpg';

// One real photo per step of the route, in PIPELINE order.
const STEP_PHOTOS = [
  { src: partnerPhoto, alt: 'Two people at Hope Clinic holding a box of donated supplies' },
  { src: collectPhoto, alt: 'A volunteer among stacked boxes in the warehouse' },
  { src: verifyPhoto, alt: 'Hands sealing a box of checked supplies' },
  { src: shipPhoto, alt: 'Volunteers loading boxes into a van' },
];

// Departments with published copy get a card; the rest are named in
// one line until their teams write a description.
const DESCRIBED = DEPARTMENTS.filter((d) => d.charter);
const UNDESCRIBED = DEPARTMENTS.filter((d) => !d.charter);

export default function Mission() {
  const reduce = useReducedMotion();
  return (
    <article>
      <PageHeader title="What we do">
        Blueprints for Pangaea is a medical surplus recovery organization. We reallocate
        essential medical supplies from areas of surplus to communities in need.
      </PageHeader>

      {/* Signature: the supply chain as one route, hospital to clinic. */}
      <section className="route-section" aria-labelledby="route-title">
        <div className="container">
          <h2 id="route-title" className="section-title section-title--sm">How a shipment happens</h2>
          <ol className="route">
            <motion.span
              className="route__line"
              aria-hidden="true"
              initial={reduce ? false : { scaleX: 0, scaleY: 0 }}
              whileInView={{ scaleX: 1, scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {PIPELINE.map((s, i) => (
              <Reveal as="li" className="route__stop" key={s.num} delay={0.25 + i * 0.25}>
                <figure className="route__photo">
                  <img src={STEP_PHOTOS[i].src} alt={STEP_PHOTOS[i].alt} loading="lazy" />
                </figure>
                <span className="route__node">{i + 1}</span>
                <h3 className="route__title">{s.title}</h3>
                <p>{s.short}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* One dark band: the size of the problem, as one large number. */}
      <section className="band-navy">
        <div className="container band-navy__split">
          <Reveal>
            <p className="big-figure">
              <strong>{(TOTALS.wasteTons / 1_000_000).toFixed(0)} million tons</strong>
              <span>of unused medical supplies thrown away by U.S. healthcare every year</span>
            </p>
          </Reveal>
          <Reveal className="band-navy__text" delay={0.1}>
            <h2>The problem</h2>
            <p>
              Billions of people around the world lack basic medical supplies and equipment, while
              roughly {(TOTALS.wastePounds / 1_000_000_000).toFixed(0)} billion pounds go to waste here.
              Our university chapters and high school clubs collect some of that surplus and ship it
              to clinics and hospitals, in the U.S. and overseas.
            </p>
          </Reveal>
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
