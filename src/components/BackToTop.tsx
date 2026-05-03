import { useState, useEffect } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 199,
        width: 40,
        height: 40,
        borderRadius: 2,
        border: '1px solid rgba(196,98,45,0.35)',
        background: 'rgba(26,26,26,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: 'rgba(196,98,45,0.75)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = '#C4622D';
        el.style.color = '#C4622D';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(196,98,45,0.35)';
        el.style.color = 'rgba(196,98,45,0.75)';
        el.style.transform = 'translateY(0)';
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 12V2M2 7l5-5 5 5" />
      </svg>
    </button>
  );
}
