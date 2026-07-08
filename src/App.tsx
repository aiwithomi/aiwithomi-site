import { useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Now } from '@/components/Now';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { LegalPage } from '@/pages/LegalPage';
import { Route, Switch } from 'wouter';

function Site() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach(el => io.observe(el));
    // Content must never stay hidden if the observer misses (prerender,
    // crawlers, odd embedders): reveal everything shortly after load.
    const failsafe = window.setTimeout(() => {
      els.forEach(el => el.classList.add('in'));
      io.disconnect();
    }, 1800);
    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-paper text-ink font-serif" style={{ WebkitFontSmoothing: 'antialiased' } as React.CSSProperties}>
      <Nav />
      <main>
        <Hero />
        <About />
        <Now />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
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
      <Route>
        <div className="page-transition">
          <Site />
        </div>
      </Route>
    </Switch>
  );
}

export default App;
