import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { LEADERSHIP_GROUPS } from '../data/team.js';
import { headshotFor } from '../assets/team/headshots.js';
import { TOTALS } from '../data/stats.js';
import { ORG } from '../data/site.js';

// Every entry maps to a documented shipment, partnership, or chapter
// founding on the live site.
const TIMELINE = [
  {
    year: '2013',
    text: 'Ben Rathi started Blueprints at U-M after visiting a hospital in Nepal that was short on basic supplies, and then seeing the same supplies thrown out at home.',
  },
  {
    year: '2016',
    text: 'First international partnership, with Seeds of Hope in the Dominican Republic. Michigan State and Ohio State became the first chapters outside Ann Arbor.',
  },
  {
    year: '2017',
    text: 'Expanded our partnerships, which helped us ship more, and more often.',
  },
  {
    year: '2020',
    text: 'During COVID-19, we sent PPE to Michigan hospitals, supplies to India, and face shields to Ann Arbor healthcare facilities.',
  },
  {
    year: '2023',
    text: 'Santa Clara University and the University of Miami Medical School started chapters.',
  },
  {
    year: '2025',
    text: 'Sent more than 60 pallets, worth over $573,000, to Nigeria. The University of Nebraska Omaha became our eleventh chapter.',
  },
];

// A photo when team.js has one, otherwise the person's initials in
// the same frame, so the grid looks finished while photos come in.
function Headshot({ person }) {
  const src = headshotFor(person.name);
  if (src) return <img className="person__photo" src={src} alt="" loading="lazy" />;
  const initials = person.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
  return <span className="person__photo person__photo--empty" aria-hidden="true">{initials}</span>;
}

export default function AboutUs() {
  return (
    <article>
      <PageHeader title="About us">
        Blueprints for Pangaea started at the University of Michigan in {ORG.founded}. We’re a
        student-run {ORG.taxStatus} that works with hospitals and suppliers to keep usable medical
        supplies out of the trash.
      </PageHeader>

      <section className="section">
        <div className="container split split--top">
          <Reveal className="prose">
            <h2 className="section-title">
              Run by students
            </h2>
            <p>
              Students handle every step: they set up hospital partnerships, keep the warehouse
              inventory, check what’s safe to ship, arrange transport, and track the numbers.
            </p>
            <p>
              We have {TOTALS.chapters} chapters and {TOTALS.members}+ members, and we’ve
              shipped to {TOTALS.countries}+ countries.
            </p>
            <Link to="/get-involved" className="link-arrow">
              Join us <span className="arrow">→</span>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="timeline">
              {TIMELINE.map((t) => (
                <li className="timeline__item" key={t.year}>
                  <span className="timeline__year">{t.year}</span>
                  <p>{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">Leadership</h2>
          </Reveal>

          {LEADERSHIP_GROUPS.map((group, gi) => (
            <div className="team-group" key={group.id}>
              <Reveal className="team-group__head" delay={gi * 0.05}>
                <h3>{group.title}</h3>
              </Reveal>
              {group.headshots ? (
                <ul className="people">
                  {group.people.map((m, i) => (
                    <Reveal as="li" className="person" key={m.name} delay={Math.min(i, 6) * 0.04} y={14}>
                      <Headshot person={m} />
                      <span className="person__name">{m.name}</span>
                      <span className="person__role">{m.role}</span>
                    </Reveal>
                  ))}
                </ul>
              ) : (
                <ul className="roster">
                  {group.people.map((m, i) => (
                    <Reveal as="li" className="roster__row" key={m.name} delay={Math.min(i, 6) * 0.04} y={14}>
                      <span className="roster__name">{m.name}</span>
                      <span className="roster__role">{m.role}</span>
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
