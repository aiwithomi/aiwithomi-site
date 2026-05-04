import { useState, useEffect } from 'react';
import { Wordmark } from './Wordmark';

const NAV_SECTIONS = ['about', 'read', 'newsletter', 'app'] as const;
type NavSection = typeof NAV_SECTIONS[number];

const NAV_HEIGHT = 64;

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
  window.scrollTo({ top, behavior: 'smooth' });
}

function AiStatusDot() {
  return (
    <div className="hidden md:flex items-center gap-2">
      <span className="relative flex h-2 w-2" aria-label="AI models active">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ background: '#4ade80' }}
        />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22c55e' }} />
      </span>
      <span
        className="font-mono uppercase tracking-[0.18em]"
        style={{ fontSize: 9, color: 'rgba(245,240,232,0.35)' }}
      >
        AI · ONLINE
      </span>
    </div>
  );
}

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSection | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    function updateScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id as NavSection;
            if ((NAV_SECTIONS as readonly string[]).includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
    );

    NAV_SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  function navLinkStyle(id: NavSection) {
    const isActive = activeSection === id;
    return {
      fontSize: 11 as const,
      color: isActive ? '#C4622D' : 'rgba(245,240,232,0.5)',
      transition: 'color 0.25s',
    };
  }

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: 'rgba(26,26,26,0.93)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(245,240,232,0.05)',
      }}
    >
      {/* Ember top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{ background: 'linear-gradient(90deg, #C4622D 0%, rgba(196,98,45,0.35) 35%, transparent 70%)' }}
      />

      <div className="flex items-center justify-between px-[clamp(20px,5vw,80px)] py-[17px]">
        <div className="flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            aria-label="Back to top"
          >
            <Wordmark surface="dark" size={26} />
          </button>
          <AiStatusDot />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_SECTIONS.map(id => {
            const label = id.charAt(0).toUpperCase() + id.slice(1);
            return (
              <button
                key={id}
                onClick={() => smoothScrollTo(id)}
                className="uppercase font-medium font-sans tracking-[0.2em] transition-colors duration-200 hover:text-ember relative"
                style={{
                  ...navLinkStyle(id),
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C4622D'; }}
                onMouseLeave={e => { e.currentTarget.style.color = navLinkStyle(id).color; }}
              >
                {label}
                {/* Active underline */}
                {activeSection === id && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: '#C4622D',
                      opacity: 0.7,
                    }}
                  />
                )}
              </button>
            );
          })}

          <button
            onClick={() => smoothScrollTo('blackbox')}
            className="flex items-center gap-2 transition-all duration-200"
            style={{
              border: '1px solid rgba(196,98,45,0.4)',
              color: '#C4622D',
              padding: '8px 16px',
              borderRadius: 2,
              fontSize: 13,
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 500,
              background: 'transparent',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#C4622D';
              e.currentTarget.style.color = '#1A1A1A';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#C4622D';
            }}
          >
            Open the Black Box
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1.5"
          style={{ color: 'rgba(245,240,232,0.65)' }}
          onClick={() => setIsOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3l14 14M17 3L3 17" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 10h14M3 5h14M3 15h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-8 pb-6 pt-2 gap-5" style={{ borderTop: '1px solid rgba(245,240,232,0.05)' }}>
          {NAV_SECTIONS.map(id => {
            const label = id.charAt(0).toUpperCase() + id.slice(1);
            return (
              <button
                key={id}
                onClick={() => { smoothScrollTo(id); setIsOpen(false); }}
                className="text-left uppercase font-medium font-sans tracking-[0.2em]"
                style={{
                  fontSize: 11,
                  color: activeSection === id ? '#C4622D' : 'rgba(245,240,232,0.6)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {label}
              </button>
            );
          })}
          <button
            onClick={() => { smoothScrollTo('blackbox'); setIsOpen(false); }}
            className="text-left font-medium font-sans"
            style={{ fontSize: 13, color: '#C4622D', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Open the Black Box →
          </button>
        </div>
      )}

      {/* Scroll progress bar — grows across the bottom of the nav as you read */}
      {pastHero && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '1.5px',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #C4622D 0%, rgba(196,98,45,0.55) 80%, transparent 100%)',
            transition: 'width 80ms linear',
            pointerEvents: 'none',
          }}
        />
      )}
    </nav>

    {/* ── Wayfinding label — fixed right-side vertical section indicator ── */}
    <div
      aria-hidden="true"
      className="hidden lg:flex"
      style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        opacity: pastHero && activeSection ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }}
    >
      <div style={{ width: 1, height: 28, background: 'rgba(196,98,45,0.22)' }} />
      <div
        style={{
          writingMode: 'vertical-rl',
          fontSize: 9,
          fontFamily: 'JetBrains Mono, monospace',
          color: 'rgba(196,98,45,0.5)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}
      >
        {activeSection ?? ''}
      </div>
      <div
        style={{
          width: 1,
          flexGrow: 1,
          minHeight: 28,
          maxHeight: 56,
          background: `linear-gradient(to bottom, rgba(196,98,45,0.22) 0%, rgba(196,98,45,${(scrollProgress / 100).toFixed(2)}) 100%)`,
        }}
      />
    </div>
    </>
  );
}
