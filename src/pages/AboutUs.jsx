import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import ScrollRow from '../components/ui/ScrollRow.jsx';
import { LEADERSHIP_GROUPS } from '../data/team.js';
import { headshotFor } from '../assets/team/headshots.js';
import { TOTALS } from '../data/stats.js';
import { ORG } from '../data/site.js';
import { CHAPTERS } from '../data/chapters.js';
import groupPhoto from '../assets/images/img-2457.jpg';
import tablePhoto from '../assets/images/dsc06350.jpg';
import sortPhoto from '../assets/images/eae28d10-7a69-40e0-af54-3d146010a570-1-105-c.jpg';
import boxesPhoto from '../assets/images/238939e5-8c3b-4744-bfd5-5a90886e10a3dsc-0252.jpg';
import vanPhoto from '../assets/images/efd3cc03-681e-468b-8608-f746800f9dc2dsc-0260.jpg';
import blanketPhoto from '../assets/images/44785d8d-ef05-4297-97c2-434536b603a8.jpg';
import classPhoto from '../assets/images/dsc07300.jpg';
import suitsPhoto from '../assets/images/dsc04424.jpg';
import osuPhoto from '../assets/images/chapters/osu/b4p-eboard.jpg';
import gnjPhoto from '../assets/images/chapters/greater-nj/img-5664.jpg';
import wsuPhoto from '../assets/images/chapters/wayne-state/img-2328.jpg';

// A side-scrolling strip of photos from headquarters and the chapters.
const STRIP = [
  { src: groupPhoto, alt: 'A large group of Blueprints members in matching shirts' },
  { src: osuPhoto, alt: 'Ohio State chapter members', caption: 'Ohio State' },
  { src: boxesPhoto, alt: 'Four members in front of stacked boxes of supplies' },
  { src: tablePhoto, alt: 'Members at a Blueprints information table' },
  { src: gnjPhoto, alt: 'Greater New Jersey members with donated supplies', caption: 'Greater New Jersey' },
  { src: vanPhoto, alt: 'Three members sitting in a van loaded with boxes' },
  { src: blanketPhoto, alt: 'Members making blankets at Day of Service' },
  { src: wsuPhoto, alt: 'Wayne State members packing supplies', caption: 'Wayne State' },
  { src: classPhoto, alt: 'Members leading a supply-sorting lesson in a classroom' },
  { src: sortPhoto, alt: 'Three members in the warehouse among boxes of supplies' },
  { src: suitsPhoto, alt: 'Members dressed up at a Blueprints event' },
];

// Chapters by the year they started, read from chapters.js so the
// milestones stay in step with the chapter list.
const startedIn = (year) =>
  new Intl.ListFormat('en').format(
    CHAPTERS.filter((c) => c.since === year && !c.isHQ).map((c) => c.name),
  );
const BY_START = [...CHAPTERS].sort((a, b) => a.since - b.since);
const TENTH = BY_START[9];

// Every entry maps to a documented shipment, partnership, or chapter
// founding on the live site, or to the chapter list.
const TIMELINE = [
  {
    year: '2013',
    text: 'Ben Rathi started Blueprints at U-M after visiting a hospital in Nepal that was short on basic supplies, and then seeing the same supplies thrown out at home.',
  },
  {
    year: '2016',
    text: `First international partnership, with Seeds of Hope in the Dominican Republic. ${startedIn(2016)} became the first chapters outside Ann Arbor.`,
  },
  {
    year: '2017',
    text: `Expanded our partnerships, which let us ship more often. ${startedIn(2017)} started a chapter.`,
  },
  {
    year: '2020',
    text: `During COVID-19, we sent PPE and face shields to Michigan hospitals and a 12-pallet shipment to India. ${startedIn(2020)} started chapters.`,
  },
  {
    year: '2022',
    text: `${startedIn(2022)} started a chapter.`,
  },
  {
    year: '2023',
    text: `${startedIn(2023)} started chapters.`,
  },
  {
    year: String(TENTH.since),
    text: `${TENTH.name} became our tenth chapter.`,
  },
  {
    year: '2025',
    text: `Sent more than 60 pallets, worth over $573,000, to Nigeria. ${startedIn(2025)} started chapters, making ${TOTALS.chapters}.`,
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

      <section className="band-navy">
        <div className="container">
          <div className="band-navy__split band-navy__split--top">
            <Reveal className="band-navy__text">
              <h2>Run by students</h2>
              <p>
                Students handle every step: they set up hospital partnerships, keep the warehouse
                inventory, check what’s safe to ship, arrange transport, and track the numbers.
              </p>
              <Link to="/get-involved" className="btn btn--light" style={{ marginTop: '1.5rem' }}>
                Join us
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="figures">
                <li><strong>{TOTALS.chapters}</strong> chapters</li>
                <li><strong>{TOTALS.members}+</strong> members</li>
                <li><strong>{TOTALS.countries}+</strong> countries shipped to</li>
                <li><strong>${Math.floor(TOTALS.suppliesValue / 1_000_000)}M+</strong> in supplies shipped</li>
              </ul>
            </Reveal>
          </div>
        </div>
        <ScrollRow className="photo-strip" label="Photos from headquarters and our chapters">
          {STRIP.map((p) => (
            <figure key={p.src} className="photo-strip__item">
              <img src={p.src} alt={p.alt} loading="lazy" />
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          ))}
        </ScrollRow>
      </section>

      {/* Signature: our history, left to right. */}
      <section className="years-section" aria-labelledby="years-title">
        <div className="container">
          <h2 id="years-title" className="section-title">Our history</h2>
        </div>
        <ScrollRow className="years" label="Timeline">
          {TIMELINE.map((t) => (
            <div className="years__item" key={t.year + t.text}>
              <span className="years__year">{t.year}</span>
              <p>{t.text}</p>
            </div>
          ))}
        </ScrollRow>
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
