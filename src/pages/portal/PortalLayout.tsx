import { type ReactNode } from 'react';
import { Wordmark } from '@/components/Wordmark';
import type { PortalUser } from '@/hooks/usePortalAuth';

interface Props {
  role: 'clinician' | 'consumer';
  user: PortalUser | null;
  onLogout: () => void;
  children: ReactNode;
}

export function PortalLayout({ role, user, onLogout, children }: Props) {
  const roleLabel = role === 'clinician' ? 'Clinician Portal' : 'Consumer Portal';
  const roleColor = role === 'clinician' ? '#C4622D' : '#6B9E6B';

  return (
    <div className="min-h-screen bg-obsidian text-parchment font-sans" style={{ WebkitFontSmoothing: 'antialiased' } as React.CSSProperties}>
      {/* Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
        style={{
          height: 64,
          background: 'rgba(26,26,26,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(245,240,232,0.06)',
        }}
      >
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center">
            <Wordmark surface="dark" className="h-6" />
          </a>
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,240,232,0.05)', border: '1px solid rgba(245,240,232,0.08)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: roleColor }}
            />
            <span
              className="uppercase font-medium font-sans tracking-[0.15em]"
              style={{ fontSize: 10, color: roleColor }}
            >
              {roleLabel}
            </span>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <span
              className="hidden md:block font-sans"
              style={{ fontSize: 13, color: 'rgba(245,240,232,0.45)' }}
            >
              {user.name}
            </span>
            <button
              onClick={onLogout}
              className="uppercase font-medium font-sans tracking-[0.15em] transition-colors hover:text-ember"
              style={{ fontSize: 10, color: 'rgba(245,240,232,0.4)' }}
            >
              Sign out
            </button>
          </div>
        )}
      </header>

      {/* Content */}
      <div style={{ paddingTop: 64 }}>
        {children}
      </div>

      {/* Safety disclaimer */}
      <footer
        className="px-6 py-6 text-center"
        style={{ borderTop: '1px solid rgba(245,240,232,0.05)' }}
      >
        <p
          className="font-sans max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: 11, color: 'rgba(245,240,232,0.2)', letterSpacing: '0.01em' }}
        >
          {role === 'clinician'
            ? 'This tool provides decision support only. All clinical decisions and professional responsibility remain with the treating clinician.'
            : 'This tool provides general mental health information only — it is not a substitute for professional care. If you are in crisis, call Lifeline 13 11 14 or emergency services 000.'}
        </p>
      </footer>
    </div>
  );
}
