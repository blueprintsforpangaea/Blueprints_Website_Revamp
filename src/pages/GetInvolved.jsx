import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

// Pick who you are and the page shows only what applies to you.
const CHOICES = [
  {
    id: 'student',
    who: 'I’m a student',
    body: 'College students can join headquarters at U-M or start a chapter at their own school. High school students can apply for our summer internship.',
    sections: ['recruitment', 'chapter', 'internship'],
  },
  {
    id: 'hospital',
    who: 'I work at a hospital or clinic',
    body: 'If you have unused supplies, we’ll come and pick them up.',
    sections: ['supplies'],
  },
  {
    id: 'help',
    who: 'I want to help',
    body: 'Sort supplies at our Ann Arbor warehouse (no experience needed), or give money.',
    sections: ['volunteer'],
  },
];

// Which choice a link like /get-involved#supplies belongs to.
const choiceFor = (hash) =>
  CHOICES.find((c) => c.sections.includes(hash.replace('#', '')))?.id || 'student';

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
  const { hash } = useLocation();
  const [choice, setChoice] = useState(() => choiceFor(hash));

  // A link to a section on this page opens the right choice, then
  // scrolls to the section once it's on the page.
  useEffect(() => {
    if (!hash) return;
    setChoice(choiceFor(hash));
    requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }));
  }, [hash]);

  const show = (id) => CHOICES.find((c) => c.id === choice).sections.includes(id);

  return (
    <article>
      <PageHeader title="Get involved">Choose the one that fits you.</PageHeader>

      {/* Signature: pick who you are, and only your part shows below. */}
      <section className="choose-section" aria-label="Choose how to help">
        <div className="container choose">
          {CHOICES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <button
                type="button"
                className={`choose__card ${choice === c.id ? 'is-chosen' : ''}`}
                onClick={() => setChoice(c.id)}
                aria-pressed={choice === c.id}
              >
                <span className="choose__who">{c.who}</span>
                <span className="choose__body">{c.body}</span>
                <span className="choose__cta">{choice === c.id ? 'Showing below ↓' : 'Show me →'}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Membership at HQ ---------- */}
      {show('recruitment') && (
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
              <div className="btn-row">
                <Link to="/chapters/umich#recruitment" className="btn btn--dark">
                  {RECRUITMENT.term} recruitment dates
                </Link>
                <Link to="/mission" className="link-arrow">
                  Read about the departments <span className="arrow">→</span>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="label">Common questions</h3>
              <Faq items={MEMBER_FAQ} />
            </Reveal>
          </div>
        </div>
      </section>
      )}

      {/* ---------- Start a chapter ---------- */}
      {show('chapter') && (
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
      )}

      {/* ---------- High school internship ---------- */}
      {show('internship') && (
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
                <dt>Applications</dt>
                <dd>{INTERNSHIP.applications}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
      )}

      {/* ---------- Supply donations ---------- */}
      {show('supplies') && (
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
      )}

      {/* ---------- Volunteer or give ---------- */}
      {show('volunteer') && (
      <section className="section" id="volunteer">
        <div className="container help-split">
          <Reveal className="help-card">
            <h2 className="section-title section-title--sm">Volunteer at the warehouse</h2>
            <p>{volunteer.body}</p>
            <a href={volunteer.url} target="_blank" rel="noreferrer" className="btn btn--dark">
              Sign up for a shift
            </a>
          </Reveal>
          <Reveal className="help-card" delay={0.08}>
            <h2 className="section-title section-title--sm">Give money</h2>
            <p>{ORG.name} is a {ORG.taxStatus}, so gifts are tax-deductible.</p>
            <Link to="/donate" className="btn btn--primary">Donate</Link>
          </Reveal>
        </div>
      </section>
      )}
    </article>
  );
}
