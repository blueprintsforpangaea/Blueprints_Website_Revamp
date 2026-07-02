import { useState } from 'react';
import { createDonation } from '../utils/api.js';
import { TOTALS, PRESET_AMOUNTS } from '../data/stats.js';

// Manages donation form state: amount (preset or custom), one-time vs
// monthly frequency, and an explicit status machine so the UI can render
// real processing / success / error states.
export function useDonationForm() {
  const [amount, setAmount] = useState(PRESET_AMOUNTS[0]);
  const [custom, setCustom] = useState('');
  const [frequency, setFrequency] = useState('once'); // 'once' | 'monthly'
  const [status, setStatus] = useState('idle');       // 'idle' | 'processing' | 'success' | 'error'
  const [error, setError] = useState('');

  const finalAmount = custom !== '' ? Number(custom) : amount;
  // How many boxes this gift ships — the number donors actually care about.
  const boxes = Number.isFinite(finalAmount) ? Math.floor(finalAmount / TOTALS.boxCost) : 0;

  async function submit() {
    if (!Number.isFinite(finalAmount) || finalAmount <= 0) {
      setStatus('error');
      setError('Please enter a valid amount.');
      return;
    }
    setStatus('processing');
    setError('');
    try {
      await createDonation({ amount: finalAmount, frequency });
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Something went wrong on our end. Please try again.');
    }
  }

  function reset() {
    setStatus('idle');
    setError('');
    setCustom('');
    setAmount(PRESET_AMOUNTS[0]);
    setFrequency('once');
  }

  return {
    amount, setAmount,
    custom, setCustom,
    frequency, setFrequency,
    finalAmount, boxes,
    submit, reset,
    status, error,
  };
}
