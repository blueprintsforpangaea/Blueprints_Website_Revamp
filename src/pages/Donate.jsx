import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Icon from '../components/ui/Icon.jsx';
import { useDonationForm } from '../hooks/useDonationForm.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { TOTALS, GIVING_LADDER, PRESET_AMOUNTS } from '../data/stats.js';

export default function Donate() {
  usePageMeta(
    'Donate',
    `$${TOTALS.boxCost} ships a box of rescued medical supplies to a clinic that has run out. Every gift is tax-deductible.`,
  );

  const {
    amount, setAmount,
    custom, setCustom,
    frequency, setFrequency,
    finalAmount, boxes,
    submit, reset,
    status, error,
  } = useDonationForm();

  return (
    <article>
      <PageHeader eyebrow="Support Our Work" title="Fund the next shipment">
        Your gift pays for the logistics that turn hospital surplus into life-saving care.
        100% mission-driven, 501(c)(3) tax-deductible.
      </PageHeader>

      <section className="section">
        <div className="container donate-grid">
          <Reveal as="div" className="donate-card">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.div
                  key="confirm"
                  className="donate-confirm"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  role="status"
                >
                  <div className="donate-confirm__icon">
                    <Icon name="check" size={30} strokeWidth={2.5} />
                  </div>
                  <h3>Thank you!</h3>
                  <p>
                    Your {frequency === 'monthly' ? 'monthly ' : ''}gift of{' '}
                    <strong>${finalAmount.toLocaleString('en-US')}</strong>
                    {boxes > 0 && (
                      <>
                        {' '}will ship{' '}
                        <strong>
                          {boxes} {boxes === 1 ? 'box' : 'boxes'}
                        </strong>{' '}
                        of rescued medical supplies
                      </>
                    )}{' '}
                    to a clinic that has run out. A receipt is on its way to your email.
                  </p>
                  <button type="button" className="btn btn--outline" onClick={reset}>
                    Make another donation
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => { e.preventDefault(); submit(); }}
                >
                  <div className="donate-freq" role="group" aria-label="Donation frequency">
                    <button
                      type="button"
                      className={`donate-freq__option ${frequency === 'once' ? 'is-selected' : ''}`}
                      aria-pressed={frequency === 'once'}
                      onClick={() => setFrequency('once')}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      className={`donate-freq__option ${frequency === 'monthly' ? 'is-selected' : ''}`}
                      aria-pressed={frequency === 'monthly'}
                      onClick={() => setFrequency('monthly')}
                    >
                      Monthly
                    </button>
                  </div>

                  <h3 style={{ margin: '1.25rem 0 0.5rem' }}>Choose an amount</h3>
                  <div className="donate-amounts">
                    {PRESET_AMOUNTS.map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        className={`amount-pill ${amount === amt && custom === '' ? 'is-selected' : ''}`}
                        aria-pressed={amount === amt && custom === ''}
                        onClick={() => { setAmount(amt); setCustom(''); }}
                      >
                        ${amt.toLocaleString('en-US')}
                      </button>
                    ))}
                  </div>

                  <label className="donate-label" htmlFor="custom-amount">
                    Or enter a custom amount
                  </label>
                  <input
                    id="custom-amount"
                    className="donate-input"
                    type="number"
                    min="1"
                    inputMode="numeric"
                    placeholder={`$${TOTALS.boxCost} ships one box`}
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                  />

                  {boxes > 0 && (
                    <p className="donate-hint" aria-live="polite">
                      <Icon name="box" size={17} />
                      Your ${finalAmount.toLocaleString('en-US')}
                      {frequency === 'monthly' ? '/month' : ''} ships{' '}
                      <strong>{boxes} {boxes === 1 ? 'box' : 'boxes'}</strong> of medical supplies
                      {frequency === 'monthly' ? ' every month' : ''}.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn--primary btn--lg"
                    style={{ width: '100%' }}
                    disabled={status === 'processing'}
                  >
                    {status === 'processing'
                      ? 'Processing…'
                      : `Donate $${Number.isFinite(finalAmount) && finalAmount > 0 ? finalAmount.toLocaleString('en-US') : 0}${frequency === 'monthly' ? '/month' : ''}`}
                  </button>

                  {status === 'error' && (
                    <p className="donate-error" role="alert">{error}</p>
                  )}

                  <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Secure checkout · Tax-deductible · You'll receive a receipt by email.
                  </p>
                  {/* Remove once a payment provider is connected in utils/api.js */}
                  <p style={{ marginTop: '0.35rem', fontSize: '0.78rem', color: 'var(--muted-soft)' }}>
                    Demo checkout — payments are not yet live on this preview site.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.12}>
            <span className="eyebrow">Your Impact</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', margin: '1rem 0 1.5rem' }}>
              Where your gift goes
            </h2>
            <div className="donate-impact-list">
              {GIVING_LADDER.map((item) => (
                <div className="donate-impact-item" key={item.amount}>
                  <span className="amt">${item.amount}</span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1.75rem', color: 'var(--muted)', fontSize: '0.95rem' }}>
              We're student-run, so nearly every dollar goes directly to recovering,
              verifying, and shipping supplies — {TOTALS.dollarsDisplay} redistributed so far.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
