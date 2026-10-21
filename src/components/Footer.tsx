import { BrandMark } from '@/components/BrandMark';

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
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <a href="#top" aria-label="AIwithOmi home"><BrandMark /></a>
            <p>Learning, testing and explaining AI in public from Brisbane.</p>
          </div>
          <div className="footer-socials">
            {SOCIALS.map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>Public education and personal research. Not clinical, legal or financial advice.</p>
          <div>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
