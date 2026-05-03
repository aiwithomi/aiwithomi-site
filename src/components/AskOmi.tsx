import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

declare global {
  interface Window {
    claude?: { complete: (prompt: string) => Promise<string> };
  }
}

const SYSTEM_PROMPT = `You are Omi Iftikhar — a Manager of Data and Analytics at a health department in Brisbane, Australia and a PhD candidate in AI for mental healthcare. You write and speak about healthcare AI at aiwithomi.com.

Visitors are asking you questions. Respond exactly as Omi would: first-person, warm, direct, honest. No em dashes. No emoji. Australian English spelling. No hedging or excessive qualification. You are not a chatbot — you are Omi, speaking plainly.

Key facts about Omi:
- Works in data and AI for a health department in Queensland, Australia
- PhD candidate researching AI explainability as a clinical trust mechanism in mental healthcare
- Tagline: "Trust, before intelligence."
- Believes explainability is not a nice-to-have but a requirement for clinical AI
- Writes about healthcare AI, practical AI builds, and his PhD journey
- Sceptical of AI hype but genuinely excited about where it can help
- Thinks clinicians' fear of AI comes from responsible caution, not technophobia
- Believes in showing the actual work: what the tool did, what it got wrong, where it broke

Keep responses concise — 2-4 sentences. If asked something outside your expertise, say so plainly. Do not make up clinical facts or statistics.`;

export function AskOmi() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      if (!window.claude?.complete) throw new Error('AI not available.');

      const history = newMessages
        .map(m => `${m.role === 'user' ? 'Visitor' : 'Omi'}: ${m.content}`)
        .join('\n');

      const prompt = `${SYSTEM_PROMPT}

Conversation so far:
${history}

Omi:`;

      const response = await window.claude.complete(prompt);
      setMessages(prev => [...prev, { role: 'assistant', content: response.trim() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I am having trouble responding right now. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  }

  const STARTERS = [
    'What is your PhD actually about?',
    'Can AI be trusted in clinical settings?',
    'What do you think about large language models in healthcare?',
  ];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        data-testid="button-ask-omi"
        aria-label="Ask Omi a question"
        className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-4 py-3 rounded-full font-sans font-semibold text-sm transition-all duration-200 shadow-lg"
        style={{
          background: open ? '#F5F0E8' : '#1A1A1A',
          color: open ? '#1A1A1A' : '#F5F0E8',
          border: '1px solid rgba(196,98,45,0.35)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}
      >
        {open ? (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Close
          </>
        ) : (
          <>
            <span style={{ color: '#C4622D', fontWeight: 700, letterSpacing: '-0.5px' }}>AI</span>
            <span style={{ opacity: 0.75 }}>Ask Omi</span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-[199] flex flex-col rounded-xl overflow-hidden shadow-2xl"
          style={{
            width: 'min(400px, calc(100vw - 48px))',
            height: 'min(520px, calc(100vh - 120px))',
            background: '#181818',
            border: '1px solid rgba(245,240,232,0.1)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: '1px solid rgba(245,240,232,0.08)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
              style={{ background: 'rgba(196,98,45,0.15)', color: '#C4622D', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              AO
            </div>
            <div>
              <div className="text-sm font-semibold text-parchment" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Ask Omi
              </div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-ash">
                Healthcare AI · Brisbane
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-[13px] text-parchment/40 mb-2">
                  Ask me anything about healthcare AI, my research, or what I think.
                </p>
                {STARTERS.map((s, i) => (
                  <button
                    key={i}
                    data-testid={`button-starter-${i}`}
                    onClick={() => { setInput(s); inputRef.current?.focus(); }}
                    className="text-left text-[12px] px-3 py-2 rounded-md transition-colors duration-150"
                    style={{
                      color: 'rgba(245,240,232,0.55)',
                      border: '1px solid rgba(245,240,232,0.08)',
                      background: 'transparent',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(196,98,45,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.08)')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className="flex flex-col gap-1"
                style={{ alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div
                  className="px-4 py-2.5 rounded-xl text-[13px] leading-[1.6] max-w-[88%]"
                  style={
                    m.role === 'user'
                      ? { background: 'rgba(196,98,45,0.18)', color: '#F5F0E8' }
                      : { background: 'rgba(245,240,232,0.06)', color: 'rgba(245,240,232,0.85)', fontFamily: 'Space Grotesk, sans-serif' }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: 'rgba(245,240,232,0.06)', width: 'fit-content' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="px-4 py-3 flex gap-2"
            style={{ borderTop: '1px solid rgba(245,240,232,0.08)' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              data-testid="input-ask-omi"
              placeholder="Ask Omi..."
              className="flex-1 bg-transparent text-parchment text-[13px] focus:outline-none placeholder:text-parchment/25 font-sans"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              data-testid="button-send-message"
              className="px-3 py-1.5 rounded-md text-[12px] font-semibold transition-opacity duration-150 disabled:opacity-35"
              style={{ background: 'rgba(196,98,45,0.9)', color: '#1A1A1A' }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
