import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { DONATE_URL, ORG } from '../data/site.js';
import { TOTALS } from '../data/stats.js';
import { SHIPMENTS } from '../data/shipments.js';

// The live site's own suggested amounts.
const PRESET_AMOUNTS = [10, 20, 30];

// Real deliveries with published valuations — what giving actually
// buys, rather than invented per-dollar equivalences.
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
      <PageHeader eyebrow="Support our work" title="Fund the next shipment">
        Supplies reach us for free. Freight, storage, and logistics do not — that's what your gift
        pays for. Blueprints for Pangaea is a {ORG.taxStatus}.
      </PageHeader>

      <section className="section">
        <div className="container donate-grid">
          <Reveal as="div" className="donate-card">
            <h3 style={{ marginBottom: '0.35rem' }}>Choose an amount</h3>
            <p className="donate-card__note">
              Giving is handled by Givebutter, our payment processor.
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
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Continue to Givebutter <span className="arrow">→</span>
            </a>

            <p className="donate-card__fine">
              {valid && `You'll confirm your $${chosen} gift on the next step. `}
              Contributions are tax-deductible to the extent allowed by law. Givebutter issues your
              receipt.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <span className="eyebrow">What giving funds</span>
            <h2
              className="section-title"
              style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', margin: '1rem 0 1rem' }}
            >
              Deliveries you've already paid for
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '1.75rem' }}>
              Every shipment below moved because someone covered the logistics.{' '}
              {TOTALS.suppliesValueExact} in supplies has reached communities this way.
            </p>

            <div className="donate-impact-list">
              {FUNDED.map((s) => (
                <div className="donate-impact-item" key={s.id}>
                  <span className="amt">{s.value}</span>
                  <p>
                    <strong>{s.place}</strong>
                    {s.partner ? ` · ${s.partner}` : ''}
                    {s.detail ? ` — ${s.detail}` : ''}
                  </p>
                </div>
              ))}
            </div>

            <p style={{ marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
              Prefer to give supplies instead of funds, or have questions? Email{' '}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
