const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/aiwithomi/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@aiwithomi' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@aiwithomi' },
  { label: 'X', href: 'https://x.com/AiWithOmi' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aiwithomi/' },
  { label: 'Substack', href: 'https://aiwithomi.substack.com' },
];

export function Footer() {
  return (
    <footer className="w-full" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="max-w-[1040px] mx-auto px-6 sm:px-8" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          <div>
            <a href="/" className="font-sans font-semibold tracking-tight text-ink" style={{ fontSize: 17 }}>
              AI<span className="text-clay">with</span>Omi
            </a>
            <p className="text-muted" style={{ fontSize: 14, lineHeight: 1.6, marginTop: 12, maxWidth: 340 }}>
              Learning AI in public from Brisbane, Australia.
              Same notes, wherever you follow.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-muted hover:text-clay transition-colors duration-200"
                style={{ fontSize: 14, fontWeight: 500 }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderTop: '1px solid var(--line-soft)', marginTop: 44, paddingTop: 28 }}
        >
          <p className="text-muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
            Nothing here is medical, clinical or financial advice.
            &copy; {new Date().getFullYear()} AIwithOmi.
          </p>
          <div className="flex gap-6">
            <a href="/terms" className="font-sans text-muted hover:text-ink transition-colors duration-200" style={{ fontSize: 13 }}>
              Terms of Service
            </a>
            <a href="/privacy" className="font-sans text-muted hover:text-ink transition-colors duration-200" style={{ fontSize: 13 }}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
