import { useState } from 'react';
import { Wordmark } from '@/components/Wordmark';

interface Props {
  role: 'clinician' | 'consumer';
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string, name: string) => Promise<void>;
}

const COPY = {
  clinician: {
    title: 'Clinician Portal',
    subtitle: 'Evidence-based clinical decision support for mental health professionals.',
    badge: 'For registered mental health professionals',
    color: '#C4622D',
    loginHeading: 'Sign in to the Clinician Portal',
    registerHeading: 'Create a Clinician Account',
    disclaimer:
      'This portal is intended for registered mental health professionals only. By creating an account you confirm you hold appropriate qualifications and professional registration.',
  },
  consumer: {
    title: 'Mental Health Support',
    subtitle: 'A safe space to learn, ask questions, and find the support you need.',
    badge: 'Confidential · Evidence-based · Free',
    color: '#6B9E6B',
    loginHeading: 'Welcome back',
    registerHeading: 'Create your account',
    disclaimer:
      'Your conversations are private. This service provides information and support — it does not replace professional mental health care.',
  },
} as const;

export function LoginPage({ role, onLogin, onRegister }: Props) {
  const copy = COPY[role];
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await onLogin(email, password);
      } else {
        await onRegister(email, password, name);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-obsidian text-parchment font-sans flex flex-col"
      style={{ WebkitFontSmoothing: 'antialiased' } as React.CSSProperties}
    >
      {/* Top bar */}
      <div className="px-8 py-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(245,240,232,0.06)' }}>
        <a href="/">
          <Wordmark surface="dark" className="h-5" />
        </a>
        <a
          href="/"
          className="font-sans uppercase tracking-[0.15em] transition-colors hover:text-parchment"
          style={{ fontSize: 10, color: 'rgba(245,240,232,0.35)' }}
        >
          ← Back to site
        </a>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Role badge */}
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(245,240,232,0.05)', border: `1px solid ${copy.color}22` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: copy.color }} />
              <span
                className="uppercase font-medium font-sans tracking-[0.15em]"
                style={{ fontSize: 10, color: copy.color }}
              >
                {copy.badge}
              </span>
            </div>

            <h1
              className="font-serif font-light leading-[1.1] tracking-[-0.02em] mb-3"
              style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}
            >
              {mode === 'login' ? copy.loginHeading : copy.registerHeading}
            </h1>
            <p className="font-sans leading-relaxed" style={{ fontSize: 15, color: 'rgba(245,240,232,0.45)' }}>
              {copy.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {mode === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label className="uppercase font-medium font-sans tracking-[0.15em]" style={{ fontSize: 10, color: 'rgba(245,240,232,0.4)' }}>
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full bg-transparent py-3 focus:outline-none font-sans text-parchment placeholder:text-parchment/20 border-b transition-colors duration-200 focus:border-parchment/40"
                  style={{ fontSize: 15, borderBottomColor: 'rgba(245,240,232,0.15)' }}
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="uppercase font-medium font-sans tracking-[0.15em]" style={{ fontSize: 10, color: 'rgba(245,240,232,0.4)' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-transparent py-3 focus:outline-none font-sans text-parchment placeholder:text-parchment/20 border-b transition-colors duration-200 focus:border-parchment/40"
                style={{ fontSize: 15, borderBottomColor: 'rgba(245,240,232,0.15)' }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="uppercase font-medium font-sans tracking-[0.15em]" style={{ fontSize: 10, color: 'rgba(245,240,232,0.4)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder={mode === 'register' ? 'At least 8 characters' : '••••••••'}
                className="w-full bg-transparent py-3 focus:outline-none font-sans text-parchment placeholder:text-parchment/20 border-b transition-colors duration-200 focus:border-parchment/40"
                style={{ fontSize: 15, borderBottomColor: 'rgba(245,240,232,0.15)' }}
              />
            </div>

            {error && (
              <div
                className="px-4 py-3 rounded-lg font-sans"
                style={{ fontSize: 13, background: 'rgba(196,98,45,0.1)', color: '#C4622D', border: '1px solid rgba(196,98,45,0.2)' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3.5 px-6 font-sans font-semibold transition-all duration-200 disabled:opacity-40"
              style={{
                background: copy.color,
                color: '#1A1A1A',
                fontSize: 14,
                letterSpacing: '0.01em',
              }}
            >
              {loading
                ? 'Please wait…'
                : mode === 'login'
                  ? 'Sign in'
                  : 'Create account'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }}
                className="font-sans transition-colors hover:text-parchment"
                style={{ fontSize: 13, color: 'rgba(245,240,232,0.4)' }}
              >
                {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>

          {/* Disclaimer */}
          <p
            className="mt-10 font-sans leading-relaxed text-center"
            style={{ fontSize: 11, color: 'rgba(245,240,232,0.2)' }}
          >
            {copy.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
