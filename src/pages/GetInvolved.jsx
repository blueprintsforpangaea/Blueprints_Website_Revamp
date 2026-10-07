import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import {
  PATHWAYS,
  INTERNSHIP,
  SUPPLIES_ACCEPTED,
  SUPPLIES_DECLINED,
  MEMBER_FAQ,
  CHAPTER_FAQ,
  CHAPTER_STEPS,
  EXPANSION_CONTACT,
} from '../data/involvement.js';
import { ORG } from '../data/site.js';
import { RECRUITMENT } from '../data/recruitment.js';
import { DEPARTMENT_COUNT_WORD, DEPARTMENT_LIST } from '../data/departments.js';

const pathway = (id) => PATHWAYS.find((p) => p.id === id);
const chapterFormUrl = pathway('chapter').url;
const volunteer = pathway('volunteer');

// A short index instead of a full list: each option below already
// has its own section, so the top of the page only points to them.
const INDEX = [
  {
    who: 'Students',
    links: [
      { label: 'Join headquarters', to: '#recruitment' },
      { label: 'Start a chapter', to: '#chapter' },
      { label: 'High school internship', to: '#internship' },
    ],
  },
  {
    who: 'Hospitals and clinics',
    links: [{ label: 'Donate supplies', to: '#supplies' }],
  },
];

function Faq({ items }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details className="faq__item" key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export default function GetInvolved() {
  return (
    <article>
      <PageHeader title="Get involved" />

      <section className="section section--tight">
        <div className="container">
          <Reveal className="gi-index">
            {INDEX.map((group) => (
              <div className="gi-index__group" key={group.who}>
                <h2 className="label">{group.who}</h2>
                <ul>
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.to} className="link-arrow">
                        {l.label} <span className="arrow">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="gi-index__group">
              <h2 className="label">Anyone</h2>
              <p>
                {volunteer.body}{' '}
                <a href={volunteer.url} target="_blank" rel="noreferrer">Sign up for a shift</a>.
              </p>
              <Link to="/donate" className="btn btn--primary btn--sm">Donate</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Membership at HQ ---------- */}
      <section className="section section--soft" id="recruitment">
        <div className="container">
          <div className="split">
            <Reveal className="prose">
              <h2 className="section-title">Become a member at headquarters</h2>
              <p>
                Members join one of {DEPARTMENT_COUNT_WORD} departments ({DEPARTMENT_LIST}) and put in
                about 5 to 7 hours a week. Recruitment runs each semester at the University of
                Michigan.
              </p>
              <Link to="/mission" className="link-arrow">
                Read about the departments <span className="arrow">→</span>
              </Link>
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="label">Common questions</h3>
              <Faq items={MEMBER_FAQ} />
            </Reveal>
          </div>

          {/* Recruitment events: edit src/data/recruitment.js each semester. */}
          <Reveal className="recruit">
            <div className="recruit__head">
              <h3 className="recruit__title">{RECRUITMENT.term} recruitment</h3>
              {RECRUITMENT.open && RECRUITMENT.applyUrl ? (
                <a href={RECRUITMENT.applyUrl} target="_blank" rel="noreferrer" className="btn btn--dark">
                  Apply now
                </a>
              ) : (
                <p className="recruit__status">{RECRUITMENT.closedNote}</p>
              )}
            </div>
            <ol className="recruit__events">
              {RECRUITMENT.events.map((e) => (
                <li key={e.name} className={`recruit__event ${e.deadline ? 'recruit__event--due' : ''}`}>
                  <span className="recruit__date">{e.date}</span>
                  <span className="recruit__name">
                    {e.name}
                    {e.required && <span className="recruit__tag">Required</span>}
                  </span>
                  <span className="recruit__when">
                    {[e.time, e.place].filter(Boolean).join(' · ')}
                    {e.note && <><br />{e.note}</>}
                  </span>
                </li>
              ))}
            </ol>
            {RECRUITMENT.eligibility && <p className="recruit__foot">{RECRUITMENT.eligibility}</p>}
          </Reveal>
        </div>
      </section>

      {/* ---------- Start a chapter ---------- */}
      <section className="section" id="chapter">
        <div className="container split split--top">
          <Reveal className="prose">
            <h2 className="section-title">Start a chapter</h2>
            <p>
              The application has four stages and takes one to two months. Once you launch, an
              expansion manager meets with your chapter every week.
            </p>
            <ol className="mini-steps">
              {CHAPTER_STEPS.map((s) => (
                <li key={s.num}>
                  <strong>{s.title}.</strong> {s.body}
                </li>
              ))}
            </ol>
            <div className="btn-row">
              <a href={chapterFormUrl} target="_blank" rel="noreferrer" className="btn btn--dark">
                Start a chapter
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h3 className="label">Common questions</h3>
            <Faq items={CHAPTER_FAQ} />
            <p className="muted small" style={{ marginTop: '1rem' }}>
              Anything else goes to{' '}
              <a href={`mailto:${EXPANSION_CONTACT}`}>{EXPANSION_CONTACT}</a>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- High school internship ---------- */}
      <section className="section section--soft" id="internship">
        <div className="container split split--top">
          <Reveal className="prose">
            <h2 className="section-title">High school summer internship</h2>
            <p>
              Interns spend the summer on projects with our analysts in partnerships, inventory,
              fundraising, media, and school outreach. Each intern also designs a community project
              and presents it to leadership on the last day.
            </p>
            {INTERNSHIP.open ? (
              <div className="btn-row">
                <a href={INTERNSHIP.url} target="_blank" rel="noreferrer" className="btn btn--dark">
                  Apply for the internship
                </a>
              </div>
            ) : (
              <p className="recruit__status">{INTERNSHIP.closedNote}</p>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="spec-list">
              <div>
                <dt>Commitment</dt>
                <dd>{INTERNSHIP.commitment}</dd>
              </div>
              <div>
                <dt>Eligibility</dt>
                <dd>{INTERNSHIP.eligibility}</dd>
              </div>
              <div>
                <dt>Compensation</dt>
                <dd>{INTERNSHIP.compensation}</dd>
              </div>
              <div>
                <dt>Applications</dt>
                <dd>{INTERNSHIP.applications}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------- Supply donations ---------- */}
      <section className="section" id="supplies">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">Donating medical supplies</h2>
          </Reveal>

          <div className="supply-split">
            <Reveal as="div" className="supply-col supply-col--yes">
              <h3>What we accept</h3>
              <ul>
                {SUPPLIES_ACCEPTED.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal as="div" className="supply-col supply-col--no" delay={0.1}>
              <h3>What we can't accept</h3>
              <ul>
                {SUPPLIES_DECLINED.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <p className="muted small" style={{ marginTop: '2rem' }}>
              These lists apply to our Ann Arbor headquarters. To arrange a pickup or ask about a
              specific item, email <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
