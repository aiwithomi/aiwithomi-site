import { useState } from 'react';
import { Wordmark } from './Wordmark';

interface Subscriber {
  id: number;
  email: string;
  source: string;
  createdAt: string;
}

interface PortalStats {
  users: { clinicians: number; consumers: number };
  sessions: { total: number; thisWeek: number };
  messages: { total: number };
  crisis: { total: number };
  recentSessions: Array<{
    id: number;
    title: string;
    createdAt: string;
    userRole: string;
    userName: string;
  }>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

function exportCSV(subscribers: Subscriber[]) {
  const rows = [
    ['ID', 'Email', 'Source', 'Subscribed'],
    ...subscribers.map(s => [String(s.id), s.email, s.source, formatDate(s.createdAt)]),
  ];
  const csv = rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aiwithomi-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function StatCard({ label, value, sub, accent }: { label: string; value: number | string; sub?: string; accent?: string }) {
  return (
    <div
      className="flex flex-col gap-2 p-6 rounded-lg"
      style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(245,240,232,0.07)' }}
    >
      <div className="uppercase font-medium font-sans tracking-[0.15em]" style={{ fontSize: 10, color: 'rgba(245,240,232,0.35)' }}>
        {label}
      </div>
      <div className="font-serif font-light leading-none" style={{ fontSize: 40, color: accent ?? '#F5F0E8' }}>
        {value}
      </div>
      {sub && (
        <div className="font-sans" style={{ fontSize: 12, color: 'rgba(245,240,232,0.35)' }}>{sub}</div>
      )}
    </div>
  );
}

export function Admin() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [portalStats, setPortalStats] = useState<PortalStats | null>(null);
  const [activeTab, setActiveTab] = useState<'subscribers' | 'portals'>('subscribers');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true);
    setError('');

    try {
      const [subRes, statsRes] = await Promise.all([
        fetch('/api/admin/subscribers', { headers: { Authorization: `Bearer ${key}` } }),
        fetch('/api/admin/portal-stats', { headers: { Authorization: `Bearer ${key}` } }),
      ]);

      if (subRes.status === 401) { setError('Incorrect admin key.'); return; }
      if (!subRes.ok) { setError('Server error. Please try again.'); return; }

      const subData = await subRes.json() as { subscribers: Subscriber[] };
      setSubscribers(subData.subscribers);

      if (statsRes.ok) {
        const statsData = await statsRes.json() as PortalStats;
        setPortalStats(statsData);
      }

      setAuthed(true);
    } catch {
      setError('Could not reach the server.');
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setLoading(true);
    try {
      const [subRes, statsRes] = await Promise.all([
        fetch('/api/admin/subscribers', { headers: { Authorization: `Bearer ${key}` } }),
        fetch('/api/admin/portal-stats', { headers: { Authorization: `Bearer ${key}` } }),
      ]);
      if (subRes.ok) {
        const d = await subRes.json() as { subscribers: Subscriber[] };
        setSubscribers(d.subscribers);
      }
      if (statsRes.ok) {
        const d = await statsRes.json() as PortalStats;
        setPortalStats(d);
      }
    } catch {
      setError('Refresh failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-obsidian text-parchment font-sans" style={{ WebkitFontSmoothing: 'antialiased' } as React.CSSProperties}>
      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(26,26,26,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(245,240,232,0.06)',
          boxShadow: '0 1px 0 rgba(196,98,45,0.12)',
        }}
      >
        <div className="flex items-center gap-4">
          <Wordmark surface="dark" size={22} />
          <span
            className="uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded"
            style={{ fontSize: 10, background: 'rgba(196,98,45,0.15)', color: '#C4622D', border: '1px solid rgba(196,98,45,0.25)' }}
          >
            Admin
          </span>
        </div>
        <a
          href="/"
          className="uppercase tracking-[0.2em] font-medium transition-colors duration-200 hover:text-ember"
          style={{ fontSize: 10, color: 'rgba(245,240,232,0.4)' }}
        >
          ← Back to site
        </a>
      </div>

      <main className="pt-24 px-8 pb-16 max-w-[960px] mx-auto">
        {!authed ? (
          /* Login form */
          <div className="min-h-[70vh] flex flex-col justify-center max-w-[400px] mx-auto">
            <div className="uppercase tracking-[0.2em] text-ash mb-8 font-medium" style={{ fontSize: 11 }}>
              Admin Dashboard
            </div>
            <h1 className="font-serif font-light leading-none mb-10" style={{ fontSize: 40 }}>
              Enter admin key<span className="text-ember">.</span>
            </h1>
            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
              <input
                type="password"
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="Admin key"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-sm bg-transparent font-sans text-parchment placeholder:text-parchment/20 focus:outline-none transition-colors duration-200"
                style={{ border: error ? '1px solid rgba(196,98,45,0.6)' : '1px solid rgba(245,240,232,0.12)', fontSize: 15 }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(196,98,45,0.5)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = error ? 'rgba(196,98,45,0.6)' : 'rgba(245,240,232,0.12)'; }}
              />
              {error && <p className="text-ember/80 pl-1" style={{ fontSize: 13 }}>{error}</p>}
              <button
                type="submit"
                disabled={loading || !key.trim()}
                className="py-3 px-6 rounded-sm font-semibold transition-opacity duration-200 disabled:opacity-40"
                style={{ background: '#C4622D', color: '#1A1A1A', fontSize: 14 }}
              >
                {loading ? 'Checking...' : 'Access Admin →'}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="font-serif font-light leading-none" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                Dashboard<span className="text-ember">.</span>
              </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 rounded-sm font-medium transition-colors duration-200 disabled:opacity-50"
                  style={{ border: '1px solid rgba(245,240,232,0.12)', color: 'rgba(245,240,232,0.6)', fontSize: 13 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,98,45,0.4)'; e.currentTarget.style.color = '#F5F0E8'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.12)'; e.currentTarget.style.color = 'rgba(245,240,232,0.6)'; }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M13 7A6 6 0 1 1 7 1M13 1v4H9" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-0" style={{ borderBottom: '1px solid rgba(245,240,232,0.08)' }}>
              {(['subscribers', 'portals'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="uppercase font-medium font-sans tracking-[0.15em] pb-3 pr-6 transition-colors duration-200"
                  style={{
                    fontSize: 11,
                    color: activeTab === tab ? '#C4622D' : 'rgba(245,240,232,0.35)',
                    borderBottom: activeTab === tab ? '2px solid #C4622D' : '2px solid transparent',
                    marginBottom: -1,
                  }}
                >
                  {tab === 'subscribers' ? 'Newsletter' : 'AI Portals'}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-ember/70 pl-4" style={{ fontSize: 13, borderLeft: '2px solid rgba(196,98,45,0.3)' }}>{error}</p>
            )}

            {/* ── SUBSCRIBERS TAB ── */}
            {activeTab === 'subscribers' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="uppercase tracking-[0.2em] text-ash mb-2 font-medium" style={{ fontSize: 11 }}>
                      Newsletter subscribers
                    </div>
                    <div className="font-serif font-light leading-none" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                      {subscribers.length}<span className="text-ember">.</span>
                    </div>
                  </div>
                  <button
                    onClick={() => exportCSV(subscribers)}
                    disabled={subscribers.length === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-sm font-semibold transition-colors duration-200 disabled:opacity-40"
                    style={{ background: 'rgba(196,98,45,0.9)', color: '#1A1A1A', fontSize: 13 }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#C4622D'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(196,98,45,0.9)'; }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                      <path d="M7 1v8M4 6l3 3 3-3M1 11h12v2H1z" />
                    </svg>
                    Export CSV
                  </button>
                </div>

                {subscribers.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="font-serif italic font-light" style={{ fontSize: 24, color: 'rgba(245,240,232,0.2)' }}>
                      No subscribers yet.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(245,240,232,0.07)' }}>
                    <div
                      className="grid uppercase tracking-[0.16em] font-medium px-6 py-3"
                      style={{
                        background: 'rgba(245,240,232,0.04)',
                        borderBottom: '1px solid rgba(245,240,232,0.07)',
                        gridTemplateColumns: '40px 1fr 100px 130px',
                        fontSize: 10,
                        color: 'rgba(245,240,232,0.4)',
                      }}
                    >
                      <span>#</span><span>Email</span><span>Source</span><span>Subscribed</span>
                    </div>
                    {subscribers.map((sub, i) => (
                      <div
                        key={sub.id}
                        className="grid px-6 py-4 transition-colors duration-150"
                        style={{
                          gridTemplateColumns: '40px 1fr 100px 130px',
                          borderBottom: i < subscribers.length - 1 ? '1px solid rgba(245,240,232,0.05)' : 'none',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,240,232,0.025)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span className="font-mono" style={{ fontSize: 12, color: 'rgba(245,240,232,0.25)' }}>{sub.id}</span>
                        <span className="font-sans truncate pr-4" style={{ fontSize: 14 }}>{sub.email}</span>
                        <span className="font-mono uppercase tracking-[0.1em] self-center" style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)' }}>{sub.source}</span>
                        <span className="font-sans" style={{ fontSize: 13, color: 'rgba(245,240,232,0.55)' }}>{formatDate(sub.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── PORTALS TAB ── */}
            {activeTab === 'portals' && portalStats && (
              <div className="flex flex-col gap-8">
                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <StatCard
                    label="Clinician accounts"
                    value={portalStats.users.clinicians}
                    sub="Registered clinicians"
                    accent="#C4622D"
                  />
                  <StatCard
                    label="Consumer accounts"
                    value={portalStats.users.consumers}
                    sub="Registered users"
                    accent="#6B9E6B"
                  />
                  <StatCard
                    label="Sessions this week"
                    value={portalStats.sessions.thisWeek}
                    sub={`${portalStats.sessions.total} total all time`}
                  />
                  <StatCard
                    label="AI responses"
                    value={portalStats.messages.total}
                    sub="Total messages answered"
                  />
                  <StatCard
                    label="Crisis interventions"
                    value={portalStats.crisis.total}
                    sub="Crisis resources sent"
                    accent={portalStats.crisis.total > 0 ? '#C4622D' : undefined}
                  />
                  <div
                    className="flex flex-col gap-2 p-6 rounded-lg"
                    style={{ background: 'rgba(196,98,45,0.07)', border: '1px solid rgba(196,98,45,0.15)' }}
                  >
                    <div className="uppercase font-medium font-sans tracking-[0.15em]" style={{ fontSize: 10, color: 'rgba(196,98,45,0.7)' }}>
                      Total portal users
                    </div>
                    <div className="font-serif font-light leading-none text-ember" style={{ fontSize: 40 }}>
                      {portalStats.users.clinicians + portalStats.users.consumers}
                    </div>
                    <div className="font-sans" style={{ fontSize: 12, color: 'rgba(245,240,232,0.35)' }}>
                      Across both portals
                    </div>
                  </div>
                </div>

                {/* Crisis note */}
                {portalStats.crisis.total > 0 && (
                  <div
                    className="flex items-start gap-4 p-5 rounded-lg"
                    style={{ background: 'rgba(196,98,45,0.08)', border: '1px solid rgba(196,98,45,0.2)' }}
                  >
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#C4622D' }} />
                    <div>
                      <div className="uppercase font-medium font-sans tracking-[0.15em] text-ember mb-1" style={{ fontSize: 10 }}>
                        Crisis safety note
                      </div>
                      <p className="font-sans leading-relaxed" style={{ fontSize: 13, color: 'rgba(245,240,232,0.6)' }}>
                        {portalStats.crisis.total} conversation{portalStats.crisis.total !== 1 ? 's' : ''} triggered the crisis safety protocol and received immediate crisis resources (Lifeline, Beyond Blue, emergency services). No AI response was generated for these conversations.
                      </p>
                    </div>
                  </div>
                )}

                {/* Recent sessions */}
                <div>
                  <div className="uppercase font-medium font-sans tracking-[0.15em] mb-4" style={{ fontSize: 10, color: 'rgba(245,240,232,0.35)' }}>
                    Recent conversations
                  </div>

                  {portalStats.recentSessions.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="font-serif italic font-light" style={{ fontSize: 20, color: 'rgba(245,240,232,0.2)' }}>
                        No conversations yet.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col" style={{ border: '1px solid rgba(245,240,232,0.07)', borderRadius: 8, overflow: 'hidden' }}>
                      <div
                        className="grid uppercase tracking-[0.14em] font-medium px-6 py-3"
                        style={{
                          background: 'rgba(245,240,232,0.04)',
                          borderBottom: '1px solid rgba(245,240,232,0.07)',
                          gridTemplateColumns: '1fr 130px 100px 90px',
                          fontSize: 10,
                          color: 'rgba(245,240,232,0.4)',
                        }}
                      >
                        <span>Topic</span>
                        <span>User</span>
                        <span>Portal</span>
                        <span>Date</span>
                      </div>
                      {portalStats.recentSessions.map((s, i) => (
                        <div
                          key={s.id}
                          className="grid px-6 py-3.5 transition-colors duration-150"
                          style={{
                            gridTemplateColumns: '1fr 130px 100px 90px',
                            borderBottom: i < portalStats.recentSessions.length - 1 ? '1px solid rgba(245,240,232,0.05)' : 'none',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,240,232,0.025)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          <span className="font-sans truncate pr-4" style={{ fontSize: 13, color: 'rgba(245,240,232,0.8)' }}>
                            {s.title}
                          </span>
                          <span className="font-sans truncate" style={{ fontSize: 12, color: 'rgba(245,240,232,0.45)' }}>
                            {s.userName}
                          </span>
                          <span>
                            <span
                              className="inline-flex items-center gap-1.5 uppercase font-medium tracking-[0.12em]"
                              style={{
                                fontSize: 9,
                                color: s.userRole === 'clinician' ? '#C4622D' : '#6B9E6B',
                                background: s.userRole === 'clinician' ? 'rgba(196,98,45,0.1)' : 'rgba(107,158,107,0.1)',
                                padding: '2px 8px',
                                borderRadius: 999,
                              }}
                            >
                              <span className="w-1 h-1 rounded-full" style={{ background: 'currentColor' }} />
                              {s.userRole}
                            </span>
                          </span>
                          <span className="font-sans" style={{ fontSize: 12, color: 'rgba(245,240,232,0.35)' }}>
                            {formatDateShort(s.createdAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'portals' && !portalStats && (
              <div className="py-16 text-center">
                <p className="font-serif italic font-light" style={{ fontSize: 20, color: 'rgba(245,240,232,0.2)' }}>
                  Portal analytics not available.
                </p>
              </div>
            )}

            <p className="uppercase tracking-[0.14em] font-sans" style={{ fontSize: 11, color: 'rgba(107,101,96,0.5)' }}>
              Data stored in your Replit PostgreSQL database. Change your admin key anytime in the Replit Secrets panel.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
