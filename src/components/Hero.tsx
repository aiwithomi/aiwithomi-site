import { useId, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGetSubscriberCount } from '../lib/api-stub';

function DotGrid({ id }: { id: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" aria-hidden="true" style={{ pointerEvents: 'none', zIndex: 0 }}>
      <defs>
        <pattern id={id} x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(245,240,232,0.035)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const WORDMARK_CHARS = [
  { char: 'A', ember: true },
  { char: 'I', ember: true },
  { char: 'w', ember: false },
  { char: 'i', ember: false },
  { char: 't', ember: false },
  { char: 'h', ember: false },
  { char: 'O', ember: true },
  { char: 'm', ember: true },
  { char: 'i', ember: true },
];

const ROTATING = [
  'Healthcare AI researcher',
  'PhD candidate · 2026',
  'Myth checker',
  'Making AI explainable',
  'Writing about trust',
];

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Hero() {
  const patternId   = useId();
  const heroRef     = useRef<HTMLElement>(null);
  const beamRef     = useRef<SVGSVGElement>(null);
  const beam2Ref    = useRef<SVGSVGElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const dotGridRef  = useRef<SVGSVGElement>(null);
  const { data: countData } = useGetSubscriberCount();
  const count = countData?.count ?? null;

  const [rotIdx, setRotIdx]         = useState(0);
  const [rotVisible, setRotVisible] = useState(true);

  // Rotating descriptor
  useEffect(() => {
    const id = setInterval(() => {
      setRotVisible(false);
      setTimeout(() => {
        setRotIdx(i => (i + 1) % ROTATING.length);
        setRotVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // On-load stagger reveal — delayed so intro establishes first
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      gsap.set('.hero-char-inner', { yPercent: 115, opacity: 0 });
      gsap.set(['.hero-sub', '.hero-chips', '.hero-phd-cta', '.hero-rule'], { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to('.hero-char-inner', {
        yPercent: 0,
        opacity: 1,
        stagger: 0.055,
        duration: 0.72,
        ease: 'power3.out',
      });
      tl.to('.hero-rule',    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
      tl.to('.hero-sub',     { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35');
      tl.to('.hero-chips',   { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
      tl.to('.hero-phd-cta', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    }
  }, []);

  // Mouse parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    function onMouseMove(e: MouseEvent) {
      const rect = hero!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(beamRef.current,    { x: x * 55,  y: y * 28, duration: 2.8, ease: 'power2.out' });
      gsap.to(beam2Ref.current,   { x: x * -35, y: y * 20, duration: 3.2, ease: 'power2.out' });
      gsap.to(dotGridRef.current, { x: x * 14,  y: y * 8,  duration: 3.2, ease: 'power2.out' });
      gsap.to(wordmarkRef.current, {
        rotateY: x * 5, rotateX: -y * 3.5,
        duration: 2, ease: 'power2.out', transformPerspective: 1400,
      });
    }

    function onMouseLeave() {
      gsap.to([beamRef.current, beam2Ref.current, dotGridRef.current], {
        x: 0, y: 0, duration: 2.5, ease: 'power2.out',
      });
      gsap.to(wordmarkRef.current, { rotateY: 0, rotateX: 0, duration: 2, ease: 'power2.out' });
    }

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);
    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-obsidian overflow-hidden"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <DotGrid id={patternId} />

      {/* Beam — bottom-left */}
      <svg ref={beamRef} className="absolute left-[-8%] bottom-[-12%] w-[65vw] h-[80vh]"
        viewBox="0 0 700 480" preserveAspectRatio="xMinYMax slice"
        aria-hidden="true" style={{ pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <linearGradient id="beam-hero" x1="0" y1="480" x2="700" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#C4622D" stopOpacity="0.5" />
            <stop offset="40%"  stopColor="#C4622D" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C4622D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="0,480 700,0 700,480" fill="url(#beam-hero)" />
        <circle cx="0" cy="480" r="3.5" fill="#F5F0E8" opacity="0.7" />
      </svg>

      {/* Beam — top-right */}
      <svg ref={beam2Ref} className="absolute right-[-6%] top-[-8%] w-[45vw] h-[55vh]"
        viewBox="0 0 500 360" preserveAspectRatio="xMaxYMin slice"
        aria-hidden="true" style={{ pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <linearGradient id="beam-hero-2" x1="500" y1="0" x2="0" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#C4622D" stopOpacity="0.18" />
            <stop offset="60%"  stopColor="#C4622D" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#C4622D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="500,0 0,0 500,360" fill="url(#beam-hero-2)" />
        <circle cx="500" cy="0" r="2.5" fill="#C4622D" opacity="0.55" />
      </svg>

      {/* Dot grid */}
      <svg ref={dotGridRef} className="absolute inset-0 w-full h-full" aria-hidden="true"
        style={{ pointerEvents: 'none', zIndex: 0, opacity: 0 }} />

      {/* Eyebrow */}
      <div className="relative z-10 flex items-center justify-between px-[clamp(28px,5vw,80px)] pt-[120px]">
        <div className="hero-label uppercase font-medium font-sans tracking-[0.24em]"
          style={{ fontSize: 11, color: '#C4622D' }}>
          In the company of careful machines
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full animate-pulse" style={{ background: '#C4622D' }} />
          <span className="font-mono uppercase tracking-[0.14em]" style={{ fontSize: 10, color: 'rgba(245,240,232,0.3)' }}>
            Brisbane, AU
          </span>
        </div>
      </div>

      {/* Centre content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-[clamp(28px,5vw,80px)] py-8">

        {/* Top rule */}
        <div className="hero-rule w-full mb-10 flex items-center gap-4 justify-center" style={{ maxWidth: 680 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(245,240,232,0.08))' }} />
        </div>

        {/* Wordmark */}
        <h1
          ref={wordmarkRef}
          className="font-sans font-bold leading-none"
          style={{
            fontSize: 'clamp(52px, 10.5vw, 148px)',
            letterSpacing: '-0.05em',
            lineHeight: 0.95,
            willChange: 'transform',
            transformStyle: 'preserve-3d',
          }}
        >
          {WORDMARK_CHARS.map((c, i) => (
            <span key={i} className="inline-block" style={{ overflow: 'hidden', verticalAlign: 'bottom', lineHeight: 1.05 }}>
              <span
                className="hero-char-inner inline-block"
                style={{
                  color: c.ember ? '#C4622D' : '#F5F0E8',
                  textShadow: c.ember ? '0 0 80px rgba(196,98,45,0.35)' : '0 0 60px rgba(26,26,26,0.7)',
                }}
              >
                {c.char}
              </span>
            </span>
          ))}
        </h1>

        {/* Bottom rule */}
        <div className="hero-rule flex items-center gap-3 mt-8 mb-8" style={{ width: '100%', maxWidth: 680 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,98,45,0.4), transparent)' }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C4622D' }} />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,98,45,0.4), transparent)' }} />
        </div>

        {/* Tagline + rotating */}
        <div className="hero-sub flex flex-col items-center gap-4">
          <p className="font-serif italic font-light"
            style={{ fontSize: 'clamp(18px, 2vw, 28px)', color: 'rgba(245,240,232,0.55)', letterSpacing: '0.01em' }}>
            Trust, before intelligence.
          </p>
          <div
            className="font-mono uppercase tracking-[0.22em] transition-all duration-300"
            style={{
              fontSize: 'clamp(9px, 0.85vw, 11px)',
              color: 'rgba(196,98,45,0.7)',
              opacity: rotVisible ? 1 : 0,
              transform: rotVisible ? 'translateY(0)' : 'translateY(6px)',
            }}
          >
            {ROTATING[rotIdx]}
          </div>
        </div>

        {/* Descriptor chips */}
        <div className="hero-chips flex flex-wrap items-center justify-center gap-3 mt-8">
          {['Healthcare AI', 'PhD Research', 'Clinical Trust', 'Data Analytics'].map(tag => (
            <span key={tag} className="font-sans font-medium uppercase tracking-[0.18em]"
              style={{
                fontSize: 10,
                color: 'rgba(245,240,232,0.3)',
                border: '1px solid rgba(245,240,232,0.08)',
                padding: '6px 14px',
              }}>
              {tag}
            </span>
          ))}
        </div>

        {/* PhD Journey CTA */}
        <div className="hero-phd-cta mt-10 flex flex-col items-center gap-4">
          <button
            onClick={() => smoothScrollTo('phd')}
            className="group flex items-center gap-3 transition-all duration-300"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div
              style={{
                width: 28,
                height: 1,
                background: '#C4622D',
                transition: 'width 0.3s ease',
              }}
              className="group-hover:w-[44px]"
            />
            <span
              className="font-sans uppercase tracking-[0.22em] transition-colors duration-300"
              style={{ fontSize: 11, color: 'rgba(245,240,232,0.45)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C4622D'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.45)'; }}
            >
              Come along for the PhD journey
            </span>
            <span
              className="font-mono transition-all duration-300"
              style={{ fontSize: 13, color: '#C4622D' }}
            >
              →
            </span>
          </button>

          {/* Subscriber count badge */}
          {count !== null && (
            <div className="flex items-center gap-2">
              <span className="w-[5px] h-[5px] rounded-full animate-pulse" style={{ background: 'rgba(196,98,45,0.6)' }} />
              <span className="font-mono uppercase tracking-[0.2em]" style={{ fontSize: 10, color: 'rgba(245,240,232,0.22)' }}>
                {count} {count === 1 ? 'person' : 'people'} already following
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer bar */}
      <div
        className="relative z-10 flex items-center justify-between px-[clamp(28px,5vw,80px)] pb-8 pt-6"
        style={{ borderTop: '1px solid rgba(245,240,232,0.05)' }}
      >
        <div className="flex flex-col gap-1">
          <div className="uppercase font-medium font-sans tracking-[0.18em]" style={{ fontSize: 9, color: 'rgba(245,240,232,0.3)' }}>
            PhD Research
          </div>
          <div className="font-serif italic font-light" style={{ fontSize: 14, color: 'rgba(245,240,232,0.55)' }}>
            Trust as a sociotechnical accomplishment
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-[1px] overflow-hidden" style={{ height: 36, background: 'rgba(245,240,232,0.08)' }}>
            <div className="w-full" style={{ height: '50%', background: '#C4622D', animation: 'scrollLine 2.2s ease-in-out infinite' }} />
          </div>
        </div>

        {count !== null ? (
          <div className="flex flex-col gap-1 items-end">
            <div className="uppercase font-medium font-sans tracking-[0.18em]" style={{ fontSize: 9, color: 'rgba(245,240,232,0.3)' }}>
              Newsletter
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono font-medium" style={{ fontSize: 17, color: '#C4622D', letterSpacing: '-0.02em' }}>{count}</span>
              <span className="font-serif italic font-light" style={{ fontSize: 13, color: 'rgba(245,240,232,0.45)' }}>
                {count === 1 ? 'subscriber' : 'subscribers'}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-20 h-4 rounded" style={{ background: 'rgba(245,240,232,0.04)' }} />
        )}
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          50%  { transform: translateY(100%); }
          100% { transform: translateY(300%); }
        }
        .hero-phd-cta button:hover > div:first-child {
          width: 44px;
        }
      `}</style>
    </section>
  );
}
