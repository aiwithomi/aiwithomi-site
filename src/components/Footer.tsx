import { Wordmark } from './Wordmark';

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: 'smooth' });
}

const CONNECT_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aiwithomi/',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/AiWithOmi',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@aiwithomi',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/o-m-i/',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@aiwithomi',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    label: 'Substack',
    href: 'https://aiwithomi.substack.com',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian px-[clamp(28px,5vw,80px)] pb-12">
      {/* Full-width ember rule */}
      <div
        className="h-[1px] mb-14"
        style={{ background: 'linear-gradient(90deg, #C4622D 0%, rgba(196,98,45,0.25) 50%, transparent 100%)' }}
      />

      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-10">
          {/* Left */}
          <div className="flex flex-col gap-5">
            <Wordmark surface="dark" size={22} />
            <p className="font-serif italic font-light leading-[1.6]" style={{ fontSize: 18, color: 'rgba(245,240,232,0.65)', maxWidth: '28ch' }}>
              Honest writing about AI in healthcare. No hype. No false comfort.
            </p>
          </div>

          {/* Centre — Navigation */}
          <nav className="flex flex-col gap-3 md:items-center">
            <div className="uppercase font-medium font-sans tracking-[0.18em] mb-2" style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)' }}>
              Navigation
            </div>
            {[
              { label: 'About', id: 'about' },
              { label: 'Read', id: 'read' },
              { label: 'Newsletter', id: 'newsletter' },
              { label: 'Black Box', id: 'blackbox' },
              { label: 'App', id: 'app' },
            ].map(({ label, id }) => (
              <button
                key={label}
                onClick={() => smoothScrollTo(id)}
                className="font-sans transition-colors duration-200 hover:text-ember"
                style={{
                  fontSize: 15,
                  color: 'rgba(245,240,232,0.55)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C4622D'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.55)'; }}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right — social links */}
          <div className="flex flex-col gap-3 md:text-right">
            <div className="uppercase font-medium font-sans tracking-[0.18em] mb-2" style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)' }}>
              Connect
            </div>
            {CONNECT_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans transition-colors duration-200 inline-flex items-center gap-2 md:justify-end"
                style={{ fontSize: 15, color: 'rgba(245,240,232,0.55)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C4622D'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.55)'; }}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Colophon */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-8"
          style={{ borderTop: '1px solid rgba(245,240,232,0.07)' }}
        >
          <p className="font-serif italic font-light" style={{ fontSize: 16, color: 'rgba(245,240,232,0.3)' }}>
            Trust, before intelligence.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]" style={{ fontSize: 11, color: 'rgba(245,240,232,0.25)' }}>
            © {year} Omi Iftikhar · Brisbane, AU
          </p>
        </div>
      </div>
    </footer>
  );
}
