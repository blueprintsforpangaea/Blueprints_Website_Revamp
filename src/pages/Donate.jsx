import { useDonationForm } from '../hooks/useDonationForm.js';

const PRESET_AMOUNTS = [10, 20, 30];

export default function Donate() {
  const { amount, setAmount, custom, setCustom, submit, status } = useDonationForm();

  return (
    <article className="page page--donate">
      <h1>Support Our Work</h1>
      <p>Your gift directly funds the shipping of life-saving supplies.</p>

      <form
        className="donate-form"
        onSubmit={(e) => { e.preventDefault(); submit(); }}
      >
        <div className="donate-form__amounts">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              type="button"
              key={amt}
              className={`amount-pill ${amount === amt ? 'is-selected' : ''}`}
              onClick={() => setAmount(amt)}
            >
              ${amt}
            </button>
          ))}
          <input
            type="number"
            placeholder="Custom amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--primary">Donate</button>
        {status && <p className="donate-form__status">{status}</p>}
      </form>
    </article>
  );
}
