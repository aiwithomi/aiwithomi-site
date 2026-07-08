import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Now', href: '#now' },
  { label: 'Newsletter', href: '#newsletter' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250,249,245,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-[1040px] mx-auto flex items-center justify-between px-6 sm:px-8" style={{ height: 64 }}>
        <a href="/" className="font-sans font-semibold tracking-tight text-ink" style={{ fontSize: 17 }}>
          AI<span className="text-clay">with</span>Omi
        </a>
        <div className="flex items-center gap-6 sm:gap-8">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-muted hover:text-ink transition-colors duration-200"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://aiwithomi.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block font-sans text-paper bg-ink hover:bg-clay transition-colors duration-200 rounded-pill"
            style={{ fontSize: 13, fontWeight: 500, padding: '8px 18px' }}
          >
            Read the notes
          </a>
        </div>
      </nav>
    </header>
  );
}
