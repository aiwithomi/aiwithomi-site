import { useState } from 'react';

// ── Update this to Thryv's live deployed URL when available ──
// The Replit project page itself blocks iframes (X-Frame-Options: DENY).
// Replace with the actual published app URL e.g. https://thryv.replit.app
const THRYV_EMBED_URL = '';
const THRYV_LINK_URL = 'https://replit.com/@omifans/Mindful-AI-Companion';

function PhoneMockup() {
  return (
    <div
      style={{
        width: 'clamp(180px, 22vw, 280px)',
        aspectRatio: '9/19',
        borderRadius: 36,
        border: '2px solid rgba(196,98,45,0.4)',
        background: 'rgba(26,26,26,0.9)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,240,232,0.04)',
        flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80,
          height: 6,
          borderRadius: 3,
          background: 'rgba(245,240,232,0.12)',
          zIndex: 2,
        }}
      />

      {/* Screen content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '36px 16px 20px',
          gap: 12,
        }}
      >
        {/* App header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #C4622D, #8B3A1A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {/* Thryv leaf / growth icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 22V12M12 12C12 7 17 4 21 4C21 8 18 12 12 12ZM12 12C12 7 7 4 3 4C3 8 6 12 12 12Z" stroke="#F5F0E8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 10, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F5F0E8', letterSpacing: '-0.01em' }}>
              Thryv
            </div>
            <div style={{ fontSize: 7, fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Mindful AI Companion
            </div>
          </div>
        </div>

        {/* Chat bubble — AI */}
        <div
          style={{
            background: 'rgba(196,98,45,0.15)',
            borderRadius: '12px 12px 12px 2px',
            padding: '8px 10px',
            maxWidth: '85%',
          }}
        >
          <div style={{ fontSize: 8, fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(245,240,232,0.85)', lineHeight: 1.5 }}>
            How are you feeling today? Take your time.
          </div>
        </div>

        {/* Chat bubble — user */}
        <div
          style={{
            background: 'rgba(245,240,232,0.08)',
            borderRadius: '12px 12px 2px 12px',
            padding: '8px 10px',
            maxWidth: '80%',
            alignSelf: 'flex-end',
          }}
        >
          <div style={{ fontSize: 8, fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(245,240,232,0.6)', lineHeight: 1.5 }}>
            Anxious, mostly. Work stuff.
          </div>
        </div>

        {/* Chat bubble — AI reply */}
        <div
          style={{
            background: 'rgba(196,98,45,0.15)',
            borderRadius: '12px 12px 12px 2px',
            padding: '8px 10px',
            maxWidth: '90%',
          }}
        >
          <div style={{ fontSize: 8, fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(245,240,232,0.85)', lineHeight: 1.5 }}>
            That makes sense. Want to talk through what's weighing on you most?
          </div>
        </div>

        {/* Typing indicator */}
        <div style={{ display: 'flex', gap: 3, paddingLeft: 4, marginTop: 4 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#C4622D',
                opacity: 0.6,
                animation: `appDot 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Input bar */}
        <div
          style={{
            marginTop: 'auto',
            background: 'rgba(245,240,232,0.05)',
            borderRadius: 20,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            border: '1px solid rgba(245,240,232,0.08)',
          }}
        >
          <div style={{ flex: 1, fontSize: 7, fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(245,240,232,0.25)' }}>
            Say anything…
          </div>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'rgba(196,98,45,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="6" height="6" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M5 1v8M1 5l4-4 4 4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes appDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function EmbedModal({ onClose }: { onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const canEmbed = Boolean(THRYV_EMBED_URL);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'rgba(10,10,10,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 48px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 960,
          height: '85vh',
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid rgba(196,98,45,0.25)',
          background: '#111',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
        }}
      >
        {/* Modal header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid rgba(245,240,232,0.06)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#C4622D',
                opacity: 0.9,
              }}
            />
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: 13,
                color: '#F5F0E8',
                letterSpacing: '-0.01em',
              }}
            >
              Thryv
            </span>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: 'rgba(245,240,232,0.3)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Mindful AI Companion
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              href={THRYV_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 11,
                color: 'rgba(196,98,45,0.7)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C4622D'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(196,98,45,0.7)'; }}
            >
              Open full screen
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              onClick={onClose}
              aria-label="Close preview"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(245,240,232,0.4)',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#F5F0E8'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.4)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {canEmbed ? (
            <>
              {!loaded && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    background: '#111',
                    zIndex: 2,
                  }}
                >
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#C4622D',
                          animation: `appDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, color: 'rgba(245,240,232,0.3)' }}>
                    Loading Thryv…
                  </span>
                </div>
              )}
              <iframe
                src={THRYV_EMBED_URL}
                title="Thryv: Mindful AI Companion"
                onLoad={() => setLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                }}
                allow="microphone; camera"
              />
            </>
          ) : (
            // Fallback when no embed URL is configured
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 20,
                padding: 40,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(196,98,45,0.2), rgba(196,98,45,0.05))',
                  border: '1px solid rgba(196,98,45,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 22V12M12 12C12 7 17 4 21 4C21 8 18 12 12 12ZM12 12C12 7 7 4 3 4C3 8 6 12 12 12Z" stroke="#C4622D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 18, color: '#F5F0E8', marginBottom: 8 }}>
                  Thryv — Mindful AI Companion
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, color: 'rgba(245,240,232,0.45)', maxWidth: '42ch', lineHeight: 1.6, marginBottom: 24 }}>
                  A mental health companion that listens without judgment. Try it in full screen for the best experience.
                </div>
                <a
                  href={THRYV_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 24px',
                    borderRadius: 2,
                    background: '#C4622D',
                    color: '#1A1A1A',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 600,
                    fontSize: 13,
                    textDecoration: 'none',
                  }}
                >
                  Open Thryv
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AppShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="app"
        className="relative w-full js-reveal"
        style={{
          background: 'linear-gradient(180deg, #1A1A1A 0%, #111111 100%)',
          borderTop: '1px solid rgba(196,98,45,0.12)',
          borderBottom: '1px solid rgba(196,98,45,0.12)',
          paddingTop: 'clamp(80px, 10vw, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 130px)',
          paddingLeft: 'clamp(28px, 5vw, 80px)',
          paddingRight: 'clamp(28px, 5vw, 80px)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle ember glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 'clamp(40px, 12vw, 200px)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 300,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(196,98,45,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="max-w-[1080px] mx-auto"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(40px, 6vw, 80px)',
            flexWrap: 'wrap',
          }}
        >
          {/* Left — text content */}
          <div style={{ flex: '1 1 340px', maxWidth: 520 }}>
            <div
              className="font-mono uppercase tracking-[0.22em]"
              style={{ fontSize: 10, color: '#C4622D', marginBottom: 20 }}
            >
              Live Project
            </div>

            <h2
              className="font-serif font-light leading-[1.0] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: '#F5F0E8', marginBottom: 20 }}
            >
              Thryv<br />
              <em style={{ color: '#C4622D', fontSize: '0.72em' }}>Mindful AI Companion</em>
            </h2>

            <p
              className="font-sans leading-[1.75]"
              style={{ fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(245,240,232,0.55)', marginBottom: 16, maxWidth: '44ch' }}
            >
              A mental health companion powered by AI, designed to listen, not to diagnose. Built to test what trustworthy, explainable AI presence feels like in everyday mental wellbeing — the same question my PhD research asks, turned into something you can actually use.
            </p>

            <p
              className="font-sans leading-[1.75]"
              style={{ fontSize: 'clamp(13px, 1.15vw, 15px)', color: 'rgba(245,240,232,0.35)', marginBottom: 36, maxWidth: '44ch' }}
            >
              Part of my ongoing research into trust and AI in mental healthcare. Every interaction is a prototype of what responsible AI-assisted support should feel like.
            </p>

            {/* Feature tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              {['Mental wellbeing', 'AI-assisted', 'Privacy-first', 'No diagnosis'].map(tag => (
                <span
                  key={tag}
                  className="font-mono uppercase tracking-[0.14em]"
                  style={{
                    fontSize: 9,
                    color: 'rgba(196,98,45,0.7)',
                    border: '1px solid rgba(196,98,45,0.2)',
                    borderRadius: 2,
                    padding: '4px 10px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 24px',
                  borderRadius: 2,
                  background: '#C4622D',
                  color: '#1A1A1A',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Try Thryv
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 7l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <a
                href={THRYV_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 12,
                  color: 'rgba(245,240,232,0.35)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.35)'; }}
              >
                View on Replit
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — phone mockup */}
          <div
            className="js-reveal-x"
            style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}
          >
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Embed modal */}
      {modalOpen && <EmbedModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
