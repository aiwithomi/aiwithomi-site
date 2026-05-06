import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = photoContainerRef.current!;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 7,
      rotateX: -y * 5,
      duration: 0.6,
      ease: 'power2.out',
      transformPerspective: 900,
    });
  }

  function onMouseLeave() {
    gsap.to(photoContainerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.4,
      ease: 'elastic.out(1, 0.45)',
    });
  }

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    if (!section || !photo) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.set(photo, { opacity: 0, scale: 1.06, transformOrigin: 'center top' });
    gsap.set('.about-l1', { yPercent: 110 });
    gsap.set('.about-l2', { yPercent: 110 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    tl.to(photo, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }, 0);
    tl.to('.about-l1', { yPercent: 0, duration: 0.65, ease: 'power3.out' }, 0.15);
    tl.to('.about-l2', { yPercent: 0, duration: 0.65, ease: 'power3.out' }, 0.32);

    return () => {
      tl.scrollTrigger?.kill(true);
      tl.kill();
      gsap.set([photo, '.about-l1', '.about-l2'], { clearProps: 'all' });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Desktop: Side-by-side layout */}
      <div className="hidden md:flex w-full h-full" style={{ minHeight: '100vh' }}>
        {/* LEFT — Parchment / Text */}
        <div
          style={{
            width: '45%',
            height: '100%',
            background: '#F5F0E8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 80,
            paddingBottom: 80,
            paddingLeft: 'clamp(28px, 6vw, 96px)',
            paddingRight: 'clamp(20px, 3vw, 56px)',
            position: 'relative',
            zIndex: 2,
            overflowY: 'auto',
          }}
        >
          <div style={{ overflow: 'hidden', paddingBottom: 6 }}>
            <div
              className="about-l1 font-serif font-light text-obsidian"
              style={{
                fontSize: 'clamp(44px, 6.5vw, 96px)',
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
              }}
            >
              Hi.
            </div>
          </div>

          <div
            style={{
              overflow: 'hidden',
              paddingBottom: 6,
              marginBottom: 'clamp(20px, 3vw, 36px)',
            }}
          >
            <div
              className="about-l2 font-serif font-light text-obsidian"
              style={{
                fontSize: 'clamp(44px, 6.5vw, 96px)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              I am{' '}
              <em style={{ color: '#C4622D', fontStyle: 'italic' }}>Omi</em>.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(12px, 1.6vw, 20px)',
              maxWidth: '44ch',
            }}
          >
            <p
              className="font-sans"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 16px)',
                lineHeight: 1.72,
                color: 'rgba(26,26,26,0.7)',
              }}
            >
              I work in healthcare data and AI in Australia, and I am pursuing a PhD in artificial intelligence for mental healthcare. Everything I do returns to a single question: can a model be trusted with a clinical decision, and if so, on what grounds?
            </p>
            <p
              className="font-sans"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 16px)',
                lineHeight: 1.72,
                color: 'rgba(26,26,26,0.7)',
              }}
            >
              The challenge does not stop at the clinic door. Increasingly, people in distress are turning to large language models for mental health support, tools that are articulate, always available, and entirely unregulated as therapeutic aids. These systems were not designed to hold that role, yet they do. When their responses are untethered from clinical frameworks, the consequences can be irreversible. The 2024 lawsuit filed by the parents of a 17-year-old in California against OpenAI is one of the more visible cases in a pattern that researchers and clinicians are only beginning to account for.
            </p>
            <p
              className="font-sans"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 16px)',
                lineHeight: 1.72,
                color: 'rgba(26,26,26,0.7)',
              }}
            >
              The core problem is not the absence of guardrails, though more rigorous constraints are warranted. It is that nobody, including the engineers who built these systems, can fully account for how a large language model reasons, what it prioritises, or where its logic fails. That opacity is the black box. Making it interpretable, auditable, and safe enough to meet the standards of clinical practice is the work my research is committed to. I believe it is among the most consequential problems in technology today.
            </p>

            {/* Collaboration invitation */}
            <div
              style={{
                marginTop: 4,
                paddingLeft: 14,
                borderLeft: '2px solid #C4622D',
              }}
            >
              <p
                className="font-serif italic font-light"
                style={{
                  fontSize: 'clamp(14px, 1.2vw, 17px)',
                  lineHeight: 1.65,
                  color: 'rgba(26,26,26,0.6)',
                }}
              >
                Follow along for the journey. If the work resonates, reach out and collaborate.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 'clamp(18px, 2.5vw, 32px)',
              paddingTop: 'clamp(16px, 2vw, 24px)',
              borderTop: '1px solid rgba(26,26,26,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              className="font-sans font-medium uppercase tracking-[0.18em]"
              style={{ fontSize: 10, color: 'rgba(26,26,26,0.35)' }}
            >
              Brisbane, Australia
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div
                className="font-sans font-medium uppercase tracking-[0.18em]"
                style={{ fontSize: 9, color: 'rgba(196,98,45,0.55)' }}
              >
                TheMHS Learning Network Conference 2025
              </div>
              <div
                className="font-sans"
                style={{ fontSize: 12, color: 'rgba(26,26,26,0.45)', lineHeight: 1.5 }}
              >
                Two presentations on AI in mental health: S56A and S23 Featured Symposium, Brisbane.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Ember / Photo */}
        <div
          style={{
            width: '55%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            background: '#C4622D',
          }}
        >
          <div
            ref={photoContainerRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              willChange: 'transform',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              ref={photoRef}
              src="/omi-portrait.jpg"
              alt="Omi Iftikhar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                userSelect: 'none',
              } as React.CSSProperties}
              draggable={false}
            />
          </div>

          {/* Ember colour wash */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#C4622D',
              opacity: 0.15,
              mixBlendMode: 'multiply',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* Left-edge gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '28%',
              background: 'linear-gradient(to right, #C4622D, transparent)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />

          {/* Bottom gradient */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '20%',
              background: 'linear-gradient(to bottom, transparent, #C4622D)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Mobile: Stacked layout */}
      <div className="md:hidden w-full" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Text Section */}
        <div
          style={{
            width: '100%',
            minHeight: '50vh',
            background: '#F5F0E8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 60,
            paddingBottom: 60,
            paddingLeft: 'clamp(28px, 5vw, 96px)',
            paddingRight: 'clamp(28px, 5vw, 56px)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div style={{ overflow: 'hidden', paddingBottom: 6 }}>
            <div
              className="about-l1 font-serif font-light text-obsidian"
              style={{
                fontSize: 'clamp(36px, 8vw, 64px)',
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
              }}
            >
              Hi.
            </div>
          </div>

          <div
            style={{
              overflow: 'hidden',
              paddingBottom: 6,
              marginBottom: 'clamp(16px, 3vw, 28px)',
            }}
          >
            <div
              className="about-l2 font-serif font-light text-obsidian"
              style={{
                fontSize: 'clamp(36px, 8vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              I am{' '}
              <em style={{ color: '#C4622D', fontStyle: 'italic' }}>Omi</em>.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(10px, 1.6vw, 16px)',
            }}
          >
            <p
              className="font-sans"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                lineHeight: 1.72,
                color: 'rgba(26,26,26,0.7)',
              }}
            >
              I work in healthcare data and AI in Australia, and I am pursuing a PhD in artificial intelligence for mental healthcare. Everything I do returns to a single question: can a model be trusted with a clinical decision, and if so, on what grounds?
            </p>
            <p
              className="font-sans"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                lineHeight: 1.72,
                color: 'rgba(26,26,26,0.7)',
              }}
            >
              The challenge does not stop at the clinic door. Increasingly, people in distress are turning to large language models for mental health support, tools that are articulate, always available, and entirely unregulated as therapeutic aids. These systems were not designed to hold that role, yet they do.
            </p>
            <p
              className="font-sans"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                lineHeight: 1.72,
                color: 'rgba(26,26,26,0.7)',
              }}
            >
              The core problem is not the absence of guardrails, though more rigorous constraints are warranted. It is that nobody, including the engineers who built these systems, can fully account for how a large language model reasons, what it prioritises, or where its logic fails. That opacity is the black box.
            </p>

            {/* Collaboration invitation */}
            <div
              style={{
                marginTop: 4,
                paddingLeft: 14,
                borderLeft: '2px solid #C4622D',
              }}
            >
              <p
                className="font-serif italic font-light"
                style={{
                  fontSize: 'clamp(14px, 1.2vw, 16px)',
                  lineHeight: 1.65,
                  color: 'rgba(26,26,26,0.6)',
                }}
              >
                Follow along for the journey. If the work resonates, reach out and collaborate.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 'clamp(16px, 2.5vw, 24px)',
              paddingTop: 'clamp(14px, 2vw, 20px)',
              borderTop: '1px solid rgba(26,26,26,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div
              className="font-sans font-medium uppercase tracking-[0.18em]"
              style={{ fontSize: 9, color: 'rgba(26,26,26,0.35)' }}
            >
              Brisbane, Australia
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div
                className="font-sans font-medium uppercase tracking-[0.18em]"
                style={{ fontSize: 8, color: 'rgba(196,98,45,0.55)' }}
              >
                TheMHS Learning Network Conference 2025
              </div>
              <div
                className="font-sans"
                style={{ fontSize: 11, color: 'rgba(26,26,26,0.45)', lineHeight: 1.5 }}
              >
                Two presentations on AI in mental health: S56A and S23 Featured Symposium, Brisbane.
              </div>
            </div>
          </div>
        </div>

        {/* Photo Section */}
        <div
          style={{
            width: '100%',
            minHeight: '60vh',
            position: 'relative',
            overflow: 'hidden',
            background: '#C4622D',
          }}
        >
          <div
            ref={photoContainerRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              willChange: 'transform',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              ref={photoRef}
              src="/omi-portrait.jpg"
              alt="Omi Iftikhar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                userSelect: 'none',
              } as React.CSSProperties}
              draggable={false}
            />
          </div>

          {/* Ember colour wash */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#C4622D',
              opacity: 0.15,
              mixBlendMode: 'multiply',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* Left-edge gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '28%',
              background: 'linear-gradient(to right, #C4622D, transparent)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />

          {/* Bottom gradient */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '20%',
              background: 'linear-gradient(to bottom, transparent, #C4622D)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}
