import { useState } from 'react';

const SUBSTACK_URL = 'https://aiwithomi.substack.com';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    window.open(
      `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(trimmed)}`,
      '_blank',
      'noopener,noreferrer',
    );
    setSubmitted(true);
    setEmail('');
  }

  return (
    <section id="newsletter" className="newsletter-section section section--ink">
      <div className="shell newsletter-layout">
        <div className="newsletter-copy reveal">
          <p className="microlabel">The short version, by email</p>
          <h2>New notes for people who want the signal.</h2>
          <p>
            Research questions, useful experiments and the occasional AI headline worth stopping for. No daily noise.
          </p>
        </div>

        <div className="newsletter-form-wrap reveal" style={{ transitionDelay: '0.08s' }}>
          {submitted ? (
            <div className="newsletter-success">
              <p className="microlabel">Nearly there</p>
              <h3>Confirm the subscription on Substack.</h3>
              <a className="text-link text-link--light" href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">Open Substack</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} data-testid="form-newsletter">
              <label className="sr-only" htmlFor="email">Email address</label>
              <div className="newsletter-input-row">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  data-testid="input-email"
                />
                <button type="submit" disabled={!email.trim()} data-testid="button-subscribe">Join</button>
              </div>
              <p className="form-note">Substack opens to confirm your email. Unsubscribe any time.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
