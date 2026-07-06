import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { AppShowcase } from '@/components/AppShowcase';
import { BlackBox } from '@/components/BlackBox';
import { PhD } from '@/components/PhD';
import { MythChecker } from '@/components/MythChecker';
import { Writing } from '@/components/Writing';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { AskOmi } from '@/components/AskOmi';
import { BackToTop } from '@/components/BackToTop';
import { Admin } from '@/components/Admin';
import { Collaborate } from '@/components/Collaborate';
import { LegalPage } from '@/pages/LegalPage';
import { Route, Switch } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

function Site() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.globalTimeline.timeScale(0);
      return;
    }

    // Hero eyebrow label fade-in
    gsap.fromTo('.hero-label',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 },
    );

    const ctx = gsap.context(() => {
      // 3D scroll reveals — elements rotate up from below the viewing plane
      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach(el => {
        gsap.fromTo(el,
          {
            transformPerspective: 900,
            rotateX: 7,
            y: 40,
            opacity: 0,
          },
          {
            transformPerspective: 900,
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      // Slide-in from right (for photo column etc)
      gsap.utils.toArray<HTMLElement>('.js-reveal-x').forEach(el => {
        gsap.fromTo(el,
          { x: 36, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      // Horizontal line drawing scroll reveals
      gsap.utils.toArray<HTMLElement>('.js-draw-line').forEach(el => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      // Vertical line drawing scroll reveals
      gsap.utils.toArray<HTMLElement>('.js-draw-line-y').forEach(el => {
        gsap.fromTo(el,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      // Staggered reveals for groups of elements (e.g. grids of cards)
      gsap.utils.toArray<HTMLElement>('.js-reveal-group').forEach(group => {
        const items = group.querySelectorAll('.js-reveal-item');
        if (items.length === 0) return;
        gsap.fromTo(items,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      // Beam scroll parallax
      gsap.utils.toArray<HTMLElement>('.js-parallax-beam').forEach(el => {
        gsap.to(el, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-obsidian text-parchment font-sans"
      style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' } as React.CSSProperties}
    >
      <Nav />
      <main>
        <Hero />
        <About />
        <BlackBox />
        <PhD />
        <MythChecker />
        <Writing />
        <Newsletter />
        <AppShowcase />
        <Collaborate />
      </main>
      <Footer />
      <AskOmi />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/terms">
          <div className="page-transition">
            <LegalPage type="terms" />
          </div>
        </Route>
        <Route path="/privacy">
          <div className="page-transition">
            <LegalPage type="privacy" />
          </div>
        </Route>
        <Route path="/admin">
          <div className="page-transition">
            <Admin />
          </div>
        </Route>
        <Route path="/">
          <div className="page-transition">
            <Site />
          </div>
        </Route>
        <Route>
          <div className="page-transition">
            <Site />
          </div>
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
