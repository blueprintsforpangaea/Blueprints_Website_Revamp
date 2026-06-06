import { useState } from 'react';
import { createDonation } from '../utils/api.js';

// Manages donation form state (preset amount, custom amount, submit status).
export function useDonationForm() {
  const [amount, setAmount] = useState(20);
  const [custom, setCustom] = useState('');
  const [status, setStatus] = useState('');

  async function submit() {
    const finalAmount = custom ? Number(custom) : amount;
    if (!finalAmount || finalAmount <= 0) {
      setStatus('Please enter a valid amount.');
      return;
    }
    setStatus('Processing…');
    try {
      // TODO: integrate Stripe / payment processor in createDonation()
      await createDonation({ amount: finalAmount });
      setStatus('Thank you for your donation!');
    } catch (err) {
      setStatus('Something went wrong. Please try again.');
    }
  }

  return { amount, setAmount, custom, setCustom, submit, status };
}
