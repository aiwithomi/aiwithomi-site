import { useState, useEffect, useRef } from 'react';

interface ClaimResult {
  verdict: 'Myth' | 'Partial truth' | 'Nuanced' | 'Largely true';
  response: string;
}

const PRESETS = [
  'AI will replace doctors',
  'AI is objective and unbiased',
  'AI is more accurate than clinicians',
  'We cannot trust AI in healthcare',
];

const VERDICT_META: Record<string, { color: string; bg: string }> = {
  'Myth':          { color: '#C4622D',               bg: 'rgba(196,98,45,0.14)' },
  'Partial truth': { color: 'rgba(196,98,45,0.85)',  bg: 'rgba(196,98,45,0.08)' },
  'Nuanced':       { color: 'rgba(245,240,232,0.8)', bg: 'rgba(245,240,232,0.06)' },
  'Largely true':  { color: '#F5F0E8',               bg: 'rgba(245,240,232,0.1)' },
};

declare global {
  interface Window {
    claude?: { complete: (prompt: string) => Promise<string> };
  }
}

export function MythChecker() {
  const [claim, setClaim]             = useState('');
  const [displayedClaim, setDisplayedClaim] = useState('');
  const [isTyping, setIsTyping]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [result, setResult]           = useState<ClaimResult | null>(null);
  const [error, setError]             = useState('');
  const typingRef                     = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typingRef.current) clearInterval(typingRef.current);
    if (!claim) { setDisplayedClaim(''); setIsTyping(false); return; }

    setDisplayedClaim('');
    setIsTyping(true);
    let i = 0;
    typingRef.current = setInterval(() => {
      i++;
      setDisplayedClaim(claim.slice(0, i));
      if (i >= claim.length) {
        clearInterval(typingRef.current!);
        typingRef.current = null;
        setIsTyping(false);
      }
    }, 22);

    return () => { if (typingRef.current) clearInterval(typingRef.current); };
  }, [claim]);

  async function handleCheck() {
    if (!claim.trim()) return;
    setLoading(true);
    setResult(null);
    setError('');
    try {
      if (!window.claude?.complete) throw new Error('AI not available in this environment.');
      const prompt = `You are Omi Iftikhar — a healthcare data professional and PhD candidate in AI for mental healthcare in Australia. Evaluate the claim below directly in your voice: first-person, warm but honest, no hedging, no em dashes, no emoji, Australian English.

Return ONLY valid JSON with no markdown:
{"verdict":"one of exactly: Myth | Partial truth | Nuanced | Largely true","response":"2-3 paragraphs. Direct. Specific. Challenge where wrong, credit where right."}

Claim: "${claim}"`;
      const raw = await window.claude.complete(prompt);
      const cleaned = raw.replace(/```json?/g, '').replace(/```/g, '').trim();
      setResult(JSON.parse(cleaned));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function pick(p: string) {
    setClaim(p);
    setResult(null);
    setError('');
  }

  const vm = result ? (VERDICT_META[result.verdict] ?? VERDICT_META['Nuanced']) : null;

  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#111111' }}>

      {/* Top ember rule */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, #C4622D 0%, rgba(196,98,45,0.4) 50%, transparent 80%)' }} />

      {/* Background beam */}
      <svg className="absolute left-0 top-0 w-[60%] h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="myth-beam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C4622D" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#C4622D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#myth-beam)" />
      </svg>

      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-[5fr_6fr]"
        style={{ minHeight: '80vh' }}
      >

        {/* ── LEFT — Claim panel ── */}
        <div
          className="flex flex-col justify-between"
          style={{
            padding: 'clamp(48px, 7vw, 96px) clamp(28px, 5vw, 64px)',
            borderRight: '1px solid rgba(245,240,232,0.06)',
          }}
        >
          {/* Label + heading/claim */}
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="font-mono tracking-[0.06em]" style={{ fontSize: 10, color: 'rgba(245,240,232,0.25)' }}>05</div>
              <div className="uppercase font-medium font-sans tracking-[0.2em]" style={{ fontSize: 10, color: 'rgba(196,98,45,0.65)' }}>
                Myth Checker
              </div>
            </div>

            {/* Dynamic: heading or claim pull-quote */}
            {claim ? (
              <div>
                <div className="uppercase font-medium font-sans tracking-[0.2em] mb-5" style={{ fontSize: 10, color: 'rgba(245,240,232,0.3)' }}>
                  The claim
                </div>
                <blockquote
                  className="font-serif italic font-light leading-[1.15] tracking-[-0.01em]"
                  style={{ fontSize: 'clamp(28px, 3.8vw, 50px)', color: '#F5F0E8' }}
                >
                  <span style={{ color: 'rgba(245,240,232,0.35)' }}>"</span>
                  {displayedClaim}
                  {isTyping
                    ? <span className="animate-pulse" style={{ color: '#C4622D', fontStyle: 'normal' }}>|</span>
                    : <span style={{ color: 'rgba(245,240,232,0.35)' }}>"</span>
                  }
                </blockquote>
                <div className="mt-8 h-[2px] w-12" style={{ background: '#C4622D' }} />
              </div>
            ) : (
              <div>
                <h2
                  className="font-serif font-light leading-[1.0] tracking-[-0.025em]"
                  style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: '#F5F0E8' }}
                >
                  I have heard<br />
                  that claim{' '}
                  <span className="italic" style={{ color: '#C4622D' }}>before</span>.
                </h2>
                <p
                  className="font-sans leading-[1.7] mt-6"
                  style={{ fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(245,240,232,0.45)', maxWidth: '36ch' }}
                >
                  Select a claim or write your own. I will tell you what I actually think.
                </p>
              </div>
            )}
          </div>

          {/* Preset list + input */}
          <div className="mt-12 flex flex-col gap-0">
            <div className="uppercase font-medium font-sans tracking-[0.2em] mb-4" style={{ fontSize: 9, color: 'rgba(245,240,232,0.2)' }}>
              Common claims
            </div>
            {PRESETS.map((p, i) => (
              <button
                key={i}
                data-testid={`button-claim-${i}`}
                onClick={() => pick(p)}
                className="text-left transition-all duration-200"
                style={{
                  padding: '14px 0',
                  borderTop: '1px solid rgba(245,240,232,0.06)',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'padding-left 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = '8px'; }}
                onMouseLeave={e => { if (claim !== p) e.currentTarget.style.paddingLeft = '0px'; }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: claim === p ? '#C4622D' : 'rgba(245,240,232,0.15)',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                  }}
                />
                <span
                  className="font-serif italic font-light"
                  style={{
                    fontSize: 'clamp(15px, 1.4vw, 18px)',
                    color: claim === p ? '#C4622D' : 'rgba(245,240,232,0.55)',
                    transition: 'color 0.2s',
                    lineHeight: 1.4,
                  }}
                >
                  {p}
                </span>
              </button>
            ))}
            <div style={{ borderTop: '1px solid rgba(245,240,232,0.06)' }} />

            {/* Custom input */}
            <div className="mt-6">
              <input
                type="text"
                value={PRESETS.includes(claim) ? '' : claim}
                onChange={e => pick(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCheck()}
                data-testid="input-claim"
                placeholder="Or write your own..."
                className="w-full bg-transparent focus:outline-none font-sans"
                style={{
                  fontSize: 'clamp(14px, 1.2vw, 16px)',
                  color: '#F5F0E8',
                  borderBottom: '1px solid rgba(245,240,232,0.15)',
                  padding: '10px 0',
                }}
              />
            </div>

            <button
              onClick={handleCheck}
              disabled={loading || !claim.trim()}
              data-testid="button-check-claim"
              className="mt-6 self-start uppercase font-medium font-sans tracking-[0.2em] transition-all duration-200 disabled:opacity-25"
              style={{
                fontSize: 11,
                color: '#1A1A1A',
                background: '#C4622D',
                padding: '12px 28px',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.2em',
              }}
            >
              {loading ? 'Thinking...' : "Get Omi's verdict →"}
            </button>
          </div>
        </div>

        {/* ── RIGHT — Verdict panel ── */}
        <div
          className="flex flex-col justify-center"
          style={{
            padding: 'clamp(48px, 7vw, 96px) clamp(28px, 5vw, 64px)',
            background: 'rgba(255,255,255,0.015)',
          }}
        >

          {/* Loading */}
          {loading && (
            <div className="flex flex-col gap-5">
              <div className="uppercase font-medium font-sans tracking-[0.2em] mb-4 animate-pulse" style={{ fontSize: 10, color: 'rgba(196,98,45,0.5)' }}>
                Reading the claim...
              </div>
              {[80, 100, 65, 90, 75, 50].map((w, i) => (
                <div key={i} className="rounded animate-pulse"
                  style={{ width: `${w}%`, height: i === 0 ? 12 : 9, background: 'rgba(245,240,232,0.05)' }} />
              ))}
            </div>
          )}

          {/* Result */}
          {result && !loading && vm && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <span
                  className="font-mono uppercase tracking-[0.22em]"
                  style={{
                    fontSize: 12,
                    color: vm.color,
                    background: vm.bg,
                    padding: '6px 16px',
                  }}
                >
                  {result.verdict}
                </span>
                <div style={{ flex: 1, height: 1, background: 'rgba(245,240,232,0.07)' }} />
              </div>

              <p
                className="font-serif italic font-light"
                style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', color: 'rgba(245,240,232,0.35)', borderLeft: '2px solid rgba(196,98,45,0.3)', paddingLeft: 14 }}
              >
                "{claim}"
              </p>

              <div
                className="font-serif font-light leading-[1.75] whitespace-pre-line flex-1"
                style={{ fontSize: 'clamp(17px, 1.7vw, 22px)', color: 'rgba(245,240,232,0.88)' }}
              >
                {result.response}
              </div>

              <div style={{ paddingTop: 24, borderTop: '1px solid rgba(245,240,232,0.07)' }}>
                <div className="uppercase font-medium font-sans tracking-[0.16em]" style={{ fontSize: 10, color: 'rgba(245,240,232,0.25)' }}>
                  Omi Iftikhar · AIwithOmi
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !result && (
            <div className="flex flex-col gap-6" style={{ maxWidth: '42ch' }}>
              <div style={{ width: 40, height: 2, background: 'rgba(196,98,45,0.45)' }} />
              <p
                className="font-serif italic font-light leading-[1.6]"
                style={{ fontSize: 'clamp(22px, 2.8vw, 36px)', color: 'rgba(245,240,232,0.18)' }}
              >
                Omi's verdict will appear here.
              </p>
              <p className="font-sans leading-[1.7]" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(245,240,232,0.2)' }}>
                No hedging. No false balance. Just what the evidence actually says. For illustration purposes only, and once a framework is established during my PhD journey, it will go live here.
              </p>
              {error && (
                <p className="font-mono" style={{ fontSize: 13, color: 'rgba(196,98,45,0.7)' }}>{error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
