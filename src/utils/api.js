// Thin API layer — point at backend or third-party services here.

export async function createDonation({ amount, frequency = 'once' }) {
  // TODO: hand off to Stripe Checkout / Donorbox / Givebutter.
  // Simulated success so the full confirmation flow can be designed and
  // tested end-to-end before the payment provider is wired in. The UI
  // shows a "demo checkout" notice until this is replaced.
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, amount, frequency, simulated: true };
}

export async function submitContactForm(payload) {
  // TODO: POST to /api/contact
  throw new Error('submitContactForm not implemented');
}

export async function applyToChapter({ chapterSlug, payload }) {
  // TODO: POST to /api/chapters/:slug/apply
  throw new Error('applyToChapter not implemented');
}
