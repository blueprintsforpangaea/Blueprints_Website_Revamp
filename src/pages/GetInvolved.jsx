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

// Who each path is for — more useful as a structural label than an
// index number would be, since these six are alternatives, not steps.
const AUDIENCE_LABEL = {
  students: 'Students',
  organizations: 'Hospitals & clinics',
  everyone: 'Anyone',
};

function PathwayCta({ item, variant = 'outline' }) {
  if (item.url) {
    return (
      <a href={item.url} target="_blank" rel="noreferrer" className={`btn btn--${variant}`}>
        {item.cta} <span className="arrow">→</span>
      </a>
    );
  }
  return (
    <a href={item.to} className={`btn btn--${variant}`}>
      {item.cta} <span className="arrow">→</span>
    </a>
  );
}

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
      <PageHeader eyebrow="Get involved" title="How to get involved">
        Six ways in — whether you're a student, a high schooler, a hospital with surplus, or
        someone with an afternoon free.
      </PageHeader>

      {/* ---------- The six pathways ---------- */}
      <section className="section">
        <div className="container">
          <div className="pathway-list">
            {PATHWAYS.map((p, i) => (
              <Reveal as="article" className="pathway-row" key={p.id} delay={(i % 3) * 0.06}>
                <span className={`pathway-row__who pathway-row__who--${p.audience}`}>
                  {AUDIENCE_LABEL[p.audience]}
                </span>
                <div className="pathway-row__body">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
                <div className="pathway-row__action">
                  <PathwayCta item={p} variant={p.id === 'donate' ? 'primary' : 'outline'} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Membership at HQ ---------- */}
      <section className="section section--soft" id="recruitment">
        <div className="container split">
          <Reveal className="prose">
            <span className="eyebrow">For students</span>
            <h2 className="section-title" style={{ margin: '1rem 0 1.5rem' }}>
              Become a member at headquarters
            </h2>
            <p>
              Members join one of four departments — Operations, Development, Expansion, or
              Finance — and commit roughly 5–7 hours a week. Recruitment runs each semester at the
              University of Michigan, with mass meetings, a departments night, and an application
              workshop before applications close.
            </p>
            <p>
              No GPA requirement, no major restrictions. What matters is an interest in the
              intersection of health and business.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/mission" className="btn btn--dark">
                Meet the departments <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h3 className="side-head">Common questions</h3>
            <Faq items={MEMBER_FAQ} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Start a chapter ---------- */}
      <section className="section" id="chapter">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">For student leaders</span>
            <h2 className="section-title">Start a chapter</h2>
            <p>
              Four stages over one to two months. Once you launch, a dedicated expansion manager
              meets with your chapter weekly.
            </p>
          </Reveal>

          <div className="steps">
            {CHAPTER_STEPS.map((s, i) => (
              <Reveal as="div" className="step" key={s.num} delay={i * 0.1}>
                <div className="step__num">{s.num}</div>
                <div className="step__line" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="container narrow" style={{ marginTop: '3.5rem', padding: 0 }}>
            <Reveal>
              <Faq items={CHAPTER_FAQ} />
              <p style={{ marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.92rem' }}>
                Chapter questions go to <a href={`mailto:${EXPANSION_CONTACT}`}>{EXPANSION_CONTACT}</a>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- High school internship ---------- */}
      <section className="section section--soft" id="internship">
        <div className="container narrow">
          <Reveal>
            <span className="eyebrow">For high schoolers</span>
            <h2 className="section-title" style={{ margin: '1rem 0 1.25rem' }}>
              {INTERNSHIP.title}
            </h2>
            <p className="lead">
              An intensive, project-based summer working alongside our analysts on partnerships,
              inventory processes, fundraising strategy, media, and school outreach. Every intern
              also designs a community project of their own and presents it to leadership on the
              final day.
            </p>

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
                <dt>Applications close</dt>
                <dd>{INTERNSHIP.deadline}</dd>
              </div>
            </dl>

            <a
              href={INTERNSHIP.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn--dark btn--lg"
              style={{ marginTop: '2rem' }}
            >
              Apply now <span className="arrow">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------- Supply donations ---------- */}
      <section className="section" id="supplies">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">For hospitals & clinics</span>
            <h2 className="section-title">Give new life to unused supplies</h2>
            <p>
              We partner with hospitals, clinics, and suppliers to collect surplus. Instead of
              being discarded, these materials are reallocated to underserved communities.
            </p>
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

          <Reveal style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
              These lists apply to our Ann Arbor headquarters. To arrange a pickup or ask about an
              item, email <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
