import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import {
  CHAPTER_APPLICATION_URL,
  CHAPTER_GOOGLE_FORM_URL,
  EXPANSION_CONTACT,
} from '../data/involvement.js';

// The chapter founder application. Questions match the expansion
// team's Google Form word for word. Answers go to a Google Sheet via
// the Apps Script in google-apps-script/chapter-application.gs.

const CLASS_STANDINGS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate Student'];
const WORD_LIMIT = 250;
const MAX_RESUME_MB = 5;

const EMPTY = {
  email: '',
  name: '',
  university: '',
  phone: '',
  classStanding: '',
  whyJoin: '',
  whySuccessful: '',
  partnerships: '',
  timeCommitments: '',
  heardAbout: '',
  anythingElse: '',
  website: '', // spam trap, hidden from people
};

const countWords = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);

const readAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

function Field({ id, label, hint, children }) {
  return (
    <div className="apply-field">
      <label htmlFor={id} className="apply-field__label">
        {label} <span className="apply-req" aria-hidden="true">*</span>
      </label>
      {hint && <p className="apply-field__hint" id={`${id}-hint`}>{hint}</p>}
      {children}
    </div>
  );
}

function WordCount({ text }) {
  const n = countWords(text);
  const over = n > WORD_LIMIT;
  return (
    <p className={`apply-count ${over ? 'is-over' : ''}`} aria-live="polite">
      {n} / {WORD_LIMIT} words{over ? ' — please shorten' : ''}
    </p>
  );
}

export default function ChapterApplication() {
  const [form, setForm] = useState(EMPTY);
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const text = (key) => ({ id: key, name: key, value: form[key], onChange: set(key), required: true });

  function pickResume(e) {
    const file = e.target.files?.[0];
    setResumeError('');
    setResume(null);
    if (!file) return;
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      setResumeError('Please upload a PDF.');
      e.target.value = '';
    } else if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      setResumeError(`Please keep the file under ${MAX_RESUME_MB} MB.`);
      e.target.value = '';
    } else {
      setResume(file);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (countWords(form.whyJoin) > WORD_LIMIT || countWords(form.whySuccessful) > WORD_LIMIT) {
      setError(`Please keep the first two short answers to ${WORD_LIMIT} words or fewer.`);
      return;
    }
    if (!resume) {
      setResumeError('Please upload your resume as a PDF.');
      document.getElementById('resume')?.focus();
      return;
    }

    setStatus('sending');
    try {
      const payload = {
        ...form,
        resume: { name: resume.name, base64: await readAsBase64(resume) },
      };
      // text/plain keeps this a "simple" request, which Apps Script accepts.
      const res = await fetch(CHAPTER_APPLICATION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const out = await res.json();
      if (!out.ok) throw new Error(out.error || 'Something went wrong');
      setStatus('sent');
      window.scrollTo({ top: 0 });
    } catch {
      setStatus('error');
      setError(
        `Your application didn’t go through. Please try again, or email ${EXPANSION_CONTACT} if it keeps happening.`,
      );
    }
  }

  if (!CHAPTER_APPLICATION_URL) {
    return (
      <article>
        <PageHeader title="Apply to start a chapter" />
        <section className="section">
          <div className="container apply">
            <p>The application is on Google Forms for now.</p>
            <div className="btn-row">
              <a href={CHAPTER_GOOGLE_FORM_URL} className="btn btn--dark" target="_blank" rel="noreferrer">
                Open the application
              </a>
            </div>
          </div>
        </section>
      </article>
    );
  }

  if (status === 'sent') {
    return (
      <article>
        <PageHeader title="Application received" />
        <section className="section">
          <div className="container apply prose">
            <p>
              Thank you, {form.name.split(' ')[0]}. The expansion team will read your application and
              email you at <strong>{form.email}</strong> if we’d like to set up an interview.
            </p>
            <p>
              Questions in the meantime go to{' '}
              <a href={`mailto:${EXPANSION_CONTACT}`}>{EXPANSION_CONTACT}</a>.
            </p>
            <div className="btn-row">
              <Link to="/chapters" className="btn btn--outline">See our chapters</Link>
            </div>
          </div>
        </section>
      </article>
    );
  }

  const sending = status === 'sending';

  return (
    <article>
      <PageHeader title="Apply to start a chapter">
        Thank you for your interest in starting a Blueprints for Pangaea chapter at your university.
      </PageHeader>

      <section className="section">
        <div className="container apply">
          <div className="apply-intro prose">
            <p>
              Please answer openly and honestly so we can get to know you. There are four parts: general
              information, short answers, your resume (one page, as a PDF), and your time commitments.
              Interviews are invite only, and we’ll send details on format if you’re invited.
            </p>
            <p>
              Questions? Email <a href={`mailto:${EXPANSION_CONTACT}`}>{EXPANSION_CONTACT}</a>. Every
              question is required unless it says optional.
            </p>
          </div>

          <form className="apply-form" onSubmit={submit}>
            {/* Hidden from people; bots fill it in. */}
            <div className="apply-trap" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
            </div>

            <fieldset className="apply-part">
              <legend><span className="apply-part__num">1</span> General information</legend>
              <Field id="email" label="Email">
                <input type="email" autoComplete="email" {...text('email')} />
              </Field>
              <Field id="name" label="Name">
                <input type="text" autoComplete="name" {...text('name')} />
              </Field>
              <Field id="university" label="University name and location">
                <input type="text" placeholder="e.g. University of Michigan, Ann Arbor" {...text('university')} />
              </Field>
              <Field id="phone" label="Phone number">
                <input type="tel" autoComplete="tel" {...text('phone')} />
              </Field>
              <div className="apply-field" role="radiogroup" aria-labelledby="classStanding-label">
                <p className="apply-field__label" id="classStanding-label">
                  Class standing <span className="apply-req" aria-hidden="true">*</span>
                </p>
                <div className="apply-options">
                  {CLASS_STANDINGS.map((c) => (
                    <label key={c} className="apply-option">
                      <input
                        type="radio"
                        name="classStanding"
                        value={c}
                        checked={form.classStanding === c}
                        onChange={set('classStanding')}
                        required
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            </fieldset>

            <fieldset className="apply-part">
              <legend><span className="apply-part__num">2</span> Short answers</legend>
              <Field
                id="whyJoin"
                label="Why do you want to be a part of Blueprints for Pangaea? How would your involvement contribute to your personal and professional goals?"
                hint={`${WORD_LIMIT} words maximum`}
              >
                <textarea rows={7} {...text('whyJoin')} />
                <WordCount text={form.whyJoin} />
              </Field>
              <Field
                id="whySuccessful"
                label="Why do you believe creating a Blueprints for Pangaea chapter at your university will be successful?"
                hint={`${WORD_LIMIT} words maximum`}
              >
                <textarea rows={7} {...text('whySuccessful')} />
                <WordCount text={form.whySuccessful} />
              </Field>
              <Field
                id="partnerships"
                label="List potential partnerships in your community if you were to found a chapter at your university."
                hint="For example: local hospitals, clinics, nonprofit organizations, student organizations."
              >
                <textarea rows={5} {...text('partnerships')} />
              </Field>
            </fieldset>

            <fieldset className="apply-part">
              <legend><span className="apply-part__num">3</span> Resume</legend>
              <Field id="resume" label="Upload your resume as a PDF" hint={`One page, under ${MAX_RESUME_MB} MB.`}>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={pickResume}
                  aria-describedby="resume-hint"
                  className="apply-file"
                />
                {resumeError && <p className="apply-error" role="alert">{resumeError}</p>}
              </Field>
            </fieldset>

            <fieldset className="apply-part">
              <legend><span className="apply-part__num">4</span> Time commitment</legend>
              <Field
                id="timeCommitments"
                label="What are your time commitments for the next two academic semesters?"
                hint="List your obligations and about how many hours a week each takes. Please don’t underestimate."
              >
                <textarea rows={5} {...text('timeCommitments')} />
              </Field>
              <Field id="heardAbout" label="How did you hear about us?">
                <input type="text" {...text('heardAbout')} />
              </Field>
              <div className="apply-field">
                <label htmlFor="anythingElse" className="apply-field__label">
                  What did we forget? Is there anything else you’d like to share about yourself and your
                  interest in Blueprints for Pangaea? <span className="apply-optional">(optional)</span>
                </label>
                <textarea id="anythingElse" name="anythingElse" rows={4} value={form.anythingElse} onChange={set('anythingElse')} />
              </div>
            </fieldset>

            {error && <p className="apply-error" role="alert">{error}</p>}

            <div className="btn-row">
              <button type="submit" className="btn btn--dark btn--lg" disabled={sending}>
                {sending ? 'Sending…' : 'Submit application'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </article>
  );
}
