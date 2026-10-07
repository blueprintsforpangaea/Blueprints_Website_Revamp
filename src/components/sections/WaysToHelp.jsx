import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { PATHWAYS } from '../../data/involvement.js';
import { TOTALS } from '../../data/stats.js';
import imgDonate from '../../assets/images/12dd519c-c348-407b-b191-8031453d39c2-1-105-c.jpg';
import imgSupplies from '../../assets/images/img-8633.jpg';
import imgStudents from '../../assets/images/dsc06350.jpg';
import imgVolunteer from '../../assets/images/44785d8d-ef05-4297-97c2-434536b603a8.jpg';

const volunteerUrl = PATHWAYS.find((p) => p.id === 'volunteer').url;

// One column per audience, each with one place to go next. The Get
// Involved page has the full details behind every link.
const AUDIENCES = [
  {
    title: 'Donate',
    body: 'We’re a 501\u2060(c)\u2060(3), so gifts are tax-deductible.',
    links: [{ label: 'Donate', to: '/donate' }],
    img: imgDonate,
    alt: 'A Blueprints volunteer delivering a box of supplies to Hope Clinic',
  },
  {
    title: 'Give supplies',
    body: 'Hospitals and clinics with unused, unexpired supplies can email us to set up a pickup.',
    links: [{ label: 'What we accept', to: '/get-involved#supplies' }],
    img: imgSupplies,
    alt: 'Volunteers standing among boxes of donated supplies',
  },
  {
    title: 'Join a chapter',
    body: `Students can join one of our ${TOTALS.chapters} chapters or start one at their school.`,
    links: [
      { label: 'Find a chapter', to: '/chapters' },
      { label: 'Start one', to: '/get-involved#chapter' },
    ],
    img: imgStudents,
    alt: 'Chapter members tabling at a street fair',
  },
  {
    title: 'Volunteer',
    body: 'Sort and catalog supplies at the warehouse. No experience needed.',
    links: [{ label: 'Sign up for a shift', href: volunteerUrl }],
    img: imgVolunteer,
    alt: 'Volunteers making blankets at a Blueprints service event',
  },
];

function RowLink({ link }) {
  const inner = <>{link.label} <span className="arrow">→</span></>;
  return link.href ? (
    <a className="link-arrow" href={link.href} target="_blank" rel="noreferrer">{inner}</a>
  ) : (
    <Link className="link-arrow" to={link.to}>{inner}</Link>
  );
}

export default function WaysToHelp() {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal className="section-head">
          <h2 className="section-title">Ways to help</h2>
        </Reveal>

        <div className="audiences">
          {AUDIENCES.map((a, i) => (
            <Reveal as="article" className="audience" key={a.title} delay={i * 0.06}>
              <figure className="audience__photo">
                <img src={a.img} alt={a.alt} loading="lazy" />
              </figure>
              <div className="audience__copy">
                <h3>{a.title}</h3>
                <p>{a.body}</p>
                <div className="audience__links">
                  {a.links.map((l) => <RowLink link={l} key={l.label} />)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
