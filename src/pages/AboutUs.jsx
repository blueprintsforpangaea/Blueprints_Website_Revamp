import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { LEADERSHIP_GROUPS } from '../data/team.js';
import { TOTALS } from '../data/stats.js';
import { ORG } from '../data/site.js';

// Every entry below maps to a documented shipment, partnership, or
// chapter founding. Nothing here is an approximation.
const TIMELINE = [
  {
    year: '2013',
    text: 'Founded at the University of Michigan after Ben Rathi visits a hospital in Nepal short of basic supplies — then watches those same supplies thrown out back home.',
  },
  {
    year: '2016',
    text: 'First international partnership, with Seeds of Hope in the Dominican Republic. Michigan State and Ohio State become the first chapters beyond Ann Arbor.',
  },
  {
    year: '2017',
    text: 'The Project C.U.R.E. partnership expands, resolving a shipping bottleneck and opening a route for surplus at scale.',
  },
  {
    year: '2020',
    text: 'COVID-19 response: PPE to Michigan hospitals, a 12-pallet shipment to India, and roughly 700 face shields to Ann Arbor facilities.',
  },
  {
    year: '2023',
    text: '3,000 pounds of supplies sent to northern Syria with SAMS after the earthquake.',
  },
  {
    year: '2025',
    text: `A 60-pallet, $573,000 delivery to Nigeria — and an eleventh chapter at the University of Nebraska Omaha.`,
  },
];

export default function AboutUs() {
  return (
    <article>
      <PageHeader eyebrow="About us" title="A student movement with a global reach">
        Founded at the University of Michigan, we're a student-driven {ORG.taxStatus} working to
        make a tangible impact on healthcare sustainability.
      </PageHeader>

      {/* ---------- What "student-led" actually means ---------- */}
      <section className="section">
        <div className="container split">
          <Reveal className="prose">
            <span className="eyebrow">Our story</span>
            <h2 className="section-title" style={{ margin: '1rem 0 1.5rem' }}>
              We're a student-led nonprofit — but what does that really mean?
            </h2>
            <p>
              It means students run the supply chain. They negotiate the hospital partnerships,
              inventory the warehouse, verify what's safe to ship, book the freight, and answer
              for the numbers afterward.
            </p>
            <p>
              What began as boxes in a campus storage room is now {TOTALS.chapters} chapters and{' '}
              {TOTALS.members}+ members moving supplies across five continents — while giving
              students real responsibility in public health, logistics, and leadership.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/get-involved" className="btn btn--dark">
                Join the team <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="timeline">
              {TIMELINE.map((t) => (
                <div className="timeline__item" key={t.year}>
                  <div className="timeline__dot" />
                  <div className="timeline__year">{t.year}</div>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Leadership ---------- */}
      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">Leadership</span>
            <h2 className="section-title">The people behind the boxes</h2>
            <p>
              A national team of students, expansion managers, and directors keeping supplies
              moving and chapters thriving — supported by a corps of 30+ analysts.
            </p>
          </Reveal>

          {LEADERSHIP_GROUPS.map((group, gi) => (
            <div className="team-group" key={group.id}>
              <Reveal className="team-group__head" delay={gi * 0.05}>
                <h3>{group.title}</h3>
                <span className="team-group__rule" />
                <span className="team-group__count">{group.people.length}</span>
              </Reveal>
              <ul className="roster">
                {group.people.map((m, i) => (
                  <Reveal as="li" className="roster__row" key={m.name} delay={Math.min(i, 6) * 0.04} y={14}>
                    <span className="roster__name">{m.name}</span>
                    <span className="roster__role">{m.role}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
