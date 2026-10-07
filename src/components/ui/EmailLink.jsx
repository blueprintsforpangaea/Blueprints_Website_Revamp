import { useState } from 'react';

// An email address shown in full, with a Copy button. A mailto link
// alone does nothing on computers without a mail app set up, so the
// address is always visible and one click puts it on the clipboard.
export default function EmailLink({ email }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this email address:', email);
    }
  };

  return (
    <span className="email-link">
      <a href={`mailto:${email}`}>{email}</a>
      <button type="button" className="email-link__copy" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </span>
  );
}
