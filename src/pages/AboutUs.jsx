import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { LEADERSHIP } from '../data/team.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

const TIMELINE = [
  { year: '2013', text: 'Founded at the University of Michigan to rescue surplus medical supplies from local hospitals.' },
  { year: '2016', text: 'First international shipments reach partner clinics abroad, expanding our footprint beyond Michigan.' },
  { year: '2019', text: 'Chapter model launches — students at peer universities begin building their own warehouses and partnerships.' },
  { year: '2022', text: 'Crisis-relief partnerships scale up, supporting displaced communities and field hospitals overseas.' },
  { year: 'Today', text: '11 chapters, 15+ countries, and over $9M in supplies redistributed — and counting.' },
];

// Placeholder leadership until real bios are supplied.
const TEAM = LEADERSHIP.length
  ? LEADERSHIP
  : [
      { name: 'Executive Director', role: 'National Leadership' },
      { name: 'Director of Operations', role: 'Logistics & Warehouse' },
      { name: 'Director of Partnerships', role: 'Clinics & Hospitals' },
      { name: 'Director of Chapters', role: 'University Network' },
    ];

export default function AboutUs() {
  usePageMeta(
    'About Us',
    'Founded at the University of Michigan in 2013, Blueprints for Pangaea is one of the largest student-run medical supply redistribution networks in the country.',
  );
  return (
    <article>
      <PageHeader eyebrow="About Us" title="A student movement with a global reach">
        Since 2013, students have been turning hospital surplus into life-saving care — building one
        of the country's largest student-run medical supply redistribution networks.
      </PageHeader>

      <section className="section">
        <div className="container split">
          <Reveal className="prose">
            <span className="eyebrow">Our Story</span>
            <h2 className="section-title" style={{ margin: '1rem 0 1.5rem' }}>It started with one warehouse.</h2>
            <p>
              Blueprints for Pangaea began at the University of Michigan with a simple observation:
              hospitals were throwing away perfectly good supplies while clinics elsewhere went without.
            </p>
            <p>
              A group of students decided to do something about it. What started as boxes in a campus
              storage room grew into a national network of chapters moving supplies across the globe —
              all while giving students hands-on experience in public health, logistics, and leadership.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/get-involved" className="btn btn--dark">Join the Team <span className="arrow">→</span></Link>
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

      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">Leadership</span>
            <h2 className="section-title">The people behind the boxes</h2>
            <p>A national team of students and advisors keeping supplies moving and chapters thriving.</p>
          </Reveal>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <Reveal as="div" className="team-card" key={m.name} delay={(i % 4) * 0.08}>
                <div className="team-card__avatar">{m.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
