import { useState } from 'react';

const SUBSTACK_URL = 'https://aiwithomi.substack.com';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    // The list lives on Substack. Hand off with the email prefilled; the
    // subscriber confirms there, which doubles as double-opt-in.
    window.open(
      `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(trimmed)}`,
      '_blank',
      'noopener,noreferrer',
    );
    setSubmitted(true);
    setEmail('');
  }

  return (
    <section id="newsletter" className="w-full" style={{ paddingTop: 'clamp(80px, 12vh, 130px)', paddingBottom: 'clamp(80px, 12vh, 130px)' }}>
      <div className="max-w-[620px] mx-auto px-6 sm:px-8 text-center">
        {submitted ? (
          <div className="reveal in">
            <h2 className="font-serif text-ink" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 500, lineHeight: 1.2 }}>
              Nearly there.
            </h2>
            <p className="text-muted" style={{ fontSize: 17, lineHeight: 1.6, marginTop: 16 }}>
              Confirm on the Substack page that just opened and you are in.
            </p>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans inline-block text-clay hover:text-ink transition-colors duration-200"
              style={{ fontSize: 14, fontWeight: 500, marginTop: 20 }}
            >
              Open Substack &rarr;
            </a>
          </div>
        ) : (
          <>
            <p className="kicker reveal" style={{ marginBottom: 24 }}>Newsletter</p>
            <h2
              className="reveal font-serif text-ink"
              style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.015em' }}
            >
              One honest email.<br />
              <em className="text-clay" style={{ fontStyle: 'italic' }}>Most weekends.</em>
            </h2>
            <p className="reveal text-muted" style={{ fontSize: 17, lineHeight: 1.6, marginTop: 20, transitionDelay: '0.05s' }}>
              What I learned, what broke, and what I would try next.
              No hype, no hustle. Unsubscribe any time.
            </p>

            <form onSubmit={handleSubmit} data-testid="form-newsletter" className="reveal" style={{ marginTop: 36, transitionDelay: '0.1s' }}>
              <div
                className="flex items-center rounded-pill bg-paper mx-auto"
                style={{ border: '1px solid var(--line)', maxWidth: 440, padding: '6px 6px 6px 22px' }}
              >
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  data-testid="input-email"
                  className="flex-1 bg-transparent focus:outline-none font-sans text-ink placeholder:text-mist"
                  style={{ fontSize: 15, minWidth: 0 }}
                />
                <button
                  type="submit"
                  disabled={!email.trim()}
                  data-testid="button-subscribe"
                  className="font-sans text-paper bg-ink hover:bg-clay disabled:opacity-30 transition-colors duration-200 rounded-pill whitespace-nowrap"
                  style={{ fontSize: 14, fontWeight: 500, padding: '10px 22px' }}
                >
                  Join &rarr;
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
