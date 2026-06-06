// Thin API layer — point at backend or third-party services here.

export async function createDonation({ amount }) {
  // TODO: hand off to Stripe Checkout or your payment provider.
  throw new Error('createDonation not implemented');
}

export async function submitContactForm(payload) {
  // TODO: POST to /api/contact
  throw new Error('submitContactForm not implemented');
}

export async function applyToChapter({ chapterSlug, payload }) {
  // TODO: POST to /api/chapters/:slug/apply
  throw new Error('applyToChapter not implemented');
}
