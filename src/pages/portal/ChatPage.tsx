import { useState, useRef, useEffect, useCallback } from 'react';
import type { PortalUser } from '@/hooks/usePortalAuth';

interface ChatSession {
  id: number;
  title: string;
  createdAt: string;
}

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

interface Props {
  user: PortalUser;
  token: string;
}

const STARTERS: Record<'clinician' | 'consumer', string[]> = {
  clinician: [
    'What does the evidence say about CBT for treatment-resistant depression?',
    'Summarise the RANZCP guidelines for bipolar disorder management',
    'What are best-practice approaches for trauma-informed care?',
    'How do I explain the Mental Health Care Plan process to a patient?',
  ],
  consumer: [
    'What is anxiety and how do I know if I have it?',
    'How do I find a psychologist in Australia?',
    'What helps with sleep when you are feeling stressed?',
    'What is the difference between a psychiatrist and a psychologist?',
  ],
};

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^---$/gm, '<hr style="border-color:rgba(245,240,232,0.08);margin:12px 0">')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

export function ChatPage({ user, token }: Props) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const loadSessions = useCallback(async () => {
    const r = await fetch('/api/portal/chat/sessions', { headers });
    if (r.ok) {
      const d = await r.json() as { sessions: ChatSession[] };
      setSessions(d.sessions);
    }
  }, [token]);

  const loadMessages = useCallback(async (sessionId: number) => {
    const r = await fetch(`/api/portal/chat/sessions/${sessionId}`, { headers });
    if (r.ok) {
      const d = await r.json() as { session: ChatSession; messages: ChatMessage[] };
      setActiveSession(d.session);
      setMessages(d.messages.filter(m => m.role !== 'system'));
    }
  }, [token]);

  const createSession = useCallback(async () => {
    const r = await fetch('/api/portal/chat/sessions', { method: 'POST', headers });
    if (r.ok) {
      const d = await r.json() as { session: ChatSession };
      setSessions(prev => [d.session, ...prev]);
      setActiveSession(d.session);
      setMessages([]);
      setSidebarOpen(false);
    }
  }, [token]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    let session = activeSession;

    // Auto-create session if none active
    if (!session) {
      const r = await fetch('/api/portal/chat/sessions', { method: 'POST', headers });
      if (!r.ok) return;
      const d = await r.json() as { session: ChatSession };
      session = d.session;
      setActiveSession(d.session);
      setSessions(prev => [d.session, ...prev]);
    }

    const optimisticMsg: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMsg]);
    setInput('');
    setLoading(true);

    try {
      const r = await fetch(`/api/portal/chat/sessions/${session.id}/message`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content: text }),
      });

      const d = await r.json() as { reply?: string; error?: string; unconfigured?: boolean };

      if (!r.ok) {
        const errMsg = d.unconfigured
          ? 'The AI assistant is not yet connected. The site administrator needs to configure the Ollama API endpoint.'
          : (d.error ?? 'Something went wrong. Please try again.');
        setMessages(prev => [...prev, {
          id: Date.now(),
          role: 'assistant',
          content: errMsg,
          createdAt: new Date().toISOString(),
        }]);
        return;
      }

      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'assistant',
        content: d.reply ?? '',
        createdAt: new Date().toISOString(),
      }]);

      // Refresh session list to update title
      loadSessions();
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'assistant',
        content: 'Connection error. Please check your internet connection and try again.',
        createdAt: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const accentColor = user.role === 'clinician' ? '#C4622D' : '#6B9E6B';
  const starters = STARTERS[user.role];

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed md:static inset-y-0 left-0 z-40 md:z-auto`}
        style={{
          width: 260,
          background: 'rgba(22,22,22,0.98)',
          borderRight: '1px solid rgba(245,240,232,0.06)',
          top: 64,
        }}
      >
        <div className="p-4">
          <button
            onClick={createSession}
            className="w-full py-2.5 px-4 font-sans font-medium text-sm flex items-center gap-2 transition-all duration-200 hover:opacity-80"
            style={{
              background: accentColor,
              color: '#1A1A1A',
              fontSize: 13,
            }}
          >
            <span>+</span> New conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {sessions.length === 0 && (
            <p className="px-3 py-4 font-sans" style={{ fontSize: 12, color: 'rgba(245,240,232,0.25)' }}>
              No conversations yet.
            </p>
          )}
          {sessions.map(s => (
            <button
              key={s.id}
              onClick={() => { loadMessages(s.id); setSidebarOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded transition-colors duration-150 mb-0.5"
              style={{
                background: activeSession?.id === s.id ? 'rgba(245,240,232,0.07)' : 'transparent',
                fontSize: 13,
                color: activeSession?.id === s.id ? '#F5F0E8' : 'rgba(245,240,232,0.45)',
                fontFamily: 'Space Grotesk, sans-serif',
                lineHeight: 1.4,
              }}
            >
              <span className="line-clamp-2">{s.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div
          className="md:hidden flex items-center px-4 py-3"
          style={{ borderBottom: '1px solid rgba(245,240,232,0.06)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="font-sans transition-colors hover:text-parchment"
            style={{ fontSize: 12, color: 'rgba(245,240,232,0.45)' }}
          >
            ☰ History
          </button>
          <span
            className="mx-3 font-sans truncate"
            style={{ fontSize: 13, color: 'rgba(245,240,232,0.35)' }}
          >
            {activeSession?.title ?? 'New conversation'}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto" style={{ padding: 'clamp(20px, 3vw, 40px)' }}>
          <div className="max-w-[760px] mx-auto flex flex-col gap-6">

            {/* Empty state */}
            {messages.length === 0 && (
              <div className="flex flex-col gap-8 pt-8">
                <div>
                  <h2
                    className="font-serif font-light leading-[1.1] mb-3"
                    style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
                  >
                    Hello, <span style={{ color: accentColor }}>{user.name.split(' ')[0]}</span>.
                  </h2>
                  <p className="font-sans leading-relaxed" style={{ fontSize: 15, color: 'rgba(245,240,232,0.45)' }}>
                    {user.role === 'clinician'
                      ? 'Ask me anything about evidence-based mental health practice. I draw only from validated clinical guidelines.'
                      : 'I\'m here to help you understand mental health and find the support you need. Ask me anything.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {starters.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(s); inputRef.current?.focus(); }}
                      className="text-left p-4 font-sans transition-all duration-200"
                      style={{
                        background: 'rgba(245,240,232,0.04)',
                        border: '1px solid rgba(245,240,232,0.07)',
                        fontSize: 13,
                        color: 'rgba(245,240,232,0.6)',
                        lineHeight: 1.5,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}44`;
                        (e.currentTarget as HTMLElement).style.color = '#F5F0E8';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,232,0.07)';
                        (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.6)';
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message list */}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5 font-bold"
                    style={{ background: `${accentColor}22`, color: accentColor, fontSize: 9, fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    AI
                  </div>
                )}
                <div
                  className="max-w-[85%] px-4 py-3 font-sans leading-[1.7]"
                  style={{
                    fontSize: 14,
                    background: m.role === 'user' ? `${accentColor}22` : 'rgba(245,240,232,0.05)',
                    color: m.role === 'user' ? '#F5F0E8' : 'rgba(245,240,232,0.85)',
                    borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '2px 12px 12px 12px',
                  }}
                  dangerouslySetInnerHTML={{ __html: `<p>${formatMarkdown(m.content)}</p>` }}
                />
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold"
                  style={{ background: `${accentColor}22`, color: accentColor, fontSize: 9, fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  AI
                </div>
                <div
                  className="px-4 py-3 flex items-center gap-1.5"
                  style={{ background: 'rgba(245,240,232,0.05)', borderRadius: '2px 12px 12px 12px' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: accentColor, animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: accentColor, animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: accentColor, animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input area */}
        <div
          style={{
            borderTop: '1px solid rgba(245,240,232,0.06)',
            padding: 'clamp(12px, 2vw, 20px)',
            background: 'rgba(26,26,26,0.8)',
          }}
        >
          <div className="max-w-[760px] mx-auto">
            <div
              className="flex items-end gap-3"
              style={{
                background: 'rgba(245,240,232,0.05)',
                border: '1px solid rgba(245,240,232,0.09)',
                padding: '12px 16px',
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  user.role === 'clinician'
                    ? 'Ask about guidelines, interventions, assessments…'
                    : 'Ask about mental health, wellbeing, finding support…'
                }
                rows={1}
                className="flex-1 bg-transparent font-sans text-parchment placeholder:text-parchment/25 focus:outline-none resize-none"
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  maxHeight: 120,
                  overflow: 'auto',
                }}
                onInput={e => {
                  const t = e.currentTarget;
                  t.style.height = 'auto';
                  t.style.height = `${Math.min(t.scrollHeight, 120)}px`;
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="flex-shrink-0 px-4 py-2 font-sans font-semibold transition-all duration-150 disabled:opacity-30"
                style={{ background: accentColor, color: '#1A1A1A', fontSize: 13 }}
              >
                Send
              </button>
            </div>
            <p
              className="mt-2 text-center font-sans"
              style={{ fontSize: 10, color: 'rgba(245,240,232,0.18)', letterSpacing: '0.02em' }}
            >
              {user.role === 'clinician'
                ? 'Decision support only · Not a substitute for clinical judgment · Press Enter to send'
                : 'For information only · Not clinical advice · Press Enter to send'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
