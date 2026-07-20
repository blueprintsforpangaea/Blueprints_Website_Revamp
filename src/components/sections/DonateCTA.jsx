import { useDonationForm } from '../../hooks/useDonationForm.js';

const PRESET_AMOUNTS = [10, 25, 50, 100];

export default function DonateCTA() {
  const { amount, setAmount, custom, setCustom, submit, status } = useDonationForm(25);
  const displayAmount = custom || amount;

  return (
    <section className="section">
      <div className="container">
        <div className="donate-cta">
          <div className="donate-cta__copy">
            <h2 className="donate-cta__title">Make a difference today</h2>
            <p className="donate-cta__body">
              Your donation helps us rescue surplus medical supplies and get
              them to the clinics and communities that need them most.
            </p>
          </div>

          <form
            className="donate-cta__form"
            onSubmit={(e) => { e.preventDefault(); submit(); }}
          >
            <p className="donate-cta__label">Choose an amount</p>
            <div className="donate-cta__amounts">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  className={`amount-tile ${!custom && amount === amt ? 'is-selected' : ''}`}
                  onClick={() => { setAmount(amt); setCustom(''); }}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <input
              type="number"
              className="donate-cta__custom"
              placeholder="Custom amount"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
            <button type="submit" className="btn btn--primary donate-cta__submit">
              Donate ${displayAmount} →
            </button>
            {status && <p className="donate-cta__status">{status}</p>}
            <p className="donate-cta__note">Your donation is secure and tax-deductible</p>
          </form>
        </div>
      </div>
    </section>
  );
}
