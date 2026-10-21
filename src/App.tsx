import { useEffect } from 'react';
import { Route, Switch } from 'wouter';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Nav } from '@/components/Nav';
import { Newsletter } from '@/components/Newsletter';
import { Notes } from '@/components/Notes';
import { Now } from '@/components/Now';
import { Pathways } from '@/components/Pathways';
import { Resources } from '@/components/Resources';
import { LegalPage } from '@/pages/LegalPage';

function Site() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    elements.forEach(element => observer.observe(element));
    const failsafe = window.setTimeout(() => {
      elements.forEach(element => element.classList.add('in'));
      observer.disconnect();
    }, 1800);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content">
        <Hero />
        <Pathways />
        <Now />
        <Notes />
        <Resources />
        <About />
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
        <div className="page-transition"><LegalPage type="terms" /></div>
      </Route>
      <Route path="/privacy">
        <div className="page-transition"><LegalPage type="privacy" /></div>
      </Route>
      <Route>
        <div className="page-transition"><Site /></div>
      </Route>
    </Switch>
  );
}

export default App;
