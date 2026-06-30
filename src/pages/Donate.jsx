import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { useDonationForm } from '../hooks/useDonationForm.js';

const PRESET_AMOUNTS = [10, 20, 30, 50, 100, 250];

const IMPACT = [
  { amt: '$10', text: 'Ships a box of recovered medical supplies to a partner clinic.' },
  { amt: '$30', text: 'Stocks a clinic shelf with essentials for a week of care.' },
  { amt: '$100', text: 'Covers logistics for an international relief shipment.' },
  { amt: '$250', text: 'Helps launch a new chapter and its first collection drive.' },
];

export default function Donate() {
  const { amount, setAmount, custom, setCustom, submit, status } = useDonationForm();

  return (
    <article>
      <PageHeader eyebrow="Support Our Work" title="Fund the next shipment">
        Your gift pays for the logistics that turn hospital surplus into life-saving care.
        100% mission-driven, 501(c)(3) tax-deductible.
      </PageHeader>

      <section className="section">
        <div className="container donate-grid">
          <Reveal as="div" className="donate-card">
            <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Choose an amount</h3>
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
              <input
                className="donate-input"
                type="number"
                min="1"
                placeholder="Or enter a custom amount"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
              <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%' }}>
                Donate {custom ? `$${custom}` : `$${amount}`}
              </button>
              {status && <p style={{ marginTop: '1rem', fontWeight: 600, color: 'var(--teal-deep)' }}>{status}</p>}
              <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                Secure checkout · Tax-deductible · You'll receive a receipt by email.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <span className="eyebrow">Your Impact</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', margin: '1rem 0 1.5rem' }}>
              Where your gift goes
            </h2>
            <div className="donate-impact-list">
              {IMPACT.map((item) => (
                <div className="donate-impact-item" key={item.amt}>
                  <span className="amt">{item.amt}</span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
