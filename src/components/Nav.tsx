import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/BrandMark';

const LINKS = [
  { label: 'Learn', href: '#paths' },
  { label: 'Research', href: '#research' },
  { label: 'Notes', href: '#notes' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#about' },
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
    <header className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}>
      <nav className="shell nav-inner" aria-label="Main navigation">
        <a className="nav-brand" href="#top" aria-label="AIwithOmi home">
          <BrandMark />
        </a>
        <div className="nav-links">
          {LINKS.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a className="nav-cta" href="#newsletter">Join the notes</a>
        </div>
      </nav>
    </header>
  );
}
