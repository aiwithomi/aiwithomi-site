import { useState } from 'react';
import { useSubscribe } from '@workspace/api-client-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const subscribe = useSubscribe({
    mutation: {
      onSuccess: (data) => {
        setSubmitted(true);
        setMessage(data.alreadySubscribed ? 'Already on the list.' : 'You are in.');
        setEmail('');
      },
      onError: () => setMessage('Something went wrong. Try again.'),
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({ data: { email } });
  }

  return (
    <section
      id="newsletter"
      className="relative w-full bg-obsidian text-parchment"
      style={{
        paddingTop: 'clamp(60px, 7vw, 90px)',
        paddingBottom: 'clamp(80px, 10vw, 130px)',
        paddingLeft: 'clamp(28px, 5vw, 80px)',
        paddingRight: 'clamp(28px, 5vw, 80px)',
      }}
    >
      {/* Horizontal ember rule */}
      <div className="max-w-[1080px] mx-auto">
        <div
          className="h-[1px] mb-10"
          style={{ background: 'linear-gradient(90deg, #C4622D 0%, rgba(196,98,45,0.2) 40%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-[560px] mx-auto js-reveal">
        {submitted ? (
          <div className="text-center">
            <div className="w-6 h-[1px] bg-ember mb-8 mx-auto" />
            <p className="font-serif italic font-light text-parchment/80 mb-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
              {message}
            </p>
            <a
              href="https://aiwithomi.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase font-medium font-sans tracking-[0.2em] text-ember hover:opacity-70 transition-opacity"
              style={{ fontSize: 11 }}
            >
              Open Substack →
            </a>
          </div>
        ) : (
          <>
            <h2
              className="font-serif font-light leading-[1.05] tracking-[-0.02em] mb-12"
              style={{ fontSize: 'clamp(44px, 6vw, 72px)', color: '#F5F0E8' }}
            >
              One note.<br />
              <span className="text-ember italic">Most weekends.</span>
            </h2>

            <form onSubmit={handleSubmit} data-testid="form-newsletter">
              <div
                className="flex items-center border-b focus-within:border-ember transition-colors duration-300"
                style={{ borderBottomColor: 'rgba(245,240,232,0.2)' }}
              >
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  data-testid="input-email"
                  className="flex-1 bg-transparent py-4 focus:outline-none font-sans placeholder:text-parchment/25 text-parchment"
                  style={{ fontSize: 16 }}
                />
                <button
                  type="submit"
                  disabled={subscribe.isPending || !email.trim()}
                  data-testid="button-subscribe"
                  className="uppercase font-medium font-sans tracking-[0.2em] text-ember disabled:opacity-30 transition-opacity hover:opacity-70 whitespace-nowrap pl-6"
                  style={{ fontSize: 11 }}
                >
                  {subscribe.isPending ? 'Joining...' : 'Join →'}
                </button>
              </div>
              {message && (
                <p className="mt-3 font-mono text-[12px]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                  {message}
                </p>
              )}
              <p className="mt-5 font-sans" style={{ fontSize: 12, color: 'rgba(245,240,232,0.3)' }}>
                Free. No spam. Unsubscribe any time.
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
