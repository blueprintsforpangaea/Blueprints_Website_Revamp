import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { DONATE_URL, ORG } from '../data/site.js';
import { TOTALS } from '../data/stats.js';
import { SHIPMENTS } from '../data/shipments.js';

// The live site's own suggested amounts.
const PRESET_AMOUNTS = [10, 20, 30];

// Real deliveries with published valuations, rather than invented
// per-dollar equivalences.
const FUNDED = SHIPMENTS.filter((s) => s.value).slice(0, 4);

export default function Donate() {
  const [amount, setAmount] = useState(20);
  const [custom, setCustom] = useState('');

  const chosen = custom ? Number(custom) : amount;
  const valid = Number.isFinite(chosen) && chosen > 0;
  // Givebutter accepts an `amount` param, but only pre-selects values
  // already configured on the campaign — a custom amount won't carry.
  // So we pass it along and let checkout confirm, rather than
  // promising the figure survives the handoff.
  const href = valid ? `${DONATE_URL}?amount=${chosen}` : DONATE_URL;

  return (
    <article>
      <PageHeader title="Donate">
        {ORG.name} is a {ORG.taxStatus}, so your donation is tax-deductible.
      </PageHeader>

      <section className="section">
        <div className="container donate-grid">
          <Reveal as="div" className="donate-card">
            <h2 className="donate-card__title">Choose an amount</h2>
            <p className="muted small">
              Payments go through Givebutter.
            </p>

            <div className="donate-amounts">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  className={`amount-pill ${amount === amt && !custom ? 'is-selected' : ''}`}
                  onClick={() => { setAmount(amt); setCustom(''); }}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <label className="donate-label" htmlFor="custom-amount">
              Or enter another amount
            </label>
            <input
              id="custom-amount"
              className="donate-input"
              type="number"
              min="1"
              inputMode="decimal"
              placeholder="$"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />

            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary btn--lg"
              style={{ width: '100%' }}
            >
              Continue to payment
            </a>

            <p className="donate-card__fine">
              {valid && `You’ll confirm your $${chosen} gift on the next page. `}
              Donations are tax-deductible to the extent allowed by law. Givebutter will email your
              receipt.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="section-title section-title--sm">Some of our larger shipments</h2>
            <p className="muted" style={{ margin: '0.75rem 0 1.75rem' }}>
              {TOTALS.suppliesValueExact} worth of supplies redistributed so far.
            </p>

            <div className="donate-impact-list">
              {FUNDED.map((s) => (
                <div className="donate-impact-item" key={s.id}>
                  <span className="amt">{s.value}</span>
                  <p>
                    <strong>{s.place}</strong>
                    {s.partner ? `, with ${s.partner}. ` : '. '}
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>

            <p className="muted small" style={{ marginTop: '1.75rem' }}>
              To give supplies instead, or with any questions, email{' '}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
